from aiohttp import web

async def start_server(app, address='0.0.0.0', port=None):
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, address, port)
    await site.start()
    print(f'Starting {site.name}')
    async def on_close():
        await runner.cleanup()
    return on_close
