from django.db import models

# Create your models here.
class Player(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Game(models.Model):
    ROCK = 'rock'
    PAPER = 'paper'
    SCISSORS = 'scissors'
    
    CHOICES = [
        (ROCK, 'Rock'),
        (PAPER, 'Paper'),
        (SCISSORS, 'Scissors'),
    ]
    
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='games')
    player_choice = models.CharField(max_length=10, choices=CHOICES)
    computer_choice = models.CharField(max_length=10, choices=CHOICES)
    result = models.CharField(max_length=10)  # 'win', 'lose', 'draw'
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.player.name}: {self.player_choice} vs {self.computer_choice} - {self.result}"
