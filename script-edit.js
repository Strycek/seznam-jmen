let nameID = location.hash.substring(1)
let names = getSavedNames() // přístup přes funkce k jménům v localstorage

/*
    Najít editované jméno
*/

let searchedName = names.find(function(oneObject){
    return oneObject.id === nameID
    
})

if (searchedName === undefined){
    location.assign("/index.html")
}

/*
    Přístup k formuláři a inputu v edit.html
*/

document.querySelector("#editit-name").value = searchedName.firstName

let changingForm = document.querySelector("#changing-form")
changingForm.addEventListener("submit", function(event){
    event.preventDefault()

    searchedName.firstName = event.target.elements.changingName.value

    saveNames(names)

    document.querySelector("#editit-name").value = ""
})

window.addEventListener("storage", function(event){
    console.log(event)

    if(event.key === "names"){
        names = JSON.parse(event.newValue)
    }

    let searchedName = names.find(function(oneObject){
        return oneObject.id === nameID
        
    })
    
    if (searchedName === undefined){
        location.assign("/index.html")
    }
    
    document.querySelector("#editit-name").value = searchedName.firstName

})
