import { motion } from "framer-motion";

const successStories = [
  {
    id: 1,
    appName: "TaskFlow",
    founder: "Ayesha Khan",
    logo: "https://i.ibb.co.com/jPvKHDF2/gear-smart-eps-icon-digital-tech-business-logo-free-vector.jpg",
    before: "100 users",
    after: "10,000 users",
    story:
      "AppStorm helped us reach a wider audience and grow faster than we imagined.",
  },
  {
    id: 2,
    appName: "FitBuddy",
    founder: "Rahul Das",
    logo: "https://i.ibb.co.com/jPvKHDF2/gear-smart-eps-icon-digital-tech-business-logo-free-vector.jpg",
    before: "50 users",
    after: "5,000 users",
    story:
      "The visibility from AppStorm gave us momentum. Now we’re a growing fitness brand!",
  },
  {
    id: 3,
    appName: "StudyMate",
    founder: "Nadia Hasan",
    logo: "https://i.ibb.co.com/jPvKHDF2/gear-smart-eps-icon-digital-tech-business-logo-free-vector.jpg",
    before: "200 users",
    after: "15,000 users",
    story:
      "Launching on AppStorm was the best decision. The traction was immediate and impactful.",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Success Stories 📈🌟
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real apps. Real growth. See how creators launched on AppStorm and
            scaled successfully.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {successStories.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{
                y: -6, // lift
                scale: 1.02, // zoom slightly
                boxShadow: "0px 12px 30px rgba(0,0,0,0.15)", // elegant shadow
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 text-left border border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              {/* Gradient Glow on Hover */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-yellow-500/10 rounded-2xl pointer-events-none"></div>

              {/* App Info */}
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <img
                  src={story.logo}
                  alt={story.appName}
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-gray-200 dark:ring-gray-700"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {story.appName}
                  </h3>
                  <p className="text-sm text-gray-500">by {story.founder}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex justify-between text-sm font-medium mb-3 relative z-10">
                <span className="text-red-500">📉 {story.before}</span>
                <span className="text-green-600">📈 {story.after}</span>
              </div>

              {/* Story */}
              <p className="text-gray-600 dark:text-gray-300 text-sm relative z-10">
                “{story.story}”
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
