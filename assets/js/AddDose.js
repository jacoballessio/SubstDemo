
window.addEventListener('load', ()=> {
    RefreshSearchList("");
    document.getElementById('submit').addEventListener('click', ()=> {
        let timeValue = document.getElementById("time").value==null||document.getElementById("time").value=="" ? -1 : new Date(document.getElementById("time").value).getTime();
        console.log(timeValue);
        let dose = Doses.StoreDose(DrugSelect.GetSelectedDrugID(), document.getElementById("dose-amount").value, document.getElementById("units").value, timeValue);
        console.log(dose);
    });
    DrugSelect.StartSearchBox();
});

