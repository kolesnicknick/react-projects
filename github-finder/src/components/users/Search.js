import React, {useState} from 'react';
import PropTypes from "prop-types";

const Search = (props) => {
    const [text, setText] = useState('');

    const onChange = e => setText(e.target.value);

    const onSubmit = e => {
        e.preventDefault();
        if (!text) {
            props.showAlert("ENTER SOMETHING", "light")
        } else {
            props.searchUsers(text);
            setText('');
        }
    };

        return (
            <div>
                <form action="" onSubmit={onSubmit} className="form">
                    <input
                        type="text"
                        name="text"
                        placeholder="Search User"
                        value={text}
                        onChange={onChange}
                    />
                    <input
                        type="Submit"
                        className="btn btn-dark btn-block"/>
                </form>
            </div>
        );
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired,
};

export default Search;