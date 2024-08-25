import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ArrowLeft } from "lucide-react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { Link } from "react-router-dom";

const COLORS_TOP = ["#0032A0"];

const PicOfTheDay = () => {
  const [data, setData] = useState({});
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
            },
          }
        );
        setData(response.data);
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
       <Link to='/'><ArrowLeft size={30}/></Link> 
      </div>

      <motion.section
        style={{
          backgroundImage,
        }}
        className="relative grid min-h-screen overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
      >
        <div className="relative z-10 flex items-center justify-center gap-[200px] py-10">
          <div className="flex flex-col">
            <p className="font-fira font-semibold text-2xl">{data.title}</p>
            <img
              src={data.url}
              className="w-[400px] h[400px] py-8 border-[#020617] hover:border-8"
            />
          </div>
          <div className="font-fira text-center text-lg font-medium w-[650px] ">
            <p>{data.explanation}</p>
          </div>
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

export default PicOfTheDay;
