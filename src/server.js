const express = require("express");

const app = express();

//HTTP Verbs - GET, POST, PUT, DELETE

// const response = await fetch("http://someaddress.com"); //sends GET request

// HTTP Verb GET

const fakeArr = [];

app.use(express.json());

app.get("/getAllBooks", (request, response) => {
  response.send({ message: "success", fakeArr: fakeArr });
});

app.post("/addBook", (request, response) => {
  fakeArr.push(request.body);
  console.log(fakeArr);
  response.send({ message: "success", newBook: fakeArr[fakeArr.length - 1] });
});

app.listen(5001, () => {
  console.log("Server is listening on 5001");
});
