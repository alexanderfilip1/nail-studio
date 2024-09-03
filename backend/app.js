var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};

var fetchPrices = require("./routes/fetchPrices");
const registerApi = require("./routes/registerApi");
const loginApi = require("./routes/loginApi");
const scheduleAppointment = require("./routes/scheduleAppointment");
const getUnavailableSlots = require("./routes/getUnavailableSlots");
const authToken = require("./routes/authToken");
const userProfile = require("./routes/userProfile");
const fetchUserAppointments = require("./routes/fetchUserAppointments");
const cashbackHistory = require("./routes/cashbackHistory");
const checkAdmin = require("./routes/checkAdmin");
const users = require("./routes/users");
const appointments = require("./routes/appointments");
const services = require("./routes/services");
const reviews = require("./routes/reviews");
const gallery = require("./routes/gallery");
const visits = require("./routes/visits");

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
app.use("/api/getUser", userProfile);
app.use("/api/fetchAppointments", fetchUserAppointments);
app.use("/api/cashbackHistory", cashbackHistory);
app.use("/api/checkAdmin", checkAdmin);
app.use("/api/admin/users", users);
app.use("/api/admin/appointments", appointments);
app.use("/api/admin/services", services);
app.use("/api/reviews", reviews);
app.use("/api/admin/gallery", gallery);
app.use("/api/log-visit", visits);

module.exports = app;
