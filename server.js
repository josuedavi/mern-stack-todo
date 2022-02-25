const express = require("express");

const cors = require("cors");

require("dotenv").config();

const app = express();


// routes
const todo = require("./routes/todo"); 

const connectDB = require("./config/db");

const route = require('./controllers/todo');
// connect database
connectDB();

// ... other imports 
const path = require("path")

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// cors
app.use(cors({ origin: true, credentials: true }));

//initialize middleware
app.use(express.json({extended: false}));
// app.get('/', (req, res) => res.send("Server is up and running!"));

// use routes
// app.get('/todo', route.getAllTodo);

app.get("/todo", route.getAllTodo);

app.post("/post/todo", route.postCreateTodo);

app.put("/:id", route.putUpdateTodo);

app.delete("/:id", route.deleteTodo);

//setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});