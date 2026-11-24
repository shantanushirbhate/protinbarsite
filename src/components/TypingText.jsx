
import React, { useEffect, useState } from "react";

const phrases = [
  "PURE PROTEIN.",
  "CLEAN INGREDIENTS.",
  "POWER EVERY BITE.",
  "FUEL YOUR FITNESS.",
];

export default function TypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    let speed = isDeleting ? 45 : 100;

    if (!isDeleting && text === currentPhrase) {
      speed = 1500;
    }

    if (isDeleting && text === "") {
      speed = 350;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (text === currentPhrase) {
          setIsDeleting(true);
        } else {
          setText(currentPhrase.substring(0, text.length + 1));
        }
      } else {
        if (text === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        } else {
          setText(currentPhrase.substring(0, text.length - 1));
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  return (
    <span className="typing-wrapper">
      <span className="typing-text">{text}</span>
      <span className="typing-cursor">|</span>
    </span>
  );
}
