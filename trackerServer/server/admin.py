# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Folio, Pro, Work, St_work, St_folio, ST

admin.site.register(Folio)
admin.site.register(Work)
admin.site.register(St_work)
admin.site.register(St_folio)
admin.site.register(ST)
admin.site.register(Pro)
