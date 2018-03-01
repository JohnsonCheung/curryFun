"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lyAddErAsLines_1 = require("./lyAddErAsLines");
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
const sqtprslt = ({ sqtp: a }) => {
    const ly = x.sSplitLf(a);
    const ly1 = lyRmvMsg(ly);
    const gp = lyGp(ly1);
    const gp1 = gpRmvRmk(gp);
    const gpy = gpGpy(gp1, '==');
    const bky = gpyBky(gpy);
    const bky_aftRm = x.itrWhere((bk) => bk.bkty !== 0 /* RM */)(bky);
    const [er_er, bky_aftEr] = er02(bky_aftRm);
    const [er_pm, bky_aftPm, pm] = pm03(bky_aftEr);
    const [er_sw, bky_aftSw, sw] = sw04(bky_aftPm, pm);
    const [er_sq, sql] = sq05(bky_aftSw, pm, sw);
    const er = er_er.concat(er_pm, er_sw, er_sq);
    const vtp = lyAddErAsLines_1.lyAddErAsLines(ly1, er);
    const z = { vtp, sql };
    return z;
};
exports.sqtprslt = sqtprslt;
const linRmvMsg = (a) => {
    const b = a.match(/(.*)---/);
    const c = b === null ? a : a[1];
    if (x.sHasPfx("^")(c.trimLeft()))
        return "";
    return c;
};
const lyRmvMsg = (a) => {
    let z = x.pipe(a)(x.itrMap(linRmvMsg), x.itrRmvEmp);
    return z;
};
const gpRmvRmk = (a) => {
    let z = x.itrWhere(({ ix, lin }) => x.isNonRmkLin(lin))(a);
    return z;
};
const lyGp = (a) => {
    const z = [];
    let i = 0;
    for (let lin of a)
        z.push({ ix: i++, lin });
    return z;
};
const pm03 = (a) => {
    const { t, f } = x.itrBrkForTrueFalse((a) => a.bkty === 1 /* PM */)(a);
    const pmBky = t;
    const remain = f;
    const e1 = bkyEr_forExcessBk(pmBky, 'parameter');
    const [e2, pm] = bkPm(pmBky[0]);
    const er = e1.concat(e2);
    let z = [er, remain, pm];
    return z;
};
const sw04 = (a, pm) => {
    const { t, f } = x.itrBrkForTrueFalse((a) => a.bkty === 2 /* SW */)(a);
    const swBky = t;
    const remain = f;
    const e1 = bkyEr_forExcessBk(swBky, 'switch');
    const [e2, sw] = bkSw(swBky[0], pm);
    const er = e1.concat(e2);
    let z = [er, remain, sw];
    return z;
};
const sqsellyIsSkip = (a, sqStmtSw) => {
    const tblFmLin = x.itrFind(x.sHasPfxIgnCas(sq_FRO))(a);
    if (tblFmLin === null)
        return false;
    const tblNm = x.sSplitSpc(tblFmLin)[1];
    if (sqStmtSw.has(tblNm))
        return sqStmtSw.get(tblNm);
    else
        return false;
};
const sqselBrkSel = (a, term) => {
    return [a, a];
};
const xflds1 = (a, sqFldSw) => {
    const fny = [];
    const l = [];
    const r = x.itrAlignL(fny);
    const z = [l, r];
    return z;
};
const xflds = (a, sqFldSw) => {
    let [l, r] = xflds1(a, sqFldSw);
    const z = [];
    for (let i = 0; i < l.length; i++) {
        z.push(l[i] + r[i]);
    }
    return z.join(',\r\n') + '\r\n';
};
const sqselSel = (a, term, sqFldSw) => {
    let z;
    let distinct;
    switch (term) {
        case sq_SEL:
            distinct = '';
            break;
        case sq_DIS:
            distinct = ' distinct';
            break;
        default:
            x.er(x.sFmt('{term} must be [? | ?]', sq_SEL, sq_DIS), { sqgp: a, term });
            z = [[], '', a];
            return z;
    }
    let [a1, remain] = sqselBrkSel(a, term);
    let flds = xflds(a1, sqFldSw);
    const sel = 'select' + distinct + '\r\n' + flds;
    z = [[], sel, remain];
    return z;
};
const sqselFro = (a) => {
    let fro = '';
    let z = [[], fro, a];
    return z;
};
const sqselJoi = (a) => {
    let joi = '';
    let z = [[], joi, a];
    return z;
};
const sqselGro = (a, sqFldSw) => {
    let gro = '';
    let z = [[], gro, a];
    return z;
};
const sqselWhe = (a, pm, sqFldSw) => {
    let whe = '';
    let z = [[], whe, a];
    return z;
};
const sqgpEvlSel = (a, term, pm, { sqFldSw, sqStmtSw }) => {
    const ly = gpLy(a);
    let z;
    if (sqsellyIsSkip(ly, sqStmtSw)) {
        z = [[], ''];
        return z;
    }
    const [e1, sel, a1] = sqselSel(a, term, sqFldSw);
    const [e2, fro, a2] = sqselFro(a1);
    const [e3, joi, a3] = sqselJoi(a2);
    const [e4, gro, a4] = sqselGro(a3, sqFldSw);
    const [e5, whe, a5] = sqselWhe(a4, pm, sqFldSw);
    const sql = sel + fro + joi + whe + gro;
    const er = e1.concat(e2, e3, e4, e5);
    z = [er, sql];
    return z;
};
const sqgpEvlDrp = (a) => {
    const emptySqevl = [[], ''];
    return emptySqevl;
};
const squpdgpIsSkip = (a, sqStmtSw) => {
    const tblNm = '';
    if (sqStmtSw.has(tblNm))
        return sqStmtSw.get(tblNm);
    else
        return false;
};
const sqgpEvlUpd = (a, pm, { sqFldSw, sqStmtSw }) => {
    let z;
    if (squpdgpIsSkip(a, sqStmtSw)) {
        z = [[], ''];
        return z;
    }
    const er = [];
    const upd = '';
    const set = '';
    const where = '';
    const sql = upd + set + where;
    z = [er, sql];
    return z;
};
const sqgpEvl = (a, pm, sw) => {
    const fstLin = a[0].lin;
    const term = x.sRmvPfx("?")(x.linFstTerm(fstLin).toUpperCase());
    let z;
    switch (term) {
        case sq_DRP:
            z = sqgpEvlDrp(a);
            break;
        case sq_SEL:
        case sq_DIS:
            z = sqgpEvlSel(a, term, pm, sw);
            break;
        case sq_UPD:
            z = sqgpEvlUpd(a, pm, sw);
            break;
        default:
            x.er('impossible: {bk} should have {term} be one of [Drp | Sel | Dis | Upd]', { term, bk: a });
            z = [[], ''];
    }
    return z;
};
const sq05 = (a, pm, sw) => {
    let er = [];
    let sql = "";
    for (let { bkty, gp } of a) {
        let [i_er, i_sql] = sqgpEvl(gp, pm, sw);
        er = er.concat(i_er);
        sql = sql === ""
            ? i_sql
            : sql += '\r\n\r\n' + i_sql;
    }
    let z = [er, sql];
    return z;
};
const er02 = (a) => {
    let { t: erBky, f: bky } = x.itrBrkForTrueFalse((a) => a.bkty === 4 /* ER */)(a);
    let er = bkyEr_forErBky(erBky);
    let z = [er, bky];
    return z;
};
const bkyEr_forErBky = (a) => {
    let z = [];
    for (let bk of a) {
        const ix = x.ayLas(bk.gp).ix;
        z.push(endmsgstrEr(ix, '^^^ this block is error'));
    }
    return z;
};
const endmsgstrEr = (ix, endMsgStr) => {
    const sfxMsg = [];
    const endMsg = [endMsgStr];
    let z = { ix, endMsg, sfxMsg };
    return z;
};
const bkyEr_forExcessBk = (a, bkNm) => {
    const excessbky = a.slice(1);
    const z = [];
    if (excessbky.length === 0)
        return z;
    const endMsgStr = `^^^ Three is already [${bkNm}] block.  This block is ignored`;
    for (let bk of excessbky) {
        const ix = x.ayLas(bk.gp).ix;
        z.push(endmsgstrEr(ix, endMsgStr));
    }
    return z;
};
const gpGpy = (a, linPfxSep) => {
    let { ix, lin } = a[0];
    const z = [];
    let curGp = [];
    for (let { ix, lin } of a) {
        if (x.sHasPfx(linPfxSep)(lin)) {
            if (curGp.length !== 0)
                z.push(curGp);
            curGp = [];
        }
        else
            curGp.push({ ix, lin });
    }
    if (curGp.length !== 0)
        z.push(curGp);
    return z;
};
const gpRmvRmkLin = (a) => {
    let p = ({ ix, lin }) => !x.isRmkLin(lin);
    let z = x.itrWhere(p)(a);
    return z;
};
const gpyRmvRmkLin = x.itrMap(gpRmvRmkLin);
const assertAyIsEqLen = (ay1, ay2) => {
    if (ay1.length !== ay2.length)
        x.er('two ay are diff len', { ay1, ay2 });
};
const gpLy = (a) => {
    const z = x.itrMap(x.oPrp("lin"))(a);
    return z;
};
const gpBk = (a) => {
    const ly = gpLy(a);
    const bkty = lyBkty(ly);
    let z = { bkty, gp: a };
    return z;
};
const gpyBky = (a) => {
    let z = x.itrMap(gpBk)(a);
    return z;
};
const _x = x.sSplitSpc("DRP UPD SEL DIS");
const isSqLy = (a) => {
    const fstNonRmkLin = x.itrFind(x.isNonEmp)(a);
    const fstTerm = x.linFstTerm(fstNonRmkLin);
    return x.vIN(_x)(x.sRmvPfx("?")(fstTerm).toUpperCase());
};
const isRmLy = (a) => x.itrPredIsAllTrue(x.isRmkLin)(a);
const isPmLy = (a) => x.lyHasMajPfx("%")(a);
const isSwLy = (a) => x.lyHasMajPfx("?")(a);
const lyBkty = (a) => {
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
// remove all, except after, lines in {a} with {fstTerm} as [gp] and 
// put the removed lines as er
// return [er,gp]
const _x1 = (a, fstTerm) => {
    const ixay = [];
    for (let { ix, lin } of a) {
        let fst = x.linFstTerm(lin);
        if (fstTerm === fst)
            ixay.push(ix);
    }
    ixay.pop();
    const ixset = new Set(ixay);
    return _x2(a, ixset);
};
const _x2 = (a, ixset) => {
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
const gpDupFstTermEr = (a) => {
    const ly = gpLy(a);
    const dup = lyFstTermDupSet(ly);
    let er = [];
    let gp = a;
    for (let itm of dup) {
        let [e, g] = _x1(gp, itm);
        er = er.concat(e);
        gp = g;
    }
    const z = [er, gp];
    return z;
};
const gpPfxEr = (a, pfx) => {
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
const plinParseSpc = ({ pos, lin }) => {
    for (var p = pos; p < lin.length; p++) {
        if (!x.isSpc(lin[p]))
            break;
    }
    let z = { pos: p, lin };
    return z;
};
const plinParseTerm = ({ pos, lin }) => {
    let term = '';
    for (var p = pos; p < lin.length; p++) {
        const c = lin[p];
        if (/\s/.test(c))
            break;
        else
            term += c;
    }
    let z = { term, plin: { pos: p, lin } };
    return z;
};
const linT2PosWdt = (a) => {
    const a1 = plinParseSpc({ pos: 0, lin: a });
    const { term: t1, plin: a2 } = plinParseTerm(a1);
    const a3 = plinParseSpc(a2);
    const { term: t2, plin: a4 } = plinParseTerm(a3);
    if (t2 === null)
        return null;
    const z = { pos: a4.pos, wdt: t2.length };
    return z;
};
const linT2MarkerLin = (a, msg) => {
    const poswdt = linT2PosWdt(a);
    if (poswdt === null) {
        x.er('{lin} does have 2nd term', { lin: a });
        return '{lin} does not have 2nd term: [' + a + ']';
    }
    const { pos, wdt } = poswdt;
    const chr = pos >= 3 ? '-' : ' ';
    const z = chr.repeat(pos - 1) + '^'.repeat(wdt) + ' ' + msg;
    return z;
};
const gpPfxPrmSwEr = (a) => {
    const er = [];
    const gp = [];
    for (const { ix, lin } of a) {
        let endMsg = [];
        let sfxMsg = [];
        const isPrmSw = x.sHasPfx('%?')(lin);
        let erNo = 0;
        if (isPrmSw) {
            const ay = x.sSplitSpc(lin);
            if (ay.length !== 2) {
                erNo = 1;
            }
            else if (ay[1] !== '0' && ay[1] !== '1') {
                erNo = 2;
            }
        }
        switch (erNo) {
            case 1:
                sfxMsg = ['must have 2 terms for prefix being [%?]'];
                er.push({ ix, endMsg, sfxMsg });
                break;
            case 2:
                endMsg = [linT2MarkerLin(lin, 'must be 0 or 1 for prefix is [%?]')];
                debugger;
                er.push({ ix, endMsg, sfxMsg });
                break;
            default:
                gp.push({ ix, lin });
        }
    }
    const z = [er, gp];
    return z;
};
const bkPm = (a) => {
    let z;
    if (a === undefined) {
        z = [[], new Map()];
        return z;
    }
    const [e1, g0] = gpPfxEr(a.gp, "%");
    const [e2, g1] = gpDupFstTermEr(g0);
    const [e3, g2] = gpPfxPrmSwEr(g1);
    debugger;
    const er = e1.concat(e2, e3);
    const pm = x.lySdic(gpLy(g1));
    z = [er, pm];
    return z;
};
const vdt = ([itmErPred, itmErMap]) => ([ery, itr]) => {
    const { t: er, f: remainingAy } = x.itrBrkForTrueFalse(itmErPred)(itr);
    const ery1 = x.itrMap(itmErMap)(er);
    const ery2 = ery.concat(ery1);
    return [ery2, remainingAy];
};
const linTermAy = (a) => {
    let z = a.trim().split(/\s+/);
    return z;
};
const linFmT3DupTermSet = (a) => {
    let termAy = linTermAy(a);
    termAy.shift();
    termAy.shift();
    let z = x.itrDupSet(termAy);
    return z;
};
const linTermPosWdtAy = (a) => {
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
exports._termWdtPosAyRmkLin = (a) => {
    let z = "";
    for (let { pos, wdt } of a) {
        const n = 1;
        const s = x.nSpc(n);
        z = z + s + '^'.repeat(wdt);
    }
    return z;
};
//const xx  = linTermPosAy(" sdf lk fdf d  ")
const linAddMrk = (lin, pos, len) => {
    const s = x.nSpc(pos - lin.length);
    const m = '^'.repeat(len);
    return lin + s + m;
};
const linFmT3DupTermMrkLin = lin => {
    const dup = linFmT3DupTermSet(lin);
    const termPosAy = linTermPosWdtAy(lin);
    const termAy = linTermAy(lin);
    let o = "";
    for (let j = 2; j < termAy.length; j++) {
        let term = termAy[j];
        if (dup.has(term)) {
            const pos = termPosAy[j];
            const len = term.length;
            o = linAddMrk(o, pos, len);
        }
    }
    return o;
};
const gpVdt = (a, chkr) => {
    const p = chkr.hasEr;
    const m = chkr.erFun;
    const { t: erGp, f: remainGp } = x.itrBrkForTrueFalse(p)(a);
    const z = [x.itrMap(m)(erGp), remainGp];
    return z;
};
const swChkr_FmT3Dup = {
    hasEr: a => linFmT3DupTermSet(a.lin).size > 0,
    erFun: a => [{ ix: a.ix, endMsg: [linFmT3DupTermMrkLin(a.lin)], sfxMsg: [] }]
};
const bkSw = (a, pm) => {
    let emptyBdic = new Map();
    let z = [[], { sqFldSw: emptyBdic, sqStmtSw: emptyBdic }];
    if (a === undefined || a === null) {
        return z;
    }
    const [e0, g0] = gpDupFstTermEr(a.gp);
    const [e1, g1] = gpVdt(g0, swChkr_FmT3Dup);
    const ly = gpLy(g1);
    const sw = lySw(ly, pm);
    z = [e0, sw];
    return z;
};
const lySw = (a, pm) => {
    const sw = new Map();
    let isEvaluated = true;
    let j = 0;
    let ly = x.itrClone(a);
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
        if (sw.has(t))
            return sw.get(t);
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
    let ly1 = [];
    while (isEvaluated && j++ < 100) {
        isEvaluated = false;
        ly1 = [];
        for (let lin of ly) {
            let { key, boolOpt } = evlLin(lin);
            if (boolOpt !== null) {
                sw.set(key, boolOpt);
                isEvaluated = true;
            }
            else
                ly1.push(lin);
        }
        ly = ly1;
    }
    if (ly1.length !== 0)
        x.er('ly1 should has 0-length', { ly1 });
    const sqFldSw = sw;
    const sqStmtSw = sw;
    const z = { sqFldSw, sqStmtSw };
    return z;
};
//# sourceMappingURL=sqtp.js.map