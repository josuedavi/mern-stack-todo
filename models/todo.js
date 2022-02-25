const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true,
    },
    description: {
        type: "String",
    },
});

const Todo = mongoose.model("todos", TodoSchema);

module.exports = Todo;