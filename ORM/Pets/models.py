from django.db import models

# Create your models here.
class Pets(models.Model):
    BreedName=models.CharField(max_length=10000,blank=True,null=True)
    PetName=models.CharField(max_length=10000,blank=True,null=True)
    price=models.IntegerField(blank=True,null=True)
    No_of_pets=models.IntegerField(blank=True,null=True)
    No_of_pets_sold=models.IntegerField(blank=True,null=True)
    Total_price=models.IntegerField(blank=True,editable=False)

    def save(self,*args,**kwargs):
        self.Total_price=self.No_of_pets_sold*self.price
        super(Pets,self).save(*args,**kwargs)
    def __str__(self):
        return self.PetName