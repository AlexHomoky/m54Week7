require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const fakeArr = [];

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
  //await logTypeOfResult(books);
});

app.get("/getFirstBook", async (request, response) => {
  //get first book
  //   const book = await Book.find({book.[0]});
  //   response.send({ message: "success first book", book: book });
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

app.put("/books", async (request, response) => {
  // in here, find a book by title (i.e. an element of fakeArr where the element title is the same as request.body.title)
  // change (update) the author to an new name
  const filter = { author: "graham" };
  const update = { author: "toddley" };

  let book = await Book.findOneAndUpdate(filter, update, { new: true });
  response.send({ message: "success author replaced", book: book });
  console.log("book: ", book);
});

app.delete("/deleteBook", async (request, response) => {
  let book = await Book.deleteOne({ author: "barbara" });
  response.send({ message: "successful deletion" });
});

app.listen(5001, () => {
  console.log("Server is listening on 5001");
});
