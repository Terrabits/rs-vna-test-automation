# -*- mode: python -*-
from pathlib import Path

root_path    = Path('.').resolve()
site_path    = root_path / 'site'

block_cipher = None

a = Analysis(['__main__.py'],
             pathex=[str(root_path)],
             binaries=[],
             datas=[(str(site_path),    'site/')],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          [],
          name='test-automation',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          runtime_tmpdir=None,
          console=True )
