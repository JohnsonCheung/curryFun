//// <reference path="./curryfun.d.ts"/>
import { sy, ix, sset, sdic, p, pfx, cnt, n, s, ay, lin, b, ly } from './curryfun'
import * as x from './curryfun'
import * as assert from 'assert'
export interface erItm { ix: n, sfxMsg: s[], endMsg: s[] }
export type sqtp = s
export interface sqtpRslt { vtp: s, sql: s }
interface posWdt { pos: n, wdt: n }
interface ixLinChkr { hasEr: (a: ixlin) => b, erFun: (a: ixlin) => er }
interface ixlin { ix: n, lin: lin }
interface posLin { pos: n, lin: s }
interface termprslt { term: s, posLin: posLin }
type fldNm = s
type lines = s
type tblNm = s | null
type fldSw = bdic
type stmtSw = bdic
type exprDic = sdic
type updLines = lines
type setLines = lines
type wheLines = lines
type selLines = lines
type groLines = lines
type joiLines = lines
type froLines = lines
type sqGp = gp
type exprGp = gp
type pmGp = gp
type swGp = gp
type selGp = sqGp
type updGp = sqGp
type drpGp = sqGp
type er = erItm[]
type gp = ixlin[]
type stmt = lines | null
type clnLy = ly
type gpBrk = { swGp: swGp, pmGp: pmGp, sqGpy: sqGp[], swExcessGpy: gp[], pmExcessGpy: gp[], erGpy: gp[] }
type bdic = Map<s, boolean>
type sw = { fldSw: bdic, stmtSw: bdic }
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
const enum eBkTy { RM, PM, SW, SQ, ER }
const enum eSelTy { SEL, DIS }
const enum eStmtTy { SEL, DIS, UPD, DRP }
const sqtpRslt = (a: sqtp): { vtp: s, sql: s } => {
    const ly = x.sSplitLines(a)
    const clnLy = x1_clnLy(ly)
    const { pmGp, swGp, sqGpy, pmExcessGpy, swExcessGpy, erGpy } =
        x2_gpBrk(clnLy)
    const e1 = gpy_endMsgEr('--- this block is [error], it is none of block of [remark | parameter | switch | sql]')(erGpy)
    const e2 = gpy_endMsgEr('--- this is excess [parameter] block')(pmExcessGpy)
    const e3 = gpy_endMsgEr('--- this is excess [switch] block')(swExcessGpy)
    const [e4, pm] = x3_pm(pmGp) // x3_fnd_erPm(pmGp)
    const [e5, sw] = x4_sw(swGp, pm)
    const [e6, sql] = x5_sql(sqGpy, pm, sw)
    const er = e1.concat(e2, e3, e4, e5, e6)
    // sw_Brw(swGp, sw); debugger
    const vtp = x6_vtp(clnLy, er)
    return { sql, vtp }
}

const x512_upd = (_updGp: updGp, _sw: sw): [er, stmt] => {
    const { fldSw, stmtSw } = _sw
    const ly = gp_ly(_updGp)
    if (updLy_isSkipStmt(ly, stmtSw))
        return [[], null]
    const [exprDic, a0] = sqGp_exprDic(_updGp)
    const er: er = []
    const [e1, upd, a1] = x5121_updLines(a0, fldSw, exprDic)
    const [e2, set, a2] = x5122_setLines(a1, fldSw, exprDic)
    const [e3, whe, a3] = x5123_wheLines(a2, exprDic)
    const sql = upd + set + whe
    return [er, sql]
}
const x511_selOrDis = (a: selGp, selTy: eSelTy, pm: pm, { fldSw, stmtSw }: sw): [er, sql] => {
    const ly = gp_ly(a)
    if (selLy_isSkipStmt(ly, stmtSw))
        return [[], '']
    const [exprDic, a0] = sqGp_exprDic(a)
    const [e1, sel, a1] = x5111_selLines(a0, selTy, fldSw, exprDic)
    const [e2, fro, a2] = x5112_froLines(a1)
    const [e3, joi, a3] = x5113_joiLines(a2)
    const [e4, gro, a4] = x5114_groLines(a3, fldSw)
    const [e5, whe, a5] = x5115_wheLines(a4, pm, fldSw)
    const sql = sel + fro + joi + whe + gro
    const er: er = e1.concat(e2, e3, e4, e5)
    return [er, sql]
}

