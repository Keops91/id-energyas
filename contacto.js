// Validación del formulario
document.getElementById('formContacto').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let nombre = document.getElementById('nombre').value.trim();
    let email = document.getElementById('email').value.trim();
    let consulta = document.getElementById('consulta').value.trim();
    let privacidad = document.getElementById('privacidad').checked;
    let respuesta = document.getElementById('respuesta');
    
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre || !email || !consulta) {
        respuesta.innerText = ' Por favor completa todos los campos obligatorios.';
        respuesta.className = 'error';
        return;
    }

    if (!emailRegex.test(email)) {
        respuesta.innerText = ' El formato de email no es válido.';
        respuesta.className = 'error';
        return;
    }

    if (!privacidad) {
        respuesta.innerText = ' Debes aceptar la política de privacidad.';
        respuesta.className = 'error';
        return;
    }

    respuesta.innerText = ' ¡Formulario enviado correctamente! Te contactaremos pronto.';
    respuesta.className = 'success';
    this.reset();
    
    setTimeout(() => {
        respuesta.style.display = 'none';
    }, 5000);
});

// Inicialización del mapa
window.addEventListener('load', () => {
  if (typeof L !== 'undefined') {
    const map = L.map('map').setView([38.987683, -3.90803], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);
    L.marker([38.987683, -3.90803])
      .addTo(map)
      .bindPopup("<b>ID Energyas Group</b><br>C/ Martir 3, Ciudad Real<br>13005 España")
      .openPopup();
    L.control.scale().addTo(map);
  }
});
