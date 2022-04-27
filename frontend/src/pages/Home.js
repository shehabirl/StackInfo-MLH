import HomeHeader from '../components/HomeHeader/HomeHeader';
import { Helmet } from 'react-helmet';
import { home, stackinfo, somethingWrongError, showMoreBtnText, noCompaniesError } from '../utils/constants';
import CompanyList from '../containers/CompanyList/CompanyList';
import { useState, useEffect } from 'react';
import { fetchFeedData } from '../network/network';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import ScrollToTopBtn from '../components/ScrollToTop/ScrollToTopButton';
import CustomBtn from '../components/Buttons/CustomBtn';
import { Container, Col, Row } from 'react-bootstrap';
/**
 * -> function: Home
 * -> parameters: void
 * -> return type: Function
 * -> note: This is a React.js functional component.
 * -> hooks:
 *          1)setPage
 *              hook type: useState
 *              initial value: 1
 *              description: needed for updating number of pages in order to call the API with
 *                           the requested number when pressing on "Show more" button.
 *          2)setIsLoading
 *              hook type: useState
 *              initial value: true
 *              description: used for showing LoadingSpinner component when we are in Loading State
 *          3)setCompanies
 *              hook type: useState
 *              initial value: [] - empty array
 *              description: used for storing and appending companies paginated data that are fetched from the API
 *          4)setIsError
 *              hook type: useState
 *              initial value: false
 *              description: used for showing ErrorBoundary component when we are in Error State
 *          5)setHasMore
 *              hook type: useState
 *              initial value: false
 *              description: used for showing "Show More" button after fetching data from API
 * -> description: In this page we show some headers, and paginated data requested from the API.
 *    Initially after mounting we call fetchData inside useEffect hook; and pass "page"
 *    variable as an argument to it. Since we are in initial state, page has a value of "1". Therefore, we initially show
 *    page number one from our API in the Home page.
 *  
 *    fetchData is a that takes page as an argument and calls fetchedCompanies function which
 *    holds the requested companies' data fetched from the API function.
 *    Then setCompanies is called taking the fetchedCompanies as an argument and prevCompanies
 *    Which corresponds to previously fetched companies. setPage is called then and "page" is incremeneted.
 *    setHasMore sets to be true if fetchedCompanies array length is more than 0, if not then there are no
 *    more companies to fetch.
 *    In case of any errors, setError is called with true value and setHasMore is called with false value.
 *  
 *    There are several components rendered in the Home page:
 *      1) ScrollToTop 
 *          description: Button which goes to the top of the page.
 *      2) Helmet
 *          description: setting page titles dynamically.
 *      3) HomeHeader
 *          description: contains some text descriptions about the platform.
 *      4) CompanyList
 *          description: Container component which takes "companies" as an argument
 *                       and shows them in the Home page. The component is re-rendered
 *                       when the companies list is updated after API calls.
 *      5) LoadingSpinner || ErrorBoundary
 *          description: Either of this components is shown based on the current state that we are in
 *          LoadingSpinner is shown if we are in Loading State.
 *          ErrorBoundary is shown if we are in Error State.
 *      6) HasMoreButton
 *          description: HasMoreButton is a CustomBtn component with modified text.
 *                       It is shown if this conditions were satistfied:
 *                          1) We are not inside Error State.
 *                          2) We are not inside Loading State.
 *                          3) Has More is set to be true.
 *  -> testcases:
 */

const Home = () => {
    const [page, setPage] = useState(1);
    //to avoid showing "no companies found" initially since the companyList is first mounted
    //then the API is called.
    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [isError, setIsError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const fetchData = async (page) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const fetchedCompanies = await fetchFeedData(page);
            //Returning new array containing previous companies and recent fetchedCompanies
            setCompanies(prevCompanies => [...prevCompanies, ...fetchedCompanies]);
            setPage((prevPage) => prevPage + 1);
            setHasMore(fetchedCompanies.length > 0)
        } catch (e) {
            setIsError(true)
            setHasMore(false);
        }
        setIsLoading(false)
    }
    useEffect(() => {
        fetchData(page);
    }, [])
    return (
        <div>
            <ScrollToTopBtn />
            <Helmet>
                <title>{stackinfo.title} - {home.title}</title>
            </Helmet>
            <HomeHeader />
            <CompanyList companies={companies} ></CompanyList>
            {
                isLoading ? (<LoadingSpinner />)
                    : isError ? (<ErrorBoundary message={somethingWrongError.message}></ErrorBoundary>)
                    : companies.length===0 ? (<ErrorBoundary message={noCompaniesError.message}></ErrorBoundary>)
                    : <></>
            }
            <Container className={"mt-5"}>
                <Row>
                    <Col sm={12}>
                        {(!isLoading && !isError && hasMore) &&
                            <CustomBtn
                                ButtonText={showMoreBtnText.message}
                                onClick={() => {
                                    fetchData(page);
                                }}
                            ></CustomBtn>}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;