import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './NavigationBar.css';
import logo from '../../assets/logo540_auto_x2.png';
import { home,about,search } from '../../utils/constants';
const NavigationBar = () => {
  return (
    <Navbar bg="light" variant={"light"} id={"stackinfo-navbar"} expand="lg" className="navbar-shadow mb-5">
      <Container>
        <Link to={home.link}>
          <Navbar.Brand>
            <img
              title="Groove Street, Home."
              alt="Logo"
              src={logo}
              width="120"
              className="d-inline-block"
            />{''}
            <span className="main-color-1-light">STACK</span> <span className="main-color-2">INFO</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="stackinfo-navbar-nav" />
        <Navbar.Collapse id="stackinfo-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href={home.link}>{home.title}</Nav.Link>
            <Nav.Link href={search.link}>{search.title}</Nav.Link>
            <Nav.Link href={about.link}>{about.title}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default NavigationBar;