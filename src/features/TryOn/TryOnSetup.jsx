import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import interact from "interactjs";
import html2canvas from "html2canvas";
import Button from "../../components/ui/Button";

function TryOn({ frameImage }) {
  const webcamRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = overlayRef.current;

    interact(el).draggable({
      listeners: {
        move(event) {
          setPos((prev) => ({
            x: prev.x + event.dx,
            y: prev.y + event.dy,
          }));
        },
      },
    });
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;

    overlayRef.current.style.transform = `
      translate(${pos.x}px, ${pos.y}px)
      scale(${scale})
      rotate(${rotate}deg)
    `;
  }, [pos, scale, rotate]);

  useEffect(() => {
    setPos({ x: 0, y: 0 });
    setScale(1);
    setRotate(0);
  }, [frameImage]);

  const capture = async () => {
    const canvas = await html2canvas(containerRef.current);
    const link = document.createElement("a");
    link.download = "tryon.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const reset = () => {
    setPos({ x: 0, y: 0 });
    setScale(1);
    setRotate(0);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 gap-4">
      <div
        ref={containerRef}
        className="relative w-[320px] h-[420px] rounded-xl overflow-hidden bg-black"
      >
        <Webcam
          ref={webcamRef}
          mirrored
          audio={false}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <img
          ref={overlayRef}
          src={frameImage}
          alt="frame"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-44 cursor-move select-none"
          draggable={false}
        />
      </div>

      <div className="w-full max-w-xs space-y-3 text-white">
        <div>
          <p className="text-sm">Zoom</p>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.01"
            value={scale}
            onChange={(e) => setScale(+e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <p className="text-sm">Rotate</p>
          <input
            type="range"
            min="-30"
            max="30"
            step="1"
            value={rotate}
            onChange={(e) => setRotate(+e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={reset} variant="secondary" className="w-full">
            Reset
          </Button>
          <Button onClick={capture} className="w-full">
            Capture
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TryOn;
