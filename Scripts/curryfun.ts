import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import * as child_process from 'child_process'
/// <reference path="./typings/node/node.d.ts"/>
declare type ay = Array<any>
declare type s = string
declare type map = Map<any, any>
declare type itr = Iterable<any>
declare type pth = s
declare type p = (a: any) => boolean
declare type f = (a: any) => any
declare type cummulator = (cum: any) => (itm: any) => any
declare type re = RegExp
declare type brk = (sep: s) => (s: s) => s1s2
declare type tak = (sep: s) => (s: s) => s
declare type sTfm = (s: s) => s
declare type sOrRe = s | re
declare type sOrSy = s | s[]
declare type ensSy = (sOrSy: sOrSy) => void
declare type ensRe = (sOrRe: sOrRe) => void
declare type n = number
declare type split = (s: s) => s[]
interface s1s2 { s1: string, s2: string }
interface erRslt { er: any, rslt: any }
//---------------------------------------
export const strictEqual = require('assert').strictEqual
const eq = act => exp => { try { strictEqual(act, exp) } catch (e) { debugger } }
//---------------------------------------
const vEQ = a => v => a === v
const vNE = a => v => a !== v
const vGT = a => v => v > a
const vIN = (itr: itr) => v => { for (let i of itr) if (i === v) return true; return false }
const vNIN = (itr: itr) => v => !vIN(itr)(v)
const vLT = a => v => v < a
const vGE = a => v => v >= a
const vLE = a => v => v <= a
const vBET = (a, b) => v => a <= v && v <= b
const vNBET = (a, b) => v => !vBET(a, b)(v)
const vIsInstanceOf = x => v => v instanceof x
const ensSy: ensSy = sOrSy => {
    if (isSy(sOrSy)) return sOrSy
    if (typeof sOrSy === 'string') {
        let s: string = sOrSy
        return splitSpc(sOrSy)
    }
    er('Given [syOrStr] is neither str nor sy', sOrSy)
}
const ensRe: ensRe = sOrRe => isRe(sOrRe) ? sOrRe : new RegExp(sOrRe)
//-------------------------------------
const pipe = v => (...f: f[]) => { let o = v; for (let ff of f) o = ff(o); return o }
const apply = v => (f: f) => f(v)
const swap = (f: f) => a => b => f(b)(a)
const compose = (...f: f[]) => v => pipe(v)(...f)
//----------------------------------
const dmp = global.console.log
const funDmp = f => dmp(f.toString())
const halt = () => { throw new Error() }
const sEscLf = (s: s) => s.replace('\n', '\\n')
const sEscCr = (s: s) => s.replace('\r', '\\r')
const sEscTab = (s: s) => s.replace('\t', '\\t')
const sEsc = compose(sEscLf, sEscCr, sEscTab)
const sBox = (s: s) => { const b = "== " + sEsc(s) + " ==", a = "=".repeat(b.length); return [a, b, a].join("\r\n") }
const stack = () => { try { throw new Error() } catch (e) { return e.stack } }
const er = (msg: s, ...v) => {
    let a = stack()
    let b = a.split(/\n/)
    let c = b[3]
    let d = c.split(/\s+/)
    let breakingFunNm = d[2]
    let hdr = sBox(breakingFunNm)
    dmp(hdr)
    dmp(`error[${msg}] ------------------------\n`)
    each(dmp)(v)
    dmp(a)
    dmp('------------------------------------------------')
    let dbg = true
    debugger
    if (dbg) halt()
}
//-----------------------------------------------------------------------
const split = (sep: sOrRe) => (s: s) => s.split(sep)
const splitCrLf = split('\r\n')
const splitLf = split('\n')
const splitSpc = split(/\s+/)
const splitCommaSpc = split(/,\s*/)
//-----------------------------------------------------------------------
const dft = <a>(dft: a) => (v: a | undefined | null) => v === null || v === undefined ? dft : v
const dftUpper = <a>(a: a, b: a) => (v: a | undefined | null) => v === null || v === undefined || a > v || v > b ? b : v
const dftLoower = <a>(a: a, b: a) => (v: a | undefined | null) => v === null || v === undefined || a > v || v > b ? a : v
const ayFindIx = (p: p) => (ay: ay) => { for (let i in ay) if (p(ay[i])) return Number(i); return null }
const ayFindIxOrDft = (dftIx: n) => (p: p) => (ay: ay) => { let n: n = dft(dftIx)(ayFindIx(p)(ay)); return n }
const ayFst = (ay: ay) => ay[0]
const aySnd = (ay: ay) => ay[1]
const ayLas = (ay: ay) => ay[len(ay) - 1]
const ayEle = (ix: n) => (ay: ay) => ay[ix]
const ayTfm = (f: f) => (ay: ay) => { for (let i in ay) ay[i] = f(ay[i]) }
const aySetEle = (ix: n) => v => (ay: ay) => ay[ix] = v
const ayTfmEle = (ix: n) => (f: f) => (ay: ay) => ay[ix] = f(ay[ix])
//-----------------------------------------------------------------------
const jn = (sep?: s) => (ay: ay) => ay.join(sep)
const jnCrLf = jn('\r\n')
const jnLf = jn('\n')
const jnSpc = jn(' ')
const jnComma = jn(',')
const jnCommaSpc = jn(', ')
const spc = (n: n) => ' '.repeat(n)
const jnAsLines = (sep0?: s, tab0?: n, wdt0?: n) => (sy: s[]) => {
    let wdt = dftUpper(20, 120)(wdt0)
    let sep = dft('')(sep0)
    let slen = sep.length
    let pfx = spc(dft(0)(tab0))
    let a = (()=> {
        debugger
        const oo: ay = []
        let o: ay = []
        let ww = 0
        for (let s of sy) {
            let l = len(s) + slen
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
    let b = jnCrLf(a)
    return b
}
//-----------------------------------------------------------------------
const fstChr = (s: s) => s[0]
const lasChr = (s: s) => s[s.length - 1]
const addPfx = (pfx: s) => v => pfx + v
const addSfx = (sfx: s) => v => v + sfx
const addPfxSfx = (pfx: s, sfx: s) => v => pfx + v + sfx
const len = v => (v && v.length) || String(v).length
const midN = (pos: n) => (n: n) => (s: s) => s.substr(pos, n)
const mid = (pos: n) => (s: s) => s.substr(pos)
const left = (n: n) => (s: s) => s.substr(0, n)
const trim = (s: s) => s.trim()
const right = (n: n) => (s: s) => {
    const l = len(s)
    if (n >= l) return s
    if (0 >= n) return ''
    return s.substr(-n)
}
const padZero = (dig: n) => (n: n) => {
    const s = String(n)
    const nZer = dig - s.length
    const z = nZer > 0 ? "0".repeat(nZer) : ""
    return z + s
}
const alignL = (w: n) => (s: s) => {
    const l = len(s)
    if (l > w) return s
    return s + spc(w - l)
}
const alignR = w => s => {
    const l = len(s)
    if (l > w) return s
    return spc(w - l) + s
}
const sWrt = ft => s => fs.writeFileSync(ft, s)
const sbsPos = (sbs: s) => (s: s) => { const l = sbs.length; for (let j = 0; j < s.length - l + 1; j++) if (sbs === s.substr(j, l)) return j; return -1 }
//strictEqual(sbsPos('aabb')('123aabb'),3)
const sbsRevPos = (sbs: s) => (s: s) => {
    const sbsLen = sbs.length
    for (let j = s.length - sbsLen + 1; j > 0; j--) {
        if (sbs === s.substr(j, sbsLen)) return j
    }
    return -1
}
//strictEqual(sbsRevPos('a')('0123aabb'),5)
const cmlNm = (nm: s) => cmlNy(nm).reverse().join(' ') // @eg cmlNm(relItmNy) === 'Ny Itm rel'
const cmlNy = (nm: s) => {
    const o: s[] = []
    if (nm.trim() === '')
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
        while (nm.length > 0) {
            if (j++ > 100) { debugger; throw null }
            if (/^[A-Z]/.test(nm))
                return o
            o += pchr()
        }
        return o
    }
    function pchr() {
        if (nm === '')
            return ''
        const o = nm[0]
        nm = rmvFstChr(nm)
        return o
    }
}
const hasPfx = (pfx: s) => (s: s) => s.startsWith(pfx)
const rmvPfx = (pfx: s) => (s: s) => hasPfx(s) ? s.substr(pfx.length) : s
const hasSfx = (sfx: s) => (s: s) => s.endsWith(sfx)
const rmvSfx = (sfx: s) => (s: s) => hasSfx(s) ? s.substr(0, s.length - sfx.length) : s
const match = re => s => s.match(re)
const notMatch = re => s => !(match(re)(s))
//-----------------------------------------------------------------------
const predsOr = (...p) => v => { for (let pp of p) if (pp(v)) return true; return false }
const predsAnd = (...p) => v => { for (let pp of p) if (!pp(v)) return false; return true }
const predNot = pred => itm => !pred(itm)
//-----------------------------------------------------------------------
const isRmkLin = lin => {
    const l = lin.trim()
    if (l === "") return true
    if (hasPfx("--")(l)) return true
    return false
}
const isNonRmkLin = predNot(isRmkLin)
const linRmvMsg = lin => {
    const a = lin.match(/(.*)---/)
    const b = a === null ? lin : a[1]
    if (hasPfx("^")(b.trimLeft())) return ""
    return b
}
//------------------------------------------------------------------
const brkAt: (at: n, len: n) => (s: s) => s1s2 = (at, len) => s => {
    const s1 = left(at)(s).trim()
    const s2 = mid(at + len)(s).trim()
    return { s1, s2 }
}
const brk1: brk = sep => s => { const at = sbsPos(sep)(s); return at === -1 ? { s1: trim(s), s2: '' } : brkAt(at, len(sep))(s) }
const brk2: brk = sep => s => { const at = sbsPos(sep)(s); return at === -1 ? { s1: '', s2: trim(s) } : brkAt(at, len(sep))(s) }
const brk: brk = sep => s => { const at = sbsPos(sep)(s); return brkAt(at, len(sep))(s) }
const brkQuote = (quote: s) => {
    const l = len(quote)
    if (l === 1) return { q1: quote, q2: quote }
    if (l === 2) return { q1: quote.substr(0, 1), q2: quote.substr(1) }
    let p = sbsPos("*")(quote)
    if (p === -1) return null
    let { s1: q1, s2: q2 } = brkAt(p, 1)(quote)
    return { q1, q2 }
}
const quote = q => s => {
    let a = brkQuote(q);
    if (a === null) return s; else { let { q1, q2 } = a; return q1 + s + q2 };
}
//-----------------------------------------------------------------------
const takBef: tak = sep => s => revBrk2(sep)(s).s1
const takAft: tak = sep => s => revBrk1(sep)(s).s2
//-----------------------------------------------------------------------
const revBrk1: brk = sep => s => { const at = sbsPos(sep)(s); return at === -1 ? { s1: trim(s), s2: '' } : brkAt(at, len(sep))(s) }
const revBrk2: brk = sep => s => { const at = sbsPos(sep)(s); return at === -1 ? { s1: '', s2: trim(s) } : brkAt(at, len(sep))(s) }
const revBrk: brk = sep => s => { const at = sbsRevPos(sep)(s); return brkAt(at, len(sep))(s) }
const revTakBef: tak = sep => s => revBrk2(sep)(s).s1
const revTakAft: tak = sep => s => revBrk1(sep)(s).s2
//-----------------------------------------------------------------------
const rmvFstChr: sTfm = mid(1)
const rmvLasChr: sTfm = s => left(len(s) - 1)(s)
const rmvLasNChr = (n: n) => (s: s) => left(len(s) - n)(s)
const rmvSubStr = (sbs: s) => (s: s) => { const re = new RegExp(sbs, 'g'); return s.replace(re, '') }
const rmvColon = rmvSubStr(":")
const pthSep = path.sep
const ffnPth = (ffn: s) => { const at = sbsRevPos(pthSep)(ffn); return at === -1 ? '' : left(at + 1)(ffn) }
const ffnFn = (ffn: s) => { const at = sbsRevPos(pthSep)(ffn); return at === -1 ? ffn : mid(at + 1)(ffn) }
const ffnExt = (ffn: s) => { const at = sbsRevPos('.')(ffn); return at === -1 ? '' : mid(at)(ffn) }
const ffnAddFnSfx = (sfx: s) => (ffn: s) => ffnFfnn(ffn) + sfx + ffnExt(ffn)
const rmvExt = (ffn: s) => { const at = sbsPos('.')(ffn); return at === -1 ? ffn : left(at)(ffn) }
const ffnFfnn = rmvExt
const ffnFnn = (ffn: s) => ffnFn(rmvExt(ffn))
const ffnRplExt = (ext: s) => (ffn: s) => rmvExt(ffn) + ext
//-----------------------------------------------------------------------
const ftLines: (ft: s) => s = ft => (fs.readFileSync(ft).toString())
const ftLy: (ft: s) => s[] = ft => splitCrLf(ftLines(ft))
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
//-----------------------------------------------------------------------
/**
 * @description return a Promise of {er,rslt} by calling f(...,p,cb), where cb is (er,rslt)=>{...}
 * it is usefully in creating a promise by any async f(...p,cb), assuming cb is (er,rslt)=>{...}
 * @param {(er,rslt)=>void} f 
 * @param {...any} p 
 * @see
 */
const pm = (f, ...p) => new Promise<any>(
    (rs, rj) => {
        f(...p, (e, rslt) => {
            e ? rj(e) : rs(rslt)
        })
    }
)
const ftLinesPm = (ft: s) => pm(fs.readFile, ft).then(rslt => rslt.toString())
const ftLyPm = (ft: s) => ftLinesPm(ft).then(lines => splitCrLf(lines))
const pthEns = (a: pth) => { if (!fs.existsSync(a)) fs.mkdirSync(a) }
const isPthExist = (a: pth) => fs.existsSync(a)
const assertIsPthExist = (a: pth) => { if (!isPthExist(a)) er(`path does not exist [${a}]`) }
const pthEnsSfxSep = (a: pth) => lasChr(a) === pthSep ? a : a + pthSep
const pthEnsSubFdr = (subFdr: s) => (pth: s) => {
    assertIsPthExist(pth)
    let b = subFdr.split(/[\\\/]/)
    let c = itrRmvEmp(b)
    let d = pthEnsSfxSep(pth)
    let e: ay = []
    for (let seg of c) {
        d += seg + '\\';
        e.push(d)
    }
    each(pthEns)(e)
}
//-----------------------------------------------------------------------
const where = (p: p) => (a: itr) => { const o: ay = []; for (let i of a) if (p(i)) o.push(i); return o }
const exclude = (p: p) => (a: itr) => { const o: ay = []; for (let i of a) if (!p(i)) o.push(i); return o }
const map = (f: f) => (a: itr) => { const o: ay = []; for (let i of a) o.push(f(i)); return o }
type mapSy = (f: f) => (a: itr) => s[]
const mapSy: mapSy = map
const each = (f: f) => (a: itr) => { for (let i of a) f(i) }
const fold = (f: cummulator) => cum => (a: itr) => { for (let i of a) cum = f(cum)(i); return cum }
const reduce = f => (a: itr) => fold(f)(itrFst(a))(a)
//---------------------------------------------------------------------------
const mapKy = (a: map) => a.keys()
const mapVy = (a: map) => a.values()
const mapKvy = (a: map) => a.entries()
const mapKset = (a: map) => new Set(a.keys())
//---------------------------------------------------------------------------
const setAy = set => { const o: ay = []; for (let i of set) o.push(i); return o }
const setWhere = p => set => {
    const z = new Set
    for (let i of set)
        if (p(i))
            z.add(i)
    return z
}
const setAdd = x => set => { for (let i of x) set.add(i); return set }
const setMinus = x => set => { for (let i of x) set.delete(i); return set }
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
const setAft = aft => a => _setAft(false, aft, a)
const setAftIncl = a => set => _setAft(true, a, set)
const setClone = set => itrSet(set)
const itrSet = itr => { const o = new Set; for (let i of itr) o.add(i); return o }
const setMap = f => set => { const o = new Set; for (let i of set) o.add(f(i)); return o }
//---------------------------------------------------------------------------
type ly = s[]
type col = s[]
type sy = s[]
type lyMatchAy = (re: RegExp) => (ly: s[]) => RegExpMatchArray
type lyReCol = (re: re) => (ly: ly) => col
type Sdry = s[][]
type lyReSdry = (re: re) => (ly: ly) => Sdry
const lyReDry: lyReSdry = re => ly => map(matchDr)(lyMatchAy(re)(ly))
const lyReCol: lyReCol = re => ly => matchAyFstCol(lyMatchAy(re)(ly)).sort()
const matchAyDry = matchAy => map(matchDr)(matchAy)
const matchAyFstCol = matchAy => mapSy(ayEle(1))(matchAy)
const lyMatchAy: lyMatchAy = re => ly => itrRmvEmp(map(match(re))(ly))
const matchDr = (a: RegExpMatchArray) => [...a].splice(1)
const lyConstNy = lyReCol(/^const\s+([$\w][$0-9\w_]*) /)
const lyConstDollarNy = lyReCol(/^const (\$[$0-0\w_]*) /)
const ftConstNy = ft => pipe(ft)(ftLy, lyConstNy)
const ftConstDollarNy = ft => pipe(ft)(ftLy, lyConstDollarNy)
//---------------------------------------------------------------------------
const isStr = v => typeof v === 'string'
const isNum = v => typeof v === 'number'
const isBool = v => typeof v === 'boolean'
const isObj = v => typeof v === 'object'
const isSy = v => {
    if (!isAy(v)) return false
    if (isEmp(v)) return true
    return isStr(v[0])
}
const isAy = Array.isArray
const isDte = vIsInstanceOf(Date)
const isFun = vIsInstanceOf(Function)
const isRe = v => vIsInstanceOf(RegExp)
const isNonNull = v => v !== null
const isNull = v => v === null
const isUndefined = v => v === undefined
const isTrue = v => !!v;
const isFalse = v => !v;
const isEmp = v => v ? false : true
const isNonEmp = v => v ? true : false
const isOdd = n => n % 2 === 1
const isEven = n => n % 2 === 0
//----------------------------------------------------------------------------
const sSearch = (re: RegExp) => (s: s) => s.search(re)
const sBrkP123 = (quote: s) => (s: s) => {
    const a = brkQuote(quote)
    if (a === null) return null
    else {
        const { q1, q2 } = a
        const l = s.length
        const q1pos = s.indexOf(q1);
        const q2pos = s.indexOf(q2, q1pos + 1);
        const len1 = q1pos
        const pos2 = q1pos + q1.length
        const pos3 = q2pos + q2.length
        const len2 = pos3 - pos2 - 1
        const p1 = s.substr(0, len1)
        const p2 = s.substr(pos2, len2)
        const p3 = s.substr(pos3)
        return { p1, p2, p3 }
    }
}
//let a = sBrkP123("(backup-*)")("slkdfjlsdjf(backup-123).exe");debugger
//----------------------------------------------------------------------------
const itrIsAllTrue = (a: itr) => { for (let i of a) if (isFalse(i)) return false; return true }
const itrIsAllFalse = (a: itr) => { for (let i of a) if (isTrue(i)) return false; return true }
const itrIsSomeTrue = (a: itr) => { for (let i of a) if (isTrue(i)) return true; return false }
const itrIsSomeFalse = (a: itr) => { for (let i of a) if (isFalse(i)) return true; return false }
const itrPredIsAllTrue = (p: p) => (a: itr) => { for (let i of a) if (!p(i)) return false; return true }
const itrPredIsAllFalse = (p: p) => (a: itr) => { for (let i of a) if (p(i)) return false; return true }
const itrPredIsSomeFalse = (p: p) => (a: itr) => { for (let i of a) if (!p(i)) return true; return false }
const itrPredIsSomeTrue = (p: p) => (a: itr) => { for (let i of a) if (p(i)) return true; return false }
const itrBrkForTrueFalse = (p: p) => (a: itr) => { const t: ay = [], f: ay = []; for (let i of a) p(i) ? t.push(i) : f.push(i); return [t, f] }
const itrAy = (a: itr) => { const o: ay = []; for (let i of a) o.push(i); return o }
const itrFst = (a: itr) => { for (let i of a) return i; return null }
const itrAddPfxSfx = (pfx, sfx) => (a: itr) => map(addPfxSfx(pfx, sfx))(a)
const itrAddPfx = pfx => (a: itr) => map(addPfx(pfx))(a)
const itrAddSfx = sfx => (a: itr) => map(addSfx(sfx))(a)
const itrWdt = (a: itr) => Number(pipe(map(len)(a))(itrMax))
const itrAlignL = (a: itr) => map(alignL(itrWdt(a)))(a)
const itrClone = (a: itr) => map(i => i)(a)
const itrFind = (p: p) => (a: itr) => { for (let i of a) if (p(i)) return i; return null }
const itrHasDup = (a: itr) => { const set = new Set(); for (let i of a) if (set.has(i)) { return true } else set.add(i); return false }
const itrDupSet = (a: itr) => { const set = new Set(), o = new Set(); for (let i in a) if (set.has(i)) { o.add(i) } else set.add(i); return o }
const itrMax = (a: itr) => { let o = itrFst(a); for (let i of a) if (i > o) o = i; return o }
const itrMin = (a: itr) => { let o = itrFst(a); for (let i of a) if (i < o) o = i; return o }
const itrRmvEmp = (a: itr) => where(isNonEmp)(a)
//-----------------------------------------------------------------------------------------
const must = (p, t) => v => { if (!p(v)) er(`given v must be [${t}]`, { v }) }
const mnon = (p, t) => v => { if (p(v)) er(`given v must be non-[${t}]`, { v }) }
const musFun = must(isFun, 'Function')
const musNum = must(isNum, 'Number')
const musStr = must(isStr, 'String')
const musAy = must(isAy, 'Array')
const musObj = must(isObj, 'Object')
const musDte = must(isDte, 'Date')
const mnonEmp = mnon(isEmp, 'Emp')
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
const oBringUpDollarPrp = o => {
    musObj(o)
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
const oCmlDry = o => {
    let oo = map(n => [cmlNm(n), n])(oPrpNy(o))
    drySrt(ayEle(0))(oo)
    const w = dryColWdt(0)(oo)
    const a = alignL(w)
    dryTfmCol(0)(a)(oo)
    return oo
}
const oCtorNm = o => o && o.constructor && o.constructor.name
const oIsInstance = instance => o => o instanceof instance
const oHasCtorNm = nm => o => oCtorNm(o) === nm
/**
 * @description return the property value of object {o} by property path {pprPth}
 * @param {string} prpPth
 * @example
 * const a = {b: {c:{1}}
 * require('assert').equal(prp('b.c')(o), 1) 
 */
const oPrp = (prpPth: s) => (o: object) => { for (let nm of prpPth.split('.')) if (!(o = o[nm])) return undefined; return o }
const oPrpAy = (prpNy: s[]) => (o: object) => map(nm => oPrp(nm)(o))(prpNy)
const oPrpNy = o => Object.getOwnPropertyNames(o)
const oHasPrp = prpNm => o => { try { return o[prpNm] !== undefined } catch (e) { return false } }
const oHasLen = oHasPrp('length')
const oCmlObj = o => {
    const dry = oCmlDry(o)
    const oo = {}
    dry.forEach(([cmlNm, prpNm]) => oo[cmlNm] = o[prpNm])
    return oo
}
// ----------------------------------------------
const ayClone = (ay: ay) => ay.slice(0, ay.length)
// ----------------------------------------------
const dryColWdt = colIx => dry => itrWdt(dryCol(colIx)(dry))
const dryColWdtAy = dry => map(i => dryColWdt(i)(dry))(nItr(dryColCnt(dry)))
const dryCol = colIx => dry => map(ayEle(colIx))(dry)
const dryColCnt = dry => itrMax(map(len)(dry))
const dryTfmCell = f => dry => { each(ayTfm(f))(dry) }
const dryClone = dry => map(dr => itrClone(dr))(dry)
const dryTfmCol = colIx => f => dry => { each(ayTfmEle(colIx)(f)) }
const drySrt = fun_of_dr_to_key => dry => dry.sort((dr_A, dr_B) => compare(fun_of_dr_to_key(dr_A), fun_of_dr_to_key(dr_B)))
//-----------------------------------------------------------------------
const oyPrpCol = prpNm => oy => { const oo: ay = []; for (let o of oy) oo.push(o[prpNm]); return oo }
const oyPrpDry = prpNy => oy => { const oo: ay = []; for (let o of oy) oo.push(oPrpAy(prpNy)(o)); return oo }
//---------------------------------------
const _isEsc = i => { for (let spec of "()[]{}/|.+") if (i === spec) return true }
const _escSpec = lik => { const o: ay = []; for (let i of lik) o.push(i === '\\' ? '\\\\' : (_isEsc(i) ? '\\' + i : i)); return o.join('') }//; const xxx = _escSpec("abc?dd"); debugger
const _escStar = lik => { const o: ay = []; for (let i of lik) o.push(i === '*' ? '.*' : i); return o.join('') }
const _escQ = lik => { const o: ay = []; for (let i of lik) o.push(i === '?' ? '.' : i); return o.join('') }
const _esc = lik => "^" + pipe(lik)(_escSpec, _escStar, _escQ) + "$"
const _likRe = lik => new RegExp(_esc(lik))
const sLik = (lik: s) => (s: s) => {
    let a = _likRe(s)
    let o = a.test(s)
    return o
}// strictEqual(sLik("abc?dd")("abcxdd"), true); debugger
const _isEscSbs = i => { for (let spec of "()[]{}/|.+?*") if (i === spec) return true }
const hasSbs = (sbs: s) => (s: s) => {
    const ay: ay = []
    for (let i of sbs) ay.push(i === '\\' ? '\\\\' : (_isEscSbs(i) ? '\\' + i : i));
    const _escSpec = ay.join('')
    const _sbsRe = new RegExp(_escSpec)
    let o = _sbsRe.test(s)
    return o
}
//---------------------------------------
const pthFnAy = (pth: s, lik?: s) => {
    if (!fs.existsSync(pth)) return null
    const isFil = entry => fs.statSync(path.join(pth, entry)).isFile();
    let entries = fs.readdirSync(pth)
    entries = (lik === undefined) ? entries : where(sLik(lik))(entries)
    let o: s[] = where(isFil)(entries)
    return o
}; // const xxx = pthFnAy("c:\\users\\user\\", "sdfdf*.*"); debugger;
const ayZip = (a: ay, b: ay) => map(i => [a[i], b[i]])(nItr(a.length))
const pthFnAyPm = async (pth: s, lik?: s) => {
    const entries = await pm(fs.readdir, pth)
    const stat = entry => pm(fs.stat, path.join(pth, entry))
    let a = (lik === undefined) ? entries : where(sLik(lik))(entries)
    let b = await Promise.all(map(stat)(a))
    let c: s[] = pipe(nItr(entries.length))(where(i => b[i].isFile()), map(i => entries[i]))
    debugger
    return c
}
//---------------------------------------
const multiply = a => b => a * b
const divide = a => b => b / a
const add = a => b => a + b
const minus = a => b => b - a
const decr = minus(1)
const incr = add(1)
const nItr = function* (n) { for (let j = 0; j < n; j++) yield j }
// --------------------------------------------------------------------------
const compare = (a, b) => a === b ? 0 : a > b ? 1 : -1
const lazy = vf => { let v, done = false; return () => { if (!done) { v = vf(); done = true }; return v } }
//---------------------------------------------------------------------------
const optMap = (f: f) => a => a === null ? f(a) : a
const ffnMakBackup = (ffn: s) => {
    const ext = ffnExt(ffn)
    const ffnn = rmvExt(ffn)
    const pth = ffnPth(ffn)
    let a = right(12)(ffnn)
    const isBackupFfn = (hasPfx("(backup-")(a)) && (hasSfx(")")(a))
    const fn = ffnFn(ffn)
    const backupSubFdr = `.backup\\${fn}\\`
    const backupPth = pth + backupSubFdr

    if (ext === '.backup') er("given [ext] cannot be '.backup", { ext, ffnn })
    if (isBackupFfn) er("ffn cannot be a backup file name", { ffn })

    let b = pthFnAy(backupPth, ffnn + '(backup-???)' + ext)
    let nxtBackupNNN =
        b === null || isEmp(b) ? '000' :
            pipe(b)(itrMax, rmvExt, rmvLasChr, right(3), Number.parseInt, incr, padZero(3))
    const backupFfn = backupPth + ffnAddFnSfx(`(backup-${nxtBackupNNN})`)(fn)
    pthEnsSubFdr(backupSubFdr)(pth); fs.copyFileSync(ffn, backupFfn)
}
const lyExpStmt = ly => {
    let ny = lyConstNy(ly)
    ny = where(predNot(hasPfx("_")))(ny).sort()
    const x = jnAsLines(", ", 4, 120)(ny)
    const stmt = "module.exports = {\r\n" + x + "\r\n}"
    return stmt
}
const curExpStmt = () => pipe(__filename)(ftLy, lyExpStmt)
// dmp(curExpStmt); debugger
const fjsRplExpStmt = fjs => {
    const oldLy = ftLy(fjs)
    const newLin = lyExpStmt(oldLy)

    let oldBegIx = ayFindIx(hasPfx("module.exports = {"))(oldLy)
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
        const hasOldLin = oldLin != null
        switch (true) {
            case (hasNewLin && hasOldLin):
                if (oldBegIx !== null) { oldLy.splice(oldBegIx, oldEndIx, newLin); return jnCrLf(oldLy) }
                else { er("impossible"); halt() }
            case (hasNewLin && !hasOldLin):
                return jnCrLf(oldLy.concat(newLin))
            case (hasOldLin):
                if (oldBegIx === null) {
                    er("impossible")
                } else { oldLy.splice(oldBegIx, oldEndIx); return jnCrLf(oldLy) }
            default:
                er("impossible"); halt()
        }
        return jnCrLf(oldLy)
    }
    let a = newLines()
    /*
    if (oldLin !== newLin) { debugger; ffnMakBackup(fjs); sWrt(fjs)(newLines()) }
    */
}
type vTee = (f: f) => (v: any) => any
const vTee: vTee = f => a => { f(a); return a }
const ftWrt = (s: s) => (ft: s) => fs.writeFileSync(ft, s)
const cmdShell = (a: s) => child_process.exec(a)
const ftBrw = (a: s) => cmdShell(`code.cmd "${a}"`)
const sBrw = s => pipe(tmpFt())(vTee(ftWrt(s)), ftBrw)
const oLines = o => JSON.stringify(o)
sBrw(curExpStmt())
//fjsRplExpStmt(ffnRplExt(".ts")(__filename))
module.exports = { add, addPfx, addPfxSfx, addSfx, alignL, alignR, apply, assertIsPthExist, ayEle, ayFindIx, ayFindIxOrDft, ayFst, ayLas, aySetEle, aySnd, ayTfm, ayTfmEle, ayZip, brkQuote, cmdShell, cmlNm, cmlNy, compare, compose, curExpStmt, decr, dft, divide, dmp, dryClone, dryCol, dryColCnt, dryColWdt, dryColWdtAy, drySrt, dryTfmCell, dryTfmCol, each, eq, er, exclude, ffnAddFnSfx, ffnExt, ffnFfnn, ffnFn, ffnFnn, ffnMakBackup, ffnPth, ffnRplExt, fjsRplExpStmt, fold, fstChr, ftBrw, ftConstDollarNy, ftConstNy, ftLinesPm, ftLyPm, ftWrt, funDmp, halt, hasPfx, hasSfx, incr, isAy, isBool, isDte, isEmp, isEven, isFalse, isFun, isNonEmp, isNonNull, isNonRmkLin, isNull, isNum, isObj, isOdd, isPthExist, isRe, isRmkLin, isStr, isSy, isTrue, isUndefined, itrAddPfx, itrAddPfxSfx, itrAddSfx, itrAlignL, itrAy, itrBrkForTrueFalse, itrClone, itrDupSet, itrFind, itrFst, itrHasDup, itrIsAllFalse, itrIsAllTrue, itrIsSomeFalse, itrIsSomeTrue, itrMax, itrMin, itrPredIsAllFalse, itrPredIsAllTrue, itrPredIsSomeFalse, itrPredIsSomeTrue, itrRmvEmp, itrSet, itrWdt, jn, jnComma, jnCommaSpc, jnCrLf, jnLf, jnSpc, lasChr, lazy, left, len, linRmvMsg, lyConstDollarNy, lyConstNy, lyExpStmt, lyMatchAy, lyReCol, lyReDry, map, mapKset, mapKvy, mapKy, mapVy, match, matchAyDry, matchAyFstCol, matchDr, mid, midN, minus, mnon, mnonEmp, multiply, musAy, musDte, musFun, musNum, musObj, musStr, must, nItr, notMatch, oBringUpDollarPrp, oCmlDry, oCmlObj, oCtorNm, oHasCtorNm, oHasLen, oHasPrp, oIsInstance, oLines, oPrp, oPrpAy, oPrpNy, optMap, oyPrpCol, oyPrpDry, padZero, pipe, pm, predNot, predsAnd, predsOr, pthEns, pthEnsSfxSep, pthEnsSubFdr, pthFnAy, pthFnAyPm, pthSep, quote, reduce, right, rmvColon, rmvExt, rmvLasNChr, rmvPfx, rmvSfx, rmvSubStr, sBox, sBrkP123, sBrw, sEsc, sEscCr, sEscLf, sEscTab, sLik, sSearch, sWrt, sbsPos, sbsRevPos, setAdd, setAft, setAftIncl, setAy, setClone, setMap, setMinus, setWhere, split, splitCommaSpc, splitCrLf, splitLf, splitSpc, stack, strictEqual, swap, tmpFfn, tmpFilFm, tmpFt, tmpNm, tmpPth, trim, vBET, vEQ, vGE, vGT, vIN, vIsInstanceOf, vLE, vLT, vNBET, vNE, vNIN, vTee, where }
