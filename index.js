const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// api data
const usersApi = [
  { id: 1, name: "Sabana", email: "sabana@gmail.com", phone: "0178888888" },
  { id: 2, name: "Shabnoor", email: "Shabnoor@gmail.com", phone: "0178888888" },
  {
    id: 3,
    name: "Suchorita",
    email: "Suchorita@gmail.com",
    phone: "0178888888",
  },
  { id: 4, name: "suchonda", email: "suchonda@gmail.com", phone: "0178888888" },
  { id: 5, name: "srabonti", email: "srabonti@gmail.com", phone: "0178888888" },
  { id: 6, name: "sabila", email: "sabila@gmail.com", phone: "0178888888" },
  { id: 7, name: "sohana", email: "sohana@gmail.com", phone: "0178888888" },
];

// now get data from frontend

app.post("/user", (req, res) => {
  const user = req.body;
  user.id = usersApi.length + 1;
  usersApi.push(user);
  res.send(user);
});

// send data to frontend
app.get("/", (req, res) => {
  res.send("Hi, it's shahrear ahamed, now i install nodemon");
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname + "/about.html"));
});

app.get("/users", (req, res) => {
  // show full data without search perameter
  //   res.send(usersApi);

  // with search query by name
  if (req.query.name) {
    const name = req.query.name.toLowerCase();
    const matched = usersApi.filter((u) => u.name.toLowerCase().includes(name));
    res.send(matched);
  } else {
    res.send(usersApi);
  }
});

// get data dynamically
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const user = usersApi.find((u) => u.id == id);
  res.send(user);
  console.log(id);
});

app.listen(port, () => {
  console.log(`Listening.... ${port}`);
});
