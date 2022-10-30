import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <navbar>
      <div className="container">
        <Link to="/">
          {' '}
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="navimage"
          />
        </Link>
        <ul className="listcontainer">
          <li className="navheading">
            <Link to="/" className="link-item">
              Home
            </Link>
          </li>
          <li className="navheading">
            <Link to="/jobs">Jobs</Link>
          </li>
        </ul>
        <button type="button" className="btnnav" onClick={onLogout}>
          Logout
        </button>
      </div>
    </navbar>
  )
}
export default withRouter(Header)
