document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // Parallax Hero
  gsap.to(".hero-bg-wrapper", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Title Stagger Animation
  gsap.from(".hero-title span", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.2
  });

  // General Fade Up Animation
  gsap.utils.toArray('[data-anim="fade-up"]').forEach(elem => {
    const delay = elem.getAttribute('data-delay') || 0;
    gsap.from(elem, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: parseFloat(delay),
      scrollTrigger: {
        trigger: elem,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Navbar drop down
  gsap.from(".navbar", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.5
  });

  // Cinematic Flashing Marquee Effect
  const marqueeImages = document.querySelectorAll('.marquee-track img');
  if (marqueeImages.length > 0) {
    // Random paparazzi flashing effect
    setInterval(() => {
      // Pick a random number of images to flash at once (1 to 3)
      const flashCount = Math.floor(Math.random() * 3) + 1;
      
      for(let i=0; i < flashCount; i++) {
        const randomImg = marqueeImages[Math.floor(Math.random() * marqueeImages.length)];
        
        // Add flash
        randomImg.classList.add('flash-active');
        
        // Remove flash quickly (strobe effect)
        setTimeout(() => {
          randomImg.classList.remove('flash-active');
        }, 1000); // Pulse lasts 1 second
      }
    }, 800); // Triggers every 800ms
    
    // Add scroll velocity flash effect
    ScrollTrigger.create({
      trigger: ".flash-marquee",
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // If scrolling fast, increase flashes
        if (Math.abs(self.getVelocity()) > 50) {
          const randomImg = marqueeImages[Math.floor(Math.random() * marqueeImages.length)];
          randomImg.classList.add('flash-active');
          setTimeout(() => randomImg.classList.remove('flash-active'), 1000);
        }
      }
    });

    // Image Modal Logic
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');

    marqueeImages.forEach(img => {
      img.style.cursor = 'pointer'; // Make it obvious it's clickable
      img.addEventListener('click', () => {
        modalImg.src = img.src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while open
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => { modalImg.src = ''; }, 400); // Clear after animation
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(); // Close if clicking backdrop
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }

  // VIP Cinematic Video Scrubbing (Pinned Frame-by-Frame)
  const champagneVideo = document.getElementById("champagne-scrub");
  if (champagneVideo) {
    const setupScrub = () => {
      ScrollTrigger.create({
        trigger: ".vip-hero",
        start: "top top",      
        end: "+=1000", // Cut down to 1000px so it finishes twice as fast
        pin: true,      // Locks the video on screen while scrolling
        scrub: 0.1,    // 0.1 gives a snappier, instant feedback
        onUpdate: (self) => {
          if (champagneVideo.duration) {
            // Fast, smooth frame updates
            requestAnimationFrame(() => {
              champagneVideo.currentTime = self.progress * champagneVideo.duration;
            });
          }
        }
      });
    };

    if (champagneVideo.readyState >= 1) {
      setupScrub();
    } else {
      champagneVideo.addEventListener('loadedmetadata', setupScrub);
    }
  }
});
