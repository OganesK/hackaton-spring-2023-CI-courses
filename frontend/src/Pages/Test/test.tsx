import React, { useState } from "react";
import PollModal from "./singleTest";

type Option = {
  id: number;
  text: string;
};

const options: Option[] = [
  { id: 1, text: "Option 1" },
  { id: 2, text: "Option 2" },
  { id: 3, text: "Option 3" },
];


interface TestProps {
  open: boolean
  setOpen: () => void
}


const Test: React.FC<TestProps> = ({open, setOpen}) => {

  const handlePollSubmit = (optionId: number) => {
    console.log(`User selected option ${optionId}`);
    setOpen(false);
  };

  return (
    <div>
      <PollModal
        isOpen={open}
        question="What is your favorite color?"
        options={options}
        onSubmit={handlePollSubmit}
        onClose={() => setOpen(false)}
        />
    </div>
  )
}

export default Test;
