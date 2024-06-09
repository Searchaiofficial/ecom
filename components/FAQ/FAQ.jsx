"use client"
import React from "react";
import { FAQs } from "./FAQData";
import dynamic from "next/dynamic";
const QuestionAnswer = dynamic(()=>import('./QuestionAnswer'))

const FAQ = () => {
  return (
    <div>
        {FAQs.map((curElement) => {
          return <QuestionAnswer key={curElement.id} {...curElement} />;
        })}
    </div>
  );
};

export default FAQ;
