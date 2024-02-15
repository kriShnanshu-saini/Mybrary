const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Author name is required"],
    },
});

module.exports = mongoose.model("Author", authorSchema);
