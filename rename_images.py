import os
from pathlib import Path

FILE_TYPE = input("Tipo de archivo: ")
ROOT = __file__.replace("\\", "/").rsplit("/", 1)[0]

def renombrar_imagenes(carpeta_entrada:Path, carpeta_salida:Path):
    # Obtener la lista de archivos en la carpeta de entrada
    archivos = sorted(carpeta_entrada.glob("*."+FILE_TYPE))  # Cambia la extensión si las imágenes no son jpg

    # Crear la carpeta de salida si no existe
    carpeta_salida.mkdir(exist_ok=True)

    # Iterar sobre los archivos y renombrarlos
    for i, archivo in enumerate(archivos, 1):
        # Crear el nuevo nombre de archivo con formato 001.jpg, 002.jpg, etc.
        nuevo_nombre = f"{i:03d}.{FILE_TYPE}"
        ruta_salida = carpeta_salida / nuevo_nombre

        # Renombrar el archivo
        os.rename(archivo, ruta_salida)
        print("File changed ", archivo)
# Ruta de la carpeta de entrada
carpeta_entrada = Path(input("Carpeta de entrada: "))

# Ruta de la carpeta de salida
carpeta_salida = Path(input("Carpeta de salida: "))

renombrar_imagenes(carpeta_entrada, carpeta_salida)
