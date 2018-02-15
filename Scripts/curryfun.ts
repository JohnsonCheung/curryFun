/// <reference path="./typings/node/node.d.ts"/>
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import * as child_process from 'child_process'
import * as assert from 'assert'
export interface drs { dry:dry; fny:fny}
export interface s1s2 { s1: string, s2: string }
export interface erRslt { er: any, rslt: any }
export interface tf<T> { t: T[], f: T[] }
export interface ks { k: s, s: s }
export interface linShift { term: s, remainLin: s }
export interface quote { q1:s, q2:s}
export type match = RegExpMatchArray
export type lin = s
export type re = RegExp
export type n = number
export type ft = s
export type fn = s
export type b = boolean
export type dr = ay
export type dry = Array<dr>
export type lines = s
export type o = object
export type quoteStr = s
export type k = s
export type pfx = s
export type cml = s
export type nm = s
export type wdt = n
export type cnt = n
export type ix = n
export type s = string
export type pth = s

export type sdic = Map<s, s>
export type set = Set<any>
export type sset = Set<s>
export type bdic = Map<s,b>
export type ly = s[]
export type col = any[]
export type scol = s[]
export type sy = s[]
export type Sdry = s[][]
export type sPred =  pred<s>
export type pred<T> = (a: T) => b
export type ay = Array<any>
export type fny = nm[]
export type sdry = s[][]
export type sdr = s[]

export type opt<T> = T | null
export type fun<T> = (x: T) => any
export type Itr<T> = Iterable<T>
export type itr = Itr<any>
export type p = (a: any) => boolean
export type f = (a: any) => any
export type cummulator<T> = (cum: T) => (itm) => T
export type sOrRe = s | re
export type sOrSy = s | s[]

export type strOpt = string | null
export type doFun = () => void

