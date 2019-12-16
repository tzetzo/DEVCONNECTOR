const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect Database
connectDB();

// Init Middleware - to be able to use req.body;
// bodyParser was a separate package but now is included in express
// so no more app.use(bodyParser.json()) but instead:
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running for Tzetzo"));

// Define routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
