from django.db import models

# Create your models here.
class Pets(models.Model):
    BreedName = models.CharField(max_length=10000, blank=False, null=False)
    PetName = models.CharField(max_length=10000, blank=False, null=False)
    price = models.IntegerField(blank=False, null=False)
    No_of_pets = models.IntegerField(blank=False, null=False)
    No_of_pets_sold = models.IntegerField(blank=False, null=False)
    Total_price = models.IntegerField(blank=True)

    def save(self, *args, **kwargs):
       
        self.Total_price = self.No_of_pets_sold * self.price
        super(Pets, self).save(*args, **kwargs)

    def __str__(self):
        return self.PetName 
