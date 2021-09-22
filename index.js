const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "data-exams",
});
app.get("/Entites/getChartData", (req, res) => {
  db.query("SELECT * FROM chartdata", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.get("/Entites/getPhrase", (req, res) => {
  db.query("SELECT * FROM value", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//INSERT INTO `value`(`value_name`)
app.post("/Entites/addPhrase", (req, res) => {
  const value = req.body.inputList;
  console.log("POST: " + value);
  db.query(
    "INSERT INTO `value`(`value_name`) VALUES(?) ",
    [value],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.put("/Entites/updatePhrase", (req, res) => {
  const id = req.body.id;
  const newUpdate = req.body.update;
  db.query(
    "UPDATE value SET value_name = ? WHERE id = ?",
    [newUpdate, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//DELETE FROM `value` WHERE `value`.`id` = 2
app.delete("/Entites/deletePhrase/:id", (req, res) => {
  const id = req.params.id;
  //console.log("-----this id----"+id);
  db.query("DELETE FROM `value` WHERE `value`.`id` = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
