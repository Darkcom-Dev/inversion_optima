from django.shortcuts import render

# Create your views here.
founder = "Braulio Madrid"
email = "brauliomadrid.developer@gmail.com"
# Otras páginas estáticas que no usan ningun modelo:

def terminos_y_condiciones(request):
    context = {
        'email': email
    }
    return render(request, 'main/TyC.html', context)

def acerca_de(request):
    context = {
        'founder': founder,
        'email': email
    }
    return render(request, 'main/acerca_de.html', context)

def politicas_de_privacidad(request):
    context = {
        'email': email
    }
    return render(request, 'main/politica_de_privacidad.html', context)