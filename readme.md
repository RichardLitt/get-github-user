# get-github-user [![Build Status](https://travis-ci.org/RichardLitt/get-github-user.svg?branch=master)](https://travis-ci.org/RichardLitt/get-github-user)

> Get GitHub user information from just a username


## Install

```
$ npm install --save get-github-user
```

You also need to get a GitHub application token: https://github.com/settings/tokens. Provide it in the CLI or set it as `$GITHUB_TOKEN` somewhere in your bash_profile.

## Usage

```js
const getGithubUser = require('get-github-user');

getGithubUser('RichardLitt');
//=> [{login: 'RichardLitt', ...}]
```

## API

### getGithubUser(input)

#### input

Type: `string` or `array`

The user or array of users you want user objects for.

#### token

Type: token

Send in your GitHub token.

#### endpoint

Type: `string`

Send in your GitHub Enterprise endpoint or rootURL.

## CLI

```
$ npm install --global get-github-user
```

```
$ get-github-user --help

  Usage
    $ get-github-user [input]

  Options
    -t, --token A token
    -e, --endpoint Change the GitHub endpoint

  Examples
    $ get-github-user RichardLitt
    [{ login: 'RichardLitt',  ... }]
    $ get-github-user RichardLitt jbenet
    [{...}, {...}]
```

## Contribute

Please do! Open an issue or a pull request if you see anything. 

## License

MIT © [Richard Littauer](http://burntfen.com)
