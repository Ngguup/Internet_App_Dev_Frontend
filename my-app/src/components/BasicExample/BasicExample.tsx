import './BasicExample.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function BasicExample() {
  return (
    <header>
      <Navbar expand="lg" className='header' fixed='top'>
            <Navbar.Brand href="/" className='center-btn'>Прогноз роста объема данных</Navbar.Brand>
            <Nav.Link href="/factors" className='nav-link-hidden'>Фаторы роста</Nav.Link>
      </Navbar>
    </header>
  );
}

export default BasicExample;