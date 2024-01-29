import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <LinearProgress
      color="success"
      value={progress}
      variant="determinate"
      className=" h-4 rounded-full mb-5"
    />
  );
};

export default ProgressBar;
