'use strict'

const Octokat = require('octokat')
const Promise = require('bluebird')
const isArray = require('is-array')
var octo

module.exports = function (users, opts) {
  opts = opts || {}
  // Because Octokat is different than gh-get, and I forget which I use
  if (!opts.endpoint && opts.rootURL) {
    opts.endpoint = opts.rootURL
  }

  octo = new Octokat({
    token: opts.token || process.env.GITHUB_TOKEN,
    rootURL: opts.endpoint
  })

  if (typeof users !== 'string') {
    if (!isArray(users)) {
      throw new TypeError('Expected a string or an array')
    }
  } else {
    users = [users]
  }

  return Promise.map(users, function (user) {
    return octo.users(user).fetch()
  }).then(function (users) {
    return users
  }).catch(function (err) {
    if (err.message.indexOf('Status: 404') !== -1) {
      return []
    } else {
      throw ('Could not get GitHub user', err)
    }
  })
}
