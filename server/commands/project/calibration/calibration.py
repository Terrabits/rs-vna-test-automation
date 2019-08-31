import math

def num_steps(ports, num_cal_unit_ports):
    num_ports = len(ports)
    return math.ceil((num_ports - 1) / (num_cal_unit_ports - 1))

# index: [0:num_steps)
def ports_for_step(ports, num_cal_unit_ports, index):
    # first port connection is constant
    # throughout auto cal
    first_port = ports[0]

    # take `index`th (num_cal_unit_ports - 1) ports
    step_size  = num_cal_unit_ports - 1
    start      = 1 + step_size * index
    stop       = start + step_size
    rest_ports = ports[start:stop]

    # return current step
    return [first_port, *rest_ports]

def port_map_for_step(ports, num_cal_unit_ports, index):
    step_ports     = ports_for_step(ports, num_cal_unit_ports, index)
    cal_unit_ports = list(range(1, num_cal_unit_ports + 1))
    port_map       = {}
    for vna_port, cal_unit_port in zip(step_ports, cal_unit_ports):
        port_map[vna_port] = cal_unit_port
    return port_map

def port_map_for_step_str(ports, num_cal_unit_ports, index):
    port_map   = port_map_for_step(ports, num_cal_unit_ports, index)
    zipped_map = zip(port_map.keys(), port_map.values())
    flattened_list = [i for pair in zipped_map for i in pair]
    return ",".join([str(i) for i in flattened_list])
