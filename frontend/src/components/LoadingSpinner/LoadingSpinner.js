import { Spinner } from 'react-bootstrap';
import './LoadingSpinner.css';
const LoadingSpinner = () => {
    return (
        <div className="mt-5 d-flex justify-content-center">
            <Spinner className="mt-5" animation="border" role="status" size="lg">
                <span className="visually-hidden">Loading...</span>
            </Spinner>

        </div>
    )
}

export default LoadingSpinner;