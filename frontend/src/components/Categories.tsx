"use client";
import { categoriesTags } from "@/constants/canstants";
import Link from "next/link";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

export default function Cateories() {
  return (
    <div className="flex gap-3 bg-white py-5 px-8 w-full max-w-full md:justify-center ">
      <Swiper
        // slidesPerView={12}
        spaceBetween={2}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 3 },
          520: { slidesPerView: 6 },
          1024: { slidesPerView: 12 },
        }}
      >
        {categoriesTags.map((tag) => (
          <SwiperSlide>
            <Link href={""} key={tag.name}>
              <h1 className="px-3 py-1 border-[0.5px] border-slate-400 rounded-tr-2xl text-[12px] text-gray-600 flex items-center gap-2">
                <span className="bg-green-300 rounded-full p-1">
                  <tag.icon color="#004697" size={16} />
                </span>
                {tag.name}
              </h1>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
