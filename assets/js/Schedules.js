const IsToday = (someDate) => {
        
    const today = new Date();
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
}

const Schedules = {
    StoreSchedule: function(drugID, startDose, endDose, doseType, startDate, endDate, time, daysOfWeek, dateTimeTakenMilis=-1) {
        //Once user preferences are set up we will use a "local" or "cloud storage" preference to choose between storing with the StoreLocal function vs the StoreCloud.
        return this.StoreLocal(drugID, startDose, endDose, doseType, startDate, endDate, time, daysOfWeek, dateTimeTakenMilis);
    },
    StoreLocal: function(drugID, startDose, endDose, doseType, startDate, endDate, time, daysOfWeek, dateTimeTakenMilis = -1) {
        let schedules = this.GetSchedules();
        let newSchedule = {drugID:drugID, startDose:startDose, endDose:endDose, startDate:startDate, doseType:doseType, endDate:endDate, time:time, daysOfWeek:daysOfWeek, dateTimeTakenMilis:dateTimeTakenMilis, scheduleID:this.GetNewScheduleID()};
        schedules.push(newSchedule);
        localStorage.setItem('schedules', JSON.stringify(schedules));
        return newSchedule;
    },
    StoreCloud: function(drugID, startDose, endDose, startDate, doseType, endDate, time, daysOfWeek, dateTimeTakenMilis=-1) {

    },
    GetSchedules: function() {
        if(localStorage.getItem('schedules')==null) {
            localStorage.setItem('schedules', "[]");
        }
        return JSON.parse(localStorage.getItem('schedules'));
    },
    GenerateTodaysDoses: function() {
        let schedules = this.GetSchedules();
        let todaysSchedules = [];
        i = 0;
        schedules.forEach(schedule=> {
            
            if(this.ScheduleIncludesToday(schedule)) {
                todaysSchedules.push(Doses.FormatDose(schedule.drugID, this.CalculateDoseAmount(schedule), schedule.doseType, schedule.time));
            }
            i++;
        });
        return todaysSchedules;
        
    },
    CalculateDoseAmount: function(schedule) {
        return -1;//temp value. change when possible.
    },
    ScheduleIncludesToday: function(schedule) {
        let dates = this.GetScheduleDates(schedule);
        let result = false;
        dates.forEach(date => {
            if(IsToday(date)) {
                result = true;
            }
            
        });
        return result;
    },
    GetScheduleDates: function(schedule) {
        let daysOfWeek = schedule.daysOfWeek;
        let startDate = new Date(schedule.startDate);
        let endDate = new Date(schedule.endDate);
        let startDayOfWeek = startDate.getDay();
        let dates = [];
        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        daysOfWeek.forEach(day => {
            let numberOfDaysFromStartDate = (day-startDayOfWeek)+7;//adding 7 to make it the first instance of that day past the startDate
            if(numberOfDaysFromStartDate==7) {
                numberOfDaysFromStartDate=0;
            }
            console.log(numberOfDaysFromStartDate);
            let firstDate = new Date(startDate);
            firstDate = firstDate.addDays(numberOfDaysFromStartDate);
            let currentDate = new Date(firstDate);
            while(this.dateIsBetween(startDate, endDate, currentDate)) {
                dates.push(currentDate);
                currentDate = currentDate.addDays(7);
            }
        });
        return dates;
        
    },
    dateIsBetween: function(from,to,check) {

        var fDate,lDate,cDate;
        fDate = Date.parse(from);
        lDate = Date.parse(to);
        cDate = Date.parse(check);
    
        if((cDate <= lDate && cDate >= fDate)) {
            return true;
        }
        return false;
    },
    GetNewScheduleID: function() {
        if(localStorage.getItem('current-schedule-id')==null) {
            localStorage.setItem('current-schedule-id', "0");
        }
        let id = JSON.parse(localStorage.getItem('current-schedule-id'));
        localStorage.setItem('current-schedule-id', id+1);
        return id;
    },
    SetTimer: function(scheduledDateTimeMilis, scheduleID) {
        /*
        let doses = this.GenerateTodaysDoses();
        let dose = doses[this.FindIndexOfDoseID(doseID, doses)];
        dose.scheduledDateTimeMilis = scheduledDateTimeMilis;
        localStorage.setItem('doses', JSON.stringify(doses));
        */
    }
}

