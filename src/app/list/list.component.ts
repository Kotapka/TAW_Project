import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListEntry } from '../shared/list-entry.model';
import { ListDataService } from '../shared/list-data.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(private listDataService: ListDataService, private router: Router) {}
  listEntries: ListEntry[] = [];
  listEntriesSub = new Subscription();
  
  ngOnDestroy(): void {
    this.listEntriesSub.unsubscribe();
  }

  ngOnInit(): void {
    this.listDataService.getListEntries();
    this.listEntriesSub = this.listDataService.listSubject.subscribe(listEntries => {
      this.listEntries = listEntries;
    })
    this.listEntries = this.listDataService.listEntries;
  }

  onDelete(id: string){
   this.listDataService.onDeleteEntry(id);
  }
 
  onEdit(id: string){ 
    this.router.navigate(["edit", id]);
  }
}
