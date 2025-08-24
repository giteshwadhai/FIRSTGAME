from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
import random

from .models import Player, Game
from .serializers import PlayerSerializer, GameSerializer

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    
    @action(detail=False, methods=['post'])
    def play(self, request):
        player_id = request.data.get('player_id')
        player_choice = request.data.get('choice')
        
        if not player_id or not player_choice:
            return Response({'error': 'player_id and choice are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            player = Player.objects.get(id=player_id)
        except Player.DoesNotExist:
            return Response({'error': 'Player not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Validate player choice
        valid_choices = [Game.ROCK, Game.PAPER, Game.SCISSORS]
        if player_choice not in valid_choices:
            return Response({'error': 'Invalid choice. Must be rock, paper, or scissors'}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        # Generate computer choice
        computer_choice = random.choice(valid_choices)
        
        # Determine winner
        if player_choice == computer_choice:
            result = 'draw'
        elif (player_choice == Game.ROCK and computer_choice == Game.SCISSORS) or \
             (player_choice == Game.PAPER and computer_choice == Game.ROCK) or \
             (player_choice == Game.SCISSORS and computer_choice == Game.PAPER):
            result = 'win'
        else:
            result = 'lose'
        
        # Create game record
        game = Game.objects.create(
            player=player,
            player_choice=player_choice,
            computer_choice=computer_choice,
            result=result
        )
        
        serializer = GameSerializer(game)
        return Response(serializer.data)
