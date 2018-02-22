"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lyAddErAsLines_1 = require("./lyAddErAsLines");
const x = require("./curryfun");
const sqtprslt = (a) => {
    let ly = x.sSplitLf(a);
    let ly1 = lyRmvMsg(ly);
    let gp = lyGp(ly1);
    let gp1 = gpRmvRmk(gp);
    let gpy = gpGpy(gp1, '==');
    let bky = gpyBky(gpy);
    let bky_aftRm = x.itrWhere((bk) => bk.bkty !== 0 /* RM */)(bky);
    let [er_er, bky_aftEr] = er02(bky_aftRm);
    let [er_pm, bky_aftPm, pm] = pm03(bky_aftEr);
    let [er_sw, bky_aftSw, sw] = sw04(bky_aftPm, pm);
    let [er_sq, sql] = sq05(bky_aftSw, pm, sw);
    let er = er_er.concat(er_pm, er_sw, er_sq);
    let vtp = lyAddErAsLines_1.lyAddErAsLines(ly1, er);
    return { vtp, sql };
};
exports.sqtprslt = sqtprslt;
const linRmvMsg = (a) => {
    const b = a.match(/(.*)---/);
    const c = b === null ? lin : a[1];
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
    const { t: pmBky, f: remainBky } = x.itrBrkForTrueFalse((a) => a.bkty === 1 /* PM */)(a);
    const e1 = bkAyExcessEr(pmBky, 'parameter');
    const [e2, pm] = bkPm(pmBky[0]);
    const er = e1.concat(e2);
    let z = [er, remainBky, pm];
    return z;
};
const sw04 = (a, pm) => {
    const { t: swBky, f: remainBky } = x.itrBrkForTrueFalse((a) => a.bkty === 2 /* SW */)(a);
    const e1 = bkAyExcessEr(swBky, 'switch');
    const [e2, sw] = bkSw(swBky[0], pm);
    const er = e1.concat(e2);
    let z = [er, remainBky, sw];
    return z;
};
const sq05 = (a, pm, sw) => {
    let sql = "";
    let z = [[], sql];
    return z;
};
const er02 = (a) => {
    let { t: er, f: bky } = x.itrBrkForTrueFalse((a) => a.bkty === 0 /* RM */)(a);
    let z = [er, bky];
    return z;
};
const bkySfxMsgEr = (a, sfxMsgStr) => {
    const z = [];
    for (let bk of a) {
        const ix = bk.gp.length;
        const endMsg = [];
        const sfxMsg = [sfxMsgStr];
        z.push({ ix, endMsg, sfxMsg });
    }
    return z;
};
const bkAyExcessEr = (a, bkNm) => bkySfxMsgEr(a.slice(1), `Three is already [${bkNm}] block.  This block is ignored`);
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
const _x = x.sSplitSpc("drp upd sel dist");
const isSqLy = (a) => {
    const fstNonRmkLin = x.itrFind(x.isNonEmp)(a);
    return x.vIN(_x)(x.sRmvPfx("?")(fstNonRmkLin).toLowerCase());
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
    let z = x.pipe(a)(x.itrMap(x.linFstTerm), x.itrDupSet);
    return z;
};
const gpDupFstTermEr = (a) => {
    const dup = lyFstTermDupSet(gpLy(a));
    const z = [];
    for (let { ix, lin } of a) {
        let fst = x.linFstTerm(lin);
        if (dup.has(fst)) {
            let sfxMsg = [`"duplicate(${fst})`];
            let endMsg = [];
            const er = { ix, sfxMsg, endMsg };
            z.push(er);
        }
    }
    return z;
};
const bkPm = (a) => {
    let z;
    if (a === undefined) {
        z = [[], new Map()];
        return z;
    }
    const er = gpDupFstTermEr(a.gp);
    const ly = gpLy(a.gp);
    const pm = x.lySdic(ly);
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
const linTermPosAy = (a) => {
    const z = [];
    let j = 0;
    let pos = 0;
    let len;
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
            len = a1.length;
            pos = pos + a1.length;
            z.push({ pos, len });
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
exports._termPosAyRmkLin = (a) => {
    let z = "";
    for (let { pos, len } of a) {
        const n = 1;
        const s = x.nSpc(n);
        z = z + s + '^'.repeat(len);
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
    const termPosAy = linTermPosAy(lin);
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
const swChkr_FmT3Dup = {
    hasEr: a => linFmT3DupTermSet(a.lin).size > 0,
    erFun: a => [{ ix: a.ix, endMsg: [linFmT3DupTermMrkLin(a.lin)], sfxMsg: [] }]
};
const gppassVdt = (a, chkr) => {
    const p = chkr.hasEr;
    const m = chkr.erFun;
    const [erGp, remainingGp] = gpSplitForErAndRemain(p)(a.gp);
    const er = x.itrMap(m)(erGp);
    const z = { er, gp: a.gp };
    return z;
};
const bkSw_process_SwEr = (gp, er, SwEr) => { };
const bkSw = (a, pm) => {
    let z;
    if (a === undefined) {
        z = [[], new Map()];
        return z;
    }
    let er = gpDupFstTermEr(a.gp);
    let gp = a.gp;
    let e = [];
    /*
    for (let ixlinChkr of x.oPrpNy(swChkr)) {
        { er: e, gp } = gppassVdt(ixlinChkr)({ er, gp })
        er = er.concat(e)
    }
    */
    const sw = lySw(pm)(gpLy(gp));
    z = [er, sw];
    return z;
};
const gpSplitForErAndRemain = p => gp => [[], []];
const lySw = (pm) => (a) => {
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
    return sw;
};
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
//# sourceMappingURL=sqtp.js.map