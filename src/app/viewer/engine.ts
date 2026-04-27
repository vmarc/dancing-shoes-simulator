import { Scene } from 'three';
import { WebGLRenderer } from 'three';
import { Object3D } from 'three';
import { PerspectiveCamera } from 'three';

const SHOE_DOWN_ANGLE = -22.5 * (Math.PI / 180);

export class Engine {

  private shoeIndex = 0;
  private shoe1Down = false;
  private shoe2Down = false;

  constructor(
    private renderer: WebGLRenderer,
    private scene: Scene,
    private camera: PerspectiveCamera,
    private shoe1: Object3D,
    private shoe2: Object3D,
  ) {}

  toggleShoe(): void {
    if (this.shoeIndex == 0) {
      if (this.shoe1Down) {
        this.shoe1Down = false;
        this.shoeIndex = 1;
      }
      else {
        this.shoe1Down = true;
      }
    }
    else {
      if (this.shoe2Down) {
        this.shoe2Down = false;
        this.shoeIndex = 0;
      }
      else {
        this.shoe2Down = true;
      }
    }
    this.render();
  }

  render(): void {
    this.shoe1.rotation.z = this.shoe1Down ? SHOE_DOWN_ANGLE : 0;
    this.shoe2.rotation.z = this.shoe2Down ? SHOE_DOWN_ANGLE : 0;
    this.renderer.render(this.scene, this.camera);
  }
}
