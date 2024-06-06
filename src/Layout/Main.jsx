import {Outlet} from "react-router-dom"
import Footer from "../component/Footer"
const Main = () => {
  return (
    <div>
    <Outlet></Outlet>
    <Footer></Footer>
    </div>
  )
}

export default Main