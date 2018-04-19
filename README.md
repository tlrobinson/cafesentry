# cafesentry

A simple tool for watching over your laptop in semi-trustworthy public places. It sends you messages (and webcam captures) when power or USB devices are unplugged (or plugged in).

Currently it supports macOS (tested on Sierra), but I'll accept PRs for other platforms. You can also write plugins for it and publish them in npm (see below).

**NOTE: Of course this doesn't guarantee your laptop won't be stolen, or that it can be recovered if it is. Use at your own risk. Don't be stupid.**

## Installation

```
yarn global add cafesentry
```

or

```
npm install -g cafesentry
```

## Usage

To try out `cafesentry` without locking your computer or sending alerts to iMessage:

```bash
cafesentry --init="" --alert="console"
```

Configure the iMessage phone number to send alerts to.

```bash
cafesentry --imessage.phone="+15558675309"
```

Change which initializations, triggers, and alerts are run:

```bash
cafesentry --init="" --trigger="power" --alert="console,imessage-photo"
```

All configuration can also be done in the `~/.cafesentry.conf` JSON file:

```json
{
  "init": ["lock"],
  "trigger": ["device", "power"],
  "alert": ["console", "imessage", "imessage-photo", "siren"],
  "imessage": {
    "phone": "+15558675309"
  }
}
```

After configuring, just run `cafesentry` when you step away from your computer, and hit ctrl-C when you return.

```bash
cafesentry
```

## Current Modules

### Check

* battery or AC power status
* USB devices plugged or unplugged

### Report

* console
* iMessage text
* iMessage photo from webcam
* siren

### Init

* lock

## Plugins

Plugins can be published on npm with names like `cafesentry-plugin-trigger-foo`, `cafesentry-plugin-alert-bar`, `cafesentry-plugin-init-baz`.

* Check: [power.js](https://github.com/tlrobinson/cafesentry/blob/master/trigger/power.js)
* Report: [console.js](https://github.com/tlrobinson/cafesentry/blob/master/alert/console.js)
* Init: [lock.js](https://github.com/tlrobinson/cafesentry/blob/master/init/lock.js)

## TODO / Ideas

* Init: prevent machine from sleeping
* Trigger: laptop lid closed
* Trigger: incorrect password attempt
* Alert: SMS and other push notifications
* Alert: play a loud alarm noise
* Alert: live stream webcam to YouTube/etc
* Window/Linux support

## LICENSE

Copyright 2018 Tom Robinson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Credit

submarine-diving-alarm-daniel_simon.mp3: CC BY 3.0, http://soundbible.com/ https://creativecommons.org/licenses/by/3.0/us/
