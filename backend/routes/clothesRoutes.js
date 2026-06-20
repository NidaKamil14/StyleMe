const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all clothes
// GET all clothes
router.get("/", (req, res) => {
  console.log("GET /api/clothes hit");

  const sql = "SELECT * FROM clothes";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database Error" });
    }

    console.log("Query successful");

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

// UPDATE clothing item
router.put("/:id", (req, res) => {
  const { item_name, category, color, occasion, image_url } = req.body;

  const sql = `
    UPDATE clothes
    SET item_name = ?, category = ?, color = ?, occasion = ?, image_url = ?
    WHERE cloth_id = ?
  `;

  //Put operation
  db.query(
    sql,
    [item_name, category, color, occasion, image_url, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database Error" });
      }

      res.json({
        message: "Clothing item updated successfully"
      });
    }
  );
});

//Delete operation
// DELETE clothing item
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM clothes WHERE cloth_id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database Error" });
    }

    res.json({
      message: "Clothing item deleted successfully"
    });
  });
});

module.exports = router;