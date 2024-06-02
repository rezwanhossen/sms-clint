const NoDataHeader = ({ head, subhead }) => {
  return (
    <div className=" flex justify-center  items-center">
      <div className=" space-y-3">
        <h1 className="text-2xl md:text-5xl font-bold">{head} </h1>
        <p>{subhead} </p>
      </div>
    </div>
  );
};

export default NoDataHeader;
