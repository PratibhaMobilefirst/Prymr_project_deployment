import React, { useState } from "react";
import Frame from "../assets/images/Frame.png";
import HeaderDiv from "./HeaderDiv";
import BottomDiv from "./BottomDiv";
import SelectTools from "./SelectTools";
import CropTool from "./CropTool";
import BrushTool from "./BrushTool";
import SelectiveTool from "./SelectiveTool";
import DetailsModal from "./DetailsModal";
import CurvesModal from "./CurvesModal";

const BoardEdit = () => {
  const [showTools, setShowTools] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isCropping, setIsCropping] = useState(false);
  const [isTuning, setIsTuning] = useState(false);
  const [isBrushing, setIsBrushing] = useState(false);
  const [isSelective, setIsSelective] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCurvesOpen, setIsCurvesOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(Frame);
  const [tuneValues, setTuneValues] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    highlights: 0,
    shadows: 0,
    warmth: 0,
  });

  const handleToggleTools = () => {
    setShowTools(!showTools);
  };

  const handleRotate = () => {
    setRotation(rotation + 90);
  };

  const handleCrop = () => {
    setIsCropping(!isCropping);
  };

  const handleTuneImage = () => {
    setIsTuning(!isTuning);
  };

  const handleSelective = () => {
    setIsSelective(!isSelective);
  };

  const handleBrush = () => {
    setIsBrushing(!isBrushing);
  };

  const handleSliderChange = (param, value) => {
    setTuneValues({ ...tuneValues, [param]: value });
  };

  const resetTuneValue = (param) => {
    setTuneValues({ ...tuneValues, [param]: 0 });
  };

  const applyTuneAdjustments = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = currentImage;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.filter = `
        brightness(${100 + tuneValues.brightness}%)
        contrast(${100 + tuneValues.contrast}%)
        saturate(${100 + tuneValues.saturation}%)
        hue-rotate(${tuneValues.warmth}deg)
      `;
      ctx.drawImage(canvas, 0, 0);
      const newImageDataUrl = canvas.toDataURL("image/png");
      setCurrentImage(newImageDataUrl);
      setIsTuning(false);
    };
  };


  const handleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

   const handleDetailsClose = () => {
     setIsDetailsOpen(false);
   };

   const handleDetailsApply = (updatedImageDataUrl) => {
     setCurrentImage(updatedImageDataUrl);
     setIsDetailsOpen(false);
   };
   
   const handleCurves = () => {
     setIsCurvesOpen(!isCurvesOpen);
   };

  return (
    <div className="bg-black h-screen flex flex-col relative">
      <HeaderDiv />
      <div
        className={`flex-grow flex justify-center items-center relative ${
          isTuning ? "pb-48" : ""
        }`}
      >
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            src={currentImage}
            alt="Frame"
            className="object-contain max-w-full max-h-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              filter: `
                brightness(${100 + tuneValues.brightness}%)
                contrast(${100 + tuneValues.contrast}%)
                saturate(${100 + tuneValues.saturation}%)
                hue-rotate(${tuneValues.warmth}deg)
              `,
            }}
          />
          {isSelective && (
            <SelectiveTool
              image={currentImage}
              onClose={() => setIsSelective(false)}
              onApply={(newImageDataUrl) => {
                setCurrentImage(newImageDataUrl);
                setIsSelective(false);
              }}
            />
          )}
          {isTuning && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4">
              <div className="bg-gray-800 rounded-lg p-4 max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(tuneValues).map(([param, value]) => (
                    <div key={param} className="mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-white text-sm capitalize">
                          {param}
                        </label>
                        <div className="flex items-center">
                          <span className="text-white text-xs mr-2">
                            {value}
                          </span>
                          <button
                            className="bg-gray-600 text-white text-xs px-2 py-1 rounded"
                            onClick={() => resetTuneValue(param)}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        value={value}
                        onChange={(e) =>
                          handleSliderChange(param, parseInt(e.target.value))
                        }
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded text-sm"
                    onClick={() => setIsTuning(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
                    onClick={applyTuneAdjustments}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {!isTuning &&
        !isCropping &&
        !isBrushing &&
        !isSelective &&
        !isDetailsOpen &&
        !isCurvesOpen &&(
          <BottomDiv
            onToggleTools={handleToggleTools}
            onRotate={handleRotate}
            onCrop={handleCrop}
            onTuneImage={handleTuneImage}
            onSelective={handleSelective}
            onBrush={handleBrush}
          />
        )}
      {showTools && (
        <div className="absolute inset-0 z-20">
          <SelectTools
            onClose={() => setShowTools(false)}
            onTuneImage={handleTuneImage}
            onRotate={handleRotate}
            onCrop={handleCrop}
            onSelective={handleSelective}
            onBrush={handleBrush}
            onDetails={handleDetails}
            onCurves={handleCurves}
          />
        </div>
      )}
      {isCropping && (
        <CropTool
          image={currentImage}
          onClose={() => setIsCropping(false)}
          onCrop={(newImage) => {
            setCurrentImage(newImage);
            setIsCropping(false);
          }}
        />
      )}
      {isBrushing && (
        <BrushTool
          image={currentImage}
          onClose={() => setIsBrushing(false)}
          onBrush={(newImage) => {
            setCurrentImage(newImage);
            setIsBrushing(false);
          }}
        />
      )}
      {isDetailsOpen && (
        <DetailsModal
          image={currentImage}
          onClose={handleDetailsClose}
          onApply={handleDetailsApply}
        />
      )}
      {isCurvesOpen && (
        <CurvesModal
          image={currentImage}
          onClose={() => setIsCurvesOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsCurvesOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default BoardEdit;
