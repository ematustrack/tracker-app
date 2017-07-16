# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-07 15:08
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Folio',
            fields=[
                ('name', models.CharField(max_length=30, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Pro',
            fields=[
                ('name', models.CharField(max_length=50, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='ST',
            fields=[
                ('name', models.CharField(max_length=30, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='St_folio',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path_img', models.TextField(blank=True, null=True)),
                ('note', models.TextField(blank=True, null=True)),
                ('lng', models.FloatField(blank=True, null=True)),
                ('lat', models.FloatField(blank=True, null=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('idFolio', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='server.Folio')),
                ('idPro', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='server.Pro')),
                ('idST', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='server.ST')),
            ],
        ),
        migrations.CreateModel(
            name='St_work',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Work',
            fields=[
                ('name', models.CharField(max_length=30, primary_key=True, serialize=False)),
            ],
        ),
        migrations.AddField(
            model_name='st_work',
            name='idObra',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server.Work'),
        ),
        migrations.AddField(
            model_name='st_work',
            name='idSTFolio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server.St_folio'),
        ),
        migrations.AlterUniqueTogether(
            name='st_work',
            unique_together=set([('idObra', 'idSTFolio')]),
        ),
    ]
