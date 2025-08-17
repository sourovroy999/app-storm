import { motion } from "framer-motion";
import { Bolt, Cloud, Rocket, Star } from "lucide-react";

const icons = [Bolt, Cloud, Rocket, Star];

export default function StormBanner() {
  return (
    <div className="relative h-full flex flex-col items-center justify-center text-center py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">⚡ Welcome to AppStorm</h1>
      <p className="text-lg max-w-xl px-2 mb-6">
        Discover, share, and upvote the next big apps.
      </p>
      {/* <button className="px-6 py-3 rounded-2xl bg-white text-indigo-600 font-bold shadow-lg hover:scale-105 transition">
        Get Started
      </button> */}

      <div className="flex flex-col md:flex-row gap-4 justify-center">
          <motion.a
            href="/dashboard/add-product"
            className="px-6 py-3 rounded-2xl bg-yellow-400 text-black font-semibold shadow-lg hover:bg-yellow-300 transition"
            whileHover={{ scale: 1.05 }}
          >
            🚀 Launch Your Product
          </motion.a>

          <motion.a
            href="/products"
            className="px-6 py-3 rounded-2xl bg-white/10 text-white font-semibold shadow-lg hover:bg-white/20 transition"
            whileHover={{ scale: 1.05 }}
          >
            🔍 Explore Products
          </motion.a>
        </div>

      {/* floating icons */}
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ x: Math.random() * 400 - 200, y: Math.random() * 400 - 200, opacity: 0 }}
          animate={{
            x: Math.random() * 600 - 300,
            y: Math.random() * 600 - 300,
            opacity: 1,
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Icon size={36} className="text-white/60" />
        </motion.div>
      ))}
    </div>
  );
}
