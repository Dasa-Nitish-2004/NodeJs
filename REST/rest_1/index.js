const express = require("express");
const users = require("../MOCK_DATA.json");
const fs = require("fs");
const app = express();
const port = 8001;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const HTML = `<center>Welcome to my website</center>`;
  res.send(HTML);
});

app.get("/users", (req, res) => {
  const HTML = `${users
    .map(
      (
        user
      ) => `<div style="justify-content: start; display: flex;align-items: center;">
        <img src="${user.img}" style="width:100px;height:100px;border-radius:50%;margin-right: 10px;">
        <h2 style="display:inline;">${user.first_name} ${user.last_name}</h2>
      </div>`
    )
    .join("")}
  </div>`;
  res.send(HTML);
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
const body = req.body;
console.log("Request body:", body);
users.push({...body, id: users.length + 1});
fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
    if (err) {
      console.error("Error writing file:", err);
      res.status(500).send("Internal Server Error");
    } else {
        console.log("File written successfully");
      res.status(201).send(`User created successfully with ID: ${users.length}`);
    }
});
});
  // In a real application, you would handle the request body to create a new user.

// "/api/users/:id" this is used for get, patch, delete operations. inseat of individual specifying. We can merge

app
  .route("/api/users/:id")
  .get((req, res) => {
const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
  })
  .patch((req, res) => {
    res.send(`Patch request for user with ID: ${req.params.id}`);
  })
  .delete((req, res) => {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.send(`User with ID: ${req.params.id} deleted`);
    } else {
      res.status(404).send("User not found");
    }
  });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
