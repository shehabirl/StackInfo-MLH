import { Helmet } from 'react-helmet';
import { search, stackinfo, somethingWrongError, noCompaniesError } from '../utils/constants';
import CompanyList from '../containers/CompanyList/CompanyList';
import { Col, Container, Row } from 'react-bootstrap';
import SearchBar from '../components/SearchFilterBar/SearchBar';
import { useState, useEffect, useRef } from 'react';
import { fetchSearchData, fetchFeedData, fetchFilterData } from '../network/network';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import FilterBar from '../components/SearchFilterBar/FilterBar';
import ScrollToTopBtn from '../components/ScrollToTop/ScrollToTopButton';
/**
 * -> function: Search
 * -> parameters: void
 * -> return type: Function
 * -> note: This is a React.js functional component.
 * -> hooks:
 *          1)setFilterInput
 *              hook type: useState
 *              initial value: []
 *              description: used in filtering functionality. Needed for setting array of stacks
 *                           that will be used as an argument for the API call.
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
 *          5)inputRef
 *              hook type: useRef
 *              initial value: ""
 *              description: A reference to the input search field. Used in Search functionality.
 *                           Needed for accessing input text in order to be used as an argument for API call.
 * -> description: In this page we show some headers, and data fetched from Search or Filtering functionalities.
 *    Initially after mounting we call fetchData inside useEffect hook; and pass fetchFeedData and "1" as an arguments.
 *    In order to show some initial data inside CompanyList component. 
 *  
 *    fetchData is a that takes a fetch function and query as an arguments and calls the fetch function using
 *    the query as an argument to it. For example fetchData(fetchFeedData,"1")
 *    It will be like this -->
 *          fetchFeedData("1") //Check fetchFeedData inside network.js
 *    Inside the fetchData we first set Loading State to be true and Error State to be false.
 *    fetchedCompanies holds the requested companies' data fetched from the fetch function.
 *    Then setCompanies is called taking the fetchedCompanies as an argument and prevCompanies
 *    Which corresponds to previously fetched companies.
 *    In case of any errors, setError is called with true value and setHasMore is called with false value.
 *    If no errors occurred, Loading State is set back to false.
 *  
 *    There are several components rendered in the Home page:
 *      1) ScrollToTop 
 *          description: Button which goes to the top of the page.
 *      2) Helmet
 *          description: setting page titles dynamically.
 *      3) SearchBar
 *          description: Has the search input field.
 *      4) FilterBar
 *          description: Has the filter input field.
 *      5) CompanyList
 *          description: Container component which takes "companies" as an argument
 *                       and shows them in the Home page. The component is re-rendered
 *                       when the companies list is updated after API calls.
 *      6) LoadingSpinner || ErrorBoundary
 *          description: Either of this components is shown based on the current state that we are in
 *          LoadingSpinner is shown if we are in Loading State.
 *          ErrorBoundary is shown if we are in Error State.
 *  -> testcases:
 */
const Search = () => {
    const [companies, setCompanies] = useState([]); //List of companies returned from searching/filtering
    const inputRef = useRef(""); //Update search text whenever the user types in
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [filterInput, setFilterInput]=useState([]); //holds stacks array that will be passed to the api

    const fetchData = async (fetchFunction, query) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const fetchedCompanies = await fetchFunction(query);
            setCompanies(fetchedCompanies);
        } catch (e) {
            setIsError(true)
        }
        setIsLoading(false);
    }

    const onFilterSubmit = (e)=>{
        e.preventDefault()
        const filteredStacks = filterInput.map((stack)=>{return stack.value}) //Extract the values field only
        //TODO Check if filteredStacks === 0 then setError to a special message and return
        setCompanies([]) //Clearing companies list before fetching again so that the LoadingSpinner doesn't appear beneath it
        fetchData(fetchFilterData,filteredStacks)
        setFilterInput([])
    }
    //use the API providing it the search input, and 
    //setCompanies hook to update list of companies
    //I did this approach to avoid re-rendering
    //whenever the user types in the input field
    const onSearchSubmit = (e) => {
        e.preventDefault()
        setCompanies([]) //Clearing companies list before fetching again so that the LoadingSpinner doesn't appear beneath it
        fetchData(fetchSearchData, inputRef.current.value)
        inputRef.current.value = "";
    }
    //Initial data loaded
    useEffect(() => {
        fetchData(fetchFeedData, "1");
    }, [])
    return (
        <div>
            <ScrollToTopBtn/>
            <Helmet>
                <title>{stackinfo.title} - {search.title}</title>
            </Helmet>
            <Container>
                <Row className={"searchFilterBar"}>
                    <Col sm={6} md={6} className={"searchBar"}>
                        <SearchBar inputRef={inputRef} onSubmit={onSearchSubmit} />
                    </Col>
                    <Col sm={6} md={6} className={"filterBar"}>
                        <FilterBar filterInput={filterInput} onChange={setFilterInput} onSubmit={onFilterSubmit} ></FilterBar>
                    </Col>
                </Row>
                <CompanyList companies={companies} ></CompanyList>
                {
                isLoading ? (<LoadingSpinner />) //loading problem here since when loading either returns spinner or company list
                    : isError ? (<ErrorBoundary message={somethingWrongError.message}></ErrorBoundary>)
                    : companies.length===0 ? (<ErrorBoundary message={noCompaniesError.message}></ErrorBoundary>)
                    : <></>
            }
            </Container>
        </div>
    )
}
export default Search;