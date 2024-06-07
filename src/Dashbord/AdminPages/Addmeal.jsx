import React from "react";

const Addmeal = () => {
  return (
    <div>
      <form>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label>Meal Title</label>
            <input
              type="text"
              className=" input input-disabled w-full"
              name=""
              id=""
            />
          </div>

          <div>
            <label>Catagory</label>
            <select
              className=" input input-disabled w-full"
              id="meal"
              name="catagory"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>

          <div>
            <label>Meal Price</label>
            <input
              type="number"
              className=" input input-disabled w-full"
              name="price"
              id=""
            />
          </div>

          <div>
            <label>Meal Rating</label>
            <input
              type="number"
              className=" input input-disabled w-full"
              name="rating"
              id=""
            />
          </div>

          <div>
            <label>Meal likes</label>
            <input
              type="number"
              className=" input input-disabled w-full"
              name=" likes"
              id=""
            />
          </div>

          <div>
            <label>ingredients</label>
            <div className="grid md:grid-cols-2 gap-2">
              <input
                type="text"
                className=" input input-disabled w-full"
                name=" itm1"
                id=""
              />
              <input
                type="text"
                className=" input input-disabled w-full"
                name=" itm2"
                id=""
              />
              <input
                type="text"
                className=" input input-disabled w-full"
                name=" itm3"
                id=""
              />
              <input
                type="text"
                className=" input input-disabled w-full"
                name=" itm4"
                id=""
              />
            </div>
          </div>

          <div>
            <input type="file" name="" id="" />
          </div>
        </div>
        <div>
          <label>description </label>
          <textarea
            className=" input input-disabled w-full"
            name=""
            id=""
            cols="30"
            rows="50"
          ></textarea>
        </div>
        <input
          className=" btn btn-primary w-full"
          type="submit"
          value="Add Meal"
        />
      </form>
    </div>
  );
};

export default Addmeal;
