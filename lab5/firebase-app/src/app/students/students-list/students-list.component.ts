import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { map } from 'rxjs/operators';
import { Student } from '../student';

@Component({
  selector: 'app-student-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getStudentsList();
  }

  getStudentsList() {
    this.studentService.students$.subscribe(students => this.students = students);
  }

  deleteStudents() {
    this.studentService.deleteAll();
  }
}
