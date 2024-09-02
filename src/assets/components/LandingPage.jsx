import React, { useEffect, useState } from "react";
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
import axios from "axios";

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

  const [image, setImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const token = "nmVhcxoNKubuL01m3t3Q8oW70fD04OBoke94AfaT";

  const fetchData = async (date) => {
    try {
      const response = await axios.get("https://api.nasa.gov/planetary/apod", {
        params: {
          api_key: token,
          date: date,
        },
      });
      setImage(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSearch = () => {
    fetchData(selectedDate);
  };

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 27%, #020617 50%, ${color})`;
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
          <div className="flex gap-9">
            <div>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="mb-1.5 inline-block w-[280px] rounded-lg cursor-pointer text-white shadow-inner shadow-gray-500/80  outline-none bg-gray-600/50 px-3 py-1.5 text-sm text-center"
                placeholder="Search By Date (mm/dd/yy) "
              />
            </div>
            <div></div>
            <motion.button
              
              onClick={handleSearch}
              className="border w-[30px] h-[30px] hover:border-white border-gray-600 rounded-full px-1"
            >
              <Search size={20} />
            </motion.button>
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
              <Link to="/pic">
                <motion.button
                  style={{
                    border,
                  }}
                  className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                >
                  Astronomy Picture Of The Day{" "}
                  <ArrowUpRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                </motion.button>
              </Link>
            </div>
            <div>
              <Link to="/apod">
                <motion.button
                  style={{
                    border,
                  }}
                  className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                >
                  Gallery
                  <ArrowUpRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                </motion.button>
              </Link>
            </div>
          </div>

          {image && (
            <div className="relative z-10 flex items-center justify-center gap-[150px] py-[190px]">
              <div className="flex flex-col gap-3">
                <p className="font-fira font-semibold text-xl">{image.date}</p>
                <p className="font-fira font-semibold text-2xl">
                  {image.title}
                </p>
                <img
                  src={image.url}
                  className="w-[400px] h-[400px] py-8 rounded-[80px] transition-shadow hover:shadow-sm hover:shadow-red-200"
                />
              </div>
              <div className="font-fira text-center text-lg font-medium w-[650px] ">
                <p>{image.explanation}</p>
              </div>
            </div>
          )}
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
