from   .http       import start_server   as start_http_server
from   .static     import redirect_to_index
from   .tcp        import start_server   as start_tcp_server
from   .web_socket import create_handler as create_websocket_handler
from   aiohttp     import web
import asyncio
from   pathlib     import Path
import sys
import test_automation

async def create_app(settings):
    # http, ws
    root_path         = Path(__file__).resolve().parent
    site_path         = str(root_path.parent / 'site')
    instrument_server = test_automation.new_server()

    on_close = []
    if not settings.http_only:
        # tcp
        address   = settings.tcp_address
        port      = settings.tcp_port
        close_tcp = await start_tcp_server(instrument_server, address, port)
        on_close.append(close_tcp)
    if not settings.tcp_only:
        # http
        address           = settings.http_address
        port              = settings.http_port
        websocket_handler = create_websocket_handler(instrument_server)
        app               = web.Application()
        app.add_routes([web.get   ('/',       redirect_to_index),
                        web.get   ('/socket', websocket_handler),
                        web.static('/',       str(site_path)   )])
        close_http   = await start_http_server(app, address, port)
        on_close.append(close_http)
    return on_close



# if __name__ == '__main__':
#     try:
#         loop = asyncio.get_event_loop()
#         loop.run_until_complete(main())
#         loop.run_forever()
#     except KeyboardInterrupt:
#         pass
#     sys.exit(0)
