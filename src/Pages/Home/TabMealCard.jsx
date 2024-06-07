import MealsCard from "../../Sheare/MealsCard";

const TabMealCard = ({ item }) => {
  return (
    <div>
      <div className=" grid md:grid-cols-3 gap-4">
        {item.slice(0, 3).map((items) => (
          <MealsCard key={items._id} items={items}></MealsCard>
        ))}
      </div>
    </div>
  );
};

export default TabMealCard;
