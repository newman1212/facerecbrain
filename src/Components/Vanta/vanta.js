import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

const VantaBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = NET({
      el: vantaRef.current,
      THREE, // Pass the THREE instance
      color: 0xc0355d, // Customize colors
      backgroundColor: 0x211b21,
      points: 15.0,
      maxDistance: 20.0,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy(); // Clean up on component unmount
    };
  }, []);

  return <div ref={vantaRef} style={{ height: "100vh", width: "100vw" }} />;
};

export default VantaBackground;
