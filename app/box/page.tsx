"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BreathingCircle from "@/components/BreathingCircle";

type Phase = "idle" | "inhale" | "hold" | "exhale" | "hold2";

export default function BoxBreathing() {
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
      // Inhale - 4 seconds
      setPhase("inhale");
      await countdown(4);
      if (isCancelled) return;

      // Hold - 4 seconds
      setPhase("hold");
      await countdown(4);
      if (isCancelled) return;

      // Exhale - 4 seconds
      setPhase("exhale");
      await countdown(4);
      if (isCancelled) return;

      // Hold - 4 seconds
      setPhase("hold2");
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-emerald-900 flex flex-col dark:from-green-900 via-teal-900 to-emerald-900 flex flex-col light:from-blue-100 light:via-purple-100 light:to-pink-100 transition-colors duration-500">
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
            Box Breathing
          </h1>
          <p className="text-white/80 dark:text-white/80 light:text-gray-700 text-lg">Квадратне Дихання</p>
        </motion.div>

        <div className="w-full max-w-md h-96 mb-8">
          <BreathingCircle
            phase={phase === "hold2" ? "hold" : phase}
            color="from-green-500 to-teal-600"
          />
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
              className="px-8 py-4 bg-white text-teal-900 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
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
              <li>• Вдихніть протягом 4 секунд</li>
              <li>• Затримайте дихання на 4 секунди</li>
              <li>• Видихніть протягом 4 секунд</li>
              <li>• Затримайте дихання на 4 секунди</li>
              <li>• Повторіть 5-10 циклів</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
