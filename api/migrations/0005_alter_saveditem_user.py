# Generated by Django 4.1.3 on 2023-08-03 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_saveditem_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='saveditem',
            name='user',
            field=models.CharField(blank=True, max_length=50, null=True, unique=True),
        ),
    ]
