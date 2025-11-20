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
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12 text-center"
            >
              {/* Construction Icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mx-auto mb-6 h-24 w-24"
              >
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full text-blue-500"
                >
                  <motion.path
                    d="M50 10 L80 30 L80 70 L50 90 L20 70 L20 30 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="8"
                    fill="currentColor"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  {/* Inner lines */}
                  <motion.line
                    x1="50"
                    y1="30"
                    x2="50"
                    y2="70"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
                  />
                  <motion.line
                    x1="30"
                    y1="50"
                    x2="70"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.7, repeat: Infinity }}
                  />
                </svg>
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-sm text-gray-400"
              >
                Building Your Dreams...
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              {/* Percentage */}
              <motion.div
                className="mt-4 text-center font-mono text-lg text-blue-500"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.floor(progress)}%
              </motion.div>
            </motion.div>

            {/* Loading Status Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 text-center text-sm text-gray-500"
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
