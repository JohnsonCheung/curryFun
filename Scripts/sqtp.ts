/// <reference path="./curryfun.d.ts"/>
import { ix, sset, sdic, p, pfx, cnt, n, s, ay, lin, b, ly } from './curryfun'
import { lyAddErAsLines } from './lyAddErAsLines'
import * as x from './curryfun'
export interface ErItm { ix: n, sfxMsg: s[], endMsg: s[] }
export interface termPos { pos: n, len: n }
export type Er = ErItm[]
export { sqtprslt }
interface bk { bkty: Bkty, gp: gp }
interface ixlinChkr { hasEr: (a: ixlin) => b, erFun: (a: ixlin) => Er }
interface ixlin { ix: n, lin: lin }
const enum Bkty { RM, PM, SW, SQ, ER }
type pos = n
type plin = [pos, lin]
type gp = ixlin[]
type Sw = Map<s, boolean>
type Pm = Map<s, s>
type sql = s
type term = s
type sqtp = s
const sqtprslt = (a: sqtp) => {
    let ly = x.sSplitLf(a)
    let ly1 = lyRmvMsg(ly)
    let gp = lyGp(ly1)
    let gp1 = gpRmvRmk(gp)
    let gpy = gpGpy(gp1, '==')
    let bky = gpyBky(gpy)
    let bky_aftRm = x.itrWhere((bk: bk) => bk.bkty !== Bkty.RM)(bky)
    let [er_er, bky_aftEr] = er02(bky_aftRm)
    let [er_pm, bky_aftPm, pm] = pm03(bky_aftEr)
    let [er_sw, bky_aftSw, sw] = sw04(bky_aftPm, pm)
    let [er_sq, sql] = sq05(bky_aftSw, pm, sw)
    let er = er_er.concat(er_pm, er_sw, er_sq)
    let vtp = lyAddErAsLines(ly1, er)
    return { vtp, sql }
}

const linRmvMsg = (a: lin) => {
    const b = a.match(/(.*)---/)
    const c: lin = b === null ? a : a[1]
    if (x.sHasPfx("^")(c.trimLeft())) return ""
    return c
}

const lyRmvMsg = (a: ly) => {
    let z: ly = x.pipe(a)(x.itrMap(linRmvMsg), x.itrRmvEmp)
    return z
}

const gpRmvRmk = (a: gp) => {
    let z: gp = x.itrWhere(({ ix, lin }) => x.isNonRmkLin(lin))(a)
    return z
}

const lyGp = (a: ly) => {
    const z: ixlin[] = []
    let i = 0
    for (let lin of a)
        z.push({ ix: i++, lin })
    return z
}

const pm03 = (a: bk[]) => {
    const { t, f } = x.itrBrkForTrueFalse((a: bk) => a.bkty === Bkty.PM)(a)
    const pmBky: bk[] = t
    const remain: bk[] = f
    const e1 = bkyEr_forExcessBk(pmBky, 'parameter')
    const [e2, pm] = bkPm(pmBky[0])
    const er = e1.concat(e2)
    let z: [Er, bk[], Pm] = [er, remain, pm]
    return z
}

const sw04 = (a: bk[], pm: Pm) => {
    const { t, f } = x.itrBrkForTrueFalse((a: bk) => a.bkty === Bkty.SW)(a)
    const swBky: bk[] = t
    const remain: bk[] = f
    const e1 = bkyEr_forExcessBk(swBky, 'switch')
    const [e2, sw] = bkSw(swBky[0], pm)
    const er = e1.concat(e2)
    let z: [Er, bk[], Sw] = [er, remain, sw]
    return z
}

const sqSel = (a: bk, term: s, pm: Pm, sw: Sw) => {
    let z: [Er, sql] = [[], ""]
    return z
}
const sqDrp = (a: bk) => {
    let z: [Er, sql] = [[], ""]
    return z
}
const sqUpd = (a: bk, pm: Pm, sw: Sw) => {
    let z: [Er, sql] = [[], ""]
    return z
}
const sqBk = (a: bk, pm: Pm, sw: Sw) => {
    const fstLin = a.gp[0].lin
    const term = x.sRmvPfx("?")(x.linFstTerm(fstLin).toUpperCase())
    let z: [Er, sql] = [[], ""]
    switch (term) {
        case 'DRP': z = sqDrp(a); break
        case 'SEL': case 'DIS': z = sqSel(a, term, pm, sw); break
        case 'UPD': z = sqUpd(a, pm, sw); break
        default:
            x.er('impossible: {bk} should have {term} be one of [Drp | Sel | SelDist | Upd]', { term, bk: a })
    }
    return z
}

