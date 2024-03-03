from os import path as p
import threading

from .utils import samplers


class Task:
    tensor_to_image = samplers.tensor_to_image

    def __init__(self, prompt, scale, rp, callback):
        self.prompt = prompt
        self.out_dir = p.join(rp, "temp/")
        self.progress = 0
        self.image = None
        self.finished = False
        self.thread = threading.Thread(target=samplers.txt2img,
                                       kwargs={"prompt": self.prompt, "percent_counter": self.progress,
                                               "cfg_scale": scale, "callback": callback})
        self.thread.start()

    def check(self):
        if not self.thread.is_alive():
            self.finished = True
