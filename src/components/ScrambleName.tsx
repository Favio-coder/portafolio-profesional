"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const name = "FAVIO ASTURIMAC";
const symbols = "0123456789#$%&*+/<>";

export default function ScrambleName({ active }: { active: boolean }) {
  const [display, setDisplay] = useState(name);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !active) return;

    let frame: ReturnType<typeof setInterval> | undefined;
    const scramble = () => {
      clearInterval(frame);
      const started = performance.now();
      frame = setInterval(() => {
        const progress = (performance.now() - started) / 1000;
        if (progress >= 1) {
          setDisplay(name);
          clearInterval(frame);
          return;
        }
        setDisplay(
          Array.from(name, (letter, index) =>
            letter === " " || index / name.length < (progress - 0.15) / 0.85
              ? letter
              : symbols[Math.floor(Math.random() * symbols.length)],
          ).join(""),
        );
      }, 65);
    };

    const entrance = setTimeout(scramble, 900);
    const repeat = setInterval(scramble, 7000);
    return () => {
      clearTimeout(entrance);
      clearInterval(repeat);
      clearInterval(frame);
    };
  }, [active, reduced]);

  const text = reduced || !active ? name : display;

  return (
    <>
      <span className="sr-only">Favio Asturimac</span>
      <span aria-hidden="true">
        {name.split(" ").map((word, wordIndex) => (
          <span key={word} className={`block whitespace-nowrap ${wordIndex === 1 ? "text-muted-foreground" : ""}`}>
            {Array.from(word, (letter, index) => {
              const character = text[index + (wordIndex === 1 ? 6 : 0)];
              return (
                <span key={index} className="relative inline-block">
                  {/* Reserve each letter's width so decoding never shifts the layout. */}
                  <span className="invisible">{letter}</span>
                  <span className={`absolute inset-0 text-center ${character !== letter ? "text-primary" : ""}`}>
                    {character}
                  </span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </>
  );
}
