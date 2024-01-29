import React from "react";
import Button from "@mui/material/Button";

interface OptionsProps {
  options: any[];
  selectedOption: any;
  handleOptionSelect: (option: any) => void;
  open: boolean;
}

const Options: React.FC<OptionsProps> = ({
  options,
  selectedOption,
  handleOptionSelect,
  open,
}) => {
  return (
    <div className="flex justify-center items-center h-[300px]">
      {options.map((option: any, index: any) => (
        <Button
          className={`mr-3 w-[200px] h-[120px] hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white ${
            selectedOption && selectedOption.text === option.text
              ? "bg-blue-500 text-white"
              : "border-gray-400"
          }`}
          key={index}
          variant="outlined"
          color="primary"
          onClick={() => handleOptionSelect(option)}
          disabled={open}
        >
          {option.text}
        </Button>
      ))}
    </div>
  );
};

export default Options;