const x5_sql = (a: sqGp[], pm: pm, sw: sw): [er, sql] => {
    let er: er = []
    let sql = ""
    for (let sqGp of a) {
        let [e, stmt] = x51_stmt(sqGp, pm, sw)
        er = er.concat(e)
        if (stmt !== null) {
            sql = sql === ""
                ? stmt
                : sql += '\r\n\r\n' + stmt
        }
    }
    return [er, sql]
}

const x51_stmt = (_sqGp: sqGp, _pm: pm, _sw: sw): [er, stmt] => {
    const fstLin = _sqGp[0].lin
    const stmtTyStr = x.sRmvPfx("?")(x.linFstTerm(fstLin).toUpperCase())
    const stmtTy = stmtTyStr_eStmtTy(stmtTyStr)
    let z: [er, stmt]
    switch (stmtTy) {
        case eStmtTy.DIS: z = x511_selOrDis(_sqGp, eSelTy.DIS, _pm, _sw); break
        case eStmtTy.SEL: z = x511_selOrDis(_sqGp, eSelTy.SEL, _pm, _sw); break
        case eStmtTy.UPD: z = x512_upd(_sqGp, _sw); break
        case eStmtTy.DRP: z = x513_drp(_sqGp); break
        default:
            const ix = _sqGp[0].ix
            const lin = _sqGp[0].lin
            const m = x.sFmt(' must be [? | ? | ? | ?]', sq_SEL, sq_UPD, sq_DIS, sq_DRP)
            const endMsg = [lin_t1MrkrLin(lin, m)]
            const sfxMsg = []
            const erItm: erItm = { ix, endMsg, sfxMsg }
            const er: er = [erItm]
            z = [er, null]
    }
    return z
}

const gp_endMsgErItm = (endMsg: s) => (a: gp): erItm => endMsgErItm(x.ayLas(a).ix, endMsg)

const gpy_endMsgEr = (endMsg: s) => (a: gp[]): er => x.itrMap(gp_endMsgErItm(endMsg))(a)

const x2_gpBrk = (a: clnLy): gpBrk => {
    let pmGp: gp = []
    let swGp: gp = []
    const swExcessGpy: gp[] = []
    const pmExcessGpy: gp[] = []
    const erGpy: gp[] = []
    const sqGpy: gp[] = []
    const gp = ly_gp(a)
    const gp1 = gp_RmvRmk(gp)
    const gpy = gp_gpy(gp1, '==')
    const gpy1 = gpy_RmvRmkLin(gpy)
    for (let gp of gpy1) {
        let ly = gp_ly(gp)
        const bkty = ly_bkty(ly)
        switch (bkty) {
            case eBkTy.ER: erGpy.push(gp); break
            case eBkTy.RM: erGpy.push(gp); break
            case eBkTy.SW:
                if (swGp.length === 0)
                    swGp = gp
                else
                    swExcessGpy.push(gp)
                break
            case eBkTy.PM:
                if (pmGp.length === 0)
                    pmGp = gp
                else
                    pmExcessGpy.push(gp)
                break
            case eBkTy.SQ: sqGpy.push(gp); break
            default: x.er('ly_bkty return unexpected bkty', { ly, bkty })
        }
    }
    return { pmGp, swGp, sqGpy, pmExcessGpy, swExcessGpy, erGpy }
}
const curExpConstNy = x.fjsExpConstNy(__filename)
const curConstNy = x.fjsConstNy(__filename)
const er_lines = (a: er) => x.itrMap(erItm_lin)(a).join('\r\n')
const er_Brw = (a: er) => x.sBrw(er_lines(a))
const sw_Brw = (swGp: swGp, { fldSw, stmtSw }: sw) => {
    const p = gp_lines(swGp)
    const s1 = x.dicLines(fldSw)
    const s2 = x.dicLines(stmtSw)
    x.sBrwAtFdrFn('Sw', 'gp')(p)
    x.sBrwAtFdrFn('Sw', 'fldSw')(s1)
    x.sBrwAtFdrFn('Sw', 'stmtSw')(s2)
}
const ixlin_lin = ({ ix, lin }) => x.sFmt('[?]?', ix, lin)
const gp_lines = (a: gp) => x.itrMap(ixlin_lin)(a).join('\n')
const gp_Brw = x.compose(gp_lines, x.sBrw) as (a: gp) => void
const er_ly = (er: er) => x.itrMap(erItm_lin)(er) as ly
const erItm_lin = ({ ix, endMsg, sfxMsg }) => x.sFmt('?: endMsg[?] sfxMsg[?]', ix, x.syLin(endMsg), x.syLin(sfxMsg))
const lin_RmvMsg = (a: lin) => {
    const b = a.match(/(.*)---/)
    const c: lin = b === null ? a : a[1]
    if (x.sHasPfx("^")(c.trimLeft())) return ""
    return c
}

