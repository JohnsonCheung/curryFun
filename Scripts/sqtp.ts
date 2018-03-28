//// <reference path="./curryfun.d.ts"/>
import { sy, ix, sset, sdic, p, pfx, cnt, n, s, ay, lin, b, ly } from './curryfun'
import * as x from './curryfun'
import * as assert from 'assert'
export interface erItm { ix: n, sfxMsg: s[], endMsg: s[] }
export type sqtp = s
interface posWdt { pos: n, wdt: n }
interface ixlin { ix: n, lin: lin }
interface posLin { pos: n, lin: s }
interface termprslt { term: s, posLin: posLin }
type fldNm = s
type lines = s
type tblNmKey = s
type fldSw = bdic
type stmtSw = bdic
type exprDic = sdic
type sqGp = gp
type remainGp = gp
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
type sqtpRslt = { vtp: s, sql: s }
type pm = Map<s, s>
type term = s
type sql = s
type DIS = 'DIS'
type SEL = 'SEL'
type UPD = 'UPD'
type DRP = 'DRP'
type eSelTy = DIS | SEL
type eStmtTy = DIS | SEL | DRP | UPD
type eBkTy = 'RM' | 'PM' | 'SW' | 'SQ' | 'ER'
//! ==========================================================================
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
//! ==========================================================================
export const sqtpRslt = (_sqtp: sqtp): { vtp: s, sql: s } => {
    const ly = x.sSplitLines(_sqtp)
    const clnLy = xc_clnLy(ly)
    const { pmGp, swGp, sqGpy, pmExcessGpy, swExcessGpy, erGpy } =
        xb_gpBrk(clnLy)
    const e1 = xe_endMsgEr('--- this block is [error], it is none of block of [remark | parameter | switch | sql]')(erGpy)
    const e2 = xe_endMsgEr('--- this is excess [parameter] block')(pmExcessGpy)
    const e3 = xe_endMsgEr('--- this is excess [switch] block')(swExcessGpy)
    const [e4, pm] = xp_pm(pmGp) // x3_fnd_erPm(pmGp)
    const [e5, sw] = xw_sw(swGp, pm)
    const [e6, sql] = xs_sql(sqGpy, pm, sw)
    const er = e1.concat(e2, e3, e4, e5, e6)
    // sw_Brw(swGp, sw); debugger
    const vtp = xv_vtp(clnLy, er)
    return { sql, vtp }
}

const xe_endMsgEr = (endMsg: s) => (a: gp[]): er => x.itrMap(xei_endMsgErItm(endMsg))(a)

const xcr_rmvMsg = (a: lin) => {
    const b = a.match(/(.*)---/)
    const c: lin = b === null ? a : a[1]
    if (x.sHasPfx("^")(c.trimLeft())) return ""
    return c
}

const xc_clnLy = x.compose(x.itrMap(xcr_rmvMsg), x.itrRmvEmp) as (a: ly) => ly

const xei_endMsgErItm = (endMsg: s) => (a: gp): erItm => xeii_endMsgErItm(x.ayLas(a).ix, endMsg)

const xbg_gp = (_clnLy: clnLy) => {
    const m = (lin, ix) => { return { ix, lin } }
    return x.itrMap(m)(_clnLy)
}

const xbn_noRmk = (_gp: gp) => {
    const noRmk = (a: ixlin) => x.isNonRmkLin(a.lin)
    return x.itrWhere(noRmk)(_gp)
}

const xbb_brkIntoGpy = (_noRmkGp: gp): gp[] => {
    const linPfxSep = '=='
    let { ix, lin } = _noRmkGp[0]
    const z: gp[] = []
    let curGp: gp = []
    for (let { ix, lin } of _noRmkGp) {
        if (x.sHasPfx(linPfxSep)(lin)) {
            if (curGp.length !== 0)
                z.push(curGp)
            curGp = []
        } else
            curGp.push({ ix, lin })
    }
    if (curGp.length !== 0)
        z.push(curGp)
    const gpy1 = x.itrMap(xbbr_rmvRmkLin)(z)
    return gpy1
}

