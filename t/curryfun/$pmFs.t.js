const { $$, $, end, eq, t, f } = require("../$tstConst.js")(__filename)
const { pmFfn2lines } = $
const path = require('path')
// pmFfn2lines always promise {er,lines}
let t2 = ({ er, lines }) => { t(!!er); eq(lines)(undefined) }
if (true) {
    const o = (async () => {
        const ffn = path.join(__dirname, "res", "a.txt")
        const { er, lines } = await pmFfn2lines(ffn)
        eq(er)(null)
        eq(lines)("file-a.txt\r\nline1\r\nline2\r\n")
        end('pmFfn2lines.  read Ok')
    })()
}
if (true) {
    const o = (async () => {
        const ffn = 'dsfsdf'
        const { er, lines } = await pmFfn2lines(ffn)
        t(!!er)
        eq(lines)(undefined)
        end('pmFfn2lines.  file not found')
    })()
}
