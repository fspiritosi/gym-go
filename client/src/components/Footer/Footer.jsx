import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="upper-section">
        <div className="contacto">
          <h3>Contacto</h3>
          <p>Teléfono: 123-456-789</p>
          <p>Email: info@gimgo.com</p>
        </div>

        <div className="mapa-sitio">
          <a href="/mapa-de-sitio">Mapa de Sitio</a>
        </div>

        <div className="fotos">
          <a href="https://www.likending.com/designer1" target="_blank" rel="noopener noreferrer">
            <img src="ruta-a-la-imagen-designer1.jpg" alt="Diseñador 1" />
          </a>
          <a href="https://www.likending.com/designer2" target="_blank" rel="noopener noreferrer">
            <img src="ruta-a-la-imagen-designer2.jpg" alt="Diseñador 2" />
          </a>
          <a href="https://www.likending.com/designer3" target="_blank" rel="noopener noreferrer">
            <img src="ruta-a-la-imagen-designer3.jpg" alt="Diseñador 3" />
          </a>
          <a href="https://www.likending.com/designer4" target="_blank" rel="noopener noreferrer">
            <img src="ruta-a-la-imagen-designer4.jpg" alt="Diseñador 4" />
          </a>
          <a href="https://www.likending.com/designer5" target="_blank" rel="noopener noreferrer">
            <img src="ruta-a-la-imagen-designer5.jpg" alt="Diseñador 5" />
          </a>
          <a href="https://www.likending.com/designer6" target="_blank" rel="noopener noreferrer">
            <img src="ruta-a-la-imagen-designer6.jpg" alt="Diseñador 6" />
          </a>
          <a href="https://www.likending.com/designer7" target="_blank" rel="noopener noreferrer">
            <img src="ruta-a-la-imagen-designer7.jpg" alt="Diseñador 7" />
          </a>
        </div>

        <div className="logo">
          <img src="ruta-al-logo.png" alt="Logo del gimnasio" />
        </div>

        <div className="iconos-redes-sociales">
          <a href="https://www.facebook.com/gimgoo" target="_blank" rel="noopener noreferrer">
            <img src="ruta-al-icono-facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/gimgo" target="_blank" rel="noopener noreferrer">
            <img src="ruta-al-icono-instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.twitter.com/gimgo" target="_blank" rel="noopener noreferrer">
            <img src="ruta-al-icono-twitter.png" alt="Twitter" />
          </a>
        </div>
      </div>

      <div className="lower-section">
        <p>&copy; {new Date().getFullYear()} GYMGO. Todos los derechos reservados.</p>
        <a href="/politica-de-privacidad">Política de Privacidad</a>
      </div>
    </footer>
  );
};

export default Footer;
