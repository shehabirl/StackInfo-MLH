import axios from 'axios';
//number of elements returned in the pagination
const SIZE = 9;
//maximum time elapses before dropping the request
const MAX_TIMEOUT = 60000;

export const fetchFeedData = (page) => {
    const uri = process.env.NODE_ENV === 'development' ?
        `http://localhost:3000/api/companies` :
        `http://localhost:3000/api/companies?page=1&size=10`;
    return axios.get(uri, {
        params: {
            page: page,
            size: SIZE
        },
        timeout: MAX_TIMEOUT
    })
        .then((response) =>
            //since the query presents inside the 'data' field 
            //which exists inside the 'data' attribute of Axios
            response.data.data)
}
export const fetchSearchData = (query) => {
    const uri = process.env.NODE_ENV === 'development' ?
        `http://localhost:3000/api/companies/name/${query}` :
        `http://localhost:3000/api/companies?page=1&size=9`;
    return axios.get(uri, {
        timeout: MAX_TIMEOUT
    })
        .then((response) =>
            response.data.data)
}
export const fetchFilterData = (query) => {
    const uri = process.env.NODE_ENV === 'development' ?
        `http://localhost:3000/api/companies/companies/stacks` :
        `http://localhost:3000/api/companies/companies`;
    return axios.get(uri, {
        params: {
            stacks: query
        },
        timeout: MAX_TIMEOUT
    })
        .then((response) => 
            response.data.data)
}
/*
export const fetchData = async (type, query) => {
    var fetchedCompanies=[]
    switch (type) {
        case "SEARCH":
            fetchedCompanies =  fetchSearchData(query);
            console.log(fetchedCompanies);
            break;
        case "FILTER":
            fetchedCompanies = fetchFilterData(query)
            break;
        case "FEED":
            fetchedCompanies = fetchFeedData(query)
            break;
        default:
            break;
    }
    return fetchedCompanies;
}*/