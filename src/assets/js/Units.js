import {DatabaseStorage}  from './DatabaseStorage.js';
export class Units extends DatabaseStorage {
    static GetUnits() {
        return super.GetData('units');
    }
    static StoreLocal(unitName) {
        super.StoreLocal(super.FormatObject(this.GenerateNewId(), {unitName:unitName}), 'units');
    }
    static GenerateNewId() {
        return super.GenerateNewId('units');
    }

    static GetElementWithId(id) {
        return super.GetElementWithId('units',id);
    }
    static UnitNameExists(unitName) {
        let unitsWithName = this.GetUnits().filter(unit=>unit.unitName==unitName);
        return unitsWithName.length>0;
    }
    static AddDefault() {
        if(!Units.UnitNameExists(DefaultUnitNames[0])) {
            DefaultUnitNames.forEach(unit=>{
                Units.Store(unit);
            })
        }
    }
}

const DefaultUnitNames = ["Gram(s)", "Pill(s)", "Injection(s)", "Hit(s)", "Milligram(s)", "Cigarette(s)"]