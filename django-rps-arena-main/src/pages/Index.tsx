import { GameChoice, Choice } from "@/components/GameChoice";
import { ScoreBoard } from "@/components/ScoreBoard";
import { GameResult } from "@/components/GameResult";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRockPaperScissors } from "@/hooks/useRockPaperScissors";
import { RotateCcw } from "lucide-react";
import GameComponent from "@/components/GameComponent";

const Index = () => {
  const {
    playerChoice,
    botChoice,
    playerScore,
    botScore,
    rounds,
    result,
    isPlaying,
    playRound,
    resetGame
  } = useRockPaperScissors();

  const choices: Choice[] = ["rock", "paper", "scissors"];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Rock Paper Scissors
          </h1>
          <p className="text-xl text-muted-foreground">
            Challenge the Bot in this Classic Game!
          </p>
        </div>

        {/* Game Component */}
        <GameComponent />
      </div>
    </div>
  );
};

export default Index;
