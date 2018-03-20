//// <reference path="./curryfun.d.ts"/>
import { ix, sset, sdic, p, pfx, cnt, n, s, ay, lin, b, ly } from './curryfun'
import { lyAddErAsLines } from './lyAddErAsLines'
import * as x from './curryfun'
export interface eritm { ix: n, sfxMsg: s[], endMsg: s[] }
export interface poswdt { pos: n, wdt: n }
export type er = eritm[]
const xx = module.id === '.'
interface sqtp { sqtp: s }
interface bk { bkty: Bkty, gp: gp }
interface sqgp extends gp { }
interface ixlinchkr { hasEr: (a: ixlin) => b, erFun: (a: ixlin) => er }
interface ixlin { ix: n, lin: lin }
interface sqtprslt { vtp: s, sql: s }
interface plin { pos: n, lin: s }
interface termprslt { term: s, plin: plin }
const enum Bkty { RM, PM, SW, SQ, ER }
type gp = ixlin[]
type sqevl = [er, sql]
type sqdrp = sqevl
type sqsel = sqevl
type squpd = sqevl
type bdic = Map<s, boolean>
type sw = { sqFldSw: bdic, sqStmtSw: bdic }
type pm = Map<s, s>
type term = s
type sql = s
const sq_UPD = 'UPD'
const sq_DIS = 'DIS'
const sq_DRP = 'DRP'
const sq_SEL = 'SEL'
const sq_FRO = 'FRO'
const sq_GRO = 'GRO'
const sq_JOI = 'JOI'
const sq_LEF = 'LEF'
const sq_WHE = 'WHE'
const sq_AND = 'AND'
const sq_OR = 'OR'
export const sqtprslt = ({ sqtp: a }: sqtp) => {
    const ly = x.sSplitLf(a)
    const ly1 = lyRmvMsg(ly)
    const gp = lyGp(ly1)
    const gp1 = gpRmvRmk(gp)
    const gpy = gpGpy(gp1, '==')
    const bky = gpyBky(gpy)
    const aftRm_bky = x.itrWhere((bk: bk) => bk.bkty !== Bkty.RM)(bky)
    const [aftEr_er, aftEr_bky] = er02(aftRm_bky)
    const [aftPm_er, aftPm_bky, pm] = pm03(aftEr_bky)
    const [aftSw_er, aftSw_bky, sw] = sw04(aftPm_bky, pm)
    const [aftSq_er, sql] = sq05(aftSw_bky, pm, sw)
    const er = aftEr_er.concat(aftPm_er, aftSw_er, aftSq_er)
    const vtp = lyAddErAsLines(ly1, er)
    const z: sqtprslt = { vtp, sql }
    return z
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
    let z: [er, bk[], pm] = [er, remain, pm]
    return z
}

const sw04 = (a: bk[], pm: pm) => {
    const { t, f } = x.itrBrkForTrueFalse((a: bk) => a.bkty === Bkty.SW)(a)
    const swBky: bk[] = t
    const remain: bk[] = f
    const e1 = bkyEr_forExcessBk(swBky, 'switch')
    const [e2, sw] = bkSw(swBky[0], pm)
    const er = e1.concat(e2)
    let z: [er, bk[], sw] = [er, remain, sw]
    return z
}
const sqsellyIsSkip = (a: ly, sqStmtSw: bdic) => {
    const tblFmLin = x.itrFind(x.sHasPfxIgnCas(sq_FRO))(a)
    if (tblFmLin === null) return false
    const tblNm = x.sSplitSpc(tblFmLin)[1]
    const key = '?' + tblNm
    const z = sqStmtSw.get(key)
    return z===undefined 
        ? false 
        : z
}
if (xx) {
    const ly = ['fm #aa']
    const sqStmtSw = new Map<s, b>([['?#aa', false]])
    const aa = sqsellyIsSkip(ly, sqStmtSw)
}
const sqselBrkSel = (a: sqgp, term: s) => {
    return [a, a]
}
const xflds_fny = (a: sqgp, sqFldSw: bdic) => {
    return []
}
const xflds_l_r_ay = (a: sqgp, sqFldSw: bdic) => {
    const fny: s[] = xflds_fny(a, sqFldSw)
    const l: s[] = []
    const r: s[] = x.itrAlignL(fny)
    const z: [ly, ly] = [l, r]
    return z
}
const xflds_lines = (a: sqgp, sqFldSw: bdic, sqFldExprDic: sdic) => {
    let [l, r] = xflds_l_r_ay(a, sqFldSw)
    const z: s[] = []
    for (let i = 0; i < l.length; i++) {
        z.push(l[i] + r[i])
    }
    return z.join(',\r\n') + '\r\n'
}

