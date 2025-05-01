"use client";

import { BlogCard } from "./BlogCard";
import { BlogDataType } from "@/models/BlogData";

type BlogDataProps = {
  blogData: BlogDataType[];
  type?: string;
};

const BlogContainer = ({ blogData }: BlogDataProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-5 mb-10">
        {blogData.slice(1).map((blog, index) => {
          return <BlogCard index={index} key={blog.id} blog={blog} />;
        })}
      </div>
    </div>
  );
};

export default BlogContainer;
