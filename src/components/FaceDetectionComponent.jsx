"use client";

import React, { useState, useEffect } from "react";
import { detectAllFaces } from "@/utils/faceApiUtils";

export default function FaceDetectionComponent() {
  const [image, setImage] = useState(null);
  const [faces, setFaces] = useState([]);
  const [imageDims, setImageDims] = useState({ width: 0, height: 0 });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    const detections = await detectAllFaces(imageUrl);
    setFaces(detections);
  };

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight, width, height } = event.target;
    setImageDims({ naturalWidth, naturalHeight, width, height });
  };

  return (
    <section className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
      <div className="container">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <div className="relative mt-4 inline-block">
          <img
            src={image}
            alt="Uploaded"
            className="w-full max-w-md mx-auto"
            onLoad={handleImageLoad}
          />
          {faces.map((face, index) => {
            const { x, y, width, height } = face.box;
            const { score } = face;
            const scaleX = imageDims.width / imageDims.naturalWidth;
            const scaleY = imageDims.height / imageDims.naturalHeight;

            return (
              <div
                key={index}
                className="absolute border-2 border-red-500"
                style={{
                  top: `${y * scaleY}px`,
                  left: `${x * scaleX}px`,
                  width: `${width * scaleX}px`,
                  height: `${height * scaleY}px`,
                }}
              >
                <span
                  className="absolute text-white bg-red-500 text-xs px-1 rounded"
                  style={{ top: "-1.1rem", left: "0" }}
                >
                  {`Score: ${(score * 100).toFixed(2)}%`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
