# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.utils import timezone
from django.core import serializers
from django.db import connection
from itertools import groupby
from django.db.models import Count
from django.utils.dateparse import parse_datetime
from django.utils.timezone import is_aware, make_aware

import dateutil.parser
import os.path
import json
import pytz
from base64 import b64encode, b64decode
from datetime import datetime, date
from server.models import St_folio, ST, Folio, St_work

from django.shortcuts import render

# Create your views here.
def index(request):
    return HttpResponse("Hello, world")

def insertData(request):
    print "REQUEST ---> ", request
    if request.method == "POST":
        data = None
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            data = body
        except ValueError:
            print "Error with json input"
            response = {
                "message":"error",
                "status":406,
            }
            return HttpResponse(json.dumps(response), content_type='application/json')

        imgBase64 = None
        st = None
        folio = None
        lat = None
        lng = None
        note = None
        date = None
        try:
            imgBase64 = data['FileName']
            print "imgBase64 -> ", type(imgBase64)
            date = data['CreatedOn']
            st = data['ST_string']
            folio = data['Folio_string']
            lat = data['Latitude']
            lng = data['Longitude']
            note = data['Note']
        except:
            response = {
             "message":"Error in params",
             "status":406,
            }
            return HttpResponse(json.dumps(response),content_type='application/json')
        st = str(st)
        folio = str(folio)
        lat = float(lat)
        lng = float(lng)
        note = str(note)

        date_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        date_time_path = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
        # Create path to a image
        path="images/"+str(date_time_path)+str(data['ST_string'])+str(data['Folio_string'])+".jpg"
        #print "time -> ", timezone.localtime(timezone.now())
        try:
            st_f=St_folio.objects.get(idST=st, idFolio=folio)
            st_f.date = date_time
            st_f.path_img = path
            st_f.lng = lng
            st_f.note = note
            st_f.lat = lat
            st_f.save()
        except:
            response = {
             "message":"These data already existed",
             "status":400,
            }
            return HttpResponse(json.dumps(response),content_type='application/json')
        #Recieve data
        #Insert image in route path
        try:
            with open(path, "wb") as fh:
                print "path -> ", path
                fh.write(imgBase64.decode('base64'))
        except:
            response = {
             "message":"Error with base64 code",
             "status":400,
            }
            return HttpResponse(json.dumps(response),content_type='application/json')
        response = {
         "message":None,
         "status":200,
        }
        return HttpResponse(json.dumps(response),content_type='application/json')
    else:
        response = {
            "message":"error",
            "status":404,
        }
        return HttpResponse(json.dumps(response), content_type='application/json')

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, (datetime, date)):
        serial = obj.isoformat()
        return serial
    raise TypeError ("Type %s not serializable" % type(obj))

def getSTFolios(request):
    print "REQUEST ----> ", request
    if request.method == "GET":
        rows = None
        st_database = None
        try:
            st_database = St_folio.objects.exclude(idST__isnull=True).exclude(idFolio__isnull=True).order_by('idST')
            if (len(st_database) == 0):
                response = {
                    "message":"error",
                    "status":404,
                }
                return HttpResponse(json.dumps(response), content_type='application/json', status=404)
            dct = {k.name: [x.idFolio.name for x in g] for k, g in groupby(st_database, key=lambda q: q.idST)}
        except:
            response = {
                "message":"error",
                "status":404,
            }
            return HttpResponse(json.dumps(response), content_type='application/json')
        print "DCT -> ",dct
        json_data = json.dumps([dct], default=json_serial)
        print "1"
        list_res = []
        for ix in dct:
            list_folios = []
            for iy in dct[ix]:
                list_folios.append({"number":iy})
            list_res.append({"st":ix, "folios":list_folios})
            print ix
            print str(dct[ix][0])
        print "2"
        print "list_response ->", list_res
        print "json_data -> ", json_data
        return HttpResponse(json.dumps(list_res), content_type="application/json")
    else:
        response = {
            "message":"error",
            "status":404,
        }
        return HttpResponse(json.dumps(response), content_type='application/json')


