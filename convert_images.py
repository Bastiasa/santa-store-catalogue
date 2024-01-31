from PIL import Image
import os
from pathlib import Path

FILE_TYPE = input("Tipo de archivo: ")

def escalar_convertir_guardar(imagen_path, salida_path, nuevo_ancho, nuevo_alto, numero):
    # Abrir la imagen
    img = Image.open(imagen_path)

    # Escalar la imagen a 1000x1000
    img = img.resize((nuevo_ancho, nuevo_alto))

    # Crear el nombre de archivo de salida con formato 001.webp, 002.webp, etc.
    nombre_salida = f"{numero:03d}.{FILE_TYPE}"
    ruta_salida = salida_path / nombre_salida

    # Guardar la imagen en formato webp
    img.save(ruta_salida, FILE_TYPE.upper())

# Ruta de la carpeta de entrada
carpeta_entrada = Path("/1/"+input("Carpeta de entrada: "))

# Ruta de la carpeta de salida
carpeta_salida = Path("/1/"+input("Carpeta de salida: "))

# Crear la carpeta de salida si no existe
carpeta_salida.mkdir(exist_ok=True)

# Obtener la lista de archivos en la carpeta de entrada
archivos = sorted(carpeta_entrada.glob("*."+FILE_TYPE))  # Cambia la extensión si las imágenes no son jpg

# Iterar sobre los archivos y procesarlos
for i, archivo in enumerate(archivos, 1):
    escalar_convertir_guardar(archivo, carpeta_salida, 1000, 1000, i)

print("Proceso completado.")
