const express = require("express");
const authorRouter = express.Router();
const Author = require("../models/authors.model");

// All authors route
authorRouter.get("/", async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== "") {
        searchOptions.name = new RegExp(req.query.name, "i") // case insensitive regex
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render("authors/index", { authors, name: req.query.name });
    } catch (err) {
        res.redirect("/");
    }
});

//new author route
authorRouter.get("/new", (req, res) => {
    res.render("authors/new", { author: new Author() });
});

authorRouter.post("/", async (req, res) => {
    const { name } = req.body;
    if (!name || name == "") {
        return res.status(400).render("authors/new", {
            locals: {
                message: "Author name is required!",
            },
        });
    }
    try {
        const author = await Author.create({ name });
        // res.redirect(`authors/${author._id}`);
        res.redirect(`authors`);
    } catch (err) {
        res.render("authors/new", {
            locals: {
                author: name,
                message: "Error creating author!",
            },
        });
    }
});

module.exports = authorRouter;
