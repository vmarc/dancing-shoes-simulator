import { Injectable } from '@angular/core';
import { AudioEngine } from './audio-engine';

@Injectable()
export class AudioService {

  private engine: AudioEngine | undefined;

  init(): void {
    this.engine = new AudioEngine();
  }

  playPause(): void {
    this.engine?.playPause();
  }

  zoom(minPxPerSec: number) {
    this.engine?.zoom(minPxPerSec);
  }
}
