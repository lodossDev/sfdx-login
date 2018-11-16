sfdx-login
==========

[![Version](https://img.shields.io/npm/v/sfdx-login.svg)](https://npmjs.org/package/sfdx-login)
[![CircleCI](https://circleci.com/gh/Downloads/sfdx-login/tree/master.svg?style=shield)](https://circleci.com/gh/Downloads/sfdx-login/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/Downloads/sfdx-login?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-login/branch/master)
[![Codecov](https://codecov.io/gh/Downloads/sfdx-login/branch/master/graph/badge.svg)](https://codecov.io/gh/Downloads/sfdx-login)
[![Greenkeeper](https://badges.greenkeeper.io/Downloads/sfdx-login.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/Downloads/sfdx-login/badge.svg)](https://snyk.io/test/github/Downloads/sfdx-login)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-login.svg)](https://npmjs.org/package/sfdx-login)
[![License](https://img.shields.io/npm/l/sfdx-login.svg)](https://github.com/Downloads/sfdx-login/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
### Install from source

1. Install the SDFX CLI.

2. Clone the repository: `git clone git@github.com:lodossDev/sfdx-login.git`

3. (Yarn)Install npm modules: `yarn install`

4. Link the plugin: `sfdx plugins:link .`

### Install as plugin

1. Install plugin: `sfdx plugins:install sfdx-login`

<!-- usage -->
```sh-session
$ npm install -g sfdx-login
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfdx-login/0.0.0 darwin-x64 node-v8.12.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx force:auth:default:login`](#sfdx-forceauthdefaultlogin)

## `sfdx force:auth:default:login`

This command adds a simple login mechanism missing from sfdx, you must have a connected app configured.

```
USAGE
  $ sfdx force:auth:default:login

OPTIONS
  -c, --clientid=clientid                         (required) The connected app client id.
  -k, --secret=secret                             (required) The connected app secret key.
  -p, --password=password                         (required) Salesforce password+security token.

  -s, --server=server                             (required) [default: https://test.salesforce.com] The instance
                                                  endpoint i.e. loginUrl

  -u, --username=username                         (required) Salesforce username.

  --json                                          format output as json

  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLE
  $ sfdx force:auth:default:login --clientid=xxxxxxxxxxx 
                                            --secret=xxxxxxxxxxxx
                                            --username=lodoss118@saasforceltd.com 
                                            --password=xxxxxxxxxx
 
           Logged in as: lodoss118@saasforceltd.com (xxxxxxxxxxx)
           Organisation: SAASFORCE LTD (xxxxxxxxxxx)
```

_See code: [src/commands/force/auth/default/login.ts](https://github.com/lodossDev/sfdx-login/blob/v0.0.0/src/commands/force/auth/default/login.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