const xb_gpBrk = (_clnLy: clnLy): gpBrk => {
    const gp = xbg_gp(_clnLy)
    const noRmkGp = xbn_noRmk(gp)
    const gpy = xbb_brkIntoGpy(noRmkGp)
    let pmGp: gp = []
    let swGp: gp = []
    const swExcessGpy: gp[] = []
    const pmExcessGpy: gp[] = []
    const erGpy: gp[] = []
    const sqGpy: gp[] = []

    for (let gp of gpy) {
        let ly = y_gp_ly(gp)
        const bkty = xbt_bkTy(ly)
        switch (bkty) {
            case 'ER': erGpy.push(gp); break
            case 'RM': erGpy.push(gp); break
            case 'SW':
                if (swGp.length === 0)
                    swGp = gp
                else
                    swExcessGpy.push(gp)
                break
            case 'PM':
                if (pmGp.length === 0)
                    pmGp = gp
                else
                    pmExcessGpy.push(gp)
                break
            case 'SQ': sqGpy.push(gp); break
            default: x.er('xbt_bkTy return unexpected bkty', { ly, bkty })
        }
    }
    return { pmGp, swGp, sqGpy, pmExcessGpy, swExcessGpy, erGpy }
}

const xssu_upd = (_updGp: updGp, _sw: sw): [er, stmt] => {
    const { fldSw, stmtSw } = _sw
    const ly = y_gp_ly(_updGp)
    var tblNmKey = xssut_tblNmKey(ly)
    if (!stmtSw.has(tblNmKey))
        return [[], null]
    const exprDic = ly_exprDic(ly)
    const updLin = () => ''
    const setLin = () => ''
    const set = () => ''
    const upd = () => ''
    const whe = () => ''
    const er: er = []
    const sql = upd() + set() + whe()
    const fstLin = () => _updGp[0].lin
    const tblNm = () => {
        const a1 = fstLin()
        const a2 = x.sRmvPfx("?")(a1)
        const a3 = x.sHasPfxIgnCas(sq_UPD)(a2)
        if (!a3)
            return null
        let z = x.linT2(a2)
        return z
    }
    return [er, sql]
}

const xsssb_brk = (_gp: gp, _pfxAy: sy): [sy, gp, er] => [[], [], []]

const xsssf_froLines = (_froLy: ly) => {
    const tbl = '' //?
    return '   from ' + tbl
}

const xsssj_joiLines = (_joiLy: ly) => {
}

const xsssg_groLines = (_groLy: ly) => {
}
const xsss_selOrDis = (_selGp: selGp, _selTy: eSelTy, _sw: sw): [er, sql] => {
    const { fldSw, stmtSw } = _sw
    const ly = y_gp_ly(_selGp)
    const tblNmKey = xssst_tblNmKey(ly)
    if (stmtSw.has(tblNmKey))
        return [[], '']
    const exprDic = ly_exprDic(ly)
    const g0 = _selGp
    const [selLy, g1, e1] = xsssb_brk(g0, ['SEL', 'DIS'])
    const [froLy, g2, e2] = xsssb_brk(g1, ['SEL', 'DIS'])
    const [joiLy, g3, e3] = xsssb_brk(g2, ['JOI', 'LEF'])
    const [wheLy, g4, e4] = xsssb_brk(g3, ['WHE', 'AND', 'OR'])
    const [groLy, g5, e5] = xsssb_brk(g4, ['GRO'])
    const sel = xssss_selLines(selLy, _selTy, fldSw, exprDic)
    const fro = xsssf_froLines(froLy)
    const joi = xsssj_joiLines(joiLy)
    const whe = y_wheLines(wheLy, exprDic)
    const gro = xsssg_groLines(groLy)
    const sql = sel + fro + joi + whe + gro
    const er: er = e1.concat(e2, e3, e4, e5)
    return [er, sql]
}

const xs_sql = (_sqGp: sqGp[], _pm: pm, _sw: sw): [er, sql] => {
    let er: er = []
    let sql = ""
    for (let sqGp of _sqGp) {
        let [e, s] = xss_stmt(sqGp, _pm, _sw)
        er = er.concat(e)
        if (s !== null) {
            sql = s === ""
                ? s
                : sql += '\r\n\r\n' + s
        }
    }
    return [er, sql]
}

