import { CreateStudentComponent } from './students/create-student/create-student.component';
import { StudentsListComponent } from './students/students-list/students-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'students', component: StudentsListComponent },
  { path: 'add', component: CreateStudentComponent },
  { path: '', redirectTo: 'students', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
