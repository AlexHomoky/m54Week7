require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connection is working");
};

connection();

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

app.get("/getAllBooks", async (request, response) => {
  //get all books from db
  const books = await Book.find({});
  response.send({ message: "success on all the books.", books: books });
});

app.post("/books/addBook", async (request, response) => {
  //add single book to db
  console.log("request.body", request.body);
  const book = await Book.create({
    title: request.body.title,
    author: request.body.author,
    genre: request.body.genre,
  });
  response.send({ message: "success book created", book: book });
  console.log("book: ", book);
});

app.put("/books", (request, response) => {});

app.delete("/books", (request, response) => {});

app.listen(5001, () => {
  console.log("Server is listening on 5001");
});
