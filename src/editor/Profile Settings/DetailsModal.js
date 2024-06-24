import React, { useState, useEffect, useRef } from "react";

const DetailsModal = ({ image, onClose, onApply }) => {
  const [sharpness, setSharpness] = useState(0);
  const [structure, setStructure] = useState(0);
  const [noiseReduction, setNoiseReduction] = useState(0);
  const [vignette, setVignette] = useState(0);
  const [previewImage, setPreviewImage] = useState(image);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = previewImage;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, [previewImage]);

  useEffect(() => {
    const updatePreviewImage = async () => {
      const updatedImageDataUrl = await applyDetailAdjustments(
        image,
        sharpness,
        structure,
        noiseReduction,
        vignette
      );
      setPreviewImage(updatedImageDataUrl);
    };

    updatePreviewImage();
  }, [image, sharpness, structure, noiseReduction, vignette]);

  const applyDetailAdjustments = (
    imageUrl,
    sharpness,
    structure,
    noiseReduction,
    vignette
  ) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Ensure cross-origin access
      img.src = imageUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        // Draw the original image on the canvas
        ctx.drawImage(img, 0, 0);

        // Apply sharpness using a simple convolution filter
        if (sharpness !== 0) {
          ctx.filter = `blur(${sharpness < 0 ? Math.abs(sharpness) : 0}px)`;
          ctx.drawImage(canvas, 0, 0);
          if (sharpness > 0) {
            const sharpenFilter = [0, -1, 0, -1, 5, -1, 0, -1, 0];
            applyConvolutionFilter(ctx, img, sharpenFilter);
          }
        }

        // Apply structure (contrast and brightness)
        if (structure !== 0) {
          ctx.filter = `contrast(${100 + structure}%) brightness(${
            100 + structure * 0.5
          }%)`;
          ctx.drawImage(canvas, 0, 0);
        }

        // Apply noise reduction
        if (noiseReduction !== 0) {
          ctx.filter = `blur(${noiseReduction * 0.1}px)`;
          ctx.drawImage(canvas, 0, 0);
        }

        // Apply vignette
        if (vignette !== 0) {
          const vignetteValue = vignette / 100;
          const vignetteRadius =
            (Math.min(img.width, img.height) / 2) *
            (1 - Math.abs(vignetteValue));
          const centerX = img.width / 2;
          const centerY = img.height / 2;
          const gradient = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            vignetteRadius
          );
          gradient.addColorStop(
            0,
            `rgba(0, 0, 0, ${1 - Math.abs(vignetteValue)})`
          );
          gradient.addColorStop(1, `rgba(0, 0, 0, ${Math.abs(vignetteValue)})`);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, img.width, img.height);
        }

        const updatedImageDataUrl = canvas.toDataURL("image/png");
        resolve(updatedImageDataUrl);
      };
    });
  };

  const applyConvolutionFilter = (ctx, img, filter) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const tempCtx = canvas.getContext("2d");
    tempCtx.drawImage(img, 0, 0);

    const imageData = tempCtx.getImageData(0, 0, img.width, img.height);
    const pixels = imageData.data;
    const side = Math.round(Math.sqrt(filter.length));
    const halfSide = Math.floor(side / 2);
    const src = tempCtx.getImageData(0, 0, img.width, img.height).data;
    const canvasWidth = img.width;
    const canvasHeight = img.height;

    for (let y = 0; y < canvasHeight; y++) {
      for (let x = 0; x < canvasWidth; x++) {
        const dstOff = (y * canvasWidth + x) * 4;
        let r = 0,
          g = 0,
          b = 0;

        for (let cy = 0; cy < side; cy++) {
          for (let cx = 0; cx < side; cx++) {
            const scy = y + cy - halfSide;
            const scx = x + cx - halfSide;
            if (
              scy >= 0 &&
              scy < canvasHeight &&
              scx >= 0 &&
              scx < canvasWidth
            ) {
              const srcOff = (scy * canvasWidth + scx) * 4;
              const wt = filter[cy * side + cx];
              r += src[srcOff] * wt;
              g += src[srcOff + 1] * wt;
              b += src[srcOff + 2] * wt;
            }
          }
        }
        pixels[dstOff] = r;
        pixels[dstOff + 1] = g;
        pixels[dstOff + 2] = b;
      }
    }

    tempCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(canvas, 0, 0);
  };

  const handleApply = () => {
    onApply(previewImage);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-4 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <canvas ref={canvasRef} className="max-w-full max-h-80"></canvas>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-white block mb-2">Sharpness</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={sharpness}
              onChange={(e) => setSharpness(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-white block mb-2">Structure</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={structure}
              onChange={(e) => setStructure(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-white block mb-2">Noise Reduction</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={noiseReduction}
              onChange={(e) => setNoiseReduction(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-white block mb-2">Vignette</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={vignette}
              onChange={(e) => setVignette(parseInt(e.target.value))}
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

export default DetailsModal;
