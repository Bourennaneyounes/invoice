const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');

class Database {
  db = null;

  // Constructor
  constructor(){
    try {
      if (!fs.existsSync('db.sqlite')) {
        this.openDB();
        this.createtables();
      }
      else
        this.openDB();
    } catch(err) {
      console.error(err)
      // !TODO 
    }
  }

  // open database
  openDB() {
    this.db = new sqlite3.Database("db.sqlite", (err) => {
      if (err) {
        console.error(err.message);
        // !TODO 
        throw err;
      } else {
        console.log("Connected to the SQLite database.");
      }
    });
  }

  createtables() {
    if(!this.db) return;
    this.db.run(`
      create table fournisseurs(
      id integer not null primary key,
      nom text,
      prenom text,
      rc text,
      rib text,
      nif text)
      `
    );

    this.db.run(`
      create table type_produit(
      id integer not null primary key,
      nom text,
      desc text
      `
    );

    this.db.run(`
      create table factures(
      id integer not null primary key,
      id_fournisseur integer not null,
      foreign key(id_fournisseur) references fournisseurs(id)
      `
    );

    this.db.run(`
      create table produits(
      id integer not null primary key,
      id_facture integer not null,
      id_type integer not null,
      qte integer,
      prix float,
      foreign key(id_facture) references factures(id),
      foreign key(id_type) references type_produit(id)
      `
    );
  }

  addFournisseur(nom, prenom, rc, rib, nif) {
    this.db.run(`
      insert into fournisseurs(nom, prenom, rc, rib, nif) 
      values (?, ?, ?, ?, ?)`,
      [nom, prenom, rc, rib, nif]
    );
  }

  // addproduit(nom, prenom, rc, rib, nif) {
  //   this.db.run(
  //     `
  //     insert into produits(nom, prenom, rc, rib, nif) 
  //     values (?, ?, ?, ?, ?)`,
  //     [nom, prenom, rc, rib, nif]
  //   );
  // }

  getAllFournisseurs() {
    return new Promise((resolve, reject) => {
      let sql = `select * from fournisseurs`; // insert <----
      //   let params = [userid];

      return this.db.all(sql, [], function (err, res) {
        if (err) {
          console.error("db error: insert failed: ", err.message);
          return reject(err.message);
        }
        return resolve(res);
      });
    });
  }

  getFournisseurById(id) {
    return new Promise((resolve, reject) => {
      // return new promise here <---
      //   const userid = uuid4();

      let sql = `select * from fournisseurs where id  = ?`; // insert <----
      //   let params = [userid];

      return this.db.get(sql, [id], function (err, res) {
        // .run <----
        if (err) {
          console.error("db error: select failed: ", err.message);
          return reject(err.message);
        }
        return resolve(res);
      });
    });
  }
}

module.exports = new Database();
