from django.db import models
import random

# Create your models here.

def create_random_code():
        while True:
            code = random.randint(100000, 1000000)
            if not Session.objects.filter(join_code=code).exists():
                return "%d" % code

class Session(models.Model):
    join_code = models.CharField(max_length=6, blank=True, default=create_random_code)
    time_delay = models.IntegerField() # this is in seconds
    ascendToken = models.CharField(max_length=2048, blank=True)

    def _str_(self):
        return self.join_code

    def save(self, *args, **kwargs):
        code = create_random_code()
        self.set_join_code(code)
        print("New session created")
        return super().save(*args, **kwargs)

    def set_join_code(self, code):
        self.join_code = code

class Device(models.Model):

    session = models.ForeignKey(Session, related_name="devices", on_delete=models.CASCADE)
    mode = models.IntegerField(blank=True, default=0)