const x1_clnLy = x.compose(x.itrMap(lin_RmvMsg), x.itrRmvEmp) as (a: ly) => ly
const ixlin_isNonRmkLin = (a: ixlin) => x.isNonRmkLin(a.lin)
const gp_RmvRmk = x.itrWhere(ixlin_isNonRmkLin) as (a: gp) => gp

const ly_gp = (a: ly) => {
    const z: ixlin[] = []
    let i = 0
    for (let lin of a)
        z.push({ ix: i++, lin })
    return z
}
const tblNm_isSkipStmt = (a: tblNm, stmtSw: stmtSw): b => {
    if (a === null)
        return false
    const key = '?' + a
    const z = stmtSw.get(key)
    return z === undefined
        ? false
        : z

}
const updLy_isSkipStmt = (a: ly, stmtSw: stmtSw): b => tblNm_isSkipStmt(updLy_tblNm(a), stmtSw)
const selLy_isSkipStmt = (a: ly, stmtSw: stmtSw): b => tblNm_isSkipStmt(selLy_tblNm(a), stmtSw)

const updLy_tblNm = (a: ly): tblNm => {
    const a1 = a[0]
    const a2 = x.sRmvPfx("?")(a1)
    const a3 = x.sHasPfxIgnCas(sq_UPD)(a2)
    if (!a3)
        return null
    let z = x.linT2(a2)
    return z
}
const selLy_tblNm = (a: ly): tblNm => {
    const tblNmLin = x.itrFind(x.sHasPfxIgnCas(sq_FRO))(a)
    if (tblNmLin === null)
        return null
    const z = x.linT2(tblNmLin)
    return z
}
const selTy_selTyStr = (a: eSelTy): s | null => {
    switch (a) {
        case eSelTy.DIS: return sq_DIS
        case eSelTy.SEL: return sq_SEL
    }
    return null
}

const x51112_selLines = (a: sqGp, selTy: eSelTy, fldSw: bdic, exprDic: sdic): [er, s] => {
    let distinct: s
    switch (selTy) {
        case eSelTy.SEL: distinct = ''; break
        case eSelTy.DIS: distinct = ' distinct'; break
        default:
            x.er(x.sFmt('{selTy} must be [? | ?]', eSelTy.SEL, eSelTy.DIS), { sqGp: a, selTy })
            let z = ''
            return [[], '']
    }
    const fldNy = x511121_flds(a)
    const fldsLines = x511122_fldsLines(fldNy, fldSw, exprDic)
    const sel = 'select' + distinct + '\r\n' + fldsLines
    return [[], '']
}
const x511121_flds = (a: sqGp): fldNm[] => []
const x51111_split = (a: sqGp, selTy: eSelTy): [sqGp, exprGp] => {
    const isExprLin = x.sHasPfx('$')
    for (let { ix, lin } of a) {
        if (isExprLin(lin)) { }
        //ly.push(lin)
        else { }
        //gp.push({ ix, lin })
    }
    const lyNoExpr: ly = []
    return [[], []]

    // return [selGp, remain] from {a}
    // where selGp is first n-lines of {a} of first-term-pfx-?-removed-line = SEL | DIS
    const selTyStr = selTy_selTyStr(selTy) // 'SEL' | 'DIS' | null
    switch (selTyStr) {
        case null: return [[], a]
    }
    const selGp: sqGp = []
    const remain = a
    while (remain.length > 0) {
        const lin = remain[0].lin
        const fstTerm = x.linFstTerm(lin)
        const fstTerm1 = x.sRmvPfx('?')(fstTerm).toUpperCase()
        if (fstTerm1 === selTyStr) {
            selGp.push(remain[0])
            remain.shift()
        } else
            break
    }
    return [selGp, remain]
}

