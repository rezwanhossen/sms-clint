import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const MealsCard = ({ items }) => {
  const { _id, title, image, rating, price } = items;
  return (
    <div>
      <div className=" p-4 space-y-2">
        <img className=" w-full h-[250px]" src={image} alt="" />
        <div className="flex justify-between text-2xl font-bolf">
          <p>${price} </p>
          <p className=" flex items-center">
            <FaStar /> {rating}
          </p>
        </div>
        <h2 className="text-2xl font-bold">{title} </h2>
        <Link to={`/mealdetail/${_id}`}>
          <button className="btn btn-outline btn-primary">View Deatils</button>
        </Link>
      </div>
    </div>
  );
};

export default MealsCard;
