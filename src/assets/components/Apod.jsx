import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stars } from "@react-three/drei";
import { ArrowLeft } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import SyncLoader from "react-spinners/SyncLoader";
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
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

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
              count: 20,
            },
          }
        );
        setImages(response.data);
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
        className="relative grid min-h-screen overflow-hidden bg-gray-950 px-4 py-24 text-gray-200 font-fira"
      >
        <p className="items-center justify-center uppercase font-fira font-semibold text-center text-4xl ">
          Astronomy Photo Gallery
        </p>
        {isLoading ? (
          <div className="flex  items-center justify-center ">
            <SyncLoader color="#ffffff" />
          </div>
        ) : null}

        <div className="relative z-10 flex flex-col items-center py-[100px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 group gap-12">
            {images.map((item, index) => (
              <div key={index} className=" flex flex-col items-center">
                <div className="max-w-full h-auto rounded-[70px] w-[300px]">
                  <div class="duration-500 transition-transform group-hover:blur-[0.5px] hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 relative cursor-pointer items-center justify-center overflow-y-scroll overflow-x-hidden no-scrollbar rounded-[80px] transition-shadow hover:shadow-lg hover:shadow-red-200">
                    <Link to={`/image/${item.date}`}>
                      <img
                        src={item.url}
                        className="rounded-[100px] w-[500px] h-[400px] object-cover transition-transform duration-500 "
                      />
                      <div class="absolute inset-0 "></div>
                      <p className="text-center text-white mb-9 py-3 w-[300px]">
                        {item.title}
                      </p>
                    </Link>
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
            <Stars radius={50} count={3000} factor={4} fade speed={3} />
          </Canvas>
        </div>
      </motion.section>
    </div>
  );
};

export default Apod;
