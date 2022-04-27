import './SearchFilterBar.css'
import '../../assets/fonts/ionicons.min.css'
import { Form, Button } from 'react-bootstrap'



const SearchBar = ({inputRef,onSubmit}) => {
    return (
        <Form
            className="search-form"
            onSubmit={onSubmit}
            >
            <div className="input-group">
                <span className="input-group-text rubik-font">
                    <i className="icon ion-search"></i>
                </span>
                <input
                    className="form-control rubik-font"
                    ref={inputRef}
                    type="text"
                    placeholder="Type in a company's name"
                />
                <Button className="btn btn-light rubik-font" type="submit">Search </Button>
            </div>
        </Form>
    )

}

export default SearchBar;