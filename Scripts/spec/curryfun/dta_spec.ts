const { act, assert, cf, eq, t, f, $ } = require("../$tstConst.js")("$is")
const { map, ayCpy, spc, len, splitSpc } = cf
const tst = 't f thw'
const fun = `isN isS isF isB`
const funFor = `isNum isStr isFun isBool`
const dta = "b n s d f a o nul nan und"
const dta1 = dta1$(dta)
let dtaFor = "aNum aStr aFun aDte aAy aObj aNul aNan aUnd"

function dta1$(dta) {
    const ay = map(_ => dta)(splitSpc(dta))
    const genLin = i => {
        const o = ayCpy(ay)
        let itm;
        for (let j = 0; j < i; j++) {
            if (j === i) {
                o[j] = spc(len(ay[j]))
            }
            o.push(ay[j])
        }
        [].splice()
    }
}
console.log(dta1(dta))
