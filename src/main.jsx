import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const contextClass = {
 
  error: "bg-gray-400",

  
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
    <ToastContainer
     toastClassName={(context) =>
      contextClass[context?.type || "default"] +
      " relative flex p-1 w-[400px] text-black min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
    }
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>
);