import math
from typing import List

from PIL import Image, ImageDraw, ImageFilter
from flask_socketio import SocketIO

from src.task import Task


class Manager:
    def __init__(self, app, socketio: SocketIO):
        self.t = None
        self.tasks: List[Task] = []
        self.rp = app.root_path
        self.socketio = socketio

    def create_task(self, prompt, scale):
        if len(self.tasks) != 0:
            self.tasks[0].check()
            if self.tasks[0].finished:
                self.tasks.pop(0)
            return False
        t = Task(prompt, scale, self.rp, self.callback)
        self.tasks.append(t)

    def check(self):
        if len(self.tasks) == 0:
            return "EMPTY"
        self.tasks[0].check()
        if self.tasks[0].finished:
            self.tasks.remove(self.tasks[0])
            return {'state': "READY"}
        return {'state': "WAIT"}

    def callback(self, arg):
        if arg['i'] == 0:
            return
        progress = math.floor(arg['i'] / 34 * 100)
        self.tasks[0].progress = progress
        self.socketio.emit("percentage", broadcast=True)
        if arg['i'] == 34:
            self.socketio.emit("ready", broadcast=True)
        elif arg['i'] % 5 == 0:
            img = Task.tensor_to_image(arg['x'])
            self.tasks[0].image = img
            self.socketio.emit("image", broadcast=True)

    def get_image(self):
        img = self.tasks[0].image
        img1 = Image.new("RGB", img.size, (255, 255, 255))
        w, h = img.size
        mask_im = Image.new("L", img.size, 0)
        draw = ImageDraw.Draw(mask_im)
        draw.rectangle((40, 40, w - 40, h - 40), fill=255)
        mask_im_blur = mask_im.filter(ImageFilter.BoxBlur(80))
        img1.paste(img, (0, 0), mask=mask_im_blur)
        return img1

    def get_progress(self):
        return self.tasks[0].progress
