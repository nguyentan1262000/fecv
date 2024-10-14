import { NavLink } from "react-router-dom";

const PageError = (props) => {
    return <div className="page-error">
        <span className="status">404</span>
        <p className="message">NOT FOUND</p>
        <NavLink className="btn-comeback" to="/Dashboard">Back home</NavLink>
    </div>
}

export default PageError;