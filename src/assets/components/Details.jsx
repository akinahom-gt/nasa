import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { ArrowLeft } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
const COLORS_TOP = ["#0032A0"];

const Details = () => {
  const { date } = useParams();
  const color = useMotionValue(COLORS_TOP[0]);
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = "nmVhcxoNKubuL01m3t3Q8oW70fD04OBoke94AfaT";
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  useEffect(() => {
    setIsLoading(true);
    const fetchImageByDate = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/planetary/apod",
          {
            params: {
              api_key: token,
              date: date,
            },
          }
        );
        setImageData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchImageByDate();
  }, [date, token]);

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
        className="relative grid min-h-screen overflow-hidden bg-gray-950 px-4 text-gray-200 font-fira"
      >
        {imageData && (
          <div className="relative z-10 flex items-center justify-center group gap-[180px] ">
            <div className="flex flex-col gap-4">
              <p className="font-fira font-semibold text-2xl">
                {imageData.date}
              </p>
              <p className="font-fira font-semibold text-3xl">
                {imageData.title}
              </p>
              <div className=" h-[620px] rounded-[70px]">
                <div class="duration-500 transition-transform group-hover:blur-[0.5px] hover:!blur-none group-hover:scale-[0.97] hover:!scale-100 relative cursor-pointer items-center justify-center overflow-y-scroll overflow-x-hidden no-scrollbar rounded-[80px] transition-shadow hover:shadow-md hover:shadow-red-200">
                  <img
                    src={imageData.url}
                    className="w-[720px] h-[600px] rounded-[90px] py-8"
                  />
                </div>
              </div>
            </div>
            <div className="font-fira text-center text-xl font-medium w-[650px] mt-[100px]">
              <p>{imageData.explanation}</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 z-0">
          {isLoading ? (
            <div className="flex  items-center justify-center h-screen ">
              <PropagateLoader color="#ffffff" />
            </div>
          ) : null}
        </div>
        <div className="absolute inset-0 z-0">
          <Canvas>
            <Stars radius={50} count={3000} factor={4} fade speed={4} />
          </Canvas>
        </div>
      </motion.section>
    </div>
  );
};

export default Details;
