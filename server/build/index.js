"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
// constants & initializations
dotenv_1.default.config();
var PORT = Number(process.env.PORT) || 5000;
var errorHandler = function (err, req, res, next) {
    var errStatus = err.status || 500;
    res.status(errStatus).json({
        status: errStatus,
        message: err.message,
    });
};
var app = (0, express_1.default)();
// ROUTES
app.get("/", function (req, res, next) {
    res.status(200).json({ message: "this is express ts" });
});
// ERROR ROUTE
app.use(function (req, res, next) {
    next(new http_errors_1.default.NotFound());
});
app.use(errorHandler);
var server = app.listen(PORT, function () {
    console.log("[server]: Server is running at https://localhost:".concat(PORT));
});
