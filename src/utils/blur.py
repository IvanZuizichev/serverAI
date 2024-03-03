import os
from os import path as p
from shutil import rmtree

from PIL import Image, ImageFilter


def blur(app):
    rmtree(p.join(app.root_path, "static/img/gallery/examples/blurred"))
    os.mkdir(p.join(app.root_path, "static/img/gallery/examples/blurred"))
    for elem in os.listdir(p.join(app.root_path, "static/img/gallery/examples/to_blur")):
        i = Image.open(p.join(app.root_path, "static/img/gallery/examples/to_blur", elem))
        bl = i.filter(ImageFilter.BoxBlur(5))
        bl.save(p.join(app.root_path, "static/img/gallery/examples/blurred", elem))