def getAllST(request):
    print "REQUEST ----> ", request
    if request.method == "GET":
        rows = None
        st_database = St_folio.objects.all()
        print "st_database ", st_database
        st_ = st_database.values("idST").annotate(Count('idST'))
        print "st_ ", st_
        resp = []
        for ix in st_:
            resp.append({"st":str(ix['idST'])})
        json_data = json.dumps(resp, default=json_serial)
        return HttpResponse(json_data, content_type="application/json")
    else:
        response = {
            "message":"error",
            "status":404,
        }
        return HttpResponse(json.dumps(response), content_type='application/json')

def getFolioOfST(request):
    print "REQUEST ----> ", request
    if request.method == "GET":
        try:
            st_input = request.GET['st']
        except:
            response = {
             "message":"Error in params",
             "status":406,
            }
            return HttpResponse(json.dumps(response),content_type='application/json')

        stfolio_database = St_folio.objects.filter(idST=st_input)
        if len(stfolio_database) == 0:
            response = {
                "message":"ST not exists",
                "status":400,
            }
            return HttpResponse(json.dumps(response), content_type='application/json')
        folio_ = stfolio_database.values("idFolio")
        if len(folio_) == 0:
            response = {
                "message":"Not contains folios",
                "status":200,
            }
            return HttpResponse(json.dumps(response), content_type='application/json')
        resp = []
        for ix in folio_:
            if str(ix['idFolio']) != "None":
                resp.append({"folio":str(ix['idFolio'])})
        if len(resp) == 0:
            response = {
                "message":"Not contains folios",
                "status":400,
            }
            return HttpResponse(json.dumps(response), content_type='application/json')
        else:
            json_data = json.dumps(resp, default=json_serial)
            response = {
                "data":resp,
                "status":200,
            }
            return HttpResponse(json.dumps(response), content_type="application/json");
    else:
        response = {
            "message":"error",
            "status":404,
        }
        return HttpResponse(json.dumps(response), content_type='application/json')

def get_aware_datetime(date_str):
    ret = parse_datetime(date_str)
    if not is_aware(ret):
        ret = make_aware(ret)
    return ret

def dataTable(request):
    if request.method == "POST":
        print "[dataTable request] ", request
        
        data = None
        try:
            body_unicode = request.body.decode('utf-8')
            data = json.loads(body_unicode)
        except ValueError:
            print "Error with json input"
            response = {
                "message":"error",
                "status":406,
            }
            return HttpResponse(json.dumps(response), content_type='application/json')

        start = None
        end = None

        try:
            start = data['start']
            end = data['end']
        except:
            response = {
             "message":"Error in params",
             "status":406,
            }
            return HttpResponse(json.dumps(response),content_type='application/json')
        start = str(start)
        end = str(end)
        print "start -> ", start
        print "end -> ", end
        start = parse_datetime(start)
        end = parse_datetime(end)
        print "start -> ", start
        print "end -> ", end
        photos = None
        try:
            photos = St_work.objects.filter(idSTFolio__date__range=[start, end]).filter(idSTFolio__idPro__isnull=False)
            print "photos in range [start, end]-> ", photos
        except:
            response = {
             "message":"No exists data",
             "status":400,
            }
            return HttpResponse(json.dumps(response),content_type='application/json')
        try:
            for ix in photos:
                encoded_string = None
                with open("./"+str(ix.idSTFolio.path_img), "rb") as image_file:
                    encoded_string = b64encode(image_file.read())
                    ix.idSTFolio.path_img = encoded_string
        except:
            response = {
             "message":"Error with base64 code",
             "status":400,
            }
            return HttpResponse(json.dumps(response),content_type='application/json')
        data = []
        for ix in photos:
            data.append({"foto":ix.idSTFolio.path_img,
                        "obra":ix.idObra.name,
                        "st":ix.idSTFolio.idST.name,
                        "folio":ix.idSTFolio.idFolio.name,
                        "profesional":ix.idSTFolio.idPro.name})
        response = {
         "data":data,
         "status":200,
        }
        return HttpResponse(json.dumps(response),content_type='application/json')
    else:
        response = {
            "message":"error",
            "status":404,
        }
        return HttpResponse(json.dumps(response), content_type='application/json')
