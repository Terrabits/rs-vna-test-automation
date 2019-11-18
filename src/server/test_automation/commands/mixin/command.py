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
            raise self.command_error('Too few arguments', received_command)
        if len(values) > len(self._args):
            raise self.command_error('Too many arguments', received_command)

        args = {}
        for name, type, value in zip(self._args.keys(), self._args.values(), values):
            if type:
                try:
                    typed_value = type(value)
                except (TypeError, ValueError) as ex:
                    raise self.command_error(f"'{value}' is not a valid {type}", received_command)
                args[name] = typed_value
            else:
                # str
                if value.startswith('"') or value.startswith("'"):
                    value = value[1:]
                if value.endswith('"') or value.endswith("'"):
                    value = value[:-1]
                args[name] = value
        return args

    def command_error(self, message, received_command=''):
        received_command =      received_command.strip()
        command_msg      = f' ({received_command})' if received_command else ''
        return CommandError(f"{self.command} error: {message}{command_msg}")
