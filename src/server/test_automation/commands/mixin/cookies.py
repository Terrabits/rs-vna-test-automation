from instrument_server.command import CommandError

class CookiesMixin(object):
    def __init__(self, key, init_with=None):
        self.cookies_key = key
        if not 'cookies' in self.devices:
            self.devices['cookies'] = dict()
        if not key in self.devices['cookies']:
            self.devices['cookies'][key] = init_with
    @property
    def cookies(self):
        return self.devices['cookies'][self.cookies_key]
    @cookies.setter
    def cookies(self, value):
        self.devices['cookies'][self.cookies_key] = value
