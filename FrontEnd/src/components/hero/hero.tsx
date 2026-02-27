import React from "react";
import { Sedan_SC } from "next/font/google";
import SearchCard from "./searchCard";

const sedanSC = Sedan_SC({
  subsets: ["latin"],
  weight: ["400"],
});

const Hero = () => {
  return (
    <section className="relative w-full h-[60vh] min-h-80 flex items-center">
      <div className="absolute inset-4 z-0 rounded-md">
        <img
          src="/LandScape.jpg"
          alt="Scenic Landscape"
          className="w-full h-full object-cover scale-x-[-1] rounded-md"
        />
        <div className="absolute inset-0 bg-black/50 rounded-md" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-3xl">
          <h1
            className={`text-white text-3xl md:text-4xl leading-loose tracking-tight drop-shadow-2xl ${sedanSC.className}`}
          >
            Your next great escape is <br />
            <span className="italic opacity-90">Just a click away.</span>
          </h1>
        </div>
      </div>

      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-full max-w-6xl px-4 z-20">
        <SearchCard />
      </div>
    </section>
  );
};

export default Hero;
