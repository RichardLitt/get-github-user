import test from 'ava'
import fn from './'

test('Gets the right user date for a provided user', t => {
  return fn('RichardLitt').then(result => {
    t.is(result[0].login, 'RichardLitt')
  })
})

test('Returns an empty array for an invalid user', t => {
  return fn('wkjhfw9a987sya323jkbsd7822dfsa').then(result => {
    t.deepEqual(result, [])
  })
})

test('Returns only valid information for an array with one invalid user', t => {
  return fn(['wkjhfw9a987sya323jkbsd7822dfsa', 'RichardLitt']).then(result => {
    t.deepEqual(result[0].login, 'RichardLitt')
    t.deepEqual(result.length, 1)
  })
})

test('Returns all data for multiple users', t => {
  return fn(['RichardLitt', 'sindresorhus']).then(result => {
    t.is(result[0].login, 'RichardLitt')
    t.is(result[1].login, 'sindresorhus')
  })
})

test('Throws if there is a bad token', async t => {
  await t.throws(fn('OpenSourceDesign', { token: 'sfsafss' }), 'Bad credentials.')
})
