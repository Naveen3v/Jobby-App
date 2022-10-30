import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li>
      <div className="skillcont">
        <img src={imageUrl} alt={name} className="skillimage" />
        <p>{name}</p>
      </div>
    </li>
  )
}
export default SkillItem
