import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDBackground = () => {
    const mountRef = useRef(null);
    const spheres = useRef([]); 

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        scene.background = new THREE.Color(0x000000); 

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
        const material = new THREE.MeshBasicMaterial({ color: 0x1e1e2f, side: THREE.DoubleSide }); 
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2; 
        scene.add(plane);

        const createBubble = (x, y, z) => {
            const bubbleGeometry = new THREE.SphereGeometry(Math.random() * 0.5 + 0.2, 32, 32); 
            const bubbleMaterial = new THREE.MeshStandardMaterial({
                color: Math.random() > 0.5 ? 0xffffff : 0x888888, 
                transparent: true,
                opacity: 0.7,
            });
            const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
            bubble.position.set(x, y, z);
            return bubble;
        };

         for (let i = 0; i < 100; i++) { 
            const x = Math.random() * 20 - 10; 
            const y = Math.random() * 20 - 10; 
            const z = Math.random() * -30; 
            const bubble = createBubble(x, y, z);
            scene.add(bubble);
            spheres.current.push(bubble); 
        }

        camera.position.z = 5;

  
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; 
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI / 2;

        const animate = () => {
            requestAnimationFrame(animate);
            spheres.current.forEach((bubble) => {
                bubble.position.y += Math.random() * 0.02; 
                bubble.position.x += Math.sin(bubble.position.y) * 0.01; 
                if (bubble.position.y > 10) {
                    bubble.position.y = -10; 
                    bubble.position.x = Math.random() * 20 - 10; 
                }
            });
            controls.update(); 
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default ThreeDBackground;
