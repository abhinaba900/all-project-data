from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def january(request):
    return HttpResponse("This is january challenge")

def february(request):
    return HttpResponse("This is february challenge")

def march(request):
    return HttpResponse("This is march challenge")

def april(request):
    return HttpResponse("This is april challenge")

def may(request):
    return HttpResponse("This is may challenge")

def june(request):
    return HttpResponse("This is june challenge")

def july(request):
    return HttpResponse("This is july challenge")

def august(request):
    return HttpResponse("This is august challenge")

def september(request):
    return HttpResponse("This is september challenge")

def october(request):
    return HttpResponse("This is october challenge")

def november(request):
    return HttpResponse("This is november challenge")

def december(request):
    return HttpResponse("This is december challenge")

def monthly_challenge_by_number(request, month):
    months = {
        'january/': january,
        'february': february,
        'march': march,
        'april': april,
        'may': may,
        'june': june,
        'july': july,
        'august': august,
        'september': september,
        'october': october,
        'november': november,
        'december': december
    }
    return render(request, months[month])
