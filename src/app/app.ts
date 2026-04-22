import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';

@Component({
  selector: 'dss-root',
  imports: [RouterOutlet, ViewerComponent],
  template: `
    <div class="app-container">
      <p>Dancing Shoes Simulator</p>
      <dss-viewer/>
    </div>
    <router-outlet/>
  `,
  styles: `
    .app-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 1rem;
    }
  `,
})
export class App {
}
