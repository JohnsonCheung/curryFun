const { $$, $, end, eq, t, f } = require("../$tstConst.js")(__filename)
const { getConst$lines, getConst$ny, srcFil } = $
const path = require('path')
const cf = require('curryfun')
const { tmpFilFm } = cf
if (false) {
    const src = getSrc()
    let act, exp
    exp = getExp1(); act = getConst$ny(src);;;; eq(act)(exp); end('getConst$ny')
    exp = getExp2(); act = getConst$lines(src); eq(act)(exp); end('getConst$lines')
}
if (true) {
    const fil = path.join(__dirname, "res", "a.js")
    const tf = tmpFilFm(fil)
    const a = srcFil(fil)
    console.log(a.$.oldStmt.val)
    debugger
    const o = (async () => {
        let { er1, ly1 } = await pcOldLy(tf)
        let { er2, ly2 } = await pmOldLy(tf)
        debugger
    })()
}
return
function getExp1() {
    return ["$ayOp", "$boolOp", "$ctor", "$er", "$ffn", "$funOp", "$is", "$minMax", "$numOp", "$obj", "$oyOp", "$pmFfn", "$prp", "$pth", "$split", "$src", "$strOp", "$tmp"]
}
function getExp2() {
    return `const $ = {
    $ayOp,
    $boolOp,
    $ctor,
    $er,
    $ffn,
    $funOp,
    $is,
    $minMax,
    $numOp,
    $obj,
    $oyOp,
    $pmFfn,
    $prp,
    $pth,
    $split,
    $src,
    $strOp,
    $tmp,
}`}
function getSrc() {
    return `const dmp = console.log
const stop = () => throws(new Error())
const er = (msg) => (...v) => {
    each(dmp)(v)
    stop()
}
const $er = { dmp, stop, er }
//-----------------------------------------------------------------------
const split = sep => s => s.split(sep)
const splitCrLf = split(/\r\n/)
const splitSpc = split(/\s+/)
const $split = { dmp, stop, er }
//-----------------------------------------------------------------------
const len = v => v && v.length
const midN = pos => n => s => s.substr(pos, n)
const mid = pos => s => s.substr(pos)
const left = n => s => s.substr(0, n)
const right = n => s => {
    if (!isNum(n)) return ''
    const l = len(s)
    if (n >= l) return s
    if (0 >= n) return ''
    return s.substr(-n)
}
const strAt = substr => s => s.indexOf(substr)
const revAt = substr => s => s.lastIndexOf(substr)
const brkAt = (at, len) => s => {
    const s1 = trim(left(at)(s))
    const s2 = trim(mid(at + len)(s))
    return { s1, s2 }
}
const brk1 = sep => s => { const at = strAt(sep)(s); at === -1 ? { s1: trim(s), s2: '' } : brkAt(at, len(sep))(s) }
const brk2 = sep => s => { const at = strAt(sep)(s); at === -1 ? { s1: '', s2: trim(s) } : brkAt(at, len(sep))(s) }
const brk = sep => s => { const at = strAt(sep)(s); return brkAt(at, len(sep))(s) }
const takBef = sep => s => revBrk2(sep)(s).s1
const takAft = sep => s => revBrk1(sep)(s).s2

const revBrk1 = sep => s => { const at = strAt(sep)(s); at === -1 ? { s1: trim(s), s2: '' } : brkAt(at, len(sep))(s) }
const revBrk2 = sep => s => { const at = strAt(sep)(s); at === -1 ? { s1: '', s2: trim(s) } : brkAt(at, len(sep))(s) }
const revBrk = sep => s => { const at = revAt(sep)(s); return brkAt(at, len(sep))(s) }
const revTakBef = sep => s => revBrk2(sep)(s).s1
const revTakAft = sep => s => revBrk1(sep)(s).s2
/**
* @description return string array from {strOrSy}.  If {strOrSy} is string, return splitSpc(.)
* @param {string|string[]} strOrSy 
* @@Sy string array
*/
const strOrSy2Sy = strOrSy => isStr(strOrSy) ? splitSpc(strOrSy) : strOrSy
const rmvFstChr = mid(1)
const rmvLasChr = s => left(len(s) - 1)(s)
const rmvSubStr = subStr => s => s.replace(new RegExp(s, 'g'), '')
const rmvColon = rmvSubStr(":")
const $strOp = {
    len, midN, mid, left, right,
    strAt, revAt,
    brkAt,
    brk, brk1, brk2,
    takBef, takAft,
    revBrk, revBrk1, revBrk2,
    revTakBef, revTakBef,
    strOrSy2Sy,
    rmvFstChr, rmvLasChr,
    rmvSubStr, rmvColon
}
//-----------------------------------------------------------------------
const pthSep = require('path').sep
const $pth = { pthSep }
//-----------------------------------------------------------------------
const ffnPth = ffn => { const at = strAtRev(pthSep)(ffn); return at === -1 ? "" : left(at + 1)(ffn) }
const ffnFn = ffn => { const at = strAtRev(pthSep)(ffn); return at === -1 ? ffn : mid(at + 1)(ffn) }
const ffnExt = ffn => { const at = strAtRev('.')(ffn); return at === -1 ? '' : mid(at)(ffn) }
const rmvExt = ffn => { const at = strAtRev('.')(ffn); return at === -1 ? ffn : left(at)(ffn) }
const ffnFnn = ffn => ffnFn(rmvExt(ffn))
const $ffn = { ffnPth, ffnFn, ffnExt, rmvExt, ffnFnn }
//-----------------------------------------------------------------------
const tmpNm = () => rmvColon(new Date().toJSON())
const tmpPth = require('os').tempdir + pthSep
const tmpFfn = (pfx, ext) => tmpPth + pfx + tmpNm() + ext
const tmpFt = tmpFfn("T", ".txt")
const $tmp = { tmpNm, tmpPth, tmpFfn, tmpFt }
//-----------------------------------------------------------------------
/**
 * @description return a Promise of {er,rslt} by calling f(...,p,cb), where cb is (er,rslt)=>{...}
 * it is usefully in creating a promise by any async f(...p,cb), assuming cb is (er,rslt)=>{...}
 * @param {(er,rslt)=>void} f 
 * @param {...any} p 
 * @see
 */
const pm = (f, ...p) => new Promise(rs => f(...p, (er, rslt) => rs({ er, rslt })))
//-----------------------------------------------------------------------
/**
 * @description return Promise of {er,lines} where lines is string of lines
 * @param {ffn} ffn 
 */
const pmFfn2lines = async (ffn) => { return { er, rslt: lines } = pm(fs.readFile, ffn) }
/**
 * @description return Promise of {er,ly} where ly is line array
 * @param {ffn} ffn 
 */
const pmFfn2ly = async (ffn) => {
    const { er, lines } = await pmFfn2lines(ffn)
    if (er) return Promise.catch({ er, undefined })
    const ly = splitCrLf(lines)
    return Promise.solve({ er: null, ly })
}
const $pmFfn = { pmFfn2lines, pmFfn2ly }
//-----------------------------------------------------------------------
const where = f => ay => { const o = []; for (let i of ay) if (f(i)) o.push(i); return o }
const map = f => ay => { const o = []; for (let i of ay) o.push(f(i)); return o }
const each = f => ay => { for (let i of ay) f(i) }
const fst = ay => hasLen(ay) ? ay[0] : undefined
const las = ay => hasLen(ay) ? ay[len(ay) - 1] : undefined
const $ayOp = { where, map, each, fst, las }
//---------------------------------------------------------------------------
/**
 * @description return the property value of object {o} by property path {pprPth}
 * @param {string} prpPth
 * @example
 * const a = {b: {c:{1}}
 * require('assert').equal(prp('b.c')(o), 1) 
 */
const prp = prpPth => o => {
    const ay = prpPth.split('.')
    let oo = o
    for (let i of ay) {
        oo = oo[i]
        if (oo === undefined || oo === null) return oo
    }
    return oo
}
const prpNy = o => Object.getOwnPropertyNames(o)
const hasPrp = prpNm => o => { try { return o[prpNm] !== undefined } catch (e) { return false } }
const hasLen = hasPrp('length')
const $prp = { prp, prpNy, hasPrp, hasLen }
//---------------------------------------------------
/**
 * @description return the constructor name of object (o) if any else return undefined
 * @param {object} o
 * @returns {string|null}
 */
const ctorNm = o => o && o.constructor && o.constructor.name
const isInstance = instance => o => o instanceof instance
/**
 * @description return true if object {o} has constructor name {nm} 
 * @param {string} nm 
 * @param {object} o
 */
const hasCtorNm = nm => o => ctorNm(o) === nm
/**
 * @description return true if given {o} is a string (having construction name === 'String')
 */
const $ctor = { ctorNm, isInstance, hasCtorNm }
//-----------------------------------------------------
const isStr = hasCtorNm("String")
/**
 * @description return true if given {o} is a string (having construction name === 'Number')
 */
const isNum = hasCtorNm("Number")
/**
 * @description return true if given {o} is a string (having construction name === 'Array')
 */
const isAy = hasCtorNm("Array")
/**
 * @description return true if given {o} is a string (having construction name === 'Object')
 */
const isObj = hasCtorNm("Object")
/**
 * @description return true if given {o} is a string (having construction name === 'Date')
 */
const isDte = hasCtorNm("Date")

/**
 * @description return true if given {o} is a string (having construction name === 'Function')
 */
const isFun = hasCtorNm("Function")
/**
 * @description return true if given {o} is a string (having construction name === 'Boolean')
 */
const isBool = hasCtorNm("Boolean")
const isNull = v => v === null
const isUndefined = v => v === undefined
const isNaN = v => v === NaN

const isEmpStr = v => v === ''
const isEmpAy = v => v === []
const isEmp = v => or(isNull, isUndefined, isEmpStr, isEmpAy)(v)

const musFun = must(isFun, 'Function')
const musNum = must(isNum, 'Number')
const musStr = must(isStr, 'String')
const musAy = must(isAy, 'Array')
const musObj = must(isObj, 'Object')
const musDte = must(isDte, 'Date')

const mnonEmp = mnon(isEmp, 'Empty')
const mnonEmpStr = mnon(isEmpStr, 'EmpStr')
const mnonEmpAy = mnon(isEmpAy, 'EmpAy')

const $is = {
    must, mnon,
    isFun, isStr, isNum, isDte, isBool,
    isNaN, isNull, isUndefined,
    isEmpStr, isEmpAy, isEmp,
    musFun, musNum, musStr, musAy, musDte,
    mnonEmp, mnonEmpStr, mnonEmpAy
}
//--------------------------------------------------------------------------------------------------------
/**
 * @description return (#dr) of properties of (#o) by given (#pthOrAy)
 * @param @pthOrSy String | String Array.  
 * If it is string, splitSpc will be used to split into string array each element is the property path of of (o).
 * @param @o Object to be scanned
 * @return @dr (data row) of property value of (#o)
 * @memberof obj
 * @example
 * sdfsdfdsf
 */
const obj2dr = pthOrSy => o => {
    const prpNy = strOrSy2Sy(pthOrSy)
    const oo = []
    for (let prpNm of prpNy) {
        const v = prp(prpNm)(o)
        oo.push(v)
    }
    return oo
}
/**
 * Bring up all {o} child object member up one level.  Throw exception if there is name conflict
 * assume all members of {o} are objects
 * @param {obj} o 
 * @example 
 * const $a = {a1:'a1',a2:'s2'}
 * const $b = {b1:'b1',b2:'b2'}
 * const o = {$a,$b}
 * bringUp(o)
 * eq(o,{$a,$b,a1,a2,b1,b2})
 * //-----------
 * $a.x = 1
 * $b.x = 2
 * thw(bringUp(o))
 */
const bringUp = o => {
    musObj(o)
    for (let i of prpNy(o)) {
        for (let nm of prpNy(i)) {
            if (hasPrp(nm)(o))
                er("{nm} exists in {o}", { nm, o })
            exports[nm] = $[i][nm]
        }
    }
}
const $obj = { bringUp, obj2dr }
// ----------------------------------------------
/**
 * @description return data row array (dry) by selecting object array (oy) by (pthOAy) 
 * @param {pthOrAy} pthOrAy 
 * @param {iter} oy
 * @returns {dry}
 */
const select = pthOrAy => oy => {
    const prpAy = map(prp)(strOrSy2Sy(pthOrAy))
    const o = []
    for (oo of oy) {
        const dr = []
        for (let prp of prpAy) {
            const v = prp(oo)
            dr.push(v)
        }
        o.push(dr)
    }
    return o
}
const $oyOp = { select, where }
//-------------------------------------
const pipe = v => (...f) => {
    let o = v
    for (let ff of f)
        o = ff(o)
    return o
}
const swap = f => a => b => f(b)(a)
const compose = (...f) => v => pipe(v)(...f)
const or = (...p) => v => {
    for (let pp of p)
        if (pp(i)) return true
    return false
}
const apply = o = f => f(o)
const not = p => v => !p(v)
const and = (...p) => v => {
    for (let pp of p)
        if (!pp(i)) return false
    return true
}
const $funOp = { not, and, or, swap, pipe, compose, apply }
//---------------------------------------
const bEQ = a => b => a === b
const bNE = a => b => a !== b
const bGT = a => n => n > a
const bLT = a => n => n < a
const bGE = a => n => n >= a
const bLE = a => n => n <= a
const bLIK = a => n => n > a
const bBET = a => n => n > a
const bNBET = (a, b) => n => !bBET(a, b)(n)
const bNLIK = lik => s => !bLIK(lik)(s)
const $boolOp = { bGT, bLT, bEQ, bNE, bGE, bLIK, bBET }
//---------------------------------------
const multiply = a => b => a * b
const divide = a => b => b / a
const add = a => b => a + b
const minus = a => b => b - a
const decr = minus(1)
const incr = add(1)
const isOdd = n => n % 2 === 1
const isEven = n => n % 2 === 0
const $numOp = { multiply, divide, add, minus, decr, incr }
// -------------------------------------------------------------
const ayMax = ay => {
    let o = fst(ay)
    for (i of ay)
        if (i > o)
            o = i
    return o
}
const ayMin = ay => {
    let o = fst(ay)
    for (i of ay)
        if (i < o)
            o = i
    return o
}
const min = (...v) => ayMin(v)
const max = (...v) => ayMax(v)
const $minMax = { min, max }
//---------------------------------------------------------------------------
/**
 * @param {string} src 
 */
const const$ny = src => {
    const ay = src.split(/^const $/)
    const o = []
    for (let i of ay) 
        o.push(i.replace(/(.*) = .*/, "$1"))
    return o
}
const $src = { const$ny }
//---------------------------------------------------------------------------
const $ = {
    $ayOp,
    $boolOp,
    $ctor,
    $er,
    $ffn,
    $funOp,
    $is,
    $minMax,
    $numOp,
    $obj,
    $oyOp,
    $pmFfn,
    $prp,
    $pth,
    $split,
    $strOp,
    $tmp,
}
const $$ = bringUp($)
module.exports = $$
`
}
