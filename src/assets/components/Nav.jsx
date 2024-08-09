import React from 'react'
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <div><div class="flex md:flex md:flex-grow flex-row justify-end space-x-16  px-12 font-fira font-semibold  text-[17px] ">
    <a href="#" className="hover:text-blue-600">Home</a>
    <a href="" className="">About</a>
    <a href="" class="">APOD</a>
    <a href="" class="">Mars Rover Photos</a>
    <a href="" class="">EPIC</a>
    </div>
        </div>
  )
}

export default Nav