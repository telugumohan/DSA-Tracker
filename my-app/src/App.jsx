import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const difficulties = ["Easy", "Medium", "Hard"];
const difficultyColors = {
  Easy: "bg-green-600",
  Medium: "bg-yellow-500",
  Hard: "bg-red-600",
};

// Define the roadmap order, with separate Arrays and Strings
const topicOrder = [
  "Foundation: Prerequisites & Core Concepts",
  "Arrays",
  "Strings",
  "Math",
  "Bit Manipulation",
  "Hashing",
  "Sliding Window + Two Pointers",
  "Stack",
  "Queue",
  "Linked List",
  "Recursion",
  "Backtracking",
  "Binary Search",
  "Greedy",
  "Sorting",
  "Heap & Priority Queue",
  "Trie",
  "Graphs",
  "Disjoint Set Union (DSU)",
  "Depth First Search (DFS)",
  "Breadth First Search (BFS)",
  "Topological Sort",
  "Dynamic Programming",
  "1D Dynamic Programming",
  "2D Dynamic Programming",
  "Dynamic Programming on Subsequences",
  "Dynamic Programming on Trees",
  "Binary Trees",
  "Binary Search Trees",
  "Segment Tree",
  "Fenwick Tree (Binary Indexed Tree)",
  "Monotonic Stack",
  "Monotonic Queue",
  "Matrix",
  "Game Theory",
  "Bitmasking",
  "String Matching Algorithms",
  "Divide and Conquer",
  "Trie and Advanced String Algorithms",
  "Graph Advanced",
  "Shortest Path Algorithms",
  "Minimum Spanning Tree",
  "Geometry",
  "Advanced Data Structures",
  "Practice Contests & Mixed Problems"
];


export default function App() {
  const [problemsData, setProblemsData] = useState({});
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("progress");
    return saved ? JSON.parse(saved) : {};
  });
  const [openTopic, setOpenTopic] = useState(null);
  const [openDifficulty, setOpenDifficulty] = useState({});

  useEffect(() => {
    fetch("https://dsa-tracker-told.onrender.com/api/problems")
      .then(res => res.json())
      .then(data => {
        const grouped = {};
        data.forEach(p => {
          const topic = p.topic;
          const diff = p.difficulty;
          if (!grouped[topic]) grouped[topic] = {};
          if (!grouped[topic][diff]) grouped[topic][diff] = [];
          grouped[topic][diff].push({
            id: p._id,
            name: p.problem,
            resource: p.resource,
            practice: p.practice,
          });
        });

        // Ensure all difficulties exist per topic
        Object.keys(grouped).forEach(topic => {
          difficulties.forEach(diff => {
            if (!grouped[topic][diff]) grouped[topic][diff] = [];
          });
        });

        setProblemsData(grouped);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  const toggle = (id, field) => {
    setProgress(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: !prev[id]?.[field] },
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <motion.h1
        className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🚀 DSA Tracker
      </motion.h1>

      <div className="text-center text-lg text-slate-400 mb-6">
        🎯 Progress:{" "}
        {Object.values(progress).filter(p => p.completed).length}/
        {Object.values(problemsData).flatMap(t => Object.values(t)).flat()
          .length || 0}{" "}
        problems completed
      </div>

      <div className="space-y-8">
        {topicOrder.map(topic => {
          const byDifficulty = problemsData[topic];
          if (!byDifficulty) return null;

          const itemsAll = Object.values(byDifficulty).flat();
          const completedCount = itemsAll.filter(item => progress[item.id]?.completed).length;
          const totalProblems = itemsAll.length;

          return (
            <motion.div
              key={topic}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="border border-slate-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenTopic(prev => (prev === topic ? null : topic))}
                className="w-full px-6 py-4 bg-slate-800 hover:bg-slate-700 text-left text-xl font-semibold text-cyan-300 transition"
              >
                {topic}{" "}
                <span className="text-sm text-gray-400">
                  ({completedCount}/{totalProblems})
                </span>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
                  <div
                    className="bg-cyan-400 h-2 rounded-full"
                    style={{ width: `${(completedCount / (totalProblems || 1)) * 100}%` }}
                  />
                </div>
              </button>

              <AnimatePresence>
                {openTopic === topic && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-slate-800 border-t border-slate-700 flex flex-col gap-4"
                  >
                    {difficulties.map(diff => {
                      const items = byDifficulty[diff];
                      const isOpen = openDifficulty[topic] === diff;
                      const doneCount = items.filter(item => progress[item.id]?.completed).length;

                      return (
                        <div key={diff} className="w-full">
                          <button
                            onClick={() =>
                              setOpenDifficulty(prev => ({
                                ...prev,
                                [topic]: prev[topic] === diff ? null : diff,
                              }))
                            }
                            className={`w-full text-left px-4 py-2 font-bold rounded-md text-white transition ${difficultyColors[diff]} hover:opacity-90`}
                          >
                            <div className="flex justify-between items-center">
                              <span>{diff}</span>
                              <span className="text-sm text-gray-200">
                                ({doneCount}/{items.length})
                              </span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-1 mt-1">
                              <div
                                className="bg-white h-1 rounded-full"
                                style={{ width: `${(doneCount / (items.length || 1)) * 100}%` }}
                              />
                            </div>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.ul
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="mt-2 space-y-2"
                              >
                                <li className="bg-slate-700 p-3 rounded-md grid grid-cols-[3fr_2fr_2fr_1fr_1fr] gap-4 font-semibold">
                                  <div>Problem</div>
                                  <div>Resource</div>
                                  <div>Practice</div>
                                  <div className="text-center">Done</div>
                                  <div className="text-center">⭐</div>
                                </li>
                                {items.map(({ id, name, resource, practice }) => {
                                  const state = progress[id] || {};
                                  const resLink = resource || `https://www.youtube.com/results?search_query=${encodeURIComponent(name + " DSA")}`;
                                  const prLink = practice || `https://www.google.com/search?q=${encodeURIComponent(name + " practice")}`;

                                  return (
                                    <li
                                      key={id}
                                      className="bg-slate-700 p-4 rounded-md grid grid-cols-[3fr_2fr_2fr_1fr_1fr] gap-4 items-center hover:bg-slate-600 transition"
                                    >
                                      <div className="text-sm font-medium text-cyan-200">{name}</div>
                                      <div>
                                        <a href={resLink} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">Resource</a>
                                      </div>
                                      <div>
                                        <a href={prLink} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">Practice</a>
                                      </div>
                                      <div className="flex justify-center">
                                        <input type="checkbox" checked={state.completed || false} onChange={() => toggle(id, "completed")} className="accent-cyan-400 w-5 h-5"/>
                                      </div>
                                      <div className="flex justify-center">
                                        <button onClick={() => toggle(id, "important")} className="text-xl hover:scale-110 transition-transform" aria-label="Toggle important">
                                          {state.important ? "⭐" : "☆"}
                                        </button>
                                      </div>
                                    </li>
                                  );
                                })}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
