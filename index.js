'use strict'

const Octokat = require('octokat')
const Promise = require('bluebird')
const isArray = require('is-array')

module.exports = function (users, opts) {
  opts = opts || {}
  // Because Octokat is different than gh-get, and I forget which I use
  if (!opts.endpoint && opts.rootURL) {
    opts.endpoint = opts.rootURL
  }

  var octo = new Octokat({
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

  function is404 (err) {
    return err.message.indexOf('Status: 404') !== -1
  }

  return Promise.map(users, function (user) {
    return octo.users(user).fetch()
      .then(null, (err) => {
        if (err.message.indexOf('Bad credentials') !== -1) {
          throw new Error(`Bad credentials.`)
        }
        if (is404(err)) {
          return {
            'user': user,
            'validUser': false
          }
        }
      })
  }).then((users) => {
    return users.filter(user => user && user.validUser !== false)
  }).catch((err) => {
    if (is404(err)) {
      return []
    }
    throw ('Could not get GitHub user', err)
  })
}
