
# require-anywhere

## Installation

### Using Atom

Just go to Settings (<kbd>Ctrl+,</kbd>) → Install, then search `require-anywhere`, and click Install

### Using apm

```bash
apm install require-anywhere
```

### Using git + apm + npm

```bash
git clone https://github.com/ksxatompackages/require-anywhere
apm link ./require-anywhere
apm develop require-anywhere ./require-anywhere
cd ./require-anywhere
npm install
```

## Features and Usage

 * Add external node module directories to `global.module.paths` to allow Atom users to `require` any node modules they want

### Some directories are added by default

#### In Windows

 * See also: [windows.js](https://github.com/ksxatompackages/require-anywhere/blob/v2.0.3/windows.js)

Include all paths that match `${left}\${mid}\${right}` or `${left}\${right}`, where:

 * `${left}` is windows environment variable, one of: `%UserProfile%`, `%AppData%`, `%ProgramFiles%`, `%ProgramFiles(x86)%`, `%ProgramFiles(x64)%`, `%ProgramW6432%`, `%HomeDrive%`

 * `${mid}` is one of: `nodejs`, `nodejs\repl`, `npm`

 * `${right}` is one of: `atom-node-modules`, `atom-dev-node-modules`, `node_modules`, `.node_modules`, `.node_libraries`

#### In Linux, Mac OS

 * See also: [unix.js](https://github.com/ksxatompackages/require-anywhere/blob/v2.0.3/unix.js)

Include all paths that match `${left}/${right}`, where:

 * `${left}` is one of: `~`, `~/repl`, `/home`, `/home/repl`, `/usr/share`, `/`, `/nodejs`, `/node`

 * `${right}` is one of: `atom-node-modules`, `atom-dev-node-modules`, `node_modules`, `.node_modules`, `.node_libraries`

### Users can also add more paths by settings

Just go to Settings (<kbd>Ctrl+,</kbd>) → Packages → require-anywhere, then do something

You need to reload Atom to apply settings

## License

[MIT License](https://github.com/ksxatompackages/require-anywhere/blob/license/LICENSE.md)
