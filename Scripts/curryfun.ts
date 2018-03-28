/// <reference path="./typings/node/node.d.ts"/>
//--------------------------------------------------
import * as child_process from 'child_process'
import * as fs from 'fs'
const assert = require('assert')
//import * as assert from 'assert'
import * as path from 'path'
import * as os from 'os'
import * as u from 'util'
//--------------------------------------------------
export interface drs { dry: dry; fny: fny }
export interface p123 { p1: s, p2: s, p3: s }
export interface s1s2 { s1: s, s2: s }
export interface tf<T> { t: T[], f: T[] }
export interface linShift { term: s, remainLin: s }
export interface quote { q1: s, q2: s }
export type match = RegExpMatchArray
export type kv = [s, s]
export type s = string
export type vid = s // vid = value-id
export type sid = s // sid = string-id
export type lin = s
export type re = RegExp
export type n = number
export type ft = s
export type fts = ft
export type fn = s
export type ffn = string
export type b = boolean
export type dr = ay
export type lines = s
export type o = object
export type quoteStr = s
export type k = s
export type pfx = s
export type nm = s
export type ny = nm[]
export type wdt = n
export type cml = s
export type cnt = n
export type ix = n
export type pth = s
export type cummulator<T> = (cum: T) => (itm) => T
export type pred<T> = (a: T) => b
export type opt<T> = T | null
export type fun<T> = (x: T) => any
export type Itr<T> = Iterable<T>
export type dry = Array<dr>
export type sdic = Map<s, s>
export type dic<T> = Map<s, T>
export type set = Set<any>
export type sset = Set<s>
export type bdic = Map<s, b>
export type ly = s[]
export type src = ly
export type col = any[]
export type scol = s[]
export type sy = s[]
export type sPred = pred<s>
export type ay = Array<any>
export type fny = nm[]
export type sdry = s[][]
export type sdr = s[]
export type itr = Itr<any>
export type sItr = Itr<s>
export type p = (a: any) => boolean
export type f = (a: any) => any
export type sOrRe = s | re
export type sOrSy = s | s[]
export type strOpt = string | null
export type doFun = () => void
//---------------------------------------
export const isEq = (exp, act) => {
    try {
        assert.deepStrictEqual(act, exp)
        return true
    } catch (e) {
        return false
    }
}
export const isNotEq = (exp, act) => !isEq(exp, act)
export const assertIsEq = (exp, act) => { if (isNotEq(exp, act)) debugger }
export const assertIsNotEq = (exp, act) => { if (isEq(exp, act)) debugger }
//---------------------------------------
export const vLT = x => a => a < x
export const vGE = x => a => a >= x
export const vLE = x => a => a <= x
export const vEQ = <T>(x: T) => (a: T) => a === x
export const vNE = <T>(x: T) => (a: T) => a !== x
export const vGT = x => a => a > x
export const vIN = (itr: itr) => a => { for (let i of itr) if (i === a) return true; return false }
export const vNotIn = itr => a => !vIN(itr)(a)
export const vBET = <T>(x: T, y: T) => (a: T) => x <= a && a <= y
export const vNotBet = <T>(x: T, y: T) => (a: T) => !vBET(x, y)(a)
export const vIsInstanceOf = <T>(x: Function) => (a: T) => a instanceof x
export const ensSy = (a: s | sy) => typeof a === 'string' ? sSplitSpc(a) : a
export const ensRe = (a: s | re) => a instanceof RegExp ? a : new RegExp(a)
//-------------------------------------
export const pipe = v => (...f: f[]) => { let o = v; for (let ff of f) o = ff(o); return o }
export const vMap = (f: f) => a => f(a)
export const funApply = v => (a: f) => a(v)
export const swap = (f: f) => a => b => f(b)(a)
export const compose = (...f: f[]) => v => pipe(v)(...f)
//----------------------------------
export const dicLy = <T>(a: dic<T>) => itrMap(kvLin)(a) as s[]
export const dicLines = <T>(a: dic<T>) => dicLy(a).join('\r\n')
export const kvLin = ([k, v]: kv) => k + ' ' + v
export const dmp = global.console.log
export const funDmp = (f: Function) => dmp(f.toString())
export const halt = () => { throw new Error() }
export const sEscLf = (a: s) => a.replace('\n', '\\n')
export const sEscVbar = (a: s) => a.replace(/\|/g, '\\v')
export const sEscCr = (a: s) => a.replace(/\r/g, '\\r')
export const sEscTab = (a: s) => a.replace(/\t/g, '\\t')
export const sEsc: ((a: s) => s) = compose(sEscLf, sEscCr, sEscTab)
export const sFmt = (qqStr: s, ...v) => {
    let z = qqStr
    for (let i of v) {
        z = z.replace('?', i)
    }
    return z
}
export const sBox = (a: s) => { const y = "== " + sEsc(a) + " ==", x = "=".repeat(a.length + 6); return [x, y, x].join("\r\n") }
export const stack = () => { try { throw new Error() } catch (e) { let z: s = e.stack; return z } }
export const er = (msg: s, ...v) => {
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
    if (dbg)
        halt()
}
//-----------------------------------------------------------------------
export const sSplit = (sep: sOrRe) => (a: s) => a.split(sep)
export const sRmvCr = (a: s) => a.replace(/\r/g, '')
export const sSplitLines = (a: lines) => sSplitLf(sRmvCr(a))
export const sSplitCrLf = sSplit('\r\n')
export const sSplitLf = sSplit('\n')
export const sSplitSpc = sSplit(/\s+/)
export const sSplitCommaSpc = sSplit(/,\s*/)
//-----------------------------------------------------------------------
export const vDft = <T>(dft: T) => (a: T | null | undefined) => a === null || a === undefined ? dft : a
export const vDftStr = vDft("")
export const vDftUpper = <T>(x: T, y: T) => (a: T | null | undefined) => a === null || a === undefined || x > a || a > y ? y : a
export const vDftLower = <T>(x: T, y: T) => (a: T | null | undefined) => a === null || a === undefined || x > a || a > y ? x : a
export const ayFindIx = (p: p) => (a: ay) => { for (let i in a) if (p(a[i])) return Number(i); return null }
export const ayFindIxOrDft = (dftIx: n) => (p: p) => (a: ay) => vDft(dftIx)(ayFindIx(p)(a))
export const ayFst = <T>(a: T[]) => a[0]
export const aySnd = <T>(a: T[]) => a[1]
export const ayEle = <T>(ix: n) => (a: T[]) => a[ix]
export const ayEleOrDft = <T>(dft: T) => (ix: n) => (a: T[]) => vDft(dft)(a[ix])
export const ayLas = <T>(a: T[]) => a[vLen(a) - 1]
export const aySetEle = <T>(ix: n) => (v: T) => (a: T[]) => { a[ix] = v }
export const ayMdyEle = <T>(ix: n) => (f: (a: T) => T) => (a: T[]) => { a[ix] = f(a[ix]) }
export const ayMdy = <T>(f: (a: T) => T) => (a: T[]) => itrEach(ix => a[ix] = f(a[ix]))(nItr(a.length))
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
export const sFstChr = (a: s) => a[0]
export const sLasChr = (a: s) => a[a.length - 1]
export const sAddPfx = (pfx: s) => (a: s) => pfx + a
export const sAddSfx = (sfx: s) => a => a + sfx
export const sAddPfxSfx = (pfx: s, sfx: s) => (a: s) => pfx + a + sfx
export const vLen = a => typeof a === 'string' ? a.length : ((a && a.length) || String(a).length) as n
export const sLen = (a: s) => a.length
export const sMidN = (pos: n) => (n: n) => (a: s) => a.substr(pos, n)
export const sMid = (pos: n) => (a: s) => a.substr(pos)
export const sLeft = (n: n) => (a: s) => a.substr(0, n)
export const sTrim = (a: s) => a.trim()
export const sRight = (n: n) => (a: s) => {
    const l = vLen(a)
    if (n >= l) return a
    if (0 >= n) return ''
    return a.substr(-n)
}
export const nPadZero = (dig: n) => (a: n) => {
    const s = String(a)
    const nZer = dig - s.length
    const z = nZer > 0 ? "0".repeat(nZer) : ""
    return z + s
}
export const sAlignL = (w: wdt) => (a: s) => {
    if (a === null || a === undefined) return nSpc(w)
    const l = vLen(a)
    if (l > w) return a
    return a + nSpc(w - l)
}
export const sAlignR = (w: wdt) => (a: s) => {
    const l = sLen(a)
    if (l > w) return a
    return nSpc(w - l) + a
}
export const sWrt = (ft: s) => (a: s) => fs.writeFileSync(ft, a)
export const sSbsPos = (sbs: s) => (a: s) => a.indexOf(sbs)
//strictEqual(sbsPos('aabb')('123aabb'),3)
export const sSbsRevPos = (sbs: s) => (a: s) => a.lastIndexOf(sbs)
//strictEqual(sbsRevPos('a')('0123aabb'),5)
export const cmlNm = (a: cml) => cmlNy(a).reverse().join(' ') // @eg cmlNm(relItmNy) === 'Ny Itm rel'
export const cmlSpcNm = (a: cml) => cmlNy(a).join(' ')
export const isNm = (s: s) => {
    if (s === undefined || s === null || s === '')
        return false
    if (!chrCd_isFstNmChr(s.charCodeAt(0)))
        return false
    for (let i = 1; i < s.length; i++) {
        if (!chrCd_isNmChr(s.charCodeAt(i)))
            return false
    }
    return true
}
export const sRplNonNmChr = (a: s) => {
    const a1: s[] = []
    for (let i = 0; i < a.length; i++) {
        const c = a.charCodeAt(i)
        if (chrCd_isNmChr(c))
            a1.push(a[i])
        else
            a1.push(' ')
    }
    return a1.join('')
}
export const sNmSet = (a: s) => new Set<s>(sRplNonNmChr(a).split(/\s+/))
const _isBrkChrCd = (c: n) => c === NaN || chrCd_isCapitalLetter(c) || chrCd_isUnderScore(c) || chrCd_isDollar(c)
const _isBrk = (c: n, c0: n) => _isBrkChrCd(c) && !_isBrkChrCd(c0)
export const cmlNy = (a: cml) => {
    if (!isNm(a))
        er('Give {s} is not a name', { s: a })
    const o: s[] = []
    let m = ''
    for (let i = a.length; i--; i > 0) {
        const cc = a[i]
        const c = a.charCodeAt(i)
        const c0 = a.charCodeAt(i - 1)
        m = cc + m
        if (_isBrk(c, c0)) {
            o.push(m)
            m = ''
        }
    }
    if (m !== '')
        o.push(m)
    const z: s[] = o.reverse()
    return z
}
export const sHasPfx = (pfx: s) => (a: s) => a.startsWith(pfx)
export const sHasPfxIgnCas = (pfx: s) => (a: s) => {
    const a1 = sLeft(pfx.length)(a).toUpperCase()
    const pfx1 = pfx.toUpperCase()
    return a1 === pfx1
}
export const sRmvPfx = (pfx: s) => (a: s) => sHasPfx(pfx)(a) ? a.substr(pfx.length) : a
export const sHasSfx = (sfx: s) => (a: s) => a.endsWith(sfx)
export const sRmvSfx = (sfx: s) => (a: s) => sHasSfx(sfx)(a) ? a.substr(0, a.length - sfx.length) : a
export const sMatch = (re: re) => (a: s) => a.match(re)
//-----------------------------------------------------------------------
export const predNot: ((a: p) => p) = a => v => !a(v)
export const predsOr: ((...a: p[]) => p) = (...a) => v => { for (let p of a) if (p(v)) return true; return false }
export const predsAnd: ((...a: p[]) => p) = (...a) => v => { for (let p of a) if (!p(v)) return false; return true }
//-----------------------------------------------------------------------
export const isRmkLin = (a: s) => {
    const l = a.trim()
    if (l === "") return true
    if (sHasPfx("--")(l)) return true
    return false
}
export const isNonRmkLin: sPred = predNot(isRmkLin)
export const linRmvMsg = (a: lin) => {
    const a1 = a.match(/(.*)---/)
    const a2 = a1 === null ? a : a1[1]
    a2.trim
    if (sHasPfx("^")(a2.trimLeft())) return ""
    return a2
}
//------------------------------------------------------------------
export const sBrkAt = (at: n, len: n) => (a: s) => { return { s1: sLeft(at)(a).trim(), s2: sMid(at + len)(a).trim() } }
export const sBrk1 = (sep: s) => (a: s) => { const at = sSbsPos(sep)(a); return at === -1 ? { s1: sTrim(a), s2: '' } : sBrkAt(at, sLen(sep))(a) }
export const sBrk2 = (sep: s) => (a: s) => { const at = sSbsPos(sep)(a); return at === -1 ? { s1: '', s2: sTrim(a) } : sBrkAt(at, sLen(sep))(a) }
export const sBrk = (sep: s) => (a: s) => { const at = sSbsPos(sep)(a); return sBrkAt(at, sLen(sep))(a) }
export const quoteStrBrk = (a: s) => {
    const l = a.length
    if (l === 1) return { q1: a, q2: a }
    if (l === 2) return { q1: a.substr(0, 1), q2: a.substr(1) }
    let p = sSbsPos("*")(a)
    if (p === -1) return { q1: "", q2: "" }
    let { s1: q1, s2: q2 } = sBrkAt(p, 1)(a)
    return { q1, q2 }
}
export const sQuote = (q: s) => (a: s) => {
    let qq = quoteStrBrk(q);
    if (qq === null) return a; else { let { q1, q2 } = qq; return q1 + a + q2 };
}
//-----------------------------------------------------------------------
export const sTakBef = (sep: s) => (a: s) => sRevBrk2(sep)(a).s1
export const sTakAft = (sep: s) => (a: s) => sRevBrk1(sep)(a).s2
//-----------------------------------------------------------------------
export const sRevBrk1 = (sep: s) => (a: s) => { const at = sSbsPos(sep)(a); return at === -1 ? { s1: a.trim(), s2: '' } : sBrkAt(at, sep.length)(a) }
export const sRevBrk2 = (sep: s) => (a: s) => { const at = sSbsPos(sep)(a); return at === -1 ? { s1: '', s2: a.trim() } : sBrkAt(at, sep.length)(a) }
export const sRevBrk = (sep: s) => (a: s) => { const at = sSbsRevPos(sep)(a); return sBrkAt(at, sep.length)(a) }
export const sRevTakBef = (sep: s) => (a: s) => sRevBrk2(sep)(a).s1
export const sRevTakAft = (sep: s) => (a: s) => sRevBrk1(sep)(a).s2
//-----------------------------------------------------------------------
export const sRmvFstChr = sMid(1)
export const sRmvLasChr = (a: s) => sLeft(a.length - 1)(a)
export const sRmvLasNChr = (n: n) => (a: s) => sLeft(a.length - n)(a)
export const sRmvSubStr = (sbs: s) => (a: s) => { const re = new RegExp(sbs, 'g'); return a.replace(re, '') }
export const sRmvColon = sRmvSubStr(":")
export const pthsep = path.sep
export const pthBrw = (a: pth) => cmdShell(sFmt('explorer "?"', a))
export const ffnPth = (a: ffn) => { const at = a.lastIndexOf(pthsep); return at === -1 ? '' : sLeft(at + 1)(a) }
export const ffnFn = (a: ffn) => { const at = a.lastIndexOf(pthsep); return at === -1 ? a : sMid(at + 1)(a) }
export const ffnExt = (a: ffn) => { const at = a.lastIndexOf('.'); return at === -1 ? '' : sMid(at)(a) }
export const ffnAddFnSfx = (sfx: s) => (a: s) => ffnFfnn(a) + sfx + ffnExt(a)
export const ffnRmvExt = (a: ffn) => { const at = a.indexOf('.'); return at === -1 ? a : sLeft(at)(a) }
export const ffnFfnn = ffnRmvExt
export const ffnFnn = (a: ffn) => ffnFn(ffnRmvExt(a))
export const ffnRplExt = (ext: s) => (a: s) => ffnRmvExt(a) + ext
//-----------------------------------------------------------------------
export const ftLines = (a: ft) => (fs.readFileSync(a).toString())
export const ftLy = (a: ft) => sSplitLines(ftLines(a))
//-----------------------------------------------------------------------
export const tmpnm = () => sRmvColon(new Date().toJSON())
export const tmppth = os.tmpdir + pthsep
export const tmpffn = (pfx = "", ext) => tmppth + pfx + tmpnm() + ext
export const tmpfdr = (fdr: s) => {
    const a = tmppth + 'Fdr/'; pthEns(a)
    const a1 = a + fdr + pthsep; pthEns(a1)
    const a2 = a1 + tmpnm() + pthsep; pthEns(a2)
    return a2
}
export const tmpffnByFdrFn = (fdr: s, fn: s) => tmpfdr(fdr) + fn
export const tmpft = () => tmpffn("T", ".txt")
export const tmpfjson = () => tmpffn("T", ".json")
export const ffnCloneTmp = (a: ffn) => {
    const o = tmpffn(undefined, ffnExt(a))
    fs.copyFileSync(a, o)
    fs.read
    return o
}
//-----------------------------------------------------------------------
export const pm = <T>(f, ...p) => new Promise<T>(
    /**
     * @description return a Promise of {er,rslt} by calling f(...p,cb), where cb is (er,rslt)=>{...}
     * it is usefully in creating a promise by any async f(...p,cb)
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
export const pmErRslt = (f, ...p) => new Promise<{ er, rslt }>(
    (rs, rj) => {
        f(...p, (er, rslt) => {
            let z = er ? { er, rslt: null } : { er, rslt }
            rs(z)
        })
    }
)
export const pmRsltOpt = <T>(f, ...p) => new Promise<T | null>(
    (rs, rj) => {
        f(...p, (er, rslt) => {
            let z = er ? null : rslt
            rs(z)
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
export const itrWhere = <A>(p: pred<A>) => (a: itr) => { const o: A[] = []; for (let i of a) if (p(i)) o.push(i); return o }
export const itrExclude = (p: p) => (a: itr) => { const o: ay = []; for (let i of a) if (!p(i)) o.push(i); return o }
export const itrMap = <A, B>(f: (a: A, i?: n) => B) => (a: itr): B[] => { let i = 0; const o: ay = []; for (let itm of a) o.push(f(itm, i++)); return o }
export const itrEach = (f: (a, i?: n) => void) => (a: itr) => { let i = 0; for (let itm of a) f(itm, i++) }
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

export const linFstTerm = (a: lin) => {
    let { term, remainLin } = linShift(a)
    return term
}

export const linT2 = (a: lin) => {
    const { term: t1, remainLin: a1 } = linShift(a)
    const { term: t2, remainLin } = linShift(a1)
    return t2
}

export const linShift = (a: lin) => {
    const a1 = a.trim()
    const a2 = a1.match(/(\S*)\s*(.*)/)
    const o =
        a2 === null
            ? { term: "", remainLin: "" }
            : { term: a2[1], remainLin: a2[2] }
    return o
}
export const setAft = aft => a => _setAft(false, aft, a)
export const setAftIncl = a => set => _setAft(true, a, set)
export const setClone = set => itrSet(set)
export const itrSet = itr => { const o = new Set; for (let i of itr) o.add(i); return o }
export const itrTfmSet = (f: f) => (a: itr) => { const o = new Set; for (let i of a) o.add(f(i)); return o }
//---------------------------------------------------------------------------
export const empSdic = () => new Map<s, s>()
export const lySdic = (a: ly) => {
    const o = empSdic()
    const linKs = a => {
        let { term: k, remainLin: s } = linShift(a)
        return { k, s }
    }
    const x = lin => { let { k, s } = linKs(lin); o.set(k, s) }
    itrEach(x)(a)
    return o
}
export const itrRmvEmp = (a: itr) => itrWhere(isNonEmp)(a)
export const lyPfxCnt = (pfx: s) => (a: ly) => { let z = 0; itrEach(lin => { if (sHasPfx(pfx)(lin)) z++ })(a); return z }
export const lyHasMajPfx = (pfx: s) => (a: ly) => 2 * lyPfxCnt(pfx)(a) > a.length
//---------------------------------------------------------------------------
const reExpConstNm = /^export\s+const\s+([\w][\$_0-9\w_]*)/
const reConstNm = /^const\s+([\w][\$_0-9\w_]*)/
const reExpDollarConstNm = /^export\s+const\s+([\$\w][\$_0-9\w_]*)/
export const srcDry = (re: re) => compose(srcMatchAy(re), itrMap(matchDr)) as (a: src) => dry
export const srcCol = (re: re) => (a: src) => {
    const ay = srcMatchAy(re)(a)
    const c = matchAyFstCol(ay)
    const c1 = itrRmvEmp(c)
    const z = c1.sort() as s[]
    return z
}
export const aySrt = (a: ay) => a.sort()
export const matchDr = (a: match) => [...a].splice(1)
export const matchAySdry = itrMap(matchDr) as (a: RegExpMatchArray[]) => sdry
export const matchFstItm = (a: RegExpMatchArray) => a === null ? null : a[1] as s | null
export const matchAyFstCol = itrMap(matchFstItm) as (a: RegExpMatchArray[]) => s[]
export const srcMatchAy = compose(sMatch, itrMap) as (_: re) => (_: src) => RegExpMatchArray[]
export const srcExpConstNy = srcCol(reExpConstNm)
export const srcConstNy = srcCol(reConstNm)
export const srcExpConstDollarNy = srcCol(reExpDollarConstNm)
export const ftsExpConstNy = compose(ftLy, srcExpConstNy) as (a: fts) => ny
export const ftsConstNy = compose(ftLy, srcConstNy) as (a: fts) => ny
export const ftsExpConstDollarNy = compose(ftLy, srcExpConstDollarNy) as (a: fts) => ny
export const ffnFts = ffnRplExt('.ts') as (_: s) => s
export const fjsExpConstNy = compose(ffnFts, ftsExpConstNy)
export const fjsConstNy = compose(ffnFts, ftsConstNy)
export const stop = () => { debugger }
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
export const isAy = u.isArray
export const isDte = u.isDate
export const isFun = u.isFunction
export const isPrim = u.isPrimitive
export const isRe = v => vIsInstanceOf(RegExp)
export const isNonNull = v => !isNull(v)
export const isNull = u.isNull
export const isUndefined = u.isUndefined
export const isNullOrUndefined = u.isNullOrUndefined
export const isTrue = v => v ? true : false
export const isFalse = v => v ? false : true
export const isEmp = v => v ? false : true
export const isNonEmp = v => v ? true : false
export const isOdd = n => n % 2 === 1
export const isEven = n => n % 2 === 0
export const isSpc = (s: s) => s === null || s === undefined || s[0] === undefined ? false : /\s/.test(s[0]) as b
//----------------------------------------------------------------------------
export const sSearch = (re: RegExp) => (a: s) => a.search(re)
export const sBrkP123 = (quoteStr: s) => (a: s) => {
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
    let z: [s, s, s] = [p1, p2, p3]
    return z
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
export const itrBrkForTrueFalse = <T>(p: (a: T) => b) => (a: Itr<T>) => {
    const t: T[] = [], f: T[] = [];
    for (let i of a)
        p(i) ? t.push(i) : f.push(i);
    return { t, f }
}
export const itrAy = <T>(a: Itr<T>) => { const o: T[] = []; for (let i of a) o.push(i); return o }
export const itrFst = <T>(a: Itr<T>) => { for (let i of a) return i; return null }
export const itrAddPfxSfx = (pfx: s, sfx: s) => (a: itr) => itrMap(sAddPfxSfx(pfx, sfx))(a) as s[]
export const itrAddPfx = (pfx: s) => (a: itr) => itrMap(sAddPfx(pfx))(a) as s[]
export const itrAddSfx = (sfx: s) => (a: itr) => itrMap(sAddSfx(sfx))(a) as s[]
export const itrWdt = (a: itr) => pipe(itrMap(vLen)(a))(itrMax) as n
export const sitrWdt = (a: sItr) => pipe(itrMap(sLen)(a))(itrMax) as n
export const itrAlignL = (a: itr) => itrMap(sAlignL(itrWdt(a)))(a) as s[]
export const itrClone = (a: itr) => itrMap(i => i)(a) as ay
export const itrFind = <T>(p: (a: T) => b) => (a: Itr<T>) => { for (let i of a) if (p(i)) return i; return null }
export const itrHasDup = (a: itr) => { const set = new Set(); for (let i of a) if (set.has(i)) { return true } else set.add(i); return false }
export const itrDupSet = <T>(a: Itr<T>) => {
    const set = new Set<T>()
    const z = new Set<T>()
    for (let i of a)
        if (set.has(i))
            z.add(i)
        else
            set.add(i)
    return z
}
export const itrMax = <T>(a: Itr<T>) => { let o = itrFst(a); if (o === null) return null; for (let i of a) if (i > o) o = i; return o }
export const itrMin = <T>(a: Itr<T>) => { let o = itrFst(a); if (o === null) return null; for (let i of a) if (i < o) o = i; return o }
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
export const nyCmlSdry = (a: ny) => itrMap(cmlNy)(a) as sdry
export const oCmlDry = (a: o) => {
    let z = itrMap((nm: s) => [cmlNm(nm), nm])(oPrpNy(a))
    drySrt(ayEle(0))(z)
    const w = sdryColWdt(0)(z)
    dryColMdy(0)(sAlignL(w))(z)
    return z
}
export const oCtorNm = (a: o) => a && a.constructor && a.constructor.name
export const oIsInstance = (instance: Function) => (a: o) => a instanceof instance
export const oHasCtorNm = (nm: s) => (a: o) => oCtorNm(a) === nm
export const oPrp = (prpPth: s) => (a: o) => {
    /**
 * @description return the property value of object {o} by property path {pprPth}
 * @param {string} prpPth
 * @example
 * const a = {b: {c:{1}}
 * require('assert').equal(prp('b.c')(o), 1) 
 */
    let v
    for (let nm of prpPth.split('.')) {
        let v = a[nm]
        if (v === undefined)
            return undefined;
    }
    return v
}
export const oPrpAy = (prpNy: nm[]) => (a: o) => itrMap((nm: s) => oPrp(nm)(a))(prpNy)
export const oPrpNy = (a: o) => Object.getOwnPropertyNames(a)
export const oHasPrp = (prpNm: nm) => (a: o) => a.hasOwnProperty(prpNm)
export const oHasLen = oHasPrp('length')
export const oCmlObj = (a: o) => {
    const dry = oCmlDry(a)
    const z: object = {}
    dry.forEach(([cmlNm, prpNm]) => z[cmlNm] = z[prpNm])
    return z
}
// ----------------------------------------------
const funsExport = (...f: Function[]) => f.forEach(funExport)
const funExport = (f: Function) => {
    const funName = f.name
    if (oHasPrp(funName)(exports)) {
        er('the {funName} already exported', { funName })
    }
    exports.funName = f
}
// ----------------------------------------------
export const ayClone = (ay: ay) => ay.slice(0, ay.length)
// ----------------------------------------------
export const sdryColWdt = (colIx: n) => (a: sdry) => sitrWdt(dryCol(colIx)(a))
export const sdryColWdtAy = (a: sdry) => itrMap((i: n) => sdryColWdt(i)(a))(nItr(dryColCnt(a))) as n[]
export const dryCol = (colIx: n) => (a: dry) => itrMap(ayEleOrDft('')(colIx))(a)
export const dryColCnt = (a: dry) => itrMax(itrMap(vLen)(a)) as n
export const dryCellMdy = (f: f) => (a: dry) => { itrEach(ayMdy(f))(a) }
export const dryClone = (a: dry) => itrMap((dr: dr) => itrClone(dr))(a) as dry
export const dryColMdy = (colIx: n) => (f: f) => (a: dry) => { itrEach(ayMdyEle(colIx)(f))(a) }
export const sdryLines = (a: sdry) => sdryLy(a).join('\r\n')
export const wdtAyLin = (wdtAy: n[]) => "|-" + itrMap((w: n) => '-'.repeat(w))(wdtAy).join('-|-') + "-|"
export const sdrLin = (wdtAy: n[]) => (a: sdr) => {
    let m = ([w, s]) => sAlignL(w)(s)
    let z = ayZip(wdtAy, a)
    let ay = itrMap(m)(z)
    let s = ay.join(' | ')
    return "| " + s + " |"
}
export const sdryLy = (a: sdry) => {
    let w = sdryColWdtAy(a)
    let h = wdtAyLin(w)
    let z: ly = [h].concat(itrMap(sdrLin(w))(a), h)
    return z
}
export const itrSy = (a: itr) => itrMap(String)(a) as s[]
export const aySy = (a: ay) => itrMap(String)(a) as s[]
export const drySdry = itrMap(aySy) as (a: sdry) => sdry
export const dryLy = (a: dry) => sdryLy(drySdry(a))
export const drsLy = (a: drs) => {
    let { fny, dry } = a
    let b = [fny].concat(drySdry(dry))
    let c = sdryLy(b)
    let z: ly = c.slice(0, 2).concat(c[0], c.slice(2))
    return z
}
export const drsLines = (a: drs) => drsLy(a).join('\r\n')
export const drySrtCol = (colAy: n[]) => (a: dry) => {
    const x = (col: n) => {
        return a
    }
    let z = a
    for (let i = 0; i++; i < colAy.length)
        z = x(i)
}
export const drySrt = (fun_of_dr_to_key: (dr: dr) => s) => (a: dry) => a.sort((dr_A, dr_B) => vvCompare(fun_of_dr_to_key(dr_A), fun_of_dr_to_key(dr_B)))
//-----------------------------------------------------------------------
export const oyPrpCol = prpNm => oy => { const oo: ay = []; for (let o of oy) oo.push(o[prpNm]); return oo }
export const oyPrpDry = prpNy => oy => { const oo: ay = []; for (let o of oy) oo.push(oPrpAy(prpNy)(o)); return oo }
//---------------------------------------
export let sLik
export let sHasSbs
{
    const _isEsc = i => { for (let spec of "()[]{}/|.+") if (i === spec) return true }
    const _escSpec = lik => itrMap(i => i === '\\' ? '\\\\' : (_isEsc(i) ? '\\' + i : i))(lik).join('') //; const xxx = _escSpec("abc?dd"); debugger
    const _escStar = lik => itrMap(i => i === '*' ? '.*' : i)(lik).join('')
    const _escQ = lik => { const o: ay = []; for (let i of lik) o.push(i === '?' ? '.' : i); return o.join('') }
    const _esc = lik => "^" + pipe(lik)(_escSpec, _escStar, _escQ) + "$"
    const _likRe = lik => new RegExp(_esc(lik))
    const _isEscSbs = i => { for (let spec of "()[]{}/|.+?*") if (i === spec) return true }
    const _escSbs = c => c === '\\' ? '\\\\' : (_isEscSbs(c) ? '\\' + c : c)
    sLik = (lik: s) => (a: s) => _likRe(a).test(a)
    sHasSbs = (sbs: s) => (a: s) => {
        const _escSpec = itrMap(_escSbs)(sbs).join("")
        const _sbsRe = new RegExp(_escSpec)
        let o = _sbsRe.test(a)
        return o
    }
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
export const ayZip = (a: ay, b: ay) => itrMap((i: n) => [a[i], b[i]])(nItr(a.length))
export const entryStatPm = async (a) => {
    debugger
    throw 0
}
export const pthFnAyPm = async (a: pth, lik?: s) => {
    debugger
    throw 0
    /*
    const b = await pthStatAyPm(a, lik)
    let d: fn[] = pipe(nItr(b.length))(itrWhere(i => b[i].isFile()), itrMap(i => entries[i]))
    debugger
    return d
    */
}
export const pthStatOptAyPm = async (a: pth, lik?: s) => {
    const b = await pm<fn[]>(fs.readdir, a)
    const b1 = (lik === undefined) ? b : itrWhere(sLik(lik))(b)
    const j = b => path.join(a, b)
    const b2 = itrMap(j)(b1)
    const stat = entry => pmRsltOpt(fs.stat, entry)
    const c = itrMap(stat)(b2)
    const z = await Promise.all(c)
    return z as (fs.Stats | null)[]
}
export const pthFdrAyPm = async (a: pth, lik?: s) => {

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
export const optMap = <T, U>(f: (a: T) => U) => (a: T | null) => a !== null ? f(a) : a
export const ffn = (a: ffn) => new Ffn(a)

export class Ffn {
    private _ffn: ffn
    private _dotPos: n
    private _sepPos: n
    constructor(a: ffn) {
        this._ffn = a
        this._dotPos = a.lastIndexOf('.')
        this._sepPos = a.lastIndexOf(pthsep)
    }
    private zmid(at: n) { return sMid(at)(this.ffn) }
    private zleft(at: n) { return sLeft(at)(this.ffn) }
    get ffn() { return this._ffn }
    get pth() { const at = this._sepPos; return at === -1 ? '' : this.zleft(at + 1) }
    get fn() { const at = this._sepPos; return at === -1 ? this.ffn : this.zmid(at + 1) }
    get ext() { const at = this._dotPos; return at === -1 ? '' : this.zmid(at) }
    get noExt() { const at = this._dotPos; return at === -1 ? this.ffn : this.zleft(at) }
    get ffnn() { return this.noExt }
    get fnn() { return ffn(this.noExt).fn }
    addFnSfx(sfx: s) { return this.ffnn + sfx + this.ext }
    rplExt(ext: s) { return this.ffnn + ext }
    makBackup() {
        const ext = this.ext
        const ffnn = this.ffnn
        const pth = this.pth
        const ffn = this.ffn
        let b = sRight(12)(ffnn)
        const isBackupFfn = (sHasPfx("(backup-")(ffn)) && (sHasSfx(")")(ffn))
        const fn = this.fn
        const backupSubFdr = `.backup\\${fn}\\`
        const backupPth = pth + backupSubFdr

        if (ext === '.backup') er("given [ext] cannot be '.backup", { ext, ffnn })
        if (isBackupFfn) er("{ffn} cannot be a backup file name", { ffn: this.ffn })

        let c = pthFnAy(backupPth, ffnn + '(backup-???)' + ext)
        let nxtBackupNNN =
            c === null || isEmp(b) ? '000' :
                pipe(c)(itrMax, ffnRmvExt, sRmvLasChr, sRight(3), Number.parseInt, nIncr, nPadZero(3))
        const backupFfn = backupPth + ffnAddFnSfx(`(backup-${nxtBackupNNN})`)(fn)
        pthEnsSubFdr(backupSubFdr)(pth); fs.copyFileSync(this.ffn, backupFfn)
    }
}
// const xxx = ffn(__filename); debugger
export const ffnMakBackup = (a: ffn) => {
    const ext = ffnExt(a)
    const ffnn = ffnRmvExt(a)
    const pth = ffnPth(a)
    let b = sRight(12)(ffnn)
    const isBackupFfn = (sHasPfx("(backup-")(a)) && (sHasSfx(")")(a))
    const fn = ffnFn(a)
    const backupSubFdr = `.backup\\${fn}\\`
    const backupPth = pth + backupSubFdr

    if (ext === '.backup') er("given [ext] cannot be '.backup", { ext, ffnn })
    if (isBackupFfn) er("ffn cannot be a backup file name", { ffn: a })

    let c = pthFnAy(backupPth, ffnn + '(backup-???)' + ext)
    let nxtBackupNNN =
        c === null || isEmp(b) ? '000' :
            pipe(c)(itrMax, ffnRmvExt, sRmvLasChr, sRight(3), Number.parseInt, nIncr, nPadZero(3))
    const backupFfn = backupPth + ffnAddFnSfx(`(backup-${nxtBackupNNN})`)(fn)
    pthEnsSubFdr(backupSubFdr)(pth); fs.copyFileSync(a, backupFfn)
}
export const srcExpStmt = (a: ly) => {
    let ny = srcExpConstNy(a)
    ny = itrWhere(predNot(sHasPfx("_")))(ny).sort()
    if (isEmp(ny)) return null
    const x = ayJnAsLines(", ", 4, 120)(ny)
    let z = "export {\r\n" + x + "\r\n}"
    return z as s
}
export const curExpStmt = () => pipe(__filename)(ftLy, srcExpStmt) as s
// dmp(curExpStmt); debugger
export const fjsRplExpStmt = fjs => {
    const oldLy = ftLy(fjs)
    const newLin = srcExpStmt(oldLy)

    let oldBegIx = ayFindIx(sHasPfx("exports {"))(oldLy)
    let oldEndIx: n = (() => {
        if (oldBegIx !== null) {
            for (let i: n = oldBegIx; i < oldLy.length; i++) {
                if (/\}/.test(oldLy[i])) return i++
            }
        }
        return 0
    })()
    const oldLin = (oldBegIx === null || oldEndIx === null) ? null : oldLy.slice(oldBegIx, oldEndIx).join('\r\n')
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

export const syLin = (a: sy) => itrMap(sEscVbar)(a).join(' | ')

export const linesAlignL = (wdt: n) => (a: lines) => {
    const a1 = sSplitCrLf(a)
    const aLas = ayLas(a1)
    const n = wdt - aLas.length
    const s = nSpc(n)
    const z = a + s
    return z
}

export const linesWdt = (a: lines) => {
    const a1 = sSplitCrLf(a)
    const z: n = itrWdt(a1)
    return z
}

export const linesAyWdt = (a: lines[]) => {
    const a1 = itrMap(linesWdt)(a)
    const z: n | null = itrMax(a1)
    return z === null ? 0 : z
}

export const linesAyAlignL = (a: lines[]) => {
    const w = linesAyWdt(a) + 1
    const z: lines[] = itrMap(linesAlignL(w))(a)
    return z
}
export const vSav = (vid: vid) => (a) => sWrt(vidFjson(vid))(JSON.stringify(a))
export const vidpth = __dirname + pthsep + 'vid' + pthsep
pthEns(vidpth)
export const vidpthBrw = () => pthBrw(vidpth)
export const vidFjson = (a: vid) => vidpth + a + '.json'
export const fjsonVal = (a: ffn) => JSON.parse(ftLines(a))
export const vidVal = (a: vid) => fjsonVal(vidFjson(a))

export const sSav = (sid: vid) => (a: s) => sWrt(sidFt(sid))(JSON.stringify(a))
export const sidpth = __dirname + pthsep + 'sid' + pthsep
pthEns(sidpth)
export const sidpthBrw = () => pthBrw(sidpth)
export const sidFt = (a: sid) => sidpth + a + '.txt'
export const sidStr = (a: sid) => ftLines(sidFt(a))

export const vTee = <T>(f: (a: T) => void) => (a: T) => { f(a); return a }
export const ftWrt = (s: s) => (a: ft) => fs.writeFileSync(a, s)
export const cmdShell = child_process.exec as (a: s) => void
export const ftBrw = (a: ft) => cmdShell(`code.cmd "${a}"`)
export const sBrw = (a: s) => { pipe(tmpft())(vTee(ftWrt(a)), ftBrw) }
export const sBrwAtFdrFn = (fdr: s, fn: s) => (a: s) => { pipe(tmpffnByFdrFn(fdr, fn))(vTee(ftWrt(a)), ftBrw) }
export const sjsonBrw = (a: s) => { pipe(tmpfjson())(vTee(ftWrt(a)), ftBrw) }
export const lyBrw = compose(ayJnLf, sBrw) as (a: ly) => void
export const lyBrwStop = compose(lyBrw, stop) as (a: ly) => void
export type tfPair<V> = { t: V, f: V }
export type _dicSplitPred<V> = ([s, V]) => b
export const dicBrkForTrueFalse = <V>(_dicSplitFun: _dicSplitPred<V>) => (_dic: dic<V>): tfPair<dic<V>> => {
    const t = new Map<s, any>()
    const f = new Map<s, any>()
    for (let [k, v] of _dic) {
        if (_dicSplitFun([k, v]))
            t.set(k, v)
        else
            f.set(k, v)
    }
    return { t, f }
}
export const dicBrw = compose(dicLy, lyBrw) as <T>(a: dic<T>) => void
export const oJsonLines = JSON.stringify as (a: o) => lines
export const sdryBrw = compose(sdryLines, sBrw) as (a: sdry) => void
export const dryBrw = compose(drySdry, sdryBrw) as (a: dry) => void
export const drsBrw = compose(sBrw, drsLines) as (a: drs) => void
export const nyBrw = compose(itrMap(cmlNy), sdryBrw) as (a: ny) => void
export const srcExpConstNyBrw = compose(srcExpConstNy, nyBrw)
export const ftsExpConstNyBrw = compose(ftLy, srcExpConstNyBrw)
export const oBrw = compose(oJsonLines, sjsonBrw) as (a: o) => void
//---------------------- ------------------
export const chrCd_isNm = (c: n) => true
export const chrCd = (s: s) => s.charCodeAt(0)
export const chrCd_a = chrCd('a')
export const chrCd_z = chrCd('z')
export const chrCd_A = chrCd('A')
export const chrCd_Z = chrCd('Z')
export const chrCd_0 = chrCd('0')
export const chrCd_9 = chrCd('9')
export const chrCd_dollar = chrCd('$')
export const chrCd_underScore = chrCd('_')
export const chrCd_isSmallLetter = vBET(chrCd_a, chrCd_z)
export const chrCd_isCapitalLetter = vBET(chrCd_A, chrCd_Z)
export const chrCd_isLetter = predsOr(chrCd_isSmallLetter, chrCd_isCapitalLetter)
export const chrCd_isDigit = vBET(chrCd_0, chrCd_9)
export const chrCd_isDollar = vEQ(chrCd_dollar)
export const chrCd_isUnderScore = vEQ(chrCd_underScore)
export const chrCd_isFstNmChr = predsOr(chrCd_isLetter, chrCd_isUnderScore, chrCd_isDollar) as pred<n>
export const chrCd_isNmChr = predsOr(chrCd_isFstNmChr, chrCd_isDigit)
export const ssetSrtBrw = (a: sset) => pipe(a)(itrAy, aySrt, lyBrw)
export const ssetBrw = (a: sset) => pipe(a)(itrAy, sBrw)
export const linExpConstNm = (a: lin) => {
    const m = a.match(reExpConstNm)
    if (m === null)
        return null
    return m[1]
}
export const nodeModuleSet = () => {
    const z: Set<NodeModule> = new Set()
    const _pushChildren = (m: NodeModule) => {
        let c: NodeModule
        for (let c of m.children) {
            if (!z.has(c)) {
                z.add(c)
                _pushChildren(c)
            }
        }
    }
    _pushChildren(module)
    return z
}
const x = (a: NodeModule) => {
    const ay = oPrpNy(a.exports)
    const z: dry = []
    const id = a.id
    for (let nm of ay) {
        const itm = a.exports[nm]
        const ty = typeof itm
        //const funNm = ty==='function'?itm.name:''
        const m = [nm, typeof itm, id]
        z.push(m)
    }
    return z
}
export const drsof_exportFunctions = () => {
    const fny = ['name', 'type', 'id']
    let dry: dry = []
    let md: NodeModule
    const set = nodeModuleSet()
    for (md of set) {
        dry = dry.concat(x(md))
    }
    const z: drs = { fny, dry }
    return z
}
export class Dry {
    dry: dry
    private _curCol: n
    constructor(a: dry) {
        this.dry = a
        this._curCol = 0
    }
    get curCol() { return this._curCol }
    set curCol(n: n) { this._curCol = n }
    get colCnt() { return itrMax(itrMap(vLen)(this.dry)) as n }
    get ly() { return sdryLy(this.sdry) }
    get lines() { return sdryLines(this.sdry) }
    get col() { return itrMap(ayEleOrDft('')(this.curCol))(this.dry) }
    get sdry() { return itrMap(aySy)(this.dry) as sdry }
    setCurCol(n: n) { this.curCol = n; return this }
    mdyAllCell(f: f) { itrEach(ayMdy(f))(this.dry) }
    //clone() { return new Dry(itrMap(dr => itrClone(dr)(this.dry))}
    mdyCol(f: f, colIx: n) { itrEach(ayMdyEle(colIx)(f))(this.dry) }
    brw() { sBrw(this.lines) }
}
export const dry = (a: dry) => new Dry(a)
// ================
if (module.id === '.') {
    const tst__Dry = () => {
        const a = new Dry(nyCmlSdry(srcExpConstNy(src())))
        debugger
    }
    const tst__drsOf_exportFunctions = () => {
        require('webpack')
        require('curryfun')
        const a = drsof_exportFunctions()
        const xx = dry(a.dry)
        xx.setCurCol(1).brw()
        debugger
        //drsBrw(a)
    }
    const src = () => ftLy(ffnFts(__filename))
    const tst__srcExpConstNy = () => pipe(src())(srcExpConstNy, lyBrwStop)
    const tst__pthFnAyPm = () => pthFnAyPm(__dirname).then(lyBrwStop)
    const tst__cmlSpcNm = () => pipe(__filename)(ffnFts, ftsExpConstNy, itrMap(cmlSpcNm), lyBrwStop)
    const tst__sNmSet = () => pipe(__filename)(ftLines, sNmSet, ssetSrtBrw, stop)
    const tst__cmlNy = () => cmlNy('abAySpc')
    const tst__sLik = () => { if (!sLik("abc?dd")("abcxdd")) { debugger } }
    const tst__ftsExpConstNyBrw = () => pipe(__filename)(ffnFts, ftsExpConstNyBrw, stop)
    const tst__sBox = () => sBrw(sBox('johnson xx'))
    const tst__pthBrw = () => pthBrw(tmppth)
    const tst__sBrwAtFdrFn = () => sBrwAtFdrFn('aa', '1.json')('[1,2]')
    const tst__isEq = () => {
        if (isEq(1, '1'))
            debugger
        if (!isEq(1, 1))
            debugger
        if (!isEq({ a: 1 }, { a: 1 }))
            debugger
    }
    const tst__vidVal = () => {
        const v = '234234'
        vSav('a')(v)
        const v1 = vidVal('a')
        assertIsEq(v, v1)
    }
    const tst__sidStr = () => {
        const s = '234234'
        sSav('a')(s)
        const s1 = vidVal('a')
        assertIsEq(s, s1)
    }
    const tst__vidpthBrw = () => vidpthBrw()
    const tst__sidpthBrw = () => sidpthBrw()
    tst__srcExpConstNy()
    //tst__vidVal()
    //tst__sidStr()
    //tst__vidpthBrw()
    //tst__isEq()
    //tst__pthBrw()
    //tst__sBrwAtFdrFn()
    /*
    tst__drsOf_exportFunctions()
    tst__pthFnAyPm()
    tst__cmlSpcNm ()
    tst__sNmSet   ()
    tst__cmlNy    ()
    tst__sLik     ()
    tst__ftsExpConstNyBrw()
    */
}