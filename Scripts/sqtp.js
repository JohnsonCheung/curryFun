"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x = require("./curryfun");
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
const sqtpRslt = (a) => {
    const ly = x.sSplitLines(a);
    const clnLy = x1_clnLy(ly);
    const gp_endMsgErItm = (endMsg) => (a) => endMsgErItm(x.ayLas(a).ix, endMsg);
    const gpy_endMsgEr = (endMsg) => (a) => x.itrMap(gp_endMsgErItm(endMsg))(a);
    const { pmGp, swGp, sqGpy, pmExcessGpy, swExcessGpy, erGpy } = x2_gpBrk(clnLy);
    const e1 = gpy_endMsgEr('--- this block is [error], it is none of block of [remark | parameter | switch | sql]')(erGpy);
    const e2 = gpy_endMsgEr('--- this is excess [parameter] block')(pmExcessGpy);
    const e3 = gpy_endMsgEr('--- this is excess [switch] block')(swExcessGpy);
    const [e4, pm] = x3_pm(pmGp); // x3_fnd_erPm(pmGp)
    const [e5, sw] = x4_sw(swGp, pm);
    const [e6, sql] = x5_sql(sqGpy, pm, sw);
    const er = e1.concat(e2, e3, e4, e5, e6);
    // sw_Brw(swGp, sw); debugger
    const vtp = x6_vtp(clnLy, er);
    return { sql, vtp };
};
const stmt_upd = (_updGp, _sw) => {
    const { fldSw, stmtSw } = _sw;
    const ly = gp_ly(_updGp);
    var isSkipStmt = () => tblNm_isSkipStmt(tblNm(), stmtSw);
    if (isSkipStmt())
        return [[], null];
    const exprDic = ly_exprDic(ly);
    const updLin = () => '';
    const setLin = () => '';
    const set = () => '';
    const upd = () => '';
    const whe = () => '';
    const er = [];
    const sql = upd() + set() + whe();
    const fstLin = () => _updGp[0].lin;
    const tblNm = () => {
        const a1 = fstLin();
        const a2 = x.sRmvPfx("?")(a1);
        const a3 = x.sHasPfxIgnCas(sq_UPD)(a2);
        if (!a3)
            return null;
        let z = x.linT2(a2);
        return z;
    };
    return [er, sql];
};
const stmt_selOrDis = (_selGp, _selTy, _sw) => {
    const { fldSw, stmtSw } = _sw;
    const ly = gp_ly(_selGp);
    if (selLy_isSkipStmt(ly, stmtSw))
        return [[], ''];
    const selTy = () => 'DIS';
    const exprDic = () => ly_exprDic(ly);
    const froLin = () => '';
    const selLy = (() => {
        const selLy = [];
        for (let lin of ly) {
            const t1 = x.linFstTerm(lin);
            const tt1 = x.sRmvPfx(t1)(t1).toUpperCase();
            if (tt1 === _selTy) {
                selLy.push(lin);
            }
            else {
                break;
            }
        }
        return selLy;
    })();
    const fny = () => {
        let z = [];
        for (let lin of selLy) {
            let a = x.sSplitSpc(lin);
            a.shift();
            z = z.concat(a);
        }
        return z;
    };
    const fro = () => {
        const fro = froLin();
        if (fro === null)
            return '';
        const tbl = () => ''; //?
        return '   from ' + tbl();
    };
    const whe = () => '';
    const sel = () => '';
    const joi = () => '';
    const gro = () => '';
    const sql = sel() + fro() + joi() + whe() + gro();
    const er = [];
    return [er, sql];
};
const x5_sql = (_sqGp, _pm, _sw) => {
    let er = [];
    let sql = "";
    for (let sqGp of _sqGp) {
        let [e, s] = stmt(sqGp, _pm, _sw);
        er = er.concat(e);
        if (s !== null) {
            sql = s === ""
                ? s
                : sql += '\r\n\r\n' + s;
        }
    }
    return [er, sql];
};
const stmt = (_sqGp, _pm, _sw) => {
    const _selOrDis = stmt_selOrDis;
    const _upd = stmt_upd;
    const _drp = stmt_drp;
    const fstLin = _sqGp[0].lin;
    const stmtTyStr = x.sRmvPfx("?")(x.linFstTerm(fstLin));
    const stmtTy = (() => {
        const a1 = stmtTyStr.toUpperCase();
        switch (a1) {
            case 'DIS':
            case 'UPD':
            case 'SEL':
            case 'DRP': return a1;
        }
        return null;
    })();
    let z;
    switch (stmtTy) {
        case 'DIS':
            z = _selOrDis(_sqGp, 'DIS', _sw);
            break;
        case 'SEL':
            z = _selOrDis(_sqGp, 'SEL', _sw);
            break;
        case 'UPD':
            z = _upd(_sqGp, _sw);
            break;
        case 'DRP':
            z = _drp(_sqGp);
            break;
        default:
            const ix = _sqGp[0].ix;
            const lin = _sqGp[0].lin;
            const m = x.sFmt(' must be [? | ? | ? | ?]', sq_SEL, sq_UPD, sq_DIS, sq_DRP);
            const endMsg = [lin_t1MrkrLin(lin, m)];
            const sfxMsg = [];
            const erItm = { ix, endMsg, sfxMsg };
            const er = [erItm];
            z = [er, null];
    }
    return z;
};
const x2_gpBrk = (_clnLy) => {
    const gp = (() => {
        const m = (lin, ix) => { return { ix, lin }; };
        return x.itrMap(m)(_clnLy);
    })();
    const gpNoRmk = (() => {
        const noRmk = (a) => x.isNonRmkLin(a.lin);
        return x.itrWhere(noRmk)(gp);
    })();
    const linPfxSep = '==';
    const gpy = (() => {
        const _gp = gpNoRmk;
        const _linPfxSep = linPfxSep;
        let { ix, lin } = _gp[0];
        const z = [];
        let curGp = [];
        for (let { ix, lin } of _gp) {
            if (x.sHasPfx(_linPfxSep)(lin)) {
                if (curGp.length !== 0)
                    z.push(curGp);
                curGp = [];
            }
            else
                curGp.push({ ix, lin });
        }
        if (curGp.length !== 0)
            z.push(curGp);
        const gpy1 = x.itrMap(gpRmvRmkLin)(z);
        return gpy1;
    })();
    let pmGp = [];
    let swGp = [];
    const swExcessGpy = [];
    const pmExcessGpy = [];
    const erGpy = [];
    const sqGpy = [];
    for (let gp of gpy) {
        let ly = gp_ly(gp);
        const bkty = ly_bkty(ly);
        switch (bkty) {
            case 4 /* ER */:
                erGpy.push(gp);
                break;
            case 0 /* RM */:
                erGpy.push(gp);
                break;
            case 2 /* SW */:
                if (swGp.length === 0)
                    swGp = gp;
                else
                    swExcessGpy.push(gp);
                break;
            case 1 /* PM */:
                if (pmGp.length === 0)
                    pmGp = gp;
                else
                    pmExcessGpy.push(gp);
                break;
            case 3 /* SQ */:
                sqGpy.push(gp);
                break;
            default: x.er('ly_bkty return unexpected bkty', { ly, bkty });
        }
    }
    return { pmGp, swGp, sqGpy, pmExcessGpy, swExcessGpy, erGpy };
};
const curExpConstNy = x.fjsExpConstNy(__filename);
const curConstNy = x.fjsConstNy(__filename);
const er_lines = (a) => x.itrMap(erItm_lin)(a).join('\r\n');
const er_Brw = (a) => x.sBrw(er_lines(a));
const sw_Brw = (swGp, { fldSw, stmtSw }) => {
    const p = gp_lines(swGp);
    const s1 = x.dicLines(fldSw);
    const s2 = x.dicLines(stmtSw);
    x.sBrwAtFdrFn('Sw', 'gp')(p);
    x.sBrwAtFdrFn('Sw', 'fldSw')(s1);
    x.sBrwAtFdrFn('Sw', 'stmtSw')(s2);
};
const ixlin_lin = ({ ix, lin }) => x.sFmt('[?]?', ix, lin);
const gp_lines = (a) => x.itrMap(ixlin_lin)(a).join('\n');
const gp_Brw = x.compose(gp_lines, x.sBrw);
const er_ly = (er) => x.itrMap(erItm_lin)(er);
const erItm_lin = ({ ix, endMsg, sfxMsg }) => x.sFmt('?: endMsg[?] sfxMsg[?]', ix, x.syLin(endMsg), x.syLin(sfxMsg));
const lin_RmvMsg = (a) => {
    const b = a.match(/(.*)---/);
    const c = b === null ? a : a[1];
    if (x.sHasPfx("^")(c.trimLeft()))
        return "";
    return c;
};
const x1_clnLy = x.compose(x.itrMap(lin_RmvMsg), x.itrRmvEmp);
const tblNm_isSkipStmt = (a, stmtSw) => {
    if (a === null)
        return false;
    const key = '?' + a;
    const z = stmtSw.get(key);
    return z === undefined
        ? false
        : z;
};
const selLy_isSkipStmt = (a, stmtSw) => tblNm_isSkipStmt(selLy_tblNm(a), stmtSw);
const selLy_tblNm = (a) => {
    const tblNmLin = x.itrFind(x.sHasPfxIgnCas(sq_FRO))(a);
    if (tblNmLin === null)
        return null;
    const z = x.linT2(tblNmLin);
    return z;
};
const x51112_selLines = (_fny, _selTy, _fldSw, _exprDic) => {
    let distinct = '';
    switch (_selTy) {
        case 'DIS':
            distinct = '';
            break;
        case 'SEL':
            distinct = ' distinct';
            break;
    }
    const x511122_l_r_ay = (_fny, fldSw, exprDic) => {
        const fny = x.itrWhere((fldNm) => fldSw.has(fldNm))(_fny);
        const l = (() => {
            let m = (fldNm) => x.dicDftVal(fldNm, fldNm)(exprDic);
            return x.itrMap(m)(fny);
        })();
        const l1 = x.itrMap(x.sRmvPfx("?"))(l);
        const r = x.itrAlignL(fny);
        const z = [l1, r];
        return z;
    };
    const fldsLines = () => {
        // {a} is all gp-lines started with either SEL | DIS
        let [l, r] = x511122_l_r_ay(_fny, _fldSw, _exprDic);
        const z = [];
        for (let i = 0; i < l.length; i++) {
            z.push(l[i] + r[i]);
        }
        return z.join(',\r\n') + '\r\n';
    };
    const sel = 'select' + distinct + '\r\n' + fldsLines();
    return [[], sel];
};
const wheLines = (ly, exprDic) => {
    if (ly.length === 0)
        return '';
    {
        const linIsQmrkPfx = (lin, pfx) => true;
        const assertQmrkPfxAy = (lin, pfx) => { };
        const assertQmrkPfx = (lin, pfx) => { };
        const assertQmrkAndOr = (lin) => assertQmrkPfxAy(lin, ['AND', 'OR']);
        assertQmrkPfx(ly[0], 'WHE');
        ly.slice(1).forEach(assertQmrkAndOr);
    }
    const wheLines = () => '';
    const andOrLy = () => [];
    const andOrLin = lin => { };
    const andOrLines = () => x.itrMap(andOrLin)(andOrLy()).join('\r\n');
    return wheLines() + andOrLines();
};
const ly_exprDic = (ly) => x.pipe(ly)(x.itrWhere(x.sHasPfx('$')), x.lySdic);
const stmt_drp = (a) => {
    const z = [[], ''];
    return z;
};
const gp_endMsgEr = (a, endMsgStr) => {
    let z = [];
    for (let bk of a) {
        const ix = x.ayLas(a).ix;
        z.push(endMsgErItm(ix, endMsgStr));
    }
    return z;
};
const gpRmvRmkLin = (a) => {
    let p = ({ ix, lin }) => !x.isRmkLin(lin);
    let z = x.itrWhere(p)(a);
    return z;
};
const assertAyIsEqLen = (ay1, ay2) => {
    if (ay1.length !== ay2.length)
        x.er('two ay are diff len', { ay1, ay2 });
};
const gp_ly = (a) => x.itrMap(x.oPrp("lin"))(a);
const isSqLy = (a) => {
    const fstNonRmkLin = x.itrFind(x.isNonEmp)(a);
    const fstTerm = x.linFstTerm(fstNonRmkLin);
    return x.vIN(_x)(x.sRmvPfx("?")(fstTerm).toUpperCase());
};
const _x = x.sSplitSpc("DRP UPD SEL DIS");
const isRmLy = (a) => x.itrPredIsAllTrue(x.isRmkLin)(a);
const isPmLy = (a) => x.lyHasMajPfx("%")(a);
const isSwLy = (a) => x.lyHasMajPfx("?")(a);
const ly_bkty = (a) => {
    let o;
    switch (true) {
        case (isRmLy(a)):
            o = 0 /* RM */;
            break;
        case (isPmLy(a)):
            o = 1 /* PM */;
            break;
        case (isSwLy(a)):
            o = 2 /* SW */;
            break;
        case (isSqLy(a)):
            o = 3 /* SQ */;
            break;
        default:
            o = 4 /* ER */;
    }
    return o;
};
const lySdic = (a) => {
    const z = new Map();
    for (let lin of a) {
        const { term: k, remainLin: s } = x.linShift(lin);
        z.set(k, s);
    }
    return z;
};
const lyFstTermAy = (a) => {
    let z = x.itrMap(x.linFstTerm)(a);
    return z;
};
const lyFstTermDupSet = (a) => {
    const fstTermAy = x.itrMap(x.linFstTerm)(a);
    let z = x.itrDupSet(fstTermAy);
    return z;
};
const gp_dupFstTermEr = (a) => {
    const ly = gp_ly(a);
    const dup = lyFstTermDupSet(ly);
    let er = [];
    let gp = a;
    const _x3 = (ixset) => {
        // return [er, gp]
        const er = [];
        const gp = [];
        for (let { ix, lin } of a) {
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
        let z = [er, gp];
        return z;
    };
    // remove all, except after, lines in {a} with {fstTerm} as [gp] and 
    // put the removed lines as er
    // return [er,gp]
    const _x2 = (fstTerm) => {
        const ixay = [];
        for (let { ix, lin } of a) {
            let fst = x.linFstTerm(lin);
            if (fstTerm === fst)
                ixay.push(ix);
        }
        ixay.pop();
        const ixset = new Set(ixay);
        return _x3(ixset);
    };
    for (let itm of dup) {
        let [e, g] = _x2(itm);
        er = er.concat(e);
        gp = g;
    }
    const z = [er, gp];
    return z;
};
const gp_pfxEr = (a, pfx) => {
    const er = [];
    const gp = [];
    const sfxMsg = [];
    for (let { ix, lin } of a) {
        if (!x.sHasPfx(pfx)(lin)) {
            const endMsg = ['^---- prefix must be (' + pfx + ')'];
            const m = { ix, endMsg, sfxMsg };
            er.push(m);
        }
        else {
            gp.push({ ix, lin });
        }
    }
    const z = [er, gp];
    return z;
};
const posLinParseSpc = ({ pos, lin }) => {
    for (var p = pos; p < lin.length; p++) {
        if (!x.isSpc(lin[p]))
            break;
    }
    let z = { pos: p, lin };
    return z;
};
const posLin_ParseTerm = ({ pos, lin }) => {
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
const lin_t1MrkrLin = (a, msg) => {
    if (a.trimLeft() !== a)
        a.trim;
    x.er('given {lin} must not have space in front', { lin: a });
    const [term, posLin] = posLin_ParseTerm({ pos: 0, lin: a });
    return '^'.repeat(term.length) + ' ' + msg;
};
const lin_t2MrkrLin = (a, msg) => {
    const a1 = lin_t2PosWdt(a);
    if (a1 === null) {
        x.er('{lin} does have 2nd term', { lin: a });
        return '{lin} does not have 2nd term: [' + a + ']';
    }
    const { pos, wdt } = a1;
    const chr = pos >= 3 ? '-' : ' ';
    const z = chr.repeat(pos) + '^'.repeat(wdt) + ' ' + msg;
    return z;
};
const pmGp_pmSwPfxEr = (a) => {
    const er = [];
    const gp = [];
    for (const { ix, lin } of a) {
        let endMsg = [];
        let sfxMsg = [];
        const isPrmSwLin = x.sHasPfx('%?')(lin);
        if (isPrmSwLin) {
            const ay = x.sSplitSpc(lin);
            if (ay.length !== 2) {
                sfxMsg = ['must have 2 terms for prefix being [%?]'];
                er.push({ ix, endMsg, sfxMsg });
            }
            else if (ay[1] !== '0' && ay[1] !== '1') {
                endMsg = [lin_t2MrkrLin(lin, 'must be 0 or 1 for prefix is [%?]')];
                er.push({ ix, endMsg, sfxMsg });
            }
        }
        else {
            gp.push({ ix, lin });
        }
    }
    const z = [er, gp];
    return z;
};
const x3_pm = (_pmGp) => {
    let z;
    const [e1, g0] = gp_dupFstTermEr(_pmGp);
    const [e2, g1] = gp_pfxEr(g0, "%");
    const [e3, g2] = pmGp_pmSwPfxEr(g1);
    const er = e1.concat(e2, e3);
    const pm = x.lySdic(gp_ly(g1));
    z = [er, pm];
    return z;
};
const lin_termAy = (_lin) => {
    let z = _lin.trim().split(/\s+/);
    return z;
};
const lin_fmT3DupTermSet = (_lin) => {
    let termAy = lin_termAy(_lin);
    termAy.shift();
    termAy.shift();
    let z = x.itrDupSet(termAy);
    return z;
};
const lin_termPosWdtAy = (a) => {
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
const lin_t2PosWdt = (a) => {
    const a1 = posLinParseSpc({ pos: 0, lin: a });
    const [t1, a2] = posLin_ParseTerm(a1);
    const a3 = posLinParseSpc(a2);
    const [t2, a4] = posLin_ParseTerm(a3);
    if (t2 === null)
        return null;
    const z = { pos: a3.pos, wdt: t2.length };
    return z;
};
const lin_AddMrk = (a, pos, len) => {
    const s = x.nSpc(pos - a.length);
    const m = '^'.repeat(len);
    return a + s + m;
};
const lin_fmT3DupTermMrkLin = (a) => {
    const dup = lin_fmT3DupTermSet(a);
    const termPosWdtAy = lin_termPosWdtAy(a);
    const termAy = lin_termAy(a);
    let z = "";
    for (let j = 2; j < termAy.length; j++) {
        let term = termAy[j];
        if (dup.has(term)) {
            const pos = termPosWdtAy[j].pos;
            const len = term.length;
            z = lin_AddMrk(z, pos, len);
        }
    }
    return z;
};
const swChkr_fmT3Dup = {
    hasEr: a => lin_fmT3DupTermSet(a.lin).size > 0,
    erFun: a => [{ ix: a.ix, endMsg: [lin_fmT3DupTermMrkLin(a.lin)], sfxMsg: [] }]
};
const lin_isStmtSwEr = (a) => {
    if (!x.sHasPfx('?#')(a))
        return false;
    if (x.sHasPfx('?#SEL#')(a))
        return false;
    if (x.sHasPfx('?#UPD#')(a))
        return false;
    return true;
};
const swChkr_stmtSwLin_mustBeEither_SEL_or_UPD = {
    hasEr: a => lin_isStmtSwEr(a.lin),
    erFun: a => [{ ix: a.ix, endMsg: [lin_t1MrkrLin(a.lin, '')], sfxMsg: [] }]
};
const op_isErr = (op) => {
    const z = !['AND', 'OR', 'EQ', 'NE'].includes(op.toUpperCase());
    return z;
};
const swChkr_swLinOp_mustBeAny_AND_OR_EQ_NE = {
    hasEr: a => op_isErr(x.linT2(a.lin)),
    erFun: a => [{
            ix: a.ix,
            endMsg: [lin_t2MrkrLin(a.lin, 'switch line 2nd term must be [ AND | OR | EQ | NE ]')],
            sfxMsg: []
        }]
};
const x4_sw = (a, pm) => {
    const gp_vdt = (a, { hasEr, erFun }) => {
        const { t: erGp, f: remainGp } = x.itrBrkForTrueFalse(hasEr)(a);
        //        let aa: er
        //        const z: [er, gp] = [aa = x.itrMap(erFun)(erGp), remainGp]
        return [[], a];
    };
    let emptyBdic = new Map();
    let z;
    const [e0, g0] = gp_dupFstTermEr(a);
    const [e1, g1] = gp_pfxEr(g0, "?");
    const [e2, g2] = gp_vdt(g1, swChkr_fmT3Dup);
    const [e3, g3] = gp_vdt(g2, swChkr_stmtSwLin_mustBeEither_SEL_or_UPD);
    const [e4, g4] = gp_vdt(g3, swChkr_swLinOp_mustBeAny_AND_OR_EQ_NE);
    const ly = gp_ly(g4);
    const er = e0.concat(e1, e2, e3, e4);
    const sw = x41_sw(ly, pm);
    z = [er, sw];
    // x.oBrw({ inp: { a, pm }, oup: z, srcLy: x.sSplitLines(x4_fnd_erSw.toString()), e0, e1, e2, e3, e4, g0, g1, g2, g3, g4, ly }); debugger
    return z;
};
const x41_sw = (a, pm) => {
    const bdic = new Map();
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
    const evlT = t => {
        if (bdic.has(t))
            return bdic.get(t);
        return pm.get(t);
    };
    const evlAy = ay => x.itrMap(evlT)(ay);
    const evlT1T2 = (t1, t2) => [evlT(t1), evlT2(t2)];
    const evlOR = ay => { let a = evlAy(ay); return xOR(a); };
    const evlAND = ay => { let a = evlAy(ay); return xAND(a); };
    const evlEQ = (t1, t2) => { let [a1, a2] = evlT1T2(t1, t2); return xEQ([a1, a2]); };
    const evlNE = (t1, t2) => { let [a1, a2] = evlT1T2(t1, t2); return xNE([a1, a2]); };
    const evlLin = lin => {
        let ay = x.sSplitSpc(lin);
        let key = x.vDft("")(ay.shift()).toUpperCase();
        let op = x.vDft("")(ay.shift()).toUpperCase();
        let boolOpt;
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
        let o = { key, boolOpt };
        return o;
    };
    const x41_sw = () => {
        let ly1 = [];
        let isEvaluated = true;
        let j = 0;
        let ly = x.itrClone(a);
        while (isEvaluated && j++ < 100) {
            isEvaluated = false;
            ly1 = [];
            for (let lin of ly) {
                let { key, boolOpt } = evlLin(lin);
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
        let z = bdic_sw(bdic);
        //x.oBrw({ inp: { a, pm: x.dicLy(pm) }, oup_stmtSw: x.dicLy(z.stmtSw), oup_fldSw: x.dicLy(z.fldSw), sw: x.dicLy(sw) }); debugger
        return z;
    };
    const bdic_sw = (a) => {
        //    x.dicBrw(a)
        //    debugger
        const fldSw = new Map();
        const stmtSw = new Map();
        for (let [k, b] of a) {
            if (x.sHasPfx('?#')(k))
                stmtSw.set(k, b);
            else
                fldSw.set(k, b);
        }
        const z = { fldSw, stmtSw };
        return z;
    };
    const tst__bdic_sw = () => {
        const bdic = new Map([['?#', true], ['b', false]]);
        const { fldSw, stmtSw } = bdic_sw(bdic);
        x.assertIsEq(fldSw, new Map([['b', false]]));
        x.assertIsEq(stmtSw, new Map([['?#', true]]));
    };
    return x41_sw();
};
const x6_vtp = (ly, er) => {
    const vtp = () => {
        let l = leftLyAy();
        let r = rightLyAy();
        let o = [];
        for (let i of x.nItr(l.length)) {
            let m = lyAyPair_Mge(l[i], r[i]);
            o = o.concat(m);
        }
        let z = o.join('\r\n');
        return z;
    };
    const l = (() => {
        const o = [];
        for (let i of x.nItr(ly.length)) {
            const m = [ly[i]].concat(erIx_endMsgEr(er, i));
            o.push(m);
        }
        return o;
    })();
    const w = (() => {
        const b = x.itrMap(x.itrWdt)(l);
        return x.vDft(0)(x.itrMax(b));
    })();
    const leftLyAy = () => {
        const align = ly => x.itrMap(x.sAlignL(w))(ly);
        const o = x.itrMap(align)(l);
        return o;
    };
    const rightLyAy = () => {
        const o = [];
        for (let i of x.nItr(ly.length)) {
            const m = sfxMsgEr(er, i);
            o.push(m);
        }
        return o;
    };
    return vtp();
};
const lyAyPair_Mge = (leftLy, rightLy) => {
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
const endMsgErItm = (ix, endMsgStr) => {
    const sfxMsg = [];
    const endMsg = [endMsgStr];
    return { ix, endMsg, sfxMsg };
};
const erIx_endMsgEr = (er, ix) => {
    let o = [];
    for (let { ix: i, endMsg } of er) {
        if (i === ix)
            o = o.concat(endMsg);
    }
    return o;
};
const sfxMsgEr = (er, ix) => {
    let o = [];
    for (let { ix: i, sfxMsg } of er) {
        if (i === ix)
            o = o.concat(sfxMsg);
    }
    return o;
};
//=============================================================
if (module.id === '.') {
    const sqtp = x.ftLines(__dirname + '/spec/sample.sqtp.txt');
    const tst__sqtpRslt = () => {
        const { vtp, sql } = sqtpRslt(sqtp);
        x.sBrw(vtp);
        x.sBrw(sql);
        debugger;
    };
    const tst__selLy_isSkipStmt = () => {
        const ly = ['fm #aa'];
        const stmtSw = new Map([['?#aa', false]]);
        const aa = selLy_isSkipStmt(ly, stmtSw);
    };
    const tst__sqLy = () => ['sel xxx', 'fm ', '$xxx ka'];
    const tst__sqGp = () => ly_gp(tst__sqLy());
    const tst__sqGp_splitFor_ExprSdic = () => {
        const sqGp = tst__sqGp();
        //const [gp, ly] = sqGp_SplitForExprSdic(sqGp)
        //assert.deepStrictEqual(ly, ['$xxx ka'])
        //assert.deepStrictEqual(gp, [{ ix: 0, lin: 'sel xxx' }, { ix: 1, lin: 'fm aaa' }])
    };
    const tst__lin_t2PosWdt = () => {
        const lin = 'aaa  bb';
        const act = lin_t2PosWdt(lin);
        expect(act).toEqual({ pos: 5, wdt: 2 });
    };
    const tst__lin_t2MrkLin = () => {
        const lin = 'aaa  bb';
        const act = lin_t2MrkrLin(lin, 'aa');
        expect(act).toEqual('-----^^ aa');
    };
    const tst__sqtpRslt_1 = () => {
        const sqtp = '%?BrkMbr 0\n' +
            '?BrkMbr 0\n' +
            '%?BrkMbr 0\n' +
            '??BrkSto 0\n';
        const { vtp, sql } = sqtpRslt(sqtp);
        x.sBrw(vtp + '\n***\nsqtp' + sqtp);
        debugger;
    };
    const tst__sqtpRslt_2 = () => {
        const sqtp = '%?BrkMbr 0\n' +
            '%?BrkXX 0\n' +
            '%BrkMbr 0\n' +
            '#?BrkMbr 0\n' +
            '??BrkSto 0\n';
        const { vtp, sql } = sqtpRslt(sqtp);
        const exp = '%?BrkMbr 0\r\n' +
            '%?BrkXX 0\r\n' +
            '%BrkMbr 0\r\n' +
            '#?BrkMbr 0\r\n' +
            '^---- prefix must be (%)\r\n' +
            '??BrkSto 0\r\n' +
            '^---- prefix must be (%)';
        expect(vtp).toEqual(exp);
    };
    const tst__sqtpRslt_3 = () => {
        const sqtp = '%?BrkDiv  XX\n' +
            '%SumLvl  Y\n' +
            '%?MbrEmail 1';
        const { vtp, sql } = sqtpRslt(sqtp);
        //x.sBrw(vtp + '\n***\n' + sqtp)
        const exp = '%?BrkDiv  XX\r\n' +
            '----------^^ must be 0 or 1 for prefix is [%?]\r\n' +
            '%SumLvl  Y\r\n' +
            '%?MbrEmail 1';
        const rslt = vtp === exp;
        expect(rslt).toBeTruthy();
    };
    const tst__sqtpRslt_4 = () => {
        const sqtp = '?#SEL#aa 1\n' +
            '?#UPD#bb OR 1\n' +
            '?AA AND 1';
        const { vtp, sql } = sqtpRslt(sqtp);
        //x.sBrw(vtp + '\n***\n' + sqtp)
        const exp = '%?BrkDiv  XX\r\n' +
            '----------^^ must be 0 or 1 for prefix is [%?]\r\n' +
            '%SumLvl  Y\r\n' +
            '%?MbrEmail 1';
        const rslt = vtp === exp;
        debugger;
        expect(rslt).toBeTruthy();
    };
    const tst__sqtpRslt_5 = () => {
        //=====================================================
        const sqtp = x.ftLines('./sample.sqtp.txt');
        const { vtp, sql } = sqtpRslt(sqtp);
        x.sBrw(vtp);
        debugger;
        expect(true).toBe(true);
        debugger;
        //    x.dryCol(1)([[1, 2], [2, 3]])
    };
    const tst__x4_sw = () => {
        const t = { swGp: [], pm: new Map(), exp: {} };
        const a = t.swGp;
        const pm = t.pm;
        const exp = t.exp;
        const act = x4_sw(a, pm);
        x.assertIsEq(exp, act);
    };
    tst__sqtpRslt();
}
//# sourceMappingURL=sqtp.js.map