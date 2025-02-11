from django.db import models

# Create your models here.

class UserSubmission(models.Model):
    full_name = models.CharField(max_length=200)
    university = models.CharField(max_length=200)
    photo = models.ImageField(upload_to='user_photos/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.university}"
