import "./notFound.css"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <section>
      <div className="container notfoundtocontainer">
        <h2>Page Not Found</h2>
        <Link to="/portal/home" className="bttn">Go back to Homepage</Link>
      </div>
    </section>
  )
}

export default NotFound