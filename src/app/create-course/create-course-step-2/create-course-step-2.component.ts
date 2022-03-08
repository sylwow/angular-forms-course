import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createDateRangeValidator } from '../../validators/date-range.validator';


@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss']
})
export class CreateCourseStep2Component implements OnInit {

  form = this.fb.group({
    courseType: ['premium', Validators.required],
    price: [null,
      [Validators.required, Validators.min(1), Validators.max(9999), Validators.pattern("[0-9]+")]
    ],
    promoStartAt: null,
    promoEndAt: null
  }, {
    validators: [createDateRangeValidator('promoStartAt', 'promoEndAt')],
    updateOn: 'blur'
  });

  constructor(private fb: FormBuilder) {
    this.form.valueChanges.subscribe(val => {
      const price = this.form.controls['price'];
      if (val.courseType === 'free' && price.enabled) {
        price.disable({ emitEvent: false });
      }
      if (val.courseType === 'premium' && price.disabled) {
        price.enable({ emitEvent: false });
      }
    })
  }

  ngOnInit() {



  }

}
