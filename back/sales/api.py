from sales.models import Bill
from assets.models import Meter
from users.models import User
from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from .serializers import BillSerializers
from django.db.models import Q
from django.http import HttpResponse
from django.template.loader import get_template
from django.core import serializers
import pdfkit
import json

class GeneratePDFViewSet(viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def create(self, request):
        # recibe el parametro de la factura a generar
        pk = request.query_params.get('pk_bill')
        # buscar el registros asociados de dicha factura
        bill = Bill.objects.get(pk_bill=pk)
        meter = Meter.objects.get(pk_meter=bill.fk_meter_id)
        client = User.objects.get(id=meter.fk_client_id)
        # convertir el queryset en json para pasarlo al context
        billJson = json.loads(serializers.serialize('json',[bill,]))
        meterJson = json.loads(serializers.serialize('json',[meter,]))
        clientJson = json.loads(serializers.serialize('json',[client,]))
        # guardarlo en un contexto
        context = { "bill" : billJson[0], "meter" : meterJson[0], "client" : clientJson[0]}
        # busca el template a utilizar
        template = get_template("bill.html")
        # llena el template con la informacion que se recupero de la factura
        html = template.render(context)
        # convierte el template generado en pdf
        pdfkit.from_string(html,'out.pdf')
        # lee el pdf
        with open('out.pdf','rb') as f:
            pdf = f.read()
        # prepara la cabecera de la peticion
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment;  filename=output.pdf'
        #f.close()
        # envia la respuesta
        return response


class GenerateBillsViewSet(viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    # el nombre de la funcion es default y recibe post no necesito verificar metodo
    def create(self, request):
        # obtengo la informacion entrante    
            
        # cantidad de meters activos
        meters = Meter.objects.filter( isActive = True)
        # tomo la ultima factura de cada meter (suponiendo uno cada uno)
        for meter in meters:
            # tomo la ultima factura del contador 
            # print(meter._meta.fields)
            bill = Bill.objects.filter(fk_meter_id=meter.pk_meter).order_by('-end_date').first()
            # si no hay bill es nuevo genero normal
            # if bill is None:      
                # meters que no tiene factura solo genero

        # si una factura no esta pagada busco la anterior a ella
            # si la anterior a ella no esta apagada genero corte
            # si esta pagada genero con mora
        # de la lista de facturas si estan pagadas solo genero
        return



class BillListViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def list(self, request):
        pk=request.query_params.get('pk_cliente')
        meters = Meter.objects.filter(fk_client=pk)
        meter_ids=[]
        for meter in meters:
            meter_ids.append(meter.pk_meter)
        queryset = Bill.objects.filter(fk_meter__in=meter_ids)
        serializer = BillSerializers(queryset, many=True)
        return Response(serializer.data)

class PaidBillListViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def list(self, request):
        pk=request.query_params.get('pk_cliente')
        meters = Meter.objects.filter(fk_client=pk)
        meter_ids=[]
        for meter in meters:
            meter_ids.append(meter.pk_meter)
            print(meter.pk_meter)
        print(meter)
        queryset = Bill.objects.filter(Q(is_paid=True), Q(fk_meter__in=meter_ids))
        serializer = BillSerializers(queryset, many=True)
        return Response(serializer.data)

class PendingBillListViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def list(self, request):
        pk=request.query_params.get('pk_cliente')
        meters = Meter.objects.filter(fk_client=pk)
        meter_ids=[]
        for meter in meters:
            meter_ids.append(meter.pk_meter)
            print(meter.pk_meter)
        print(meter)
        queryset = Bill.objects.filter(Q(is_paid=False), Q(fk_meter__in=meter_ids))
        serializer = BillSerializers(queryset, many=True)
        return Response(serializer.data)
