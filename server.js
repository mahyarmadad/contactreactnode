const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();
app.get('/', (req, res) => res.send('Hello World!'));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => console.log(`Server app Started on port ${PORT}!`))