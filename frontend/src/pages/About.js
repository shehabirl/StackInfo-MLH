import { Container, Row, Col} from "react-bootstrap"
import { about, stackinfo, team_metadata, stackcity } from "../utils/constants"
import { Helmet } from "react-helmet"
import { Fragment } from "react"
import './About/About.css';
import TeamCard from '.././components/Cards/TeamCard';
const About = () => {
    return (
        <Fragment>
            <Helmet>
                <title>{stackinfo.title} - {about.title}</title>
            </Helmet>
            <Container fluid className={"stackinfo-history mb-5"}>
                <Row>
                    <Col sm={12}>
                        <h3 className="stackinfo-about-title">{`${stackinfo.title} - part of ${stackcity.title}`}</h3>
                        <h2>{team_metadata.whoAreWe}</h2>
                        <p>{team_metadata.aim}</p>
                    </Col>
                </Row>
            </Container>
            <Container className={"stackinfo-team"}>
                <Row>
                    <Col sm={12}>
                        <h3 className="stackinfo-about-title">Meet the team.</h3>
                        <blockquote className="callout quote EN rubik-font">
                            {team_metadata.lookingForInterns}
                            <cite> - Our Team</cite>
                        </blockquote>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={12} md={6}>
                    <TeamCard 
                    name={"Shehab"}
                    twitter={"https://www.twitter.com/shehabirl"}
                    linkedin={"https://www.linkedin.com/in/shehabadel"}
                    github={"https://www.github.com/shehabadel"}
                    />
                    </Col>
                    <Col sm={12} md={6}>
                    <TeamCard 
                    name={"Shehab"}
                    twitter={"https://www.twitter.com/shehabirl"}
                    linkedin={"https://www.linkedin.com/in/shehabadel"}
                    github={"https://www.github.com/shehabadel"}
                    />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default About;