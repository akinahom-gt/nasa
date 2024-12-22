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
import SyncLoader from "react-spinners/SyncLoader";
const COLORS_TOP = ["#0032A0"];

const PicOfTheDay = () => {
  const [data, setData] = useState({});
  const color = useMotionValue(COLORS_TOP[0]);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
        setIsLoading(false);
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
        className="relative grid min-h-screen overflow-hidden bg-gray-950 px-4 text-gray-300"
      >
        <div className="relative z-10 lg:flex items-center justify-center group gap-[180px] px-2 ">
          <div className="flex flex-col gap-8">
            <p className="font-fira font-semibold text-lg lg:text-xl">{data.date}</p>
            <p className="font-fira font-semibold text-xl md:text-2xl">{data.title}</p>
            <div className="lg:h-[620px] rounded-[40px]">
              <div class="duration-500 transition-transform group-hover:blur-[0.5px] hover:!blur-none group-hover:scale-[0.97] hover:!scale-100 relative cursor-pointer items-center justify-center overflow-y-scroll overflow-x-hidden no-scrollbar rounded-[40px] transition-shadow hover:shadow-md hover:shadow-red-200">
                <img
                  src={data.url}
                  className="sm:w-[720px] sm:h-[600px] h-[500px] rounded-[40px] py-8"
                />
              </div>
            </div>
          </div>
          <div className="font-fira text-[14px] md:text-[18px] font-medium lg:w-[650px] mt-7 mb-10 lg:mt-[100px]">
            <p>{data.explanation}</p>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          {isLoading ? (
            <div className="flex  items-center justify-center h-screen ">
              <SyncLoader color="#ffffff" />
            </div>
          ) : null}

          <Canvas>
            <Stars radius={50} count={3000} factor={3} fade speed={1} />
          </Canvas>
        </div>
      </motion.section>
    </div>
  );
};

export default PicOfTheDay;
