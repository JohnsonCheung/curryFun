/**
 * @typedef {string} ffn
 */
const fs = require('fs')
const path = require('path')
const os = require('os')
/**
 * @typedef {string|RegExp} reOr
 * @typedef {string|string[]} syOr
 */
/**
* @description return string array from {syOr}.  If {syOr} is string, return splitSpc(syOr)
* @param {syOr} syOr 
* @@Sy string array
*/
const ensSy = syOr => isStr(syOr) ? splitSpc(syOr) : syOr
/**
 * @param {reOr} reOr
 */
const ensRe = reOr => isRegExp(reOr) ? reOr : new RegExp(reOr)
const $ensure = { ensSy, ensRe }
//----------------------------------
const dmp = console.log
const stop = () => throws(new Error())
const er = (msg) => (...v) => {
    console.log(`\n-- error[${msg}] ------------------------\n`)
    each(dmp)(v)
    if (isDbg)
        debugger
    else
        stop()
}
const isDbg = true
const $er = { dmp, stop, er, isDbg }
//-----------------------------------------------------------------------
const split = sep => s => s.split(sep)
const splitCrLf = split('\r\n')
const splitLf = split('\n')
const splitSpc = split(/\s+/)
const $strSplit = { split, splitCrLf, splitLf, splitSpc }
//-----------------------------------------------------------------------
const jn = sep => s => s.join(sep)
const jnCrLf = jn('\r\n')
const jnLf = jn('\n')
const jnSpc = jn(' ')
const jnComma = jn(',')
const jnCommaSpc = jn(', ')
const $strJn = { jn, jnCrLf, jnLf, jnSpc, jnComma, jnCommaSpc }
//-----------------------------------------------------------------------
const addPfx = pfx => s => pfx + s
const addSfx = sfx => s => s + sfx
const addPfxSfx = (pfx, sfx) => s => pfx + s + sfx

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
const $strOp = {
    addPfx, addSfx, addPfx, addSfx,
    len, midN, left, right, strAt, revAt
}
//-----------------------------------------------------------------------
const brkAt = (at, len) => s => {
    const s1 = trim(left(at)(s))
    const s2 = trim(mid(at + len)(s))
    return { s1, s2 }
}
const brk1 = sep => s => { const at = strAt(sep)(s); at === -1 ? { s1: trim(s), s2: '' } : brkAt(at, len(sep))(s) }
const brk2 = sep => s => { const at = strAt(sep)(s); at === -1 ? { s1: '', s2: trim(s) } : brkAt(at, len(sep))(s) }
const brk = sep => s => { const at = strAt(sep)(s); return brkAt(at, len(sep))(s) }
const $strBrk = { brkAt, brk1, brk2, brk }
//-----------------------------------------------------------------------
const takBef = sep => s => revBrk2(sep)(s).s1
const takAft = sep => s => revBrk1(sep)(s).s2
const $strTak = { takBef, takAft }
//-----------------------------------------------------------------------
const revBrk1 = sep => s => { const at = strAt(sep)(s); at === -1 ? { s1: trim(s), s2: '' } : brkAt(at, len(sep))(s) }
const revBrk2 = sep => s => { const at = strAt(sep)(s); at === -1 ? { s1: '', s2: trim(s) } : brkAt(at, len(sep))(s) }
const revBrk = sep => s => { const at = revAt(sep)(s); return brkAt(at, len(sep))(s) }
const revTakBef = sep => s => revBrk2(sep)(s).s1
const revTakAft = sep => s => revBrk1(sep)(s).s2
const $strRev = {
    revBrk, revBrk1, revBrk2,
    revTakBef, revTakBef,
}
//-----------------------------------------------------------------------
const rmvFstChr = mid(1)
const rmvLasChr = s => left(len(s) - 1)(s)
const rmvSubStr = subStr => s => {
    const re = new RegExp(subStr, 'g')
    const o = s.replace(re, '')
    return o
}
const rmvColon = rmvSubStr(":")
const $strRmv = { rmvFstChr, rmvLasChr, rmvSubStr, rmvColon }
//-----------------------------------------------------------
const pthSep = path.sep
const $fsPth = { pthSep }
//-----------------------------------------------------------------------
const ffnPth = ffn => { const at = revAt(pthSep)(ffn); return at === -1 ? "" : left(at + 1)(ffn) }
const ffnFn = ffn => { const at = revAt(pthSep)(ffn); return at === -1 ? ffn : mid(at + 1)(ffn) }
const ffnExt = ffn => { const at = revAt('.')(ffn); return at === -1 ? '' : mid(at)(ffn) }
const rmvExt = ffn => { const at = revAt('.')(ffn); return at === -1 ? ffn : left(at)(ffn) }
const ffnFnn = ffn => ffnFn(rmvExt(ffn))
const $fsFfn = { ffnPth, ffnFn, ffnExt, rmvExt, ffnFnn }
//-----------------------------------------------------------------------
const tmpNm = () => rmvColon(new Date().toJSON())
const tmpPth = os.tmpdir + pthSep
const tmpFfn = (pfx = "", ext) => tmpPth + pfx + tmpNm() + ext
const tmpFt = () => tmpFfn("T", ".txt")
/**
 * return a new temp file by copying {fm}
 * @param {ffn} fm
 */
