// app/page.tsx
"use client";

import { useEffect } from "react";
import * as THREE from "three";

export default function UnderConstruction() {
  useEffect(() => {
    // ----- Setup
    const container = document.getElementById("stage") as HTMLDivElement | null;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );

    const clock = new THREE.Clock();
    const orbitSpeed = 0.25; // rad/s (siehe animate)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const pinkLight = new THREE.PointLight(0xff3ea5, 20, 200, 2.0);
    pinkLight.position.set(36, 42, 50);
    scene.add(pinkLight);

    const rim = new THREE.DirectionalLight(0xffffff, 0.8);
    rim.position.set(-60, -20, 80);
    scene.add(rim);

    // Heart geometry (zentriert)
    function makeHeartMesh() {
      const x = 0,
        y = 0;
      const shape = new THREE.Shape();
      shape.moveTo(x + 25, y + 25);
      shape.bezierCurveTo(x + 25, y + 25, x + 20, y + 0, x + 0, y + 0);
      shape.bezierCurveTo(x - 30, y + 0, x - 30, y + 35, x - 30, y + 35);
      shape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
      shape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
      shape.bezierCurveTo(x + 80, y + 35, x + 80, y + 0, x + 50, y + 0);
      shape.bezierCurveTo(x + 35, y + 0, x + 25, y + 25, x + 25, y + 25);

      const geom = new THREE.ExtrudeGeometry(shape, {
        depth: 16,
        steps: 2,
        bevelEnabled: true,
        bevelThickness: 3.6,
        bevelSize: 2.8,
        bevelSegments: 10,
        curveSegments: 32,
      });
      geom.center();

      const mat = new THREE.MeshStandardMaterial({
        color: 0xff3ea5,
        metalness: 0.8,
        roughness: 0.15,
        emissive: 0xff3ea5,
        emissiveIntensity: 0.32,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.rotation.x = Math.PI;
      mesh.scale.setScalar(0.15);
      return mesh;
    }

    const heart = makeHeartMesh();
    const pivot = new THREE.Group();
    pivot.add(heart);
    scene.add(pivot);

    // --- Rotierende Spotlights (links/rechts)
    const orbit = new THREE.Group();
    scene.add(orbit);

    const lightTarget = new THREE.Object3D();
    pivot.add(lightTarget);

    function makeSpot(color: number) {
      const spot = new THREE.SpotLight(color, 10, 180, Math.PI / 7, 0.25, 2.0);
      spot.castShadow = false;
      spot.target = lightTarget;
      return spot;
    }

    const leftSpot = makeSpot(0xff3ea5);
    const rightSpot = makeSpot(0xffffff);

    leftSpot.position.set(-40, 20, 30);
    rightSpot.position.set(40, 20, 30);

    orbit.add(leftSpot, leftSpot.target, rightSpot, rightSpot.target);

    // BoundingSphere & Kamera-Fit (nachdem Objekt in Scene ist)
    function getBoundingSphere() {
      pivot.updateWorldMatrix(true, true);
      const box = new THREE.Box3().setFromObject(pivot);
      return box.getBoundingSphere(new THREE.Sphere());
    }

    function fitCameraToObject() {
      const w = window.innerWidth,
        h = window.innerHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const sphere = getBoundingSphere();
      const fov = THREE.MathUtils.degToRad(camera.fov);
      const fitHeightDistance = sphere.radius / Math.sin(fov / 2);
      const fitWidthDistance =
        sphere.radius / Math.tan(fov / 2) / camera.aspect;
      // 0.9 = dichter dran (dein Wunsch), 1.2 wäre mehr Rand
      const distance = Math.max(fitHeightDistance, fitWidthDistance) * 0.9;

      camera.position.set(0, 8, distance);
      camera.lookAt(sphere.center);
    }

    fitCameraToObject();
    const onResize = () => fitCameraToObject();
    window.addEventListener("resize", onResize);

    // Drag inertia
    let isDown = false,
      lastX = 0,
      lastY = 0,
      vx = 0,
      vy = 0;
    const damp = 0.95;

    function onDown(e: MouseEvent | TouchEvent) {
      isDown = true;
      const p = "touches" in e ? e.touches[0] : (e as MouseEvent);
      lastX = p.clientX;
      lastY = p.clientY;
    }
    function onMove(e: MouseEvent | TouchEvent) {
      if (!isDown) return;
      const p = "touches" in e ? e.touches[0] : (e as MouseEvent);
      const x = p.clientX;
      const y = p.clientY;
      vx = (x - lastX) * 0.005;
      vy = (y - lastY) * 0.005;
      pivot.rotation.y += vx;
      pivot.rotation.x += vy;
      lastX = x;
      lastY = y;
    }
    function onUp() {
      isDown = false;
    }

    renderer.domElement.addEventListener("mousedown", onDown);
    renderer.domElement.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    renderer.domElement.addEventListener("touchstart", onDown, { passive: true });
    renderer.domElement.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    // Puls @ 60 BPM
    const bpm = 60;
    const freq = bpm / 60;
    const amp = 0.06;
    const baseScale = 0.15;

    let raf = 0;
    function animate() {
      const t = clock.getElapsedTime();
      const dt = clock.getDelta();

      // Puls
      const s = 1 + amp * Math.sin(2 * Math.PI * freq * t);
      heart.scale.setScalar(baseScale * s);

      // Orbit-Lichter drehen
      orbit.rotation.y += orbitSpeed * dt;

      // Emissive leicht atmen lassen
      const glow = 0.28 + 0.22 * (0.5 + 0.5 * Math.sin(2 * Math.PI * freq * t));
      (heart.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;

      // Trägheit
      if (!isDown) {
        pivot.rotation.y += vx;
        pivot.rotation.x += vy;
        vx *= damp;
        vy *= damp;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("mousedown", onDown);
      renderer.domElement.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      renderer.domElement.removeEventListener("touchstart", onDown);
      renderer.domElement.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      {/* Stage + Overlay */}
      <div id="stage" aria-hidden="true"></div>
      <div className="noise" aria-hidden="true"></div>

      <main className="overlay">
        <div className="wrap">
          <div className="brand">
            <span className="glitch" data-text="HEART TIMES">
              HEART TIMES
            </span>
          </div>
          <div className="uc">UNDER CONSTRUCTION</div>
          <div className="tag">MTB / GRAVEL — queer, loud. Back soon.</div>
          <a className="cta" href="mailto:kontakt@heart-times.de">
            kontakt@heart-times.de
          </a>
        </div>
      </main>

      <footer>
        © 2025 Heart Times <span className="bullet" />
      </footer>
    </>
  );
}
