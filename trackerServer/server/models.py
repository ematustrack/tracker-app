# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.utils import timezone
from django.db import models


#Base class
class Folio(models.Model):
    name = models.CharField(max_length=30, primary_key=True)
    def __str__(self):
        return self.name

class ST(models.Model):
    name = models.CharField(max_length=30, primary_key=True)
    def __str__(self):
        return self.name
class Work(models.Model):
    name = models.CharField(max_length=30, primary_key=True)
    def __str__(self):
        return self.name

#Union class
class St_folio(models.Model):
    idST = models.ForeignKey('ST', blank=True, null=True)
    idFolio = models.ForeignKey('Folio', blank=True, null=True)
    class Meta:
        unique_together = (('idST', 'idFolio'),)
    idPro = models.ForeignKey('Pro', blank=True, null=True)
    path_img = models.TextField(blank=True, null=True)
    note = models.TextField(blank=True, null=True)
    lng = models.FloatField(blank=True, null=True)
    lat = models.FloatField(blank=True, null=True)
    date = models.DateTimeField(blank=True, null=True)
    def __str__(self):
        return str(self.id) + "st_folio"

class St_work(models.Model):
    class Meta:
        unique_together = (('idObra', 'idSTFolio'),)
    idObra = models.ForeignKey('Work', on_delete=models.CASCADE)
    idSTFolio = models.ForeignKey('ST_folio', on_delete=models.CASCADE)
    def __str__(self):
        return self.idObra.name + "/st_folio" + str(self.idSTFolio.id)

class Pro(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    def __str__(self):
        return self.name
