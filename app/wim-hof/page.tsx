"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Phase = "idle" | "breathing" | "hold" | "recovery";

export default function WimHof() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [isActive, setIsActive] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const [holdTimer, setHoldTimer] = useState(0);
  const [rounds, setRounds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
      return;
    }

    let isCancelled = false;

    const cycleSequence = async () => {
      // Breathing phase - 30 breaths
      setPhase("breathing");
      setBreathCount(0);
      
      await breathingRounds(30);
      if (isCancelled) return;

      // Hold phase - as long as possible (we'll do 90 seconds max)
      setPhase("hold");
      await holdBreath(90);
      if (isCancelled) return;

      // Recovery breath - 15 seconds
      setPhase("recovery");
      await countdown(15);
      if (isCancelled) return;

      setRounds((prev) => prev + 1);
      setPhase("idle");
    };

    cycleSequence();

    return () => {
      isCancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
    };
  }, [isActive, rounds]);

  const breathingRounds = (count: number): Promise<void> => {
    return new Promise((resolve) => {
      let currentCount = 0;
      
      breathIntervalRef.current = setInterval(() => {
        currentCount++;
        setBreathCount(currentCount);
        
        if (currentCount >= count) {
          if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
          resolve();
        }
      }, 1500); // 1.5 seconds per breath
    });
  };

  const holdBreath = (maxSeconds: number): Promise<void> => {
    return new Promise((resolve) => {
      let count = 0;
      setHoldTimer(0);
      
      intervalRef.current = setInterval(() => {
        count++;
        setHoldTimer(count);
        
        if (count >= maxSeconds) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          resolve();
        }
      }, 1000);
    });
  };

  const countdown = (seconds: number): Promise<void> => {
    return new Promise((resolve) => {
      let count = seconds;
      setHoldTimer(count);
      
      intervalRef.current = setInterval(() => {
        count--;
        setHoldTimer(count);
        if (count <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          resolve();
        }
      }, 1000);
    });
  };

  const handleStart = () => {
    setIsActive(true);
    setRounds(0);
  };

  const handleStop = () => {
    setIsActive(false);
    setPhase("idle");
    setBreathCount(0);
    setHoldTimer(0);
    setRounds(0);
  };

  const handleSkipHold = () => {
    if (phase === "hold" && intervalRef.current) {
      clearInterval(intervalRef.current);
      setPhase("recovery");
    }
  };

  const getInstruction = () => {
    switch (phase) {
      case "breathing":
        return "Глибоко дихайте";
      case "hold":
        return "Затримайте дихання";
      case "recovery":
        return "Глибокий вдих + затримка";
      default:
        return "Готові?";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-amber-900 flex flex-col dark:from-orange-900 via-red-900 to-amber-900 flex flex-col light:from-blue-100 light:via-purple-100 light:to-pink-100 transition-colors duration-500">
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
            Wim Hof Method
          </h1>
          <p className="text-white/80 dark:text-white/80 light:text-gray-700 text-lg">Метод Віма Хофа</p>
        </motion.div>

        <div className="w-full max-w-md h-96 mb-8 flex items-center justify-center">
          <motion.div
            className="relative w-64 h-64 rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-2xl flex items-center justify-center"
            animate={{
              scale: phase === "breathing" ? [1, 1.2, 1] : phase === "hold" ? 1.3 : 1,
            }}
            transition={{
              duration: phase === "breathing" ? 1.5 : 2,
              repeat: phase === "breathing" ? Infinity : 0,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-white/20"
              animate={{
                opacity: phase === "breathing" ? [0.2, 0.5, 0.2] : 0.2,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
            
            <div className="text-center z-10">
              <div className="text-white text-2xl font-semibold mb-2">
                {getInstruction()}
              </div>
              {phase === "breathing" && (
                <div className="text-white/90 text-4xl font-bold">
                  {breathCount}/30
                </div>
              )}
              {(phase === "hold" || phase === "recovery") && (
                <div className="text-white/90 text-4xl font-bold">
                  {holdTimer}s
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <div className="text-white/60 dark:text-white/60 light:text-gray-600 text-sm">
            Раунд: {rounds}
          </div>
        </motion.div>

        <div className="flex gap-4">
          {!isActive ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-4 bg-white text-orange-900 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Почати
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStop}
                className="px-8 py-4 bg-red-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Зупинити
              </motion.button>
              {phase === "hold" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSkipHold}
                  className="px-6 py-4 bg-white/20 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow"
                >
                  Далі →
                </motion.button>
              )}
            </>
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
              <li>• Зробіть 30 глибоких вдихів-видихів</li>
              <li>• Після останнього видиху затримайте дихання</li>
              <li>• Тримайте скільки зможете (мін. 1-2 хв)</li>
              <li>• Зробіть глибокий вдих + затримка 15 сек</li>
              <li>• Повторіть 3 раунди</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
