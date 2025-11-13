/* ========================================
   ID ENERGY GROUP - JAVASCRIPT
   Efecto Parallax y Control de Video
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    const heroSection = document.querySelector('.hero-parallax');
    
    // Variables para controlar el rendimiento
    let ticking = false;
    
    /* ========================================
       EFECTO PARALLAX PARA VIDEO
       ======================================== */
    
    function updateParallax() {
        const scrollPosition = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        
        // Solo aplicar el efecto si estamos en la sección hero
        if (scrollPosition < heroHeight) {
            // Ajusta la velocidad del parallax (0.5 = mitad de velocidad)
            // Valores más bajos = efecto más pronunciado
            const translateY = scrollPosition * 0.5;
            
            // Aplicar transformación al video
            video.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;
            
            // Ajustar opacidad al hacer scroll (opcional)
            const opacity = 1 - (scrollPosition / heroHeight) * 0.7;
            video.style.opacity = Math.max(opacity, 0.3);
        }
        
        ticking = false;
    }
    
    // Usar requestAnimationFrame para mejor rendimiento
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Escuchar el evento scroll
    window.addEventListener('scroll', requestTick, { passive: true });
    
    /* ========================================
       CONTROL DE VELOCIDAD Y REPRODUCCIÓN DEL VIDEO
       ======================================== */
    
    if (video) {
        // REDUCIR VELOCIDAD DEL VIDEO
        // 0.5 = 50% más lento (recomendado para efecto cinematic)
        // 0.25 = 75% más lento, 0.75 = 25% más lento, 1 = normal
        video.playbackRate = 0.5;
        
        // Intentar reproducir el video automáticamente
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('Video reproduciéndose automáticamente');
                })
                .catch(error => {
                    console.log('Reproducción automática bloqueada:', error);
                    // Si falla el autoplay, mostrar botón de play
                    showPlayButton();
                });
        }
        
        // Optimización: Pausar video cuando no está visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.25 });
        
        observer.observe(heroSection);
        
        // Eventos de carga del video
        video.addEventListener('loadstart', function() {
            console.log('Cargando video...');
        });
        
        video.addEventListener('canplay', function() {
            console.log('Video listo para reproducir');
        });
        
        video.addEventListener('error', function(e) {
            console.error('Error al cargar el video:', e);
        });
    }
    
    /* ========================================
       BOTÓN DE PLAY ALTERNATIVO
       (Por si el autoplay falla)
       ======================================== */
    
    function showPlayButton() {
        const playBtn = document.createElement('button');
        playBtn.innerHTML = '▶ Reproducir Video';
        playBtn.className = 'video-play-btn';
        playBtn.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            padding: 15px 30px;
            background-color: rgba(255, 167, 38, 0.9);
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        `;
        
        playBtn.addEventListener('click', () => {
            video.play();
            playBtn.style.display = 'none';
        });
        
        playBtn.addEventListener('mouseenter', () => {
            playBtn.style.backgroundColor = 'rgba(255, 152, 0, 1)';
            playBtn.style.transform = 'translate(-50%, -50%) scale(1.05)';
        });
        
        playBtn.addEventListener('mouseleave', () => {
            playBtn.style.backgroundColor = 'rgba(255, 167, 38, 0.9)';
            playBtn.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        heroSection.appendChild(playBtn);
    }
    
    /* ========================================
       SMOOTH SCROLL PARA BOTÓN CTA
       ======================================== */
    
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 160; // Altura del header fijo
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    /* ========================================
       HEADER DINÁMICO AL HACER SCROLL
       ======================================== */
    
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Cambiar estilo del header al hacer scroll
        if (currentScroll > 100) {
            // Header sólido después de hacer scroll
            header.style.background = 'linear-gradient(135deg, #2E7D32 0%, #1976D2 100%)';
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        } else {
            // Header semitransparente al inicio
            header.style.background = 'linear-gradient(135deg, rgba(46, 125, 50, 0.95) 0%, rgba(25, 118, 210, 0.95) 100%)';
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    /* ========================================
       ANIMACIÓN DE APARICIÓN PARA SECCIONES
       ======================================== */
    
    const sections = document.querySelectorAll('main section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
    
    /* ========================================
       INFORMACIÓN DE DEBUG (CONSOLA)
       ======================================== */
    
    console.log('🎬 Efecto Parallax activado');
    console.log('⚡ Velocidad del video:', video ? video.playbackRate : 'No detectado');
    console.log('📱 Ancho de pantalla:', window.innerWidth + 'px');
});