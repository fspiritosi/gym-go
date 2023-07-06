import React from 'react';
import './footer.css';
// import footer from '../../assets/footer';

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
          {/* <img src= {footer['mapa-gym']}/> */}
        </div>

        <div className="fotos">
          {designers.map((designer, index) => (
            <div key={index}>
              <p>{designer.name}</p>
              <button onClick={() => window.open(designer.linkedin, '_blank')}>
                {/* <img src={footer.linkedin} /> */}
                Ver perfil
              </button>
            </div>
          ))}
        </div>

        <div className="logo">
          {/* <img src={footer.logo} /> */}
        </div>

        <div className="iconos-redes-sociales">
          <a href="https://www.facebook.com/gimgoo" target="_blank" rel="noopener noreferrer">
            {/* <img src={footer.facebook} /> */}
          </a>
          
          <a href="https://www.instagram.com/gimgo" target="_blank" rel="noopener noreferrer">
            {/* <img src={footer.instagram} /> */}
          </a>
          <a href="https://www.twitter.com/gimgo" target="_blank" rel="noopener noreferrer">
            {/* <img src={footer.twitter} /> */}
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
