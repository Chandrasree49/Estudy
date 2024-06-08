import {Outlet} from "react-router-dom"
import Footer from "../component/Footer"
import Nav from "../component/Nav"
const Main = () => {
  return (
    <div>
        <Nav></Nav>
    <Outlet></Outlet>
    <Footer></Footer>
    </div>
  )
}

export default Main