const DrugSelect = {
    selectedDrugID: 0,
    StartSearchBox: function() {
        let searchBox = document.getElementById("drug-search-input");
        searchBox.addEventListener('input', ()=> {
            RefreshSearchList(searchBox.value);
            console.log(searchBox.value);
        });
    },
    RefreshSearchList: function(searchTerm = "") {
        let listItems = Drugs.GetDrugs();
        let listContainer = document.getElementById("drug-search-list");
        let addDrugButton = document.createElement("button");
        addDrugButton.innerHTML = "Add " + searchTerm + " to drug list";
        addDrugButton.addEventListener("click", ()=> {
            Drugs.AddDrug(searchTerm);
        });
        listContainer.innerHTML = "";
        listItems.forEach(drug => {
            let element = document.createElement("li");
            let button = document.createElement("button");
            element.appendChild(button);
            button.innerHTML = drug.drugName;
            button.type = "button";
            if(this.selectedDrugID==drug.drugID) {
                element.classList.add("selected-drug");
            } else {
                element.classList.remove("selected-drug");
            }
            if(searchTerm=="" || drug.drugName.toLowerCase().includes(searchTerm.toLowerCase())) {
                listContainer.appendChild(element);
                button.addEventListener('click', ()=> {
                    this.selectedDrugID = drug.drugID;
                    RefreshSearchList(searchTerm);
                });
                
            }
        });
        if(searchTerm!="") {
            listContainer.appendChild(addDrugButton);
        }
    },
    GetSelectedDrugID: function() {
        return this.selectedDrugID;
    }
}