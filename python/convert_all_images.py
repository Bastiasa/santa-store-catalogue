from PIL import Image
import os
import sys

def convertir_imagenes(carpeta_entrada, carpeta_salida, tipo_destino):
    # Asegúrate de que la carpeta de salida exista
    if not os.path.exists(carpeta_salida):
        os.makedirs(carpeta_salida)

    # Recorre todos los archivos en la carpeta de entrada
    for archivo in os.listdir(carpeta_entrada):
        ruta_entrada = os.path.join(carpeta_entrada, archivo)

        # Verifica si el archivo es una imagen
        if os.path.isfile(ruta_entrada) and archivo.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            # Crea la ruta de salida y verifica si ya es del tipo requerido
            ruta_salida = os.path.join(carpeta_salida, archivo)
            if not ruta_salida.lower().endswith(tipo_destino.lower()):
                # Abre la imagen y la guarda en el formato deseado
                imagen = Image.open(ruta_entrada)
                ruta_salida = os.path.join(carpeta_salida, os.path.splitext(archivo)[0] + '.' + tipo_destino)
                imagen.save(ruta_salida, tipo_destino.upper())
                print(f'Convertido: {archivo} -> {ruta_salida}')
            else:
                print(f'Ya es del tipo requerido: {archivo}')

# Reemplaza 'carpeta_entrada', 'carpeta_salida' y 'png' con tus valores reales
convertir_imagenes(sys.argv[1], sys.argv[2], sys.argv[3])
