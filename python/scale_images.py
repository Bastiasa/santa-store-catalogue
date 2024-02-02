from PIL import Image
import os

def escalar_imagenes(carpeta_entrada, carpeta_salida, escala_factor):
    # Asegúrate de que la carpeta de salida exista
    if not os.path.exists(carpeta_salida):
        os.makedirs(carpeta_salida)

    # Recorre todos los archivos en la carpeta de entrada
    for archivo in os.listdir(carpeta_entrada):
        ruta_entrada = os.path.join(carpeta_entrada, archivo)

        # Verifica si el archivo es una imagen
        if os.path.isfile(ruta_entrada) and archivo.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            # Abre la imagen y la escala
            imagen = Image.open(ruta_entrada)
            ancho, alto = imagen.size
            nuevo_ancho = int(ancho * escala_factor)
            nuevo_alto = int(alto * escala_factor)

            # Escala la imagen
            imagen_escala = imagen.resize((nuevo_ancho, nuevo_alto), Image.NEAREST)

            # Crea la ruta de salida y guarda la imagen escalada
            ruta_salida = os.path.join(carpeta_salida, archivo)
            imagen_escala.save(ruta_salida)
            print(f'Escala aplicada a {archivo} -> {ruta_salida}')

# Reemplaza 'carpeta_entrada', 'carpeta_salida' y 0.5 con tus valores reales
escalar_imagenes(input("Carpeta de entrada: "), input("Carpeta de salida: "), float(input("Nueva escala: ")))
