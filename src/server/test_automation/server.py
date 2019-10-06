from .config           import config
from instrument_server import Server

def new_server(*args, **kwargs):
    return Server(config, *args, **kwargs)
