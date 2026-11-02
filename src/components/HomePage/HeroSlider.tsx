"use client";

import Image from "next/image";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// ৩টি ইমেজের ডেটা (আপনার ইমেজের সঠিক পাথ বা লিঙ্ক বসিয়ে দিন)
const slidesData = [
  {
    id: 1,
    image: "/images/hero-1.jpg", // public/images/studio-1.jpg
    alt: "Studio Space 1",
  },
  {
    id: 2,
    image: "/images/hero-2.jpg",
    alt: "Studio Space 2",
  },
  {
    id: 3,
    image: "/images/hero-3.jpg",
    alt: "Studio Space 3",
  },
];

export default function HeroSlider() {
  return (
    <section className="bg-[#0b0f17] text-white flex items-center px-6 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* বাম দিকের টেক্সট ও বাটন */}
        <div className="space-y-6">
          <span className="text-[#f59e0b] uppercase tracking-widest text-xs font-bold">
            BOOK CREATIVE SPACES BY THE HOUR
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight leading-tight">
            Find the room where your best work happens.
          </h1>

          <p className="text-gray-400 text-base sm:text-lg max-w-xl">
            Photo cycs, sound stages, podcast lounges and recording suites from
            verified hosts, with live availability and clear pricing.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-[#f59e0b] hover:bg-[#d97706] text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg">
              Explore Studios
            </button>
            <button className="border border-gray-700 hover:border-gray-500 bg-transparent text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200">
              Host Your Space
            </button>
          </div>
        </div>

        {/* ডান দিকের Swiper স্লাইডার */}
        <div className="w-full relative">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect={"fade"}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            loop={true}
            className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
          >
            {slidesData.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative sm:h-105 w-full bg-slate-900">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
                  />
                  {/* স্লাইডারের উপর হালকা ওভারলে (লুক পারফেক্ট রাখার জন্য) */}
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
