import { AbstractControl, AsyncValidator, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";

export function courseValidator(coursesService: CoursesService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return coursesService.findAllCourses().pipe(
      map(courses => courses.some(c => c.description.toLowerCase() == control.value.toLowerCase())),
      map(titleExists => titleExists ? { titleExists } : null)
    );
  };
}
