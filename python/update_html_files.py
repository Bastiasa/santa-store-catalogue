import os
from bs4 import BeautifulSoup
import html
import re

NEW_VERSION = input("Escriba la nueva versión: ")
tags_for_update = input("Enumere las etiquetas HTML a actualizar: ")

if tags_for_update.__len__() <= 0:
    tags_for_update = ["script", "img", "link"]
else:
    tags_for_update = tags_for_update.split(",")
    temp = []

    for i in tags_for_update.copy():
        temp.append(i.strip())
    
    tags_for_update = temp

def update_url(url, new_version):
    # Agregar el parámetro 'v' con la nueva versión a la URL
    if '?' in url:
        return re.sub(r'(\?|&)v=[^&]*', f'\\1v={new_version}', url)
    else:
        return f'{url}?v={new_version}'

def get_updated_html_content(content:str):
    global tags_for_update
    global NEW_VERSION

    soup = BeautifulSoup(content, "html.parser")

    tags = soup.find_all(tags_for_update)

    for tag in tags:
        if 'src' in tag.attrs:
            tag['src'] = update_url(tag['src'], NEW_VERSION)
        elif 'href' in tag.attrs:
            tag['href'] = update_url(tag['href'], NEW_VERSION)
    
    return html.unescape(str(soup))

def update_html_files(root:str):

    for filename in os.listdir(root):
        BASE = os.path.join(root, filename)

        if(os.path.isdir(BASE)):
            update_html_files(BASE)
            continue
        elif(os.path.isfile(BASE)):

            if(filename.endswith("html")):

                with open(BASE, "r", encoding="utf-8") as file:
                    content = file.read()
                    file.close()
                
                new_content = get_updated_html_content(content)

                with open(BASE, "w", encoding="utf-8") as file:
                    file.write(new_content)

update_html_files("./")