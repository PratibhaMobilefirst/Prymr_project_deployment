import React, { useState, useRef, useEffect } from "react";

const CropTool = ({ image, onClose, onCrop }) => {
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");
  const imageRef = useRef(null);
  const cropRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setCropArea({
        x: width * 0.1,
        y: height * 0.1,
        width: width * 0.8,
        height: height * 0.8,
      });
    }
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    startDragging(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startDragging(touch.clientX, touch.clientY);
  };

  const startDragging = (clientX, clientY) => {
    const { left, top } = cropRef.current.getBoundingClientRect();
    setIsDragging(true);
    setDragStart({ x: clientX - left, y: clientY - top });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleDragging(e.clientX, e.clientY);
    } else if (isResizing) {
      handleResizing(e.clientX, e.clientY);
    }
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (isDragging) {
      handleDragging(touch.clientX, touch.clientY);
    } else if (isResizing) {
      handleResizing(touch.clientX, touch.clientY);
    }
  };

  const handleDragging = (clientX, clientY) => {
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    let newX = clientX - left - dragStart.x;
    let newY = clientY - top - dragStart.y;

    newX = Math.max(0, Math.min(newX, width - cropArea.width));
    newY = Math.max(0, Math.min(newY, height - cropArea.height));

    setCropArea((prev) => ({ ...prev, x: newX, y: newY }));
  };

  const handleResizing = (clientX, clientY) => {
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();

    let newWidth = cropArea.width;
    let newHeight = cropArea.height;
    let newX = cropArea.x;
    let newY = cropArea.y;

    if (resizeDirection.includes("right")) {
      newWidth = Math.max(
        0,
        Math.min(clientX - left - cropArea.x, width - cropArea.x)
      );
    }
    if (resizeDirection.includes("bottom")) {
      newHeight = Math.max(
        0,
        Math.min(clientY - top - cropArea.y, height - cropArea.y)
      );
    }
    if (resizeDirection.includes("left")) {
      newWidth = Math.max(0, cropArea.width + cropArea.x - (clientX - left));
      newX = Math.max(0, Math.min(clientX - left, cropArea.x + cropArea.width));
    }
    if (resizeDirection.includes("top")) {
      newHeight = Math.max(0, cropArea.height + cropArea.y - (clientY - top));
      newY = Math.max(0, Math.min(clientY - top, cropArea.y + cropArea.height));
    }

    setCropArea((prev) => ({
      ...prev,
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleCrop = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = cropArea.width * scaleX;
    canvas.height = cropArea.height * scaleY;

    ctx.drawImage(
      img,
      cropArea.x * scaleX,
      cropArea.y * scaleY,
      cropArea.width * scaleX,
      cropArea.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob((blob) => {
      onCrop(URL.createObjectURL(blob));
      onClose();
    }, "image/jpeg");
  };

  const handleResizeMouseDown = (e, direction) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  const handleResizeTouchStart = (e, direction) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  return (
    <div
      className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative">
        <img
          ref={imageRef}
          src={image}
          alt="To crop"
          className="max-h-[90vh] max-w-[90vw]"
          onTouchStart={(e) => e.preventDefault()} // Prevent default to stop image dragging on mobile
        />
        <div
          ref={cropRef}
          className="absolute border-2 border-white"
          style={{
            left: `${cropArea.x}px`,
            top: `${cropArea.y}px`,
            width: `${cropArea.width}px`,
            height: `${cropArea.height}px`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div
            className="absolute top-0 left-0 w-2 h-2 bg-white cursor-nw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "top-left")}
            onTouchStart={(e) => handleResizeTouchStart(e, "top-left")}
            style={{ transform: "translate(-50%, -50%)" }}
          ></div>
          <div
            className="absolute top-0 right-0 w-2 h-2 bg-white cursor-ne-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "top-right")}
            onTouchStart={(e) => handleResizeTouchStart(e, "top-right")}
            style={{ transform: "translate(50%, -50%)" }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-2 h-2 bg-white cursor-sw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom-left")}
            onTouchStart={(e) => handleResizeTouchStart(e, "bottom-left")}
            style={{ transform: "translate(-50%, 50%)" }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-2 h-2 bg-white cursor-se-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom-right")}
            onTouchStart={(e) => handleResizeTouchStart(e, "bottom-right")}
            style={{ transform: "translate(50%, 50%)" }}
          ></div>
          <div
            className="absolute top-0 left-1/2 w-2 h-2 bg-white cursor-n-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "top")}
            onTouchStart={(e) => handleResizeTouchStart(e, "top")}
            style={{ transform: "translate(-50%, -50%)" }}
          ></div>
          <div
            className="absolute bottom-0 left-1/2 w-2 h-2 bg-white cursor-s-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom")}
            onTouchStart={(e) => handleResizeTouchStart(e, "bottom")}
            style={{ transform: "translate(-50%, 50%)" }}
          ></div>
          <div
            className="absolute top-1/2 left-0 w-2 h-2 bg-white cursor-w-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "left")}
            onTouchStart={(e) => handleResizeTouchStart(e, "left")}
            style={{ transform: "translate(-50%, -50%)" }}
          ></div>
          <div
            className="absolute top-1/2 right-0 w-2 h-2 bg-white cursor-e-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "right")}
            onTouchStart={(e) => handleResizeTouchStart(e, "right")}
            style={{ transform: "translate(50%, -50%)" }}
          ></div>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-4">
        <button
          className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg"
          onClick={handleCrop}
        >
          Crop
        </button>
      </div>
    </div>
  );
};

export default CropTool;
