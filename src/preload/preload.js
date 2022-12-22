const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronApi', {
  addFournisseur: (nom,prenom,rc,rib,nif) => ipcRenderer.invoke('addFournisseur',nom,prenom,rc,rib,nif),
  getFournisseur: () => ipcRenderer.invoke('getFournisseur'),
  createFacture: (options,numeroDossier,doit,numFacPro,productsList,produitOrigin,livraison) => ipcRenderer.invoke('createFacture',options,numeroDossier,doit,numFacPro,productsList,produitOrigin,livraison),
  // getFournisseur: ( channel, callable, event, data ) => ipcRenderer.on( channel, callable( event, data ) )

  // receive: (channel, func) => {
  //   let validChannels = ["fromMain"];
  //   if (validChannels.includes(channel)) {
  //       // Deliberately strip event as it includes `sender` 
  //       ipcRenderer.on(channel, (event, ...args) => func(...args));
  //   }}

  // we can also expose variables, not just functions
})