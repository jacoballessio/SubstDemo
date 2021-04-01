let selectedDrugID;
let today = new Date();
window.addEventListener('load', ()=> {
    RefreshSearchList("");
    document.getElementById('submit').addEventListener('click', ()=> {
        let timeValue = document.getElementById("time").value==null||document.getElementById("time").value=="" ? (-1) : getTodayDateWithTime(document.getElementById("time").value).getTime();
        console.log(getTodayDateWithTime(document.getElementById("time").value).getTime());
        Schedules.StoreSchedule(selectedDrugID, document.getElementById("start-dose").value, document.getElementById("end-dose").value, document.getElementById("dose-type").value, document.getElementById("start-date").value, document.getElementById("end-date").value, timeValue, getSelectedOptions(document.getElementById("days-of-week")));
    });
    let searchBox = document.getElementById("drug-search-input");
    searchBox.addEventListener('input', ()=> {
        RefreshSearchList(searchBox.value);
        console.log(searchBox.value);
    });
});
function RefreshSearchList(searchTerm = "") {
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
        if(selectedDrugID==drug.drugID) {
            element.classList.add("selected-drug");
        } else {
            element.classList.remove("selected-drug");
        }
        if(searchTerm=="" || drug.drugName.toLowerCase().includes(searchTerm.toLowerCase())) {
            listContainer.appendChild(element);
            button.addEventListener('click', ()=> {
                selectedDrugID = drug.drugID;
                RefreshSearchList(searchTerm);
            });
            
        }
    });
    if(searchTerm!="") {
        listContainer.appendChild(addDrugButton);
    }
}

function getSelectedOptions(sel, fn) {
    var opts = [], opt;
    // loop through options in select list
    for (var i=0, len=sel.options.length; i<len; i++) {
        opt = sel.options[i];
        
        // check if selected
        if ( opt.selected ) {
            // add to array of option elements to return from this function
            opts.push(opt.value);
        }
    }
    
    // return array containing references to selected option elements
    return opts;
}

function getTodayDateWithTime(time) {
    let date = new Date();
    date.setHours(time.split(':')[0]);
    date.setMinutes(time.split(':')[1]);
    return date;
}