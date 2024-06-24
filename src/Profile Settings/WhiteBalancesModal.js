import React, { useState, useEffect, useRef } from "react";

const WhiteBalancesModal = ({ image, onClose, onApply }) => {
  const [temperature, setTemperature] = useState(5000);
  const [tint, setTint] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const updateCanvas = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.crossOrigin = "anonymous"; // Ensure cross-origin access
      img.src = image;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        applyWhiteBalanceAdjustments(ctx, img, temperature, tint);
      };
    };

    updateCanvas();
  }, [image, temperature, tint]);

  const applyWhiteBalanceAdjustments = (ctx, img, temperature, tint) => {
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // Apply temperature
      r = r * (1 + (temperature - 5000) / 5000);
      b = b * (1 - (temperature - 5000) / 5000);

      // Apply tint
      g = g * (1 + tint / 100);
      b = b * (1 - tint / 100);

      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const handleApply = () => {
    const canvas = canvasRef.current;
    onApply(canvas.toDataURL("image/png"));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-4 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <canvas ref={canvasRef} className="max-w-full max-h-80"></canvas>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-white block mb-2">Temperature</label>
            <input
              type="range"
              min="2000"
              max="8000"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-white block mb-2">Tint</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={tint}
              onChange={(e) => setTint(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhiteBalancesModal;
