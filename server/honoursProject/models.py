from django.db import models

# Create your models here.

class Session(models.Model):
    join_code = models.CharField(max_length=6)
    time_delay = models.IntegerField() # this is in seconds

    def _str_(self):
        return self.join_code