const sqselSel = (a: sqgp, term: s, sqFldSw: bdic, sqFldExprDic: sdic) => {
    let z: [er, s, sqgp]
    let distinct: s
    switch (term) {
        case sq_SEL: distinct = ''; break
        case sq_DIS: distinct = ' distinct'; break
        default:
            x.er(x.sFmt('{term} must be [? | ?]', sq_SEL, sq_DIS), { sqgp: a, term })
            z = [[], '', a]
            return z
    }

    let [a1, remain] = sqselBrkSel(a, term)
    let flds = xflds_lines(a1, sqFldSw, sqFldExprDic)
    const sel = 'select' + distinct + '\r\n' + flds

    z = [[], sel, remain]
    return z
}

const sqselFro = (a: sqgp) => {
    let fro = ''
    let z: [er, s, sqgp] = [[], fro, a]
    return z
}

const sqselJoi = (a: sqgp) => {
    let joi = ''
    let z: [er, s, sqgp] = [[], joi, a]
    return z
}
const sqselGro = (a: sqgp, sqFldSw: bdic) => {
    let gro = ''
    let z: [er, s, sqgp] = [[], gro, a]
    return z
}
const sqselWhe = (a: sqgp, pm: pm, sqFldSw: bdic) => {
    let whe = ''
    let z: [er, s, sqgp] = [[], whe, a]
    return z
}
const sqgp_splitFor_ExprSdic = (a: sqgp) => {
    const ly: ly = []
    const gp: gp = []
    const isExprLin = lin => x.sHasPfx('$')
    for (let { ix, lin } of a) {
        if (isExprLin(lin))
            ly.push(lin)
        else
            gp.push({ ix, lin })
    }
    const z: [gp, ly] = [gp, ly]
    return z
}
const sqgp_sqFldExprSdic = (a: sqgp) => {
    const [gp, ly] = sqgp_splitFor_ExprSdic(a)
    const z: [sdic, sqgp] = [lySdic(ly), gp]
    return z
}
const sqsel = (a: sqgp, term: s, pm: pm, { sqFldSw, sqStmtSw }: sw) => {
    const ly = gpLy(a)
    let z: sqsel
    if (sqsellyIsSkip(ly, sqStmtSw)) {
        z = [[], '']
        return z
    }
    const [sqFldExprSdic, a0] = sqgp_sqFldExprSdic(a)
    const [e1, sel, a1] = sqselSel(a0, term, sqFldSw, sqFldExprSdic)
    const [e2, fro, a2] = sqselFro(a1)
    const [e3, joi, a3] = sqselJoi(a2)
    const [e4, gro, a4] = sqselGro(a3, sqFldSw)
    const [e5, whe, a5] = sqselWhe(a4, pm, sqFldSw)
    const sql = sel + fro + joi + whe + gro
    const er: er = e1.concat(e2, e3, e4, e5)
    z = [er, sql]
    return z
}
const sqdrp = (a: sqgp) => {
    const z: sqdrp = [[], '']
    return z
}
const squpdgpIsSkip = (a: sqgp, sqStmtSw: bdic) => {
    const tblNm = ''
    if (sqStmtSw.has(tblNm))
        return sqStmtSw.get(tblNm)
    else
        return false
}
const squpd = (a: sqgp, pm: pm, { sqFldSw, sqStmtSw }: sw) => {
    let z: sqevl
    if (squpdgpIsSkip(a, sqStmtSw)) {
        z = [[], '']
        return z
    }
    const er: er = []
    const upd = ''
    const set = ''
    const where = ''
    const sql = upd + set + where
    z = [er, sql]
    return z
}
const sqevl = (a: sqgp, pm: pm, sw: sw) => {
    const fstLin = a[0].lin
    const term = x.sRmvPfx("?")(x.linFstTerm(fstLin).toUpperCase())
    let z: sqevl
    switch (term) {
        case sq_DRP: z = sqdrp(a); break
        case sq_SEL:
        case sq_DIS: z = sqsel(a, term, pm, sw); break
        case sq_UPD: z = squpd(a, pm, sw); break
        default:
            x.er('impossible: {bk} should have {term} be one of [Drp | Sel | Dis | Upd]', { term, bk: a })
            z = [[], '']
    }
    return z
}