const x511122_l_r_ay = (a: fldNm[], fldSw: fldSw, exprDic: exprDic): [ly, ly] => {
    const fny: fldNm[] = x.itrMap(fldNm => fldSw.has(fldNm))(a)
    const l: s[] = x.itrMap(fldNm => exprDic.has(fldNm) ? exprDic.get(fldNm) : fldNm)(fny)
    const l1: s[] = x.itrMap(x.sRmvPfx("?"))(l)
    const r: s[] = x.itrAlignL(fny)
    const z: [ly, ly] = [l1, r]
    return z
}
const x511122_fldsLines = (_fny: fldNm[], _fldSw: fldSw, _exprDic: exprDic): lines => {
    // {a} is all gp-lines started with either SEL | DIS
    let [l, r] = x511122_l_r_ay(_fny, _fldSw, _exprDic)
    const z: s[] = []
    for (let i = 0; i < l.length; i++) {
        z.push(l[i] + r[i])
    }
    return z.join(',\r\n') + '\r\n'
}

const x5121_updLines = (_updGp: updGp, _fldSw: fldSw, _exprDic: exprDic): [er, updLines, updGp] => {
    const updLin = _updGp[0].lin
    _updGp.shift()
    let [er, updLines] = x51211_updLines(updLin, _fldSw, _exprDic)
    return [er, updLines, _updGp]
}
const x51211_updLines = (_updLin: lin, _fldSw: fldSw, _exprDic: exprDic): [er, updLines] => {
    return [[], '']
}
const x5122_setLines = (_updGp: updGp, _fldSw: fldSw, _exprDic: exprDic): [er, setLines, updGp] => {
    let [fny, remain] = x51221_split(_updGp)
    let [er, selLines] = x51112_setLines(fny, _exprDic)
    return [er, selLines, remain]
}
const x51221_split = (a: updGp): [fldNm[], updGp] => {
    return [[], a]
}
const x51112_setLines = (_fny: fldNm[], _exprDic: exprDic): [er, selLines] => {
    return [[], '']
}
const x5123_wheLines = (_updGp: updGp, _exprDic: exprDic): [er, wheLines, updGp] => {
    //    let [a1, remain] = x51111_split(a)
    //    let [er, selLines] = x51112_selLines(a1, fldSw, exprDic)
    //    return [er, selLines, remain]
    return [[], '', _updGp]
}

const x5111_selLines = (a: selGp, selTy: eSelTy, fldSw: fldSw, exprDic: exprDic): [er, selLines, selGp] => {
    let [a1, remain] = x51111_split(a, selTy)
    let [er, selLines] = x51112_selLines(a1, selTy, fldSw, exprDic)
    return [er, selLines, remain]
}

const x5112_froLines = (a: selGp): [er, froLines, selGp] => {
    let fro = ''
    return [[], fro, a]
}

const x5113_joiLines = (a: selGp): [er, joiLines, sqGp] => {
    const joi = ''
    return [[], joi, a]
}
const x5114_groLines = (a: selGp, fldSw: fldSw): [er, groLines, sqGp] => {
    let gro = ''
    let z: [er, s, sqGp] = [[], gro, a]
    return z
}
const x5115_wheLines = (a: selGp, pm: pm, fldSw: bdic): [er, wheLines, sqGp] => {
    let whe = ''
    let z: [er, s, sqGp] = [[], whe, a]
    return z
}

const sqGp_exprDic = (a: sqGp): [exprDic, sqGp] => {
    //    const [gp, ly] = sqGp_SplitForExprSdic(a)
    //    const z: [sdic, sqGp] = [lySdic(ly), gp]
    //    return z
    return [new Map<s, s>(), a]
}
const x513_drp = (a: drpGp): [er, stmt] => {
    const z: [er, stmt] = [[], '']
    return z
}

const selTyStr_eSelTy = (a: s) => {

}
const stmtTyStr_eStmtTy = (a: s) => {
    switch (a.toLocaleUpperCase()) {
        case sq_SEL: return eStmtTy.SEL
        case sq_DRP: return eStmtTy.DRP
        case sq_UPD: return eStmtTy.UPD
        case sq_DIS: return eStmtTy.DIS
    }
    return null
}


const gp_endMsgEr = (a: gp, endMsgStr: s) => {
    let z: er = []
    for (let bk of a) {
        const ix = x.ayLas(a).ix
        z.push(endMsgErItm(ix, endMsgStr))
    }
    return z
}

