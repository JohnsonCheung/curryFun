const { $$, $, end, eq, t, f } = require("../$tstConst.js")(__filename)
let act
const tst = () => {
        const msgAy = map(tstCas)($casNy())
        wrtRslt(msgAy)
}
const tstCas = (casNm) => {
        const act = rel(relStrLines)
        const exp = 1
        const rsltMsg = wrtRslt(act, exp, casNm)
        return rsltMsg
}
tst()
const relStrLines = `
          `
const relStrLines2 = `
            a b c
            c d e f
            g h
            b f
            `
const relStrLines1 = `
            a b c
            c d 
            d a
            a x y`
console.log(rel(relStrLines))
}
