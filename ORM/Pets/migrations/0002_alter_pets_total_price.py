# Generated by Django 4.2.7 on 2023-11-10 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pets', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pets',
            name='Total_price',
            field=models.IntegerField(blank=True),
        ),
    ]