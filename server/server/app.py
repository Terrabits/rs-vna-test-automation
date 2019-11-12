from   .http       import start_server   as start_http_server
from   .static     import redirect_to_index
from   .tcp        import start_server   as start_tcp_server
from   .web_socket import create_handler as create_websocket_handler
from   aiohttp     import web
import asyncio
from   instrument_server import Server
from   pathlib     import Path
import sys
import test_automation

async def create_app(settings):
    # http, ws
    root_path      = Path(__file__).resolve().parent
    site_dev_path  = str(root_path.parent / 'site.dev')
    site_prod_path = str(root_path.parent / 'site.prod')
    site_path = str(site_dev_path if settings.serve_dev else site_prod_path)

    # open project permanently?
    if settings.project:
        project_filename = settings.project
        test_automation.config['plugins']['test_automation.commands.project.open_permanently']['filename'] = project_filename

    # instrument server
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
