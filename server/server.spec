# -*- mode: python ; coding: utf-8 -*-

from pathlib import Path
root_path      = Path('.').resolve()
site_dev_path  = root_path / 'site.dev'
site_prod_path = root_path / 'site.prod'

block_cipher = None

a = Analysis(['__main__.py'],
             pathex=[str(root_path)],
             binaries=[],
             datas=[(str(site_dev_path),  'site.dev/' ),
                    (str(site_prod_path), 'site.prod/')],
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
          [],
          exclude_binaries=True,
          name='test-automation',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          console=True )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               upx_exclude=[],
               name='test-automation')
