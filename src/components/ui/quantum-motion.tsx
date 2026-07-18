"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface QuantumRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function QuantumReveal({ children, className = "", delay = 0 }: QuantumRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`qwa-reveal ${visible ? "qwa-reveal--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function QuantumHeroViz({ className = "" }: { className?: string }) {
  return (
    <div className={`qwa-hero-viz ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <defs>
          <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
          <filter id="hero-glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="200" cy="200" r="160" className="qwa-hero-ring qwa-hero-ring--1" fill="none" stroke="url(#hero-grad)" strokeWidth="1" opacity="0.3" />
        <circle cx="200" cy="200" r="130" className="qwa-hero-ring qwa-hero-ring--2" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.2" />
        <g className="qwa-hero-orbit qwa-hero-orbit--a">
          <circle cx="200" cy="200" r="155" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="1" />
          <circle cx="355" cy="200" r="5" fill="#22d3ee" filter="url(#hero-glow)" />
        </g>
        <g className="qwa-hero-sphere">
          <circle cx="200" cy="200" r="72" fill="none" stroke="url(#hero-grad)" strokeWidth="2.5" opacity="0.7" filter="url(#hero-glow)" />
          <ellipse cx="200" cy="200" rx="36" ry="72" fill="none" stroke="rgba(100,116,139,0.4)" strokeWidth="1" />
          <circle cx="200" cy="128" r="6" fill="#22d3ee" />
          <circle cx="200" cy="272" r="6" fill="#a78bfa" />
          <line x1="200" y1="200" x2="268" y2="168" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" className="qwa-hero-vector" filter="url(#hero-glow)" />
          <circle cx="268" cy="168" r="8" fill="#22d3ee" className="qwa-hero-vector-tip" filter="url(#hero-glow)" />
          <circle cx="200" cy="200" r="5" fill="#f1f5f9" />
        </g>
      </svg>
      <span className="qwa-hero-chip qwa-hero-chip--1">Superposition</span>
      <span className="qwa-hero-chip qwa-hero-chip--2">Entanglement</span>
      <span className="qwa-hero-chip qwa-hero-chip--3">Interference</span>
    </div>
  );
}
