const { $$, $, end, eq, t, f } = require("../$tstConst.js")(__filename)
const cf = require('../../curryfun.js')
const { tmpFilFm } = cf
const { pcFfn2lines} = $
const path = require('path')
const fs = require('fs')
const o = (async () => {
    const ffn = path.join(__dirname, "res", "a.txt")
    let tf = tmpFilFm(ffn) // tst file in tmp directory
    let linesC = await pcFfn2lines(ffn)
    let {er, lines} = linesC() // get the value from cache by calling: linesC()
    eq(er)(null)
    eq(lines)('file-a.txt\r\n\line1\r\nline2\r\n')
    let a = linesC()  // get the {er, lines}
    fs.unlinkSync(tf) // delete the tst file
    let b = linesC()  // get from cache is still availble
    eq(a)(b)          // a & b are actual same instance
    end('pcFfn2lines')
})()
