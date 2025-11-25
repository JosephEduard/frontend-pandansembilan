import { motion, AnimatePresence } from "framer-motion";

interface LoadingProps {
  isLoading: boolean;
  progress?: number;
}

const Loading = ({ isLoading, progress = 0 }: LoadingProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full">
              <defs>
                <pattern
                  id="loading-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <motion.path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#loading-grid)" />
            </svg>
          </div>

          <div className="relative z-10 w-full max-w-md px-8">
            {/* Logo Animation (Company Logo) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12 text-center"
            >
              <motion.div
                className="relative mx-auto mb-6 h-28 w-28 bg-transparent"
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Logo image */}
                <motion.img
                  src="/images/general/logo2.svg"
                  alt="CV Pandan Sembilan Logo"
                  className="absolute inset-0 h-full w-full bg-transparent object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                  initial={{ filter: "blur(4px)", opacity: 0 }}
                  animate={{ filter: "blur(0px)", opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                {/* Shimmer sweep */}
                <motion.div className="absolute inset-0 overflow-hidden rounded-full bg-transparent">
                  <motion.div
                    className="absolute inset-y-0 left-[-60%] w-[50%] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                    animate={{ x: ["0%", "180%"] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0.8,
                    }}
                  />
                </motion.div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-2 text-3xl font-bold text-white"
              >
                CV PANDAN <span className="text-blue-500">SEMBILAN</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-sm tracking-wide text-gray-400"
              >
                Building your experience...
              </motion.p>
            </motion.div>

            {/* Progress Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-4 text-center text-sm text-gray-400"
            >
              {progress < 25 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Preparing workspace...
                </motion.span>
              )}
              {progress >= 25 && progress < 50 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Loading resources...
                </motion.span>
              )}
              {progress >= 50 && progress < 75 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Building components...
                </motion.span>
              )}
              {progress >= 75 && progress < 95 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Finalizing...
                </motion.span>
              )}
              {progress >= 95 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Ready!
                </motion.span>
              )}
            </motion.div>

            {/* Progress Line Bar */}
            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(Math.max(progress, 0), 100)}%`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                    mass: 0.4,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500"
                  aria-label="Loading progress"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(
                    Math.min(Math.max(progress, 0), 100),
                  )}
                />
              </div>
              <div className="mt-1 text-right text-xs text-gray-500">
                {Math.round(Math.min(Math.max(progress, 0), 100))}%
              </div>
            </div>

            {/* Floating Dots */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-blue-500/30"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
