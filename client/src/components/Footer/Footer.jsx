import React from 'react';
import './footer.css';

const Footer = () => {
  const designers = [
    { name: 'David Marbello', linkedin: 'https://www.linkedin.com/designer1' },
    { name: 'Dayhana Saldarriaga', linkedin: 'https://www.linkedin.com/designer2' },
    { name: 'Diego Castillo', linkedin: 'https://www.linkedin.com/designer3' },
    { name: 'Fabricio Spiritosi', linkedin: 'https://www.linkedin.com/designer4' },
    { name: 'Juan Cruz Roldan', linkedin: 'https://www.linkedin.com/designer5' },
    { name: 'Oscar Velazquez', linkedin: 'https://www.linkedin.com/designer6' },
    { name: 'Sandra Astorga', linkedin: 'https://www.linkedin.com/designer7' }
  ];
  return (
    <footer>
      <div className="upper-section">
        <div className="contacto">
          <h3>Contacto</h3>
          <p>Teléfono: 123-456-789</p>
          <p>Email: info@gimgo.com</p>
        </div>

        <div className="mapa-sitio">
          <h3>Mapa del sitio</h3>
          <img src= "ruta-a-la-imagen.jpg" href="/mapa-de-sitio"/>
        </div>

        <div className="fotos">
          {designers.map((designer, index) => (
            <div key={index}>
              <p>{designer.name}</p>
              <button onClick={() => window.open(designer.linkedin, '_blank')}>
                <img src="ruta-al-icono-linkedin.png" alt="LinkedIn" />
                Ver perfil
              </button>
            </div>
          ))}
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
