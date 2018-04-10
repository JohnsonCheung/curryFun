"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./typings/node/node.d.ts"/>
/// <reference path="./common.d.ts"/>
/// <reference path="./rel.d.ts"/>
/// <reference path="./curryfun.d.ts"/>
const cf = require("./curryfun");
'use strict';
const { assertIsEq, er, sSplitLines, pipe, lyRmvEmpLin, map, dicKset, itrAddPfx, linFstTerm, linLasTerm, setAftIncl, setClone, oSrt, oBrw, each, itrFst, itrLas, itrRmvEmp, ssetAddPfxAsLin, sSplitCommaSpc, sSplitLf, sSplitCrLf, sSplitSpc, itrAy, setMinus, setWhere, setAy, setSrt, dmp, where, predsAnd, predNot, compose } = cf;
const x1_isCyc = (_rel, _par, _chd) => {
    for (let [par, chdSet] of _rel) {
        if (par === _chd)
            if (chdSet.has(_par))
                return true;
    }
    return false;
};
const x1_rel_add_par_chd = (_o_rel, _par, _chd) => {
    const chdSet = _o_rel.get(_par);
    if (chdSet === undefined) {
        _o_rel.set(_par, new Set(_chd));
    }
    else {
        _o_rel.set(_par, chdSet.add(_chd));
    }
};
exports.relInf = (_relLines) => {
    const relLy = sSplitLines(_relLines);
    const [cycPairAy, srtRel] = x1cycPairAy_and_srtRel(relLy);
    const itmSet = setSrt(xItmSet(srtRel));
    const parSet = setSrt(dicKset(srtRel));
    const rootSet = setSrt(setWhere(isRoot(srtRel))(parSet));
    const chdSet = setSrt(setWhere(isChd(srtRel))(itmSet));
    const leafSet = setSrt(setWhere(predNot(isPar(srtRel)))(chdSet));
    const mpcSet = setSrt(setWhere(isMpc(srtRel))(chdSet));
    const tpnRel = xTpnRel(rootSet, srtRel);
    const evlRel = xEvlRel(rootSet, srtRel);
    const lvlRel = xLvlRel(rootSet, srtRel);
    let ly;
    {
        const tpnLy = map(relItmAddPfxAsLin('topDownRel'))(tpnRel);
        const lvlLy = map(relItmAddPfxAsLin('levelRel'))(lvlRel);
        const evlLy = map(relItmAddPfxAsLin('inOrderRel'))(evlRel);
        const inp = itrAddPfx('inp ')(relLy);
        const rel = map(relItmAddPfxAsLin('srtRel'))(srtRel.entries());
        const root = ssetAddPfxAsLin('rootSet')(rootSet);
        const itm = ssetAddPfxAsLin('itmSet')(itmSet);
        const par = ssetAddPfxAsLin('parSet')(parSet);
        const chd = ssetAddPfxAsLin('chdSet')(chdSet);
        const leaf = ssetAddPfxAsLin('leafSet')(leafSet);
        const mpc = ssetAddPfxAsLin('mpcSet')(mpcSet);
        const cyc = map((a) => { let [par, chd] = a; return 'cycPair ' + par + ' ' + chd; })(cycPairAy);
        ly = inp.concat(rel, root, itm, par, chd, leaf, mpc, cyc, tpnLy, lvlLy, evlLy);
    }
    return {
        srtRel, cycPairAy,
        itmSet, rootSet, leafSet, parSet, chdSet, mpcSet,
        evlRel, lvlRel, tpnRel,
        ly,
    };
};
const x1cycPairAy_and_srtRel = (_relLy) => {
    const oCycPairAy = [];
    const relItmAy = map(x1_relItm_or_null)(_relLy);
    const relItmAy1 = itrRmvEmp(relItmAy);
    let rel = new Map();
    for (let [par, chdSet] of relItmAy1) {
        for (let chd of chdSet) {
            if (x1_isCyc(rel, par, chd)) {
                oCycPairAy.push([par, chd]);
            }
            else {
                x1_rel_add_par_chd(rel, par, chd);
            }
        }
    }
    const oSrtRel = x1_srtRel(rel);
    return [oCycPairAy, oSrtRel];
};
const x1_srtRel = (_rel) => _rel;
const xTpnRel = (_root, _rel) => {
    const z = new Map();
    each(r)(_root);
    return z;
    function r(par) {
        const chdSet = _rel.get(par);
        if (chdSet !== undefined) {
            z.set(par, chdSet);
            each(r)(chdSet);
        }
    }
};
const xEvlRel = (_root, rel) => {
    const z = new Map();
    each(r)(_root);
    return z;
    function r(par) {
        const chdSet = rel.get(par);
        if (chdSet !== undefined) {
            for (let chd of chdSet) {
                r(chd);
            }
            z.set(par, chdSet);
        }
    }
};
const xLvlRel = (_root, _rel) => {
    //console.log($rel2ly(rel))
    //debugger
    const z = new Map();
    for (let rootItm of _root) {
        const chdSet = _rel.get(rootItm);
        if (chdSet !== undefined)
            z.set(rootItm, chdSet);
    }
    each(r)(_root);
    return z;
    function r(par) {
        const chdSet = _rel.get(par);
        if (chdSet !== undefined) {
            z.set(par, chdSet);
            each(r)(chdSet);
        }
    }
};
const $relStrLy = (_relLines) => lyRmvEmpLin(sSplitLines(_relLines));
const x1_relItm_or_null = (_relLin) => {
    const ay = sSplitSpc(_relLin);
    const k = ay.shift();
    if (k === undefined)
        return null;
    const chdSet = new Set(ay);
    chdSet.delete(k);
    if (chdSet.size === 0)
        return null;
    return [k, chdSet];
};
const isChd = (_rel) => (itm) => {
    for (let [par, chdSet] of _rel)
        if (chdSet.has(itm))
            return true;
    return false;
};
const isMpc = (_rel) => (_chd) => {
    let parCnt = 0;
    for (let [par, chdSet] of _rel) {
        if (chdSet.has(_chd)) {
            if (parCnt === 1) {
                //                console.log(_chd, 'isMpc=true')
                return true;
            }
            else {
                parCnt++;
            }
        }
    }
    //    console.log(_chd, 'isMpc=false')
    return false;
};
const isPar = (rel) => (itm) => rel.has(itm);
const isRoot = (_rel) => predsAnd(isPar(_rel), predNot(isChd(_rel)));
const xItmSet = (_rel) => {
    const o = new Set();
    for (let [k, chdSet] of _rel) {
        o.add(k);
        for (let chd of chdSet) {
            o.add(chd);
        }
    }
    return o;
};
const relItmAddPfxAsLin = (_pfx) => (_relItm) => {
    const pfx = _pfx === undefined ? '' : _pfx;
    const [k, chdSet] = _relItm;
    const z = pfx + (pfx ? ' ' : '') + k + ' ' + ssetAddPfxAsLin('')(chdSet);
    return z;
};
exports.relBrw = (_rel) => oBrw(relJson(_rel));
const ssetSy = (_sset) => itrAy(_sset);
const relJson = (_rel) => {
    let o = {};
    for (let [par, chdSet] of _rel) {
        o[par] = ssetSy(chdSet).sort();
    }
    return oSrt(o);
};
//!tst =====================
function tst__cycPairAy() {
    t1();
    function r(exp, relLines) {
        const act = exports.relInf(relLines).cycPairAy;
        assertIsEq(exp, act);
    }
    function t1() {
        const relLines = `a z b c d e
y 1
b d e f
x y z`;
        const exp = [];
        r(exp, relLines);
    }
}
function tst__relInf() {
    t1();
    function r(exp, relLines) {
        const act = exports.relInf(relLines);
        cf.oBrw(act);
        debugger;
        const cycPairAy = [];
        assertIsEq(cycPairAy, act.cycPairAy);
        assertIsEq(3, act.srtRel.size);
        const actRelAy = itrAy(act.srtRel);
    }
    function t1() {
        const relLines = `a z b c d e
y 1
b d e f
x y z`;
        const exp = [];
        r(exp, relLines);
    }
}
function tst__relBrw() {
    const relLines = `a z b c d e
y 1
b d e f
x y z`;
    const srtRel = exports.relInf(relLines).srtRel;
    exports.relBrw(srtRel);
}
function tst__mpcSet() {
    dmp('tst__mpcSet -- multiple parent child set');
    t1();
    t2();
    function r(exp, relLines) {
        const act = ssetSy(exports.relInf(relLines).mpcSet);
        assertIsEq(exp, act);
    }
    function t1() {
        dmp('\tt1');
        let exp = ['a', 'b'];
        let relLines = `x a b
y a b`;
        r(exp, relLines);
    }
    function t2() {
        dmp('\tt2');
        const exp = ['d', 'e', 'z'];
        const relLines = `a z b c d e
y 1
b d e f
x y z`;
        r(exp, relLines);
    }
}
function tst__x1_isCyc() {
    dmp('tst__x1_isCyc');
    t1();
    t2();
    t3();
    function r(exp, rel, par, chd) {
        const act = x1_isCyc(rel, par, chd);
        assertIsEq(exp, act);
    }
    function t1() {
        dmp('\tt1');
        const exp = true;
        const rel = new Map([['a', new Set('b')]]);
        const par = 'b';
        const chd = 'a';
        r(exp, rel, par, chd);
    }
    function t2() {
        dmp('\tt2');
        const exp = false;
        const rel = new Map([['a', new Set('b')]]);
        const par = 'b';
        const chd = 'c';
        r(exp, rel, par, chd);
    }
    function t3() {
        dmp('\tt3');
        const exp = true;
        const rel = new Map([
            ['a', new Set(['b', 'c'])]
        ]);
        const par = 'c';
        const chd = 'a';
        r(exp, rel, par, chd);
    }
}
//import * as scanPgm from './scanPgm'; scanPgm.fjs_updFtsMainTstIfStmt(__filename)
//!runTst ==================
if (module.id === '.') {
    tst__x1_isCyc();
    tst__cycPairAy();
    tst__mpcSet();
    tst__relBrw();
    tst__relInf();
    $relStrLy; // = (_relLines: lines): ly => lyRmvEmpLin(sSplitLines(_relLines))
    isChd; // = (_rel: rel) => (itm: s) => {
    isMpc; // = (_rel: rel) => (_chd: s) => {
    isPar; // = (rel: rel) => (itm: s) => rel.has(itm)
    isRoot; // = (_rel: rel) => predsAnd(isPar(_rel), predNot(isChd(_rel))) as ((_itm: k) => b)
    exports.relBrw; // = (_rel: rel) => oBrw(relJson(_rel))
    exports.relInf; // = (_relLines: lines): relInf => {
    relItmAddPfxAsLin; // = (_pfx: s) => (_relItm: relItm) => {
    relJson; // = (_rel: rel) => {
    ssetSy; // = (_sset: sset): sy => itrAy(_sset)
    x1_isCyc; // = (_rel: rel, _par: s, _chd: s): b => {
    x1_rel_add_par_chd; // = (_o_rel: rel, _par: s, _chd: s): void => {
    x1_relItm_or_null; // = (_relLin: lin): relItm | null => {
    x1_srtRel; // = (_rel: rel): rel => _rel
    x1cycPairAy_and_srtRel; // = (_relLy: ly): [cycPairAy, srtRel] => {
    xEvlRel; // = (_root: sset, rel: rel): rel => {
    xItmSet; // = (_rel: rel): sset => {
    xLvlRel; // = (_root: sset, _rel: rel): rel => {
    xTpnRel; // = (_root: sset, _rel: rel): rel => { // Top down relation array
}
//# sourceMappingURL=rel.js.map