import os
from pathlib import Path

def renombrar_imagenes(carpeta_entrada, carpeta_salida):
    # Obtener la lista de archivos en la carpeta de entrada
    archivos = sorted(carpeta_entrada.glob("*.webp"))  # Cambia la extensión si las imágenes no son jpg

    # Crear la carpeta de salida si no existe
    carpeta_salida.mkdir(exist_ok=True)

    # Iterar sobre los archivos y renombrarlos
    for i, archivo in enumerate(archivos, 1):
        # Crear el nuevo nombre de archivo con formato 001.jpg, 002.jpg, etc.
        nuevo_nombre = f"{i:03d}.webp"
        ruta_salida = carpeta_salida / nuevo_nombre

        # Renombrar el archivo
        os.rename(archivo, ruta_salida)

    print("Proceso completado.")

# Ruta de la carpeta de entrada
carpeta_entrada = Path("1/temp")

# Ruta de la carpeta de salida
carpeta_salida = Path("1/images_folder")

renombrar_imagenes(carpeta_entrada, carpeta_salida)
