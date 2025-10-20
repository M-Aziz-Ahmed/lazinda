"use client";

import React, { useEffect, useRef } from "react";

export default function OtpInput({ length = 6, value = "", onChange, inputClass = "w-12 h-12 text-center rounded-md border" }) {
  const inputsRef = useRef([]);

  useEffect(() => {
    // ensure refs length
    inputsRef.current = inputsRef.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    // if value length matches length, focus last
    if (value.length === length) {
      const last = inputsRef.current[length - 1];
      if (last) last.focus();
    }
  }, [value, length]);

  const handleChange = (idx, e) => {
    const ch = e.target.value.replace(/[^0-9]/g, "").slice(-1);
    const newVal = value.split("");
    newVal[idx] = ch || "";
    const joined = newVal.join("");
    onChange(joined);
    if (ch && idx < length - 1) {
      const next = inputsRef.current[idx + 1];
      if (next) next.focus();
    }
  };

  const handleKeyDown = (idx, e) => {
    const key = e.key;
    if (key === "Backspace") {
      if (value[idx]) {
        // clear this
        const newVal = value.split("");
        newVal[idx] = "";
        onChange(newVal.join(""));
      } else if (idx > 0) {
        const prev = inputsRef.current[idx - 1];
        if (prev) prev.focus();
        const newVal = value.split("");
        newVal[idx - 1] = "";
        onChange(newVal.join(""));
      }
    } else if (key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1].focus();
    } else if (key === "ArrowRight" && idx < length - 1) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "").slice(0, length);
    if (paste) onChange(paste);
  };

  const items = [];
  for (let i = 0; i < length; i++) {
    items.push(
      <input
        key={i}
        ref={(el) => (inputsRef.current[i] = el)}
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={1}
        className={inputClass}
        value={value[i] || ""}
        onChange={(e) => handleChange(i, e)}
        onKeyDown={(e) => handleKeyDown(i, e)}
        onPaste={handlePaste}
      />
    );
  }

  return <div className="flex gap-2">{items}</div>;
}