export type _drsLines = (a:drs) => lines
export type _dryLines = (a:dry) => lines
export type _dryLy = (a:dry) => ly
export type _drySdry = (a:dry) => sdry
export type _aySy = (a:ay) => sy
export type _wdtAyLin = (a:wdt[]) => lin
export type _sdrLin = (w:wdt[]) => (a:sdr) => lin
export type _lySdic = (a:ly) => sdic
export type _linKs = (a:lin) => ks
export type _itrFold = <T>(f: cummulator<T>) => (cum: T) => (a: Itr<T>) => T
export type _oDry = (a:o) => dry
export type _itrTfmSet = (f:f) => (s:itr) => set
export type _itrItm = <T>(a: Itr<T>) => T | null
export type _itrPred = (a: itr) => b
export type _itrSet = (a:itr) => set
export type _matchAyDry =(a:RegExpMatchArray) => dry
export type _lyHasMajPfx = (pfx:s) => (a:ly) => b
export type _matchAyCol = (a:match[]) => scol
export type _matchFstItm = (a:match) => s
export type _itrAy = <T>(a:Itr<T>) => T[]
export type _linShift = (a: lin) => linShift
export type _lyPfxCnt = (pfx:s) => (a:ly) => cnt
export type _ffnDo =(a:s) => void
export type _optMap = <T>(f: fun<T>) => (a: opt<T>) => any
export type _itrSplit<T> = (p: pred<T>) => (a: Itr<T>) => tf<T>
export type _vMap = (f: f) => (a) => any
export type _fApply = <T>(v:T) => (f:(x:T)=>any) => any
export type _ksLin = (a:ks) => lin 
export type _sdicSy = (a: sdic) => sy
export type _nPadZero = (dig: n) => (a: n) => s
export type _er = (msg:s, ...v:any[]) => void
export type _vXPred = (x) => (a) => b
export type _tfm<T> = (a:T) => T
export type _sTfm = _tfm<s>
export type _sStrTfm = (s: s) => (a: s) => s
export type _sQuote = (q: quoteStr) => (a: s) => s
export type _sNTfm = (n: n) => (a: s) => s
export type _vLen = (a) => n
export type _sLen = (a: s) => n
export type _sMid = (pos: n) => (s: s) => s
export type _sMidN = (pos: n) => (n: n) => (s: s) => s
export type _sAlign = (w: n) => (a: s) => s
export type _predsPred = <T>(...a: ((v: T) => b)[]) => (v: T) => b
export type _oPrpNy = (a:o) => nm[]
export type _oPrp = (prpPth: s) => (a: o) => any
export type _oPrpAy = (prpNy: s[]) => (a: o) => any[]
export type _oHasPrp = (prpNm: nm) => (a: o) => b
export type _oCmlObj = (a: o) => o
export type _predTfm = <T>(a: pred<T>) => pred<T>
export type _sBrkAt = (at: n, len: n) => (a: s) => s1s2
export type _dryFunMdy = (f: f) => (a: dry) => void
export type _dryColMdy = (colIx: n) => (f: f) => (a: dry) => void
export type _dryTfm = (a: dry) => dry
export type _dryCellMdy = (f: f) => (a: dry) => void
export type _dryCnt = (a: dry) => cnt
export type _sdryWdtAy = (a: sdry) => wdt[]
export type _sdryWdt = (colIx: n) => (a: sdry) => wdt
export type _drySrt = (f: (a: dr) => s) => (a: dry) => void
export type _sPred = (lik: s) => (s: s) => b
export type _sSbsPred = (sbs: s) => (s: s) => b
export type _itrFind = <T>(p: pred<T>) => (a: Itr<T>) => T | null
export type _dryCol = (colIx: n) => (a: dry) => col
export type _ayMdyEle = <T>(ix: n) => (f: fun<T>) => (a: T[]) => void
export type _aySetEle = <T>(ix: n) => (v: T) => (a: T[]) => void
export type _itrSy = (a: itr) => s[]
export type _itrN = (a: itr) => n
export type _sitrN = (a:Itr<s>) => n
export type _lyMatchAy = (re: RegExp) => (a: ly) => RegExpMatchArray[]
export type _lyReCol = (re: re) => (ly: ly) => col
export type _lyReSdry = (re: re) => (ly: ly) => Sdry
export type _sDo = (a: s) => void
export type _cmdDo = (a: s) => void
export type _pipe = (v) => (...f: f[]) => any
export type _compose = (...f: f[]) => f 
export type _do = (a: doFun) => void
export type _halt = () => never
export type _mkStr = () => s
export type _Er = (msg: s, ...v: ay) => void
export type _lyStrOpt = (a: ly) => strOpt
export type _ftDo = (a: ft) => void
export type _vDft = <T>(dft: T) => (v: T | undefined | null) => T
export type _vDftRge = <T>(a: T, b: T) => (v: T | undefined | null) => T
export type _ayFindIx = (p: p) => (a: ay) => number | null
export type _ayFindIxDft = (dftIx: n) => (p: p) => (a: ay) => number
export type _ayItm = <T>(a: T[]) => T
export type _ayEle = <T>(ix: n) => (a: T[]) => T
export type _ayEleOrDft = <T>(dft: T) => (ix: n) => (a: T[]) => T
export type _ayMdy = (f: f) => (a: ay) => void
export type _sBrk = (sep: s) => (a: s) => s1s2
export type _sLik = (slik: s) => (a: s) => b
export type _sHasSbs = (sbs: s) => (a: s) => b
export type _sTak = (sep: s) => (s: s) => s
export type _ensSy = (sOrSy: sOrSy) => sy
export type _ensRe = (sOrRe: sOrRe) => re
export type _split<T> = (sep) => (a: T) => T[]
export type _sSplit = _split<s>
export type _ftWrt = (s: s) => (a: ft) => void
export type _vTee = <T>(f: (a: T) => void) => (a: T) => T
export type _vCmp = <T>(x: T) => (a: T) => b
export type _vBet = <T>(x: T, y: T) => (a: T) => b
export type _vIn = <T>(itr: Itr<T>) => (a: T) => b
export type _vCmpO = (o) => (v) => b
//---------------------------------------
export const strictEqual = require('assert').strictEqual
export const eq = (exp, act) => { try { strictEqual(act, exp) } catch (e) { debugger } }
//---------------------------------------
export const vLT: _vCmp = x => a => a < x
export const vGE: _vCmp = x => a => a >= x
export const vLE: _vCmp = x => a => a <= x
export const vEQ: _vCmp = x => a => a === x
export const vNE: _vCmp = x => a => a !== x
export const vGT: _vCmp = x => a => a > x
export const vIN: _vIn = itr => a => { for (let i of itr) if (i === a) return true; return false }
export const vNIN: _vIn = itr => a => !vIN(itr)(a)
export const vBET: _vBet = (x, y) => a => x <= a && a <= y
export const vNBET: _vBet = (x, y) => a => !vBET(x, y)(a)
export const vIsInstanceOf: _vXPred = x => a => a instanceof x
export const ensSy: _ensSy = a => typeof a === 'string' ? sSplitSpc(a) : a
export const ensRe: _ensRe = a => a instanceof RegExp ? a : new RegExp(a)
//-------------------------------------
export const pipe: _pipe = v => (...f) => { let o = v; for (let ff of f) o = ff(o); return o }
export const vMap: _vMap = f => a => f(a)
export const fApply:_fApply = v => f => f(v)
export const swap = (f: f) => a => b => f(b)(a)
export const compose:_compose = (...f: f[]) => v => pipe(v)(...f)
//----------------------------------
export const sdicSy: _sdicSy = a => itrMap(ksLin)(a)
export const ksLin: _ksLin = ({ k, s }: ks) => k + ' ' + s
export const dmp = global.console.log
export const funDmp: _do = f => dmp(f.toString())
export const halt: _halt = () => { throw new Error() }
export const sEscLf: _sTfm = a => a.replace('\n', '\\n')
export const sEscCr: _sTfm = a => a.replace('\r', '\\r')
export const sEscTab: _sTfm = a => a.replace('\t', '\\t')
export const sEsc: _sTfm = compose(sEscLf, sEscCr, sEscTab)
export const sBox: _sTfm = a => { const y = "== " + sEsc(a) + " ==", x = "=".repeat(a.length); return [x, y, x].join("\r\n") }
export const stack: _mkStr = () => { try { throw new Error() } catch (e) { return e.stack } }
export const er: _er = (msg: s, ...v) => {
    let a = stack()
    let b = a.split(/\n/)
    let c = b[3]
    let d = c.split(/\s+/)
    let breakingFunNm = d[2]
    let hdr = sBox(breakingFunNm)
    dmp(hdr)
    dmp(`error[${msg}] ------------------------\n`)
    itrEach(dmp)(v)
    dmp(a)
    dmp('------------------------------------------------')
    let dbg = true
    debugger
    if (dbg) halt()
}
//-----------------------------------------------------------------------
export const sSplit:_sSplit = (sep: sOrRe) => (a: s) => a.split(sep)
export const sSplitCrLf = sSplit('\r\n')
export const sSplitLf = sSplit('\n')
export const sSplitSpc = sSplit(/\s+/)
export const sSplitCommaSpc = sSplit(/,\s*/)
//-----------------------------------------------------------------------
export const vDft: _vDft = dft => a => a === null || a === undefined ? dft : a
export const vDftStr = vDft("")
export const vDftUpper: _vDftRge = (x, y) => a => a === null || a === undefined || x > a || a > y ? y : a
export const vDftLower: _vDftRge = (x, y) => a => a === null || a === undefined || x > a || a > y ? x : a
export const ayFindIx: _ayFindIx = p => a => { for (let i in a) if (p(a[i])) return Number(i); return null }
export const ayFindIxOrDft = dftIx => p => a => vDft(dftIx)(ayFindIx(p)(a))
export const ayFst: _ayItm = a => a[0]
export const aySnd: _ayItm = a => a[1]
export const ayEle: _ayEle = ix => a => a[ix]
export const ayEleOrDft: _ayEleOrDft = dft => ix => a => vDft(dft)(a[ix])
export const ayLas: _ayItm = a => a[vLen(a) - 1]
export const ayTfm: _ayMdy = f => a => { itrEach(i => a[i] = f(a[i]))(nItr(a.length)) }
export const aySetEle: _aySetEle = ix => v => a => a[ix] = v
export const ayTfmEle: _ayMdyEle = ix => f => a => a[ix] = f(a[ix])
//-----------------------------------------------------------------------
export const ayJn = (sep?: s) => (a: ay) => a.join(sep)
export const ayJnCrLf = ayJn('\r\n')
export const ayJnLf = ayJn('\n')
export const ayJnSpc = ayJn(' ')
export const ayJnComma = ayJn(',')
export const ayJnCommaSpc = ayJn(', ')
export const nSpc = (a: n) => ' '.repeat(a)
export const ayJnAsLines = (sep0?: s, tab0?: n, wdt0?: n) => (a: ay) => {
    let wdt = vDftUpper(20, 120)(wdt0)
    let sep = vDft('')(sep0)
    let slen = sep.length
    let pfx = nSpc(vDft(0)(tab0))
    let x = (() => {
        const oo: ay = []
        let o: ay = []
        let ww = 0
        for (let s of a) {
            let l = sLen(s) + slen
            if (ww + l > wdt) {
                oo.push(pfx + itrAddSfx(sep)(o).join(""))
                o = []
                ww = 0
            }
            o.push(s)
            ww += l
        }
        if (o.length > 0) {
            oo.push(pfx + itrAddSfx(sep)(o).join(""))
        }
        return oo
    })()
    let b = ayJnCrLf(x)
    return b
}
//-----------------------------------------------------------------------
export const sFstChr: _sTfm = a => a[0]
export const sLasChr: _sTfm = a => a[a.length - 1]
export const sAddPfx = (pfx: s) => (a: s) => pfx + a
export const sAddSfx = (sfx: s) => a => a + sfx
export const sAddPfxSfx = (pfx: s, sfx: s) => (a: s) => pfx + a + sfx
export const vLen: _vLen = a => typeof a === 'string' ? a.length : ((a && a.length) || String(a).length)
export const sLen: _sLen = a => a.length
export const sMidN: _sMidN = (pos: n) => (n: n) => (a: s) => a.substr(pos, n)
export const sMid: _sMid = (pos: n) => (a: s) => a.substr(pos)
export const sLeft: _sNTfm = (n: n) => (a: s) => a.substr(0, n)
export const sTrim: _sTfm = (a: s) => a.trim()
export const sRight: _sNTfm = (n: n) => (a: s) => {
    const l = vLen(a)
    if (n >= l) return a
    if (0 >= n) return ''
    return a.substr(-n)
}
export const nPadZero:_nPadZero = dig => n => {
    const s = String(n)
    const nZer = dig - s.length
    const z = nZer > 0 ? "0".repeat(nZer) : ""
    return z + s
}
export const sAlignL:_sAlign = w => a => {
    if(a===null||a===undefined) return nSpc(w)
    const l = vLen(a)
    if (l > w) return a
    return a + nSpc(w - l)
}
export const sAlignR: _sAlign = w => a => {
    const l = sLen(a)
    if (l > w) return a
    return nSpc(w - l) + a
}
export const sWrt = ft => a => fs.writeFileSync(ft, a)
export const sSbsPos = (sbs: s) => (a: s) => a.indexOf(sbs)
//strictEqual(sbsPos('aabb')('123aabb'),3)
export const sSbsRevPos = (sbs: s) => (a: s) => a.lastIndexOf(sbs)
//strictEqual(sbsRevPos('a')('0123aabb'),5)
export const cmlNm = (a: cml) => cmlNy(a).reverse().join(' ') // @eg cmlNm(relItmNy) === 'Ny Itm rel'
export const cmlNy = (a: cml) => {
    const o: s[] = []
    if (a.trim() === '')
        return o
    let j = 0
    let brk = true
    while (!brk) {
        if (j++ > 100) { debugger; throw null }
        const i = pseg()
        if (i === '')
            return o
        o.push(i.trim())
    }
    return o
    function pseg() {
        let o = pchr()
        let j = 0
        while (a.length > 0) {
            if (j++ > 100) { debugger; throw null }
            if (/^[A-Z]/.test(a))
                return o
            o += pchr()
        }
        return o
    }
    function pchr() {
        if (a === '')
            return ''
        const o = a[0]
        a = sRmvFstChr(a)
        return o
    }
}
export const sHasPfx = (pfx: s) => (a: s) => a.startsWith(pfx)
export const sRmvPfx = (pfx: s) => (a: s) => sHasPfx(a) ? a.substr(pfx.length) : a
export const sHasSfx = (sfx: s) => (a: s) => a.endsWith(sfx)
export const sRmvSfx = (sfx: s) => (a: s) => sHasSfx(a) ? a.substr(0, a.length - sfx.length) : a
export const sMatch = (re:re) => (a:s) => a.match(re)
//-----------------------------------------------------------------------
export const predNot:_predTfm = a => v => !a(v)
export const predsOr: _predsPred = (...a) => v => { for (let p of a) if (p(v)) return true; return false }
export const predsAnd: _predsPred = (...a) => v => { for (let p of a) if (!p(v)) return false; return true }
//-----------------------------------------------------------------------
export const isRmkLin: sPred = lin => {
    const l = lin.trim()
    if (l === "") return true
    if (sHasPfx("--")(l)) return true
    return false
}
export const isNonRmkLin: sPred = predNot(isRmkLin)
export const linRmvMsg: _sTfm = lin => {
    const a = lin.match(/(.*)---/)
    const b = a === null ? lin : a[1]
    if (sHasPfx("^")(b.trimLeft())) return ""
    return b
}
export type _quoteStrBrk = (a:quoteStr) => quote
//------------------------------------------------------------------
export const sBrkAt: _sBrkAt = (at, len) => s => { return { s1: sLeft(at)(s).trim(), s2: sMid(at + len)(s).trim() } }
export const sBrk1: _sBrk = sep => s => { const at = sSbsPos(sep)(s); return at === -1 ? { s1: sTrim(s), s2: '' } : sBrkAt(at, sLen(sep))(s) }
export const sBrk2: _sBrk = sep => s => { const at = sSbsPos(sep)(s); return at === -1 ? { s1: '', s2: sTrim(s) } : sBrkAt(at, sLen(sep))(s) }
export const sBrk: _sBrk = sep => s => { const at = sSbsPos(sep)(s); return sBrkAt(at, sLen(sep))(s) }
export const quoteStrBrk:_quoteStrBrk = a => {
    const l = a.length
    if (l === 1) return { q1: a, q2: a }
    if (l === 2) return { q1: a.substr(0, 1), q2: a.substr(1) }
    let p = sSbsPos("*")(a)
    if (p === -1) return {q1:"", q2:""}
    let { s1: q1, s2: q2 } = sBrkAt(p, 1)(a)
    return { q1, q2 }
}
export const sQuote: _sQuote = q => s => {
    let a = quoteStrBrk(q);
    if (a === null) return s; else { let { q1, q2 } = a; return q1 + s + q2 };
}
//-----------------------------------------------------------------------
export const sTakBef: _sTak = sep => a => sRevBrk2(sep)(a).s1
export const sTakAft: _sTak = sep => a => sRevBrk1(sep)(a).s2
//-----------------------------------------------------------------------
export const sRevBrk1: _sBrk = sep => a => { const at = sSbsPos(sep)(a); return at === -1 ? { s1: a.trim(), s2: '' } : sBrkAt(at, sep.length)(a) }
export const sRevBrk2: _sBrk = sep => a => { const at = sSbsPos(sep)(a); return at === -1 ? { s1: '', s2: a.trim() } : sBrkAt(at, sep.length)(a) }
export const sRevBrk: _sBrk = sep => a => { const at = sSbsRevPos(sep)(a); return sBrkAt(at, sep.length)(a) }
export const sRevTakBef: _sTak = sep => a => sRevBrk2(sep)(a).s1
export const sRevTakAft: _sTak = sep => a => sRevBrk1(sep)(a).s2
//-----------------------------------------------------------------------
export const sRmvFstChr: _sTfm = sMid(1)
export const sRmvLasChr:_sTfm = a => sLeft(a.length - 1)(a)
export const sRmvLasNChr:_sNTfm = n => a => sLeft(a.length - n)(a)
export const sRmvSubStr:_sStrTfm = sbs => a => { const re = new RegExp(sbs, 'g'); return a.replace(re, '') }
export const sRmvColon = sRmvSubStr(":")
export const pthsep = path.sep
export const ffnPth: _sTfm = a => { const at = a.lastIndexOf(pthsep); return at === -1 ? '' : sLeft(at + 1)(a) }
export const ffnFn: _sTfm = a => { const at = a.lastIndexOf(pthsep); return at === -1 ? a : sMid(at + 1)(a) }
export const ffnExt: _sTfm = a => { const at = a.lastIndexOf('.'); return at === -1 ? '' : sMid(at)(a) }
export const ffnAddFnSfx: _sStrTfm = sfx => a => ffnFfnn(a) + sfx + ffnExt(a)
export const ffnRmvExt: _sTfm = a => { const at = a.indexOf('.'); return at === -1 ? a : sLeft(at)(a) }
export const ffnFfnn = ffnRmvExt
export const ffnFnn: _sTfm = a => ffnFn(ffnRmvExt(a))
export const ffnRplExt: _sStrTfm = ext => a => ffnRmvExt(a) + ext
//-----------------------------------------------------------------------
export const ftLines:_sTfm = a => (fs.readFileSync(a).toString())
export const ftLy = (ft: s) => sSplitCrLf(ftLines(ft))

