const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { full_name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
    [full_name, email, hashedPassword],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Signup failed",
        });
      }

      res.json({
        message: "User registered successfully!",
      });
    }
  );
});

router.post("/login", (req, res) => {
    console.log("Login route hit!");
    const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Server error",
        });
      }

      if (results.length === 0) {
        return res.json({
          message: "User not found",
        });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(
        password,
        user.password
    );
    if (!isMatch) {
        return res.json({
            message: "Incorrect password",
    });
}

res.json({
    message: "Login successful!",
    user_id: user.user_id
});
    }
  );
});
module.exports = router;