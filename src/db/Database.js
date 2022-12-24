const sqlite3 = require('sqlite3').verbose();

class Database{
    // open database
    db = new sqlite3.Database("db.sqlite", (err) => {
        if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
        } else {
        console.log("Connected to the SQLite database.");
        }
    });
    
    createTables(){
        this.db.run(`CREATE TABLE FOURNISSEURS(
            id INTEGER NOT NULL PRIMARY KEY,
            nom TEXT,
            prenom TEXT,
            rc TEXT,
            rib TEXT,
            nif TEXT)`
        );
    
    };

    addFournisseur(nom, prenom,rc,rib,nif){
        this.db.run(`
            INSERT INTO FOURNISSEURS(nom, prenom, rc, rib, nif) 
            VALUES (?, ?, ?, ?, ?)`,
            [nom, prenom, rc, rib, nif]
        );
    };

    addProduit(nom, prenom,rc,rib,nif){
      this.db.run(`
          INSERT INTO Produits(nom, prenom, rc, rib, nif) 
          VALUES (?, ?, ?, ?, ?)`,
          [nom, prenom, rc, rib, nif]
      );
  };

    // getAllFournisseurs(){
    //     let sql = `SELECT * FROM FOURNISSEURS`;
    //     this.db.all(sql, [], (err, rows) => {
    //         if (err) {
    //           throw err;
    //         }
    //         // console.log(rows)
    //         rows.forEach((row) => {
    //         //   console.log(row);
    //         });
    //       });
    // }

    getAllFournisseurs() {
        return new Promise((resolve, reject) => {          // return new Promise here <---
        //   const userId = uuid4();
      
          let sql = `SELECT * FROM FOURNISSEURS`;    // INSERT <----
        //   let params = [userId];
      
          return this.db.all(sql,[], function (err, res) { // .run <----
            if (err) {
              console.error("DB Error: Insert failed: ", err.message);
              return reject(err.message);
            }
            return resolve(res);
          });
        });
      }
      selectFournisseur(options) {
        return new Promise((resolve, reject) => {          // return new Promise here <---
        //   const userId = uuid4();
      
          let sql = `SELECT id id, Nom name, RC rc, RIB rib, NIF nif FROM FOURNISSEURS WHERE id  = ?`;    // INSERT <----
        //   let params = [userId];
      
          return this.db.get(sql,[options], function (err, res) { // .run <----
            if (err) {
              console.error("DB Error: select failed: ", err.message);
              return reject(err.message);
            }
            return resolve(res);
          });
        });
      }
    // getOneFournisseur(id){
    //     let sql = `SELECT id id, Nom name FROM FOURNISSEURS WHERE id  = ?`;
    //     this.db.get(sql, [id], (err, row) => {
    //         if (err) {
    //           throw err;
    //         }
            
    //         return row
    //         // ? console.log(row.id, row.name)
    //         // : console.log(`No playlist found with the id ${id}`);
            
    //       });
    // }
    

    // async getAllFournisseurs(){
    //     const rows = await this.db.run("SELECT * FROM FOURNISSEURS");
    //     console.log(rows);
    // }

};

module.exports = new Database();