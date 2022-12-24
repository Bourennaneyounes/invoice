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

//   let options = document.getElementById("options");
//   let optionList = ["San Francisco","alger"];
//   async function func (optionList) {
//     await window.electronApi.getFournisseur( 'getFournisseur', ( event, data ) => function( event, data ) {
//         // console.log( data )
        
//         data.forEach((row) => {
//             //   console.log(row.nom);
//             optionList.push(row.nom)
//             });
//             alert(optionList)
//             // console.log( optionList )
//             // return optionList
        
//     });
//     // console.log(response) // Affichera 'pong'
//   }
  
// func()
//   alert(hi)
//   window.electronApi.getFournisseur( 'getFournisseur', ( event, data ) => function( event, data ) {
//     // console.log( data )
    
//     data.forEach((row) => {
//           console.log(row.nom);
//         optionList.push(row.nom)
//         });
//         console.log( optionList )
    
// });

// console.log( optionList )
  
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

//   window.electronApi.getFournisseur( 'getFournisseur', ( event, data ) => function( event, data ) {
//     console.log( data )
    
//     // data.forEach((row) => {
//     //       console.log(row.nom);
//     //     // optionList.push(row.nom)
//     //     });
    
// });
//   console.log(window.electronApi.getFournisseur())
  
// const response = window.electronApi.getFournisseur()
// console.log(response) // Affichera 'pong'
// window.api.receive("fromMain", (data) => {
//     console.log(`Received ${data} from main process`);
// });
  document.getElementById("sub").addEventListener("click",async() => {
    // !todo check if valid input and not empty
    const  nomValue = document.getElementById("nom").value;
    const  prenomValue = document.getElementById("prenom").value;
    const  rcValue = document.getElementById("rc").value;
    const  ribValue = document.getElementById("rib").value;
    const  nifValue = document.getElementById("nif").value;
    await window.electronApi.addFournisseur(nomValue,prenomValue,rcValue,ribValue,nifValue);
    const list = await window.electronApi.getAllFournisseurs();
    console.log(list);
})