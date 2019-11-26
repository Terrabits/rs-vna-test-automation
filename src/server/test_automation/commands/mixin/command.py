from instrument_server.command import CommandError
import re

class CommandMixin(object):
    def __init__(self):
        assert self.command, 'CommandMixin requires instrument_server.command.mixin.ParserMixin'

    def command_error(self, message, received_command=''):
        received_command =      received_command.strip()
        command_msg      = f' ({received_command})' if received_command else ''
        return CommandError(f"{self.command} error: {message}{command_msg}")
