import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const StormThemeBanner = () => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative  flex flex-col items-center justify-center text-center h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Clouds */}
      <motion.div
        className="absolute top-10 left-0 w-[200%] h-40  bg-repeat-x opacity-30"
        animate={{ x: [0, -400] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Lightning flash */}
      {/* {flash && <div className="absolute inset-0 bg-white opacity-40 animate-pulse" />} */}

      {/* Particles (rain drops) */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-[2px] h-[15px] bg-blue-400 opacity-60"
          style={{ left: `${Math.random() * 100}%` }}
          animate={{ y: [0, 500] }}
          transition={{ duration: Math.random() * 2 + 2, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-white max-w-2xl px-6">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          Catch the storm of innovation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl text-gray-300 mb-6"
        >
          Animated stormy clouds, lightning flashes, and innovation in motion.
        </motion.p>

        <div className="flex gap-4 justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl text-lg">
            🌩 Join the Storm
          </button>
          <button variant="outline" className="border-gray-400 text-white px-6 py-3 rounded-2xl text-lg">
            🚀 Launch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default StormThemeBanner;
