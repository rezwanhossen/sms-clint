import Banner from "../Pages/Home/Banner";
import Blog from "../Pages/Home/Blog";
import ContactUs from "../Pages/Home/ContactUs";
import MaleinCatagory from "../Pages/Home/MaleinCatagory";
import PrimeMeal from "../Pages/Home/PrimeMeal";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Banner></Banner>
      <MaleinCatagory></MaleinCatagory>
      <PrimeMeal></PrimeMeal>
      <ContactUs></ContactUs>
      <Blog></Blog>
    </div>
  );
};

export default Home;
