const assert = require("assert")
const path = require('path')
const eq = act => exp => assert.deepStrictEqual(act, exp)
const t = eq(true)
const f = eq(false)
const o = ffn => {
    const sep = path.sep
    let seg = ffn.split(sep)
    let mdNm = seg.pop()
    mdNm = mdNm.split('.')
    mdNm = mdNm[0]
    let srcFfn = seg.pop() + '.js' // the target fn
    seg.pop() // ignore seg-t
    seg.push(srcFfn)
    srcFfn = seg.join(sep)
    const $$ = require(srcFfn)
    const $ = $$[mdNm]
    const end = funNm => console.log(new Date().toString() + ` end of module[${mdNm}] fun[${funNm}]`)
    return { $$, $, end, eq, t, f }
}
module.exports = o
