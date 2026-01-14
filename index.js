document.addEventListener('DOMContentLoaded', () => {
  /* --- Menú Hamburguesa --- */
  const hamburguesa = document.getElementById('hamburguesa');
  const nav = document.getElementById('nav');

  hamburguesa.addEventListener('click', () => {
    hamburguesa.classList.toggle('open');
    nav.classList.toggle('open');
    const isExpanded = hamburguesa.getAttribute('aria-expanded') === 'true';
    hamburguesa.setAttribute('aria-expanded', !isExpanded);
  });

  // Cerrar menú automáticamente al hacer click en un enlace
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburguesa.classList.remove('open');
      nav.classList.remove('open');
      hamburguesa.setAttribute('aria-expanded', 'false');
    });
  });

  /* --- Tarjetas de Proyectos (Mejorado) --- */
  document.querySelectorAll('.proyecto-card').forEach(card => {
    // 1. Funcionalidad de enlace: clic en la tarjeta = abrir enlace
    card.addEventListener('click', function(e) {
      // Si el usuario hizo clic directamente en el texto del enlace, dejamos que el HTML actúe normal
      if (e.target.tagName === 'A') return;

      const link = this.querySelector('a');
      if (link) {
        // Abre el enlace en una nueva pestaña
        window.open(link.href, '_blank');
      }
    });

    // 2. Funcionalidad visual: efectos 'active' para móviles/táctil
    card.addEventListener('click', function() {
      if (this.classList.contains('active')) {
        this.classList.remove('active');
      } else {
        // Apaga las demás y enciende esta
        document.querySelectorAll('.proyecto-card.active').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  /* --- Animaciones al hacer Scroll --- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1 // Se activa cuando el 10% del elemento es visible
  });

  const animatedElements = document.querySelectorAll('.animated');
  animatedElements.forEach((el, index) => {
    // Asigna animaciones alternas (izquierda/derecha) a las secciones principales
    if (el.tagName === 'SECTION') {
      if (index % 2 === 0) {
        el.classList.add('slide-in-left');
      } else {
        el.classList.add('slide-in-right');
      }
    } else { 
      // Para otros elementos (como el formulario o tarjetas) usa slide-in-right por defecto
      el.classList.add('slide-in-right');
    }
    observer.observe(el);
  });
});