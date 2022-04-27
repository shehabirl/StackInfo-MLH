import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import '../css/ModeratorView.css';
function ModeratorView() {
    return (
        <div>
            <Container>
                <Row className="body__content">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Company Name</th>
                                <th>website</th>
                                <th><a className="btn btn-sm btn-success">Add</a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <div className="d-flex flex-row align-items-center justify-content-start">

                                        <img className="company-card-logo-wrapper shrink-img" src={"https://static2.brantu.com/images/content/large/3Trl3ROlF-04420db97caa10d2.png"} title="whatever" alt={`Marks's logo`}></img>
                                        <span className="company-title">Gamadan</span>
                                    </div>
                                </td>
                                <td>Otto</td>
                                <td>
                                    <a className="btn btn-sm btn-primary">Edit</a>
                                    <a className="btn btn-sm btn-danger">Delete</a>

                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <div className="d-flex flex-row align-items-center justify-content-start">

                                        <img className="company-card-logo-wrapper shrink-img" src={"https://static2.brantu.com/images/content/large/3Trl3ROlF-04420db97caa10d2.png"} title="whatever" alt={`Marks's logo`}></img>
                                        <span className="company-title">Gamadan</span>
                                    </div>
                                </td>
                                <td>Thornton</td>
                                <td>
                                    <a className="btn btn-sm btn-primary">Edit</a>
                                    <a className="btn btn-sm btn-danger">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>
                                    <div className="d-flex flex-row align-items-center justify-content-start">

                                        <img className="company-card-logo-wrapper shrink-img" src={"https://static2.brantu.com/images/content/large/3Trl3ROlF-04420db97caa10d2.png"} title="whatever" alt={`Marks's logo`}></img>
                                        <span className="company-title">Gamadan</span>
                                    </div>
                                </td>
                                <td>3</td>
                                <td>
                                    <a className="btn btn-sm btn-primary">Edit</a>
                                    <a className="btn btn-sm btn-danger">Delete</a>

                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    )
}

export default ModeratorView;