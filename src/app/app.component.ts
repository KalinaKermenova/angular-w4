import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';
import { Subscription, interval, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrafficLightComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-w4';

  private subscription?: Subscription;
  private emergencyInterval: any;

  horizontalLights: string = 'red';
  verticallLights: string = 'green';
  colors: string[] = ['red', 'yellow', 'green', 'yellow'];
  verticalColors: string[] = ['green', 'yellow', 'red', 'yellow'];
  timings: number[] = [5000, 2000, 5000, 2000];
  currentIndex: number = 0;
  isEmergency: boolean = false;

  ngOnInit() {
    this.startLights();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  startLights() {
    this.subscription = interval(this.timings[this.currentIndex]).subscribe(
      () => {
        this.changeLight();
      }
    );
  }

  changeLight() {
    this.currentIndex = (this.currentIndex + 1) % 4;
    this.horizontalLights = this.colors[this.currentIndex];
    this.verticallLights = this.verticalColors[this.currentIndex];
    this.subscription?.unsubscribe();
    this.subscription = interval(this.timings[this.currentIndex]).subscribe(
      () => {
        this.changeLight();
      }
    );
  }

  activateEmergencyMode() {
    this.isEmergency = true;
    this.subscription?.unsubscribe();

    this.horizontalLights = 'yellow';
    this.verticallLights = 'yellow';

    this.emergencyInterval = setInterval(() => {
      if (
        this.horizontalLights === 'yellow' &&
        this.verticallLights === 'yellow'
      ) {
        this.horizontalLights = this.verticallLights = '';
      } else {
        this.horizontalLights = this.verticallLights = 'yellow';
      }
    }, 500);

    timer(10000).subscribe(() => {
      clearInterval(this.emergencyInterval);
      this.isEmergency = false;
      this.currentIndex = 0;
      this.horizontalLights = this.colors[this.currentIndex];
      this.verticallLights = this.verticalColors[this.currentIndex];
      this.startLights();
    });
  }
}