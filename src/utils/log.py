import logging


class Filter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        message = record.getMessage()
        if "/socket.io/?" in message:
            return False
        return True


def patch():
    log = logging.getLogger('werkzeug')
    log.addFilter(Filter())
