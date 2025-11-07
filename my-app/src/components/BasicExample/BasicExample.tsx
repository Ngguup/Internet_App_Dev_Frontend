import './BasicExample.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function BasicExample() {
  return (
    <header>
      <Navbar expand="lg" className='header justify-content-between' fixed='top'>
            <Navbar.Brand href="/" className='ms-5 center-btn'>Прогноз роста объема данных</Navbar.Brand>
            <Nav.Link href="/factors" className='me-5'>Фаторы роста</Nav.Link>
      </Navbar>
    </header>
  );
}

export default BasicExample;