import React, { useState, useEffect, useRef } from "react";

const DramaTool = ({ image, onClose, onApply }) => {
  const [strength, setStrength] = useState(50);
  const [saturation, setSaturation] = useState(50);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      applyDramaEffect(ctx, img);
    };
  }, [image, strength, saturation]);

  const applyDramaEffect = (ctx, img) => {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Apply strength (contrast)
      const factor = (259 * (strength + 255)) / (255 * (259 - strength));
      data[i] = factor * (data[i] - 128) + 128;
      data[i + 1] = factor * (data[i + 1] - 128) + 128;
      data[i + 2] = factor * (data[i + 2] - 128) + 128;

      // Apply saturation
      const gray = 0.2989 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = gray + (saturation / 50) * (data[i] - gray);
      data[i + 1] = gray + (saturation / 50) * (data[i + 1] - gray);
      data[i + 2] = gray + (saturation / 50) * (data[i + 2] - gray);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const handleApply = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    onApply(dataUrl);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col z-30">
      <div className="flex justify-between items-center p-4">
        <button onClick={onClose} className="text-white">
          Cancel
        </button>
        <h2 className="text-white text-xl">Drama</h2>
        <button onClick={handleApply} className="text-white">
          Apply
        </button>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label className="text-white block mb-2">Strength</label>
          <input
            type="range"
            min="0"
            max="100"
            value={strength}
            onChange={(e) => setStrength(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="text-white block mb-2">Saturation</label>
          <input
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={(e) => setSaturation(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DramaTool;
