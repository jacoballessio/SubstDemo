import {DatabaseStorage} from './DatabaseStorage.js';
import {Doses}  from './Doses.js';
export const IsToday = (someDate) => {
        
    const today = new Date();
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
}

export class Schedules extends DatabaseStorage{

    static StoreLocal(formattedSchedule) {
        return super.StoreLocal(formattedSchedule, 'schedules');
    }
    static FormatSchedule(drugID, startDose, endDose, doseType, startDate, endDate, time, daysOfWeek, dateTimeTakenMilis=-1) {
        return super.FormatObject(this.GenerateNewId(), {drugID:drugID, startDose:startDose, endDose:endDose, startDate:startDate, doseType:doseType, endDate:endDate, time:time, daysOfWeek:daysOfWeek, dateTimeTakenMilis:dateTimeTakenMilis});
    }
    static GetSchedules() {
        return super.GetData('schedules');
    }
    static GenerateTodaysDoses() {
        let schedules = this.GetSchedules();
        let todaysSchedules = [];
        let i = 0;
        schedules.forEach(schedule=> {
            if(this.ScheduleIncludesToday(schedule)&&!this.TodaysDoseForScheduleExists(schedule.id)) {
                Doses.Store(Doses.FormatDose(schedule.drugID, this.CalculateDoseAmount(schedule), schedule.doseType, schedule.id, -1));
            }
            i++;
        });
        return todaysSchedules;
        
    }
    static CalculateDoseAmount(schedule) {
        return -1;//temp value. change when possible.
    }
    static ScheduleIncludesToday(schedule) {
        let dates = this.GetScheduleDates(schedule);
        let result = false;
        dates.forEach(date => {
            if(IsToday(date)) {
                result = true;
            }
            
        });
        return result;
    }
    static GetScheduleDates(schedule) {
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
            let firstDate = new Date(startDate);
            firstDate = firstDate.addDays(numberOfDaysFromStartDate);
            let currentDate = new Date(firstDate);
            while(this.dateIsBetween(startDate, endDate, currentDate)) {
                dates.push(currentDate);
                currentDate = currentDate.addDays(7);
            }
        });
        return dates;
        
    }
    static dateIsBetween(from,to,check) {

        var fDate,lDate,cDate;
        fDate = Date.parse(from);
        lDate = Date.parse(to);
        cDate = Date.parse(check);
    
        if((cDate <= lDate && cDate >= fDate)) {
            return true;
        }
        return false;
    }
    static GenerateNewId() {
        return super.GenerateNewId('schedules');
    }
    static TodaysDoseForScheduleExists(scheduleId) {
        let doses = Doses.GetDoses();
        let schedules = this.GetSchedules();
        let schedule = this.FindScheduleWithId(scheduleId);
        let result = false;
        
        doses.forEach(dose=>{
            if(this.ScheduleIncludesToday(schedule) && dose.scheduleId == scheduleId) {
                result = true;
            }
        });
        return result;
    }
    static FindScheduleWithId(id) {
        let schedules = this.GetSchedules();
        return schedules.find(element => element.id==id);
    }
    static ChangeDescription(id, description) {
        let schedule = Schedules.FindScheduleWithId(id);
        schedule.description = description;
        super.ChangeData('schedules', id, schedule);
    }
}