const sq05 = (a: bk[], pm: Pm, sw: Sw) => {
    let er: Er = []
    let sql = ""
    for (let bk of a) {
        let [i_er, i_sql] = sqBk(bk, pm, sw)
        er = er.concat(i_er)
        sql = sql === ""
            ? i_sql
            : sql += '\r\n\r\n' + i_sql
    }
    let z: [Er, sql] = [er, sql]
    return z
}

const er02 = (a: bk[]) => {
    let { t: erBky, f: bky } = x.itrBrkForTrueFalse((a: bk) => a.bkty === Bkty.ER)(a)
    let er = bkyEr_forErBky(erBky)
    let z: [Er, bk[]] = [er, bky]
    return z
}

const bkyEr_forErBky = (a: bk[]) => {
    let z: Er = []
    for (let bk of a) {
        const ix = x.ayLas(bk.gp).ix
        z.push(endmsgstrEr(ix, '^^^ this block is error'))
    }
    return z
}

const endmsgstrEr = (ix: n, endMsgStr: s) => {
    const sfxMsg = []
    const endMsg = [endMsgStr]
    let z: ErItm = { ix, endMsg, sfxMsg }
    return z
}

const bkyEr_forExcessBk = (a: bk[], bkNm: s) => {
    const excessbky = a.slice(1)
    const z: Er = []
    if (excessbky.length === 0) return z
    const endMsgStr = `^^^ Three is already [${bkNm}] block.  This block is ignored`
    for (let bk of excessbky) {
        const ix = x.ayLas(bk.gp).ix
        z.push(endmsgstrEr(ix, endMsgStr))
    }
    return z
}

const gpGpy = (a: gp, linPfxSep: s) => {
    let { ix, lin } = a[0]
    const z: gp[] = []
    let curGp: gp = []
    for (let { ix, lin } of a) {
        if (x.sHasPfx(linPfxSep)(lin)) {
            if (curGp.length !== 0)
                z.push(curGp)
            curGp = []
        } else
            curGp.push({ ix, lin })
    }
    if (curGp.length !== 0)
        z.push(curGp)
    return z
}

const gpRmvRmkLin = (a: gp) => {
    let p = ({ ix, lin }) => !x.isRmkLin(lin)
    let z: gp = x.itrWhere(p)(a)
    return z
}

const gpyRmvRmkLin: (a: gp[]) => gp[] = x.itrMap(gpRmvRmkLin)

const assertAyIsEqLen = (ay1: ay, ay2: ay) => {
    if (ay1.length !== ay2.length)
        x.er('two ay are diff len', { ay1, ay2 })
}
const gpLy = (a: gp) => {
    const z: ly = x.itrMap(x.oPrp("lin"))(a);
    return z
}
const gpBk = (a: gp) => {
    const ly = gpLy(a)
    const bkty = lyBkty(ly)
    let z: bk = { bkty, gp: a }
    return z
}
const gpyBky = (a: gp[]) => {
    let z: bk[] = x.itrMap(gpBk)(a)
    return z
}
const _x = x.sSplitSpc("DRP UPD SEL DIS")
const isSqLy = (a: ly) => {
    const fstNonRmkLin: lin = x.itrFind(x.isNonEmp)(a)
    const fstTerm = x.linFstTerm(fstNonRmkLin)
    return x.vIN(_x)(x.sRmvPfx("?")(fstTerm).toUpperCase())
}
const isRmLy = (a: ly) => x.itrPredIsAllTrue(x.isRmkLin)(a)
const isPmLy = (a: ly) => x.lyHasMajPfx("%")(a)
const isSwLy = (a: ly) => x.lyHasMajPfx("?")(a)
const lyBkty = (a: ly) => {
    let o: Bkty
    switch (true) {
        case (isRmLy(a)):
            o = Bkty.RM
            break
        case (isPmLy(a)):
            o = Bkty.PM
            break
        case (isSwLy(a)):
            o = Bkty.SW
            break
        case (isSqLy(a)):
            o = Bkty.SQ
            break
        default:
            o = Bkty.ER
    }
    return o
}

