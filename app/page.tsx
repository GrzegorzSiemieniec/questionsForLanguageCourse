"use client";
import React from "react";
import ProgressBar from "./components/ProgressBar";
import Question from "./components/Questions";
import Options from "./components/Options";
import SubmitButton from "./components/SubmitButton";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import shuffleArray from "./shuffleArray";
import quizData from "./quizData.json";
import Button from "@mui/material/Button";

export default function Main() {
  const [progress, setProgress] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [nextLevel, setNextLevel] = React.useState(false);
  const [nextLevelAlert, setNextLevelAlert] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [questions, setQuestions] = React.useState(shuffleArray([...quizData]));
  const [resetKey, setResetKey] = React.useState(0);

  const handleOptionSelect = (option: any) => {
    if (!open) {
      setSelectedOption(option);
    }
  };

  const handleAnswerSubmit = () => {
    if (!open) {
      const currentQuestion = questions[currentQuestionIndex];
      increaseProgress();
      setOpen(true);
      setCurrentQuestionIndex((prevIndex) =>
        prevIndex < quizData.length - 1 ? prevIndex + 1 : 0
      );
      setResetKey((prevKey) => prevKey + 1);
    }
  };

  const increaseProgress = () => {
    setProgress((prevProgress) =>
      prevProgress >= 100 ? 0 : prevProgress + 10
    );
  };

  React.useEffect(() => {
    if (progress === 100) {
      setOpen(true);
      setNextLevel(true);
      setNextLevelAlert(true);
    }
  }, [progress]);

  const handleCloseAlert = () => {
    setOpen(false);
    setSelectedOption(null);
  };

  const handleCloseAlertNext = () => {
    setNextLevelAlert(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (!open && progress != 100) {
      switch (event.key) {
        case "1":
          handleOptionSelect(questions[currentQuestionIndex].answers[0]);
          break;
        case "2":
          handleOptionSelect(questions[currentQuestionIndex].answers[1]);
          break;
        case "3":
          handleOptionSelect(questions[currentQuestionIndex].answers[2]);
          break;
        case "Enter":
          handleAnswerSubmit();
          break;
        default:
          break;
      }
    }
    if (event.key === "Escape") {
      handleCloseAlert();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [open, currentQuestionIndex, questions]);

  return (
    <main key={resetKey} className="flex justify-center items-center h-screen">
      <div className="proggresBar p-10 bg-gray-200 rounded-md shadow-md">
        <Collapse in={nextLevelAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleCloseAlertNext}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            "Brawo udało ci się ukończyć etap! Przejdź dalej."
          </Alert>
        </Collapse>

        <ProgressBar progress={progress} />

        <Question question={questions[currentQuestionIndex].question} />

        <Options
          options={questions[currentQuestionIndex].answers}
          selectedOption={selectedOption}
          handleOptionSelect={handleOptionSelect}
          open={open}
        />

        <Collapse in={nextLevel}>
          <div className="flex justify-center mt-5 space-x-4">
            <Button
              variant="outlined"
              onClick={() => {
                setNextLevel(false);
                setProgress(0);
                setNextLevelAlert(false);
              }}
              color="success"
            >
              Przejdź dalej
            </Button>
            <Button variant="outlined" onClick={() => {}} color="error">
              Wyjdź
            </Button>
          </div>
        </Collapse>

        <SubmitButton handleAnswerSubmit={handleAnswerSubmit} open={open} />

        <Collapse in={open}>
          <Alert
            severity={
              selectedOption && selectedOption.isCorrect ? "success" : "error"
            }
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleCloseAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mt: 2 }}
          >
            {selectedOption && selectedOption.isCorrect
              ? "Brawo udało ci się poprawnie odpowiedzieć!"
              : "Niestety, odpowiedź jest nieprawidłowa. Spróbuj ponownie."}
          </Alert>
        </Collapse>
      </div>
    </main>
  );
}
