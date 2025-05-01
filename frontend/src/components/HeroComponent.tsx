import { BlogData } from "@/models/BlogData";
import Image from "next/image";
import BlogContainer from "./blog-components/BlogsContainer";

const HeroComponent = () => {
  const HeroBlog = BlogData[0];
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full lg:w-[60%] mx-auto">
      <div className="relative w-full h-[200px] md:h-[400px] lg:h-[612px]">
        <Image src={HeroBlog.image} alt={`${HeroBlog.title} image`} fill />
        <h1 className="absolute bottom-3 left-3 bg-white py-2 px-4 md:px-8 lg:px-10 font-bold text-xl text-blue-500 object-cover">
          {HeroBlog.title}
        </h1>
      </div>
      <BlogContainer blogData={BlogData} />
    </div>
  );
};

export default HeroComponent;