const lySdic = (a: ly) => {
    const z: sdic = new Map()
    for (let lin of a) {
        const { term: k, remainLin: s } = x.linShift(lin)
        z.set(k, s)
    }
    return z
}
const lyFstTermAy = (a: ly) => {
    let z: ly = x.itrMap(x.linFstTerm)(a)
    return z
}

const lyFstTermDupSet = (a: ly) => {
    const fstTermAy = x.itrMap(x.linFstTerm)(a)
    let z: sset = x.itrDupSet(fstTermAy)
    return z
}
// remove all, except after, lines in {a} with {fstTerm} as [gp] and 
// put the removed lines as Er
// return [Er,gp]
const _x1 = (a: gp, fstTerm: s) => {
    const ixay: n[] = []
    for (let { ix, lin } of a) {
        let fst = x.linFstTerm(lin)
        if (fstTerm === fst) ixay.push(ix)
    }
    ixay.pop()
    const ixset = new Set<n>(ixay)
    return _x2(a, ixset)
}
const _x2 = (a: gp, ixset: Set<n>) => {
    // return [Er, gp]
    const er: Er = []
    const gp: gp = []
    for (let { ix, lin } of a) {
        if (ixset.has(ix)) {
            let fst = x.linFstTerm(lin)
            let sfxMsg = [`duplicate(${fst})`]
            let endMsg = []
            const m = { ix, sfxMsg, endMsg }
            er.push(m)
        } else {
            gp.push({ ix, lin })
        }
    }
    let z: [Er, gp] = [er, gp]
    return z
}

const gpDupFstTermEr = (a: gp) => {
    const ly = gpLy(a)
    const dup = lyFstTermDupSet(ly)
    let er: Er = []
    let gp = a
    for (let itm of dup) {
        let [e, g] = _x1(gp, itm)
        er = er.concat(e)
        gp = g
    }
    const z: [Er, gp] = [er, gp]
    return z
}

const gpPfxEr = (a: gp, pfx: s) => {
    const er: Er = []
    const gp: gp = []
    const sfxMsg = []
    for (let { ix, lin } of a) {
        if (!x.sHasPfx(pfx)(lin)) {
            const endMsg = ['^---- prefix must be (' + pfx + ')']
            const m: ErItm = { ix, endMsg, sfxMsg }
            er.push(m)
        } else {
            gp.push({ ix, lin })
        }
    }
    const z: [Er, gp] = [er, gp]
    return z
}
const plinParseSpc = (a: plin) => {
    let [pos, lin] = a
    for (var p = pos; p < lin.length; p++) {
        if (!x.isSpc(lin[p])) 
            break
    }
    let z: [pos, lin] = [p, lin]
    return z
}

const plinParseTerm = (a: plin) => {
    let term = ''
    const [pos, lin] = a
    for (var p = pos; p < lin.length; p++) {
        const c = lin[p]
        if (/\s/.test(c))
            break
        else    
            term += c
    }
    let z: [term, [pos, lin]] = [term, [p, lin]]
    return z
}

const linT2PosWdt = (a: lin) => {
    const a1 = plinParseSpc([0, a])
    const [t1, a2] = plinParseTerm(a1)
    const a3 = plinParseSpc(a2)
    const [t2, [pos, lin]] = plinParseTerm(a3)
    if (t2 === null) return null
    const z:[pos,n] = [pos, t2.length]
    return z
}

const linT2MarkerLin = (a: lin, msg: s) => {
    const poswdt = linT2PosWdt(a)
    if (poswdt === null)
        x.er('{lin} does have 2nd term', { lin: a })
    const [pos, wdt] = poswdt
    const chr = pos >= 3 ? '-' : ' '
    const z = chr.repeat(pos-1) + '^'.repeat(wdt) + ' ' + msg
    return z
}

