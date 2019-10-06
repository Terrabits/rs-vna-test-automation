# https://asyncio.readthedocs.io/en/latest/tcp_echo.html
import asyncio
from   socket import AddressFamily

is_ipv4 = lambda i: i.family != AddressFamily.AF_INET6

def create_handler(instrument_server):
    async def handler(reader, writer):
        async def send_fn(data):
            writer.write(data)
        handler = instrument_server.new_connection()
        while True:
            data = await reader.read(1024)
            await handler.handle_read(data, send_fn)
        writer.close()
    return handler

async def start_server(instrument_server, ip_address='0.0.0.0', port=5025):
    handler = create_handler(instrument_server)
    server  = await asyncio.start_server(handler, ip_address, port)
    ipv4_sockets = list(filter(is_ipv4, server.sockets))
    if ipv4_sockets:
        address, port = ipv4_sockets[0].getsockname()
        print(f'Starting TCP socket {address}:{port}')
    async def on_close():
        server.close()
        await server.wait_closed()
    return on_close

#
# # Serve requests until Ctrl+C is pressed
# print('Serving on {}'.format(server.sockets[0].getsockname()))
# try:
#     loop.run_forever()
# except KeyboardInterrupt:
#     pass
#
# # Close the server
# server.close()
# loop.run_until_complete(server.wait_closed())
# loop.close()
