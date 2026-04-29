import { ElementRef } from '@angular/core';
import { Model } from '../model/model';

export class PathBuilder {

  private readonly width = 1500;
  private readonly height = 1000;

  private context: CanvasRenderingContext2D;

  constructor(canvasElement: ElementRef<HTMLCanvasElement>, canvasWidth: number, canvasHeight: number, private model: Model) {
    const canvas  = canvasElement.nativeElement;
    this.context = <CanvasRenderingContext2D>canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    console.log(`canvasWidth: ${canvasWidth}, canvasHeight: ${canvasHeight}, dpr: ${dpr}`);
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    const scaleFactor = canvas.width / this.width;
    this.context.scale(scaleFactor, scaleFactor);
    this.context.transform(1, 0, 0, -1, 0, this.height);
  }

  draw(): void {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawGrid();
    this.drawAxis();
    this.drawText("dansende schoentjes", 100, 100);
    this.drawCurve();
    this.drawPosition();
  }

  private drawAxis(): void {
    const xMinColor = this.model.limitSwitchX1() ? 'red' : 'black';
    const xMaxColor = this.model.limitSwitchX2() ? 'red' : 'black';
    const yMinColor = this.model.limitSwitchY1() ? 'red' : 'black';
    const yMaxColor = this.model.limitSwitchY2() ? 'red' : 'black';

    this.context.strokeStyle = xMinColor;
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(0, this.height);
    this.context.stroke();

    this.context.strokeStyle = xMaxColor;
    this.context.beginPath();
    this.context.moveTo(this.width, 0);
    this.context.lineTo(this.width, this.height);
    this.context.stroke();

    this.context.strokeStyle = yMinColor;
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(this.width, 0);
    this.context.stroke();

    this.context.strokeStyle = yMaxColor;
    this.context.beginPath();
    this.context.moveTo(0, this.height);
    this.context.lineTo(this.width, this.height);
    this.context.stroke();
  }

  private drawGrid(): void {
    this.context.strokeStyle = 'lightgray';
    for (let x = 100; x < this.width; x += 100) {
      this.context.beginPath();
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.height);
      this.context.stroke();
    }
    for (let y = 100; y < this.height; y += 100) {
      this.context.beginPath();
      this.context.moveTo(0, y);
      this.context.lineTo(this.width, y);
      this.context.stroke();
    }
  }

  private drawText(text: string, x: number, y: number): void {
    this.context.font = '40px sans-serif';
    this.context.save();
    this.context.translate(x, y);
    this.context.scale(1, -1);
    this.context.fillText(text, 0, 0); // must be zero;zero
    this.context.restore();
  }

  private drawCurve(): void {
    this.context.strokeStyle = 'blue';
    this.context.lineWidth = 1;
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.bezierCurveTo(0, 1500, 700, 500, 800, 500);
    this.context.bezierCurveTo(1300, 200, 1500, 0, 1500, 1000);
    this.context.stroke();

    this.context.fillStyle = 'red';

    this.context.beginPath();
    this.context.arc(0, 0, 10, 0, 2 * Math.PI);
    this.context.fill();


    this.context.beginPath();
    this.context.arc(0, 1500, 10, 0, 2 * Math.PI);
    this.context.fill();

    this.context.beginPath();
    this.context.arc(700, 500, 10, 0, 2 * Math.PI);
    this.context.fill();

    this.context.beginPath();
    this.context.arc(800, 500, 10, 0, 2 * Math.PI);
    this.context.fill();

    this.context.fillStyle = 'green';

    this.context.beginPath();
    this.context.arc(1300, 200, 10, 0, 2 * Math.PI);
    this.context.fill();

    this.context.beginPath();
    this.context.arc(1500, 0, 10, 0, 2 * Math.PI);
    this.context.fill();

    this.context.beginPath();
    this.context.arc(1500, 1000, 10, 0, 2 * Math.PI);
    this.context.fill();
  }

  private drawPosition(): void {

    const x = 100;
    const y = 900;

    this.context.strokeStyle = 'green';
    this.context.lineWidth = 1;

    this.context.beginPath();
    this.context.moveTo(x, 0);
    this.context.lineTo(x, this.height);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(0, y);
    this.context.lineTo(this.width, y);
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(x, y, 50, 0, 2 * Math.PI);
    this.context.stroke();
  }
}
