"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BreathingCircle from "@/components/BreathingCircle";

type Phase = "idle" | "inhale" | "exhale";

export default function CoherentBreathing() {
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
      // Inhale - 6 seconds
      setPhase("inhale");
      await countdown(6);
      if (isCancelled) return;

      // Exhale - 6 seconds
      setPhase("exhale");
      await countdown(6);
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
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex flex-col dark:from-indigo-900 via-blue-900 to-purple-900 flex flex-col transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-white/80 dark:text-white/80 hover:text-white dark:hover:text-white transition-colors"
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
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-4">
            Coherent Breathing
          </h1>
          <p className="text-white/80 dark:text-white/80 text-lg">Когерентне Дихання</p>
        </motion.div>

        <div className="w-full max-w-md h-96 mb-8">
          <BreathingCircle
            phase={phase}
            color="from-indigo-500 to-blue-600"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <div className="text-6xl font-bold text-white dark:text-white mb-4">
            {timer > 0 ? timer : "—"}
          </div>
          <div className="text-white/60 dark:text-white/60 text-sm">
            Цикл: {cycles}
          </div>
        </motion.div>

        <div className="flex gap-4">
          {!isActive ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-4 bg-white text-indigo-900 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
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
          <div className="bg-white/10 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-white dark:text-white font-semibold mb-3">Інструкція:</h3>
            <ul className="text-white/80 dark:text-white/80 text-sm space-y-2 text-left">
              <li>• Вдихніть протягом 6 секунд</li>
              <li>• Видихніть протягом 6 секунд</li>
              <li>• Підтримуйте рівний, спокійний ритм</li>
              <li>• Практикуйте 10-20 хвилин</li>
              <li>• Ідеально для зниження стресу</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
