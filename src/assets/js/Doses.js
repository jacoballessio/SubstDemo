
import {DatabaseStorage}  from './DatabaseStorage.js';
import {Schedules, IsToday}  from './Schedules.js';
export class Doses extends DatabaseStorage{
    static StoreLocal(formattedDose) {
        return super.StoreLocal(formattedDose, 'doses');
    }
    static HasTaken(id) {
        let element = this.GetElementWithId(id) || {dateTimeTakenMilis:-1};
        let timeTaken = element.dateTimeTakenMilis;
        return timeTaken >= 0;
    }
    static GetDoses() {
        
        return super.GetData('doses');
    }
    static GetTodaysDoses() {
        Schedules.GenerateTodaysDoses();
        let doses = this.GetDoses();
        let todaysDoses = [];
        let i = 0;
        doses.forEach(dose=> {
            if(IsToday(new Date(dose.dateTimeTakenMilis))||(dose.scheduleId!=-1&&Schedules.ScheduleIncludesToday(Schedules.FindScheduleWithId(dose.scheduleId)))||dose.scheduleId==-1) {
                todaysDoses.push(dose);
            }
            i++;
        });
        return todaysDoses;
    }
    static GenerateNewId() {
        return super.GenerateNewId('doses');
    }
    static FormatDose(drugID, doseAmount, doseType, scheduleId, dateTimeTakenMilis, experience="") {
        if(drugID<0||doseAmount<0||doseType<0) {
            console.error("Failed to format dose. All necessary parameters must be positive.")
        } else{
            return super.FormatObject(this.GenerateNewId(),{drugID:drugID, doseAmount:doseAmount, doseType:doseType, scheduleId:scheduleId, dateTimeTakenMilis:dateTimeTakenMilis, experience:experience});
        }
        
    }
    static SetExperience(experience, id) {
        let replacement = this.GetElementWithId(id);
        replacement.experience = experience;
        super.ChangeData('doses', id, replacement);
    }
    static SetTimer(dateTimeTakenMilis, id) {
        let replacement = this.GetElementWithId(id);
        replacement.dateTimeTakenMilis = dateTimeTakenMilis;
        super.ChangeData('doses', id, replacement);
    }
    static RemoveDose(id) {
        super.RemoveData('doses', this.FindIndexOfId(id, this.GetDoses()));
    }
    static GetElementWithId(id) {
        return super.GetElementWithId('doses', id);
    }
    static GetDosesCategorizedByDrug() {
        let doses = this.GetDoses();
        let doseMap = new Map();
        doses.forEach(dose=>{
            let currentDoseCategory = doseMap.get(dose.drugID) || [];
            currentDoseCategory.push(dose);
            doseMap.set(dose.drugID, currentDoseCategory);
            currentDoseCategory.sort((a, b) => (a.dateTimeTakenMilis > b.dateTimeTakenMilis) ? 1 : -1);
        });
        return doseMap;
    }
    static GetDosesCategorizedBySchedule() {
        let doses = this.GetDoses();
        let doseMap = new Map();
        doses.forEach(dose=>{
            let currentDoseCategory = doseMap.get(dose.scheduleId) || [];
            currentDoseCategory.push(dose);
            doseMap.set(dose.scheduleId, currentDoseCategory);
            currentDoseCategory.sort((a, b) => (a.dateTimeTakenMilis > b.dateTimeTakenMilis) ? 1 : -1);
        });
        return doseMap;
    }
}
