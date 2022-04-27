import logo from '../../assets/logo540_auto_x2.png';
import { Link } from "react-router-dom";
import './Footer.css';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { home, about, privacy, stackinfo, search } from '../../utils/constants';
import SocialMediaWrapper from '../SocialMediaWrapper/SocialMediaWrapper';
var currentYear = new Date().getFullYear()
const Footer = () => {
    return (
        <footer>
            <Container fluid className='footer mt-5'>
                <Row className='justify-content-center pt-3'>
                    <Col sm={4} md={3} className="footer-logo">
                        <Link to={home.link}>
                            <img
                                title='Groove Street, Home'
                                alt='Logo'
                                src={logo}
                            >
                            </img>
                        </Link>
                        <SocialMediaWrapper
                            twitter={stackinfo.twitter}
                        />
                    </Col>
                    <Col sm={4} md={3}>
                        <h3>
                            Discover
                        </h3>
                        <ListGroup title='Go home!'>
                            <ListGroupItem>
                                <Link to={home.link}>
                                    {home.title}
                                </Link>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Link to={search.link}>
                                    {search.title}
                                </Link>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col sm={4} md={3}>
                        <h3>
                            Who we are
                        </h3>
                        <ListGroup title='About'>
                            <ListGroupItem>
                                <Link to={about.link}>
                                    {about.title}
                                </Link>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Link to={privacy.link}>
                                    {privacy.title}
                                </Link>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col sm={4} md={3}>
                        <h3>
                            {stackinfo.title}
                        </h3>
                        <p>
                            {stackinfo.description}
                        </p>
                    </Col>
                </Row>
                <hr></hr>
                <Row className='justify-content-center mt-2'>
                    <Col sm={12} className="text-center">
                        <p>Copyright {stackinfo.title} © {currentYear}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
export default Footer;