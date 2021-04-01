const Drugs = {
    AddDrug: function(drugName, description = "") {
        this.StoreLocal(drugName, description);
    },
    GetDrugs: function() {
        if(localStorage.getItem('drugs')==null) {
            localStorage.setItem('drugs', "[]");
        }
        return JSON.parse(localStorage.getItem('drugs'));
    },
    IsDuplicate: function() {

    },
    StoreLocal: function(drugName, description = "") {
        let drugs = this.GetDrugs();
        drugs.push({drugName:drugName, description:description, drugID:this.GenerateNewID()});
        localStorage.setItem('drugs', JSON.stringify(drugs));
    },
    StoreCloud: function(drugName, description = "") {
        
    },
    GenerateNewID: function() {
        let drugs = this.GetDrugs();
        return drugs.length;
    },
    GenerateListItems: function() {
        let items = [];
        let drugs = this.GetDrugs();
        drugs.forEach(drug => {
            let item = document.createElement("li");
            item.innerHTML = drug.drugName;
            items.push(item);
        });
        return items;
    },
    FindDrugWithID: function(drugID) {
        let drugs = this.GetDrugs();
        let drug;
        drugs.forEach(element => {
            if(element.drugID == drugID) {
                drug = element;
            }
        });
        return drug;
    }
}