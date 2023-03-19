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
  console.log(open, closeModal);

  const { loading, error, data } = useQuery(GetTasksQuery);

  const [taskData, setTaskData] = useState([])

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(data);
  console.log(data.tests);
  const tests = data.tests

  const handlePollSubmit = (optionId: number) => {
    console.log(`User selected option ${optionId}`);
    window.location.reload();
  };
  
  return (
    <>

    {data.tests?.map((test) => (
      

        <div>
                  
        <PollModal
          isOpen={open}
          tasks = {test.tasks}
          onSubmit={handlePollSubmit}
          closeModal={closeModal}
        />
      </div>
    
   ))
  }
</>
    
  );
};

export default Test;
