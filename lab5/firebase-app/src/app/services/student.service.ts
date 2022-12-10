import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Student } from '../students/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsCollection: AngularFirestoreCollection<Student>;
  students$: Observable<Student[]>;
  private students: Student[] = [];
 
  constructor(private firestore: AngularFirestore) {
    this.studentsCollection = this.firestore.collection<Student>('students');
    this.students$ = this.studentsCollection.valueChanges();
    this.students$.subscribe(students => this.students = students);
  }

  createStudent(student: Student): void {
    this.studentsCollection.doc<Student>(student.key).set(Object.assign({}, student));
  }

  updateStudent(key: string, value: any): void {
    this.studentsCollection.doc<Student>(key).set(value);
  }

  deleteStudent(key: string): void {
    this.studentsCollection.doc<Student>(key).delete();
  }

  getStudentsList(): Student[]  {
    return this.students;
  }

  deleteAll() {
    this.students.forEach(student => this.deleteStudent(student.key));
  }
}
