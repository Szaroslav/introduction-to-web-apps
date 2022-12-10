import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Student } from '../student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  student: Student = new Student();
  submitted = false;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  newStudent(): void {
    this.submitted = false;
  }

  save() {
    this.student.key = this.student.name.toLocaleLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 1000);
    this.studentService.createStudent(this.student);
    this.student = new Student();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
