
# require-anywhere

## Installation

```bash
apm install require-anywhere
```

## Features and Usage

 * Add external node module directories to `global.module.paths` to allow Atom users to `require` any node modules they want

### Some directories are added by default

#### In Windows

Include all paths that match `${left}\${mid}\${right}` or `${left}\${right}`, where:

 * `${left}` is windows environment variable, one of: `%UserProfile%`, `%AppData%`, `%ProgramFiles%`, `%ProgramFiles(x86)%`, `%ProgramFiles(x64)%`, `%ProgramW6432%`, `%HomeDrive%`

 * `${mid}` is one of: `nodejs`, `nodejs\repl`, `npm`

 * `${right}` is one of: `atom-node-modules`, `atom-dev-node-modules`, `node_modules`, `.node_modules`, `.node_libraries`

#### In Linux, Mac OS

Include all paths that match `${left}/${right}`, where:

 * `${left}` is one of: `~`, `~/repl`, `/home`, `/home/repl`, `/usr/share`, `/`, `/nodejs`, `/node`

 * `${right}` is one of: `atom-node-modules`, `atom-dev-node-modules`, `node_modules`, `.node_modules`, `.node_libraries`

### Users can also all more paths by settings

Just go to Settings (<kbd>Ctrl+,</kbd>) → Packages → require-anywhere, then do something
