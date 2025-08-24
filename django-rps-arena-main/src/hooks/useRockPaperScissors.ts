import { useState, useCallback } from "react";
import { Choice } from "@/components/GameChoice";

export const useRockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [botChoice, setBotChoice] = useState<Choice | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [result, setResult] = useState<"win" | "lose" | "tie" | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const choices: Choice[] = ["rock", "paper", "scissors"];

  const getBotChoice = (): Choice => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineWinner = (player: Choice, bot: Choice): "win" | "lose" | "tie" => {
    if (player === bot) return "tie";
    
    const winConditions = {
      rock: "scissors",
      paper: "rock", 
      scissors: "paper"
    };
    
    return winConditions[player] === bot ? "win" : "lose";
  };

  const playRound = useCallback((playerChoice: Choice) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setPlayerChoice(playerChoice);
    setResult(null);
    setBotChoice(null);

    // Simulate bot thinking time
    setTimeout(() => {
      const botMove = getBotChoice();
      setBotChoice(botMove);
      
      const gameResult = determineWinner(playerChoice, botMove);
      setResult(gameResult);
      setRounds(prev => prev + 1);
      
      if (gameResult === "win") {
        setPlayerScore(prev => prev + 1);
      } else if (gameResult === "lose") {
        setBotScore(prev => prev + 1);
      }
      
      setIsPlaying(false);
    }, 1000);
  }, [isPlaying]);

  const resetGame = useCallback(() => {
    setPlayerChoice(null);
    setBotChoice(null);
    setPlayerScore(0);
    setBotScore(0);
    setRounds(0);
    setResult(null);
    setIsPlaying(false);
  }, []);

  return {
    playerChoice,
    botChoice,
    playerScore,
    botScore,
    rounds,
    result,
    isPlaying,
    playRound,
    resetGame
  };
};