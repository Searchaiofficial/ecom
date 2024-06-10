"use client"
import React, { useState } from "react";

const QuestionAnswer = ({ question, answer }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="p-1">
      <hr />
      <div className="flex mt-[30px] p-5 cursor-pointer" onClick={() => setShow(!show)}>
        <h3 className="font-semibold text-lg">{question}</h3>
        {show ? <img src="/icons/uparrow.svg" alt="Up Arrow" className="ml-auto mt-1 w-4 h-4 text-gray-600" /> : <img src="/icons/downarrow.svg" alt="Down Arrow" className="ml-auto mt-1 w-4 h-4 text-gray-600" />}
      </div>
      {show && <p className="p-6 text-base font-normal leading-7 text-gray-800">{answer}</p>}
    </div>
  );
};

export default QuestionAnswer;
