from django.shortcuts import render
from django.http import JsonResponse
import pandas as pd
import numpy as np
import json
from django.conf import settings
from .mail_template import email_template
from django.core.mail import EmailMessage
import os


def home(request):
    return render(request, 'home.html')

def form(request):
    return render(request, 'form.html')


def get_leads(request):
    if request.method == 'POST':
        file = request.FILES.get('file')
        
        if file:
            file_extension = file.name.split('.')[-1]
            
            if file_extension == 'csv':
                df = pd.read_csv(file)
                
            elif file_extension in ('xls', 'xlsx'):
                df = pd.read_excel(file)
                
            else:
                return JsonResponse({'error': 'Invalid file format'})
            
            # Replace NaN values with None
            df = df.replace({np.nan: None})
            
            # Convert dataframe to Json-compatible format
            data = json.loads(df.to_json(orient="records"))
            
            return JsonResponse({'data': data})
        return JsonResponse({'error': 'File not found'})


def send_message(request, name, company, mail):
    
    email = EmailMessage(
        subject =  "Inquiry About Software Engineering Role",
        body = email_template.format(name=name, company_name = company),
        from_email = settings.EMAIL_HOST_USER,
        to = [mail]
    )
    
    #Attach pdf file
    pdf_path = os.path.join(settings.BASE_DIR, 'Saisrinu_Gampa.pdf')
    email.attach_file(pdf_path)
    
    try:
        email.send()
        return JsonResponse({'status': "Mail Sent Successfully"}, status=200)
    except Exception as e:
        return JsonResponse({'status':'Mail Sending Failed','message': str(e)}, status=500)
    