import React from "react";
import Typography from "@mui/material/Typography";

interface QuestionProps {
  question: string;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <Typography variant="h5" gutterBottom className="mb-5 text-center">
      {question}
    </Typography>
  );
};

export default Question;
