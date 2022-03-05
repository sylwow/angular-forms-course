import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyOneError',
  // pure: false
})
export class OnlyOneErrorPipe implements PipeTransform {

  transform(errors: any, errorsPriority: string[]): any {
    const error = errorsPriority.find(error => errors && errors[error]);
    return error ? { [error]: errors[error] } : null;
  }

}
