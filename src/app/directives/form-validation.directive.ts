import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[formValidation]',
  standalone: true
})
export class FormValidationDirective {
  @Input('formValidation') fieldName!: string;

  constructor(private el: ElementRef, private control: NgControl, private renderer: Renderer2) {
  }

  @HostListener('blur') onBlur() {
    const errors = this.control.control?.errors;
    const errorDiv = this.el.nativeElement.parentElement.querySelector('.validation-error');
    if (errors && (this.control.dirty || this.control.touched)) {
      const errorMessage = this.getErrorMessage(errors);
      this.renderer.setProperty(errorDiv, 'textContent', errorMessage);
    } else {
      this.renderer.setProperty(errorDiv, 'textContent', '');
    }
  }

  private getErrorMessage(errors: any) {
    if (errors.required) {
      return `${this.fieldName} is required.`;
    }
    return `Invalid ${this.fieldName}.`;

  }
}
