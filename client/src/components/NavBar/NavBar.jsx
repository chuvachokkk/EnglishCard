import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import logo from '../../image/logo.webp';
import { useNavigate } from 'react-router-dom';

function NavBar({ user }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <Navbar style={{ minHeight: '10vh' }} className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/theme">
          <img
            src={logo}
            alt="Логотип"
            style={{ height: '40px', width: 'auto' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button variant="primary" onClick={handleProfileClick}>
              Профиль
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
