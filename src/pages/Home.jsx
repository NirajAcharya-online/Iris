import React from "react";
import Button from "../components/ui/Button";

const Home = () => {
  return (
    <div className="min-h-full bg-[#FDFDFD] py-12 px-4 md:px-10 lg:px-20 font-sans text-slate-900">
      <header className="max-w-5xl mx-auto text-center mb-16 md:mb-24">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-indigo-500 font-bold mb-4 block">
          Established 2024
        </span>
        <h1 className="text-5xl md:text-8xl font-extralight tracking-tight leading-none">
          Define Your <br />
          <span className="font-serif italic text-slate-400">
            Signature Look.
          </span>
        </h1>
        <p className="mt-8 text-gray-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          From technical precision in our optical series to high-fashion
          silhouettes in our sun collection, discover eyewear that works for
          you.
        </p>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="group relative h-[550px] md:h-[700px] overflow-hidden rounded-[3rem] bg-slate-100 shadow-xl transition-all duration-500 hover:shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1200"
            alt="Optical Frames"
            className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-10 flex flex-col justify-end">
            <div className="translate-y-8 transition-transform duration-700 group-hover:translate-y-0">
              <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter">
                Optical{" "}
                <span className="font-serif italic text-indigo-300">
                  Frames
                </span>
              </h2>
              <p className="mt-4 text-gray-300 max-w-xs opacity-0 transition-opacity duration-500 group-hover:opacity-100 text-sm leading-relaxed">
                Hand-polished acetate frames featuring German-engineered hinges
                and blue-light protection.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Button
                  variant={"none"}
                  className="bg-white text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all duration-300"
                >
                  Shop Optical
                </Button>
                <span className="text-white/60 text-[10px] uppercase tracking-widest font-semibold border-l border-white/20 pl-4">
                  Prescription Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative h-[550px] md:h-[700px] overflow-hidden rounded-[3rem] bg-slate-100 shadow-xl transition-all duration-500 hover:shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1200"
            alt="Designer Sunglasses"
            className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-10 flex flex-col justify-end">
            <div className="translate-y-8 transition-transform duration-700 group-hover:translate-y-0">
              <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter">
                The{" "}
                <span className="font-serif italic text-indigo-300">Sun</span>{" "}
                Edit
              </h2>
              <p className="mt-4 text-gray-300 max-w-xs opacity-0 transition-opacity duration-500 group-hover:opacity-100 text-sm leading-relaxed">
                Premium polarized lenses with 100% UVA/UVB protection, finished
                in timeless gold and tortoise.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Button
                  variant={"none"}
                  className="bg-white text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all duration-300"
                >
                  Shop Sunglasses
                </Button>
                <span className="text-white/60 text-[10px] uppercase tracking-widest font-semibold border-l border-white/20 pl-4">
                  UV400 Protection
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
