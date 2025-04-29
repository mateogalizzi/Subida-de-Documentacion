document.addEventListener('DOMContentLoaded', function() {
  // Form Validation Function
  function validateForm(form) {
      let isValid = true;
      const fields = form.querySelectorAll('input, textarea');
      
      fields.forEach(field => {
          field.classList.remove('is-invalid');
          
          if (!field.value.trim()) {
              field.classList.add('is-invalid');
              isValid = false;
          }
          
          if (field.type === 'email') {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(field.value)) {
                  field.classList.add('is-invalid');
                  isValid = false;
              }
          }
      });
      
      return isValid;
  }

  // Contact Form Submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
          e.preventDefault();

          if (!validateForm(this)) return;

          try {
              const formData = new FormData(this);
              const response = await fetch('/api/contact', {
                  method: 'POST',
                  body: formData
              });

              if (response.ok) {
                  alert('Mensaje enviado exitosamente');
                  this.reset();
              } else {
                  throw new Error('Error en el envío');
              }
          } catch (error) {
              console.error('Error:', error);
              alert('No se pudo enviar el mensaje. Intente nuevamente.');
          }
      });
  }

  // Employee Login
  const loginForm = document.getElementById('employee-login-form');
  if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
          e.preventDefault();

          const email = document.getElementById('employee-email').value;
          const password = document.getElementById('employee-password').value;

          try {
              const response = await fetch('/api/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email, password })
              });

              const result = await response.json();

              if (result.success) {
                  window.location.href = '/admin-panel';
              } else {
                  alert('Credenciales incorrectas');
              }
          } catch (error) {
              console.error('Login error:', error);
              alert('Error de inicio de sesión');
          }
      });
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Car Details Modal
  const carCards = document.querySelectorAll('.car-card');
  const carDetailsModal = new bootstrap.Modal(document.getElementById('carDetailsModal'));

  carCards.forEach(card => {
      card.addEventListener('click', function() {
          const title = this.querySelector('.card-title').textContent;
          const description = this.querySelector('.card-text').textContent;
          const price = this.querySelector('.card-price').textContent;
          const image = this.querySelector('img').src;

          const modalBody = document.querySelector('#carDetailsModal .modal-body');
          modalBody.innerHTML = `
              <div class="row">
                  <div class="col-md-6">
                      <img src="${image}" class="img-fluid" alt="${title}">
                  </div>
                  <div class="col-md-6">
                      <h2>${title}</h2>
                      <p>${description}</p>
                      <p><strong>Precio:</strong> ${price}</p>
                      <button class="btn btn-primary">Solicitar Información</button>
                  </div>
              </div>
          `;

          carDetailsModal.show();
      });
  });
});