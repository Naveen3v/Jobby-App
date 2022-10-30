import './index.css'

import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="home">
    <ul className="headercontainer">
      <Header />
    </ul>

    <div className="homecont">
      <h1 className="homeheading">Find The Job That Fits Your Life</h1>
      <p className="homeparagraph">Millions of people are searching for jobs</p>
      <Link to="/jobs">
        {' '}
        <button type="button" className="btnhome">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
