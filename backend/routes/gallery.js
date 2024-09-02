var express = require("express");
var router = express.Router();
const db = require("../config/db");
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const secureAdmin = require("../middlewares/secureAdmin");

router.use(fileUpload());

router.get("/", async (req, res) => {
  try {
    const [images] = await db.query("SELECT * FROM gallery_images");
    res.status(200).json(images);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.delete("/:id", secureAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const [image] = await db.query(
      "SELECT link FROM gallery_images WHERE id = ?",
      [id]
    );

    if (image.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Image not found" });
    }

    const relativeImagePath = image[0].link;

    const imagePath = path.join(__dirname, "..", "public", relativeImagePath);

    fs.unlink(imagePath, async (err) => {
      if (err) {
        console.error("File deletion error:", err);
        return res.status(500).json({
          status: "error",
          message: "Failed to delete the image file",
        });
      }

      await db.query("DELETE FROM gallery_images WHERE id = ?", [id]);
      res
        .status(200)
        .json({ status: "success", message: "Image successfully deleted" });
    });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ status: "error", message: "Failed to delete the image" });
  }
});

router.post("/", secureAdmin, async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "No file uploaded" });
    }

    let imageFile = req.files.image;
    const imageDescription = req.body.description;

    const imageName = Date.now() + path.extname(imageFile.name);

    const uploadPath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      imageName
    );

    imageFile.mv(uploadPath, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Failed to upload the image" });
      }

      const relativeImagePath = `/images/${imageName}`;

      await db.query(
        "INSERT INTO gallery_images (link, image_description) VALUES (?, ?)",
        [relativeImagePath, imageDescription]
      );

      res
        .status(201)
        .json({ status: "success", message: "Image uploaded successfully" });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;
