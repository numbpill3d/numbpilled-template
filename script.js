document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after a delay
    setTimeout(function() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('wrapper').style.display = 'block';
    }, 3000); // Adjust the delay as needed

    // Tab functionality
    const tabLinks = document.querySelectorAll('.tab-links li a');
    const tabs = document.querySelectorAll('.tab-content .tab');

    tabLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.tab-links li.active').classList.remove('active');
            this.parentNode.classList.add('active');

            document.querySelector('.tab-content .active').classList.remove('active');
            const targetTab = document.querySelector(this.getAttribute('href'));
            targetTab.classList.add('active');
        });
    });

    // Random glitch effect on paragraphs
    const paragraphs = document.querySelectorAll('#main-content p');

    setInterval(function() {
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        const paragraph = paragraphs[randomIndex];
        paragraph.classList.add('glitch');
        paragraph.setAttribute('data-text', paragraph.textContent);

        setTimeout(function() {
            paragraph.classList.remove('glitch');
        }, 1000);
    }, 5000);

    // Initialize Three.js background animation
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.style.zIndex = '-1';

    // Add a Torus Knot to the scene
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x9400D3, wireframe: true });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    camera.position.z = 50;

    function animate() {
        requestAnimationFrame(animate);

        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;

        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize for Three.js
    window.addEventListener('resize', function() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});