const sq05 = (a: bk[], pm: pm, sw: sw) => {
    let er: er = []
    let sql = ""
    for (let { bkty, gp } of a) {
        let [i_er, i_sql] = sqevl(gp, pm, sw)
        er = er.concat(i_er)
        sql = sql === ""
            ? i_sql
            : sql += '\r\n\r\n' + i_sql
    }
    let z: [er, s] = [er, sql]
    return z
}

const er02 = (a: bk[]) => {
    let { t: erBky, f: bky } = x.itrBrkForTrueFalse((a: bk) => a.bkty === Bkty.ER)(a)
    let er = bkyEr_forErBky(erBky)
    let z: [er, bk[]] = [er, bky]
    return z
}

const bkyEr_forErBky = (a: bk[]) => {
    let z: er = []
    for (let bk of a) {
        const ix = x.ayLas(bk.gp).ix
        z.push(endmsgstrEr(ix, '^^^ this block is error'))
    }
    return z
}

const endmsgstrEr = (ix: n, endMsgStr: s) => {
    const sfxMsg = []
    const endMsg = [endMsgStr]
    let z: eritm = { ix, endMsg, sfxMsg }
    return z
}

const bkyEr_forExcessBk = (a: bk[], bkNm: s) => {
    const excessbky = a.slice(1)
    const z: er = []
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
// put the removed lines as er
// return [er,gp]
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
    // return [er, gp]
    const er: er = []
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
    let z: [er, gp] = [er, gp]
    return z
}

const gpDupFstTermEr = (a: gp) => {
    const ly = gpLy(a)
    const dup = lyFstTermDupSet(ly)
    let er: er = []
    let gp = a
    for (let itm of dup) {
        let [e, g] = _x1(gp, itm)
        er = er.concat(e)
        gp = g
    }
    const z: [er, gp] = [er, gp]
    return z
}

const gpPfxEr = (a: gp, pfx: s) => {
    const er: er = []
    const gp: gp = []
    const sfxMsg = []
    for (let { ix, lin } of a) {
        if (!x.sHasPfx(pfx)(lin)) {
            const endMsg = ['^---- prefix must be (' + pfx + ')']
            const m: eritm = { ix, endMsg, sfxMsg }
            er.push(m)
        } else {
            gp.push({ ix, lin })
        }
    }
    const z: [er, gp] = [er, gp]
    return z
}
const plinParseSpc = ({ pos, lin }: plin) => {
    for (var p = pos; p < lin.length; p++) {
        if (!x.isSpc(lin[p]))
            break
    }
    let z: plin = { pos: p, lin }
    return z
}

const plinParseTerm = ({ pos, lin }: plin) => {
    let term = ''
    for (var p = pos; p < lin.length; p++) {
        const c = lin[p]
        if (/\s/.test(c))
            break
        else
            term += c
    }
    let z: termprslt = { term, plin: { pos: p, lin } }
    return z
}

export const linT2PosWdt = (a: lin) => {
    const a1 = plinParseSpc({ pos: 0, lin: a })
    const { term: t1, plin: a2 } = plinParseTerm(a1)
    const a3 = plinParseSpc(a2)
    const { term: t2, plin: a4 } = plinParseTerm(a3)
    if (t2 === null) return null
    const z: poswdt = { pos: a3.pos, wdt: t2.length }
    return z
}
export const linT1MarkerLin = (a: lin, msg: s) => {
    if (a.trimLeft() !== a)
        x.er('given {lin} must not have space in front', { lin: a })
    const { term, plin } = plinParseTerm({ pos: 0, lin: a })
    return '^'.repeat(term.length) + ' ' + msg
}

export const linT2MarkerLin = (a: lin, msg: s) => {
    const poswdt = linT2PosWdt(a)
    if (poswdt === null) {
        x.er('{lin} does have 2nd term', { lin: a })
        return '{lin} does not have 2nd term: [' + a + ']'
    }
    const { pos, wdt } = poswdt
    const chr = pos >= 3 ? '-' : ' '
    const z = chr.repeat(pos) + '^'.repeat(wdt) + ' ' + msg
    return z
}