const tmpFilFm = fm => {
    const o = tmpFfn(undefined, ffnExt(fm))
    fs.copyFileSync(fm, o)
    return o
}
const $fsTmp = { tmpNm, tmpPth, tmpFfn, tmpFt, tmpFilFm }
//-----------------------------------------------------------------------
/**
 * @description return a Promise of {er,rslt} by calling f(...,p,cb), where cb is (er,rslt)=>{...}
 * it is usefully in creating a promise by any async f(...p,cb), assuming cb is (er,rslt)=>{...}
 * @param {(er,rslt)=>void} f 
 * @param {...any} p 
 * @see
 */
const pm = (f, ...p) => new Promise(
    (rs, rj) => {
        f(...p, (er, rslt) => {
            // debugger
            rs({ er, rslt })
        })
    }
)
const $pm = { pm }
//-----------------------------------------------------------------------
/**
 * @description return Promise of {er,lines} where lines is string of lines
 * @param {ffn} ffn 
 */
const pmFfn2lines = async (ffn) => {
    const { er, rslt } = await pm(fs.readFile, ffn)
    let lines
    if (er)
        return { er, lines }
    lines = rslt.toString()
    return { er, lines }
}
/**
 * @description return Promise of {er,ly} where ly is line array
 * @param {ffn} ffn 
 */
const pmFfn2ly = async (ffn) => {
    const { er, lines } = await pmFfn2lines(ffn)
    if (er)
        return { er, undefined }
    const ly = splitCrLf(lines)
    return ({ er, ly })
}
const $pmFs = { pmFfn2lines, pmFfn2ly }
//-----------------------------------------------------------------------
const where = f => ay => { const o = []; for (let i of ay) if (f(i)) o.push(i); return o }
const map = f => ay => { const o = []; for (let i of ay) o.push(f(i)); return o }
const each = f => ay => { for (let i of ay) f(i) }
const fst = ay => hasLen(ay) ? ay[0] : undefined
const concat = (...v) => [].concat(...v)
const las = ay => hasLen(ay) ? ay[len(ay) - 1] : undefined
const ayAddPfxSfx = (pfx, sfx) => ay => map(addPfxSfx(pfx, sfx))(ay)
const ayAddPfx = pfx => ay => map(addPfx(pfx))(ay)
const ayAddSfx = sfx => ay => map(addSfx(pfx))(ay)
const ayClone = ay => map(s => s)(ay)
const $ayOp = {
    ayClone, where, map, each, fst, las, concat,
    ayAddPfxSfx, ayAddPfx, ayAddSfx
}
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
 * @description return true if given {o} is a string (having construction name === 'RegEx')
 */
const isRegExp = hasCtorNm("RegExp")
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

const must = (p, t) => v => { if (!p(v)) er(`given v must be [${t}]`, { v }) }
const mnon = (p, t) => v => { if (p(v)) er(`given v must be non-[${t}]`, { v }) }
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
    for (let chdNm in o) {
        const chd = o[chdNm]
        for (let chdMbrNm in chd) {
            if (hasPrp(chdMbrNm)(o))
                er("{chdMbrNm} of {chd} exists in {o}", { chdMbrNm, chd, o })
            o[chdMbrNm] = chd[chdMbrNm]
        }
    }
    return o
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
const vEQ = a => v => a === v
const vNE = a => v => a !== v
const vGT = a => v => v > a
const vIN = ay => v => { for (let i of ay) if (i === v) return true; return false }
const vNIN = ay => v => !vIN(ay)(v)
const vLT = a => v => v < a
const vGE = a => v => v >= a
const vLE = a => v => v <= a
const vBET = (a, b) => v => n > a
const vNBET = (a, b) => v => !vBET(a, b)(n)
const vMAT = re => v => ensRe(re).test(v)
const vNMAT = re => v => !vMAT(lik)(s)
const $boolOp = { vGT, vLT, vEQ, vNE, vGE, vIN, vNIN, vMAT, vNMAT, vBET, vNBET }
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
 * return a void => v function to obtain the given v
 */
const cache = v => () => v
const $cache = { cache }
//---------------------------------------------------------------------------
const pcFfn2lines = async (ffn) => {
    const { er, lines } = await pmFfn2lines(ffn)
    const o = cache({ er, lines })()
    return o
}
const $pcFs = { pcFfn2lines }
//---------------------------------------------------------------------------
const $ = {
    $pcFs,
    $cache,
    $ayOp,
    $boolOp,
    $ctor,
    $er,
    $fsFfn,
    $funOp,
    $is,
    $minMax,
    $numOp,
    $obj,
    $oyOp,
    $pm,
    $pmFs,
    $prp,
    $fsPth,
    $strSplit,
    $strOp,
    $fsTmp,
    $strRmv,
    $strRev,
    $strJn
}
module.exports = bringUp($)
