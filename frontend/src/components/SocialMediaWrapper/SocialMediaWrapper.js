import { ListGroup, ListGroupItem } from 'react-bootstrap';
import '../../assets/fonts/ionicons.min.css';
import './SocialMediaWrapper.css';
const SocialMediaWrapper = (props) => {
    const { twitter, linkedin, facebook, hashnode, github } = props;
    return (
        <ListGroup className={"flex-row justify-content-between"}>
            {twitter ? 
            <ListGroupItem className="social-media-item border-0 bg-transparent">
                <a href={twitter} target="_blank" rel="noreferrer">
                    <i className="icon ion-social-twitter"></i>
                </a>
            </ListGroupItem> : <></>}
            {github ? 
                <ListGroupItem className="social-media-item border-0 bg-transparent">
                    <a href={github} target="_blank" rel="noreferrer">
                        <i className="icon ion-social-github"></i>
                    </a>
                </ListGroupItem> : <></>
            }
            {facebook ? 
                <ListGroupItem className="social-media-item border-0 bg-transparent">
                    <a href={facebook} target="_blank" rel="noreferrer">
                        <i className="icon ion-social-facebook"></i>
                    </a>
                </ListGroupItem> : <></>
            }
            {linkedin ? 
                <ListGroupItem className="social-media-item border-0 bg-transparent">
                    <a href={linkedin} target="_blank" rel="noreferrer">
                        <i className="icon ion-social-linkedin"></i>
                    </a>
                </ListGroupItem> : <></>
            }
        </ListGroup>
    )
}

export default SocialMediaWrapper;