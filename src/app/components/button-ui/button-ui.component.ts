import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'button-ui',
  standalone: true,
  templateUrl: './button-ui.component.html',
  styleUrl: './button-ui.component.css'
})
export class ButtonUiComponent {
  @Output() onClick = new EventEmitter();
  @Input() label = '';
  @Input() type: 'error' | 'default' = 'default';
  @Input() disabled = false;
}
