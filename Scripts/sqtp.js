"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./curryfun.d.ts"/>
const x = require("./curryfun");
//!const==========================================================================
const sq_UPD = 'UPD';
const sq_DIS = 'DIS';
const sq_DRP = 'DRP';
const sq_SEL = 'SEL';
const sq_FRO = 'FRO';
const sq_GRO = 'GRO';
const sq_JOI = 'JOI';
const sq_LEF = 'LEF';
const sq_WHE = 'WHE';
const sq_AND = 'AND';
const sq_OR = 'OR';
//!export ==========================================================================
exports.sqtpRslt = (_sqtp) => {
    const ly = x.sSplitLines(_sqtp);
    const clnLy = xc_clnLy(ly);
    const { pmGp, swGp, sqGpy, pmExcessGpy, swExcessGpy, erGpy } = xb_gpBrk(clnLy);
    const e1 = xe_endMsgEr('--- this block is [error], it is none of block of [remark | parameter | switch | sql]')(erGpy);
    const e2 = xe_endMsgEr('--- this is excess [parameter] block')(pmExcessGpy);
    const e3 = xe_endMsgEr('--- this is excess [switch] block')(swExcessGpy);
    const [e4, pm] = xp_pm(pmGp); // x3_fnd_erPm(pmGp)
    const [e5, sw] = xw_sw(swGp, pm);
    const [e6, sql] = xs_sql(sqGpy, pm, sw);
    const er = e1.concat(e2, e3, e4, e5, e6);
    // sw_Brw(swGp, sw); debugger
    const vtp = xv_vtp(clnLy, er);
    return { sql, vtp };
};
//!x==========================================================================
const xe_endMsgEr = (endMsg) => (a) => x.itrMap(xei_endMsgErItm(endMsg))(a);
const xei_endMsgErItm = (endMsg) => (a) => y_endMsgErItm(x.ayLas(a).ix, endMsg);
const xcr_rmvMsg = (a) => {
    const b = a.match(/(.*)---/);
    const c = b === null ? a : a[1];
    if (x.sHasPfx("^")(c.trimLeft()))
        return "";
    return c;
};
const xc_clnLy = x.compose(x.itrMap(xcr_rmvMsg), x.itrRmvEmp);
const xbg_gp = (_clnLy) => {
    const m = (lin, ix) => { return { ix, lin }; };
    return x.itrMap(m)(_clnLy);
};
const xbn_noRmk = (_gp) => {
    const noRmk = (a) => x.isNonRmkLin(a.lin);
    return x.itrWhere(noRmk)(_gp);
};
const xbb_brkIntoGpy = (_noRmkGp) => {
    const linPfxSep = '==';
    let { ix, lin } = _noRmkGp[0];
    const gpy = [];
    let curGp = [];
    for (let { ix, lin } of _noRmkGp) {
        if (x.sHasPfx(linPfxSep)(lin)) {
            if (curGp.length !== 0)
                gpy.push(curGp);
            curGp = [];
        }
        else
            curGp.push({ ix, lin });
    }
    if (curGp.length !== 0)
        gpy.push(curGp);
    return x.itrMap(xbbr_rmvRmkLin)(gpy);
};
const xb_gpBrk = (_clnLy) => {
    const gp = xbg_gp(_clnLy);
    const noRmkGp = xbn_noRmk(gp);
    const gpy = xbb_brkIntoGpy(noRmkGp);
    let pmGp = [];
    let swGp = [];
    const swExcessGpy = [];
    const pmExcessGpy = [];
    const erGpy = [];
    const sqGpy = [];
    for (let gp of gpy) {
        debugger;
        const ly = y_gp_ly(gp);
        debugger;
        const bkty = xbt_bkTy(ly);
        switch (bkty) {
            case 'ER':
                erGpy.push(gp);
                break;
            case 'RM':
                erGpy.push(gp);
                break;
            case 'SW':
                if (swGp.length === 0)
                    swGp = gp;
                else
                    swExcessGpy.push(gp);
                break;
            case 'PM':
                if (pmGp.length === 0)
                    pmGp = gp;
                else
                    pmExcessGpy.push(gp);
                break;
            case 'SQ':
                sqGpy.push(gp);
                break;
            default: x.er('xbt_bkTy return unexpected bkty', { ly, bkty });
        }
    }
    return { pmGp, swGp, sqGpy, pmExcessGpy, swExcessGpy, erGpy };
};
const xssu_updStmt = (_updGp, _sw) => {
    const { fldSw, stmtSw } = _sw;
    const ly = y_gp_ly(_updGp);
    var tblNmKey = xssut_tblNmKey(ly);
    if (!stmtSw.has(tblNmKey))
        return [[], null];
    const exprDic = y_exprDic(ly);
    const [ee1, u, g1] = xssub_brk(_updGp);
    const [ee2, j, g2] = xssub_brk(g1);
    const [ee3, s, g3] = xssub_brk(g2);
    const [ee4, w, g4] = xssub_brk(g3);
    const [e1, upd] = xssuu_updPhr(u);
    const [e2, joi] = xssuj_joiPhr(j);
    const [e3, set] = xssus_setPhr(s);
    const [e4, whe] = xssuw_whePhr(w);
    const er = e1.concat(e2, e3, e4);
    const sql = upd + joi + set + whe;
    return [er, sql];
};
const xssub_brk = (_gp) => [[], [], []];
const xssuu_updPhr = (_ly) => {
    const phr = y_phrPfx('update') + xssuut_tblNm(_ly[0]) + '\r\n';
    return [[], phr];
};
const xssujl_joiPhrLines = (_lin) => [[], ''];
const xssuj_joiPhr = (_ly) => {
    if (_ly.length === 0)
        return [[], ''];
    let phrAy = [];
    let er = [];
    for (let lin of _ly) {
        let [e, phr] = xssujl_joiPhrLines(lin);
        phrAy.push(phr);
        er = er.concat(e);
    }
    return [er, phrAy.join('\r\n') + '\r\n'];
};
const xssus_setPhr = (_ly) => [[], ''];
const xssuw_whePhr = (_ly) => [[], ''];
const xssuut_tblNm = (_fstLin) => {
    const a2 = x.sRmvPfx("?")(_fstLin);
    const a3 = x.sHasPfxIgnCas(sq_UPD)(a2);
    if (!a3)
        return null;
    let z = x.linT2(a2);
    return z;
};
const xsssbe_missingLyEr = (sy, _ix, _optional) => {
    if (_optional === 'Optional')
        return [];
    if (sy.length > 0)
        return [];
    return [];
};
const xsssb_brk = (_gp, _pfxAy, _optional) => {
    const sy = [];
    const gp = [];
    const er = xsssbe_missingLyEr(sy, _gp[0].ix, _optional);
    return [sy, gp, er];
};
const xsssf_froPhr = (_froLy) => {
    const tbl = ''; //?
    return '   from ' + tbl;
};
const xsssj_joiPhr = (_joiLy) => {
};
const xsssg_groPhr = (_groLy, _exprDic) => {
    const lines = ''; //?
    return '  group by\r\n' + lines;
};
const xsss_selOrDisStmt = (_selGp, _selTy, _sw) => {
    const { fldSw, stmtSw } = _sw;
    const ly = y_gp_ly(_selGp);
    const tblNmKey = xssst_tblNmKey(ly);
    if (stmtSw.has(tblNmKey))
        return [[], ''];
    const exprDic = y_exprDic(ly);
    const g0 = _selGp;
    const [selLy, g1, e1] = xsssb_brk(g0, ['SEL', 'DIS']);
    const [froLy, g2, e2] = xsssb_brk(g1, ['SEL', 'DIS']);
    const [joiLy, g3, e3] = xsssb_brk(g2, ['JOI', 'LEF'], 'Optional');
    const [wheLy, g4, e4] = xsssb_brk(g3, ['WHE', 'AND', 'OR'], 'Optional');
    const [groLy, g5, e5] = xsssb_brk(g4, ['GRO'], 'Optional');
    const sel = xssss_selPhr(selLy, _selTy, fldSw, exprDic);
    const fro = xsssf_froPhr(froLy);
    const joi = xsssj_joiPhr(joiLy);
    const whe = yw_whePhr(wheLy, exprDic);
    const gro = xsssg_groPhr(groLy, exprDic);
    const sql = sel + fro + joi + whe + gro;
    const er = e1.concat(e2, e3, e4, e5);
    return [er, sql];
};
const xs_sql = (_sqGp, _pm, _sw) => {
    let er = [];
    let sql = "";
    for (let sqGp of _sqGp) {
        let [e, s] = xss_stmt(sqGp, _sw);
        er = er.concat(e);
        if (s !== null) {
            sql = s === ""
                ? s
                : sql += '\r\n\r\n' + s;
        }
    }
    return [er, sql];
};
const xsst_stmtTy = (_sqGp) => {
    const fstLin = _sqGp[0].lin;
    const stmtTyStr = (x.sRmvPfx("?")(x.linFstTerm(fstLin))).toUpperCase();
    switch (stmtTyStr) {
        case 'DIS':
        case 'UPD':
        case 'SEL':
        case 'DRP': return stmtTyStr;
    }
    return null;
};
const xss_stmt = (_sqGp, _sw) => {
    const stmtTy = xsst_stmtTy(_sqGp);
    switch (stmtTy) {
        case 'DIS': return xsss_selOrDisStmt(_sqGp, 'DIS', _sw);
        case 'SEL': return xsss_selOrDisStmt(_sqGp, 'SEL', _sw);
        case 'UPD': return xssu_updStmt(_sqGp, _sw);
        case 'DRP': return xssd_drpStmt(_sqGp);
    }
    const ix = _sqGp[0].ix;
    const lin = _sqGp[0].lin;
    const m = x.sFmt(' must be [? | ? | ? | ?]', sq_SEL, sq_UPD, sq_DIS, sq_DRP);
    const endMsg = [exports.lin_t1MrkrLin(lin, m)];
    const sfxMsg = [];
    const erItm = { ix, endMsg, sfxMsg };
    const er = [erItm];
    return [er, null];
};
const xssst_tblNmKey = (ly) => {
    const tblNmLin = x.itrFind(x.sHasPfxIgnCas(sq_FRO))(ly);
    if (tblNmLin === null)
        return '';
    return x.linT2(tblNmLin);
};
const xssut_tblNmKey = (ly) => {
    const tblNmLin = x.itrFind(x.sHasPfxIgnCas(sq_FRO))(ly);
    if (tblNmLin === null)
        return '';
    return x.linT2(tblNmLin);
};
const xssssf_fny = (_selLy) => {
    let fny = [];
    for (let lin of _selLy) {
        let a = x.sSplitSpc(lin);
        a.shift();
        fny = fny.concat(a);
    }
    return fny;
};
const xssss_selPhr = (_selLy, _selTy, _fldSw, _exprDic) => {
    const distinct = _selTy === 'DIS' ? ' distinct' : '';
    const fny = xssssf_fny(_selLy);
    const sel = y_phrPfx('select' + distinct, 'NewLine') + xssssf_fldsLines(fny, _fldSw, _exprDic);
    return [[], sel];
};
const xssssfl_lyPair = (_fny, _fldSw, _exprDic) => {
    const fny = x.itrWhere((fldNm) => _fldSw.has(fldNm))(_fny);
    const l = (() => {
        let m = (fldNm) => exports.dic_dftVal(fldNm)(_exprDic, fldNm);
        return x.itrMap(m)(fny);
    })();
    const l1 = x.itrMap(x.sRmvPfx("?"))(l);
    const r = x.itrAlignL(fny);
    return [l1, r];
};
const xssssf_fldsLines = (_fny, _fldSw, _exprDic) => {
    // {a} is all gp-lines started with either SEL | DIS
    let [l, r] = xssssfl_lyPair(_fny, _fldSw, _exprDic);
    const z = [];
    for (let i = 0; i < l.length; i++) {
        z.push(l[i] + r[i]);
    }
    return z.join(',\r\n') + '\r\n';
};
const xssd_drpStmt = (a) => {
    return [[], ''];
};
const xbbr_rmvRmkLin = (a) => {
    let p = ({ ix, lin }) => !x.isRmkLin(lin);
    let z = x.itrWhere(p)(a);
    return z;
};
const xbtr_isSqLy = (a) => {
    const fstNonRmkLin = x.itrFind(x.isNonEmp)(a);
    const fstTerm = x.linFstTerm(fstNonRmkLin);
    return x.vIN(xbtrx_x)(x.sRmvPfx("?")(fstTerm).toUpperCase());
};
const xbtrx_x = x.sSplitSpc("DRP UPD SEL DIS");
const xbtr_isRmLy = (a) => x.itrPredIsAllTrue(x.isRmkLin)(a);
const xbtr_isPmLy = (a) => x.lyHasMajPfx("%")(a);
const xbtr_isSwLy = (a) => x.lyHasMajPfx("?")(a);
const xbt_bkTy = (_ly) => {
    if (xbtr_isRmLy(_ly))
        return 'RM';
    if (xbtr_isPmLy(_ly))
        return 'PM';
    if (xbtr_isSwLy(_ly))
        return 'SW';
    if (xbtr_isSqLy(_ly))
        return 'SQ';
    return 'ER';
};
const xppi_isPmSwPfxEr = ({ ix, lin }) => {
    const isPrmSwLin = (lin) => x.sHasPfx('%?')(lin);
    if (!isPrmSwLin(lin))
        return false;
    const ay = x.sSplitSpc(lin);
    if (ay.length !== 2) {
        const sfxMsg = ['must have 2 terms for prefix being [%?]'];
        return true;
    }
    return true;
};
const xppt_isPmSwPfx_twoTermsEr = (_ixlin) => {
    const { lin } = _ixlin;
    if (!x.sHasPfx('%?')(lin))
        return false;
    if (x.sSplitSpc(lin).length === 2)
        return false;
    return true;
};
const xppz_isPmSwPfx_zerOneEr = (_ixlin) => {
    const { lin } = _ixlin;
    const ay = x.sSplitSpc(lin);
    const t2 = ay[1];
    if (t2 === '0' || t2 === '1')
        return false;
    return true;
};
const xpp$t_erTwoTerm = (_erGp) => {
    const a = 'must have 2 terms for prefix being [%?]';
    const m = ({ ix, lin }) => y_sfxMsgErItm(ix, a);
    return x.itrMap(m)(_erGp);
};
const xpp$z_erZerOne = (_erGp) => {
    const endMsgStr = lin => exports.lin_t2MrkrLin(lin, '--[%?]-line must have 2nd be [0 | 1]');
    const m = ({ ix, lin }) => y_endMsgErItm(ix, endMsgStr(lin));
    return x.itrMap(m)(_erGp);
};
const xpp_pmSwPfxEr = (_gp) => {
    const { t: twoTermErGp, f: g1 } = x.itrBrkForTrueFalse(xppt_isPmSwPfx_twoTermsEr)(_gp); // as x.Itr<ixlin>)
    const { t: zerOneErGp, f: g2 } = x.itrBrkForTrueFalse(xppz_isPmSwPfx_zerOneEr)(g1);
    const e1 = xpp$t_erTwoTerm(twoTermErGp);
    const e2 = xpp$z_erZerOne(zerOneErGp);
    const e = e1.concat(e2);
    return [e, g2];
};
const xp_pm = (_pmGp) => {
    const [e1, g0] = yd_dupFstTermEr(_pmGp);
    const [e2, g1] = y_pfxEr(g0, "%");
    const [e3, g2] = xpp_pmSwPfxEr(g1);
    const er = e1.concat(e2, e3);
    const pm = exports.ly_sdic(y_gp_ly(g1));
    return [er, pm];
};
const xwdi_isFmT3DupTermEr = (_ixlin) => exports.lin_fmT3DupTermSet(_ixlin.lin).size > 0;
const xwd_vdtFmT3DupEr = (_gp) => {
    const { t: twoTermErGp, f: g1 } = x.itrBrkForTrueFalse(xwdi_isFmT3DupTermEr)(_gp);
    //        erFun: a => [{ ix: a.ix, endMsg: [lin_fmT3DupTermMrkrLin(a.lin)], sfxMsg: [] }]
    return [[], []];
};
const xwp_vdtPfxmustBeEither_SEL_or_UPD = (_gp) => {
    return [[], []];
    /*
    hasEr: ({ ix, lin }) => {
        if (!x.sHasPfx('?#')(lin)) return false
        if (x.sHasPfx('?#SEL#')(lin)) return false
        if (x.sHasPfx('?#UPD#')(lin)) return false
        return true
    },
        erFun: a => [{ ix: a.ix, endMsg: [lin_t1MrkrLin(a.lin, '')], sfxMsg: [] }]
    */
};
const xwoos_swOp = (_ixlin) => {
    const op = x.sSplitSpc(_ixlin.lin)[1];
    switch (op) {
        case 'AND':
        case 'OR':
        case 'EQ':
        case 'NE': return op;
    }
    return null;
};
const xwoo_opIsEr = (_ixlin) => xwoos_swOp(_ixlin) === null;
const xwo_vdtOp_mustBe_AND_OR_EQ_NE = (_gp) => {
    const { t, f } = x.itrBrkForTrueFalse(xwoo_opIsEr)(_gp);
    return [[], _gp];
    /*
    hasEr: a => op_isErr(x.linT2(a.lin)),
        erFun: a => [{
            ix: a.ix,
            endMsg: [lin_t2MrkrLin(a.lin, 'switch line 2nd term must be [ AND | OR | EQ | NE ]')],
            sfxMsg: []
        }]
    */
};
const xw_sw = (_gp, _pm) => {
    let emptyBdic = new Map();
    let z;
    const [e0, g0] = yd_dupFstTermEr(_gp);
    const [e1, g1] = y_pfxEr(g0, "?");
    const [e2, g2] = xwd_vdtFmT3DupEr(g1);
    const [e3, g3] = xwp_vdtPfxmustBeEither_SEL_or_UPD(g2);
    const [e4, g4] = xwo_vdtOp_mustBe_AND_OR_EQ_NE(g3);
    const ly = y_gp_ly(g4);
    const er = e0.concat(e1, e2, e3, e4);
    const sw = xww_sw(ly, _pm);
    z = [er, sw];
    // x.oBrw({ inp: { a, pm }, oup: z, srcLy: x.sSplitLines(xw_fnd_erSw.toString()), e0, e1, e2, e3, e4, g0, g1, g2, g3, g4, ly }); debugger
    return z;
};
const xwwe_evlLin = (_lin, _pm, _bdic) => {
    const isSomeNull = itr => { for (let i of itr)
        if (i === null)
            return true; return false; };
    const someTrue = itr => { for (let i of itr)
        if (i === true)
            return true; return false; };
    const allTrue = itr => { for (let i of itr)
        if (i !== true)
            return false; return true; };
    const xAND = ay => isSomeNull(ay) ? null : allTrue(ay);
    const xOR = ay => isSomeNull(ay) ? null : someTrue(ay);
    const xEQ = ([a, b]) => a === null || b === null ? null : a === b;
    const xNE = ([a, b]) => a === null || b === null ? null : a !== b;
    const evlT2 = t => {
        if (t.toUpperCase() === '*BLANK')
            return '';
        return t;
    };
    const evlT = _t => {
        if (_bdic.has(_t))
            return _bdic.get(_t);
        return _pm.get(_t);
    };
    const evlAy = ay => x.itrMap(evlT)(ay);
    const evlT1T2 = (t1, t2) => [evlT(t1), evlT2(t2)];
    const evlOR = ay => { let a = evlAy(ay); return xOR(a); };
    const evlAND = ay => { let a = evlAy(ay); return xAND(a); };
    const evlEQ = (t1, t2) => { let [a1, a2] = evlT1T2(t1, t2); return xEQ([a1, a2]); };
    const evlNE = (t1, t2) => { let [a1, a2] = evlT1T2(t1, t2); return xNE([a1, a2]); };
    let ay = x.sSplitSpc(_lin);
    let key = x.vDft("")(ay.shift()).toUpperCase();
    let op = x.vDft("")(ay.shift()).toUpperCase();
    let boolOpt = null;
    switch (op) {
        case 'AND':
            boolOpt = evlAND(ay);
            break;
        case 'OR':
            boolOpt = evlOR(ay);
            break;
        case 'EQ':
            boolOpt = evlEQ(ay[0], ay[1]);
            break;
        case 'NE':
            boolOpt = evlNE(ay[0], ay[1]);
            break;
        default: x.er('');
    }
    return { key, boolOpt };
};
const xww_sw = (_ly, _pm) => {
    const bdic = new Map();
    let ly1 = [];
    let isEvaluated = true;
    let j = 0;
    let ly = x.itrClone(_ly);
    while (isEvaluated && j++ < 100) {
        isEvaluated = false;
        ly1 = [];
        for (let lin of ly) {
            let { key, boolOpt } = xwwe_evlLin(lin, _pm, bdic);
            if (boolOpt !== null) {
                bdic.set(key, boolOpt);
                isEvaluated = true;
            }
            else
                ly1.push(lin);
        }
        ly = ly1;
    }
    if (ly1.length !== 0)
        x.er('ly1 should has 0-length', { ly1 });
    let z = xwww_sw(bdic);
    //x.oBrw({ inp: { a, pm: x.dicLy(pm) }, oup_stmtSw: x.dicLy(z.stmtSw), oup_fldSw: x.dicLy(z.fldSw), sw: x.dicLy(sw) }); debugger
    return z;
};
const xwww_sw = (a) => {
    const fun = ([k, b]) => x.sHasPfx('?#')(k);
    const { t, f } = x.itrBrkForTrueFalse(fun)(a);
    const stmtSw = new Map(t);
    const fldSw = new Map(f);
    return { fldSw, stmtSw };
};
const xv_vtp = (_ly, _er) => {
    const l = xvl_leftLyAy(_ly, _er);
    const l1 = xva_leftLyAyAlignLy(l);
    const r = xvr_rightLyAy(_ly, _er);
    let o = [];
    for (let i of x.nItr(l.length)) {
        let m = xvm_mge(l1[i], r[i]);
        o = o.concat(m);
    }
    return o.join('\r\n');
};
const xvl_leftLyAy = (_ly, _er) => {
    const o = [];
    for (let i of x.nItr(_ly.length)) {
        const m = [_ly[i]].concat(xvle_endMsgErItm(_er, i));
        o.push(m);
    }
    return o;
};
const xvaw_wdt = (lyAy) => {
    const b = x.itrMap(x.itrWdt)(lyAy);
    return x.vDft(0)(x.itrMax(b));
};
const xva_leftLyAyAlignLy = (_lyAy) => {
    const w = xvaw_wdt(_lyAy);
    const align = (ly) => x.itrMap(x.sAlignL(w))(ly);
    return x.itrMap(align)(_lyAy);
};
const xvr_rightLyAy = (ly, er) => {
    const o = [];
    for (let i of x.nItr(ly.length)) {
        const m = xvrs_sfxMsgEr(er, i);
        o.push(m);
    }
    return o;
};
const xvle_endMsgErItm = (er, ix) => {
    let o = [];
    for (let { ix: i, endMsg } of er) {
        if (i === ix)
            o = o.concat(endMsg);
    }
    return o;
};
const xvm_mge = (leftLy, rightLy) => {
    const sep = ' --- ';
    const llen = leftLy.length;
    const rlen = rightLy.length;
    const o = [];
    const min = x.itrMin([llen, rlen]);
    for (let i of x.nItr(min)) {
        const m = leftLy[i] + sep + rightLy[i];
        o.push(m);
    }
    if (llen > rlen) {
        for (let i = rlen; i < llen; i++)
            o.push(leftLy[i].trim());
    }
    else if (llen < rlen) {
        const s = x.nSpc(leftLy[0].length);
        for (let i = llen; i < rlen; i++)
            o.push(s + sep + rightLy[i]);
    }
    return o;
};
const xvrs_sfxMsgEr = (er, ix) => {
    let o = [];
    for (let { ix: i, sfxMsg } of er) {
        if (i === ix)
            o = o.concat(sfxMsg);
    }
    return o;
};
//!y=============================================================
const y_phrPfx = (_pfx, _newLine) => (_newLine === 'NewLine') ? _pfx + '\r\n' : _pfx + x.nSpc(10 - _pfx.length);
const y_endMsgErItm = (ix, endMsgStr) => { return { ix, endMsg: [endMsgStr], sfxMsg: [] }; };
const y_sfxMsgErItm = (ix, sfxMsgStr) => { return { ix, endMsg: [], sfxMsg: [sfxMsgStr] }; };
const y_exprDic = (ly) => x.pipe(ly)(x.itrWhere(x.sHasPfx('$')), x.lySdic);
const yw_whePhr = (_wheLy, _exprDic) => {
    if (_wheLy.length === 0)
        return '';
    {
        const linIsQmrkPfx = (lin, pfx) => true;
        const assertQmrkPfxAy = (lin, pfx) => { };
        const assertQmrkPfx = (lin, pfx) => { };
        const assertQmrkAndOr = (lin) => assertQmrkPfxAy(lin, ['AND', 'OR']);
        assertQmrkPfx(_wheLy[0], 'WHE');
        _wheLy.slice(1).forEach(assertQmrkAndOr);
    }
    const ay = yww_wheAndOrLines_prmAy(_wheLy, _exprDic);
    const linesAy = x.itrMap(ywl_wheAndOrLines)(ay);
    return linesAy.join('\r\n') + '\r\n';
};
const ywwl_wheAndOrLin_prm = (_wheLin) => {
    const pfx = 'WHE';
    const opnBkt = '';
    const fldLines = '';
    const op = 'between';
    const oprand = '';
    const clsBkt = '';
    return { pfx, opnBkt, fldLines, op, oprand, clsBkt };
};
const yww_wheAndOrLines_prmAy = (_wheLy, _exprDic) => x.itrMap(ywwl_wheAndOrLin_prm)(_wheLy);
const ywl_wheAndOrLines = (_a) => {
    const { pfx, opnBkt, fldLines, op, oprand, clsBkt } = _a;
    const f = fldLines;
    const p = pfx;
    return p + opnBkt + f + ' ' + p + ' ' + oprand + clsBkt;
};
const yww_whePhr = (_wheLy, _exprDic) => {
    if (_wheLy.length === 0)
        return '';
    const wheLin = _wheLy[0];
    const { term, remainLin } = x.linShift(wheLin);
    const t1 = (x.sRmvPfx("?")(term)).toUpperCase();
    if (t1 !== 'WHE')
        x.er('wheLin must has pfx [?WHE | WHE]', { wheLin });
    return '  where     ' + y_wheRstLines(remainLin, _exprDic);
};
const y_wheRstLines = (remainLin, _exprDic) => '';
const ywa_andOrLines = (_wheLy, _exprDic) => {
    const linesAy = []; //?
    return linesAy.join('\r\n');
};
/*
const andOrLinesAy = x.itrMap(ywa_andOrLines(_exprDic))(andOrLy)
const andOrLines = andOrLinesAy.join('\r\n')
const ywlp_pfx = (_andOrLin: lin): s => {
    const pfx: s = '' //?
    switch (pfx) {
        case 'AND': return '  and      '
        case 'OR': return '  or       '
        default:
    }
    x.er('_andOrLin must be [?WHE | ?AND | ?OR', { _andOrLin })
    return ''
}
const yw$w_wheLin = (): lin => '' //?
const yw$a_andOrLy = (): ly => [] //?
const y_wheAndOrLin = (_lin: lin, _exprDic: exprDic): lin => '' //?
*/
const y_gp_ly = (a) => x.itrMap(x.oPrp("lin"))(a);
const yd_dupFstTermEr = (_gp) => {
    const ly = y_gp_ly(_gp);
    const dup = exports.ly_fstTermDupSet(ly);
    let er = [];
    let gp = _gp;
    for (let itm of dup) {
        let [e, g] = yde_erGp(_gp, itm);
        er = er.concat(e);
        gp = g;
    }
    return [er, gp];
};
// remove all, except after, lines in {a} with {fstTerm} as [gp] and 
// put the removed lines as er
// return [er,gp]
const yde_erGp = (_gp, _fstTerm) => {
    const ixay = [];
    for (let { ix, lin } of _gp) {
        let fst = x.linFstTerm(lin);
        if (_fstTerm === fst)
            ixay.push(ix);
    }
    ixay.pop();
    const ixset = new Set(ixay);
    return ydee_erGp(_gp, ixset);
};
const ydee_erGp = (_gp, ixset) => {
    const er = [];
    const gp = [];
    for (let { ix, lin } of _gp) {
        if (ixset.has(ix)) {
            let fst = x.linFstTerm(lin);
            let sfxMsg = [`duplicate(${fst})`];
            let endMsg = [];
            const m = { ix, sfxMsg, endMsg };
            er.push(m);
        }
        else {
            gp.push({ ix, lin });
        }
    }
    return [er, gp];
};
const y_pfxEr = (_gp, _pfx) => {
    const hasPfx = ({ ix, lin }) => x.sHasPfx(_pfx)(lin);
    const m = ({ ix, lin }) => {
        const endMsg = ['^'.repeat(_pfx.length) + '---- prefix must be (' + _pfx + ')'];
        return { ix, endMsg, sfxMsg: [] };
    };
    const { t: okGp, f: erGp } = x.itrBrkForTrueFalse(hasPfx)(_gp);
    const er = x.itrMap(m)(erGp);
    return [er, okGp];
};
//!z========================================
let zBrwSw;
let zBrwEr;
let zBrwGp;
let zBrwCurExpConstNy;
let zBrwCurConstNy;
let zEdtSampleExprDic;
let zEdtSampleWheLy;
let zEdtSampleSqTp;
let zSampleLy;
{
    const sampleNm = (_txt) => './sample-' + _txt + '.txt';
    const zSampleLy = (_txt) => x.ftLy(sampleNm(_txt));
    const zEdtSample = (_txt) => () => x.ftBrw(sampleNm(_txt));
    zEdtSampleExprDic = zEdtSample('exprDic');
    zEdtSampleSqTp = zEdtSample('sqTp');
    zEdtSampleWheLy = zEdtSample('wheLy');
    const er_lines = (a) => x.itrMap(erItm_lin)(a).join('\r\n');
    zBrwEr = er => x.sBrw(er_lines(er));
    zBrwSw = (swGp, { fldSw, stmtSw }) => {
        const p = gp_lines(swGp);
        const s1 = x.dicLines(fldSw);
        const s2 = x.dicLines(stmtSw);
        x.sBrwAtFdrFn('Sw', 'gp')(p);
        x.sBrwAtFdrFn('Sw', 'fldSw')(s1);
        x.sBrwAtFdrFn('Sw', 'stmtSw')(s2);
    };
    const ixlin_lin = ({ ix, lin }) => x.sFmt('[?]?', ix, lin);
    const gp_lines = (a) => x.itrMap(ixlin_lin)(a).join('\n');
    zBrwGp = x.compose(gp_lines, x.sBrw);
    const er_ly = (er) => x.itrMap(erItm_lin)(er);
    const erItm_lin = ({ ix, endMsg, sfxMsg }) => x.sFmt('?: endMsg[?] sfxMsg[?]', ix, x.syLin(endMsg), x.syLin(sfxMsg));
    const curExpConstNy = () => x.fjsExpConstNy(__filename);
    const curConstNy = () => x.fjsConstNy(__filename);
    zBrwCurExpConstNy = () => x.lyBrw(curExpConstNy());
    zBrwCurConstNy = () => x.lyBrw(curConstNy());
}
//!lib======================================================================
exports.dic_dftVal = (dft) => (dic, key) => {
    return dft;
};
exports.lin_termAy = (_lin) => _lin.trim().split(/\s+/);
exports.lin_fmT3DupTermSet = (_lin) => {
    let termAy = exports.lin_termAy(_lin);
    termAy.shift();
    termAy.shift();
    return x.itrDupSet(termAy);
};
exports.lin_termPosWdtAy = (a) => {
    const z = [];
    let j = 0;
    let pos = 0;
    let wdt;
    let i_lin = a;
    xx: do {
        if ((j++) > 100)
            throw new Error('looping too much');
        let m = i_lin.match(/(\s*)(\S+)(.*)/);
        if (m === null) {
            break xx;
        }
        let [x, a1, a2, a3] = m;
        if (a1 !== "") {
            wdt = a1.length;
            pos = pos + a1.length;
            z.push({ pos, wdt });
            pos = pos + a2.length;
        }
        else {
            if (a3 !== "")
                throw new Error('impossible');
        }
        i_lin = a3;
    } while (a.trim() !== "");
    return z;
};
exports.lin_t2PosWdt = (a) => {
    const a1 = exports.posLin_ParseSpc({ pos: 0, lin: a });
    const [t1, a2] = exports.posLin_ParseTerm(a1);
    const a3 = exports.posLin_ParseSpc(a2);
    const [t2, a4] = exports.posLin_ParseTerm(a3);
    if (t2 === null)
        return null;
    return { pos: a3.pos, wdt: t2.length };
};
exports.lin_AddMrk = (a, pos, len) => {
    const s = x.nSpc(pos - a.length);
    const m = '^'.repeat(len);
    return a + s + m;
};
exports.lin_fmT3DupTermMrkrLin = (a) => {
    const dup = exports.lin_fmT3DupTermSet(a);
    const termPosWdtAy = exports.lin_termPosWdtAy(a);
    const termAy = exports.lin_termAy(a);
    let z = "";
    for (let j = 2; j < termAy.length; j++) {
        let term = termAy[j];
        if (dup.has(term)) {
            const pos = termPosWdtAy[j].pos;
            const len = term.length;
            z = exports.lin_AddMrk(z, pos, len);
        }
    }
    return z;
};
exports.ly_sdic = (a) => {
    const z = new Map();
    for (let lin of a) {
        const { term: k, remainLin: s } = x.linShift(lin);
        z.set(k, s);
    }
    return z;
};
exports.ly_fstTermAy = x.itrMap(x.linFstTerm);
exports.ly_fstTermDupSet = x.compose(exports.ly_fstTermAy, x.itrDupSet);
exports.posLin_ParseSpc = ({ pos, lin }) => {
    for (var p = pos; p < lin.length; p++) {
        if (!x.isSpc(lin[p]))
            break;
    }
    return { pos: p, lin };
};
exports.posLin_ParseTerm = ({ pos, lin }) => {
    let term = '';
    for (var p = pos; p < lin.length; p++) {
        const c = lin[p];
        if (/\s/.test(c))
            break;
        else
            term += c;
    }
    return [term, { pos: p, lin }];
};
exports.lin_t1MrkrLin = (a, msg) => {
    if (a.trimLeft() !== a)
        a.trim;
    x.er('given {lin} must not have space in front', { lin: a });
    const [term, posLin] = exports.posLin_ParseTerm({ pos: 0, lin: a });
    return '^'.repeat(term.length) + ' ' + msg;
};
exports.lin_t2MrkrLin = (a, msg) => {
    const a1 = exports.lin_t2PosWdt(a);
    if (a1 === null) {
        x.er('{lin} does have 2nd term', { lin: a });
        return '{lin} does not have 2nd term: [' + a + ']';
    }
    const { pos, wdt } = a1;
    const chr = pos >= 3 ? '-' : ' ';
    return chr.repeat(pos) + '^'.repeat(wdt) + ' ' + msg;
};
//!tst=============================================================
const sqtp = x.ftLines(__dirname + '/spec/sample.sqtp.txt');
const swGp = [];
const pm = new Map();
const sqLy = ['sel xxx', 'fm ', '$xxx ka'];
function tst__sqtpRslt() {
    // t1(); t2(); 
    t3();
    // t4(); t5();
    return;
    function r(exp, sqtp) {
        const { vtp, sql } = exports.sqtpRslt(sqtp);
        x.assertIsEq(exp.vtp, vtp);
        x.assertIsEq(exp.sql, sql);
        //            x.sBrw(vtp)
        //            x.sBrw(sql)
        x.sBrw(vtp + '\n***\nsqtp' + sqtp);
        debugger;
    }
    function t1() {
    }
    function t2() {
        const sqtp = '%?BrkMbr 0\n' +
            '?BrkMbr 0\n' +
            '%?BrkMbr 0\n' +
            '??BrkSto 0\n';
        const exp = {
            vtp: '',
            sql: ''
        };
        r(exp, sqtp);
    }
    function t3() {
        const sqtp = '%?BrkMbr 0\n' +
            '%?BrkXX 0\n' +
            '%BrkMbr 0\n' +
            '#?BrkMbr 0\n' +
            '??BrkSto 0\n';
        const exp = {
            vtp: '%?BrkMbr 0\r\n' +
                '%?BrkXX 0\r\n' +
                '%BrkMbr 0\r\n' +
                '#?BrkMbr 0\r\n' +
                '^---- prefix must be (%)\r\n' +
                '??BrkSto 0\r\n' +
                '^---- prefix must be (%)',
            sql: ''
        };
        r(exp, sqtp);
    }
    function t4() {
        const sqtp = '%?BrkDiv  XX\n' +
            '%SumLvl  Y\n' +
            '%?MbrEmail 1';
        const exp = {
            vtp: '%?BrkDiv  XX\r\n' +
                '----------^^ must be 0 or 1 for prefix is [%?]\r\n' +
                '%SumLvl  Y\r\n' +
                '%?MbrEmail 1',
            sql: ''
        };
        r(exp, sqtp);
    }
    function t5() {
        const sqtp = '?#SEL#aa 1\n' +
            '?#UPD#bb OR 1\n' +
            '?AA AND 1';
        const exp = {
            vtp: '%?BrkDiv  XX\r\n' +
                '----------^^ must be 0 or 1 for prefix is [%?]\r\n' +
                '%SumLvl  Y\r\n' +
                '%?MbrEmail 1',
            sql: ''
        };
        r(exp, sqtp);
    }
}
function tst__xwww_sw() {
    const bdic = new Map([['?#', true], ['b', false]]);
    const { fldSw, stmtSw } = xwww_sw(bdic);
    x.assertIsEq(fldSw, new Map([['b', false]]));
    x.assertIsEq(stmtSw, new Map([['?#', true]]));
}
function tst__xssst_tblNmKey() {
    const ly = ['fm #aa'];
    const stmtSw = new Map([['?#aa', false]]);
    const aa = xssst_tblNmKey(ly);
}
function tst__lin_t2PosWdt() {
    let lin;
    let act;
    let exp;
    function r() {
        x.assertIsEq(exp, act);
        expect(act).toEqual({ pos: 5, wdt: 2 });
    }
    function t1() {
        lin = 'aaa  bb';
        act = exports.lin_t2PosWdt(lin);
        exp = { pos: 5, wdt: 2 };
        r();
    }
    t1();
}
function tst__lin_t2MrkLin() {
    let lin, act, exp, msg;
    t1();
    t2();
    t3();
    debugger;
    return;
    function r() {
        act = exports.lin_t2MrkrLin(lin, msg);
        x.assertIsEq(exp, act);
    }
    function t1() {
        lin = 'aaa  bb';
        exp = '-----^^ aa';
        msg = 'aa';
        r();
    }
    function t2() {
        lin = 'a bb';
        exp = '  ^^ aa';
        msg = 'aa';
        r();
    }
    function t3() {
        lin = 'aa bb';
        exp = '---^^ aa';
        msg = 'aa';
        r();
    }
}
function tst__xw_sw() {
    const act = xw_sw(swGp, pm);
    const exp = new Map();
    x.assertIsEq(exp, act);
}
function tst__yww_wheAndOrLinesPrmAy() {
    if (true) {
        const wheLy = zSampleLy('wheLy');
        const exprDic = x.lySdic(zSampleLy('exprDic'));
        const exp = {};
        const act = yww_wheAndOrLines_prmAy(wheLy, exprDic);
        x.assertIsEq(exp, act);
    }
}
//!runTst
// import * as y from './scanPgm'
// y.fts_updMainTstIfStmt(x.ffnFts(__filename))
if (module.id === '.') {
    tst__lin_t2MrkLin();
    tst__lin_t2PosWdt();
    tst__sqtpRslt();
    tst__xssst_tblNmKey();
    tst__xw_sw();
    tst__xwww_sw();
    tst__yww_wheAndOrLinesPrmAy();
}
//zEdtSampleExprDic()
//# sourceMappingURL=sqtp.js.map