//-----------------------------------------------------------------------
export const tmpnm = () => sRmvColon(new Date().toJSON())
export const tmppth = os.tmpdir + pthsep
export const tmpffn = (pfx = "", ext) => tmppth + pfx + tmpnm() + ext
export const tmpft = () => tmpffn("T", ".txt")
export const tmpjson = () => tmpffn("T", ".json")
export const ffnTmp:_sTfm = a => {
    const o = tmpffn(undefined, ffnExt(a))
    fs.copyFileSync(a, o)
    return o
}
//-----------------------------------------------------------------------
export const pm = <T>(f, ...p) => new Promise<T>(
    /**
     * @description return a Promise of {er,rslt} by calling f(...,p,cb), where cb is (er,rslt)=>{...}
     * it is usefully in creating a promise by any async f(...p,cb), assuming cb is (er,rslt)=>{...}
     * @param {(er,rslt)=>void} f 
     * @param {...any} p 
     * @see
     */
    (rs, rj) => {
        f(...p, (e, rslt) => {
            e ? rj(e) : rs(rslt)
        })
    }
)
export const ftLinesPm = (a: ft) => pm(fs.readFile, a).then(rslt => rslt.toString())
export const ftLyPm = (a: ft) => ftLinesPm(a).then(lines => sSplitCrLf(lines))
export const pthEns = (a: pth) => { if (!fs.existsSync(a)) fs.mkdirSync(a) }
export const isPthExist = (a: pth) => fs.existsSync(a)
export const assertIsPthExist = (a: pth) => { if (!isPthExist(a)) er(`path does not exist [${a}]`) }
export const pthEnsSfxSep = (a: pth) => sLasChr(a) === pthsep ? a : a + pthsep
export const pthEnsSubFdr = (subFdr: s) => (a: pth) => {
    assertIsPthExist(a)
    let b = subFdr.split(/[\\\/]/)
    let c = itrRmvEmp(b)
    let d = pthEnsSfxSep(a)
    let e: ay = []
    for (let seg of c) {
        d += seg + '\\';
        e.push(d)
    }
    itrEach(pthEns)(e)
}
//-----------------------------------------------------------------------
export const itrWhere = (p: p) => (a: itr) => { const o: ay = []; for (let i of a) if (p(i)) o.push(i); return o }
export const itrExclude = (p: p) => (a: itr) => { const o: ay = []; for (let i of a) if (!p(i)) o.push(i); return o }
export const itrMap = (f: f) => (a: itr) => { const o: ay = []; for (let i of a) o.push(f(i)); return o }
export const itrEach = (f: f) => (a: itr) => { for (let i of a) f(i) }
export const itrFold = _itrFold => f => cum => a => { for (let i of a) cum = f(cum)(i); return cum }
export const itrReduce = f => (a: itr) => itrFold(f)(itrFst(a))(a)
//---------------------------------------------------------------------------
export type map = Map<any, any>
export type _mapSet = (a: map) => set
export type _mapAy = (a: map) => ay
export type _itrAddPfxSfx = (pfx: s, sfx: s) => (a) => s[]
export const mapKy: _mapAy = a => itrAy(a.keys())
export const mapVy: _mapAy = a => itrAy(a.values())
export const mapKvy: _mapAy = a => itrAy(a.entries())
export const mapKset: _mapSet = a => new Set(a.keys())
//---------------------------------------------------------------------------
export const setAy = set => { const o: ay = []; for (let i of set) o.push(i); return o }
export const setWhere = p => set => {
    const z = new Set
    for (let i of set)
        if (p(i))
            z.add(i)
    return z
}
export const setAdd = x => set => { for (let i of x) set.add(i); return set }
export const setMinus = x => set => { for (let i of x) set.delete(i); return set }
const _setAft = (incl, a, set) => {
    const z = new Set
    let found = false
    for (let i of set)
        if (found)
            z.add(i)
        else {
            if (a === i) {
                found = true
                if (incl)
                    z.add(a)
            }
        }
    return z
}
const linShift: _linShift = lin => {
    const a = lin.trim()
    const b = a.match(/(\S*)\s*(.*)/)
    const o =
        b === null
            ? { term: "", remainLin: "" }
            : { term: a[1], remainLin: a[2] }
    return o
}
export const setAft = aft => a => _setAft(false, aft, a)
export const setAftIncl = a => set => _setAft(true, a, set)
export const setClone = set => itrSet(set)
export const itrSet = itr => { const o = new Set; for (let i of itr) o.add(i); return o }
export const itrTfmSet:_itrTfmSet = f => a => { const o = new Set; for (let i of a) o.add(f(i)); return o }
//---------------------------------------------------------------------------
export const empSdic =() => new Map<s,s>()
export type _linSetSdic = (sdic:sdic) => (a:lin) => void
export const linSetSdic:_linSetSdic = sdic => a => { let { k, s } = linKs(a); sdic.set(k, s) }
export const linKs:_linKs = a => { let {term:k,remainLin:s} = linShift(a); return {k,s}}
export const lySdic: _lySdic = a => { const o = empSdic(); itrEach(linSetSdic(o))(a); return o }
export const lyReDry: _lyReSdry = re => a => itrMap(matchDr)(lyMatchAy(re)(a))
export const lyReCol: _lyReCol = re => a => matchAyFstCol(lyMatchAy(re)(a)).sort()
export const matchAyDry:_matchAyDry = a => itrMap(matchDr)(a)
export const matchFstItm:_matchFstItm = a => a[1]
export const matchAyFstCol:_matchAyCol = a => itrMap(matchFstItm)(a)
export const lyPfxCnt: _lyPfxCnt = pfx => a => { let o = 0; itrEach(lin => { if (sHasPfx(pfx)(lin)) o++ })(a); return o }
export const lyHasMajPfx: _lyHasMajPfx = pfx => a => a.length >= 2 * lyPfxCnt(pfx)(a)
export const lyMatchAy: _lyMatchAy = re => a => itrRmvEmp(itrMap(sMatch(re))(a))
export const matchDr = (a: match) => [...a].splice(1)
export const lyConstNy:_tfm<ly> = lyReCol(/^const\s+([\$\w][\$0-9\w_]*)[\:\= ]/)
export const lyConstDollarNy:_tfm<ly> = lyReCol(/^export const (\$[\$0-9\w_]*)[\:\= ]/)
export const ftConstNy = a => pipe(a)(ftLy, lyConstNy)
export const ftConstDollarNy = a => pipe(a)(ftLy, lyConstDollarNy)
//---------------------------------------------------------------------------
export const isStr = v => typeof v === 'string'
export const isNum = v => typeof v === 'number'
export const isBool = v => typeof v === 'boolean'
export const isObj = v => typeof v === 'object'
export const isSy = v => {
    if (!isAy(v)) return false
    if (isEmp(v)) return true
    return isStr(v[0])
}
export const isAy = Array.isArray
export const isDte = vIsInstanceOf(Date)
export const isFun = vIsInstanceOf(Function)
export const isRe = v => vIsInstanceOf(RegExp)
export const isNonNull = v => v !== null
export const isNull = v => v === null
export const isUndefined = v => v === undefined
export const isTrue = v => !!v;
export const isFalse = v => !v;
export const isEmp = v => v ? false : true
export const isNonEmp = v => v ? true : false
export const isOdd = n => n % 2 === 1
export const isEven = n => n % 2 === 0
//----------------------------------------------------------------------------
export const sSearch = (re: RegExp) => (a: s) => a.search(re)
export const sBrkP123 = (quoteStr: quoteStr) => (a: s) => {
    const { q1, q2 } = quoteStrBrk(quoteStr)
    if (q1 === "" || q2 === "") return null
    const l = a.length
    const q1pos = a.indexOf(q1);
    const q2pos = a.indexOf(q2, q1pos + 1);
    const len1 = q1pos
    const pos2 = q1pos + q1.length
    const pos3 = q2pos + q2.length
    const len2 = pos3 - pos2 - 1
    const p1 = a.substr(0, len1)
    const p2 = a.substr(pos2, len2)
    const p3 = a.substr(pos3)
    return { p1, p2, p3 }
}
//let a = sBrkP123("(backup-*)")("slkdfjlsdjf(backup-123).exe");debugger
//----------------------------------------------------------------------------
export const itrIsAllTrue = (a: itr) => { for (let i of a) if (isFalse(i)) return false; return true }
export const itrIsAllFalse = (a: itr) => { for (let i of a) if (isTrue(i)) return false; return true }
export const itrIsSomeTrue = (a: itr) => { for (let i of a) if (isTrue(i)) return true; return false }
export const itrIsSomeFalse = (a: itr) => { for (let i of a) if (isFalse(i)) return true; return false }
export const itrPredIsAllTrue = (p: p) => (a: itr) => { for (let i of a) if (!p(i)) return false; return true }
export const itrPredIsAllFalse = (p: p) => (a: itr) => { for (let i of a) if (p(i)) return false; return true }
export const itrPredIsSomeFalse = (p: p) => (a: itr) => { for (let i of a) if (!p(i)) return true; return false }
export const itrPredIsSomeTrue = (p: p) => (a: itr) => { for (let i of a) if (p(i)) return true; return false }
export const itrBrkForTrueFalse: _itrSplit<any> = p => a => { const t: ay = [], f: ay = []; for (let i of a) p(i) ? t.push(i) : f.push(i); return { t, f } }
export const itrAy:_itrAy = a => { const o: ay = []; for (let i of a) o.push(i); return o }
export const itrFst:_itrItm = a => { for (let i of a) return i; return null }
export const itrAddPfxSfx:_itrAddPfxSfx = (pfx, sfx) => (a: itr) => itrMap(sAddPfxSfx(pfx, sfx))(a)
export const itrAddPfx = pfx => (a: itr) => itrMap(sAddPfx(pfx))(a)
export const itrAddSfx = sfx => (a: itr) => itrMap(sAddSfx(sfx))(a)
export const itrWdt: _itrN = a => pipe(itrMap(vLen)(a))(itrMax)
export const sitrWdt: _sitrN = a => pipe(itrMap(sLen)(a))(itrMax)
export const itrAlignL: _itrSy = a => itrMap(sAlignL(itrWdt(a)))(a)
export const itrClone: _itrAy = a => itrMap(i => i)(a)
export const itrFind: _itrFind = p => a => { for (let i of a) if (p(i)) return i; return null }
export const itrHasDup: _itrPred = a => { const set = new Set(); for (let i of a) if (set.has(i)) { return true } else set.add(i); return false }
export const itrDupSet: _itrSet = a => { const set = new Set(), o = new Set(); for (let i in a) if (set.has(i)) { o.add(i) } else set.add(i); return o }
export const itrMax: _itrItm = a => { let o = itrFst(a); if (o === null) return null; for (let i of a) if (i > o) o = i; return o }
export const itrMin: _itrItm = a => { let o = itrFst(a); if (o === null) return null; for (let i of a) if (i < o) o = i; return o }
export const itrRmvEmp = (a: itr) => itrWhere(isNonEmp)(a)
//-----------------------------------------------------------------------------------------
export const oBringUpDollarPrp = o => {
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
    for (let chdNm in o) {
        const chd = o[chdNm]
        for (let chdMbrNm in chd) {
            if (oHasPrp(chdMbrNm)(o))
                er("{chdMbrNm} of {chd} exists in {o}", { chdMbrNm, chd, o })
            o[chdMbrNm] = chd[chdMbrNm]
        }
    }
    return o
}
export const oCmlDry:_oDry = o => {
    let oo = itrMap(n => [cmlNm(n), n])(oPrpNy(o))
    drySrt(ayEle(0))(oo)
    const w = sdryColWdt(0)(oo)
    const a = sAlignL(w)
    dryColMdy(0)(a)(oo)
    return oo
}
export const oCtorNm = o => o && o.constructor && o.constructor.name
export const oIsInstance = instance => o => o instanceof instance
export const oHasCtorNm = nm => o => oCtorNm(o) === nm
export const oPrp: _oPrp = prpPth => a => { 
    /**
 * @description return the property value of object {o} by property path {pprPth}
 * @param {string} prpPth
 * @example
 * const a = {b: {c:{1}}
 * require('assert').equal(prp('b.c')(o), 1) 
 */
    for (let nm of prpPth.split('.')) if ((a = a[nm]) === undefined) return undefined; return a
}
export const oPrpAy:_oPrpAy = prpNy => a => itrMap(nm => oPrp(nm)(a))(prpNy)
export const oPrpNy:_oPrpNy = a => Object.getOwnPropertyNames(a)
export const oHasPrp:_oHasPrp = prpNm => a => a.hasOwnProperty(prpNm)
export const oHasLen = oHasPrp('length')
export const oCmlObj:_oCmlObj = o => {
    const dry = oCmlDry(o)
    const oo = {}
    dry.forEach(([cmlNm, prpNm]) => oo[cmlNm] = o[prpNm])
    return oo
}
// ----------------------------------------------
export const ayClone = (ay: ay) => ay.slice(0, ay.length)
// ----------------------------------------------
export const sdryColWdt: _sdryWdt = colIx => a => sitrWdt(dryCol(colIx)(a))
export const sdryColWdtAy: _sdryWdtAy = a => itrMap(i => sdryColWdt(i)(a))(nItr(dryColCnt(a)))
export const dryCol: _dryCol = colIx => a => itrMap(ayEleOrDft('')(colIx))(a)
export const dryColCnt: _dryCnt = a => itrMax(itrMap(vLen)(a))
export const dryCellTfm: _dryCellMdy = f => a => { itrEach(ayTfm(f))(a) }
export const dryClone: _dryTfm = a => itrMap(dr => itrClone(dr))(a)
export const dryColMdy: _dryColMdy = colIx => f => a => { itrEach(ayTfmEle(colIx)(f))(a) }
export const sdryLines: _dryLines = a => sdryLy(a).join('\r\n')
export const wdtAyLin: _wdtAyLin = w => "|-" + itrMap(w => '-'.repeat(w))(w).join('-|-') + "-|"
export const sdrLin: _sdrLin = w => a => {
    let m = ([w, s]) => sAlignL(w)(s)
    let z = ayZip(w,a)
    let ay = itrMap(m)(z)
    let s = ay.join(' | ')
    return "| " + s + " |"
}
export const sdryLy: _dryLy = a => { 
    let w = sdryColWdtAy(a)
    let h = wdtAyLin(w)
    let o = [h].concat(itrMap(sdrLin(w))(a), h) 
    return o
}
export type _drsLy = (a:drs) => ly
export const aySy: _aySy = a => itrMap(String)(a)
export const drySdry: _drySdry = a => itrMap(aySy)(a)
export const dryLy: _dryLy = a => sdryLy(drySdry(a))
export const drsLy: _drsLy = ({ dry, fny }) => {
    let b = [fny].concat(drySdry(dry))
    let c = sdryLy(b)
    let o = c.slice(0, 2).concat(c[0], c.slice(2))
    return o
}
export const drsLines: _drsLines = a => drsLy(a).join('\r\n')
export const drySrt: _drySrt = fun_of_dr_to_key => dry => dry.sort((dr_A, dr_B) => vvCompare(fun_of_dr_to_key(dr_A), fun_of_dr_to_key(dr_B)))
//-----------------------------------------------------------------------
export const oyPrpCol = prpNm => oy => { const oo: ay = []; for (let o of oy) oo.push(o[prpNm]); return oo }
export const oyPrpDry = prpNy => oy => { const oo: ay = []; for (let o of oy) oo.push(oPrpAy(prpNy)(o)); return oo }
//---------------------------------------
const _isEsc = i => { for (let spec of "()[]{}/|.+") if (i === spec) return true }
const _escSpec = lik => itrMap(i => i === '\\' ? '\\\\' : (_isEsc(i) ? '\\' + i : i))(lik).join('') //; const xxx = _escSpec("abc?dd"); debugger
const _escStar = lik => itrMap(i => i === '*' ? '.*' : i)(lik).join('')
const _escQ = lik => { const o: ay = []; for (let i of lik) o.push(i === '?' ? '.' : i); return o.join('') }
const _esc = lik => "^" + pipe(lik)(_escSpec, _escStar, _escQ) + "$"
const _likRe = lik => new RegExp(_esc(lik))
const _isEscSbs = i => { for (let spec of "()[]{}/|.+?*") if (i === spec) return true }
const _escSbs = c => c === '\\' ? '\\\\' : (_isEscSbs(c) ? '\\' + c : c)
export const sLik: _sLik = lik => s => _likRe(s).test(s) // strictEqual(sLik("abc?dd")("abcxdd"), true); debugger
export const sHasSbs: _sHasSbs = sbs => s => {
    const _escSpec = itrMap(_escSbs)(sbs).join("")
    const _sbsRe = new RegExp(_escSpec)
    let o = _sbsRe.test(s)
    return o
}
//---------------------------------------
export const pthFnAy = (pth: s, lik?: s) => {
    if (!fs.existsSync(pth)) return null
    const isFil = entry => fs.statSync(path.join(pth, entry)).isFile();
    let entries = fs.readdirSync(pth)
    entries = (lik === undefined) ? entries : itrWhere(sLik(lik))(entries)
    let o: s[] = itrWhere(isFil)(entries)
    return o
}; // const xxx = pthFnAy("c:\\users\\user\\", "sdfdf*.*"); debugger;
export const ayZip = (a: ay, b: ay) => itrMap(i => [a[i], b[i]])(nItr(a.length))
export const pthFnAyPm = async (a: pth, lik?: s) => {
    const entries= await pm<fn[]>(fs.readdir, a)
    const stat = entry => pm(fs.stat, path.join(a, entry))
    let b = (lik === undefined) ? entries : itrWhere(sLik(lik))(entries)
    let c = await Promise.all(itrMap(stat)(a))
    let d: fn[] = pipe(nItr(entries.length))(itrWhere(i => b[i].isFile()), itrMap(i => entries[i]))
    debugger
    return d
}
//---------------------------------------
export const nMultiply = x => a => a * x
export const nDivide = x => a => a / x
export const vAdd = x => a => a + x
export const nMinus = x => a => a - x
export const nDecr = nMinus(1)
export const nIncr = vAdd(1)
export const nItr = function* (n) { for (let j = 0; j < n; j++) yield j }
// --------------------------------------------------------------------------
export const vvCompare = (a, b) => a === b ? 0 : a > b ? 1 : -1
export const lazy = vf => { let v, done = false; return () => { if (!done) { v = vf(); done = true }; return v } }
//---------------------------------------------------------------------------
export const optMap: _optMap = f => a => a !== null ? f(a) : a
export const ffnMakBackup:_ffnDo = a => {
    const ext = ffnExt(a)
    const ffnn = ffnRmvExt(a)
    const pth = ffnPth(a)
    let b = sRight(12)(ffnn)
    const isBackupFfn = (sHasPfx("(backup-")(a)) && (sHasSfx(")")(a))
    const fn = ffnFn(a)
    const backupSubFdr = `.backup\\${fn}\\`
    const backupPth = pth + backupSubFdr

    if (ext === '.backup') er("given [ext] cannot be '.backup", { ext, ffnn })
    if (isBackupFfn) er("ffn cannot be a backup file name", { ffn:a })

    let c = pthFnAy(backupPth, ffnn + '(backup-???)' + ext)
    let nxtBackupNNN =
        c === null || isEmp(b) ? '000' :
            pipe(c)(itrMax, ffnRmvExt, sRmvLasChr, sRight(3), Number.parseInt, nIncr, nPadZero(3))
    const backupFfn = backupPth + ffnAddFnSfx(`(backup-${nxtBackupNNN})`)(fn)
    pthEnsSubFdr(backupSubFdr)(pth); fs.copyFileSync(a, backupFfn)
}
export const lyExpStmt: _lyStrOpt = ly => {
    let ny = lyConstNy(ly)
    debugger
    ny = itrWhere(predNot(sHasPfx("_")))(ny).sort()
    if (isEmp(ny)) return null
    const x = ayJnAsLines(", ", 4, 120)(ny)
    const stmt = "export {\r\n" + x + "\r\n}"
    return stmt
}
export const curExpStmt: _mkStr = () => pipe(__filename)(ftLy, lyExpStmt)
// dmp(curExpStmt); debugger
export const fjsRplExpStmt: _ftDo = fjs => {
    const oldLy = ftLy(fjs)
    const newLin = lyExpStmt(oldLy)

    let oldBegIx = ayFindIx(sHasPfx("exports {"))(oldLy)
    let oldEndIx: n = (() => {
        if (oldBegIx !== null) {
            for (let i: n = oldBegIx; i < oldLy.length; i++) {
                if (/\}/.test(oldLy[i])) return i++
            }
        }
        return 0
    })()
    const oldLin = (oldBegIx === null || oldEndIx === null) ? null : oldLy.slice(oldBegIx, oldEndIx)
    const newLines = () => {
        const hasNewLin = newLin !== null
        const hasOldLin = oldLin !== null
        switch (true) {
            case (hasNewLin && hasOldLin):
                if (oldBegIx !== null) { oldLy.splice(oldBegIx, oldEndIx, vDftStr(newLin)); return ayJnCrLf(oldLy) }
                else { er("impossible"); halt() }
            case (hasNewLin && !hasOldLin):
                return ayJnCrLf(oldLy.concat(vDftStr(newLin)))
            case (hasOldLin):
                if (oldBegIx === null) {
                    er("impossible")
                } else { oldLy.splice(oldBegIx, oldEndIx); return ayJnCrLf(oldLy) }
            default:
                er("impossible"); halt()
        }
        return ayJnCrLf(oldLy)
    }
    let a = newLines()
    if (oldLin !== newLin) { debugger; ffnMakBackup(fjs); sWrt(fjs)(newLines()) }
}
export const vTee: _vTee = f => a => { f(a); return a }
export const ftWrt: _ftWrt = s => a => fs.writeFileSync(a, s)
export const cmdShell: _cmdDo = a => child_process.exec(a)
export const ftBrw: _ftDo = a => cmdShell(`code.cmd "${a}"`)
export const sBrw: _sDo = a => pipe(tmpft())(vTee(ftWrt(a)), ftBrw)
export const oBrw: _oDo = a => pipe(tmpjson())(vTee(ftWrt(oLines(a))), ftBrw)
export type _oStr = (a: o) => s
export type _oDo = (a: o) => void
export const oLines:_oStr = o => JSON.stringify(o)
const acorn = require('acorn')
const a = acorn.parse.toString()
sBrw(a)
debugger
const o = acorn.parse(a)
oBrw(o)
if(module.id='.') {
    const sdry = [['lskdfj','12345678901'],['123456789','dkfj']]
    let act
    act = sdryColWdt(0)(sdry); assert.strictEqual(act, 9)
    act = sdryColWdt(1)(sdry); assert.strictEqual(act, 11)
    act = sdryColWdtAy(sdry); assert.deepStrictEqual(act, [9,11])
    act = sdryLy(sdry)
}
if(module.id==='.') {
    const fny = sSplitSpc('aa bb')
    const dry = [[1233, '12345678901'], ['123456789', 'dkfj'], [new Date(),true, 1]]
    const drs: drs = { dry, fny }
    const act = drsLines(drs)
    debugger
}
//fjsRplExpStmt(ffnRplExt(".ts")(__filename))
