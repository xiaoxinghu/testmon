## testmon

A test monitor.

[![Build Status](https://travis-ci.org/xiaoxinghu/testmon.svg?branch=master)](https://travis-ci.org/xiaoxinghu/testmon)

## Setup
Get the latest [node](https://nodejs.org/) and [mongodb](http://www.mongodb.org) on your machine.

To install:

```bash
npm install -g testmon
```

Start the service:

```bash
testmon serve
```

## CLI

The short version:

```bash
testmon -h
```

### Command Report

The bare bone report output in command line, or geeky report if you will.

```bash
testmon report
```

You also can apply filters on it.

### Import Test Results

An example:

```bash
testmon import -n mytest -t junit -d test/sample/junit.xml
```

Supported format:

- [x] junit
- [ ] nunit
- [ ] mocha
- [ ] allure

## Config

testmon config follows config file (rc file) convention. Places that tesmon will look for config files:

- `.testmonrc` file first found in `./`, `../`, `../../` etc
- `$HOME/.testmonrc`
- `$HOME/.testmon/config`
- `$HOME/.config/testmon`
- `/etc/testmonrc`
- `/etc/testmon/config`

Default value (yeah, it's JSON):

```JSON
{ "db": { "uri": "mongodb://localhost/", "name": "testmon" },
  "ui": "testmon-face.js",
  "remote": "localhost",
  "port": 3000 }
```

| key | meaning |
| --- | --- |
| db | mongodb connection info |
| ui | the javascript that the main page will try to load |
| remote | remote testmon server, used by CLI |
| port | remote testmon port, used by CLI |

## Filter

```bash
testmon report -q [query string]
# e.g.
testmon report -q tag:iPhone
```

Syntax for query string: `[filter]:[value]` or `[keyword]`
You can use multiple query strings in one query. Just separate them by spaces, like this:

```bash
# query for test runs with tag 'iOS' but without 'iPhone6'
testmon report -q "tag:iOS -tag:iPhone6"
```

When you have spaces in query string, put it in `""`.

Currently supported filter:

- [x] tag (with tag)
- [x] -tag (without tag)
- [ ] name (matched by keyword)
- [ ] time
- [ ] duration

## API

Look in folder `routes/api/`.

## Custom UI
