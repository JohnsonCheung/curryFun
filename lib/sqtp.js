"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./curryfun.d.ts"/>
const x = require("./curryfun");
const { assertIsEq, vidBrw, sidBrw, vidVal, sidStr, sSplitLines, oBrw, stop, } = x;
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
    const ly = sSplitLines(_sqtp);
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
        const ly = y_gp_ly(gp);
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
    // oBrw({ inp: { a, pm }, oup: z, srcLy: sSplitLines(xw_fnd_erSw.toString()), e0, e1, e2, e3, e4, g0, g1, g2, g3, g4, ly }); debugger
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
    //oBrw({ inp: { a, pm: x.dicLy(pm) }, oup_stmtSw: x.dicLy(z.stmtSw), oup_fldSw: x.dicLy(z.fldSw), sw: x.dicLy(sw) }); debugger
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
//!y =============================================================
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
const ywa_andOrLines = (_wheLy, _exprDic) => {
    const linesAy = []; //?
    return linesAy.join('\r\n');
};
// const andOrLinesAy = x.itrMap(ywa_andOrLines(_exprDic))(andOrLy)
// const andOrLines = andOrLinesAy.join('\r\n')
// const ywlp_pfx = (_andOrLin: lin): s => {
//     const pfx: s = '' //?
//     switch (pfx) {
//         case 'AND': return '  and      '
//         case 'OR': return '  or       '
//         default:
//     }
//     x.er('_andOrLin must be [?WHE | ?AND | ?OR', { _andOrLin })
//     return ''
// }
const yw$w_wheLin = () => ''; //?
const yw$a_andOrLy = () => []; //?
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
//!y_ ==============
const y_phrPfx = (_pfx, _newLine) => (_newLine === 'NewLine') ? _pfx + '\r\n' : _pfx + x.nSpc(10 - _pfx.length);
const y_endMsgErItm = (ix, endMsgStr) => { return { ix, endMsg: [endMsgStr], sfxMsg: [] }; };
const y_sfxMsgErItm = (ix, sfxMsgStr) => { return { ix, endMsg: [], sfxMsg: [sfxMsgStr] }; };
const y_exprDic = (ly) => x.pipe(ly)(x.itrWhere(x.sHasPfx('$')), x.lySdic);
const y_wheRstLines = (remainLin, _exprDic) => '';
const y_wheAndOrLin = (_lin, _exprDic) => ''; //?
const y_gp_ly = (a) => x.itrMap(x.oPrp("lin"))(a);
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
function tst__sqtpRslt() {
    // t1(); t2(); 
    t1();
    // t4(); t5();
    return;
    function r(exp, sqtp) {
        const { vtp, sql } = exports.sqtpRslt(sqtp);
        assertIsEq(exp.vtp, vtp);
        assertIsEq(exp.sql, sql);
        debugger;
    }
    function t1() {
        if (false) {
            //sidBrw("sqtpRslt # t1 # sqtp")
            sidBrw("sqtpRslt # t1 # exp.sql");
            sidBrw("sqtpRslt # t1 # exp.vtp");
            debugger;
        }
        const sqtp = sidStr("sqtpRslt # t1 # sqtp");
        const exp = {
            sql: sidStr("sqtpRslt # t1 # exp.sql"),
            vtp: sidStr("sqtpRslt # t1 # exp.vtp"),
        };
        r(exp, sqtp);
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
    assertIsEq(fldSw, new Map([['b', false]]));
    assertIsEq(stmtSw, new Map([['?#', true]]));
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
        assertIsEq(exp, act);
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
        assertIsEq(exp, act);
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
function tst__xb_gpBrk() {
    t1('brw');
    function r(exp, clnLy) {
        const act = xb_gpBrk(clnLy);
        const ny = x.oPrpNy(act);
        for (let prpNm of ny) {
            assertIsEq(exp[prpNm], act[prpNm]);
        }
        debugger;
    }
    function t1(brw) {
        const id1 = 'xb_gpBrk # t1 # exp';
        const id2 = 'xb_gpBrk # t1 # clnLy';
        if (brw === 'brw') {
            vidBrw(id1);
            sidBrw(id2);
        }
        const exp = vidVal(id1);
        const clnLy = sSplitLines(sidStr(id2));
        r(exp, clnLy);
    }
}
function tst__xw_sw() {
    t1();
    return;
    function r(exp, swGp, pm) {
        const act = xw_sw(swGp, pm);
        assertIsEq(exp, act);
    }
    function t1() {
    }
}
function tst__yww_wheAndOrLinesPrmAy() {
    if (true) {
        const wheLy = zSampleLy('wheLy');
        const exprDic = x.lySdic(zSampleLy('exprDic'));
        const exp = {};
        const act = yww_wheAndOrLines_prmAy(wheLy, exprDic);
        assertIsEq(exp, act);
    }
}
//!runTst
//import { fjs_updFtsMainTstIfStmt } from './scanPgm'; fjs_updFtsMainTstIfStmt(__filename)
if (module.id === '.') {
    tst__xb_gpBrk();
    /*
        tst__xssst_tblNmKey()
        tst__xwww_sw()
        tst__yww_wheAndOrLinesPrmAy()
        tst__xw_sw()
        tst__lin_t2MrkLin()
        tst__lin_t2PosWdt()
        */
    //    tst__sqtpRslt()
    exports.dic_dftVal; // = <T>(dft: T) => (dic: dic<T>, key: s): T => {
    exports.lin_AddMrk; // = (a: lin, pos: n, len: n): lin => {
    exports.lin_fmT3DupTermMrkrLin; // = (a: lin): lin => {
    exports.lin_fmT3DupTermSet; // = (_lin: lin): sset => {
    exports.lin_t1MrkrLin; // = (a: lin, msg: s) => {
    exports.lin_t2MrkrLin; // = (a: lin, msg: s) => {
    exports.lin_t2PosWdt; // = (a: lin): posWdt | null => {
    exports.lin_termAy; // = (_lin: lin): term[] => _lin.trim().split(/\s+/)
    exports.lin_termPosWdtAy; // = (a: lin): posWdt[] => {
    exports.ly_fstTermAy; // = x.itrMap(x.linFstTerm) as (ly: ly) => ly
    exports.ly_fstTermDupSet; // = x.compose(ly_fstTermAy, x.itrDupSet) as (ly: ly) => sset
    exports.ly_sdic; // = (a: ly) => {
    exports.posLin_ParseSpc; // = ({ pos, lin }: posLin): posLin => {
    exports.posLin_ParseTerm; // = ({ pos, lin }: posLin): [term, posLin] => {
    sq_AND; // = 'AND'
    sq_DIS; // = 'DIS'
    sq_DRP; // = 'DRP'
    sq_FRO; // = 'FRO'
    sq_GRO; // = 'GRO'
    sq_JOI; // = 'JOI'
    sq_LEF; // = 'LEF'
    sq_OR; // = 'OR'
    sq_SEL; // = 'SEL'
    sq_UPD; // = 'UPD'
    sq_WHE; // = 'WHE'
    exports.sqtpRslt; // = (_sqtp: sqtp): { vtp: s, sql: s } => {
    xb_gpBrk; // = (_clnLy: clnLy): gpBrk => {
    xbb_brkIntoGpy; // = (_noRmkGp: gp): gp[] => {
    xbbr_rmvRmkLin; // = (a: gp) => {
    xbg_gp; // = (_clnLy: clnLy) => {
    xbn_noRmk; // = (_gp: gp) => {
    xbt_bkTy; // = (_ly: ly): eBkTy => {
    xbtr_isPmLy; // = (a: ly) => x.lyHasMajPfx("%")(a)
    xbtr_isRmLy; // = (a: ly) => x.itrPredIsAllTrue(x.isRmkLin)(a)
    xbtr_isSqLy; // = (a: ly) => {
    xbtr_isSwLy; // = (a: ly) => x.lyHasMajPfx("?")(a)
    xbtrx_x; // = x.sSplitSpc("DRP UPD SEL DIS")
    xc_clnLy; // = x.compose(x.itrMap(xcr_rmvMsg), x.itrRmvEmp) as (a: ly) => ly
    xcr_rmvMsg; // = (a: lin) => {
    xe_endMsgEr; // = (endMsg: s) => (a: gp[]): er => x.itrMap(xei_endMsgErItm(endMsg))(a)
    xei_endMsgErItm; // = (endMsg: s) => (a: gp): erItm => y_endMsgErItm(x.ayLas(a).ix, endMsg)
    xp_pm; // = (_pmGp: pmGp): [er, pm] => {
    xpp_pmSwPfxEr; // = (_gp: gp): [er, gp] => {
    xpp$t_erTwoTerm; // = (_erGp: gp): er => {
    xpp$z_erZerOne; // = (_erGp: gp): er => {
    xppi_isPmSwPfxEr; // = ({ ix, lin }: ixlin): b => {
    xppt_isPmSwPfx_twoTermsEr; // = (_ixlin: ixlin): b => {
    xppz_isPmSwPfx_zerOneEr; // = (_ixlin: ixlin): b => {
    xs_sql; // = (_sqGp: sqGp[], _pm: pm, _sw: sw): [er, sql] => {
    xss_stmt; // = (_sqGp: sqGp, _sw: sw): [er, stmt] => {
    xssd_drpStmt; // = (a: drpGp): [er, stmt] => {
    xsss_selOrDisStmt; // = (_selGp: selGp, _selTy: eSelTy, _sw: sw): [er, sql] => {
    xsssb_brk; // = (_gp: gp, _pfxAy: sy, _optional?: 'Optional'): [sy, gp, er] => {
    xsssbe_missingLyEr; // = (sy: sy, _ix: n, _optional?: 'Optional'): er => {
    xsssf_froPhr; // = (_froLy: ly) => {
    xsssg_groPhr; // = (_groLy: ly, _exprDic: exprDic): phrase => {
    xsssj_joiPhr; // = (_joiLy: ly) => {
    xssss_selPhr; // = (_selLy: ly, _selTy: eSelTy, _fldSw: fldSw, _exprDic: exprDic): [er, s] => {
    xssssf_fldsLines; // = (_fny: fldNm[], _fldSw: fldSw, _exprDic: exprDic): lines => {
    xssssf_fny; // = (_selLy: ly): fldNm[] => {
    xssssfl_lyPair; // = (_fny: fldNm[], _fldSw: fldSw, _exprDic: exprDic): [ly, ly] => {
    xssst_tblNmKey; // = (ly: ly): tblNmKey => {
    xsst_stmtTy; // = (_sqGp: sqGp): eStmtTy | null => {
    xssu_updStmt; // = (_updGp: updGp, _sw: sw): [er, stmt] => {
    xssub_brk; // = (_gp: gp): [er, ly, gp] => [[], [], []]
    xssuj_joiPhr; // = (_ly: ly): [er, phrase] => {
    xssujl_joiPhrLines; // = (_lin: lin): [er, phrase] => [[], '']
    xssus_setPhr; // = (_ly: ly): [er, phrase] => [[], '']
    xssut_tblNmKey; // = (ly: ly): tblNmKey => {
    xssuu_updPhr; // = (_ly: ly): [er, phrase] => {
    xssuut_tblNm; // = (_fstLin: lin): s | null => {
    xssuw_whePhr; // = (_ly: ly): [er, phrase] => [[], '']
    xv_vtp; // = (_ly: ly, _er: er): s => {
    xva_leftLyAyAlignLy; // = (_lyAy: ly[]) => { //?
    xvaw_wdt; // = (lyAy: ly[]): wdt => {
    xvl_leftLyAy; // = (_ly: ly, _er: er): ly[] => {
    xvle_endMsgErItm; // = (er: er, ix: n) => {
    xvm_mge; // = (leftLy: ly, rightLy: ly): ly => {
    xvr_rightLyAy; // = (ly: ly, er: er): ly[] => {
    xvrs_sfxMsgEr; // = (er: er, ix: n) => {
    xw_sw; // = (_gp: gp, _pm: pm): [er, sw] => {
    xwd_vdtFmT3DupEr; // = (_gp: gp): [er, gp] => {
    xwdi_isFmT3DupTermEr; // = (_ixlin: ixlin): b => lin_fmT3DupTermSet(_ixlin.lin).size > 0
    xwo_vdtOp_mustBe_AND_OR_EQ_NE; // = (_gp: gp): [er, gp] => {
    xwoo_opIsEr; // = (_ixlin: ixlin): b => xwoos_swOp(_ixlin) === null
    xwoos_swOp; // = (_ixlin: ixlin): eSwOp | null => {
    xwp_vdtPfxmustBeEither_SEL_or_UPD; // = (_gp: gp): [er, gp] => {
    xww_sw; // = (_ly: ly, _pm: pm): sw => {
    xwwe_evlLin; // = (_lin: lin, _pm: pm, _bdic: Map<s, b>): { key: s, boolOpt: b | null } => {
    xwww_sw; // = (a: bdic): sw => {
    y_endMsgErItm; // = (ix: n, endMsgStr: s): erItm => { return { ix, endMsg: [endMsgStr], sfxMsg: [] } }
    y_exprDic; // = (ly: ly): exprDic => x.pipe(ly)(x.itrWhere(x.sHasPfx('$')), x.lySdic)
    y_gp_ly; // = (a: gp) => x.itrMap(x.oPrp("lin"))(a) as ly
    y_pfxEr; // = (_gp: gp, _pfx: s): [er, gp] => {
    y_phrPfx; // = (_pfx: pfx, _newLine?: 'NewLine') => (_newLine === 'NewLine') ? _pfx + '\r\n' : _pfx + x.nSpc(10 - _pfx.length)
    y_sfxMsgErItm; // = (ix: n, sfxMsgStr: s): erItm => { return { ix, endMsg: [], sfxMsg: [sfxMsgStr] } }
    y_wheAndOrLin; // = (_lin: lin, _exprDic: exprDic): lin => '' //?
    y_wheRstLines; // = (remainLin: lin, _exprDic: exprDic) => ''
    yd_dupFstTermEr; // = (_gp: gp): [er, gp] => {
    yde_erGp; // = (_gp: gp, _fstTerm: s): [er, gp] => {
    ydee_erGp; // = (_gp: gp, ixset: Set<n>): [er, gp] => {
    yw_whePhr; // = (_wheLy: ly, _exprDic: exprDic): lines => {
    yw$a_andOrLy; // = (): ly => [] //?
    yw$w_wheLin; // = (): lin => '' //?
    ywa_andOrLines; // = (_wheLy: ly, _exprDic: exprDic): lines => {
    ywl_wheAndOrLines; // = (_a: wheAndOrLinesPrm): lines => {
    yww_wheAndOrLines_prmAy; // = (_wheLy: ly, _exprDic): (wheAndOrLinesPrm | er)[] =>
    yww_whePhr; // = (_wheLy: ly, _exprDic: exprDic): lines => {
    ywwl_wheAndOrLin_prm; // = (_wheLin: lin): wheAndOrLinesPrm | er => {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3F0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNxdHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBdUM7QUFDdkMsZ0NBQStCO0FBQy9CLE1BQU0sRUFDRixVQUFVLEVBQ1YsTUFBTSxFQUFFLE1BQU0sRUFDZCxNQUFNLEVBQUUsTUFBTSxFQUNkLFdBQVcsRUFDWCxJQUFJLEVBQ0osSUFBSSxHQUNQLEdBQUcsQ0FBQyxDQUFBO0FBMkNMLGtGQUFrRjtBQUNsRixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUE7QUFDcEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFBO0FBQ3BCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQTtBQUNwQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUE7QUFDcEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFBO0FBQ3BCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQTtBQUNwQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUE7QUFDcEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFBO0FBQ3BCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQTtBQUNwQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUE7QUFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFBO0FBQ2xCLG9GQUFvRjtBQUN2RSxRQUFBLFFBQVEsR0FBRyxDQUFDLEtBQVcsRUFBc0IsRUFBRTtJQUN4RCxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDN0IsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzFCLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUN4RCxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDbkIsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLHVGQUF1RixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7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YSxFQUFFLE1BQWMsRUFBRSxHQUFPLEVBQWEsRUFBRTtJQUM1RSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQTtJQUM3QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDMUIsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ25DLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ25CLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUM3QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUE7SUFDakIsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ3JELE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUNyRCxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQ2pFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQ3ZFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxV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Q0FBQztRQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQTtJQUN4RixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUMsQ0FBQTtJQUN2RixNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDdEQsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3RELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pFLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVEsQ0FBQztZQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFDM0MsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUNaLENBQUMsQ0FBQTtJQUNELE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFO1FBQ2QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3RCLENBQUMsQ0FBQTtJQUNELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN0QyxNQUFNLE9BQU8sR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2pELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtJQUN4RCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7SUFDMUQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7SUFDbEYsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7SUFDbEYsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzlDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDN0MsSUFBSSxPQUFPLEdBQWEsSUFBSSxDQUFBO0lBQzVCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDVCxLQUFLLEtBQUs7WUFBRSxPQUFPLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQUMsS0FBSyxDQUFBO1FBQ3ZDLEtBQUssSUFBSTtZQUFFLE9BQU8sR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFBQyxLQUFLLENBQUE7UUFDckMsS0FBSyxJQUFJO1lBQUUsT0FBTyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxLQUFLLENBQUE7UUFDL0MsS0FBSyxJQUFJO1lBQUUsT0FB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LGVBQWUsQ0FBQSxDQUFtQiw2QkFBNkI7SUFDL0QsUUFBUSxDQUFBLENBQTBCLDBDQUEwQztJQUM1RSxTQUFTLENBQUEsQ0FBeUIsNENBQTRDO0lBQzlFLFNBQVMsQ0FBQSxDQUF5QixnREFBZ0Q7SUFDbEYsWUFBWSxDQUFBLENBQXNCLHFCQUFxQjtJQUN2RCxXQUFXLENBQUEsQ0FBdUIsc0JBQXNCO0lBQ3hELGNBQWMsQ0FBQSxDQUFvQixnREFBZ0Q7SUFDbEYsaUJBQWlCLENBQUEsQ0FBaUIsdUNBQXVDO0lBQ3pFLHVCQUF1QixDQUFBLENBQVcseURBQXlEO0lBQzNGLFVBQVUsQ0FBQSxDQUF3QixnREFBZ0Q7SUFDbEYsb0JBQW9CLENBQUEsQ0FBYywrQ0FBK0M7QUFDckYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2N1cnJ5ZnVuLmQudHNcIi8+XHJcbmltcG9ydCAqIGFzIHggZnJvbSAnLi9jdXJyeWZ1bidcclxuY29uc3Qge1xyXG4gICAgYXNzZXJ0SXNFcSxcclxuICAgIHZpZEJydywgc2lkQnJ3LFxyXG4gICAgdmlkVmFsLCBzaWRTdHIsXHJcbiAgICBzU3BsaXRMaW5lcyxcclxuICAgIG9CcncsXHJcbiAgICBzdG9wLFxyXG59ID0geFxyXG5leHBvcnQgaW50ZXJmYWNlIGVySXRtIHsgaXg6IG4sIHNmeE1zZzogc1tdLCBlbmRNc2c6IHNbXSB9XHJcbmV4cG9ydCB0eXBlIHNxdHAgPSBzXHJcbmV4cG9ydCBpbnRlcmZhY2UgcG9zTGluIHsgcG9zOiBuLCBsaW46IHMgfVxyXG5leHBvcnQgaW50ZXJmYWNlIHBvc1dkdCB7IHBvczogbiwgd2R0OiBuIH1cclxuaW50ZXJmYWNlIGl4bGluIHsgaXg6IG4sIGxpbjogbGluIH1cclxuaW50ZXJmYWNlIHRlcm1wcnNsdCB7IHRlcm06IHMsIHBvc0xpbjogcG9zTGluIH1cclxuaW50ZXJmYWNlIHdoZUFuZE9yTGluZXNQcm0geyBwZng6ICdXSEUnIHwgJ0FORCcgfCAnT1InLCBvcG5Ca3Q6IHMsIGZsZExpbmVzOiBsaW5lcywgb3A6IHdoZUFuZE9yTGluZXNPcCwgb3ByYW5kOiBzLCBjbHNCa3Q6IHMgfVxyXG50eXBlIGVTd09wID0gJ0FORCcgfCAnT1InIHwgJ0VRJyB8ICdORSdcclxudHlwZSB3aGVBbmRPckxpbmVzT3AgPSAnYmV0d2VlbicgfCAnaW4nIHwgJ25vdCBiZXR3ZWVuJyB8ICdub3QgaW4nIHwgJz4nIHwgJz49JyB8ICc8JyB8ICc8PScgfCAnPD4nXHJcbnR5cGUgZmxkTm0gPSBzXHJcbnR5cGUgcGhyYXNlID0gbGluZXNcclxudHlwZSBsaW5lcyA9IHNcclxudHlwZSB0YmxObUtleSA9IHNcclxudHlwZSBmbGRTdyA9IGJkaWNcclxudHlwZSBzdG10U3cgPSBiZGljXHJcbnR5cGUgZXhwckRpYyA9IHNkaWNcclxudHlwZSBzcUdwID0gZ3BcclxudHlwZSByZW1haW5HcCA9IGdwXHJcbnR5cGUgZXhwckdwID0gZ3BcclxudHlwZSBwbUdwID0gZ3BcclxudHlwZSBzd0dwID0gZ3BcclxudHlwZSBzZWxHcCA9IHNxR3BcclxudHlwZSB1cGRHcCA9IHNxR3BcclxudHlwZSBkcnBHcCA9IHNxR3BcclxudHlwZSBlciA9IGVySXRtW11cclxudHlwZSBncCA9IGl4bGluW11cclxudHlwZSBzdG10ID0gbGluZXMgfCBudWxsXHJcbnR5cGUgY2xuTHkgPSBseVxyXG50eXBlIGdwQnJrID0geyBzd0dwOiBzd0dwLCBwbUdwOiBwbUdwLCBzcUdweTogc3FHcFtdLCBzd0V4Y2Vzc0dweTogZ3BbXSwgcG1FeGNlc3NHcHk6IGdwW10sIGVyR3B5OiBncFtdIH1cclxudHlwZSBiZGljID0gTWFwPHMsIGJvb2xlYW4+XHJcbnR5cGUgc3cgPSB7IGZsZFN3OiBiZGljLCBzdG10U3c6IGJkaWMgfVxyXG50eXBlIHNxdHBSc2x0ID0geyB2dHA6IHMsIHNxbDogcyB9XHJcbnR5cGUgcG0gPSBNYXA8cywgcz5cclxudHlwZSB0ZXJtID0gc1xyXG50eXBlIHNxbCA9IHNcclxudHlwZSBESVMgPSAnRElTJ1xyXG50eXBlIFNFTCA9ICdTRUwnXHJcbnR5cGUgVVBEID0gJ1VQRCdcclxudHlwZSBEUlAgPSAnRFJQJ1xyXG50eXBlIGVTZWxUeSA9IERJUyB8IFNFTFxyXG50eXBlIGVTdG10VHkgPSBESVMgfCBTRUwgfCBEUlAgfCBVUERcclxudHlwZSBlQmtUeSA9ICdSTScgfCAnUE0nIHwgJ1NXJyB8ICdTUScgfCAnRVInXHJcbi8vIWNvbnN0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3Qgc3FfVVBEID0gJ1VQRCdcclxuY29uc3Qgc3FfRElTID0gJ0RJUydcclxuY29uc3Qgc3FfRFJQID0gJ0RSUCdcclxuY29uc3Qgc3FfU0VMID0gJ1NFTCdcclxuY29uc3Qgc3FfRlJPID0gJ0ZSTydcclxuY29uc3Qgc3FfR1JPID0gJ0dSTydcclxuY29uc3Qgc3FfSk9JID0gJ0pPSSdcclxuY29uc3Qgc3FfTEVGID0gJ0xFRidcclxuY29uc3Qgc3FfV0hFID0gJ1dIRSdcclxuY29uc3Qgc3FfQU5EID0gJ0FORCdcclxuY29uc3Qgc3FfT1IgPSAnT1InXHJcbi8vIWV4cG9ydCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5leHBvcnQgY29uc3Qgc3F0cFJzbHQgPSAoX3NxdHA6IHNxdHApOiB7IHZ0cDogcywgc3FsOiBzIH0gPT4ge1xyXG4gICAgY29uc3QgbHkgPSBzU3BsaXRMaW5lcyhfc3F0cClcclxuICAgIGNvbnN0IGNsbkx5ID0geGNfY2xuTHkobHkpXHJcbiAgICBjb25zdCB7IHBtR3AsIHN3R3AsIHNxR3B5LCBwbUV4Y2Vzc0dweSwgc3dFeGNlc3NHcHksIGVyR3B5IH0gPVxyXG4gICAgICAgIHhiX2dwQnJrKGNsbkx5KVxyXG4gICAgY29uc3QgZTEgPSB4ZV9lbmRNc2dFcignLS0tIHRoaXMgYmxvY2sgaXMgW2Vycm9yXSwgaXQgaXMgbm9uZSBvZiBibG9jayBvZiBbcmVtYXJrIHwgcGFyYW1ldGVyIHwgc3dpdGNoIHwgc3FsXScpKGVyR3B5KVxyXG4gICAgY29uc3QgZTIgPSB4ZV9lbmRNc2dFcignLS0tIHRoaXMgaXMgZXhjZXNzIFtwYXJhbWV0ZXJdIGJsb2NrJykocG1FeGNlc3NHcHkpXHJcbiAgICBjb25zdCBlMyA9IHhlX2VuZE1zZ0VyKCctLS0gdGhpcyBpcyBleGNlc3MgW3N3aXRjaF0gYmxvY2snKShzd0V4Y2Vzc0dweSlcclxuICAgIGNvbnN0IFtlNCwgcG1dID0geHBfcG0ocG1HcCkgLy8geDNfZm5kX2VyUG0ocG1HcClcclxuICAgIGNvbnN0IFtlNSwgc3ddID0geHdfc3coc3dHcCwgcG0pXHJcbiAgICBjb25zdCBbZTYsIHNxbF0gPSB4c19zcWwoc3FHcHksIHBtLCBzdylcclxuICAgIGNvbnN0IGVyID0gZTEuY29uY2F0KGUyLCBlMywgZTQsIGU1LCBlNilcclxuICAgIC8vIHN3X0Jydyhzd0dwLCBzdyk7IGRlYnVnZ2VyXHJcbiAgICBjb25zdCB2dHAgPSB4dl92dHAoY2xuTHksIGVyKVxyXG4gICAgcmV0dXJuIHsgc3FsLCB2dHAgfVxyXG59XHJcbi8vIXg9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCB4ZV9lbmRNc2dFciA9IChlbmRNc2c6IHMpID0+IChhOiBncFtdKTogZXIgPT4geC5pdHJNYXAoeGVpX2VuZE1zZ0VySXRtKGVuZE1zZykpKGEpXHJcbmNvbnN0IHhlaV9lbmRNc2dFckl0bSA9IChlbmRNc2c6IHMpID0+IChhOiBncCk6IGVySXRtID0+IHlfZW5kTXNnRXJJdG0oeC5heUxhcyhhKS5peCwgZW5kTXNnKVxyXG5jb25zdCB4Y3Jfcm12TXNnID0gKGE6IGxpbikgPT4ge1xyXG4gICAgY29uc3QgYiA9IGEubWF0Y2goLyguKiktLS0vKVxyXG4gICAgY29uc3QgYzogbGluID0gYiA9PT0gbnVsbCA/IGEgOiBhWzFdXHJcbiAgICBpZiAoeC5zSGFzUGZ4KFwiXlwiKShjLnRyaW1MZWZ0KCkpKSByZXR1cm4gXCJcIlxyXG4gICAgcmV0dXJuIGNcclxufVxyXG5jb25zdCB4Y19jbG5MeSA9IHguY29tcG9zZSh4Lml0ck1hcCh4Y3Jfcm12TXNnKSwgeC5pdHJSbXZFbXApIGFzIChhOiBseSkgPT4gbHlcclxuY29uc3QgeGJnX2dwID0gKF9jbG5MeTogY2xuTHkpID0+IHtcclxuICAgIGNvbnN0IG0gPSAobGluLCBpeCkgPT4geyByZXR1cm4geyBpeCwgbGluIH0gfVxyXG4gICAgcmV0dXJuIHguaXRyTWFwKG0pKF9jbG5MeSlcclxufVxyXG5jb25zdCB4Ym5fbm9SbWsgPSAoX2dwOiBncCkgPT4ge1xyXG4gICAgY29uc3Qgbm9SbWsgPSAoYTogaXhsaW4pID0+IHguaXNOb25SbWtMaW4oYS5saW4pXHJcbiAgICByZXR1cm4geC5pdHJXaGVyZShub1JtaykoX2dwKVxyXG59XHJcbmNvbnN0IHhiYl9icmtJbnRvR3B5ID0gKF9ub1Jta0dwOiBncCk6IGdwW10gPT4ge1xyXG4gICAgY29uc3QgbGluUGZ4U2VwID0gJz09J1xyXG4gICAgbGV0IHsgaXgsIGxpbiB9ID0gX25vUm1rR3BbMF1cclxuICAgIGNvbnN0IGdweTogZ3BbXSA9IFtdXHJcbiAgICBsZXQgY3VyR3A6IGdwID0gW11cclxuICAgIGZvciAobGV0IHsgaXgsIGxpbiB9IG9mIF9ub1Jta0dwKSB7XHJcbiAgICAgICAgaWYgKHguc0hhc1BmeChsaW5QZnhTZXApKGxpbikpIHtcclxuICAgICAgICAgICAgaWYgKGN1ckdwLmxlbmd0aCAhPT0gMClcclxuICAgICAgICAgICAgICAgIGdweS5wdXNoKGN1ckdwKVxyXG4gICAgICAgICAgICBjdXJHcCA9IFtdXHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIGN1ckdwLnB1c2goeyBpeCwgbGluIH0pXHJcbiAgICB9XHJcbiAgICBpZiAoY3VyR3AubGVuZ3RoICE9PSAwKVxyXG4gICAgICAgIGdweS5wdXNoKGN1ckdwKVxyXG4gICAgcmV0dXJuIHguaXRyTWFwKHhiYnJfcm12Um1rTGluKShncHkpXHJcbn1cclxuY29uc3QgeGJfZ3BCcmsgPSAoX2Nsbkx5OiBjbG5MeSk6IGdwQnJrID0+IHtcclxuICAgIGNvbnN0IGdwID0geGJnX2dwKF9jbG5MeSlcclxuICAgIGNvbnN0IG5vUm1rR3AgPSB4Ym5fbm9SbWsoZ3ApXHJcbiAgICBjb25zdCBncHkgPSB4YmJfYnJrSW50b0dweShub1Jta0dwKVxyXG4gICAgbGV0IHBtR3A6IGdwID0gW11cclxuICAgIGxldCBzd0dwOiBncCA9IFtdXHJcbiAgICBjb25zdCBzd0V4Y2Vzc0dweTogZ3BbXSA9IFtdXHJcbiAgICBjb25zdCBwbUV4Y2Vzc0dweTogZ3BbXSA9IFtdXHJcbiAgICBjb25zdCBlckdweTogZ3BbXSA9IFtdXHJcbiAgICBjb25zdCBzcUdweTogZ3BbXSA9IFtdXHJcblxyXG4gICAgZm9yIChsZXQgZ3Agb2YgZ3B5KSB7XHJcbiAgICAgICAgY29uc3QgbHkgPSB5X2dwX2x5KGdwKVxyXG4gICAgICAgIGNvbnN0IGJrdHkgPSB4YnRfYmtUeShseSlcclxuICAgICAgICBzd2l0Y2ggKGJrdHkpIHtcclxuICAgICAgICAgICAgY2FzZSAnRVInOiBlckdweS5wdXNoKGdwKTsgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAnUk0nOiBlckdweS5wdXNoKGdwKTsgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAnU1cnOlxyXG4gICAgICAgICAgICAgICAgaWYgKHN3R3AubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHN3R3AgPSBncFxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHN3RXhjZXNzR3B5LnB1c2goZ3ApXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICdQTSc6XHJcbiAgICAgICAgICAgICAgICBpZiAocG1HcC5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgcG1HcCA9IGdwXHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcG1FeGNlc3NHcHkucHVzaChncClcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ1NRJzogc3FHcHkucHVzaChncCk7IGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHguZXIoJ3hidF9ia1R5IHJldHVybiB1bmV4cGVjdGVkIGJrdHknLCB7IGx5LCBia3R5IH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgcG1HcCwgc3dHcCwgc3FHcHksIHBtRXhjZXNzR3B5LCBzd0V4Y2Vzc0dweSwgZXJHcHkgfVxyXG59XHJcbmNvbnN0IHhzc3VfdXBkU3RtdCA9IChfdXBkR3A6IHVwZEdwLCBfc3c6IHN3KTogW2VyLCBzdG10XSA9PiB7XHJcbiAgICBjb25zdCB7IGZsZFN3LCBzdG10U3cgfSA9IF9zd1xyXG4gICAgY29uc3QgbHkgPSB5X2dwX2x5KF91cGRHcClcclxuICAgIHZhciB0YmxObUtleSA9IHhzc3V0X3RibE5tS2V5KGx5KVxyXG4gICAgaWYgKCFzdG10U3cuaGFzKHRibE5tS2V5KSlcclxuICAgICAgICByZXR1cm4gW1tdLCBudWxsXVxyXG4gICAgY29uc3QgZXhwckRpYyA9IHlfZXhwckRpYyhseSlcclxuICAgIGNvbnN0IFtlZTEsIHUsIGcxXSA9IHhzc3ViX2JyayhfdXBkR3ApXHJcbiAgICBjb25zdCBbZWUyLCBqLCBnMl0gPSB4c3N1Yl9icmsoZzEpXHJcbiAgICBjb25zdCBbZWUzLCBzLCBnM10gPSB4c3N1Yl9icmsoZzIpXHJcbiAgICBjb25zdCBbZWU0LCB3LCBnNF0gPSB4c3N1Yl9icmsoZzMpXHJcbiAgICBjb25zdCBbZTEsIHVwZF0gPSB4c3N1dV91cGRQaHIodSlcclxuICAgIGNvbnN0IFtlMiwgam9pXSA9IHhzc3VqX2pvaVBocihqKVxyXG4gICAgY29uc3QgW2UzLCBzZXRdID0geHNzdXNfc2V0UGhyKHMpXHJcbiAgICBjb25zdCBbZTQsIHdoZV0gPSB4c3N1d193aGVQaHIodylcclxuICAgIGNvbnN0IGVyOiBlciA9IGUxLmNvbmNhdChlMiwgZTMsIGU0KVxyXG4gICAgY29uc3Qgc3FsID0gdXBkICsgam9pICsgc2V0ICsgd2hlXHJcbiAgICByZXR1cm4gW2VyLCBzcWxdXHJcbn1cclxuY29uc3QgeHNzdWJfYnJrID0gKF9ncDogZ3ApOiBbZXIsIGx5LCBncF0gPT4gW1tdLCBbXSwgW11dXHJcbmNvbnN0IHhzc3V1X3VwZFBociA9IChfbHk6IGx5KTogW2VyLCBwaHJhc2VdID0+IHtcclxuICAgIGNvbnN0IHBociA9IHlfcGhyUGZ4KCd1cGRhdGUnKSArIHhzc3V1dF90YmxObShfbHlbMF0pICsgJ1xcclxcbidcclxuICAgIHJldHVybiBbW10sIHBocl1cclxufVxyXG5jb25zdCB4c3N1amxfam9pUGhyTGluZXMgPSAoX2xpbjogbGluKTogW2VyLCBwaHJhc2VdID0+IFtbXSwgJyddXHJcbmNvbnN0IHhzc3VqX2pvaVBociA9IChfbHk6IGx5KTogW2VyLCBwaHJhc2VdID0+IHtcclxuICAgIGlmIChfbHkubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHJldHVybiBbW10sICcnXVxyXG4gICAgbGV0IHBockF5OiBsaW5lc1tdID0gW11cclxuICAgIGxldCBlcjogZXIgPSBbXVxyXG4gICAgZm9yIChsZXQgbGluIG9mIF9seSkge1xyXG4gICAgICAgIGxldCBbZSwgcGhyXSA9IHhzc3VqbF9qb2lQaHJMaW5lcyhsaW4pXHJcbiAgICAgICAgcGhyQXkucHVzaChwaHIpXHJcbiAgICAgICAgZXIgPSBlci5jb25jYXQoZSlcclxuICAgIH1cclxuICAgIHJldHVybiBbZXIsIHBockF5LmpvaW4oJ1xcclxcbicpICsgJ1xcclxcbiddXHJcbn1cclxuY29uc3QgeHNzdXNfc2V0UGhyID0gKF9seTogbHkpOiBbZXIsIHBocmFzZV0gPT4gW1tdLCAnJ11cclxuY29uc3QgeHNzdXdfd2hlUGhyID0gKF9seTogbHkpOiBbZXIsIHBocmFzZV0gPT4gW1tdLCAnJ11cclxuY29uc3QgeHNzdXV0X3RibE5tID0gKF9mc3RMaW46IGxpbik6IHMgfCBudWxsID0+IHtcclxuICAgIGNvbnN0IGEyID0geC5zUm12UGZ4KFwiP1wiKShfZnN0TGluKVxyXG4gICAgY29uc3QgYTMgPSB4LnNIYXNQZnhJZ25DYXMoc3FfVVBEKShhMilcclxuICAgIGlmICghYTMpXHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIGxldCB6ID0geC5saW5UMihhMilcclxuICAgIHJldHVybiB6XHJcbn1cclxuY29uc3QgeHNzc2JlX21pc3NpbmdMeUVyID0gKHN5OiBzeSwgX2l4OiBuLCBfb3B0aW9uYWw/OiAnT3B0aW9uYWwnKTogZXIgPT4ge1xyXG4gICAgaWYgKF9vcHRpb25hbCA9PT0gJ09wdGlvbmFsJylcclxuICAgICAgICByZXR1cm4gW11cclxuICAgIGlmIChzeS5sZW5ndGggPiAwKVxyXG4gICAgICAgIHJldHVybiBbXVxyXG4gICAgcmV0dXJuIFtdXHJcbn1cclxuY29uc3QgeHNzc2JfYnJrID0gKF9ncDogZ3AsIF9wZnhBeTogc3ksIF9vcHRpb25hbD86ICdPcHRpb25hbCcpOiBbc3ksIGdwLCBlcl0gPT4ge1xyXG4gICAgY29uc3Qgc3k6IHNbXSA9IFtdXHJcbiAgICBjb25zdCBncDogZ3AgPSBbXVxyXG4gICAgY29uc3QgZXI6IGVyID0geHNzc2JlX21pc3NpbmdMeUVyKHN5LCBfZ3BbMF0uaXgsIF9vcHRpb25hbClcclxuICAgIHJldHVybiBbc3ksIGdwLCBlcl1cclxufVxyXG5jb25zdCB4c3NzZl9mcm9QaHIgPSAoX2Zyb0x5OiBseSkgPT4ge1xyXG4gICAgY29uc3QgdGJsID0gJycgLy8/XHJcbiAgICByZXR1cm4gJyAgIGZyb20gJyArIHRibFxyXG59XHJcbmNvbnN0IHhzc3NqX2pvaVBociA9IChfam9pTHk6IGx5KSA9PiB7XHJcbn1cclxuY29uc3QgeHNzc2dfZ3JvUGhyID0gKF9ncm9MeTogbHksIF9leHByRGljOiBleHByRGljKTogcGhyYXNlID0+IHtcclxuICAgIGNvbnN0IGxpbmVzID0gJycgLy8/XHJcbiAgICByZXR1cm4gJyAgZ3JvdXAgYnlcXHJcXG4nICsgbGluZXNcclxufVxyXG5jb25zdCB4c3NzX3NlbE9yRGlzU3RtdCA9IChfc2VsR3A6IHNlbEdwLCBfc2VsVHk6IGVTZWxUeSwgX3N3OiBzdyk6IFtlciwgc3FsXSA9PiB7XHJcbiAgICBjb25zdCB7IGZsZFN3LCBzdG10U3cgfSA9IF9zd1xyXG4gICAgY29uc3QgbHkgPSB5X2dwX2x5KF9zZWxHcClcclxuICAgIGNvbnN0IHRibE5tS2V5ID0geHNzc3RfdGJsTm1LZXkobHkpXHJcbiAgICBpZiAoc3RtdFN3Lmhhcyh0YmxObUtleSkpXHJcbiAgICAgICAgcmV0dXJuIFtbXSwgJyddXHJcbiAgICBjb25zdCBleHByRGljID0geV9leHByRGljKGx5KVxyXG4gICAgY29uc3QgZzAgPSBfc2VsR3BcclxuICAgIGNvbnN0IFtzZWxMeSwgZzEsIGUxXSA9IHhzc3NiX2JyayhnMCwgWydTRUwnLCAnRElTJ10pXHJcbiAgICBjb25zdCBbZnJvTHksIGcyLCBlMl0gPSB4c3NzYl9icmsoZzEsIFsnU0VMJywgJ0RJUyddKVxyXG4gICAgY29uc3QgW2pvaUx5LCBnMywgZTNdID0geHNzc2JfYnJrKGcyLCBbJ0pPSScsICdMRUYnXSwgJ09wdGlvbmFsJylcclxuICAgIGNvbnN0IFt3aGVMeSwgZzQsIGU0XSA9IHhzc3NiX2JyayhnMywgWydXSEUnLCAnQU5EJywgJ09SJ10sICdPcHRpb25hbCcpXHJcbiAgICBjb25zdCBbZ3JvTHksIGc1LCBlNV0gPSB4c3NzYl9icmsoZzQsIFsnR1JPJ10sICdPcHRpb25hbCcpXHJcbiAgICBjb25zdCBzZWwgPSB4c3Nzc19zZWxQaHIoc2VsTHksIF9zZWxUeSwgZmxkU3csIGV4cHJEaWMpXHJcbiAgICBjb25zdCBmcm8gPSB4c3NzZl9mcm9QaHIoZnJvTHkpXHJcbiAgICBjb25zdCBqb2kgPSB4c3Nzal9qb2lQaHIoam9pTHkpXHJcbiAgICBjb25zdCB3aGUgPSB5d193aGVQaHIod2hlTHksIGV4cHJEaWMpXHJcbiAgICBjb25zdCBncm8gPSB4c3NzZ19ncm9QaHIoZ3JvTHksIGV4cHJEaWMpXHJcbiAgICBjb25zdCBzcWwgPSBzZWwgKyBmcm8gKyBqb2kgKyB3aGUgKyBncm9cclxuICAgIGNvbnN0IGVyOiBlciA9IGUxLmNvbmNhdChlMiwgZTMsIGU0LCBlNSlcclxuICAgIHJldHVybiBbZXIsIHNxbF1cclxufVxyXG5jb25zdCB4c19zcWwgPSAoX3NxR3A6IHNxR3BbXSwgX3BtOiBwbSwgX3N3OiBzdyk6IFtlciwgc3FsXSA9PiB7XHJcbiAgICBsZXQgZXI6IGVyID0gW11cclxuICAgIGxldCBzcWwgPSBcIlwiXHJcbiAgICBmb3IgKGxldCBzcUdwIG9mIF9zcUdwKSB7XHJcbiAgICAgICAgbGV0IFtlLCBzXSA9IHhzc19zdG10KHNxR3AsIF9zdylcclxuICAgICAgICBlciA9IGVyLmNvbmNhdChlKVxyXG4gICAgICAgIGlmIChzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNxbCA9IHMgPT09IFwiXCJcclxuICAgICAgICAgICAgICAgID8gc1xyXG4gICAgICAgICAgICAgICAgOiBzcWwgKz0gJ1xcclxcblxcclxcbicgKyBzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtlciwgc3FsXVxyXG59XHJcbmNvbnN0IHhzc3Rfc3RtdFR5ID0gKF9zcUdwOiBzcUdwKTogZVN0bXRUeSB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgZnN0TGluID0gX3NxR3BbMF0ubGluXHJcbiAgICBjb25zdCBzdG10VHlTdHIgPSAoeC5zUm12UGZ4KFwiP1wiKSh4LmxpbkZzdFRlcm0oZnN0TGluKSkpLnRvVXBwZXJDYXNlKClcclxuICAgIHN3aXRjaCAoc3RtdFR5U3RyKSB7XHJcbiAgICAgICAgY2FzZSAnRElTJzogY2FzZSAnVVBEJzogY2FzZSAnU0VMJzogY2FzZSAnRFJQJzogcmV0dXJuIHN0bXRUeVN0clxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGxcclxufVxyXG5jb25zdCB4c3Nfc3RtdCA9IChfc3FHcDogc3FHcCwgX3N3OiBzdyk6IFtlciwgc3RtdF0gPT4ge1xyXG4gICAgY29uc3Qgc3RtdFR5ID0geHNzdF9zdG10VHkoX3NxR3ApXHJcbiAgICBzd2l0Y2ggKHN0bXRUeSkge1xyXG4gICAgICAgIGNhc2UgJ0RJUyc6IHJldHVybiB4c3NzX3NlbE9yRGlzU3RtdChfc3FHcCwgJ0RJUycsIF9zdylcclxuICAgICAgICBjYXNlICdTRUwnOiByZXR1cm4geHNzc19zZWxPckRpc1N0bXQoX3NxR3AsICdTRUwnLCBfc3cpXHJcbiAgICAgICAgY2FzZSAnVVBEJzogcmV0dXJuIHhzc3VfdXBkU3RtdChfc3FHcCwgX3N3KVxyXG4gICAgICAgIGNhc2UgJ0RSUCc6IHJldHVybiB4c3NkX2RycFN0bXQoX3NxR3ApXHJcbiAgICB9XHJcbiAgICBjb25zdCBpeCA9IF9zcUdwWzBdLml4XHJcbiAgICBjb25zdCBsaW4gPSBfc3FHcFswXS5saW5cclxuICAgIGNvbnN0IG0gPSB4LnNGbXQoJyBtdXN0IGJlIFs/IHwgPyB8ID8gfCA/XScsIHNxX1NFTCwgc3FfVVBELCBzcV9ESVMsIHNxX0RSUClcclxuICAgIGNvbnN0IGVuZE1zZyA9IFtsaW5fdDFNcmtyTGluKGxpbiwgbSldXHJcbiAgICBjb25zdCBzZnhNc2cgPSBbXVxyXG4gICAgY29uc3QgZXJJdG06IGVySXRtID0geyBpeCwgZW5kTXNnLCBzZnhNc2cgfVxyXG4gICAgY29uc3QgZXI6IGVyID0gW2VySXRtXVxyXG4gICAgcmV0dXJuIFtlciwgbnVsbF1cclxufVxyXG5jb25zdCB4c3NzdF90YmxObUtleSA9IChseTogbHkpOiB0YmxObUtleSA9PiB7XHJcbiAgICBjb25zdCB0YmxObUxpbiA9IHguaXRyRmluZCh4LnNIYXNQZnhJZ25DYXMoc3FfRlJPKSkobHkpXHJcbiAgICBpZiAodGJsTm1MaW4gPT09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICByZXR1cm4geC5saW5UMih0YmxObUxpbilcclxufVxyXG5jb25zdCB4c3N1dF90YmxObUtleSA9IChseTogbHkpOiB0YmxObUtleSA9PiB7XHJcbiAgICBjb25zdCB0YmxObUxpbiA9IHguaXRyRmluZCh4LnNIYXNQZnhJZ25DYXMoc3FfRlJPKSkobHkpXHJcbiAgICBpZiAodGJsTm1MaW4gPT09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICByZXR1cm4geC5saW5UMih0YmxObUxpbilcclxufVxyXG5jb25zdCB4c3Nzc2ZfZm55ID0gKF9zZWxMeTogbHkpOiBmbGRObVtdID0+IHtcclxuICAgIGxldCBmbnk6IGZsZE5tW10gPSBbXVxyXG4gICAgZm9yIChsZXQgbGluIG9mIF9zZWxMeSkge1xyXG4gICAgICAgIGxldCBhID0geC5zU3BsaXRTcGMobGluKVxyXG4gICAgICAgIGEuc2hpZnQoKVxyXG4gICAgICAgIGZueSA9IGZueS5jb25jYXQoYSlcclxuICAgIH1cclxuICAgIHJldHVybiBmbnlcclxufVxyXG5jb25zdCB4c3Nzc19zZWxQaHIgPSAoX3NlbEx5OiBseSwgX3NlbFR5OiBlU2VsVHksIF9mbGRTdzogZmxkU3csIF9leHByRGljOiBleHByRGljKTogW2VyLCBzXSA9PiB7XHJcbiAgICBjb25zdCBkaXN0aW5jdCA9IF9zZWxUeSA9PT0gJ0RJUycgPyAnIGRpc3RpbmN0JyA6ICcnXHJcbiAgICBjb25zdCBmbnkgPSB4c3Nzc2ZfZm55KF9zZWxMeSlcclxuICAgIGNvbnN0IHNlbCA9IHlfcGhyUGZ4KCdzZWxlY3QnICsgZGlzdGluY3QsICdOZXdMaW5lJykgKyB4c3Nzc2ZfZmxkc0xpbmVzKGZueSwgX2ZsZFN3LCBfZXhwckRpYylcclxuICAgIHJldHVybiBbW10sIHNlbF1cclxufVxyXG5jb25zdCB4c3Nzc2ZsX2x5UGFpciA9IChfZm55OiBmbGRObVtdLCBfZmxkU3c6IGZsZFN3LCBfZXhwckRpYzogZXhwckRpYyk6IFtseSwgbHldID0+IHtcclxuICAgIGNvbnN0IGZueSA9IHguaXRyV2hlcmUoKGZsZE5tOiBzKSA9PiBfZmxkU3cuaGFzKGZsZE5tKSkoX2ZueSlcclxuICAgIGNvbnN0IGw6IHNbXSA9ICgoKSA9PiB7XHJcbiAgICAgICAgbGV0IG0gPSAoZmxkTm06IHMpID0+IGRpY19kZnRWYWwoZmxkTm0pKF9leHByRGljLCBmbGRObSlcclxuICAgICAgICByZXR1cm4geC5pdHJNYXAobSkoZm55KVxyXG5cclxuICAgIH0pKClcclxuICAgIGNvbnN0IGwxOiBzW10gPSB4Lml0ck1hcCh4LnNSbXZQZngoXCI/XCIpKShsKVxyXG4gICAgY29uc3Qgcjogc1tdID0geC5pdHJBbGlnbkwoZm55KVxyXG4gICAgcmV0dXJuIFtsMSwgcl1cclxufVxyXG5jb25zdCB4c3Nzc2ZfZmxkc0xpbmVzID0gKF9mbnk6IGZsZE5tW10sIF9mbGRTdzogZmxkU3csIF9leHByRGljOiBleHByRGljKTogbGluZXMgPT4ge1xyXG4gICAgLy8ge2F9IGlzIGFsbCBncC1saW5lcyBzdGFydGVkIHdpdGggZWl0aGVyIFNFTCB8IERJU1xyXG4gICAgbGV0IFtsLCByXSA9IHhzc3NzZmxfbHlQYWlyKF9mbnksIF9mbGRTdywgX2V4cHJEaWMpXHJcbiAgICBjb25zdCB6OiBzW10gPSBbXVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgei5wdXNoKGxbaV0gKyByW2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHouam9pbignLFxcclxcbicpICsgJ1xcclxcbidcclxufVxyXG5jb25zdCB4c3NkX2RycFN0bXQgPSAoYTogZHJwR3ApOiBbZXIsIHN0bXRdID0+IHtcclxuICAgIHJldHVybiBbW10sICcnXVxyXG59XHJcbmNvbnN0IHhiYnJfcm12Um1rTGluID0gKGE6IGdwKSA9PiB7XHJcbiAgICBsZXQgcCA9ICh7IGl4LCBsaW4gfSkgPT4gIXguaXNSbWtMaW4obGluKVxyXG4gICAgbGV0IHo6IGdwID0geC5pdHJXaGVyZShwKShhKVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5jb25zdCB4YnRyX2lzU3FMeSA9IChhOiBseSkgPT4ge1xyXG4gICAgY29uc3QgZnN0Tm9uUm1rTGluOiBsaW4gPSB4Lml0ckZpbmQoeC5pc05vbkVtcCkoYSlcclxuICAgIGNvbnN0IGZzdFRlcm0gPSB4LmxpbkZzdFRlcm0oZnN0Tm9uUm1rTGluKVxyXG4gICAgcmV0dXJuIHgudklOKHhidHJ4X3gpKHguc1JtdlBmeChcIj9cIikoZnN0VGVybSkudG9VcHBlckNhc2UoKSlcclxufVxyXG5jb25zdCB4YnRyeF94ID0geC5zU3BsaXRTcGMoXCJEUlAgVVBEIFNFTCBESVNcIilcclxuY29uc3QgeGJ0cl9pc1JtTHkgPSAoYTogbHkpID0+IHguaXRyUHJlZElzQWxsVHJ1ZSh4LmlzUm1rTGluKShhKVxyXG5jb25zdCB4YnRyX2lzUG1MeSA9IChhOiBseSkgPT4geC5seUhhc01halBmeChcIiVcIikoYSlcclxuY29uc3QgeGJ0cl9pc1N3THkgPSAoYTogbHkpID0+IHgubHlIYXNNYWpQZngoXCI/XCIpKGEpXHJcbmNvbnN0IHhidF9ia1R5ID0gKF9seTogbHkpOiBlQmtUeSA9PiB7XHJcbiAgICBpZiAoeGJ0cl9pc1JtTHkoX2x5KSkgcmV0dXJuICdSTSdcclxuICAgIGlmICh4YnRyX2lzUG1MeShfbHkpKSByZXR1cm4gJ1BNJ1xyXG4gICAgaWYgKHhidHJfaXNTd0x5KF9seSkpIHJldHVybiAnU1cnXHJcbiAgICBpZiAoeGJ0cl9pc1NxTHkoX2x5KSkgcmV0dXJuICdTUSdcclxuICAgIHJldHVybiAnRVInXHJcbn1cclxuY29uc3QgeHBwaV9pc1BtU3dQZnhFciA9ICh7IGl4LCBsaW4gfTogaXhsaW4pOiBiID0+IHtcclxuICAgIGNvbnN0IGlzUHJtU3dMaW4gPSAobGluKSA9PiB4LnNIYXNQZngoJyU/JykobGluKVxyXG4gICAgaWYgKCFpc1BybVN3TGluKGxpbikpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBjb25zdCBheSA9IHguc1NwbGl0U3BjKGxpbilcclxuICAgIGlmIChheS5sZW5ndGggIT09IDIpIHtcclxuICAgICAgICBjb25zdCBzZnhNc2cgPSBbJ211c3QgaGF2ZSAyIHRlcm1zIGZvciBwcmVmaXggYmVpbmcgWyU/XSddXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlXHJcbn1cclxuY29uc3QgeHBwdF9pc1BtU3dQZnhfdHdvVGVybXNFciA9IChfaXhsaW46IGl4bGluKTogYiA9PiB7XHJcbiAgICBjb25zdCB7IGxpbiB9ID0gX2l4bGluXHJcbiAgICBpZiAoIXguc0hhc1BmeCgnJT8nKShsaW4pKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKHguc1NwbGl0U3BjKGxpbikubGVuZ3RoID09PSAyKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgcmV0dXJuIHRydWVcclxufVxyXG5jb25zdCB4cHB6X2lzUG1Td1BmeF96ZXJPbmVFciA9IChfaXhsaW46IGl4bGluKTogYiA9PiB7XHJcbiAgICBjb25zdCB7IGxpbiB9ID0gX2l4bGluXHJcbiAgICBjb25zdCBheSA9IHguc1NwbGl0U3BjKGxpbilcclxuICAgIGNvbnN0IHQyID0gYXlbMV1cclxuICAgIGlmICh0MiA9PT0gJzAnIHx8IHQyID09PSAnMScpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59XHJcbmNvbnN0IHhwcCR0X2VyVHdvVGVybSA9IChfZXJHcDogZ3ApOiBlciA9PiB7XHJcbiAgICBjb25zdCBhID0gJ211c3QgaGF2ZSAyIHRlcm1zIGZvciBwcmVmaXggYmVpbmcgWyU/XSdcclxuICAgIGNvbnN0IG0gPSAoeyBpeCwgbGluIH0pID0+IHlfc2Z4TXNnRXJJdG0oaXgsIGEpXHJcbiAgICByZXR1cm4geC5pdHJNYXAobSkoX2VyR3ApXHJcbn1cclxuY29uc3QgeHBwJHpfZXJaZXJPbmUgPSAoX2VyR3A6IGdwKTogZXIgPT4ge1xyXG4gICAgY29uc3QgZW5kTXNnU3RyID0gbGluID0+IGxpbl90Mk1ya3JMaW4obGluLCAnLS1bJT9dLWxpbmUgbXVzdCBoYXZlIDJuZCBiZSBbMCB8IDFdJylcclxuICAgIGNvbnN0IG0gPSAoeyBpeCwgbGluIH0pID0+IHlfZW5kTXNnRXJJdG0oaXgsIGVuZE1zZ1N0cihsaW4pKVxyXG4gICAgcmV0dXJuIHguaXRyTWFwKG0pKF9lckdwKVxyXG59XHJcbmNvbnN0IHhwcF9wbVN3UGZ4RXIgPSAoX2dwOiBncCk6IFtlciwgZ3BdID0+IHtcclxuICAgIGNvbnN0IHsgdDogdHdvVGVybUVyR3AsIGY6IGcxIH0gPSB4Lml0ckJya0ZvclRydWVGYWxzZSh4cHB0X2lzUG1Td1BmeF90d29UZXJtc0VyKShfZ3ApIC8vIGFzIHguSXRyPGl4bGluPilcclxuICAgIGNvbnN0IHsgdDogemVyT25lRXJHcCwgZjogZzIgfSA9IHguaXRyQnJrRm9yVHJ1ZUZhbHNlKHhwcHpfaXNQbVN3UGZ4X3plck9uZUVyKShnMSlcclxuICAgIGNvbnN0IGUxOiBlciA9IHhwcCR0X2VyVHdvVGVybSh0d29UZXJtRXJHcClcclxuICAgIGNvbnN0IGUyOiBlciA9IHhwcCR6X2VyWmVyT25lKHplck9uZUVyR3ApXHJcbiAgICBjb25zdCBlOiBlciA9IGUxLmNvbmNhdChlMilcclxuICAgIHJldHVybiBbZSwgZzJdXHJcbn1cclxuY29uc3QgeHBfcG0gPSAoX3BtR3A6IHBtR3ApOiBbZXIsIHBtXSA9PiB7XHJcbiAgICBjb25zdCBbZTEsIGcwXSA9IHlkX2R1cEZzdFRlcm1FcihfcG1HcClcclxuICAgIGNvbnN0IFtlMiwgZzFdID0geV9wZnhFcihnMCwgXCIlXCIpXHJcbiAgICBjb25zdCBbZTMsIGcyXSA9IHhwcF9wbVN3UGZ4RXIoZzEpXHJcbiAgICBjb25zdCBlciA9IGUxLmNvbmNhdChlMiwgZTMpXHJcbiAgICBjb25zdCBwbSA9IGx5X3NkaWMoeV9ncF9seShnMSkpXHJcbiAgICByZXR1cm4gW2VyLCBwbV1cclxufVxyXG5jb25zdCB4d2RpX2lzRm1UM0R1cFRlcm1FciA9IChfaXhsaW46IGl4bGluKTogYiA9PiBsaW5fZm1UM0R1cFRlcm1TZXQoX2l4bGluLmxpbikuc2l6ZSA+IDBcclxuY29uc3QgeHdkX3ZkdEZtVDNEdXBFciA9IChfZ3A6IGdwKTogW2VyLCBncF0gPT4ge1xyXG4gICAgY29uc3QgeyB0OiB0d29UZXJtRXJHcCwgZjogZzEgfSA9IHguaXRyQnJrRm9yVHJ1ZUZhbHNlKHh3ZGlfaXNGbVQzRHVwVGVybUVyKShfZ3ApXHJcbiAgICAvLyAgICAgICAgZXJGdW46IGEgPT4gW3sgaXg6IGEuaXgsIGVuZE1zZzogW2xpbl9mbVQzRHVwVGVybU1ya3JMaW4oYS5saW4pXSwgc2Z4TXNnOiBbXSB9XVxyXG4gICAgcmV0dXJuIFtbXSwgW11dXHJcbn1cclxuY29uc3QgeHdwX3ZkdFBmeG11c3RCZUVpdGhlcl9TRUxfb3JfVVBEID0gKF9ncDogZ3ApOiBbZXIsIGdwXSA9PiB7XHJcbiAgICByZXR1cm4gW1tdLCBbXV1cclxuICAgIC8qXHJcbiAgICBoYXNFcjogKHsgaXgsIGxpbiB9KSA9PiB7XHJcbiAgICAgICAgaWYgKCF4LnNIYXNQZngoJz8jJykobGluKSkgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgaWYgKHguc0hhc1BmeCgnPyNTRUwjJykobGluKSkgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgaWYgKHguc0hhc1BmeCgnPyNVUEQjJykobGluKSkgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0sXHJcbiAgICAgICAgZXJGdW46IGEgPT4gW3sgaXg6IGEuaXgsIGVuZE1zZzogW2xpbl90MU1ya3JMaW4oYS5saW4sICcnKV0sIHNmeE1zZzogW10gfV1cclxuICAgICovXHJcbn1cclxuY29uc3QgeHdvb3Nfc3dPcCA9IChfaXhsaW46IGl4bGluKTogZVN3T3AgfCBudWxsID0+IHtcclxuICAgIGNvbnN0IG9wID0geC5zU3BsaXRTcGMoX2l4bGluLmxpbilbMV1cclxuICAgIHN3aXRjaCAob3ApIHtcclxuICAgICAgICBjYXNlICdBTkQnOiBjYXNlICdPUic6IGNhc2UgJ0VRJzogY2FzZSAnTkUnOiByZXR1cm4gb3BcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsXHJcbn1cclxuY29uc3QgeHdvb19vcElzRXIgPSAoX2l4bGluOiBpeGxpbik6IGIgPT4geHdvb3Nfc3dPcChfaXhsaW4pID09PSBudWxsXHJcbmNvbnN0IHh3b192ZHRPcF9tdXN0QmVfQU5EX09SX0VRX05FID0gKF9ncDogZ3ApOiBbZXIsIGdwXSA9PiB7XHJcbiAgICBjb25zdCB7IHQsIGYgfSA9IHguaXRyQnJrRm9yVHJ1ZUZhbHNlKHh3b29fb3BJc0VyKShfZ3ApXHJcbiAgICByZXR1cm4gW1tdLCBfZ3BdXHJcbiAgICAvKlxyXG4gICAgaGFzRXI6IGEgPT4gb3BfaXNFcnIoeC5saW5UMihhLmxpbikpLFxyXG4gICAgICAgIGVyRnVuOiBhID0+IFt7XHJcbiAgICAgICAgICAgIGl4OiBhLml4LFxyXG4gICAgICAgICAgICBlbmRNc2c6IFtsaW5fdDJNcmtyTGluKGEubGluLCAnc3dpdGNoIGxpbmUgMm5kIHRlcm0gbXVzdCBiZSBbIEFORCB8IE9SIHwgRVEgfCBORSBdJyldLFxyXG4gICAgICAgICAgICBzZnhNc2c6IFtdXHJcbiAgICAgICAgfV1cclxuICAgICovXHJcbn1cclxuY29uc3QgeHdfc3cgPSAoX2dwOiBncCwgX3BtOiBwbSk6IFtlciwgc3ddID0+IHtcclxuICAgIGxldCBlbXB0eUJkaWMgPSBuZXcgTWFwPHMsIGI+KClcclxuICAgIGxldCB6OiBbZXIsIHN3XVxyXG4gICAgY29uc3QgW2UwLCBnMF0gPSB5ZF9kdXBGc3RUZXJtRXIoX2dwKVxyXG4gICAgY29uc3QgW2UxLCBnMV0gPSB5X3BmeEVyKGcwLCBcIj9cIilcclxuICAgIGNvbnN0IFtlMiwgZzJdID0geHdkX3ZkdEZtVDNEdXBFcihnMSlcclxuICAgIGNvbnN0IFtlMywgZzNdID0geHdwX3ZkdFBmeG11c3RCZUVpdGhlcl9TRUxfb3JfVVBEKGcyKVxyXG4gICAgY29uc3QgW2U0LCBnNF0gPSB4d29fdmR0T3BfbXVzdEJlX0FORF9PUl9FUV9ORShnMylcclxuICAgIGNvbnN0IGx5ID0geV9ncF9seShnNClcclxuICAgIGNvbnN0IGVyID0gZTAuY29uY2F0KGUxLCBlMiwgZTMsIGU0KVxyXG4gICAgY29uc3Qgc3cgPSB4d3dfc3cobHksIF9wbSlcclxuICAgIHogPSBbZXIsIHN3XVxyXG4gICAgLy8gb0Jydyh7IGlucDogeyBhLCBwbSB9LCBvdXA6IHosIHNyY0x5OiBzU3BsaXRMaW5lcyh4d19mbmRfZXJTdy50b1N0cmluZygpKSwgZTAsIGUxLCBlMiwgZTMsIGU0LCBnMCwgZzEsIGcyLCBnMywgZzQsIGx5IH0pOyBkZWJ1Z2dlclxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5jb25zdCB4d3dlX2V2bExpbiA9IChfbGluOiBsaW4sIF9wbTogcG0sIF9iZGljOiBNYXA8cywgYj4pOiB7IGtleTogcywgYm9vbE9wdDogYiB8IG51bGwgfSA9PiB7XHJcbiAgICBjb25zdCBpc1NvbWVOdWxsID0gaXRyID0+IHsgZm9yIChsZXQgaSBvZiBpdHIpIGlmIChpID09PSBudWxsKSByZXR1cm4gdHJ1ZTsgcmV0dXJuIGZhbHNlIH1cclxuICAgIGNvbnN0IHNvbWVUcnVlID0gaXRyID0+IHsgZm9yIChsZXQgaSBvZiBpdHIpIGlmIChpID09PSB0cnVlKSByZXR1cm4gdHJ1ZTsgcmV0dXJuIGZhbHNlIH1cclxuICAgIGNvbnN0IGFsbFRydWUgPSBpdHIgPT4geyBmb3IgKGxldCBpIG9mIGl0cikgaWYgKGkgIT09IHRydWUpIHJldHVybiBmYWxzZTsgcmV0dXJuIHRydWUgfVxyXG4gICAgY29uc3QgeEFORCA9IGF5ID0+IGlzU29tZU51bGwoYXkpID8gbnVsbCA6IGFsbFRydWUoYXkpXHJcbiAgICBjb25zdCB4T1IgPSBheSA9PiBpc1NvbWVOdWxsKGF5KSA/IG51bGwgOiBzb21lVHJ1ZShheSlcclxuICAgIGNvbnN0IHhFUSA9IChbYSwgYl0pID0+IGEgPT09IG51bGwgfHwgYiA9PT0gbnVsbCA/IG51bGwgOiBhID09PSBiXHJcbiAgICBjb25zdCB4TkUgPSAoW2EsIGJdKSA9PiBhID09PSBudWxsIHx8IGIgPT09IG51bGwgPyBudWxsIDogYSAhPT0gYlxyXG4gICAgY29uc3QgZXZsVDIgPSB0ID0+IHtcclxuICAgICAgICBpZiAodC50b1VwcGVyQ2FzZSgpID09PSAnKkJMQU5LJykgcmV0dXJuICcnXHJcbiAgICAgICAgcmV0dXJuIHRcclxuICAgIH1cclxuICAgIGNvbnN0IGV2bFQgPSBfdCA9PiB7XHJcbiAgICAgICAgaWYgKF9iZGljLmhhcyhfdCkpIHJldHVybiBfYmRpYy5nZXQoX3QpXHJcbiAgICAgICAgcmV0dXJuIF9wbS5nZXQoX3QpXHJcbiAgICB9XHJcbiAgICBjb25zdCBldmxBeSA9IGF5ID0+IHguaXRyTWFwKGV2bFQpKGF5KVxyXG4gICAgY29uc3QgZXZsVDFUMiA9ICh0MSwgdDIpID0+IFtldmxUKHQxKSwgZXZsVDIodDIpXVxyXG4gICAgY29uc3QgZXZsT1IgPSBheSA9PiB7IGxldCBhID0gZXZsQXkoYXkpOyByZXR1cm4geE9SKGEpIH1cclxuICAgIGNvbnN0IGV2bEFORCA9IGF5ID0+IHsgbGV0IGEgPSBldmxBeShheSk7IHJldHVybiB4QU5EKGEpIH1cclxuICAgIGNvbnN0IGV2bEVRID0gKHQxLCB0MikgPT4geyBsZXQgW2ExLCBhMl0gPSBldmxUMVQyKHQxLCB0Mik7IHJldHVybiB4RVEoW2ExLCBhMl0pIH1cclxuICAgIGNvbnN0IGV2bE5FID0gKHQxLCB0MikgPT4geyBsZXQgW2ExLCBhMl0gPSBldmxUMVQyKHQxLCB0Mik7IHJldHVybiB4TkUoW2ExLCBhMl0pIH1cclxuICAgIGxldCBheSA9IHguc1NwbGl0U3BjKF9saW4pXHJcbiAgICBsZXQga2V5ID0geC52RGZ0KFwiXCIpKGF5LnNoaWZ0KCkpLnRvVXBwZXJDYXNlKClcclxuICAgIGxldCBvcCA9IHgudkRmdChcIlwiKShheS5zaGlmdCgpKS50b1VwcGVyQ2FzZSgpXHJcbiAgICBsZXQgYm9vbE9wdDogYiB8IG51bGwgPSBudWxsXHJcbiAgICBzd2l0Y2ggKG9wKSB7XHJcbiAgICAgICAgY2FzZSAnQU5EJzogYm9vbE9wdCA9IGV2bEFORChheSk7IGJyZWFrXHJcbiAgICAgICAgY2FzZSAnT1InOiBib29sT3B0ID0gZXZsT1IoYXkpOyBicmVha1xyXG4gICAgICAgIGNhc2UgJ0VRJzogYm9vbE9wdCA9IGV2bEVRKGF5WzBdLCBheVsxXSk7IGJyZWFrXHJcbiAgICAgICAgY2FzZSAnTkUnOiBib29sT3B0ID0gZXZsTkUoYXlbMF0sIGF5WzFdKTsgYnJlYWtcclxuICAgICAgICBkZWZhdWx0OiB4LmVyKCcnKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsga2V5LCBib29sT3B0IH1cclxufVxyXG5jb25zdCB4d3dfc3cgPSAoX2x5OiBseSwgX3BtOiBwbSk6IHN3ID0+IHtcclxuICAgIGNvbnN0IGJkaWMgPSBuZXcgTWFwPHMsIGI+KClcclxuICAgIGxldCBseTE6IGx5ID0gW11cclxuICAgIGxldCBpc0V2YWx1YXRlZCA9IHRydWVcclxuICAgIGxldCBqID0gMFxyXG4gICAgbGV0IGx5ID0geC5pdHJDbG9uZShfbHkpXHJcbiAgICB3aGlsZSAoaXNFdmFsdWF0ZWQgJiYgaisrIDwgMTAwKSB7XHJcbiAgICAgICAgaXNFdmFsdWF0ZWQgPSBmYWxzZVxyXG4gICAgICAgIGx5MSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgbGluIG9mIGx5KSB7XHJcbiAgICAgICAgICAgIGxldCB7IGtleSwgYm9vbE9wdCB9ID0geHd3ZV9ldmxMaW4obGluLCBfcG0sIGJkaWMpXHJcbiAgICAgICAgICAgIGlmIChib29sT3B0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBiZGljLnNldChrZXksIGJvb2xPcHQpXHJcbiAgICAgICAgICAgICAgICBpc0V2YWx1YXRlZCA9IHRydWVcclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICBseTEucHVzaChsaW4pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGx5ID0gbHkxXHJcbiAgICB9XHJcbiAgICBpZiAobHkxLmxlbmd0aCAhPT0gMClcclxuICAgICAgICB4LmVyKCdseTEgc2hvdWxkIGhhcyAwLWxlbmd0aCcsIHsgbHkxIH0pXHJcbiAgICBsZXQgejogc3cgPSB4d3d3X3N3KGJkaWMpXHJcbiAgICAvL29CcncoeyBpbnA6IHsgYSwgcG06IHguZGljTHkocG0pIH0sIG91cF9zdG10U3c6IHguZGljTHkoei5zdG10U3cpLCBvdXBfZmxkU3c6IHguZGljTHkoei5mbGRTdyksIHN3OiB4LmRpY0x5KHN3KSB9KTsgZGVidWdnZXJcclxuICAgIHJldHVybiB6XHJcbn1cclxuY29uc3QgeHd3d19zdyA9IChhOiBiZGljKTogc3cgPT4ge1xyXG4gICAgY29uc3QgZnVuID0gKFtrLCBiXSkgPT4geC5zSGFzUGZ4KCc/IycpKGspXHJcbiAgICBjb25zdCB7IHQsIGYgfSA9IHguaXRyQnJrRm9yVHJ1ZUZhbHNlKGZ1bikoYSlcclxuICAgIGNvbnN0IHN0bXRTdyA9IG5ldyBNYXA8cywgYj4odClcclxuICAgIGNvbnN0IGZsZFN3ID0gbmV3IE1hcDxzLCBiPihmKVxyXG4gICAgcmV0dXJuIHsgZmxkU3csIHN0bXRTdyB9XHJcbn1cclxuY29uc3QgeHZfdnRwID0gKF9seTogbHksIF9lcjogZXIpOiBzID0+IHtcclxuICAgIGNvbnN0IGwgPSB4dmxfbGVmdEx5QXkoX2x5LCBfZXIpXHJcbiAgICBjb25zdCBsMSA9IHh2YV9sZWZ0THlBeUFsaWduTHkobClcclxuICAgIGNvbnN0IHIgPSB4dnJfcmlnaHRMeUF5KF9seSwgX2VyKVxyXG4gICAgbGV0IG86IGx5ID0gW11cclxuICAgIGZvciAobGV0IGkgb2YgeC5uSXRyKGwubGVuZ3RoKSkge1xyXG4gICAgICAgIGxldCBtID0geHZtX21nZShsMVtpXSwgcltpXSlcclxuICAgICAgICBvID0gby5jb25jYXQobSlcclxuICAgIH1cclxuICAgIHJldHVybiBvLmpvaW4oJ1xcclxcbicpXHJcbn1cclxuY29uc3QgeHZsX2xlZnRMeUF5ID0gKF9seTogbHksIF9lcjogZXIpOiBseVtdID0+IHtcclxuICAgIGNvbnN0IG86IGx5W10gPSBbXVxyXG4gICAgZm9yIChsZXQgaSBvZiB4Lm5JdHIoX2x5Lmxlbmd0aCkpIHtcclxuICAgICAgICBjb25zdCBtID0gW19seVtpXV0uY29uY2F0KHh2bGVfZW5kTXNnRXJJdG0oX2VyLCBpKSlcclxuICAgICAgICBvLnB1c2gobSlcclxuICAgIH1cclxuICAgIHJldHVybiBvXHJcbn1cclxuY29uc3QgeHZhd193ZHQgPSAobHlBeTogbHlbXSk6IHdkdCA9PiB7XHJcbiAgICBjb25zdCBiID0geC5pdHJNYXAoeC5pdHJXZHQpKGx5QXkpXHJcbiAgICByZXR1cm4geC52RGZ0KDApKHguaXRyTWF4KGIpKVxyXG59XHJcbmNvbnN0IHh2YV9sZWZ0THlBeUFsaWduTHkgPSAoX2x5QXk6IGx5W10pID0+IHsgLy8/XHJcbiAgICBjb25zdCB3ID0geHZhd193ZHQoX2x5QXkpXHJcbiAgICBjb25zdCBhbGlnbiA9IChseTogbHkpID0+IHguaXRyTWFwKHguc0FsaWduTCh3KSkobHkpXHJcbiAgICByZXR1cm4geC5pdHJNYXAoYWxpZ24pKF9seUF5KVxyXG59XHJcbmNvbnN0IHh2cl9yaWdodEx5QXkgPSAobHk6IGx5LCBlcjogZXIpOiBseVtdID0+IHtcclxuICAgIGNvbnN0IG86IGx5W10gPSBbXVxyXG4gICAgZm9yIChsZXQgaSBvZiB4Lm5JdHIobHkubGVuZ3RoKSkge1xyXG4gICAgICAgIGNvbnN0IG0gPSB4dnJzX3NmeE1zZ0VyKGVyLCBpKVxyXG4gICAgICAgIG8ucHVzaChtKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9cclxufVxyXG5jb25zdCB4dmxlX2VuZE1zZ0VySXRtID0gKGVyOiBlciwgaXg6IG4pID0+IHtcclxuICAgIGxldCBvOiBzW10gPSBbXVxyXG4gICAgZm9yIChsZXQgeyBpeDogaSwgZW5kTXNnIH0gb2YgZXIpIHtcclxuICAgICAgICBpZiAoaSA9PT0gaXgpIG8gPSBvLmNvbmNhdChlbmRNc2cpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb1xyXG59XHJcbmNvbnN0IHh2bV9tZ2UgPSAobGVmdEx5OiBseSwgcmlnaHRMeTogbHkpOiBseSA9PiB7XHJcbiAgICBjb25zdCBzZXAgPSAnIC0tLSAnXHJcbiAgICBjb25zdCBsbGVuID0gbGVmdEx5Lmxlbmd0aFxyXG4gICAgY29uc3QgcmxlbiA9IHJpZ2h0THkubGVuZ3RoXHJcbiAgICBjb25zdCBvOiBseSA9IFtdXHJcbiAgICBjb25zdCBtaW4gPSB4Lml0ck1pbihbbGxlbiwgcmxlbl0pXHJcbiAgICBmb3IgKGxldCBpIG9mIHgubkl0cihtaW4pKSB7XHJcbiAgICAgICAgY29uc3QgbSA9IGxlZnRMeVtpXSArIHNlcCArIHJpZ2h0THlbaV1cclxuICAgICAgICBvLnB1c2gobSlcclxuICAgIH1cclxuICAgIGlmIChsbGVuID4gcmxlbikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBybGVuOyBpIDwgbGxlbjsgaSsrKVxyXG4gICAgICAgICAgICBvLnB1c2gobGVmdEx5W2ldLnRyaW0oKSlcclxuICAgIH0gZWxzZSBpZiAobGxlbiA8IHJsZW4pIHtcclxuICAgICAgICBjb25zdCBzID0geC5uU3BjKGxlZnRMeVswXS5sZW5ndGgpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGxsZW47IGkgPCBybGVuOyBpKyspXHJcbiAgICAgICAgICAgIG8ucHVzaChzICsgc2VwICsgcmlnaHRMeVtpXSlcclxuICAgIH1cclxuICAgIHJldHVybiBvXHJcbn1cclxuY29uc3QgeHZyc19zZnhNc2dFciA9IChlcjogZXIsIGl4OiBuKSA9PiB7XHJcbiAgICBsZXQgbzogc1tdID0gW11cclxuICAgIGZvciAobGV0IHsgaXg6IGksIHNmeE1zZyB9IG9mIGVyKSB7XHJcbiAgICAgICAgaWYgKGkgPT09IGl4KSBvID0gby5jb25jYXQoc2Z4TXNnKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9cclxufVxyXG4vLyF5ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgeXdfd2hlUGhyID0gKF93aGVMeTogbHksIF9leHByRGljOiBleHByRGljKTogbGluZXMgPT4ge1xyXG4gICAgaWYgKF93aGVMeS5sZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbGluSXNRbXJrUGZ4ID0gKGxpbjogbGluLCBwZng6IHMpID0+IHRydWVcclxuICAgICAgICBjb25zdCBhc3NlcnRRbXJrUGZ4QXkgPSAobGluOiBsaW4sIHBmeDogc1tdKSA9PiB7IH1cclxuICAgICAgICBjb25zdCBhc3NlcnRRbXJrUGZ4ID0gKGxpbjogbGluLCBwZng6IHMpID0+IHsgfVxyXG4gICAgICAgIGNvbnN0IGFzc2VydFFtcmtBbmRPciA9IChsaW46IGxpbikgPT4gYXNzZXJ0UW1ya1BmeEF5KGxpbiwgWydBTkQnLCAnT1InXSlcclxuICAgICAgICBhc3NlcnRRbXJrUGZ4KF93aGVMeVswXSwgJ1dIRScpXHJcbiAgICAgICAgX3doZUx5LnNsaWNlKDEpLmZvckVhY2goYXNzZXJ0UW1ya0FuZE9yKVxyXG4gICAgfVxyXG4gICAgY29uc3QgYXkgPSB5d3dfd2hlQW5kT3JMaW5lc19wcm1BeShfd2hlTHksIF9leHByRGljKVxyXG4gICAgY29uc3QgbGluZXNBeSA9IHguaXRyTWFwKHl3bF93aGVBbmRPckxpbmVzKShheSlcclxuICAgIHJldHVybiBsaW5lc0F5LmpvaW4oJ1xcclxcbicpICsgJ1xcclxcbidcclxufVxyXG5jb25zdCB5d3dsX3doZUFuZE9yTGluX3BybSA9IChfd2hlTGluOiBsaW4pOiB3aGVBbmRPckxpbmVzUHJtIHwgZXIgPT4ge1xyXG4gICAgY29uc3QgcGZ4ID0gJ1dIRSdcclxuICAgIGNvbnN0IG9wbkJrdCA9ICcnXHJcbiAgICBjb25zdCBmbGRMaW5lcyA9ICcnXHJcbiAgICBjb25zdCBvcCA9ICdiZXR3ZWVuJ1xyXG4gICAgY29uc3Qgb3ByYW5kID0gJydcclxuICAgIGNvbnN0IGNsc0JrdCA9ICcnXHJcbiAgICByZXR1cm4geyBwZngsIG9wbkJrdCwgZmxkTGluZXMsIG9wLCBvcHJhbmQsIGNsc0JrdCB9XHJcbn1cclxuY29uc3QgeXd3X3doZUFuZE9yTGluZXNfcHJtQXkgPSAoX3doZUx5OiBseSwgX2V4cHJEaWMpOiAod2hlQW5kT3JMaW5lc1BybSB8IGVyKVtdID0+XHJcbiAgICB4Lml0ck1hcCh5d3dsX3doZUFuZE9yTGluX3BybSkoX3doZUx5KVxyXG5jb25zdCB5d2xfd2hlQW5kT3JMaW5lcyA9IChfYTogd2hlQW5kT3JMaW5lc1BybSk6IGxpbmVzID0+IHtcclxuICAgIGNvbnN0IHsgcGZ4LCBvcG5Ca3QsIGZsZExpbmVzLCBvcCwgb3ByYW5kLCBjbHNCa3QgfSA9IF9hXHJcbiAgICBjb25zdCBmID0gZmxkTGluZXNcclxuICAgIGNvbnN0IHAgPSBwZnhcclxuICAgIHJldHVybiBwICsgb3BuQmt0ICsgZiArICcgJyArIHAgKyAnICcgKyBvcHJhbmQgKyBjbHNCa3RcclxufVxyXG5jb25zdCB5d3dfd2hlUGhyID0gKF93aGVMeTogbHksIF9leHByRGljOiBleHByRGljKTogbGluZXMgPT4ge1xyXG4gICAgaWYgKF93aGVMeS5sZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuICcnXHJcbiAgICBjb25zdCB3aGVMaW4gPSBfd2hlTHlbMF1cclxuICAgIGNvbnN0IHsgdGVybSwgcmVtYWluTGluIH0gPSB4LmxpblNoaWZ0KHdoZUxpbilcclxuICAgIGNvbnN0IHQxID0gKHguc1JtdlBmeChcIj9cIikodGVybSkpLnRvVXBwZXJDYXNlKClcclxuICAgIGlmICh0MSAhPT0gJ1dIRScpXHJcbiAgICAgICAgeC5lcignd2hlTGluIG11c3QgaGFzIHBmeCBbP1dIRSB8IFdIRV0nLCB7IHdoZUxpbiB9KVxyXG4gICAgcmV0dXJuICcgIHdoZXJlICAgICAnICsgeV93aGVSc3RMaW5lcyhyZW1haW5MaW4sIF9leHByRGljKVxyXG59XHJcbmNvbnN0IHl3YV9hbmRPckxpbmVzID0gKF93aGVMeTogbHksIF9leHByRGljOiBleHByRGljKTogbGluZXMgPT4ge1xyXG4gICAgY29uc3QgbGluZXNBeTogbHlbXSA9IFtdIC8vP1xyXG4gICAgcmV0dXJuIGxpbmVzQXkuam9pbignXFxyXFxuJylcclxufVxyXG4vLyBjb25zdCBhbmRPckxpbmVzQXkgPSB4Lml0ck1hcCh5d2FfYW5kT3JMaW5lcyhfZXhwckRpYykpKGFuZE9yTHkpXHJcbi8vIGNvbnN0IGFuZE9yTGluZXMgPSBhbmRPckxpbmVzQXkuam9pbignXFxyXFxuJylcclxuLy8gY29uc3QgeXdscF9wZnggPSAoX2FuZE9yTGluOiBsaW4pOiBzID0+IHtcclxuLy8gICAgIGNvbnN0IHBmeDogcyA9ICcnIC8vP1xyXG4vLyAgICAgc3dpdGNoIChwZngpIHtcclxuLy8gICAgICAgICBjYXNlICdBTkQnOiByZXR1cm4gJyAgYW5kICAgICAgJ1xyXG4vLyAgICAgICAgIGNhc2UgJ09SJzogcmV0dXJuICcgIG9yICAgICAgICdcclxuLy8gICAgICAgICBkZWZhdWx0OlxyXG4vLyAgICAgfVxyXG4vLyAgICAgeC5lcignX2FuZE9yTGluIG11c3QgYmUgWz9XSEUgfCA/QU5EIHwgP09SJywgeyBfYW5kT3JMaW4gfSlcclxuLy8gICAgIHJldHVybiAnJ1xyXG4vLyB9XHJcbmNvbnN0IHl3JHdfd2hlTGluID0gKCk6IGxpbiA9PiAnJyAvLz9cclxuY29uc3QgeXckYV9hbmRPckx5ID0gKCk6IGx5ID0+IFtdIC8vP1xyXG5cclxuY29uc3QgeWRfZHVwRnN0VGVybUVyID0gKF9ncDogZ3ApOiBbZXIsIGdwXSA9PiB7XHJcbiAgICBjb25zdCBseSA9IHlfZ3BfbHkoX2dwKVxyXG4gICAgY29uc3QgZHVwID0gbHlfZnN0VGVybUR1cFNldChseSlcclxuICAgIGxldCBlcjogZXIgPSBbXVxyXG4gICAgbGV0IGdwID0gX2dwXHJcbiAgICBmb3IgKGxldCBpdG0gb2YgZHVwKSB7XHJcbiAgICAgICAgbGV0IFtlLCBnXSA9IHlkZV9lckdwKF9ncCwgaXRtKVxyXG4gICAgICAgIGVyID0gZXIuY29uY2F0KGUpXHJcbiAgICAgICAgZ3AgPSBnXHJcbiAgICB9XHJcbiAgICByZXR1cm4gW2VyLCBncF1cclxufVxyXG4vLyByZW1vdmUgYWxsLCBleGNlcHQgYWZ0ZXIsIGxpbmVzIGluIHthfSB3aXRoIHtmc3RUZXJtfSBhcyBbZ3BdIGFuZCBcclxuLy8gcHV0IHRoZSByZW1vdmVkIGxpbmVzIGFzIGVyXHJcbi8vIHJldHVybiBbZXIsZ3BdXHJcbmNvbnN0IHlkZV9lckdwID0gKF9ncDogZ3AsIF9mc3RUZXJtOiBzKTogW2VyLCBncF0gPT4ge1xyXG4gICAgY29uc3QgaXhheTogbltdID0gW11cclxuICAgIGZvciAobGV0IHsgaXgsIGxpbiB9IG9mIF9ncCkge1xyXG4gICAgICAgIGxldCBmc3QgPSB4LmxpbkZzdFRlcm0obGluKVxyXG4gICAgICAgIGlmIChfZnN0VGVybSA9PT0gZnN0KSBpeGF5LnB1c2goaXgpXHJcbiAgICB9XHJcbiAgICBpeGF5LnBvcCgpXHJcbiAgICBjb25zdCBpeHNldCA9IG5ldyBTZXQ8bj4oaXhheSlcclxuICAgIHJldHVybiB5ZGVlX2VyR3AoX2dwLCBpeHNldClcclxufVxyXG5cclxuY29uc3QgeWRlZV9lckdwID0gKF9ncDogZ3AsIGl4c2V0OiBTZXQ8bj4pOiBbZXIsIGdwXSA9PiB7XHJcbiAgICBjb25zdCBlcjogZXIgPSBbXVxyXG4gICAgY29uc3QgZ3A6IGdwID0gW11cclxuICAgIGZvciAobGV0IHsgaXgsIGxpbiB9IG9mIF9ncCkge1xyXG4gICAgICAgIGlmIChpeHNldC5oYXMoaXgpKSB7XHJcbiAgICAgICAgICAgIGxldCBmc3QgPSB4LmxpbkZzdFRlcm0obGluKVxyXG4gICAgICAgICAgICBsZXQgc2Z4TXNnID0gW2BkdXBsaWNhdGUoJHtmc3R9KWBdXHJcbiAgICAgICAgICAgIGxldCBlbmRNc2cgPSBbXVxyXG4gICAgICAgICAgICBjb25zdCBtID0geyBpeCwgc2Z4TXNnLCBlbmRNc2cgfVxyXG4gICAgICAgICAgICBlci5wdXNoKG0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ3AucHVzaCh7IGl4LCBsaW4gfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW2VyLCBncF1cclxufVxyXG4vLyF5XyA9PT09PT09PT09PT09PVxyXG5jb25zdCB5X3BoclBmeCA9IChfcGZ4OiBwZngsIF9uZXdMaW5lPzogJ05ld0xpbmUnKSA9PiAoX25ld0xpbmUgPT09ICdOZXdMaW5lJykgPyBfcGZ4ICsgJ1xcclxcbicgOiBfcGZ4ICsgeC5uU3BjKDEwIC0gX3BmeC5sZW5ndGgpXHJcbmNvbnN0IHlfZW5kTXNnRXJJdG0gPSAoaXg6IG4sIGVuZE1zZ1N0cjogcyk6IGVySXRtID0+IHsgcmV0dXJuIHsgaXgsIGVuZE1zZzogW2VuZE1zZ1N0cl0sIHNmeE1zZzogW10gfSB9XHJcbmNvbnN0IHlfc2Z4TXNnRXJJdG0gPSAoaXg6IG4sIHNmeE1zZ1N0cjogcyk6IGVySXRtID0+IHsgcmV0dXJuIHsgaXgsIGVuZE1zZzogW10sIHNmeE1zZzogW3NmeE1zZ1N0cl0gfSB9XHJcbmNvbnN0IHlfZXhwckRpYyA9IChseTogbHkpOiBleHByRGljID0+IHgucGlwZShseSkoeC5pdHJXaGVyZSh4LnNIYXNQZngoJyQnKSksIHgubHlTZGljKVxyXG5jb25zdCB5X3doZVJzdExpbmVzID0gKHJlbWFpbkxpbjogbGluLCBfZXhwckRpYzogZXhwckRpYykgPT4gJydcclxuY29uc3QgeV93aGVBbmRPckxpbiA9IChfbGluOiBsaW4sIF9leHByRGljOiBleHByRGljKTogbGluID0+ICcnIC8vP1xyXG5jb25zdCB5X2dwX2x5ID0gKGE6IGdwKSA9PiB4Lml0ck1hcCh4Lm9QcnAoXCJsaW5cIikpKGEpIGFzIGx5XHJcbmNvbnN0IHlfcGZ4RXIgPSAoX2dwOiBncCwgX3BmeDogcyk6IFtlciwgZ3BdID0+IHtcclxuICAgIGNvbnN0IGhhc1BmeCA9ICh7IGl4LCBsaW4gfSkgPT4geC5zSGFzUGZ4KF9wZngpKGxpbilcclxuICAgIGNvbnN0IG0gPSAoeyBpeCwgbGluIH0pID0+IHtcclxuICAgICAgICBjb25zdCBlbmRNc2cgPSBbJ14nLnJlcGVhdChfcGZ4Lmxlbmd0aCkgKyAnLS0tLSBwcmVmaXggbXVzdCBiZSAoJyArIF9wZnggKyAnKSddXHJcbiAgICAgICAgcmV0dXJuIHsgaXgsIGVuZE1zZywgc2Z4TXNnOiBbXSB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyB0OiBva0dwLCBmOiBlckdwIH0gPSB4Lml0ckJya0ZvclRydWVGYWxzZShoYXNQZngpKF9ncClcclxuICAgIGNvbnN0IGVyID0geC5pdHJNYXAobSkoZXJHcClcclxuICAgIHJldHVybiBbZXIsIG9rR3BdXHJcbn1cclxuLy8hej09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxubGV0IHpCcndTdzogKHN3R3A6IHN3R3AsIHN3OiBzdykgPT4gdm9pZFxyXG5sZXQgekJyd0VyOiAoZXI6IGVyKSA9PiB2b2lkXHJcbmxldCB6QnJ3R3A6IChncDogZ3ApID0+IHZvaWRcclxubGV0IHpCcndDdXJFeHBDb25zdE55OiAoKSA9PiB2b2lkXHJcbmxldCB6QnJ3Q3VyQ29uc3ROeTogKCkgPT4gdm9pZFxyXG5sZXQgekVkdFNhbXBsZUV4cHJEaWM6ICgpID0+IHZvaWRcclxubGV0IHpFZHRTYW1wbGVXaGVMeTogKCkgPT4gdm9pZFxyXG5sZXQgekVkdFNhbXBsZVNxVHA6ICgpID0+IHZvaWRcclxubGV0IHpTYW1wbGVMeTogKHR4dDogcykgPT4gbHlcclxue1xyXG4gICAgY29uc3Qgc2FtcGxlTm0gPSAoX3R4dDogcykgPT4gJy4vc2FtcGxlLScgKyBfdHh0ICsgJy50eHQnXHJcbiAgICBjb25zdCB6U2FtcGxlTHkgPSAoX3R4dCkgPT4geC5mdEx5KHNhbXBsZU5tKF90eHQpKVxyXG4gICAgY29uc3QgekVkdFNhbXBsZSA9IChfdHh0OiBzKSA9PiAoKSA9PiB4LmZ0QnJ3KHNhbXBsZU5tKF90eHQpKVxyXG4gICAgekVkdFNhbXBsZUV4cHJEaWMgPSB6RWR0U2FtcGxlKCdleHByRGljJylcclxuICAgIHpFZHRTYW1wbGVTcVRwID0gekVkdFNhbXBsZSgnc3FUcCcpXHJcbiAgICB6RWR0U2FtcGxlV2hlTHkgPSB6RWR0U2FtcGxlKCd3aGVMeScpXHJcbiAgICBjb25zdCBlcl9saW5lcyA9IChhOiBlcikgPT4geC5pdHJNYXAoZXJJdG1fbGluKShhKS5qb2luKCdcXHJcXG4nKVxyXG4gICAgekJyd0VyID0gZXIgPT4geC5zQnJ3KGVyX2xpbmVzKGVyKSlcclxuICAgIHpCcndTdyA9IChzd0dwLCB7IGZsZFN3LCBzdG10U3cgfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHAgPSBncF9saW5lcyhzd0dwKVxyXG4gICAgICAgIGNvbnN0IHMxID0geC5kaWNMaW5lcyhmbGRTdylcclxuICAgICAgICBjb25zdCBzMiA9IHguZGljTGluZXMoc3RtdFN3KVxyXG4gICAgICAgIHguc0Jyd0F0RmRyRm4oJ1N3JywgJ2dwJykocClcclxuICAgICAgICB4LnNCcndBdEZkckZuKCdTdycsICdmbGRTdycpKHMxKVxyXG4gICAgICAgIHguc0Jyd0F0RmRyRm4oJ1N3JywgJ3N0bXRTdycpKHMyKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGl4bGluX2xpbiA9ICh7IGl4LCBsaW4gfSkgPT4geC5zRm10KCdbP10/JywgaXgsIGxpbilcclxuICAgIGNvbnN0IGdwX2xpbmVzID0gKGE6IGdwKSA9PiB4Lml0ck1hcChpeGxpbl9saW4pKGEpLmpvaW4oJ1xcbicpXHJcbiAgICB6QnJ3R3AgPSB4LmNvbXBvc2UoZ3BfbGluZXMsIHguc0JydylcclxuICAgIGNvbnN0IGVyX2x5ID0gKGVyOiBlcikgPT4geC5pdHJNYXAoZXJJdG1fbGluKShlcikgYXMgbHlcclxuICAgIGNvbnN0IGVySXRtX2xpbiA9ICh7IGl4LCBlbmRNc2csIHNmeE1zZyB9KSA9PiB4LnNGbXQoJz86IGVuZE1zZ1s/XSBzZnhNc2dbP10nLCBpeCwgeC5zeUxpbihlbmRNc2cpLCB4LnN5TGluKHNmeE1zZykpXHJcbiAgICBjb25zdCBjdXJFeHBDb25zdE55ID0gKCkgPT4geC5manNFeHBDb25zdE55KF9fZmlsZW5hbWUpXHJcbiAgICBjb25zdCBjdXJDb25zdE55ID0gKCkgPT4geC5manNDb25zdE55KF9fZmlsZW5hbWUpXHJcbiAgICB6QnJ3Q3VyRXhwQ29uc3ROeSA9ICgpID0+IHgubHlCcncoY3VyRXhwQ29uc3ROeSgpKVxyXG4gICAgekJyd0N1ckNvbnN0TnkgPSAoKSA9PiB4Lmx5QnJ3KGN1ckNvbnN0TnkoKSlcclxufVxyXG4vLyFsaWI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmV4cG9ydCBjb25zdCBkaWNfZGZ0VmFsID0gPFQ+KGRmdDogVCkgPT4gKGRpYzogZGljPFQ+LCBrZXk6IHMpOiBUID0+IHtcclxuICAgIHJldHVybiBkZnRcclxufVxyXG5leHBvcnQgY29uc3QgbGluX3Rlcm1BeSA9IChfbGluOiBsaW4pOiB0ZXJtW10gPT4gX2xpbi50cmltKCkuc3BsaXQoL1xccysvKVxyXG5leHBvcnQgY29uc3QgbGluX2ZtVDNEdXBUZXJtU2V0ID0gKF9saW46IGxpbik6IHNzZXQgPT4ge1xyXG4gICAgbGV0IHRlcm1BeSA9IGxpbl90ZXJtQXkoX2xpbilcclxuICAgIHRlcm1BeS5zaGlmdCgpXHJcbiAgICB0ZXJtQXkuc2hpZnQoKVxyXG4gICAgcmV0dXJuIHguaXRyRHVwU2V0KHRlcm1BeSlcclxufVxyXG5leHBvcnQgY29uc3QgbGluX3Rlcm1Qb3NXZHRBeSA9IChhOiBsaW4pOiBwb3NXZHRbXSA9PiB7XHJcbiAgICBjb25zdCB6OiBwb3NXZHRbXSA9IFtdXHJcbiAgICBsZXQgaiA9IDBcclxuICAgIGxldCBwb3M6IG4gPSAwXHJcbiAgICBsZXQgd2R0OiBuXHJcbiAgICBsZXQgaV9saW4gPSBhXHJcbiAgICB4eDpcclxuICAgIGRvIHtcclxuICAgICAgICBpZiAoKGorKykgPiAxMDApXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9vcGluZyB0b28gbXVjaCcpXHJcbiAgICAgICAgbGV0IG0gPSBpX2xpbi5tYXRjaCgvKFxccyopKFxcUyspKC4qKS8pXHJcbiAgICAgICAgaWYgKG0gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgYnJlYWsgeHhcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IFt4LCBhMSwgYTIsIGEzXSA9IG1cclxuICAgICAgICBpZiAoYTEgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgd2R0ID0gYTEubGVuZ3RoXHJcbiAgICAgICAgICAgIHBvcyA9IHBvcyArIGExLmxlbmd0aFxyXG4gICAgICAgICAgICB6LnB1c2goeyBwb3MsIHdkdCB9KVxyXG4gICAgICAgICAgICBwb3MgPSBwb3MgKyBhMi5sZW5ndGhcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoYTMgIT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltcG9zc2libGUnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpX2xpbiA9IGEzXHJcbiAgICB9IHdoaWxlIChhLnRyaW0oKSAhPT0gXCJcIik7XHJcbiAgICByZXR1cm4gelxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGluX3QyUG9zV2R0ID0gKGE6IGxpbik6IHBvc1dkdCB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgYTEgPSBwb3NMaW5fUGFyc2VTcGMoeyBwb3M6IDAsIGxpbjogYSB9KVxyXG4gICAgY29uc3QgW3QxLCBhMl0gPSBwb3NMaW5fUGFyc2VUZXJtKGExKVxyXG4gICAgY29uc3QgYTMgPSBwb3NMaW5fUGFyc2VTcGMoYTIpXHJcbiAgICBjb25zdCBbdDIsIGE0XSA9IHBvc0xpbl9QYXJzZVRlcm0oYTMpXHJcbiAgICBpZiAodDIgPT09IG51bGwpIHJldHVybiBudWxsXHJcbiAgICByZXR1cm4geyBwb3M6IGEzLnBvcywgd2R0OiB0Mi5sZW5ndGggfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGluX0FkZE1yayA9IChhOiBsaW4sIHBvczogbiwgbGVuOiBuKTogbGluID0+IHtcclxuICAgIGNvbnN0IHMgPSB4Lm5TcGMocG9zIC0gYS5sZW5ndGgpXHJcbiAgICBjb25zdCBtID0gJ14nLnJlcGVhdChsZW4pXHJcbiAgICByZXR1cm4gYSArIHMgKyBtXHJcbn1cclxuZXhwb3J0IGNvbnN0IGxpbl9mbVQzRHVwVGVybU1ya3JMaW4gPSAoYTogbGluKTogbGluID0+IHtcclxuICAgIGNvbnN0IGR1cCA9IGxpbl9mbVQzRHVwVGVybVNldChhKVxyXG4gICAgY29uc3QgdGVybVBvc1dkdEF5ID0gbGluX3Rlcm1Qb3NXZHRBeShhKVxyXG4gICAgY29uc3QgdGVybUF5ID0gbGluX3Rlcm1BeShhKVxyXG4gICAgbGV0IHogPSBcIlwiXHJcbiAgICBmb3IgKGxldCBqID0gMjsgaiA8IHRlcm1BeS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIGxldCB0ZXJtID0gdGVybUF5W2pdXHJcbiAgICAgICAgaWYgKGR1cC5oYXModGVybSkpIHtcclxuICAgICAgICAgICAgY29uc3QgcG9zID0gdGVybVBvc1dkdEF5W2pdLnBvc1xyXG4gICAgICAgICAgICBjb25zdCBsZW4gPSB0ZXJtLmxlbmd0aFxyXG4gICAgICAgICAgICB6ID0gbGluX0FkZE1yayh6LCBwb3MsIGxlbilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gelxyXG59XHJcbmV4cG9ydCBjb25zdCBseV9zZGljID0gKGE6IGx5KSA9PiB7XHJcbiAgICBjb25zdCB6OiBzZGljID0gbmV3IE1hcCgpXHJcbiAgICBmb3IgKGxldCBsaW4gb2YgYSkge1xyXG4gICAgICAgIGNvbnN0IHsgdGVybTogaywgcmVtYWluTGluOiBzIH0gPSB4LmxpblNoaWZ0KGxpbilcclxuICAgICAgICB6LnNldChrLCBzKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGx5X2ZzdFRlcm1BeSA9IHguaXRyTWFwKHgubGluRnN0VGVybSkgYXMgKGx5OiBseSkgPT4gbHlcclxuXHJcbmV4cG9ydCBjb25zdCBseV9mc3RUZXJtRHVwU2V0ID0geC5jb21wb3NlKGx5X2ZzdFRlcm1BeSwgeC5pdHJEdXBTZXQpIGFzIChseTogbHkpID0+IHNzZXRcclxuXHJcbmV4cG9ydCBjb25zdCBwb3NMaW5fUGFyc2VTcGMgPSAoeyBwb3MsIGxpbiB9OiBwb3NMaW4pOiBwb3NMaW4gPT4ge1xyXG4gICAgZm9yICh2YXIgcCA9IHBvczsgcCA8IGxpbi5sZW5ndGg7IHArKykge1xyXG4gICAgICAgIGlmICgheC5pc1NwYyhsaW5bcF0pKVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgcG9zOiBwLCBsaW4gfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcG9zTGluX1BhcnNlVGVybSA9ICh7IHBvcywgbGluIH06IHBvc0xpbik6IFt0ZXJtLCBwb3NMaW5dID0+IHtcclxuICAgIGxldCB0ZXJtID0gJydcclxuICAgIGZvciAodmFyIHAgPSBwb3M7IHAgPCBsaW4ubGVuZ3RoOyBwKyspIHtcclxuICAgICAgICBjb25zdCBjID0gbGluW3BdXHJcbiAgICAgICAgaWYgKC9cXHMvLnRlc3QoYykpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0ZXJtICs9IGNcclxuICAgIH1cclxuICAgIHJldHVybiBbdGVybSwgeyBwb3M6IHAsIGxpbiB9XVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGluX3QxTXJrckxpbiA9IChhOiBsaW4sIG1zZzogcykgPT4ge1xyXG4gICAgaWYgKGEudHJpbUxlZnQoKSAhPT0gYSlcclxuICAgICAgICBhLnRyaW1cclxuICAgIHguZXIoJ2dpdmVuIHtsaW59IG11c3Qgbm90IGhhdmUgc3BhY2UgaW4gZnJvbnQnLCB7IGxpbjogYSB9KVxyXG4gICAgY29uc3QgW3Rlcm0sIHBvc0xpbl0gPSBwb3NMaW5fUGFyc2VUZXJtKHsgcG9zOiAwLCBsaW46IGEgfSlcclxuICAgIHJldHVybiAnXicucmVwZWF0KHRlcm0ubGVuZ3RoKSArICcgJyArIG1zZ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGluX3QyTXJrckxpbiA9IChhOiBsaW4sIG1zZzogcykgPT4ge1xyXG4gICAgY29uc3QgYTEgPSBsaW5fdDJQb3NXZHQoYSlcclxuICAgIGlmIChhMSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHguZXIoJ3tsaW59IGRvZXMgaGF2ZSAybmQgdGVybScsIHsgbGluOiBhIH0pXHJcbiAgICAgICAgcmV0dXJuICd7bGlufSBkb2VzIG5vdCBoYXZlIDJuZCB0ZXJtOiBbJyArIGEgKyAnXSdcclxuICAgIH1cclxuICAgIGNvbnN0IHsgcG9zLCB3ZHQgfSA9IGExXHJcbiAgICBjb25zdCBjaHIgPSBwb3MgPj0gMyA/ICctJyA6ICcgJ1xyXG4gICAgcmV0dXJuIGNoci5yZXBlYXQocG9zKSArICdeJy5yZXBlYXQod2R0KSArICcgJyArIG1zZ1xyXG59XHJcbi8vIXRzdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuZnVuY3Rpb24gdHN0X19zcXRwUnNsdCgpIHtcclxuICAgIC8vIHQxKCk7IHQyKCk7IFxyXG4gICAgdDEoKTtcclxuICAgIC8vIHQ0KCk7IHQ1KCk7XHJcbiAgICByZXR1cm5cclxuICAgIGZ1bmN0aW9uIHIoZXhwOiBzcXRwUnNsdCwgc3F0cDogcykge1xyXG4gICAgICAgIGNvbnN0IHsgdnRwLCBzcWwgfSA9IHNxdHBSc2x0KHNxdHApXHJcbiAgICAgICAgYXNzZXJ0SXNFcShleHAudnRwLCB2dHApXHJcbiAgICAgICAgYXNzZXJ0SXNFcShleHAuc3FsLCBzcWwpXHJcbiAgICAgICAgZGVidWdnZXJcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHQxKCkge1xyXG4gICAgICAgIGlmIChmYWxzZSkge1xyXG4gICAgICAgICAgICAvL3NpZEJydyhcInNxdHBSc2x0ICMgdDEgIyBzcXRwXCIpXHJcbiAgICAgICAgICAgIHNpZEJydyhcInNxdHBSc2x0ICMgdDEgIyBleHAuc3FsXCIpXHJcbiAgICAgICAgICAgIHNpZEJydyhcInNxdHBSc2x0ICMgdDEgIyBleHAudnRwXCIpXHJcbiAgICAgICAgICAgIGRlYnVnZ2VyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNxdHAgPSBzaWRTdHIoXCJzcXRwUnNsdCAjIHQxICMgc3F0cFwiKVxyXG4gICAgICAgIGNvbnN0IGV4cCA9IHtcclxuICAgICAgICAgICAgc3FsOiBzaWRTdHIoXCJzcXRwUnNsdCAjIHQxICMgZXhwLnNxbFwiKSxcclxuICAgICAgICAgICAgdnRwOiBzaWRTdHIoXCJzcXRwUnNsdCAjIHQxICMgZXhwLnZ0cFwiKSxcclxuICAgICAgICB9XHJcbiAgICAgICAgcihleHAsIHNxdHApXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0MigpIHtcclxuICAgICAgICBjb25zdCBzcXRwID1cclxuICAgICAgICAgICAgJyU/QnJrTWJyIDBcXG4nICtcclxuICAgICAgICAgICAgJz9CcmtNYnIgMFxcbicgK1xyXG4gICAgICAgICAgICAnJT9CcmtNYnIgMFxcbicgK1xyXG4gICAgICAgICAgICAnPz9CcmtTdG8gMFxcbidcclxuICAgICAgICBjb25zdCBleHAgPSB7XHJcbiAgICAgICAgICAgIHZ0cDogJycsXHJcbiAgICAgICAgICAgIHNxbDogJydcclxuICAgICAgICB9XHJcbiAgICAgICAgcihleHAsIHNxdHApXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0MygpIHtcclxuICAgICAgICBjb25zdCBzcXRwID1cclxuICAgICAgICAgICAgJyU/QnJrTWJyIDBcXG4nICtcclxuICAgICAgICAgICAgJyU/QnJrWFggMFxcbicgK1xyXG4gICAgICAgICAgICAnJUJya01iciAwXFxuJyArXHJcbiAgICAgICAgICAgICcjP0Jya01iciAwXFxuJyArXHJcbiAgICAgICAgICAgICc/P0Jya1N0byAwXFxuJ1xyXG4gICAgICAgIGNvbnN0IGV4cCA9IHtcclxuICAgICAgICAgICAgdnRwOlxyXG4gICAgICAgICAgICAgICAgJyU/QnJrTWJyIDBcXHJcXG4nICtcclxuICAgICAgICAgICAgICAgICclP0Jya1hYIDBcXHJcXG4nICtcclxuICAgICAgICAgICAgICAgICclQnJrTWJyIDBcXHJcXG4nICtcclxuICAgICAgICAgICAgICAgICcjP0Jya01iciAwXFxyXFxuJyArXHJcbiAgICAgICAgICAgICAgICAnXi0tLS0gcHJlZml4IG11c3QgYmUgKCUpXFxyXFxuJyArXHJcbiAgICAgICAgICAgICAgICAnPz9CcmtTdG8gMFxcclxcbicgK1xyXG4gICAgICAgICAgICAgICAgJ14tLS0tIHByZWZpeCBtdXN0IGJlICglKScsXHJcbiAgICAgICAgICAgIHNxbDogJydcclxuICAgICAgICB9XHJcbiAgICAgICAgcihleHAsIHNxdHApXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0NCgpIHtcclxuICAgICAgICBjb25zdCBzcXRwID1cclxuICAgICAgICAgICAgJyU/QnJrRGl2ICBYWFxcbicgK1xyXG4gICAgICAgICAgICAnJVN1bUx2bCAgWVxcbicgK1xyXG4gICAgICAgICAgICAnJT9NYnJFbWFpbCAxJ1xyXG4gICAgICAgIGNvbnN0IGV4cCA9IHtcclxuICAgICAgICAgICAgdnRwOlxyXG4gICAgICAgICAgICAgICAgJyU/QnJrRGl2ICBYWFxcclxcbicgK1xyXG4gICAgICAgICAgICAgICAgJy0tLS0tLS0tLS1eXiBtdXN0IGJlIDAgb3IgMSBmb3IgcHJlZml4IGlzIFslP11cXHJcXG4nICtcclxuICAgICAgICAgICAgICAgICclU3VtTHZsICBZXFxyXFxuJyArXHJcbiAgICAgICAgICAgICAgICAnJT9NYnJFbWFpbCAxJyxcclxuICAgICAgICAgICAgc3FsOiAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgICByKGV4cCwgc3F0cClcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHQ1KCkge1xyXG4gICAgICAgIGNvbnN0IHNxdHAgPVxyXG4gICAgICAgICAgICAnPyNTRUwjYWEgMVxcbicgK1xyXG4gICAgICAgICAgICAnPyNVUEQjYmIgT1IgMVxcbicgK1xyXG4gICAgICAgICAgICAnP0FBIEFORCAxJ1xyXG4gICAgICAgIGNvbnN0IGV4cCA9IHtcclxuICAgICAgICAgICAgdnRwOlxyXG4gICAgICAgICAgICAgICAgJyU/QnJrRGl2ICBYWFxcclxcbicgK1xyXG4gICAgICAgICAgICAgICAgJy0tLS0tLS0tLS1eXiBtdXN0IGJlIDAgb3IgMSBmb3IgcHJlZml4IGlzIFslP11cXHJcXG4nICtcclxuICAgICAgICAgICAgICAgICclU3VtTHZsICBZXFxyXFxuJyArXHJcbiAgICAgICAgICAgICAgICAnJT9NYnJFbWFpbCAxJyxcclxuICAgICAgICAgICAgc3FsOiAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgICByKGV4cCwgc3F0cClcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB0c3RfX3h3d3dfc3coKSB7XHJcbiAgICBjb25zdCBiZGljID0gbmV3IE1hcDxzLCBiPihbWyc/IycsIHRydWVdLCBbJ2InLCBmYWxzZV1dKVxyXG4gICAgY29uc3QgeyBmbGRTdywgc3RtdFN3IH0gPSB4d3d3X3N3KGJkaWMpXHJcbiAgICBhc3NlcnRJc0VxKGZsZFN3LCBuZXcgTWFwPHMsIGI+KFtbJ2InLCBmYWxzZV1dKSlcclxuICAgIGFzc2VydElzRXEoc3RtdFN3LCBuZXcgTWFwPHMsIGI+KFtbJz8jJywgdHJ1ZV1dKSlcclxufVxyXG5mdW5jdGlvbiB0c3RfX3hzc3N0X3RibE5tS2V5KCkge1xyXG4gICAgY29uc3QgbHkgPSBbJ2ZtICNhYSddXHJcbiAgICBjb25zdCBzdG10U3cgPSBuZXcgTWFwPHMsIGI+KFtbJz8jYWEnLCBmYWxzZV1dKVxyXG4gICAgY29uc3QgYWEgPSB4c3NzdF90YmxObUtleShseSlcclxufVxyXG5mdW5jdGlvbiB0c3RfX2xpbl90MlBvc1dkdCgpIHtcclxuICAgIGxldCBsaW46IGxpblxyXG4gICAgbGV0IGFjdDogcG9zV2R0IHwgbnVsbFxyXG4gICAgbGV0IGV4cDogcG9zV2R0XHJcbiAgICBmdW5jdGlvbiByKCkge1xyXG4gICAgICAgIGFzc2VydElzRXEoZXhwLCBhY3QpXHJcbiAgICAgICAgZXhwZWN0KGFjdCkudG9FcXVhbCh7IHBvczogNSwgd2R0OiAyIH0pXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0MSgpIHtcclxuICAgICAgICBsaW4gPSAnYWFhICBiYidcclxuICAgICAgICBhY3QgPSBsaW5fdDJQb3NXZHQobGluKVxyXG4gICAgICAgIGV4cCA9IHsgcG9zOiA1LCB3ZHQ6IDIgfVxyXG4gICAgICAgIHIoKVxyXG4gICAgfVxyXG4gICAgdDEoKVxyXG59XHJcbmZ1bmN0aW9uIHRzdF9fbGluX3QyTXJrTGluKCkge1xyXG4gICAgbGV0IGxpbjogbGluLCBhY3Q6IGxpbiwgZXhwOiBsaW4sIG1zZzogc1xyXG4gICAgdDEoKVxyXG4gICAgdDIoKVxyXG4gICAgdDMoKVxyXG4gICAgZGVidWdnZXJcclxuICAgIHJldHVyblxyXG4gICAgZnVuY3Rpb24gcigpIHtcclxuICAgICAgICBhY3QgPSBsaW5fdDJNcmtyTGluKGxpbiwgbXNnKVxyXG4gICAgICAgIGFzc2VydElzRXEoZXhwLCBhY3QpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0MSgpIHtcclxuICAgICAgICBsaW4gPSAnYWFhICBiYidcclxuICAgICAgICBleHAgPSAnLS0tLS1eXiBhYSdcclxuICAgICAgICBtc2cgPSAnYWEnXHJcbiAgICAgICAgcigpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0MigpIHtcclxuICAgICAgICBsaW4gPSAnYSBiYidcclxuICAgICAgICBleHAgPSAnICBeXiBhYSdcclxuICAgICAgICBtc2cgPSAnYWEnXHJcbiAgICAgICAgcigpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0MygpIHtcclxuICAgICAgICBsaW4gPSAnYWEgYmInXHJcbiAgICAgICAgZXhwID0gJy0tLV5eIGFhJ1xyXG4gICAgICAgIG1zZyA9ICdhYSdcclxuICAgICAgICByKClcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB0c3RfX3hiX2dwQnJrKCkge1xyXG4gICAgdDEoJ2JydycpXHJcbiAgICBmdW5jdGlvbiByKGV4cDogZ3BCcmssIGNsbkx5OiBseSkge1xyXG4gICAgICAgIGNvbnN0IGFjdCA9IHhiX2dwQnJrKGNsbkx5KVxyXG4gICAgICAgIGNvbnN0IG55ID0geC5vUHJwTnkoYWN0KVxyXG4gICAgICAgIGZvciAobGV0IHBycE5tIG9mIG55KSB7XHJcbiAgICAgICAgICAgIGFzc2VydElzRXEoZXhwW3BycE5tXSwgYWN0W3BycE5tXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVidWdnZXJcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHQxKGJydz86ICdicncnKSB7XHJcbiAgICAgICAgY29uc3QgaWQxID0gJ3hiX2dwQnJrICMgdDEgIyBleHAnXHJcbiAgICAgICAgY29uc3QgaWQyID0gJ3hiX2dwQnJrICMgdDEgIyBjbG5MeSdcclxuICAgICAgICBpZiAoYnJ3PT09J2JydycpIHtcclxuICAgICAgICAgICAgdmlkQnJ3KGlkMSlcclxuICAgICAgICAgICAgc2lkQnJ3KGlkMilcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZXhwOiBncEJyayA9IHZpZFZhbChpZDEpXHJcbiAgICAgICAgY29uc3QgY2xuTHkgPSBzU3BsaXRMaW5lcyhzaWRTdHIoaWQyKSlcclxuICAgICAgICByKGV4cCwgY2xuTHkpXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRzdF9feHdfc3coKSB7XHJcbiAgICB0MSgpXHJcbiAgICByZXR1cm5cclxuICAgIGZ1bmN0aW9uIHIoZXhwLCBzd0dwLCBwbSkge1xyXG4gICAgICAgIGNvbnN0IGFjdCA9IHh3X3N3KHN3R3AsIHBtKVxyXG4gICAgICAgIGFzc2VydElzRXEoZXhwLCBhY3QpXHJcblxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdDEoKSB7XHJcblxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHRzdF9feXd3X3doZUFuZE9yTGluZXNQcm1BeSgpIHtcclxuICAgIGlmICh0cnVlKSB7XHJcbiAgICAgICAgY29uc3Qgd2hlTHkgPSB6U2FtcGxlTHkoJ3doZUx5JylcclxuICAgICAgICBjb25zdCBleHByRGljOiBleHByRGljID0geC5seVNkaWMoelNhbXBsZUx5KCdleHByRGljJykpXHJcblxyXG4gICAgICAgIGNvbnN0IGV4cCA9IHt9XHJcbiAgICAgICAgY29uc3QgYWN0ID0geXd3X3doZUFuZE9yTGluZXNfcHJtQXkod2hlTHksIGV4cHJEaWMpXHJcbiAgICAgICAgYXNzZXJ0SXNFcShleHAsIGFjdClcclxuICAgIH1cclxufVxyXG4vLyFydW5Uc3RcclxuLy9pbXBvcnQgeyBmanNfdXBkRnRzTWFpblRzdElmU3RtdCB9IGZyb20gJy4vc2NhblBnbSc7IGZqc191cGRGdHNNYWluVHN0SWZTdG10KF9fZmlsZW5hbWUpXHJcbmlmIChtb2R1bGUuaWQgPT09ICcuJykge1xyXG4gICAgdHN0X194Yl9ncEJyaygpXHJcbiAgICAvKlxyXG4gICAgICAgIHRzdF9feHNzc3RfdGJsTm1LZXkoKVxyXG4gICAgICAgIHRzdF9feHd3d19zdygpXHJcbiAgICAgICAgdHN0X195d3dfd2hlQW5kT3JMaW5lc1BybUF5KClcclxuICAgICAgICB0c3RfX3h3X3N3KClcclxuICAgICAgICB0c3RfX2xpbl90Mk1ya0xpbigpXHJcbiAgICAgICAgdHN0X19saW5fdDJQb3NXZHQoKVxyXG4gICAgICAgICovXHJcbiAgICAvLyAgICB0c3RfX3NxdHBSc2x0KClcclxuICAgIGRpY19kZnRWYWwgICAgICAgICAgICAgICAgICAgICAgICAvLyA9IDxUPihkZnQ6IFQpID0+IChkaWM6IGRpYzxUPiwga2V5OiBzKTogVCA9PiB7XHJcbiAgICBsaW5fQWRkTXJrICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoYTogbGluLCBwb3M6IG4sIGxlbjogbik6IGxpbiA9PiB7XHJcbiAgICBsaW5fZm1UM0R1cFRlcm1NcmtyTGluICAgICAgICAgICAgLy8gPSAoYTogbGluKTogbGluID0+IHtcclxuICAgIGxpbl9mbVQzRHVwVGVybVNldCAgICAgICAgICAgICAgICAvLyA9IChfbGluOiBsaW4pOiBzc2V0ID0+IHtcclxuICAgIGxpbl90MU1ya3JMaW4gICAgICAgICAgICAgICAgICAgICAvLyA9IChhOiBsaW4sIG1zZzogcykgPT4ge1xyXG4gICAgbGluX3QyTXJrckxpbiAgICAgICAgICAgICAgICAgICAgIC8vID0gKGE6IGxpbiwgbXNnOiBzKSA9PiB7XHJcbiAgICBsaW5fdDJQb3NXZHQgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoYTogbGluKTogcG9zV2R0IHwgbnVsbCA9PiB7XHJcbiAgICBsaW5fdGVybUF5ICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX2xpbjogbGluKTogdGVybVtdID0+IF9saW4udHJpbSgpLnNwbGl0KC9cXHMrLylcclxuICAgIGxpbl90ZXJtUG9zV2R0QXkgICAgICAgICAgICAgICAgICAvLyA9IChhOiBsaW4pOiBwb3NXZHRbXSA9PiB7XHJcbiAgICBseV9mc3RUZXJtQXkgICAgICAgICAgICAgICAgICAgICAgLy8gPSB4Lml0ck1hcCh4LmxpbkZzdFRlcm0pIGFzIChseTogbHkpID0+IGx5XHJcbiAgICBseV9mc3RUZXJtRHVwU2V0ICAgICAgICAgICAgICAgICAgLy8gPSB4LmNvbXBvc2UobHlfZnN0VGVybUF5LCB4Lml0ckR1cFNldCkgYXMgKGx5OiBseSkgPT4gc3NldFxyXG4gICAgbHlfc2RpYyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vID0gKGE6IGx5KSA9PiB7XHJcbiAgICBwb3NMaW5fUGFyc2VTcGMgICAgICAgICAgICAgICAgICAgLy8gPSAoeyBwb3MsIGxpbiB9OiBwb3NMaW4pOiBwb3NMaW4gPT4ge1xyXG4gICAgcG9zTGluX1BhcnNlVGVybSAgICAgICAgICAgICAgICAgIC8vID0gKHsgcG9zLCBsaW4gfTogcG9zTGluKTogW3Rlcm0sIHBvc0xpbl0gPT4ge1xyXG4gICAgc3FfQU5EICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vID0gJ0FORCdcclxuICAgIHNxX0RJUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9ICdESVMnXHJcbiAgICBzcV9EUlAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAnRFJQJ1xyXG4gICAgc3FfRlJPICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vID0gJ0ZSTydcclxuICAgIHNxX0dSTyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9ICdHUk8nXHJcbiAgICBzcV9KT0kgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAnSk9JJ1xyXG4gICAgc3FfTEVGICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vID0gJ0xFRidcclxuICAgIHNxX09SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9ICdPUidcclxuICAgIHNxX1NFTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9ICdTRUwnXHJcbiAgICBzcV9VUEQgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAnVVBEJ1xyXG4gICAgc3FfV0hFICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vID0gJ1dIRSdcclxuICAgIHNxdHBSc2x0ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChfc3F0cDogc3F0cCk6IHsgdnRwOiBzLCBzcWw6IHMgfSA9PiB7XHJcbiAgICB4Yl9ncEJyayAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX2Nsbkx5OiBjbG5MeSk6IGdwQnJrID0+IHtcclxuICAgIHhiYl9icmtJbnRvR3B5ICAgICAgICAgICAgICAgICAgICAvLyA9IChfbm9SbWtHcDogZ3ApOiBncFtdID0+IHtcclxuICAgIHhiYnJfcm12Um1rTGluICAgICAgICAgICAgICAgICAgICAvLyA9IChhOiBncCkgPT4ge1xyXG4gICAgeGJnX2dwICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vID0gKF9jbG5MeTogY2xuTHkpID0+IHtcclxuICAgIHhibl9ub1JtayAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChfZ3A6IGdwKSA9PiB7XHJcbiAgICB4YnRfYmtUeSAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX2x5OiBseSk6IGVCa1R5ID0+IHtcclxuICAgIHhidHJfaXNQbUx5ICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChhOiBseSkgPT4geC5seUhhc01halBmeChcIiVcIikoYSlcclxuICAgIHhidHJfaXNSbUx5ICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChhOiBseSkgPT4geC5pdHJQcmVkSXNBbGxUcnVlKHguaXNSbWtMaW4pKGEpXHJcbiAgICB4YnRyX2lzU3FMeSAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoYTogbHkpID0+IHtcclxuICAgIHhidHJfaXNTd0x5ICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChhOiBseSkgPT4geC5seUhhc01halBmeChcIj9cIikoYSlcclxuICAgIHhidHJ4X3ggICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9IHguc1NwbGl0U3BjKFwiRFJQIFVQRCBTRUwgRElTXCIpXHJcbiAgICB4Y19jbG5MeSAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSB4LmNvbXBvc2UoeC5pdHJNYXAoeGNyX3Jtdk1zZyksIHguaXRyUm12RW1wKSBhcyAoYTogbHkpID0+IGx5XHJcbiAgICB4Y3Jfcm12TXNnICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoYTogbGluKSA9PiB7XHJcbiAgICB4ZV9lbmRNc2dFciAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoZW5kTXNnOiBzKSA9PiAoYTogZ3BbXSk6IGVyID0+IHguaXRyTWFwKHhlaV9lbmRNc2dFckl0bShlbmRNc2cpKShhKVxyXG4gICAgeGVpX2VuZE1zZ0VySXRtICAgICAgICAgICAgICAgICAgIC8vID0gKGVuZE1zZzogcykgPT4gKGE6IGdwKTogZXJJdG0gPT4geV9lbmRNc2dFckl0bSh4LmF5TGFzKGEpLml4LCBlbmRNc2cpXHJcbiAgICB4cF9wbSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX3BtR3A6IHBtR3ApOiBbZXIsIHBtXSA9PiB7XHJcbiAgICB4cHBfcG1Td1BmeEVyICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX2dwOiBncCk6IFtlciwgZ3BdID0+IHtcclxuICAgIHhwcCR0X2VyVHdvVGVybSAgICAgICAgICAgICAgICAgICAvLyA9IChfZXJHcDogZ3ApOiBlciA9PiB7XHJcbiAgICB4cHAkel9lclplck9uZSAgICAgICAgICAgICAgICAgICAgLy8gPSAoX2VyR3A6IGdwKTogZXIgPT4ge1xyXG4gICAgeHBwaV9pc1BtU3dQZnhFciAgICAgICAgICAgICAgICAgIC8vID0gKHsgaXgsIGxpbiB9OiBpeGxpbik6IGIgPT4ge1xyXG4gICAgeHBwdF9pc1BtU3dQZnhfdHdvVGVybXNFciAgICAgICAgIC8vID0gKF9peGxpbjogaXhsaW4pOiBiID0+IHtcclxuICAgIHhwcHpfaXNQbVN3UGZ4X3plck9uZUVyICAgICAgICAgICAvLyA9IChfaXhsaW46IGl4bGluKTogYiA9PiB7XHJcbiAgICB4c19zcWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX3NxR3A6IHNxR3BbXSwgX3BtOiBwbSwgX3N3OiBzdyk6IFtlciwgc3FsXSA9PiB7XHJcbiAgICB4c3Nfc3RtdCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX3NxR3A6IHNxR3AsIF9zdzogc3cpOiBbZXIsIHN0bXRdID0+IHtcclxuICAgIHhzc2RfZHJwU3RtdCAgICAgICAgICAgICAgICAgICAgICAvLyA9IChhOiBkcnBHcCk6IFtlciwgc3RtdF0gPT4ge1xyXG4gICAgeHNzc19zZWxPckRpc1N0bXQgICAgICAgICAgICAgICAgIC8vID0gKF9zZWxHcDogc2VsR3AsIF9zZWxUeTogZVNlbFR5LCBfc3c6IHN3KTogW2VyLCBzcWxdID0+IHtcclxuICAgIHhzc3NiX2JyayAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChfZ3A6IGdwLCBfcGZ4QXk6IHN5LCBfb3B0aW9uYWw/OiAnT3B0aW9uYWwnKTogW3N5LCBncCwgZXJdID0+IHtcclxuICAgIHhzc3NiZV9taXNzaW5nTHlFciAgICAgICAgICAgICAgICAvLyA9IChzeTogc3ksIF9peDogbiwgX29wdGlvbmFsPzogJ09wdGlvbmFsJyk6IGVyID0+IHtcclxuICAgIHhzc3NmX2Zyb1BociAgICAgICAgICAgICAgICAgICAgICAvLyA9IChfZnJvTHk6IGx5KSA9PiB7XHJcbiAgICB4c3NzZ19ncm9QaHIgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX2dyb0x5OiBseSwgX2V4cHJEaWM6IGV4cHJEaWMpOiBwaHJhc2UgPT4ge1xyXG4gICAgeHNzc2pfam9pUGhyICAgICAgICAgICAgICAgICAgICAgIC8vID0gKF9qb2lMeTogbHkpID0+IHtcclxuICAgIHhzc3NzX3NlbFBociAgICAgICAgICAgICAgICAgICAgICAvLyA9IChfc2VsTHk6IGx5LCBfc2VsVHk6IGVTZWxUeSwgX2ZsZFN3OiBmbGRTdywgX2V4cHJEaWM6IGV4cHJEaWMpOiBbZXIsIHNdID0+IHtcclxuICAgIHhzc3NzZl9mbGRzTGluZXMgICAgICAgICAgICAgICAgICAvLyA9IChfZm55OiBmbGRObVtdLCBfZmxkU3c6IGZsZFN3LCBfZXhwckRpYzogZXhwckRpYyk6IGxpbmVzID0+IHtcclxuICAgIHhzc3NzZl9mbnkgICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChfc2VsTHk6IGx5KTogZmxkTm1bXSA9PiB7XHJcbiAgICB4c3Nzc2ZsX2x5UGFpciAgICAgICAgICAgICAgICAgICAgLy8gPSAoX2ZueTogZmxkTm1bXSwgX2ZsZFN3OiBmbGRTdywgX2V4cHJEaWM6IGV4cHJEaWMpOiBbbHksIGx5XSA9PiB7XHJcbiAgICB4c3NzdF90YmxObUtleSAgICAgICAgICAgICAgICAgICAgLy8gPSAobHk6IGx5KTogdGJsTm1LZXkgPT4ge1xyXG4gICAgeHNzdF9zdG10VHkgICAgICAgICAgICAgICAgICAgICAgIC8vID0gKF9zcUdwOiBzcUdwKTogZVN0bXRUeSB8IG51bGwgPT4ge1xyXG4gICAgeHNzdV91cGRTdG10ICAgICAgICAgICAgICAgICAgICAgIC8vID0gKF91cGRHcDogdXBkR3AsIF9zdzogc3cpOiBbZXIsIHN0bXRdID0+IHtcclxuICAgIHhzc3ViX2JyayAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChfZ3A6IGdwKTogW2VyLCBseSwgZ3BdID0+IFtbXSwgW10sIFtdXVxyXG4gICAgeHNzdWpfam9pUGhyICAgICAgICAgICAgICAgICAgICAgIC8vID0gKF9seTogbHkpOiBbZXIsIHBocmFzZV0gPT4ge1xyXG4gICAgeHNzdWpsX2pvaVBockxpbmVzICAgICAgICAgICAgICAgIC8vID0gKF9saW46IGxpbik6IFtlciwgcGhyYXNlXSA9PiBbW10sICcnXVxyXG4gICAgeHNzdXNfc2V0UGhyICAgICAgICAgICAgICAgICAgICAgIC8vID0gKF9seTogbHkpOiBbZXIsIHBocmFzZV0gPT4gW1tdLCAnJ11cclxuICAgIHhzc3V0X3RibE5tS2V5ICAgICAgICAgICAgICAgICAgICAvLyA9IChseTogbHkpOiB0YmxObUtleSA9PiB7XHJcbiAgICB4c3N1dV91cGRQaHIgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX2x5OiBseSk6IFtlciwgcGhyYXNlXSA9PiB7XHJcbiAgICB4c3N1dXRfdGJsTm0gICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX2ZzdExpbjogbGluKTogcyB8IG51bGwgPT4ge1xyXG4gICAgeHNzdXdfd2hlUGhyICAgICAgICAgICAgICAgICAgICAgIC8vID0gKF9seTogbHkpOiBbZXIsIHBocmFzZV0gPT4gW1tdLCAnJ11cclxuICAgIHh2X3Z0cCAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChfbHk6IGx5LCBfZXI6IGVyKTogcyA9PiB7XHJcbiAgICB4dmFfbGVmdEx5QXlBbGlnbkx5ICAgICAgICAgICAgICAgLy8gPSAoX2x5QXk6IGx5W10pID0+IHsgLy8/XHJcbiAgICB4dmF3X3dkdCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAobHlBeTogbHlbXSk6IHdkdCA9PiB7XHJcbiAgICB4dmxfbGVmdEx5QXkgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX2x5OiBseSwgX2VyOiBlcik6IGx5W10gPT4ge1xyXG4gICAgeHZsZV9lbmRNc2dFckl0bSAgICAgICAgICAgICAgICAgIC8vID0gKGVyOiBlciwgaXg6IG4pID0+IHtcclxuICAgIHh2bV9tZ2UgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChsZWZ0THk6IGx5LCByaWdodEx5OiBseSk6IGx5ID0+IHtcclxuICAgIHh2cl9yaWdodEx5QXkgICAgICAgICAgICAgICAgICAgICAvLyA9IChseTogbHksIGVyOiBlcik6IGx5W10gPT4ge1xyXG4gICAgeHZyc19zZnhNc2dFciAgICAgICAgICAgICAgICAgICAgIC8vID0gKGVyOiBlciwgaXg6IG4pID0+IHtcclxuICAgIHh3X3N3ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChfZ3A6IGdwLCBfcG06IHBtKTogW2VyLCBzd10gPT4ge1xyXG4gICAgeHdkX3ZkdEZtVDNEdXBFciAgICAgICAgICAgICAgICAgIC8vID0gKF9ncDogZ3ApOiBbZXIsIGdwXSA9PiB7XHJcbiAgICB4d2RpX2lzRm1UM0R1cFRlcm1FciAgICAgICAgICAgICAgLy8gPSAoX2l4bGluOiBpeGxpbik6IGIgPT4gbGluX2ZtVDNEdXBUZXJtU2V0KF9peGxpbi5saW4pLnNpemUgPiAwXHJcbiAgICB4d29fdmR0T3BfbXVzdEJlX0FORF9PUl9FUV9ORSAgICAgLy8gPSAoX2dwOiBncCk6IFtlciwgZ3BdID0+IHtcclxuICAgIHh3b29fb3BJc0VyICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChfaXhsaW46IGl4bGluKTogYiA9PiB4d29vc19zd09wKF9peGxpbikgPT09IG51bGxcclxuICAgIHh3b29zX3N3T3AgICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChfaXhsaW46IGl4bGluKTogZVN3T3AgfCBudWxsID0+IHtcclxuICAgIHh3cF92ZHRQZnhtdXN0QmVFaXRoZXJfU0VMX29yX1VQRCAvLyA9IChfZ3A6IGdwKTogW2VyLCBncF0gPT4ge1xyXG4gICAgeHd3X3N3ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vID0gKF9seTogbHksIF9wbTogcG0pOiBzdyA9PiB7XHJcbiAgICB4d3dlX2V2bExpbiAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX2xpbjogbGluLCBfcG06IHBtLCBfYmRpYzogTWFwPHMsIGI+KTogeyBrZXk6IHMsIGJvb2xPcHQ6IGIgfCBudWxsIH0gPT4ge1xyXG4gICAgeHd3d19zdyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vID0gKGE6IGJkaWMpOiBzdyA9PiB7XHJcbiAgICB5X2VuZE1zZ0VySXRtICAgICAgICAgICAgICAgICAgICAgLy8gPSAoaXg6IG4sIGVuZE1zZ1N0cjogcyk6IGVySXRtID0+IHsgcmV0dXJuIHsgaXgsIGVuZE1zZzogW2VuZE1zZ1N0cl0sIHNmeE1zZzogW10gfSB9XHJcbiAgICB5X2V4cHJEaWMgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAobHk6IGx5KTogZXhwckRpYyA9PiB4LnBpcGUobHkpKHguaXRyV2hlcmUoeC5zSGFzUGZ4KCckJykpLCB4Lmx5U2RpYylcclxuICAgIHlfZ3BfbHkgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChhOiBncCkgPT4geC5pdHJNYXAoeC5vUHJwKFwibGluXCIpKShhKSBhcyBseVxyXG4gICAgeV9wZnhFciAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vID0gKF9ncDogZ3AsIF9wZng6IHMpOiBbZXIsIGdwXSA9PiB7XHJcbiAgICB5X3BoclBmeCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX3BmeDogcGZ4LCBfbmV3TGluZT86ICdOZXdMaW5lJykgPT4gKF9uZXdMaW5lID09PSAnTmV3TGluZScpID8gX3BmeCArICdcXHJcXG4nIDogX3BmeCArIHgublNwYygxMCAtIF9wZngubGVuZ3RoKVxyXG4gICAgeV9zZnhNc2dFckl0bSAgICAgICAgICAgICAgICAgICAgIC8vID0gKGl4OiBuLCBzZnhNc2dTdHI6IHMpOiBlckl0bSA9PiB7IHJldHVybiB7IGl4LCBlbmRNc2c6IFtdLCBzZnhNc2c6IFtzZnhNc2dTdHJdIH0gfVxyXG4gICAgeV93aGVBbmRPckxpbiAgICAgICAgICAgICAgICAgICAgIC8vID0gKF9saW46IGxpbiwgX2V4cHJEaWM6IGV4cHJEaWMpOiBsaW4gPT4gJycgLy8/XHJcbiAgICB5X3doZVJzdExpbmVzICAgICAgICAgICAgICAgICAgICAgLy8gPSAocmVtYWluTGluOiBsaW4sIF9leHByRGljOiBleHByRGljKSA9PiAnJ1xyXG4gICAgeWRfZHVwRnN0VGVybUVyICAgICAgICAgICAgICAgICAgIC8vID0gKF9ncDogZ3ApOiBbZXIsIGdwXSA9PiB7XHJcbiAgICB5ZGVfZXJHcCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX2dwOiBncCwgX2ZzdFRlcm06IHMpOiBbZXIsIGdwXSA9PiB7XHJcbiAgICB5ZGVlX2VyR3AgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX2dwOiBncCwgaXhzZXQ6IFNldDxuPik6IFtlciwgZ3BdID0+IHtcclxuICAgIHl3X3doZVBociAgICAgICAgICAgICAgICAgICAgICAgICAvLyA9IChfd2hlTHk6IGx5LCBfZXhwckRpYzogZXhwckRpYyk6IGxpbmVzID0+IHtcclxuICAgIHl3JGFfYW5kT3JMeSAgICAgICAgICAgICAgICAgICAgICAvLyA9ICgpOiBseSA9PiBbXSAvLz9cclxuICAgIHl3JHdfd2hlTGluICAgICAgICAgICAgICAgICAgICAgICAvLyA9ICgpOiBsaW4gPT4gJycgLy8/XHJcbiAgICB5d2FfYW5kT3JMaW5lcyAgICAgICAgICAgICAgICAgICAgLy8gPSAoX3doZUx5OiBseSwgX2V4cHJEaWM6IGV4cHJEaWMpOiBsaW5lcyA9PiB7XHJcbiAgICB5d2xfd2hlQW5kT3JMaW5lcyAgICAgICAgICAgICAgICAgLy8gPSAoX2E6IHdoZUFuZE9yTGluZXNQcm0pOiBsaW5lcyA9PiB7XHJcbiAgICB5d3dfd2hlQW5kT3JMaW5lc19wcm1BeSAgICAgICAgICAgLy8gPSAoX3doZUx5OiBseSwgX2V4cHJEaWMpOiAod2hlQW5kT3JMaW5lc1BybSB8IGVyKVtdID0+XHJcbiAgICB5d3dfd2hlUGhyICAgICAgICAgICAgICAgICAgICAgICAgLy8gPSAoX3doZUx5OiBseSwgX2V4cHJEaWM6IGV4cHJEaWMpOiBsaW5lcyA9PiB7XHJcbiAgICB5d3dsX3doZUFuZE9yTGluX3BybSAgICAgICAgICAgICAgLy8gPSAoX3doZUxpbjogbGluKTogd2hlQW5kT3JMaW5lc1BybSB8IGVyID0+IHtcclxufVxyXG4iXX0=