import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Choice = "rock" | "paper" | "scissors";

interface GameChoiceProps {
  choice: Choice;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
  winner?: boolean;
}

const choiceEmojis = {
  rock: "🪨",
  paper: "📄", 
  scissors: "✂️"
};

const choiceNames = {
  rock: "Rock",
  paper: "Paper",
  scissors: "Scissors"
};

export const GameChoice = ({ choice, onClick, disabled, selected, winner }: GameChoiceProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "game-button h-32 w-32 flex-col text-white font-bold text-lg border-4",
        `choice-${choice}`,
        selected && "ring-4 ring-accent ring-offset-4 ring-offset-background",
        winner && "winner-glow",
        disabled && "opacity-75 cursor-not-allowed"
      )}
      variant="ghost"
    >
      <div className="text-4xl mb-2">{choiceEmojis[choice]}</div>
      <div>{choiceNames[choice]}</div>
    </Button>
  );
};