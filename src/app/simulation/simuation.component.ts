import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ViewerComponent } from '../viewer/viewer.component';
import { AudioComponent } from '../audio/audio.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PathComponent } from '../path/path.component';
import { AudioService } from '../audio/audio.service';
import { ModelService } from '../model/model.service';

@Component({
  selector: 'dss-simulation',
  imports: [ViewerComponent, AudioComponent, DashboardComponent, PathComponent, NzButtonComponent],
  template: `
    <div class="page">
      <p>Hotel Bizarre - Dansende Schoentjes</p>
      <div>
        <button nz-button nzType="primary" (click)="playPause()">
          play / pause
        </button>
      </div>
      <dss-viewer/>
      <dss-path [model]="model"/>
      <dss-audio/>
      <dss-dashboard [model]="model"/>
    </div>
  `,
  styles: `
    .page {
      display: flex;
      flex-direction: column;
      margin: 1rem;
      gap: 1rem;
    }
  `,
  providers: [AudioService, ModelService],
})
export class SimulationComponent {
  private readonly audioService = inject(AudioService);
  private readonly modelService = inject(ModelService);
  readonly model = this.modelService.model;

  playPause(): void {
    this.audioService.playPause();
  }
}
