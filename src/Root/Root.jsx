import { Outlet } from "react-router-dom";
import Navbar from "../Componente/Navbar/Navbar";
import Footer from "../Pages/Footer";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
