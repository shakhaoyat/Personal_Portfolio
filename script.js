// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
      link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
      });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                  const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                  window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                  });
            }
      });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
      let current = '';
      const sections = document.querySelectorAll('section');

      sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                  current = section.getAttribute('id');
            }
      });

      navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                  link.classList.add('active');
            }
      });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 20, 25, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
      } else {
            navbar.style.background = 'rgba(15, 20, 25, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
      }
});

// Scroll animations
const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
            if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
            }
      });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
      const animatedElements = document.querySelectorAll('.project-card, .certificate-card, .education-item, .about-text, .contact-info, .contact-form');
      animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
      });
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
      };

      // Basic validation
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Please fill in all fields.', 'error');
            return;
      }

      if (!isValidEmail(formData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
      }

      // Simulate form submission (replace with actual submission logic)
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
});

// Email validation
function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
      // Remove existing notifications
      const existingNotifications = document.querySelectorAll('.notification');
      existingNotifications.forEach(notification => notification.remove());

      // Create notification element
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <i class="fas fa-times close-notification"></i>
    `;

      // Add styles
      notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

      document.body.appendChild(notification);

      // Animate in
      setTimeout(() => {
            notification.style.transform = 'translateX(0)';
      }, 100);

      // Close functionality
      const closeBtn = notification.querySelector('.close-notification');
      closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
      });

      // Auto remove after 5 seconds
      setTimeout(() => {
            if (notification.parentNode) {
                  notification.style.transform = 'translateX(100%)';
                  setTimeout(() => notification.remove(), 300);
            }
      }, 5000);
}

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
      } else {
            scrollTopBtn.classList.remove('visible');
      }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
            top: 0,
            behavior: 'smooth'
      });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
      let i = 0;
      element.innerHTML = '';

      function type() {
            if (i < text.length) {
                  element.innerHTML += text.charAt(i);
                  i++;
                  setTimeout(type, speed);
            }
      }

      type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
            const originalText = heroTitle.textContent;
            setTimeout(() => {
                  typeWriter(heroTitle, originalText, 80);
            }, 500);
      }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      const rate = scrolled * -0.5;

      if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
      }
});

// Project card hover effects
document.addEventListener('DOMContentLoaded', () => {
      const projectCards = document.querySelectorAll('.project-card');

      projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                  card.style.transform = 'translateY(-10px) rotateX(5deg)';
            });

            card.addEventListener('mouseleave', () => {
                  card.style.transform = 'translateY(0) rotateX(0)';
            });
      });
});

// Certificate modal functionality
document.addEventListener('DOMContentLoaded', () => {
      const certificateCards = document.querySelectorAll('.certificate-card');

      certificateCards.forEach(card => {
            card.addEventListener('click', () => {
                  const img = card.querySelector('img');
                  const title = card.querySelector('h3').textContent;

                  // Create modal
                  const modal = document.createElement('div');
                  modal.className = 'certificate-modal';
                  modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${img.src}" alt="${title}">
                    <h3>${title}</h3>
                </div>
            `;

                  // Add modal styles
                  modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

                  const modalContent = modal.querySelector('.modal-content');
                  modalContent.style.cssText = `
                background: #1a202c;
                padding: 2rem;
                border-radius: 10px;
                text-align: center;
                position: relative;
                max-width: 80%;
                max-height: 80%;
                border: 1px solid rgba(64, 144, 203, 0.3);
            `;

                  const modalImg = modal.querySelector('img');
                  modalImg.style.cssText = `
                max-width: 100%;
                max-height: 70vh;
                object-fit: contain;
                margin-bottom: 1rem;
            `;

                  const closeBtn = modal.querySelector('.close-modal');
                  closeBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 2rem;
                cursor: pointer;
                color: #a0aec0;
            `;

                  // Style the modal title
                  const modalTitle = modal.querySelector('h3');
                  if (modalTitle) {
                        modalTitle.style.color = '#e0e6ed';
                  }

                  document.body.appendChild(modal);

                  // Animate in
                  setTimeout(() => {
                        modal.style.opacity = '1';
                  }, 10);

                  // Close functionality
                  const closeModal = () => {
                        modal.style.opacity = '0';
                        setTimeout(() => modal.remove(), 300);
                  };

                  closeBtn.addEventListener('click', closeModal);
                  modal.addEventListener('click', (e) => {
                        if (e.target === modal) closeModal();
                  });

                  // Close on escape key
                  document.addEventListener('keydown', (e) => {
                        if (e.key === 'Escape') closeModal();
                  });
            });
      });
});

// Preloader
window.addEventListener('load', () => {
      const preloader = document.createElement('div');
      preloader.className = 'preloader';
      preloader.innerHTML = `
        <div class="loader">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;

      preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0f1419;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;

      const loader = preloader.querySelector('.loader');
      loader.style.cssText = `
        text-align: center;
        color: #4090cb;
    `;

      const spinner = preloader.querySelector('.spinner');
      spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 4px solid #2d3748;
        border-top: 4px solid #4090cb;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    `;

      // Add spinner animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
      document.head.appendChild(style);

      document.body.appendChild(preloader);

      // Hide preloader after a short delay
      setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
      }, 1000);
});
