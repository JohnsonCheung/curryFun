const x = require("../../curryfun")
const { tmpFilFm, tmpPth, tmpFt, tmpNm } = x
if(Object.getOwnPropertyNames($).length!==4)
    x.er('aa')
const x = s => {
    const v = eval(s)
    console.log(s, v)
}
x('tmpNm()')
x('tmpPth')
x('tmpFt()')
const fs = require('fs')
const path = require('path')
const ffn = path.join(__dirname, "res", "a.txt")
let act = tmpFilFm(ffn)
const lines = fs.readFileSync(act).toString()
eq(lines)("file-a.txt\r\n\line1\r\nline2\r\n")
end("tmpFilNm")