import firebase from "firebase";
import { v4 as uuidv4 } from 'uuid';
const demoUserID = "2kjanbdaiUG";
// const firestoreFns = {
//     write: (data, category) => {
//         console.log(JSON.parse(`${category}: data`));
//         db.collection(`users/${demoUserID}`).add(JSON.parse(`${category}: data`));
//     },
//     read: () => {
//         db.collection(`users/${demoUserID}/doses`).get().then((snapshot) => {
//             snapshot.forEach((doc) => {
//                 console.log(`${doc.id} => ${doc.data()}`);
//             });
//         });
//     },
//     update: () => {

//     }
// }
// setTimeout(function() {
//     console.log("yaooo")
//     const db = firebase.firestore();
//     db.collection(`users`).add({demo: "dawg"});
// },1000)
export class DatabaseStorage {

    static Store(formattedObj) {
        //Once user preferences are set up we will use a "local" or "cloud storage" preference to choose between storing with the StoreLocal function vs the StoreCloud.
        return this.StoreLocal(formattedObj);
        // return this.StoreCloud(formattedObj);
    }
    static StoreLocal(formattedObj, location) {
        let data = this.GetData(location);
        data.push(formattedObj);
        localStorage.setItem(location, JSON.stringify(data));
        return formattedObj;
    }
    // static StoreCloud(formattedObj, location){
    //     // change location to category?
    //     firestoreFns.write(formattedObj, location);
    //     return formattedObj;
    // }
    static GetData(location) {
        if(localStorage.getItem(location)==null||localStorage.getItem(location)=="") {
            localStorage.setItem(location, "[]");
        }
        
        let data = JSON.parse(localStorage.getItem(location));
        
        return data;
    }

    static GetDataLocal(location) {

    }

    static GetDataCloud(location) {

    }

    static ChangeData(location, id, replacement) {
        let data = this.GetData(location);
        data[this.FindIndexOfId(id, data)] = replacement;
        this.ReplaceAll(location, data);
    }

    static RemoveData(location, index) {
        let data = this.GetData(location);
        data.splice(index, 1);
        this.ReplaceAll(location, data);
    }

    static ReplaceAll(location, arr) {
        localStorage.setItem(location, JSON.stringify(arr));
    }

    static ReplaceAllLocal(location, arr) {

    }

    static ReplaceAllCloud(location, arr) {
        
    }

    static GenerateNewId(databaseName) {
        let database = this.GetData(databaseName);
        return uuidv4();
    }
    static FindIndexOfId(id, list) {
        return list.findIndex(element=>element.id==id);
    }
    static GetElementWithId(location, id) {
        let data = this.GetData(location);
        return data[this.FindIndexOfId(id, data)];
    }
    static FormatObject(id, obj) {
        
        obj.id = id;
        return obj;
    }
}
