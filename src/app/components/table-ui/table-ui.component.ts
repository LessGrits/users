import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'table-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-ui.component.html',
  styleUrl: './table-ui.component.css'
})
export class TableUiComponent {

  @Input() data: any[] | undefined;
  @Output() onRowClick = new EventEmitter<string>();
}
