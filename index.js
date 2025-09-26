document.addEventListener('DOMContentLoaded', () => {
  const hamburguesa = document.getElementById('hamburguesa');
  const nav = document.getElementById('nav');
  hamburguesa.addEventListener('click', () => {
    hamburguesa.classList.toggle('open');
    nav.classList.toggle('open');
  });
  // Opcional: cerrar menú al hacer click en un enlace
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburguesa.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  // ...existing code...
  document.querySelectorAll('.proyecto-card').forEach(card => {
    card.addEventListener('click', function() {
      // Si ya está activa, quítale la clase (se apaga)
      if (this.classList.contains('active')) {
        this.classList.remove('active');
      } else {
        // Quita la clase a todas y activa solo la clickeada
        document.querySelectorAll('.proyecto-card.active').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Animaciones al hacer scroll
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
    // Asigna animaciones alternas a las secciones principales
    if (el.tagName === 'SECTION') {
      if (index % 2 === 0) {
        el.classList.add('slide-in-left');
      } else {
        el.classList.add('slide-in-right');
      }
    } else { // Para otros elementos como las tarjetas de proyecto
      el.classList.add('slide-in-right');
    }
    observer.observe(el);
  });
});