const xss_stmt = (_sqGp: sqGp, _pm: pm, _sw: sw): [er, stmt] => {
    const fstLin = _sqGp[0].lin
    const stmtTyStr = (x.sRmvPfx("?")(x.linFstTerm(fstLin))).toUpperCase()
    const stmtTy = ((): eStmtTy | null => {
        switch (stmtTyStr) { case 'DIS': case 'UPD': case 'SEL': case 'DRP': return stmtTyStr }
        return null
    })()
    let z: [er, stmt]
    switch (stmtTy) {
        case 'DIS': z = xsss_selOrDis(_sqGp, 'DIS', _sw); break
        case 'SEL': z = xsss_selOrDis(_sqGp, 'SEL', _sw); break
        case 'UPD': z = xssu_upd(_sqGp, _sw); break
        case 'DRP': z = xssd_drp(_sqGp); break
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

const xssst_tblNmKey = (ly: ly): tblNmKey => {
    const tblNmLin = x.itrFind(x.sHasPfxIgnCas(sq_FRO))(ly)
    if (tblNmLin === null)
        return ''
    const z = x.linT2(tblNmLin)
    return z
}

const xssut_tblNmKey = (ly: ly): tblNmKey => {
    const tblNmLin = x.itrFind(x.sHasPfxIgnCas(sq_FRO))(ly)
    if (tblNmLin === null)
        return ''
    const z = x.linT2(tblNmLin)
    return z
}

const xssss_selLines = (_selLy: ly, _selTy: eSelTy, _fldSw: fldSw, _exprDic: exprDic): [er, s] => {
    let distinct = ''; switch (_selTy) {
        case 'DIS': distinct = ''; break
        case 'SEL': distinct = ' distinct'; break
    }
    let fny: fldNm[] = []; {
        for (let lin of _selLy) {
            let a = x.sSplitSpc(lin)
            a.shift()
            fny = fny.concat(a)
        }
    }
    const sel = 'select' + distinct + '\r\n' + xssssf_fldsLines(fny, _fldSw, _exprDic)
    return [[], sel]
}

const xssssfl_lyPair = (_fny: fldNm[], _fldSw: fldSw, _exprDic: exprDic): [ly, ly] => {
    const fny = x.itrWhere((fldNm: s) => _fldSw.has(fldNm))(_fny)
    const l: s[] = (() => {
        let m = (fldNm: s) => dicDftVal(fldNm)(_exprDic, fldNm)
        return x.itrMap(m)(fny)

    })()
    const l1: s[] = x.itrMap(x.sRmvPfx("?"))(l)
    const r: s[] = x.itrAlignL(fny)
    const z: [ly, ly] = [l1, r]
    return z
}

const xssssf_fldsLines = (_fny: fldNm[], _fldSw: fldSw, _exprDic: exprDic): lines => {
    // {a} is all gp-lines started with either SEL | DIS
    let [l, r] = xssssfl_lyPair(_fny, _fldSw, _exprDic)
    const z: s[] = []
    for (let i = 0; i < l.length; i++) {
        z.push(l[i] + r[i])
    }
    return z.join(',\r\n') + '\r\n'
}
const xssd_drp = (a: drpGp): [er, stmt] => {
    const z: [er, stmt] = [[], '']
    return z
}

const xbbr_rmvRmkLin = (a: gp) => {
    let p = ({ ix, lin }) => !x.isRmkLin(lin)
    let z: gp = x.itrWhere(p)(a)
    return z
}

const xbtr_isSqLy = (a: ly) => {
    const fstNonRmkLin: lin = x.itrFind(x.isNonEmp)(a)
    const fstTerm = x.linFstTerm(fstNonRmkLin)
    return x.vIN(xbtrx_x)(x.sRmvPfx("?")(fstTerm).toUpperCase())
}

const xbtrx_x = x.sSplitSpc("DRP UPD SEL DIS")

const xbtr_isRmLy = (a: ly) => x.itrPredIsAllTrue(x.isRmkLin)(a)

const xbtr_isPmLy = (a: ly) => x.lyHasMajPfx("%")(a)

const xbtr_isSwLy = (a: ly) => x.lyHasMajPfx("?")(a)

const xbt_bkTy = (_ly: ly): eBkTy => {
    if (xbtr_isRmLy(_ly)) return 'RM'
    if (xbtr_isPmLy(_ly)) return 'PM'
    if (xbtr_isSwLy(_ly)) return 'SW'
    if (xbtr_isSqLy(_ly)) return 'SQ'
    return 'ER'
}

const xpp_pmSwPfxEr = (a: gp) => {
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

let xp_pm = (_pmGp: pmGp): [er, pm] => {
    let z: [er, pm]
    const [e1, g0] = yd_dupFstTermEr(_pmGp)
    const [e2, g1] = y_pfxEr(g0, "%")
    const [e3, g2] = xpp_pmSwPfxEr(g1)
    const er = e1.concat(e2, e3)
    const pm = x.lySdic(y_gp_ly(g1))
    z = [er, pm]
    return z
}


const xw_fmT3Dup = (gp: gp): [er, gp] => {
    return [[], gp]
    /*
    hasEr: a => lin_fmT3DupTermSet(a.lin).size > 0,
        erFun: a => [{ ix: a.ix, endMsg: [lin_fmT3DupTermMrkrLin(a.lin)], sfxMsg: [] }]
    */
}

const xw_stmtSwLin_mustBeEither_SEL_or_UPD = (gp: gp): [er, gp] => {
    return [[], gp]
    /*
    hasEr: ({ ix, lin }) => {
        if (!x.sHasPfx('?#')(lin)) return false
        if (x.sHasPfx('?#SEL#')(lin)) return false
        if (x.sHasPfx('?#UPD#')(lin)) return false
        return true
    },
        erFun: a => [{ ix: a.ix, endMsg: [lin_t1MrkrLin(a.lin, '')], sfxMsg: [] }]
    */
}

const xwo_opIsErr = (op: s): b => !['AND', 'OR', 'EQ', 'NE'].includes(op.toUpperCase())

const xw_swLinOp_mustBeAny_AND_OR_EQ_NE = (gp: gp): [er, gp] => {
    return [[], gp]
    /*
    hasEr: a => op_isErr(x.linT2(a.lin)),
        erFun: a => [{
            ix: a.ix,
            endMsg: [lin_t2MrkrLin(a.lin, 'switch line 2nd term must be [ AND | OR | EQ | NE ]')],
            sfxMsg: []
        }]
    */
}

const xw_sw = (_gp: gp, _pm: pm): [er, sw] => {
    let emptyBdic = new Map<s, b>()
    let z: [er, sw]
    const [e0, g0] = yd_dupFstTermEr(_gp)
    const [e1, g1] = y_pfxEr(g0, "?")
    const [e2, g2] = xw_fmT3Dup(g1)
    const [e3, g3] = xw_stmtSwLin_mustBeEither_SEL_or_UPD(g2)
    const [e4, g4] = xw_swLinOp_mustBeAny_AND_OR_EQ_NE(g3)
    const ly = y_gp_ly(g4)
    const er = e0.concat(e1, e2, e3, e4)
    const sw = xww_sw(ly, _pm)
    z = [er, sw]
    // x.oBrw({ inp: { a, pm }, oup: z, srcLy: x.sSplitLines(xw_fnd_erSw.toString()), e0, e1, e2, e3, e4, g0, g1, g2, g3, g4, ly }); debugger
    return z
}

const xww_sw = (a: ly, pm: pm): sw => {
    const bdic = new Map<s, b>()
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
        if (bdic.has(t)) return bdic.get(t)
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

    const xww_sw = () => {
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
                    bdic.set(key, boolOpt)
                    isEvaluated = true
                } else
                    ly1.push(lin)
            }
            ly = ly1
        }
        if (ly1.length !== 0)
            x.er('ly1 should has 0-length', { ly1 })
        let z: sw = xwww_sw(bdic)
        //x.oBrw({ inp: { a, pm: x.dicLy(pm) }, oup_stmtSw: x.dicLy(z.stmtSw), oup_fldSw: x.dicLy(z.fldSw), sw: x.dicLy(sw) }); debugger
        return z
    }
    return xww_sw()
}

