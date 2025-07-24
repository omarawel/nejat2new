
"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Award, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QuizQuestion } from '@/ai/flows/generate-quiz-types';

interface QuizSessionProps {
    quizTitle: string;
    questions: QuizQuestion[];
    onFinish: () => void;
    backButtonText: string;
}

export function QuizSession({ quizTitle, questions, onFinish, backButtonText }: QuizSessionProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const isAnswered = selectedAnswer !== null;
    const isFinished = currentQuestionIndex === questions.length;

    const handleAnswerSelect = (answer: string) => {
        if (isAnswered) return;

        setSelectedAnswer(answer);
        if (answer === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }
        setShowResult(true);
    };

    const handleNextQuestion = () => {
        setShowResult(false);
        setSelectedAnswer(null);
        setCurrentQuestionIndex(prev => prev + 1);
    };

    if (isFinished) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <Card className="text-center">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                            <Award className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle className="text-3xl">Quiz abgeschlossen!</CardTitle>
                        <CardDescription>"{quizTitle}"</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">
                            {score} / {questions.length}
                        </p>
                        <p className="text-muted-foreground">Richtige Antworten</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={onFinish}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {backButtonText}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
             <Button variant="ghost" onClick={onFinish} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backButtonText}
            </Button>
            <Card>
                <CardHeader>
                    <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="mb-4" />
                    <CardTitle>{quizTitle}</CardTitle>
                    <CardDescription>Frage {currentQuestionIndex + 1} von {questions.length}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-semibold mb-6">{currentQuestion.question}</p>
                    <div className="space-y-3">
                        {currentQuestion.options.map(option => {
                            const isCorrect = option === currentQuestion.correctAnswer;
                            const isSelected = option === selectedAnswer;

                            return (
                                <Button
                                    key={option}
                                    className="w-full justify-start h-auto py-3"
                                    variant="outline"
                                    onClick={() => handleAnswerSelect(option)}
                                    disabled={isAnswered}
                                >
                                    <div className="flex items-center w-full">
                                         <span className="flex-grow text-left whitespace-normal">{option}</span>
                                         {showResult && isSelected && (isCorrect ? <CheckCircle className="h-5 w-5 text-green-500 ml-4" /> : <XCircle className="h-5 w-5 text-destructive ml-4" />)}
                                         {showResult && !isSelected && isCorrect && <CheckCircle className="h-5 w-5 text-green-500 ml-4" />}
                                    </div>
                                </Button>
                            );
                        })}
                    </div>
                </CardContent>
                <CardFooter>
                     {isAnswered && (
                        <Button className="w-full" onClick={handleNextQuestion}>
                           {currentQuestionIndex === questions.length - 1 ? 'Ergebnisse anzeigen' : 'Nächste Frage'}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

