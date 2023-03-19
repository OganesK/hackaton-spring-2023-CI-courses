import React, { useState } from "react";
import Modal from "react-modal";

type Option = {
  id: number;
  text: string;
};

type Props = {
  isOpen: boolean;
  question: string;
  options: Option[];
  onClose: () => void;
  onSubmit: (optionId: number) => void;
};

const PollModal: React.FC<Props> = ({
  isOpen,
  question,
  options,
  onClose,
  onSubmit,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(
    null
  );

  const handleSubmit = () => {
    if (selectedOptionId !== null) {
      onSubmit(selectedOptionId);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
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
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default PollModal;
