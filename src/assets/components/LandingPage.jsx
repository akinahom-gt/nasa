import React, { useEffect } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#0032A0", "#D92906"];
export const LandingPage = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 10%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <div>
      <motion.section
        style={{
          backgroundImage,
        }}
        className="relative grid place-content-center min-h-screen overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
      >
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex gap-5">
            <input
              type="date"
              className="mb-1.5 inline-block w-[350px] rounded-full text-white bg-gray-600/50 px-3 py-1.5 text-sm text-center"
              placeholder="Search By Date (mm/dd/yy) "
            />
            <Search className="mt-1" />
          </div>
          <h1 className="max-w-3xl font-fira font-semibold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight py-4">
            Explore Space with NASA Images{" "}
          </h1>
          <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
            Journey through the cosmos with stunning images from NASA.
            <p>
              Discover captivating visuals that reveal the wonders of the
              universe and inspire curiosity about the world beyond our own.
            </p>
          </p>
          <div className="flex gap-10 ">
            <div>
              <motion.button
                style={{
                  border,
                  boxShadow,
                }}
                whileHover={{
                  scale: 1.015,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
              >
                <Link to="/pic">Astornomy Picture Of The Day</Link>{" "}
                <ArrowUpRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
              </motion.button>
            </div>
            <div>
              {" "}
              <motion.button
                style={{
                  border,
                  boxShadow,
                }}
                whileHover={{
                  scale: 1.015,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
              >
                <Link to="/apod">Gallery</Link>{" "}
                <ArrowUpRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-0">
          <Canvas>
            <Stars radius={50} count={2500} factor={4} fade speed={2} />
          </Canvas>
        </div>
      </motion.section>
    </div>
  );
};