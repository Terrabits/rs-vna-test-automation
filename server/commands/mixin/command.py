from instrument_server.command import CommandError
import re

class CommandMixin(object):
    def __init__(self, command, args={}):
        self.command = command
        self._args    = args
    def is_match(self, received_command):
        regex = f'^{self.command}\\s*'.replace('?', r'\?').encode()
        return re.match(regex, received_command)
    def args(self, received_command):
        values = received_command.decode().strip().split()[1:]
        if len(values) < len(self._args):
            raise self.command_error('Too few arguments')
        if len(values) > len(self._args):
            raise self.command_error('Too many arguments')

        args = {}
        for name, type, value in zip(self._args.keys(), self._args.values(), values):
            if type:
                try:
                    typed_value = type(value)
                except (TypeError, ValueError) as ex:
                    raise self.command_error(f"'{value}' is not a valid {type}")
                args[name] = typed_value
            else:
                args[name] = value
        return args

    def command_error(self, message):
        return CommandError(f"{self.command} error: {message}")
