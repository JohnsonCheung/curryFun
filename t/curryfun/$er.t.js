const { $$, $, end, eq, t, f } = require("../$tstConst.js")(__filename)
const { splitSpc } = $$
const { renPrpNmAsCamel } = $

let act
const o = {}
const ay = splitSpc(`relAy relMap
chdItmSet parItmSet rootItmSet leafItmSet itmSet
tpnRelAy lvlRelAy evlRelAy`)
for(let i of ay) {
    o[i] = true
}
console.log(renPrpNmAsCamel(o))
debugger
