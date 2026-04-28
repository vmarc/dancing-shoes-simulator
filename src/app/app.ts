import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';
import { AudioComponent } from './audio/audio.component';
import { ModelService } from './model/model.service';
import { AudioService } from './audio/audio.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { inject } from '@angular/core';

@Component({
  selector: 'dss-root',
  imports: [RouterOutlet, ViewerComponent, AudioComponent, NzButtonComponent],
  template: `
    <div class="app-container">
      <p>Hotel Bizarre - Dansende Schoentjes</p>
      <div>
        <button nz-button (click)="playPause()">
          play/pause
        </button>
      </div>
      <dss-viewer/>
      <dss-audio/>
    </div>
    <router-outlet/>
  `,
  styles: `
    .app-container {
      display: flex;
      flex-direction: column;
      margin: 1rem;
      gap: 1rem;
    }
  `,
  providers: [AudioService, ModelService],
})
export class App {
  readonly service = inject(AudioService);

  playPause(): void {
    this.service.playPause();
  }
}
