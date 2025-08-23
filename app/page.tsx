// app/page.tsx
"use client";

import Script from "next/script";

export default function UnderConstruction() {
  return (
    <>
      {/* Stage + Overlay */}
      <div id="stage" aria-hidden="true"></div>
      <div className="noise" aria-hidden="true"></div>

      <main className="overlay">
        <div className="wrap">
          <div className="brand">
            <span className="glitch" data-text="HEART TIMES">HEART TIMES</span>
          </div>
          <div className="uc">UNDER CONSTRUCTION</div>
          <div className="tag">MTB / GRAVEL — queer, loud. Back soon.</div>
          <a className="cta" href="mailto:kontakt@heart-times.de">kontakt@heart-times.de</a>
        </div>
      </main>

      <footer>
        © 2025 Heart Times <span className="bullet"></span> 
      </footer>

      {/* Three.js + Inline-Init */}
      <Script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js" strategy="beforeInteractive" />
      <Script id="heart-times-3d" strategy="afterInteractive">{`
        // ----- Setup
        const container = document.getElementById('stage');
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200);
        camera.position.set(0, 8, 60);

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.2));
        const pinkLight = new THREE.PointLight(0xff3ea5, 20, 200, 2.0);
        pinkLight.position.set(36, 42, 50);
        scene.add(pinkLight);
        const rim = new THREE.DirectionalLight(0xffffff, 0.8);
        rim.position.set(-60, -20, 80);
        scene.add(rim);

        // Heart geometry
        function makeHeartMesh() {
          const x = -25, y = -99;
          const shape = new THREE.Shape();
          shape.moveTo(x + 25, y + 25);
          shape.bezierCurveTo(x + 25, y + 25, x + 20, y + 0, x + 0, y + 0);
          shape.bezierCurveTo(x - 30, y + 0, x - 30, y + 35, x - 30, y + 35);
          shape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
          shape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
          shape.bezierCurveTo(x + 80, y + 35, x + 80, y + 0, x + 50, y + 0);
          shape.bezierCurveTo(x + 35, y + 0, x + 25, y + 25, x + 25, y + 25);

          const geom = new THREE.ExtrudeGeometry(shape, {
            depth: 16, steps: 2, bevelEnabled: true, bevelThickness: 3.6, bevelSize: 2.8, bevelSegments: 10, curveSegments: 32,
          });
          //geom.center();

          const mat = new THREE.MeshStandardMaterial({
            color: 0xff3ea5, metalness: 0.12, roughness: 0.35, emissive: 0xff3ea5, emissiveIntensity: 0.32
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

        // Drag inertia
        let isDown = false, lastX = 0, lastY = 0, vx = 0, vy = 0;
        const damp = 0.95;

        function onDown(e){ isDown = true; lastX = (e.touches? e.touches[0].clientX : e.clientX); lastY = (e.touches? e.touches[0].clientY : e.clientY); }
        function onMove(e){ if(!isDown) return; const x = (e.touches? e.touches[0].clientX : e.clientX); const y = (e.touches? e.touches[0].clientY : e.clientY); vx = (x - lastX) * 0.005; vy = (y - lastY) * 0.005; pivot.rotation.y += vx; pivot.rotation.x += vy; lastX = x; lastY = y; }
        function onUp(){ isDown = false; }

        renderer.domElement.addEventListener('mousedown', onDown);
        renderer.domElement.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        renderer.domElement.addEventListener('touchstart', onDown, { passive: true });
        renderer.domElement.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onUp);

        // Pulse @ 60 BPM
        const bpm = 60; const freq = bpm / 60; const baseScale = 0.15; const amp = 0.06; const clock = new THREE.Clock();

        function animate(){
          const t = clock.getElapsedTime();
          const s = 1 + amp * Math.sin(2 * Math.PI * freq * t);
          heart.scale.setScalar(baseScale * s);

          const glow = 0.28 + 0.22 * (0.5 + 0.5 * Math.sin(2 * Math.PI * freq * t));
          heart.material.emissiveIntensity = glow; pinkLight.intensity = 18 + 10 * (0.5 + 0.5 * Math.sin(2 * Math.PI * freq * t));

          if(!isDown){ pivot.rotation.y += vx; pivot.rotation.x += vy; vx *= damp; vy *= damp; }

          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
          const w = window.innerWidth, h = window.innerHeight;
          camera.aspect = w / h; camera.updateProjectionMatrix();
          renderer.setSize(w, h); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
        });
      `}</Script>
    </>
  );
}
