import aiohttp
from   aiohttp import web

def create_handler(instrument_server):
    async def handler(request):
        ws = web.WebSocketResponse()
        await ws.prepare(request)

        async def send_fn(data):
            await ws.send_bytes(data)
        handler = instrument_server.new_connection()
        async for msg in ws:
            if msg.type == aiohttp.WSMsgType.TEXT:
                await handler.handle_read(msg.data.encode(), send_fn)
            elif msg.type == aiohttp.WSMsgType.ERROR:
                print('ws connection closed with exception %s' %
                      ws.exception())
    return handler
