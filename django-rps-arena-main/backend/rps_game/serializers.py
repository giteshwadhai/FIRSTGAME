from rest_framework import serializers
from .models import Player, Game

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name', 'created_at']

class GameSerializer(serializers.ModelSerializer):
    player_name = serializers.ReadOnlyField(source='player.name')
    
    class Meta:
        model = Game
        fields = ['id', 'player', 'player_name', 'player_choice', 'computer_choice', 'result', 'created_at']