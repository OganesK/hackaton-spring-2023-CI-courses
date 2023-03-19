// import React, { useState } from "react";
// import PollModal from "../../Pages/SingleTest/singleTest";

// type Option = {
//   id: number;
//   text: string;
// };

// const options: Option[] = [
//   { id: 1, text: "Option 1" },
//   { id: 2, text: "Option 2" },
//   { id: 3, text: "Option 3" },
// ];

// const Test: React.FC = () => {
//   const [isPollModalOpen, setIsPollModalOpen] = useState(false);

//   const handlePollSubmit = (optionId: number) => {
//     console.log(`User selected option ${optionId}`);
//     setIsPollModalOpen(false);
//   };

//   return (
//     <div onLoad= {() => setIsPollModalOpen(true)}>
//       {/* <button onClick={() =>setIsPollModalOpen (true)}>Начать тестирование</button> */}
//       <PollModal
//         isOpen={isPollModalOpen}
//         question="What is your favorite color?"
//         options={options}
//         onSubmit={handlePollSubmit}
//         onClose={() => setIsPollModalOpen(!isPollModalOpen)}
//         />
//     </div>
//   )
// }

// export default Test;
