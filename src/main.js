const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const easyinvoice = require('easyinvoice');
const fs = require('fs');
const db = require('./db/Database');

// close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });


const data = {
  // Customize enables you to provide your own templates
  // Please review the documentation for instructions and examples
  "customize": {
       "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
  },
  "images": {
      // The logo on top of your invoice
      // "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
      "logo": fs.readFileSync('./public/images/ETS logo.JPG', 'base64'),
      // The invoice background
      // "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
  },
  // Your own data
  "sender": {
      // "RC": "Sample Corp",
      // "RIB": "Sample Street 123",
      // "NIF": "1234 AB",
      // "Doit": "Sampletown",
      // "country": "Samplecountry"
      "custom1": "28/00-2834092A04",
      "custom2": "001007080300000591/25",
      "custom3": "197134020067630",
      // "custom4": "ENAFOR HMD"
  },
  // Your recipient
  "client": {
      "company": "Client Corp",
      // "address": "Clientstreet 456",
      // "zip": "4567 CD",
      // "city": "Clientcity",
      // "country": "Clientcountry"
      // "custom1": "custom value 1",
      // "custom2": "custom value 2",
      // "custom3": "custom value 3"
  },
  "information": {
      // Invoice number
      "number": "",
      // // Invoice data
      "date": "",
      // // Invoice due date
      // "due-date": "31-12-2021"
  },
  // The products you would like to see on your invoice
  // Total values are being calculated automatically
  "products": [
      // {
      //     "quantity": 2,
      //     "description": "Product 1",
      //     "tax-rate": 6,
      //     "price": 33.87
      // },
      // {
      //     "quantity": 4.1,
      //     "description": "Product 2",
      //     "tax-rate": 6,
      //     "price": 12.34
      // },
      // {
      //     "quantity": 4.5678,
      //     "description": "Product 3",
      //     "tax-rate": 21,
      //     "price": 6324.453456
      // }
  ],
  // The message you would like to display on the bottom of your invoice
  "bottom-notice": "Kindly pay your invoice within 15 days.",
  // Settings to customize your invoice
  "settings": {
      "currency": "DZD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
      // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
      // "tax-notation": "gst", // Defaults to 'vat'
      // "margin-top": 25, // Defaults to '25'
      // "margin-right": 25, // Defaults to '25'
      // "margin-left": 25, // Defaults to '25'
      // "margin-bottom": 25, // Defaults to '25'
      // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
      // "height": "1000px", // allowed units: mm, cm, in, px
      // "width": "500px", // allowed units: mm, cm, in, px
      // "orientation": "landscape", // portrait or landscape, defaults to portrait
  },
  // Translate your invoice to your preferred language
  "translate": {
      "invoice": "DOSSIER N22S458 ENAFOR",  // Default to 'INVOICE'
      // "number": "Nummer", // Defaults to 'Number'
      // "date": "Datum", // Default to 'Date'
      // "due-date": "Verloopdatum", // Defaults to 'Due Date'
      // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
      // "products": "Producten", // Defaults to 'Products'
      // "quantity": "Aantal", // Default to 'Quantity'
      // "price": "Prijs", // Defaults to 'Price'
      // "product-total": "Totaal", // Defaults to 'Total'
      // "total": "Totaal" // Defaults to 'Total'
  },
};


ipcMain.handle('createFacture', async (e,options,numeroDossier,doit,numFacPro,productsList,produitOrigin,livraison) => {
  const row = await db.selectFournisseur(options)
    data.sender.custom1 = row.rc
    data.sender.custom2 = row.rib
    data.sender.custom3 = row.nif
    data.client.company = doit
    data.information.number = numFacPro
    data.information.date = livraison + " jours"

    productsList.forEach(p => {
      console.log("qunatity ===== " +p.quantite)
      let produit = {
        "quantity": p.quantite,
        "description": p.designation,
        // "tax-rate": 6,
        "price": p.prixUht
    }
    data.products.push(produit)
    });
    data.translate.invoice = numeroDossier

    // console.log("im herrrrrrrrrrrrrrre1")



       //Create your invoice! Easy!
       easyinvoice.createInvoice(data, function (result) {
        if(result){
            // console.log("im herrrrrrrrrrrrrrre2")
            fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
        }
        //The response will contain a base64 encoded PDF file
        // console.log('PDF base64 string: ', result.pdf);
        
      });
  console.log(options);
  console.log(numeroDossier);
  console.log(doit);
  console.log(numFacPro);
  console.log(productsList);
  console.log(produitOrigin);
  console.log(livraison);
  // db.addFournisseur(nom,prenom,rc,rib,nif)
  // console.log("hiii : " + nom + " " + prenom + " " + email)
  // db.getAllFournisseurs();
  // db.getAllFournisseurs()
  // db.db.get("SELECT * FROM FOURNISSEURS")
  // console.log(db.db.get(".tables"))
});
const createWindow = () => {
  const win = new BrowserWindow({
    width:  1280,
    height: 1200,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, './preload/preload.js')
    }
  });

  // handlers
  ipcMain.handle('addFournisseur', (e,nom,prenom,rc,rib,nif) => {
    db.addFournisseur(nom,prenom,rc,rib,nif)
    // console.log("hiii : " + nom + " " + prenom + " " + email)
    // db.getAllFournisseurs();
    // db.getAllFournisseurs()
    // db.db.get("SELECT * FROM FOURNISSEURS")
    // console.log(db.db.get(".tables"))
  });
  
  // ipcMain.handle('getFournisseur', () => 'hellllo'
    // db.addFournisseur(nom,prenom,rc,rib,nif)
  ipcMain.handle('getFournisseur',async () => {
    const result = await db.getAllFournisseurs()
    return result
    // console.log(result);
  })
    
  // );
  // db.db.all(`SELECT * FROM FOURNISSEURS`, [], (err, rows) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(rows)
  //   // win.webContents.send( 'getFournisseur', rows );
  //   // return rows
  //   rows.forEach((row) => {
  //   //   console.log(row);
  //   });
  // });
    


  win.loadFile('./renderer/index.html')
  // db.createTables()
  
  // db.getAllFournisseurs();
  
    // let sql = `SELECT id id, Nom name FROM FOURNISSEURS WHERE id  = ?`;
    

  // row = db.getOneFournisseur(1)
  // fors.forEach((row) => {
  //     console.log(row);
  //   });
  // console.log(row)
}
// ipcMain.on("toMain", (event, args) => {
//   // fs.readFile("path/to/file", (error, data) => {
//     // Do something with file contents

//     // Send result back to renderer process
//     win.webContents.send("fromMain", "responseObj");
//   // });
// });

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// db.getAllFournisseurs()