import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {GrLocation} from 'react-icons/gr'
import {BsFillEnvelopeFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const JobsList = props => {
  const {jobListDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobListDetails

  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <div className="jlcontainer">
          <div className="logocont">
            <img src={companyLogoUrl} alt="company logo" />
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
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobsList
