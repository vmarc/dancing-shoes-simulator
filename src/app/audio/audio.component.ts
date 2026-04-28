import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { AudioService } from './audio.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dss-audio',
  imports: [NzButtonComponent, FormsModule],
  template: `
    <!-- <nz-slider [nzMin]="10" [nzMax]="1000" [(ngModel)]="service.minPxPerSec"/> -->

    <div id="waveform" ></div>
  `,
  styles: `
    #waveform {
      display: block;
      border: 1px solid black;
      min-width: 100%;
    }
  `,
})
export class AudioComponent implements AfterViewInit {
  readonly service = inject(AudioService);

  ngAfterViewInit(): void {
    this.service.init();
  }
}
