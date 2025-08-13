import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const guidelines = [
  "All candidates who secure admission in the college are deemed to have agreed to all the rules and regulations, given hereunder and such other rules and regulations as to be added, or amended from time to time.",
  "Students, admitted in this college, will have to give an undertaking that he/she will not involve in any sort of ragging or any other in disciplinary act; if involved, he/she is liable to be punished accordingly.",
  "Students should not stand in corridors/ near cycle stand for gossiping. Students should not sit on the parapet walls, railings, steps or stair-cases. Loitering in the corridors or in the campus during college working hours is strictly prohibited.",
  "Students should maintain strict discipline inside the class rooms as well as in the college campus. They should keep the class rooms/college campus neat and tidy.",
  "Students should be punctual to the classes. They will not be permitted into the class 5 minutes after the commencement of the class",
  "Triple riding on two wheelers is strictly prohibited in the college campus.",
  "Students should not bring cell phones to the college. If any student is found with a cell phone, it will be taken away from him/her and confiscated by the principal as a part of disciplinary action.",
  "Smoking in the college campus is strictly prohibited.",
  "Ragging is strictly prohibited as per Government Orders.",
  "Students should display identity cards on person during their stay in the college campus.",
  "Any student involved in breaking or damaging any college property shall be punished severely.",
  "Students are prohibited from resorting to strikes and demonstrations, as it shall automatically result in suspension from the college.",
  "Students are prohibited organizing any meetings or entertainment programmes or collection of money for any purpose within the college or outside the college without the permission of the Principal.",
  "Criticizing or abusing the girl students in foul language is strictly prohibited in the campus.",
  "Students are expected to behave well with the, staff, other students and general public. Any misbehavior coming to the notice of the college authorities will be severely dealt with."
];

const quickLinks = [
  {
    title: "Minutes of Meeting",
    subLinks: ["2022-23", "2021-22", "2020-21", "2019-20", "2018-19"]
  },
  { title: "Code of Conduct for Students" },
  { title: "Hand Book for Code of Conduct" },
  { title: "Policy Document on Code of Ethics" },
  { title: "VIIT Autonomous Examination Manual" }
];

export default function DisciplineCell() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16 px-6 text-center shadow-lg"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          Discipline Cell
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-200">
          Promoting discipline and fostering a peaceful academic environment for all students.
        </p>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <p className="text-gray-700 leading-relaxed">
              The Discipline Cell has been established to promote discipline and adherence
              to the rules in the college. The Committee ensures a peaceful atmosphere
              conducive to attaining educational goals, and works to prevent disturbances
              or ill incidents on campus.
            </p>
            <img
              src="/images/0L.jpeg"
              alt="Students working in lab"
              className="mt-3 rounded-lg shadow-md w-full"
            />
          </motion.div>

          {/* Guidelines */}
          <section className="bg-white py-12 px-6">
            <h2 className="text-2xl font-semibold mb-8 text-center">Guidelines for Student Discipline</h2>
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
              {guidelines.map((rule, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg shadow-sm"
                >
                  <span className="font-bold text-blue-600">Rule {idx + 1}:</span> {rule}
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#183153] rounded-xl shadow-md p-6 h-fit text-white"
        >
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link, idx) => {
              const isOpen = openIndex === idx;
              return (
                <li key={idx}>
                  <motion.div
                    whileHover={{
                      x: 5,
                      backgroundColor: '#2c4366',
                      color: '#ffd700',
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => link.subLinks && setOpenIndex(isOpen ? null : idx)}
                    className={`cursor-pointer font-medium px-3 py-2 rounded-md transition-colors duration-150 ${isOpen ? 'bg-[#2c4366] text-[#ffd700] font-bold' : 'text-white hover:bg-[#2c4366] hover:text-[#ffd700]'}`}
                  >
                    {link.title}
                  </motion.div>
                  <AnimatePresence>
                    {link.subLinks && isOpen && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4 mt-2 space-y-1"
                      >
                        {link.subLinks.map((sub, subIdx) => (
                          <motion.li
                            key={subIdx}
                            whileHover={{
                              x: 5,
                              backgroundColor: '#2c4366',
                              color: '#ffd700',
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="cursor-pointer text-sm px-2 py-1 rounded-md text-white hover:bg-[#2c4366] hover:text-[#ffd700]"
                          >
                            {sub}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </motion.aside>
      </div>
    </div>
  );
}
