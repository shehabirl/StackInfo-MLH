import { Card, ListGroup } from 'react-bootstrap';
import StacksWrapper from '../StacksWrapper/StacksWrapper';
import './CompanyCard.css';
import emptyLogo from '../../assets/emptyLogo.svg'
const CompanyCard = (props) => {

    const { logo, title, progLangs, backend, frontend, logoBackground, url, id } = props;
    /**
     * changing background color based on logoBackground
     * and titleColor based on logoBgColor
     * logoBgColor represents the background color of the card
     * titleColor represents Company's title color associated with url. It is modified based on background color of the card (logoBgColor)
     * As if logoBgColor is black, then the titleColor must be white and vice versa.
     */
    let logoBgColor = logoBackground ? logoBackground : "#FFFFFF";
    let titleColor = logoBgColor === "#FFFFFF" ? "black" : "#FFFFFF";
    let companyLogo = logo === 'undefined' ? `../../assets/empty.png` : logo;
    let urlColor = titleColor === "#FFFFFF" ? "company-card-link-light":"company-card-link-dark";
    return (
        <Card className={`company-card box-shadow p-3`}
            style={{ background: logoBgColor }}
            key={id}
        >
            <Card.Header>
                <img
                    className="company-card-logo-wrapper mb-3"
                    src={companyLogo}
                    title={title}
                    alt={`${title}'s logo`}
                    onError={(e) => {
                        e.target.onError = null;
                        e.target.src = emptyLogo
                        /*This is used for handling errors if a logo doesn't exist and returns 404 */
                    }}
                >
                </img>
            </Card.Header>
            <Card.Footer className={`card-footer mt-3 text-center show`}>
                <a className={urlColor}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer">
                    <h3 style={{ color: titleColor }}>{title}</h3>
                </a>
                <ListGroup variant="flush" className={`box-shadow`}>
                    <ListGroup.Item key={"prog-langs"}>
                        <StacksWrapper
                            stackList={progLangs}
                            stackWrapperTitle={"Programming Languages"}
                        ></StacksWrapper>
                    </ListGroup.Item>
                    <ListGroup.Item key={"frontend"}>
                        <StacksWrapper
                            stackList={frontend}
                            stackWrapperTitle={"Frontend"}
                        ></StacksWrapper>
                    </ListGroup.Item>
                    <ListGroup.Item key={"backend"}>
                        <StacksWrapper
                            stackList={backend}
                            stackWrapperTitle={"Backend and Services"}
                        ></StacksWrapper>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Footer>
        </Card>
    )
};
export default CompanyCard;
