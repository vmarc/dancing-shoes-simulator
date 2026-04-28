import { TimeLine } from './time-line';
import { signal } from '@angular/core';

export class Model {

  private _shoeLeftDown = signal<boolean>(false);
  private _shoeRightDown = signal<boolean>(false);

  readonly shoeLeftDown = this._shoeLeftDown.asReadonly();
  readonly shoeRightDown = this._shoeRightDown.asReadonly();

  private step = 0;
  private nextStepTime = 0;
  private shoeIndex = 0;

  readonly timeLine: TimeLine;

  constructor() {
    this.timeLine = new TimeLine();
  };

  tick(now: number): void {
    if (now >= this.nextStepTime) {
      this.toggleShoe();
      this.step++;
      if (this.step < this.timeLine.events.length) {
        this.nextStepTime = this.timeLine.events[this.step].time;
      }
    }
  }

  private toggleShoe(): void {
    if (this.shoeIndex == 0) {
      if (this._shoeLeftDown()) {
        this._shoeLeftDown.set(false);
        this.shoeIndex = 1;
      } else {
        this._shoeLeftDown.set(true);
      }
    } else {
      if (this._shoeRightDown()) {
        this._shoeRightDown.set(false);
        this.shoeIndex = 0;
      } else {
        this._shoeRightDown.set(true);
      }
    }
  }
}