const xwww_sw = (a: bdic): sw => {
    const fun = ([k, b]) => x.sHasPfx('?#')(k)
    const { t, f } = x.itrBrkForTrueFalse(fun)(a)
    const stmtSw = new Map<s, b>(t)
    const fldSw = new Map<s, b>(f)
    return { fldSw, stmtSw }
}

const xv_vtp = (ly: ly, er: er): s => {
    let l = xvl_leftLyAy(ly, er)
    let r = xvr_rightLyAy(ly, er)
    let o: ly = []
    for (let i of x.nItr(l.length)) {
        let m = xvm_mge(l[i], r[i])
        o = o.concat(m)
    }
    let z = o.join('\r\n')
    return z
}

const xvl_leftLyAy = (ly: ly, er: er): ly[] => {
    const o: ly[] = []
    for (let i of x.nItr(ly.length)) {
        const m = [ly[i]].concat(xvle_endMsgErItm(er, i))
        o.push(m)
    }
    return o
}

const xvw_wdt = (lyAy: ly[]): x.wdt => {
    const b = x.itrMap(x.itrWdt)(lyAy)
    return x.vDft(0)(x.itrMax(b))
}

const xvr_leftLyAyAlignLy = (lyAy: ly[]) => {
    const w = xvw_wdt(lyAy)
    const align = ly => x.itrMap(x.sAlignL(w))(ly)
    const o = x.itrMap(align)(lyAy)
    return o
}

