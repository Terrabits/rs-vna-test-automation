import argparse
import os
import instrument_server
import sys
from test_automation.config import config

def main():
    parser = argparse.ArgumentParser(description='TCP server for controlling multiple instruments via a simplified SCPI interface')
    parser.add_argument('--address',     '-a', type=str, default='0.0.0.0')
    parser.add_argument('--port',        '-p', type=int, default=None)
    parser.add_argument('--termination', '-t', type=str, default='\n')
    parser.add_argument('--debug-mode',  '-d', action='store_true')
    args = parser.parse_args()
    args.termination = args.termination.encode()

    sys.path.insert(0, os.getcwd())
    address = args.address
    port    = args.port
    kwargs  = args.__dict__
    del(kwargs['address'])
    del(kwargs['port'])
    instrument_server.run(address, port, config, **kwargs)

if __name__ == '__main__':
    main()
