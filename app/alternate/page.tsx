"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Phase = "idle" | "inhale-left" | "exhale-right" | "inhale-right" | "exhale-left";

export default function AlternateNostril() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    let isCancelled = false;

    const cycleSequence = async () => {
      // Inhale left - 4 seconds
      setPhase("inhale-left");
      await countdown(4);
      if (isCancelled) return;

      // Exhale right - 4 seconds
      setPhase("exhale-right");
      await countdown(4);
      if (isCancelled) return;

      // Inhale right - 4 seconds
      setPhase("inhale-right");
      await countdown(4);
      if (isCancelled) return;

      // Exhale left - 4 seconds
      setPhase("exhale-left");
      await countdown(4);
      if (isCancelled) return;

      setCycles((prev) => prev + 1);
    };

    cycleSequence();

    return () => {
      isCancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, cycles]);

  const countdown = (seconds: number): Promise<void> => {
    return new Promise((resolve) => {
      let count = seconds;
      setTimer(count);
      
      intervalRef.current = setInterval(() => {
        count--;
        setTimer(count);
        if (count <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          resolve();
        }
      }, 1000);
    });
  };

  const handleStart = () => {
    setIsActive(true);
    setCycles(0);
  };

  const handleStop = () => {
    setIsActive(false);
    setPhase("idle");
    setTimer(0);
    setCycles(0);
  };

  const getInstruction = () => {
    switch (phase) {
      case "inhale-left":
        return "Вдих лівою ніздрею";
      case "exhale-right":
        return "Видих правою ніздрею";
      case "inhale-right":
        return "Вдих правою ніздрею";
      case "exhale-left":
        return "Видих лівою ніздрею";
      default:
        return "Готові?";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-red-900 flex flex-col dark:from-pink-900 via-rose-900 to-red-900 flex flex-col light:from-blue-100 light:via-purple-100 light:to-pink-100 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-white/80 dark:text-white/80 light:text-gray-700 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors"
        >
          ← Назад
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
            Alternate Nostril
          </h1>
          <p className="text-white/80 dark:text-white/80 light:text-gray-700 text-lg">Нади Шодхана</p>
        </motion.div>

        <div className="w-full max-w-md h-96 mb-8 flex items-center justify-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Face outline */}
            <div className="relative w-64 h-80 flex items-center justify-center">
              {/* Left nostril */}
              <motion.div
                className="absolute left-20 top-1/2 w-12 h-12 rounded-full"
                animate={{
                  backgroundColor: phase.includes("left") 
                    ? "rgba(236, 72, 153, 0.8)" 
                    : "rgba(255, 255, 255, 0.2)",
                  scale: phase === "inhale-left" ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Right nostril */}
              <motion.div
                className="absolute right-20 top-1/2 w-12 h-12 rounded-full"
                animate={{
                  backgroundColor: phase.includes("right") 
                    ? "rgba(236, 72, 153, 0.8)" 
                    : "rgba(255, 255, 255, 0.2)",
                  scale: phase === "inhale-right" ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Center instruction */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-8 shadow-2xl"
                  animate={{
                    scale: phase !== "idle" ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-white text-center font-medium">
                    {getInstruction()}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <div className="text-6xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
            {timer > 0 ? timer : "—"}
          </div>
          <div className="text-white/60 dark:text-white/60 light:text-gray-600 text-sm">
            Цикл: {cycles}
          </div>
        </motion.div>

        <div className="flex gap-4">
          {!isActive ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-4 bg-white text-rose-900 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Почати
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStop}
              className="px-8 py-4 bg-red-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Зупинити
            </motion.button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-md text-center"
        >
          <div className="bg-white/10 dark:bg-white/10 light:bg-white/80 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-white dark:text-white light:text-gray-900 font-semibold mb-3">Інструкція:</h3>
            <ul className="text-white/80 dark:text-white/80 light:text-gray-700 text-sm space-y-2 text-left">
              <li>• Закрийте праву ніздрю, вдихніть лівою</li>
              <li>• Закрийте ліву, видихніть правою</li>
              <li>• Вдихніть правою ніздрею</li>
              <li>• Закрийте праву, видихніть лівою</li>
              <li>• Повторіть 5-10 циклів</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
