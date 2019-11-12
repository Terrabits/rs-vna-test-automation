#!/usr/bin/env python
import argparse
import asyncio
from   server import create_app
import test_automation
import webbrowser

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="MFi USB-A to Lightning Cable tester")
    parser.add_argument('--open-browser', action="store_true")
    parser.add_argument('--project')
    parser.add_argument('--http-only',    action="store_true")
    parser.add_argument('--http-address', type=str, default="0.0.0.0")
    parser.add_argument('--http-port',    type=int, default=8080)
    parser.add_argument('--tcp-only',     action="store_true")
    parser.add_argument('--tcp-address',  type=str, default="0.0.0.0")
    parser.add_argument('--tcp-port',     type=int, default=5025)
    parser.add_argument('--serve-dev',    action="store_true")
    args = parser.parse_args()

    # http_only and tcp_only are mutually exclusive
    if args.http_only and args.tcp_only:
        print('Cannot use --http-only AND --tcp-only: flags conflict!')
        parser.print_help()
        sys.exit(1)

    # start server(s)
    loop = asyncio.get_event_loop()
    try:
        on_close = loop.run_until_complete(create_app(args))
        if not args.tcp_only and args.open_browser:
            webbrowser.open_new_tab(f'http://{args.http_address}:{args.http_port}')
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        for close in on_close:
            loop.run_until_complete(close)
    sys.exit(0)
