import { BlogDataType } from "@/models/BlogData";
import Image from "next/image";

type blogType = {
  blog: BlogDataType;
  index: number;
};

export const BlogCard = ({ blog, index }: blogType) => {
  return (
    <div
      className={`border-[0.5px] border-slate-100 p-5 flex flex-col gap-3 cursor-pointer rounded-tr-2xl ${
        index == 0 || index == 3 ? "bg-[#F4F9FF]" : ""
      }`}
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-2">
        <div className="flex flex-col gap-2">
          <h1 className="capitalize text-gray-600 font-medium text-base">
            {blog?.type}
          </h1>
          <h1 className="text-[#004697] text-[16px] font-semibold">
            {blog?.title}
          </h1>
        </div>
        <div className="relative w-full lg:w-[200px] h-[200px] lg:h-[80px]">
          <Image
            src={blog?.image || "/placeholder.jpg"}
            alt={blog?.title || "Blog image"}
            fill
            className="object-cover rounded-rt-2xl"
          />
        </div>
      </div>
      <h1 className="text-sm text-gray-600">{blog?.createdAt}</h1>
    </div>
  );
};
