"use client";

import { useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

export default function MockInterviewer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    async function setupCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = stream;

      await new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => resolve();
      });

      videoRef.current.play();
    }

    async function loadModel() {
      await tf.ready();

      const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      );

      detectFaces(model);
    }

    async function detectFaces(model) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      async function loop() {
        const predictions = await model.estimateFaces({
          input: videoRef.current,
        });

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (predictions.length > 0) {
          predictions.forEach((face) => {
            const keypoints = face.scaledMesh;

            // draw points
            ctx.fillStyle = "red";
            keypoints.forEach(([x, y]) => {
              ctx.beginPath();
              ctx.arc(x, y, 2, 0, 2 * Math.PI);
              ctx.fill();
            });
          });
        }

        requestAnimationFrame(loop);
      }

      loop();
    }

    setupCamera();
    loadModel();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-lg rounded-lg"
        style={{ transform: "scaleX(-1)" }} // mirror camera
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 w-full max-w-lg rounded-lg"
        style={{ transform: "scaleX(-1)" }}
      />
    </div>
  );
}
