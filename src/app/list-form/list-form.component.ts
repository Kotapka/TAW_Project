import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListDataService } from '../shared/list-data.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ListEntry } from '../shared/list-entry.model';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent implements OnInit {
  
  listForm: FormGroup;
  editMode = false;
  listEntry: ListEntry; 
  private paramId: string;

  constructor(private listDataSerive: ListDataService, private router: Router, private activatedRoute: ActivatedRoute){}
   
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.editMode = true;
        this.paramId = paramMap.get('id')!;
        this.listEntry = this.listDataSerive.getListEntry(this.paramId);
      }
      else{
        this.editMode = false;
      }
    })
    this.listForm = new FormGroup({
      "date": new FormControl(this.editMode ?  this.listEntry.date : null, [Validators.required]),
      "entry": new FormControl(this.editMode ?  this.listEntry.entry : null, [Validators.required])
    })
  }

  onSubmit(){
    const entry = new ListEntry('',this.listForm.value.date, this.listForm.value.entry);
    if(this.editMode){
      entry.id = this.paramId;
      this.listDataSerive.updateEntry(this.paramId, entry);
    }else{
      this.listDataSerive.onAddListEntry(entry);
    }
    this.router.navigateByUrl("")
  }

}
