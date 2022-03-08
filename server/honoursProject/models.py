from django.db import models
import random

# Create your models here.

class Session(models.Model):
    join_code = models.CharField(max_length=6)
    time_delay = models.IntegerField() # this is in seconds

    def _str_(self):
        return self.join_code

    def save(self, *args, **kwargs):
        if self.join_code == 0 or self.join_code == "0":
            code = random.randint(100000, 1000000)
            self.set_join_code(code)
        return super().save(*args, **kwargs)

    def set_join_code(self, code):
        self.join_code = code