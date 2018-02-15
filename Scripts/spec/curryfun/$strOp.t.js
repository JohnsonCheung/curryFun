const { $$, $, end, eq, t, f } = require("../$tstConst.js")(__filename)
const { camelNy } = $$
const assert = require('assert')
let act 
act = camelNy('aaNy'); assert.deepStrictEqual(act, ['aa', 'Ny'])
act = camelNy('aaNyA'); assert.deepStrictEqual(act, ['aa', 'Ny','A'])
act = camelNy('aa NyA'); assert.deepStrictEqual(act, ['aa', 'Ny','A'])
act = camelNy('aaa'); assert.deepStrictEqual(act, ['aaa'])
end('camelNy')
