from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed
from rest_framework .parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework .views import APIView

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
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

@csrf_exempt
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