const gpPfxPrmSwEr = (a: gp) => {
    const er: Er = []
    const gp: gp = []
    for (const { ix, lin } of a) {
        let endMsg: s[] = []
        let sfxMsg: s[] = []
        const isPrmSw = x.sHasPfx('%?')(lin)
        let erNo = 0
        if (isPrmSw) {
            const ay = x.sSplitSpc(lin)
            if (ay.length !== 2) {
                erNo = 1
            } else if (ay[1] !== '0' && ay[1] !== '1') {
                erNo = 2
            }
        }
        switch (erNo) {
            case 1:
                sfxMsg = ['must have 2 terms for prefix being [%?]']
                er.push({ ix, endMsg, sfxMsg })
                break
            case 2:
                endMsg = [linT2MarkerLin(lin, 'must be 0 or 1 for prefix is [%?]')]
                debugger
                er.push({ ix, endMsg, sfxMsg })
                break
            default:
                gp.push({ ix, lin })
        }
    }
    const z: [Er, gp] = [er, gp]
    return z
}
const bkPm = (a: bk) => {
    let z: [Er, Pm]
    if (a === undefined) {
        z = [[], new Map<s, s>()]
        return z
    }
    const [e1, g0] = gpPfxEr(a.gp, "%")
    const [e2, g1] = gpDupFstTermEr(g0)
    const [e3, g2] = gpPfxPrmSwEr(g1)
    debugger
    const er = e1.concat(e2,e3)
    const pm = x.lySdic(gpLy(g1))
    z = [er, pm]
    return z
}

const vdt = ([itmErPred, itmErMap]) => ([ery, itr]) => {
    const { t: er, f: remainingAy } = x.itrBrkForTrueFalse(itmErPred)(itr)
    const ery1 = x.itrMap(itmErMap)(er)
    const ery2 = ery.concat(ery1)
    return [ery2, remainingAy]
}

