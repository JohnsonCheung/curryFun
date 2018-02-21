"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lyAddErAsLines_1 = require("./lyAddErAsLines");
const lyFstNonRmkLin = a => x.itrFind(x.isNonEmp)(a);
exports.sqtprslt = sqtp => {
    debugger;
    let ly = x.sSplitLf(sqtp);
    let ly1 = lyRmvMsg(ly);
    let gp = lyGp(ly1);
    let gp1 = gpRmvRmk(gp);
    let gpy = gpGpy('==')(gp1);
    let bky = gpyBky(gpy);
    let bky1 = rm01(bky); //bky may have remark; bky1 does not have remark
    let a_er = er02(bky1);
    let a_pm = pm03(a_er);
    let a_sw = sw04(a_pm);
    let { er, sql } = sq05(a_sw);
    let vtp = lyAddErAsLines_1.lyAddErAsLines(ly1, er);
    return { vtp, sql };
};
const lyRmvMsg = a => x.pipe(a)(x.itrMap(x.linRmvMsg), x.itrRmvEmp);
const gpRmvRmk = a => x.itrWhere(({ ix, lin }) => x.isNonRmkLin(lin))(a);
const lyGp = a => {
    const o = [];
    let i = 0;
    for (let lin of a)
        o.push({ ix: i++, lin });
    return o;
};
const pm03 = ({ er, bky }) => {
    const { t: pmBky, f: remainBky } = x.itrBrkForTrueFalse((a) => a.bkty === 1 /* PM */)(bky);
    const e1 = bkAyExcessEr('parameter')(pmBky);
    const { er: e2, pm } = bkPm(pmBky[0]);
    er = e1.concat(e2);
    return { bky: remainBky, pm, er };
};
const sw04 = ({ bky, pm, er }) => {
    const { t: swBky, f: remainBky } = x.itrBrkForTrueFalse((a) => a.bkty === 2 /* SW */)(bky);
    const e1 = bkAyExcessEr('switch')(swBky);
    const { er: e2, sw } = bkSw(pm)(swBky[0]);
    const e = e1.concat(e2);
    return { bky: remainBky, pm, sw, er: e };
};
const sq05 = ({ bky, sw, pm, er }) => {
    let sql = "";
    return { er, sql };
};
const rm01 = bky => x.itrWhere((a) => a.bkty !== 0 /* RM */)(bky);
const er02 = (a) => {
    let { t: er, f: bky } = x.itrBrkForTrueFalse((a) => a.bkty === 0 /* RM */)(a);
    return { bky, er };
};
const bkLasIx = a => a.gp.length - 1;
const bkyEr = msg => a => {
    const o = [];
    for (let bk of a) {
        const ix = bkLasIx(bk);
        const endMsg = [];
        const sfxMsg = [msg];
        o.push({ ix, endMsg, sfxMsg });
    }
    return o;
};
const bkAyExcessEr = bkNm => a => bkyEr(`Three is already [${bkNm}] block.  This block is ignored`)(a.slice(1));
const x = require("./curryfun");
const gpGpy = sep => gp => {
    let a = gp[0];
    let { ix, lin } = a;
    const o = [];
    let curGp = [];
    for (let { ix, lin } of gp) {
        if (x.sHasPfx(sep)(lin)) {
            if (curGp.length !== 0)
                o.push(curGp);
            curGp = [];
        }
        else
            curGp.push({ ix, lin });
    }
    if (curGp.length !== 0)
        o.push(curGp);
    return o;
};
const gpRmvRmkLin = gp => gp;
const gpyRmvRmkLin = x.itrMap(gpRmvRmkLin);
const assertAyIsEqLen = a1 => a2 => {
    if (a1.length !== a2.length)
        x.er('two ay are diff len', { a1, a2 });
};
const gpLy = a => x.itrMap(x.oPrp("lin"))(a);
const gpyBky = (a) => {
    const lyy = x.itrMap(gpLy)(a);
    const bktyy = x.itrMap(lyBkty)(lyy);
    const z = x.ayZip(bktyy, a);
    const o = x.itrMap(([bkty, gp]) => { return { bkty, gp }; })(z);
    return o;
};
const _x = x.sSplitSpc("drp upd sel dist");
const isSqLy = a => x.vIN(_x)(x.sRmvPfx("?")(lyFstNonRmkLin(a)).toLowerCase());
const isRmLy = a => x.itrPredIsAllTrue(x.isRmkLin)(a);
const isPmLy = a => x.lyHasMajPfx("%")(a);
const isSwLy = a => x.lyHasMajPfx("?")(a);
const lyBkty = ly => {
    let o;
    switch (true) {
        case (isRmLy(ly)):
            o = 0 /* RM */;
            break;
        case (isPmLy(ly)):
            o = 1 /* PM */;
            break;
        case (isSwLy(ly)):
            o = 2 /* SW */;
            break;
        case (isSqLy(ly)):
            o = 3 /* SQ */;
            break;
        default:
            o = 4 /* ER */;
    }
    return o;
};
const gpBk = gp => { return { bkty: lyBkty(gpLy(gp)), gp }; };
const linFstTerm = a => x.linShift(a).term;
const lySdic = ly => {
    const o = new Map();
    for (let lin of ly) {
        const { term: k, remainLin: s } = x.linShift(lin);
        o.set(k, s);
    }
    return o;
};
const lyFstTermAy = x.itrMap(linFstTerm);
const lyFstTermDupSet = x.compose(x.itrMap(linFstTerm), x.itrDupSet);
const gpDupFstTermEr = a => {
    const dup = lyFstTermDupSet(gpLy(a));
    const o = [];
    for (let { ix, lin } of a) {
        let fst = linFstTerm(lin);
        if (dup.has(fst)) {
            let sfxMsg = [`"duplicate(${fst})`];
            let endMsg = [];
            const er = { ix, sfxMsg, endMsg };
            o.push(er);
        }
    }
    return o;
};
const bkPm = bk => {
    if (bk === undefined)
        return { er: [], pm: new Map() };
    const er = gpDupFstTermEr(bk.gp);
    const ly = gpLy(bk.gp);
    const pm = x.lySdic(ly);
    return { er, pm };
};
const vdt = ([itmErPred, itmErMap]) => ([ery, itr]) => {
    const { t: er, f: remainingAy } = x.itrBrkForTrueFalse(itmErPred)(itr);
    const ery1 = x.itrMap(itmErMap)(er);
    const ery2 = ery.concat(ery1);
    return [ery2, remainingAy];
};
const linTermAy = lin => lin.trim().split(/\s+/);
const linFmT3DupTermSet = lin => {
    let termAy = linTermAy(lin);
    termAy.shift();
    termAy.shift();
    return x.itrDupSet(termAy);
};
const linTermPosAy = lin => {
    let a = lin;
    const o = [];
    let j = 0;
    let pos = 0;
    do {
        if ((j++) > 100)
            throw new Error('looping too much');
        let [x, a1, a2, a3] = a.match(/(\s*)(\S+)(.*)/);
        if (a1 !== "") {
            pos = pos + a1.length;
            o.push(pos);
            pos = pos + a2.length;
        }
        else {
            if (a3 !== "")
                throw new Error('impossible');
        }
        a = a3;
    } while (a.trim() !== "");
    return o;
};
//const xx  = linTermPosAy(" sdf lk fdf d  ")
const linAddMrk = (lin, pos, len) => {
    const s = x.nSpc(pos - lin.length);
    const m = '^'.repeat(len);
    return lin + s + m;
};
const linFmT3DupTermMrk = lin => {
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
const swChkr = (() => {
    const FmT3Dup = {};
    FmT3Dup.hasEr = a => linFmT3DupTermSet(a.lin).size > 0;
    FmT3Dup.erFun = a => [{ ix: a.ix, sfxMsg: [linFmT3DupTermMrk(a.lin)], endMsg: [] }];
    return { FmT3Dup };
})();
const gppassVdt = chkr => (a) => {
    const p = chkr.hasEr;
    const m = chkr.erFun;
    const [erGp, remainingGp] = gpSplitForErAndRemain(p)(a.gp);
    const e1 = x.itrMap(m)(erGp);
    return { er: [], gp: a.gp };
};
const bkSw_process_SwEr = (gp, er, SwEr) => { };
const bkSw = pm => bk => {
    if (bk === undefined)
        return { er: [], sw: new Map() };
    let er = gpDupFstTermEr(bk.gp);
    let gp = bk.gp;
    let e = [];
    /*
    for (let ixlinChkr of x.oPrpNy(swChkr)) {
        { er: e, gp } = gppassVdt(ixlinChkr)({ er, gp })
        er = er.concat(e)
    }
    */
    const sw = lySw(pm)(gpLy(gp));
    return { er, sw };
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
    const evlT1T2 = ay => [evlT(ay[0]), evlT2(ay[1])];
    const evlOR = ay => { let a = evlAy(ay); return xOR(a); };
    const evlAND = ay => { let a = evlT1T2(ay); return xAND(a); };
    const evlEQ = ay => { let a = evlT1T2(ay); return xEQ(a); };
    const evlNE = ay => { let a = evlT1T2(ay); return xNE(a); };
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
                boolOpt = evlEQ(ay);
                break;
            case 'NE':
                boolOpt = evlNE(ay);
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