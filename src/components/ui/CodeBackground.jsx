"use client";

const code = `
import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "Docker",
  "AWS",
  "Tailwind CSS",
  "Framer Motion",
  "Redis",
  "GraphQL",
  "Prisma",
  "Python",
  "Go",
];

export default function Portfolio() {
  return (
    <Developer
      name="David"
      role="Full Stack Engineer"
      passion="Building world-class digital products."
    />
  );
}

function buildAmazingThings(){
    console.log("Building...");
}

`;

export default function CodeBackground() {
  return (
    <>
      <style>{`
        .code-bg{
          position:absolute;
          inset:0;
          overflow:hidden;
          pointer-events:none;
          z-index:0;
        }

        /* Dark overlay */
        .code-bg::after{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle at top, rgba(79,142,247,.08), transparent 60%),
    rgba(11,13,18,.55);   /* lighter overlay */
  z-index:2;
}

        .code-wrapper{
          position:absolute;
          inset:0;
          overflow:hidden;
        }

        .code{
          position:absolute;
          top:0;
          left:0;
          right:0;

          color:#4F8EF7;
          opacity:.38;

          font-family:Consolas, Monaco, monospace;
          font-size:14px;
          line-height:1.9;

          padding:80px;

          white-space:pre;

          filter:blur(1px);

          animation:scrollCode 18s linear infinite;
        }

        @keyframes scrollCode{
          from{
            transform:translateY(0);
          }

          to{
            transform:translateY(-50%);
          }
        }

        .typing{
          display:inline-block;
          overflow:hidden;
          white-space:nowrap;
          border-right:2px solid #4F8EF7;

          animation:
            typing 6s steps(90,end) infinite,
            blink .7s step-end infinite;
        }

        @keyframes typing{
          0%{
            width:0;
          }

          90%{
            width:100%;
          }

          100%{
            width:100%;
          }
        }

        @keyframes blink{
          50%{
            border-color:transparent;
          }
        }
      `}</style>

      <div className="code-bg">
        <div className="code-wrapper">
          <pre className="code">
            <span className="typing">{code}</span>

{code}
{code}
{code}
{code}
{code}
{code}
{code}
{code}
{code}
{code}
          </pre>
        </div>
      </div>
    </>
  );
}