const gp_gpy = (a: gp, linPfxSep: s) => {
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

const gpy_RmvRmkLin: (a: gp[]) => gp[] = x.itrMap(gpRmvRmkLin)

const assertAyIsEqLen = (ay1: ay, ay2: ay) => {
    if (ay1.length !== ay2.length)
        x.er('two ay are diff len', { ay1, ay2 })
}
const gp_ly = (a: gp) => x.itrMap(x.oPrp("lin"))(a) as ly
const isSqLy = (a: ly) => {
    const fstNonRmkLin: lin = x.itrFind(x.isNonEmp)(a)
    const fstTerm = x.linFstTerm(fstNonRmkLin)
    return x.vIN(_x)(x.sRmvPfx("?")(fstTerm).toUpperCase())
}
const _x = x.sSplitSpc("DRP UPD SEL DIS")
const isRmLy = (a: ly) => x.itrPredIsAllTrue(x.isRmkLin)(a)
const isPmLy = (a: ly) => x.lyHasMajPfx("%")(a)
const isSwLy = (a: ly) => x.lyHasMajPfx("?")(a)
const ly_bkty = (a: ly) => {
    let o: eBkTy
    switch (true) {
        case (isRmLy(a)):
            o = eBkTy.RM
            break
        case (isPmLy(a)):
            o = eBkTy.PM
            break
        case (isSwLy(a)):
            o = eBkTy.SW
            break
        case (isSqLy(a)):
            o = eBkTy.SQ
            break
        default:
            o = eBkTy.ER
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
const _x2 = (a: gp, fstTerm: s) => {
    const ixay: n[] = []
    for (let { ix, lin } of a) {
        let fst = x.linFstTerm(lin)
        if (fstTerm === fst) ixay.push(ix)
    }
    ixay.pop()
    const ixset = new Set<n>(ixay)
    return _x3(a, ixset)
}
const _x3 = (a: gp, ixset: Set<n>) => {
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

const gp_dupFstTermEr = (a: gp) => {
    const ly = gp_ly(a)
    const dup = lyFstTermDupSet(ly)
    let er: er = []
    let gp = a
    for (let itm of dup) {
        let [e, g] = _x2(gp, itm)
        er = er.concat(e)
        gp = g
    }
    const z: [er, gp] = [er, gp]
    return z
}

const gp_pfxEr = (a: gp, pfx: s) => {
    const er: er = []
    const gp: gp = []
    const sfxMsg = []
    for (let { ix, lin } of a) {
        if (!x.sHasPfx(pfx)(lin)) {
            const endMsg = ['^---- prefix must be (' + pfx + ')']
            const m: erItm = { ix, endMsg, sfxMsg }
            er.push(m)
        } else {
            gp.push({ ix, lin })
        }
    }
    const z: [er, gp] = [er, gp]
    return z
}
const posLinParseSpc = ({ pos, lin }: posLin): posLin => {
    for (var p = pos; p < lin.length; p++) {
        if (!x.isSpc(lin[p]))
            break
    }
    let z: posLin = { pos: p, lin }
    return z
}

const posLin_ParseTerm = ({ pos, lin }: posLin): [term, posLin] => {
    let term = ''
    for (var p = pos; p < lin.length; p++) {
        const c = lin[p]
        if (/\s/.test(c))
            break
        else
            term += c
    }
    return [term, { pos: p, lin }]
}
const lin_t1MrkrLin = (a: lin, msg: s) => {
    if (a.trimLeft() !== a)
        a.trim
    x.er('given {lin} must not have space in front', { lin: a })
    const [term, posLin] = posLin_ParseTerm({ pos: 0, lin: a })
    return '^'.repeat(term.length) + ' ' + msg
}

const lin_t2MrkrLin = (a: lin, msg: s) => {
    const a1 = lin_t2PosWdt(a)
    if (a1 === null) {
        x.er('{lin} does have 2nd term', { lin: a })
        return '{lin} does not have 2nd term: [' + a + ']'
    }
    const { pos, wdt } = a1
    const chr = pos >= 3 ? '-' : ' '
    const z = chr.repeat(pos) + '^'.repeat(wdt) + ' ' + msg
    return z
}

const pmGp_pmSwPfxEr = (a: gp) => {
    const er: er = []
    const gp: gp = []
    for (const { ix, lin } of a) {
        let endMsg: s[] = []
        let sfxMsg: s[] = []
        const isPrmSwLin = x.sHasPfx('%?')(lin)
        if (isPrmSwLin) {
            const ay = x.sSplitSpc(lin)
            if (ay.length !== 2) {
                sfxMsg = ['must have 2 terms for prefix being [%?]']
                er.push({ ix, endMsg, sfxMsg })
            } else if (ay[1] !== '0' && ay[1] !== '1') {
                endMsg = [lin_t2MrkrLin(lin, 'must be 0 or 1 for prefix is [%?]')]
                er.push({ ix, endMsg, sfxMsg })
            }
        } else {
            gp.push({ ix, lin })
        }
    }
    const z: [er, gp] = [er, gp]
    return z
}

const x3_pm = (_pmGp: pmGp): [er, pm] => {
    let z: [er, pm]
    const [e1, g0] = gp_dupFstTermEr(_pmGp)
    const [e2, g1] = gp_pfxEr(g0, "%")
    const [e3, g2] = pmGp_pmSwPfxEr(g1)
    const er = e1.concat(e2, e3)
    const pm = x.lySdic(gp_ly(g1))
    z = [er, pm]
    return z
}


const lin_termAy = (_lin: lin): term[] => {
    let z = _lin.trim().split(/\s+/)
    return z
}
const lin_fmT3DupTermSet = (_lin: lin): sset => {
    let termAy = lin_termAy(_lin)
    termAy.shift()
    termAy.shift()
    let z: sset = x.itrDupSet(termAy)
    return z
}
const lin_termPosWdtAy = (a: lin): posWdt[] => {
    const z: posWdt[] = []
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

const lin_t2PosWdt = (a: lin) => {
    const a1 = posLinParseSpc({ pos: 0, lin: a })
    const [t1, a2] = posLin_ParseTerm(a1)
    const a3 = posLinParseSpc(a2)
    const [t2, a4] = posLin_ParseTerm(a3)
    if (t2 === null) return null
    const z: posWdt = { pos: a3.pos, wdt: t2.length }
    return z
}

const lin_AddMrk = (a: lin, pos: n, len: n): lin => {
    const s = x.nSpc(pos - a.length)
    const m = '^'.repeat(len)
    return a + s + m
}
const lin_fmT3DupTermMrkLin = (a: lin): lin => {
    const dup = lin_fmT3DupTermSet(a)
    const termPosWdtAy = lin_termPosWdtAy(a)
    const termAy = lin_termAy(a)
    let z = ""
    for (let j = 2; j < termAy.length; j++) {
        let term = termAy[j]
        if (dup.has(term)) {
            const pos = termPosWdtAy[j].pos
            const len = term.length
            z = lin_AddMrk(z, pos, len)
        }
    }
    return z
}
const gp_vdt = (a: gp, { hasEr, erFun }: ixLinChkr): [er, gp] => {
    const { t: erGp, f: remainGp } = x.itrBrkForTrueFalse(hasEr)(a)
    const z: [er, gp] = [x.itrMap(erFun)(erGp), remainGp]
    return z
}

const swChkr_fmT3Dup: ixLinChkr = {
    hasEr: a => lin_fmT3DupTermSet(a.lin).size > 0,
    erFun: a => [{ ix: a.ix, endMsg: [lin_fmT3DupTermMrkLin(a.lin)], sfxMsg: [] }]
}

const lin_isStmtSwEr = (a: lin) => {
    if (!x.sHasPfx('?#')(a)) return false
    if (x.sHasPfx('?#SEL#')(a)) return false
    if (x.sHasPfx('?#UPD#')(a)) return false
    return true
}

const swChkr_stmtSwLin_mustBeEither_SEL_or_UPD: ixLinChkr = {
    hasEr: a => lin_isStmtSwEr(a.lin),
    erFun: a => [{ ix: a.ix, endMsg: [lin_t1MrkrLin(a.lin, '')], sfxMsg: [] }]
}

const op_isErr = (op: s): b => {
    const z: b = !['AND', 'OR', 'EQ', 'NE'].includes(op.toUpperCase())
    return z
}

const swChkr_swLinOp_mustBeAny_AND_OR_EQ_NE: ixLinChkr = {
    hasEr: a => op_isErr(x.linT2(a.lin)),
    erFun: a => [{
        ix: a.ix,
        endMsg: [lin_t2MrkrLin(a.lin, 'switch line 2nd term must be [ AND | OR | EQ | NE ]')],
        sfxMsg: []
    }]
}

const x4_sw = (a: gp, pm: pm): [er, sw] => {
    let emptyBdic = new Map<s, b>()
    let z: [er, sw]
    const [e0, g0] = gp_dupFstTermEr(a)
    const [e1, g1] = gp_pfxEr(g0, "?")
    const [e2, g2] = gp_vdt(g1, swChkr_fmT3Dup)
    const [e3, g3] = gp_vdt(g2, swChkr_stmtSwLin_mustBeEither_SEL_or_UPD)
    const [e4, g4] = gp_vdt(g3, swChkr_swLinOp_mustBeAny_AND_OR_EQ_NE)
    const ly = gp_ly(g4)
    const er = e0.concat(e1, e2, e3, e4)
    const sw = x41_sw(ly, pm)
    z = [er, sw]
    // x.oBrw({ inp: { a, pm }, oup: z, srcLy: x.sSplitLines(x4_fnd_erSw.toString()), e0, e1, e2, e3, e4, g0, g1, g2, g3, g4, ly }); debugger
    return z
}

const x41_sw = (a: ly, pm: pm): sw => {
    const sw = new Map<s, b>()
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
    const main = () => {
        let ly1: ly = []
        let isEvaluated = true
        let j = 0
        let ly = x.itrClone(a)
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
        let z: sw = x411_sw(sw)
        //x.oBrw({ inp: { a, pm: x.dicLy(pm) }, oup_stmtSw: x.dicLy(z.stmtSw), oup_fldSw: x.dicLy(z.fldSw), sw: x.dicLy(sw) }); debugger
        return z
    }
    return main()
}
const x411_sw = (a: bdic) => {
    //    x.dicBrw(a)
    //    debugger
    const fldSw = new Map<s, b>()
    const stmtSw = new Map<s, b>()
    for (let [k, b] of a) {
        if (x.sHasPfx('?#')(k))
            stmtSw.set(k, b)
        else
            fldSw.set(k, b)
    }
    const z: sw = { fldSw, stmtSw }
    return z
}

const x6_vtp = (ly: ly, er: er): s => {
    const l = x61_leftLyAy(er, ly)
    const l1 = x62_AlignL(l)
    const r = x63_rightLyAy(er, ly)
    let o: ly = []
    for (let i of x.nItr(l1.length)) {
        let m = x64_Mge(l1[i], r[i])
        o = o.concat(m)
    }
    let z = o.join('\r\n')
    return z
}

const x61_leftLyAy = (er: er, ly: ly) => {
    const o: ly[] = []
    for (let i of x.nItr(ly.length)) {
        const m = [ly[i]].concat(erIx_endMsgEr(er, i))
        o.push(m)
    }
    return o
}

const endMsgErItm = (ix: n, endMsgStr: s): erItm => {
    const sfxMsg = []
    const endMsg = [endMsgStr]
    return { ix, endMsg, sfxMsg }
}

const erIx_endMsgEr = (er: er, ix: n) => {
    let o: s[] = []
    for (let { ix: i, endMsg } of er) {
        if (i === ix) o = o.concat(endMsg)
    }
    return o
}

const x63_rightLyAy = (er: er, ly: ly) => {
    const o: ly[] = []
    for (let i of x.nItr(ly.length)) {
        const m = sfxMsgEr(er, i)
        o.push(m)
    }
    return o
}
const sfxMsgEr = (er: er, ix: n) => {
    let o: s[] = []
    for (let { ix: i, sfxMsg } of er) {
        if (i === ix) o = o.concat(sfxMsg)
    }
    return o
}

const sep = ' --- '
const x64_Mge = (left_ly: ly, right_ly: ly) => {
    const llen = left_ly.length
    const rlen = right_ly.length
    const o: ly = []
    const min = x.itrMin([llen, rlen])
    for (let i of x.nItr(min)) {
        const m = left_ly[i] + sep + right_ly[i]
        o.push(m)
    }
    if (llen > rlen) {
        for (let i = rlen; i < llen; i++)
            o.push(left_ly[i].trim())
    } else if (llen < rlen) {
        const s = x.nSpc(left_ly[0].length)
        for (let i = llen; i < rlen; i++)
            o.push(s + sep + right_ly[i])
    }
    return o
}
const lyAy_wdt = (a: ly[]) => {
    const b = x.itrMap(x.itrWdt)(a)
    return x.itrMax(b)
}

const x62_AlignL = (a: ly[]) => {
    const w = lyAy_wdt(a)
    const align = ly => x.itrMap(x.sAlignL(w))(ly)
    const o: ly[] = x.itrMap(align)(a)
    return o
}

//=============================================================
if (module.id === '.') {
    const sqtp = x.ftLines(__dirname + '/spec/sample.sqtp.txt')
    const tst__x411_sw = () => {
        const bdic = new Map<s, b>([['?#', true], ['b', false]])
        const { fldSw, stmtSw } = x411_sw(bdic)
        x.assertIsEq(fldSw, new Map<s, b>([['b', false]]))
        x.assertIsEq(stmtSw, new Map<s, b>([['?#', true]]))
    }
    const tst__sqtpRslt = () => {
        const { vtp, sql } = sqtpRslt(sqtp)
        x.sBrw(vtp)
        x.sBrw(sql)
        debugger
    }
    const tst__selLy_isSkipStmt = () => {
        const ly = ['fm #aa']
        const stmtSw = new Map<s, b>([['?#aa', false]])
        const aa = selLy_isSkipStmt(ly, stmtSw)
    }
    const tst__sqLy = () => ['sel xxx', 'fm ', '$xxx ka']
    const tst__sqGp = () => ly_gp(tst__sqLy())
    const tst__sqGp_splitFor_ExprSdic = () => {
        const sqGp = tst__sqGp()
        //const [gp, ly] = sqGp_SplitForExprSdic(sqGp)
        //assert.deepStrictEqual(ly, ['$xxx ka'])
        //assert.deepStrictEqual(gp, [{ ix: 0, lin: 'sel xxx' }, { ix: 1, lin: 'fm aaa' }])
    }
    const tst__lin_t2PosWdt = () => {
        const lin = 'aaa  bb'
        const act = lin_t2PosWdt(lin)
        expect(act).toEqual({ pos: 5, wdt: 2 })
    }
    const tst__lin_t2MrkLin = () => {
        const lin = 'aaa  bb'
        const act = lin_t2MrkrLin(lin, 'aa')
        expect(act).toEqual('-----^^ aa')
    }

    const tst__sqtpRslt_1 = () => {
        const sqtp =
            '%?BrkMbr 0\n' +
            '?BrkMbr 0\n' +
            '%?BrkMbr 0\n' +
            '??BrkSto 0\n'
        const { vtp, sql } = sqtpRslt(sqtp)
        x.sBrw(vtp + '\n***\nsqtp' + sqtp)
        debugger
    }
    const tst__sqtpRslt_2 = () => {
        const sqtp =
            '%?BrkMbr 0\n' +
            '%?BrkXX 0\n' +
            '%BrkMbr 0\n' +
            '#?BrkMbr 0\n' +
            '??BrkSto 0\n'
        const { vtp, sql } = sqtpRslt(sqtp)
        const exp =
            '%?BrkMbr 0\r\n' +
            '%?BrkXX 0\r\n' +
            '%BrkMbr 0\r\n' +
            '#?BrkMbr 0\r\n' +
            '^---- prefix must be (%)\r\n' +
            '??BrkSto 0\r\n' +
            '^---- prefix must be (%)'
        expect(vtp).toEqual(exp)
    }
    const tst__sqtpRslt_3 = () => {
        const sqtp =
            '%?BrkDiv  XX\n' +
            '%SumLvl  Y\n' +
            '%?MbrEmail 1'
        const { vtp, sql } = sqtpRslt(sqtp)
        //x.sBrw(vtp + '\n***\n' + sqtp)
        const exp =
            '%?BrkDiv  XX\r\n' +
            '----------^^ must be 0 or 1 for prefix is [%?]\r\n' +
            '%SumLvl  Y\r\n' +
            '%?MbrEmail 1'
        const rslt = vtp === exp
        expect(rslt).toBeTruthy()
    }

    const tst__sqtpRslt_4 = () => {
        const sqtp =
            '?#SEL#aa 1\n' +
            '?#UPD#bb OR 1\n' +
            '?AA AND 1'
        const { vtp, sql } = sqtpRslt(sqtp)
        //x.sBrw(vtp + '\n***\n' + sqtp)
        const exp =
            '%?BrkDiv  XX\r\n' +
            '----------^^ must be 0 or 1 for prefix is [%?]\r\n' +
            '%SumLvl  Y\r\n' +
            '%?MbrEmail 1'
        const rslt = vtp === exp
        debugger
        expect(rslt).toBeTruthy()
    }
    const tst__sqtpRslt_5 = () => {
        //=====================================================
        const sqtp = x.ftLines('./sample.sqtp.txt')
        const { vtp, sql } = sqtpRslt(sqtp)
        x.sBrw(vtp)
        debugger
        expect(true).toBe(true)
        debugger
        //    x.dryCol(1)([[1, 2], [2, 3]])
    }
    const tst__x4_sw = () => {
        const t = { swGp: [], pm: new Map<s, s>(), exp: {} }
        const a = t.swGp
        const pm = t.pm
        const exp = t.exp
        const act = x4_sw(a, pm)
        x.assertIsEq(exp, act)
    }
    tst__sqtpRslt()
}