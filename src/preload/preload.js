const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronApi', {
  addFournisseur: (nom,prenom,rc,rib,nif) => ipcRenderer.invoke('addFournisseur',nom,prenom,rc,rib,nif),
  getAllFournisseurs: () => ipcRenderer.invoke('getAllFournisseurs'),
  createFacture: (options,numeroDossier,doit,numFacPro,productsList,produitOrigin,livraison) => ipcRenderer.invoke('createFacture',options,numeroDossier,doit,numFacPro,productsList,produitOrigin,livraison),
  // getFournisseur: ( channel, callable, event, data ) => ipcRenderer.on( channel, callable( event, data ) )
})