class DoseCard{
    drugName;
    drugID;
    scheduledTime;
    dateTimeTakenMilis;
    doseID;
    
    constructor(drugName, drugID, scheduledTime, dateTimeTakenMilis = -1, doseID) {
        this.drugName = drugName;
        this.drugID = drugID;
        this.scheduledTime = scheduledTime;
        this.dateTimeTakenMilis = dateTimeTakenMilis;
        this.doseID = doseID;
    }

    hasTaken() {
        return this.dateTimeTakenMilis!=-1;
    }

    generateCard() {
        let card = document.createElement('div');
        let body = document.createElement('div');
        let icon = document.createElement('img');
        let title = document.createElement('h1');
        let time = document.createElement('h1');//This time will be the scheduled time until the dose is taken. Once taken, this time will show the time it was taken along with a prefix saying "took - " 
        let secondBody = document.createElement('div');
        let SetTimerButton = document.createElement('button');
        let editButton = document.createElement('button');
        let removeButton = document.createElement('button');
        editButton.innerHTML = "edit";
        removeButton.innerHTML = "remove";
        editButton.addEventListener('click', ()=> {
            window.location = '/edit_dose.html?doseID='+this.doseID; 
        });
        removeButton.addEventListener('click', ()=> {
            Doses.RemoveTimer(this.doseID);
        });
        body.addEventListener('click', ()=> {
            if(secondBody.style.display!="block") {
                secondBody.style.display = "block";
            } else {
                secondBody.style.display = "none";
            }
        })
        console.log(this.dateTimeTakenMilis);
        if(!this.hasTaken()) {
            secondBody.appendChild(SetTimerButton);
            time.innerHTML = this.getFormatedTime(new Date(this.scheduledTime));
            SetTimerButton.addEventListener('click', ()=> {
                let currentTimeMilis = new Date().getTime();
                Schedules.SetTimer(currentTimeMilis, this.doseID);//change this to work with schedules and doses
                this.dateTimeTakenMilis = currentTimeMilis;
                this.startTimer(secondBody);
                this.displayTimeTaken(time);
            });
        } else {
            this.startTimer(secondBody);
            this.displayTimeTaken(time);
        }
        secondBody.appendChild(editButton);
        secondBody.appendChild(removeButton);
        body.className = "schedule-card-body";
        secondBody.className = "schedule-card-second-body"
        card.className = "schedule-card";
        title.className = "schedule-card-title";
        time.className = "schedule-card-time";
        icon.className = "schedule-card-icon";
        SetTimerButton.className = "schedule-card-take-button";
        SetTimerButton.innerHTML = "Take Dose";
        title.innerHTML = this.drugName;
        icon.src = "alarm-24px.svg";
        card.appendChild(body);
        card.appendChild(secondBody);
        body.appendChild(icon);
        body.appendChild(title);
        body.appendChild(time);
        return card;
    }

    startTimer(container) {
        let textEl = document.createElement("h2");
        let timerInterval = setInterval(()=> {
            let currentTimeMilis = new Date().getTime();
            let timeDiff = currentTimeMilis - this.dateTimeTakenMilis;
            textEl.innerHTML = this.formatTime(timeDiff);
        }, 200);
        container.appendChild(textEl);
    }

    formatTime(time) {
        let dateObj = new Date(time);
        let hours = dateObj.getUTCHours();
        let minutes = dateObj.getUTCMinutes();
        let seconds = dateObj.getSeconds();
        let timeString = hours.toString().padStart(2, '0') + ':' + 
            minutes.toString().padStart(2, '0') + ':' + 
            seconds.toString().padStart(2, '0');
        return timeString;
    }

    displayTimeTaken(element) {
        let formattedTime = this.getFormatedTime(this.dateTimeTakenMilis);
        element.innerHTML = "Took - " + formattedTime;
        element.style.color = "grey";
    }

    getFormatedTime(timeMilis) {
        let date = new Date(timeMilis);
        return date.toLocaleTimeString('en-US').split(':')[0]+ ":" + date.toLocaleTimeString('en-US').split(':')[1];
    }

}