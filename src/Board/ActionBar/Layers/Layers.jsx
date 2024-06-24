import React, { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCheck,
} from "react-icons/ai";
import { FaPlus, FaRedo, FaUndo } from "react-icons/fa";
import hamburger from "../../../assets/hamburger.svg";
import eye from "../../../assets/Eye.svg";
import leftarrow from "../../../assets/leftarrow.svg";
import { GoPlus } from "react-icons/go";
import { IoLayersOutline } from "react-icons/io5";
import tappable from "../../../assets/tappable.svg";
import AddAction from "../../../assets/AddActions.svg";
import AddContent from "../../../assets/AddContent.svg";
import search from "../../../assets/search.svg";
import arrowspointingout from "../../../assets/arrowspointingout.svg";
// ************************* New Tappable ************************

const LayersPanel = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [layerIsClicked, setLayerIsClicked] = useState(false);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleLayerClick = () => {
    setLayerIsClicked(!layerIsClicked);
    // setBoardVisible(!layerIsClicked);
  };
  return (
    // {layerIsClicked && (
    <div className="fixed bottom-20  w-[100%]">
      <header className="flex items-center justify-between bg-[#00000047] ">
        <h2 className="text-lg text-white px-2 ">Layers</h2>
        <button className="text-white">
          <FaPlus />
        </button>
        <img src={search} alt="search" className="w-5 mr-2 h-5" />
        <img
          src={arrowspointingout}
          alt="arrowspointingout"
          className="w-5 h-5 mr-2"
        />
      </header>
      <div className="bg-gray-800 text-white opacity-500 p-2">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center h-9 justify-between p-2 bg-gray-700 rounded">
            <h3 className="text-sm">Layer 01</h3>
            <div className="flex h-8 bg-[#4B4B4B]">
              <button onClick={() => setLayerIsClicked(!layerIsClicked)}>
                <img src={eye} className=" items-center -mt-1 h-6 w-6" alt=""/>
              </button>
              <button>
                <img
                  src={leftarrow}
                  className="items-center -mt-1 h-6 w-6"
                  alt=""
                />
              </button>
              <button>
                <img src={hamburger} className="items-center -mt-1 h-6 w-6" alt="" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center justify-center bg-gray-700 rounded p-4">
              <label htmlFor="fileInput1">
                <img
                  src={selectedImage || tappable}
                  alt="Tappable"
                  className="cursor-pointer w-[120px] h-[120px] rounded-md"
                />
              </label>
              <input
                type="file"
                accept="image/*"
                id="fileInput1"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <button className="flex flex-col items-center justify-center  bg-gray-700 rounded">
              <img src={AddAction} alt="Add Actions" />
              {/* <div className="w-12 h-12 bg-gray-500 rounded mb-2"></div>
                  <span className="text-xs">Tap Action</span> */}
            </button>
            <button className="flex flex-col items-center justify-center  bg-gray-700 rounded">
              <img src={AddContent} alt="Add Content" />
              {/* <div className="w-12 h-12 bg-gray-500 rounded mb-2"></div>
                  <span className="text-xs">Add Content</span> */}
            </button>
          </div>
        </div>
      </div>
    </div>
    // )}
  );
};

export default LayersPanel;
