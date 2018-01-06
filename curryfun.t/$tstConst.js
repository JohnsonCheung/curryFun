const assert = require("assert")
const curryfun = require('..\\curryfun.js')
const eq = act => exp => assert.deepStrictEqual(act, exp)
const t = eq(true)
const f = eq(false)
//const end = $ => () => console.log(new Date(), `end [${$}]`)
module.exports = ($) => {
    console.log(new Date().toString() + " [" + $ + "]")
    return { assert, curryfun,cf:curryfun, $: curryfun[$], eq, t, f }
}
// { return { assert, curryfun, $: curryfun[$], eq, t, f , end:end($)} }