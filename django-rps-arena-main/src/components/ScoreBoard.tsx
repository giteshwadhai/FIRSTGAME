import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoreBoardProps {
  playerScore: number;
  botScore: number;
  rounds: number;
}

export const ScoreBoard = ({ playerScore, botScore, rounds }: ScoreBoardProps) => {
  return (
    <Card className="game-card">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-primary">Score Board</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="text-lg font-semibold text-accent">You</div>
            <div className="text-3xl font-bold text-accent">{playerScore}</div>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold text-muted-foreground">Rounds</div>
            <div className="text-3xl font-bold text-primary">{rounds}</div>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold text-destructive">Bot</div>
            <div className="text-3xl font-bold text-destructive">{botScore}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};