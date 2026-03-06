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
    card.addEventListener('click', function (e) {
      // Si el usuario hizo clic directamente en el texto del enlace, dejamos que el HTML actúe normal
      if (e.target.tagName === 'A') return;

      const link = this.querySelector('a');
      if (link) {
        // Abre el enlace en una nueva pestaña
        window.open(link.href, '_blank');
      }
    });

    // 2. Funcionalidad visual: efectos 'active' para móviles/táctil
    card.addEventListener('click', function () {
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

  /* --- Typewriter Effect --- */
  const textArray = ["Full Stack Developer", "Computer Systems Student", "Competitive Programmer"];
  let textIndex = 0;
  let charIndex = 0;
  const typewriterElement = document.getElementById("typewriter-text");

  if (typewriterElement) {
    function type() {
      if (charIndex < textArray[textIndex].length) {
        typewriterElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
      } else {
        setTimeout(erase, 2000); // Wait before erasing
      }
    }

    function erase() {
      if (charIndex > 0) {
        typewriterElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
      } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500); // Wait before typing next word
      }
    }

    // Initial delay
    setTimeout(type, 1000);
  }

  /* --- Sistema de Idioma (i18n) --- */
  const btnIdioma = document.getElementById('btn-idioma');

  if (btnIdioma) {
    let idiomaActual = localStorage.getItem('idioma') || 'en';

    // Función para actualizar textos en la pantalla
    // Ahora permite innerHTML de manera segura para mantener etiquetas <strong> y <li> dentro de atributos data-* que los contengan
    const actualizarTextos = (idioma) => {
      document.querySelectorAll('[data-es]').forEach(elemento => {
        // Usamos innerHTML si el data attribute contiene HTML como <li>, sino usamos textContent por seguridad.
        const contenido = elemento.getAttribute(`data-${idioma}`);
        if (contenido.includes('<li>') || contenido.includes('<strong>')) {
          elemento.innerHTML = contenido;
        } else {
          elemento.textContent = contenido;
        }
      });
      // Cambiar el texto del botón al idioma contrario (Muestra "ES" si el actual es "en")
      btnIdioma.textContent = idioma === 'en' ? 'ES' : 'EN';
    };

    // Aplicar idioma guardado al cargar
    actualizarTextos(idiomaActual);

    // Evento al hacer clic en el botón
    btnIdioma.addEventListener('click', () => {
      idiomaActual = idiomaActual === 'en' ? 'es' : 'en';
      localStorage.setItem('idioma', idiomaActual);
      actualizarTextos(idiomaActual);
    });
  }
});