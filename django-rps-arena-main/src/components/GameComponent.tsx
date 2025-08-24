import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { createPlayer, playGame, getPlayerGames, Player, Game } from '../lib/api';

const GameComponent = () => {
  const [playerName, setPlayerName] = useState('');
  const [player, setPlayer] = useState<Player | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Game | null>(null);

  // Load player from localStorage on component mount
  useEffect(() => {
    const savedPlayer = localStorage.getItem('rps_player');
    if (savedPlayer) {
      setPlayer(JSON.parse(savedPlayer));
    }
  }, []);

  // Load player's game history when player changes
  useEffect(() => {
    if (player?.id) {
      fetchGames();
    }
  }, [player]);

  const fetchGames = async () => {
    if (!player?.id) return;
    
    try {
      setLoading(true);
      const gameHistory = await getPlayerGames(player.id);
      setGames(gameHistory);
    } catch (err) {
      setError('Failed to load game history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    try {
      setLoading(true);
      setError('');
      const newPlayer = await createPlayer(playerName);
      setPlayer(newPlayer);
      localStorage.setItem('rps_player', JSON.stringify(newPlayer));
    } catch (err) {
      setError('Failed to create player');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = async (choice: 'rock' | 'paper' | 'scissors') => {
    if (!player?.id) return;

    try {
      setLoading(true);
      setError('');
      const gameResult = await playGame(player.id, choice);
      setResult(gameResult);
      await fetchGames(); // Refresh game history
    } catch (err) {
      setError('Failed to play game');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rps_player');
    setPlayer(null);
    setGames([]);
    setResult(null);
    setPlayerName('');
  };

  // Helper function to get result class for styling
  const getResultClass = (result: string) => {
    switch (result) {
      case 'win': return 'text-green-600 font-bold';
      case 'lose': return 'text-red-600 font-bold';
      default: return 'text-yellow-600 font-bold';
    }
  };

  // Helper function to get emoji for choice
  const getChoiceEmoji = (choice: string) => {
    switch (choice) {
      case 'rock': return '🪨';
      case 'paper': return '📄';
      case 'scissors': return '✂️';
      default: return '❓';
    }
  };

  if (!player) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Rock Paper Scissors Arena</CardTitle>
          <CardDescription>Enter your name to start playing</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreatePlayer}>
            <div className="flex flex-col space-y-4">
              <Input 
                placeholder="Your name" 
                value={playerName} 
                onChange={(e) => setPlayerName(e.target.value)} 
                required 
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Start Playing'}
              </Button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Rock Paper Scissors Arena</CardTitle>
            <div className="flex items-center gap-2">
              <span>Playing as: <strong>{player.name}</strong></span>
              <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-4">Choose your move</h2>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => handlePlay('rock')} 
                disabled={loading}
                className="text-2xl h-16 w-16"
              >
                🪨
              </Button>
              <Button 
                onClick={() => handlePlay('paper')} 
                disabled={loading}
                className="text-2xl h-16 w-16"
              >
                📄
              </Button>
              <Button 
                onClick={() => handlePlay('scissors')} 
                disabled={loading}
                className="text-2xl h-16 w-16"
              >
                ✂️
              </Button>
            </div>
          </div>

          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {result && (
            <Card className="mt-6 border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-center">Game Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center gap-8 text-center">
                  <div>
                    <p className="text-sm">You chose</p>
                    <p className="text-5xl my-2">{getChoiceEmoji(result.player_choice)}</p>
                    <p>{result.player_choice}</p>
                  </div>
                  <div className="text-2xl font-bold">VS</div>
                  <div>
                    <p className="text-sm">Computer chose</p>
                    <p className="text-5xl my-2">{getChoiceEmoji(result.computer_choice)}</p>
                    <p>{result.computer_choice}</p>
                  </div>
                </div>
                <p className="text-center mt-4 text-xl">
                  You <span className={getResultClass(result.result)}>{result.result.toUpperCase()}</span>!
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {games.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Game History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Game #</th>
                    <th className="text-left p-2">Your Choice</th>
                    <th className="text-left p-2">Computer Choice</th>
                    <th className="text-left p-2">Result</th>
                    <th className="text-left p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game, index) => (
                    <tr key={game.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{games.length - index}</td>
                      <td className="p-2">
                        <span className="mr-2">{getChoiceEmoji(game.player_choice)}</span>
                        {game.player_choice}
                      </td>
                      <td className="p-2">
                        <span className="mr-2">{getChoiceEmoji(game.computer_choice)}</span>
                        {game.computer_choice}
                      </td>
                      <td className="p-2">
                        <span className={getResultClass(game.result)}>{game.result}</span>
                      </td>
                      <td className="p-2 text-sm">
                        {new Date(game.created_at || '').toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GameComponent;