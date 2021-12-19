/*
    Načtení dat z localStorage do constanty "names"; pokud je localStorage prázdný, tak se do "names" uloží prázdné pole
*/
const names = getSavedNames()

/*
    Odeslání formuláře vytvoření objektu přiřazení vlastností a uložení do localStorage pomocí constanty "names"
*/

let myForm = document.querySelector("#test-form")
let myCheckbox = document.querySelector(".my-checkbox")

myForm.addEventListener("submit", function(event){
    event.preventDefault()

    names.push({
        id: uuidv4(), // Přidaná stažená funkce pro vytváření ID - soubor "uuidv4.js"
        firstName: event.target.elements.firstName.value,
        adult: myCheckbox.checked
    })
    event.target.elements.firstName.value =""
    myCheckbox.checked = false
    saveNames(names)
})

/*
    Vypsání zpět do stránky
*/

let buttonToList = document.querySelector(".to-list")
buttonToList.addEventListener("click", function(event){

    document.querySelector(".list-names").innerHTML = "" //zabrání opětovnému vypsání, pokud klikneme vícekrát po sobě na vypiš (první se provede promazání div - "list-name")

    // přístup k localStorage a položkám names
    let namesFromStorage = localStorage.getItem("names")
    let namesFromStorageJSON = JSON.parse(namesFromStorage)

    // vytvoření HTML struktury naplněné informacemi z localStorage
    namesFromStorageJSON.forEach(function(myName){
        const oneNameHTML = generateHTMLstructure(myName)
        document.querySelector(".list-names").appendChild(oneNameHTML)
    })
})

/*
    znovu načtení stránky na základě storage dělá lokation.reload().
*/

window.addEventListener("storage", function(event){
    location.reload()
})

