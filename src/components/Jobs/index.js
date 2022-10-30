import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobsList from '../JobsList'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    profileItem: {},
    apiStatus: '',
  }

  componentDidMount() {
    this.jobsListDetails()
    this.getProfileItem()
  }

  getProfileData = profileData => ({
    name: profileData.name,
    profileimageUrl: profileData.profile_image_url,
    shortBio: profileData.short_bio,
  })

  getProfileItem = async () => {
    const {profileItem} = this.state
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getProfileData(data.profile_details)
      this.setState({profileItem: updatedData})
    }
  }

  changeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  jobsListDetails = async () => {
    const {jobsList} = this.state
    const apiUrl = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        id: each.id,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsList: updatedData})
    }
  }

  renderLoader = () => {
    ;<div id="loader">
      <Loader type="Rings" color="red" height={80} width={80} />
    </div>
  }

  render() {
    const {jobsList, searchInput, profileItem, empActiveOptionId} = this.state
    const filterList = jobsList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const {name, profileimageUrl, shortBio} = profileItem
    return (
      <>
        <Header />
        <div className="jobscontainer">
          <div className="leftcontainer">
            <div className="imagecontainer">
              <img
                src={profileimageUrl}
                alt="profilelogo"
                className="profileimage"
              />
              <h1>{name}</h1>

              <p>{shortBio}</p>
            </div>
            <hr />
            <h1>Type of Employment</h1>
            <ul value={empActiveOptionId} onChange={this.changeEmployment}>
              {employmentTypesList.map(each => (
                <div>
                  <input type="checkbox" id={each.employmentTypeId} />
                  <label htmlFor={each.employmentTypeId}>{each.label}</label>
                </div>
              ))}
            </ul>
            <hr />
            <h1>Salary Range</h1>
            <ul>
              {salaryRangesList.map(each => (
                <div>
                  <input type="radio" id={each.salaryRangeId} />
                  <label htmlFor={each.salaryRangeId}>{each.label}</label>
                </div>
              ))}
            </ul>
          </div>
          <div className="rightcontainer">
            <input
              type="search"
              placeholder="search"
              value={searchInput}
              onChange={this.changeSearch}
            />
            <ul className="jobslistcontainer">
              {filterList.map(each => (
                <JobsList jobListDetails={each} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