const gpPfxPrmSwEr = (a: gp) => {
    const er: er = []
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
                er.push({ ix, endMsg, sfxMsg })
                break
            default:
                gp.push({ ix, lin })
        }
    }
    const z: [er, gp] = [er, gp]
    return z
}
const bkPm = (a: bk) => {
    let z: [er, pm]
    if (a === undefined) {
        z = [[], new Map<s, s>()]
        return z
    }
    const [e1, g0] = gpPfxEr(a.gp, "%")
    const [e2, g1] = gpDupFstTermEr(g0)
    const [e3, g2] = gpPfxPrmSwEr(g1)
    const er = e1.concat(e2, e3)
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
const linTermPosWdtAy = (a: lin) => {
    const z: poswdt[] = []
    let j = 0
    let pos: n = 0
    let wdt: n
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
            wdt = a1.length
            pos = pos + a1.length
            z.push({ pos, wdt })
            pos = pos + a2.length
        } else {
            if (a3 !== "")
                throw new Error('impossible')
        }
        i_lin = a3
    } while (a.trim() !== "");
    return z
}
export const _termWdtPosAyRmkLin = (a: poswdt[]) => {
    let z: lin = ""
    for (let { pos, wdt } of a) {
        const n = 1
        const s = x.nSpc(n)
        z = z + s + '^'.repeat(wdt)
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
    const termPosAy = linTermPosWdtAy(lin)
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
const gpVdt = (a: gp, chkr: ixlinchkr) => {
    const p = chkr.hasEr
    const m = chkr.erFun
    const { t: erGp, f: remainGp } = x.itrBrkForTrueFalse(p)(a)
    const z: [er, gp] = [x.itrMap(m)(erGp), remainGp]
    return z
}
const swChkr_FmT3Dup: ixlinchkr = {
    hasEr: a => linFmT3DupTermSet(a.lin).size > 0,
    erFun: a => [{ ix: a.ix, endMsg: [linFmT3DupTermMrkLin(a.lin)], sfxMsg: [] }]
}
const linIsStmtSwError = (a: lin) => {
    if (x.sHasPfx('?#')(a)) {
        if (x.sHasPfx('?#SEL#')(a)) return false
        if (x.sHasPfx('?#UPD#')(a)) return false
    }
    return true
}
const swChkr_StmtSwLin_mustBeEither_SEL_or_UPD: ixlinchkr = {
    hasEr: a => linIsStmtSwError(a.lin),
    erFun: a => [{ ix: a.ix, endMsg: [linT1MarkerLin(a.lin, '')], sfxMsg: [] }]
}

const opIsErr = (op: s) => {
    const z: b = !['AND', 'OR', 'EQ', 'NE'].includes(op.toUpperCase())
    return z
}

const swChkr_SwLinOp_mustBeAny_AND_OR_EQ_NE: ixlinchkr = {
    hasEr: a => opIsErr(x.linT2(a.lin)),
    erFun: a => [{
        ix: a.ix,
        endMsg: [linT2MarkerLin(a.lin, 'switch line 2nd term must be [ AND | OR | EQ | NE ]')],
        sfxMsg: []
    }]
}

const bkSw = (a: bk, pm: pm) => {
    let emptyBdic = new Map<s, b>()
    let z: [er, sw] = [[], { sqFldSw: emptyBdic, sqStmtSw: emptyBdic }]
    if (a === undefined || a === null) {
        return z
    }
    const [e0, g0] = gpDupFstTermEr(a.gp)
    const [e1, g1] = gpVdt(g0, swChkr_FmT3Dup)
    const [e2, g2] = gpVdt(g1, swChkr_StmtSwLin_mustBeEither_SEL_or_UPD)
    const [e3, g3] = gpVdt(g2, swChkr_SwLinOp_mustBeAny_AND_OR_EQ_NE)
    const ly = gpLy(g3)
    const er = e0.concat(e1, e2, e3)
    const sw = lySw(ly, pm)
    z = [er, sw]
    return z
}
const lySw = (a: ly, pm: pm) => {
    const sw = new Map<s, b>()
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
    if (ly1.length !== 0)
        x.er('ly1 should has 0-length', { ly1 })
    return bdicSw(sw)
}
const bdicSw = (a: bdic) => {
    const sqFldSw = new Map<s, b>()
    const sqStmtSw = new Map<s, b>()
    for (let [k, b] of a) {
        if (x.sHasPfx('?#')(k))
            sqStmtSw.set(k, b)
        else
            sqFldSw.set(k, b)
    }
    const z: sw = { sqFldSw, sqStmtSw }
    return z
}
var tst__swSplit = 1
if (xx) {
    debugger
}