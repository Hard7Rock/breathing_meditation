"use client";

import { motion } from "framer-motion";

interface BreathingCircleProps {
  phase: "inhale" | "hold" | "exhale" | "idle";
  color: string;
}

export default function BreathingCircle({ phase, color }: BreathingCircleProps) {
  const getScale = () => {
    switch (phase) {
      case "inhale":
        return 1.8;
      case "hold":
        return 1.8;
      case "exhale":
        return 1;
      case "idle":
      default:
        return 1;
    }
  };

  const getTransition = () => {
    switch (phase) {
      case "inhale":
        return { duration: 4, ease: "easeInOut" };
      case "hold":
        return { duration: 0.5, ease: "linear" };
      case "exhale":
        return { duration: 8, ease: "easeInOut" };
      default:
        return { duration: 1, ease: "easeInOut" };
    }
  };

  const getText = () => {
    switch (phase) {
      case "inhale":
        return "Вдих";
      case "hold":
        return "Затримка";
      case "exhale":
        return "Видих";
      default:
        return "Готові?";
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <motion.div
        className={`relative rounded-full bg-gradient-to-br ${color} shadow-2xl flex items-center justify-center`}
        style={{ width: "200px", height: "200px" }}
        animate={{
          scale: getScale(),
        }}
        transition={getTransition()}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20"
          animate={{
            opacity: phase === "inhale" ? [0.2, 0.4, 0.2] : 0.2,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <span className="text-white text-2xl font-semibold z-10">
          {getText()}
        </span>
      </motion.div>

      {/* Outer rings */}
      <motion.div
        className={`absolute rounded-full border-2 border-white/30`}
        style={{ width: "300px", height: "300px" }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
