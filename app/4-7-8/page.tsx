"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BreathingCircle from "@/components/BreathingCircle";

type Phase = "idle" | "inhale" | "hold" | "exhale";

export default function FourSevenEight() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const cycleSequence = async () => {
      // Inhale - 4 seconds
      setPhase("inhale");
      setTimer(4);
      await countdown(4);

      // Hold - 7 seconds
      setPhase("hold");
      setTimer(7);
      await countdown(7);

      // Exhale - 8 seconds
      setPhase("exhale");
      setTimer(8);
      await countdown(8);

      setCycles((prev) => prev + 1);
    };

    cycleSequence();
  }, [isActive, cycles]);

  const countdown = (seconds: number): Promise<void> => {
    return new Promise((resolve) => {
      let count = seconds;
      const interval = setInterval(() => {
        count--;
        setTimer(count);
        if (count <= 0) {
          clearInterval(interval);
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
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-white/80 hover:text-white transition-colors"
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            4-7-8 Breathing
          </h1>
          <p className="text-white/80 text-lg">Relaxing Breath</p>
        </motion.div>

        <div className="w-full max-w-md h-96 mb-8">
          <BreathingCircle
            phase={phase}
            color="from-blue-500 to-purple-600"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <div className="text-6xl font-bold text-white mb-4">
            {timer > 0 ? timer : "—"}
          </div>
          <div className="text-white/60 text-sm">
            Цикл: {cycles}
          </div>
        </motion.div>

        <div className="flex gap-4">
          {!isActive ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-4 bg-white text-purple-900 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
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
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-3">Інструкція:</h3>
            <ul className="text-white/80 text-sm space-y-2 text-left">
              <li>• Вдихніть через ніс протягом 4 секунд</li>
              <li>• Затримайте дихання на 7 секунд</li>
              <li>• Видихніть через рот протягом 8 секунд</li>
              <li>• Повторіть 4-8 циклів</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
