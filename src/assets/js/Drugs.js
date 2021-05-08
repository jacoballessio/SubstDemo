
import {DatabaseStorage}  from './DatabaseStorage.js';
export class Drugs extends DatabaseStorage{
    static Store(formattedDrug) {
        if(!Drugs.DrugNameExists(formattedDrug.drugName)) {
            return super.Store(formattedDrug);
        } else {
            window.alert('drug name exists')
        }
    }
    static StoreLocal(formattedDrug) {
        super.StoreLocal(formattedDrug, 'drugs');
    }

    static FormatDrug(drugName, description = "") {
        return super.FormatObject(this.GenerateNewId(), {drugName:drugName, description:description});
    }
    static GetDrugs() {
        return super.GetData('drugs');
    }
    static GenerateNewId() {
        return super.GenerateNewId('drugs');
    }
    static FindDrugWithID(id) {
        let drugs = this.GetDrugs();
        let drug = drugs[super.FindIndexOfId(id, drugs)];
        return drug;
    }

    static DrugNameExists(drugName) {
        let drugsWithName = this.GetDrugs().filter(drug=>drug.drugName==drugName);
        return drugsWithName.length>0;
    }

    static AddDefault() {
        if(!Drugs.DrugNameExists(DefaultDrugs[0].drugName)) {
            DefaultDrugs.forEach(drug=>{
                Drugs.Store(drug);
            })
        }
    }

    static ChangeDescription(id, description) {
        let drug = Drugs.FindDrugWithID(id);
        drug.description = description;
        super.ChangeData('drugs', id, drug);
    }
}

const DefaultDrugs = [Drugs.FormatDrug("Marijuana"),Drugs.FormatDrug("Cocaine"),Drugs.FormatDrug("Heroin"),Drugs.FormatDrug("Meth"),Drugs.FormatDrug("Adderall"), Drugs.FormatDrug("Nicotine"), Drugs.FormatDrug("Kratom")]