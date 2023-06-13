import {Injectable } from "@angular/core"
import { ListEntry } from "./list-entry.model"
import { Subject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { json } from "body-parser";


@Injectable({providedIn:"root"})
export class ListDataService{
    
    public maxId: number;
    constructor(private http: HttpClient){}
    listSubject = new Subject<ListEntry[]>();
    
    updateEntry(id: string, entry: ListEntry) {
        this.http.put<{message: string}>('http://localhost:3000/update-entry/' + id, entry).subscribe((jsonData) => {
            console.log(jsonData.message);
            this.getListEntries();
        })
    }

    listEntries: ListEntry[] = [];   
    onDeleteEntry(id: string){
        this.http.delete<{message: string}>('http://localhost:3000/remove-entry/' + id).subscribe((jsonData) => {
            console.log(jsonData.message);
        this.getListEntries();
        })
    }

    onAddListEntry(listEntry: ListEntry){
        this.http.post<{message: string}>('http://localhost:3000/add-entry', listEntry).subscribe((jsonData) => {
            console.log(listEntry);
        this.getListEntries();
        });
    }   
    
    getListEntry(id: string){
        const index = this.listEntries.findIndex(el => {
            return el.id == id;
        })
        return this.listEntries[index];
    }
     
    getListEntries(){
        this.http.get<{listEntries: any}>('http://localhost:3000/list-entries')
        .pipe(map((responseData) => {
            return responseData.listEntries.map((entry: {date:string; entry:string; _id:string}) => {
                return {
                    date: entry.date,
                    entry: entry.entry,
                    id: entry._id
                }
            })
        }))
        .subscribe((updateResponse) => {
            this.listEntries = updateResponse;
            this.listSubject.next(this.listEntries);
        })
    }


}