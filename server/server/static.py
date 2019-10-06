from aiohttp import web

# redirect / => /index.html
async def redirect_to_index(request):
    raise web.HTTPFound('/index.html')
