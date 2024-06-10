import { useQuery } from "@tanstack/react-query";
// import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
import LogingSpiner from "../../Sheare/LogingSpiner";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import TabMealCard from "./TabMealCard";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import NoDataHeader from "../../Sheare/NoDataHeader";
import { Link } from "react-router-dom";

const MaleinCatagory = () => {
  const [tabindex, settabindex] = useState(0);

  const axioscommon = useAxiosCommon();
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const { data } = await axioscommon.get("/meals");
      return data;
    },
  });
  if (isLoading) return <LogingSpiner></LogingSpiner>;

  const breackfast = meals.filter((item) => item.catagory == "breakfast");
  const lunce = meals.filter((item) => item.catagory === "lunch");
  const denner = meals.filter((item) => item.catagory == "dinner");

  return (
    <div className=" mt-10 mb-10">
      <Tabs defaultIndex={tabindex} onSelect={(index) => settabindex(index)}>
        <TabList>
          <Tab>Breakfast</Tab>
          <Tab>Lunch</Tab>
          <Tab>Dinner</Tab>
          <Tab> All Meals</Tab>
        </TabList>
        <TabPanel>
          {breackfast && breackfast.length > 0 ? (
            <TabMealCard item={breackfast}></TabMealCard>
          ) : (
            <NoDataHeader
              head={"No Meals Availble in this catagory"}
              subhead={"please select other catagoey"}
            ></NoDataHeader>
          )}
        </TabPanel>
        <TabPanel>
          {lunce && lunce.length > 0 ? (
            <TabMealCard item={lunce}></TabMealCard>
          ) : (
            <NoDataHeader
              head={"No Meals Availble in this catagory"}
              subhead={"please select other catagoey"}
            ></NoDataHeader>
          )}
        </TabPanel>
        <TabPanel>
          {denner && denner.length > 0 ? (
            <TabMealCard item={denner}></TabMealCard>
          ) : (
            <NoDataHeader
              head={"No Meals Availble in this catagory"}
              subhead={"please select other catagoey"}
            ></NoDataHeader>
          )}
        </TabPanel>
        <TabPanel>
          {meals && meals.length > 0 ? (
            <TabMealCard item={meals}></TabMealCard>
          ) : (
            <NoDataHeader
              head={"No Meals Availble in this catagory"}
              subhead={"please select other catagoey"}
            ></NoDataHeader>
          )}
        </TabPanel>
      </Tabs>

      <div className=" flex justify-center">
        <Link className=" mt-10" to="/meals">
          <button className="btn btn-outline btn-primary">
            Go All Meals Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MaleinCatagory;
