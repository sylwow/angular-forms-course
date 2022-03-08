import { FormGroup, ValidatorFn, Validators } from "@angular/forms";

export function createDateRangeValidator(startDateControlName: string, endDateControlName: string): ValidatorFn {
  return (form: FormGroup): Validators | null => {

    const start: Date = form.get(startDateControlName).value;
    const end: Date = form.get(endDateControlName).value;
    if (start && end) {
      const isRangeValid = (end?.getTime() - start?.getTime()) > 0;

      return isRangeValid ? null : { promoPeriod: true };
    }

    return null;
  };
}
