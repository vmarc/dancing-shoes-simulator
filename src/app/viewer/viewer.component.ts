import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ViewerService } from './viewer.service';
import { viewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'dss-viewer',
  imports: [NzButtonComponent, NzIconDirective],
  template: `
    <div class="buttons">
      <button nz-button (click)="startAnimation()">
        <nz-icon nzType="play-circle" />
        <span>play</span>
      </button>
    </div>
      <canvas #canvasWrapper height="400" width="600"></canvas>
  `,
  styles: `
    canvas {
      display: block;
      border: 1px solid black;
    }

    .buttons {
      margin-bottom: 1rem;
    }

  `,
  providers: [ViewerService]
})
export class ViewerComponent {
  readonly service = inject(ViewerService);
  private readonly canvasWrapper = viewChild<ElementRef<HTMLCanvasElement>>('canvasWrapper');

  startAnimation(): void {
    const canvas = this.canvasWrapper();
    if (canvas) {
      this.service.startAnimation(canvas.nativeElement);
    }
    else {
      console.error('Canvas not found');
    }
  }
}
