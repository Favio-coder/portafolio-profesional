"use client";

import { useEffect, useState } from "react";

export default function AsciiPortrait() {
  const [portrait, setPortrait] = useState("Procesando fotografía…");
  useEffect(() => {
    let active = true;
    const image = new window.Image();
    image.onload = () => {
      if (!active) return;
      const canvas = document.createElement("canvas");
      const width = 60;
      const height = Math.round((image.height / image.width) * width * 0.48);
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) { setPortrait("Render ASCII no disponible."); return; }
      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      const { data } = context.getImageData(0, 0, width, height);
      const symbols = " .,:;=+*#%@";
      const lines = Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => {
        const offset = (y * width + x) * 4;
        const light = data[offset] * 0.2126 + data[offset + 1] * 0.7152 + data[offset + 2] * 0.0722;
        return symbols[Math.round(light / 255 * (symbols.length - 1))];
      }).join(""));
      setPortrait(lines.join("\n"));
    };
    image.onerror = () => { if (active) setPortrait("No se pudo cargar el retrato. Prueba whoami de nuevo."); };
    image.src = "/assets/images/FavioAsturimac.png";
    return () => { active = false; };
  }, []);
  return <pre role="img" aria-label="Retrato de Favio Asturimac dibujado con símbolos ASCII a partir de su fotografía" className="my-4 overflow-x-auto text-[7px] leading-[1.15] text-[#0ce642] sm:text-[10px]">{portrait}</pre>;
}
