import React, { useState, useEffect } from "react";
import Frame from "../assets/images/Frame.png";
import HeaderDiv from "./HeaderDiv";
import BottomDiv from "./BottomDiv";
import SelectTools from "./SelectTools";
import CropTool from "./CropTool";
import BrushTool from "./BrushTool";
import SelectiveTool from "./SelectiveTool";
import DetailsModal from "./DetailsModal";
import CurvesModal from "./CurvesModal";
import WhiteBalancesModal from "./WhiteBalancesModal";
import PerspectiveTool from "./PerspectiveTool";
import FullScreenTool from "./FullScreenTool";
import HealingTool from "./HealingTool";
import TonalContrastTool from "./TonalContrastTool";
import GlamourTool from "./GlamourTool";
import GrainyFilmTool from "./GrainyFilmTool";
import RetroluxTool from "./RetroluxTool";
import DramaTool from "./DramaTool";

const BoardEdit = () => {
  const [showTools, setShowTools] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isCropping, setIsCropping] = useState(false);
  const [isTuning, setIsTuning] = useState(false);
  const [isBrushing, setIsBrushing] = useState(false);
  const [isSelective, setIsSelective] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCurvesOpen, setIsCurvesOpen] = useState(false);
  const [showWhiteBalancesModal, setShowWhiteBalancesModal] = useState(false);
  const [isPerspectiveOpen, setIsPerspectiveOpen] = useState(false);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [isHealing, setIsHealing] = useState(false);
  const [isTonalContrastOpen, setIsTonalContrastOpen] = useState(false);
  const [isGlamourOpen, setIsGlamourOpen] = useState(false);
  const [isGrainyFilmOpen, setIsGrainyFilmOpen] = useState(false);
  const [isRetroluxOpen, setIsRetroluxOpen] = useState(false);
  const [isDramaOpen, setIsDramaOpen] = useState(false);
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
    setRotation((prevRotation) => (prevRotation + 90) % 360);
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

      // Apply brightness, contrast, saturation, and warmth
      ctx.filter = `
      brightness(${100 + tuneValues.brightness}%)
      contrast(${100 + tuneValues.contrast}%)
      saturate(${100 + tuneValues.saturation}%)
      hue-rotate(${tuneValues.warmth}deg)
    `;
      ctx.drawImage(canvas, 0, 0);

      // Apply shadows and highlights
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Apply shadows
        if (luminance < 0.5) {
          const shadowFactor = 1 + tuneValues.shadows / 100;
          data[i] *= shadowFactor;
          data[i + 1] *= shadowFactor;
          data[i + 2] *= shadowFactor;
        }

        // Apply highlights
        if (luminance > 0.5) {
          const highlightFactor = 1 + tuneValues.highlights / 100;
          data[i] = Math.min(255, data[i] * highlightFactor);
          data[i + 1] = Math.min(255, data[i + 1] * highlightFactor);
          data[i + 2] = Math.min(255, data[i + 2] * highlightFactor);
        }
      }
      ctx.putImageData(imageData, 0, 0);

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

  const handleWhiteBalances = () => {
    setShowWhiteBalancesModal(!showWhiteBalancesModal);
  };

  const handlePerspective = () => {
    setIsPerspectiveOpen(!isPerspectiveOpen);
  };

  const handleFullScreenOpen = () => {
    setIsFullScreenOpen(!isFullScreenOpen);
  };

  const handleHealing = () => {
    setIsHealing(!isHealing);
  };

  const handleTonalContrast = () => {
    setIsTonalContrastOpen(!isTonalContrastOpen);
  };

  const handleGlamour = () => {
    setIsGlamourOpen(!isGlamourOpen);
  };

  const handleGrainyFilm = () => {
    setIsGrainyFilmOpen(!isGrainyFilmOpen);
  };

  const handleRetrolux = () => {
    setIsRetroluxOpen(!isRetroluxOpen);
  };

  const handleDrama = () => {
    setIsDramaOpen(!isDramaOpen);
  };

  const calculateImageStyle = () => {
    const img = new Image();
    img.src = currentImage;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const imgAspect = img.width / img.height;
    const windowAspect = windowWidth / windowHeight;

    let width, height, top, left;

    if (rotation % 180 === 0) {
      // Image is in normal orientation or upside down
      if (imgAspect > windowAspect) {
        // Image is wider than the window
        width = windowWidth;
        height = width / imgAspect;
      } else {
        // Image is taller than the window
        height = windowHeight;
        width = height * imgAspect;
      }
    } else {
      // Image is rotated 90 or 270 degrees
      if (imgAspect > windowAspect) {
        // Image is wider than the window
        height = windowWidth;
        width = height * imgAspect;
      } else {
        // Image is taller than the window
        width = windowHeight;
        height = width / imgAspect;
      }
    }

    top = (windowHeight - height) / 2;
    left = (windowWidth - width) / 2;

    return {
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
      transform: `rotate(${rotation}deg)`,
      position: "absolute",
    };
  };

  useEffect(() => {
    const imgStyle = calculateImageStyle();
    const imgElement = document.getElementById("imageFrame");
    Object.assign(imgElement.style, imgStyle);
  }, [currentImage, rotation]);

  return (
    <div className="bg-black h-screen flex flex-col relative">
      {!isTuning &&
        !isCropping &&
        !isBrushing &&
        !isSelective &&
        !isDetailsOpen &&
        !isCurvesOpen &&
        !showWhiteBalancesModal &&
        !isPerspectiveOpen &&
        !isGrainyFilmOpen &&
        !isRetroluxOpen && <HeaderDiv />}
      <div
        className={`flex-grow flex justify-center items-center relative ${
          isTuning ? "pb-48" : ""
        }`}
      >
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            id="imageFrame"
            src={currentImage}
            alt="Frame"
            className="object-contain"
            style={{
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
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
              <div className="bg-gray-800 bg-opacity-10 rounded-lg p-4 max-w-md mx-auto">
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
        !isCurvesOpen &&
        !showWhiteBalancesModal &&
        !isPerspectiveOpen &&
        !isGrainyFilmOpen &&
        !isRetroluxOpen && (
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
            onWhiteBalances={handleWhiteBalances}
            onPerspective={handlePerspective}
            onFullScreenOpen={handleFullScreenOpen}
            onHealing={handleHealing}
            onTonalContrast={handleTonalContrast}
            onGlamour={handleGlamour}
            onGrainyFilm={handleGrainyFilm}
            onRetrolux={handleRetrolux}
            onDrama={handleDrama}
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
      {showWhiteBalancesModal && (
        <WhiteBalancesModal
          image={currentImage}
          onClose={() => setShowWhiteBalancesModal(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setShowWhiteBalancesModal(false);
          }}
        />
      )}
      {isPerspectiveOpen && (
        <PerspectiveTool
          image={currentImage}
          onClose={() => setIsPerspectiveOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsPerspectiveOpen(false);
          }}
        />
      )}
      {isFullScreenOpen && (
        <FullScreenTool
          image={currentImage}
          onClose={() => setIsFullScreenOpen(false)}
        />
      )}
      {isHealing && (
        <HealingTool
          image={currentImage}
          onClose={() => setIsHealing(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsHealing(false);
          }}
        />
      )}
      {isTonalContrastOpen && (
        <TonalContrastTool
          image={currentImage}
          onClose={() => setIsTonalContrastOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsTonalContrastOpen(false);
          }}
        />
      )}
      {isGlamourOpen && (
        <GlamourTool
          image={currentImage}
          onClose={() => setIsGlamourOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsGlamourOpen(false);
          }}
        />
      )}{" "}
      {isGrainyFilmOpen && (
        <GrainyFilmTool
          image={currentImage}
          onClose={() => setIsGrainyFilmOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsGrainyFilmOpen(false);
          }}
        />
      )}
      {isRetroluxOpen && (
        <RetroluxTool
          image={currentImage}
          onClose={() => setIsRetroluxOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsRetroluxOpen(false);
          }}
        />
      )}
      {isDramaOpen && (
        <DramaTool
          image={currentImage}
          onClose={() => setIsDramaOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsDramaOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default BoardEdit;
