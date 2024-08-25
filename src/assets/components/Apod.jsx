import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stars } from "@react-three/drei";
import { ArrowLeft } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { Link } from "react-router-dom";

const COLORS_TOP = ["#0032A0"];

const Apod = () => {
  const [images, setImages] = useState([]);
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const token = "nmVhcxoNKubuL01m3t3Q8oW70fD04OBoke94AfaT";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/planetary/apod",
          {
            params: {
              api_key: token,
              count: 20,
            },
          }
        );
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 27%, #020617 50%, ${color})`;

  return (
    <div>
      <div className="bg-[#020617] text-white p-6">
        <Link to="/">
          <ArrowLeft size={30} />
        </Link>
      </div>
      <motion.section
        style={{
          backgroundImage,
        }}
        className="relative grid min-h-screen overflow-hidden bg-gray-950 px-4 py-24 text-gray-200 font-fira"
      >
        <p className="items-center justify-center font-fira font-semibold text-[#FFFFC5] text-center text-3xl ">
          Astronomy Photo Gallery
        </p>

        <div className="relative z-10 flex flex-col items-center py-[100px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {images.map((item, index) => (
              <div key={index} className=" flex flex-col items-center">
                <div className="max-w-full h-auto rounded-[70px] w-[300px]">
                  <div class="group relative cursor-pointer items-center justify-center overflow-y-scroll overflow-x-hidden no-scrollbar rounded-[80px] transition-shadow hover:shadow-xl hover:shadow-[#FFFFC5]">
                    <img
                      src={item.url}
                      className="rounded-[100px] w-[500px] h-[400px] object-cover transition-transform duration-500 group-hover:rotate-3  "
                    />
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                    <div class="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                      <p className="text-center text-[#FFD700] mb-9 ">
                        {item.title}
                      </p>
                      <p class="mb-3 text-sm h-[100px] italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {item.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h1 className="max-w-3xl font-fira font-semibold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight py-4">
            {/* Explore Space with NASA Images{" "} */}
          </h1>
        </div>
        <div className="absolute inset-0 z-0">
          <Canvas>
            <Stars radius={50} count={3000} factor={3} fade speed={1} />
          </Canvas>
        </div>
      </motion.section>
    </div>
  );
};

export default Apod;
