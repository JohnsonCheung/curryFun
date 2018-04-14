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
exports.sRmvPfx = (pfx) => (a) => exports.sHasPfx(pfx)(a) ? a.substr(a.length) : a;
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
exports.lazy = vf => { let v, done = false; return () => { if (!done) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycnlmdW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjdXJyeWZ1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdEQUFnRDtBQUNoRCw2Q0FBNkM7QUFDN0MsOENBQThDO0FBQzlDLCtDQUErQztBQUMvQyx5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QiwwQkFBMEI7QUFDMUIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUMsa0NBQWtDO0FBQ25FLG1EQUFtRDtBQUN0QyxRQUFBLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUM3QixJQUFJLENBQUM7UUFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxNQUFNLENBQUMsS0FBSyxDQUFBO0lBQ2hCLENBQUM7QUFDTCxDQUFDLENBQUE7QUFDWSxRQUFBLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUN2QyxRQUFBLElBQUksR0FBRyxDQUFDLEdBQU0sRUFBRSxHQUFNLEVBQVEsRUFBRTtJQUN6QyxtQkFBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQyxtQkFBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQyxRQUFRLENBQUE7QUFDWixDQUFDLENBQUE7QUFDWSxRQUFBLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQVEsRUFBRTtJQUNuQyxFQUFFLENBQUMsQ0FBQyxjQUFNLENBQUMsR0FBRyxDQUFDLElBQUksY0FBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNkLFFBQVEsQ0FBQTtZQUNSLE1BQU0sQ0FBQTtRQUNWLENBQUM7SUFDTCxDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsYUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN6QixtQkFBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMvQixtQkFBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMvQixRQUFRLENBQUE7QUFDWixDQUFDLENBQUE7QUFDWSxRQUFBLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZFLFFBQUEsYUFBYSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEYsMkVBQTJFO0FBQzlELFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3JCLFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3RCLFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3RCLFFBQUEsR0FBRyxHQUFHLENBQUksQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNwQyxRQUFBLEdBQUcsR0FBRyxDQUFJLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDcEMsUUFBQSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDckIsUUFBQSxHQUFHLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3RGLFFBQUEsTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxRQUFBLElBQUksR0FBRyxDQUFJLENBQUksRUFBRSxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDcEQsUUFBQSxPQUFPLEdBQUcsQ0FBSSxDQUFJLEVBQUUsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3JELFFBQUEsYUFBYSxHQUFHLENBQUksQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUM1RCxRQUFBLEtBQUssR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDL0QsUUFBQSxLQUFLLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDM0UsdUNBQXVDO0FBQzFCLFFBQUEsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQU0sRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDL0UsUUFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzFCLFFBQUEsUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM5QixRQUFBLElBQUksR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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QUFLLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQy9GLFFBQUEsYUFBYSxHQUFHLENBQUMsS0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRSxDQUFDLFlBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDOUUsUUFBQSxLQUFLLEdBQUcsQ0FBSSxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMzQixRQUFBLEtBQUssR0FBRyxDQUFJLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzNCLFFBQUEsS0FBSyxHQUFHLENBQUksRUFBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZDLFFBQUEsVUFBVSxHQUFHLENBQUksR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLFlBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNuRSxRQUFBLEtBQUssR0FBRyxDQUFJLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNyQyxRQUFBLFFBQVEsR0FBRyxDQUFJLEVBQUssRUFBRSxFQUFFLENBQUMsQ0FB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USxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFNLENBQUE7QUFDekYsUUFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7QUFDekIsUUFBQSxLQUFLLEdBQUcsQ0FBQyxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDeEQsUUFBQSxJQUFJLEdBQUcsQ0FBQyxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzFDLFFBQUEsS0FBSyxHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDMUMsUUFBQSxLQUFLLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtBQUMxQixRQUFBLE1BQU0sR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRTtJQUNyQyxNQUFNLENBQUMsR0FBRyxZQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7SUFDckIsTUFBTSxDQUFDLENBQUMsQ0FB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QUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNiLE1BQU0sQ0FBQyxHQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUMxQixNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ1osQ0FBQyxDQUFBO0FBQ1ksUUFBQSxPQUFPLEdBQUcsQ0FBQyxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2pELFFBQUEsT0FBTyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMvQyxRQUFBLE9BQU8sR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN4RixRQUFBLE9BQU8sR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN4RSxRQUFBLG1CQUFtQixHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtBQUN6RixRQUFBLG1CQUFtQixHQUFHLENBQUMsR0FBTSxFQUFFLEVB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LENBQUM7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFBO0lBQzFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7QUFDYixDQUFDLENBQUE7QUFDRCxvRUFBb0U7QUFDdkQsUUFBQSxNQUFNLEdBQUcsQ0FBQyxFQUFLLEVBQUUsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsWUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzFHLFFBQUEsS0FBSyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEdBQUcsZUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsYUFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBTSxDQUFDLEVBQUUsRUFBRSxZQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNwSSxRQUFBLEtBQUssR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQU0sQ0FBQyxFQUFFLEVBQUUsWUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDcEksUUFBQSxJQUFJLEdBQUcsQ0FBQyxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsR0FBRyxlQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBTSxDQUFDLEVBQUUsRUFBRSxZQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUM1RixRQUFBLFdBQVcsR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFO0lBQ2hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUE7SUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFBO0lBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUMzRCxJQUFJLENBQUMsR0FBRyxlQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUE7SUFDdkMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLGNBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDeEMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFBO0FBQ3JCLENBQUMsQ0FBQTtBQUNZLFFBQUEsTUFBTSxHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFO0lBQ3JDLElBQUksRUFBRSxHQUFHLG1CQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQztRQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQUMsQ0FBQztJQUFBLENBQUM7QUFDaEYsQ0FBQyxDQUFBO0FBQ0QseUVBQXlFO0FBQzVELFFBQUEsT0FBTyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsZ0JBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7QUFDbkQsUUFBQSxPQUFPLEdBQUcsQ0FBQyxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxnQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtBQUNoRSx5RUFBeUU7QUFDNUQsUUFBQSxRQUFRLEdBQUcsQ0FBQyxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsR0FBRyxlQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUN4SSxRQUFBLFFBQVEsR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3hJLFFBQUEsT0FBTyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEdBQUcsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNuRyxRQUFBLFVBQVUsR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLGdCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0FBQ3RELFFBQUEsVUFBVSxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsZ0JBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7QUFDbkUseUVBQXlFO0FBQzVELFFBQUEsVUFBVSxHQUFHLFlBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNwQixRQUFBLFVBQVUsR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsYUFBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDN0MsUUFBQSxXQUFXLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxhQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN4RCxRQUFBLFVBQVUsR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNoRyxRQUFBLFNBQVMsR0FBRyxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzNCLFFBQUEsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7QUFDakIsUUFBQSxhQUFhLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRTtJQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDUCxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ1osTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDN0IsQ0FBQyxDQUFBO0FBQ1ksUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFNLEVBQU8sRUFBRTtJQUNsQyxNQUFNLEtBQUssR0FBRyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3pCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNYLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxHQUFHLGNBQU0sQ0FBQTtBQUN0QyxDQUFDLENBQUE7QUFDWSxRQUFBLFFBQVEsR0FBRyxDQUFDLENBQU0sRUFBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUNoRCxRQUFBLE1BQU0sR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsZ0JBQVEsQ0FBQyxZQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdEQsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLHFCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDOUYsUUFBQSxLQUFLLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLHFCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDM0YsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENB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QVMsRUFBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQVEsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDdkgsUUFBQSxVQUFVLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3hHLFFBQUEsTUFBTSxHQUFHLENBQU8sQ0FBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztJQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzVJLFFBQUEsT0FBTyxHQUFHLENBQUksQ0FBd0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENB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QUFDLENBQUMsQ0FBQTtBQUMzQyxRQUFBLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDOUMsUUFBQSxRQUFRLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDN0IsUUFBQSxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztJQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzVFLFFBQUEsU0FBUyxHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFO0lBQzFDLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDO0lBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDN0QsQ0FBQyxDQUFBO0FBQ0QsNkVBQTZFO0FBQ2hFLFFBQUEsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksR0FBRyxFQUFRLENBQUE7QUFDL0IsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFLLEVBQUUsRUFBRTtJQUM1QixNQUFNLENBQUMsR0FBRyxlQUFPLEVBQUUsQ0FBQTtJQUNuQixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtRQUNkLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsR0FBRyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzNDLE1B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QyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDM0YsUUFBQSxnQkFBZ0IsR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDbEcsUUFBQSxpQkFBaUIsR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ2xHLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3BHLFFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNsRyxRQUFBLGtCQUFrQixHQUFHLENBQUksQ0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFO0lBQ25FLE1BQU0sQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLEdBQVEsRUFBRSxDQUFDO0lBQy9CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUE7QUFDbkIsQ0FBQyxDQUFBO0FBQ1ksUUFBQSxLQUFLLEdBQUcsQ0FBSSxDQUFTLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3JGLFFBQUEsTUFBTSxHQUFHLENBQUksQ0FBUyxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNyRSxRQUFBLE1BQU0sR0FBRyxDQUFJLENBQVMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUMzRixRQUFBLFlBQVksR0FBRyxDQUFDLEdBQU0sRUFBRSxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsa0JBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQVEsQ0FBQTtBQUNyRixRQUFBLFNBQVMsR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLGNBQU0sQ0FBQyxlQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQVEsQ0FBQTtBQUNsRSxRQUFBLFNBQVMsR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLGNBQU0sQ0FBQyxlQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQVEsQ0FBQTtBQUNsRSxRQUFBLE1BQU0sR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsWUFBSSxDQUFDLGNBQU0sQ0FBQyxZQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQU0sQ0FBTSxDQUFBO0FBQ3ZELFFBQUEsT0FBTyxHQUFHLENBQUMsQ0FBTyxFQUFFLEVBQUUsQ0FBQyxZQUFJLENBQUMsY0FBTSxDQUFDLFlBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBTSxDQUFNLENBQUE7QUFDekQsUUFBQSxTQUFTLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLGNBQU0sQ0FBQyxlQUFPLENBQUMsY0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQVEsQ0FBQTtBQUM1RCxRQUFBLFFBQVEsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsY0FBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFPLENBQUE7QUFDOUMsUUFBQSxPQUFPLEdBQUcsQ0FBSSxDQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNwRyxRQUFBLFNBQVMsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUFDLENBQUM7SUFBQyxJQUFJO1FBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDakksUUFBQSxTQUFTLEdBQUcsQ0FBSSxDQUFTLEVBQUUsRUFBRTtJQUN0QyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBSyxDQUFBO0lBQ3hCLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFLLENBQUE7SUFDdEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDWixJQUFJO1lBQ0EsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ1osQ0FBQyxDQUFBO0FBQ1ksUUFBQSxNQUFNLEdBQUcsQ0FBSSxDQUFTLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLGNBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7SUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzFILFFBQUEsTUFBTSxHQUFHLENBQUksQ0FBUyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxjQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDO0lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUMxSCxRQUFBLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDekIsUUFBQSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsY0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3RDLDJGQUEyRjtBQUM5RSxRQUFBLElBQUksR0FBRyxDQUFDLENBQUksRUFBSyxFQUFFO0lBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLFNBQVMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxFQUFF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LENBQU0sRUFBRSxFQUFFLENBQUMsY0FBTSxDQUFDLGtCQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNuRSxRQUFBLFNBQVMsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsY0FBTSxDQUFDLGNBQU0sQ0FBQyxZQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBTSxDQUFBO0FBQ3BELFFBQUEsVUFBVSxHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsZUFBTyxDQUFDLGFBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzNELFFBQUEsUUFBUSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsQ0FBQyxFQUFNLEVBQUUsRUFBRSxDQUFDLGdCQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQVEsQ0FBQTtBQUNqRSxRQUFBLFNBQVMsR0FBRyxDQUFDLEtBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxlQUFPLENBQUMsZ0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ2xGLFFBQUEsU0FBUyxHQUFHLENBQUMsQ0FBTyxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQy9DLFFBQUEsUUFBUSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsY0FBTSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUss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QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQy9GLFFBQUEsUUFBUSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxNQUFNLEVBQUUsR0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUlwSCxDQUFDO0lBQ0csTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxZQUFZLENBQUM7UUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUMsQ0FBQTtJQUNsRixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLGNBQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsNENBQTRDO0lBQ2hKLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDdkUsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7UUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtJQUM1RyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxZQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUE7SUFDcEUsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUMzQyxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLGNBQWMsQ0FBQztRQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFBO0lBQ3ZGLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDeEUsWUFBSSxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxF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QUMsQ0FBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUM7SUFDaEQsVUFBVSxDQUFDLENBQUksSUFBSSxlQUFPLENBQUMsYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNoRCxnRUFBZ0U7SUFDaEUsTUFBTSxDQUFDLENBQUksRUFBRSxLQUFRLElBQUksZUFBTyxDQUFDLGdCQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ2hFLEdBQUcsS0FBSyxZQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQztDQUM3QjtBQW5CRCxrQkFtQkM7QUFDWSxRQUFBLEdBQUcsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi90eXBpbmdzL25vZGUvbm9kZS5kLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi90eXBpbmdzL2NvbW1vbi5kLnRzXCIvPlxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmltcG9ydCAqIGFzIGNoaWxkX3Byb2Nlc3MgZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0ICogYXMgb3MgZnJvbSAnb3MnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgKiBhcyB1IGZyb20gJ3V0aWwnO1xyXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKSAvL2ltcG9ydCAqIGFzIGFzc2VydCBmcm9tICdhc3NlcnQnXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgaXNFcSA9IChleHAsIGFjdCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdCwgZXhwKVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IGlzTm90RXEgPSAoZXhwLCBhY3QpID0+ICFpc0VxKGV4cCwgYWN0KVxyXG5leHBvcnQgY29uc3Qgc0NtcCA9IChleHA6IHMsIGFjdDogcyk6IHZvaWQgPT4ge1xyXG4gICAgc0Jyd0F0RmRyRm4oJ3N0ckNtcCcsICdleHAnKShleHApXHJcbiAgICBzQnJ3QXRGZHJGbignc3RyQ21wJywgJ2FjdCcpKGFjdClcclxuICAgIGRlYnVnZ2VyXHJcbn1cclxuZXhwb3J0IGNvbnN0IHZDbXAgPSAoZXhwLCBhY3QpOiB2b2lkID0+IHtcclxuICAgIGlmIChpc0Jvb2woZXhwKSAmJiBpc0Jvb2woYWN0KSkge1xyXG4gICAgICAgIGlmIChhY3QgIT09IGV4cCkge1xyXG4gICAgICAgICAgICBkZWJ1Z2dlclxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaXNTdHIoZXhwKSAmJiBpc1N0cihhY3QpKVxyXG4gICAgICAgIHJldHVybiBzQ21wKGV4cCwgYWN0KVxyXG4gICAgb0Jyd0F0RmRyRm4oJ3ZDbXAnLCAnZXhwJykoZXhwKVxyXG4gICAgb0Jyd0F0RmRyRm4oJ3ZDbXAnLCAnYWN0JykoYWN0KVxyXG4gICAgZGVidWdnZXJcclxufVxyXG5leHBvcnQgY29uc3QgYXNzZXJ0SXNFcSA9IChleHAsIGFjdCkgPT4gaXNOb3RFcShleHAsIGFjdCkgPyB2Q21wKGV4cCwgYWN0KSA6IHZvaWQgMDtcclxuZXhwb3J0IGNvbnN0IGFzc2VydElzTm90RXEgPSAoZXhwLCBhY3QpID0+IGlzRXEoZXhwLCBhY3QpID8gdkNtcChleHAsIGFjdCkgOiB2b2lkIDA7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgdkxUID0geCA9PiBhID0+IGEgPCB4XHJcbmV4cG9ydCBjb25zdCB2R0UgPSB4ID0+IGEgPT4gYSA+PSB4XHJcbmV4cG9ydCBjb25zdCB2TEUgPSB4ID0+IGEgPT4gYSA8PSB4XHJcbmV4cG9ydCBjb25zdCB2RVEgPSA8VD4oeDogVCkgPT4gKGE6IFQpID0+IGEgPT09IHhcclxuZXhwb3J0IGNvbnN0IHZORSA9IDxUPih4OiBUKSA9PiAoYTogVCkgPT4gYSAhPT0geFxyXG5leHBvcnQgY29uc3QgdkdUID0geCA9PiBhID0+IGEgPiB4XHJcbmV4cG9ydCBjb25zdCB2SU4gPSAoaXRyOiBpdHIpID0+IGEgPT4geyBmb3IgKGxldCBpIG9mIGl0cikgaWYgKGkgPT09IGEpIHJldHVybiB0cnVlOyByZXR1cm4gZmFsc2UgfVxyXG5leHBvcnQgY29uc3Qgdk5vdEluID0gaXRyID0+IGEgPT4gIXZJTihpdHIpKGEpXHJcbmV4cG9ydCBjb25zdCB2QkVUID0gPFQ+KHg6IFQsIHk6IFQpID0+IChhOiBUKSA9PiB4IDw9IGEgJiYgYSA8PSB5XHJcbmV4cG9ydCBjb25zdCB2Tm90QmV0ID0gPFQ+KHg6IFQsIHk6IFQpID0+IChhOiBUKSA9PiAhdkJFVCh4LCB5KShhKVxyXG5leHBvcnQgY29uc3QgdklzSW5zdGFuY2VPZiA9IDxUPih4OiBGdW5jdGlvbikgPT4gKGE6IFQpID0+IGEgaW5zdGFuY2VvZiB4XHJcbmV4cG9ydCBjb25zdCBlbnNTeSA9IChhOiBzIHwgc3kpID0+IHR5cGVvZiBhID09PSAnc3RyaW5nJyA/IHNTcGxpdFNwYyhhKSA6IGFcclxuZXhwb3J0IGNvbnN0IGVuc1JlID0gKGE6IHMgfCByZSkgPT4gYSBpbnN0YW5jZW9mIFJlZ0V4cCA/IGEgOiBuZXcgUmVnRXhwKGEpXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgcGlwZSA9IHYgPT4gKC4uLmY6IGZbXSkgPT4geyBsZXQgbyA9IHY7IGZvciAobGV0IGZmIG9mIGYpIG8gPSBmZihvKTsgcmV0dXJuIG8gfVxyXG5leHBvcnQgY29uc3Qgdk1hcCA9IChmOiBmKSA9PiBhID0+IGYoYSlcclxuZXhwb3J0IGNvbnN0IGZ1bkFwcGx5ID0gdiA9PiAoYTogZikgPT4gYSh2KVxyXG5leHBvcnQgY29uc3Qgc3dhcCA9IChmOiBmKSA9PiBhID0+IGIgPT4gZihiKShhKVxyXG5leHBvcnQgY29uc3QgY29tcG9zZSA9ICguLi5mOiBmW10pID0+IHYgPT4gcGlwZSh2KSguLi5mKVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IGRpY0x5ID0gPFQ+KGE6IGRpYzxUPikgPT4gaXRyTWFwKGt2TGluKShhKSBhcyBzW11cclxuZXhwb3J0IGNvbnN0IGRpY0xpbmVzID0gPFQ+KGE6IGRpYzxUPikgPT4gZGljTHkoYSkuam9pbignXFxyXFxuJylcclxuZXhwb3J0IGNvbnN0IGt2TGluID0gKFtrLCB2XToga3YpID0+IGsgKyAnICcgKyB2XHJcbmV4cG9ydCBjb25zdCBkbXAgPSBnbG9iYWwuY29uc29sZS5sb2dcclxuZXhwb3J0IGNvbnN0IGZ1bkRtcCA9IChmOiBGdW5jdGlvbikgPT4gZG1wKGYudG9TdHJpbmcoKSlcclxuZXhwb3J0IGNvbnN0IGhhbHQgPSAoKSA9PiB7IHRocm93IG5ldyBFcnJvcigpIH1cclxuZXhwb3J0IGNvbnN0IHNFc2NMZiA9IChhOiBzKSA9PiBhLnJlcGxhY2UoJ1xcbicsICdcXFxcbicpXHJcbmV4cG9ydCBjb25zdCBzRXNjVmJhciA9IChhOiBzKSA9PiBhLnJlcGxhY2UoL1xcfC9nLCAnXFxcXHYnKVxyXG5leHBvcnQgY29uc3Qgc0VzY0NyID0gKGE6IHMpID0+IGEucmVwbGFjZSgvXFxyL2csICdcXFxccicpXHJcbmV4cG9ydCBjb25zdCBzRXNjVGFiID0gKGE6IHMpID0+IGEucmVwbGFjZSgvXFx0L2csICdcXFxcdCcpXHJcbmV4cG9ydCBjb25zdCBzRXNjOiAoKGE6IHMpID0+IHMpID0gY29tcG9zZShzRXNjTGYsIHNFc2NDciwgc0VzY1RhYilcclxuZXhwb3J0IGNvbnN0IHNGbXQgPSAocXFTdHI6IHMsIC4uLnYpID0+IHtcclxuICAgIGxldCB6ID0gcXFTdHJcclxuICAgIGZvciAobGV0IGkgb2Ygdikge1xyXG4gICAgICAgIHogPSB6LnJlcGxhY2UoJz8nLCBpKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5leHBvcnQgY29uc3Qgc0JveCA9IChhOiBzKSA9PiB7IGNvbnN0IHkgPSBcIj09IFwiICsgc0VzYyhhKSArIFwiID09XCIsIHggPSBcIj1cIi5yZXBlYXQoYS5sZW5ndGggKyA2KTsgcmV0dXJuIFt4LCB5LCB4XS5qb2luKFwiXFxyXFxuXCIpIH1cclxuZXhwb3J0IGNvbnN0IHN0YWNrID0gKCkgPT4geyB0cnkgeyB0aHJvdyBuZXcgRXJyb3IoKSB9IGNhdGNoIChlKSB7IGxldCB6OiBzID0gZS5zdGFjazsgcmV0dXJuIHogfSB9XHJcbmV4cG9ydCBjb25zdCBlciA9IChtc2c6IHMsIC4uLnYpID0+IHtcclxuICAgIGxldCBhID0gc3RhY2soKVxyXG4gICAgbGV0IGIgPSBhLnNwbGl0KC9cXG4vKVxyXG4gICAgbGV0IGMgPSBiWzNdXHJcbiAgICBsZXQgZCA9IGMuc3BsaXQoL1xccysvKVxyXG4gICAgbGV0IGJyZWFraW5nRnVuTm0gPSBkWzJdXHJcbiAgICBsZXQgaGRyID0gc0JveChicmVha2luZ0Z1bk5tKVxyXG4gICAgZG1wKGhkcilcclxuICAgIGRtcChgZXJyb3JbJHttc2d9XSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5gKVxyXG4gICAgaXRyRWFjaChkbXApKHYpXHJcbiAgICBkbXAoYSlcclxuICAgIGRtcCgnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJylcclxuICAgIGxldCBkYmcgPSB0cnVlXHJcbiAgICBkZWJ1Z2dlclxyXG4gICAgLy8gICAgaWYgKGRiZylcclxuICAgIC8vICAgICAgICBoYWx0KClcclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBzU3BsaXQgPSAoc2VwOiBzT3JSZSkgPT4gKGE6IHMpID0+IGEuc3BsaXQoc2VwKVxyXG5leHBvcnQgY29uc3Qgc1JtdkNyID0gKGE6IHMpID0+IGEucmVwbGFjZSgvXFxyL2csICcnKVxyXG5leHBvcnQgY29uc3Qgc1NwbGl0TGluZXMgPSAoYTogbGluZXMpID0+IHNTcGxpdExmKHNSbXZDcihhKSlcclxuZXhwb3J0IGNvbnN0IHNTcGxpdFNwYyA9IChfczogcykgPT4gc1NwbGl0KC9cXHMrLykoX3MudHJpbSgpKVxyXG5leHBvcnQgY29uc3Qgc1NwbGl0Q3JMZiA9IHNTcGxpdCgnXFxyXFxuJylcclxuZXhwb3J0IGNvbnN0IHNTcGxpdExmID0gc1NwbGl0KCdcXG4nKVxyXG5leHBvcnQgY29uc3Qgc1NwbGl0Q29tbWFTcGMgPSBzU3BsaXQoLyxcXHMqLylcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgdkRmdCA9IDxUPihkZnQ6IFQpID0+IChhOiBUIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4gYSA9PT0gbnVsbCB8fCBhID09PSB1bmRlZmluZWQgPyBkZnQgOiBhXHJcbmV4cG9ydCBjb25zdCB2RGZ0U3RyID0gdkRmdChcIlwiKVxyXG5leHBvcnQgY29uc3QgdkRmdFVwcGVyID0gPFQ+KHg6IFQsIHk6IFQpID0+IChhOiBUIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4gYSA9PT0gbnVsbCB8fCBhID09PSB1bmRlZmluZWQgfHwgeCA+IGEgfHwgYSA+IHkgPyB5IDogYVxyXG5leHBvcnQgY29uc3QgdkRmdExvd2VyID0gPFQ+KHg6IFQsIHk6IFQpID0+IChhOiBUIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4gYSA9PT0gbnVsbCB8fCBhID09PSB1bmRlZmluZWQgfHwgeCA+IGEgfHwgYSA+IHkgPyB4IDogYVxyXG5leHBvcnQgY29uc3QgYXlGaW5kSXggPSAocDogcCkgPT4gKGE6IGF5KSA9PiB7IGZvciAobGV0IGkgaW4gYSkgaWYgKHAoYVtpXSkpIHJldHVybiBOdW1iZXIoaSk7IHJldHVybiBudWxsIH1cclxuZXhwb3J0IGNvbnN0IGF5RmluZEl4T3JEZnQgPSAoZGZ0SXg6IG4pID0+IChwOiBwKSA9PiAoYTogYXkpID0+IHZEZnQoZGZ0SXgpKGF5RmluZEl4KHApKGEpKVxyXG5leHBvcnQgY29uc3QgYXlGc3QgPSA8VD4oYTogVFtdKSA9PiBhWzBdXHJcbmV4cG9ydCBjb25zdCBheVNuZCA9IDxUPihhOiBUW10pID0+IGFbMV1cclxuZXhwb3J0IGNvbnN0IGF5RWxlID0gPFQ+KGl4OiBuKSA9PiAoYTogVFtdKSA9PiBhW2l4XVxyXG5leHBvcnQgY29uc3QgYXlFbGVPckRmdCA9IDxUPihkZnQ6IFQpID0+IChpeDogbikgPT4gKGE6IFRbXSkgPT4gdkRmdChkZnQpKGFbaXhdKVxyXG5leHBvcnQgY29uc3QgYXlMYXMgPSA8VD4oYTogVFtdKSA9PiBhW3ZMZW4oYSkgLSAxXVxyXG5leHBvcnQgY29uc3QgYXlTZXRFbGUgPSA8VD4oaXg6IG4pID0+ICh2OiBUKSA9PiAoYTogVFtdKSA9PiB7IGFbaXhdID0gdiB9XHJcbmV4cG9ydCBjb25zdCBheU1keUVsZSA9IDxUPihpeDogbikgPT4gKGY6IChhOiBUKSA9PiBUKSA9PiAoYTogVFtdKSA9PiB7IGFbaXhdID0gZihhW2l4XSkgfVxyXG5leHBvcnQgY29uc3QgYXlNZHkgPSA8VD4oZjogKGE6IFQpID0+IFQpID0+IChhOiBUW10pID0+XHJcbiAgICBlYWNoXHJcbiAgICAgICAgKChpdG0sIGl4KSA9PiB7IGlmIChpeCAhPT0gdW5kZWZpbmVkKSBhW2l4XSA9IGYoYVtpeF0pIH0pXHJcbiAgICAgICAgKG5JdHIoYS5sZW5ndGgpKVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBheUpuID0gKHNlcD86IHMpID0+IChhOiBheSkgPT4gYS5qb2luKHNlcClcclxuZXhwb3J0IGNvbnN0IGF5Sm5DckxmID0gYXlKbignXFxyXFxuJylcclxuZXhwb3J0IGNvbnN0IGF5Sm5MZiA9IGF5Sm4oJ1xcbicpXHJcbmV4cG9ydCBjb25zdCBheUpuU3BjID0gYXlKbignICcpXHJcbmV4cG9ydCBjb25zdCBheUpuQ29tbWEgPSBheUpuKCcsJylcclxuZXhwb3J0IGNvbnN0IGF5Sm5Db21tYVNwYyA9IGF5Sm4oJywgJylcclxuZXhwb3J0IGNvbnN0IG5TcGMgPSAoYTogbikgPT4gJyAnLnJlcGVhdChhKVxyXG5leHBvcnQgY29uc3QgYXlKbkFzTGluZXMgPSAoc2VwMD86IHMsIHRhYjA/OiBuLCB3ZHQwPzogbikgPT4gKGE6IGF5KSA9PiB7XHJcbiAgICBsZXQgd2R0ID0gdkRmdFVwcGVyKDIwLCAxMjApKHdkdDApXHJcbiAgICBsZXQgc2VwID0gdkRmdCgnJykoc2VwMClcclxuICAgIGxldCBzbGVuID0gc2VwLmxlbmd0aFxyXG4gICAgbGV0IHBmeCA9IG5TcGModkRmdCgwKSh0YWIwKSlcclxuICAgIGxldCB4ID0gKCgpID0+IHtcclxuICAgICAgICBjb25zdCBvbzogYXkgPSBbXVxyXG4gICAgICAgIGxldCBvOiBheSA9IFtdXHJcbiAgICAgICAgbGV0IHd3ID0gMFxyXG4gICAgICAgIGZvciAobGV0IHMgb2YgYSkge1xyXG4gICAgICAgICAgICBsZXQgbCA9IHNMZW4ocykgKyBzbGVuXHJcbiAgICAgICAgICAgIGlmICh3dyArIGwgPiB3ZHQpIHtcclxuICAgICAgICAgICAgICAgIG9vLnB1c2gocGZ4ICsgaXRyQWRkU2Z4KHNlcCkobykuam9pbihcIlwiKSlcclxuICAgICAgICAgICAgICAgIG8gPSBbXVxyXG4gICAgICAgICAgICAgICAgd3cgPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgby5wdXNoKHMpXHJcbiAgICAgICAgICAgIHd3ICs9IGxcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBvby5wdXNoKHBmeCArIGl0ckFkZFNmeChzZXApKG8pLmpvaW4oXCJcIikpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvb1xyXG4gICAgfSkoKVxyXG4gICAgbGV0IGIgPSBheUpuQ3JMZih4KVxyXG4gICAgcmV0dXJuIGJcclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBzRnN0Q2hyID0gKGE6IHMpID0+IGFbMF1cclxuZXhwb3J0IGNvbnN0IHNMYXNDaHIgPSAoYTogcykgPT4gYVthLmxlbmd0aCAtIDFdXHJcbmV4cG9ydCBjb25zdCBzQWRkUGZ4ID0gKHBmeDogcykgPT4gKGE6IHMpID0+IHBmeCArIGFcclxuZXhwb3J0IGNvbnN0IHNBZGRTZnggPSAoc2Z4OiBzKSA9PiBhID0+IGEgKyBzZnhcclxuZXhwb3J0IGNvbnN0IHNBZGRQZnhTZnggPSAocGZ4OiBzLCBzZng6IHMpID0+IChhOiBzKSA9PiBwZnggKyBhICsgc2Z4XHJcbmV4cG9ydCBjb25zdCB2TGVuID0gYSA9PiB0eXBlb2YgYSA9PT0gJ3N0cmluZycgPyBhLmxlbmd0aCA6ICgoYSAmJiBhLmxlbmd0aCkgfHwgU3RyaW5nKGEpLmxlbmd0aCkgYXMgblxyXG5leHBvcnQgY29uc3Qgc0xlbiA9IChhOiBzKSA9PiBhLmxlbmd0aFxyXG5leHBvcnQgY29uc3Qgc01pZE4gPSAocG9zOiBuKSA9PiAobjogbikgPT4gKGE6IHMpID0+IGEuc3Vic3RyKHBvcywgbilcclxuZXhwb3J0IGNvbnN0IHNNaWQgPSAocG9zOiBuKSA9PiAoYTogcykgPT4gYS5zdWJzdHIocG9zKVxyXG5leHBvcnQgY29uc3Qgc0xlZnQgPSAobjogbikgPT4gKGE6IHMpID0+IGEuc3Vic3RyKDAsIG4pXHJcbmV4cG9ydCBjb25zdCBzVHJpbSA9IChhOiBzKSA9PiBhLnRyaW0oKVxyXG5leHBvcnQgY29uc3Qgc1JpZ2h0ID0gKG46IG4pID0+IChhOiBzKSA9PiB7XHJcbiAgICBjb25zdCBsID0gdkxlbihhKVxyXG4gICAgaWYgKG4gPj0gbCkgcmV0dXJuIGFcclxuICAgIGlmICgwID49IG4pIHJldHVybiAnJ1xyXG4gICAgcmV0dXJuIGEuc3Vic3RyKC1uKVxyXG59XHJcbmV4cG9ydCBjb25zdCBuUGFkWmVybyA9IChkaWc6IG4pID0+IChhOiBuKSA9PiB7XHJcbiAgICBjb25zdCBzID0gU3RyaW5nKGEpXHJcbiAgICBjb25zdCBuWmVyID0gZGlnIC0gcy5sZW5ndGhcclxuICAgIGNvbnN0IHogPSBuWmVyID4gMCA/IFwiMFwiLnJlcGVhdChuWmVyKSA6IFwiXCJcclxuICAgIHJldHVybiB6ICsgc1xyXG59XHJcbmV4cG9ydCBjb25zdCBzQWxpZ25MID0gKHc6IHdkdCkgPT4gKGE6IHMpID0+IHtcclxuICAgIGlmIChhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG5TcGModylcclxuICAgIGNvbnN0IGwgPSB2TGVuKGEpXHJcbiAgICBpZiAobCA+IHcpIHJldHVybiBhXHJcbiAgICByZXR1cm4gYSArIG5TcGModyAtIGwpXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNBbGlnblIgPSAodzogd2R0KSA9PiAoYTogcykgPT4ge1xyXG4gICAgY29uc3QgbCA9IHNMZW4oYSlcclxuICAgIGlmIChsID4gdykgcmV0dXJuIGFcclxuICAgIHJldHVybiBuU3BjKHcgLSBsKSArIGFcclxufVxyXG5leHBvcnQgY29uc3Qgc1dydCA9IChmdDogcykgPT4gKGE6IHMpID0+IGZzLndyaXRlRmlsZVN5bmMoZnQsIGEpXHJcbmV4cG9ydCBjb25zdCBzU2JzUG9zID0gKHNiczogcykgPT4gKGE6IHMpID0+IGEuaW5kZXhPZihzYnMpXHJcbi8vc3RyaWN0RXF1YWwoc2JzUG9zKCdhYWJiJykoJzEyM2FhYmInKSwzKVxyXG5leHBvcnQgY29uc3Qgc1Nic1JldlBvcyA9IChzYnM6IHMpID0+IChhOiBzKSA9PiBhLmxhc3RJbmRleE9mKHNicylcclxuLy9zdHJpY3RFcXVhbChzYnNSZXZQb3MoJ2EnKSgnMDEyM2FhYmInKSw1KVxyXG5leHBvcnQgY29uc3QgY21sTm0gPSAoYTogY21sKSA9PiBjbWxOeShhKS5yZXZlcnNlKCkuam9pbignICcpIC8vIEBlZyBjbWxObShyZWxJdG1OeSkgPT09ICdOeSBJdG0gcmVsJ1xyXG5leHBvcnQgY29uc3QgY21sU3BjTm0gPSAoYTogY21sKSA9PiBjbWxOeShhKS5qb2luKCcgJylcclxuZXhwb3J0IGNvbnN0IGlzTm0gPSAoczogcykgPT4ge1xyXG4gICAgaWYgKHMgPT09IHVuZGVmaW5lZCB8fCBzID09PSBudWxsIHx8IHMgPT09ICcnKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKCFjaHJDZF9pc0ZzdE5tQ2hyKHMuY2hhckNvZGVBdCgwKSkpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWNockNkX2lzTm1DaHIocy5jaGFyQ29kZUF0KGkpKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59XHJcbmV4cG9ydCBjb25zdCBzUnBsTm9uTm1DaHIgPSAoYTogcykgPT4ge1xyXG4gICAgY29uc3QgYTE6IHNbXSA9IFtdXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBjID0gYS5jaGFyQ29kZUF0KGkpXHJcbiAgICAgICAgaWYgKGNockNkX2lzTm1DaHIoYykpXHJcbiAgICAgICAgICAgIGExLnB1c2goYVtpXSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGExLnB1c2goJyAnKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGExLmpvaW4oJycpXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNObVNldCA9IChhOiBzKSA9PiBuZXcgU2V0PHM+KHNScGxOb25ObUNocihhKS5zcGxpdCgvXFxzKy8pKVxyXG5jb25zdCBfaXNCcmtDaHJDZCA9IChjOiBuKSA9PiBjID09PSBOYU4gfHwgY2hyQ2RfaXNDYXBpdGFsTGV0dGVyKGMpIHx8IGNockNkX2lzVW5kZXJTY29yZShjKSB8fCBjaHJDZF9pc0RvbGxhcihjKVxyXG5jb25zdCBfaXNCcmsgPSAoYzogbiwgYzA6IG4pID0+IF9pc0Jya0NockNkKGMpICYmICFfaXNCcmtDaHJDZChjMClcclxuZXhwb3J0IGNvbnN0IGNtbE55ID0gKGE6IGNtbCkgPT4ge1xyXG4gICAgaWYgKCFpc05tKGEpKVxyXG4gICAgICAgIGVyKCdHaXZlIHtzfSBpcyBub3QgYSBuYW1lJywgeyBzOiBhIH0pXHJcbiAgICBjb25zdCBvOiBzW10gPSBbXVxyXG4gICAgbGV0IG0gPSAnJ1xyXG4gICAgZm9yIChsZXQgaSA9IGEubGVuZ3RoOyBpLS07IGkgPiAwKSB7XHJcbiAgICAgICAgY29uc3QgY2MgPSBhW2ldXHJcbiAgICAgICAgY29uc3QgYyA9IGEuY2hhckNvZGVBdChpKVxyXG4gICAgICAgIGNvbnN0IGMwID0gYS5jaGFyQ29kZUF0KGkgLSAxKVxyXG4gICAgICAgIG0gPSBjYyArIG1cclxuICAgICAgICBpZiAoX2lzQnJrKGMsIGMwKSkge1xyXG4gICAgICAgICAgICBvLnB1c2gobSlcclxuICAgICAgICAgICAgbSA9ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG0gIT09ICcnKVxyXG4gICAgICAgIG8ucHVzaChtKVxyXG4gICAgY29uc3Qgejogc1tdID0gby5yZXZlcnNlKClcclxuICAgIHJldHVybiB6XHJcbn1cclxuZXhwb3J0IGNvbnN0IHNIYXNQZnggPSAocGZ4OiBzKSA9PiAoYTogcykgPT4gYS5zdGFydHNXaXRoKHBmeClcclxuZXhwb3J0IGNvbnN0IHNIYXNTZnggPSAoc2Z4OiBzKSA9PiAoYTogcykgPT4gYS5lbmRzV2l0aChzZngpXHJcbmV4cG9ydCBjb25zdCBzUm12U2Z4ID0gKHNmeDogcykgPT4gKGE6IHMpID0+IHNIYXNTZngoc2Z4KShhKSA/IGEuc3Vic3RyKDAsIGEubGVuZ3RoIC0gc2Z4Lmxlbmd0aCkgOiBhXHJcbmV4cG9ydCBjb25zdCBzUm12UGZ4ID0gKHBmeDogcykgPT4gKGE6IHMpID0+IHNIYXNQZngocGZ4KShhKSA/IGEuc3Vic3RyKGEubGVuZ3RoKSA6IGFcclxuZXhwb3J0IGNvbnN0IHNIYXNQZnhfSUdOT1JFX0NBU0UgPSAocGZ4OiBzKSA9PiAoYTogcykgPT4gYS50b1VwcGVyQ2FzZSgpLnN0YXJ0c1dpdGgocGZ4LnRvVXBwZXJDYXNlKCkpXHJcbmV4cG9ydCBjb25zdCBzSGFzU2Z4X0lHTk9SRV9DQVNFID0gKHNmeDogcykgPT4gKGE6IHMpID0+IGEudG9VcHBlckNhc2UoKS5lbmRzV2l0aChzZngudG9VcHBlckNhc2UoKSlcclxuZXhwb3J0IGNvbnN0IHNSbXZQZnhfSUdOT1JFX0NBU0UgPSAocGZ4OiBzKSA9PiAoYTogcykgPT4gc0hhc1BmeChwZngpKGEpID8gYS5zdWJzdHIocGZ4Lmxlbmd0aCkgOiBhXHJcbmV4cG9ydCBjb25zdCBzUm12U2Z4X0lHTk9SRV9DQVNFID0gKHNmeDogcykgPT4gKGE6IHMpID0+IHNIYXNTZngoc2Z4KShhKSA/IGEuc3Vic3RyKDAsIGEubGVuZ3RoIC0gc2Z4Lmxlbmd0aCkgOiBhXHJcblxyXG5leHBvcnQgY29uc3Qgc0hhc1BmeElnbkNhcyA9IHNIYXNQZnhfSUdOT1JFX0NBU0VcclxuXHJcbmV4cG9ydCBjb25zdCBzTWF0Y2ggPSAocmU6IHJlKSA9PiAoYTogcykgPT4gYS5tYXRjaChyZSlcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgcHJlZE5vdDogKChhOiBwKSA9PiBwKSA9IGEgPT4gdiA9PiAhYSh2KVxyXG5leHBvcnQgY29uc3QgcHJlZHNPcjogKCguLi5hOiBwW10pID0+IHApID0gKC4uLmEpID0+IHYgPT4geyBmb3IgKGxldCBwIG9mIGEpIGlmIChwKHYpKSByZXR1cm4gdHJ1ZTsgcmV0dXJuIGZhbHNlIH1cclxuZXhwb3J0IGNvbnN0IHByZWRzQW5kOiAoKC4uLmE6IHBbXSkgPT4gcCkgPSAoLi4uYSkgPT4gdiA9PiB7IGZvciAobGV0IHAgb2YgYSkgaWYgKCFwKHYpKSByZXR1cm4gZmFsc2U7IHJldHVybiB0cnVlIH1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgaXNSbWtMaW4gPSAoYTogcykgPT4ge1xyXG4gICAgY29uc3QgbCA9IGEudHJpbSgpXHJcbiAgICBpZiAobCA9PT0gXCJcIikgcmV0dXJuIHRydWVcclxuICAgIGlmIChzSGFzUGZ4KFwiLS1cIikobCkpIHJldHVybiB0cnVlXHJcbiAgICByZXR1cm4gZmFsc2VcclxufVxyXG5leHBvcnQgY29uc3QgaXNOb25SbWtMaW46IHNQcmVkID0gcHJlZE5vdChpc1Jta0xpbilcclxuZXhwb3J0IGNvbnN0IGxpblJtdk1zZyA9IChhOiBsaW4pID0+IHtcclxuICAgIGNvbnN0IGExID0gYS5tYXRjaCgvKC4qKS0tLS8pXHJcbiAgICBjb25zdCBhMiA9IGExID09PSBudWxsID8gYSA6IGExWzFdXHJcbiAgICBpZiAoc0hhc1BmeChcIl5cIikoYTIudHJpbUxlZnQoKSkpIHJldHVybiBcIlwiXHJcbiAgICByZXR1cm4gYTJcclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3Qgc0Jya0F0ID0gKGF0OiBuLCBsZW46IG4pID0+IChhOiBzKSA9PiB7IHJldHVybiB7IHMxOiBzTGVmdChhdCkoYSkudHJpbSgpLCBzMjogc01pZChhdCArIGxlbikoYSkudHJpbSgpIH0gfVxyXG5leHBvcnQgY29uc3Qgc0JyazEgPSAoc2VwOiBzKSA9PiAoYTogcykgPT4geyBjb25zdCBhdCA9IHNTYnNQb3Moc2VwKShhKTsgcmV0dXJuIGF0ID09PSAtMSA/IHsgczE6IHNUcmltKGEpLCBzMjogJycgfSA6IHNCcmtBdChhdCwgc0xlbihzZXApKShhKSB9XHJcbmV4cG9ydCBjb25zdCBzQnJrMiA9IChzZXA6IHMpID0+IChhOiBzKSA9PiB7IGNvbnN0IGF0ID0gc1Nic1BvcyhzZXApKGEpOyByZXR1cm4gYXQgPT09IC0xID8geyBzMTogJycsIHMyOiBzVHJpbShhKSB9IDogc0Jya0F0KGF0LCBzTGVuKHNlcCkpKGEpIH1cclxuZXhwb3J0IGNvbnN0IHNCcmsgPSAoc2VwOiBzKSA9PiAoYTogcykgPT4geyBjb25zdCBhdCA9IHNTYnNQb3Moc2VwKShhKTsgcmV0dXJuIHNCcmtBdChhdCwgc0xlbihzZXApKShhKSB9XHJcbmV4cG9ydCBjb25zdCBxdW90ZVN0ckJyayA9IChhOiBzKSA9PiB7XHJcbiAgICBjb25zdCBsID0gYS5sZW5ndGhcclxuICAgIGlmIChsID09PSAxKSByZXR1cm4geyBxMTogYSwgcTI6IGEgfVxyXG4gICAgaWYgKGwgPT09IDIpIHJldHVybiB7IHExOiBhLnN1YnN0cigwLCAxKSwgcTI6IGEuc3Vic3RyKDEpIH1cclxuICAgIGxldCBwID0gc1Nic1BvcyhcIipcIikoYSlcclxuICAgIGlmIChwID09PSAtMSkgcmV0dXJuIHsgcTE6IFwiXCIsIHEyOiBcIlwiIH1cclxuICAgIGxldCB7IHMxOiBxMSwgczI6IHEyIH0gPSBzQnJrQXQocCwgMSkoYSlcclxuICAgIHJldHVybiB7IHExLCBxMiB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IHNRdW90ZSA9IChxOiBzKSA9PiAoYTogcykgPT4ge1xyXG4gICAgbGV0IHFxID0gcXVvdGVTdHJCcmsocSk7XHJcbiAgICBpZiAocXEgPT09IG51bGwpIHJldHVybiBhOyBlbHNlIHsgbGV0IHsgcTEsIHEyIH0gPSBxcTsgcmV0dXJuIHExICsgYSArIHEyIH07XHJcbn1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3Qgc1Rha0JlZiA9IChzZXA6IHMpID0+IChhOiBzKSA9PiBzUmV2QnJrMihzZXApKGEpLnMxXHJcbmV4cG9ydCBjb25zdCBzVGFrQWZ0ID0gKHNlcDogcykgPT4gKGE6IHMpID0+IHNSZXZCcmsxKHNlcCkoYSkuczJcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3Qgc1JldkJyazEgPSAoc2VwOiBzKSA9PiAoYTogcykgPT4geyBjb25zdCBhdCA9IHNTYnNQb3Moc2VwKShhKTsgcmV0dXJuIGF0ID09PSAtMSA/IHsgczE6IGEudHJpbSgpLCBzMjogJycgfSA6IHNCcmtBdChhdCwgc2VwLmxlbmd0aCkoYSkgfVxyXG5leHBvcnQgY29uc3Qgc1JldkJyazIgPSAoc2VwOiBzKSA9PiAoYTogcykgPT4geyBjb25zdCBhdCA9IHNTYnNQb3Moc2VwKShhKTsgcmV0dXJuIGF0ID09PSAtMSA/IHsgczE6ICcnLCBzMjogYS50cmltKCkgfSA6IHNCcmtBdChhdCwgc2VwLmxlbmd0aCkoYSkgfVxyXG5leHBvcnQgY29uc3Qgc1JldkJyayA9IChzZXA6IHMpID0+IChhOiBzKSA9PiB7IGNvbnN0IGF0ID0gc1Nic1JldlBvcyhzZXApKGEpOyByZXR1cm4gc0Jya0F0KGF0LCBzZXAubGVuZ3RoKShhKSB9XHJcbmV4cG9ydCBjb25zdCBzUmV2VGFrQmVmID0gKHNlcDogcykgPT4gKGE6IHMpID0+IHNSZXZCcmsyKHNlcCkoYSkuczFcclxuZXhwb3J0IGNvbnN0IHNSZXZUYWtBZnQgPSAoc2VwOiBzKSA9PiAoYTogcykgPT4gc1JldkJyazEoc2VwKShhKS5zMlxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBzUm12RnN0Q2hyID0gc01pZCgxKVxyXG5leHBvcnQgY29uc3Qgc1Jtdkxhc0NociA9IChhOiBzKSA9PiBzTGVmdChhLmxlbmd0aCAtIDEpKGEpXHJcbmV4cG9ydCBjb25zdCBzUm12TGFzTkNociA9IChuOiBuKSA9PiAoYTogcykgPT4gc0xlZnQoYS5sZW5ndGggLSBuKShhKVxyXG5leHBvcnQgY29uc3Qgc1JtdlN1YlN0ciA9IChzYnM6IHMpID0+IChhOiBzKSA9PiB7IGNvbnN0IHJlID0gbmV3IFJlZ0V4cChzYnMsICdnJyk7IHJldHVybiBhLnJlcGxhY2UocmUsICcnKSB9XHJcbmV4cG9ydCBjb25zdCBzUm12Q29sb24gPSBzUm12U3ViU3RyKFwiOlwiKVxyXG5leHBvcnQgY29uc3QgcHRoc2VwID0gcGF0aC5zZXBcclxuZXhwb3J0IGNvbnN0IHNQdGhTZXBQb3NSZXYgPSAoczogcykgPT4ge1xyXG4gICAgY29uc3QgeiA9IHMubGFzdEluZGV4T2YoJ1xcXFwnKVxyXG4gICAgaWYgKHogPj0gMClcclxuICAgICAgICByZXR1cm4gelxyXG4gICAgcmV0dXJuIHMubGFzdEluZGV4T2YoJy8nKVxyXG59XHJcbmV4cG9ydCBjb25zdCBwdGhQYXIgPSAoYTogcHRoKTogcHRoID0+IHtcclxuICAgIGNvbnN0IHNlZ0F5ID0gcHRoU2VnQXkoYSlcclxuICAgIHNlZ0F5LnBvcCgpXHJcbiAgICBzZWdBeS5wb3AoKVxyXG4gICAgcmV0dXJuIHNlZ0F5LmpvaW4ocHRoc2VwKSArIHB0aHNlcFxyXG59XHJcbmV4cG9ydCBjb25zdCBwdGhTZWdBeSA9IChhOiBwdGgpOiBzZWdbXSA9PiBhLnNwbGl0KC9bXFxcXFxcL10vZylcclxuZXhwb3J0IGNvbnN0IHB0aEJydyA9IChhOiBwdGgpID0+IGNtZFNoZWxsKHNGbXQoJ2V4cGxvcmVyIFwiP1wiJywgYSkpXHJcbmV4cG9ydCBjb25zdCBmZm5QdGggPSAoYTogZmZuKSA9PiB7IGNvbnN0IGF0ID0gc1B0aFNlcFBvc1JldihhKTsgcmV0dXJuIGF0ID09PSAtMSA/ICcnIDogc0xlZnQoYXQgKyAxKShhKSB9XHJcbmV4cG9ydCBjb25zdCBmZm5GbiA9IChhOiBmZm4pID0+IHsgY29uc3QgYXQgPSBzUHRoU2VwUG9zUmV2KGEpOyByZXR1cm4gYXQgPT09IC0xID8gYSA6IHNNaWQoYXQgKyAxKShhKSB9XHJcbmV4cG9ydCBjb25zdCBmZm5FeHQgPSAoYTogZmZuKSA9PiB7IGNvbnN0IGF0ID0gYS5sYXN0SW5kZXhPZignLicpOyByZXR1cm4gYXQgPT09IC0xID8gJycgOiBzTWlkKGF0KShhKSB9XHJcbmV4cG9ydCBjb25zdCBmZm5BZGRGblNmeCA9IChzZng6IHMpID0+IChhOiBzKSA9PiBmZm5GZm5uKGEpICsgc2Z4ICsgZmZuRXh0KGEpXHJcbmV4cG9ydCBjb25zdCBmZm5SbXZFeHQgPSAoYTogZmZuKSA9PiB7IGNvbnN0IGF0ID0gYS5pbmRleE9mKCcuJyk7IHJldHVybiBhdCA9PT0gLTEgPyBhIDogc0xlZnQoYXQpKGEpIH1cclxuZXhwb3J0IGNvbnN0IGZmbkZmbm4gPSBmZm5SbXZFeHRcclxuZXhwb3J0IGNvbnN0IGZmbkZubiA9IChhOiBmZm4pID0+IGZmbkZuKGZmblJtdkV4dChhKSlcclxuZXhwb3J0IGNvbnN0IGZmblJwbEV4dCA9IChleHQ6IHMpID0+IChhOiBzKSA9PiBmZm5SbXZFeHQoYSkgKyBleHRcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgZnRMaW5lcyA9IChhOiBmdCkgPT4gKGZzLnJlYWRGaWxlU3luYyhhKS50b1N0cmluZygpKVxyXG5leHBvcnQgY29uc3QgZnRMeSA9IChhOiBmdCkgPT4gc1NwbGl0TGluZXMoZnRMaW5lcyhhKSlcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgdG1wbm0gPSAoKSA9PiBzUm12Q29sb24obmV3IERhdGUoKS50b0pTT04oKSlcclxuZXhwb3J0IGNvbnN0IHRtcHB0aCA9IG9zLnRtcGRpciArIHB0aHNlcFxyXG5leHBvcnQgY29uc3QgdG1wZmZuID0gKHBmeCA9IFwiXCIsIGV4dCwgX2Zkcj86IHMsIF9mbj86IHMpID0+IHRtcGZkcihfZmRyKSArIHBmeCArIHRtcG5tKCkgKyBleHRcclxuZXhwb3J0IGNvbnN0IHRtcGZkciA9IChmZHI/OiBzKSA9PiB7XHJcbiAgICBpZiAoZmRyID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIHRtcHB0aFxyXG4gICAgY29uc3QgYSA9IHRtcHB0aCArICdGZHIvJzsgcHRoRW5zKGEpXHJcbiAgICBjb25zdCBhMSA9IGEgKyBmZHIgKyBwdGhzZXA7IHB0aEVucyhhMSlcclxuICAgIGNvbnN0IGEyID0gYTEgKyB0bXBubSgpICsgcHRoc2VwOyBwdGhFbnMoYTIpXHJcbiAgICByZXR1cm4gYTJcclxufVxyXG5leHBvcnQgY29uc3QgdG1wZmZuQnlGZHJGbiA9IChmZHI6IHMsIGZuOiBzKSA9PiB0bXBmZHIoZmRyKSArIGZuXHJcbmV4cG9ydCBjb25zdCB0bXBmdCA9ICgpID0+IHRtcGZmbihcIlRcIiwgXCIudHh0XCIpXHJcbmV4cG9ydCBjb25zdCB0bXBmanNvbiA9IChfZmRyPzogcywgX2ZuPzogcykgPT4gdG1wZmZuKFwiVFwiLCBcIi5qc29uXCIsIF9mZHIsIF9mbilcclxuZXhwb3J0IGNvbnN0IGZmbkNsb25lVG1wID0gKGE6IGZmbikgPT4ge1xyXG4gICAgY29uc3QgbyA9IHRtcGZmbih1bmRlZmluZWQsIGZmbkV4dChhKSlcclxuICAgIGZzLmNvcHlGaWxlU3luYyhhLCBvKVxyXG4gICAgZnMucmVhZFxyXG4gICAgcmV0dXJuIG9cclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBwbSA9IDxUPihmLCAuLi5wKSA9PiBuZXcgUHJvbWlzZTxUPihcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIHJldHVybiBhIFByb21pc2Ugb2Yge2VyLHJzbHR9IGJ5IGNhbGxpbmcgZiguLi5wLGNiKSwgd2hlcmUgY2IgaXMgKGVyLHJzbHQpPT57Li4ufVxyXG4gICAgICogaXQgaXMgdXNlZnVsbHkgaW4gY3JlYXRpbmcgYSBwcm9taXNlIGJ5IGFueSBhc3luYyBmKC4uLnAsY2IpXHJcbiAgICAgKiBAcGFyYW0geyhlcixyc2x0KT0+dm9pZH0gZiBcclxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBwIFxyXG4gICAgICogQHNlZVxyXG4gICAgICovXHJcbiAgICAocnMsIHJqKSA9PiB7XHJcbiAgICAgICAgZiguLi5wLCAoZSwgcnNsdCkgPT4ge1xyXG4gICAgICAgICAgICBlID8gcmooZSkgOiBycyhyc2x0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbilcclxuZXhwb3J0IGNvbnN0IHBtRXJSc2x0ID0gKGYsIC4uLnApID0+IG5ldyBQcm9taXNlPHsgZXIsIHJzbHQgfT4oXHJcbiAgICAocnMsIHJqKSA9PiB7XHJcbiAgICAgICAgZiguLi5wLCAoZXIsIHJzbHQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHogPSBlciA/IHsgZXIsIHJzbHQ6IG51bGwgfSA6IHsgZXIsIHJzbHQgfVxyXG4gICAgICAgICAgICBycyh6KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbilcclxuZXhwb3J0IGNvbnN0IHBtUnNsdE9wdCA9IDxUPihmLCAuLi5wKSA9PiBuZXcgUHJvbWlzZTxUIHwgbnVsbD4oXHJcbiAgICAocnMsIHJqKSA9PiB7XHJcbiAgICAgICAgZiguLi5wLCAoZXIsIHJzbHQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHogPSBlciA/IG51bGwgOiByc2x0XHJcbiAgICAgICAgICAgIHJzKHopXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuKVxyXG5leHBvcnQgY29uc3QgZnRMaW5lc1BtID0gKGE6IGZ0KSA9PiBwbShmcy5yZWFkRmlsZSwgYSkudGhlbihyc2x0ID0+IHJzbHQudG9TdHJpbmcoKSlcclxuZXhwb3J0IGNvbnN0IGZ0THlQbSA9IChhOiBmdCkgPT4gZnRMaW5lc1BtKGEpLnRoZW4obGluZXMgPT4gc1NwbGl0Q3JMZihsaW5lcykpXHJcbmV4cG9ydCBjb25zdCBwdGhFbnMgPSAoYTogcHRoKSA9PiB7IGlmICghZnMuZXhpc3RzU3luYyhhKSkgZnMubWtkaXJTeW5jKGEpIH1cclxuZXhwb3J0IGNvbnN0IGlzUHRoRXhpc3QgPSAoYTogcHRoKSA9PiBmcy5leGlzdHNTeW5jKGEpXHJcbmV4cG9ydCBjb25zdCBpc0ZmbkV4aXN0ID0gKGE6IGZmbikgPT4gZnMuZXhpc3RzU3luYyhhKVxyXG5leHBvcnQgY29uc3QgYXNzZXJ0SXNQdGhFeGlzdCA9IChhOiBwdGgpID0+IHsgaWYgKCFpc1B0aEV4aXN0KGEpKSBlcihgcGF0aCBkb2VzIG5vdCBleGlzdCBbJHthfV1gKSB9XHJcbmV4cG9ydCBjb25zdCBwdGhFbnNTZnhTZXAgPSAoYTogcHRoKSA9PiBzTGFzQ2hyKGEpID09PSBwdGhzZXAgPyBhIDogYSArIHB0aHNlcFxyXG5leHBvcnQgY29uc3QgcHRoRW5zU3ViRmRyID0gKHN1YkZkcjogcykgPT4gKGE6IHB0aCkgPT4ge1xyXG4gICAgYXNzZXJ0SXNQdGhFeGlzdChhKVxyXG4gICAgbGV0IGIgPSBzdWJGZHIuc3BsaXQoL1tcXFxcXFwvXS8pXHJcbiAgICBsZXQgYyA9IGl0clJtdkVtcChiKVxyXG4gICAgbGV0IGQgPSBwdGhFbnNTZnhTZXAoYSlcclxuICAgIGxldCBlOiBheSA9IFtdXHJcbiAgICBmb3IgKGxldCBzZWcgb2YgYykge1xyXG4gICAgICAgIGQgKz0gc2VnICsgJ1xcXFwnO1xyXG4gICAgICAgIGUucHVzaChkKVxyXG4gICAgfVxyXG4gICAgaXRyRWFjaChwdGhFbnMpKGUpXHJcbn1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgaXRyV2hlcmUgPSA8VD4ocDogcHJlZDxUPikgPT4gKGE6IEl0cjxUPik6IFRbXSA9PiB7IGNvbnN0IG86IFRbXSA9IFtdOyBmb3IgKGxldCBpIG9mIGEpIGlmIChwKGkpKSBvLnB1c2goaSk7IHJldHVybiBvIH1cclxuZXhwb3J0IGNvbnN0IGl0ckV4Y2x1ZGUgPSAocDogcCkgPT4gKGE6IGl0cikgPT4geyBjb25zdCBvOiBheSA9IFtdOyBmb3IgKGxldCBpIG9mIGEpIGlmICghcChpKSkgby5wdXNoKGkpOyByZXR1cm4gbyB9XHJcbmV4cG9ydCBjb25zdCBpdHJNYXAgPSA8QSwgQj4oZjogKGE6IEEsIGk/OiBuKSA9PiBCKSA9PiAoYTogaXRyKTogQltdID0+IHsgbGV0IGkgPSAwOyBjb25zdCBvOiBheSA9IFtdOyBmb3IgKGxldCBpdG0gb2YgYSkgby5wdXNoKGYoaXRtLCBpKyspKTsgcmV0dXJuIG8gfVxyXG5leHBvcnQgY29uc3QgaXRyRWFjaCA9IDxUPihmOiAoYTogVCwgaT86IG4pID0+IHZvaWQpID0+IChhOiBJdHI8VD4pID0+IHsgbGV0IGkgPSAwOyBmb3IgKGxldCBpdG0gb2YgYSkgZihpdG0sIGkrKykgfVxyXG5leHBvcnQgY29uc3QgaXRyRm9sZCA9IF9pdHJGb2xkID0+IGYgPT4gY3VtID0+IGEgPT4geyBmb3IgKGxldCBpIG9mIGEpIGN1bSA9IGYoY3VtKShpKTsgcmV0dXJuIGN1bSB9XHJcbmV4cG9ydCBjb25zdCBpdHJSZWR1Y2UgPSBmID0+IChhOiBpdHIpID0+IGl0ckZvbGQoZikoaXRyRnN0KGEpKShhKVxyXG5leHBvcnQgY29uc3Qgd2hlcmUgPSBpdHJXaGVyZVxyXG5leHBvcnQgY29uc3QgbWFwID0gaXRyTWFwXHJcbmV4cG9ydCBjb25zdCBlYWNoID0gaXRyRWFjaFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgbWFwS3kgPSAoX21hcDogbWFwKSA9PiBpdHJBeShfbWFwLmtleXMoKSlcclxuZXhwb3J0IGNvbnN0IG1hcFZ5ID0gKF9tYXA6IG1hcCkgPT4gaXRyQXkoX21hcC52YWx1ZXMoKSlcclxuZXhwb3J0IGNvbnN0IG1hcEt2eSA9IChfbWFwOiBtYXApID0+IGl0ckF5KF9tYXAuZW50cmllcygpKVxyXG5leHBvcnQgY29uc3QgbWFwS3NldCA9IChfbWFwOiBtYXApID0+IG5ldyBTZXQoX21hcC5rZXlzKCkpXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBzZXRBeSA9IDxUPihfc2V0OiBTZXQ8VD4pOiBUW10gPT4geyBjb25zdCBvOiBUW10gPSBbXTsgZm9yIChsZXQgaSBvZiBfc2V0KSBvLnB1c2goaSk7IHJldHVybiBvIH1cclxuZXhwb3J0IGNvbnN0IHNldFdoZXJlID0gPFQ+KF9wOiBwcmVkPFQ+KSA9PiAoX3NldDogU2V0PFQ+KTogU2V0PFQ+ID0+IHtcclxuICAgIGNvbnN0IHogPSBuZXcgU2V0PFQ+KClcclxuICAgIGZvciAobGV0IGkgb2YgX3NldClcclxuICAgICAgICBpZiAoX3AoaSkpXHJcbiAgICAgICAgICAgIHouYWRkKGkpXHJcbiAgICByZXR1cm4gelxyXG59XHJcbmV4cG9ydCBjb25zdCBzZXRTcnQgPSA8VD4oX3NldDogU2V0PFQ+KTogU2V0PFQ+ID0+IG5ldyBTZXQ8VD4oc2V0QXkoX3NldCkuc29ydCgpKVxyXG5leHBvcnQgY29uc3Qgc3NldFNydCA9IHNldFNydCBhcyAoX3NzZXQ6IHNzZXQpID0+IHNzZXRcclxuZXhwb3J0IGNvbnN0IHNldEFkZCA9IDxUPihfeDogU2V0PFQ+IHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4gKF9zZXQ6IFNldDxUPik6IFNldDxUPiA9PiB7XHJcbiAgICBpZiAoX3ggPT09IG51bGwgfHwgX3ggPT09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gX3NldFxyXG4gICAgZm9yIChsZXQgaSBvZiBfeClcclxuICAgICAgICBfc2V0LmFkZChpKTtcclxuICAgIHJldHVybiBfc2V0XHJcbn1cclxuZXhwb3J0IGNvbnN0IHNldE1pbnVzID0gPFQ+KF94OiBTZXQ8VD4gfCBudWxsIHwgdW5kZWZpbmVkKSA9PiAoX3NldDogU2V0PFQ+KTogU2V0PFQ+ID0+IHtcclxuICAgIGlmIChfeCA9PT0gbnVsbCB8fCBfeCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBfc2V0XHJcbiAgICBmb3IgKGxldCBpIG9mIF94KSBfc2V0LmRlbGV0ZShpKTtcclxuICAgIHJldHVybiBfc2V0XHJcbn1cclxuY29uc3QgX3NldEFmdCA9IChpbmNsLCBhLCBzZXQpID0+IHtcclxuICAgIGNvbnN0IHogPSBuZXcgU2V0XHJcbiAgICBsZXQgZm91bmQgPSBmYWxzZVxyXG4gICAgZm9yIChsZXQgaSBvZiBzZXQpXHJcbiAgICAgICAgaWYgKGZvdW5kKVxyXG4gICAgICAgICAgICB6LmFkZChpKVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoYSA9PT0gaSkge1xyXG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5jbClcclxuICAgICAgICAgICAgICAgICAgICB6LmFkZChhKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5leHBvcnQgY29uc3QgbGluRnN0VGVybSA9IChhOiBsaW4pID0+IHNTcGxpdFNwYyhhKVswXVxyXG5leHBvcnQgY29uc3QgbGluTGFzVGVybSA9IChhOiBsaW4pID0+IGF5TGFzKHNTcGxpdFNwYyhhKSlcclxuZXhwb3J0IGNvbnN0IGxpblQyID0gKGE6IGxpbikgPT4ge1xyXG4gICAgY29uc3QgeyB0ZXJtOiB0MSwgcmVtYWluTGluOiBhMSB9ID0gbGluU2hpZnQoYSlcclxuICAgIGNvbnN0IHsgdGVybTogdDIsIHJlbWFpbkxpbiB9ID0gbGluU2hpZnQoYTEpXHJcbiAgICByZXR1cm4gdDJcclxufVxyXG5leHBvcnQgY29uc3QgbGluU2hpZnQgPSAoYTogbGluKSA9PiB7XHJcbiAgICBjb25zdCBhMSA9IGEudHJpbSgpXHJcbiAgICBjb25zdCBhMiA9IGExLm1hdGNoKC8oXFxTKilcXHMqKC4qKS8pXHJcbiAgICBjb25zdCBvID1cclxuICAgICAgICBhMiA9PT0gbnVsbFxyXG4gICAgICAgICAgICA/IHsgdGVybTogXCJcIiwgcmVtYWluTGluOiBcIlwiIH1cclxuICAgICAgICAgICAgOiB7IHRlcm06IGEyWzFdLCByZW1haW5MaW46IGEyWzJdIH1cclxuICAgIHJldHVybiBvXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNSbXZGc3RUZXJtID0gKGE6IHMpID0+IGxpblNoaWZ0KGEpLnJlbWFpbkxpblxyXG5leHBvcnQgY29uc3QgbGluUm12RnN0VGVybSA9IChhOiBsaW4pID0+IGxpblNoaWZ0KGEpLnJlbWFpbkxpblxyXG5leHBvcnQgY29uc3Qgc2V0QWZ0ID0gYWZ0ID0+IGEgPT4gX3NldEFmdChmYWxzZSwgYWZ0LCBhKVxyXG5leHBvcnQgY29uc3Qgc2V0QWZ0SW5jbCA9IGEgPT4gc2V0ID0+IF9zZXRBZnQodHJ1ZSwgYSwgc2V0KVxyXG5leHBvcnQgY29uc3Qgc2V0Q2xvbmUgPSBzZXQgPT4gaXRyU2V0KHNldClcclxuZXhwb3J0IGNvbnN0IGl0clNldCA9IGl0ciA9PiB7IGNvbnN0IG8gPSBuZXcgU2V0OyBmb3IgKGxldCBpIG9mIGl0cikgby5hZGQoaSk7IHJldHVybiBvIH1cclxuZXhwb3J0IGNvbnN0IGl0clRmbVNldCA9IChmOiBmKSA9PiAoYTogaXRyKSA9PiB7XHJcbiAgICBjb25zdCBvID0gbmV3IFNldDsgZm9yIChsZXQgaSBvZiBhKSBvLmFkZChmKGkpKTsgcmV0dXJuIG9cclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgZW1wU2RpYyA9ICgpID0+IG5ldyBNYXA8cywgcz4oKVxyXG5leHBvcnQgY29uc3QgbHlTZGljID0gKGE6IGx5KSA9PiB7XHJcbiAgICBjb25zdCBvID0gZW1wU2RpYygpXHJcbiAgICBjb25zdCBsaW5LcyA9IGEgPT4ge1xyXG4gICAgICAgIGxldCB7IHRlcm06IGssIHJlbWFpbkxpbjogcyB9ID0gbGluU2hpZnQoYSlcclxuICAgICAgICByZXR1cm4geyBrLCBzIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHggPSBsaW4gPT4geyBsZXQgeyBrLCBzIH0gPSBsaW5LcyhsaW4pOyBvLnNldChrLCBzKSB9XHJcbiAgICBlYWNoKHgpKGEpXHJcbiAgICByZXR1cm4gb1xyXG59XHJcbmV4cG9ydCBjb25zdCBpdHJSbXZFbXAgPSA8VD4oYTogSXRyPFQgfCBudWxsIHwgdW5kZWZpbmVkPik6IFRbXSA9PiBpdHJXaGVyZShpc05vbkVtcCkoYSlcclxuZXhwb3J0IGNvbnN0IGx5Um12RW1wTGluID0gaXRyUm12RW1wIGFzIChfbHk6IGx5KSA9PiBseVxyXG5leHBvcnQgY29uc3QgbHlQZnhDbnQgPSAocGZ4OiBzKSA9PiAoYTogbHkpID0+IHtcclxuICAgIGxldCB6ID0gMFxyXG4gICAgZWFjaFxyXG4gICAgICAgICgobGluOiBzKSA9PiB7IGlmIChzSGFzUGZ4KHBmeCkobGluKSkgeisrIH0pXHJcbiAgICAgICAgKGEpXHJcbiAgICByZXR1cm4gelxyXG59XHJcbmV4cG9ydCBjb25zdCBseUhhc01halBmeCA9IChwZng6IHMpID0+IChhOiBseSkgPT4gMiAqIGx5UGZ4Q250KHBmeCkoYSkgPiBhLmxlbmd0aFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgcmVFeHBDb25zdE5tID0gL15leHBvcnQgY29uc3QgKFskX2EtekEtWl1bJF9hLXpBLVowLTldKikgL1xyXG5leHBvcnQgY29uc3QgcmVDb25zdE5tID0gL15jb25zdCAoWyRfYS16QS1aXVskX2EtekEtWjAtOV0qKSAvXHJcbmNvbnN0IHJlRXhwRG9sbGFyQ29uc3RObSA9IC9eZXhwb3J0IGNvbnN0IChbXFwkXFx3XVtcXCRfMC05XFx3X10qKSAvXHJcbmV4cG9ydCBjb25zdCBzcmNEcnkgPSAocmU6IHJlKSA9PiBjb21wb3NlKHNyY01hdGNoQXkocmUpLCBpdHJNYXAobWF0Y2hEcikpIGFzIChhOiBzcmMpID0+IGRyeVxyXG5leHBvcnQgY29uc3Qgc3JjQ29sID0gKHJlOiByZSkgPT4gKGE6IHNyYyk6IHNjb2wgPT4ge1xyXG4gICAgY29uc3QgYXkgPSBzcmNNYXRjaEF5KHJlKShhKVxyXG4gICAgY29uc3QgYyA9IG1hdGNoQXlGc3RDb2woYXkpXHJcbiAgICBjb25zdCBjMSA9IGl0clJtdkVtcChjKVxyXG4gICAgcmV0dXJuIGMxXHJcbn1cclxuZXhwb3J0IGNvbnN0IGF5U3J0ID0gKGE6IGF5KSA9PiBhLnNvcnQoKVxyXG5leHBvcnQgY29uc3QgbWF0Y2hEciA9IChhOiBtYXRjaCkgPT4gWy4uLmFdLnNwbGljZSgxKVxyXG5leHBvcnQgY29uc3QgbWF0Y2hBeVNkcnkgPSBpdHJNYXAobWF0Y2hEcikgYXMgKGE6IFJlZ0V4cE1hdGNoQXJyYXlbXSkgPT4gc2RyeVxyXG5leHBvcnQgY29uc3QgbWF0Y2hGc3RJdG0gPSAoYTogUmVnRXhwTWF0Y2hBcnJheSkgPT4gYSA9PT0gbnVsbCA/IG51bGwgOiBhWzFdIGFzIHMgfCBudWxsXHJcbmV4cG9ydCBjb25zdCBtYXRjaEF5RnN0Q29sID0gaXRyTWFwKG1hdGNoRnN0SXRtKSBhcyAoYTogUmVnRXhwTWF0Y2hBcnJheVtdKSA9PiBzW11cclxuZXhwb3J0IGNvbnN0IHNyY01hdGNoQXkgPSBjb21wb3NlKHNNYXRjaCwgaXRyTWFwKSBhcyAoXzogcmUpID0+IChfOiBzcmMpID0+IFJlZ0V4cE1hdGNoQXJyYXlbXVxyXG5leHBvcnQgY29uc3Qgc3JjRXhwQ29uc3ROeSA9IHNyY0NvbChyZUV4cENvbnN0Tm0pXHJcbmV4cG9ydCBjb25zdCBzcmNDb25zdE55ID0gc3JjQ29sKHJlQ29uc3RObSlcclxuZXhwb3J0IGNvbnN0IHNyY0V4cENvbnN0RG9sbGFyTnkgPSBzcmNDb2wocmVFeHBEb2xsYXJDb25zdE5tKVxyXG5leHBvcnQgY29uc3QgZnRzRXhwQ29uc3ROeSA9IGNvbXBvc2UoZnRMeSwgc3JjRXhwQ29uc3ROeSkgYXMgKGE6IGZ0cykgPT4gbnlcclxuZXhwb3J0IGNvbnN0IGZ0c0NvbnN0TnkgPSBjb21wb3NlKGZ0THksIHNyY0NvbnN0TnkpIGFzIChhOiBmdHMpID0+IG55XHJcbmV4cG9ydCBjb25zdCBmdHNFeHBDb25zdERvbGxhck55ID0gY29tcG9zZShmdEx5LCBzcmNFeHBDb25zdERvbGxhck55KSBhcyAoYTogZnRzKSA9PiBueVxyXG5leHBvcnQgY29uc3QgZmZuRnRzID0gZmZuUnBsRXh0KCcudHMnKSBhcyAoXzogcykgPT4gc1xyXG5leHBvcnQgY29uc3QgaXNGVHN0SnMgPSAoX2ZUc3RKczogZlRzdEpzKSA9PiB7XHJcbiAgICBjb25zdCBmbiA9IGZmbkZuKF9mVHN0SnMpXHJcbiAgICBpZiAoIXNIYXNQZngoJ3RzdF9fJykoZm4pKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKCFzSGFzU2Z4KCcuanMnKShmbikpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBjb25zdCBzZWdBeSA9IGZmblB0aChfZlRzdEpzKS5zcGxpdCgvW1xcXFxcXC9dLylcclxuICAgIHNlZ0F5LnBvcCgpXHJcbiAgICBjb25zdCB0ZXN0ID0gc2VnQXkucG9wKClcclxuICAgIGlmICh0ZXN0ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBpZiAodGVzdC50b1VwcGVyQ2FzZSgpICE9PSAnVEVTVCcpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59XHJcbmV4cG9ydCBjb25zdCBhc3NlcnRJc1RydWUgPSAodiwgLi4ubXNnKSA9PiB7XHJcbiAgICBpZiAodikgcmV0dXJuXHJcbiAgICBpZiAobXNnLmxlbmd0aCA9PT0gMClcclxuICAgICAgICBlcignZ2l2ZW4gdmF1bGUgc2hvdWxkIGJlIHRydWUnKVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbSA9IG1zZy5zaGlmdCgpXHJcbiAgICAgICAgZXIobSwgbXNnKVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBhc3NlcnRJc0ZUc3RKcyA9IChfZlRzdEpzOiBmVHN0SnMpID0+IGFzc2VydElzVHJ1ZShpc0ZUc3RKcyhfZlRzdEpzKSwgXCJnaXZlbiBfZlRzdEpzIGlzIG5vdCBmVHN0SnNcIiwgeyBfZlRzdEpzIH0pXHJcbmV4cG9ydCBjb25zdCBmVHN0SnNfZnRzID0gKF9mVHN0SnM6IGZUc3RKcyk6IGZ0cyA9PiB7XHJcbiAgICBhc3NlcnRJc0ZUc3RKcyhfZlRzdEpzKVxyXG4gICAgY29uc3QgZm4gPSBmZm5GbihfZlRzdEpzKVxyXG4gICAgY29uc3QgcHRoID0gZmZuUHRoKF9mVHN0SnMpXHJcbiAgICBjb25zdCBhMSA9IHNSbXZQZngoJ3RzdF9fJykoZm4pXHJcbiAgICBjb25zdCBhMiA9IGFhXHJcbiAgICBjb25zdCB6Rm5uID0gZmZuRm5uKGZuKVxyXG4gICAgY29uc3QgelB0aCA9IHB0aFBhcihwdGgpXHJcbiAgICByZXR1cm4gelB0aCArIHpGbm4gKyAnLmpzJ1xyXG59XHJcbmV4cG9ydCBjb25zdCBmanNFeHBDb25zdE55ID0gY29tcG9zZShmZm5GdHMsIGZ0c0V4cENvbnN0TnkpXHJcbmV4cG9ydCBjb25zdCBmanNDb25zdE55ID0gY29tcG9zZShmZm5GdHMsIGZ0c0NvbnN0TnkpXHJcbmV4cG9ydCBjb25zdCBzdG9wID0gKCkgPT4geyBkZWJ1Z2dlciB9XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBpc1N0ciA9IHYgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXHJcbmV4cG9ydCBjb25zdCBpc051bSA9IHYgPT4gdHlwZW9mIHYgPT09ICdudW1iZXInXHJcbmV4cG9ydCBjb25zdCBpc0Jvb2wgPSB2ID0+IHR5cGVvZiB2ID09PSAnYm9vbGVhbidcclxuZXhwb3J0IGNvbnN0IGlzT2JqID0gdiA9PiB0eXBlb2YgdiA9PT0gJ29iamVjdCdcclxuZXhwb3J0IGNvbnN0IGlzU3kgPSB2ID0+IHtcclxuICAgIGlmICghaXNBeSh2KSkgcmV0dXJuIGZhbHNlXHJcbiAgICBpZiAoaXNFbXAodikpIHJldHVybiB0cnVlXHJcbiAgICByZXR1cm4gaXNTdHIodlswXSlcclxufVxyXG5leHBvcnQgY29uc3QgaXNBeSA9IHUuaXNBcnJheVxyXG5leHBvcnQgY29uc3QgaXNEdGUgPSB1LmlzRGF0ZVxyXG5leHBvcnQgY29uc3QgaXNGdW4gPSB1LmlzRnVuY3Rpb25cclxuZXhwb3J0IGNvbnN0IGlzUHJpbSA9IHUuaXNQcmltaXRpdmVcclxuZXhwb3J0IGNvbnN0IGlzUmUgPSB2ID0+IHZJc0luc3RhbmNlT2YoUmVnRXhwKVxyXG5leHBvcnQgY29uc3QgaXNOb25OdWxsID0gdiA9PiAhaXNOdWxsKHYpXHJcbmV4cG9ydCBjb25zdCBpc051bGwgPSB1LmlzTnVsbFxyXG5leHBvcnQgY29uc3QgaXNVbmRlZmluZWQgPSB1LmlzVW5kZWZpbmVkXHJcbmV4cG9ydCBjb25zdCBpc051bGxPclVuZGVmaW5lZCA9IHUuaXNOdWxsT3JVbmRlZmluZWRcclxuZXhwb3J0IGNvbnN0IGlzVHJ1ZSA9IHYgPT4gdiA/IHRydWUgOiBmYWxzZVxyXG5leHBvcnQgY29uc3QgaXNGYWxzZSA9IHYgPT4gdiA/IGZhbHNlIDogdHJ1ZVxyXG5leHBvcnQgY29uc3QgaXNFbXAgPSB2ID0+IHYgPyBmYWxzZSA6IHRydWVcclxuZXhwb3J0IGNvbnN0IGlzTm9uRW1wID0gdiA9PiB2ID8gdHJ1ZSA6IGZhbHNlXHJcbmV4cG9ydCBjb25zdCBpc09kZCA9IG4gPT4gbiAlIDIgPT09IDFcclxuZXhwb3J0IGNvbnN0IGlzRXZlbiA9IG4gPT4gbiAlIDIgPT09IDBcclxuZXhwb3J0IGNvbnN0IGlzU3BjID0gKHM6IHMpID0+IHMgPT09IG51bGwgfHwgcyA9PT0gdW5kZWZpbmVkIHx8IHNbMF0gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogL1xccy8udGVzdChzWzBdKSBhcyBiXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3Qgc1NlYXJjaCA9IChyZTogUmVnRXhwKSA9PiAoYTogcykgPT4gYS5zZWFyY2gocmUpXHJcbmV4cG9ydCBjb25zdCBzQnJrUDEyMyA9IChxdW90ZVN0cjogcykgPT4gKGE6IHMpID0+IHtcclxuICAgIGNvbnN0IHsgcTEsIHEyIH0gPSBxdW90ZVN0ckJyayhxdW90ZVN0cilcclxuICAgIGlmIChxMSA9PT0gXCJcIiB8fCBxMiA9PT0gXCJcIikgcmV0dXJuIG51bGxcclxuICAgIGNvbnN0IGwgPSBhLmxlbmd0aFxyXG4gICAgY29uc3QgcTFwb3MgPSBhLmluZGV4T2YocTEpO1xyXG4gICAgY29uc3QgcTJwb3MgPSBhLmluZGV4T2YocTIsIHExcG9zICsgMSk7XHJcbiAgICBjb25zdCBsZW4xID0gcTFwb3NcclxuICAgIGNvbnN0IHBvczIgPSBxMXBvcyArIHExLmxlbmd0aFxyXG4gICAgY29uc3QgcG9zMyA9IHEycG9zICsgcTIubGVuZ3RoXHJcbiAgICBjb25zdCBsZW4yID0gcG9zMyAtIHBvczIgLSAxXHJcbiAgICBjb25zdCBwMSA9IGEuc3Vic3RyKDAsIGxlbjEpXHJcbiAgICBjb25zdCBwMiA9IGEuc3Vic3RyKHBvczIsIGxlbjIpXHJcbiAgICBjb25zdCBwMyA9IGEuc3Vic3RyKHBvczMpXHJcbiAgICBsZXQgejogW3MsIHMsIHNdID0gW3AxLCBwMiwgcDNdXHJcbiAgICByZXR1cm4gelxyXG59XHJcbi8vbGV0IGEgPSBzQnJrUDEyMyhcIihiYWNrdXAtKilcIikoXCJzbGtkZmpsc2RqZihiYWNrdXAtMTIzKS5leGVcIik7ZGVidWdnZXJcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBpdHJJc0FsbFRydWUgPSAoYTogaXRyKSA9PiB7IGZvciAobGV0IGkgb2YgYSkgaWYgKGlzRmFsc2UoaSkpIHJldHVybiBmYWxzZTsgcmV0dXJuIHRydWUgfVxyXG5leHBvcnQgY29uc3QgaXRySXNBbGxGYWxzZSA9IChhOiBpdHIpID0+IHsgZm9yIChsZXQgaSBvZiBhKSBpZiAoaXNUcnVlKGkpKSByZXR1cm4gZmFsc2U7IHJldHVybiB0cnVlIH1cclxuZXhwb3J0IGNvbnN0IGl0cklzU29tZVRydWUgPSAoYTogaXRyKSA9PiB7IGZvciAobGV0IGkgb2YgYSkgaWYgKGlzVHJ1ZShpKSkgcmV0dXJuIHRydWU7IHJldHVybiBmYWxzZSB9XHJcbmV4cG9ydCBjb25zdCBpdHJJc1NvbWVGYWxzZSA9IChhOiBpdHIpID0+IHsgZm9yIChsZXQgaSBvZiBhKSBpZiAoaXNGYWxzZShpKSkgcmV0dXJuIHRydWU7IHJldHVybiBmYWxzZSB9XHJcbmV4cG9ydCBjb25zdCBpdHJQcmVkSXNBbGxUcnVlID0gKHA6IHApID0+IChhOiBpdHIpID0+IHsgZm9yIChsZXQgaSBvZiBhKSBpZiAoIXAoaSkpIHJldHVybiBmYWxzZTsgcmV0dXJuIHRydWUgfVxyXG5leHBvcnQgY29uc3QgaXRyUHJlZElzQWxsRmFsc2UgPSAocDogcCkgPT4gKGE6IGl0cikgPT4geyBmb3IgKGxldCBpIG9mIGEpIGlmIChwKGkpKSByZXR1cm4gZmFsc2U7IHJldHVybiB0cnVlIH1cclxuZXhwb3J0IGNvbnN0IGl0clByZWRJc1NvbWVGYWxzZSA9IChwOiBwKSA9PiAoYTogaXRyKSA9PiB7IGZvciAobGV0IGkgb2YgYSkgaWYgKCFwKGkpKSByZXR1cm4gdHJ1ZTsgcmV0dXJuIGZhbHNlIH1cclxuZXhwb3J0IGNvbnN0IGl0clByZWRJc1NvbWVUcnVlID0gKHA6IHApID0+IChhOiBpdHIpID0+IHsgZm9yIChsZXQgaSBvZiBhKSBpZiAocChpKSkgcmV0dXJuIHRydWU7IHJldHVybiBmYWxzZSB9XHJcbmV4cG9ydCBjb25zdCBpdHJCcmtGb3JUcnVlRmFsc2UgPSA8VD4ocDogKGE6IFQpID0+IGIpID0+IChhOiBJdHI8VD4pID0+IHtcclxuICAgIGNvbnN0IHQ6IFRbXSA9IFtdLCBmOiBUW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgb2YgYSlcclxuICAgICAgICBwKGkpID8gdC5wdXNoKGkpIDogZi5wdXNoKGkpO1xyXG4gICAgcmV0dXJuIHsgdCwgZiB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IGl0ckF5ID0gPFQ+KGE6IEl0cjxUPikgPT4geyBjb25zdCBvOiBUW10gPSBbXTsgZm9yIChsZXQgaSBvZiBhKSBvLnB1c2goaSk7IHJldHVybiBvIH1cclxuZXhwb3J0IGNvbnN0IGl0ckZzdCA9IDxUPihhOiBJdHI8VD4pID0+IHsgZm9yIChsZXQgaSBvZiBhKSByZXR1cm4gaTsgcmV0dXJuIG51bGwgfVxyXG5leHBvcnQgY29uc3QgaXRyTGFzID0gPFQ+KGE6IEl0cjxUPikgPT4geyBsZXQgaTsgZm9yIChpIG9mIGEpIHsgfTsgcmV0dXJuIChpID09PSB1bmRlZmluZWQgPyBudWxsIDogaSkgfVxyXG5leHBvcnQgY29uc3QgaXRyQWRkUGZ4U2Z4ID0gKHBmeDogcywgc2Z4OiBzKSA9PiAoYTogaXRyKSA9PiBpdHJNYXAoc0FkZFBmeFNmeChwZngsIHNmeCkpKGEpIGFzIHNbXVxyXG5leHBvcnQgY29uc3QgaXRyQWRkUGZ4ID0gKHBmeDogcykgPT4gKGE6IGl0cikgPT4gaXRyTWFwKHNBZGRQZngocGZ4KSkoYSkgYXMgc1tdXHJcbmV4cG9ydCBjb25zdCBpdHJBZGRTZnggPSAoc2Z4OiBzKSA9PiAoYTogaXRyKSA9PiBpdHJNYXAoc0FkZFNmeChzZngpKShhKSBhcyBzW11cclxuZXhwb3J0IGNvbnN0IGl0cldkdCA9IChhOiBpdHIpID0+IHBpcGUoaXRyTWFwKHZMZW4pKGEpKShpdHJNYXgpIGFzIG5cclxuZXhwb3J0IGNvbnN0IHNpdHJXZHQgPSAoYTogc0l0cikgPT4gcGlwZShpdHJNYXAoc0xlbikoYSkpKGl0ck1heCkgYXMgblxyXG5leHBvcnQgY29uc3QgaXRyQWxpZ25MID0gKGE6IGl0cikgPT4gaXRyTWFwKHNBbGlnbkwoaXRyV2R0KGEpKSkoYSkgYXMgc1tdXHJcbmV4cG9ydCBjb25zdCBpdHJDbG9uZSA9IChhOiBpdHIpID0+IGl0ck1hcChpID0+IGkpKGEpIGFzIGF5XHJcbmV4cG9ydCBjb25zdCBpdHJGaW5kID0gPFQ+KHA6IChhOiBUKSA9PiBiKSA9PiAoYTogSXRyPFQ+KSA9PiB7IGZvciAobGV0IGkgb2YgYSkgaWYgKHAoaSkpIHJldHVybiBpOyByZXR1cm4gbnVsbCB9XHJcbmV4cG9ydCBjb25zdCBpdHJIYXNEdXAgPSAoYTogaXRyKSA9PiB7IGNvbnN0IHNldCA9IG5ldyBTZXQoKTsgZm9yIChsZXQgaSBvZiBhKSBpZiAoc2V0LmhhcyhpKSkgeyByZXR1cm4gdHJ1ZSB9IGVsc2Ugc2V0LmFkZChpKTsgcmV0dXJuIGZhbHNlIH1cclxuZXhwb3J0IGNvbnN0IGl0ckR1cFNldCA9IDxUPihhOiBJdHI8VD4pID0+IHtcclxuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8VD4oKVxyXG4gICAgY29uc3QgeiA9IG5ldyBTZXQ8VD4oKVxyXG4gICAgZm9yIChsZXQgaSBvZiBhKVxyXG4gICAgICAgIGlmIChzZXQuaGFzKGkpKVxyXG4gICAgICAgICAgICB6LmFkZChpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2V0LmFkZChpKVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5leHBvcnQgY29uc3QgaXRyTWF4ID0gPFQ+KGE6IEl0cjxUPikgPT4geyBsZXQgbyA9IGl0ckZzdChhKTsgaWYgKG8gPT09IG51bGwpIHJldHVybiBudWxsOyBmb3IgKGxldCBpIG9mIGEpIGlmIChpID4gbykgbyA9IGk7IHJldHVybiBvIH1cclxuZXhwb3J0IGNvbnN0IGl0ck1pbiA9IDxUPihhOiBJdHI8VD4pID0+IHsgbGV0IG8gPSBpdHJGc3QoYSk7IGlmIChvID09PSBudWxsKSByZXR1cm4gbnVsbDsgZm9yIChsZXQgaSBvZiBhKSBpZiAoaSA8IG8pIG8gPSBpOyByZXR1cm4gbyB9XHJcbmV4cG9ydCBjb25zdCBtYXggPSAoLi4udikgPT4gaXRyTWF4KHYpXHJcbmV4cG9ydCBjb25zdCBtaW4gPSAoLi4udikgPT4gaXRyTWluKHYpXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IG9TcnQgPSAobzogbyk6IG8gPT4ge1xyXG4gICAgaWYgKG8gPT09IG51bGwgfHwgbyA9PT0gdW5kZWZpbmVkKSByZXR1cm4ge31cclxuICAgIGNvbnN0IG9vOiBhbnkgPSB7fVxyXG4gICAgZm9yIChsZXQgayBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5zb3J0KCkpIHtcclxuICAgICAgICBvb1trXSA9IG9ba11cclxuICAgIH1cclxuICAgIHJldHVybiBvb1xyXG59XHJcbmV4cG9ydCBjb25zdCBvQnJpbmdVcERvbGxhclBycCA9IG8gPT4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBCcmluZyB1cCBhbGwge299IGNoaWxkIG9iamVjdCBtZW1iZXIgdXAgb25lIGxldmVsLiAgVGhyb3cgZXhjZXB0aW9uIGlmIHRoZXJlIGlzIG5hbWUgY29uZmxpY3RcclxuICAgICAqIGFzc3VtZSBhbGwgbWVtYmVycyBvZiB7b30gYXJlIG9iamVjdHNcclxuICAgICAqIEBwYXJhbSB7b2JqfSBvIFxyXG4gICAgICogQGV4YW1wbGUgXHJcbiAgICAgKiBjb25zdCAkYSA9IHthMTonYTEnLGEyOidzMid9XHJcbiAgICAgKiBjb25zdCAkYiA9IHtiMTonYjEnLGIyOidiMid9XHJcbiAgICAgKiBjb25zdCBvID0geyRhLCRifVxyXG4gICAgICogYnJpbmdVcChvKVxyXG4gICAgICogZXEobyx7JGEsJGIsYTEsYTIsYjEsYjJ9KVxyXG4gICAgICogLy8tLS0tLS0tLS0tLVxyXG4gICAgICogJGEueCA9IDFcclxuICAgICAqICRiLnggPSAyXHJcbiAgICAgKiB0aHcoYnJpbmdVcChvKSlcclxuICAgICAqL1xyXG4gICAgZm9yIChsZXQgY2hkTm0gaW4gbykge1xyXG4gICAgICAgIGNvbnN0IGNoZCA9IG9bY2hkTm1dXHJcbiAgICAgICAgZm9yIChsZXQgY2hkTWJyTm0gaW4gY2hkKSB7XHJcbiAgICAgICAgICAgIGlmIChvSGFzUHJwKGNoZE1ick5tKShvKSlcclxuICAgICAgICAgICAgICAgIGVyKFwie2NoZE1ick5tfSBvZiB7Y2hkfSBleGlzdHMgaW4ge299XCIsIHsgY2hkTWJyTm0sIGNoZCwgbyB9KVxyXG4gICAgICAgICAgICBvW2NoZE1ick5tXSA9IGNoZFtjaGRNYnJObV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb1xyXG59XHJcbmV4cG9ydCBjb25zdCBueUNtbFNkcnkgPSAoYTogbnkpID0+IGl0ck1hcChjbWxOeSkoYSkgYXMgc2RyeVxyXG5leHBvcnQgY29uc3Qgb0NtbERyeSA9IChhOiBvKSA9PiB7XHJcbiAgICBsZXQgeiA9IGl0ck1hcCgobm06IHMpID0+IFtjbWxObShubSksIG5tXSkob1BycE55KGEpKVxyXG4gICAgZHJ5U3J0KGF5RWxlKDApKSh6KVxyXG4gICAgY29uc3QgdyA9IHNkcnlDb2xXZHQoMCkoeilcclxuICAgIGRyeUNvbE1keSgwKShzQWxpZ25MKHcpKSh6KVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5leHBvcnQgY29uc3Qgb0N0b3JObSA9IChhOiBvKSA9PiBhICYmIGEuY29uc3RydWN0b3IgJiYgYS5jb25zdHJ1Y3Rvci5uYW1lXHJcbmV4cG9ydCBjb25zdCBvSXNJbnN0YW5jZSA9IChpbnN0YW5jZTogRnVuY3Rpb24pID0+IChhOiBvKSA9PiBhIGluc3RhbmNlb2YgaW5zdGFuY2VcclxuZXhwb3J0IGNvbnN0IG9IYXNDdG9yTm0gPSAobm06IHMpID0+IChhOiBvKSA9PiBvQ3Rvck5tKGEpID09PSBubVxyXG5leHBvcnQgY29uc3Qgb1BycCA9IChwcnBQdGg6IHMpID0+IChhOiBvKSA9PiB7XHJcbiAgICAvKipcclxuICogQGRlc2NyaXB0aW9uIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgb2Ygb2JqZWN0IHtvfSBieSBwcm9wZXJ0eSBwYXRoIHtwcHJQdGh9XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcnBQdGhcclxuICogQGV4YW1wbGVcclxuICogY29uc3QgYSA9IHtiOiB7Yzp7MX19XHJcbiAqIHJlcXVpcmUoJ2Fzc2VydCcpLmVxdWFsKHBycCgnYi5jJykobyksIDEpIFxyXG4gKi9cclxuICAgIGxldCB2XHJcbiAgICBmb3IgKGxldCBubSBvZiBwcnBQdGguc3BsaXQoJy4nKSkge1xyXG4gICAgICAgIHYgPSBhW25tXVxyXG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdlxyXG59XHJcbmV4cG9ydCBjb25zdCBubVBybV9ueSA9IChfbm1Qcm06IG55UHJtKTogbnkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBfbm1Qcm0gPT09ICdzdHJpbmcnKVxyXG4gICAgICAgIHJldHVybiBzU3BsaXRTcGMoX25tUHJtKVxyXG4gICAgcmV0dXJuIF9ubVBybVxyXG59XHJcbmV4cG9ydCBjb25zdCBueSA9IG5tUHJtX255XHJcbmV4cG9ydCBjb25zdCBvUHJwQXkgPSAoX3BycE5tOiBueVBybSkgPT4gKF9vOiBvKSA9PiBpdHJNYXAoKG5tOiBzKSA9PiBvUHJwKG5tKShfbykpKG55KF9wcnBObSkpXHJcbmV4cG9ydCBjb25zdCBvUHJwTnkgPSAoYTogbykgPT4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYSlcclxuZXhwb3J0IGNvbnN0IG9IYXNQcnAgPSAocHJwTm06IG5tKSA9PiAoYTogbykgPT4gYS5oYXNPd25Qcm9wZXJ0eShwcnBObSlcclxuZXhwb3J0IGNvbnN0IG9IYXNMZW4gPSBvSGFzUHJwKCdsZW5ndGgnKVxyXG5leHBvcnQgY29uc3Qgb0NtbE9iaiA9IChhOiBvKSA9PiB7XHJcbiAgICBjb25zdCBkcnkgPSBvQ21sRHJ5KGEpXHJcbiAgICBjb25zdCB6OiBvYmplY3QgPSB7fVxyXG4gICAgZHJ5LmZvckVhY2goKFtjbWxObSwgcHJwTm1dKSA9PiB6W2NtbE5tXSA9IHpbcHJwTm1dKVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmNvbnN0IGZ1bnNFeHBvcnQgPSAoLi4uZjogRnVuY3Rpb25bXSkgPT4gZi5mb3JFYWNoKGZ1bkV4cG9ydClcclxuY29uc3QgZnVuRXhwb3J0ID0gKGY6IEZ1bmN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBmdW5OYW1lID0gZi5uYW1lXHJcbiAgICBpZiAob0hhc1BycChmdW5OYW1lKShleHBvcnRzKSkge1xyXG4gICAgICAgIGVyKCd0aGUge2Z1bk5hbWV9IGFscmVhZHkgZXhwb3J0ZWQnLCB7IGZ1bk5hbWUgfSlcclxuICAgIH1cclxuICAgIGV4cG9ydHMuZnVuTmFtZSA9IGZcclxufVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBheUNsb25lID0gKGF5OiBheSkgPT4gYXkuc2xpY2UoMCwgYXkubGVuZ3RoKVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBzZHJ5Q29sV2R0ID0gKGNvbEl4OiBuKSA9PiAoYTogc2RyeSkgPT4gc2l0cldkdChkcnlDb2woY29sSXgpKGEpKVxyXG5leHBvcnQgY29uc3Qgc2RyeUNvbFdkdEF5ID0gKGE6IHNkcnkpID0+IGl0ck1hcCgoaTogbikgPT4gc2RyeUNvbFdkdChpKShhKSkobkl0cihkcnlDb2xDbnQoYSkpKSBhcyBuW11cclxuZXhwb3J0IGNvbnN0IGRyeUNvbCA9IChjb2xJeDogbikgPT4gKGE6IGRyeSkgPT4gaXRyTWFwKGF5RWxlT3JEZnQoJycpKGNvbEl4KSkoYSlcclxuZXhwb3J0IGNvbnN0IGRyeUNvbENudCA9IChhOiBkcnkpID0+IGl0ck1heChpdHJNYXAodkxlbikoYSkpIGFzIG5cclxuZXhwb3J0IGNvbnN0IGRyeUNlbGxNZHkgPSAoZjogZikgPT4gKGE6IGRyeSkgPT4geyBpdHJFYWNoKGF5TWR5KGYpKShhKSB9XHJcbmV4cG9ydCBjb25zdCBkcnlDbG9uZSA9IChhOiBkcnkpID0+IGl0ck1hcCgoZHI6IGRyKSA9PiBpdHJDbG9uZShkcikpKGEpIGFzIGRyeVxyXG5leHBvcnQgY29uc3QgZHJ5Q29sTWR5ID0gKGNvbEl4OiBuKSA9PiAoZjogZikgPT4gKGE6IGRyeSkgPT4geyBpdHJFYWNoKGF5TWR5RWxlKGNvbEl4KShmKSkoYSkgfVxyXG5leHBvcnQgY29uc3Qgc2RyeUxpbmVzID0gKGE6IHNkcnkpID0+IHNkcnlMeShhKS5qb2luKCdcXHJcXG4nKVxyXG5leHBvcnQgY29uc3Qgd2R0QXlMaW4gPSAod2R0QXk6IG5bXSkgPT4gXCJ8LVwiICsgaXRyTWFwKCh3OiBuKSA9PiAnLScucmVwZWF0KHcpKSh3ZHRBeSkuam9pbignLXwtJykgKyBcIi18XCJcclxuZXhwb3J0IGNvbnN0IHNkckxpbiA9ICh3ZHRBeTogbltdKSA9PiAoYTogc2RyKSA9PiB7XHJcbiAgICBsZXQgbSA9IChbdywgc10pID0+IHNBbGlnbkwodykocylcclxuICAgIGxldCB6ID0gYXlaaXAod2R0QXksIGEpXHJcbiAgICBsZXQgYXkgPSBpdHJNYXAobSkoeilcclxuICAgIGxldCBzID0gYXkuam9pbignIHwgJylcclxuICAgIHJldHVybiBcInwgXCIgKyBzICsgXCIgfFwiXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNkcnlMeSA9IChhOiBzZHJ5KSA9PiB7XHJcbiAgICBsZXQgdyA9IHNkcnlDb2xXZHRBeShhKVxyXG4gICAgbGV0IGggPSB3ZHRBeUxpbih3KVxyXG4gICAgbGV0IHo6IGx5ID0gW2hdLmNvbmNhdChpdHJNYXAoc2RyTGluKHcpKShhKSwgaClcclxuICAgIHJldHVybiB6XHJcbn1cclxuZXhwb3J0IGNvbnN0IGl0clN5ID0gKGE6IGl0cikgPT4gaXRyTWFwKFN0cmluZykoYSkgYXMgc1tdXHJcbmV4cG9ydCBjb25zdCBheVN5ID0gKGE6IGF5KSA9PiBpdHJNYXAoU3RyaW5nKShhKSBhcyBzW11cclxuZXhwb3J0IGNvbnN0IGRyeVNkcnkgPSBpdHJNYXAoYXlTeSkgYXMgKGE6IHNkcnkpID0+IHNkcnlcclxuZXhwb3J0IGNvbnN0IGRyeUx5ID0gKGE6IGRyeSkgPT4gc2RyeUx5KGRyeVNkcnkoYSkpXHJcbmV4cG9ydCBjb25zdCBkcnNMeSA9IChhOiBkcnMpID0+IHtcclxuICAgIGxldCB7IGZueSwgZHJ5IH0gPSBhXHJcbiAgICBsZXQgYiA9IFtmbnldLmNvbmNhdChkcnlTZHJ5KGRyeSkpXHJcbiAgICBsZXQgYyA9IHNkcnlMeShiKVxyXG4gICAgbGV0IHo6IGx5ID0gYy5zbGljZSgwLCAyKS5jb25jYXQoY1swXSwgYy5zbGljZSgyKSlcclxuICAgIHJldHVybiB6XHJcbn1cclxuZXhwb3J0IGNvbnN0IGRyc0xpbmVzID0gKGE6IGRycykgPT4gZHJzTHkoYSkuam9pbignXFxyXFxuJylcclxuY29uc3QgZHJ5U3J0Q29sX19zcnRGdW4gPSAoY29sQXk6IG5bXSkgPT4gKGRyQTogYXksIGRyQjogYXkpID0+IHtcclxuICAgIGZvciAobGV0IGlDb2wgb2YgY29sQXkpIHtcclxuICAgICAgICBpZiAoaUNvbCA8IDApIHtcclxuICAgICAgICAgICAgaWYgKGRyQVstaUNvbF0gPiBkckJbLWlDb2xdKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xXHJcbiAgICAgICAgICAgIGlmIChkckFbLWlDb2xdIDwgZHJCWy1pQ29sXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGRyQVtpQ29sXSA+IGRyQltpQ29sXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgICAgIGlmIChkckFbaUNvbF0gPCBkckJbaUNvbF0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTFcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMFxyXG59XHJcbmV4cG9ydCBjb25zdCBkcnlTcnRDb2wgPSAoY29sQXk6IG5bXSkgPT4gKGE6IGRyeSkgPT4gYS5zb3J0KGRyeVNydENvbF9fc3J0RnVuKGNvbEF5KSlcclxuZXhwb3J0IGNvbnN0IGRyeVNydCA9IChmdW5fb2ZfZHJfdG9fa2V5OiAoZHI6IGRyKSA9PiBzKSA9PiAoYTogZHJ5KSA9PiBhLnNvcnQoKGRyX0EsIGRyX0IpID0+IHZ2Q29tcGFyZShmdW5fb2ZfZHJfdG9fa2V5KGRyX0EpLCBmdW5fb2ZfZHJfdG9fa2V5KGRyX0IpKSlcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3Qgb3lQcnBDb2wgPSBwcnBObSA9PiBveSA9PiB7IGNvbnN0IG9vOiBheSA9IFtdOyBmb3IgKGxldCBvIG9mIG95KSBvby5wdXNoKG9bcHJwTm1dKTsgcmV0dXJuIG9vIH1cclxuZXhwb3J0IGNvbnN0IG95UHJwRHJ5ID0gcHJwTnkgPT4gb3kgPT4geyBjb25zdCBvbzogYXkgPSBbXTsgZm9yIChsZXQgbyBvZiBveSkgb28ucHVzaChvUHJwQXkocHJwTnkpKG8pKTsgcmV0dXJuIG9vIH1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGxldCBzTGlrOiAobGlrOiBzKSA9PiAoczogcykgPT4gYlxyXG5leHBvcnQgbGV0IHNIYXNTYnNcclxue1xyXG4gICAgY29uc3QgX2lzRXNjID0gaSA9PiB7IGZvciAobGV0IHNwZWMgb2YgXCIoKVtde30vfC4rXCIpIGlmIChpID09PSBzcGVjKSByZXR1cm4gdHJ1ZSB9XHJcbiAgICBjb25zdCBfZXNjU3BlYyA9IGxpayA9PiBpdHJNYXAoaSA9PiBpID09PSAnXFxcXCcgPyAnXFxcXFxcXFwnIDogKF9pc0VzYyhpKSA/ICdcXFxcJyArIGkgOiBpKSkobGlrKS5qb2luKCcnKSAvLzsgY29uc3QgeHh4ID0gX2VzY1NwZWMoXCJhYmM/ZGRcIik7IGRlYnVnZ2VyXHJcbiAgICBjb25zdCBfZXNjU3RhciA9IGxpayA9PiBpdHJNYXAoaSA9PiBpID09PSAnKicgPyAnLionIDogaSkobGlrKS5qb2luKCcnKVxyXG4gICAgY29uc3QgX2VzY1EgPSBsaWsgPT4geyBjb25zdCBvOiBheSA9IFtdOyBmb3IgKGxldCBpIG9mIGxpaykgby5wdXNoKGkgPT09ICc/JyA/ICcuJyA6IGkpOyByZXR1cm4gby5qb2luKCcnKSB9XHJcbiAgICBjb25zdCBfZXNjID0gbGlrID0+IFwiXlwiICsgcGlwZShsaWspKF9lc2NTcGVjLCBfZXNjU3RhciwgX2VzY1EpICsgXCIkXCJcclxuICAgIGNvbnN0IF9saWtSZSA9IGxpayA9PiBuZXcgUmVnRXhwKF9lc2MobGlrKSlcclxuICAgIGNvbnN0IF9pc0VzY1NicyA9IGkgPT4geyBmb3IgKGxldCBzcGVjIG9mIFwiKClbXXt9L3wuKz8qXCIpIGlmIChpID09PSBzcGVjKSByZXR1cm4gdHJ1ZSB9XHJcbiAgICBjb25zdCBfZXNjU2JzID0gYyA9PiBjID09PSAnXFxcXCcgPyAnXFxcXFxcXFwnIDogKF9pc0VzY1NicyhjKSA/ICdcXFxcJyArIGMgOiBjKVxyXG4gICAgc0xpayA9IChsaWs6IHMpID0+IChhOiBzKSA9PiBfbGlrUmUoYSkudGVzdChhKVxyXG4gICAgc0hhc1NicyA9IChzYnM6IHMpID0+IChhOiBzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgX2VzY1NwZWMgPSBpdHJNYXAoX2VzY1Nicykoc2JzKS5qb2luKFwiXCIpXHJcbiAgICAgICAgY29uc3QgX3Nic1JlID0gbmV3IFJlZ0V4cChfZXNjU3BlYylcclxuICAgICAgICBsZXQgbyA9IF9zYnNSZS50ZXN0KGEpXHJcbiAgICAgICAgcmV0dXJuIG9cclxuICAgIH1cclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgcHRoRm5BeSA9IChwdGg6IHMsIGxpaz86IHMpID0+IHtcclxuICAgIGlmICghZnMuZXhpc3RzU3luYyhwdGgpKSByZXR1cm4gbnVsbFxyXG4gICAgY29uc3QgaXNGaWwgPSBlbnRyeSA9PiBmcy5zdGF0U3luYyhwYXRoLmpvaW4ocHRoLCBlbnRyeSkpLmlzRmlsZSgpO1xyXG4gICAgbGV0IGVudHJpZXMgPSBmcy5yZWFkZGlyU3luYyhwdGgpXHJcbiAgICBlbnRyaWVzID0gKGxpayA9PT0gdW5kZWZpbmVkKSA/IGVudHJpZXMgOiBpdHJXaGVyZShzTGlrKGxpaykpKGVudHJpZXMpXHJcbiAgICBsZXQgbzogc1tdID0gaXRyV2hlcmUoaXNGaWwpKGVudHJpZXMpXHJcbiAgICByZXR1cm4gb1xyXG59OyAvLyBjb25zdCB4eHggPSBwdGhGbkF5KFwiYzpcXFxcdXNlcnNcXFxcdXNlclxcXFxcIiwgXCJzZGZkZiouKlwiKTsgZGVidWdnZXI7XHJcbmV4cG9ydCBjb25zdCBheVppcCA9IChhOiBheSwgYjogYXkpID0+IGl0ck1hcCgoaTogbikgPT4gW2FbaV0sIGJbaV1dKShuSXRyKGEubGVuZ3RoKSlcclxuZXhwb3J0IGNvbnN0IGVudHJ5U3RhdFBtID0gYXN5bmMgKGEpID0+IHtcclxuICAgIGRlYnVnZ2VyXHJcbiAgICB0aHJvdyAwXHJcbn1cclxuZXhwb3J0IGNvbnN0IHB0aEZuQXlQbSA9IGFzeW5jIChhOiBwdGgsIGxpaz86IHMpID0+IHtcclxuICAgIGRlYnVnZ2VyXHJcbiAgICB0aHJvdyAwXHJcbiAgICAvKlxyXG4gICAgY29uc3QgYiA9IGF3YWl0IHB0aFN0YXRBeVBtKGEsIGxpaylcclxuICAgIGxldCBkOiBmbltdID0gcGlwZShuSXRyKGIubGVuZ3RoKSkoaXRyV2hlcmUoaSA9PiBiW2ldLmlzRmlsZSgpKSwgaXRyTWFwKGkgPT4gZW50cmllc1tpXSkpXHJcbiAgICBkZWJ1Z2dlclxyXG4gICAgcmV0dXJuIGRcclxuICAgICovXHJcbn1cclxuZXhwb3J0IGNvbnN0IHB0aFN0YXRPcHRBeVBtID0gYXN5bmMgKGE6IHB0aCwgbGlrPzogcykgPT4ge1xyXG4gICAgY29uc3QgYiA9IGF3YWl0IHBtPGZuW10+KGZzLnJlYWRkaXIsIGEpXHJcbiAgICBjb25zdCBiMSA9IChsaWsgPT09IHVuZGVmaW5lZCkgPyBiIDogaXRyV2hlcmUoc0xpayhsaWspKShiKVxyXG4gICAgY29uc3QgaiA9IGIgPT4gcGF0aC5qb2luKGEsIGIpXHJcbiAgICBjb25zdCBiMiA9IGl0ck1hcChqKShiMSlcclxuICAgIGNvbnN0IHN0YXQgPSBlbnRyeSA9PiBwbVJzbHRPcHQoZnMuc3RhdCwgZW50cnkpXHJcbiAgICBjb25zdCBjID0gaXRyTWFwKHN0YXQpKGIyKVxyXG4gICAgY29uc3QgeiA9IGF3YWl0IFByb21pc2UuYWxsKGMpXHJcbiAgICByZXR1cm4geiBhcyAoZnMuU3RhdHMgfCBudWxsKVtdXHJcbn1cclxuZXhwb3J0IGNvbnN0IHB0aEZkckF5UG0gPSBhc3luYyAoYTogcHRoLCBsaWs/OiBzKSA9PiB7XHJcblxyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBuTXVsdGlwbHkgPSB4ID0+IGEgPT4gYSAqIHhcclxuZXhwb3J0IGNvbnN0IG5EaXZpZGUgPSB4ID0+IGEgPT4gYSAvIHhcclxuZXhwb3J0IGNvbnN0IHZBZGQgPSB4ID0+IGEgPT4gYSArIHhcclxuZXhwb3J0IGNvbnN0IG5NaW51cyA9IHggPT4gYSA9PiBhIC0geFxyXG5leHBvcnQgY29uc3QgbkRlY3IgPSBuTWludXMoMSlcclxuZXhwb3J0IGNvbnN0IG5JbmNyID0gdkFkZCgxKVxyXG5leHBvcnQgY29uc3Qgbkl0ciA9IGZ1bmN0aW9uKiAobikgeyBmb3IgKGxldCBqID0gMDsgaiA8IG47IGorKykgeWllbGQgaiB9XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCB2dkNvbXBhcmUgPSAoYSwgYikgPT4gYSA9PT0gYiA/IDAgOiBhID4gYiA/IDEgOiAtMVxyXG5leHBvcnQgY29uc3QgbGF6eSA9IHZmID0+IHsgbGV0IHYsIGRvbmUgPSBmYWxzZTsgcmV0dXJuICgpID0+IHsgaWYgKCFkb25lKSB7IHYgPSB2ZigpOyBkb25lID0gdHJ1ZSB9OyByZXR1cm4gdiB9IH1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IG9wdE1hcCA9IDxULCBVPihmOiAoYTogVCkgPT4gVSkgPT4gKGE6IFQgfCBudWxsKSA9PiBhICE9PSBudWxsID8gZihhKSA6IGFcclxuZXhwb3J0IGNvbnN0IGZmbiA9IChhOiBmZm4pID0+IG5ldyBGZm4oYSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGZm4ge1xyXG4gICAgcHJpdmF0ZSBfZmZuOiBmZm5cclxuICAgIHByaXZhdGUgX2RvdFBvczogblxyXG4gICAgcHJpdmF0ZSBfc2VwUG9zOiBuXHJcbiAgICBjb25zdHJ1Y3RvcihhOiBmZm4pIHtcclxuICAgICAgICB0aGlzLl9mZm4gPSBhXHJcbiAgICAgICAgdGhpcy5fZG90UG9zID0gYS5sYXN0SW5kZXhPZignLicpXHJcbiAgICAgICAgdGhpcy5fc2VwUG9zID0gYS5sYXN0SW5kZXhPZihwdGhzZXApXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHptaWQoYXQ6IG4pIHsgcmV0dXJuIHNNaWQoYXQpKHRoaXMuZmZuKSB9XHJcbiAgICBwcml2YXRlIHpsZWZ0KGF0OiBuKSB7IHJldHVybiBzTGVmdChhdCkodGhpcy5mZm4pIH1cclxuICAgIGdldCBmZm4oKSB7IHJldHVybiB0aGlzLl9mZm4gfVxyXG4gICAgZ2V0IHB0aCgpIHsgY29uc3QgYXQgPSB0aGlzLl9zZXBQb3M7IHJldHVybiBhdCA9PT0gLTEgPyAnJyA6IHRoaXMuemxlZnQoYXQgKyAxKSB9XHJcbiAgICBnZXQgZm4oKSB7IGNvbnN0IGF0ID0gdGhpcy5fc2VwUG9zOyByZXR1cm4gYXQgPT09IC0xID8gdGhpcy5mZm4gOiB0aGlzLnptaWQoYXQgKyAxKSB9XHJcbiAgICBnZXQgZXh0KCkgeyBjb25zdCBhdCA9IHRoaXMuX2RvdFBvczsgcmV0dXJuIGF0ID09PSAtMSA/ICcnIDogdGhpcy56bWlkKGF0KSB9XHJcbiAgICBnZXQgbm9FeHQoKSB7IGNvbnN0IGF0ID0gdGhpcy5fZG90UG9zOyByZXR1cm4gYXQgPT09IC0xID8gdGhpcy5mZm4gOiB0aGlzLnpsZWZ0KGF0KSB9XHJcbiAgICBnZXQgZmZubigpIHsgcmV0dXJuIHRoaXMubm9FeHQgfVxyXG4gICAgZ2V0IGZubigpIHsgcmV0dXJuIGZmbih0aGlzLm5vRXh0KS5mbiB9XHJcbiAgICBhZGRGblNmeChzZng6IHMpIHsgcmV0dXJuIHRoaXMuZmZubiArIHNmeCArIHRoaXMuZXh0IH1cclxuICAgIHJwbEV4dChleHQ6IHMpIHsgcmV0dXJuIHRoaXMuZmZubiArIGV4dCB9XHJcbiAgICBtYWtCYWNrdXAoKSB7XHJcbiAgICAgICAgY29uc3QgZXh0ID0gdGhpcy5leHRcclxuICAgICAgICBjb25zdCBmZm5uID0gdGhpcy5mZm5uXHJcbiAgICAgICAgY29uc3QgcHRoID0gdGhpcy5wdGhcclxuICAgICAgICBjb25zdCBmZm4gPSB0aGlzLmZmblxyXG4gICAgICAgIGxldCBiID0gc1JpZ2h0KDEyKShmZm5uKVxyXG4gICAgICAgIGNvbnN0IGlzQmFja3VwRmZuID0gKHNIYXNQZngoXCIoYmFja3VwLVwiKShmZm4pKSAmJiAoc0hhc1NmeChcIilcIikoZmZuKSlcclxuICAgICAgICBjb25zdCBmbiA9IHRoaXMuZm5cclxuICAgICAgICBjb25zdCBiYWNrdXBTdWJGZHIgPSBgLmJhY2t1cFxcXFwke2ZufVxcXFxgXHJcbiAgICAgICAgY29uc3QgYmFja3VwUHRoID0gcHRoICsgYmFja3VwU3ViRmRyXHJcblxyXG4gICAgICAgIGlmIChleHQgPT09ICcuYmFja3VwJykgZXIoXCJnaXZlbiBbZXh0XSBjYW5ub3QgYmUgJy5iYWNrdXBcIiwgeyBleHQsIGZmbm4gfSlcclxuICAgICAgICBpZiAoaXNCYWNrdXBGZm4pIGVyKFwie2Zmbn0gY2Fubm90IGJlIGEgYmFja3VwIGZpbGUgbmFtZVwiLCB7IGZmbjogdGhpcy5mZm4gfSlcclxuXHJcbiAgICAgICAgbGV0IGMgPSBwdGhGbkF5KGJhY2t1cFB0aCwgZmZubiArICcoYmFja3VwLT8/PyknICsgZXh0KVxyXG4gICAgICAgIGxldCBueHRCYWNrdXBOTk4gPVxyXG4gICAgICAgICAgICBjID09PSBudWxsIHx8IGlzRW1wKGIpID8gJzAwMCcgOlxyXG4gICAgICAgICAgICAgICAgcGlwZShjKShpdHJNYXgsIGZmblJtdkV4dCwgc1Jtdkxhc0Nociwgc1JpZ2h0KDMpLCBOdW1iZXIucGFyc2VJbnQsIG5JbmNyLCBuUGFkWmVybygzKSlcclxuICAgICAgICBjb25zdCBiYWNrdXBGZm4gPSBiYWNrdXBQdGggKyBmZm5BZGRGblNmeChgKGJhY2t1cC0ke254dEJhY2t1cE5OTn0pYCkoZm4pXHJcbiAgICAgICAgcHRoRW5zU3ViRmRyKGJhY2t1cFN1YkZkcikocHRoKTsgZnMuY29weUZpbGVTeW5jKHRoaXMuZmZuLCBiYWNrdXBGZm4pXHJcbiAgICB9XHJcbn1cclxuLy8gY29uc3QgeHh4ID0gZmZuKF9fZmlsZW5hbWUpOyBkZWJ1Z2dlclxyXG5leHBvcnQgY29uc3QgZmZuTWFrQmFja3VwID0gKGE6IGZmbikgPT4ge1xyXG4gICAgY29uc3QgZXh0ID0gZmZuRXh0KGEpXHJcbiAgICBjb25zdCBmZm5uID0gZmZuUm12RXh0KGEpXHJcbiAgICBjb25zdCBwdGggPSBmZm5QdGgoYSlcclxuICAgIGxldCBiID0gc1JpZ2h0KDEyKShmZm5uKVxyXG4gICAgY29uc3QgaXNCYWNrdXBGZm4gPSAoc0hhc1BmeChcIihiYWNrdXAtXCIpKGEpKSAmJiAoc0hhc1NmeChcIilcIikoYSkpXHJcbiAgICBjb25zdCBmbiA9IGZmbkZuKGEpXHJcbiAgICBjb25zdCBiYWNrdXBTdWJGZHIgPSBgLmJhY2t1cFxcXFwke2ZufVxcXFxgXHJcbiAgICBjb25zdCBiYWNrdXBQdGggPSBwdGggKyBiYWNrdXBTdWJGZHJcclxuXHJcbiAgICBpZiAoZXh0ID09PSAnLmJhY2t1cCcpIGVyKFwiZ2l2ZW4gW2V4dF0gY2Fubm90IGJlICcuYmFja3VwXCIsIHsgZXh0LCBmZm5uIH0pXHJcbiAgICBpZiAoaXNCYWNrdXBGZm4pIGVyKFwiZmZuIGNhbm5vdCBiZSBhIGJhY2t1cCBmaWxlIG5hbWVcIiwgeyBmZm46IGEgfSlcclxuXHJcbiAgICBsZXQgYyA9IHB0aEZuQXkoYmFja3VwUHRoLCBmZm5uICsgJyhiYWNrdXAtPz8/KScgKyBleHQpXHJcbiAgICBsZXQgbnh0QmFja3VwTk5OID1cclxuICAgICAgICBjID09PSBudWxsIHx8IGlzRW1wKGIpID8gJzAwMCcgOlxyXG4gICAgICAgICAgICBwaXBlKGMpKGl0ck1heCwgZmZuUm12RXh0LCBzUm12TGFzQ2hyLCBzUmlnaHQoMyksIE51bWJlci5wYXJzZUludCwgbkluY3IsIG5QYWRaZXJvKDMpKVxyXG4gICAgY29uc3QgYmFja3VwRmZuID0gYmFja3VwUHRoICsgZmZuQWRkRm5TZngoYChiYWNrdXAtJHtueHRCYWNrdXBOTk59KWApKGZuKVxyXG4gICAgcHRoRW5zU3ViRmRyKGJhY2t1cFN1YkZkcikocHRoKTsgZnMuY29weUZpbGVTeW5jKGEsIGJhY2t1cEZmbilcclxufVxyXG5leHBvcnQgY29uc3Qgc3JjRXhwU3RtdCA9IChhOiBseSkgPT4ge1xyXG4gICAgbGV0IG55ID0gc3JjRXhwQ29uc3ROeShhKVxyXG4gICAgbnkgPSBpdHJXaGVyZShwcmVkTm90KHNIYXNQZngoXCJfXCIpKSkobnkpLnNvcnQoKVxyXG4gICAgaWYgKGlzRW1wKG55KSkgcmV0dXJuIG51bGxcclxuICAgIGNvbnN0IHggPSBheUpuQXNMaW5lcyhcIiwgXCIsIDQsIDEyMCkobnkpXHJcbiAgICBsZXQgeiA9IFwiZXhwb3J0IHtcXHJcXG5cIiArIHggKyBcIlxcclxcbn1cIlxyXG4gICAgcmV0dXJuIHogYXMgc1xyXG59XHJcbmV4cG9ydCBjb25zdCBjdXJFeHBTdG10ID0gKCkgPT4gcGlwZShfX2ZpbGVuYW1lKShmdEx5LCBzcmNFeHBTdG10KSBhcyBzXHJcbi8vIGRtcChjdXJFeHBTdG10KTsgZGVidWdnZXJcclxuZXhwb3J0IGNvbnN0IGZqc1JwbEV4cFN0bXQgPSBmanMgPT4ge1xyXG4gICAgY29uc3Qgb2xkTHkgPSBmdEx5KGZqcylcclxuICAgIGNvbnN0IG5ld0xpbiA9IHNyY0V4cFN0bXQob2xkTHkpXHJcblxyXG4gICAgbGV0IG9sZEJlZ0l4ID0gYXlGaW5kSXgoc0hhc1BmeChcImV4cG9ydHMge1wiKSkob2xkTHkpXHJcbiAgICBsZXQgb2xkRW5kSXg6IG4gPSAoKCkgPT4ge1xyXG4gICAgICAgIGlmIChvbGRCZWdJeCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpOiBuID0gb2xkQmVnSXg7IGkgPCBvbGRMeS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKC9cXH0vLnRlc3Qob2xkTHlbaV0pKSByZXR1cm4gaSsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDBcclxuICAgIH0pKClcclxuICAgIGNvbnN0IG9sZExpbiA9IChvbGRCZWdJeCA9PT0gbnVsbCB8fCBvbGRFbmRJeCA9PT0gbnVsbCkgPyBudWxsIDogb2xkTHkuc2xpY2Uob2xkQmVnSXgsIG9sZEVuZEl4KS5qb2luKCdcXHJcXG4nKVxyXG4gICAgY29uc3QgbmV3TGluZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaGFzTmV3TGluID0gbmV3TGluICE9PSBudWxsXHJcbiAgICAgICAgY29uc3QgaGFzT2xkTGluID0gb2xkTGluICE9PSBudWxsXHJcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgKGhhc05ld0xpbiAmJiBoYXNPbGRMaW4pOlxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZEJlZ0l4ICE9PSBudWxsKSB7IG9sZEx5LnNwbGljZShvbGRCZWdJeCwgb2xkRW5kSXgsIHZEZnRTdHIobmV3TGluKSk7IHJldHVybiBheUpuQ3JMZihvbGRMeSkgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7IGVyKFwiaW1wb3NzaWJsZVwiKTsgaGFsdCgpIH1cclxuICAgICAgICAgICAgY2FzZSAoaGFzTmV3TGluICYmICFoYXNPbGRMaW4pOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF5Sm5DckxmKG9sZEx5LmNvbmNhdCh2RGZ0U3RyKG5ld0xpbikpKVxyXG4gICAgICAgICAgICBjYXNlIChoYXNPbGRMaW4pOlxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZEJlZ0l4ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXIoXCJpbXBvc3NpYmxlXCIpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyBvbGRMeS5zcGxpY2Uob2xkQmVnSXgsIG9sZEVuZEl4KTsgcmV0dXJuIGF5Sm5DckxmKG9sZEx5KSB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBlcihcImltcG9zc2libGVcIik7IGhhbHQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXlKbkNyTGYob2xkTHkpXHJcbiAgICB9XHJcbiAgICBsZXQgYSA9IG5ld0xpbmVzKClcclxuICAgIGlmIChvbGRMaW4gIT09IG5ld0xpbikgeyBkZWJ1Z2dlcjsgZmZuTWFrQmFja3VwKGZqcyk7IHNXcnQoZmpzKShuZXdMaW5lcygpKSB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzeUxpbiA9IChhOiBzeSkgPT4gaXRyTWFwKHNFc2NWYmFyKShhKS5qb2luKCcgfCAnKVxyXG5cclxuZXhwb3J0IGNvbnN0IGxpbmVzQWxpZ25MID0gKHdkdDogbikgPT4gKGE6IGxpbmVzKSA9PiB7XHJcbiAgICBjb25zdCBhMSA9IHNTcGxpdENyTGYoYSlcclxuICAgIGNvbnN0IGFMYXMgPSBheUxhcyhhMSlcclxuICAgIGNvbnN0IG4gPSB3ZHQgLSBhTGFzLmxlbmd0aFxyXG4gICAgY29uc3QgcyA9IG5TcGMobilcclxuICAgIGNvbnN0IHogPSBhICsgc1xyXG4gICAgcmV0dXJuIHpcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGxpbmVzV2R0ID0gKGE6IGxpbmVzKSA9PiB7XHJcbiAgICBjb25zdCBhMSA9IHNTcGxpdENyTGYoYSlcclxuICAgIGNvbnN0IHo6IG4gPSBpdHJXZHQoYTEpXHJcbiAgICByZXR1cm4gelxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGluZXNBeVdkdCA9IChhOiBsaW5lc1tdKSA9PiB7XHJcbiAgICBjb25zdCBhMSA9IGl0ck1hcChsaW5lc1dkdCkoYSlcclxuICAgIGNvbnN0IHo6IG4gfCBudWxsID0gaXRyTWF4KGExKVxyXG4gICAgcmV0dXJuIHogPT09IG51bGwgPyAwIDogelxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGluZXNBeUFsaWduTCA9IChhOiBsaW5lc1tdKSA9PiB7XHJcbiAgICBjb25zdCB3ID0gbGluZXNBeVdkdChhKSArIDFcclxuICAgIGNvbnN0IHo6IGxpbmVzW10gPSBpdHJNYXAobGluZXNBbGlnbkwodykpKGEpXHJcbiAgICByZXR1cm4gelxyXG59XHJcbmV4cG9ydCBjb25zdCB2U2F2ID0gKHZpZDogdmlkKSA9PiAoYSkgPT4gc1dydCh2aWRGanNvbih2aWQpKShKU09OLnN0cmluZ2lmeShhKSlcclxuZXhwb3J0IGNvbnN0IHZpZHB0aCA9IF9fZGlybmFtZSArIHB0aHNlcCArICd0ZXN0LXJlc291cmNlcycgKyBwdGhzZXBcclxucHRoRW5zKHZpZHB0aClcclxuZXhwb3J0IGNvbnN0IHJlUHVuRXhjcERvdCA9IC9bXFwoXFwpXS9nXHJcbmV4cG9ydCBjb25zdCBzUnBsUHVuRXhjcERvdCA9IChzOiBzKTogcyA9PiBzLnJlcGxhY2UocmVQdW5FeGNwRG90LCAnICcpXHJcbmV4cG9ydCBjb25zdCB2aWRwdGhCcncgPSAoKSA9PiBwdGhCcncodmlkcHRoKVxyXG5leHBvcnQgY29uc3QgdmlkRmpzb24gPSAoYTogdmlkKSA9PiB2aWRwdGggKyBhICsgJy5qc29uJ1xyXG5leHBvcnQgY29uc3QgZmpzb25WYWwgPSAoYTogZmZuKSA9PiBKU09OLnBhcnNlKGZ0TGluZXMoYSkpXHJcbmV4cG9ydCBjb25zdCB2aWRWYWwgPSAoYTogdmlkKSA9PiBmanNvblZhbCh2aWRGanNvbihhKSlcclxuZXhwb3J0IGNvbnN0IHZpZEJydyA9IChhOiB2aWQpID0+IGZ0QnJ3KHZpZEZqc29uKGEpKVxyXG5leHBvcnQgY29uc3Qgc1NhdiA9IChzaWQ6IHNpZCkgPT4gKGE6IHMpID0+IHNXcnQoc2lkRnQoc2lkKSkoYSlcclxuZXhwb3J0IGNvbnN0IHNpZHB0aCA9IHZpZHB0aFxyXG5leHBvcnQgY29uc3Qgc2lkcHRoQnJ3ID0gKCkgPT4gcHRoQnJ3KHNpZHB0aClcclxuZXhwb3J0IGNvbnN0IHNpZEZ0ID0gKGE6IHNpZCkgPT4gc2lkcHRoICsgYSArICcudHh0J1xyXG5leHBvcnQgY29uc3Qgc2lkU3RyID0gKGE6IHNpZCkgPT4gZnRMaW5lcyhzaWRGdChhKSlcclxuZXhwb3J0IGNvbnN0IHNpZEJydyA9IChhOiBzaWQpID0+IGZ0QnJ3KHNpZEZ0KGEpKVxyXG5leHBvcnQgY29uc3QgdlRlZSA9IDxUPihmOiAoYTogVCkgPT4gdm9pZCkgPT4gKGE6IFQpID0+IHsgZihhKTsgcmV0dXJuIGEgfVxyXG5leHBvcnQgY29uc3QgZnRXcnQgPSAoczogcykgPT4gKGE6IGZ0KSA9PiBmcy53cml0ZUZpbGVTeW5jKGEsIHMpXHJcbmV4cG9ydCBjb25zdCBjbWRTaGVsbCA9IGNoaWxkX3Byb2Nlc3MuZXhlYyBhcyAoYTogcykgPT4gdm9pZFxyXG5leHBvcnQgY29uc3QgY21kU2hlbGxTeW5jID0gY2hpbGRfcHJvY2Vzcy5leGVjIGFzIChhOiBzKSA9PiB2b2lkXHJcbmV4cG9ydCBjb25zdCBmdEJydyA9IChhOiBmdCkgPT4gY21kU2hlbGwoYGNvZGUuY21kIFwiJHthfVwiYClcclxuZXhwb3J0IGNvbnN0IGZ0QnJ3U3luYyA9IChhOiBmdCkgPT4gY21kU2hlbGxTeW5jKGBjb2RlLmNtZCBcIiR7YX1cIidgKVxyXG5leHBvcnQgY29uc3Qgc0JydyA9IChhOiBzKSA9PiB7IHBpcGUodG1wZnQoKSkodlRlZShmdFdydChhKSksIGZ0QnJ3KSB9XHJcbmV4cG9ydCBjb25zdCBzQnJ3QXRGZHJGbiA9IChfZmRyOiBzLCBfZm46IHMpID0+IChfczogcykgPT4geyBwaXBlKHRtcGZmbkJ5RmRyRm4oX2ZkciwgX2ZuKSkodlRlZShmdFdydChfcykpLCBmdEJydykgfVxyXG5leHBvcnQgY29uc3Qgb0Jyd0F0RmRyRm4gPSAoX2ZkcjogcywgX2ZuOiBzKSA9PiAoX28pID0+IHsgcGlwZSh0bXBmZm5CeUZkckZuKF9mZHIsIF9mbiArICcuanNvbicpKSh2VGVlKGZ0V3J0KG9Kc29uTGluZXMoX28pKSksIGZ0QnJ3KSB9XHJcbmV4cG9ydCBjb25zdCBzanNvbkJydyA9IChfczogcywgX2Zkcj86IHMsIF9mbj86IHMpID0+IHsgcGlwZSh0bXBmanNvbihfZmRyLCBfZm4pKSh2VGVlKGZ0V3J0KF9zKSksIGZ0QnJ3KSB9XHJcbmV4cG9ydCBjb25zdCBseUJydyA9IGNvbXBvc2UoYXlKbkxmLCBzQnJ3KSBhcyAoYTogbHkpID0+IHZvaWRcclxuZXhwb3J0IGNvbnN0IGx5QnJ3U3RvcCA9IGNvbXBvc2UobHlCcncsIHN0b3ApIGFzIChhOiBseSkgPT4gdm9pZFxyXG5leHBvcnQgdHlwZSBfZGljU3BsaXRQcmVkPFY+ID0gKFtzLCBWXSkgPT4gYlxyXG5leHBvcnQgY29uc3QgZGljS3kgPSA8VD4oX2RpYzogZGljPFQ+KTogc3kgPT4gaXRyQXkoX2RpYy5rZXlzKCkpXHJcbmV4cG9ydCBjb25zdCBkaWNLc2V0ID0gKF9kaWM6IGRpYzxhbnk+KTogc3NldCA9PiBpdHJTZXQoX2RpYy5rZXlzKCkpXHJcbmV4cG9ydCBjb25zdCBzZGljS3NldCA9IGRpY0tzZXQgYXMgKF9zZGljOiBzZGljKSA9PiBzc2V0XHJcbmV4cG9ydCBjb25zdCBkaWNWYWxBeSA9IDxUPihfZGljOiBkaWM8VD4pOiBUW10gPT4gaXRyQXkoX2RpYy52YWx1ZXMoKSlcclxuZXhwb3J0IGNvbnN0IHNkaWNWYWxBeSA9IChfc2RpYzogc2RpYyk6IHN5ID0+IGRpY1ZhbEF5KF9zZGljKVxyXG5leHBvcnQgY29uc3QgZGljQnJrRm9yVHJ1ZUZhbHNlID0gPFY+KGZ1bjogKFtzLCBWXSkgPT4gYikgPT4gKGQ6IGRpYzxWPik6IHRmUGFpcjxkaWM8Vj4+ID0+IHtcclxuICAgIGNvbnN0IHQgPSBuZXcgTWFwPHMsIGFueT4oKVxyXG4gICAgY29uc3QgZiA9IG5ldyBNYXA8cywgYW55PigpXHJcbiAgICBmb3IgKGxldCBbaywgdl0gb2YgZCkge1xyXG4gICAgICAgIGlmIChmdW4oW2ssIHZdKSlcclxuICAgICAgICAgICAgdC5zZXQoaywgdilcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGYuc2V0KGssIHYpXHJcbiAgICB9XHJcbiAgICByZXR1cm4geyB0LCBmIH1cclxufVxyXG5leHBvcnQgY29uc3QgZGljQnJ3ID0gY29tcG9zZShkaWNMeSwgbHlCcncpIGFzIDxUPihhOiBkaWM8VD4pID0+IHZvaWRcclxuZXhwb3J0IGNvbnN0IG9Kc29uTGluZXMgPSBKU09OLnN0cmluZ2lmeSBhcyAoYTogbykgPT4gbGluZXNcclxuZXhwb3J0IGNvbnN0IG9Bc0V4cCA9IChvKTogbGluZXMgPT4gJ2NvbnN0IGV4cCA9ICcgKyBvSnNvbkxpbmVzKG8pXHJcbmV4cG9ydCBjb25zdCBzZHJ5QnJ3ID0gY29tcG9zZShzZHJ5TGluZXMsIHNCcncpIGFzIChhOiBzZHJ5KSA9PiB2b2lkXHJcbmV4cG9ydCBjb25zdCBkcnlCcncgPSBjb21wb3NlKGRyeVNkcnksIHNkcnlCcncpIGFzIChhOiBkcnkpID0+IHZvaWRcclxuZXhwb3J0IGNvbnN0IGRyc0JydyA9IGNvbXBvc2Uoc0JydywgZHJzTGluZXMpIGFzIChhOiBkcnMpID0+IHZvaWRcclxuZXhwb3J0IGNvbnN0IG55QnJ3ID0gY29tcG9zZShpdHJNYXAoY21sTnkpLCBzZHJ5QnJ3KSBhcyAoYTogbnkpID0+IHZvaWRcclxuZXhwb3J0IGNvbnN0IHNyY0V4cENvbnN0TnlCcncgPSBjb21wb3NlKHNyY0V4cENvbnN0TnksIG55QnJ3KVxyXG5leHBvcnQgY29uc3QgZnRzRXhwQ29uc3ROeUJydyA9IGNvbXBvc2UoZnRMeSwgc3JjRXhwQ29uc3ROeUJydylcclxuZXhwb3J0IGNvbnN0IG9CcncgPSAobywgZmRyPzogcywgbm0/OiBzKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBzID0gb0pzb25MaW5lcyhvKVxyXG4gICAgc2pzb25CcncocywgZmRyLCBubSlcclxufVxyXG5leHBvcnQgY29uc3Qgb0Jyd0FzRXhwID0gY29tcG9zZShvQXNFeHAsIHNCcndBdEZkckZuKCdhc0V4cGVjdGVkSnMnLCAnYXNFeHBlY3QuanMnKSkgYXMgKGE6IG8pID0+IHZvaWRcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfaXNObSA9IChjOiBuKSA9PiB0cnVlXHJcbmV4cG9ydCBjb25zdCBjaHJDZCA9IChzOiBzKSA9PiBzLmNoYXJDb2RlQXQoMClcclxuZXhwb3J0IGNvbnN0IGNockNkX2EgPSBjaHJDZCgnYScpXHJcbmV4cG9ydCBjb25zdCBjaHJDZF96ID0gY2hyQ2QoJ3onKVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfQSA9IGNockNkKCdBJylcclxuZXhwb3J0IGNvbnN0IGNockNkX1ogPSBjaHJDZCgnWicpXHJcbmV4cG9ydCBjb25zdCBjaHJDZF8wID0gY2hyQ2QoJzAnKVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfOSA9IGNockNkKCc5JylcclxuZXhwb3J0IGNvbnN0IGNockNkX2RvbGxhciA9IGNockNkKCckJylcclxuZXhwb3J0IGNvbnN0IGNockNkX3VuZGVyU2NvcmUgPSBjaHJDZCgnXycpXHJcbmV4cG9ydCBjb25zdCBjaHJDZF9pc1NtYWxsTGV0dGVyID0gdkJFVChjaHJDZF9hLCBjaHJDZF96KVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfaXNDYXBpdGFsTGV0dGVyID0gdkJFVChjaHJDZF9BLCBjaHJDZF9aKVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfaXNMZXR0ZXIgPSBwcmVkc09yKGNockNkX2lzU21hbGxMZXR0ZXIsIGNockNkX2lzQ2FwaXRhbExldHRlcilcclxuZXhwb3J0IGNvbnN0IGNockNkX2lzRGlnaXQgPSB2QkVUKGNockNkXzAsIGNockNkXzkpXHJcbmV4cG9ydCBjb25zdCBjaHJDZF9pc0RvbGxhciA9IHZFUShjaHJDZF9kb2xsYXIpXHJcbmV4cG9ydCBjb25zdCBjaHJDZF9pc1VuZGVyU2NvcmUgPSB2RVEoY2hyQ2RfdW5kZXJTY29yZSlcclxuZXhwb3J0IGNvbnN0IGNockNkX2lzRnN0Tm1DaHIgPSBwcmVkc09yKGNockNkX2lzTGV0dGVyLCBjaHJDZF9pc1VuZGVyU2NvcmUsIGNockNkX2lzRG9sbGFyKSBhcyBwcmVkPG4+XHJcbmV4cG9ydCBjb25zdCBjaHJDZF9pc05tQ2hyID0gcHJlZHNPcihjaHJDZF9pc0ZzdE5tQ2hyLCBjaHJDZF9pc0RpZ2l0KVxyXG5leHBvcnQgY29uc3Qgc3NldFNydEJydyA9IChhOiBzc2V0KSA9PiBwaXBlKGEpKGl0ckF5LCBheVNydCwgbHlCcncpXHJcbmV4cG9ydCBjb25zdCBzc2V0U3kgPSAoX3NzZXQ6IHNzZXQpOiBzeSA9PiBzZXRBeShfc3NldClcclxuZXhwb3J0IGNvbnN0IHNzZXRBZGRQZnhBc0xpbiA9IChfcGZ4OiBzKSA9PiAoX3NzZXQ6IHNzZXQpID0+IF9wZnggKyAoX3BmeCA/ICcgJyA6ICcnKSArIHNzZXRMaW4oX3NzZXQpXHJcbmV4cG9ydCBjb25zdCBzc2V0TGluID0gKF9zc2V0OiBzZXQpID0+IHNldEF5KF9zc2V0KS5qb2luKCcgJylcclxuZXhwb3J0IGNvbnN0IHNzZXRCcncgPSAoX3NzZXQ6IHNzZXQpID0+IHBpcGUoX3NzZXQpKGl0ckF5LCBzQnJ3KVxyXG5leHBvcnQgY29uc3QgbGluRXhwQ29uc3RObSA9IChhOiBsaW4pID0+IHtcclxuICAgIGNvbnN0IG0gPSBhLm1hdGNoKHJlRXhwQ29uc3RObSlcclxuICAgIGlmIChtID09PSBudWxsKVxyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICByZXR1cm4gbVsxXVxyXG59XHJcbmV4cG9ydCBjb25zdCBub2RlTWRTZXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB6OiBTZXQ8Tm9kZU1vZHVsZT4gPSBuZXcgU2V0KClcclxuICAgIGNvbnN0IF9wdXNoQ2hpbGRyZW4gPSAobTogTm9kZU1vZHVsZSkgPT4ge1xyXG4gICAgICAgIGxldCBjOiBOb2RlTW9kdWxlXHJcbiAgICAgICAgZm9yIChjIG9mIG0uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgaWYgKCF6LmhhcyhjKSkge1xyXG4gICAgICAgICAgICAgICAgei5hZGQoYylcclxuICAgICAgICAgICAgICAgIF9wdXNoQ2hpbGRyZW4oYylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9wdXNoQ2hpbGRyZW4obW9kdWxlKVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5jb25zdCB4ID0gKGE6IE5vZGVNb2R1bGUpID0+IHtcclxuICAgIGNvbnN0IGF5ID0gb1BycE55KGEuZXhwb3J0cylcclxuICAgIGNvbnN0IHo6IGRyeSA9IFtdXHJcbiAgICBjb25zdCBpZCA9IGEuaWRcclxuICAgIGZvciAobGV0IG5tIG9mIGF5KSB7XHJcbiAgICAgICAgY29uc3QgaXRtID0gYS5leHBvcnRzW25tXVxyXG4gICAgICAgIGNvbnN0IHR5ID0gdHlwZW9mIGl0bVxyXG4gICAgICAgIC8vY29uc3QgZnVuTm0gPSB0eT09PSdmdW5jdGlvbic/aXRtLm5hbWU6JydcclxuICAgICAgICBjb25zdCBtID0gW25tLCB0eXBlb2YgaXRtLCBpZF1cclxuICAgICAgICB6LnB1c2gobSlcclxuICAgIH1cclxuICAgIHJldHVybiB6XHJcbn1cclxuZXhwb3J0IGNvbnN0IGRyc29mX2V4cG9ydEZ1bmN0aW9ucyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGZueSA9IFsnbmFtZScsICd0eXBlJywgJ2lkJ11cclxuICAgIGxldCBkcnk6IGRyeSA9IFtdXHJcbiAgICBsZXQgbWQ6IE5vZGVNb2R1bGVcclxuICAgIGNvbnN0IG1zZXQgPSBub2RlTWRTZXQoKVxyXG4gICAgZm9yIChtZCBvZiBtc2V0KSB7XHJcbiAgICAgICAgZHJ5ID0gZHJ5LmNvbmNhdCh4KG1kKSlcclxuICAgIH1cclxuICAgIGRyeSA9IGRyeVNydENvbChbMiwgMF0pKGRyeSlcclxuICAgIGNvbnN0IHo6IGRycyA9IHsgZm55LCBkcnkgfVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5leHBvcnQgY2xhc3MgRHJ5IHtcclxuICAgIGRyeTogZHJ5XHJcbiAgICBwcml2YXRlIF9jdXJDb2w6IG5cclxuICAgIGNvbnN0cnVjdG9yKGE6IGRyeSkge1xyXG4gICAgICAgIHRoaXMuZHJ5ID0gYVxyXG4gICAgICAgIHRoaXMuX2N1ckNvbCA9IDBcclxuICAgIH1cclxuICAgIGdldCBjdXJDb2woKSB7IHJldHVybiB0aGlzLl9jdXJDb2wgfVxyXG4gICAgc2V0IGN1ckNvbChuOiBuKSB7IHRoaXMuX2N1ckNvbCA9IG4gfVxyXG4gICAgZ2V0IGNvbENudCgpIHsgcmV0dXJuIGl0ck1heChpdHJNYXAodkxlbikodGhpcy5kcnkpKSBhcyBuIH1cclxuICAgIGdldCBseSgpIHsgcmV0dXJuIHNkcnlMeSh0aGlzLnNkcnkpIH1cclxuICAgIGdldCBsaW5lcygpIHsgcmV0dXJuIHNkcnlMaW5lcyh0aGlzLnNkcnkpIH1cclxuICAgIGdldCBjb2woKSB7IHJldHVybiBpdHJNYXAoYXlFbGVPckRmdCgnJykodGhpcy5jdXJDb2wpKSh0aGlzLmRyeSkgfVxyXG4gICAgZ2V0IHNkcnkoKSB7IHJldHVybiBpdHJNYXAoYXlTeSkodGhpcy5kcnkpIGFzIHNkcnkgfVxyXG4gICAgc2V0Q3VyQ29sKG46IG4pIHsgdGhpcy5jdXJDb2wgPSBuOyByZXR1cm4gdGhpcyB9XHJcbiAgICBtZHlBbGxDZWxsKGY6IGYpIHsgaXRyRWFjaChheU1keShmKSkodGhpcy5kcnkpIH1cclxuICAgIC8vY2xvbmUoKSB7IHJldHVybiBuZXcgRHJ5KGl0ck1hcChkciA9PiBpdHJDbG9uZShkcikodGhpcy5kcnkpKX1cclxuICAgIG1keUNvbChmOiBmLCBjb2xJeDogbikgeyBpdHJFYWNoKGF5TWR5RWxlKGNvbEl4KShmKSkodGhpcy5kcnkpIH1cclxuICAgIGJydygpIHsgc0Jydyh0aGlzLmxpbmVzKSB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IGRyeSA9IChhOiBkcnkpID0+IG5ldyBEcnkoYSlcclxuIl19