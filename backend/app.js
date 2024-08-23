var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
};

var fetchPrices = require("./routes/fetchPrices");
const registerApi = require("./routes/registerApi");
const loginApi = require("./routes/loginApi");
const scheduleAppointment = require("./routes/scheduleAppointment");

const getUnavailableSlots = require("./routes/getUnavailableSlots");

const authToken = require("./routes/authToken");


var app = express();

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/getPrices", fetchPrices);
app.use("/api/register", registerApi);
app.use("/api/login", loginApi);
app.use("/api/createAppointment", scheduleAppointment);
app.use("/api/getUnavailableSlots", getUnavailableSlots);
app.use("/api/verifyToken", authToken);


module.exports = app;
