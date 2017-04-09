
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

 * See also: [windows.js](https://github.com/ksxatompackages/require-anywhere/blob/v2.0.2/windows.js)

Include all paths that match `${left}\${mid}\${right}` or `${left}\${right}`, where:

 * `${left}` is windows environment variable, one of: `%UserProfile%`, `%AppData%`, `%ProgramFiles%`, `%ProgramFiles(x86)%`, `%ProgramFiles(x64)%`, `%ProgramW6432%`, `%HomeDrive%`

 * `${mid}` is one of: `nodejs`, `nodejs\repl`, `npm`

 * `${right}` is one of: `atom-node-modules`, `atom-dev-node-modules`, `node_modules`, `.node_modules`, `.node_libraries`

#### In Linux, Mac OS

 * See also: [unix.js](https://github.com/ksxatompackages/require-anywhere/blob/v2.0.2/unix.js)

Include all paths that match `${left}/${right}`, where:

 * `${left}` is one of: `~`, `~/repl`, `/home`, `/home/repl`, `/usr/share`, `/`, `/nodejs`, `/node`

 * `${right}` is one of: `atom-node-modules`, `atom-dev-node-modules`, `node_modules`, `.node_modules`, `.node_libraries`

### Users can also add more paths by settings

Just go to Settings (<kbd>Ctrl+,</kbd>) → Packages → require-anywhere, then do something

You need to reload Atom to apply settings

## License

Copyright © 2016 Hoàng Văn Khải

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
