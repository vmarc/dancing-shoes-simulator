import { Component } from '@angular/core';
import { input } from '@angular/core';
import { DegreesComponent } from '../common/degrees.component';
import { Model } from '../model/model';
import { SwitchIndicatorComponent } from '../common/switch-indicator.component';

@Component({
  selector: 'dss-path',
  template: `
    <div class="path-container">
      <dss-degrees class="XY-core-1" [degrees]="45"/>
      <dss-degrees class="XY-core-2" [degrees]="270"/>
      <dss-switch-indicator class="xmin" [value]="model().limitSwitchX1()"/>
      <dss-switch-indicator class="xmax" [value]="model().limitSwitchX2()"/>
      <dss-switch-indicator class="ymin" [value]="model().limitSwitchY1()"/>
      <dss-switch-indicator class="ymax" [value]="model().limitSwitchY2()"/>
      <div class="path-canvas">
        path
      </div>
    </div>
  `,
  styles: `
    .path-container {
      display: grid;
      grid-template-columns: auto auto 1fr auto;
      grid-template-rows: auto auto 1fr auto auto;
      border: 1px solid black;
      max-height: 400px;
      max-width: 600px;
      width: 100%;
      height: 300px;
      padding: 1em;
    }

    .path-canvas {
      display: block;
      grid-row-start: 2;
      grid-row-end: 5;
      grid-column: 3;
      border: 1px solid red;
      width: 100%;
      height: 100%;
    }

    .XY-core-1 {
      grid-row: 2;
      grid-column: 1;
    }

    .XY-core-2 {
      grid-row: 4;
      grid-column: 1;
    }

    .xmin {
      grid-row: 3;
      grid-column: 2;
      margin-right: 0.3em;
      align-self: center;
    }

    .xmax {
      grid-row: 3;
      grid-column: 5;
      align-self: center;
      margin-left: 0.3em;
    }

    .ymin {
      grid-row: 5;
      grid-column: 3;
      justify-self: center;
      margin-top: 0.3em;
    }

    .ymax {
      grid-row: 1;
      grid-column: 3;
      justify-self: center;
      margin-bottom: 0.3em;
    }
  `,
  imports: [
    DegreesComponent,
    SwitchIndicatorComponent
  ]
})
export class PathComponent {
  readonly model = input.required<Model>();
}
