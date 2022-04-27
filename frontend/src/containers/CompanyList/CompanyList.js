import { Container, Row, Col } from 'react-bootstrap';
import CompanyCard from "../../components/CompanyCard/CompanyCard";
function MapDataToCompanyList(response) {
    if (!response || response === undefined || response.length === 0) {
        return (<></>)
    }
    return response.map((company) => {
        return (
            <Col key={company._id} xs={12} md={6} lg={4} className="mt-2">
                <CompanyCard
                    id={company._id}
                    logo={company.logo}
                    title={company.name}
                    logoBackground={company.logoBackground}
                    progLangs={company.progLangs}
                    backend={company.backend}
                    frontend={company.frontend}
                    url={company.url}
                >
                </CompanyCard>
            </Col>
        )
    })
}
const CompanyList = (props) => {
    const { companies } = props
    return (
        <div>
            <Container className="mt-3">
                <Row>
                    {
                        MapDataToCompanyList(companies)
                    }
                </Row>
            </Container>
        </div>
    )
}

export default CompanyList;