import React, { useState, useEffect } from "react";
import PollModal from "./singleTest";
import { useQuery } from "@apollo/client";
import { GetTasksQuery } from "../Poll/graphql/query";
type Option = {
  id: number;
  text: string;
};
``;
const options: Option[] = [
  { id: 1, text: "Option 1" },
  { id: 2, text: "Option 2" },
  { id: 3, text: "Option 3" },
];

interface TestProps {
  open: boolean;
  closeModal: any;
}

const Test: React.FC<TestProps> = ({ open, closeModal }) => {
  const [tasks, setTasks] = useState([]);

  console.log(open, closeModal);

  const { loading, error, data } = useQuery(GetTasksQuery);

  console.log(data);

  const handlePollSubmit = (optionId: number) => {
    console.log(`User selected option ${optionId}`);
    closeModal;
  };

  return (
    <div>
      <PollModal
        isOpen={open}
        question="What is your favorite?"
        options={options}
        onSubmit={handlePollSubmit}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Test;
