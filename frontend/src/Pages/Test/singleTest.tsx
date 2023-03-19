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
      <span className="modalContainer">
        <span className="questionContainer">
          <h2>{question}</h2>
          <ul>
            {options.map((option, index) => (
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
            ))}
          </ul>
        </span>
        <span className="buttonsContainer">
          <button className="button-46" onClick={handleSubmit}>
            Отправить
          </button>
          <button className="button-46" onClick={closeModal}>
            Отменить
          </button>
        </span>
      </span>
    </Modal>
  );
};

export default PollModal;
