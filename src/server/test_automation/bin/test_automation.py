import argparse
import os
import instrument_server
import sys
from test_automation.config import config

def main():
    parser = argparse.ArgumentParser(description='TCP server for controlling multiple instruments via a simplified SCPI interface')
    parser.add_argument('--project',     '-o')
    parser.add_argument('--address',     '-a', type=str, default='0.0.0.0')
    parser.add_argument('--port',        '-p', type=int, default=None)
    parser.add_argument('--termination', '-t',           default='\n')
    parser.add_argument('--debug-mode',  '-d', action='store_true')
    args = parser.parse_args()
    args.termination = args.termination.encode()

    # add current path to python import paths
    sys.path.insert(0, os.getcwd())

    # server kwargs from args
    kwargs  = args.__dict__

    # permanent project?
    if args.project:
        project_filename = args.project
        config['plugins']['test_automation.commands.project.open_permanently']['filename'] = project_filename
    del(kwargs['project'])

    # address, port
    address = args.address
    port    = args.port
    del(kwargs['address'])
    del(kwargs['port'])

    # start server with kwargs
    instrument_server.run(address, port, config, **kwargs)

if __name__ == '__main__':
    main()