const linTermAy = (a: lin) => {
    let z: s[] = a.trim().split(/\s+/)
    return z
}
const linFmT3DupTermSet = (a: lin) => {
    let termAy = linTermAy(a)
    termAy.shift()
    termAy.shift()
    let z: sset = x.itrDupSet(termAy)
    return z
}
const linTermPosAy = (a: lin) => {
    const z: termPos[] = []
    let j = 0
    let pos: n = 0
    let len: n
    let i_lin = a
    xx:
    do {
        if ((j++) > 100)
            throw new Error('looping too much')
        let m = i_lin.match(/(\s*)(\S+)(.*)/)
        if (m === null) {
            break xx
        }
        let [x, a1, a2, a3] = m
        if (a1 !== "") {
            len = a1.length
            pos = pos + a1.length
            z.push({ pos, len })
            pos = pos + a2.length
        } else {
            if (a3 !== "")
                throw new Error('impossible')
        }
        i_lin = a3
    } while (a.trim() !== "");
    return z
}
export const _termPosAyRmkLin = (a: termPos[]) => {
    let z: lin = ""
    for (let { pos, len } of a) {
        const n = 1
        const s = x.nSpc(n)
        z = z + s + '^'.repeat(len)
    }
    return z
}
//const xx  = linTermPosAy(" sdf lk fdf d  ")
const linAddMrk = (lin, pos, len) => {
    const s = x.nSpc(pos - lin.length)
    const m = '^'.repeat(len)
    return lin + s + m
}
const linFmT3DupTermMrkLin = lin => {
    const dup = linFmT3DupTermSet(lin)
    const termPosAy = linTermPosAy(lin)
    const termAy = linTermAy(lin)
    let o = ""
    for (let j = 2; j < termAy.length; j++) {
        let term = termAy[j]
        if (dup.has(term)) {
            const pos = termPosAy[j]
            const len = term.length
            o = linAddMrk(o, pos, len)
        }
    }
    return o
}
const gpVdt = (a: gp, chkr: ixlinChkr) => {
    const p = chkr.hasEr
    const m = chkr.erFun
    const [erGp, remainingGp] = gpSplitForErAndRemain(p)(a)
    const z: [Er, gp] = [x.itrMap(m)(erGp), remainingGp]
    return z
}
const swChkr_FmT3Dup: ixlinChkr = {
    hasEr: a => linFmT3DupTermSet(a.lin).size > 0,
    erFun: a => [{ ix: a.ix, endMsg: [linFmT3DupTermMrkLin(a.lin)], sfxMsg: [] }]
}
const bkSw = (a: bk, pm: Pm) => {
    let z: [Er, Sw] = [[], new Map<s, b>()]
    if (a === undefined || a === null) {
        z = [[], new Map<s, b>()]
        return z
    }
    const [e0, g0] = gpDupFstTermEr(a.gp)
    const [e1, g1] = gpVdt(g0, swChkr_FmT3Dup)

    const ly = gpLy(g1)
    const sw = lySw(ly, pm)
    z = [e0, sw]
    return z
}
const gpSplitForErAndRemain: (p: p) => (gp: gp) => [gp, gp] = p => gp => [[], []]
const lySw = (a: ly, pm: Pm) => {
    const sw = new Map<s, boolean>()
    let isEvaluated = true
    let j = 0
    let ly = x.itrClone(a)
    const isSomeNull = itr => { for (let i of itr) if (i === null) return true; return false }
    const someTrue = itr => { for (let i of itr) if (i === true) return true; return false }
    const allTrue = itr => { for (let i of itr) if (i !== true) return false; return true }
    const xAND = ay => isSomeNull(ay) ? null : allTrue(ay)
    const xOR = ay => isSomeNull(ay) ? null : someTrue(ay)
    const xEQ = ([a, b]) => a === null || b === null ? null : a === b
    const xNE = ([a, b]) => a === null || b === null ? null : a !== b

    const evlT2 = t => {
        if (t.toUpperCase() === '*BLANK') return ''
        return t
    }
    const evlT = t => {
        if (sw.has(t)) return sw.get(t)
        return pm.get(t)
    }
    const evlAy = ay => x.itrMap(evlT)(ay)
    const evlT1T2 = (t1, t2) => [evlT(t1), evlT2(t2)]
    const evlOR = ay => { let a = evlAy(ay); return xOR(a) }
    const evlAND = ay => { let a = evlAy(ay); return xAND(a) }
    const evlEQ = (t1, t2) => { let [a1, a2] = evlT1T2(t1, t2); return xEQ([a1, a2]) }
    const evlNE = (t1, t2) => { let [a1, a2] = evlT1T2(t1, t2); return xNE([a1, a2]) }
    const evlLin = lin => {
        let ay = x.sSplitSpc(lin)
        let key = x.vDft("")(ay.shift()).toUpperCase()
        let op = x.vDft("")(ay.shift()).toUpperCase()
        let boolOpt
        switch (op) {
            case 'AND': boolOpt = evlAND(ay); break
            case 'OR': boolOpt = evlOR(ay); break
            case 'EQ': boolOpt = evlEQ(ay[0], ay[1]); break
            case 'NE': boolOpt = evlNE(ay[0], ay[1]); break
            default: x.er('')
        }
        let o = { key, boolOpt }
        return o
    }
    let ly1: ly = []
    while (isEvaluated && j++ < 100) {
        isEvaluated = false
        ly1 = []
        for (let lin of ly) {
            let { key, boolOpt } = evlLin(lin)
            if (boolOpt !== null) {
                sw.set(key, boolOpt)
                isEvaluated = true
            } else
                ly1.push(lin)
        }
        ly = ly1
    }
    if (ly1.length !== 0) x.er('ly1 should has 0-length', { ly1 })
    return sw
}
//?LvlY    EQ %SumLvl Y
//?LvlM    EQ %SumLvl M
//?LvlW    EQ %SumLvl W
//?LvlD    EQ %SumLvl D
//?Y       OR ?LvlD ?LvlW ?LvlM ?LvlY
//?M       OR ?LvlD ?LvlW ?LvlM
//?W       OR ?LvlD ?LvlW
//?D       OR ?LvlD
//?Dte     OR ?LvlD
//?Mbr     OR %?BrkMbr
//?MbrCnt  OR %?BrkMbr
//?Div     OR %?BrkDiv
//?Sto     OR %?BrkSto
//?Crd     OR %?BrkCrd
//?sel#Div NE %LisDiv *blank
//?sel#Sto NE %LisSto *blank
//?sel#Crd NE %LisCrd *blank
