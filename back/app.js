const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const apiRouter = require("./routes/api");

dotenv.config();
const { PATHNAME, VERSION } = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));

app.get("/back/health", (req, res, next) =>
  res.status(200).json({ statusCode: 200, statusMessage: "ok" })
);

app.use(`/${PATHNAME}/:version`, apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`running server! on ${process.env.PORT}`);
});
