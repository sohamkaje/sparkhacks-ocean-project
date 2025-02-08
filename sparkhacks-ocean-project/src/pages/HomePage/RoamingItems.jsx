import React, { useState, useEffect } from "react";
import chips from "../../assets/chips.svg";
import plastic_bag from "../../assets/plastic-bag.svg";
import spoon from "../../assets/spoon.svg";
import blue_bottle from "../../assets/blue-bottle.svg";
import can from "../../assets/can.svg";
import glass from "../../assets/glass.svg";
import trash from "../../assets/trash.svg";
import banana from "../../assets/banana.svg"
import "./RoamingItems.css"; // External CSS file for styles

const RoamingItems = () => {
  const items = [
    { src: chips, alt: "Chips", speed: 5000, amplitude: 25 },
    { src: plastic_bag, alt: "Plastic Bag", speed: 7000, amplitude: 40 },
    { src: spoon, alt: "Spoon", speed: 6000, amplitude: 30 },
    { src: blue_bottle, alt: "Blue Bottle", speed: 9000, amplitude: 60 },
    { src: can, alt: "Can", speed: 8000, amplitude: 50 },
    { src: glass, alt: "Glass", speed: 7500, amplitude: 35 },
    { src: trash, alt: "Trash", speed: 9500, amplitude: 65 },
    { src: banana, alt: "Banana", speed: 9500, amplitude: 65 },
  ];

  const [positions, setPositions] = useState(
    items.map(() => ({
      top: Math.random() * 70 + 10, // Random start position
      left: Math.random() * 70 + 10,
      angle: Math.random() * 360, // Rotation
    }))
  );

  useEffect(() => {
    const moveItems = () => {
      setPositions((prevPositions) =>
        prevPositions.map((pos, index) => {
          const newAngle = pos.angle + Math.random() * 40 - 20; // Small rotation changes
          return {
            top: Math.max(5, Math.min(85, pos.top + Math.sin(newAngle) * items[index].amplitude)), // Smooth up/down motion
            left: Math.max(5, Math.min(85, pos.left + Math.cos(newAngle) * items[index].amplitude)), // Smooth left/right motion
            angle: newAngle,
          };
        })
      );
    };

    const interval = setInterval(moveItems, Math.random() * 3000 + 2000); // Vary movement speed per item

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {items.map((item, index) => (
        <img
          key={index}
          src={item.src}
          alt={item.alt}
          className="roaming-trash" // New class for styling
          style={{
            top: `${positions[index].top}%`,
            left: `${positions[index].left}%`,
            transform: `rotate(${positions[index].angle}deg)`,
          }}
        />
      ))}
    </>
  );
};

export default RoamingItems;
