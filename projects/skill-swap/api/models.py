from django.db import models
from django.contrib.auth.hashers import make_password
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import TextChoices

# --- 1. Users ---
class User(models.Model):
    class Role(TextChoices):
        USER = 'User', 'User'
        ADMIN = 'Admin', 'Admin'

    email = models.EmailField(max_length=100, unique=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    role = models.CharField(
        max_length=10,
        choices=Role.choices,
        default=Role.USER,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.password and '$' not in self.password:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

# --- 2. UserProfiles ---
class Occupation(TextChoices):
    ACCOUNTANT = 'Accountant', 'Accountant'
    ACTOR = 'Actor', 'Actor'
    ACTUARY = 'Actuary', 'Actuary'
    ADMINISTRATIVE_ASSISTANT = 'Administrative Assistant', 'Administrative Assistant'
    ARCHITECT = 'Architect', 'Architect'
    ARTIST = 'Artist', 'Artist'
    BIOLOGIST = 'Biologist', 'Biologist'
    BUSINESS_ANALYST = 'Business Analyst', 'Business Analyst'
    CARPENTER = 'Carpenter', 'Carpenter'
    CHEF = 'Chef', 'Chef'
    CIVIL_ENGINEER = 'Civil Engineer', 'Civil Engineer'
    CONSULTANT = 'Consultant', 'Consultant'
    DENTIST = 'Dentist', 'Dentist'
    DESIGNER = 'Designer', 'Designer'
    WEB_DEVELOPER = 'Web Developer', 'Web Developer'
    ECONOMIST = 'Economist', 'Economist'
    ELECTRICIAN = 'Electrician', 'Electrician'
    ENGINEER = 'Engineer', 'Engineer'
    FINANCIAL_ANALYST = 'Financial Analyst', 'Financial Analyst'
    FIREFIGHTER = 'Firefighter', 'Firefighter'
    GRAPHIC_DESIGNER = 'Graphic Designer', 'Graphic Designer'
    HUMAN_RESOURCES_MANAGER = 'Human Resources Manager', 'Human Resources Manager'
    JOURNALIST = 'Journalist', 'Journalist'
    LAWYER = 'Lawyer', 'Lawyer'
    LIBRARIAN = 'Librarian', 'Librarian'
    MANAGER = 'Manager', 'Manager'
    MECHANIC = 'Mechanic', 'Mechanic'
    NURSE = 'Nurse', 'Nurse'
    NUTRITIONIST = 'Nutritionist', 'Nutritionist'
    OPTOMETRIST = 'Optometrist', 'Optometrist'
    PHARMACIST = 'Pharmacist', 'Pharmacist'
    PHOTOGRAPHER = 'Photographer', 'Photographer'
    PHYSICIAN = 'Physician', 'Physician'
    PHYSICIST = 'Physicist', 'Physicist'
    PILOT = 'Pilot', 'Pilot'
    PLUMBER = 'Plumber', 'Plumber'
    POLICE_OFFICER = 'Police Officer', 'Police Officer'
    PROFESSOR = 'Professor', 'Professor'
    PROGRAMMER = 'Programmer', 'Programmer'
    PSYCHOLOGIST = 'Psychologist', 'Psychologist'
    RECEPTIONIST = 'Receptionist', 'Receptionist'
    SALESPERSON = 'Salesperson', 'Salesperson'
    SCIENTIST = 'Scientist', 'Scientist'
    SECRETARY = 'Secretary', 'Secretary'
    SOFTWARE_ENGINEER = 'Software Engineer', 'Software Engineer'
    TEACHER = 'Teacher', 'Teacher'
    TECHNICIAN = 'Technician', 'Technician'
    THERAPIST = 'Therapist', 'Therapist'
    TRANSLATOR = 'Translator', 'Translator'
    WRITER = 'Writer', 'Writer'

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, db_index=True)
    date_of_birth = models.DateField()
    occupation = models.CharField(max_length=50, choices=Occupation.choices)
    skill_owned = models.CharField(max_length=50)
    experience = models.DecimalField(max_digits=4, decimal_places=1)
    location = models.CharField(max_length=70)
    work_link = models.URLField(max_length=255)
    description = models.TextField()
    achievements = models.TextField()
    profile_image = models.URLField(max_length=255)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Profile of {self.user.username}'

# --- 3. Skills ---
class Proficiency(TextChoices):
    BEGINNER = 'Beginner', 'Beginner'
    INTERMEDIATE = 'Intermediate', 'Intermediate'
    ADVANCED = 'Advanced', 'Advanced'

class Skill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='skills', db_index=True)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100)
    proficiency = models.CharField(max_length=20, choices=Proficiency.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

# --- 4. SkillSwaps ---
class SkillSwapStatus(TextChoices):
    PENDING = 'Pending', 'Pending'
    ACCEPTED = 'Accepted', 'Accepted'
    DECLINED = 'Declined', 'Declined'

class SkillSwap(models.Model):
    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requested_swaps', db_index=True)
    provider = models.ForeignKey(User, on_delete=models.CASCADE, related_name='provided_swaps', db_index=True)
    offered_skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='offered_swaps', db_index=True)
    requested_skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='requested_swaps', db_index=True)
    status = models.CharField(max_length=10, choices=SkillSwapStatus.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'Swap: {self.requester.username} -> {self.provider.username}'

# --- 5. Reviews ---
class Review(models.Model):
    swap = models.ForeignKey(SkillSwap, on_delete=models.CASCADE, related_name='reviews', db_index=True)
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_reviews', db_index=True)
    reviewee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_reviews', db_index=True)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('swap', 'reviewer')

    def __str__(self):
        return f'Review by {self.reviewer.username} for {self.reviewee.username}'

# --- 6. Classes ---
class ClassStatus(TextChoices):
    SCHEDULED = 'Scheduled', 'Scheduled'
    COMPLETED = 'Completed', 'Completed'
    CANCELED = 'Canceled', 'Canceled'

class Class(models.Model):
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='classes', db_index=True)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    scheduled_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=10, choices=ClassStatus.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

