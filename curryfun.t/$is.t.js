const { act, assert, cf, eq, t, f, $ } = require("./$tstConst.js")("$is")
debugger
let tst = 't f thw'
let fun = `isN isS isF isB`                
let funFor = `isNum isStr isFun isBool`    
let dta = "b n s d f a o nul nan und"           
let dtaFor = "aNum aStr aFun aDte aAy aObj aNul aNan aUnd"
let dta1 = dta = cf.map(_=>dta)(cf.splitSpc(dta))
console.log(dta1(dta))
