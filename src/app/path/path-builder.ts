import { ElementRef } from '@angular/core';
import { Model } from '../model/model';

export interface Point {
  x: number;
  y: number;
}

export interface PathCurve {
  start: Point;
  controlPoint1: Point;
  controlPoint2: Point;
  end: Point;
}

export interface Path {
  curve1: PathCurve;
  curve2: PathCurve;
}

export class PathBuilder {

  private readonly width = 1500;
  private readonly height = 1000;

  private readonly path: Path = {
    curve1: {
      start: {x: 0, y: 0},
      controlPoint1: {x: 0, y: 1200},
      controlPoint2: {x: 700, y: 1150},
      end: {x: 800, y: 700},
    },
    curve2: {
      start: {x: 800, y: 700},
      controlPoint1: {x: 900, y: 200},
      controlPoint2: {x: 1200, y: 200},
      end: {x: 1500, y: 200},
    }
  };

  private context: CanvasRenderingContext2D;

  constructor(canvasElement: ElementRef<HTMLCanvasElement>, canvasWidth: number, canvasHeight: number, private model: Model) {
    const canvas = canvasElement.nativeElement;
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
    this.drawEllipseCurve();
    this.drawPath();
    this.drawPosition();
  }

  private drawAxis(): void {

    this.context.lineWidth = 10;
    this.context.strokeStyle = 'pink';

    if (this.model.limitSwitchX1()) {
      this.drawLine(5, 0, 5, this.height);
    }
    if (this.model.limitSwitchX2()) {
      this.drawLine(this.width - 5, 0, this.width - 5, this.height);
    }
    if (this.model.limitSwitchY1()) {
      this.drawLine(0, 5, this.width, 5);
    }
    if (this.model.limitSwitchY2()) {
      this.drawLine(0, this.height - 5, this.width, this.height - 5);
    }
  }

  private drawLine(x1: number, y1: number, x2: number, y2: number): void {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }

  private drawGrid(): void {
    this.context.strokeStyle = 'lightgray';
    this.context.lineWidth = 1;
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

  private drawPath(): void {

    this.context.strokeStyle = 'blue';
    this.context.lineWidth = 4;

    this.drawCurve(this.path.curve1);
    this.drawCurve(this.path.curve2);

    this.context.fillStyle = 'red';
    this.drawCurvePoints(this.path.curve1);
    this.context.fillStyle = 'green';
    this.drawCurvePoints(this.path.curve2);
  }

  private drawCurve(curve: PathCurve): void {
    this.context.beginPath();
    this.context.moveTo(curve.start.x, curve.start.y);
    this.context.bezierCurveTo(
      curve.controlPoint1.x,
      curve.controlPoint1.y,
      curve.controlPoint2.x,
      curve.controlPoint2.y,
      curve.end.x,
      curve.end.y
    );
    this.context.stroke();
  }

  private drawCurvePoints(curve: PathCurve): void {
    //this.drawPoint(curve.start);
    this.drawPoint(curve.controlPoint1);
    this.drawPoint(curve.controlPoint2);
    this.drawPoint(curve.end);
  }

  private drawPoint(point: Point): void {
    this.context.beginPath();
    this.context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
    this.context.fill();
  }

  private drawEllipseCurve(): void {
    this.context.lineWidth = 4;
    this.context.strokeStyle = 'orange';
    this.context.beginPath();
    this.context.ellipse(750, 0, 750, 1000, 0, Math.PI / 2, Math.PI);
    this.context.stroke();
    this.context.beginPath();
    this.context.ellipse(750, 625, 375, 375, 0, 0, Math.PI / 2);
    this.context.stroke();
    this.context.beginPath();
    this.context.ellipse(1500, 625, 375, 400, 0, -Math.PI, -Math.PI / 2);
    this.context.stroke();
  }

  private drawArcCurve(): void {

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
