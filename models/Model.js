const sql = require("./db.js");

// constructor
const bier = function(bier) {
  this.biertje = bier.bierjte;
  this.procent = bier.procent;
  this.brouwer = bier.brouwer;
};

bier.create = (biertje, result) => {
  sql.query("INSERT INTO bier SET ?", bierjte, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created bier: ", { id: res.insertId, ...newBier });
    result(null, { id: res.insertId, ...newBier });
  });
};

bier.findById = (id, result) => {
  sql.query(`SELECT * FROM bier WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found bier: ", res[0]);
      result(null, res[0]);
      return;
    }

    
    result({ kind: "not_found" }, null);
  });
};

bier.getAll = (biertje, result) => {
  let query = "SELECT * FROM bier";

  if (biertje) {
    query += ` WHERE biertje LIKE '%${biertje}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bier: ", res);
    result(null, res);
  });
};

bier.getAllPublished = result => {
  sql.query("SELECT * FROM bier WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bier: ", res);
    result(null, res);
  });
};

bier.updateById = (id, bier, result) => {
  sql.query(
    "UPDATE bier SET biertje = ?, procent = ?, brouwer = ? WHERE id = ?",
    [bier.biertje, bier.procent, bier.brouwer, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated bier: ", { id: id, ...bier });
      result(null, { id: id, ...bier });
    }
  );
};

bier.remove = (id, result) => {
  sql.query("DELETE FROM bier WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted bier with id: ", id);
    result(null, res);
  });
};

bier.removeAll = result => {
  sql.query("DELETE FROM bier", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Bier`);
    result(null, res);
  });
};

module.exports = bier;