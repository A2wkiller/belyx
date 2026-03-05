import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function InteractiveGlobe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const globeGroupRef = useRef<THREE.Group | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const frameIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            45,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 3.5; // Zoomed out to show full globe

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true, // Transparent background
        });
        renderer.setSize(
            containerRef.current.clientWidth,
            containerRef.current.clientHeight
        );
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize for high DPI
        renderer.setClearColor(0x000000, 0); // Fully transparent
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Add Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        // Create Globe Group
        const globeGroup = new THREE.Group();
        globeGroupRef.current = globeGroup;
        scene.add(globeGroup);

        // Load Texture
        const textureLoader = new THREE.TextureLoader();
        // Using local asset to ensure availability and performance
        const earthTexture = textureLoader.load('/assets/earth-map.jpg');
        
        // Create Globe Mesh with Texture
        const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
        const globeMaterial = new THREE.MeshPhongMaterial({
            map: earthTexture,
            color: 0xaaaaaa, // Slight tint to match theme
            specular: 0x333333,
            shininess: 15
        });

        const globe = new THREE.Mesh(globeGeometry, globeMaterial);
        // Correct alignment: Three.js Sphere UVs usually map the texture such that 
        // 0 longitude is at the back. Rotating -90 degrees (or -PI/2) often aligns it 
        // with the standard math used for markers.
        // We need to experiment, but -PI/2 is a common fix for standard equirectangular maps.
        globe.rotation.y = -Math.PI / 2;
        globeGroup.add(globe);

        // Add outer glow ring (keeping the shader for the atmosphere glow)
        const glowGeometry = new THREE.SphereGeometry(1.05, 64, 64);
        const glowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                glowColor: { value: new THREE.Color(0x14b8a6) },
            },
            vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
            transparent: true,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
        });

        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        scene.add(glowMesh); // Glow stays relative to camera/scene



        // Animation loop
        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);

            // Rotate globe group
            if (globeGroupRef.current) {
                globeGroupRef.current.rotation.y += 0.005; // Continuous rotation
            }

            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current) return;

            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        // Mouse interaction (optional - rotate on hover)
        const handleMouseMove = (event: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            // Subtle tilt based on mouse position
            if (globeGroupRef.current) {
                globeGroupRef.current.rotation.x = mouseY * 0.1;
            }
        };
        containerRef.current.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current) {
                containerRef.current.removeEventListener('mousemove', handleMouseMove);
            }
            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
            }
            if (rendererRef.current && containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }
            if (globeGroupRef.current) {
                // traverse and dispose
                globeGroupRef.current.traverse((obj) => {
                    if (obj instanceof THREE.Mesh) {
                        obj.geometry.dispose();
                        if (obj.material instanceof THREE.Material) {
                            obj.material.dispose();
                        }
                    }
                });
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full"
            style={{ minHeight: '500px' }}
        />
    );
}