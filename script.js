// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenuPanel = document.getElementById('mobileMenuPanel');

if (mobileMenuButton && mobileMenuPanel) {
      mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenuPanel.classList.contains('hidden');
            mobileMenuPanel.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', String(isHidden));

            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                  icon.classList.toggle('fa-bars');
                  icon.classList.toggle('fa-times');
            }
      });
}

navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                  const offsetTop = targetSection.offsetTop - 64; // Account for fixed navbar
                  window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                  });
            }

            if (mobileMenuPanel && !mobileMenuPanel.classList.contains('hidden')) {
                  mobileMenuPanel.classList.add('hidden');
                  if (mobileMenuButton) {
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                        const icon = mobileMenuButton.querySelector('i');
                        if (icon) {
                              icon.classList.add('fa-bars');
                              icon.classList.remove('fa-times');
                        }
                  }
            }
      });
});

// Active navigation link highlighting with modern colors
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
            link.classList.remove('text-cyan-400');
            link.classList.add('text-gray-300');
            if (link.getAttribute('href') === `#${current}`) {
                  link.classList.remove('text-gray-300');
                  link.classList.add('text-cyan-400');
            }
      });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                  name: document.getElementById('name').value,
                  email: document.getElementById('email').value,
                  subject: document.getElementById('subject').value,
                  message: document.getElementById('message').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                  showNotification('All fields are required!', 'error');
                  return;
            }

            if (!isValidEmail(formData.email)) {
                  showNotification('Please enter a valid email address.', 'error');
                  return;
            }

            // Show success message
            showNotification('Message sent successfully! 🚀', 'success');

            // Log form data (in production, send to backend)
            console.log('Form submitted:', formData);

            // Reset form
            contactForm.reset();
      });
}

// Email validation
function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
}

