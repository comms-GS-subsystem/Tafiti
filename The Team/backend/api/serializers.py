from rest_framework import serializers
from .models import UserSubmission

class UserSubmissionSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = UserSubmission
        fields = ['id', 'full_name', 'university', 'photo', 'photo_url', 'created_at']

    def get_photo_url(self, obj):
        if obj.photo:
            return obj.photo.url
        return None
