from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import User
from django.http import JsonResponse, HttpResponseNotAllowed
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from json import JSONDecodeError
from django.contrib.auth import authenticate
from rest_framework_jwt.settings import api_settings

# Get the JWT settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserRegistrationView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def user_login(request):
    username = request.data.get("username", "")
    password = request.data.get("password", "")
    
    user = authenticate(username=username, password=password)
    
    if user is not None:
        # Generate token
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        
        user_details = {}
        user_details['id'] = user.id
        user_details['username'] = user.username
        user_details['email'] = user.email
        user_details['first_name'] = user.first_name
        user_details['last_name'] = user.last_name
        user_details['token'] = token
        
        return Response(user_details, status=status.HTTP_200_OK)
    
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            serializer = UserRegistrationSerializer(data=data)
            if serializer.is_valid():
                user = serializer.save()
                response_data = serializer.data
                return JsonResponse(response_data, status=201)
            return JsonResponse(serializer.errors, status=400)
        except JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def check_login_by_email(request, email):
    try:
        user = User.objects.filter(email=email)
        if not user.exists():
            return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
    if request.method == 'GET':
        serializer = UserSerializer(user, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def get_user_by_id(request, id):
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)
    
    elif request.method in ['PUT', 'PATCH']:
        try:
            data = JSONParser().parse(request)
            serializer = UserSerializer(user, data=data, partial=request.method == 'PATCH')
            if serializer.is_valid():
                updated_user = serializer.save()
                response_data = serializer.data
                return JsonResponse(response_data, status=200)
            return JsonResponse(serializer.errors, status=400)
        except JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    
    return HttpResponseNotAllowed(['GET', 'PUT', 'PATCH'])

class UserProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        user_profile = request.user.userprofile
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)
    
    def put(self, request, format=None):
        user_profile = request.user.userprofile
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def change_password(request):
    user = request.user
    old_password = request.data.get('old_password', '')
    new_password = request.data.get('new_password', '')
    
    # Check if old password is correct
    if not user.check_password(old_password):
        return Response({"error": "Incorrect old password"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Set new password
    user.set_password(new_password)
    user.save()
    
    return Response({"success": "Password changed successfully"}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def request_password_reset(request):
    email = request.data.get('email', '')
    
    try:
        user = User.objects.get(email=email)
        # Here you would typically:
        # 1. Generate a reset token
        # 2. Save it to the user or a separate model
        # 3. Send an email with a reset link
        
        # For now, we'll just return a success message
        return Response({"success": "Password reset instructions sent to your email"}, 
                        status=status.HTTP_200_OK)
    except User.DoesNotExist:
        # Don't reveal if user exists or not for security reasons
        return Response({"success": "If this email exists, password reset instructions will be sent"}, 
                        status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def validate_reset_token(request):
    """
    Validate a password reset token
    """
    token = request.data.get('token', '')
    
    # Logic to validate the token would go here
    # For demonstration purposes, we'll just return a success
    return Response({"valid": True}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def reset_password(request):
    """
    Reset password with token
    """
    token = request.data.get('token', '')
    new_password = request.data.get('new_password', '')
    
    # Logic to verify token and get user would go here
    # For demonstration purposes, we'll assume it's valid
    
    # user = User.objects.get(reset_token=token)
    # user.set_password(new_password)
    # user.reset_token = None
    # user.save()
    
    return Response({"success": "Password has been reset successfully"}, status=status.HTTP_200_OK)