const Doses = {
    StoreDose: function(drugID, doseAmount, doseType, dateTimeTakenMilis=-1) {
        //Once user preferences are set up we will use a "local" or "cloud storage" preference to choose between storing with the StoreLocal function vs the StoreCloud.
        return this.StoreLocal(drugID, doseAmount, doseType, dateTimeTakenMilis);
    },
    StoreLocal: function(drugID, doseAmount, doseType, dateTimeTakenMilis=-1) {
        let doses = this.GetDoses();
        let newDose = this.FormatDose(drugID, doseAmount, doseType, null, dateTimeTakenMilis);
        doses.push(newDose);
        localStorage.setItem('doses', JSON.stringify(doses));
        return newDose;
    },
    StoreCloud: function(drugID, doseAmount, doseType, dateTime, dateTimeTakenMilis=-1) {

    },
    GetDoses: function() {
        if(localStorage.getItem('doses')==null) {
            localStorage.setItem('doses', "[]");
        }
        let doses = JSON.parse(localStorage.getItem('doses')).concat(Schedules.GenerateTodaysDoses());
        console.log(doses);
        return JSON.parse(localStorage.getItem('doses')).concat(Schedules.GenerateTodaysDoses());
    },
    GetNewDoseID: function() {
        if(localStorage.getItem('current-schedule-id')==null) {
            localStorage.setItem('current-schedule-id', "0");
        }
        let id = JSON.parse(localStorage.getItem('current-schedule-id'));
        localStorage.setItem('current-schedule-id', id+1);
        return id;
    },
    SetTimer: function(dateTimeTakenMilis, doseID) {
        let doses = this.GetDoses();
        let dose = doses[this.FindIndexOfDoseID(doseID, doses)];
        dose.dateTimeTakenMilis = dateTimeTakenMilis;
        localStorage.setItem('doses', JSON.stringify(doses));
    },
    FindIndexOfDoseID: function(doseID, doseList) {
        let doses = doseList;
        let index = -1;
        for(let i = 0; i < doses.length; i++) {
            if(doses[i].doseID == doseID) {
                index = i;
            }
        }
        return index;
    },
    FormatDose: function(drugID, doseAmount, doseType, scheduledDateTimeMilis, dateTimeTakenMilis) {
        return {drugID:drugID, doseAmount:doseAmount, doseType:doseType, scheduledDateTimeMilis:scheduledDateTimeMilis, dateTimeTakenMilis:dateTimeTakenMilis, doseID:this.GetNewDoseID()};
    },
    AppendDoseCards: function(container) {
        let doses = Doses.GetDoses();
        console.log(doses);
        doses.forEach(element => {
            console.log(element.scheduledDateTimeMilis);
            container.appendChild(new DoseCard(Drugs.FindDrugWithID(element.drugID).drugName, element.drugID, element.scheduledDateTimeMilis, element.dateTimeTakenMilis, element.doseID).generateCard());
        });
    },
    RemoveTimer: function(doseID) {
        this.SetTimer(-1, doseID);
        this.RemoveDose(doseID);
    },
    RemoveDose: function(doseID) {
        let doses = this.GetDoses();
        doses.splice(this.FindIndexOfDoseID(doseID, doses), 1);
        localStorage.setItem('doses', JSON.stringify(doses));
    }
}