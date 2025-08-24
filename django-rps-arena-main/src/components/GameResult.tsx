import { Card, CardContent } from "@/components/ui/card";
import { GameChoice, Choice } from "./GameChoice";
import { cn } from "@/lib/utils";

interface GameResultProps {
  playerChoice: Choice | null;
  botChoice: Choice | null;
  result: "win" | "lose" | "tie" | null;
  isPlaying: boolean;
}

const resultMessages = {
  win: "🎉 You Win!",
  lose: "🤖 Bot Wins!",
  tie: "🤝 It's a Tie!",
};

const resultColors = {
  win: "text-accent",
  lose: "text-destructive", 
  tie: "text-primary",
};

export const GameResult = ({ playerChoice, botChoice, result, isPlaying }: GameResultProps) => {
  if (!playerChoice || !botChoice) {
    return (
      <Card className="game-card">
        <CardContent className="p-8">
          <div className="text-center text-2xl font-bold text-muted-foreground">
            {isPlaying ? "🤔 Bot is thinking..." : "Choose your move!"}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="game-card">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-center space-y-2">
              <div className="text-lg font-semibold text-accent">You</div>
              <div className="bounce-in">
                <GameChoice
                  choice={playerChoice}
                  onClick={() => {}}
                  disabled
                  winner={result === "win"}
                />
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl">⚡</div>
              <div className="text-sm text-muted-foreground">VS</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-lg font-semibold text-destructive">Bot</div>
              <div className="bounce-in">
                <GameChoice
                  choice={botChoice}
                  onClick={() => {}}
                  disabled
                  winner={result === "lose"}
                />
              </div>
            </div>
          </div>
          
          {result && (
            <div className={cn(
              "text-center text-3xl font-bold bounce-in",
              resultColors[result]
            )}>
              {resultMessages[result]}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};