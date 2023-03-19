import React, { useState } from "react";
import Modal from "react-modal";
import "./modalStyles.css";

type Task = {
  question: string,
  answers: string[],
  rightAnswer: string
};

type Props = {
  isOpen: boolean;
  tasks:Task[]
  closeModal: any;
  onSubmit: any;
};

const PollModal: React.FC<Props> = ({
  isOpen,
  tasks,
  closeModal,
  onSubmit,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  const handleSubmit = () => {

    window.location.reload();

  };

  return (
    
    <Modal
      isOpen={isOpen}
      className="Modal"
      onRequestClose={closeModal}
      overlayClassName="Overlay"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={true}
    >
      { tasks?.map((task)=>(

<span className="modalContainer">
<span className="questionContainer">
  <h2>{task.question}</h2>
    {task.answers.map((option, index) => (
  <ul>
      <li key={index}>
        <input
          type="radio"
          id={`option-${index}`}
          name="options"
          value={index}
          checked={index === selectedOptionId}
          onChange={() => setSelectedOptionId(index)}
        />
        <label htmlFor={`option-${index}`}>{option}</label>
      </li>
  </ul>
    ))}
</span>

</span>
      ))}
<span className="buttonsContainer">
  <button className="button-46" onClick={handleSubmit}>
    Отправить
  </button>
  <button className="button-46" onClick={closeModal}>
    Отменить
  </button>
</span>
    
    </Modal>
  );
};

export default PollModal;
