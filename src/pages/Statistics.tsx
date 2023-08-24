import Flavanoids from "../sections/Flavanoids"
import Gamma from "../sections/Gamma"

function Statistics() {
  return (
    <div>
      <h1 className="title">Data Visualization Task</h1>
      <div className="wrapper">
        <Flavanoids />
      </div>
      <div className="wrapper">
        <Gamma />
      </div>
    </div>
  )
}

export default Statistics