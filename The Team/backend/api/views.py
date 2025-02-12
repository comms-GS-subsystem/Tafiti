from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserSubmissionSerializer
from .models import UserSubmission
import logging

# Create your views here.

logger = logging.getLogger(__name__)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def submit_form(request):
    logger.info(f"Received data: {request.data}")
    
    serializer = UserSubmissionSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error saving data: {str(e)}")
            return Response(
                {'error': 'Error saving data', 'detail': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    logger.error(f"Validation errors: {serializer.errors}")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_images(request):
    try:
        submissions = UserSubmission.objects.all().order_by('-created_at')
        serializer = UserSubmissionSerializer(submissions, many=True)
        data = serializer.data
        
        # Log the data for debugging
        logger.info(f"Image data: {data}")
        
        return Response(data)
    except Exception as e:
        logger.error(f"Error fetching images: {str(e)}")
        return Response(
            {'error': 'Error fetching images', 'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