# --- 7. CalendarEvents ---
class CalendarEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='calendar_events', db_index=True)
    event_type = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    event_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title} on {self.event_date}'

# --- 8. Conversations ---
class Conversation(models.Model):
    user_one = models.ForeignKey(User, on_delete=models.CASCADE, related_name='conversations_as_user_one', db_index=True)
    user_two = models.ForeignKey(User, on_delete=models.CASCADE, related_name='conversations_as_user_two', db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.user_one.id and self.user_two.id and self.user_one.id > self.user_two.id:
            self.user_one, self.user_two = self.user_two, self.user_one

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    class Meta:
        unique_together = ('user_one', 'user_two')

    def __str__(self):
        return f'Conversation: {self.user_one.username} & {self.user_two.username}'

# --- 9. Messages ---
class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages', db_index=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages', db_index=True)
    message_text = models.TextField()
    is_read = models.BooleanField(default=False, db_index=True)  
    is_deleted = models.BooleanField(default=False, db_index=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    read_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'Message from {self.sender.username}'
    
    def mark_as_read(self):
        from django.utils import timezone
        
        if not self.is_read:
            self.is_read = True
            self.read_at = timezone.now()
            self.save(update_fields=['is_read', 'read_at', 'updated_at'])
    
    def soft_delete(self):
        self.is_deleted = True
        self.save(update_fields=['is_deleted', 'updated_at'])

# --- 10. CommunityGroups ---
class GroupVisibility(TextChoices):
    PUBLIC = 'Public', 'Public'
    PRIVATE = 'Private', 'Private'

class CommunityGroup(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    admin_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='administered_groups', db_index=True)
    visibility = models.CharField(max_length=10, choices=GroupVisibility.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# --- 11. CommunityMemberships ---
class MembershipStatus(TextChoices):
    PENDING = 'Pending', 'Pending'
    APPROVED = 'Approved', 'Approved'
    DECLINED = 'Declined', 'Declined'

class CommunityMembership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='community_memberships', db_index=True)
    group = models.ForeignKey(CommunityGroup, on_delete=models.CASCADE, related_name='memberships', db_index=True)
    status = models.CharField(max_length=10, choices=MembershipStatus.choices)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} in {self.group.name}'

# --- 12. Subscriptions ---
class SubscriptionStatus(TextChoices):
    ACTIVE = 'Active', 'Active'
    INACTIVE = 'Inactive', 'Inactive'
    CANCELED = 'Canceled', 'Canceled'

class SubscriptionPlan(TextChoices):
    MONTH = 'Month', 'Month'
    THREE_MONTHS = '3-Months', '3-Months'
    YEAR = 'Year', 'Year'

class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions', db_index=True)
    plan = models.CharField(max_length=10, choices=SubscriptionPlan.choices)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=SubscriptionStatus.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Subscription of {self.user.username}'

# --- 13. Settings ---
class Setting(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='settings', db_index=True)
    notification_preferences = models.JSONField()
    privacy_settings = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Settings for {self.user.username}'

# --- 14. History ---
class History(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='history', db_index=True)
    event_type = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    event_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'History for {self.user.username} on {self.event_date}'

# --- 15. ClassRegistrations ---
class RegistrationStatus(TextChoices):
    REGISTERED = 'Registered', 'Registered'
    ATTENDED = 'Attended', 'Attended'
    CANCELLED = 'Cancelled', 'Cancelled'

class ClassRegistration(models.Model):
    class_instance = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='registrations', db_index=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='class_registrations', db_index=True)
    status = models.CharField(max_length=10, choices=RegistrationStatus.choices)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - {self.class_instance.title} ({self.status})'