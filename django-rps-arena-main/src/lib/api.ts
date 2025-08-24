// API service for connecting to Django backend

const API_URL = 'http://localhost:8000/api';

export interface Player {
  id?: number;
  name: string;
  created_at?: string;
}

export interface Game {
  id?: number;
  player: number;
  player_name?: string;
  player_choice: 'rock' | 'paper' | 'scissors';
  computer_choice: 'rock' | 'paper' | 'scissors';
  result: 'win' | 'lose' | 'draw';
  created_at?: string;
}

// Player API calls
export const createPlayer = async (name: string): Promise<Player> => {
  const response = await fetch(`${API_URL}/players/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create player');
  }
  
  return response.json();
};

export const getPlayers = async (): Promise<Player[]> => {
  const response = await fetch(`${API_URL}/players/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch players');
  }
  
  return response.json();
};

// Game API calls
export const playGame = async (playerId: number, choice: 'rock' | 'paper' | 'scissors'): Promise<Game> => {
  const response = await fetch(`${API_URL}/games/play/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ player_id: playerId, choice }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to play game');
  }
  
  return response.json();
};

export const getPlayerGames = async (playerId: number): Promise<Game[]> => {
  const response = await fetch(`${API_URL}/games/?player=${playerId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch player games');
  }
  
  return response.json();
};