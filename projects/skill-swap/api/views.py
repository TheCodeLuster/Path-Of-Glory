# views.py
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, id=None):
        try:
            user_id = int(id)
            print(f"Looking for UserProfile with user ID: {user_id}")
            user_profile = UserProfile.objects.get(user=user_id)
            print(f"Found UserProfile: {user_profile}")
            serializer = UserProfileSerializer(user_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            print(f"UserProfile not found for user ID: {id}")
            return Response({'error': 'UserProfile not found'}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({'error': 'Invalid user ID'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        if UserProfile.objects.filter(user=request.user).exists():
            return Response({'error': 'UserProfile already exists for this user'}, status=status.HTTP_400_BAD_REQUEST)

        # Avoid copying request.data directly; create a new dict with only the fields we need
        data = {}
        for key, value in request.data.items():
            if key != 'profile_image':  # Exclude file fields from deep copying
                data[key] = value
        data['user'] = request.user.id

        # Add the profile_image separately to avoid pickling issues
        if 'profile_image' in request.FILES:
            data['profile_image'] = request.FILES['profile_image']

        # Pass minimal context to the serializer
        serializer = UserProfileSerializer(data=data)
        if serializer.is_valid():
            try:
                user_profile = serializer.save()
                response_data = serializer.data
                response_data['UserId'] = user_profile.user.id
                return Response(response_data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id=None):
        if str(request.user.id) != str(id):
            return Response({'error': 'You can only update your own profile'}, status=status.HTTP_403_FORBIDDEN)

        try:
            user_id = int(id)
            print(f"Looking for UserProfile with user ID: {user_id}")
            user_profile = UserProfile.objects.get(user=user_id)
            print(f"Found UserProfile: {user_profile}")
        except UserProfile.DoesNotExist:
            print(f"UserProfile not found for user ID: {id}")
            return Response({'error': 'UserProfile not found'}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({'error': 'Invalid user ID'}, status=status.HTTP_400_BAD_REQUEST)

        # Handle PATCH data similarly
        data = {}
        for key, value in request.data.items():
            if key != 'profile_image':
                data[key] = value
        if 'profile_image' in request.FILES:
            data['profile_image'] = request.FILES['profile_image']

        serializer = UserProfileSerializer(user_profile, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        print('Token request data:', request.data)
        response = super().post(request, *args, **kwargs)
        print('Token response:', response.data)
        return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    permission_classes = ()
    def post(self, request, format=None):
        print('Signup request data:', request.data)
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print('User created:', user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print('Signup errors:', serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserRegistrationSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            response_data = serializer.data
            response_data['UserId'] = user.id
            return JsonResponse(response_data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def check_login(request, email):
    try:
        user = User.objects.filter(email=email)
    except:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = UserSerializer(user, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request, id):
    try:
        user = User.objects.get(pk=id)
    except:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)
    elif request.method in ['PUT', 'PATCH']:
        data = JSONParser().parse(request)
        try:
            user = User.objects.get(id=data['UserId'])
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            response_data = serializer.data
            response_data['UserId'] = user.id
            return JsonResponse(response_data, status=200)
        return JsonResponse(serializer.errors, status=400)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'PATCH'])

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_user(request):
    email = request.user.email  
    check = User.objects.filter(email=email)
    serializer = UserSerializer(check, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({'error': 'Refresh token required'}, status=status.HTTP_400_BAD_REQUEST)
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)