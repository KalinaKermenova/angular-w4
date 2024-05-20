import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-traffic-light',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traffic-light.component.html',
  styleUrl: './traffic-light.component.css',
})
export class TrafficLightComponent {
  @Input() lightColor!: string;
  @Input() position: string = '';
  @Input() btnPosition: string = '';

  isBtnDisabled: boolean = false;

  ngOnChanges() {
    if (this.lightColor === 'red') {
      this.isBtnDisabled = true;
    } else {
      this.isBtnDisabled = false;
    }
  }

  alertWrongCrossing() {
    if (this.lightColor === 'yellow') {
      alert('Неправилно пресичане!');
    }
  }
}