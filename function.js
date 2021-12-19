/*
    Funkce načítající data z localStorage;
    Ošetření pokud data v localStorage nejsou;
*/

const getSavedNames = function(){
    const myNames = localStorage.getItem("names")

    if(myNames !== null){
        return JSON.parse(myNames)
    } else {
        return []
    }
}

/*
    Funkce pro použití odesílání formuláře;
    Ukládá  do localStorage jméno z formuláře
*/

const saveNames = function(oneName){
    localStorage.setItem("names", JSON.stringify(oneName))
}

/* 
    Generování HTML struktury, kterou umístíme do stránky   po kliknutí na tlačítko "vypiš"
    + použijeme ji také pro vypsání nových informací z localStorge, když jméno vymažeme pomocí tlačítka "Vymazat..."
*/

const generateHTMLstructure = function(oneName){
    const newDiv = document.createElement("div")
    const newLink = document.createElement("a")
    const button = document.createElement("button")

    // Nastavení mazacího tlačítka
    button.textContent = "vymazat"
    newDiv.appendChild(button)

    button.addEventListener("click", function(event){
        removeNames(names, oneName.id)
        saveNames(names)
        toListAgain()
    })

    // Přiřazení stylu adult(rozlišení věku) a odkazu k vytvořenému HTML prvku newLink
    newLink.textContent = oneName.firstName
    if(oneName.adult === true){
        newLink.classList.add("adult")
    } else {
        newLink.classList.add("no-adult")
    }

    newLink.setAttribute("href",`/edit.html#${oneName.id}`)

    newDiv.appendChild(newLink)
    return newDiv

}

 /*
    Podle ID najdeme index daného jména a pomoci splice ho odstranit
 */

    const removeNames = function(ourNames, id){ // names nahradím ourNmes, abych nepracoval přímo s daty a funkce byla zobecněná.
        const index = ourNames.findIndex(function(nameWantToCheck){
            return nameWantToCheck.id === id
        })

        if(index>-1){
            ourNames.splice(index,1)
        }
    }

/*
Pokud smažeme nějaké jméno z localStorage, tak tato funkce zabezpečí opětovné vypsání (tedy vypsání bez smazání jmen)
*/
const toListAgain = function(){
    document.querySelector(".list-names").innerHTML = ""

    let newData = getSavedNames()

    newData.forEach(function(onlyOneName){
        const newContent = generateHTMLstructure(onlyOneName)
        document.querySelector(".list-names").appendChild(newContent)
    })
}