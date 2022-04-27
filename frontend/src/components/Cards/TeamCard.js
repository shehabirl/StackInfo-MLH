import { Card} from 'react-bootstrap';
import './Cards.css';
import SocialMediaWrapper from '../SocialMediaWrapper/SocialMediaWrapper';
const TeamCard = (props) => {
const {name, twitter,github,linkedin, avatar}=props

return(
    <Card className={"cards-default"}>
        <Card.Header><img src={avatar} alt="avatar"></img></Card.Header>
        <Card.Body><h2>{name}</h2></Card.Body>
        <Card.Footer>
            <SocialMediaWrapper
            twitter={twitter}
            github={github}
            linkedin={linkedin}
            />
        </Card.Footer>
    </Card>

)

}

export default TeamCard