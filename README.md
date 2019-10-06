# R&S VNA Test Automation

## `server/`

### Build Requirements

- Python 3.6+
- See `server/requirements.txt`

### Use

To start the server:

```shell
instrument-server config.yaml
```

See `instrument-server --help` for more details on command-line options, such as address and port binding.

## `ui/`

### Build Requirements

- Node 10.15.3+
- See `ui/package.json`

### Use

To start the GUI in development mode:

```shell
cd path/to/test-automation/ui
npm start
```
