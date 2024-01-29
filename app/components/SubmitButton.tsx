import React from "react";
import Button from "@mui/material/Button";

interface SubmitButtonProps {
  handleAnswerSubmit: () => void;
  open: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  handleAnswerSubmit,
  open,
}) => {
  return (
    <Button
      className="mt-5 bg-green-400 text-white h-16 w-64 focus:bg-green-400 focus:text-white hover:text-white hover:bg-green-400"
      onClick={handleAnswerSubmit}
      color="primary"
      disabled={open}
    >
      Potwierdź
    </Button>
  );
};

export default SubmitButton;
