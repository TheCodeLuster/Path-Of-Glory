from rest_framework import serializers 
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'phone_number', 
                  'role', 'created_at', 'updated_at']


# User Serializer with Token
class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        # Generate token using Simple JWT
        refresh = RefreshToken.for_user(obj)
        return str(refresh.access_token)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('id', 'token', 'email', 'username', 'password', 'first_name', 'last_name', 
                  'phone_number', 'role')


# User Registration Serializer
class UserRegistrationSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'first_name', 'last_name', 
                  'phone_number', 'role', 'token']
        extra_kwargs = {'password': {'write_only': True}}
    
    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)
        return str(refresh.access_token)
    
    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data.get('phone_number', ''),
            role=validated_data.get('role', User.Role.USER)
        )
        user.password = validated_data['password']  # Will be hashed in the model's save method
        user.save()
        return user


# User Profile Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['user', 'date_of_birth', 'occupation', 'skill_owned', 'experience',
                  'location', 'work_link', 'description', 'achievements', 'profile_image',
                  'updated_at']


# Skill Serializer
class SkillSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Skill
        fields = ['id', 'user', 'title', 'description', 'category', 'proficiency',
                  'created_at', 'updated_at']


# SkillSwap Serializer
class SkillSwapSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)
    provider = UserSerializer(read_only=True)
    offered_skill = SkillSerializer(read_only=True)
    requested_skill = SkillSerializer(read_only=True)
    
    class Meta:
        model = SkillSwap
        fields = ['id', 'requester', 'provider', 'offered_skill', 'requested_skill',
                  'status', 'created_at', 'updated_at', 'completed_at']


# Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(read_only=True)
    reviewee = UserSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = ['id', 'swap', 'reviewer', 'reviewee', 'rating', 'comment', 'created_at']


# Class Serializer
class ClassSerializer(serializers.ModelSerializer):
    instructor = UserSerializer(read_only=True)
    
    class Meta:
        model = Class
        fields = ['id', 'instructor', 'title', 'description', 'scheduled_date',
                  'start_time', 'end_time', 'location', 'status', 'created_at', 'updated_at']


# CalendarEvent Serializer
class CalendarEventSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = CalendarEvent
        fields = ['id', 'user', 'event_type', 'title', 'event_date', 'start_time',
                  'end_time', 'notes', 'created_at']


# Conversation Serializer
class ConversationSerializer(serializers.ModelSerializer):
    user_one = UserSerializer(read_only=True)
    user_two = UserSerializer(read_only=True)
    
    class Meta:
        model = Conversation
        fields = ['id', 'user_one', 'user_two', 'created_at']


# Message Serializer
class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'conversation', 'sender', 'message_text', 'is_read',
                  'is_deleted', 'created_at', 'updated_at', 'read_at']


# CommunityGroup Serializer
class CommunityGroupSerializer(serializers.ModelSerializer):
    admin_user = UserSerializer(read_only=True)
    
    class Meta:
        model = CommunityGroup
        fields = ['id', 'name', 'description', 'category', 'admin_user',
                  'visibility', 'created_at', 'updated_at']


# CommunityMembership Serializer
class CommunityMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    group = CommunityGroupSerializer(read_only=True)
    
    class Meta:
        model = CommunityMembership
        fields = ['id', 'user', 'group', 'status', 'created_at']


# Subscription Serializer
class SubscriptionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Subscription
        fields = ['id', 'user', 'plan', 'price', 'status', 'created_at', 'updated_at']


# Setting Serializer
class SettingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Setting
        fields = ['id', 'user', 'notification_preferences', 'privacy_settings',
                  'created_at', 'updated_at']


# History Serializer
class HistorySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = History
        fields = ['id', 'user', 'event_type', 'description', 'event_date', 'created_at']


# ClassRegistration Serializer
class ClassRegistrationSerializer(serializers.ModelSerializer):
    class_instance = ClassSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = ClassRegistration
        fields = ['id', 'class_instance', 'user', 'status', 'created_at']


# Create Serializers (for POST requests)
class SkillCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'user', 'title', 'description', 'category', 'proficiency']


class SkillSwapCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillSwap
        fields = ['id', 'requester', 'provider', 'offered_skill', 'requested_skill', 'status']


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'swap', 'reviewer', 'reviewee', 'rating', 'comment']


class ClassCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'instructor', 'title', 'description', 'scheduled_date',
                  'start_time', 'end_time', 'location', 'status']


class CalendarEventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarEvent
        fields = ['id', 'user', 'event_type', 'title', 'event_date', 'start_time',
                  'end_time', 'notes']


class MessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'conversation', 'sender', 'message_text']


class CommunityGroupCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityGroup
        fields = ['id', 'name', 'description', 'category', 'admin_user', 'visibility']


class CommunityMembershipCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityMembership
        fields = ['id', 'user', 'group', 'status']


class SubscriptionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'user', 'plan', 'price', 'status']


class SettingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = ['id', 'user', 'notification_preferences', 'privacy_settings']


class HistoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ['id', 'user', 'event_type', 'description', 'event_date']


class ClassRegistrationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRegistration
        fields = ['id', 'class_instance', 'user', 'status']


class UserProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'date_of_birth', 'occupation', 'skill_owned', 'experience',
                  'location', 'work_link', 'description', 'achievements', 'profile_image']
