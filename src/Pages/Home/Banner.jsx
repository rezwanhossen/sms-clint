const Banner = () => {
  return (
    <div>
      <div className="hero h-[80vh] bg-[url('https://i.ibb.co/MDsZ5Ss/ttt.jpg')]  bg-cover bg-center text-white">
        <div className="hero-content text-center">
          <div className="w-3/5 mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold">
              Welcome to <span className=" text-red-600">HostelCare </span>!
            </h1>
            <p className="py-6">
              Welcome to HostelCare, the comprehensive hostel management system
              designed to streamline and simplify all aspects of hostel
              administration for universities and educational institutions.
            </p>
            <div>
              <div className=" md:flex gap-2 justify-center">
                <input
                  type="text"
                  className="input input-disabled"
                  name=""
                  id=""
                />
                <button className=" btn  text-2xl btn-primary">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
