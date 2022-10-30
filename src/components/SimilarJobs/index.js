import './index.css'

const SimilarJobs = props => {
  const {similarDetails} = props
  const {
    simageUrl,
    stitle,
    srating,
    sdescription,
    slocation,
    semploymentType,
  } = similarDetails
  return (
    <li className="slist">
      <div className="scontainer">
        <div className="simagecontainer">
          <img
            src={simageUrl}
            alt="similar job company logo"
            className="simage"
          />
          <div className="stitle">
            <h1>{stitle}</h1>
            <p>{srating}</p>
          </div>
        </div>
        <h1>Description</h1>
        <p>{sdescription}</p>
        <p>{slocation}</p>
        <p>{semploymentType}</p>
      </div>
    </li>
  )
}
export default SimilarJobs
