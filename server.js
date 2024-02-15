if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index.route");
const authorRouter = require("./routes/authors.route");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log('Connected to mongoose'));

app.use("/", indexRouter);
app.use("/authors", authorRouter);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
