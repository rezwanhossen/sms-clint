import { useEffect } from "react";

const MaleinCatagory = () => {
  useEffect(() => {
    fetch("http://localhost:5000/meals")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return <div></div>;
};

export default MaleinCatagory;
