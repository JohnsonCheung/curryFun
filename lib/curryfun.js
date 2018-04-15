"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./typings/node/node.d.ts"/>
/// <reference path="./typings/common.d.ts"/>
//--------------------------------------------
const child_process = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const u = require("util");
const assert = require('assert'); //import * as assert from 'assert'
//-------------------------------------------------
exports.isEq = (exp, act) => {
    try {
        assert.deepStrictEqual(act, exp);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.isNotEq = (exp, act) => !exports.isEq(exp, act);
exports.sCmp = (exp, act) => {
    exports.sBrwAtFdrFn('strCmp', 'exp')(exp);
    exports.sBrwAtFdrFn('strCmp', 'act')(act);
    debugger;
};
exports.vCmp = (exp, act) => {
    if (exports.isBool(exp) && exports.isBool(act)) {
        if (act !== exp) {
            debugger;
            return;
        }
    }
    if (exports.isStr(exp) && exports.isStr(act))
        return exports.sCmp(exp, act);
    exports.oBrwAtFdrFn('vCmp', 'exp')(exp);
    exports.oBrwAtFdrFn('vCmp', 'act')(act);
    debugger;
};
exports.assertIsEq = (exp, act) => exports.isNotEq(exp, act) ? exports.vCmp(exp, act) : void 0;
exports.assertIsNotEq = (exp, act) => exports.isEq(exp, act) ? exports.vCmp(exp, act) : void 0;
//-------------------------------------------------------------------------
exports.vLT = x => a => a < x;
exports.vGE = x => a => a >= x;
exports.vLE = x => a => a <= x;
exports.vEQ = (x) => (a) => a === x;
exports.vNE = (x) => (a) => a !== x;
exports.vGT = x => a => a > x;
exports.vIN = (itr) => a => { for (let i of itr)
    if (i === a)
        return true; return false; };
exports.vNotIn = itr => a => !exports.vIN(itr)(a);
exports.vBET = (x, y) => (a) => x <= a && a <= y;
exports.vNotBet = (x, y) => (a) => !exports.vBET(x, y)(a);
exports.vIsInstanceOf = (x) => (a) => a instanceof x;
exports.ensSy = (a) => typeof a === 'string' ? exports.sSplitSpc(a) : a;
exports.ensRe = (a) => a instanceof RegExp ? a : new RegExp(a);
//-------------------------------------
exports.pipe = v => (...f) => { let o = v; for (let ff of f)
    o = ff(o); return o; };
exports.vMap = (f) => a => f(a);
exports.funApply = v => (a) => a(v);
exports.swap = (f) => a => b => f(b)(a);
exports.compose = (...f) => v => exports.pipe(v)(...f);
//----------------------------------
exports.dicLy = (a) => exports.itrMap(exports.kvLin)(a);
exports.dicLines = (a) => exports.dicLy(a).join('\r\n');
exports.kvLin = ([k, v]) => k + ' ' + v;
exports.dmp = global.console.log;
exports.funDmp = (f) => exports.dmp(f.toString());
exports.halt = () => { throw new Error(); };
exports.sEscLf = (a) => a.replace('\n', '\\n');
exports.sEscVbar = (a) => a.replace(/\|/g, '\\v');
exports.sEscCr = (a) => a.replace(/\r/g, '\\r');
exports.sEscTab = (a) => a.replace(/\t/g, '\\t');
exports.sEsc = exports.compose(exports.sEscLf, exports.sEscCr, exports.sEscTab);
exports.sFmt = (qqStr, ...v) => {
    let z = qqStr;
    for (let i of v) {
        z = z.replace('?', i);
    }
    return z;
};
exports.sBox = (a) => { const y = "== " + exports.sEsc(a) + " ==", x = "=".repeat(a.length + 6); return [x, y, x].join("\r\n"); };
exports.stack = () => { try {
    throw new Error();
}
catch (e) {
    let z = e.stack;
    return z;
} };
exports.er = (msg, ...v) => {
    let a = exports.stack();
    let b = a.split(/\n/);
    let c = b[3];
    let d = c.split(/\s+/);
    let breakingFunNm = d[2];
    let hdr = exports.sBox(breakingFunNm);
    exports.dmp(hdr);
    exports.dmp(`error[${msg}] ------------------------\n`);
    exports.itrEach(exports.dmp)(v);
    exports.dmp(a);
    exports.dmp('------------------------------------------------');
    let dbg = true;
    debugger;
    //    if (dbg)
    //        halt()
};
//-----------------------------------------------------------------------
exports.sSplit = (sep) => (a) => a.split(sep);
exports.sRmvCr = (a) => a.replace(/\r/g, '');
exports.sSplitLines = (a) => exports.sSplitLf(exports.sRmvCr(a));
exports.sSplitSpc = (_s) => exports.sSplit(/\s+/)(_s.trim());
exports.sSplitCrLf = exports.sSplit('\r\n');
exports.sSplitLf = exports.sSplit('\n');
exports.sSplitCommaSpc = exports.sSplit(/,\s*/);
//-----------------------------------------------------------------------
exports.vDft = (dft) => (a) => a === null || a === undefined ? dft : a;
exports.vDftStr = exports.vDft("");
exports.vDftUpper = (x, y) => (a) => a === null || a === undefined || x > a || a > y ? y : a;
exports.vDftLower = (x, y) => (a) => a === null || a === undefined || x > a || a > y ? x : a;
exports.ayFindIx = (p) => (a) => { for (let i in a)
    if (p(a[i]))
        return Number(i); return null; };
exports.ayFindIxOrDft = (dftIx) => (p) => (a) => exports.vDft(dftIx)(exports.ayFindIx(p)(a));
exports.ayFst = (a) => a[0];
exports.aySnd = (a) => a[1];
exports.ayEle = (ix) => (a) => a[ix];
exports.ayEleOrDft = (dft) => (ix) => (a) => exports.vDft(dft)(a[ix]);
exports.ayLas = (a) => a[exports.vLen(a) - 1];
exports.aySetEle = (ix) => (v) => (a) => { a[ix] = v; };
exports.ayMdyEle = (ix) => (f) => (a) => { a[ix] = f(a[ix]); };
exports.ayMdy = (f) => (a) => exports.each((itm, ix) => { if (ix !== undefined)
    a[ix] = f(a[ix]); })(exports.nItr(a.length));
//-----------------------------------------------------------------------
exports.ayJn = (sep) => (a) => a.join(sep);
exports.ayJnCrLf = exports.ayJn('\r\n');
exports.ayJnLf = exports.ayJn('\n');
exports.ayJnSpc = exports.ayJn(' ');
exports.ayJnComma = exports.ayJn(',');
exports.ayJnCommaSpc = exports.ayJn(', ');
exports.nSpc = (a) => ' '.repeat(a);
exports.ayJnAsLines = (sep0, tab0, wdt0) => (a) => {
    let wdt = exports.vDftUpper(20, 120)(wdt0);
    let sep = exports.vDft('')(sep0);
    let slen = sep.length;
    let pfx = exports.nSpc(exports.vDft(0)(tab0));
    let x = (() => {
        const oo = [];
        let o = [];
        let ww = 0;
        for (let s of a) {
            let l = exports.sLen(s) + slen;
            if (ww + l > wdt) {
                oo.push(pfx + exports.itrAddSfx(sep)(o).join(""));
                o = [];
                ww = 0;
            }
            o.push(s);
            ww += l;
        }
        if (o.length > 0) {
            oo.push(pfx + exports.itrAddSfx(sep)(o).join(""));
        }
        return oo;
    })();
    let b = exports.ayJnCrLf(x);
    return b;
};
//-----------------------------------------------------------------------
exports.sFstChr = (a) => a[0];
exports.sLasChr = (a) => a[a.length - 1];
exports.sAddPfx = (pfx) => (a) => pfx + a;
exports.sAddSfx = (sfx) => a => a + sfx;
exports.sAddPfxSfx = (pfx, sfx) => (a) => pfx + a + sfx;
exports.vLen = a => typeof a === 'string' ? a.length : ((a && a.length) || String(a).length);
exports.sLen = (a) => a.length;
exports.sMidN = (pos) => (n) => (a) => a.substr(pos, n);
exports.sMid = (pos) => (a) => a.substr(pos);
exports.sLeft = (n) => (a) => a.substr(0, n);
exports.sTrim = (a) => a.trim();
exports.sRight = (n) => (a) => {
    const l = exports.vLen(a);
    if (n >= l)
        return a;
    if (0 >= n)
        return '';
    return a.substr(-n);
};
exports.nPadZero = (dig) => (a) => {
    const s = String(a);
    const nZer = dig - s.length;
    const z = nZer > 0 ? "0".repeat(nZer) : "";
    return z + s;
};
exports.sAlignL = (w) => (a) => {
    if (a === null || a === undefined)
        return exports.nSpc(w);
    const l = exports.vLen(a);
    if (l > w)
        return a;
    return a + exports.nSpc(w - l);
};
exports.sAlignR = (w) => (a) => {
    const l = exports.sLen(a);
    if (l > w)
        return a;
    return exports.nSpc(w - l) + a;
};
exports.sWrt = (ft) => (a) => fs.writeFileSync(ft, a);
exports.sSbsPos = (sbs) => (a) => a.indexOf(sbs);
//strictEqual(sbsPos('aabb')('123aabb'),3)
exports.sSbsRevPos = (sbs) => (a) => a.lastIndexOf(sbs);
//strictEqual(sbsRevPos('a')('0123aabb'),5)
exports.cmlNm = (a) => exports.cmlNy(a).reverse().join(' '); // @eg cmlNm(relItmNy) === 'Ny Itm rel'
exports.cmlSpcNm = (a) => exports.cmlNy(a).join(' ');
exports.isNm = (s) => {
    if (s === undefined || s === null || s === '')
        return false;
    if (!exports.chrCd_isFstNmChr(s.charCodeAt(0)))
        return false;
    for (let i = 1; i < s.length; i++) {
        if (!exports.chrCd_isNmChr(s.charCodeAt(i)))
            return false;
    }
    return true;
};
exports.sRplNonNmChr = (a) => {
    const a1 = [];
    for (let i = 0; i < a.length; i++) {
        const c = a.charCodeAt(i);
        if (exports.chrCd_isNmChr(c))
            a1.push(a[i]);
        else
            a1.push(' ');
    }
    return a1.join('');
};
exports.sNmSet = (a) => new Set(exports.sRplNonNmChr(a).split(/\s+/));
const _isBrkChrCd = (c) => c === NaN || exports.chrCd_isCapitalLetter(c) || exports.chrCd_isUnderScore(c) || exports.chrCd_isDollar(c);
const _isBrk = (c, c0) => _isBrkChrCd(c) && !_isBrkChrCd(c0);
exports.cmlNy = (a) => {
    if (!exports.isNm(a))
        exports.er('Give {s} is not a name', { s: a });
    const o = [];
    let m = '';
    for (let i = a.length; i--; i > 0) {
        const cc = a[i];
        const c = a.charCodeAt(i);
        const c0 = a.charCodeAt(i - 1);
        m = cc + m;
        if (_isBrk(c, c0)) {
            o.push(m);
            m = '';
        }
    }
    if (m !== '')
        o.push(m);
    const z = o.reverse();
    return z;
};
exports.sHasPfx = (pfx) => (a) => a.startsWith(pfx);
exports.sHasSfx = (sfx) => (a) => a.endsWith(sfx);
exports.sRmvSfx = (sfx) => (a) => exports.sHasSfx(sfx)(a) ? a.substr(0, a.length - sfx.length) : a;
exports.sRmvPfx = (pfx) => (a) => exports.sHasPfx(pfx)(a) ? a.substr(pfx.length) : a;
exports.sHasPfx_IGNORE_CASE = (pfx) => (a) => a.toUpperCase().startsWith(pfx.toUpperCase());
exports.sHasSfx_IGNORE_CASE = (sfx) => (a) => a.toUpperCase().endsWith(sfx.toUpperCase());
exports.sRmvPfx_IGNORE_CASE = (pfx) => (a) => exports.sHasPfx(pfx)(a) ? a.substr(pfx.length) : a;
exports.sRmvSfx_IGNORE_CASE = (sfx) => (a) => exports.sHasSfx(sfx)(a) ? a.substr(0, a.length - sfx.length) : a;
exports.sHasPfxIgnCas = exports.sHasPfx_IGNORE_CASE;
exports.sMatch = (re) => (a) => a.match(re);
//-----------------------------------------------------------------------
exports.predNot = a => v => !a(v);
exports.predsOr = (...a) => v => { for (let p of a)
    if (p(v))
        return true; return false; };
exports.predsAnd = (...a) => v => { for (let p of a)
    if (!p(v))
        return false; return true; };
//-----------------------------------------------------------------------
exports.isRmkLin = (a) => {
    const l = a.trim();
    if (l === "")
        return true;
    if (exports.sHasPfx("--")(l))
        return true;
    return false;
};
exports.isNonRmkLin = exports.predNot(exports.isRmkLin);
exports.linRmvMsg = (a) => {
    const a1 = a.match(/(.*)---/);
    const a2 = a1 === null ? a : a1[1];
    if (exports.sHasPfx("^")(a2.trimLeft()))
        return "";
    return a2;
};
//------------------------------------------------------------------
exports.sBrkAt = (at, len) => (a) => { return { s1: exports.sLeft(at)(a).trim(), s2: exports.sMid(at + len)(a).trim() }; };
exports.sBrk1 = (sep) => (a) => { const at = exports.sSbsPos(sep)(a); return at === -1 ? { s1: exports.sTrim(a), s2: '' } : exports.sBrkAt(at, exports.sLen(sep))(a); };
exports.sBrk2 = (sep) => (a) => { const at = exports.sSbsPos(sep)(a); return at === -1 ? { s1: '', s2: exports.sTrim(a) } : exports.sBrkAt(at, exports.sLen(sep))(a); };
exports.sBrk = (sep) => (a) => { const at = exports.sSbsPos(sep)(a); return exports.sBrkAt(at, exports.sLen(sep))(a); };
exports.quoteStrBrk = (a) => {
    const l = a.length;
    if (l === 1)
        return { q1: a, q2: a };
    if (l === 2)
        return { q1: a.substr(0, 1), q2: a.substr(1) };
    let p = exports.sSbsPos("*")(a);
    if (p === -1)
        return { q1: "", q2: "" };
    let { s1: q1, s2: q2 } = exports.sBrkAt(p, 1)(a);
    return { q1, q2 };
};
exports.sQuote = (q) => (a) => {
    let qq = exports.quoteStrBrk(q);
    if (qq === null)
        return a;
    else {
        let { q1, q2 } = qq;
        return q1 + a + q2;
    }
    ;
};
//-----------------------------------------------------------------------
exports.sTakBef = (sep) => (a) => exports.sRevBrk2(sep)(a).s1;
exports.sTakAft = (sep) => (a) => exports.sRevBrk1(sep)(a).s2;
//-----------------------------------------------------------------------
exports.sRevBrk1 = (sep) => (a) => { const at = exports.sSbsPos(sep)(a); return at === -1 ? { s1: a.trim(), s2: '' } : exports.sBrkAt(at, sep.length)(a); };
exports.sRevBrk2 = (sep) => (a) => { const at = exports.sSbsPos(sep)(a); return at === -1 ? { s1: '', s2: a.trim() } : exports.sBrkAt(at, sep.length)(a); };
exports.sRevBrk = (sep) => (a) => { const at = exports.sSbsRevPos(sep)(a); return exports.sBrkAt(at, sep.length)(a); };
exports.sRevTakBef = (sep) => (a) => exports.sRevBrk2(sep)(a).s1;
exports.sRevTakAft = (sep) => (a) => exports.sRevBrk1(sep)(a).s2;
//-----------------------------------------------------------------------
exports.sRmvFstChr = exports.sMid(1);
exports.sRmvLasChr = (a) => exports.sLeft(a.length - 1)(a);
exports.sRmvLasNChr = (n) => (a) => exports.sLeft(a.length - n)(a);
exports.sRmvSubStr = (sbs) => (a) => { const re = new RegExp(sbs, 'g'); return a.replace(re, ''); };
exports.sRmvColon = exports.sRmvSubStr(":");
exports.pthsep = path.sep;
exports.sPthSepPosRev = (s) => {
    const z = s.lastIndexOf('\\');
    if (z >= 0)
        return z;
    return s.lastIndexOf('/');
};
exports.pthPar = (a) => {
    const segAy = exports.pthSegAy(a);
    segAy.pop();
    segAy.pop();
    return segAy.join(exports.pthsep) + exports.pthsep;
};
exports.pthSegAy = (a) => a.split(/[\\\/]/g);
exports.pthBrw = (a) => exports.cmdShell(exports.sFmt('explorer "?"', a));
exports.ffnPth = (a) => { const at = exports.sPthSepPosRev(a); return at === -1 ? '' : exports.sLeft(at + 1)(a); };
exports.ffnFn = (a) => { const at = exports.sPthSepPosRev(a); return at === -1 ? a : exports.sMid(at + 1)(a); };
exports.ffnExt = (a) => { const at = a.lastIndexOf('.'); return at === -1 ? '' : exports.sMid(at)(a); };
exports.ffnAddFnSfx = (sfx) => (a) => exports.ffnFfnn(a) + sfx + exports.ffnExt(a);
exports.ffnRmvExt = (a) => { const at = a.indexOf('.'); return at === -1 ? a : exports.sLeft(at)(a); };
exports.ffnFfnn = exports.ffnRmvExt;
exports.ffnFnn = (a) => exports.ffnFn(exports.ffnRmvExt(a));
exports.ffnRplExt = (ext) => (a) => exports.ffnRmvExt(a) + ext;
//-----------------------------------------------------------------------
exports.ftLines = (a) => (fs.readFileSync(a).toString());
exports.ftLy = (a) => exports.sSplitLines(exports.ftLines(a));
//-----------------------------------------------------------------------
exports.tmpnm = () => exports.sRmvColon(new Date().toJSON());
exports.tmppth = os.tmpdir + exports.pthsep;
exports.tmpffn = (pfx = "", ext, _fdr, _fn) => exports.tmpfdr(_fdr) + pfx + exports.tmpnm() + ext;
exports.tmpfdr = (fdr) => {
    if (fdr === undefined)
        return exports.tmppth;
    const a = exports.tmppth + 'Fdr/';
    exports.pthEns(a);
    const a1 = a + fdr + exports.pthsep;
    exports.pthEns(a1);
    const a2 = a1 + exports.tmpnm() + exports.pthsep;
    exports.pthEns(a2);
    return a2;
};
exports.tmpffnByFdrFn = (fdr, fn) => exports.tmpfdr(fdr) + fn;
exports.tmpft = () => exports.tmpffn("T", ".txt");
exports.tmpfjson = (_fdr, _fn) => exports.tmpffn("T", ".json", _fdr, _fn);
exports.ffnCloneTmp = (a) => {
    const o = exports.tmpffn(undefined, exports.ffnExt(a));
    fs.copyFileSync(a, o);
    fs.read;
    return o;
};
//-----------------------------------------------------------------------
exports.pm = (f, ...p) => new Promise(
/**
 * @description return a Promise of {er,rslt} by calling f(...p,cb), where cb is (er,rslt)=>{...}
 * it is usefully in creating a promise by any async f(...p,cb)
 * @param {(er,rslt)=>void} f
 * @param {...any} p
 * @see
 */
(rs, rj) => {
    f(...p, (e, rslt) => {
        e ? rj(e) : rs(rslt);
    });
});
exports.pmErRslt = (f, ...p) => new Promise((rs, rj) => {
    f(...p, (er, rslt) => {
        let z = er ? { er, rslt: null } : { er, rslt };
        rs(z);
    });
});
exports.pmRsltOpt = (f, ...p) => new Promise((rs, rj) => {
    f(...p, (er, rslt) => {
        let z = er ? null : rslt;
        rs(z);
    });
});
exports.ftLinesPm = (a) => exports.pm(fs.readFile, a).then(rslt => rslt.toString());
exports.ftLyPm = (a) => exports.ftLinesPm(a).then(lines => exports.sSplitCrLf(lines));
exports.pthEns = (a) => { if (!fs.existsSync(a))
    fs.mkdirSync(a); };
exports.isPthExist = (a) => fs.existsSync(a);
exports.isFfnExist = (a) => fs.existsSync(a);
exports.assertIsPthExist = (a) => { if (!exports.isPthExist(a))
    exports.er(`path does not exist [${a}]`); };
exports.pthEnsSfxSep = (a) => exports.sLasChr(a) === exports.pthsep ? a : a + exports.pthsep;
exports.pthEnsSubFdr = (subFdr) => (a) => {
    exports.assertIsPthExist(a);
    let b = subFdr.split(/[\\\/]/);
    let c = exports.itrRmvEmp(b);
    let d = exports.pthEnsSfxSep(a);
    let e = [];
    for (let seg of c) {
        d += seg + '\\';
        e.push(d);
    }
    exports.itrEach(exports.pthEns)(e);
};
//-----------------------------------------------------------------------
exports.itrWhere = (p) => (a) => { const o = []; for (let i of a)
    if (p(i))
        o.push(i); return o; };
exports.itrExclude = (p) => (a) => { const o = []; for (let i of a)
    if (!p(i))
        o.push(i); return o; };
exports.itrMap = (f) => (a) => { let i = 0; const o = []; for (let itm of a)
    o.push(f(itm, i++)); return o; };
exports.itrEach = (f) => (a) => { let i = 0; for (let itm of a)
    f(itm, i++); };
exports.itrFold = _itrFold => f => cum => a => { for (let i of a)
    cum = f(cum)(i); return cum; };
exports.itrReduce = f => (a) => exports.itrFold(f)(exports.itrFst(a))(a);
exports.where = exports.itrWhere;
exports.map = exports.itrMap;
exports.each = exports.itrEach;
//---------------------------------------------------------------------------
exports.mapKy = (_map) => exports.itrAy(_map.keys());
exports.mapVy = (_map) => exports.itrAy(_map.values());
exports.mapKvy = (_map) => exports.itrAy(_map.entries());
exports.mapKset = (_map) => new Set(_map.keys());
//---------------------------------------------------------------------------
exports.setAy = (_set) => { const o = []; for (let i of _set)
    o.push(i); return o; };
exports.setWhere = (_p) => (_set) => {
    const z = new Set();
    for (let i of _set)
        if (_p(i))
            z.add(i);
    return z;
};
exports.setSrt = (_set) => new Set(exports.setAy(_set).sort());
exports.ssetSrt = exports.setSrt;
exports.setAdd = (_x) => (_set) => {
    if (_x === null || _x === undefined)
        return _set;
    for (let i of _x)
        _set.add(i);
    return _set;
};
exports.setMinus = (_x) => (_set) => {
    if (_x === null || _x === undefined)
        return _set;
    for (let i of _x)
        _set.delete(i);
    return _set;
};
const _setAft = (incl, a, set) => {
    const z = new Set;
    let found = false;
    for (let i of set)
        if (found)
            z.add(i);
        else {
            if (a === i) {
                found = true;
                if (incl)
                    z.add(a);
            }
        }
    return z;
};
exports.linFstTerm = (a) => exports.sSplitSpc(a)[0];
exports.linLasTerm = (a) => exports.ayLas(exports.sSplitSpc(a));
exports.linT2 = (a) => {
    const { term: t1, remainLin: a1 } = exports.linShift(a);
    const { term: t2, remainLin } = exports.linShift(a1);
    return t2;
};
exports.linShift = (a) => {
    const a1 = a.trim();
    const a2 = a1.match(/(\S*)\s*(.*)/);
    const o = a2 === null
        ? { term: "", remainLin: "" }
        : { term: a2[1], remainLin: a2[2] };
    return o;
};
exports.sRmvFstTerm = (a) => exports.linShift(a).remainLin;
exports.linRmvFstTerm = (a) => exports.linShift(a).remainLin;
exports.setAft = aft => a => _setAft(false, aft, a);
exports.setAftIncl = a => set => _setAft(true, a, set);
exports.setClone = set => exports.itrSet(set);
exports.itrSet = itr => { const o = new Set; for (let i of itr)
    o.add(i); return o; };
exports.itrTfmSet = (f) => (a) => {
    const o = new Set;
    for (let i of a)
        o.add(f(i));
    return o;
};
//---------------------------------------------------------------------------
exports.empSdic = () => new Map();
exports.lySdic = (a) => {
    const o = exports.empSdic();
    const linKs = a => {
        let { term: k, remainLin: s } = exports.linShift(a);
        return { k, s };
    };
    const x = lin => { let { k, s } = linKs(lin); o.set(k, s); };
    exports.each(x)(a);
    return o;
};
exports.itrRmvEmp = (a) => exports.itrWhere(exports.isNonEmp)(a);
exports.rmvEmp = exports.itrRmvEmp;
exports.lyRmvEmpLin = exports.itrRmvEmp;
exports.lyPfxCnt = (pfx) => (a) => {
    let z = 0;
    exports.each((lin) => { if (exports.sHasPfx(pfx)(lin))
        z++; })(a);
    return z;
};
exports.lyHasMajPfx = (pfx) => (a) => 2 * exports.lyPfxCnt(pfx)(a) > a.length;
//---------------------------------------------------------------------------
exports.reExpConstNm = /^export const ([$_a-zA-Z][$_a-zA-Z0-9]*) /;
exports.reConstNm = /^const ([$_a-zA-Z][$_a-zA-Z0-9]*) /;
const reExpDollarConstNm = /^export const ([\$\w][\$_0-9\w_]*) /;
exports.srcDry = (re) => exports.compose(exports.srcMatchAy(re), exports.itrMap(exports.matchDr));
exports.srcCol = (re) => (a) => {
    const ay = exports.srcMatchAy(re)(a);
    const c = exports.matchAyFstCol(ay);
    const c1 = exports.itrRmvEmp(c);
    return c1;
};
exports.aySrt = (a) => a.sort();
exports.matchDr = (a) => [...a].splice(1);
exports.matchAySdry = exports.itrMap(exports.matchDr);
exports.matchFstItm = (a) => a === null ? null : a[1];
exports.matchAyFstCol = exports.itrMap(exports.matchFstItm);
exports.srcMatchAy = exports.compose(exports.sMatch, exports.itrMap);
exports.srcExpConstNy = exports.srcCol(exports.reExpConstNm);
exports.srcConstNy = exports.srcCol(exports.reConstNm);
exports.srcExpConstDollarNy = exports.srcCol(reExpDollarConstNm);
exports.ftsExpConstNy = exports.compose(exports.ftLy, exports.srcExpConstNy);
exports.ftsConstNy = exports.compose(exports.ftLy, exports.srcConstNy);
exports.ftsExpConstDollarNy = exports.compose(exports.ftLy, exports.srcExpConstDollarNy);
exports.ffnFts = exports.ffnRplExt('.ts');
exports.isFTstJs = (_fTstJs) => {
    const fn = exports.ffnFn(_fTstJs);
    if (!exports.sHasPfx('tst__')(fn))
        return false;
    if (!exports.sHasSfx('.js')(fn))
        return false;
    const segAy = exports.ffnPth(_fTstJs).split(/[\\\/]/);
    segAy.pop();
    const test = segAy.pop();
    if (test === undefined)
        return false;
    if (test.toUpperCase() !== 'TEST')
        return false;
    return true;
};
exports.assertIsTrue = (v, ...msg) => {
    if (v)
        return;
    if (msg.length === 0)
        exports.er('given vaule should be true');
    else {
        const m = msg.shift();
        exports.er(m, msg);
    }
};
exports.assertIsFTstJs = (_fTstJs) => exports.assertIsTrue(exports.isFTstJs(_fTstJs), "given _fTstJs is not fTstJs", { _fTstJs });
exports.fTstJs_fts = (_fTstJs) => {
    exports.assertIsFTstJs(_fTstJs);
    const fn = exports.ffnFn(_fTstJs);
    const pth = exports.ffnPth(_fTstJs);
    const a1 = exports.sRmvPfx('tst__')(fn);
    const a2 = aa;
    const zFnn = exports.ffnFnn(fn);
    const zPth = exports.pthPar(pth);
    return zPth + zFnn + '.js';
};
exports.fjsExpConstNy = exports.compose(exports.ffnFts, exports.ftsExpConstNy);
exports.fjsConstNy = exports.compose(exports.ffnFts, exports.ftsConstNy);
exports.stop = () => { debugger; };
//---------------------------------------------------------------------------
exports.isStr = v => typeof v === 'string';
exports.isNum = v => typeof v === 'number';
exports.isBool = v => typeof v === 'boolean';
exports.isObj = v => typeof v === 'object';
exports.isSy = v => {
    if (!exports.isAy(v))
        return false;
    if (exports.isEmp(v))
        return true;
    return exports.isStr(v[0]);
};
exports.isAy = u.isArray;
exports.isDte = u.isDate;
exports.isFun = u.isFunction;
exports.isPrim = u.isPrimitive;
exports.isRe = v => exports.vIsInstanceOf(RegExp);
exports.isNonNull = v => !exports.isNull(v);
exports.isNull = u.isNull;
exports.isUndefined = u.isUndefined;
exports.isNullOrUndefined = u.isNullOrUndefined;
exports.isTrue = v => v ? true : false;
exports.isFalse = v => v ? false : true;
exports.isEmp = v => v ? false : true;
exports.isNonEmp = v => v ? true : false;
exports.isOdd = n => n % 2 === 1;
exports.isEven = n => n % 2 === 0;
exports.isSpc = (s) => s === null || s === undefined || s[0] === undefined ? false : /\s/.test(s[0]);
//----------------------------------------------------------------------------
exports.sSearch = (re) => (a) => a.search(re);
exports.sBrkP123 = (quoteStr) => (a) => {
    const { q1, q2 } = exports.quoteStrBrk(quoteStr);
    if (q1 === "" || q2 === "")
        return null;
    const l = a.length;
    const q1pos = a.indexOf(q1);
    const q2pos = a.indexOf(q2, q1pos + 1);
    const len1 = q1pos;
    const pos2 = q1pos + q1.length;
    const pos3 = q2pos + q2.length;
    const len2 = pos3 - pos2 - 1;
    const p1 = a.substr(0, len1);
    const p2 = a.substr(pos2, len2);
    const p3 = a.substr(pos3);
    let z = [p1, p2, p3];
    return z;
};
//let a = sBrkP123("(backup-*)")("slkdfjlsdjf(backup-123).exe");debugger
//----------------------------------------------------------------------------
exports.itrIsAllTrue = (a) => { for (let i of a)
    if (exports.isFalse(i))
        return false; return true; };
exports.itrIsAllFalse = (a) => { for (let i of a)
    if (exports.isTrue(i))
        return false; return true; };
exports.itrIsSomeTrue = (a) => { for (let i of a)
    if (exports.isTrue(i))
        return true; return false; };
exports.itrIsSomeFalse = (a) => { for (let i of a)
    if (exports.isFalse(i))
        return true; return false; };
exports.itrPredIsAllTrue = (p) => (a) => { for (let i of a)
    if (!p(i))
        return false; return true; };
exports.itrPredIsAllFalse = (p) => (a) => { for (let i of a)
    if (p(i))
        return false; return true; };
exports.itrPredIsSomeFalse = (p) => (a) => { for (let i of a)
    if (!p(i))
        return true; return false; };
exports.itrPredIsSomeTrue = (p) => (a) => { for (let i of a)
    if (p(i))
        return true; return false; };
exports.itrBrkForTrueFalse = (p) => (a) => {
    const t = [], f = [];
    for (let i of a)
        p(i) ? t.push(i) : f.push(i);
    return { t, f };
};
exports.itrAy = (a) => { const o = []; for (let i of a)
    o.push(i); return o; };
exports.itrFst = (a) => { for (let i of a)
    return i; return null; };
exports.itrLas = (a) => { let i; for (i of a) { } ; return (i === undefined ? null : i); };
exports.itrAddPfxSfx = (pfx, sfx) => (a) => exports.itrMap(exports.sAddPfxSfx(pfx, sfx))(a);
exports.itrAddPfx = (pfx) => (a) => exports.itrMap(exports.sAddPfx(pfx))(a);
exports.itrAddSfx = (sfx) => (a) => exports.itrMap(exports.sAddSfx(sfx))(a);
exports.itrWdt = (a) => exports.pipe(exports.itrMap(exports.vLen)(a))(exports.itrMax);
exports.sitrWdt = (a) => exports.pipe(exports.itrMap(exports.sLen)(a))(exports.itrMax);
exports.itrAlignL = (a) => exports.itrMap(exports.sAlignL(exports.itrWdt(a)))(a);
exports.itrClone = (a) => exports.itrMap(i => i)(a);
exports.itrFind = (p) => (a) => { for (let i of a)
    if (p(i))
        return i; return null; };
exports.itrHasDup = (a) => { const set = new Set(); for (let i of a)
    if (set.has(i)) {
        return true;
    }
    else
        set.add(i); return false; };
exports.itrDupSet = (a) => {
    const set = new Set();
    const z = new Set();
    for (let i of a)
        if (set.has(i))
            z.add(i);
        else
            set.add(i);
    return z;
};
exports.itrMax = (a) => { let o = exports.itrFst(a); if (o === null)
    return null; for (let i of a)
    if (i > o)
        o = i; return o; };
exports.itrMin = (a) => { let o = exports.itrFst(a); if (o === null)
    return null; for (let i of a)
    if (i < o)
        o = i; return o; };
exports.max = (...v) => exports.itrMax(v);
exports.min = (...v) => exports.itrMin(v);
//-----------------------------------------------------------------------------------------
exports.oSrt = (o) => {
    if (o === null || o === undefined)
        return {};
    const oo = {};
    for (let k of Object.getOwnPropertyNames(o).sort()) {
        oo[k] = o[k];
    }
    return oo;
};
exports.oBringUpDollarPrp = o => {
    /**
     * Bring up all {o} child object member up one level.  Throw exception if there is name conflict
     * assume all members of {o} are objects
     * @param {obj} o
     * @example
     * const $a = {a1:'a1',a2:'s2'}
     * const $b = {b1:'b1',b2:'b2'}
     * const o = {$a,$b}
     * bringUp(o)
     * eq(o,{$a,$b,a1,a2,b1,b2})
     * //-----------
     * $a.x = 1
     * $b.x = 2
     * thw(bringUp(o))
     */
    for (let chdNm in o) {
        const chd = o[chdNm];
        for (let chdMbrNm in chd) {
            if (exports.oHasPrp(chdMbrNm)(o))
                exports.er("{chdMbrNm} of {chd} exists in {o}", { chdMbrNm, chd, o });
            o[chdMbrNm] = chd[chdMbrNm];
        }
    }
    return o;
};
exports.nyCmlSdry = (a) => exports.itrMap(exports.cmlNy)(a);
exports.oCmlDry = (a) => {
    let z = exports.itrMap((nm) => [exports.cmlNm(nm), nm])(exports.oPrpNy(a));
    exports.drySrt(exports.ayEle(0))(z);
    const w = exports.sdryColWdt(0)(z);
    exports.dryColMdy(0)(exports.sAlignL(w))(z);
    return z;
};
exports.oCtorNm = (a) => a && a.constructor && a.constructor.name;
exports.oIsInstance = (instance) => (a) => a instanceof instance;
exports.oHasCtorNm = (nm) => (a) => exports.oCtorNm(a) === nm;
exports.oPrp = (prpPth) => (a) => {
    /**
 * @description return the property value of object {o} by property path {pprPth}
 * @param {string} prpPth
 * @example
 * const a = {b: {c:{1}}
 * require('assert').equal(prp('b.c')(o), 1)
 */
    let v;
    for (let nm of prpPth.split('.')) {
        v = a[nm];
        if (v === undefined)
            return undefined;
    }
    return v;
};
exports.nmPrm_ny = (_nmPrm) => {
    if (typeof _nmPrm === 'string')
        return exports.sSplitSpc(_nmPrm);
    return _nmPrm;
};
exports.ny = exports.nmPrm_ny;
exports.oPrpAy = (_prpNm) => (_o) => exports.itrMap((nm) => exports.oPrp(nm)(_o))(exports.ny(_prpNm));
exports.oPrpNy = (a) => Object.getOwnPropertyNames(a);
exports.oHasPrp = (prpNm) => (a) => a.hasOwnProperty(prpNm);
exports.oHasLen = exports.oHasPrp('length');
exports.oCmlObj = (a) => {
    const dry = exports.oCmlDry(a);
    const z = {};
    dry.forEach(([cmlNm, prpNm]) => z[cmlNm] = z[prpNm]);
    return z;
};
// ----------------------------------------------
const funsExport = (...f) => f.forEach(funExport);
const funExport = (f) => {
    const funName = f.name;
    if (exports.oHasPrp(funName)(exports)) {
        exports.er('the {funName} already exported', { funName });
    }
    exports.funName = f;
};
// ----------------------------------------------
exports.ayClone = (ay) => ay.slice(0, ay.length);
// ----------------------------------------------
exports.sdryColWdt = (colIx) => (a) => exports.sitrWdt(exports.dryCol(colIx)(a));
exports.sdryColWdtAy = (a) => exports.itrMap((i) => exports.sdryColWdt(i)(a))(exports.nItr(exports.dryColCnt(a)));
exports.dryCol = (colIx) => (a) => exports.itrMap(exports.ayEleOrDft('')(colIx))(a);
exports.dryColCnt = (a) => exports.itrMax(exports.itrMap(exports.vLen)(a));
exports.dryCellMdy = (f) => (a) => { exports.itrEach(exports.ayMdy(f))(a); };
exports.dryClone = (a) => exports.itrMap((dr) => exports.itrClone(dr))(a);
exports.dryColMdy = (colIx) => (f) => (a) => { exports.itrEach(exports.ayMdyEle(colIx)(f))(a); };
exports.sdryLines = (a) => exports.sdryLy(a).join('\r\n');
exports.wdtAyLin = (wdtAy) => "|-" + exports.itrMap((w) => '-'.repeat(w))(wdtAy).join('-|-') + "-|";
exports.sdrLin = (wdtAy) => (a) => {
    let m = ([w, s]) => exports.sAlignL(w)(s);
    let z = exports.ayZip(wdtAy, a);
    let ay = exports.itrMap(m)(z);
    let s = ay.join(' | ');
    return "| " + s + " |";
};
exports.sdryLy = (a) => {
    let w = exports.sdryColWdtAy(a);
    let h = exports.wdtAyLin(w);
    let z = [h].concat(exports.itrMap(exports.sdrLin(w))(a), h);
    return z;
};
exports.itrSy = (a) => exports.itrMap(String)(a);
exports.aySy = (a) => exports.itrMap(String)(a);
exports.drySdry = exports.itrMap(exports.aySy);
exports.dryLy = (a) => exports.sdryLy(exports.drySdry(a));
exports.drsLy = (a) => {
    let { fny, dry } = a;
    let b = [fny].concat(exports.drySdry(dry));
    let c = exports.sdryLy(b);
    let z = c.slice(0, 2).concat(c[0], c.slice(2));
    return z;
};
exports.drsLines = (a) => exports.drsLy(a).join('\r\n');
const drySrtCol__srtFun = (colAy) => (drA, drB) => {
    for (let iCol of colAy) {
        if (iCol < 0) {
            if (drA[-iCol] > drB[-iCol])
                return -1;
            if (drA[-iCol] < drB[-iCol])
                return 1;
        }
        else {
            if (drA[iCol] > drB[iCol])
                return 1;
            if (drA[iCol] < drB[iCol])
                return -1;
        }
    }
    return 0;
};
exports.drySrtCol = (colAy) => (a) => a.sort(drySrtCol__srtFun(colAy));
exports.drySrt = (fun_of_dr_to_key) => (a) => a.sort((dr_A, dr_B) => exports.vvCompare(fun_of_dr_to_key(dr_A), fun_of_dr_to_key(dr_B)));
//-----------------------------------------------------------------------
exports.oyPrpCol = prpNm => oy => { const oo = []; for (let o of oy)
    oo.push(o[prpNm]); return oo; };
exports.oyPrpDry = prpNy => oy => { const oo = []; for (let o of oy)
    oo.push(exports.oPrpAy(prpNy)(o)); return oo; };
{
    const _isEsc = i => { for (let spec of "()[]{}/|.+")
        if (i === spec)
            return true; };
    const _escSpec = lik => exports.itrMap(i => i === '\\' ? '\\\\' : (_isEsc(i) ? '\\' + i : i))(lik).join(''); //; const xxx = _escSpec("abc?dd"); debugger
    const _escStar = lik => exports.itrMap(i => i === '*' ? '.*' : i)(lik).join('');
    const _escQ = lik => { const o = []; for (let i of lik)
        o.push(i === '?' ? '.' : i); return o.join(''); };
    const _esc = lik => "^" + exports.pipe(lik)(_escSpec, _escStar, _escQ) + "$";
    const _likRe = lik => new RegExp(_esc(lik));
    const _isEscSbs = i => { for (let spec of "()[]{}/|.+?*")
        if (i === spec)
            return true; };
    const _escSbs = c => c === '\\' ? '\\\\' : (_isEscSbs(c) ? '\\' + c : c);
    exports.sLik = (lik) => (a) => _likRe(a).test(a);
    exports.sHasSbs = (sbs) => (a) => {
        const _escSpec = exports.itrMap(_escSbs)(sbs).join("");
        const _sbsRe = new RegExp(_escSpec);
        let o = _sbsRe.test(a);
        return o;
    };
}
//---------------------------------------
exports.pthFnAy = (pth, lik) => {
    if (!fs.existsSync(pth))
        return null;
    const isFil = entry => fs.statSync(path.join(pth, entry)).isFile();
    let entries = fs.readdirSync(pth);
    entries = (lik === undefined) ? entries : exports.itrWhere(exports.sLik(lik))(entries);
    let o = exports.itrWhere(isFil)(entries);
    return o;
}; // const xxx = pthFnAy("c:\\users\\user\\", "sdfdf*.*"); debugger;
exports.ayZip = (a, b) => exports.itrMap((i) => [a[i], b[i]])(exports.nItr(a.length));
exports.entryStatPm = async (a) => {
    debugger;
    throw 0;
};
exports.pthFnAyPm = async (a, lik) => {
    debugger;
    throw 0;
    /*
    const b = await pthStatAyPm(a, lik)
    let d: fn[] = pipe(nItr(b.length))(itrWhere(i => b[i].isFile()), itrMap(i => entries[i]))
    debugger
    return d
    */
};
exports.pthStatOptAyPm = async (a, lik) => {
    const b = await exports.pm(fs.readdir, a);
    const b1 = (lik === undefined) ? b : exports.itrWhere(exports.sLik(lik))(b);
    const j = b => path.join(a, b);
    const b2 = exports.itrMap(j)(b1);
    const stat = entry => exports.pmRsltOpt(fs.stat, entry);
    const c = exports.itrMap(stat)(b2);
    const z = await Promise.all(c);
    return z;
};
exports.pthFdrAyPm = async (a, lik) => {
};
//---------------------------------------
exports.nMultiply = x => a => a * x;
exports.nDivide = x => a => a / x;
exports.vAdd = x => a => a + x;
exports.nMinus = x => a => a - x;
exports.nDecr = exports.nMinus(1);
exports.nIncr = exports.vAdd(1);
exports.nItr = function* (n) { for (let j = 0; j < n; j++)
    yield j; };
// --------------------------------------------------------------------------
exports.vvCompare = (a, b) => a === b ? 0 : a > b ? 1 : -1;
exports.lazy = (vf) => { let v, done = false; return () => { if (!done) {
    v = vf();
    done = true;
} ; return v; }; };
//---------------------------------------------------------------------------
exports.optMap = (f) => (a) => a !== null ? f(a) : a;
exports.ffn = (a) => new Ffn(a);
class Ffn {
    constructor(a) {
        this._ffn = a;
        this._dotPos = a.lastIndexOf('.');
        this._sepPos = a.lastIndexOf(exports.pthsep);
    }
    zmid(at) { return exports.sMid(at)(this.ffn); }
    zleft(at) { return exports.sLeft(at)(this.ffn); }
    get ffn() { return this._ffn; }
    get pth() { const at = this._sepPos; return at === -1 ? '' : this.zleft(at + 1); }
    get fn() { const at = this._sepPos; return at === -1 ? this.ffn : this.zmid(at + 1); }
    get ext() { const at = this._dotPos; return at === -1 ? '' : this.zmid(at); }
    get noExt() { const at = this._dotPos; return at === -1 ? this.ffn : this.zleft(at); }
    get ffnn() { return this.noExt; }
    get fnn() { return exports.ffn(this.noExt).fn; }
    addFnSfx(sfx) { return this.ffnn + sfx + this.ext; }
    rplExt(ext) { return this.ffnn + ext; }
    makBackup() {
        const ext = this.ext;
        const ffnn = this.ffnn;
        const pth = this.pth;
        const ffn = this.ffn;
        let b = exports.sRight(12)(ffnn);
        const isBackupFfn = (exports.sHasPfx("(backup-")(ffn)) && (exports.sHasSfx(")")(ffn));
        const fn = this.fn;
        const backupSubFdr = `.backup\\${fn}\\`;
        const backupPth = pth + backupSubFdr;
        if (ext === '.backup')
            exports.er("given [ext] cannot be '.backup", { ext, ffnn });
        if (isBackupFfn)
            exports.er("{ffn} cannot be a backup file name", { ffn: this.ffn });
        let c = exports.pthFnAy(backupPth, ffnn + '(backup-???)' + ext);
        let nxtBackupNNN = c === null || exports.isEmp(b) ? '000' :
            exports.pipe(c)(exports.itrMax, exports.ffnRmvExt, exports.sRmvLasChr, exports.sRight(3), Number.parseInt, exports.nIncr, exports.nPadZero(3));
        const backupFfn = backupPth + exports.ffnAddFnSfx(`(backup-${nxtBackupNNN})`)(fn);
        exports.pthEnsSubFdr(backupSubFdr)(pth);
        fs.copyFileSync(this.ffn, backupFfn);
    }
}
exports.Ffn = Ffn;
// const xxx = ffn(__filename); debugger
exports.ffnMakBackup = (a) => {
    const ext = exports.ffnExt(a);
    const ffnn = exports.ffnRmvExt(a);
    const pth = exports.ffnPth(a);
    let b = exports.sRight(12)(ffnn);
    const isBackupFfn = (exports.sHasPfx("(backup-")(a)) && (exports.sHasSfx(")")(a));
    const fn = exports.ffnFn(a);
    const backupSubFdr = `.backup\\${fn}\\`;
    const backupPth = pth + backupSubFdr;
    if (ext === '.backup')
        exports.er("given [ext] cannot be '.backup", { ext, ffnn });
    if (isBackupFfn)
        exports.er("ffn cannot be a backup file name", { ffn: a });
    let c = exports.pthFnAy(backupPth, ffnn + '(backup-???)' + ext);
    let nxtBackupNNN = c === null || exports.isEmp(b) ? '000' :
        exports.pipe(c)(exports.itrMax, exports.ffnRmvExt, exports.sRmvLasChr, exports.sRight(3), Number.parseInt, exports.nIncr, exports.nPadZero(3));
    const backupFfn = backupPth + exports.ffnAddFnSfx(`(backup-${nxtBackupNNN})`)(fn);
    exports.pthEnsSubFdr(backupSubFdr)(pth);
    fs.copyFileSync(a, backupFfn);
};
exports.srcExpStmt = (a) => {
    let ny = exports.srcExpConstNy(a);
    ny = exports.itrWhere(exports.predNot(exports.sHasPfx("_")))(ny).sort();
    if (exports.isEmp(ny))
        return null;
    const x = exports.ayJnAsLines(", ", 4, 120)(ny);
    let z = "export {\r\n" + x + "\r\n}";
    return z;
};
exports.curExpStmt = () => exports.pipe(__filename)(exports.ftLy, exports.srcExpStmt);
// dmp(curExpStmt); debugger
exports.fjsRplExpStmt = fjs => {
    const oldLy = exports.ftLy(fjs);
    const newLin = exports.srcExpStmt(oldLy);
    let oldBegIx = exports.ayFindIx(exports.sHasPfx("exports {"))(oldLy);
    let oldEndIx = (() => {
        if (oldBegIx !== null) {
            for (let i = oldBegIx; i < oldLy.length; i++) {
                if (/\}/.test(oldLy[i]))
                    return i++;
            }
        }
        return 0;
    })();
    const oldLin = (oldBegIx === null || oldEndIx === null) ? null : oldLy.slice(oldBegIx, oldEndIx).join('\r\n');
    const newLines = () => {
        const hasNewLin = newLin !== null;
        const hasOldLin = oldLin !== null;
        switch (true) {
            case (hasNewLin && hasOldLin):
                if (oldBegIx !== null) {
                    oldLy.splice(oldBegIx, oldEndIx, exports.vDftStr(newLin));
                    return exports.ayJnCrLf(oldLy);
                }
                else {
                    exports.er("impossible");
                    exports.halt();
                }
            case (hasNewLin && !hasOldLin):
                return exports.ayJnCrLf(oldLy.concat(exports.vDftStr(newLin)));
            case (hasOldLin):
                if (oldBegIx === null) {
                    exports.er("impossible");
                }
                else {
                    oldLy.splice(oldBegIx, oldEndIx);
                    return exports.ayJnCrLf(oldLy);
                }
            default:
                exports.er("impossible");
                exports.halt();
        }
        return exports.ayJnCrLf(oldLy);
    };
    let a = newLines();
    if (oldLin !== newLin) {
        debugger;
        exports.ffnMakBackup(fjs);
        exports.sWrt(fjs)(newLines());
    }
};
exports.syLin = (a) => exports.itrMap(exports.sEscVbar)(a).join(' | ');
exports.linesAlignL = (wdt) => (a) => {
    const a1 = exports.sSplitCrLf(a);
    const aLas = exports.ayLas(a1);
    const n = wdt - aLas.length;
    const s = exports.nSpc(n);
    const z = a + s;
    return z;
};
exports.linesWdt = (a) => {
    const a1 = exports.sSplitCrLf(a);
    const z = exports.itrWdt(a1);
    return z;
};
exports.linesAyWdt = (a) => {
    const a1 = exports.itrMap(exports.linesWdt)(a);
    const z = exports.itrMax(a1);
    return z === null ? 0 : z;
};
exports.linesAyAlignL = (a) => {
    const w = exports.linesAyWdt(a) + 1;
    const z = exports.itrMap(exports.linesAlignL(w))(a);
    return z;
};
exports.vSav = (vid) => (a) => exports.sWrt(exports.vidFjson(vid))(JSON.stringify(a));
exports.vidpth = __dirname + exports.pthsep + 'test-resources' + exports.pthsep;
exports.pthEns(exports.vidpth);
exports.rePunExcpDot = /[\(\)]/g;
exports.sRplPunExcpDot = (s) => s.replace(exports.rePunExcpDot, ' ');
exports.vidpthBrw = () => exports.pthBrw(exports.vidpth);
exports.vidFjson = (a) => exports.vidpth + a + '.json';
exports.fjsonVal = (a) => JSON.parse(exports.ftLines(a));
exports.vidVal = (a) => exports.fjsonVal(exports.vidFjson(a));
exports.vidBrw = (a) => exports.ftBrw(exports.vidFjson(a));
exports.sSav = (sid) => (a) => exports.sWrt(exports.sidFt(sid))(a);
exports.sidpth = exports.vidpth;
exports.sidpthBrw = () => exports.pthBrw(exports.sidpth);
exports.sidFt = (a) => exports.sidpth + a + '.txt';
exports.sidStr = (a) => exports.ftLines(exports.sidFt(a));
exports.sidBrw = (a) => exports.ftBrw(exports.sidFt(a));
exports.vTee = (f) => (a) => { f(a); return a; };
exports.ftWrt = (s) => (a) => fs.writeFileSync(a, s);
exports.cmdShell = child_process.exec;
exports.cmdShellSync = child_process.exec;
exports.ftBrw = (a) => exports.cmdShell(`code.cmd "${a}"`);
exports.ftBrwSync = (a) => exports.cmdShellSync(`code.cmd "${a}"'`);
exports.sBrw = (a) => { exports.pipe(exports.tmpft())(exports.vTee(exports.ftWrt(a)), exports.ftBrw); };
exports.sBrwAtFdrFn = (_fdr, _fn) => (_s) => { exports.pipe(exports.tmpffnByFdrFn(_fdr, _fn))(exports.vTee(exports.ftWrt(_s)), exports.ftBrw); };
exports.oBrwAtFdrFn = (_fdr, _fn) => (_o) => { exports.pipe(exports.tmpffnByFdrFn(_fdr, _fn + '.json'))(exports.vTee(exports.ftWrt(exports.oJsonLines(_o))), exports.ftBrw); };
exports.sjsonBrw = (_s, _fdr, _fn) => { exports.pipe(exports.tmpfjson(_fdr, _fn))(exports.vTee(exports.ftWrt(_s)), exports.ftBrw); };
exports.lyBrw = exports.compose(exports.ayJnLf, exports.sBrw);
exports.lyBrwStop = exports.compose(exports.lyBrw, exports.stop);
exports.dicKy = (_dic) => exports.itrAy(_dic.keys());
exports.dicKset = (_dic) => exports.itrSet(_dic.keys());
exports.sdicKset = exports.dicKset;
exports.dicValAy = (_dic) => exports.itrAy(_dic.values());
exports.sdicValAy = (_sdic) => exports.dicValAy(_sdic);
exports.dicBrkForTrueFalse = (fun) => (d) => {
    const t = new Map();
    const f = new Map();
    for (let [k, v] of d) {
        if (fun([k, v]))
            t.set(k, v);
        else
            f.set(k, v);
    }
    return { t, f };
};
exports.dicBrw = exports.compose(exports.dicLy, exports.lyBrw);
exports.oJsonLines = JSON.stringify;
exports.oAsExp = (o) => 'const exp = ' + exports.oJsonLines(o);
exports.sdryBrw = exports.compose(exports.sdryLines, exports.sBrw);
exports.dryBrw = exports.compose(exports.drySdry, exports.sdryBrw);
exports.drsBrw = exports.compose(exports.sBrw, exports.drsLines);
exports.nyBrw = exports.compose(exports.itrMap(exports.cmlNy), exports.sdryBrw);
exports.srcExpConstNyBrw = exports.compose(exports.srcExpConstNy, exports.nyBrw);
exports.ftsExpConstNyBrw = exports.compose(exports.ftLy, exports.srcExpConstNyBrw);
exports.oBrw = (o, fdr, nm) => {
    const s = exports.oJsonLines(o);
    exports.sjsonBrw(s, fdr, nm);
};
exports.oBrwAsExp = exports.compose(exports.oAsExp, exports.sBrwAtFdrFn('asExpectedJs', 'asExpect.js'));
//---------------------- ------------------
exports.chrCd_isNm = (c) => true;
exports.chrCd = (s) => s.charCodeAt(0);
exports.chrCd_a = exports.chrCd('a');
exports.chrCd_z = exports.chrCd('z');
exports.chrCd_A = exports.chrCd('A');
exports.chrCd_Z = exports.chrCd('Z');
exports.chrCd_0 = exports.chrCd('0');
exports.chrCd_9 = exports.chrCd('9');
exports.chrCd_dollar = exports.chrCd('$');
exports.chrCd_underScore = exports.chrCd('_');
exports.chrCd_isSmallLetter = exports.vBET(exports.chrCd_a, exports.chrCd_z);
exports.chrCd_isCapitalLetter = exports.vBET(exports.chrCd_A, exports.chrCd_Z);
exports.chrCd_isLetter = exports.predsOr(exports.chrCd_isSmallLetter, exports.chrCd_isCapitalLetter);
exports.chrCd_isDigit = exports.vBET(exports.chrCd_0, exports.chrCd_9);
exports.chrCd_isDollar = exports.vEQ(exports.chrCd_dollar);
exports.chrCd_isUnderScore = exports.vEQ(exports.chrCd_underScore);
exports.chrCd_isFstNmChr = exports.predsOr(exports.chrCd_isLetter, exports.chrCd_isUnderScore, exports.chrCd_isDollar);
exports.chrCd_isNmChr = exports.predsOr(exports.chrCd_isFstNmChr, exports.chrCd_isDigit);
exports.ssetSrtBrw = (a) => exports.pipe(a)(exports.itrAy, exports.aySrt, exports.lyBrw);
exports.ssetSy = (_sset) => exports.setAy(_sset);
exports.ssetAddPfxAsLin = (_pfx) => (_sset) => _pfx + (_pfx ? ' ' : '') + exports.ssetLin(_sset);
exports.ssetLin = (_sset) => exports.setAy(_sset).join(' ');
exports.ssetBrw = (_sset) => exports.pipe(_sset)(exports.itrAy, exports.sBrw);
exports.linExpConstNm = (a) => {
    const m = a.match(exports.reExpConstNm);
    if (m === null)
        return null;
    return m[1];
};
exports.nodeMdSet = () => {
    const z = new Set();
    const _pushChildren = (m) => {
        let c;
        for (c of m.children) {
            if (!z.has(c)) {
                z.add(c);
                _pushChildren(c);
            }
        }
    };
    _pushChildren(module);
    return z;
};
const x = (a) => {
    const ay = exports.oPrpNy(a.exports);
    const z = [];
    const id = a.id;
    for (let nm of ay) {
        const itm = a.exports[nm];
        const ty = typeof itm;
        //const funNm = ty==='function'?itm.name:''
        const m = [nm, typeof itm, id];
        z.push(m);
    }
    return z;
};
exports.drsof_exportFunctions = () => {
    const fny = ['name', 'type', 'id'];
    let dry = [];
    let md;
    const mset = exports.nodeMdSet();
    for (md of mset) {
        dry = dry.concat(x(md));
    }
    dry = exports.drySrtCol([2, 0])(dry);
    const z = { fny, dry };
    return z;
};
class Dry {
    constructor(a) {
        this.dry = a;
        this._curCol = 0;
    }
    get curCol() { return this._curCol; }
    set curCol(n) { this._curCol = n; }
    get colCnt() { return exports.itrMax(exports.itrMap(exports.vLen)(this.dry)); }
    get ly() { return exports.sdryLy(this.sdry); }
    get lines() { return exports.sdryLines(this.sdry); }
    get col() { return exports.itrMap(exports.ayEleOrDft('')(this.curCol))(this.dry); }
    get sdry() { return exports.itrMap(exports.aySy)(this.dry); }
    setCurCol(n) { this.curCol = n; return this; }
    mdyAllCell(f) { exports.itrEach(exports.ayMdy(f))(this.dry); }
    //clone() { return new Dry(itrMap(dr => itrClone(dr)(this.dry))}
    mdyCol(f, colIx) { exports.itrEach(exports.ayMdyEle(colIx)(f))(this.dry); }
    brw() { exports.sBrw(this.lines); }
}
exports.Dry = Dry;
exports.dry = (a) => new Dry(a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycnlmdW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjdXJyeWZ1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdEQUFnRDtBQUNoRCw2Q0FBNkM7QUFDN0MsOENBQThDO0FBQzlDLCtDQUErQztBQUMvQyx5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QiwwQkFBMEI7QUFDMUIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUMsa0NBQWtDO0FBQ25FLG1EQUFtRDtBQUN0QyxRQUFBLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUM3QixJQUFJLENBQUM7UUFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxNQUFNLENBQUMsS0FBSyxDQUFBO0lBQ2hCLENBQUM7QUFDTCxDQUFDLENBQUE7QUFDWSxRQUFBLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUN2QyxRQUFBLElBQUksR0FBRyxDQUFDLEdBQU0sRUFBRSxHQUFNLEVBQVEsRUFBRTtJQUN6QyxtQkFBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQyxtQkFBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQyxRQUFRLENBQUE7QUFDWixDQUFDLENBQUE7QUFDWSxRQUFBLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQVEsRUFBRTtJQUNuQyxFQUFFLENBQUMsQ0FBQyxjQUFNLENBQUMsR0FBRyxDQUFDLElBQUksY0FBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNkLFFBQVEsQ0FBQTtZQUNSLE1BQU0sQ0FBQTtRQUNWLENBQUM7SUFDTCxDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsYUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN6QixtQkFBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMvQixtQkFBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMvQixRQUFRLENBQUE7QUFDWixDQUFDLENBQUE7QUFDWSxRQUFBLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZFLFFBQUEsYUFBYSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEYsMkVBQTJFO0FBQzlELFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3JCLFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3RCLFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3RCLFFBQUEsR0FBRyxHQUFHLENBQUksQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNwQyxRQUFBLEdBQUcsR0FBRyxDQUFJLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDcEMsUUFBQSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDckIsUUFBQSxHQUFHLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3RGLFFBQUEsTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxRQUFBLElBQUksR0FBRyxDQUFJLENBQUksRUFBRSxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDcEQsUUFBQSxPQUFPLEdBQUcsQ0FBSSxDQUFJLEVBQUUsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3JELFFBQUEsYUFBYSxHQUFHLENBQUksQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUM1RCxRQUFBLEtBQUssR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDL0QsUUFBQSxLQUFLLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDM0UsdUNBQXVDO0FBQzFCLFFBQUEsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQU0sRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDL0UsUUFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzFCLFFBQUEsUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM5QixRQUFBLElBQUksR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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QUFLLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQy9GLFFBQUEsYUFBYSxHQUFHLENBQUMsS0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRSxDQUFDLFlBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDOUUsUUFBQSxLQUFLLEdBQUcsQ0FBSSxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMzQixRQUFBLEtBQUssR0FBRyxDQUFJLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzNCLFFBQUEsS0FBSyxHQUFHLENBQUksRUFBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZDLFFBQUEsVUFBVSxHQUFHLENBQUksR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLFlBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNuRSxRQUFBLEtBQUssR0FBRyxDQUFJLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNyQyxRQUFBLFFBQVEsR0FBRyxDQUFJLEVBQUssRUFBRSxFQUFFLENBQUMsQ0FB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USxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFNLENBQUE7QUFDekYsUUFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7QUFDekIsUUFBQSxLQUFLLEdBQUcsQ0FBQyxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDeEQsUUFBQSxJQUFJLEdBQUcsQ0FBQyxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzFDLFFBQUEsS0FBSyxHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDMUMsUUFBQSxLQUFLLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtBQUMxQixRQUFBLE1BQU0sR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRTtJQUNyQyxNQUFNLENBQUMsR0FBRyxZQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7SUFDckIsTUFBTSxDQUFDLENBQUMsQ0FB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QUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNiLE1BQU0sQ0FBQyxHQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUMxQixNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ1osQ0FBQyxDQUFBO0FBQ1ksUUFBQSxPQUFPLEdBQUcsQ0FBQyxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2pELFFBQUEsT0FBTyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMvQyxRQUFBLE9BQU8sR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN4RixRQUFBLE9BQU8sR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMxRSxRQUFBLG1CQUFtQixHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtBQUN6RixRQUFBLG1CQUFtQixHQUFHLENBQUMsR0FBTSxFQUFFLEVB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LENBQUM7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFBO0lBQzFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7QUFDYixDQUFDLENBQUE7QUFDRCxvRUFBb0U7QUFDdkQsUUFBQSxNQUFNLEdBQUcsQ0FBQyxFQUFLLEVBQUUsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsWUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzFHLFFBQUEsS0FBSyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEdBQUcsZUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsYUFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBTSxDQUFDLEVBQUUsRUFBRSxZQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNwSSxRQUFBLEtBQUssR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBSyxDQUFDLENBQUMsQ0FB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LEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUN4SSxRQUFBLFFBQVEsR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3hJLFFBQUEsT0FBTyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEdBQUcsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNuRyxRQUFBLFVBQVUsR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLGdCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0FBQ3RELFFBQUEsVUFBVSxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsZ0JBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7QUFDbkUseUVBQXlFO0FBQzVELFFBQUEsVUFBVSxHQUFHLFlBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNwQixRQUFBLFVBQVUsR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsYUFBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDN0MsUUFBQSxXQUFXLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxhQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN4RCxRQUFBLFVBQVUsR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNoRyxRQUFBLFNBQVMsR0FBRyxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzNCLFFBQUEsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7QUFDakIsUUFBQSxhQUFhLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRTtJQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDUCxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ1osTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDN0IsQ0FBQyxDQUFBO0FBQ1ksUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFNLEVBQU8sRUFBRTtJQUNsQyxNQUFNLEtBQUssR0FBRyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3pCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNYLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxHQUFHLGNBQU0sQ0FBQTtBQUN0QyxDQUFDLENBQUE7QUFDWSxRQUFBLFFBQVEsR0FBRyxDQUFDLENBQU0sRUFBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUNoRCxRQUFBLE1BQU0sR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsZ0JBQVEsQ0FBQyxZQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdEQsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLHFCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDOUYsUUFBQSxLQUFLLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLHFCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDM0YsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENB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QVMsRUFBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQVEsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDdkgsUUFBQSxVQUFVLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3hHLFFBQUEsTUFBTSxHQUFHLENBQU8sQ0FBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztJQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzVJLFFBQUEsT0FBTyxHQUFHLENBQUksQ0FBd0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENB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QUFDLENBQUMsQ0FBQTtBQUMzQyxRQUFBLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDOUMsUUFBQSxRQUFRLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDN0IsUUFBQSxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztJQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzVFLFFBQUEsU0FBUyxHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFO0lBQzFDLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDO0lBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDN0QsQ0FBQyxDQUFBO0FBQ0QsNkVBQTZFO0FBQ2hFLFFBQUEsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksR0FBRyxFQUFRLENBQUE7QUFDL0IsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFLLEVBQUUsRUFBRTtJQUM1QixNQUFNLENBQUMsR0FBRyxlQUFPLEVBQUUsQ0FBQTtJQUNuQixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtRQUNkLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsR0FBRyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzNDLE1B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QUFDLENBQUM7UUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUMzRixRQUFBLGdCQUFnQixHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNsRyxRQUFBLGlCQUFpQixHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDbEcsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDcEcsUUFBQSxpQkFBaUIsR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ2xHLFFBQUEsa0JBQWtCLEdBQUcsQ0FBSSxDQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUU7SUFDbkUsTUFBTSxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBUSxFQUFFLENBQUM7SUFDL0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQTtBQUNuQixDQUFDLENBQUE7QUFDWSxRQUFBLEtBQUssR0FBRyxDQUFJLENBQVMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQVEsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDckYsUUFBQSxNQUFNLEdBQUcsQ0FBSSxDQUFTLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3JFLFFBQUEsTUFBTSxHQUFHLENBQUksQ0FBUyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzNGLFFBQUEsWUFBWSxHQUFHLENBQUMsR0FBTSxFQUFFLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLGNBQU0sQ0FBQyxrQkFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBUSxDQUFBO0FBQ3JGLFFBQUEsU0FBUyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsY0FBTSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBUSxDQUFBO0FBQ2xFLFFBQUEsU0FBUyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsY0FBTSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBUSxDQUFBO0FBQ2xFLFFBQUEsTUFBTSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxZQUFJLENBQUMsY0FBTSxDQUFDLFlBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBTSxDQUFNLENBQUE7QUFDdkQsUUFBQSxPQUFPLEdBQUcsQ0FBQyxDQUFPLEVBQUUsRUFBRSxDQUFDLFlBQUksQ0FBQyxjQUFNLENBQUMsWUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFNLENBQU0sQ0FBQTtBQUN6RCxRQUFBLFNBQVMsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsY0FBTSxDQUFDLGVBQU8sQ0FBQyxjQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBUSxDQUFBO0FBQzVELFFBQUEsUUFBUSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQU8sQ0FBQTtBQUM5QyxRQUFBLE9BQU8sR0FBRyxDQUFJLENBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3BHLFFBQUEsU0FBUyxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQUMsQ0FBQztJQUFDLElBQUk7UUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNqSSxRQUFBLFNBQVMsR0FBRyxDQUFJLENBQVMsRUFBRSxFQUFFO0lBQ3RDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFLLENBQUE7SUFDeEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUssQ0FBQTtJQUN0QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDWixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNaLElBQUk7WUFDQSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xCLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDWixDQUFDLENBQUE7QUFDWSxRQUFBLE1BQU0sR0FBRyxDQUFJLENBQVMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsY0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQztJQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDMUgsUUFBQSxNQUFNLEdBQUcsQ0FBSSxDQUFTLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLGNBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7SUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzFILFFBQUEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLGNBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN6QixRQUFBLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdEMsMkZBQTJGO0FBQzlFLFFBQUEsSUFBSSxHQUFHLENBQUMsQ0FBSSxFQUFLLEVBQUU7SUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtB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QUcsQ0FBQyxLQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsa0JBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ25FLFFBQUEsU0FBUyxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsY0FBTSxDQUFDLFlBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFNLENBQUE7QUFDcEQsUUFBQSxVQUFVLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxlQUFPLENBQUMsYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDM0QsUUFBQSxRQUFRLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLGNBQU0sQ0FBQyxDQUFDLEVBQU0sRUFBRSxFQUFFLENBQUMsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBUSxDQUFBO0FBQ2pFLFFBQUEsU0FBUyxHQUFHLENBQUMsS0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLGVBQU8sQ0FBQyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDbEYsUUFBQSxTQUFTLEdBQUcsQ0FBQyxDQUFPLEVBQUUsRUFBRSxDQUFDLGNBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDL0MsUUFBQSxRQUFRLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxjQUFNLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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QUFDLElBQUksRUFBRSxDQUFDO0lBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDL0YsUUFBQSxRQUFRLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBSXBILENBQUM7SUFDRyxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLFlBQVksQ0FBQztRQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFBO0lBQ2xGLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyw0Q0FBNEM7SUFDaEosTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN2RSxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0lBQzVHLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLFlBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQTtJQUNwRSxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzNDLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksY0FBYyxDQUFDO1FBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLENBQUE7SUFDdkYsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN4RSxZQUFJLEdBQUcsQ0FBQyxHQUFN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LEVBQUssSUFBSSxNQUFNLENBQUMsWUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDekMsS0FBSyxDQUFDLEVBQUssSUFBSSxNQUFNLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDbkQsSUFBSSxHQUFHLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDO0lBQzlCLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNqRixJQUFJLEVBQUUsS0FBSyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ3JGLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQzVFLElBQUksS0FBSyxLQUFLLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNyRixJQUFJLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUM7SUFDaEMsSUFBSSxHQUFHLEtBQUssTUFBTSxDQUFDLFdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQztJQUN2QyxRQUFRLENBQUMsR0FBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMsR0FBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQSxDQUFDLENBQUM7SUFDekMsU0FBUztRQUNMLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7UUFDcEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO1FBQ3BCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7UUFDcEIsSUFBSSxDQUFDLEdBQUcsY0FBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3hCLE1BQU0sV0FBVyxHQUFHLENBQUMsZUFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNyRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFBO1FBQ2xCLE1BQU0sWUFBWSxHQUFHLFlBQVksRUFBRSxJQUFJLENBQUE7UUFDdkMsTUFBTSxTQUFTLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FBQTtRQUVwQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDO1lBQUMsVUFBRSxDQUFDLGdDQUFnQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDMUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQUMsVUFBRSxDQUFDLG9DQUFvQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBRTVFLElBQUksQ0FBQyxHQUFHLGVBQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxHQUFHLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQTtRQUN2RCxJQUFJLFlBQVksR0FDWixDQUFDLEtBQUssSUFBSSxJQUFJLGFBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsWUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQU0sRUFBRSxpQkFBUyxFQUFFLGtCQUFVLEVBQUUsY0FBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsYUFBSyxFQUFFLGdCQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM5RixNQUFNLFNBQVMsR0FBRyxTQUFTLEdBQUcsbUJBQVcsQ0FBQyxXQUFXLFlBQVksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDekUsb0JBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0NBQ0o7QUF6Q0Qsa0JBeUNDO0FBQ0Qsd0NBQXdDO0FBQzNCLFFBQUEsWUFBWSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUU7SUFDbkMsTUFBTSxHQUFHLEdBQUcsY0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLE1BQU0sSUFBSSxHQUFHLGlCQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDekIsTUFBTSxHQUFHLEdBQUcsY0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLElBQUksQ0FBQyxHQUFHLGNBQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QixNQUFNLFdBQVcsR0FBRyxDQUFDLGVBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakUsTUFBTSxFQUFFLEdBQUcsYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ25CLE1BQU0sWUFBWSxHQUFHLFlBQVksRUFBRSxJQUFJLENBQUE7SUFDdkMsTUFBTSxTQUFTLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FBQTtJQUVwQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDO1FBQUMsVUFBRSxDQUFDLGdDQUFnQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDMUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQUMsVUFBRSxDQUFDLGtDQUFrQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFbkUsSUFBSSxDQUFDLEdBQUcsZUFBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEdBQUcsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZELElBQUksWUFBWSxHQUNaLENBQUMsS0FBSyxJQUFJLElBQUksYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixZQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBTSxFQUFFLGlCQUFTLEVBQUUsa0JBQVUsRUFBRSxjQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxhQUFLLEVBQUUsZ0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzlGLE1BQU0sU0FBUyxHQUFHLFNBQVMsR0FBRyxtQkFBVyxDQUFDLFdBQVcsWUFBWSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN6RSxvQkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUFBO0FBQ1ksUUFBQSxVQUFVLEdBQUcsQ0FBQyxDQUFLLEVBQUUsRUFBRTtJQUNoQyxJQUFJLEVBQUUsR0FBRyxxQkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3pCLEVBQUUsR0FBRyxnQkFBUSxDQUFDLGVBQU8sQ0FBQyxlQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQy9DLEVBQUUsQ0FBQyxDQUFDLGFBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDMUIsTUFBTSxDQUFDLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZDLElBQUksQ0FBQyxHQUFHLGNBQWMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFBO0lBQ3BDLE1BQU0sQ0FBQyxDQUFNLENBQUE7QUFDakIsQ0FBQyxDQUFBO0FBQ1ksUUFBQSxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQUksRUFBRSxrQkFBVSxDQUFNLENBQUE7QUFDdkUsNEJBQTRCO0FBQ2YsUUFBQSxhQUFhLEdBQUcsR0FBRyxDQUFDLEVBQUU7SUFDL0IsTUFBTSxLQUFLLEdBQUcsWUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZCLE1BQU0sTUFBTSxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEMsSUFBSSxRQUFRLEdBQUcsZ0JBQVEsQ0FBQyxlQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNwRCxJQUFJLFFBQVEsR0FBTSxDQUFDLEdBQUcsRUFBRTtRQUNwQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBTSxRQUFRLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDOUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUE7WUFDdkMsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUNKLE1BQU0sTUFBTSxHQUFHLENBQUMsUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzdHLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtRQUNsQixNQUFNLFNBQVMsR0FBRyxNQUFNLEtBQUssSUFBSSxDQUFBO1FBQ2pDLE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUE7UUFDakMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNYLEtBQUssQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDO2dCQUN6QixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsZUFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFDLGdCQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQUMsQ0FBQztnQkFDcEcsSUFBSSxDQUFDLENBQUM7b0JBQUMsVUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUFDLFlBQUksRUFBRSxDQUFBO2dCQUFDLENBQUM7WUFDckMsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLGdCQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxlQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2xELEtBQUssQ0FBQyxTQUFTLENBQUM7Z0JBQ1osRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLFVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtnQkFDcEIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsZ0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFBQyxDQUFDO1lBQ3ZFO2dCQUNJLFVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFBQyxZQUFJLEVBQUUsQ0FBQTtRQUNoQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLGdCQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDMUIsQ0FBQyxDQUFBO0lBQ0QsSUFBSSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUE7SUFDbEIsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFBQyxRQUFRLENBQUM7UUFBQyxvQkFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsWUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFBQyxDQUFDO0FBQ2pGLENBQUMsQ0FBQTtBQUVZLFFBQUEsS0FBSyxHQUFHLENBQUMsQ0FBSyxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsZ0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUVsRCxRQUFBLFdBQVcsR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRTtJQUNoRCxNQUFNLEVBQUUsR0FBRyxrQkFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3hCLE1BQU0sSUFBSSxHQUFHLGFBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN0QixNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUMzQixNQUFNLENBQUMsR0FBRyxZQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDWixDQUFDLENBQUE7QUFFWSxRQUFBLFFBQVEsR0FBRyxDQUFDLENBQVEsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sRUFBRSxHQUFHLGtCQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDeEIsTUFBTSxDQUFDLEdBQU0sY0FBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZCLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDWixDQUFDLENBQUE7QUFFWSxRQUFBLFVBQVUsR0FBRyxDQUFDLENBQVUsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sRUFBRSxHQUFHLGNBQU0sQ0FBQyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDOUIsTUFBTSxDQUFDLEdBQWEsY0FBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzlCLE1BQU0sQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM3QixDQUFDLENBQUE7QUFFWSxRQUFBLGFBQWEsR0FBRyxDQUFDLENBQVUsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sQ0FBQyxHQUFHLGtCQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzNCLE1BQU0sQ0FBQyxHQUFZLGNBQU0sQ0FBQyxtQkFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDNUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUNaLENBQUMsQ0FBQTtBQUNZLFFBQUEsSUFBSSxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsWUFBSSxDQUFDLGdCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDbEUsUUFBQSxNQUFNLEdBQUcsU0FBUyxHQUFHLGNBQU0sR0FBRyxnQkFBZ0IsR0FBRyxjQUFNLENBQUE7QUFDcEUsY0FBTSxDQUFDLGNBQU0sQ0FBQyxDQUFBO0FBQ0QsUUFBQSxZQUFZLEdBQUcsU0FBUyxDQUFBO0FBQ3hCLFFBQUEsY0FBYyxHQUFHLENBQUMsQ0FBSSxFQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLG9CQUFZLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDMUQsUUFBQSxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUMsY0FBTSxDQUFDLGNBQU0sQ0FBQyxDQUFBO0FBQ2hDLFFBQUEsUUFBUSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxjQUFNLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQTtBQUMzQyxRQUFBLFFBQVEsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM3QyxRQUFBLE1BQU0sR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsZ0JBQVEsQ0FBQyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDMUMsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLGFBQUssQ0FBQyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdkMsUUFBQSxJQUFJLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxZQUFJLENBQUMsYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDbEQsUUFBQSxNQUFNLEdBQUcsY0FBTSxDQUFBO0FBQ2YsUUFBQSxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUMsY0FBTSxDQUFDLGNBQU0sQ0FBQyxDQUFBO0FBQ2hDLFFBQUEsS0FBSyxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxjQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtBQUN2QyxRQUFBLE1BQU0sR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLGFBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3RDLFFBQUEsTUFBTSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxhQUFLLENBQUMsYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDcEMsUUFBQSxJQUFJLEdBQUcsQ0FBSSxDQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUM3RCxRQUFBLEtBQUssR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ25ELFFBQUEsUUFBUSxHQUFHLGFBQWEsQ0FBQyxJQUFzQixDQUFBO0FBQy9DLFFBQUEsWUFBWSxHQUFHLGFBQWEsQ0FBQyxJQUFzQixDQUFBO0FBQ25ELFFBQUEsS0FBSyxHQUFHLENBQUMsQ0FBSyxFQUFFLEVBQUUsQ0FBQyxnQkFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUM5QyxRQUFBLFNBQVMsR0FBRyxDQUFDLENBQUssRUFBRSxFQUFFLENBQUMsb0JBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDdkQsUUFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxHQUFHLFlBQUksQ0FBQyxhQUFLLEVBQUUsQ0FBQyxDQUFDLFlBQUksQ0FBQyxhQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFLLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUN6RCxRQUFBLFdBQVcsR0FBRyxDQUFDLElBQU8sRUFBRSxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBSyxFQUFFLEVBQUUsR0FBRyxZQUFJLENBQUMscUJBQWEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFJLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsYUFBSyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDeEcsUUFBQSxXQUFXLEdBQUcsQ0FBQyxJQUFPLEVBQUUsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsWUFBSSxDQUFDLHFCQUFhLENBQUMsSUFBSSxFQUFFLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQUksQ0FBQyxhQUFLLENBQUMsa0JBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBSyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDM0gsUUFBQSxRQUFRLEdBQUcsQ0FBQyxFQUFLLEVBQUUsSUFBUSxFQUFFLEdBQU8sRUFBRSxFQUFFLEdBQUcsWUFBSSxDQUFDLGdCQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBSSxDQUFDLGFBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLGFBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzlGLFFBQUEsS0FBSyxHQUFHLGVBQU8sQ0FBQyxjQUFNLEVBQUUsWUFBSSxDQUFvQixDQUFBO0FBQ2hELFFBQUEsU0FBUyxHQUFHLGVBQU8sQ0FBQyxhQUFLLEVBQUUsWUFBSSxDQUFvQixDQUFBO0FBRW5ELFFBQUEsS0FBSyxHQUFHLENBQUksSUFBWSxFQUFNLEVBQUUsQ0FBQyxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFDbkQsUUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFjLEVBQVEsRUFBRSxDQUFDLGNBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUN2RCxRQUFBLFFBQVEsR0FBRyxlQUFnQyxDQUFBO0FBQzNDLFFBQUEsUUFBUSxHQUFHLENBQUksSUFBWSxFQUFPLEVBQUUsQ0FBQyxhQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7QUFDekQsUUFBQSxTQUFTLEdBQUcsQ0FBQyxLQUFXLEVBQU0sRUFBRSxDQUFDLGdCQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDaEQsUUFBQSxrQkFBa0IsR0FBRyxDQUFJLEdBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBUyxFQUFrQixFQUFFO0lBQ3ZGLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFVLENBQUE7SUFDM0IsTUFBTSxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQTtJQUMzQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNmLElBQUk7WUFDQSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNuQixDQUFDO0lBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFBO0FBQ25CLENBQUMsQ0FBQTtBQUNZLFFBQUEsTUFBTSxHQUFHLGVBQU8sQ0FBQyxhQUFLLEVBQUUsYUFBSyxDQUEyQixDQUFBO0FBQ3hELFFBQUEsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUE0QixDQUFBO0FBQzlDLFFBQUEsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFTLEVBQUUsQ0FBQyxjQUFjLEdBQUcsa0JBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNyRCxRQUFBLE9BQU8sR0FBRyxlQUFPLENBQUMsaUJBQVMsRUFBRSxZQUFJLENBQXNCLENBQUE7QUFDdkQsUUFBQSxNQUFNLEdBQUcsZUFBTyxDQUFDLGVBQU8sRUFBRSxlQUFPLENBQXFCLENBQUE7QUFDdEQsUUFBQSxNQUFNLEdBQUcsZUFBTyxDQUFDLFlBQUksRUFBRSxnQkFBUSxDQUFxQixDQUFBO0FBQ3BELFFBQUEsS0FBSyxHQUFHLGVBQU8sQ0FBQyxjQUFNLENBQUMsYUFBSyxDQUFDLEVBQUUsZUFBTyxDQUFvQixDQUFBO0FBQzFELFFBQUEsZ0JBQWdCLEdBQUcsZUFBTyxDQUFDLHFCQUFhLEVBQUUsYUFBSyxDQUF3QixDQUFBO0FBQ3ZFLFFBQUEsZ0JBQWdCLEdBQUcsZUFBTyxDQUFDLFlBQUksRUFBRSx3QkFBZ0IsQ0FBQyxDQUFBO0FBQ2xELFFBQUEsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQU8sRUFBRSxFQUFNLEVBQVEsRUFBRTtJQUM3QyxNQUFNLENBQUMsR0FBRyxrQkFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3ZCLGdCQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUN4QixDQUFDLENBQUE7QUFDWSxRQUFBLFNBQVMsR0FBRyxlQUFPLENBQUMsY0FBTSxFQUFFLG1CQUFXLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFtQixDQUFBO0FBQ3RHLDJDQUEyQztBQUM5QixRQUFBLFVBQVUsR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBO0FBQzNCLFFBQUEsS0FBSyxHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLFFBQUEsT0FBTyxHQUFHLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNwQixRQUFBLE9BQU8sR0FBRyxhQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDcEIsUUFBQSxPQUFPLEdBQUcsYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3BCLFFBQUEsT0FBTyxHQUFHLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNwQixRQUFBLE9BQU8sR0FBRyxhQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDcEIsUUFBQSxPQUFPLEdBQUcsYUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3BCLFFBQUEsWUFBWSxHQUFHLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN6QixRQUFBLGdCQUFnQixHQUFHLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUM3QixRQUFBLG1CQUFtQixHQUFHLFlBQUksQ0FBQyxlQUFPLEVBQUUsZUFBTyxDQUFDLENBQUE7QUFDNUMsUUFBQSxxQkFBcUIsR0FBRyxZQUFJLENBQUMsZUFBTyxFQUFFLGVBQU8sQ0FBQyxDQUFBO0FBQzlDLFFBQUEsY0FBYyxHQUFHLGVBQU8sQ0FBQywyQkFBbUIsRUFBRSw2QkFBcUIsQ0FBQyxDQUFBO0FBQ3BFLFFBQUEsYUFBYSxHQUFHLFlBQUksQ0FBQyxlQUFPLEVBQUUsZUFBTyxDQUFDLENBQUE7QUFDdEMsUUFBQSxjQUFjLEdBQUcsV0FBRyxDQUFDLG9CQUFZLENBQUMsQ0FBQTtBQUNsQyxRQUFBLGtCQUFrQixHQUFHLFdBQUcsQ0FBQyx3QkFBZ0IsQ0FBQyxDQUFBO0FBQzFDLFFBQUEsZ0JBQWdCLEdBQUcsZUFBTyxDQUFDLHNCQUFjLEVBQUUsMEJBQWtCLEVBQUUsc0JBQWMsQ0FBWSxDQUFBO0FBQ3pGLFFBQUEsYUFBYSxHQUFHLGVBQU8sQ0FBQyx3QkFBZ0IsRUFBRSxxQkFBYSxDQUFDLENBQUE7QUFDeEQsUUFBQSxVQUFVLEdBQUcsQ0FBQyxDQUFPLEVBQUUsRUFBRSxDQUFDLFlBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFLLEVBQUUsYUFBSyxFQUFFLGFBQUssQ0FBQyxDQUFBO0FBQ3RELFFBQUEsTUFBTSxHQUFHLENBQUMsS0FBVyxFQUFNLEVBQUUsQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDMUMsUUFBQSxlQUFlLEdBQUcsQ0FBQyxJQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3pGLFFBQUEsT0FBTyxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2hELFFBQUEsT0FBTyxHQUFHLENBQUMsS0FBVyxFQUFFLEVBQUUsQ0FBQyxZQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBSyxFQUFFLFlBQUksQ0FBQyxDQUFBO0FBQ25ELFFBQUEsYUFBYSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUU7SUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxvQkFBWSxDQUFDLENBQUE7SUFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2YsQ0FBQyxDQUFBO0FBQ1ksUUFBQSxTQUFTLEdBQUcsR0FBRyxFQUFFO0lBQzFCLE1BQU0sQ0FBQyxHQUFvQixJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ3BDLE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBYSxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFhLENBQUE7UUFDakIsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDUixhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDcEIsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDLENBQUE7SUFDRCxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDckIsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUNaLENBQUMsQ0FBQTtBQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBYSxFQUFFLEVBQUU7SUFDeEIsTUFBTSxFQUFFLEdBQUcsY0FBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM1QixNQUFNLENBQUMsR0FBUSxFQUFFLENBQUE7SUFDakIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUNmLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN6QixNQUFNLEVBQUUsR0FBRyxPQUFPLEdBQUcsQ0FBQTtRQUNyQiwyQ0FBMkM7UUFDM0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsT0FBTyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDOUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNiLENBQUM7SUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ1osQ0FBQyxDQUFBO0FBQ1ksUUFBQSxxQkFBcUIsR0FBRyxHQUFHLEVBQUU7SUFDdEMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ2xDLElBQUksR0FBRyxHQUFRLEVBQUUsQ0FBQTtJQUNqQixJQUFJLEVBQWMsQ0FBQTtJQUNsQixNQUFNLElBQUksR0FBRyxpQkFBUyxFQUFFLENBQUE7SUFDeEIsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDZCxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBQ0QsR0FBRyxHQUFHLGlCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM1QixNQUFNLENBQUMsR0FBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUMzQixNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ1osQ0FBQyxDQUFBO0FBQ0Q7SUFHSSxZQUFZLENBQU07UUFDZCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQTtRQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFBO0lBQ3BCLENBQUM7SUFDRCxJQUFJLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQSxDQUFDLENBQUM7SUFDcEMsSUFBSSxNQUFNLENBQUMsQ0FBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNyQyxJQUFJLE1BQU0sS0FBSyxNQUFNLENBQUMsY0FBTSxDQUFDLGNBQU0sQ0FBQyxZQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQU0sQ0FBQSxDQUFDLENBQUM7SUFDM0QsSUFBSSxFQUFFLEtBQUssTUFBTSxDQUFDLGNBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ3JDLElBQUksS0FBSyxLQUFLLE1BQU0sQ0FBQyxpQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDM0MsSUFBSSxHQUFHLEtBQUssTUFBTSxDQUFDLGNBQU0sQ0FBQyxrQkFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDbEUsSUFBSSxJQUFJLEtBQUssTUFBTSxDQUFDLGNBQU0sQ0FBQyxZQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLENBQUEsQ0FBQyxDQUFDO0lBQ3BELFNBQVMsQ0FBQyxDQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQztJQUNoRCxVQUFVLENBQUMsQ0FBSSxJQUFJLGVBQU8sQ0FBQyxhQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ2hELGdFQUFnRTtJQUNoRSxNQUFNLENBQUMsQ0FBSSxFQUFFLEtBQVEsSUFBSSxlQUFPLENBQUMsZ0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDaEUsR0FBRyxLQUFLLFlBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFDO0NBQzdCO0FBbkJELGtCQW1CQztBQUNZLFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3Mvbm9kZS9ub2RlLmQudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvY29tbW9uLmQudHNcIi8+XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuaW1wb3J0ICogYXMgY2hpbGRfcHJvY2VzcyBmcm9tICdjaGlsZF9wcm9jZXNzJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBvcyBmcm9tICdvcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIHUgZnJvbSAndXRpbCc7XHJcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpIC8vaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gJ2Fzc2VydCdcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBpc0VxID0gKGV4cCwgYWN0KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0LCBleHApXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxufVxyXG5leHBvcnQgY29uc3QgaXNOb3RFcSA9IChleHAsIGFjdCkgPT4gIWlzRXEoZXhwLCBhY3QpXHJcbmV4cG9ydCBjb25zdCBzQ21wID0gKGV4cDogcywgYWN0OiBzKTogdm9pZCA9PiB7XHJcbiAgICBzQnJ3QXRGZHJGbignc3RyQ21wJywgJ2V4cCcpKGV4cClcclxuICAgIHNCcndBdEZkckZuKCdzdHJDbXAnLCAnYWN0JykoYWN0KVxyXG4gICAgZGVidWdnZXJcclxufVxyXG5leHBvcnQgY29uc3QgdkNtcCA9IChleHAsIGFjdCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGlzQm9vbChleHApICYmIGlzQm9vbChhY3QpKSB7XHJcbiAgICAgICAgaWYgKGFjdCAhPT0gZXhwKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChpc1N0cihleHApICYmIGlzU3RyKGFjdCkpXHJcbiAgICAgICAgcmV0dXJuIHNDbXAoZXhwLCBhY3QpXHJcbiAgICBvQnJ3QXRGZHJGbigndkNtcCcsICdleHAnKShleHApXHJcbiAgICBvQnJ3QXRGZHJGbigndkNtcCcsICdhY3QnKShhY3QpXHJcbiAgICBkZWJ1Z2dlclxyXG59XHJcbmV4cG9ydCBjb25zdCBhc3NlcnRJc0VxID0gKGV4cCwgYWN0KSA9PiBpc05vdEVxKGV4cCwgYWN0KSA/IHZDbXAoZXhwLCBhY3QpIDogdm9pZCAwO1xyXG5leHBvcnQgY29uc3QgYXNzZXJ0SXNOb3RFcSA9IChleHAsIGFjdCkgPT4gaXNFcShleHAsIGFjdCkgPyB2Q21wKGV4cCwgYWN0KSA6IHZvaWQgMDtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCB2TFQgPSB4ID0+IGEgPT4gYSA8IHhcclxuZXhwb3J0IGNvbnN0IHZHRSA9IHggPT4gYSA9PiBhID49IHhcclxuZXhwb3J0IGNvbnN0IHZMRSA9IHggPT4gYSA9PiBhIDw9IHhcclxuZXhwb3J0IGNvbnN0IHZFUSA9IDxUPih4OiBUKSA9PiAoYTogVCkgPT4gYSA9PT0geFxyXG5leHBvcnQgY29uc3Qgdk5FID0gPFQ+KHg6IFQpID0+IChhOiBUKSA9PiBhICE9PSB4XHJcbmV4cG9ydCBjb25zdCB2R1QgPSB4ID0+IGEgPT4gYSA+IHhcclxuZXhwb3J0IGNvbnN0IHZJTiA9IChpdHI6IGl0cikgPT4gYSA9PiB7IGZvciAobGV0IGkgb2YgaXRyKSBpZiAoaSA9PT0gYSkgcmV0dXJuIHRydWU7IHJldHVybiBmYWxzZSB9XHJcbmV4cG9ydCBjb25zdCB2Tm90SW4gPSBpdHIgPT4gYSA9PiAhdklOKGl0cikoYSlcclxuZXhwb3J0IGNvbnN0IHZCRVQgPSA8VD4oeDogVCwgeTogVCkgPT4gKGE6IFQpID0+IHggPD0gYSAmJiBhIDw9IHlcclxuZXhwb3J0IGNvbnN0IHZOb3RCZXQgPSA8VD4oeDogVCwgeTogVCkgPT4gKGE6IFQpID0+ICF2QkVUKHgsIHkpKGEpXHJcbmV4cG9ydCBjb25zdCB2SXNJbnN0YW5jZU9mID0gPFQ+KHg6IEZ1bmN0aW9uKSA9PiAoYTogVCkgPT4gYSBpbnN0YW5jZW9mIHhcclxuZXhwb3J0IGNvbnN0IGVuc1N5ID0gKGE6IHMgfCBzeSkgPT4gdHlwZW9mIGEgPT09ICdzdHJpbmcnID8gc1NwbGl0U3BjKGEpIDogYVxyXG5leHBvcnQgY29uc3QgZW5zUmUgPSAoYTogcyB8IHJlKSA9PiBhIGluc3RhbmNlb2YgUmVnRXhwID8gYSA6IG5ldyBSZWdFeHAoYSlcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBwaXBlID0gdiA9PiAoLi4uZjogZltdKSA9PiB7IGxldCBvID0gdjsgZm9yIChsZXQgZmYgb2YgZikgbyA9IGZmKG8pOyByZXR1cm4gbyB9XHJcbmV4cG9ydCBjb25zdCB2TWFwID0gKGY6IGYpID0+IGEgPT4gZihhKVxyXG5leHBvcnQgY29uc3QgZnVuQXBwbHkgPSB2ID0+IChhOiBmKSA9PiBhKHYpXHJcbmV4cG9ydCBjb25zdCBzd2FwID0gKGY6IGYpID0+IGEgPT4gYiA9PiBmKGIpKGEpXHJcbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKC4uLmY6IGZbXSkgPT4gdiA9PiBwaXBlKHYpKC4uLmYpXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgZGljTHkgPSA8VD4oYTogZGljPFQ+KSA9PiBpdHJNYXAoa3ZMaW4pKGEpIGFzIHNbXVxyXG5leHBvcnQgY29uc3QgZGljTGluZXMgPSA8VD4oYTogZGljPFQ+KSA9PiBkaWNMeShhKS5qb2luKCdcXHJcXG4nKVxyXG5leHBvcnQgY29uc3Qga3ZMaW4gPSAoW2ssIHZdOiBrdikgPT4gayArICcgJyArIHZcclxuZXhwb3J0IGNvbnN0IGRtcCA9IGdsb2JhbC5jb25zb2xlLmxvZ1xyXG5leHBvcnQgY29uc3QgZnVuRG1wID0gKGY6IEZ1bmN0aW9uKSA9PiBkbXAoZi50b1N0cmluZygpKVxyXG5leHBvcnQgY29uc3QgaGFsdCA9ICgpID0+IHsgdGhyb3cgbmV3IEVycm9yKCkgfVxyXG5leHBvcnQgY29uc3Qgc0VzY0xmID0gKGE6IHMpID0+IGEucmVwbGFjZSgnXFxuJywgJ1xcXFxuJylcclxuZXhwb3J0IGNvbnN0IHNFc2NWYmFyID0gKGE6IHMpID0+IGEucmVwbGFjZSgvXFx8L2csICdcXFxcdicpXHJcbmV4cG9ydCBjb25zdCBzRXNjQ3IgPSAoYTogcykgPT4gYS5yZXBsYWNlKC9cXHIvZywgJ1xcXFxyJylcclxuZXhwb3J0IGNvbnN0IHNFc2NUYWIgPSAoYTogcykgPT4gYS5yZXBsYWNlKC9cXHQvZywgJ1xcXFx0JylcclxuZXhwb3J0IGNvbnN0IHNFc2M6ICgoYTogcykgPT4gcykgPSBjb21wb3NlKHNFc2NMZiwgc0VzY0NyLCBzRXNjVGFiKVxyXG5leHBvcnQgY29uc3Qgc0ZtdCA9IChxcVN0cjogcywgLi4udikgPT4ge1xyXG4gICAgbGV0IHogPSBxcVN0clxyXG4gICAgZm9yIChsZXQgaSBvZiB2KSB7XHJcbiAgICAgICAgeiA9IHoucmVwbGFjZSgnPycsIGkpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gelxyXG59XHJcbmV4cG9ydCBjb25zdCBzQm94ID0gKGE6IHMpID0+IHsgY29uc3QgeSA9IFwiPT0gXCIgKyBzRXNjKGEpICsgXCIgPT1cIiwgeCA9IFwiPVwiLnJlcGVhdChhLmxlbmd0aCArIDYpOyByZXR1cm4gW3gsIHksIHhdLmpvaW4oXCJcXHJcXG5cIikgfVxyXG5leHBvcnQgY29uc3Qgc3RhY2sgPSAoKSA9PiB7IHRyeSB7IHRocm93IG5ldyBFcnJvcigpIH0gY2F0Y2ggKGUpIHsgbGV0IHo6IHMgPSBlLnN0YWNrOyByZXR1cm4geiB9IH1cclxuZXhwb3J0IGNvbnN0IGVyID0gKG1zZzogcywgLi4udikgPT4ge1xyXG4gICAgbGV0IGEgPSBzdGFjaygpXHJcbiAgICBsZXQgYiA9IGEuc3BsaXQoL1xcbi8pXHJcbiAgICBsZXQgYyA9IGJbM11cclxuICAgIGxldCBkID0gYy5zcGxpdCgvXFxzKy8pXHJcbiAgICBsZXQgYnJlYWtpbmdGdW5ObSA9IGRbMl1cclxuICAgIGxldCBoZHIgPSBzQm94KGJyZWFraW5nRnVuTm0pXHJcbiAgICBkbXAoaGRyKVxyXG4gICAgZG1wKGBlcnJvclske21zZ31dIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcbmApXHJcbiAgICBpdHJFYWNoKGRtcCkodilcclxuICAgIGRtcChhKVxyXG4gICAgZG1wKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKVxyXG4gICAgbGV0IGRiZyA9IHRydWVcclxuICAgIGRlYnVnZ2VyXHJcbiAgICAvLyAgICBpZiAoZGJnKVxyXG4gICAgLy8gICAgICAgIGhhbHQoKVxyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHNTcGxpdCA9IChzZXA6IHNPclJlKSA9PiAoYTogcykgPT4gYS5zcGxpdChzZXApXHJcbmV4cG9ydCBjb25zdCBzUm12Q3IgPSAoYTogcykgPT4gYS5yZXBsYWNlKC9cXHIvZywgJycpXHJcbmV4cG9ydCBjb25zdCBzU3BsaXRMaW5lcyA9IChhOiBsaW5lcykgPT4gc1NwbGl0TGYoc1JtdkNyKGEpKVxyXG5leHBvcnQgY29uc3Qgc1NwbGl0U3BjID0gKF9zOiBzKSA9PiBzU3BsaXQoL1xccysvKShfcy50cmltKCkpXHJcbmV4cG9ydCBjb25zdCBzU3BsaXRDckxmID0gc1NwbGl0KCdcXHJcXG4nKVxyXG5leHBvcnQgY29uc3Qgc1NwbGl0TGYgPSBzU3BsaXQoJ1xcbicpXHJcbmV4cG9ydCBjb25zdCBzU3BsaXRDb21tYVNwYyA9IHNTcGxpdCgvLFxccyovKVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCB2RGZ0ID0gPFQ+KGRmdDogVCkgPT4gKGE6IFQgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiBhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCA/IGRmdCA6IGFcclxuZXhwb3J0IGNvbnN0IHZEZnRTdHIgPSB2RGZ0KFwiXCIpXHJcbmV4cG9ydCBjb25zdCB2RGZ0VXBwZXIgPSA8VD4oeDogVCwgeTogVCkgPT4gKGE6IFQgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiBhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCB8fCB4ID4gYSB8fCBhID4geSA/IHkgOiBhXHJcbmV4cG9ydCBjb25zdCB2RGZ0TG93ZXIgPSA8VD4oeDogVCwgeTogVCkgPT4gKGE6IFQgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiBhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCB8fCB4ID4gYSB8fCBhID4geSA/IHggOiBhXHJcbmV4cG9ydCBjb25zdCBheUZpbmRJeCA9IChwOiBwKSA9PiAoYTogYXkpID0+IHsgZm9yIChsZXQgaSBpbiBhKSBpZiAocChhW2ldKSkgcmV0dXJuIE51bWJlcihpKTsgcmV0dXJuIG51bGwgfVxyXG5leHBvcnQgY29uc3QgYXlGaW5kSXhPckRmdCA9IChkZnRJeDogbikgPT4gKHA6IHApID0+IChhOiBheSkgPT4gdkRmdChkZnRJeCkoYXlGaW5kSXgocCkoYSkpXHJcbmV4cG9ydCBjb25zdCBheUZzdCA9IDxUPihhOiBUW10pID0+IGFbMF1cclxuZXhwb3J0IGNvbnN0IGF5U25kID0gPFQ+KGE6IFRbXSkgPT4gYVsxXVxyXG5leHBvcnQgY29uc3QgYXlFbGUgPSA8VD4oaXg6IG4pID0+IChhOiBUW10pID0+IGFbaXhdXHJcbmV4cG9ydCBjb25zdCBheUVsZU9yRGZ0ID0gPFQ+KGRmdDogVCkgPT4gKGl4OiBuKSA9PiAoYTogVFtdKSA9PiB2RGZ0KGRmdCkoYVtpeF0pXHJcbmV4cG9ydCBjb25zdCBheUxhcyA9IDxUPihhOiBUW10pID0+IGFbdkxlbihhKSAtIDFdXHJcbmV4cG9ydCBjb25zdCBheVNldEVsZSA9IDxUPihpeDogbikgPT4gKHY6IFQpID0+IChhOiBUW10pID0+IHsgYVtpeF0gPSB2IH1cclxuZXhwb3J0IGNvbnN0IGF5TWR5RWxlID0gPFQ+KGl4OiBuKSA9PiAoZjogKGE6IFQpID0+IFQpID0+IChhOiBUW10pID0+IHsgYVtpeF0gPSBmKGFbaXhdKSB9XHJcbmV4cG9ydCBjb25zdCBheU1keSA9IDxUPihmOiAoYTogVCkgPT4gVCkgPT4gKGE6IFRbXSkgPT5cclxuICAgIGVhY2hcclxuICAgICAgICAoKGl0bSwgaXgpID0+IHsgaWYgKGl4ICE9PSB1bmRlZmluZWQpIGFbaXhdID0gZihhW2l4XSkgfSlcclxuICAgICAgICAobkl0cihhLmxlbmd0aCkpXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IGF5Sm4gPSAoc2VwPzogcykgPT4gKGE6IGF5KSA9PiBhLmpvaW4oc2VwKVxyXG5leHBvcnQgY29uc3QgYXlKbkNyTGYgPSBheUpuKCdcXHJcXG4nKVxyXG5leHBvcnQgY29uc3QgYXlKbkxmID0gYXlKbignXFxuJylcclxuZXhwb3J0IGNvbnN0IGF5Sm5TcGMgPSBheUpuKCcgJylcclxuZXhwb3J0IGNvbnN0IGF5Sm5Db21tYSA9IGF5Sm4oJywnKVxyXG5leHBvcnQgY29uc3QgYXlKbkNvbW1hU3BjID0gYXlKbignLCAnKVxyXG5leHBvcnQgY29uc3QgblNwYyA9IChhOiBuKSA9PiAnICcucmVwZWF0KGEpXHJcbmV4cG9ydCBjb25zdCBheUpuQXNMaW5lcyA9IChzZXAwPzogcywgdGFiMD86IG4sIHdkdDA/OiBuKSA9PiAoYTogYXkpID0+IHtcclxuICAgIGxldCB3ZHQgPSB2RGZ0VXBwZXIoMjAsIDEyMCkod2R0MClcclxuICAgIGxldCBzZXAgPSB2RGZ0KCcnKShzZXAwKVxyXG4gICAgbGV0IHNsZW4gPSBzZXAubGVuZ3RoXHJcbiAgICBsZXQgcGZ4ID0gblNwYyh2RGZ0KDApKHRhYjApKVxyXG4gICAgbGV0IHggPSAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9vOiBheSA9IFtdXHJcbiAgICAgICAgbGV0IG86IGF5ID0gW11cclxuICAgICAgICBsZXQgd3cgPSAwXHJcbiAgICAgICAgZm9yIChsZXQgcyBvZiBhKSB7XHJcbiAgICAgICAgICAgIGxldCBsID0gc0xlbihzKSArIHNsZW5cclxuICAgICAgICAgICAgaWYgKHd3ICsgbCA+IHdkdCkge1xyXG4gICAgICAgICAgICAgICAgb28ucHVzaChwZnggKyBpdHJBZGRTZngoc2VwKShvKS5qb2luKFwiXCIpKVxyXG4gICAgICAgICAgICAgICAgbyA9IFtdXHJcbiAgICAgICAgICAgICAgICB3dyA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvLnB1c2gocylcclxuICAgICAgICAgICAgd3cgKz0gbFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoby5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG9vLnB1c2gocGZ4ICsgaXRyQWRkU2Z4KHNlcCkobykuam9pbihcIlwiKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9vXHJcbiAgICB9KSgpXHJcbiAgICBsZXQgYiA9IGF5Sm5DckxmKHgpXHJcbiAgICByZXR1cm4gYlxyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHNGc3RDaHIgPSAoYTogcykgPT4gYVswXVxyXG5leHBvcnQgY29uc3Qgc0xhc0NociA9IChhOiBzKSA9PiBhW2EubGVuZ3RoIC0gMV1cclxuZXhwb3J0IGNvbnN0IHNBZGRQZnggPSAocGZ4OiBzKSA9PiAoYTogcykgPT4gcGZ4ICsgYVxyXG5leHBvcnQgY29uc3Qgc0FkZFNmeCA9IChzZng6IHMpID0+IGEgPT4gYSArIHNmeFxyXG5leHBvcnQgY29uc3Qgc0FkZFBmeFNmeCA9IChwZng6IHMsIHNmeDogcykgPT4gKGE6IHMpID0+IHBmeCArIGEgKyBzZnhcclxuZXhwb3J0IGNvbnN0IHZMZW4gPSBhID0+IHR5cGVvZiBhID09PSAnc3RyaW5nJyA/IGEubGVuZ3RoIDogKChhICYmIGEubGVuZ3RoKSB8fCBTdHJpbmcoYSkubGVuZ3RoKSBhcyBuXHJcbmV4cG9ydCBjb25zdCBzTGVuID0gKGE6IHMpID0+IGEubGVuZ3RoXHJcbmV4cG9ydCBjb25zdCBzTWlkTiA9IChwb3M6IG4pID0+IChuOiBuKSA9PiAoYTogcykgPT4gYS5zdWJzdHIocG9zLCBuKVxyXG5leHBvcnQgY29uc3Qgc01pZCA9IChwb3M6IG4pID0+IChhOiBzKSA9PiBhLnN1YnN0cihwb3MpXHJcbmV4cG9ydCBjb25zdCBzTGVmdCA9IChuOiBuKSA9PiAoYTogcykgPT4gYS5zdWJzdHIoMCwgbilcclxuZXhwb3J0IGNvbnN0IHNUcmltID0gKGE6IHMpID0+IGEudHJpbSgpXHJcbmV4cG9ydCBjb25zdCBzUmlnaHQgPSAobjogbikgPT4gKGE6IHMpID0+IHtcclxuICAgIGNvbnN0IGwgPSB2TGVuKGEpXHJcbiAgICBpZiAobiA+PSBsKSByZXR1cm4gYVxyXG4gICAgaWYgKDAgPj0gbikgcmV0dXJuICcnXHJcbiAgICByZXR1cm4gYS5zdWJzdHIoLW4pXHJcbn1cclxuZXhwb3J0IGNvbnN0IG5QYWRaZXJvID0gKGRpZzogbikgPT4gKGE6IG4pID0+IHtcclxuICAgIGNvbnN0IHMgPSBTdHJpbmcoYSlcclxuICAgIGNvbnN0IG5aZXIgPSBkaWcgLSBzLmxlbmd0aFxyXG4gICAgY29uc3QgeiA9IG5aZXIgPiAwID8gXCIwXCIucmVwZWF0KG5aZXIpIDogXCJcIlxyXG4gICAgcmV0dXJuIHogKyBzXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNBbGlnbkwgPSAodzogd2R0KSA9PiAoYTogcykgPT4ge1xyXG4gICAgaWYgKGEgPT09IG51bGwgfHwgYSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gblNwYyh3KVxyXG4gICAgY29uc3QgbCA9IHZMZW4oYSlcclxuICAgIGlmIChsID4gdykgcmV0dXJuIGFcclxuICAgIHJldHVybiBhICsgblNwYyh3IC0gbClcclxufVxyXG5leHBvcnQgY29uc3Qgc0FsaWduUiA9ICh3OiB3ZHQpID0+IChhOiBzKSA9PiB7XHJcbiAgICBjb25zdCBsID0gc0xlbihhKVxyXG4gICAgaWYgKGwgPiB3KSByZXR1cm4gYVxyXG4gICAgcmV0dXJuIG5TcGModyAtIGwpICsgYVxyXG59XHJcbmV4cG9ydCBjb25zdCBzV3J0ID0gKGZ0OiBzKSA9PiAoYTogcykgPT4gZnMud3JpdGVGaWxlU3luYyhmdCwgYSlcclxuZXhwb3J0IGNvbnN0IHNTYnNQb3MgPSAoc2JzOiBzKSA9PiAoYTogcykgPT4gYS5pbmRleE9mKHNicylcclxuLy9zdHJpY3RFcXVhbChzYnNQb3MoJ2FhYmInKSgnMTIzYWFiYicpLDMpXHJcbmV4cG9ydCBjb25zdCBzU2JzUmV2UG9zID0gKHNiczogcykgPT4gKGE6IHMpID0+IGEubGFzdEluZGV4T2Yoc2JzKVxyXG4vL3N0cmljdEVxdWFsKHNic1JldlBvcygnYScpKCcwMTIzYWFiYicpLDUpXHJcbmV4cG9ydCBjb25zdCBjbWxObSA9IChhOiBjbWwpID0+IGNtbE55KGEpLnJldmVyc2UoKS5qb2luKCcgJykgLy8gQGVnIGNtbE5tKHJlbEl0bU55KSA9PT0gJ055IEl0bSByZWwnXHJcbmV4cG9ydCBjb25zdCBjbWxTcGNObSA9IChhOiBjbWwpID0+IGNtbE55KGEpLmpvaW4oJyAnKVxyXG5leHBvcnQgY29uc3QgaXNObSA9IChzOiBzKSA9PiB7XHJcbiAgICBpZiAocyA9PT0gdW5kZWZpbmVkIHx8IHMgPT09IG51bGwgfHwgcyA9PT0gJycpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBpZiAoIWNockNkX2lzRnN0Tm1DaHIocy5jaGFyQ29kZUF0KDApKSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghY2hyQ2RfaXNObUNocihzLmNoYXJDb2RlQXQoaSkpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNScGxOb25ObUNociA9IChhOiBzKSA9PiB7XHJcbiAgICBjb25zdCBhMTogc1tdID0gW11cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBhLmNoYXJDb2RlQXQoaSlcclxuICAgICAgICBpZiAoY2hyQ2RfaXNObUNocihjKSlcclxuICAgICAgICAgICAgYTEucHVzaChhW2ldKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYTEucHVzaCgnICcpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYTEuam9pbignJylcclxufVxyXG5leHBvcnQgY29uc3Qgc05tU2V0ID0gKGE6IHMpID0+IG5ldyBTZXQ8cz4oc1JwbE5vbk5tQ2hyKGEpLnNwbGl0KC9cXHMrLykpXHJcbmNvbnN0IF9pc0Jya0NockNkID0gKGM6IG4pID0+IGMgPT09IE5hTiB8fCBjaHJDZF9pc0NhcGl0YWxMZXR0ZXIoYykgfHwgY2hyQ2RfaXNVbmRlclNjb3JlKGMpIHx8IGNockNkX2lzRG9sbGFyKGMpXHJcbmNvbnN0IF9pc0JyayA9IChjOiBuLCBjMDogbikgPT4gX2lzQnJrQ2hyQ2QoYykgJiYgIV9pc0Jya0NockNkKGMwKVxyXG5leHBvcnQgY29uc3QgY21sTnkgPSAoYTogY21sKSA9PiB7XHJcbiAgICBpZiAoIWlzTm0oYSkpXHJcbiAgICAgICAgZXIoJ0dpdmUge3N9IGlzIG5vdCBhIG5hbWUnLCB7IHM6IGEgfSlcclxuICAgIGNvbnN0IG86IHNbXSA9IFtdXHJcbiAgICBsZXQgbSA9ICcnXHJcbiAgICBmb3IgKGxldCBpID0gYS5sZW5ndGg7IGktLTsgaSA+IDApIHtcclxuICAgICAgICBjb25zdCBjYyA9IGFbaV1cclxuICAgICAgICBjb25zdCBjID0gYS5jaGFyQ29kZUF0KGkpXHJcbiAgICAgICAgY29uc3QgYzAgPSBhLmNoYXJDb2RlQXQoaSAtIDEpXHJcbiAgICAgICAgbSA9IGNjICsgbVxyXG4gICAgICAgIGlmIChfaXNCcmsoYywgYzApKSB7XHJcbiAgICAgICAgICAgIG8ucHVzaChtKVxyXG4gICAgICAgICAgICBtID0gJydcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobSAhPT0gJycpXHJcbiAgICAgICAgby5wdXNoKG0pXHJcbiAgICBjb25zdCB6OiBzW10gPSBvLnJldmVyc2UoKVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5leHBvcnQgY29uc3Qgc0hhc1BmeCA9IChwZng6IHMpID0+IChhOiBzKSA9PiBhLnN0YXJ0c1dpdGgocGZ4KVxyXG5leHBvcnQgY29uc3Qgc0hhc1NmeCA9IChzZng6IHMpID0+IChhOiBzKSA9PiBhLmVuZHNXaXRoKHNmeClcclxuZXhwb3J0IGNvbnN0IHNSbXZTZnggPSAoc2Z4OiBzKSA9PiAoYTogcykgPT4gc0hhc1NmeChzZngpKGEpID8gYS5zdWJzdHIoMCwgYS5sZW5ndGggLSBzZngubGVuZ3RoKSA6IGFcclxuZXhwb3J0IGNvbnN0IHNSbXZQZnggPSAocGZ4OiBzKSA9PiAoYTogcykgPT4gc0hhc1BmeChwZngpKGEpID8gYS5zdWJzdHIocGZ4Lmxlbmd0aCkgOiBhXHJcbmV4cG9ydCBjb25zdCBzSGFzUGZ4X0lHTk9SRV9DQVNFID0gKHBmeDogcykgPT4gKGE6IHMpID0+IGEudG9VcHBlckNhc2UoKS5zdGFydHNXaXRoKHBmeC50b1VwcGVyQ2FzZSgpKVxyXG5leHBvcnQgY29uc3Qgc0hhc1NmeF9JR05PUkVfQ0FTRSA9IChzZng6IHMpID0+IChhOiBzKSA9PiBhLnRvVXBwZXJDYXNlKCkuZW5kc1dpdGgoc2Z4LnRvVXBwZXJDYXNlKCkpXHJcbmV4cG9ydCBjb25zdCBzUm12UGZ4X0lHTk9SRV9DQVNFID0gKHBmeDogcykgPT4gKGE6IHMpID0+IHNIYXNQZngocGZ4KShhKSA/IGEuc3Vic3RyKHBmeC5sZW5ndGgpIDogYVxyXG5leHBvcnQgY29uc3Qgc1JtdlNmeF9JR05PUkVfQ0FTRSA9IChzZng6IHMpID0+IChhOiBzKSA9PiBzSGFzU2Z4KHNmeCkoYSkgPyBhLnN1YnN0cigwLCBhLmxlbmd0aCAtIHNmeC5sZW5ndGgpIDogYVxyXG5cclxuZXhwb3J0IGNvbnN0IHNIYXNQZnhJZ25DYXMgPSBzSGFzUGZ4X0lHTk9SRV9DQVNFXHJcblxyXG5leHBvcnQgY29uc3Qgc01hdGNoID0gKHJlOiByZSkgPT4gKGE6IHMpID0+IGEubWF0Y2gocmUpXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHByZWROb3Q6ICgoYTogcCkgPT4gcCkgPSBhID0+IHYgPT4gIWEodilcclxuZXhwb3J0IGNvbnN0IHByZWRzT3I6ICgoLi4uYTogcFtdKSA9PiBwKSA9ICguLi5hKSA9PiB2ID0+IHsgZm9yIChsZXQgcCBvZiBhKSBpZiAocCh2KSkgcmV0dXJuIHRydWU7IHJldHVybiBmYWxzZSB9XHJcbmV4cG9ydCBjb25zdCBwcmVkc0FuZDogKCguLi5hOiBwW10pID0+IHApID0gKC4uLmEpID0+IHYgPT4geyBmb3IgKGxldCBwIG9mIGEpIGlmICghcCh2KSkgcmV0dXJuIGZhbHNlOyByZXR1cm4gdHJ1ZSB9XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IGlzUm1rTGluID0gKGE6IHMpID0+IHtcclxuICAgIGNvbnN0IGwgPSBhLnRyaW0oKVxyXG4gICAgaWYgKGwgPT09IFwiXCIpIHJldHVybiB0cnVlXHJcbiAgICBpZiAoc0hhc1BmeChcIi0tXCIpKGwpKSByZXR1cm4gdHJ1ZVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbn1cclxuZXhwb3J0IGNvbnN0IGlzTm9uUm1rTGluOiBzUHJlZCA9IHByZWROb3QoaXNSbWtMaW4pXHJcbmV4cG9ydCBjb25zdCBsaW5SbXZNc2cgPSAoYTogbGluKSA9PiB7XHJcbiAgICBjb25zdCBhMSA9IGEubWF0Y2goLyguKiktLS0vKVxyXG4gICAgY29uc3QgYTIgPSBhMSA9PT0gbnVsbCA/IGEgOiBhMVsxXVxyXG4gICAgaWYgKHNIYXNQZngoXCJeXCIpKGEyLnRyaW1MZWZ0KCkpKSByZXR1cm4gXCJcIlxyXG4gICAgcmV0dXJuIGEyXHJcbn1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHNCcmtBdCA9IChhdDogbiwgbGVuOiBuKSA9PiAoYTogcykgPT4geyByZXR1cm4geyBzMTogc0xlZnQoYXQpKGEpLnRyaW0oKSwgczI6IHNNaWQoYXQgKyBsZW4pKGEpLnRyaW0oKSB9IH1cclxuZXhwb3J0IGNvbnN0IHNCcmsxID0gKHNlcDogcykgPT4gKGE6IHMpID0+IHsgY29uc3QgYXQgPSBzU2JzUG9zKHNlcCkoYSk7IHJldHVybiBhdCA9PT0gLTEgPyB7IHMxOiBzVHJpbShhKSwgczI6ICcnIH0gOiBzQnJrQXQoYXQsIHNMZW4oc2VwKSkoYSkgfVxyXG5leHBvcnQgY29uc3Qgc0JyazIgPSAoc2VwOiBzKSA9PiAoYTogcykgPT4geyBjb25zdCBhdCA9IHNTYnNQb3Moc2VwKShhKTsgcmV0dXJuIGF0ID09PSAtMSA/IHsgczE6ICcnLCBzMjogc1RyaW0oYSkgfSA6IHNCcmtBdChhdCwgc0xlbihzZXApKShhKSB9XHJcbmV4cG9ydCBjb25zdCBzQnJrID0gKHNlcDogcykgPT4gKGE6IHMpID0+IHsgY29uc3QgYXQgPSBzU2JzUG9zKHNlcCkoYSk7IHJldHVybiBzQnJrQXQoYXQsIHNMZW4oc2VwKSkoYSkgfVxyXG5leHBvcnQgY29uc3QgcXVvdGVTdHJCcmsgPSAoYTogcykgPT4ge1xyXG4gICAgY29uc3QgbCA9IGEubGVuZ3RoXHJcbiAgICBpZiAobCA9PT0gMSkgcmV0dXJuIHsgcTE6IGEsIHEyOiBhIH1cclxuICAgIGlmIChsID09PSAyKSByZXR1cm4geyBxMTogYS5zdWJzdHIoMCwgMSksIHEyOiBhLnN1YnN0cigxKSB9XHJcbiAgICBsZXQgcCA9IHNTYnNQb3MoXCIqXCIpKGEpXHJcbiAgICBpZiAocCA9PT0gLTEpIHJldHVybiB7IHExOiBcIlwiLCBxMjogXCJcIiB9XHJcbiAgICBsZXQgeyBzMTogcTEsIHMyOiBxMiB9ID0gc0Jya0F0KHAsIDEpKGEpXHJcbiAgICByZXR1cm4geyBxMSwgcTIgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBzUXVvdGUgPSAocTogcykgPT4gKGE6IHMpID0+IHtcclxuICAgIGxldCBxcSA9IHF1b3RlU3RyQnJrKHEpO1xyXG4gICAgaWYgKHFxID09PSBudWxsKSByZXR1cm4gYTsgZWxzZSB7IGxldCB7IHExLCBxMiB9ID0gcXE7IHJldHVybiBxMSArIGEgKyBxMiB9O1xyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHNUYWtCZWYgPSAoc2VwOiBzKSA9PiAoYTogcykgPT4gc1JldkJyazIoc2VwKShhKS5zMVxyXG5leHBvcnQgY29uc3Qgc1Rha0FmdCA9IChzZXA6IHMpID0+IChhOiBzKSA9PiBzUmV2QnJrMShzZXApKGEpLnMyXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHNSZXZCcmsxID0gKHNlcDogcykgPT4gKGE6IHMpID0+IHsgY29uc3QgYXQgPSBzU2JzUG9zKHNlcCkoYSk7IHJldHVybiBhdCA9PT0gLTEgPyB7IHMxOiBhLnRyaW0oKSwgczI6ICcnIH0gOiBzQnJrQXQoYXQsIHNlcC5sZW5ndGgpKGEpIH1cclxuZXhwb3J0IGNvbnN0IHNSZXZCcmsyID0gKHNlcDogcykgPT4gKGE6IHMpID0+IHsgY29uc3QgYXQgPSBzU2JzUG9zKHNlcCkoYSk7IHJldHVybiBhdCA9PT0gLTEgPyB7IHMxOiAnJywgczI6IGEudHJpbSgpIH0gOiBzQnJrQXQoYXQsIHNlcC5sZW5ndGgpKGEpIH1cclxuZXhwb3J0IGNvbnN0IHNSZXZCcmsgPSAoc2VwOiBzKSA9PiAoYTogcykgPT4geyBjb25zdCBhdCA9IHNTYnNSZXZQb3Moc2VwKShhKTsgcmV0dXJuIHNCcmtBdChhdCwgc2VwLmxlbmd0aCkoYSkgfVxyXG5leHBvcnQgY29uc3Qgc1JldlRha0JlZiA9IChzZXA6IHMpID0+IChhOiBzKSA9PiBzUmV2QnJrMihzZXApKGEpLnMxXHJcbmV4cG9ydCBjb25zdCBzUmV2VGFrQWZ0ID0gKHNlcDogcykgPT4gKGE6IHMpID0+IHNSZXZCcmsxKHNlcCkoYSkuczJcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3Qgc1JtdkZzdENociA9IHNNaWQoMSlcclxuZXhwb3J0IGNvbnN0IHNSbXZMYXNDaHIgPSAoYTogcykgPT4gc0xlZnQoYS5sZW5ndGggLSAxKShhKVxyXG5leHBvcnQgY29uc3Qgc1Jtdkxhc05DaHIgPSAobjogbikgPT4gKGE6IHMpID0+IHNMZWZ0KGEubGVuZ3RoIC0gbikoYSlcclxuZXhwb3J0IGNvbnN0IHNSbXZTdWJTdHIgPSAoc2JzOiBzKSA9PiAoYTogcykgPT4geyBjb25zdCByZSA9IG5ldyBSZWdFeHAoc2JzLCAnZycpOyByZXR1cm4gYS5yZXBsYWNlKHJlLCAnJykgfVxyXG5leHBvcnQgY29uc3Qgc1JtdkNvbG9uID0gc1JtdlN1YlN0cihcIjpcIilcclxuZXhwb3J0IGNvbnN0IHB0aHNlcCA9IHBhdGguc2VwXHJcbmV4cG9ydCBjb25zdCBzUHRoU2VwUG9zUmV2ID0gKHM6IHMpID0+IHtcclxuICAgIGNvbnN0IHogPSBzLmxhc3RJbmRleE9mKCdcXFxcJylcclxuICAgIGlmICh6ID49IDApXHJcbiAgICAgICAgcmV0dXJuIHpcclxuICAgIHJldHVybiBzLmxhc3RJbmRleE9mKCcvJylcclxufVxyXG5leHBvcnQgY29uc3QgcHRoUGFyID0gKGE6IHB0aCk6IHB0aCA9PiB7XHJcbiAgICBjb25zdCBzZWdBeSA9IHB0aFNlZ0F5KGEpXHJcbiAgICBzZWdBeS5wb3AoKVxyXG4gICAgc2VnQXkucG9wKClcclxuICAgIHJldHVybiBzZWdBeS5qb2luKHB0aHNlcCkgKyBwdGhzZXBcclxufVxyXG5leHBvcnQgY29uc3QgcHRoU2VnQXkgPSAoYTogcHRoKTogc2VnW10gPT4gYS5zcGxpdCgvW1xcXFxcXC9dL2cpXHJcbmV4cG9ydCBjb25zdCBwdGhCcncgPSAoYTogcHRoKSA9PiBjbWRTaGVsbChzRm10KCdleHBsb3JlciBcIj9cIicsIGEpKVxyXG5leHBvcnQgY29uc3QgZmZuUHRoID0gKGE6IGZmbikgPT4geyBjb25zdCBhdCA9IHNQdGhTZXBQb3NSZXYoYSk7IHJldHVybiBhdCA9PT0gLTEgPyAnJyA6IHNMZWZ0KGF0ICsgMSkoYSkgfVxyXG5leHBvcnQgY29uc3QgZmZuRm4gPSAoYTogZmZuKSA9PiB7IGNvbnN0IGF0ID0gc1B0aFNlcFBvc1JldihhKTsgcmV0dXJuIGF0ID09PSAtMSA/IGEgOiBzTWlkKGF0ICsgMSkoYSkgfVxyXG5leHBvcnQgY29uc3QgZmZuRXh0ID0gKGE6IGZmbikgPT4geyBjb25zdCBhdCA9IGEubGFzdEluZGV4T2YoJy4nKTsgcmV0dXJuIGF0ID09PSAtMSA/ICcnIDogc01pZChhdCkoYSkgfVxyXG5leHBvcnQgY29uc3QgZmZuQWRkRm5TZnggPSAoc2Z4OiBzKSA9PiAoYTogcykgPT4gZmZuRmZubihhKSArIHNmeCArIGZmbkV4dChhKVxyXG5leHBvcnQgY29uc3QgZmZuUm12RXh0ID0gKGE6IGZmbikgPT4geyBjb25zdCBhdCA9IGEuaW5kZXhPZignLicpOyByZXR1cm4gYXQgPT09IC0xID8gYSA6IHNMZWZ0KGF0KShhKSB9XHJcbmV4cG9ydCBjb25zdCBmZm5GZm5uID0gZmZuUm12RXh0XHJcbmV4cG9ydCBjb25zdCBmZm5Gbm4gPSAoYTogZmZuKSA9PiBmZm5GbihmZm5SbXZFeHQoYSkpXHJcbmV4cG9ydCBjb25zdCBmZm5ScGxFeHQgPSAoZXh0OiBzKSA9PiAoYTogcykgPT4gZmZuUm12RXh0KGEpICsgZXh0XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IGZ0TGluZXMgPSAoYTogZnQpID0+IChmcy5yZWFkRmlsZVN5bmMoYSkudG9TdHJpbmcoKSlcclxuZXhwb3J0IGNvbnN0IGZ0THkgPSAoYTogZnQpID0+IHNTcGxpdExpbmVzKGZ0TGluZXMoYSkpXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHRtcG5tID0gKCkgPT4gc1JtdkNvbG9uKG5ldyBEYXRlKCkudG9KU09OKCkpXHJcbmV4cG9ydCBjb25zdCB0bXBwdGggPSBvcy50bXBkaXIgKyBwdGhzZXBcclxuZXhwb3J0IGNvbnN0IHRtcGZmbiA9IChwZnggPSBcIlwiLCBleHQsIF9mZHI/OiBzLCBfZm4/OiBzKSA9PiB0bXBmZHIoX2ZkcikgKyBwZnggKyB0bXBubSgpICsgZXh0XHJcbmV4cG9ydCBjb25zdCB0bXBmZHIgPSAoZmRyPzogcykgPT4ge1xyXG4gICAgaWYgKGZkciA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiB0bXBwdGhcclxuICAgIGNvbnN0IGEgPSB0bXBwdGggKyAnRmRyLyc7IHB0aEVucyhhKVxyXG4gICAgY29uc3QgYTEgPSBhICsgZmRyICsgcHRoc2VwOyBwdGhFbnMoYTEpXHJcbiAgICBjb25zdCBhMiA9IGExICsgdG1wbm0oKSArIHB0aHNlcDsgcHRoRW5zKGEyKVxyXG4gICAgcmV0dXJuIGEyXHJcbn1cclxuZXhwb3J0IGNvbnN0IHRtcGZmbkJ5RmRyRm4gPSAoZmRyOiBzLCBmbjogcykgPT4gdG1wZmRyKGZkcikgKyBmblxyXG5leHBvcnQgY29uc3QgdG1wZnQgPSAoKSA9PiB0bXBmZm4oXCJUXCIsIFwiLnR4dFwiKVxyXG5leHBvcnQgY29uc3QgdG1wZmpzb24gPSAoX2Zkcj86IHMsIF9mbj86IHMpID0+IHRtcGZmbihcIlRcIiwgXCIuanNvblwiLCBfZmRyLCBfZm4pXHJcbmV4cG9ydCBjb25zdCBmZm5DbG9uZVRtcCA9IChhOiBmZm4pID0+IHtcclxuICAgIGNvbnN0IG8gPSB0bXBmZm4odW5kZWZpbmVkLCBmZm5FeHQoYSkpXHJcbiAgICBmcy5jb3B5RmlsZVN5bmMoYSwgbylcclxuICAgIGZzLnJlYWRcclxuICAgIHJldHVybiBvXHJcbn1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgcG0gPSA8VD4oZiwgLi4ucCkgPT4gbmV3IFByb21pc2U8VD4oXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiByZXR1cm4gYSBQcm9taXNlIG9mIHtlcixyc2x0fSBieSBjYWxsaW5nIGYoLi4ucCxjYiksIHdoZXJlIGNiIGlzIChlcixyc2x0KT0+ey4uLn1cclxuICAgICAqIGl0IGlzIHVzZWZ1bGx5IGluIGNyZWF0aW5nIGEgcHJvbWlzZSBieSBhbnkgYXN5bmMgZiguLi5wLGNiKVxyXG4gICAgICogQHBhcmFtIHsoZXIscnNsdCk9PnZvaWR9IGYgXHJcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gcCBcclxuICAgICAqIEBzZWVcclxuICAgICAqL1xyXG4gICAgKHJzLCByaikgPT4ge1xyXG4gICAgICAgIGYoLi4ucCwgKGUsIHJzbHQpID0+IHtcclxuICAgICAgICAgICAgZSA/IHJqKGUpIDogcnMocnNsdClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4pXHJcbmV4cG9ydCBjb25zdCBwbUVyUnNsdCA9IChmLCAuLi5wKSA9PiBuZXcgUHJvbWlzZTx7IGVyLCByc2x0IH0+KFxyXG4gICAgKHJzLCByaikgPT4ge1xyXG4gICAgICAgIGYoLi4ucCwgKGVyLCByc2x0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB6ID0gZXIgPyB7IGVyLCByc2x0OiBudWxsIH0gOiB7IGVyLCByc2x0IH1cclxuICAgICAgICAgICAgcnMoeilcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4pXHJcbmV4cG9ydCBjb25zdCBwbVJzbHRPcHQgPSA8VD4oZiwgLi4ucCkgPT4gbmV3IFByb21pc2U8VCB8IG51bGw+KFxyXG4gICAgKHJzLCByaikgPT4ge1xyXG4gICAgICAgIGYoLi4ucCwgKGVyLCByc2x0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB6ID0gZXIgPyBudWxsIDogcnNsdFxyXG4gICAgICAgICAgICBycyh6KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbilcclxuZXhwb3J0IGNvbnN0IGZ0TGluZXNQbSA9IChhOiBmdCkgPT4gcG0oZnMucmVhZEZpbGUsIGEpLnRoZW4ocnNsdCA9PiByc2x0LnRvU3RyaW5nKCkpXHJcbmV4cG9ydCBjb25zdCBmdEx5UG0gPSAoYTogZnQpID0+IGZ0TGluZXNQbShhKS50aGVuKGxpbmVzID0+IHNTcGxpdENyTGYobGluZXMpKVxyXG5leHBvcnQgY29uc3QgcHRoRW5zID0gKGE6IHB0aCkgPT4geyBpZiAoIWZzLmV4aXN0c1N5bmMoYSkpIGZzLm1rZGlyU3luYyhhKSB9XHJcbmV4cG9ydCBjb25zdCBpc1B0aEV4aXN0ID0gKGE6IHB0aCkgPT4gZnMuZXhpc3RzU3luYyhhKVxyXG5leHBvcnQgY29uc3QgaXNGZm5FeGlzdCA9IChhOiBmZm4pID0+IGZzLmV4aXN0c1N5bmMoYSlcclxuZXhwb3J0IGNvbnN0IGFzc2VydElzUHRoRXhpc3QgPSAoYTogcHRoKSA9PiB7IGlmICghaXNQdGhFeGlzdChhKSkgZXIoYHBhdGggZG9lcyBub3QgZXhpc3QgWyR7YX1dYCkgfVxyXG5leHBvcnQgY29uc3QgcHRoRW5zU2Z4U2VwID0gKGE6IHB0aCkgPT4gc0xhc0NocihhKSA9PT0gcHRoc2VwID8gYSA6IGEgKyBwdGhzZXBcclxuZXhwb3J0IGNvbnN0IHB0aEVuc1N1YkZkciA9IChzdWJGZHI6IHMpID0+IChhOiBwdGgpID0+IHtcclxuICAgIGFzc2VydElzUHRoRXhpc3QoYSlcclxuICAgIGxldCBiID0gc3ViRmRyLnNwbGl0KC9bXFxcXFxcL10vKVxyXG4gICAgbGV0IGMgPSBpdHJSbXZFbXAoYilcclxuICAgIGxldCBkID0gcHRoRW5zU2Z4U2VwKGEpXHJcbiAgICBsZXQgZTogYXkgPSBbXVxyXG4gICAgZm9yIChsZXQgc2VnIG9mIGMpIHtcclxuICAgICAgICBkICs9IHNlZyArICdcXFxcJztcclxuICAgICAgICBlLnB1c2goZClcclxuICAgIH1cclxuICAgIGl0ckVhY2gocHRoRW5zKShlKVxyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IGl0cldoZXJlID0gPFQ+KHA6IHByZWQ8VD4pID0+IChhOiBJdHI8VD4pOiBUW10gPT4geyBjb25zdCBvOiBUW10gPSBbXTsgZm9yIChsZXQgaSBvZiBhKSBpZiAocChpKSkgby5wdXNoKGkpOyByZXR1cm4gbyB9XHJcbmV4cG9ydCBjb25zdCBpdHJFeGNsdWRlID0gKHA6IHApID0+IChhOiBpdHIpID0+IHsgY29uc3QgbzogYXkgPSBbXTsgZm9yIChsZXQgaSBvZiBhKSBpZiAoIXAoaSkpIG8ucHVzaChpKTsgcmV0dXJuIG8gfVxyXG5leHBvcnQgY29uc3QgaXRyTWFwID0gPEEsIEI+KGY6IChhOiBBLCBpPzogbikgPT4gQikgPT4gKGE6IGl0cik6IEJbXSA9PiB7IGxldCBpID0gMDsgY29uc3QgbzogYXkgPSBbXTsgZm9yIChsZXQgaXRtIG9mIGEpIG8ucHVzaChmKGl0bSwgaSsrKSk7IHJldHVybiBvIH1cclxuZXhwb3J0IGNvbnN0IGl0ckVhY2ggPSA8VD4oZjogKGE6IFQsIGk/OiBuKSA9PiB2b2lkKSA9PiAoYTogSXRyPFQ+KSA9PiB7IGxldCBpID0gMDsgZm9yIChsZXQgaXRtIG9mIGEpIGYoaXRtLCBpKyspIH1cclxuZXhwb3J0IGNvbnN0IGl0ckZvbGQgPSBfaXRyRm9sZCA9PiBmID0+IGN1bSA9PiBhID0+IHsgZm9yIChsZXQgaSBvZiBhKSBjdW0gPSBmKGN1bSkoaSk7IHJldHVybiBjdW0gfVxyXG5leHBvcnQgY29uc3QgaXRyUmVkdWNlID0gZiA9PiAoYTogaXRyKSA9PiBpdHJGb2xkKGYpKGl0ckZzdChhKSkoYSlcclxuZXhwb3J0IGNvbnN0IHdoZXJlID0gaXRyV2hlcmVcclxuZXhwb3J0IGNvbnN0IG1hcCA9IGl0ck1hcFxyXG5leHBvcnQgY29uc3QgZWFjaCA9IGl0ckVhY2hcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IG1hcEt5ID0gKF9tYXA6IG1hcCkgPT4gaXRyQXkoX21hcC5rZXlzKCkpXHJcbmV4cG9ydCBjb25zdCBtYXBWeSA9IChfbWFwOiBtYXApID0+IGl0ckF5KF9tYXAudmFsdWVzKCkpXHJcbmV4cG9ydCBjb25zdCBtYXBLdnkgPSAoX21hcDogbWFwKSA9PiBpdHJBeShfbWFwLmVudHJpZXMoKSlcclxuZXhwb3J0IGNvbnN0IG1hcEtzZXQgPSAoX21hcDogbWFwKSA9PiBuZXcgU2V0KF9tYXAua2V5cygpKVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3Qgc2V0QXkgPSA8VD4oX3NldDogU2V0PFQ+KTogVFtdID0+IHsgY29uc3QgbzogVFtdID0gW107IGZvciAobGV0IGkgb2YgX3NldCkgby5wdXNoKGkpOyByZXR1cm4gbyB9XHJcbmV4cG9ydCBjb25zdCBzZXRXaGVyZSA9IDxUPihfcDogcHJlZDxUPikgPT4gKF9zZXQ6IFNldDxUPik6IFNldDxUPiA9PiB7XHJcbiAgICBjb25zdCB6ID0gbmV3IFNldDxUPigpXHJcbiAgICBmb3IgKGxldCBpIG9mIF9zZXQpXHJcbiAgICAgICAgaWYgKF9wKGkpKVxyXG4gICAgICAgICAgICB6LmFkZChpKVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5leHBvcnQgY29uc3Qgc2V0U3J0ID0gPFQ+KF9zZXQ6IFNldDxUPik6IFNldDxUPiA9PiBuZXcgU2V0PFQ+KHNldEF5KF9zZXQpLnNvcnQoKSlcclxuZXhwb3J0IGNvbnN0IHNzZXRTcnQgPSBzZXRTcnQgYXMgKF9zc2V0OiBzc2V0KSA9PiBzc2V0XHJcbmV4cG9ydCBjb25zdCBzZXRBZGQgPSA8VD4oX3g6IFNldDxUPiB8IG51bGwgfCB1bmRlZmluZWQpID0+IChfc2V0OiBTZXQ8VD4pOiBTZXQ8VD4gPT4ge1xyXG4gICAgaWYgKF94ID09PSBudWxsIHx8IF94ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIF9zZXRcclxuICAgIGZvciAobGV0IGkgb2YgX3gpXHJcbiAgICAgICAgX3NldC5hZGQoaSk7XHJcbiAgICByZXR1cm4gX3NldFxyXG59XHJcbmV4cG9ydCBjb25zdCBzZXRNaW51cyA9IDxUPihfeDogU2V0PFQ+IHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4gKF9zZXQ6IFNldDxUPik6IFNldDxUPiA9PiB7XHJcbiAgICBpZiAoX3ggPT09IG51bGwgfHwgX3ggPT09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gX3NldFxyXG4gICAgZm9yIChsZXQgaSBvZiBfeCkgX3NldC5kZWxldGUoaSk7XHJcbiAgICByZXR1cm4gX3NldFxyXG59XHJcbmNvbnN0IF9zZXRBZnQgPSAoaW5jbCwgYSwgc2V0KSA9PiB7XHJcbiAgICBjb25zdCB6ID0gbmV3IFNldFxyXG4gICAgbGV0IGZvdW5kID0gZmFsc2VcclxuICAgIGZvciAobGV0IGkgb2Ygc2V0KVxyXG4gICAgICAgIGlmIChmb3VuZClcclxuICAgICAgICAgICAgei5hZGQoaSlcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGEgPT09IGkpIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgaWYgKGluY2wpXHJcbiAgICAgICAgICAgICAgICAgICAgei5hZGQoYSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB6XHJcbn1cclxuZXhwb3J0IGNvbnN0IGxpbkZzdFRlcm0gPSAoYTogbGluKSA9PiBzU3BsaXRTcGMoYSlbMF1cclxuZXhwb3J0IGNvbnN0IGxpbkxhc1Rlcm0gPSAoYTogbGluKSA9PiBheUxhcyhzU3BsaXRTcGMoYSkpXHJcbmV4cG9ydCBjb25zdCBsaW5UMiA9IChhOiBsaW4pID0+IHtcclxuICAgIGNvbnN0IHsgdGVybTogdDEsIHJlbWFpbkxpbjogYTEgfSA9IGxpblNoaWZ0KGEpXHJcbiAgICBjb25zdCB7IHRlcm06IHQyLCByZW1haW5MaW4gfSA9IGxpblNoaWZ0KGExKVxyXG4gICAgcmV0dXJuIHQyXHJcbn1cclxuZXhwb3J0IGNvbnN0IGxpblNoaWZ0ID0gKGE6IGxpbikgPT4ge1xyXG4gICAgY29uc3QgYTEgPSBhLnRyaW0oKVxyXG4gICAgY29uc3QgYTIgPSBhMS5tYXRjaCgvKFxcUyopXFxzKiguKikvKVxyXG4gICAgY29uc3QgbyA9XHJcbiAgICAgICAgYTIgPT09IG51bGxcclxuICAgICAgICAgICAgPyB7IHRlcm06IFwiXCIsIHJlbWFpbkxpbjogXCJcIiB9XHJcbiAgICAgICAgICAgIDogeyB0ZXJtOiBhMlsxXSwgcmVtYWluTGluOiBhMlsyXSB9XHJcbiAgICByZXR1cm4gb1xyXG59XHJcbmV4cG9ydCBjb25zdCBzUm12RnN0VGVybSA9IChhOiBzKSA9PiBsaW5TaGlmdChhKS5yZW1haW5MaW5cclxuZXhwb3J0IGNvbnN0IGxpblJtdkZzdFRlcm0gPSAoYTogbGluKSA9PiBsaW5TaGlmdChhKS5yZW1haW5MaW5cclxuZXhwb3J0IGNvbnN0IHNldEFmdCA9IGFmdCA9PiBhID0+IF9zZXRBZnQoZmFsc2UsIGFmdCwgYSlcclxuZXhwb3J0IGNvbnN0IHNldEFmdEluY2wgPSBhID0+IHNldCA9PiBfc2V0QWZ0KHRydWUsIGEsIHNldClcclxuZXhwb3J0IGNvbnN0IHNldENsb25lID0gc2V0ID0+IGl0clNldChzZXQpXHJcbmV4cG9ydCBjb25zdCBpdHJTZXQgPSBpdHIgPT4geyBjb25zdCBvID0gbmV3IFNldDsgZm9yIChsZXQgaSBvZiBpdHIpIG8uYWRkKGkpOyByZXR1cm4gbyB9XHJcbmV4cG9ydCBjb25zdCBpdHJUZm1TZXQgPSAoZjogZikgPT4gKGE6IGl0cikgPT4ge1xyXG4gICAgY29uc3QgbyA9IG5ldyBTZXQ7IGZvciAobGV0IGkgb2YgYSkgby5hZGQoZihpKSk7IHJldHVybiBvXHJcbn1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IGVtcFNkaWMgPSAoKSA9PiBuZXcgTWFwPHMsIHM+KClcclxuZXhwb3J0IGNvbnN0IGx5U2RpYyA9IChhOiBseSkgPT4ge1xyXG4gICAgY29uc3QgbyA9IGVtcFNkaWMoKVxyXG4gICAgY29uc3QgbGluS3MgPSBhID0+IHtcclxuICAgICAgICBsZXQgeyB0ZXJtOiBrLCByZW1haW5MaW46IHMgfSA9IGxpblNoaWZ0KGEpXHJcbiAgICAgICAgcmV0dXJuIHsgaywgcyB9XHJcbiAgICB9XHJcbiAgICBjb25zdCB4ID0gbGluID0+IHsgbGV0IHsgaywgcyB9ID0gbGluS3MobGluKTsgby5zZXQoaywgcykgfVxyXG4gICAgZWFjaCh4KShhKVxyXG4gICAgcmV0dXJuIG9cclxufVxyXG5leHBvcnQgY29uc3QgaXRyUm12RW1wID0gPFQ+KGE6IEl0cjxUIHwgbnVsbCB8IHVuZGVmaW5lZD4pOiBUW10gPT4gaXRyV2hlcmUoaXNOb25FbXApKGEpXHJcbmV4cG9ydCBjb25zdCBybXZFbXAgPSBpdHJSbXZFbXBcclxuZXhwb3J0IGNvbnN0IGx5Um12RW1wTGluID0gaXRyUm12RW1wIGFzIChfbHk6IGx5KSA9PiBseVxyXG5leHBvcnQgY29uc3QgbHlQZnhDbnQgPSAocGZ4OiBzKSA9PiAoYTogbHkpID0+IHtcclxuICAgIGxldCB6ID0gMFxyXG4gICAgZWFjaFxyXG4gICAgICAgICgobGluOiBzKSA9PiB7IGlmIChzSGFzUGZ4KHBmeCkobGluKSkgeisrIH0pXHJcbiAgICAgICAgKGEpXHJcbiAgICByZXR1cm4gelxyXG59XHJcbmV4cG9ydCBjb25zdCBseUhhc01halBmeCA9IChwZng6IHMpID0+IChhOiBseSkgPT4gMiAqIGx5UGZ4Q250KHBmeCkoYSkgPiBhLmxlbmd0aFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgcmVFeHBDb25zdE5tID0gL15leHBvcnQgY29uc3QgKFskX2EtekEtWl1bJF9hLXpBLVowLTldKikgL1xyXG5leHBvcnQgY29uc3QgcmVDb25zdE5tID0gL15jb25zdCAoWyRfYS16QS1aXVskX2EtekEtWjAtOV0qKSAvXHJcbmNvbnN0IHJlRXhwRG9sbGFyQ29uc3RObSA9IC9eZXhwb3J0IGNvbnN0IChbXFwkXFx3XVtcXCRfMC05XFx3X10qKSAvXHJcbmV4cG9ydCBjb25zdCBzcmNEcnkgPSAocmU6IHJlKSA9PiBjb21wb3NlKHNyY01hdGNoQXkocmUpLCBpdHJNYXAobWF0Y2hEcikpIGFzIChhOiBzcmMpID0+IGRyeVxyXG5leHBvcnQgY29uc3Qgc3JjQ29sID0gKHJlOiByZSkgPT4gKGE6IHNyYyk6IHNjb2wgPT4ge1xyXG4gICAgY29uc3QgYXkgPSBzcmNNYXRjaEF5KHJlKShhKVxyXG4gICAgY29uc3QgYyA9IG1hdGNoQXlGc3RDb2woYXkpXHJcbiAgICBjb25zdCBjMSA9IGl0clJtdkVtcChjKVxyXG4gICAgcmV0dXJuIGMxXHJcbn1cclxuZXhwb3J0IGNvbnN0IGF5U3J0ID0gKGE6IGF5KSA9PiBhLnNvcnQoKVxyXG5leHBvcnQgY29uc3QgbWF0Y2hEciA9IChhOiBtYXRjaCkgPT4gWy4uLmFdLnNwbGljZSgxKVxyXG5leHBvcnQgY29uc3QgbWF0Y2hBeVNkcnkgPSBpdHJNYXAobWF0Y2hEcikgYXMgKGE6IFJlZ0V4cE1hdGNoQXJyYXlbXSkgPT4gc2RyeVxyXG5leHBvcnQgY29uc3QgbWF0Y2hGc3RJdG0gPSAoYTogUmVnRXhwTWF0Y2hBcnJheSkgPT4gYSA9PT0gbnVsbCA/IG51bGwgOiBhWzFdIGFzIHMgfCBudWxsXHJcbmV4cG9ydCBjb25zdCBtYXRjaEF5RnN0Q29sID0gaXRyTWFwKG1hdGNoRnN0SXRtKSBhcyAoYTogUmVnRXhwTWF0Y2hBcnJheVtdKSA9PiBzW11cclxuZXhwb3J0IGNvbnN0IHNyY01hdGNoQXkgPSBjb21wb3NlKHNNYXRjaCwgaXRyTWFwKSBhcyAoXzogcmUpID0+IChfOiBzcmMpID0+IFJlZ0V4cE1hdGNoQXJyYXlbXVxyXG5leHBvcnQgY29uc3Qgc3JjRXhwQ29uc3ROeSA9IHNyY0NvbChyZUV4cENvbnN0Tm0pXHJcbmV4cG9ydCBjb25zdCBzcmNDb25zdE55ID0gc3JjQ29sKHJlQ29uc3RObSlcclxuZXhwb3J0IGNvbnN0IHNyY0V4cENvbnN0RG9sbGFyTnkgPSBzcmNDb2wocmVFeHBEb2xsYXJDb25zdE5tKVxyXG5leHBvcnQgY29uc3QgZnRzRXhwQ29uc3ROeSA9IGNvbXBvc2UoZnRMeSwgc3JjRXhwQ29uc3ROeSkgYXMgKGE6IGZ0cykgPT4gbnlcclxuZXhwb3J0IGNvbnN0IGZ0c0NvbnN0TnkgPSBjb21wb3NlKGZ0THksIHNyY0NvbnN0TnkpIGFzIChhOiBmdHMpID0+IG55XHJcbmV4cG9ydCBjb25zdCBmdHNFeHBDb25zdERvbGxhck55ID0gY29tcG9zZShmdEx5LCBzcmNFeHBDb25zdERvbGxhck55KSBhcyAoYTogZnRzKSA9PiBueVxyXG5leHBvcnQgY29uc3QgZmZuRnRzID0gZmZuUnBsRXh0KCcudHMnKSBhcyAoXzogcykgPT4gc1xyXG5leHBvcnQgY29uc3QgaXNGVHN0SnMgPSAoX2ZUc3RKczogZlRzdEpzKSA9PiB7XHJcbiAgICBjb25zdCBmbiA9IGZmbkZuKF9mVHN0SnMpXHJcbiAgICBpZiAoIXNIYXNQZngoJ3RzdF9fJykoZm4pKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKCFzSGFzU2Z4KCcuanMnKShmbikpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBjb25zdCBzZWdBeSA9IGZmblB0aChfZlRzdEpzKS5zcGxpdCgvW1xcXFxcXC9dLylcclxuICAgIHNlZ0F5LnBvcCgpXHJcbiAgICBjb25zdCB0ZXN0ID0gc2VnQXkucG9wKClcclxuICAgIGlmICh0ZXN0ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBpZiAodGVzdC50b1VwcGVyQ2FzZSgpICE9PSAnVEVTVCcpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59XHJcbmV4cG9ydCBjb25zdCBhc3NlcnRJc1RydWUgPSAodiwgLi4ubXNnKSA9PiB7XHJcbiAgICBpZiAodikgcmV0dXJuXHJcbiAgICBpZiAobXNnLmxlbmd0aCA9PT0gMClcclxuICAgICAgICBlcignZ2l2ZW4gdmF1bGUgc2hvdWxkIGJlIHRydWUnKVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbSA9IG1zZy5zaGlmdCgpXHJcbiAgICAgICAgZXIobSwgbXNnKVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBhc3NlcnRJc0ZUc3RKcyA9IChfZlRzdEpzOiBmVHN0SnMpID0+IGFzc2VydElzVHJ1ZShpc0ZUc3RKcyhfZlRzdEpzKSwgXCJnaXZlbiBfZlRzdEpzIGlzIG5vdCBmVHN0SnNcIiwgeyBfZlRzdEpzIH0pXHJcbmV4cG9ydCBjb25zdCBmVHN0SnNfZnRzID0gKF9mVHN0SnM6IGZUc3RKcyk6IGZ0cyA9PiB7XHJcbiAgICBhc3NlcnRJc0ZUc3RKcyhfZlRzdEpzKVxyXG4gICAgY29uc3QgZm4gPSBmZm5GbihfZlRzdEpzKVxyXG4gICAgY29uc3QgcHRoID0gZmZuUHRoKF9mVHN0SnMpXHJcbiAgICBjb25zdCBhMSA9IHNSbXZQZngoJ3RzdF9fJykoZm4pXHJcbiAgICBjb25zdCBhMiA9IGFhXHJcbiAgICBjb25zdCB6Rm5uID0gZmZuRm5uKGZuKVxyXG4gICAgY29uc3QgelB0aCA9IHB0aFBhcihwdGgpXHJcbiAgICByZXR1cm4gelB0aCArIHpGbm4gKyAnLmpzJ1xyXG59XHJcbmV4cG9ydCBjb25zdCBmanNFeHBDb25zdE55ID0gY29tcG9zZShmZm5GdHMsIGZ0c0V4cENvbnN0TnkpXHJcbmV4cG9ydCBjb25zdCBmanNDb25zdE55ID0gY29tcG9zZShmZm5GdHMsIGZ0c0NvbnN0TnkpXHJcbmV4cG9ydCBjb25zdCBzdG9wID0gKCkgPT4geyBkZWJ1Z2dlciB9XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBpc1N0ciA9IHYgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXHJcbmV4cG9ydCBjb25zdCBpc051bSA9IHYgPT4gdHlwZW9mIHYgPT09ICdudW1iZXInXHJcbmV4cG9ydCBjb25zdCBpc0Jvb2wgPSB2ID0+IHR5cGVvZiB2ID09PSAnYm9vbGVhbidcclxuZXhwb3J0IGNvbnN0IGlzT2JqID0gdiA9PiB0eXBlb2YgdiA9PT0gJ29iamVjdCdcclxuZXhwb3J0IGNvbnN0IGlzU3kgPSB2ID0+IHtcclxuICAgIGlmICghaXNBeSh2KSkgcmV0dXJuIGZhbHNlXHJcbiAgICBpZiAoaXNFbXAodikpIHJldHVybiB0cnVlXHJcbiAgICByZXR1cm4gaXNTdHIodlswXSlcclxufVxyXG5leHBvcnQgY29uc3QgaXNBeSA9IHUuaXNBcnJheVxyXG5leHBvcnQgY29uc3QgaXNEdGUgPSB1LmlzRGF0ZVxyXG5leHBvcnQgY29uc3QgaXNGdW4gPSB1LmlzRnVuY3Rpb25cclxuZXhwb3J0IGNvbnN0IGlzUHJpbSA9IHUuaXNQcmltaXRpdmVcclxuZXhwb3J0IGNvbnN0IGlzUmUgPSB2ID0+IHZJc0luc3RhbmNlT2YoUmVnRXhwKVxyXG5leHBvcnQgY29uc3QgaXNOb25OdWxsID0gdiA9PiAhaXNOdWxsKHYpXHJcbmV4cG9ydCBjb25zdCBpc051bGwgPSB1LmlzTnVsbFxyXG5leHBvcnQgY29uc3QgaXNVbmRlZmluZWQgPSB1LmlzVW5kZWZpbmVkXHJcbmV4cG9ydCBjb25zdCBpc051bGxPclVuZGVmaW5lZCA9IHUuaXNOdWxsT3JVbmRlZmluZWRcclxuZXhwb3J0IGNvbnN0IGlzVHJ1ZSA9IHYgPT4gdiA/IHRydWUgOiBmYWxzZVxyXG5leHBvcnQgY29uc3QgaXNGYWxzZSA9IHYgPT4gdiA/IGZhbHNlIDogdHJ1ZVxyXG5leHBvcnQgY29uc3QgaXNFbXAgPSB2ID0+IHYgPyBmYWxzZSA6IHRydWVcclxuZXhwb3J0IGNvbnN0IGlzTm9uRW1wID0gdiA9PiB2ID8gdHJ1ZSA6IGZhbHNlXHJcbmV4cG9ydCBjb25zdCBpc09kZCA9IG4gPT4gbiAlIDIgPT09IDFcclxuZXhwb3J0IGNvbnN0IGlzRXZlbiA9IG4gPT4gbiAlIDIgPT09IDBcclxuZXhwb3J0IGNvbnN0IGlzU3BjID0gKHM6IHMpID0+IHMgPT09IG51bGwgfHwgcyA9PT0gdW5kZWZpbmVkIHx8IHNbMF0gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogL1xccy8udGVzdChzWzBdKSBhcyBiXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3Qgc1NlYXJjaCA9IChyZTogUmVnRXhwKSA9PiAoYTogcykgPT4gYS5zZWFyY2gocmUpXHJcbmV4cG9ydCBjb25zdCBzQnJrUDEyMyA9IChxdW90ZVN0cjogcykgPT4gKGE6IHMpID0+IHtcclxuICAgIGNvbnN0IHsgcTEsIHEyIH0gPSBxdW90ZVN0ckJyayhxdW90ZVN0cilcclxuICAgIGlmIChxMSA9PT0gXCJcIiB8fCBxMiA9PT0gXCJcIikgcmV0dXJuIG51bGxcclxuICAgIGNvbnN0IGwgPSBhLmxlbmd0aFxyXG4gICAgY29uc3QgcTFwb3MgPSBhLmluZGV4T2YocTEpO1xyXG4gICAgY29uc3QgcTJwb3MgPSBhLmluZGV4T2YocTIsIHExcG9zICsgMSk7XHJcbiAgICBjb25zdCBsZW4xID0gcTFwb3NcclxuICAgIGNvbnN0IHBvczIgPSBxMXBvcyArIHExLmxlbmd0aFxyXG4gICAgY29uc3QgcG9zMyA9IHEycG9zICsgcTIubGVuZ3RoXHJcbiAgICBjb25zdCBsZW4yID0gcG9zMyAtIHBvczIgLSAxXHJcbiAgICBjb25zdCBwMSA9IGEuc3Vic3RyKDAsIGxlbjEpXHJcbiAgICBjb25zdCBwMiA9IGEuc3Vic3RyKHBvczIsIGxlbjIpXHJcbiAgICBjb25zdCBwMyA9IGEuc3Vic3RyKHBvczMpXHJcbiAgICBsZXQgejogW3MsIHMsIHNdID0gW3AxLCBwMiwgcDNdXHJcbiAgICByZXR1cm4gelxyXG59XHJcbi8vbGV0IGEgPSBzQnJrUDEyMyhcIihiYWNrdXAtKilcIikoXCJzbGtkZmpsc2RqZihiYWNrdXAtMTIzKS5leGVcIik7ZGVidWdnZXJcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBpdHJJc0FsbFRydWUgPSAoYTogaXRyKSA9PiB7IGZvciAobGV0IGkgb2YgYSkgaWYgKGlzRmFsc2UoaSkpIHJldHVybiBmYWxzZTsgcmV0dXJuIHRydWUgfVxyXG5leHBvcnQgY29uc3QgaXRySXNBbGxGYWxzZSA9IChhOiBpdHIpID0+IHsgZm9yIChsZXQgaSBvZiBhKSBpZiAoaXNUcnVlKGkpKSByZXR1cm4gZmFsc2U7IHJldHVybiB0cnVlIH1cclxuZXhwb3J0IGNvbnN0IGl0cklzU29tZVRydWUgPSAoYTogaXRyKSA9PiB7IGZvciAobGV0IGkgb2YgYSkgaWYgKGlzVHJ1ZShpKSkgcmV0dXJuIHRydWU7IHJldHVybiBmYWxzZSB9XHJcbmV4cG9ydCBjb25zdCBpdHJJc1NvbWVGYWxzZSA9IChhOiBpdHIpID0+IHsgZm9yIChsZXQgaSBvZiBhKSBpZiAoaXNGYWxzZShpKSkgcmV0dXJuIHRydWU7IHJldHVybiBmYWxzZSB9XHJcbmV4cG9ydCBjb25zdCBpdHJQcmVkSXNBbGxUcnVlID0gKHA6IHApID0+IChhOiBpdHIpID0+IHsgZm9yIChsZXQgaSBvZiBhKSBpZiAoIXAoaSkpIHJldHVybiBmYWxzZTsgcmV0dXJuIHRydWUgfVxyXG5leHBvcnQgY29uc3QgaXRyUHJlZElzQWxsRmFsc2UgPSAocDogcCkgPT4gKGE6IGl0cikgPT4geyBmb3IgKGxldCBpIG9mIGEpIGlmIChwKGkpKSByZXR1cm4gZmFsc2U7IHJldHVybiB0cnVlIH1cclxuZXhwb3J0IGNvbnN0IGl0clByZWRJc1NvbWVGYWxzZSA9IChwOiBwKSA9PiAoYTogaXRyKSA9PiB7IGZvciAobGV0IGkgb2YgYSkgaWYgKCFwKGkpKSByZXR1cm4gdHJ1ZTsgcmV0dXJuIGZhbHNlIH1cclxuZXhwb3J0IGNvbnN0IGl0clByZWRJc1NvbWVUcnVlID0gKHA6IHApID0+IChhOiBpdHIpID0+IHsgZm9yIChsZXQgaSBvZiBhKSBpZiAocChpKSkgcmV0dXJuIHRydWU7IHJldHVybiBmYWxzZSB9XHJcbmV4cG9ydCBjb25zdCBpdHJCcmtGb3JUcnVlRmFsc2UgPSA8VD4ocDogKGE6IFQpID0+IGIpID0+IChhOiBJdHI8VD4pID0+IHtcclxuICAgIGNvbnN0IHQ6IFRbXSA9IFtdLCBmOiBUW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgb2YgYSlcclxuICAgICAgICBwKGkpID8gdC5wdXNoKGkpIDogZi5wdXNoKGkpO1xyXG4gICAgcmV0dXJuIHsgdCwgZiB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IGl0ckF5ID0gPFQ+KGE6IEl0cjxUPikgPT4geyBjb25zdCBvOiBUW10gPSBbXTsgZm9yIChsZXQgaSBvZiBhKSBvLnB1c2goaSk7IHJldHVybiBvIH1cclxuZXhwb3J0IGNvbnN0IGl0ckZzdCA9IDxUPihhOiBJdHI8VD4pID0+IHsgZm9yIChsZXQgaSBvZiBhKSByZXR1cm4gaTsgcmV0dXJuIG51bGwgfVxyXG5leHBvcnQgY29uc3QgaXRyTGFzID0gPFQ+KGE6IEl0cjxUPikgPT4geyBsZXQgaTsgZm9yIChpIG9mIGEpIHsgfTsgcmV0dXJuIChpID09PSB1bmRlZmluZWQgPyBudWxsIDogaSkgfVxyXG5leHBvcnQgY29uc3QgaXRyQWRkUGZ4U2Z4ID0gKHBmeDogcywgc2Z4OiBzKSA9PiAoYTogaXRyKSA9PiBpdHJNYXAoc0FkZFBmeFNmeChwZngsIHNmeCkpKGEpIGFzIHNbXVxyXG5leHBvcnQgY29uc3QgaXRyQWRkUGZ4ID0gKHBmeDogcykgPT4gKGE6IGl0cikgPT4gaXRyTWFwKHNBZGRQZngocGZ4KSkoYSkgYXMgc1tdXHJcbmV4cG9ydCBjb25zdCBpdHJBZGRTZnggPSAoc2Z4OiBzKSA9PiAoYTogaXRyKSA9PiBpdHJNYXAoc0FkZFNmeChzZngpKShhKSBhcyBzW11cclxuZXhwb3J0IGNvbnN0IGl0cldkdCA9IChhOiBpdHIpID0+IHBpcGUoaXRyTWFwKHZMZW4pKGEpKShpdHJNYXgpIGFzIG5cclxuZXhwb3J0IGNvbnN0IHNpdHJXZHQgPSAoYTogc0l0cikgPT4gcGlwZShpdHJNYXAoc0xlbikoYSkpKGl0ck1heCkgYXMgblxyXG5leHBvcnQgY29uc3QgaXRyQWxpZ25MID0gKGE6IGl0cikgPT4gaXRyTWFwKHNBbGlnbkwoaXRyV2R0KGEpKSkoYSkgYXMgc1tdXHJcbmV4cG9ydCBjb25zdCBpdHJDbG9uZSA9IChhOiBpdHIpID0+IGl0ck1hcChpID0+IGkpKGEpIGFzIGF5XHJcbmV4cG9ydCBjb25zdCBpdHJGaW5kID0gPFQ+KHA6IChhOiBUKSA9PiBiKSA9PiAoYTogSXRyPFQ+KSA9PiB7IGZvciAobGV0IGkgb2YgYSkgaWYgKHAoaSkpIHJldHVybiBpOyByZXR1cm4gbnVsbCB9XHJcbmV4cG9ydCBjb25zdCBpdHJIYXNEdXAgPSAoYTogaXRyKSA9PiB7IGNvbnN0IHNldCA9IG5ldyBTZXQoKTsgZm9yIChsZXQgaSBvZiBhKSBpZiAoc2V0LmhhcyhpKSkgeyByZXR1cm4gdHJ1ZSB9IGVsc2Ugc2V0LmFkZChpKTsgcmV0dXJuIGZhbHNlIH1cclxuZXhwb3J0IGNvbnN0IGl0ckR1cFNldCA9IDxUPihhOiBJdHI8VD4pID0+IHtcclxuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8VD4oKVxyXG4gICAgY29uc3QgeiA9IG5ldyBTZXQ8VD4oKVxyXG4gICAgZm9yIChsZXQgaSBvZiBhKVxyXG4gICAgICAgIGlmIChzZXQuaGFzKGkpKVxyXG4gICAgICAgICAgICB6LmFkZChpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2V0LmFkZChpKVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5leHBvcnQgY29uc3QgaXRyTWF4ID0gPFQ+KGE6IEl0cjxUPikgPT4geyBsZXQgbyA9IGl0ckZzdChhKTsgaWYgKG8gPT09IG51bGwpIHJldHVybiBudWxsOyBmb3IgKGxldCBpIG9mIGEpIGlmIChpID4gbykgbyA9IGk7IHJldHVybiBvIH1cclxuZXhwb3J0IGNvbnN0IGl0ck1pbiA9IDxUPihhOiBJdHI8VD4pID0+IHsgbGV0IG8gPSBpdHJGc3QoYSk7IGlmIChvID09PSBudWxsKSByZXR1cm4gbnVsbDsgZm9yIChsZXQgaSBvZiBhKSBpZiAoaSA8IG8pIG8gPSBpOyByZXR1cm4gbyB9XHJcbmV4cG9ydCBjb25zdCBtYXggPSAoLi4udikgPT4gaXRyTWF4KHYpXHJcbmV4cG9ydCBjb25zdCBtaW4gPSAoLi4udikgPT4gaXRyTWluKHYpXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IG9TcnQgPSAobzogbyk6IG8gPT4ge1xyXG4gICAgaWYgKG8gPT09IG51bGwgfHwgbyA9PT0gdW5kZWZpbmVkKSByZXR1cm4ge31cclxuICAgIGNvbnN0IG9vOiBhbnkgPSB7fVxyXG4gICAgZm9yIChsZXQgayBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5zb3J0KCkpIHtcclxuICAgICAgICBvb1trXSA9IG9ba11cclxuICAgIH1cclxuICAgIHJldHVybiBvb1xyXG59XHJcbmV4cG9ydCBjb25zdCBvQnJpbmdVcERvbGxhclBycCA9IG8gPT4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBCcmluZyB1cCBhbGwge299IGNoaWxkIG9iamVjdCBtZW1iZXIgdXAgb25lIGxldmVsLiAgVGhyb3cgZXhjZXB0aW9uIGlmIHRoZXJlIGlzIG5hbWUgY29uZmxpY3RcclxuICAgICAqIGFzc3VtZSBhbGwgbWVtYmVycyBvZiB7b30gYXJlIG9iamVjdHNcclxuICAgICAqIEBwYXJhbSB7b2JqfSBvIFxyXG4gICAgICogQGV4YW1wbGUgXHJcbiAgICAgKiBjb25zdCAkYSA9IHthMTonYTEnLGEyOidzMid9XHJcbiAgICAgKiBjb25zdCAkYiA9IHtiMTonYjEnLGIyOidiMid9XHJcbiAgICAgKiBjb25zdCBvID0geyRhLCRifVxyXG4gICAgICogYnJpbmdVcChvKVxyXG4gICAgICogZXEobyx7JGEsJGIsYTEsYTIsYjEsYjJ9KVxyXG4gICAgICogLy8tLS0tLS0tLS0tLVxyXG4gICAgICogJGEueCA9IDFcclxuICAgICAqICRiLnggPSAyXHJcbiAgICAgKiB0aHcoYnJpbmdVcChvKSlcclxuICAgICAqL1xyXG4gICAgZm9yIChsZXQgY2hkTm0gaW4gbykge1xyXG4gICAgICAgIGNvbnN0IGNoZCA9IG9bY2hkTm1dXHJcbiAgICAgICAgZm9yIChsZXQgY2hkTWJyTm0gaW4gY2hkKSB7XHJcbiAgICAgICAgICAgIGlmIChvSGFzUHJwKGNoZE1ick5tKShvKSlcclxuICAgICAgICAgICAgICAgIGVyKFwie2NoZE1ick5tfSBvZiB7Y2hkfSBleGlzdHMgaW4ge299XCIsIHsgY2hkTWJyTm0sIGNoZCwgbyB9KVxyXG4gICAgICAgICAgICBvW2NoZE1ick5tXSA9IGNoZFtjaGRNYnJObV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb1xyXG59XHJcbmV4cG9ydCBjb25zdCBueUNtbFNkcnkgPSAoYTogbnkpID0+IGl0ck1hcChjbWxOeSkoYSkgYXMgc2RyeVxyXG5leHBvcnQgY29uc3Qgb0NtbERyeSA9IChhOiBvKSA9PiB7XHJcbiAgICBsZXQgeiA9IGl0ck1hcCgobm06IHMpID0+IFtjbWxObShubSksIG5tXSkob1BycE55KGEpKVxyXG4gICAgZHJ5U3J0KGF5RWxlKDApKSh6KVxyXG4gICAgY29uc3QgdyA9IHNkcnlDb2xXZHQoMCkoeilcclxuICAgIGRyeUNvbE1keSgwKShzQWxpZ25MKHcpKSh6KVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5leHBvcnQgY29uc3Qgb0N0b3JObSA9IChhOiBvKSA9PiBhICYmIGEuY29uc3RydWN0b3IgJiYgYS5jb25zdHJ1Y3Rvci5uYW1lXHJcbmV4cG9ydCBjb25zdCBvSXNJbnN0YW5jZSA9IChpbnN0YW5jZTogRnVuY3Rpb24pID0+IChhOiBvKSA9PiBhIGluc3RhbmNlb2YgaW5zdGFuY2VcclxuZXhwb3J0IGNvbnN0IG9IYXNDdG9yTm0gPSAobm06IHMpID0+IChhOiBvKSA9PiBvQ3Rvck5tKGEpID09PSBubVxyXG5leHBvcnQgY29uc3Qgb1BycCA9IChwcnBQdGg6IHMpID0+IChhOiBvKSA9PiB7XHJcbiAgICAvKipcclxuICogQGRlc2NyaXB0aW9uIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgb2Ygb2JqZWN0IHtvfSBieSBwcm9wZXJ0eSBwYXRoIHtwcHJQdGh9XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcnBQdGhcclxuICogQGV4YW1wbGVcclxuICogY29uc3QgYSA9IHtiOiB7Yzp7MX19XHJcbiAqIHJlcXVpcmUoJ2Fzc2VydCcpLmVxdWFsKHBycCgnYi5jJykobyksIDEpIFxyXG4gKi9cclxuICAgIGxldCB2XHJcbiAgICBmb3IgKGxldCBubSBvZiBwcnBQdGguc3BsaXQoJy4nKSkge1xyXG4gICAgICAgIHYgPSBhW25tXVxyXG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdlxyXG59XHJcbmV4cG9ydCBjb25zdCBubVBybV9ueSA9IChfbm1Qcm06IG55UHJtKTogbnkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBfbm1Qcm0gPT09ICdzdHJpbmcnKVxyXG4gICAgICAgIHJldHVybiBzU3BsaXRTcGMoX25tUHJtKVxyXG4gICAgcmV0dXJuIF9ubVBybVxyXG59XHJcbmV4cG9ydCBjb25zdCBueSA9IG5tUHJtX255XHJcbmV4cG9ydCBjb25zdCBvUHJwQXkgPSAoX3BycE5tOiBueVBybSkgPT4gKF9vOiBvKSA9PiBpdHJNYXAoKG5tOiBzKSA9PiBvUHJwKG5tKShfbykpKG55KF9wcnBObSkpXHJcbmV4cG9ydCBjb25zdCBvUHJwTnkgPSAoYTogbykgPT4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYSlcclxuZXhwb3J0IGNvbnN0IG9IYXNQcnAgPSAocHJwTm06IG5tKSA9PiAoYTogbykgPT4gYS5oYXNPd25Qcm9wZXJ0eShwcnBObSlcclxuZXhwb3J0IGNvbnN0IG9IYXNMZW4gPSBvSGFzUHJwKCdsZW5ndGgnKVxyXG5leHBvcnQgY29uc3Qgb0NtbE9iaiA9IChhOiBvKSA9PiB7XHJcbiAgICBjb25zdCBkcnkgPSBvQ21sRHJ5KGEpXHJcbiAgICBjb25zdCB6OiBvYmplY3QgPSB7fVxyXG4gICAgZHJ5LmZvckVhY2goKFtjbWxObSwgcHJwTm1dKSA9PiB6W2NtbE5tXSA9IHpbcHJwTm1dKVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmNvbnN0IGZ1bnNFeHBvcnQgPSAoLi4uZjogRnVuY3Rpb25bXSkgPT4gZi5mb3JFYWNoKGZ1bkV4cG9ydClcclxuY29uc3QgZnVuRXhwb3J0ID0gKGY6IEZ1bmN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBmdW5OYW1lID0gZi5uYW1lXHJcbiAgICBpZiAob0hhc1BycChmdW5OYW1lKShleHBvcnRzKSkge1xyXG4gICAgICAgIGVyKCd0aGUge2Z1bk5hbWV9IGFscmVhZHkgZXhwb3J0ZWQnLCB7IGZ1bk5hbWUgfSlcclxuICAgIH1cclxuICAgIGV4cG9ydHMuZnVuTmFtZSA9IGZcclxufVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBheUNsb25lID0gKGF5OiBheSkgPT4gYXkuc2xpY2UoMCwgYXkubGVuZ3RoKVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBzZHJ5Q29sV2R0ID0gKGNvbEl4OiBuKSA9PiAoYTogc2RyeSkgPT4gc2l0cldkdChkcnlDb2woY29sSXgpKGEpKVxyXG5leHBvcnQgY29uc3Qgc2RyeUNvbFdkdEF5ID0gKGE6IHNkcnkpID0+IGl0ck1hcCgoaTogbikgPT4gc2RyeUNvbFdkdChpKShhKSkobkl0cihkcnlDb2xDbnQoYSkpKSBhcyBuW11cclxuZXhwb3J0IGNvbnN0IGRyeUNvbCA9IChjb2xJeDogbikgPT4gKGE6IGRyeSkgPT4gaXRyTWFwKGF5RWxlT3JEZnQoJycpKGNvbEl4KSkoYSlcclxuZXhwb3J0IGNvbnN0IGRyeUNvbENudCA9IChhOiBkcnkpID0+IGl0ck1heChpdHJNYXAodkxlbikoYSkpIGFzIG5cclxuZXhwb3J0IGNvbnN0IGRyeUNlbGxNZHkgPSAoZjogZikgPT4gKGE6IGRyeSkgPT4geyBpdHJFYWNoKGF5TWR5KGYpKShhKSB9XHJcbmV4cG9ydCBjb25zdCBkcnlDbG9uZSA9IChhOiBkcnkpID0+IGl0ck1hcCgoZHI6IGRyKSA9PiBpdHJDbG9uZShkcikpKGEpIGFzIGRyeVxyXG5leHBvcnQgY29uc3QgZHJ5Q29sTWR5ID0gKGNvbEl4OiBuKSA9PiAoZjogZikgPT4gKGE6IGRyeSkgPT4geyBpdHJFYWNoKGF5TWR5RWxlKGNvbEl4KShmKSkoYSkgfVxyXG5leHBvcnQgY29uc3Qgc2RyeUxpbmVzID0gKGE6IHNkcnkpID0+IHNkcnlMeShhKS5qb2luKCdcXHJcXG4nKVxyXG5leHBvcnQgY29uc3Qgd2R0QXlMaW4gPSAod2R0QXk6IG5bXSkgPT4gXCJ8LVwiICsgaXRyTWFwKCh3OiBuKSA9PiAnLScucmVwZWF0KHcpKSh3ZHRBeSkuam9pbignLXwtJykgKyBcIi18XCJcclxuZXhwb3J0IGNvbnN0IHNkckxpbiA9ICh3ZHRBeTogbltdKSA9PiAoYTogc2RyKSA9PiB7XHJcbiAgICBsZXQgbSA9IChbdywgc10pID0+IHNBbGlnbkwodykocylcclxuICAgIGxldCB6ID0gYXlaaXAod2R0QXksIGEpXHJcbiAgICBsZXQgYXkgPSBpdHJNYXAobSkoeilcclxuICAgIGxldCBzID0gYXkuam9pbignIHwgJylcclxuICAgIHJldHVybiBcInwgXCIgKyBzICsgXCIgfFwiXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNkcnlMeSA9IChhOiBzZHJ5KSA9PiB7XHJcbiAgICBsZXQgdyA9IHNkcnlDb2xXZHRBeShhKVxyXG4gICAgbGV0IGggPSB3ZHRBeUxpbih3KVxyXG4gICAgbGV0IHo6IGx5ID0gW2hdLmNvbmNhdChpdHJNYXAoc2RyTGluKHcpKShhKSwgaClcclxuICAgIHJldHVybiB6XHJcbn1cclxuZXhwb3J0IGNvbnN0IGl0clN5ID0gKGE6IGl0cikgPT4gaXRyTWFwKFN0cmluZykoYSkgYXMgc1tdXHJcbmV4cG9ydCBjb25zdCBheVN5ID0gKGE6IGF5KSA9PiBpdHJNYXAoU3RyaW5nKShhKSBhcyBzW11cclxuZXhwb3J0IGNvbnN0IGRyeVNkcnkgPSBpdHJNYXAoYXlTeSkgYXMgKGE6IHNkcnkpID0+IHNkcnlcclxuZXhwb3J0IGNvbnN0IGRyeUx5ID0gKGE6IGRyeSkgPT4gc2RyeUx5KGRyeVNkcnkoYSkpXHJcbmV4cG9ydCBjb25zdCBkcnNMeSA9IChhOiBkcnMpID0+IHtcclxuICAgIGxldCB7IGZueSwgZHJ5IH0gPSBhXHJcbiAgICBsZXQgYiA9IFtmbnldLmNvbmNhdChkcnlTZHJ5KGRyeSkpXHJcbiAgICBsZXQgYyA9IHNkcnlMeShiKVxyXG4gICAgbGV0IHo6IGx5ID0gYy5zbGljZSgwLCAyKS5jb25jYXQoY1swXSwgYy5zbGljZSgyKSlcclxuICAgIHJldHVybiB6XHJcbn1cclxuZXhwb3J0IGNvbnN0IGRyc0xpbmVzID0gKGE6IGRycykgPT4gZHJzTHkoYSkuam9pbignXFxyXFxuJylcclxuY29uc3QgZHJ5U3J0Q29sX19zcnRGdW4gPSAoY29sQXk6IG5bXSkgPT4gKGRyQTogYXksIGRyQjogYXkpID0+IHtcclxuICAgIGZvciAobGV0IGlDb2wgb2YgY29sQXkpIHtcclxuICAgICAgICBpZiAoaUNvbCA8IDApIHtcclxuICAgICAgICAgICAgaWYgKGRyQVstaUNvbF0gPiBkckJbLWlDb2xdKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xXHJcbiAgICAgICAgICAgIGlmIChkckFbLWlDb2xdIDwgZHJCWy1pQ29sXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGRyQVtpQ29sXSA+IGRyQltpQ29sXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgICAgIGlmIChkckFbaUNvbF0gPCBkckJbaUNvbF0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTFcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMFxyXG59XHJcbmV4cG9ydCBjb25zdCBkcnlTcnRDb2wgPSAoY29sQXk6IG5bXSkgPT4gKGE6IGRyeSkgPT4gYS5zb3J0KGRyeVNydENvbF9fc3J0RnVuKGNvbEF5KSlcclxuZXhwb3J0IGNvbnN0IGRyeVNydCA9IChmdW5fb2ZfZHJfdG9fa2V5OiAoZHI6IGRyKSA9PiBzKSA9PiAoYTogZHJ5KSA9PiBhLnNvcnQoKGRyX0EsIGRyX0IpID0+IHZ2Q29tcGFyZShmdW5fb2ZfZHJfdG9fa2V5KGRyX0EpLCBmdW5fb2ZfZHJfdG9fa2V5KGRyX0IpKSlcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3Qgb3lQcnBDb2wgPSBwcnBObSA9PiBveSA9PiB7IGNvbnN0IG9vOiBheSA9IFtdOyBmb3IgKGxldCBvIG9mIG95KSBvby5wdXNoKG9bcHJwTm1dKTsgcmV0dXJuIG9vIH1cclxuZXhwb3J0IGNvbnN0IG95UHJwRHJ5ID0gcHJwTnkgPT4gb3kgPT4geyBjb25zdCBvbzogYXkgPSBbXTsgZm9yIChsZXQgbyBvZiBveSkgb28ucHVzaChvUHJwQXkocHJwTnkpKG8pKTsgcmV0dXJuIG9vIH1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGxldCBzTGlrOiAobGlrOiBzKSA9PiAoczogcykgPT4gYlxyXG5leHBvcnQgbGV0IHNIYXNTYnNcclxue1xyXG4gICAgY29uc3QgX2lzRXNjID0gaSA9PiB7IGZvciAobGV0IHNwZWMgb2YgXCIoKVtde30vfC4rXCIpIGlmIChpID09PSBzcGVjKSByZXR1cm4gdHJ1ZSB9XHJcbiAgICBjb25zdCBfZXNjU3BlYyA9IGxpayA9PiBpdHJNYXAoaSA9PiBpID09PSAnXFxcXCcgPyAnXFxcXFxcXFwnIDogKF9pc0VzYyhpKSA/ICdcXFxcJyArIGkgOiBpKSkobGlrKS5qb2luKCcnKSAvLzsgY29uc3QgeHh4ID0gX2VzY1NwZWMoXCJhYmM/ZGRcIik7IGRlYnVnZ2VyXHJcbiAgICBjb25zdCBfZXNjU3RhciA9IGxpayA9PiBpdHJNYXAoaSA9PiBpID09PSAnKicgPyAnLionIDogaSkobGlrKS5qb2luKCcnKVxyXG4gICAgY29uc3QgX2VzY1EgPSBsaWsgPT4geyBjb25zdCBvOiBheSA9IFtdOyBmb3IgKGxldCBpIG9mIGxpaykgby5wdXNoKGkgPT09ICc/JyA/ICcuJyA6IGkpOyByZXR1cm4gby5qb2luKCcnKSB9XHJcbiAgICBjb25zdCBfZXNjID0gbGlrID0+IFwiXlwiICsgcGlwZShsaWspKF9lc2NTcGVjLCBfZXNjU3RhciwgX2VzY1EpICsgXCIkXCJcclxuICAgIGNvbnN0IF9saWtSZSA9IGxpayA9PiBuZXcgUmVnRXhwKF9lc2MobGlrKSlcclxuICAgIGNvbnN0IF9pc0VzY1NicyA9IGkgPT4geyBmb3IgKGxldCBzcGVjIG9mIFwiKClbXXt9L3wuKz8qXCIpIGlmIChpID09PSBzcGVjKSByZXR1cm4gdHJ1ZSB9XHJcbiAgICBjb25zdCBfZXNjU2JzID0gYyA9PiBjID09PSAnXFxcXCcgPyAnXFxcXFxcXFwnIDogKF9pc0VzY1NicyhjKSA/ICdcXFxcJyArIGMgOiBjKVxyXG4gICAgc0xpayA9IChsaWs6IHMpID0+IChhOiBzKSA9PiBfbGlrUmUoYSkudGVzdChhKVxyXG4gICAgc0hhc1NicyA9IChzYnM6IHMpID0+IChhOiBzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgX2VzY1NwZWMgPSBpdHJNYXAoX2VzY1Nicykoc2JzKS5qb2luKFwiXCIpXHJcbiAgICAgICAgY29uc3QgX3Nic1JlID0gbmV3IFJlZ0V4cChfZXNjU3BlYylcclxuICAgICAgICBsZXQgbyA9IF9zYnNSZS50ZXN0KGEpXHJcbiAgICAgICAgcmV0dXJuIG9cclxuICAgIH1cclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgcHRoRm5BeSA9IChwdGg6IHMsIGxpaz86IHMpID0+IHtcclxuICAgIGlmICghZnMuZXhpc3RzU3luYyhwdGgpKSByZXR1cm4gbnVsbFxyXG4gICAgY29uc3QgaXNGaWwgPSBlbnRyeSA9PiBmcy5zdGF0U3luYyhwYXRoLmpvaW4ocHRoLCBlbnRyeSkpLmlzRmlsZSgpO1xyXG4gICAgbGV0IGVudHJpZXMgPSBmcy5yZWFkZGlyU3luYyhwdGgpXHJcbiAgICBlbnRyaWVzID0gKGxpayA9PT0gdW5kZWZpbmVkKSA/IGVudHJpZXMgOiBpdHJXaGVyZShzTGlrKGxpaykpKGVudHJpZXMpXHJcbiAgICBsZXQgbzogc1tdID0gaXRyV2hlcmUoaXNGaWwpKGVudHJpZXMpXHJcbiAgICByZXR1cm4gb1xyXG59OyAvLyBjb25zdCB4eHggPSBwdGhGbkF5KFwiYzpcXFxcdXNlcnNcXFxcdXNlclxcXFxcIiwgXCJzZGZkZiouKlwiKTsgZGVidWdnZXI7XHJcbmV4cG9ydCBjb25zdCBheVppcCA9IChhOiBheSwgYjogYXkpID0+IGl0ck1hcCgoaTogbikgPT4gW2FbaV0sIGJbaV1dKShuSXRyKGEubGVuZ3RoKSlcclxuZXhwb3J0IGNvbnN0IGVudHJ5U3RhdFBtID0gYXN5bmMgKGEpID0+IHtcclxuICAgIGRlYnVnZ2VyXHJcbiAgICB0aHJvdyAwXHJcbn1cclxuZXhwb3J0IGNvbnN0IHB0aEZuQXlQbSA9IGFzeW5jIChhOiBwdGgsIGxpaz86IHMpID0+IHtcclxuICAgIGRlYnVnZ2VyXHJcbiAgICB0aHJvdyAwXHJcbiAgICAvKlxyXG4gICAgY29uc3QgYiA9IGF3YWl0IHB0aFN0YXRBeVBtKGEsIGxpaylcclxuICAgIGxldCBkOiBmbltdID0gcGlwZShuSXRyKGIubGVuZ3RoKSkoaXRyV2hlcmUoaSA9PiBiW2ldLmlzRmlsZSgpKSwgaXRyTWFwKGkgPT4gZW50cmllc1tpXSkpXHJcbiAgICBkZWJ1Z2dlclxyXG4gICAgcmV0dXJuIGRcclxuICAgICovXHJcbn1cclxuZXhwb3J0IGNvbnN0IHB0aFN0YXRPcHRBeVBtID0gYXN5bmMgKGE6IHB0aCwgbGlrPzogcykgPT4ge1xyXG4gICAgY29uc3QgYiA9IGF3YWl0IHBtPGZuW10+KGZzLnJlYWRkaXIsIGEpXHJcbiAgICBjb25zdCBiMSA9IChsaWsgPT09IHVuZGVmaW5lZCkgPyBiIDogaXRyV2hlcmUoc0xpayhsaWspKShiKVxyXG4gICAgY29uc3QgaiA9IGIgPT4gcGF0aC5qb2luKGEsIGIpXHJcbiAgICBjb25zdCBiMiA9IGl0ck1hcChqKShiMSlcclxuICAgIGNvbnN0IHN0YXQgPSBlbnRyeSA9PiBwbVJzbHRPcHQoZnMuc3RhdCwgZW50cnkpXHJcbiAgICBjb25zdCBjID0gaXRyTWFwKHN0YXQpKGIyKVxyXG4gICAgY29uc3QgeiA9IGF3YWl0IFByb21pc2UuYWxsKGMpXHJcbiAgICByZXR1cm4geiBhcyAoZnMuU3RhdHMgfCBudWxsKVtdXHJcbn1cclxuZXhwb3J0IGNvbnN0IHB0aEZkckF5UG0gPSBhc3luYyAoYTogcHRoLCBsaWs/OiBzKSA9PiB7XHJcblxyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBuTXVsdGlwbHkgPSB4ID0+IGEgPT4gYSAqIHhcclxuZXhwb3J0IGNvbnN0IG5EaXZpZGUgPSB4ID0+IGEgPT4gYSAvIHhcclxuZXhwb3J0IGNvbnN0IHZBZGQgPSB4ID0+IGEgPT4gYSArIHhcclxuZXhwb3J0IGNvbnN0IG5NaW51cyA9IHggPT4gYSA9PiBhIC0geFxyXG5leHBvcnQgY29uc3QgbkRlY3IgPSBuTWludXMoMSlcclxuZXhwb3J0IGNvbnN0IG5JbmNyID0gdkFkZCgxKVxyXG5leHBvcnQgY29uc3Qgbkl0ciA9IGZ1bmN0aW9uKiAobikgeyBmb3IgKGxldCBqID0gMDsgaiA8IG47IGorKykgeWllbGQgaiB9XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCB2dkNvbXBhcmUgPSAoYSwgYikgPT4gYSA9PT0gYiA/IDAgOiBhID4gYiA/IDEgOiAtMVxyXG5leHBvcnQgdHlwZSBsYXp5PFQ+ID0gKCkgPT4geyB2OiBUIH1cclxuZXhwb3J0IGNvbnN0IGxhenkgPSA8VD4odmY6ICgoKSA9PiBUKSk6IGxhenk8VD4gPT4geyBsZXQgdiwgZG9uZSA9IGZhbHNlOyByZXR1cm4gKCkgPT4geyBpZiAoIWRvbmUpIHsgdiA9IHZmKCk7IGRvbmUgPSB0cnVlIH07IHJldHVybiB2IH0gfVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3Qgb3B0TWFwID0gPFQsIFU+KGY6IChhOiBUKSA9PiBVKSA9PiAoYTogVCB8IG51bGwpID0+IGEgIT09IG51bGwgPyBmKGEpIDogYVxyXG5leHBvcnQgY29uc3QgZmZuID0gKGE6IGZmbikgPT4gbmV3IEZmbihhKVxyXG5cclxuZXhwb3J0IGNsYXNzIEZmbiB7XHJcbiAgICBwcml2YXRlIF9mZm46IGZmblxyXG4gICAgcHJpdmF0ZSBfZG90UG9zOiBuXHJcbiAgICBwcml2YXRlIF9zZXBQb3M6IG5cclxuICAgIGNvbnN0cnVjdG9yKGE6IGZmbikge1xyXG4gICAgICAgIHRoaXMuX2ZmbiA9IGFcclxuICAgICAgICB0aGlzLl9kb3RQb3MgPSBhLmxhc3RJbmRleE9mKCcuJylcclxuICAgICAgICB0aGlzLl9zZXBQb3MgPSBhLmxhc3RJbmRleE9mKHB0aHNlcClcclxuICAgIH1cclxuICAgIHByaXZhdGUgem1pZChhdDogbikgeyByZXR1cm4gc01pZChhdCkodGhpcy5mZm4pIH1cclxuICAgIHByaXZhdGUgemxlZnQoYXQ6IG4pIHsgcmV0dXJuIHNMZWZ0KGF0KSh0aGlzLmZmbikgfVxyXG4gICAgZ2V0IGZmbigpIHsgcmV0dXJuIHRoaXMuX2ZmbiB9XHJcbiAgICBnZXQgcHRoKCkgeyBjb25zdCBhdCA9IHRoaXMuX3NlcFBvczsgcmV0dXJuIGF0ID09PSAtMSA/ICcnIDogdGhpcy56bGVmdChhdCArIDEpIH1cclxuICAgIGdldCBmbigpIHsgY29uc3QgYXQgPSB0aGlzLl9zZXBQb3M7IHJldHVybiBhdCA9PT0gLTEgPyB0aGlzLmZmbiA6IHRoaXMuem1pZChhdCArIDEpIH1cclxuICAgIGdldCBleHQoKSB7IGNvbnN0IGF0ID0gdGhpcy5fZG90UG9zOyByZXR1cm4gYXQgPT09IC0xID8gJycgOiB0aGlzLnptaWQoYXQpIH1cclxuICAgIGdldCBub0V4dCgpIHsgY29uc3QgYXQgPSB0aGlzLl9kb3RQb3M7IHJldHVybiBhdCA9PT0gLTEgPyB0aGlzLmZmbiA6IHRoaXMuemxlZnQoYXQpIH1cclxuICAgIGdldCBmZm5uKCkgeyByZXR1cm4gdGhpcy5ub0V4dCB9XHJcbiAgICBnZXQgZm5uKCkgeyByZXR1cm4gZmZuKHRoaXMubm9FeHQpLmZuIH1cclxuICAgIGFkZEZuU2Z4KHNmeDogcykgeyByZXR1cm4gdGhpcy5mZm5uICsgc2Z4ICsgdGhpcy5leHQgfVxyXG4gICAgcnBsRXh0KGV4dDogcykgeyByZXR1cm4gdGhpcy5mZm5uICsgZXh0IH1cclxuICAgIG1ha0JhY2t1cCgpIHtcclxuICAgICAgICBjb25zdCBleHQgPSB0aGlzLmV4dFxyXG4gICAgICAgIGNvbnN0IGZmbm4gPSB0aGlzLmZmbm5cclxuICAgICAgICBjb25zdCBwdGggPSB0aGlzLnB0aFxyXG4gICAgICAgIGNvbnN0IGZmbiA9IHRoaXMuZmZuXHJcbiAgICAgICAgbGV0IGIgPSBzUmlnaHQoMTIpKGZmbm4pXHJcbiAgICAgICAgY29uc3QgaXNCYWNrdXBGZm4gPSAoc0hhc1BmeChcIihiYWNrdXAtXCIpKGZmbikpICYmIChzSGFzU2Z4KFwiKVwiKShmZm4pKVxyXG4gICAgICAgIGNvbnN0IGZuID0gdGhpcy5mblxyXG4gICAgICAgIGNvbnN0IGJhY2t1cFN1YkZkciA9IGAuYmFja3VwXFxcXCR7Zm59XFxcXGBcclxuICAgICAgICBjb25zdCBiYWNrdXBQdGggPSBwdGggKyBiYWNrdXBTdWJGZHJcclxuXHJcbiAgICAgICAgaWYgKGV4dCA9PT0gJy5iYWNrdXAnKSBlcihcImdpdmVuIFtleHRdIGNhbm5vdCBiZSAnLmJhY2t1cFwiLCB7IGV4dCwgZmZubiB9KVxyXG4gICAgICAgIGlmIChpc0JhY2t1cEZmbikgZXIoXCJ7ZmZufSBjYW5ub3QgYmUgYSBiYWNrdXAgZmlsZSBuYW1lXCIsIHsgZmZuOiB0aGlzLmZmbiB9KVxyXG5cclxuICAgICAgICBsZXQgYyA9IHB0aEZuQXkoYmFja3VwUHRoLCBmZm5uICsgJyhiYWNrdXAtPz8/KScgKyBleHQpXHJcbiAgICAgICAgbGV0IG54dEJhY2t1cE5OTiA9XHJcbiAgICAgICAgICAgIGMgPT09IG51bGwgfHwgaXNFbXAoYikgPyAnMDAwJyA6XHJcbiAgICAgICAgICAgICAgICBwaXBlKGMpKGl0ck1heCwgZmZuUm12RXh0LCBzUm12TGFzQ2hyLCBzUmlnaHQoMyksIE51bWJlci5wYXJzZUludCwgbkluY3IsIG5QYWRaZXJvKDMpKVxyXG4gICAgICAgIGNvbnN0IGJhY2t1cEZmbiA9IGJhY2t1cFB0aCArIGZmbkFkZEZuU2Z4KGAoYmFja3VwLSR7bnh0QmFja3VwTk5OfSlgKShmbilcclxuICAgICAgICBwdGhFbnNTdWJGZHIoYmFja3VwU3ViRmRyKShwdGgpOyBmcy5jb3B5RmlsZVN5bmModGhpcy5mZm4sIGJhY2t1cEZmbilcclxuICAgIH1cclxufVxyXG4vLyBjb25zdCB4eHggPSBmZm4oX19maWxlbmFtZSk7IGRlYnVnZ2VyXHJcbmV4cG9ydCBjb25zdCBmZm5NYWtCYWNrdXAgPSAoYTogZmZuKSA9PiB7XHJcbiAgICBjb25zdCBleHQgPSBmZm5FeHQoYSlcclxuICAgIGNvbnN0IGZmbm4gPSBmZm5SbXZFeHQoYSlcclxuICAgIGNvbnN0IHB0aCA9IGZmblB0aChhKVxyXG4gICAgbGV0IGIgPSBzUmlnaHQoMTIpKGZmbm4pXHJcbiAgICBjb25zdCBpc0JhY2t1cEZmbiA9IChzSGFzUGZ4KFwiKGJhY2t1cC1cIikoYSkpICYmIChzSGFzU2Z4KFwiKVwiKShhKSlcclxuICAgIGNvbnN0IGZuID0gZmZuRm4oYSlcclxuICAgIGNvbnN0IGJhY2t1cFN1YkZkciA9IGAuYmFja3VwXFxcXCR7Zm59XFxcXGBcclxuICAgIGNvbnN0IGJhY2t1cFB0aCA9IHB0aCArIGJhY2t1cFN1YkZkclxyXG5cclxuICAgIGlmIChleHQgPT09ICcuYmFja3VwJykgZXIoXCJnaXZlbiBbZXh0XSBjYW5ub3QgYmUgJy5iYWNrdXBcIiwgeyBleHQsIGZmbm4gfSlcclxuICAgIGlmIChpc0JhY2t1cEZmbikgZXIoXCJmZm4gY2Fubm90IGJlIGEgYmFja3VwIGZpbGUgbmFtZVwiLCB7IGZmbjogYSB9KVxyXG5cclxuICAgIGxldCBjID0gcHRoRm5BeShiYWNrdXBQdGgsIGZmbm4gKyAnKGJhY2t1cC0/Pz8pJyArIGV4dClcclxuICAgIGxldCBueHRCYWNrdXBOTk4gPVxyXG4gICAgICAgIGMgPT09IG51bGwgfHwgaXNFbXAoYikgPyAnMDAwJyA6XHJcbiAgICAgICAgICAgIHBpcGUoYykoaXRyTWF4LCBmZm5SbXZFeHQsIHNSbXZMYXNDaHIsIHNSaWdodCgzKSwgTnVtYmVyLnBhcnNlSW50LCBuSW5jciwgblBhZFplcm8oMykpXHJcbiAgICBjb25zdCBiYWNrdXBGZm4gPSBiYWNrdXBQdGggKyBmZm5BZGRGblNmeChgKGJhY2t1cC0ke254dEJhY2t1cE5OTn0pYCkoZm4pXHJcbiAgICBwdGhFbnNTdWJGZHIoYmFja3VwU3ViRmRyKShwdGgpOyBmcy5jb3B5RmlsZVN5bmMoYSwgYmFja3VwRmZuKVxyXG59XHJcbmV4cG9ydCBjb25zdCBzcmNFeHBTdG10ID0gKGE6IGx5KSA9PiB7XHJcbiAgICBsZXQgbnkgPSBzcmNFeHBDb25zdE55KGEpXHJcbiAgICBueSA9IGl0cldoZXJlKHByZWROb3Qoc0hhc1BmeChcIl9cIikpKShueSkuc29ydCgpXHJcbiAgICBpZiAoaXNFbXAobnkpKSByZXR1cm4gbnVsbFxyXG4gICAgY29uc3QgeCA9IGF5Sm5Bc0xpbmVzKFwiLCBcIiwgNCwgMTIwKShueSlcclxuICAgIGxldCB6ID0gXCJleHBvcnQge1xcclxcblwiICsgeCArIFwiXFxyXFxufVwiXHJcbiAgICByZXR1cm4geiBhcyBzXHJcbn1cclxuZXhwb3J0IGNvbnN0IGN1ckV4cFN0bXQgPSAoKSA9PiBwaXBlKF9fZmlsZW5hbWUpKGZ0THksIHNyY0V4cFN0bXQpIGFzIHNcclxuLy8gZG1wKGN1ckV4cFN0bXQpOyBkZWJ1Z2dlclxyXG5leHBvcnQgY29uc3QgZmpzUnBsRXhwU3RtdCA9IGZqcyA9PiB7XHJcbiAgICBjb25zdCBvbGRMeSA9IGZ0THkoZmpzKVxyXG4gICAgY29uc3QgbmV3TGluID0gc3JjRXhwU3RtdChvbGRMeSlcclxuXHJcbiAgICBsZXQgb2xkQmVnSXggPSBheUZpbmRJeChzSGFzUGZ4KFwiZXhwb3J0cyB7XCIpKShvbGRMeSlcclxuICAgIGxldCBvbGRFbmRJeDogbiA9ICgoKSA9PiB7XHJcbiAgICAgICAgaWYgKG9sZEJlZ0l4ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG4gPSBvbGRCZWdJeDsgaSA8IG9sZEx5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoL1xcfS8udGVzdChvbGRMeVtpXSkpIHJldHVybiBpKytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMFxyXG4gICAgfSkoKVxyXG4gICAgY29uc3Qgb2xkTGluID0gKG9sZEJlZ0l4ID09PSBudWxsIHx8IG9sZEVuZEl4ID09PSBudWxsKSA/IG51bGwgOiBvbGRMeS5zbGljZShvbGRCZWdJeCwgb2xkRW5kSXgpLmpvaW4oJ1xcclxcbicpXHJcbiAgICBjb25zdCBuZXdMaW5lcyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBoYXNOZXdMaW4gPSBuZXdMaW4gIT09IG51bGxcclxuICAgICAgICBjb25zdCBoYXNPbGRMaW4gPSBvbGRMaW4gIT09IG51bGxcclxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgY2FzZSAoaGFzTmV3TGluICYmIGhhc09sZExpbik6XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkQmVnSXggIT09IG51bGwpIHsgb2xkTHkuc3BsaWNlKG9sZEJlZ0l4LCBvbGRFbmRJeCwgdkRmdFN0cihuZXdMaW4pKTsgcmV0dXJuIGF5Sm5DckxmKG9sZEx5KSB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHsgZXIoXCJpbXBvc3NpYmxlXCIpOyBoYWx0KCkgfVxyXG4gICAgICAgICAgICBjYXNlIChoYXNOZXdMaW4gJiYgIWhhc09sZExpbik6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXlKbkNyTGYob2xkTHkuY29uY2F0KHZEZnRTdHIobmV3TGluKSkpXHJcbiAgICAgICAgICAgIGNhc2UgKGhhc09sZExpbik6XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkQmVnSXggPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBlcihcImltcG9zc2libGVcIilcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IG9sZEx5LnNwbGljZShvbGRCZWdJeCwgb2xkRW5kSXgpOyByZXR1cm4gYXlKbkNyTGYob2xkTHkpIH1cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGVyKFwiaW1wb3NzaWJsZVwiKTsgaGFsdCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBheUpuQ3JMZihvbGRMeSlcclxuICAgIH1cclxuICAgIGxldCBhID0gbmV3TGluZXMoKVxyXG4gICAgaWYgKG9sZExpbiAhPT0gbmV3TGluKSB7IGRlYnVnZ2VyOyBmZm5NYWtCYWNrdXAoZmpzKTsgc1dydChmanMpKG5ld0xpbmVzKCkpIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHN5TGluID0gKGE6IHN5KSA9PiBpdHJNYXAoc0VzY1ZiYXIpKGEpLmpvaW4oJyB8ICcpXHJcblxyXG5leHBvcnQgY29uc3QgbGluZXNBbGlnbkwgPSAod2R0OiBuKSA9PiAoYTogbGluZXMpID0+IHtcclxuICAgIGNvbnN0IGExID0gc1NwbGl0Q3JMZihhKVxyXG4gICAgY29uc3QgYUxhcyA9IGF5TGFzKGExKVxyXG4gICAgY29uc3QgbiA9IHdkdCAtIGFMYXMubGVuZ3RoXHJcbiAgICBjb25zdCBzID0gblNwYyhuKVxyXG4gICAgY29uc3QgeiA9IGEgKyBzXHJcbiAgICByZXR1cm4gelxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGluZXNXZHQgPSAoYTogbGluZXMpID0+IHtcclxuICAgIGNvbnN0IGExID0gc1NwbGl0Q3JMZihhKVxyXG4gICAgY29uc3QgejogbiA9IGl0cldkdChhMSlcclxuICAgIHJldHVybiB6XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBsaW5lc0F5V2R0ID0gKGE6IGxpbmVzW10pID0+IHtcclxuICAgIGNvbnN0IGExID0gaXRyTWFwKGxpbmVzV2R0KShhKVxyXG4gICAgY29uc3QgejogbiB8IG51bGwgPSBpdHJNYXgoYTEpXHJcbiAgICByZXR1cm4geiA9PT0gbnVsbCA/IDAgOiB6XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBsaW5lc0F5QWxpZ25MID0gKGE6IGxpbmVzW10pID0+IHtcclxuICAgIGNvbnN0IHcgPSBsaW5lc0F5V2R0KGEpICsgMVxyXG4gICAgY29uc3QgejogbGluZXNbXSA9IGl0ck1hcChsaW5lc0FsaWduTCh3KSkoYSlcclxuICAgIHJldHVybiB6XHJcbn1cclxuZXhwb3J0IGNvbnN0IHZTYXYgPSAodmlkOiB2aWQpID0+IChhKSA9PiBzV3J0KHZpZEZqc29uKHZpZCkpKEpTT04uc3RyaW5naWZ5KGEpKVxyXG5leHBvcnQgY29uc3QgdmlkcHRoID0gX19kaXJuYW1lICsgcHRoc2VwICsgJ3Rlc3QtcmVzb3VyY2VzJyArIHB0aHNlcFxyXG5wdGhFbnModmlkcHRoKVxyXG5leHBvcnQgY29uc3QgcmVQdW5FeGNwRG90ID0gL1tcXChcXCldL2dcclxuZXhwb3J0IGNvbnN0IHNScGxQdW5FeGNwRG90ID0gKHM6IHMpOiBzID0+IHMucmVwbGFjZShyZVB1bkV4Y3BEb3QsICcgJylcclxuZXhwb3J0IGNvbnN0IHZpZHB0aEJydyA9ICgpID0+IHB0aEJydyh2aWRwdGgpXHJcbmV4cG9ydCBjb25zdCB2aWRGanNvbiA9IChhOiB2aWQpID0+IHZpZHB0aCArIGEgKyAnLmpzb24nXHJcbmV4cG9ydCBjb25zdCBmanNvblZhbCA9IChhOiBmZm4pID0+IEpTT04ucGFyc2UoZnRMaW5lcyhhKSlcclxuZXhwb3J0IGNvbnN0IHZpZFZhbCA9IChhOiB2aWQpID0+IGZqc29uVmFsKHZpZEZqc29uKGEpKVxyXG5leHBvcnQgY29uc3QgdmlkQnJ3ID0gKGE6IHZpZCkgPT4gZnRCcncodmlkRmpzb24oYSkpXHJcbmV4cG9ydCBjb25zdCBzU2F2ID0gKHNpZDogc2lkKSA9PiAoYTogcykgPT4gc1dydChzaWRGdChzaWQpKShhKVxyXG5leHBvcnQgY29uc3Qgc2lkcHRoID0gdmlkcHRoXHJcbmV4cG9ydCBjb25zdCBzaWRwdGhCcncgPSAoKSA9PiBwdGhCcncoc2lkcHRoKVxyXG5leHBvcnQgY29uc3Qgc2lkRnQgPSAoYTogc2lkKSA9PiBzaWRwdGggKyBhICsgJy50eHQnXHJcbmV4cG9ydCBjb25zdCBzaWRTdHIgPSAoYTogc2lkKSA9PiBmdExpbmVzKHNpZEZ0KGEpKVxyXG5leHBvcnQgY29uc3Qgc2lkQnJ3ID0gKGE6IHNpZCkgPT4gZnRCcncoc2lkRnQoYSkpXHJcbmV4cG9ydCBjb25zdCB2VGVlID0gPFQ+KGY6IChhOiBUKSA9PiB2b2lkKSA9PiAoYTogVCkgPT4geyBmKGEpOyByZXR1cm4gYSB9XHJcbmV4cG9ydCBjb25zdCBmdFdydCA9IChzOiBzKSA9PiAoYTogZnQpID0+IGZzLndyaXRlRmlsZVN5bmMoYSwgcylcclxuZXhwb3J0IGNvbnN0IGNtZFNoZWxsID0gY2hpbGRfcHJvY2Vzcy5leGVjIGFzIChhOiBzKSA9PiB2b2lkXHJcbmV4cG9ydCBjb25zdCBjbWRTaGVsbFN5bmMgPSBjaGlsZF9wcm9jZXNzLmV4ZWMgYXMgKGE6IHMpID0+IHZvaWRcclxuZXhwb3J0IGNvbnN0IGZ0QnJ3ID0gKGE6IGZ0KSA9PiBjbWRTaGVsbChgY29kZS5jbWQgXCIke2F9XCJgKVxyXG5leHBvcnQgY29uc3QgZnRCcndTeW5jID0gKGE6IGZ0KSA9PiBjbWRTaGVsbFN5bmMoYGNvZGUuY21kIFwiJHthfVwiJ2ApXHJcbmV4cG9ydCBjb25zdCBzQnJ3ID0gKGE6IHMpID0+IHsgcGlwZSh0bXBmdCgpKSh2VGVlKGZ0V3J0KGEpKSwgZnRCcncpIH1cclxuZXhwb3J0IGNvbnN0IHNCcndBdEZkckZuID0gKF9mZHI6IHMsIF9mbjogcykgPT4gKF9zOiBzKSA9PiB7IHBpcGUodG1wZmZuQnlGZHJGbihfZmRyLCBfZm4pKSh2VGVlKGZ0V3J0KF9zKSksIGZ0QnJ3KSB9XHJcbmV4cG9ydCBjb25zdCBvQnJ3QXRGZHJGbiA9IChfZmRyOiBzLCBfZm46IHMpID0+IChfbykgPT4geyBwaXBlKHRtcGZmbkJ5RmRyRm4oX2ZkciwgX2ZuICsgJy5qc29uJykpKHZUZWUoZnRXcnQob0pzb25MaW5lcyhfbykpKSwgZnRCcncpIH1cclxuZXhwb3J0IGNvbnN0IHNqc29uQnJ3ID0gKF9zOiBzLCBfZmRyPzogcywgX2ZuPzogcykgPT4geyBwaXBlKHRtcGZqc29uKF9mZHIsIF9mbikpKHZUZWUoZnRXcnQoX3MpKSwgZnRCcncpIH1cclxuZXhwb3J0IGNvbnN0IGx5QnJ3ID0gY29tcG9zZShheUpuTGYsIHNCcncpIGFzIChhOiBseSkgPT4gdm9pZFxyXG5leHBvcnQgY29uc3QgbHlCcndTdG9wID0gY29tcG9zZShseUJydywgc3RvcCkgYXMgKGE6IGx5KSA9PiB2b2lkXHJcbmV4cG9ydCB0eXBlIF9kaWNTcGxpdFByZWQ8Vj4gPSAoW3MsIFZdKSA9PiBiXHJcbmV4cG9ydCBjb25zdCBkaWNLeSA9IDxUPihfZGljOiBkaWM8VD4pOiBzeSA9PiBpdHJBeShfZGljLmtleXMoKSlcclxuZXhwb3J0IGNvbnN0IGRpY0tzZXQgPSAoX2RpYzogZGljPGFueT4pOiBzc2V0ID0+IGl0clNldChfZGljLmtleXMoKSlcclxuZXhwb3J0IGNvbnN0IHNkaWNLc2V0ID0gZGljS3NldCBhcyAoX3NkaWM6IHNkaWMpID0+IHNzZXRcclxuZXhwb3J0IGNvbnN0IGRpY1ZhbEF5ID0gPFQ+KF9kaWM6IGRpYzxUPik6IFRbXSA9PiBpdHJBeShfZGljLnZhbHVlcygpKVxyXG5leHBvcnQgY29uc3Qgc2RpY1ZhbEF5ID0gKF9zZGljOiBzZGljKTogc3kgPT4gZGljVmFsQXkoX3NkaWMpXHJcbmV4cG9ydCBjb25zdCBkaWNCcmtGb3JUcnVlRmFsc2UgPSA8Vj4oZnVuOiAoW3MsIFZdKSA9PiBiKSA9PiAoZDogZGljPFY+KTogdGZQYWlyPGRpYzxWPj4gPT4ge1xyXG4gICAgY29uc3QgdCA9IG5ldyBNYXA8cywgYW55PigpXHJcbiAgICBjb25zdCBmID0gbmV3IE1hcDxzLCBhbnk+KClcclxuICAgIGZvciAobGV0IFtrLCB2XSBvZiBkKSB7XHJcbiAgICAgICAgaWYgKGZ1bihbaywgdl0pKVxyXG4gICAgICAgICAgICB0LnNldChrLCB2KVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZi5zZXQoaywgdilcclxuICAgIH1cclxuICAgIHJldHVybiB7IHQsIGYgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBkaWNCcncgPSBjb21wb3NlKGRpY0x5LCBseUJydykgYXMgPFQ+KGE6IGRpYzxUPikgPT4gdm9pZFxyXG5leHBvcnQgY29uc3Qgb0pzb25MaW5lcyA9IEpTT04uc3RyaW5naWZ5IGFzIChhOiBvKSA9PiBsaW5lc1xyXG5leHBvcnQgY29uc3Qgb0FzRXhwID0gKG8pOiBsaW5lcyA9PiAnY29uc3QgZXhwID0gJyArIG9Kc29uTGluZXMobylcclxuZXhwb3J0IGNvbnN0IHNkcnlCcncgPSBjb21wb3NlKHNkcnlMaW5lcywgc0JydykgYXMgKGE6IHNkcnkpID0+IHZvaWRcclxuZXhwb3J0IGNvbnN0IGRyeUJydyA9IGNvbXBvc2UoZHJ5U2RyeSwgc2RyeUJydykgYXMgKGE6IGRyeSkgPT4gdm9pZFxyXG5leHBvcnQgY29uc3QgZHJzQnJ3ID0gY29tcG9zZShzQnJ3LCBkcnNMaW5lcykgYXMgKGE6IGRycykgPT4gdm9pZFxyXG5leHBvcnQgY29uc3QgbnlCcncgPSBjb21wb3NlKGl0ck1hcChjbWxOeSksIHNkcnlCcncpIGFzIChhOiBueSkgPT4gdm9pZFxyXG5leHBvcnQgY29uc3Qgc3JjRXhwQ29uc3ROeUJydyA9IGNvbXBvc2Uoc3JjRXhwQ29uc3ROeSwgbnlCcncpIGFzIChfc3JjOiBzcmMpID0+IHZvaWRcclxuZXhwb3J0IGNvbnN0IGZ0c0V4cENvbnN0TnlCcncgPSBjb21wb3NlKGZ0THksIHNyY0V4cENvbnN0TnlCcncpXHJcbmV4cG9ydCBjb25zdCBvQnJ3ID0gKG8sIGZkcj86IHMsIG5tPzogcyk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgcyA9IG9Kc29uTGluZXMobylcclxuICAgIHNqc29uQnJ3KHMsIGZkciwgbm0pXHJcbn1cclxuZXhwb3J0IGNvbnN0IG9CcndBc0V4cCA9IGNvbXBvc2Uob0FzRXhwLCBzQnJ3QXRGZHJGbignYXNFeHBlY3RlZEpzJywgJ2FzRXhwZWN0LmpzJykpIGFzIChhOiBvKSA9PiB2b2lkXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAtLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IGNockNkX2lzTm0gPSAoYzogbikgPT4gdHJ1ZVxyXG5leHBvcnQgY29uc3QgY2hyQ2QgPSAoczogcykgPT4gcy5jaGFyQ29kZUF0KDApXHJcbmV4cG9ydCBjb25zdCBjaHJDZF9hID0gY2hyQ2QoJ2EnKVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfeiA9IGNockNkKCd6JylcclxuZXhwb3J0IGNvbnN0IGNockNkX0EgPSBjaHJDZCgnQScpXHJcbmV4cG9ydCBjb25zdCBjaHJDZF9aID0gY2hyQ2QoJ1onKVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfMCA9IGNockNkKCcwJylcclxuZXhwb3J0IGNvbnN0IGNockNkXzkgPSBjaHJDZCgnOScpXHJcbmV4cG9ydCBjb25zdCBjaHJDZF9kb2xsYXIgPSBjaHJDZCgnJCcpXHJcbmV4cG9ydCBjb25zdCBjaHJDZF91bmRlclNjb3JlID0gY2hyQ2QoJ18nKVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfaXNTbWFsbExldHRlciA9IHZCRVQoY2hyQ2RfYSwgY2hyQ2RfeilcclxuZXhwb3J0IGNvbnN0IGNockNkX2lzQ2FwaXRhbExldHRlciA9IHZCRVQoY2hyQ2RfQSwgY2hyQ2RfWilcclxuZXhwb3J0IGNvbnN0IGNockNkX2lzTGV0dGVyID0gcHJlZHNPcihjaHJDZF9pc1NtYWxsTGV0dGVyLCBjaHJDZF9pc0NhcGl0YWxMZXR0ZXIpXHJcbmV4cG9ydCBjb25zdCBjaHJDZF9pc0RpZ2l0ID0gdkJFVChjaHJDZF8wLCBjaHJDZF85KVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfaXNEb2xsYXIgPSB2RVEoY2hyQ2RfZG9sbGFyKVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfaXNVbmRlclNjb3JlID0gdkVRKGNockNkX3VuZGVyU2NvcmUpXHJcbmV4cG9ydCBjb25zdCBjaHJDZF9pc0ZzdE5tQ2hyID0gcHJlZHNPcihjaHJDZF9pc0xldHRlciwgY2hyQ2RfaXNVbmRlclNjb3JlLCBjaHJDZF9pc0RvbGxhcikgYXMgcHJlZDxuPlxyXG5leHBvcnQgY29uc3QgY2hyQ2RfaXNObUNociA9IHByZWRzT3IoY2hyQ2RfaXNGc3RObUNociwgY2hyQ2RfaXNEaWdpdClcclxuZXhwb3J0IGNvbnN0IHNzZXRTcnRCcncgPSAoYTogc3NldCkgPT4gcGlwZShhKShpdHJBeSwgYXlTcnQsIGx5QnJ3KVxyXG5leHBvcnQgY29uc3Qgc3NldFN5ID0gKF9zc2V0OiBzc2V0KTogc3kgPT4gc2V0QXkoX3NzZXQpXHJcbmV4cG9ydCBjb25zdCBzc2V0QWRkUGZ4QXNMaW4gPSAoX3BmeDogcykgPT4gKF9zc2V0OiBzc2V0KSA9PiBfcGZ4ICsgKF9wZnggPyAnICcgOiAnJykgKyBzc2V0TGluKF9zc2V0KVxyXG5leHBvcnQgY29uc3Qgc3NldExpbiA9IChfc3NldDogc2V0KSA9PiBzZXRBeShfc3NldCkuam9pbignICcpXHJcbmV4cG9ydCBjb25zdCBzc2V0QnJ3ID0gKF9zc2V0OiBzc2V0KSA9PiBwaXBlKF9zc2V0KShpdHJBeSwgc0JydylcclxuZXhwb3J0IGNvbnN0IGxpbkV4cENvbnN0Tm0gPSAoYTogbGluKSA9PiB7XHJcbiAgICBjb25zdCBtID0gYS5tYXRjaChyZUV4cENvbnN0Tm0pXHJcbiAgICBpZiAobSA9PT0gbnVsbClcclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgcmV0dXJuIG1bMV1cclxufVxyXG5leHBvcnQgY29uc3Qgbm9kZU1kU2V0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgejogU2V0PE5vZGVNb2R1bGU+ID0gbmV3IFNldCgpXHJcbiAgICBjb25zdCBfcHVzaENoaWxkcmVuID0gKG06IE5vZGVNb2R1bGUpID0+IHtcclxuICAgICAgICBsZXQgYzogTm9kZU1vZHVsZVxyXG4gICAgICAgIGZvciAoYyBvZiBtLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGlmICghei5oYXMoYykpIHtcclxuICAgICAgICAgICAgICAgIHouYWRkKGMpXHJcbiAgICAgICAgICAgICAgICBfcHVzaENoaWxkcmVuKGMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfcHVzaENoaWxkcmVuKG1vZHVsZSlcclxuICAgIHJldHVybiB6XHJcbn1cclxuY29uc3QgeCA9IChhOiBOb2RlTW9kdWxlKSA9PiB7XHJcbiAgICBjb25zdCBheSA9IG9QcnBOeShhLmV4cG9ydHMpXHJcbiAgICBjb25zdCB6OiBkcnkgPSBbXVxyXG4gICAgY29uc3QgaWQgPSBhLmlkXHJcbiAgICBmb3IgKGxldCBubSBvZiBheSkge1xyXG4gICAgICAgIGNvbnN0IGl0bSA9IGEuZXhwb3J0c1tubV1cclxuICAgICAgICBjb25zdCB0eSA9IHR5cGVvZiBpdG1cclxuICAgICAgICAvL2NvbnN0IGZ1bk5tID0gdHk9PT0nZnVuY3Rpb24nP2l0bS5uYW1lOicnXHJcbiAgICAgICAgY29uc3QgbSA9IFtubSwgdHlwZW9mIGl0bSwgaWRdXHJcbiAgICAgICAgei5wdXNoKG0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gelxyXG59XHJcbmV4cG9ydCBjb25zdCBkcnNvZl9leHBvcnRGdW5jdGlvbnMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBmbnkgPSBbJ25hbWUnLCAndHlwZScsICdpZCddXHJcbiAgICBsZXQgZHJ5OiBkcnkgPSBbXVxyXG4gICAgbGV0IG1kOiBOb2RlTW9kdWxlXHJcbiAgICBjb25zdCBtc2V0ID0gbm9kZU1kU2V0KClcclxuICAgIGZvciAobWQgb2YgbXNldCkge1xyXG4gICAgICAgIGRyeSA9IGRyeS5jb25jYXQoeChtZCkpXHJcbiAgICB9XHJcbiAgICBkcnkgPSBkcnlTcnRDb2woWzIsIDBdKShkcnkpXHJcbiAgICBjb25zdCB6OiBkcnMgPSB7IGZueSwgZHJ5IH1cclxuICAgIHJldHVybiB6XHJcbn1cclxuZXhwb3J0IGNsYXNzIERyeSB7XHJcbiAgICBkcnk6IGRyeVxyXG4gICAgcHJpdmF0ZSBfY3VyQ29sOiBuXHJcbiAgICBjb25zdHJ1Y3RvcihhOiBkcnkpIHtcclxuICAgICAgICB0aGlzLmRyeSA9IGFcclxuICAgICAgICB0aGlzLl9jdXJDb2wgPSAwXHJcbiAgICB9XHJcbiAgICBnZXQgY3VyQ29sKCkgeyByZXR1cm4gdGhpcy5fY3VyQ29sIH1cclxuICAgIHNldCBjdXJDb2wobjogbikgeyB0aGlzLl9jdXJDb2wgPSBuIH1cclxuICAgIGdldCBjb2xDbnQoKSB7IHJldHVybiBpdHJNYXgoaXRyTWFwKHZMZW4pKHRoaXMuZHJ5KSkgYXMgbiB9XHJcbiAgICBnZXQgbHkoKSB7IHJldHVybiBzZHJ5THkodGhpcy5zZHJ5KSB9XHJcbiAgICBnZXQgbGluZXMoKSB7IHJldHVybiBzZHJ5TGluZXModGhpcy5zZHJ5KSB9XHJcbiAgICBnZXQgY29sKCkgeyByZXR1cm4gaXRyTWFwKGF5RWxlT3JEZnQoJycpKHRoaXMuY3VyQ29sKSkodGhpcy5kcnkpIH1cclxuICAgIGdldCBzZHJ5KCkgeyByZXR1cm4gaXRyTWFwKGF5U3kpKHRoaXMuZHJ5KSBhcyBzZHJ5IH1cclxuICAgIHNldEN1ckNvbChuOiBuKSB7IHRoaXMuY3VyQ29sID0gbjsgcmV0dXJuIHRoaXMgfVxyXG4gICAgbWR5QWxsQ2VsbChmOiBmKSB7IGl0ckVhY2goYXlNZHkoZikpKHRoaXMuZHJ5KSB9XHJcbiAgICAvL2Nsb25lKCkgeyByZXR1cm4gbmV3IERyeShpdHJNYXAoZHIgPT4gaXRyQ2xvbmUoZHIpKHRoaXMuZHJ5KSl9XHJcbiAgICBtZHlDb2woZjogZiwgY29sSXg6IG4pIHsgaXRyRWFjaChheU1keUVsZShjb2xJeCkoZikpKHRoaXMuZHJ5KSB9XHJcbiAgICBicncoKSB7IHNCcncodGhpcy5saW5lcykgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBkcnkgPSAoYTogZHJ5KSA9PiBuZXcgRHJ5KGEpXHJcbiJdfQ==