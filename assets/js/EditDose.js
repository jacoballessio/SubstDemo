
window.addEventListener('load', ()=> {
    let params = new URLSearchParams(location.search);
    let scheduleID = params.get('scheduleID');
    document.getElementById('submit').addEventListener('click', ()=> {
        console.log(document.getElementById("time").value);
        let timeValue = document.getElementById("time").value==null||document.getElementById("time").value=="" ? new Date().getTime() : new Date(document.getElementById("time").value).getTime();
        Schedules.SetTimer(scheduleID, timeValue);
    });
});