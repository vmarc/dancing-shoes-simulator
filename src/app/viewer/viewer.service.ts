import { PerspectiveCamera } from 'three';
import { AudioListener } from 'three';
import { Audio } from 'three';
import { AudioLoader } from 'three';
import { Scene } from 'three';
import { BoxGeometry } from 'three';
import { MeshNormalMaterial } from 'three';
import { Mesh } from 'three';
import { WebGLRenderer } from 'three';
import { Injectable } from '@angular/core';

@Injectable()
export class ViewerService {

  startAnimation(canvas: HTMLCanvasElement): void {

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const camera = new PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.z = 1;

    const listener = new AudioListener();
    camera.add(listener);
    const sound = new Audio(listener);

    const audioLoader = new AudioLoader();
    audioLoader.load(
      'dance.mp3',
      (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(1);
        sound.play();
      }
    );

    const scene = new Scene();

    const geometry = new BoxGeometry(0.2, 0.2, 0.2);
    const material = new MeshNormalMaterial();

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new WebGLRenderer({antialias: true, canvas: canvas});
    renderer.setSize(width, height);
    renderer.setAnimationLoop((time: number) => {
      mesh.rotation.x = time / 2000;
      // mesh.rotation.y = time / 1000;
      // mesh.rotation.z = time / 4000;
      renderer.render(scene, camera);
    });
  }
}

