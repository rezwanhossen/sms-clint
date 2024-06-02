import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { useState } from "react";
import { useEffect } from "react";
const Blog = () => {
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    fetch("blog.json")
      .then((res) => res.json())
      .then((data) => setblogs(data));
  }, []);

  return (
    <div className=" mt-10">
      <h2 className="text-2xl md:text-5xl font-bold text-center my-9">Blogs</h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper h-[450px]"
      >
        {blogs.map((blog, nx) => (
          <SwiperSlide key={nx}>
            <div className="space-y-1">
              <img className="w-full h-[200px]" src={blog.image} />
              <h1 className="text-2xl">{blog.title} </h1>
              <p>{blog.short_description}.. </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Blog;
