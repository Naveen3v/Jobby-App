import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {GrLocation} from 'react-icons/gr'
import {BsFillEnvelopeFill} from 'react-icons/bs'

import SkillItem from '../SkillItem'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'

class JobItemDetails extends Component {
  state = {jobItem: {}, skillsList: [], lifeItem: {}, similarList: []}

  componentDidMount() {
    this.getJobItem()
  }

  getFormattedData = Data =>
    Data.map(each => ({
      name: each.name,
      imageUrl: each.image_url,
    }))

  getUpdatedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
  })

  getSimilarData = each => ({
    stitle: each.title,
    srating: each.rating,
    sid: each.id,
    sdescription: each.job_description,
    slocation: each.location,
    simageUrl: each.company_logo_url,
    semploymentType: each.employment_type,
  })

  getLifeData = life => ({
    companyDescription: life.description,
    companyImageUrl: life.image_url,
  })

  getJobItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getUpdatedData(data.job_details)
      const formattedData = this.getFormattedData(data.job_details.skills)
      const lifeData = this.getLifeData(data.job_details.life_at_company)
      const similarData = data.similar_jobs.map(each =>
        this.getSimilarData(each),
      )

      this.setState({
        jobItem: updatedData,
        skillsList: formattedData,
        lifeItem: lifeData,
        similarList: similarData,
      })
    }
  }

  renderLoader = () => {
    ;<div id="loader">
      <Loader type="Rings" color="red" height={80} width={80} />
    </div>
  }

  render() {
    const {jobItem, skillsList, lifeItem, similarList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItem
    const {companyDescription, companyImageUrl} = lifeItem
    const {
      simageUrl,
      stitle,
      srating,
      sid,
      sdescription,
      slocation,
      semploymentType,
    } = similarList

    return (
      <>
        <Header />
        <div className="jlcontainer">
          <div className="logocont">
            <img src={companyLogoUrl} alt="job details company logo" />
            <div className="innerlogo">
              <h1>{title}</h1>
              <div className="jlrating">
                <AiFillStar className="fill-icon" />
                <p className="jlpara">{rating}</p>
              </div>
            </div>
          </div>
          <div className="locationcont">
            <div className="location">
              <GrLocation className="fill-icon" />
              <p className="jlpara">{location}</p>
              <BsFillEnvelopeFill className="fill-icon" />
              <p className="jlpara">{employmentType}</p>
            </div>
            <p className="jlpara">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <h1>Description</h1>
          <a href={companyWebsiteUrl} target="">
            Visit
          </a>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="skillcontainer">
            {skillsList.map(each => (
              <SkillItem skillDetails={each} key={each.id} />
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="lifecompany">
            <p>{companyDescription}</p>
            <img
              src={companyImageUrl}
              alt="life at company"
              className="companylifeimage"
            />
          </div>
          <h1>Similar Jobs</h1>
          <ul className="listContainer">
            {similarList.map(each => (
              <SimilarJobs similarDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default JobItemDetails
