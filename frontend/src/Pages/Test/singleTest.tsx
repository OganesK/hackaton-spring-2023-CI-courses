import React, { useState } from "react";
import Modal from "react-modal";
import "./modalStyles.css";

type Option = {
  id: number;
  text: string;
};

type Props = {
  isOpen: boolean;
  question: string;
  options: Option[];
  closeModal: any;
  onSubmit: any;
};

const PollModal: React.FC<Props> = ({
  isOpen,
  question,
  options,
  closeModal,
  onSubmit,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedOptionId !== null) {
      closeModal(selectedOptionId);
    }
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
      <span className="modalContainer">
        <span className="questionContainer">
          <h2>{question}</h2>
          <ul>
            {options.map((option) => (
              <li key={option.id}>
                <input
                  type="radio"
                  id={`option-${option.id}`}
                  name="options"
                  value={option.id}
                  checked={option.id === selectedOptionId}
                  onChange={() => setSelectedOptionId(option.id)}
                />
                <label htmlFor={`option-${option.id}`}>{option.text}</label>
              </li>
            ))}
          </ul>
        </span>
        <span className="buttonsContainer">
          <button className="button-46" onClick={handleSubmit}>
            Submit
          </button>
          <button className="button-46" onClick={closeModal}>
            Cancel
          </button>
        </span>
      </span>
    </Modal>
  );
};

export default PollModal;
