"use client";
import Navbar from "@/src/app/(Landing-Page)/NavBar";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Footer from "@/src/components/Footer";

const instructors = [
  {
    name: "John Doe",
    role: "Senior Developer @Google",
    description:
      "John specializes in AI and Web Development with over 5 years of experience.",
    image: "/placeholder.png",
  },
  {
    name: "Jane Smith",
    role: "Software Engineer @Meta",
    description:
      "Jane is a full-stack developer passionate about helping students break into tech.",
    image: "/placeholder.png",
  },
  {
    name: "Alice Johnson",
    role: "Lead Engineer @Microsoft",
    description:
      "Alice has been working in cloud computing and distributed systems for 7 years.",
    image: "/placeholder.png",
  },
  {
    name: "Bob Williams",
    role: "Tech Lead @Amazon",
    description:
      "Bob specializes in scalable architectures and cloud-based services.",
    image: "/placeholder.png",
  },
];

const repeatedInstructors = Array(20).fill(instructors).flat();

export default function AboutUs() {
  const controls = useAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const startScroll = async () => {
      await controls.start({
        x: ["0%", "-100%"],
        transition: {
          ease: "linear",
          duration: 270,
          repeat: Infinity,
        },
      });
    };

    if (!isPaused) {
      startScroll();
    } else {
      controls.stop(); // Pause animation properly
    }
  }, [isPaused, controls]);

  const nextSlide = () => {
    scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });
  };

  const prevSlide = () => {
    scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#eceeed] text-gray-900 dark:bg-[#121212] dark:text-white flex flex-col items-center justify-center p-10 mt-12 relative z-[1]">
        <h1 className="text-6xl font-bold mb-4">Meet Our Developers</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-10 max-w-4xl text-xl">
          Our developers are industry experts dedicated to helping you succeed
          in your coding journey.
        </p>

        <div className="relative w-full max-w-6xl flex items-center justify-center mt-8 z-[0]">
          {/* Left Navigation Button */}
          <button
            onClick={prevSlide}
            className="absolute left-[-70px] top-1/2 transform -translate-y-1/2 p-3 bg-gray-300 dark:bg-[#1e1e1e] border border-gray-400 dark:border-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-700 transition"
          >
            <Image
              src={"/left-long-solid.svg"}
              width={20}
              height={20}
              alt="Left"
              className="dark:invert"
            />
          </button>

          {/* Auto-scrolling container */}
          <div ref={scrollRef} className="overflow-hidden flex w-full z-0">
            <motion.div
              animate={controls}
              className="flex space-x-6 min-w-max z-0"
            >
              {repeatedInstructors.map((instructor, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#2a2a2a] shadow-lg dark:shadow-gray-700 p-6 rounded-xl w-80 h-80 text-center transform transition duration-300 hover:scale-105"
                  onMouseEnter={() => setIsPaused(true)} // Pause on hover
                  onMouseLeave={() => setIsPaused(false)} // Resume on leave
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-gray-300 dark:border-gray-600 overflow-hidden">
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h2 className="text-xl font-semibold dark:text-gray-100">
                    {instructor.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {instructor.role}
                  </p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {instructor.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={nextSlide}
            className="absolute right-[-70px] top-1/2 transform -translate-y-1/2 p-3 bg-gray-300 dark:bg-[#1e1e1e] border border-gray-400 dark:border-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-700 transition"
          >
            <Image
              src={"/left-long-solid.svg"}
              width={20}
              height={20}
              alt="Right"
              className="rotate-180 dark:invert"
            />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
