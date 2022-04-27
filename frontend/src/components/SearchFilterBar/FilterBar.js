import { Button, Form } from 'react-bootstrap';
import Select from 'react-select'
import { progLangsStacksMap, frontendStacksMap, backendStacksMap } from '../../utils/StackConstants';
import './SearchFilterBar.css';

const customStyle = {
    option: (provided) => ({
        ...provided,
        fontFamily:"'Rubik', sans-serif"
    }),
    placeholder:(provided)=>({
        ...provided,
        fontFamily:"'Rubik', sans-serif"
    }),
    multiValueLabel:(provided)=>({
        ...provided,
        fontFamily:"'Rubik', sans-serif"
    })
}
const FilterBar = ({ onSubmit, onChange, filterInput }) => {
    return (
        <Form
            onSubmit={onSubmit}
            className={'filter-form input-group'}>
            <Select
                defaultValue={filterInput}
                value={filterInput}
                isMulti
                styles={customStyle}
                isSearchable
                placeholder={"Select tech stacks"}
                name="stacks"
                options={[
                    ...progLangsStacksMap, ...frontendStacksMap, ...backendStacksMap
                ]}
                className="basic-multi-select flex-fill"
                classNamePrefix="Select"
                onChange={onChange}
            />
            <Button className="btn btn-light rubik-font" type="submit" >Apply</Button>
        </Form>
    )
};

export default FilterBar;