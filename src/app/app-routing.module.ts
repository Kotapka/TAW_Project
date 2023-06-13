import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListFormComponent } from './list-form/list-form.component';

const routes: Routes = [
  {path:"",component: ListComponent},
  {path:"list-entry",component: ListFormComponent},
  {path:"edit/:id", component:ListFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
