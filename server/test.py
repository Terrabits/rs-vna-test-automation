from   pathlib import Path
from   rohdeschwarz.instruments.genericinstrument import GenericInstrument
import sys

projects_path      = Path('/Users/lalic/Documents/Node/test-automation/projects')
procedure_filename = str(projects_path / 'mfi-usba-lightning' / 'procedure.yaml')

instr = GenericInstrument()
instr.open_tcp('localhost', int(sys.argv[1]))

# connect to VNA
instr.write('connect_to_vna localhost')
assert instr.query('is_vna_connected?').strip() == 'True'

# open project
instr.write(f"open_project {procedure_filename}")
assert instr.query('is_project_open?').strip() == 'True'

# calibration info
print(f"cal units:  {instr.query('cal_units?')        .strip()}")
print(f"cal groups: {instr.query('cal_groups?')       .strip()}")
print(f"cal steps:  {instr.query('calibration_steps?').strip()}")

# # cal
# instr.timeout_ms = 5*60*1000
# instr.write('start_calibration')
# assert instr.query('perform_calibration_step? 0').strip() == 'True'
#
# # apply cal
# instr.query('apply_calibration? test_cal_group').strip() == 'True'

# measurements
print(f"measurement steps: {instr.query('measurement_steps?').strip()}")
instr.write('start_measurements_for cable123 test_cal_group')
assert instr.query('perform_measurement_step? 0').strip() == 'True'
assert instr.query('perform_measurement_step? 1').strip() == 'True'
