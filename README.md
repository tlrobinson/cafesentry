# cafesentry

A simple tool for watching over your laptop in public places. It sends you messages (and webcam captures) when power or USB devices are unplugged (or plugged in).

Currently it supports macOS (tested on Sierra), but I'll accept PRs for other platforms. You can also write plugins for it (see below).

**NOTE: Of course this doesn't guarantee your laptop won't be stolen, or that it can be recovered if it is. Use at your own risk. Don't be stupid.**

## Installation

```
yarn install cafesentry
```

or

```
yarn global add cafesentry
```

## Usage

To test `cafesentry` without locking your computer or sending alerts to iMessage:

```bash
cafesentry --init="" --alert="console"
```

Configure the iMessage phone number to send alerts to.

```bash
cafesentry --imessage.phone="+15558675309"
```

All configuration can also be done in the `~/.cafesentry.conf` JSON file:

```json
{
  "imessage": {
    "phone": "+15558675309"
  }
}
```

After configuring, just run `cafesentry` when you step away from your computer.

```bash
cafesentry
```

Change which initializations, triggers, and alerts are run:

```bash
cafesentry --init="" --trigger="power" --alert="console,imessage-photo"
```

## Current Modules

### Check

* battery or AC power status
* USB devices plugged or unplugged

### Report

* console
* iMessage text
* iMessage photo from webcam

### Init

* lock

## Plugins

Plugins can be published on npm with names like `cafesentry-plugin-trigger-foo`, `cafesentry-plugin-alert-bar`, `cafesentry-plugin-init-baz`.

* Check: [power.js](https://github.com/tlrobinson/cafesentry/blob/master/trigger/power.js)
* Report: [console.js](https://github.com/tlrobinson/cafesentry/blob/master/alert/console.js)
* Init: [lock.js](https://github.com/tlrobinson/cafesentry/blob/master/init/lock.js)

## TODO / Ideas

* Init: prevent machine from sleeping
* Check: laptop lid closed
* Check: incorrect password attempt
* Report: SMS and other push notifications
* Report: play a loud alarm noise
* Report: live stream webcam to YouTube/etc
* Window/Linux support
