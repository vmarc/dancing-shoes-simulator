import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'dss-root',
  imports: [RouterOutlet],
  template: `
    <p>Dancing shoes</p>
    <router-outlet />
  `,
  styles: `
  `
})
export class App {
}
