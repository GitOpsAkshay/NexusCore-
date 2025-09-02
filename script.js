// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-quart'
    });
  
    // Enhanced Hamburger Menu Functionality
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const bars = ['bar1', 'bar2', 'bar3'].map(id => document.getElementById(id));
  
    menuToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('open');
      
      // Toggle menu state
      mobileMenu.classList.toggle('open');
      menuToggle.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
      
      // Animate bars
      bars.forEach(bar => bar.classList.toggle('bg-white'));
    });
  
    // Close menu when clicking on links
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  
    // Close menu when clicking outside
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('nav').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Initialize neural network background if element exists
    const neuralBg = document.getElementById('neural-network');
    if (neuralBg && typeof THREE !== 'undefined') {
      initNeuralBackground();
    }
  });
  
  function initNeuralBackground() {
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      });
  
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById('neural-network').appendChild(renderer.domElement);
  
      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1500;
      
      const posArray = new Float32Array(particlesCount * 3);
      for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 2000;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 2,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8
      });
      
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
  
      camera.position.z = 1000;
  
      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0001;
        particlesMesh.rotation.y += 0.0001;
        
        renderer.render(scene, camera);
      }
      
      animate();
  
      // Handle window resize
      window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
  
    } catch (error) {
      console.error('Error initializing neural background:', error);
    }
  }
