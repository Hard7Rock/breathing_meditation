"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const techniques = [
  {
    id: "4-7-8",
    name: "4-7-8",
    title: "Relaxing Breath",
    description: "Заспокоєння та покращення сну",
    color: "from-blue-500 to-purple-600",
    pattern: "4 сек вдих • 7 сек затримка • 8 сек видих"
  },
  {
    id: "box",
    name: "Box Breathing",
    title: "Квадратне Дихання",
    description: "Фокус та стрес-менеджмент",
    color: "from-green-500 to-teal-600",
    pattern: "4-4-4-4 секунди"
  },
  {
    id: "wim-hof",
    name: "Wim Hof",
    title: "Метод Віма Хофа",
    description: "Енергія та імунітет",
    color: "from-orange-500 to-red-600",
    pattern: "30-40 циклів + затримка"
  },
  {
    id: "alternate",
    name: "Alternate Nostril",
    title: "Нади Шодхана",
    description: "Баланс та ясність",
    color: "from-pink-500 to-rose-600",
    pattern: "Чергування ніздрів"
  },
  {
    id: "coherent",
    name: "Coherent",
    title: "Когерентне Дихання",
    description: "Серцевий резонанс",
    color: "from-indigo-500 to-blue-600",
    pattern: "5-6 сек вдих • 5-6 сек видих"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Breathing Meditation
          </h1>
          <p className="text-xl text-gray-300">
            5 патернів дихання для медитацій
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {techniques.map((technique, index) => (
            <motion.div
              key={technique.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/${technique.id}`}>
                <div className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${technique.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {technique.name}
                      </h2>
                      <p className="text-white/90 text-sm mb-3">
                        {technique.title}
                      </p>
                      <p className="text-white/80 text-sm">
                        {technique.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-xs">
                        {technique.pattern}
                      </span>
                      <span className="text-white group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16 text-gray-400 text-sm"
        >
          <p>Оберіть техніку для початку практики</p>
        </motion.div>
      </div>
    </main>
  );
}
