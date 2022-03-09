import { Component, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { noop, of } from 'rxjs';
import { isDataSource } from '@angular/cdk/collections';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FileUploadComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: FileUploadComponent }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {

  @Input() requiredFileType: string;

  fileUploadError = false;

  fileName: string = '';

  uploadProgress: number;

  disabled = false;
  fileUploadedSuccess = false;

  onChange = (fileName: string) => { };
  onTouched = () => { };
  validatorChange = () => { };

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): ValidationErrors {
    if (this.fileUploadedSuccess) {
      return null;
    }

    let errors: any = {
      requiredFileType: this.requiredFileType
    }

    if (this.fileUploadError) {
      errors.uploadFailed = true;
    }
    return errors;
  }

  registerOnValidatorChange?(validatorChange: () => void): void {
    this.validatorChange = validatorChange;
  }

  writeValue(value: any): void {
    this.fileName = value
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(Touched: any): void {
    this.onTouched = Touched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;

      const formData = new FormData();
      formData.append('thumbnail', file);

      this.http.post('/api/thumbnail-upload', formData, {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        catchError(error => {
          this.fileUploadError = true
          this.validatorChange();
          return of(error);
        }),
        finalize(() => this.uploadProgress = null)
      ).subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        } else if (event.type == HttpEventType.Response) {
          this.onChange(this.fileName);
          this.fileUploadedSuccess = true;
          this.validatorChange();
        }
      });
    }
  }
}
