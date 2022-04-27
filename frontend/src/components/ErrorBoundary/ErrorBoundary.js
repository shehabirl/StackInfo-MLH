import { Col } from "react-bootstrap";
import empty from '../../assets/empty.png'
import './ErrorBoundary.css';
const ErrorBoundary = (props) =>{
const {message}=props;
return(
    <Col sm={12} className={"mt-3"}>
        <h3 className={"text-center fs-1"}>{message}</h3>
        <img src={empty} alt={""} className={"error-boundary-image"}></img>
    </Col>
)
}

export default ErrorBoundary;