const xvr_rightLyAy = (ly: ly, er: er): ly[] => {
    const o: ly[] = []
    for (let i of x.nItr(ly.length)) {
        const m = xvrs_sfxMsgEr(er, i)
        o.push(m)
    }
    return o
}

const xvle_endMsgErItm = (er: er, ix: n) => {
    let o: s[] = []
    for (let { ix: i, endMsg } of er) {
        if (i === ix) o = o.concat(endMsg)
    }
    return o
}

const xvm_mge = (leftLy: ly, rightLy: ly) => {
    const sep = ' --- '
    const llen = leftLy.length
    const rlen = rightLy.length
    const o: ly = []
    const min = x.itrMin([llen, rlen])
    for (let i of x.nItr(min)) {
        const m = leftLy[i] + sep + rightLy[i]
        o.push(m)
    }
    if (llen > rlen) {
        for (let i = rlen; i < llen; i++)
            o.push(leftLy[i].trim())
    } else if (llen < rlen) {
        const s = x.nSpc(leftLy[0].length)
        for (let i = llen; i < rlen; i++)
            o.push(s + sep + rightLy[i])
    }
    return o
}

const xeii_endMsgErItm = (ix: n, endMsgStr: s): erItm => {
    const sfxMsg = []
    const endMsg = [endMsgStr]
    return { ix, endMsg, sfxMsg }
}

const xvrs_sfxMsgEr = (er: er, ix: n) => {
    let o: s[] = []
    for (let { ix: i, sfxMsg } of er) {
        if (i === ix) o = o.concat(sfxMsg)
    }
    return o
}

//!=============================================================
const y_wheLines = (ly: ly, exprDic: exprDic) => {
    if (ly.length === 0)
        return ''
    {
        const linIsQmrkPfx = (lin: lin, pfx: s) => true
        const assertQmrkPfxAy = (lin: lin, pfx: s[]) => { }
        const assertQmrkPfx = (lin: lin, pfx: s) => { }
        const assertQmrkAndOr = (lin: lin) => assertQmrkPfxAy(lin, ['AND', 'OR'])
        assertQmrkPfx(ly[0], 'WHE')
        ly.slice(1).forEach(assertQmrkAndOr)
    }
    const wheLines = () => ''
    const andOrLy = () => []
    const andOrLin = lin => { }
    const andOrLines = () => x.itrMap(andOrLin)(andOrLy()).join('\r\n')
    return wheLines() + andOrLines()
}

