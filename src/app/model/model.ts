import { TimeLine } from './time-line';
import { signal } from '@angular/core';
import { TimeLineEvent } from './time-line-event';

export class Model {

  private _shoeLeftDown = signal<boolean>(false);
  private _shoeRightDown = signal<boolean>(false);

  readonly shoeLeftDown = this._shoeLeftDown.asReadonly();
  readonly shoeRightDown = this._shoeRightDown.asReadonly();

  readonly timeLine: TimeLine;

  constructor() {
    this.timeLine = new TimeLine();
  };

  tick(now: number): void {
    this._shoeLeftDown.set(this.isLeftDown(now));
    this._shoeRightDown.set(this.isRightDown(now));
  }

  private isLeftDown(now: number): boolean {
    return this.isDown(this.timeLine.eventsLeft, now);
  }

  private isRightDown(now: number): boolean {
    return this.isDown(this.timeLine.eventsRight, now);
  }

  private isDown(events: TimeLineEvent[], now: number): boolean {
    const event = events.find(event => {
      return now >= event.time1  && now <  event.time2 ;
    });
    return event != undefined;
  }
}
