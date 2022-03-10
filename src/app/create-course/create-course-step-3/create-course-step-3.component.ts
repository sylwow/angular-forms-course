import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'create-course-step-3',
  templateUrl: 'create-course-step-3.component.html',
  styleUrls: ['create-course-step-3.component.scss']
})
export class CreateCourseStep3Component {

  lessons = this.fb.array([]);

  form = this.fb.group({
    lessons: this.lessons
  });

  constructor(private fb: FormBuilder) { }

  addLesson() {
    this.lessons.push(this.fb.group({
      title: ['', Validators.required],
      level: ['', Validators.required]
    }));
  }

  removeLesson(index: number) {
    this.lessons.removeAt(index);
  }
}