const y_gp_ly = (a: gp) => x.itrMap(x.oPrp("lin"))(a) as ly

const yd_dupFstTermEr = (_gp: gp): [er, gp] => {
    const ly = y_gp_ly(_gp)
    const dup = lyFstTermDupSet(ly)
    let er: er = []
    let gp = _gp
    for (let itm of dup) {
        let [e, g] = yde_erGp(_gp, itm)
        er = er.concat(e)
        gp = g
    }
    const z: [er, gp] = [er, gp]
    return z
}
// remove all, except after, lines in {a} with {fstTerm} as [gp] and 
// put the removed lines as er
// return [er,gp]
const yde_erGp = (_gp: gp, _fstTerm: s): [er, gp] => {
    const ixay: n[] = []
    for (let { ix, lin } of _gp) {
        let fst = x.linFstTerm(lin)
        if (_fstTerm === fst) ixay.push(ix)
    }
    ixay.pop()
    const ixset = new Set<n>(ixay)
    return ydee_erGp(_gp, ixset)
}

const ydee_erGp = (_gp: gp, ixset: Set<n>): [er, gp] => {
    // return [er, gp]
    const er: er = []
    const gp: gp = []
    for (let { ix, lin } of _gp) {
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

const y_pfxEr = (a: gp, pfx: s) => {
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
//!======================================================================
const assertAyIsEqLen = (ay1: ay, ay2: ay) => {
    if (ay1.length !== ay2.length)
        x.er('two ay are diff len', { ay1, ay2 })
}
const dicDftVal = <T>(dft: T) => (dic: x.dic<T>, key: s): T => {
    return dft
}

let lin_termAy = (_lin: lin): term[] => {
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
const ly_exprDic = (ly: ly): exprDic => x.pipe(ly)(x.itrWhere(x.sHasPfx('$')), x.lySdic)
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

const lin_t2PosWdt = (a: lin): posWdt | null => {
    const a1 = posLin_ParseSpc({ pos: 0, lin: a })
    const [t1, a2] = posLin_ParseTerm(a1)
    const a3 = posLin_ParseSpc(a2)
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
const lin_fmT3DupTermMrkrLin = (a: lin): lin => {
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
const curExpConstNy = x.fjsExpConstNy(__filename)
const curConstNy = x.fjsConstNy(__filename)
{
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
}
const lySdic = (a: ly) => {
    const z: sdic = new Map()
    for (let lin of a) {
        const { term: k, remainLin: s } = x.linShift(lin)
        z.set(k, s)
    }
    return z
}

const lyFstTermAy = x.itrMap(x.linFstTerm) as (ly: ly) => ly
const lyFstTermDupSet = x.compose(lyFstTermAy, x.itrDupSet) as (ly: ly) => sset

const posLin_ParseSpc = ({ pos, lin }: posLin): posLin => {
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

//!=============================================================
if (module.id === '.') {
    const sqtp = x.ftLines(__dirname + '/spec/sample.sqtp.txt')
    const tst__sqtpRslt = () => {
        const { vtp, sql } = sqtpRslt(sqtp)
        x.sBrw(vtp)
        x.sBrw(sql)
        debugger
    }
    const tst__xwww_sw = () => {
        const bdic = new Map<s, b>([['?#', true], ['b', false]])
        const { fldSw, stmtSw } = xwww_sw(bdic)
        x.assertIsEq(fldSw, new Map<s, b>([['b', false]]))
        x.assertIsEq(stmtSw, new Map<s, b>([['?#', true]]))
    }
    const tst__xssst_tblNmKey = () => {
        const ly = ['fm #aa']
        const stmtSw = new Map<s, b>([['?#aa', false]])
        const aa = xssst_tblNmKey(ly)
    }
    const tst__sqLy = () => ['sel xxx', 'fm ', '$xxx ka']
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
    const tst__xw_sw = () => {
        const t = { swGp: [], pm: new Map<s, s>(), exp: {} }
        const a = t.swGp
        const pm = t.pm
        const exp = t.exp
        const act = xw_sw(a, pm)
        x.assertIsEq(exp, act)
    }
    tst__sqtpRslt()
}