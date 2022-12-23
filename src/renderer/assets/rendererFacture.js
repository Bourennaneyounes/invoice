const element = document.getElementById("navItem")
// console.log(element)
element.addEventListener('click', (event) => {
    // if(event.target.id)
    // const element = document.getElementById("navItem").children.length
    for(let i=0;i<element.children.length;i++){
        if(element.children[i].classList.toString()==="active"){
            console.log(element.children[i].classList.remove("active"))
        }
    }
    const navElement = document.getElementById(event.path[1].id)
    if(navElement.classList.toString()===""){
        navElement.classList.add("active")
    }
  })

  const initOptions = async () => {
    let options = document.getElementById("options");
    options.innerHTML=""
    let optionList = await window.electronApi.getFournisseur();
    // console.log(optionList);
    optionList.forEach((row) =>{
        let op = document.createElement("option");
        op.innerText = row.nom
        op.value = row.id
        op.className = "option";
        options.appendChild(op)
    })
  }

  initOptions()
  let initnumberProduct = 1
  const addProduct = async () => {
    // let deleteBtn = document.getElementById("deleteProduct");
    // deleteBtn.remove(deleteBtn);
    initnumberProduct = initnumberProduct +1
    let productsList = document.getElementById("productsList");
    // options.innerHTML=""
    // let optionList = await window.electronApi.getFournisseur();
    // console.log(optionList);
    // optionList.forEach((row) =>{
        let productItem = document.createElement("div");
        productItem.className = "products"
        productItem.id = "products"+initnumberProduct




        let labelItem = document.createElement("label");
        labelItem.innerText = initnumberProduct 
        // label.value = row.id
        labelItem.className = "product-label form-label";
        labelItem.htmlFor = "product " + initnumberProduct;
        
        let designationItem = document.createElement("input");
        designationItem.type = "text"
        designationItem.className = "product form-control"; 
        designationItem.id = "designation" + initnumberProduct
        designationItem.placeholder = "designation" 
        designationItem.required = true;
        
        let quantiteItem = document.createElement("input");
        quantiteItem.type = "number"
        quantiteItem.className = "product form-control"; 
        quantiteItem.id = "quantite" + initnumberProduct
        quantiteItem.placeholder = "quantite" 
        quantiteItem.required = true;

        let umItem = document.createElement("input");
        umItem.type = "text"
        umItem.className = "product form-control"; 
        umItem.id = "um" + initnumberProduct
        umItem.placeholder = "um" 
        umItem.required = true;

        let prixUhtItem = document.createElement("input");
        prixUhtItem.type = "number"
        prixUhtItem.className = "product form-control"; 
        prixUhtItem.id = "prixUht" + initnumberProduct
        prixUhtItem.placeholder = "PRIX UHT DZ" 
        prixUhtItem.required = true;

        // <button type="button" class="delete-btn btn btn-cancel" id="deleteProduct" >-</button>
        // let deletetBtn = document.createElement("button");
        // deletetBtn.type = "button"
        // deletetBtn.innerText = "-"
        // deletetBtn.className = "delete-btn btn btn-cancel"; 
        // deletetBtn.id = "deleteProduct"+initnumberProduct
        


        productItem.appendChild(labelItem)
        productItem.appendChild(designationItem)
        productItem.appendChild(quantiteItem)
        productItem.appendChild(umItem)
        productItem.appendChild(prixUhtItem)
        // productItem.appendChild(deletetBtn)

        productsList.appendChild(productItem)
    // })
  }
  const deleteProduct = async () => {
    // console.log(e);
    
    let productItem = document.getElementById("products"+initnumberProduct);
    if(productItem){
        productItem.parentNode.removeChild(productItem)
        initnumberProduct = initnumberProduct -1
    } 
    
    // var div = document.getElementById("level1");
    // div.parentNode.removeChild(div);
    
    
    // })
  }

  document.getElementById("addProduct").addEventListener("click",() => addProduct())
  document.getElementById("deleteProduct").addEventListener("click",() => deleteProduct())
//   window.electronApi.getFournisseur( 'getFournisseur', ( event, data ) => function( event, data ) {
//     console.log( data )
    
//     data.forEach((row) => {
//           console.log(row.nom);
//         optionList.push(row.nom)
//         });
    
// });

  
//   let optionList = ["San Francisco", "Los Angeles", "New York", "Las Vegas", "Miami", "Houston", "Seattle"];
  
//   let button = document.getElementById("button");
  
//   let isOpen = false;
  
  
//   options.addEventListener("click", addToUIOptions);
  
  
//   function addToUIOptions(e) {
//       if (e.target.classList.contains("hide-option")) {
//           controlOptions(e);
//       }
//       else {
//           const pickedOption = e.target;
  
//           if (options.firstElementChild.classList.contains("hide-option")) {
//               options.removeChild(options.firstElementChild);
//           }
//           options.insertAdjacentElement("afterbegin", pickedOption);
  
//           deleteOptions();
//           controlOptions(e);
//       }
//   }
  
//   function controlOptions(e) {
//       if (isOpen === false) {
//           createOptions();
//           options.classList.add("opened");
//           isOpen = true;
//       }
//       else {
//           deleteOptions();
//           options.classList.remove("opened");
//           isOpen = false;
//       }
//   }
  
//   function deleteOptions() {
//       while (options.childElementCount > 1) {
//           options.removeChild(options.lastElementChild);
//       }
//   }
  
//   function createOptions() {
//       optionList.forEach(element => {
//           if (options.firstElementChild.textContent !== element) {
//               let option = document.createElement("div");
//               option.className = "option";
//               option.textContent = element;
  
//               options.firstElementChild.insertAdjacentElement("afterend", option);
//           }
//       });
//   };

    // <input type="text" class="product form-control" id="designation" placeholder="designation" required></input>
        // <input type="text" class="product form-control" id="quantite1" placeholder="quantite" required>
        // <input type="text" class="product form-control" id="um1" placeholder="UM" required>
        // <input type="text" class="product form-control" id="prixUht1" placeholder="PRIX UHT DZ" required></input>
        
  document.getElementById("subFacture").addEventListener("click",() => {
    const  optionsValue = document.getElementById("options").value;
    const  numeroDossierValue = document.getElementById("numeroDossier").value;
    const  doitValue = document.getElementById("doit").value;
    const  numFacProValue = document.getElementById("numeroFactureProforma").value;
    // console.log(optionsValue);
    // console.log(numeroDossierValue);
    // console.log(doitValue);
    // console.log(numFacProValue);
    let productsValue =[]
    for(var i=1;i<=initnumberProduct;i++){
        let designationValue = document.getElementById("designation"+i).value;
        let quantiteValue = document.getElementById("quantite"+i).valueAsNumber;
        let umValue = document.getElementById("um"+i).value;
        let prixUhtValue = document.getElementById("prixUht"+i).valueAsNumber;
        const product = { id:i,
                    designation:designationValue,
                    quantite:quantiteValue,
                    um:umValue,
                    prixUht:prixUhtValue}
        productsValue.push(product)
    }
    // console.log(productsValue);
    const  produitOriginValue = document.getElementById("produitOrigine").value;
    const  livraisonValue = document.getElementById("livraison").value;
    // console.log(produitOriginValue);
    // console.log(livraisonValue);
    // const  nifValue = document.getElementById("nif").value;
    window.electronApi.createFacture(optionsValue,numeroDossierValue,doitValue,numFacProValue,productsValue,produitOriginValue,livraisonValue);
})