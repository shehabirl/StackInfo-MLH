import { Container, Row, Col } from 'react-bootstrap';
import { stackinfo } from '../../utils/constants';
import './HomeHeader.css';
const HomeHeader = () => {
    return (
        <Container className='home-header'>
            <Row id='stackinfo-announcements' className='my-5'></Row>
            <Row>
                <Col sm={12} md={6} >
                    <h1 className='main-color-1-dark'>{stackinfo.vision}</h1>
                    <p>
                    {stackinfo.description}
                    </p>
                </Col>
                <Col sm={12} md={6}>
                    <h2 className='main-color-2'>Want your organization to be featured here?</h2>
                    <p>Check this <a href={stackinfo.formURL} target="_blank" rel="noreferrer" className='main-color-1-dark'>form</a> and follow the instructions provided in order to feature your company in {stackinfo.title}.</p>
                    <p>Note: You can submit a form if you want to update or remove your company from {stackinfo.title} as well.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeHeader;