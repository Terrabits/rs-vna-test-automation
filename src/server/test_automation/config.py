# explicitly import plugins
# as work-around for pyinstaller
from .pyinstaller_monkeypatch import nothing

# config
config = dict()

# plugins
config['plugins'] = {
'test_automation.commands.connection.connect':               {},
'test_automation.commands.connection.disconnect':            {},
'test_automation.commands.connection.is_connected':          {},
'test_automation.commands.project.close':                    {},
'test_automation.commands.project.is_open_permanently':      {},
'test_automation.commands.project.is_open':                  {},
'test_automation.commands.project.name':                     {},
'test_automation.commands.project.open_permanently':         {},
'test_automation.commands.project.open':                     {},
'test_automation.commands.project.read':                     {},
'test_automation.commands.project.version':                  {},
'test_automation.commands.project.calibration.apply':        {},
'test_automation.commands.project.calibration.cal_groups':   {},
# 'test_automation.commands.project.calibration.cal_unit_autodetect': {}
'test_automation.commands.project.calibration.cal_units':    {},
'test_automation.commands.project.calibration.perform_step': {},
'test_automation.commands.project.calibration.start':        {},
'test_automation.commands.project.calibration.step':         {},
'test_automation.commands.project.calibration.steps':        {},
'test_automation.commands.project.measurement.passed':       {},
'test_automation.commands.project.measurement.perform_step': {},
'test_automation.commands.project.measurement.save':         {},
'test_automation.commands.project.measurement.start':        {},
'test_automation.commands.project.measurement.step':         {},
'test_automation.commands.project.measurement.step_image':   {},
'test_automation.commands.project.measurement.steps':        {}
}

# devices
config['devices'] = {}

# Translation Commands

# preset
config['preset'] = [
    {'vna': "*RST"}
]

# clear_status
config['clear_status'] = [
    {'vna': "*CLS"}
]

# screen on|off
config['screen on'] = [
    {'vna': "SYST:DISP:UPD {on}"}
]

# local
config['local'] = [
    {'vna': "@LOC"}
]

# scpi_errors?
config['scpi_errors?'] = [
    {'vna': "SYST:ERR?"}
]

# service_function password function
config['service_function password function'] = [
    {'vna': "SYST:PASS      '{password}'"},
    {'vna': "DIAG:SERV:SFUN '{function}'"}
]
