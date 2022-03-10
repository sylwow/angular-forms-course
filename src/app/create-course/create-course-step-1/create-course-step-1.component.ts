import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { courseValidator } from '../../validators/course-title.validator';

interface CourseCategory {
  code: string,
  description: string
}
@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {

  form = this.fb.group({
    //address: [null, Validators.required],
    title: [
      '123123123123',
      {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(60)],
        asyncValidators: [courseValidator(this.coursesService)],
        updateOn: 'blur'
      }
    ],
    releasedAt: [new Date(), Validators.required],
    category: ['BEGINNER', Validators.required],
    downloadsAllowed: [true, Validators.requiredTrue],
    longDescription: ['123123123123312',
      [Validators.required, Validators.minLength(3)]]
  });


  coursesCategories$: Observable<CourseCategory> = this.coursesService.findCourseCategories();

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService) { }

  ngOnInit() {

    const draft = localStorage.getItem('STEP_1_DRAFT');

    if (draft) {
      this.form.setValue(JSON.parse(draft));
    }
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
    ).subscribe(val => {
      localStorage.setItem('STEP_1_DRAFT', JSON.stringify(val));
    });
  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
