const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all clothes
router.get("/", (req, res) => {
  const sql = "SELECT * FROM clothes";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database Error" });
    }

    res.json(result);
  });
});

// POST new clothing item
router.post("/", (req, res) => {
  const {
    user_id,
    item_name,
    category,
    color,
    occasion,
    image_url
  } = req.body;

  const sql = `
    INSERT INTO clothes
    (user_id, item_name, category, color, occasion, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user_id, item_name, category, color, occasion, image_url],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database Error" });
      }

      res.json({
        message: "Clothing item added successfully",
        cloth_id: result.insertId
      });
    }
  );
});

module.exports = router;