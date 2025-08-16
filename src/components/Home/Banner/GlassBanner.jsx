import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function  GlassBanner() {
  return (
    <div className="relative h-full flex flex-col items-center justify-center h-[80vh] bg-gradient-to-r from-purple-500 to-pink-500">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-xl bg-white/10 p-10 rounded-3xl shadow-2xl text-center text-white"
      >
        <Rocket size={48} className="mx-auto mb-4 text-yellow-300" />
        <h1 className="text-5xl font-bold">Launch your next app 🚀</h1>
        <p className="mt-3 text-lg text-white/80">
          Share your product with the world on AppStorm.
        </p>
        <button className="mt-6 px-6 py-3 rounded-xl bg-white text-indigo-600 font-bold">
          Submit Product
        </button>
      </motion.div>
    </div>
  );
}
