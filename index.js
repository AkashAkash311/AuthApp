
const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

require("./config/database").connect();

// Routes

const user = require("./routes/user");
app.use("/api/v1", user);


// Activate
app.listen(PORT, () => {
    console.log("Server is running at", PORT);
});

app.get("/", (req, res) => {
    res.send("<h1>Auth App </h1>")
});
// app.get("/api/v1/signup", (req, res) => {
//     res.send("<h1>Auewth App </h1>");
// });