// Modern notification system
function showNotification(message, type) {
      // Remove existing notifications
      const existingNotifications = document.querySelectorAll('.notification');
      existingNotifications.forEach(notification => notification.remove());

      // Create notification element
      const notification = document.createElement('div');
      notification.className = 'notification fixed top-20 right-4 text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3 max-w-md transform translate-x-full transition-transform duration-300 font-mono';

      if (type === 'success') {
            notification.classList.add('bg-gradient-to-r', 'from-green-600', 'to-emerald-600', 'border', 'border-green-400');
      } else {
            notification.classList.add('bg-gradient-to-r', 'from-red-600', 'to-rose-600', 'border', 'border-red-400');
      }

      notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} text-xl"></i>
            <div class="flex-grow">
                  <p class="font-semibold text-sm">${message}</p>
            </div>
            <button class="close-notification hover:opacity-80 transition-opacity">
                  <i class="fas fa-times"></i>
            </button>
      `;

      document.body.appendChild(notification);

      // Animate in
      setTimeout(() => {
            notification.classList.remove('translate-x-full');
            notification.classList.add('translate-x-0');
      }, 100);

      // Close functionality
      const closeBtn = notification.querySelector('.close-notification');
      closeBtn.addEventListener('click', () => {
            closeNotification(notification);
      });

      // Auto remove after 5 seconds
      setTimeout(() => {
            closeNotification(notification);
      }, 5000);
}

function closeNotification(notification) {
      if (notification && notification.parentNode) {
            notification.classList.remove('translate-x-0');
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
      }
}

// Scroll reveal animations
const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
            if (entry.isIntersecting) {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
            }
      });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
      });

      // Trigger animations on first load
      setTimeout(() => {
            document.querySelector('#home').style.opacity = '1';
            document.querySelector('#home').style.transform = 'translateY(0)';
      }, 100);
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg flex items-center justify-center shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 z-40 opacity-0 pointer-events-none hover:-translate-y-1 border border-cyan-400';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
            scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollTopBtn.classList.add('opacity-100');
      } else {
            scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
            scrollTopBtn.classList.remove('opacity-100');
      }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
            top: 0,
            behavior: 'smooth'
      });
});

// Certificate modal functionality
document.addEventListener('DOMContentLoaded', () => {
      const certificateCards = document.querySelectorAll('#certificates .group');

      certificateCards.forEach(card => {
            card.addEventListener('click', () => {
                  const img = card.querySelector('img');
                  const title = card.querySelector('h3').textContent;

                  // Create modal
                  const modal = document.createElement('div');
                  modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 p-4';
                  modal.innerHTML = `
                        <div class="relative bg-gradient-to-br from-cyan-900/30 to-purple-900/30 backdrop-blur-sm p-8 rounded-2xl max-w-4xl max-h-[90vh] overflow-auto border-2 border-cyan-500/30 neon-border">
                              <button class="absolute top-4 right-4 w-10 h-10 bg-red-600 hover:bg-red-500 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110">
                                    <i class="fas fa-times text-xl"></i>
                              </button>
                              <img src="${img.src}" alt="${title}" class="w-full h-auto rounded-lg mb-4 border border-cyan-500/20">
                              <h3 class="text-2xl font-bold text-center text-cyan-400 font-mono">${title}</h3>
                        </div>
                  `;

                  document.body.appendChild(modal);

                  // Animate in
                  setTimeout(() => {
                        modal.classList.remove('opacity-0');
                  }, 10);

                  // Close functionality
                  const closeModal = () => {
                        modal.classList.add('opacity-0');
                        setTimeout(() => modal.remove(), 300);
                  };

                  modal.querySelector('button').addEventListener('click', closeModal);
                  modal.addEventListener('click', (e) => {
                        if (e.target === modal) closeModal();
                  });

                  // Close on escape key
                  const handleEscape = (e) => {
                        if (e.key === 'Escape') {
                              closeModal();
                              document.removeEventListener('keydown', handleEscape);
                        }
                  };
                  document.addEventListener('keydown', handleEscape);
            });
      });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector('#home');

      if (heroSection && scrolled < window.innerHeight) {
            const rate = scrolled * 0.15;
            heroSection.style.transform = `translateY(${rate}px)`;
      }
});

// Typing animation effect for code block
function typeWriter(element, text, speed = 50) {
      let i = 0;
      const originalText = element.innerHTML;
      element.innerHTML = '';
      element.style.display = 'block';

      function type() {
            if (i < text.length) {
                  element.innerHTML += text.charAt(i);
                  i++;
                  setTimeout(type, speed);
            } else {
                  element.innerHTML = originalText;
            }
      }

      type();
}

// Cursor trail effect
let coords = { x: 0, y: 0 };
const circles = [];
const colors = ['#00f5ff', '#7c3aed', '#06b6d4', '#9333ea'];

for (let i = 0; i < 8; i++) {
      const circle = document.createElement('div');
      circle.className = 'cursor-trail';
      circle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${(8 - i) / 10};
            background: ${colors[i % colors.length]};
            transition: all 0.1s ease;
            mix-blend-mode: screen;
      `;
      document.body.appendChild(circle);
      circles.push(circle);
}

window.addEventListener('mousemove', (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
});

function animateCircles() {
      let x = coords.x;
      let y = coords.y;

      circles.forEach((circle, index) => {
            circle.style.left = x - 4 + 'px';
            circle.style.top = y - 4 + 'px';
            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.offsetLeft - x) * 0.3;
            y += (nextCircle.offsetTop - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
}

animateCircles();

// Enhanced preloader with animation
window.addEventListener('load', () => {
      const preloader = document.createElement('div');
      preloader.className = 'fixed inset-0 bg-gradient-to-br from-dark via-cyan-950/20 to-dark flex items-center justify-center z-50 transition-opacity duration-500';
      preloader.innerHTML = `
            <div class="text-center">
                  <div class="relative">
                        <div class="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-6"></div>
                        <div class="absolute inset-0 w-20 h-20 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-spin mx-auto" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
                  </div>
                  <p class="text-cyan-400 text-lg font-mono font-semibold animate-pulse">
                        <span class="text-cyan-400">&lt;</span>Loading<span class="text-purple-400 animate-pulse">...</span><span class="text-cyan-400">/&gt;</span>
                  </p>
            </div>
      `;

      document.body.appendChild(preloader);

      // Hide preloader
      setTimeout(() => {
            preloader.classList.add('opacity-0');
            setTimeout(() => preloader.remove(), 500);
      }, 1500);
});

console.log('%c👨‍💻 Welcome to my Portfolio! ', 'background: linear-gradient(90deg, #00f5ff, #7c3aed); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('%cInterested in the code? Check out the repository on GitHub!', 'color: #00f5ff; font-size: 14px;');
