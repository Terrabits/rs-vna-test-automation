# Commands

## VNA

| returns | name                | arg(s)        |
| ------- | ------------------- | ------------- |
| bool    | is_vna_connected?   |               |
|         | connect_to_vna      | address (str) |
|         | disconnect_from_vna |               |

## Projects

| returns | name             | arg(s)    |
| ------- | ---------------- | --------- |
| bool    | is_project_open? |           |
|         | open_project     | path(str) |
| str     | project_name?    |           |
| JSON    | read_project?    |           |
|         | close_project    |           |

### Calibration

| returns | name                      | arg(s)              |
| ------- | ------------------------- | ------------------- |
| csv     | cal_units?                |                     |
| csv     | cal_groups?               |                     |
| int     | calibration_steps?        |                     |
| JSON    | calibration_step?         | index(int)          |
|         | start_calibration         |                     |
| bool    | perform_calibration_step? | index(int)          |
| bool    | apply_calibration?        | cal_group_name(str) |

### Measurement

| returns         | name                      | arg(s)                              |
| --------------- | ------------------------- | ----------------------------------- |
| int             | measurement_steps?        |                                     |
| JSON            | measurement_step?         | index(int)                          |
| type_str, bytes | measurement_step_image?   | index(int)                          |
| None            | start_measurements_for    | serial_no(str), cal_group_name(str) |
| bool            | perform_measurement_step? | index(int)                          |
| bool            | save_measurements         | path(str)                           |
