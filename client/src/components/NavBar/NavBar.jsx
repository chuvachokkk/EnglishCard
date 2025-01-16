import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navig() {
  return (
    <Navbar style={{minHeight:"10vh"}} className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/theme">LOGOOO</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="/profile">PROFILE</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navig;