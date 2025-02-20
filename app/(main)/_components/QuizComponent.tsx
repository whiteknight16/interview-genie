"use client";
import React from "react";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { useEffect } from "react";
import { toast } from "sonner";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import QuizResult from "./QuizResult";
function QuizComponent() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  // Show results if quiz is completed
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className="mx-2 dark:bg-gray-900 bg-white shadow-md dark:border-gray-700 border-gray-300 rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold dark:text-white text-gray-900">
            Ready to test your knowledge?
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">
            This quiz contains
            <span className="font-semibold"> 10 questions</span>
            specific to your industry and skills. Take your time and choose the
            best answer for each question.
          </p>
        </CardContent>

        <CardFooter>
          <Button
            onClick={generateQuizFn}
            className="w-full dark:bg-blue-600 bg-blue-500 text-white py-2 rounded-lg"
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card className="mx-2 dark:bg-gray-900 bg-white shadow-md dark:border-gray-700 border-gray-300 rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold dark:text-white text-gray-900">
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-lg font-medium dark:text-gray-200 text-gray-800">
          {question.question}
        </p>

        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label
                htmlFor={`option-${index}`}
                className="dark:text-gray-300 text-gray-800 cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-4 p-4 rounded-lg dark:bg-gray-800 bg-gray-100">
            <p className="font-medium dark:text-gray-200 text-gray-800">
              Explanation:
            </p>
            <p className="text-sm dark:text-gray-400 text-gray-600">
              {question.explanation}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
            className="dark:border-gray-600 border-gray-300 dark:text-gray-300 text-gray-800"
          >
            Show Explanation
          </Button>
        )}

        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto dark:bg-blue-600 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          {savingResult ? (
            <div className="flex items-center space-x-2">
              <BarLoader width={20} color="white" />
              <span>Saving...</span>
            </div>
          ) : currentQuestion < quizData.length - 1 ? (
            "Next Question"
          ) : (
            "Finish Quiz"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default QuizComponent;
