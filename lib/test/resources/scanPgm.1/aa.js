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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdEQUFnRDtBQUNoRCw2Q0FBNkM7QUFDN0MsOENBQThDO0FBQzlDLCtDQUErQztBQUMvQyx5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QiwwQkFBMEI7QUFDMUIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUMsa0NBQWtDO0FBQ25FLG1EQUFtRDtBQUN0QyxRQUFBLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUM3QixJQUFJLENBQUM7UUFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxNQUFNLENBQUMsS0FBSyxDQUFBO0lBQ2hCLENBQUM7QUFDTCxDQUFDLENBQUE7QUFDWSxRQUFBLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUN2QyxRQUFBLElBQUksR0FBRyxDQUFDLEdBQU0sRUFBRSxHQUFNLEVBQVEsRUFBRTtJQUN6QyxtQkFBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQyxtQkFBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQyxRQUFRLENBQUE7QUFDWixDQUFDLENBQUE7QUFDWSxRQUFBLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQVEsRUFBRTtJQUNuQyxFQUFFLENBQUMsQ0FBQyxjQUFNLENBQUMsR0FBRyxDQUFDLElBQUksY0FBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNkLFFBQVEsQ0FBQTtZQUNSLE1BQU0sQ0FBQTtRQUNWLENBQUM7SUFDTCxDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsYUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN6QixtQkFBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMvQixtQkFBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMvQixRQUFRLENBQUE7QUFDWixDQUFDLENBQUE7QUFDWSxRQUFBLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZFLFFBQUEsYUFBYSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEYsMkVBQTJFO0FBQzlELFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3JCLFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3RCLFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3RCLFFBQUEsR0FBRyxHQUFHLENBQUksQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNwQyxRQUFBLEdBQUcsR0FBRyxDQUFJLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDcEMsUUFBQSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDckIsUUFBQSxHQUFHLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3RGLFFBQUEsTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxRQUFBLElBQUksR0FBRyxDQUFJLENBQUksRUFBRSxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDcEQsUUFBQSxPQUFPLEdBQUcsQ0FBSSxDQUFJLEVBQUUsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3JELFFBQUEsYUFBYSxHQUFHLENBQUksQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUM1RCxRQUFBLEtBQUssR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDL0QsUUFBQSxLQUFLLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDM0UsdUNBQXVDO0FBQzFCLFFBQUEsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQU0sRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDL0UsUUFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzFCLFFBQUEsUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM5QixRQUFBLElBQUksR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNs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RSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQy9GLFFBQUEsYUFBYSxHQUFHLENBQUMsS0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRSxDQUFDLFlBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDOUUsUUFBQSxLQUFLLEdBQUcsQ0FBSSxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMzQixRQUFBLEtBQUssR0FBRyxDQUFJLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzNCLFFBQUEsS0FBSyxHQUFHLENBQUksRUFBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZDLFFBQUEsVUFBVSxHQUFHLENBQUksR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLFlBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNuRSxRQUFBLEtBQUssR0FBRyxDQUFJLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNyQyxRQUFBLFFBQVEsR0FBRyxDQUFJLEVBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUs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Q0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFNLENBQUE7QUFDekYsUUFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7QUFDekIsUUFBQSxLQUFLLEdBQUcsQ0FBQyxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDeEQsUUFBQSxJQUFJLEdBQUcsQ0FBQyxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzFDLFFBQUEsS0FBSyxHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDMUMsUUFBQSxLQUFLLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtBQUMxQixRQUFBLE1BQU0sR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRTtJQUNyQyxNQUFNLENBQUMsR0FBRyxZQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7SUFDckIsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMs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LENBQUMsQ0FBQTtJQUNiLE1BQU0sQ0FBQyxHQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUMxQixNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ1osQ0FBQyxDQUFBO0FBQ1ksUUFBQSxPQUFPLEdBQUcsQ0FBQyxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2pELFFBQUEsT0FBTyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMvQyxRQUFBLE9BQU8sR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN4RixRQUFBLE9BQU8sR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN4RSxRQUFBLG1CQUFtQixHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtBQUN6RixRQUFBLG1CQUFtQixHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFD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QUFNLENBQUMsRUFBRSxDQUFBO0lBQzFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7QUFDYixDQUFDLENBQUE7QUFDRCxvRUFBb0U7QUFDdkQsUUFBQSxNQUFNLEdBQUcsQ0FBQyxFQUFLLEVBQUUsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsWUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzFHLFFBQUEsS0FBSyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEdBQUcsZUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsYUFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBTSxDQUFDLEVBQUUsRUFBRSxZQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNwSSxRQUFBLEtBQUssR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMs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QUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUN4SSxRQUFBLFFBQVEsR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3hJLFFBQUEsT0FBTyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEdBQUcsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNuRyxRQUFBLFVBQVUsR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLGdCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0FBQ3RELFFBQUEsVUFBVSxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsZ0JBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7QUFDbkUseUVBQXlFO0FBQzVELFFBQUEsVUFBVSxHQUFHLFlBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNwQixRQUFBLFVBQVUsR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsYUFBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDN0MsUUFBQSxXQUFXLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxhQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN4RCxRQUFBLFVBQVUsR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNoRyxRQUFBLFNBQVMsR0FBRyxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzNCLFFBQUEsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7QUFDakIsUUFBQSxhQUFhLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRTtJQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDUCxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ1osTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDN0IsQ0FBQyxDQUFBO0FBQ1ksUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFNLEVBQU8sRUFBRTtJQUNsQyxNQUFNLEtBQUssR0FBRyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3pCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNYLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxHQUFHLGNBQU0sQ0FBQTtBQUN0QyxDQUFDLENBQUE7QUFDWSxRQUFBLFFBQVEsR0FBRyxDQUFDLENBQU0sRUFBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUNoRCxRQUFBLE1BQU0sR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsZ0JBQVEsQ0FBQyxZQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdEQsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLHFCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDOUYsUUFBQSxLQUFLLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLHFCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDM0YsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFL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LEdBQUcsTUFBTSxDQUFDLEdBQVEsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDdkgsUUFBQSxVQUFVLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3hHLFFBQUEsTUFBTSxHQUFHLENBQU8sQ0FBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztJQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzVJLFFBQUEsT0FBTyxHQUFHLENBQUksQ0FBd0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztJQUFD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QTtBQUMzQyxRQUFBLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDOUMsUUFBQSxRQUFRLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDN0IsUUFBQSxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztJQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzVFLFFBQUEsU0FBUyxHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFO0lBQzFDLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDO0lBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDN0QsQ0FBQyxDQUFBO0FBQ0QsNkVBQTZFO0FBQ2hFLFFBQUEsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksR0FBRyxFQUFRLENBQUE7QUFDL0IsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFLLEVBQUUsRUFBRTtJQUM1QixNQUFNLENBQUMsR0FBRyxlQUFPLEVBQUUsQ0FBQTtJQUNuQixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtRQUNkLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsR0FBRyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzNDLE1BQU0sQ0FBQyxFQUFF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QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUMzRixRQUFBLGdCQUFnQixHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNsRyxRQUFBLGlCQUFpQixHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDbEcsUUFBQSxrQkFBa0IsR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDcEcsUUFBQSxpQkFBaUIsR0FBRyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ2xHLFFBQUEsa0JBQWtCLEdBQUcsQ0FBSSxDQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUU7SUFDbkUsTUFBTSxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBUSxFQUFFLENBQUM7SUFDL0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQTtBQUNuQixDQUFDLENBQUE7QUFDWSxRQUFBLEtBQUssR0FBRyxDQUFJLENBQVMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQVEsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDckYsUUFBQSxNQUFNLEdBQUcsQ0FBSSxDQUFTLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3JFLFFBQUEsTUFBTSxHQUFHLENBQUksQ0FBUyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzNGLFFBQUEsWUFBWSxHQUFHLENBQUMsR0FBTSxFQUFFLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLGNBQU0sQ0FBQyxrQkFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBUSxDQUFBO0FBQ3JGLFFBQUEsU0FBUyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsY0FBTSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBUSxDQUFBO0FBQ2xFLFFBQUEsU0FBUyxHQUFHLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsY0FBTSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBUSxDQUFBO0FBQ2xFLFFBQUEsTUFBTSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxZQUFJLENBQUMsY0FBTSxDQUFDLFlBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBTSxDQUFNLENBQUE7QUFDdkQsUUFBQSxPQUFPLEdBQUcsQ0FBQyxDQUFPLEVBQUUsRUFBRSxDQUFDLFlBQUksQ0FBQyxjQUFNLENBQUMsWUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFNLENBQU0sQ0FBQTtBQUN6RCxRQUFBLFNBQVMsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsY0FBTSxDQUFDLGVBQU8sQ0FBQyxjQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBUSxDQUFBO0FBQzVELFFBQUEsUUFBUSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQU8sQ0FBQTtBQUM5QyxRQUFBLE9BQU8sR0FBRyxDQUFJLENBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3BHLFFBQUEsU0FBUyxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQUMsQ0FBQztJQUFDLElBQUk7UUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQTtBQUNqSSxRQUFBLFNBQVMsR0FBRyxDQUFJLENBQVMsRUFBRSxFQUFFO0lBQ3RDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFLLENBQUE7SUFDeEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUssQ0FBQTtJQUN0QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDWixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNaLElBQUk7WUFDQSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xCLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDWixDQUFDLENBQUE7QUFDWSxRQUFBLE1BQU0sR0FBRyxDQUFJLENBQVMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsY0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQztJQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDMUgsUUFBQSxNQUFNLEdBQUcsQ0FBSSxDQUFTLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLGNBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7SUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzFILFFBQUEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLGNBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN6QixRQUFBLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdEMsMkZBQTJGO0FBQzlFLFFBQUEsSUFBSSxHQUFHLENBQUMsQ0FBSSxFQUFLLEVBQUU7SUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssU0FBUyxDQUFDO1FBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUM1QyxNQUFNLEVBQUUsR0FBUSxFQUFFLENBQUE7SUFDbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2hCLENBQUM7SUFDRCxNQUFNLENBQUMsRUFBRSxDQUFBO0FBQ2IsQ0FBQyxDQUFBO0FBQ1ksUUFBQSxpQkFBaUIsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUNqQzs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixVQUFFLENBQUMsbUNBQW1DLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDakUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMvQixDQUFDO0lBQ0wsQ0FBQztJQUNELE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDWixDQUFDLENBQUE7QUFDWSxRQUFBLFNBQVMsR0FBRyxDQUFDLENBQUssRUFBRSxFQUFFLENBQUMsY0FBTSxDQUFDLGFBQUssQ0FBQyxDQUFDLENBQUMsQ0FBUyxDQUFBO0FBQy9DLFFBQUEsT0FBTyxHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUU7SUFDNUIsSUFBSSxDQUFDLEdBQUcsY0FBTSxDQUFDLENBQUMsRUFBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JELGNBQU0sQ0FBQyxhQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNuQixNQUFNLENBQUMsR0FBRyxrQkFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzFCLGlCQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDM0IsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUNaLENBQUMsQ0FBQTtBQUNZLFFBQUEsT0FBTyxHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQTtBQUM1RCxRQUFBLFdBQVcsR0FBRyxDQUFDLFFBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFlBQVksUUFBUSxDQUFBO0FBQ3JFLFFBQUEsVUFBVSxHQUFHLENBQUMsRUFBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtBQUNuRCxRQUFBLElBQUksR0FBRyxDQUFDLE1BQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRTtJQUN4Qzs7Ozs7O0dBTUQ7SUFDQyxJQUFJLENBQUMsQ0FBQTtJQUNMLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDVCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDekIsQ0FBQztJQUNELE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDWixDQUFDLENBQUE7QUFDWSxRQUFBLFFBQVEsR0FBRyxDQUFDLE1BQWEsRUFBTSxFQUFFO0lBQzFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQztRQUMzQixNQUFNLENBQUMsaUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM1QixNQUFNLENBQUMsTUFBTSxDQUFBO0FBQ2pCLENBQUMsQ0FBQTtBQUNZLFFBQUEsRUFBRSxHQUFHLGdCQUFRLENBQUE7QUFDYixRQUFBLE1BQU0sR0FBRyxDQUFDLE1BQWEsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFLLEVBQUUsRUFBRSxDQUFDLGNBQU0sQ0FBQyxDQUFDLEVBQUssRUFBRSxFQUFFLENBQUMsWUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDbEYsUUFBQSxNQUFNLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNoRCxRQUFBLE9BQU8sR0FBRyxDQUFDLEtBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDMUQsUUFBQSxPQUFPLEdBQUcsZUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzNCLFFBQUEsT0FBTyxHQUFHLENBQUMsQ0FBSSxFQUFFLEVBQUU7SUFDNUIsTUFBTSxHQUFHLEdBQUcsZUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3RCLE1BQU0sQ0FBQyxHQUFXLEVBQUUsQ0FBQTtJQUNwQixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUNwRCxNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ1osQ0FBQyxDQUFBO0FBQ0QsaURBQWlEO0FBQ2pELE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7QUFDN0QsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFXLEVBQUUsRUFBRTtJQUM5QixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBQ3RCLEVBQUUsQ0FBQyxDQUFDLGVBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsVUFBRSxDQUFDLGdDQUFnQyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBQ0QsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUE7QUFDdkIsQ0FBQyxDQUFBO0FBQ0QsaURBQWlEO0FBQ3BDLFFBQUEsT0FBTyxHQUFHLENBQUMsRUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDekQsaURBQWlEO0FBQ3BDLFFBQUEsVUFBVSxHQUFHLENBQUMsS0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2pFLFFBQUEsWUFBWSxHQUFHLENBQUMsQ0FBTyxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLGtCQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFJLENBQUMsaUJBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFRLENBQUE7QUFDekYsUUFBQSxNQUFNLEdBQUcsQ0FBQyxLQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsa0JBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ25FLFFBQUEsU0FBUyxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxjQUFNLENBQUMsY0FBTSxDQUFDLFlBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFNLENBQUE7QUFDcEQsUUFBQSxVQUFVLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxlQUFPLENBQUMsYUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDM0QsUUFBQSxRQUFRLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLGNBQU0sQ0FBQyxDQUFDLEVBQU0sRUFBRSxFQUFFLENBQUMsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBUSxDQUFBO0FBQ2pFLFFBQUEsU0FBUyxHQUFHLENBQUMsS0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLGVBQU8sQ0FBQyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDbEYsUUFBQSxTQUFTLEdBQUcsQ0FBQyxDQUFPLEVBQUUsRUFBRSxDQUFDLGNBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDL0MsUUFBQSxRQUFRLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxjQUFNLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMs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RSxDQUFDO0lBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDL0YsUUFBQSxRQUFRLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBSXBILENBQUM7SUFDRyxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLFlBQVksQ0FBQztRQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFBO0lBQ2xGLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyw0Q0FBNEM7SUFDaEosTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN2RSxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0lBQzVHLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLFlBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQTtJQUNwRSxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzNDLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksY0FBYyxDQUFDO1FBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLENBQUE7SUFDdkYsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN4RSxZQUFJLEdBQUcsQ0FBQyxHQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzlDLGVBQU8sR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFJLEVBQUUsRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzlDLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ25DLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUNaLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFDRCx5Q0FBeUM7QUFDNUIsUUFBQSxPQUFPLEdBQUcsQ0FBQyxHQUFNLEVBQUUsR0FBTyxFQUFFLEVBQUU7SUFDdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNwQyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuRSxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2pDLE9BQU8sR0FBRyxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxnQkFBUSxDQUFDLFlBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3RFLElBQUksQ0FBQyxHQUFRLGdCQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDckMsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUNaLENBQUMsQ0FBQyxDQUFDLGtFQUFrRTtBQUN4RCxRQUFBLEtBQUssR0FBRyxDQUFDLENBQUssRUFBRSxDQUFLLEVBQUUsRUFBRSxDQUFDLGNBQU0sQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDeEUsUUFBQSxXQUFXLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ25DLFFBQVEsQ0FBQTtJQUNSLE1BQU0sQ0FBQyxDQUFBO0FBQ1gsQ0FBQyxDQUFBO0FBQ1ksUUFBQSxTQUFTLEdBQUcsS0FBSyxFQUFFLENBQU0sRUFBRSxHQUFPLEVBQUUsRUFBRTtJQUMvQyxRQUFRLENBQUE7SUFDUixNQUFNLENBQUMsQ0FBQTtJQUNQOzs7OztNQUtFO0FBQ04sQ0FBQyxDQUFBO0FBQ1ksUUFBQSxjQUFjLEdBQUcsS0FBSyxFQUFFLENBQU0sRUFBRSxHQUFPLEVBQUUsRUFBRTtJQUNwRCxNQUFNLENBQUMsR0FBRyxNQUFNLFVBQUUsQ0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3ZDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFRLENBQUMsWUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUM5QixNQUFNLEVBQUUsR0FBRyxjQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDeEIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxpQkFBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDL0MsTUFBTSxDQUFDLEdBQUcsY0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzFCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM5QixNQUFNLENBQUMsQ0FBd0IsQ0FBQTtBQUNuQyxDQUFDLENBQUE7QUFDWSxRQUFBLFVBQVUsR0FBRyxLQUFLLEVBQUUsQ0FBTSxFQUFFLEdBQU8sRUFBRSxFQUFFO0FBRXBELENBQUMsQ0FBQTtBQUNELHlDQUF5QztBQUM1QixRQUFBLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMzQixRQUFBLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN6QixRQUFBLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN0QixRQUFBLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN4QixRQUFBLEtBQUssR0FBRyxjQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDakIsUUFBQSxLQUFLLEdBQUcsWUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2YsUUFBQSxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUFFLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQ3pFLDZFQUE2RTtBQUNoRSxRQUFBLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUVsRCxRQUFBLElBQUksR0FBRyxDQUFJLEVBQWEsRUFBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7SUFBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0FBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzNJLDZFQUE2RTtBQUNoRSxRQUFBLE1BQU0sR0FBRyxDQUFPLENBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3pFLFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUV6QztJQUlJLFlBQVksQ0FBTTtRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxjQUFNLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBQ08sSUFBSSxDQUFDLEVBQUssSUFBSSxNQUFNLENBQUMsWUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDekMsS0FBSyxDQUFDLEVBQUssSUFBSSxNQUFNLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDbkQsSUFBSSxHQUFHLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDO0lBQzlCLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNqRixJQUFJLEVBQUUsS0FBSyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ3JGLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQzVFLElBQUksS0FBSyxLQUFLLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMs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QUEsQ0FBQyxDQUFDO0lBQ3BELFNBQVMsQ0FBQyxDQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQztJQUNoRCxVQUFVLENBQUMsQ0FBSSxJQUFJLGVBQU8sQ0FBQyxhQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ2hELGdFQUFnRTtJQUNoRSxNQUFNLENBQUMsQ0FBSSxFQUFFLEtBQVEsSUFBSSxlQUFPLENBQUMsZ0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDaEUsR0FBRyxLQUFLLFlBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFDO0NBQzdCO0FBbkJELGtCQW1CQztBQUNZLFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3Mvbm9kZS9ub2RlLmQudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvY29tbW9uLmQudHNcIi8+XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuaW1wb3J0ICogYXMgY2hpbGRfcHJvY2VzcyBmcm9tICdjaGlsZF9wcm9jZXNzJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBvcyBmcm9tICdvcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIHUgZnJvbSAndXRpbCc7XHJcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpIC8vaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gJ2Fzc2VydCdcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBpc0VxID0gKGV4cCwgYWN0KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0LCBleHApXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxufVxyXG5leHBvcnQgY29uc3QgaXNOb3RFcSA9IChleHAsIGFjdCkgPT4gIWlzRXEoZXhwLCBhY3QpXHJcbmV4cG9ydCBjb25zdCBzQ21wID0gKGV4cDogcywgYWN0OiBzKTogdm9pZCA9PiB7XHJcbiAgICBzQnJ3QXRGZHJGbignc3RyQ21wJywgJ2V4cCcpKGV4cClcclxuICAgIHNCcndBdEZkckZuKCdzdHJDbXAnLCAnYWN0JykoYWN0KVxyXG4gICAgZGVidWdnZXJcclxufVxyXG5leHBvcnQgY29uc3QgdkNtcCA9IChleHAsIGFjdCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGlzQm9vbChleHApICYmIGlzQm9vbChhY3QpKSB7XHJcbiAgICAgICAgaWYgKGFjdCAhPT0gZXhwKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChpc1N0cihleHApICYmIGlzU3RyKGFjdCkpXHJcbiAgICAgICAgcmV0dXJuIHNDbXAoZXhwLCBhY3QpXHJcbiAgICBvQnJ3QXRGZHJGbigndkNtcCcsICdleHAnKShleHApXHJcbiAgICBvQnJ3QXRGZHJGbigndkNtcCcsICdhY3QnKShhY3QpXHJcbiAgICBkZWJ1Z2dlclxyXG59XHJcbmV4cG9ydCBjb25zdCBhc3NlcnRJc0VxID0gKGV4cCwgYWN0KSA9PiBpc05vdEVxKGV4cCwgYWN0KSA/IHZDbXAoZXhwLCBhY3QpIDogdm9pZCAwO1xyXG5leHBvcnQgY29uc3QgYXNzZXJ0SXNOb3RFcSA9IChleHAsIGFjdCkgPT4gaXNFcShleHAsIGFjdCkgPyB2Q21wKGV4cCwgYWN0KSA6IHZvaWQgMDtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCB2TFQgPSB4ID0+IGEgPT4gYSA8IHhcclxuZXhwb3J0IGNvbnN0IHZHRSA9IHggPT4gYSA9PiBhID49IHhcclxuZXhwb3J0IGNvbnN0IHZMRSA9IHggPT4gYSA9PiBhIDw9IHhcclxuZXhwb3J0IGNvbnN0IHZFUSA9IDxUPih4OiBUKSA9PiAoYTogVCkgPT4gYSA9PT0geFxyXG5leHBvcnQgY29uc3Qgdk5FID0gPFQ+KHg6IFQpID0+IChhOiBUKSA9PiBhICE9PSB4XHJcbmV4cG9ydCBjb25zdCB2R1QgPSB4ID0+IGEgPT4gYSA+IHhcclxuZXhwb3J0IGNvbnN0IHZJTiA9IChpdHI6IGl0cikgPT4gYSA9PiB7IGZvciAobGV0IGkgb2YgaXRyKSBpZiAoaSA9PT0gYSkgcmV0dXJuIHRydWU7IHJldHVybiBmYWxzZSB9XHJcbmV4cG9ydCBjb25zdCB2Tm90SW4gPSBpdHIgPT4gYSA9PiAhdklOKGl0cikoYSlcclxuZXhwb3J0IGNvbnN0IHZCRVQgPSA8VD4oeDogVCwgeTogVCkgPT4gKGE6IFQpID0+IHggPD0gYSAmJiBhIDw9IHlcclxuZXhwb3J0IGNvbnN0IHZOb3RCZXQgPSA8VD4oeDogVCwgeTogVCkgPT4gKGE6IFQpID0+ICF2QkVUKHgsIHkpKGEpXHJcbmV4cG9ydCBjb25zdCB2SXNJbnN0YW5jZU9mID0gPFQ+KHg6IEZ1bmN0aW9uKSA9PiAoYTogVCkgPT4gYSBpbnN0YW5jZW9mIHhcclxuZXhwb3J0IGNvbnN0IGVuc1N5ID0gKGE6IHMgfCBzeSkgPT4gdHlwZW9mIGEgPT09ICdzdHJpbmcnID8gc1NwbGl0U3BjKGEpIDogYVxyXG5leHBvcnQgY29uc3QgZW5zUmUgPSAoYTogcyB8IHJlKSA9PiBhIGluc3RhbmNlb2YgUmVnRXhwID8gYSA6IG5ldyBSZWdFeHAoYSlcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBwaXBlID0gdiA9PiAoLi4uZjogZltdKSA9PiB7IGxldCBvID0gdjsgZm9yIChsZXQgZmYgb2YgZikgbyA9IGZmKG8pOyByZXR1cm4gbyB9XHJcbmV4cG9ydCBjb25zdCB2TWFwID0gKGY6IGYpID0+IGEgPT4gZihhKVxyXG5leHBvcnQgY29uc3QgZnVuQXBwbHkgPSB2ID0+IChhOiBmKSA9PiBhKHYpXHJcbmV4cG9ydCBjb25zdCBzd2FwID0gKGY6IGYpID0+IGEgPT4gYiA9PiBmKGIpKGEpXHJcbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKC4uLmY6IGZbXSkgPT4gdiA9PiBwaXBlKHYpKC4uLmYpXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgZGljTHkgPSA8VD4oYTogZGljPFQ+KSA9PiBpdHJNYXAoa3ZMaW4pKGEpIGFzIHNbXVxyXG5leHBvcnQgY29uc3QgZGljTGluZXMgPSA8VD4oYTogZGljPFQ+KSA9PiBkaWNMeShhKS5qb2luKCdcXHJcXG4nKVxyXG5leHBvcnQgY29uc3Qga3ZMaW4gPSAoW2ssIHZdOiBrdikgPT4gayArICcgJyArIHZcclxuZXhwb3J0IGNvbnN0IGRtcCA9IGdsb2JhbC5jb25zb2xlLmxvZ1xyXG5leHBvcnQgY29uc3QgZnVuRG1wID0gKGY6IEZ1bmN0aW9uKSA9PiBkbXAoZi50b1N0cmluZygpKVxyXG5leHBvcnQgY29uc3QgaGFsdCA9ICgpID0+IHsgdGhyb3cgbmV3IEVycm9yKCkgfVxyXG5leHBvcnQgY29uc3Qgc0VzY0xmID0gKGE6IHMpID0+IGEucmVwbGFjZSgnXFxuJywgJ1xcXFxuJylcclxuZXhwb3J0IGNvbnN0IHNFc2NWYmFyID0gKGE6IHMpID0+IGEucmVwbGFjZSgvXFx8L2csICdcXFxcdicpXHJcbmV4cG9ydCBjb25zdCBzRXNjQ3IgPSAoYTogcykgPT4gYS5yZXBsYWNlKC9cXHIvZywgJ1xcXFxyJylcclxuZXhwb3J0IGNvbnN0IHNFc2NUYWIgPSAoYTogcykgPT4gYS5yZXBsYWNlKC9cXHQvZywgJ1xcXFx0JylcclxuZXhwb3J0IGNvbnN0IHNFc2M6ICgoYTogcykgPT4gcykgPSBjb21wb3NlKHNFc2NMZiwgc0VzY0NyLCBzRXNjVGFiKVxyXG5leHBvcnQgY29uc3Qgc0ZtdCA9IChxcVN0cjogcywgLi4udikgPT4ge1xyXG4gICAgbGV0IHogPSBxcVN0clxyXG4gICAgZm9yIChsZXQgaSBvZiB2KSB7XHJcbiAgICAgICAgeiA9IHoucmVwbGFjZSgnPycsIGkpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gelxyXG59XHJcbmV4cG9ydCBjb25zdCBzQm94ID0gKGE6IHMpID0+IHsgY29uc3QgeSA9IFwiPT0gXCIgKyBzRXNjKGEpICsgXCIgPT1cIiwgeCA9IFwiPVwiLnJlcGVhdChhLmxlbmd0aCArIDYpOyByZXR1cm4gW3gsIHksIHhdLmpvaW4oXCJcXHJcXG5cIikgfVxyXG5leHBvcnQgY29uc3Qgc3RhY2sgPSAoKSA9PiB7IHRyeSB7IHRocm93IG5ldyBFcnJvcigpIH0gY2F0Y2ggKGUpIHsgbGV0IHo6IHMgPSBlLnN0YWNrOyByZXR1cm4geiB9IH1cclxuZXhwb3J0IGNvbnN0IGVyID0gKG1zZzogcywgLi4udikgPT4ge1xyXG4gICAgbGV0IGEgPSBzdGFjaygpXHJcbiAgICBsZXQgYiA9IGEuc3BsaXQoL1xcbi8pXHJcbiAgICBsZXQgYyA9IGJbM11cclxuICAgIGxldCBkID0gYy5zcGxpdCgvXFxzKy8pXHJcbiAgICBsZXQgYnJlYWtpbmdGdW5ObSA9IGRbMl1cclxuICAgIGxldCBoZHIgPSBzQm94KGJyZWFraW5nRnVuTm0pXHJcbiAgICBkbXAoaGRyKVxyXG4gICAgZG1wKGBlcnJvclske21zZ31dIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcbmApXHJcbiAgICBpdHJFYWNoKGRtcCkodilcclxuICAgIGRtcChhKVxyXG4gICAgZG1wKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKVxyXG4gICAgbGV0IGRiZyA9IHRydWVcclxuICAgIGRlYnVnZ2VyXHJcbiAgICAvLyAgICBpZiAoZGJnKVxyXG4gICAgLy8gICAgICAgIGhhbHQoKVxyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHNTcGxpdCA9IChzZXA6IHNPclJlKSA9PiAoYTogcykgPT4gYS5zcGxpdChzZXApXHJcbmV4cG9ydCBjb25zdCBzUm12Q3IgPSAoYTogcykgPT4gYS5yZXBsYWNlKC9cXHIvZywgJycpXHJcbmV4cG9ydCBjb25zdCBzU3BsaXRMaW5lcyA9IChhOiBsaW5lcykgPT4gc1NwbGl0TGYoc1JtdkNyKGEpKVxyXG5leHBvcnQgY29uc3Qgc1NwbGl0U3BjID0gKF9zOiBzKSA9PiBzU3BsaXQoL1xccysvKShfcy50cmltKCkpXHJcbmV4cG9ydCBjb25zdCBzU3BsaXRDckxmID0gc1NwbGl0KCdcXHJcXG4nKVxyXG5leHBvcnQgY29uc3Qgc1NwbGl0TGYgPSBzU3BsaXQoJ1xcbicpXHJcbmV4cG9ydCBjb25zdCBzU3BsaXRDb21tYVNwYyA9IHNTcGxpdCgvLFxccyovKVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCB2RGZ0ID0gPFQ+KGRmdDogVCkgPT4gKGE6IFQgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiBhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCA/IGRmdCA6IGFcclxuZXhwb3J0IGNvbnN0IHZEZnRTdHIgPSB2RGZ0KFwiXCIpXHJcbmV4cG9ydCBjb25zdCB2RGZ0VXBwZXIgPSA8VD4oeDogVCwgeTogVCkgPT4gKGE6IFQgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiBhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCB8fCB4ID4gYSB8fCBhID4geSA/IHkgOiBhXHJcbmV4cG9ydCBjb25zdCB2RGZ0TG93ZXIgPSA8VD4oeDogVCwgeTogVCkgPT4gKGE6IFQgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiBhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCB8fCB4ID4gYSB8fCBhID4geSA/IHggOiBhXHJcbmV4cG9ydCBjb25zdCBheUZpbmRJeCA9IChwOiBwKSA9PiAoYTogYXkpID0+IHsgZm9yIChsZXQgaSBpbiBhKSBpZiAocChhW2ldKSkgcmV0dXJuIE51bWJlcihpKTsgcmV0dXJuIG51bGwgfVxyXG5leHBvcnQgY29uc3QgYXlGaW5kSXhPckRmdCA9IChkZnRJeDogbikgPT4gKHA6IHApID0+IChhOiBheSkgPT4gdkRmdChkZnRJeCkoYXlGaW5kSXgocCkoYSkpXHJcbmV4cG9ydCBjb25zdCBheUZzdCA9IDxUPihhOiBUW10pID0+IGFbMF1cclxuZXhwb3J0IGNvbnN0IGF5U25kID0gPFQ+KGE6IFRbXSkgPT4gYVsxXVxyXG5leHBvcnQgY29uc3QgYXlFbGUgPSA8VD4oaXg6IG4pID0+IChhOiBUW10pID0+IGFbaXhdXHJcbmV4cG9ydCBjb25zdCBheUVsZU9yRGZ0ID0gPFQ+KGRmdDogVCkgPT4gKGl4OiBuKSA9PiAoYTogVFtdKSA9PiB2RGZ0KGRmdCkoYVtpeF0pXHJcbmV4cG9ydCBjb25zdCBheUxhcyA9IDxUPihhOiBUW10pID0+IGFbdkxlbihhKSAtIDFdXHJcbmV4cG9ydCBjb25zdCBheVNldEVsZSA9IDxUPihpeDogbikgPT4gKHY6IFQpID0+IChhOiBUW10pID0+IHsgYVtpeF0gPSB2IH1cclxuZXhwb3J0IGNvbnN0IGF5TWR5RWxlID0gPFQ+KGl4OiBuKSA9PiAoZjogKGE6IFQpID0+IFQpID0+IChhOiBUW10pID0+IHsgYVtpeF0gPSBmKGFbaXhdKSB9XHJcbmV4cG9ydCBjb25zdCBheU1keSA9IDxUPihmOiAoYTogVCkgPT4gVCkgPT4gKGE6IFRbXSkgPT5cclxuICAgIGVhY2hcclxuICAgICAgICAoKGl0bSwgaXgpID0+IHsgaWYgKGl4ICE9PSB1bmRlZmluZWQpIGFbaXhdID0gZihhW2l4XSkgfSlcclxuICAgICAgICAobkl0cihhLmxlbmd0aCkpXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IGF5Sm4gPSAoc2VwPzogcykgPT4gKGE6IGF5KSA9PiBhLmpvaW4oc2VwKVxyXG5leHBvcnQgY29uc3QgYXlKbkNyTGYgPSBheUpuKCdcXHJcXG4nKVxyXG5leHBvcnQgY29uc3QgYXlKbkxmID0gYXlKbignXFxuJylcclxuZXhwb3J0IGNvbnN0IGF5Sm5TcGMgPSBheUpuKCcgJylcclxuZXhwb3J0IGNvbnN0IGF5Sm5Db21tYSA9IGF5Sm4oJywnKVxyXG5leHBvcnQgY29uc3QgYXlKbkNvbW1hU3BjID0gYXlKbignLCAnKVxyXG5leHBvcnQgY29uc3QgblNwYyA9IChhOiBuKSA9PiAnICcucmVwZWF0KGEpXHJcbmV4cG9ydCBjb25zdCBheUpuQXNMaW5lcyA9IChzZXAwPzogcywgdGFiMD86IG4sIHdkdDA/OiBuKSA9PiAoYTogYXkpID0+IHtcclxuICAgIGxldCB3ZHQgPSB2RGZ0VXBwZXIoMjAsIDEyMCkod2R0MClcclxuICAgIGxldCBzZXAgPSB2RGZ0KCcnKShzZXAwKVxyXG4gICAgbGV0IHNsZW4gPSBzZXAubGVuZ3RoXHJcbiAgICBsZXQgcGZ4ID0gblNwYyh2RGZ0KDApKHRhYjApKVxyXG4gICAgbGV0IHggPSAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9vOiBheSA9IFtdXHJcbiAgICAgICAgbGV0IG86IGF5ID0gW11cclxuICAgICAgICBsZXQgd3cgPSAwXHJcbiAgICAgICAgZm9yIChsZXQgcyBvZiBhKSB7XHJcbiAgICAgICAgICAgIGxldCBsID0gc0xlbihzKSArIHNsZW5cclxuICAgICAgICAgICAgaWYgKHd3ICsgbCA+IHdkdCkge1xyXG4gICAgICAgICAgICAgICAgb28ucHVzaChwZnggKyBpdHJBZGRTZngoc2VwKShvKS5qb2luKFwiXCIpKVxyXG4gICAgICAgICAgICAgICAgbyA9IFtdXHJcbiAgICAgICAgICAgICAgICB3dyA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvLnB1c2gocylcclxuICAgICAgICAgICAgd3cgKz0gbFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoby5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG9vLnB1c2gocGZ4ICsgaXRyQWRkU2Z4KHNlcCkobykuam9pbihcIlwiKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9vXHJcbiAgICB9KSgpXHJcbiAgICBsZXQgYiA9IGF5Sm5DckxmKHgpXHJcbiAgICByZXR1cm4gYlxyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHNGc3RDaHIgPSAoYTogcykgPT4gYVswXVxyXG5leHBvcnQgY29uc3Qgc0xhc0NociA9IChhOiBzKSA9PiBhW2EubGVuZ3RoIC0gMV1cclxuZXhwb3J0IGNvbnN0IHNBZGRQZnggPSAocGZ4OiBzKSA9PiAoYTogcykgPT4gcGZ4ICsgYVxyXG5leHBvcnQgY29uc3Qgc0FkZFNmeCA9IChzZng6IHMpID0+IGEgPT4gYSArIHNmeFxyXG5leHBvcnQgY29uc3Qgc0FkZFBmeFNmeCA9IChwZng6IHMsIHNmeDogcykgPT4gKGE6IHMpID0+IHBmeCArIGEgKyBzZnhcclxuZXhwb3J0IGNvbnN0IHZMZW4gPSBhID0+IHR5cGVvZiBhID09PSAnc3RyaW5nJyA/IGEubGVuZ3RoIDogKChhICYmIGEubGVuZ3RoKSB8fCBTdHJpbmcoYSkubGVuZ3RoKSBhcyBuXHJcbmV4cG9ydCBjb25zdCBzTGVuID0gKGE6IHMpID0+IGEubGVuZ3RoXHJcbmV4cG9ydCBjb25zdCBzTWlkTiA9IChwb3M6IG4pID0+IChuOiBuKSA9PiAoYTogcykgPT4gYS5zdWJzdHIocG9zLCBuKVxyXG5leHBvcnQgY29uc3Qgc01pZCA9IChwb3M6IG4pID0+IChhOiBzKSA9PiBhLnN1YnN0cihwb3MpXHJcbmV4cG9ydCBjb25zdCBzTGVmdCA9IChuOiBuKSA9PiAoYTogcykgPT4gYS5zdWJzdHIoMCwgbilcclxuZXhwb3J0IGNvbnN0IHNUcmltID0gKGE6IHMpID0+IGEudHJpbSgpXHJcbmV4cG9ydCBjb25zdCBzUmlnaHQgPSAobjogbikgPT4gKGE6IHMpID0+IHtcclxuICAgIGNvbnN0IGwgPSB2TGVuKGEpXHJcbiAgICBpZiAobiA+PSBsKSByZXR1cm4gYVxyXG4gICAgaWYgKDAgPj0gbikgcmV0dXJuICcnXHJcbiAgICByZXR1cm4gYS5zdWJzdHIoLW4pXHJcbn1cclxuZXhwb3J0IGNvbnN0IG5QYWRaZXJvID0gKGRpZzogbikgPT4gKGE6IG4pID0+IHtcclxuICAgIGNvbnN0IHMgPSBTdHJpbmcoYSlcclxuICAgIGNvbnN0IG5aZXIgPSBkaWcgLSBzLmxlbmd0aFxyXG4gICAgY29uc3QgeiA9IG5aZXIgPiAwID8gXCIwXCIucmVwZWF0KG5aZXIpIDogXCJcIlxyXG4gICAgcmV0dXJuIHogKyBzXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNBbGlnbkwgPSAodzogd2R0KSA9PiAoYTogcykgPT4ge1xyXG4gICAgaWYgKGEgPT09IG51bGwgfHwgYSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gblNwYyh3KVxyXG4gICAgY29uc3QgbCA9IHZMZW4oYSlcclxuICAgIGlmIChsID4gdykgcmV0dXJuIGFcclxuICAgIHJldHVybiBhICsgblNwYyh3IC0gbClcclxufVxyXG5leHBvcnQgY29uc3Qgc0FsaWduUiA9ICh3OiB3ZHQpID0+IChhOiBzKSA9PiB7XHJcbiAgICBjb25zdCBsID0gc0xlbihhKVxyXG4gICAgaWYgKGwgPiB3KSByZXR1cm4gYVxyXG4gICAgcmV0dXJuIG5TcGModyAtIGwpICsgYVxyXG59XHJcbmV4cG9ydCBjb25zdCBzV3J0ID0gKGZ0OiBzKSA9PiAoYTogcykgPT4gZnMud3JpdGVGaWxlU3luYyhmdCwgYSlcclxuZXhwb3J0IGNvbnN0IHNTYnNQb3MgPSAoc2JzOiBzKSA9PiAoYTogcykgPT4gYS5pbmRleE9mKHNicylcclxuLy9zdHJpY3RFcXVhbChzYnNQb3MoJ2FhYmInKSgnMTIzYWFiYicpLDMpXHJcbmV4cG9ydCBjb25zdCBzU2JzUmV2UG9zID0gKHNiczogcykgPT4gKGE6IHMpID0+IGEubGFzdEluZGV4T2Yoc2JzKVxyXG4vL3N0cmljdEVxdWFsKHNic1JldlBvcygnYScpKCcwMTIzYWFiYicpLDUpXHJcbmV4cG9ydCBjb25zdCBjbWxObSA9IChhOiBjbWwpID0+IGNtbE55KGEpLnJldmVyc2UoKS5qb2luKCcgJykgLy8gQGVnIGNtbE5tKHJlbEl0bU55KSA9PT0gJ055IEl0bSByZWwnXHJcbmV4cG9ydCBjb25zdCBjbWxTcGNObSA9IChhOiBjbWwpID0+IGNtbE55KGEpLmpvaW4oJyAnKVxyXG5leHBvcnQgY29uc3QgaXNObSA9IChzOiBzKSA9PiB7XHJcbiAgICBpZiAocyA9PT0gdW5kZWZpbmVkIHx8IHMgPT09IG51bGwgfHwgcyA9PT0gJycpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBpZiAoIWNockNkX2lzRnN0Tm1DaHIocy5jaGFyQ29kZUF0KDApKSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghY2hyQ2RfaXNObUNocihzLmNoYXJDb2RlQXQoaSkpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlXHJcbn1cclxuZXhwb3J0IGNvbnN0IHNScGxOb25ObUNociA9IChhOiBzKSA9PiB7XHJcbiAgICBjb25zdCBhMTogc1tdID0gW11cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBhLmNoYXJDb2RlQXQoaSlcclxuICAgICAgICBpZiAoY2hyQ2RfaXNObUNocihjKSlcclxuICAgICAgICAgICAgYTEucHVzaChhW2ldKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYTEucHVzaCgnICcpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYTEuam9pbignJylcclxufVxyXG5leHBvcnQgY29uc3Qgc05tU2V0ID0gKGE6IHMpID0+IG5ldyBTZXQ8cz4oc1JwbE5vbk5tQ2hyKGEpLnNwbGl0KC9cXHMrLykpXHJcbmNvbnN0IF9pc0Jya0NockNkID0gKGM6IG4pID0+IGMgPT09IE5hTiB8fCBjaHJDZF9pc0NhcGl0YWxMZXR0ZXIoYykgfHwgY2hyQ2RfaXNVbmRlclNjb3JlKGMpIHx8IGNockNkX2lzRG9sbGFyKGMpXHJcbmNvbnN0IF9pc0JyayA9IChjOiBuLCBjMDogbikgPT4gX2lzQnJrQ2hyQ2QoYykgJiYgIV9pc0Jya0NockNkKGMwKVxyXG5leHBvcnQgY29uc3QgY21sTnkgPSAoYTogY21sKSA9PiB7XHJcbiAgICBpZiAoIWlzTm0oYSkpXHJcbiAgICAgICAgZXIoJ0dpdmUge3N9IGlzIG5vdCBhIG5hbWUnLCB7IHM6IGEgfSlcclxuICAgIGNvbnN0IG86IHNbXSA9IFtdXHJcbiAgICBsZXQgbSA9ICcnXHJcbiAgICBmb3IgKGxldCBpID0gYS5sZW5ndGg7IGktLTsgaSA+IDApIHtcclxuICAgICAgICBjb25zdCBjYyA9IGFbaV1cclxuICAgICAgICBjb25zdCBjID0gYS5jaGFyQ29kZUF0KGkpXHJcbiAgICAgICAgY29uc3QgYzAgPSBhLmNoYXJDb2RlQXQoaSAtIDEpXHJcbiAgICAgICAgbSA9IGNjICsgbVxyXG4gICAgICAgIGlmIChfaXNCcmsoYywgYzApKSB7XHJcbiAgICAgICAgICAgIG8ucHVzaChtKVxyXG4gICAgICAgICAgICBtID0gJydcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobSAhPT0gJycpXHJcbiAgICAgICAgby5wdXNoKG0pXHJcbiAgICBjb25zdCB6OiBzW10gPSBvLnJldmVyc2UoKVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5leHBvcnQgY29uc3Qgc0hhc1BmeCA9IChwZng6IHMpID0+IChhOiBzKSA9PiBhLnN0YXJ0c1dpdGgocGZ4KVxyXG5leHBvcnQgY29uc3Qgc0hhc1NmeCA9IChzZng6IHMpID0+IChhOiBzKSA9PiBhLmVuZHNXaXRoKHNmeClcclxuZXhwb3J0IGNvbnN0IHNSbXZTZnggPSAoc2Z4OiBzKSA9PiAoYTogcykgPT4gc0hhc1NmeChzZngpKGEpID8gYS5zdWJzdHIoMCwgYS5sZW5ndGggLSBzZngubGVuZ3RoKSA6IGFcclxuZXhwb3J0IGNvbnN0IHNSbXZQZnggPSAocGZ4OiBzKSA9PiAoYTogcykgPT4gc0hhc1BmeChwZngpKGEpID8gYS5zdWJzdHIoYS5sZW5ndGgpIDogYVxyXG5leHBvcnQgY29uc3Qgc0hhc1BmeF9JR05PUkVfQ0FTRSA9IChwZng6IHMpID0+IChhOiBzKSA9PiBhLnRvVXBwZXJDYXNlKCkuc3RhcnRzV2l0aChwZngudG9VcHBlckNhc2UoKSlcclxuZXhwb3J0IGNvbnN0IHNIYXNTZnhfSUdOT1JFX0NBU0UgPSAoc2Z4OiBzKSA9PiAoYTogcykgPT4gYS50b1VwcGVyQ2FzZSgpLmVuZHNXaXRoKHNmeC50b1VwcGVyQ2FzZSgpKVxyXG5leHBvcnQgY29uc3Qgc1JtdlBmeF9JR05PUkVfQ0FTRSA9IChwZng6IHMpID0+IChhOiBzKSA9PiBzSGFzUGZ4KHBmeCkoYSkgPyBhLnN1YnN0cihwZngubGVuZ3RoKSA6IGFcclxuZXhwb3J0IGNvbnN0IHNSbXZTZnhfSUdOT1JFX0NBU0UgPSAoc2Z4OiBzKSA9PiAoYTogcykgPT4gc0hhc1NmeChzZngpKGEpID8gYS5zdWJzdHIoMCwgYS5sZW5ndGggLSBzZngubGVuZ3RoKSA6IGFcclxuXHJcbmV4cG9ydCBjb25zdCBzSGFzUGZ4SWduQ2FzID0gc0hhc1BmeF9JR05PUkVfQ0FTRVxyXG5cclxuZXhwb3J0IGNvbnN0IHNNYXRjaCA9IChyZTogcmUpID0+IChhOiBzKSA9PiBhLm1hdGNoKHJlKVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBwcmVkTm90OiAoKGE6IHApID0+IHApID0gYSA9PiB2ID0+ICFhKHYpXHJcbmV4cG9ydCBjb25zdCBwcmVkc09yOiAoKC4uLmE6IHBbXSkgPT4gcCkgPSAoLi4uYSkgPT4gdiA9PiB7IGZvciAobGV0IHAgb2YgYSkgaWYgKHAodikpIHJldHVybiB0cnVlOyByZXR1cm4gZmFsc2UgfVxyXG5leHBvcnQgY29uc3QgcHJlZHNBbmQ6ICgoLi4uYTogcFtdKSA9PiBwKSA9ICguLi5hKSA9PiB2ID0+IHsgZm9yIChsZXQgcCBvZiBhKSBpZiAoIXAodikpIHJldHVybiBmYWxzZTsgcmV0dXJuIHRydWUgfVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBpc1Jta0xpbiA9IChhOiBzKSA9PiB7XHJcbiAgICBjb25zdCBsID0gYS50cmltKClcclxuICAgIGlmIChsID09PSBcIlwiKSByZXR1cm4gdHJ1ZVxyXG4gICAgaWYgKHNIYXNQZngoXCItLVwiKShsKSkgcmV0dXJuIHRydWVcclxuICAgIHJldHVybiBmYWxzZVxyXG59XHJcbmV4cG9ydCBjb25zdCBpc05vblJta0xpbjogc1ByZWQgPSBwcmVkTm90KGlzUm1rTGluKVxyXG5leHBvcnQgY29uc3QgbGluUm12TXNnID0gKGE6IGxpbikgPT4ge1xyXG4gICAgY29uc3QgYTEgPSBhLm1hdGNoKC8oLiopLS0tLylcclxuICAgIGNvbnN0IGEyID0gYTEgPT09IG51bGwgPyBhIDogYTFbMV1cclxuICAgIGlmIChzSGFzUGZ4KFwiXlwiKShhMi50cmltTGVmdCgpKSkgcmV0dXJuIFwiXCJcclxuICAgIHJldHVybiBhMlxyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBzQnJrQXQgPSAoYXQ6IG4sIGxlbjogbikgPT4gKGE6IHMpID0+IHsgcmV0dXJuIHsgczE6IHNMZWZ0KGF0KShhKS50cmltKCksIHMyOiBzTWlkKGF0ICsgbGVuKShhKS50cmltKCkgfSB9XHJcbmV4cG9ydCBjb25zdCBzQnJrMSA9IChzZXA6IHMpID0+IChhOiBzKSA9PiB7IGNvbnN0IGF0ID0gc1Nic1BvcyhzZXApKGEpOyByZXR1cm4gYXQgPT09IC0xID8geyBzMTogc1RyaW0oYSksIHMyOiAnJyB9IDogc0Jya0F0KGF0LCBzTGVuKHNlcCkpKGEpIH1cclxuZXhwb3J0IGNvbnN0IHNCcmsyID0gKHNlcDogcykgPT4gKGE6IHMpID0+IHsgY29uc3QgYXQgPSBzU2JzUG9zKHNlcCkoYSk7IHJldHVybiBhdCA9PT0gLTEgPyB7IHMxOiAnJywgczI6IHNUcmltKGEpIH0gOiBzQnJrQXQoYXQsIHNMZW4oc2VwKSkoYSkgfVxyXG5leHBvcnQgY29uc3Qgc0JyayA9IChzZXA6IHMpID0+IChhOiBzKSA9PiB7IGNvbnN0IGF0ID0gc1Nic1BvcyhzZXApKGEpOyByZXR1cm4gc0Jya0F0KGF0LCBzTGVuKHNlcCkpKGEpIH1cclxuZXhwb3J0IGNvbnN0IHF1b3RlU3RyQnJrID0gKGE6IHMpID0+IHtcclxuICAgIGNvbnN0IGwgPSBhLmxlbmd0aFxyXG4gICAgaWYgKGwgPT09IDEpIHJldHVybiB7IHExOiBhLCBxMjogYSB9XHJcbiAgICBpZiAobCA9PT0gMikgcmV0dXJuIHsgcTE6IGEuc3Vic3RyKDAsIDEpLCBxMjogYS5zdWJzdHIoMSkgfVxyXG4gICAgbGV0IHAgPSBzU2JzUG9zKFwiKlwiKShhKVxyXG4gICAgaWYgKHAgPT09IC0xKSByZXR1cm4geyBxMTogXCJcIiwgcTI6IFwiXCIgfVxyXG4gICAgbGV0IHsgczE6IHExLCBzMjogcTIgfSA9IHNCcmtBdChwLCAxKShhKVxyXG4gICAgcmV0dXJuIHsgcTEsIHEyIH1cclxufVxyXG5leHBvcnQgY29uc3Qgc1F1b3RlID0gKHE6IHMpID0+IChhOiBzKSA9PiB7XHJcbiAgICBsZXQgcXEgPSBxdW90ZVN0ckJyayhxKTtcclxuICAgIGlmIChxcSA9PT0gbnVsbCkgcmV0dXJuIGE7IGVsc2UgeyBsZXQgeyBxMSwgcTIgfSA9IHFxOyByZXR1cm4gcTEgKyBhICsgcTIgfTtcclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBzVGFrQmVmID0gKHNlcDogcykgPT4gKGE6IHMpID0+IHNSZXZCcmsyKHNlcCkoYSkuczFcclxuZXhwb3J0IGNvbnN0IHNUYWtBZnQgPSAoc2VwOiBzKSA9PiAoYTogcykgPT4gc1JldkJyazEoc2VwKShhKS5zMlxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBzUmV2QnJrMSA9IChzZXA6IHMpID0+IChhOiBzKSA9PiB7IGNvbnN0IGF0ID0gc1Nic1BvcyhzZXApKGEpOyByZXR1cm4gYXQgPT09IC0xID8geyBzMTogYS50cmltKCksIHMyOiAnJyB9IDogc0Jya0F0KGF0LCBzZXAubGVuZ3RoKShhKSB9XHJcbmV4cG9ydCBjb25zdCBzUmV2QnJrMiA9IChzZXA6IHMpID0+IChhOiBzKSA9PiB7IGNvbnN0IGF0ID0gc1Nic1BvcyhzZXApKGEpOyByZXR1cm4gYXQgPT09IC0xID8geyBzMTogJycsIHMyOiBhLnRyaW0oKSB9IDogc0Jya0F0KGF0LCBzZXAubGVuZ3RoKShhKSB9XHJcbmV4cG9ydCBjb25zdCBzUmV2QnJrID0gKHNlcDogcykgPT4gKGE6IHMpID0+IHsgY29uc3QgYXQgPSBzU2JzUmV2UG9zKHNlcCkoYSk7IHJldHVybiBzQnJrQXQoYXQsIHNlcC5sZW5ndGgpKGEpIH1cclxuZXhwb3J0IGNvbnN0IHNSZXZUYWtCZWYgPSAoc2VwOiBzKSA9PiAoYTogcykgPT4gc1JldkJyazIoc2VwKShhKS5zMVxyXG5leHBvcnQgY29uc3Qgc1JldlRha0FmdCA9IChzZXA6IHMpID0+IChhOiBzKSA9PiBzUmV2QnJrMShzZXApKGEpLnMyXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHNSbXZGc3RDaHIgPSBzTWlkKDEpXHJcbmV4cG9ydCBjb25zdCBzUm12TGFzQ2hyID0gKGE6IHMpID0+IHNMZWZ0KGEubGVuZ3RoIC0gMSkoYSlcclxuZXhwb3J0IGNvbnN0IHNSbXZMYXNOQ2hyID0gKG46IG4pID0+IChhOiBzKSA9PiBzTGVmdChhLmxlbmd0aCAtIG4pKGEpXHJcbmV4cG9ydCBjb25zdCBzUm12U3ViU3RyID0gKHNiczogcykgPT4gKGE6IHMpID0+IHsgY29uc3QgcmUgPSBuZXcgUmVnRXhwKHNicywgJ2cnKTsgcmV0dXJuIGEucmVwbGFjZShyZSwgJycpIH1cclxuZXhwb3J0IGNvbnN0IHNSbXZDb2xvbiA9IHNSbXZTdWJTdHIoXCI6XCIpXHJcbmV4cG9ydCBjb25zdCBwdGhzZXAgPSBwYXRoLnNlcFxyXG5leHBvcnQgY29uc3Qgc1B0aFNlcFBvc1JldiA9IChzOiBzKSA9PiB7XHJcbiAgICBjb25zdCB6ID0gcy5sYXN0SW5kZXhPZignXFxcXCcpXHJcbiAgICBpZiAoeiA+PSAwKVxyXG4gICAgICAgIHJldHVybiB6XHJcbiAgICByZXR1cm4gcy5sYXN0SW5kZXhPZignLycpXHJcbn1cclxuZXhwb3J0IGNvbnN0IHB0aFBhciA9IChhOiBwdGgpOiBwdGggPT4ge1xyXG4gICAgY29uc3Qgc2VnQXkgPSBwdGhTZWdBeShhKVxyXG4gICAgc2VnQXkucG9wKClcclxuICAgIHNlZ0F5LnBvcCgpXHJcbiAgICByZXR1cm4gc2VnQXkuam9pbihwdGhzZXApICsgcHRoc2VwXHJcbn1cclxuZXhwb3J0IGNvbnN0IHB0aFNlZ0F5ID0gKGE6IHB0aCk6IHNlZ1tdID0+IGEuc3BsaXQoL1tcXFxcXFwvXS9nKVxyXG5leHBvcnQgY29uc3QgcHRoQnJ3ID0gKGE6IHB0aCkgPT4gY21kU2hlbGwoc0ZtdCgnZXhwbG9yZXIgXCI/XCInLCBhKSlcclxuZXhwb3J0IGNvbnN0IGZmblB0aCA9IChhOiBmZm4pID0+IHsgY29uc3QgYXQgPSBzUHRoU2VwUG9zUmV2KGEpOyByZXR1cm4gYXQgPT09IC0xID8gJycgOiBzTGVmdChhdCArIDEpKGEpIH1cclxuZXhwb3J0IGNvbnN0IGZmbkZuID0gKGE6IGZmbikgPT4geyBjb25zdCBhdCA9IHNQdGhTZXBQb3NSZXYoYSk7IHJldHVybiBhdCA9PT0gLTEgPyBhIDogc01pZChhdCArIDEpKGEpIH1cclxuZXhwb3J0IGNvbnN0IGZmbkV4dCA9IChhOiBmZm4pID0+IHsgY29uc3QgYXQgPSBhLmxhc3RJbmRleE9mKCcuJyk7IHJldHVybiBhdCA9PT0gLTEgPyAnJyA6IHNNaWQoYXQpKGEpIH1cclxuZXhwb3J0IGNvbnN0IGZmbkFkZEZuU2Z4ID0gKHNmeDogcykgPT4gKGE6IHMpID0+IGZmbkZmbm4oYSkgKyBzZnggKyBmZm5FeHQoYSlcclxuZXhwb3J0IGNvbnN0IGZmblJtdkV4dCA9IChhOiBmZm4pID0+IHsgY29uc3QgYXQgPSBhLmluZGV4T2YoJy4nKTsgcmV0dXJuIGF0ID09PSAtMSA/IGEgOiBzTGVmdChhdCkoYSkgfVxyXG5leHBvcnQgY29uc3QgZmZuRmZubiA9IGZmblJtdkV4dFxyXG5leHBvcnQgY29uc3QgZmZuRm5uID0gKGE6IGZmbikgPT4gZmZuRm4oZmZuUm12RXh0KGEpKVxyXG5leHBvcnQgY29uc3QgZmZuUnBsRXh0ID0gKGV4dDogcykgPT4gKGE6IHMpID0+IGZmblJtdkV4dChhKSArIGV4dFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBmdExpbmVzID0gKGE6IGZ0KSA9PiAoZnMucmVhZEZpbGVTeW5jKGEpLnRvU3RyaW5nKCkpXHJcbmV4cG9ydCBjb25zdCBmdEx5ID0gKGE6IGZ0KSA9PiBzU3BsaXRMaW5lcyhmdExpbmVzKGEpKVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCB0bXBubSA9ICgpID0+IHNSbXZDb2xvbihuZXcgRGF0ZSgpLnRvSlNPTigpKVxyXG5leHBvcnQgY29uc3QgdG1wcHRoID0gb3MudG1wZGlyICsgcHRoc2VwXHJcbmV4cG9ydCBjb25zdCB0bXBmZm4gPSAocGZ4ID0gXCJcIiwgZXh0LCBfZmRyPzogcywgX2ZuPzogcykgPT4gdG1wZmRyKF9mZHIpICsgcGZ4ICsgdG1wbm0oKSArIGV4dFxyXG5leHBvcnQgY29uc3QgdG1wZmRyID0gKGZkcj86IHMpID0+IHtcclxuICAgIGlmIChmZHIgPT09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gdG1wcHRoXHJcbiAgICBjb25zdCBhID0gdG1wcHRoICsgJ0Zkci8nOyBwdGhFbnMoYSlcclxuICAgIGNvbnN0IGExID0gYSArIGZkciArIHB0aHNlcDsgcHRoRW5zKGExKVxyXG4gICAgY29uc3QgYTIgPSBhMSArIHRtcG5tKCkgKyBwdGhzZXA7IHB0aEVucyhhMilcclxuICAgIHJldHVybiBhMlxyXG59XHJcbmV4cG9ydCBjb25zdCB0bXBmZm5CeUZkckZuID0gKGZkcjogcywgZm46IHMpID0+IHRtcGZkcihmZHIpICsgZm5cclxuZXhwb3J0IGNvbnN0IHRtcGZ0ID0gKCkgPT4gdG1wZmZuKFwiVFwiLCBcIi50eHRcIilcclxuZXhwb3J0IGNvbnN0IHRtcGZqc29uID0gKF9mZHI/OiBzLCBfZm4/OiBzKSA9PiB0bXBmZm4oXCJUXCIsIFwiLmpzb25cIiwgX2ZkciwgX2ZuKVxyXG5leHBvcnQgY29uc3QgZmZuQ2xvbmVUbXAgPSAoYTogZmZuKSA9PiB7XHJcbiAgICBjb25zdCBvID0gdG1wZmZuKHVuZGVmaW5lZCwgZmZuRXh0KGEpKVxyXG4gICAgZnMuY29weUZpbGVTeW5jKGEsIG8pXHJcbiAgICBmcy5yZWFkXHJcbiAgICByZXR1cm4gb1xyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHBtID0gPFQ+KGYsIC4uLnApID0+IG5ldyBQcm9taXNlPFQ+KFxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gcmV0dXJuIGEgUHJvbWlzZSBvZiB7ZXIscnNsdH0gYnkgY2FsbGluZyBmKC4uLnAsY2IpLCB3aGVyZSBjYiBpcyAoZXIscnNsdCk9PnsuLi59XHJcbiAgICAgKiBpdCBpcyB1c2VmdWxseSBpbiBjcmVhdGluZyBhIHByb21pc2UgYnkgYW55IGFzeW5jIGYoLi4ucCxjYilcclxuICAgICAqIEBwYXJhbSB7KGVyLHJzbHQpPT52b2lkfSBmIFxyXG4gICAgICogQHBhcmFtIHsuLi5hbnl9IHAgXHJcbiAgICAgKiBAc2VlXHJcbiAgICAgKi9cclxuICAgIChycywgcmopID0+IHtcclxuICAgICAgICBmKC4uLnAsIChlLCByc2x0KSA9PiB7XHJcbiAgICAgICAgICAgIGUgPyByaihlKSA6IHJzKHJzbHQpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuKVxyXG5leHBvcnQgY29uc3QgcG1FclJzbHQgPSAoZiwgLi4ucCkgPT4gbmV3IFByb21pc2U8eyBlciwgcnNsdCB9PihcclxuICAgIChycywgcmopID0+IHtcclxuICAgICAgICBmKC4uLnAsIChlciwgcnNsdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeiA9IGVyID8geyBlciwgcnNsdDogbnVsbCB9IDogeyBlciwgcnNsdCB9XHJcbiAgICAgICAgICAgIHJzKHopXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuKVxyXG5leHBvcnQgY29uc3QgcG1Sc2x0T3B0ID0gPFQ+KGYsIC4uLnApID0+IG5ldyBQcm9taXNlPFQgfCBudWxsPihcclxuICAgIChycywgcmopID0+IHtcclxuICAgICAgICBmKC4uLnAsIChlciwgcnNsdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeiA9IGVyID8gbnVsbCA6IHJzbHRcclxuICAgICAgICAgICAgcnMoeilcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4pXHJcbmV4cG9ydCBjb25zdCBmdExpbmVzUG0gPSAoYTogZnQpID0+IHBtKGZzLnJlYWRGaWxlLCBhKS50aGVuKHJzbHQgPT4gcnNsdC50b1N0cmluZygpKVxyXG5leHBvcnQgY29uc3QgZnRMeVBtID0gKGE6IGZ0KSA9PiBmdExpbmVzUG0oYSkudGhlbihsaW5lcyA9PiBzU3BsaXRDckxmKGxpbmVzKSlcclxuZXhwb3J0IGNvbnN0IHB0aEVucyA9IChhOiBwdGgpID0+IHsgaWYgKCFmcy5leGlzdHNTeW5jKGEpKSBmcy5ta2RpclN5bmMoYSkgfVxyXG5leHBvcnQgY29uc3QgaXNQdGhFeGlzdCA9IChhOiBwdGgpID0+IGZzLmV4aXN0c1N5bmMoYSlcclxuZXhwb3J0IGNvbnN0IGlzRmZuRXhpc3QgPSAoYTogZmZuKSA9PiBmcy5leGlzdHNTeW5jKGEpXHJcbmV4cG9ydCBjb25zdCBhc3NlcnRJc1B0aEV4aXN0ID0gKGE6IHB0aCkgPT4geyBpZiAoIWlzUHRoRXhpc3QoYSkpIGVyKGBwYXRoIGRvZXMgbm90IGV4aXN0IFske2F9XWApIH1cclxuZXhwb3J0IGNvbnN0IHB0aEVuc1NmeFNlcCA9IChhOiBwdGgpID0+IHNMYXNDaHIoYSkgPT09IHB0aHNlcCA/IGEgOiBhICsgcHRoc2VwXHJcbmV4cG9ydCBjb25zdCBwdGhFbnNTdWJGZHIgPSAoc3ViRmRyOiBzKSA9PiAoYTogcHRoKSA9PiB7XHJcbiAgICBhc3NlcnRJc1B0aEV4aXN0KGEpXHJcbiAgICBsZXQgYiA9IHN1YkZkci5zcGxpdCgvW1xcXFxcXC9dLylcclxuICAgIGxldCBjID0gaXRyUm12RW1wKGIpXHJcbiAgICBsZXQgZCA9IHB0aEVuc1NmeFNlcChhKVxyXG4gICAgbGV0IGU6IGF5ID0gW11cclxuICAgIGZvciAobGV0IHNlZyBvZiBjKSB7XHJcbiAgICAgICAgZCArPSBzZWcgKyAnXFxcXCc7XHJcbiAgICAgICAgZS5wdXNoKGQpXHJcbiAgICB9XHJcbiAgICBpdHJFYWNoKHB0aEVucykoZSlcclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBpdHJXaGVyZSA9IDxUPihwOiBwcmVkPFQ+KSA9PiAoYTogSXRyPFQ+KTogVFtdID0+IHsgY29uc3QgbzogVFtdID0gW107IGZvciAobGV0IGkgb2YgYSkgaWYgKHAoaSkpIG8ucHVzaChpKTsgcmV0dXJuIG8gfVxyXG5leHBvcnQgY29uc3QgaXRyRXhjbHVkZSA9IChwOiBwKSA9PiAoYTogaXRyKSA9PiB7IGNvbnN0IG86IGF5ID0gW107IGZvciAobGV0IGkgb2YgYSkgaWYgKCFwKGkpKSBvLnB1c2goaSk7IHJldHVybiBvIH1cclxuZXhwb3J0IGNvbnN0IGl0ck1hcCA9IDxBLCBCPihmOiAoYTogQSwgaT86IG4pID0+IEIpID0+IChhOiBpdHIpOiBCW10gPT4geyBsZXQgaSA9IDA7IGNvbnN0IG86IGF5ID0gW107IGZvciAobGV0IGl0bSBvZiBhKSBvLnB1c2goZihpdG0sIGkrKykpOyByZXR1cm4gbyB9XHJcbmV4cG9ydCBjb25zdCBpdHJFYWNoID0gPFQ+KGY6IChhOiBULCBpPzogbikgPT4gdm9pZCkgPT4gKGE6IEl0cjxUPikgPT4geyBsZXQgaSA9IDA7IGZvciAobGV0IGl0bSBvZiBhKSBmKGl0bSwgaSsrKSB9XHJcbmV4cG9ydCBjb25zdCBpdHJGb2xkID0gX2l0ckZvbGQgPT4gZiA9PiBjdW0gPT4gYSA9PiB7IGZvciAobGV0IGkgb2YgYSkgY3VtID0gZihjdW0pKGkpOyByZXR1cm4gY3VtIH1cclxuZXhwb3J0IGNvbnN0IGl0clJlZHVjZSA9IGYgPT4gKGE6IGl0cikgPT4gaXRyRm9sZChmKShpdHJGc3QoYSkpKGEpXHJcbmV4cG9ydCBjb25zdCB3aGVyZSA9IGl0cldoZXJlXHJcbmV4cG9ydCBjb25zdCBtYXAgPSBpdHJNYXBcclxuZXhwb3J0IGNvbnN0IGVhY2ggPSBpdHJFYWNoXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBtYXBLeSA9IChfbWFwOiBtYXApID0+IGl0ckF5KF9tYXAua2V5cygpKVxyXG5leHBvcnQgY29uc3QgbWFwVnkgPSAoX21hcDogbWFwKSA9PiBpdHJBeShfbWFwLnZhbHVlcygpKVxyXG5leHBvcnQgY29uc3QgbWFwS3Z5ID0gKF9tYXA6IG1hcCkgPT4gaXRyQXkoX21hcC5lbnRyaWVzKCkpXHJcbmV4cG9ydCBjb25zdCBtYXBLc2V0ID0gKF9tYXA6IG1hcCkgPT4gbmV3IFNldChfbWFwLmtleXMoKSlcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHNldEF5ID0gPFQ+KF9zZXQ6IFNldDxUPik6IFRbXSA9PiB7IGNvbnN0IG86IFRbXSA9IFtdOyBmb3IgKGxldCBpIG9mIF9zZXQpIG8ucHVzaChpKTsgcmV0dXJuIG8gfVxyXG5leHBvcnQgY29uc3Qgc2V0V2hlcmUgPSA8VD4oX3A6IHByZWQ8VD4pID0+IChfc2V0OiBTZXQ8VD4pOiBTZXQ8VD4gPT4ge1xyXG4gICAgY29uc3QgeiA9IG5ldyBTZXQ8VD4oKVxyXG4gICAgZm9yIChsZXQgaSBvZiBfc2V0KVxyXG4gICAgICAgIGlmIChfcChpKSlcclxuICAgICAgICAgICAgei5hZGQoaSlcclxuICAgIHJldHVybiB6XHJcbn1cclxuZXhwb3J0IGNvbnN0IHNldFNydCA9IDxUPihfc2V0OiBTZXQ8VD4pOiBTZXQ8VD4gPT4gbmV3IFNldDxUPihzZXRBeShfc2V0KS5zb3J0KCkpXHJcbmV4cG9ydCBjb25zdCBzc2V0U3J0ID0gc2V0U3J0IGFzIChfc3NldDogc3NldCkgPT4gc3NldFxyXG5leHBvcnQgY29uc3Qgc2V0QWRkID0gPFQ+KF94OiBTZXQ8VD4gfCBudWxsIHwgdW5kZWZpbmVkKSA9PiAoX3NldDogU2V0PFQ+KTogU2V0PFQ+ID0+IHtcclxuICAgIGlmIChfeCA9PT0gbnVsbCB8fCBfeCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBfc2V0XHJcbiAgICBmb3IgKGxldCBpIG9mIF94KVxyXG4gICAgICAgIF9zZXQuYWRkKGkpO1xyXG4gICAgcmV0dXJuIF9zZXRcclxufVxyXG5leHBvcnQgY29uc3Qgc2V0TWludXMgPSA8VD4oX3g6IFNldDxUPiB8IG51bGwgfCB1bmRlZmluZWQpID0+IChfc2V0OiBTZXQ8VD4pOiBTZXQ8VD4gPT4ge1xyXG4gICAgaWYgKF94ID09PSBudWxsIHx8IF94ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIF9zZXRcclxuICAgIGZvciAobGV0IGkgb2YgX3gpIF9zZXQuZGVsZXRlKGkpO1xyXG4gICAgcmV0dXJuIF9zZXRcclxufVxyXG5jb25zdCBfc2V0QWZ0ID0gKGluY2wsIGEsIHNldCkgPT4ge1xyXG4gICAgY29uc3QgeiA9IG5ldyBTZXRcclxuICAgIGxldCBmb3VuZCA9IGZhbHNlXHJcbiAgICBmb3IgKGxldCBpIG9mIHNldClcclxuICAgICAgICBpZiAoZm91bmQpXHJcbiAgICAgICAgICAgIHouYWRkKGkpXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChhID09PSBpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIGlmIChpbmNsKVxyXG4gICAgICAgICAgICAgICAgICAgIHouYWRkKGEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gelxyXG59XHJcbmV4cG9ydCBjb25zdCBsaW5Gc3RUZXJtID0gKGE6IGxpbikgPT4gc1NwbGl0U3BjKGEpWzBdXHJcbmV4cG9ydCBjb25zdCBsaW5MYXNUZXJtID0gKGE6IGxpbikgPT4gYXlMYXMoc1NwbGl0U3BjKGEpKVxyXG5leHBvcnQgY29uc3QgbGluVDIgPSAoYTogbGluKSA9PiB7XHJcbiAgICBjb25zdCB7IHRlcm06IHQxLCByZW1haW5MaW46IGExIH0gPSBsaW5TaGlmdChhKVxyXG4gICAgY29uc3QgeyB0ZXJtOiB0MiwgcmVtYWluTGluIH0gPSBsaW5TaGlmdChhMSlcclxuICAgIHJldHVybiB0MlxyXG59XHJcbmV4cG9ydCBjb25zdCBsaW5TaGlmdCA9IChhOiBsaW4pID0+IHtcclxuICAgIGNvbnN0IGExID0gYS50cmltKClcclxuICAgIGNvbnN0IGEyID0gYTEubWF0Y2goLyhcXFMqKVxccyooLiopLylcclxuICAgIGNvbnN0IG8gPVxyXG4gICAgICAgIGEyID09PSBudWxsXHJcbiAgICAgICAgICAgID8geyB0ZXJtOiBcIlwiLCByZW1haW5MaW46IFwiXCIgfVxyXG4gICAgICAgICAgICA6IHsgdGVybTogYTJbMV0sIHJlbWFpbkxpbjogYTJbMl0gfVxyXG4gICAgcmV0dXJuIG9cclxufVxyXG5leHBvcnQgY29uc3Qgc1JtdkZzdFRlcm0gPSAoYTogcykgPT4gbGluU2hpZnQoYSkucmVtYWluTGluXHJcbmV4cG9ydCBjb25zdCBsaW5SbXZGc3RUZXJtID0gKGE6IGxpbikgPT4gbGluU2hpZnQoYSkucmVtYWluTGluXHJcbmV4cG9ydCBjb25zdCBzZXRBZnQgPSBhZnQgPT4gYSA9PiBfc2V0QWZ0KGZhbHNlLCBhZnQsIGEpXHJcbmV4cG9ydCBjb25zdCBzZXRBZnRJbmNsID0gYSA9PiBzZXQgPT4gX3NldEFmdCh0cnVlLCBhLCBzZXQpXHJcbmV4cG9ydCBjb25zdCBzZXRDbG9uZSA9IHNldCA9PiBpdHJTZXQoc2V0KVxyXG5leHBvcnQgY29uc3QgaXRyU2V0ID0gaXRyID0+IHsgY29uc3QgbyA9IG5ldyBTZXQ7IGZvciAobGV0IGkgb2YgaXRyKSBvLmFkZChpKTsgcmV0dXJuIG8gfVxyXG5leHBvcnQgY29uc3QgaXRyVGZtU2V0ID0gKGY6IGYpID0+IChhOiBpdHIpID0+IHtcclxuICAgIGNvbnN0IG8gPSBuZXcgU2V0OyBmb3IgKGxldCBpIG9mIGEpIG8uYWRkKGYoaSkpOyByZXR1cm4gb1xyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBlbXBTZGljID0gKCkgPT4gbmV3IE1hcDxzLCBzPigpXHJcbmV4cG9ydCBjb25zdCBseVNkaWMgPSAoYTogbHkpID0+IHtcclxuICAgIGNvbnN0IG8gPSBlbXBTZGljKClcclxuICAgIGNvbnN0IGxpbktzID0gYSA9PiB7XHJcbiAgICAgICAgbGV0IHsgdGVybTogaywgcmVtYWluTGluOiBzIH0gPSBsaW5TaGlmdChhKVxyXG4gICAgICAgIHJldHVybiB7IGssIHMgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgeCA9IGxpbiA9PiB7IGxldCB7IGssIHMgfSA9IGxpbktzKGxpbik7IG8uc2V0KGssIHMpIH1cclxuICAgIGVhY2goeCkoYSlcclxuICAgIHJldHVybiBvXHJcbn1cclxuZXhwb3J0IGNvbnN0IGl0clJtdkVtcCA9IDxUPihhOiBJdHI8VCB8IG51bGwgfCB1bmRlZmluZWQ+KTogVFtdID0+IGl0cldoZXJlKGlzTm9uRW1wKShhKVxyXG5leHBvcnQgY29uc3Qgcm12RW1wID0gaXRyUm12RW1wXHJcbmV4cG9ydCBjb25zdCBseVJtdkVtcExpbiA9IGl0clJtdkVtcCBhcyAoX2x5OiBseSkgPT4gbHlcclxuZXhwb3J0IGNvbnN0IGx5UGZ4Q250ID0gKHBmeDogcykgPT4gKGE6IGx5KSA9PiB7XHJcbiAgICBsZXQgeiA9IDBcclxuICAgIGVhY2hcclxuICAgICAgICAoKGxpbjogcykgPT4geyBpZiAoc0hhc1BmeChwZngpKGxpbikpIHorKyB9KVxyXG4gICAgICAgIChhKVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5leHBvcnQgY29uc3QgbHlIYXNNYWpQZnggPSAocGZ4OiBzKSA9PiAoYTogbHkpID0+IDIgKiBseVBmeENudChwZngpKGEpID4gYS5sZW5ndGhcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHJlRXhwQ29uc3RObSA9IC9eZXhwb3J0IGNvbnN0IChbJF9hLXpBLVpdWyRfYS16QS1aMC05XSopIC9cclxuZXhwb3J0IGNvbnN0IHJlQ29uc3RObSA9IC9eY29uc3QgKFskX2EtekEtWl1bJF9hLXpBLVowLTldKikgL1xyXG5jb25zdCByZUV4cERvbGxhckNvbnN0Tm0gPSAvXmV4cG9ydCBjb25zdCAoW1xcJFxcd11bXFwkXzAtOVxcd19dKikgL1xyXG5leHBvcnQgY29uc3Qgc3JjRHJ5ID0gKHJlOiByZSkgPT4gY29tcG9zZShzcmNNYXRjaEF5KHJlKSwgaXRyTWFwKG1hdGNoRHIpKSBhcyAoYTogc3JjKSA9PiBkcnlcclxuZXhwb3J0IGNvbnN0IHNyY0NvbCA9IChyZTogcmUpID0+IChhOiBzcmMpOiBzY29sID0+IHtcclxuICAgIGNvbnN0IGF5ID0gc3JjTWF0Y2hBeShyZSkoYSlcclxuICAgIGNvbnN0IGMgPSBtYXRjaEF5RnN0Q29sKGF5KVxyXG4gICAgY29uc3QgYzEgPSBpdHJSbXZFbXAoYylcclxuICAgIHJldHVybiBjMVxyXG59XHJcbmV4cG9ydCBjb25zdCBheVNydCA9IChhOiBheSkgPT4gYS5zb3J0KClcclxuZXhwb3J0IGNvbnN0IG1hdGNoRHIgPSAoYTogbWF0Y2gpID0+IFsuLi5hXS5zcGxpY2UoMSlcclxuZXhwb3J0IGNvbnN0IG1hdGNoQXlTZHJ5ID0gaXRyTWFwKG1hdGNoRHIpIGFzIChhOiBSZWdFeHBNYXRjaEFycmF5W10pID0+IHNkcnlcclxuZXhwb3J0IGNvbnN0IG1hdGNoRnN0SXRtID0gKGE6IFJlZ0V4cE1hdGNoQXJyYXkpID0+IGEgPT09IG51bGwgPyBudWxsIDogYVsxXSBhcyBzIHwgbnVsbFxyXG5leHBvcnQgY29uc3QgbWF0Y2hBeUZzdENvbCA9IGl0ck1hcChtYXRjaEZzdEl0bSkgYXMgKGE6IFJlZ0V4cE1hdGNoQXJyYXlbXSkgPT4gc1tdXHJcbmV4cG9ydCBjb25zdCBzcmNNYXRjaEF5ID0gY29tcG9zZShzTWF0Y2gsIGl0ck1hcCkgYXMgKF86IHJlKSA9PiAoXzogc3JjKSA9PiBSZWdFeHBNYXRjaEFycmF5W11cclxuZXhwb3J0IGNvbnN0IHNyY0V4cENvbnN0TnkgPSBzcmNDb2wocmVFeHBDb25zdE5tKVxyXG5leHBvcnQgY29uc3Qgc3JjQ29uc3ROeSA9IHNyY0NvbChyZUNvbnN0Tm0pXHJcbmV4cG9ydCBjb25zdCBzcmNFeHBDb25zdERvbGxhck55ID0gc3JjQ29sKHJlRXhwRG9sbGFyQ29uc3RObSlcclxuZXhwb3J0IGNvbnN0IGZ0c0V4cENvbnN0TnkgPSBjb21wb3NlKGZ0THksIHNyY0V4cENvbnN0TnkpIGFzIChhOiBmdHMpID0+IG55XHJcbmV4cG9ydCBjb25zdCBmdHNDb25zdE55ID0gY29tcG9zZShmdEx5LCBzcmNDb25zdE55KSBhcyAoYTogZnRzKSA9PiBueVxyXG5leHBvcnQgY29uc3QgZnRzRXhwQ29uc3REb2xsYXJOeSA9IGNvbXBvc2UoZnRMeSwgc3JjRXhwQ29uc3REb2xsYXJOeSkgYXMgKGE6IGZ0cykgPT4gbnlcclxuZXhwb3J0IGNvbnN0IGZmbkZ0cyA9IGZmblJwbEV4dCgnLnRzJykgYXMgKF86IHMpID0+IHNcclxuZXhwb3J0IGNvbnN0IGlzRlRzdEpzID0gKF9mVHN0SnM6IGZUc3RKcykgPT4ge1xyXG4gICAgY29uc3QgZm4gPSBmZm5GbihfZlRzdEpzKVxyXG4gICAgaWYgKCFzSGFzUGZ4KCd0c3RfXycpKGZuKSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIGlmICghc0hhc1NmeCgnLmpzJykoZm4pKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgY29uc3Qgc2VnQXkgPSBmZm5QdGgoX2ZUc3RKcykuc3BsaXQoL1tcXFxcXFwvXS8pXHJcbiAgICBzZWdBeS5wb3AoKVxyXG4gICAgY29uc3QgdGVzdCA9IHNlZ0F5LnBvcCgpXHJcbiAgICBpZiAodGVzdCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKHRlc3QudG9VcHBlckNhc2UoKSAhPT0gJ1RFU1QnKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgcmV0dXJuIHRydWVcclxufVxyXG5leHBvcnQgY29uc3QgYXNzZXJ0SXNUcnVlID0gKHYsIC4uLm1zZykgPT4ge1xyXG4gICAgaWYgKHYpIHJldHVyblxyXG4gICAgaWYgKG1zZy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgZXIoJ2dpdmVuIHZhdWxlIHNob3VsZCBiZSB0cnVlJylcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG0gPSBtc2cuc2hpZnQoKVxyXG4gICAgICAgIGVyKG0sIG1zZylcclxuICAgIH1cclxufVxyXG5leHBvcnQgY29uc3QgYXNzZXJ0SXNGVHN0SnMgPSAoX2ZUc3RKczogZlRzdEpzKSA9PiBhc3NlcnRJc1RydWUoaXNGVHN0SnMoX2ZUc3RKcyksIFwiZ2l2ZW4gX2ZUc3RKcyBpcyBub3QgZlRzdEpzXCIsIHsgX2ZUc3RKcyB9KVxyXG5leHBvcnQgY29uc3QgZlRzdEpzX2Z0cyA9IChfZlRzdEpzOiBmVHN0SnMpOiBmdHMgPT4ge1xyXG4gICAgYXNzZXJ0SXNGVHN0SnMoX2ZUc3RKcylcclxuICAgIGNvbnN0IGZuID0gZmZuRm4oX2ZUc3RKcylcclxuICAgIGNvbnN0IHB0aCA9IGZmblB0aChfZlRzdEpzKVxyXG4gICAgY29uc3QgYTEgPSBzUm12UGZ4KCd0c3RfXycpKGZuKVxyXG4gICAgY29uc3QgYTIgPSBhYVxyXG4gICAgY29uc3QgekZubiA9IGZmbkZubihmbilcclxuICAgIGNvbnN0IHpQdGggPSBwdGhQYXIocHRoKVxyXG4gICAgcmV0dXJuIHpQdGggKyB6Rm5uICsgJy5qcydcclxufVxyXG5leHBvcnQgY29uc3QgZmpzRXhwQ29uc3ROeSA9IGNvbXBvc2UoZmZuRnRzLCBmdHNFeHBDb25zdE55KVxyXG5leHBvcnQgY29uc3QgZmpzQ29uc3ROeSA9IGNvbXBvc2UoZmZuRnRzLCBmdHNDb25zdE55KVxyXG5leHBvcnQgY29uc3Qgc3RvcCA9ICgpID0+IHsgZGVidWdnZXIgfVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgaXNTdHIgPSB2ID0+IHR5cGVvZiB2ID09PSAnc3RyaW5nJ1xyXG5leHBvcnQgY29uc3QgaXNOdW0gPSB2ID0+IHR5cGVvZiB2ID09PSAnbnVtYmVyJ1xyXG5leHBvcnQgY29uc3QgaXNCb29sID0gdiA9PiB0eXBlb2YgdiA9PT0gJ2Jvb2xlYW4nXHJcbmV4cG9ydCBjb25zdCBpc09iaiA9IHYgPT4gdHlwZW9mIHYgPT09ICdvYmplY3QnXHJcbmV4cG9ydCBjb25zdCBpc1N5ID0gdiA9PiB7XHJcbiAgICBpZiAoIWlzQXkodikpIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKGlzRW1wKHYpKSByZXR1cm4gdHJ1ZVxyXG4gICAgcmV0dXJuIGlzU3RyKHZbMF0pXHJcbn1cclxuZXhwb3J0IGNvbnN0IGlzQXkgPSB1LmlzQXJyYXlcclxuZXhwb3J0IGNvbnN0IGlzRHRlID0gdS5pc0RhdGVcclxuZXhwb3J0IGNvbnN0IGlzRnVuID0gdS5pc0Z1bmN0aW9uXHJcbmV4cG9ydCBjb25zdCBpc1ByaW0gPSB1LmlzUHJpbWl0aXZlXHJcbmV4cG9ydCBjb25zdCBpc1JlID0gdiA9PiB2SXNJbnN0YW5jZU9mKFJlZ0V4cClcclxuZXhwb3J0IGNvbnN0IGlzTm9uTnVsbCA9IHYgPT4gIWlzTnVsbCh2KVxyXG5leHBvcnQgY29uc3QgaXNOdWxsID0gdS5pc051bGxcclxuZXhwb3J0IGNvbnN0IGlzVW5kZWZpbmVkID0gdS5pc1VuZGVmaW5lZFxyXG5leHBvcnQgY29uc3QgaXNOdWxsT3JVbmRlZmluZWQgPSB1LmlzTnVsbE9yVW5kZWZpbmVkXHJcbmV4cG9ydCBjb25zdCBpc1RydWUgPSB2ID0+IHYgPyB0cnVlIDogZmFsc2VcclxuZXhwb3J0IGNvbnN0IGlzRmFsc2UgPSB2ID0+IHYgPyBmYWxzZSA6IHRydWVcclxuZXhwb3J0IGNvbnN0IGlzRW1wID0gdiA9PiB2ID8gZmFsc2UgOiB0cnVlXHJcbmV4cG9ydCBjb25zdCBpc05vbkVtcCA9IHYgPT4gdiA/IHRydWUgOiBmYWxzZVxyXG5leHBvcnQgY29uc3QgaXNPZGQgPSBuID0+IG4gJSAyID09PSAxXHJcbmV4cG9ydCBjb25zdCBpc0V2ZW4gPSBuID0+IG4gJSAyID09PSAwXHJcbmV4cG9ydCBjb25zdCBpc1NwYyA9IChzOiBzKSA9PiBzID09PSBudWxsIHx8IHMgPT09IHVuZGVmaW5lZCB8fCBzWzBdID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IC9cXHMvLnRlc3Qoc1swXSkgYXMgYlxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHNTZWFyY2ggPSAocmU6IFJlZ0V4cCkgPT4gKGE6IHMpID0+IGEuc2VhcmNoKHJlKVxyXG5leHBvcnQgY29uc3Qgc0Jya1AxMjMgPSAocXVvdGVTdHI6IHMpID0+IChhOiBzKSA9PiB7XHJcbiAgICBjb25zdCB7IHExLCBxMiB9ID0gcXVvdGVTdHJCcmsocXVvdGVTdHIpXHJcbiAgICBpZiAocTEgPT09IFwiXCIgfHwgcTIgPT09IFwiXCIpIHJldHVybiBudWxsXHJcbiAgICBjb25zdCBsID0gYS5sZW5ndGhcclxuICAgIGNvbnN0IHExcG9zID0gYS5pbmRleE9mKHExKTtcclxuICAgIGNvbnN0IHEycG9zID0gYS5pbmRleE9mKHEyLCBxMXBvcyArIDEpO1xyXG4gICAgY29uc3QgbGVuMSA9IHExcG9zXHJcbiAgICBjb25zdCBwb3MyID0gcTFwb3MgKyBxMS5sZW5ndGhcclxuICAgIGNvbnN0IHBvczMgPSBxMnBvcyArIHEyLmxlbmd0aFxyXG4gICAgY29uc3QgbGVuMiA9IHBvczMgLSBwb3MyIC0gMVxyXG4gICAgY29uc3QgcDEgPSBhLnN1YnN0cigwLCBsZW4xKVxyXG4gICAgY29uc3QgcDIgPSBhLnN1YnN0cihwb3MyLCBsZW4yKVxyXG4gICAgY29uc3QgcDMgPSBhLnN1YnN0cihwb3MzKVxyXG4gICAgbGV0IHo6IFtzLCBzLCBzXSA9IFtwMSwgcDIsIHAzXVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG4vL2xldCBhID0gc0Jya1AxMjMoXCIoYmFja3VwLSopXCIpKFwic2xrZGZqbHNkamYoYmFja3VwLTEyMykuZXhlXCIpO2RlYnVnZ2VyXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgaXRySXNBbGxUcnVlID0gKGE6IGl0cikgPT4geyBmb3IgKGxldCBpIG9mIGEpIGlmIChpc0ZhbHNlKGkpKSByZXR1cm4gZmFsc2U7IHJldHVybiB0cnVlIH1cclxuZXhwb3J0IGNvbnN0IGl0cklzQWxsRmFsc2UgPSAoYTogaXRyKSA9PiB7IGZvciAobGV0IGkgb2YgYSkgaWYgKGlzVHJ1ZShpKSkgcmV0dXJuIGZhbHNlOyByZXR1cm4gdHJ1ZSB9XHJcbmV4cG9ydCBjb25zdCBpdHJJc1NvbWVUcnVlID0gKGE6IGl0cikgPT4geyBmb3IgKGxldCBpIG9mIGEpIGlmIChpc1RydWUoaSkpIHJldHVybiB0cnVlOyByZXR1cm4gZmFsc2UgfVxyXG5leHBvcnQgY29uc3QgaXRySXNTb21lRmFsc2UgPSAoYTogaXRyKSA9PiB7IGZvciAobGV0IGkgb2YgYSkgaWYgKGlzRmFsc2UoaSkpIHJldHVybiB0cnVlOyByZXR1cm4gZmFsc2UgfVxyXG5leHBvcnQgY29uc3QgaXRyUHJlZElzQWxsVHJ1ZSA9IChwOiBwKSA9PiAoYTogaXRyKSA9PiB7IGZvciAobGV0IGkgb2YgYSkgaWYgKCFwKGkpKSByZXR1cm4gZmFsc2U7IHJldHVybiB0cnVlIH1cclxuZXhwb3J0IGNvbnN0IGl0clByZWRJc0FsbEZhbHNlID0gKHA6IHApID0+IChhOiBpdHIpID0+IHsgZm9yIChsZXQgaSBvZiBhKSBpZiAocChpKSkgcmV0dXJuIGZhbHNlOyByZXR1cm4gdHJ1ZSB9XHJcbmV4cG9ydCBjb25zdCBpdHJQcmVkSXNTb21lRmFsc2UgPSAocDogcCkgPT4gKGE6IGl0cikgPT4geyBmb3IgKGxldCBpIG9mIGEpIGlmICghcChpKSkgcmV0dXJuIHRydWU7IHJldHVybiBmYWxzZSB9XHJcbmV4cG9ydCBjb25zdCBpdHJQcmVkSXNTb21lVHJ1ZSA9IChwOiBwKSA9PiAoYTogaXRyKSA9PiB7IGZvciAobGV0IGkgb2YgYSkgaWYgKHAoaSkpIHJldHVybiB0cnVlOyByZXR1cm4gZmFsc2UgfVxyXG5leHBvcnQgY29uc3QgaXRyQnJrRm9yVHJ1ZUZhbHNlID0gPFQ+KHA6IChhOiBUKSA9PiBiKSA9PiAoYTogSXRyPFQ+KSA9PiB7XHJcbiAgICBjb25zdCB0OiBUW10gPSBbXSwgZjogVFtdID0gW107XHJcbiAgICBmb3IgKGxldCBpIG9mIGEpXHJcbiAgICAgICAgcChpKSA/IHQucHVzaChpKSA6IGYucHVzaChpKTtcclxuICAgIHJldHVybiB7IHQsIGYgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBpdHJBeSA9IDxUPihhOiBJdHI8VD4pID0+IHsgY29uc3QgbzogVFtdID0gW107IGZvciAobGV0IGkgb2YgYSkgby5wdXNoKGkpOyByZXR1cm4gbyB9XHJcbmV4cG9ydCBjb25zdCBpdHJGc3QgPSA8VD4oYTogSXRyPFQ+KSA9PiB7IGZvciAobGV0IGkgb2YgYSkgcmV0dXJuIGk7IHJldHVybiBudWxsIH1cclxuZXhwb3J0IGNvbnN0IGl0ckxhcyA9IDxUPihhOiBJdHI8VD4pID0+IHsgbGV0IGk7IGZvciAoaSBvZiBhKSB7IH07IHJldHVybiAoaSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGkpIH1cclxuZXhwb3J0IGNvbnN0IGl0ckFkZFBmeFNmeCA9IChwZng6IHMsIHNmeDogcykgPT4gKGE6IGl0cikgPT4gaXRyTWFwKHNBZGRQZnhTZngocGZ4LCBzZngpKShhKSBhcyBzW11cclxuZXhwb3J0IGNvbnN0IGl0ckFkZFBmeCA9IChwZng6IHMpID0+IChhOiBpdHIpID0+IGl0ck1hcChzQWRkUGZ4KHBmeCkpKGEpIGFzIHNbXVxyXG5leHBvcnQgY29uc3QgaXRyQWRkU2Z4ID0gKHNmeDogcykgPT4gKGE6IGl0cikgPT4gaXRyTWFwKHNBZGRTZngoc2Z4KSkoYSkgYXMgc1tdXHJcbmV4cG9ydCBjb25zdCBpdHJXZHQgPSAoYTogaXRyKSA9PiBwaXBlKGl0ck1hcCh2TGVuKShhKSkoaXRyTWF4KSBhcyBuXHJcbmV4cG9ydCBjb25zdCBzaXRyV2R0ID0gKGE6IHNJdHIpID0+IHBpcGUoaXRyTWFwKHNMZW4pKGEpKShpdHJNYXgpIGFzIG5cclxuZXhwb3J0IGNvbnN0IGl0ckFsaWduTCA9IChhOiBpdHIpID0+IGl0ck1hcChzQWxpZ25MKGl0cldkdChhKSkpKGEpIGFzIHNbXVxyXG5leHBvcnQgY29uc3QgaXRyQ2xvbmUgPSAoYTogaXRyKSA9PiBpdHJNYXAoaSA9PiBpKShhKSBhcyBheVxyXG5leHBvcnQgY29uc3QgaXRyRmluZCA9IDxUPihwOiAoYTogVCkgPT4gYikgPT4gKGE6IEl0cjxUPikgPT4geyBmb3IgKGxldCBpIG9mIGEpIGlmIChwKGkpKSByZXR1cm4gaTsgcmV0dXJuIG51bGwgfVxyXG5leHBvcnQgY29uc3QgaXRySGFzRHVwID0gKGE6IGl0cikgPT4geyBjb25zdCBzZXQgPSBuZXcgU2V0KCk7IGZvciAobGV0IGkgb2YgYSkgaWYgKHNldC5oYXMoaSkpIHsgcmV0dXJuIHRydWUgfSBlbHNlIHNldC5hZGQoaSk7IHJldHVybiBmYWxzZSB9XHJcbmV4cG9ydCBjb25zdCBpdHJEdXBTZXQgPSA8VD4oYTogSXRyPFQ+KSA9PiB7XHJcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFQ+KClcclxuICAgIGNvbnN0IHogPSBuZXcgU2V0PFQ+KClcclxuICAgIGZvciAobGV0IGkgb2YgYSlcclxuICAgICAgICBpZiAoc2V0LmhhcyhpKSlcclxuICAgICAgICAgICAgei5hZGQoaSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHNldC5hZGQoaSlcclxuICAgIHJldHVybiB6XHJcbn1cclxuZXhwb3J0IGNvbnN0IGl0ck1heCA9IDxUPihhOiBJdHI8VD4pID0+IHsgbGV0IG8gPSBpdHJGc3QoYSk7IGlmIChvID09PSBudWxsKSByZXR1cm4gbnVsbDsgZm9yIChsZXQgaSBvZiBhKSBpZiAoaSA+IG8pIG8gPSBpOyByZXR1cm4gbyB9XHJcbmV4cG9ydCBjb25zdCBpdHJNaW4gPSA8VD4oYTogSXRyPFQ+KSA9PiB7IGxldCBvID0gaXRyRnN0KGEpOyBpZiAobyA9PT0gbnVsbCkgcmV0dXJuIG51bGw7IGZvciAobGV0IGkgb2YgYSkgaWYgKGkgPCBvKSBvID0gaTsgcmV0dXJuIG8gfVxyXG5leHBvcnQgY29uc3QgbWF4ID0gKC4uLnYpID0+IGl0ck1heCh2KVxyXG5leHBvcnQgY29uc3QgbWluID0gKC4uLnYpID0+IGl0ck1pbih2KVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBvU3J0ID0gKG86IG8pOiBvID0+IHtcclxuICAgIGlmIChvID09PSBudWxsIHx8IG8gPT09IHVuZGVmaW5lZCkgcmV0dXJuIHt9XHJcbiAgICBjb25zdCBvbzogYW55ID0ge31cclxuICAgIGZvciAobGV0IGsgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykuc29ydCgpKSB7XHJcbiAgICAgICAgb29ba10gPSBvW2tdXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb29cclxufVxyXG5leHBvcnQgY29uc3Qgb0JyaW5nVXBEb2xsYXJQcnAgPSBvID0+IHtcclxuICAgIC8qKlxyXG4gICAgICogQnJpbmcgdXAgYWxsIHtvfSBjaGlsZCBvYmplY3QgbWVtYmVyIHVwIG9uZSBsZXZlbC4gIFRocm93IGV4Y2VwdGlvbiBpZiB0aGVyZSBpcyBuYW1lIGNvbmZsaWN0XHJcbiAgICAgKiBhc3N1bWUgYWxsIG1lbWJlcnMgb2Yge299IGFyZSBvYmplY3RzXHJcbiAgICAgKiBAcGFyYW0ge29ian0gbyBcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogY29uc3QgJGEgPSB7YTE6J2ExJyxhMjonczInfVxyXG4gICAgICogY29uc3QgJGIgPSB7YjE6J2IxJyxiMjonYjInfVxyXG4gICAgICogY29uc3QgbyA9IHskYSwkYn1cclxuICAgICAqIGJyaW5nVXAobylcclxuICAgICAqIGVxKG8seyRhLCRiLGExLGEyLGIxLGIyfSlcclxuICAgICAqIC8vLS0tLS0tLS0tLS1cclxuICAgICAqICRhLnggPSAxXHJcbiAgICAgKiAkYi54ID0gMlxyXG4gICAgICogdGh3KGJyaW5nVXAobykpXHJcbiAgICAgKi9cclxuICAgIGZvciAobGV0IGNoZE5tIGluIG8pIHtcclxuICAgICAgICBjb25zdCBjaGQgPSBvW2NoZE5tXVxyXG4gICAgICAgIGZvciAobGV0IGNoZE1ick5tIGluIGNoZCkge1xyXG4gICAgICAgICAgICBpZiAob0hhc1BycChjaGRNYnJObSkobykpXHJcbiAgICAgICAgICAgICAgICBlcihcIntjaGRNYnJObX0gb2Yge2NoZH0gZXhpc3RzIGluIHtvfVwiLCB7IGNoZE1ick5tLCBjaGQsIG8gfSlcclxuICAgICAgICAgICAgb1tjaGRNYnJObV0gPSBjaGRbY2hkTWJyTm1dXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9cclxufVxyXG5leHBvcnQgY29uc3QgbnlDbWxTZHJ5ID0gKGE6IG55KSA9PiBpdHJNYXAoY21sTnkpKGEpIGFzIHNkcnlcclxuZXhwb3J0IGNvbnN0IG9DbWxEcnkgPSAoYTogbykgPT4ge1xyXG4gICAgbGV0IHogPSBpdHJNYXAoKG5tOiBzKSA9PiBbY21sTm0obm0pLCBubV0pKG9QcnBOeShhKSlcclxuICAgIGRyeVNydChheUVsZSgwKSkoeilcclxuICAgIGNvbnN0IHcgPSBzZHJ5Q29sV2R0KDApKHopXHJcbiAgICBkcnlDb2xNZHkoMCkoc0FsaWduTCh3KSkoeilcclxuICAgIHJldHVybiB6XHJcbn1cclxuZXhwb3J0IGNvbnN0IG9DdG9yTm0gPSAoYTogbykgPT4gYSAmJiBhLmNvbnN0cnVjdG9yICYmIGEuY29uc3RydWN0b3IubmFtZVxyXG5leHBvcnQgY29uc3Qgb0lzSW5zdGFuY2UgPSAoaW5zdGFuY2U6IEZ1bmN0aW9uKSA9PiAoYTogbykgPT4gYSBpbnN0YW5jZW9mIGluc3RhbmNlXHJcbmV4cG9ydCBjb25zdCBvSGFzQ3Rvck5tID0gKG5tOiBzKSA9PiAoYTogbykgPT4gb0N0b3JObShhKSA9PT0gbm1cclxuZXhwb3J0IGNvbnN0IG9QcnAgPSAocHJwUHRoOiBzKSA9PiAoYTogbykgPT4ge1xyXG4gICAgLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiByZXR1cm4gdGhlIHByb3BlcnR5IHZhbHVlIG9mIG9iamVjdCB7b30gYnkgcHJvcGVydHkgcGF0aCB7cHByUHRofVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJwUHRoXHJcbiAqIEBleGFtcGxlXHJcbiAqIGNvbnN0IGEgPSB7Yjoge2M6ezF9fVxyXG4gKiByZXF1aXJlKCdhc3NlcnQnKS5lcXVhbChwcnAoJ2IuYycpKG8pLCAxKSBcclxuICovXHJcbiAgICBsZXQgdlxyXG4gICAgZm9yIChsZXQgbm0gb2YgcHJwUHRoLnNwbGl0KCcuJykpIHtcclxuICAgICAgICB2ID0gYVtubV1cclxuICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZcclxufVxyXG5leHBvcnQgY29uc3Qgbm1Qcm1fbnkgPSAoX25tUHJtOiBueVBybSk6IG55ID0+IHtcclxuICAgIGlmICh0eXBlb2YgX25tUHJtID09PSAnc3RyaW5nJylcclxuICAgICAgICByZXR1cm4gc1NwbGl0U3BjKF9ubVBybSlcclxuICAgIHJldHVybiBfbm1Qcm1cclxufVxyXG5leHBvcnQgY29uc3QgbnkgPSBubVBybV9ueVxyXG5leHBvcnQgY29uc3Qgb1BycEF5ID0gKF9wcnBObTogbnlQcm0pID0+IChfbzogbykgPT4gaXRyTWFwKChubTogcykgPT4gb1BycChubSkoX28pKShueShfcHJwTm0pKVxyXG5leHBvcnQgY29uc3Qgb1BycE55ID0gKGE6IG8pID0+IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGEpXHJcbmV4cG9ydCBjb25zdCBvSGFzUHJwID0gKHBycE5tOiBubSkgPT4gKGE6IG8pID0+IGEuaGFzT3duUHJvcGVydHkocHJwTm0pXHJcbmV4cG9ydCBjb25zdCBvSGFzTGVuID0gb0hhc1BycCgnbGVuZ3RoJylcclxuZXhwb3J0IGNvbnN0IG9DbWxPYmogPSAoYTogbykgPT4ge1xyXG4gICAgY29uc3QgZHJ5ID0gb0NtbERyeShhKVxyXG4gICAgY29uc3Qgejogb2JqZWN0ID0ge31cclxuICAgIGRyeS5mb3JFYWNoKChbY21sTm0sIHBycE5tXSkgPT4geltjbWxObV0gPSB6W3BycE5tXSlcclxuICAgIHJldHVybiB6XHJcbn1cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5jb25zdCBmdW5zRXhwb3J0ID0gKC4uLmY6IEZ1bmN0aW9uW10pID0+IGYuZm9yRWFjaChmdW5FeHBvcnQpXHJcbmNvbnN0IGZ1bkV4cG9ydCA9IChmOiBGdW5jdGlvbikgPT4ge1xyXG4gICAgY29uc3QgZnVuTmFtZSA9IGYubmFtZVxyXG4gICAgaWYgKG9IYXNQcnAoZnVuTmFtZSkoZXhwb3J0cykpIHtcclxuICAgICAgICBlcigndGhlIHtmdW5OYW1lfSBhbHJlYWR5IGV4cG9ydGVkJywgeyBmdW5OYW1lIH0pXHJcbiAgICB9XHJcbiAgICBleHBvcnRzLmZ1bk5hbWUgPSBmXHJcbn1cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgYXlDbG9uZSA9IChheTogYXkpID0+IGF5LnNsaWNlKDAsIGF5Lmxlbmd0aClcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3Qgc2RyeUNvbFdkdCA9IChjb2xJeDogbikgPT4gKGE6IHNkcnkpID0+IHNpdHJXZHQoZHJ5Q29sKGNvbEl4KShhKSlcclxuZXhwb3J0IGNvbnN0IHNkcnlDb2xXZHRBeSA9IChhOiBzZHJ5KSA9PiBpdHJNYXAoKGk6IG4pID0+IHNkcnlDb2xXZHQoaSkoYSkpKG5JdHIoZHJ5Q29sQ250KGEpKSkgYXMgbltdXHJcbmV4cG9ydCBjb25zdCBkcnlDb2wgPSAoY29sSXg6IG4pID0+IChhOiBkcnkpID0+IGl0ck1hcChheUVsZU9yRGZ0KCcnKShjb2xJeCkpKGEpXHJcbmV4cG9ydCBjb25zdCBkcnlDb2xDbnQgPSAoYTogZHJ5KSA9PiBpdHJNYXgoaXRyTWFwKHZMZW4pKGEpKSBhcyBuXHJcbmV4cG9ydCBjb25zdCBkcnlDZWxsTWR5ID0gKGY6IGYpID0+IChhOiBkcnkpID0+IHsgaXRyRWFjaChheU1keShmKSkoYSkgfVxyXG5leHBvcnQgY29uc3QgZHJ5Q2xvbmUgPSAoYTogZHJ5KSA9PiBpdHJNYXAoKGRyOiBkcikgPT4gaXRyQ2xvbmUoZHIpKShhKSBhcyBkcnlcclxuZXhwb3J0IGNvbnN0IGRyeUNvbE1keSA9IChjb2xJeDogbikgPT4gKGY6IGYpID0+IChhOiBkcnkpID0+IHsgaXRyRWFjaChheU1keUVsZShjb2xJeCkoZikpKGEpIH1cclxuZXhwb3J0IGNvbnN0IHNkcnlMaW5lcyA9IChhOiBzZHJ5KSA9PiBzZHJ5THkoYSkuam9pbignXFxyXFxuJylcclxuZXhwb3J0IGNvbnN0IHdkdEF5TGluID0gKHdkdEF5OiBuW10pID0+IFwifC1cIiArIGl0ck1hcCgodzogbikgPT4gJy0nLnJlcGVhdCh3KSkod2R0QXkpLmpvaW4oJy18LScpICsgXCItfFwiXHJcbmV4cG9ydCBjb25zdCBzZHJMaW4gPSAod2R0QXk6IG5bXSkgPT4gKGE6IHNkcikgPT4ge1xyXG4gICAgbGV0IG0gPSAoW3csIHNdKSA9PiBzQWxpZ25MKHcpKHMpXHJcbiAgICBsZXQgeiA9IGF5WmlwKHdkdEF5LCBhKVxyXG4gICAgbGV0IGF5ID0gaXRyTWFwKG0pKHopXHJcbiAgICBsZXQgcyA9IGF5LmpvaW4oJyB8ICcpXHJcbiAgICByZXR1cm4gXCJ8IFwiICsgcyArIFwiIHxcIlxyXG59XHJcbmV4cG9ydCBjb25zdCBzZHJ5THkgPSAoYTogc2RyeSkgPT4ge1xyXG4gICAgbGV0IHcgPSBzZHJ5Q29sV2R0QXkoYSlcclxuICAgIGxldCBoID0gd2R0QXlMaW4odylcclxuICAgIGxldCB6OiBseSA9IFtoXS5jb25jYXQoaXRyTWFwKHNkckxpbih3KSkoYSksIGgpXHJcbiAgICByZXR1cm4gelxyXG59XHJcbmV4cG9ydCBjb25zdCBpdHJTeSA9IChhOiBpdHIpID0+IGl0ck1hcChTdHJpbmcpKGEpIGFzIHNbXVxyXG5leHBvcnQgY29uc3QgYXlTeSA9IChhOiBheSkgPT4gaXRyTWFwKFN0cmluZykoYSkgYXMgc1tdXHJcbmV4cG9ydCBjb25zdCBkcnlTZHJ5ID0gaXRyTWFwKGF5U3kpIGFzIChhOiBzZHJ5KSA9PiBzZHJ5XHJcbmV4cG9ydCBjb25zdCBkcnlMeSA9IChhOiBkcnkpID0+IHNkcnlMeShkcnlTZHJ5KGEpKVxyXG5leHBvcnQgY29uc3QgZHJzTHkgPSAoYTogZHJzKSA9PiB7XHJcbiAgICBsZXQgeyBmbnksIGRyeSB9ID0gYVxyXG4gICAgbGV0IGIgPSBbZm55XS5jb25jYXQoZHJ5U2RyeShkcnkpKVxyXG4gICAgbGV0IGMgPSBzZHJ5THkoYilcclxuICAgIGxldCB6OiBseSA9IGMuc2xpY2UoMCwgMikuY29uY2F0KGNbMF0sIGMuc2xpY2UoMikpXHJcbiAgICByZXR1cm4gelxyXG59XHJcbmV4cG9ydCBjb25zdCBkcnNMaW5lcyA9IChhOiBkcnMpID0+IGRyc0x5KGEpLmpvaW4oJ1xcclxcbicpXHJcbmNvbnN0IGRyeVNydENvbF9fc3J0RnVuID0gKGNvbEF5OiBuW10pID0+IChkckE6IGF5LCBkckI6IGF5KSA9PiB7XHJcbiAgICBmb3IgKGxldCBpQ29sIG9mIGNvbEF5KSB7XHJcbiAgICAgICAgaWYgKGlDb2wgPCAwKSB7XHJcbiAgICAgICAgICAgIGlmIChkckFbLWlDb2xdID4gZHJCWy1pQ29sXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMVxyXG4gICAgICAgICAgICBpZiAoZHJBWy1pQ29sXSA8IGRyQlstaUNvbF0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChkckFbaUNvbF0gPiBkckJbaUNvbF0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgICAgICBpZiAoZHJBW2lDb2xdIDwgZHJCW2lDb2xdKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDBcclxufVxyXG5leHBvcnQgY29uc3QgZHJ5U3J0Q29sID0gKGNvbEF5OiBuW10pID0+IChhOiBkcnkpID0+IGEuc29ydChkcnlTcnRDb2xfX3NydEZ1bihjb2xBeSkpXHJcbmV4cG9ydCBjb25zdCBkcnlTcnQgPSAoZnVuX29mX2RyX3RvX2tleTogKGRyOiBkcikgPT4gcykgPT4gKGE6IGRyeSkgPT4gYS5zb3J0KChkcl9BLCBkcl9CKSA9PiB2dkNvbXBhcmUoZnVuX29mX2RyX3RvX2tleShkcl9BKSwgZnVuX29mX2RyX3RvX2tleShkcl9CKSkpXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IG95UHJwQ29sID0gcHJwTm0gPT4gb3kgPT4geyBjb25zdCBvbzogYXkgPSBbXTsgZm9yIChsZXQgbyBvZiBveSkgb28ucHVzaChvW3BycE5tXSk7IHJldHVybiBvbyB9XHJcbmV4cG9ydCBjb25zdCBveVBycERyeSA9IHBycE55ID0+IG95ID0+IHsgY29uc3Qgb286IGF5ID0gW107IGZvciAobGV0IG8gb2Ygb3kpIG9vLnB1c2gob1BycEF5KHBycE55KShvKSk7IHJldHVybiBvbyB9XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBsZXQgc0xpazogKGxpazogcykgPT4gKHM6IHMpID0+IGJcclxuZXhwb3J0IGxldCBzSGFzU2JzXHJcbntcclxuICAgIGNvbnN0IF9pc0VzYyA9IGkgPT4geyBmb3IgKGxldCBzcGVjIG9mIFwiKClbXXt9L3wuK1wiKSBpZiAoaSA9PT0gc3BlYykgcmV0dXJuIHRydWUgfVxyXG4gICAgY29uc3QgX2VzY1NwZWMgPSBsaWsgPT4gaXRyTWFwKGkgPT4gaSA9PT0gJ1xcXFwnID8gJ1xcXFxcXFxcJyA6IChfaXNFc2MoaSkgPyAnXFxcXCcgKyBpIDogaSkpKGxpaykuam9pbignJykgLy87IGNvbnN0IHh4eCA9IF9lc2NTcGVjKFwiYWJjP2RkXCIpOyBkZWJ1Z2dlclxyXG4gICAgY29uc3QgX2VzY1N0YXIgPSBsaWsgPT4gaXRyTWFwKGkgPT4gaSA9PT0gJyonID8gJy4qJyA6IGkpKGxpaykuam9pbignJylcclxuICAgIGNvbnN0IF9lc2NRID0gbGlrID0+IHsgY29uc3QgbzogYXkgPSBbXTsgZm9yIChsZXQgaSBvZiBsaWspIG8ucHVzaChpID09PSAnPycgPyAnLicgOiBpKTsgcmV0dXJuIG8uam9pbignJykgfVxyXG4gICAgY29uc3QgX2VzYyA9IGxpayA9PiBcIl5cIiArIHBpcGUobGlrKShfZXNjU3BlYywgX2VzY1N0YXIsIF9lc2NRKSArIFwiJFwiXHJcbiAgICBjb25zdCBfbGlrUmUgPSBsaWsgPT4gbmV3IFJlZ0V4cChfZXNjKGxpaykpXHJcbiAgICBjb25zdCBfaXNFc2NTYnMgPSBpID0+IHsgZm9yIChsZXQgc3BlYyBvZiBcIigpW117fS98Lis/KlwiKSBpZiAoaSA9PT0gc3BlYykgcmV0dXJuIHRydWUgfVxyXG4gICAgY29uc3QgX2VzY1NicyA9IGMgPT4gYyA9PT0gJ1xcXFwnID8gJ1xcXFxcXFxcJyA6IChfaXNFc2NTYnMoYykgPyAnXFxcXCcgKyBjIDogYylcclxuICAgIHNMaWsgPSAobGlrOiBzKSA9PiAoYTogcykgPT4gX2xpa1JlKGEpLnRlc3QoYSlcclxuICAgIHNIYXNTYnMgPSAoc2JzOiBzKSA9PiAoYTogcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IF9lc2NTcGVjID0gaXRyTWFwKF9lc2NTYnMpKHNicykuam9pbihcIlwiKVxyXG4gICAgICAgIGNvbnN0IF9zYnNSZSA9IG5ldyBSZWdFeHAoX2VzY1NwZWMpXHJcbiAgICAgICAgbGV0IG8gPSBfc2JzUmUudGVzdChhKVxyXG4gICAgICAgIHJldHVybiBvXHJcbiAgICB9XHJcbn1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IHB0aEZuQXkgPSAocHRoOiBzLCBsaWs/OiBzKSA9PiB7XHJcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMocHRoKSkgcmV0dXJuIG51bGxcclxuICAgIGNvbnN0IGlzRmlsID0gZW50cnkgPT4gZnMuc3RhdFN5bmMocGF0aC5qb2luKHB0aCwgZW50cnkpKS5pc0ZpbGUoKTtcclxuICAgIGxldCBlbnRyaWVzID0gZnMucmVhZGRpclN5bmMocHRoKVxyXG4gICAgZW50cmllcyA9IChsaWsgPT09IHVuZGVmaW5lZCkgPyBlbnRyaWVzIDogaXRyV2hlcmUoc0xpayhsaWspKShlbnRyaWVzKVxyXG4gICAgbGV0IG86IHNbXSA9IGl0cldoZXJlKGlzRmlsKShlbnRyaWVzKVxyXG4gICAgcmV0dXJuIG9cclxufTsgLy8gY29uc3QgeHh4ID0gcHRoRm5BeShcImM6XFxcXHVzZXJzXFxcXHVzZXJcXFxcXCIsIFwic2RmZGYqLipcIik7IGRlYnVnZ2VyO1xyXG5leHBvcnQgY29uc3QgYXlaaXAgPSAoYTogYXksIGI6IGF5KSA9PiBpdHJNYXAoKGk6IG4pID0+IFthW2ldLCBiW2ldXSkobkl0cihhLmxlbmd0aCkpXHJcbmV4cG9ydCBjb25zdCBlbnRyeVN0YXRQbSA9IGFzeW5jIChhKSA9PiB7XHJcbiAgICBkZWJ1Z2dlclxyXG4gICAgdGhyb3cgMFxyXG59XHJcbmV4cG9ydCBjb25zdCBwdGhGbkF5UG0gPSBhc3luYyAoYTogcHRoLCBsaWs/OiBzKSA9PiB7XHJcbiAgICBkZWJ1Z2dlclxyXG4gICAgdGhyb3cgMFxyXG4gICAgLypcclxuICAgIGNvbnN0IGIgPSBhd2FpdCBwdGhTdGF0QXlQbShhLCBsaWspXHJcbiAgICBsZXQgZDogZm5bXSA9IHBpcGUobkl0cihiLmxlbmd0aCkpKGl0cldoZXJlKGkgPT4gYltpXS5pc0ZpbGUoKSksIGl0ck1hcChpID0+IGVudHJpZXNbaV0pKVxyXG4gICAgZGVidWdnZXJcclxuICAgIHJldHVybiBkXHJcbiAgICAqL1xyXG59XHJcbmV4cG9ydCBjb25zdCBwdGhTdGF0T3B0QXlQbSA9IGFzeW5jIChhOiBwdGgsIGxpaz86IHMpID0+IHtcclxuICAgIGNvbnN0IGIgPSBhd2FpdCBwbTxmbltdPihmcy5yZWFkZGlyLCBhKVxyXG4gICAgY29uc3QgYjEgPSAobGlrID09PSB1bmRlZmluZWQpID8gYiA6IGl0cldoZXJlKHNMaWsobGlrKSkoYilcclxuICAgIGNvbnN0IGogPSBiID0+IHBhdGguam9pbihhLCBiKVxyXG4gICAgY29uc3QgYjIgPSBpdHJNYXAoaikoYjEpXHJcbiAgICBjb25zdCBzdGF0ID0gZW50cnkgPT4gcG1Sc2x0T3B0KGZzLnN0YXQsIGVudHJ5KVxyXG4gICAgY29uc3QgYyA9IGl0ck1hcChzdGF0KShiMilcclxuICAgIGNvbnN0IHogPSBhd2FpdCBQcm9taXNlLmFsbChjKVxyXG4gICAgcmV0dXJuIHogYXMgKGZzLlN0YXRzIHwgbnVsbClbXVxyXG59XHJcbmV4cG9ydCBjb25zdCBwdGhGZHJBeVBtID0gYXN5bmMgKGE6IHB0aCwgbGlrPzogcykgPT4ge1xyXG5cclxufVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3Qgbk11bHRpcGx5ID0geCA9PiBhID0+IGEgKiB4XHJcbmV4cG9ydCBjb25zdCBuRGl2aWRlID0geCA9PiBhID0+IGEgLyB4XHJcbmV4cG9ydCBjb25zdCB2QWRkID0geCA9PiBhID0+IGEgKyB4XHJcbmV4cG9ydCBjb25zdCBuTWludXMgPSB4ID0+IGEgPT4gYSAtIHhcclxuZXhwb3J0IGNvbnN0IG5EZWNyID0gbk1pbnVzKDEpXHJcbmV4cG9ydCBjb25zdCBuSW5jciA9IHZBZGQoMSlcclxuZXhwb3J0IGNvbnN0IG5JdHIgPSBmdW5jdGlvbiogKG4pIHsgZm9yIChsZXQgaiA9IDA7IGogPCBuOyBqKyspIHlpZWxkIGogfVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY29uc3QgdnZDb21wYXJlID0gKGEsIGIpID0+IGEgPT09IGIgPyAwIDogYSA+IGIgPyAxIDogLTFcclxuZXhwb3J0IHR5cGUgbGF6eTxUPiA9ICgpID0+IHsgdjogVCB9XHJcbmV4cG9ydCBjb25zdCBsYXp5ID0gPFQ+KHZmOiAoKCkgPT4gVCkpOiBsYXp5PFQ+ID0+IHsgbGV0IHYsIGRvbmUgPSBmYWxzZTsgcmV0dXJuICgpID0+IHsgaWYgKCFkb25lKSB7IHYgPSB2ZigpOyBkb25lID0gdHJ1ZSB9OyByZXR1cm4gdiB9IH1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNvbnN0IG9wdE1hcCA9IDxULCBVPihmOiAoYTogVCkgPT4gVSkgPT4gKGE6IFQgfCBudWxsKSA9PiBhICE9PSBudWxsID8gZihhKSA6IGFcclxuZXhwb3J0IGNvbnN0IGZmbiA9IChhOiBmZm4pID0+IG5ldyBGZm4oYSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGZm4ge1xyXG4gICAgcHJpdmF0ZSBfZmZuOiBmZm5cclxuICAgIHByaXZhdGUgX2RvdFBvczogblxyXG4gICAgcHJpdmF0ZSBfc2VwUG9zOiBuXHJcbiAgICBjb25zdHJ1Y3RvcihhOiBmZm4pIHtcclxuICAgICAgICB0aGlzLl9mZm4gPSBhXHJcbiAgICAgICAgdGhpcy5fZG90UG9zID0gYS5sYXN0SW5kZXhPZignLicpXHJcbiAgICAgICAgdGhpcy5fc2VwUG9zID0gYS5sYXN0SW5kZXhPZihwdGhzZXApXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHptaWQoYXQ6IG4pIHsgcmV0dXJuIHNNaWQoYXQpKHRoaXMuZmZuKSB9XHJcbiAgICBwcml2YXRlIHpsZWZ0KGF0OiBuKSB7IHJldHVybiBzTGVmdChhdCkodGhpcy5mZm4pIH1cclxuICAgIGdldCBmZm4oKSB7IHJldHVybiB0aGlzLl9mZm4gfVxyXG4gICAgZ2V0IHB0aCgpIHsgY29uc3QgYXQgPSB0aGlzLl9zZXBQb3M7IHJldHVybiBhdCA9PT0gLTEgPyAnJyA6IHRoaXMuemxlZnQoYXQgKyAxKSB9XHJcbiAgICBnZXQgZm4oKSB7IGNvbnN0IGF0ID0gdGhpcy5fc2VwUG9zOyByZXR1cm4gYXQgPT09IC0xID8gdGhpcy5mZm4gOiB0aGlzLnptaWQoYXQgKyAxKSB9XHJcbiAgICBnZXQgZXh0KCkgeyBjb25zdCBhdCA9IHRoaXMuX2RvdFBvczsgcmV0dXJuIGF0ID09PSAtMSA/ICcnIDogdGhpcy56bWlkKGF0KSB9XHJcbiAgICBnZXQgbm9FeHQoKSB7IGNvbnN0IGF0ID0gdGhpcy5fZG90UG9zOyByZXR1cm4gYXQgPT09IC0xID8gdGhpcy5mZm4gOiB0aGlzLnpsZWZ0KGF0KSB9XHJcbiAgICBnZXQgZmZubigpIHsgcmV0dXJuIHRoaXMubm9FeHQgfVxyXG4gICAgZ2V0IGZubigpIHsgcmV0dXJuIGZmbih0aGlzLm5vRXh0KS5mbiB9XHJcbiAgICBhZGRGblNmeChzZng6IHMpIHsgcmV0dXJuIHRoaXMuZmZubiArIHNmeCArIHRoaXMuZXh0IH1cclxuICAgIHJwbEV4dChleHQ6IHMpIHsgcmV0dXJuIHRoaXMuZmZubiArIGV4dCB9XHJcbiAgICBtYWtCYWNrdXAoKSB7XHJcbiAgICAgICAgY29uc3QgZXh0ID0gdGhpcy5leHRcclxuICAgICAgICBjb25zdCBmZm5uID0gdGhpcy5mZm5uXHJcbiAgICAgICAgY29uc3QgcHRoID0gdGhpcy5wdGhcclxuICAgICAgICBjb25zdCBmZm4gPSB0aGlzLmZmblxyXG4gICAgICAgIGxldCBiID0gc1JpZ2h0KDEyKShmZm5uKVxyXG4gICAgICAgIGNvbnN0IGlzQmFja3VwRmZuID0gKHNIYXNQZngoXCIoYmFja3VwLVwiKShmZm4pKSAmJiAoc0hhc1NmeChcIilcIikoZmZuKSlcclxuICAgICAgICBjb25zdCBmbiA9IHRoaXMuZm5cclxuICAgICAgICBjb25zdCBiYWNrdXBTdWJGZHIgPSBgLmJhY2t1cFxcXFwke2ZufVxcXFxgXHJcbiAgICAgICAgY29uc3QgYmFja3VwUHRoID0gcHRoICsgYmFja3VwU3ViRmRyXHJcblxyXG4gICAgICAgIGlmIChleHQgPT09ICcuYmFja3VwJykgZXIoXCJnaXZlbiBbZXh0XSBjYW5ub3QgYmUgJy5iYWNrdXBcIiwgeyBleHQsIGZmbm4gfSlcclxuICAgICAgICBpZiAoaXNCYWNrdXBGZm4pIGVyKFwie2Zmbn0gY2Fubm90IGJlIGEgYmFja3VwIGZpbGUgbmFtZVwiLCB7IGZmbjogdGhpcy5mZm4gfSlcclxuXHJcbiAgICAgICAgbGV0IGMgPSBwdGhGbkF5KGJhY2t1cFB0aCwgZmZubiArICcoYmFja3VwLT8/PyknICsgZXh0KVxyXG4gICAgICAgIGxldCBueHRCYWNrdXBOTk4gPVxyXG4gICAgICAgICAgICBjID09PSBudWxsIHx8IGlzRW1wKGIpID8gJzAwMCcgOlxyXG4gICAgICAgICAgICAgICAgcGlwZShjKShpdHJNYXgsIGZmblJtdkV4dCwgc1Jtdkxhc0Nociwgc1JpZ2h0KDMpLCBOdW1iZXIucGFyc2VJbnQsIG5JbmNyLCBuUGFkWmVybygzKSlcclxuICAgICAgICBjb25zdCBiYWNrdXBGZm4gPSBiYWNrdXBQdGggKyBmZm5BZGRGblNmeChgKGJhY2t1cC0ke254dEJhY2t1cE5OTn0pYCkoZm4pXHJcbiAgICAgICAgcHRoRW5zU3ViRmRyKGJhY2t1cFN1YkZkcikocHRoKTsgZnMuY29weUZpbGVTeW5jKHRoaXMuZmZuLCBiYWNrdXBGZm4pXHJcbiAgICB9XHJcbn1cclxuLy8gY29uc3QgeHh4ID0gZmZuKF9fZmlsZW5hbWUpOyBkZWJ1Z2dlclxyXG5leHBvcnQgY29uc3QgZmZuTWFrQmFja3VwID0gKGE6IGZmbikgPT4ge1xyXG4gICAgY29uc3QgZXh0ID0gZmZuRXh0KGEpXHJcbiAgICBjb25zdCBmZm5uID0gZmZuUm12RXh0KGEpXHJcbiAgICBjb25zdCBwdGggPSBmZm5QdGgoYSlcclxuICAgIGxldCBiID0gc1JpZ2h0KDEyKShmZm5uKVxyXG4gICAgY29uc3QgaXNCYWNrdXBGZm4gPSAoc0hhc1BmeChcIihiYWNrdXAtXCIpKGEpKSAmJiAoc0hhc1NmeChcIilcIikoYSkpXHJcbiAgICBjb25zdCBmbiA9IGZmbkZuKGEpXHJcbiAgICBjb25zdCBiYWNrdXBTdWJGZHIgPSBgLmJhY2t1cFxcXFwke2ZufVxcXFxgXHJcbiAgICBjb25zdCBiYWNrdXBQdGggPSBwdGggKyBiYWNrdXBTdWJGZHJcclxuXHJcbiAgICBpZiAoZXh0ID09PSAnLmJhY2t1cCcpIGVyKFwiZ2l2ZW4gW2V4dF0gY2Fubm90IGJlICcuYmFja3VwXCIsIHsgZXh0LCBmZm5uIH0pXHJcbiAgICBpZiAoaXNCYWNrdXBGZm4pIGVyKFwiZmZuIGNhbm5vdCBiZSBhIGJhY2t1cCBmaWxlIG5hbWVcIiwgeyBmZm46IGEgfSlcclxuXHJcbiAgICBsZXQgYyA9IHB0aEZuQXkoYmFja3VwUHRoLCBmZm5uICsgJyhiYWNrdXAtPz8/KScgKyBleHQpXHJcbiAgICBsZXQgbnh0QmFja3VwTk5OID1cclxuICAgICAgICBjID09PSBudWxsIHx8IGlzRW1wKGIpID8gJzAwMCcgOlxyXG4gICAgICAgICAgICBwaXBlKGMpKGl0ck1heCwgZmZuUm12RXh0LCBzUm12TGFzQ2hyLCBzUmlnaHQoMyksIE51bWJlci5wYXJzZUludCwgbkluY3IsIG5QYWRaZXJvKDMpKVxyXG4gICAgY29uc3QgYmFja3VwRmZuID0gYmFja3VwUHRoICsgZmZuQWRkRm5TZngoYChiYWNrdXAtJHtueHRCYWNrdXBOTk59KWApKGZuKVxyXG4gICAgcHRoRW5zU3ViRmRyKGJhY2t1cFN1YkZkcikocHRoKTsgZnMuY29weUZpbGVTeW5jKGEsIGJhY2t1cEZmbilcclxufVxyXG5leHBvcnQgY29uc3Qgc3JjRXhwU3RtdCA9IChhOiBseSkgPT4ge1xyXG4gICAgbGV0IG55ID0gc3JjRXhwQ29uc3ROeShhKVxyXG4gICAgbnkgPSBpdHJXaGVyZShwcmVkTm90KHNIYXNQZngoXCJfXCIpKSkobnkpLnNvcnQoKVxyXG4gICAgaWYgKGlzRW1wKG55KSkgcmV0dXJuIG51bGxcclxuICAgIGNvbnN0IHggPSBheUpuQXNMaW5lcyhcIiwgXCIsIDQsIDEyMCkobnkpXHJcbiAgICBsZXQgeiA9IFwiZXhwb3J0IHtcXHJcXG5cIiArIHggKyBcIlxcclxcbn1cIlxyXG4gICAgcmV0dXJuIHogYXMgc1xyXG59XHJcbmV4cG9ydCBjb25zdCBjdXJFeHBTdG10ID0gKCkgPT4gcGlwZShfX2ZpbGVuYW1lKShmdEx5LCBzcmNFeHBTdG10KSBhcyBzXHJcbi8vIGRtcChjdXJFeHBTdG10KTsgZGVidWdnZXJcclxuZXhwb3J0IGNvbnN0IGZqc1JwbEV4cFN0bXQgPSBmanMgPT4ge1xyXG4gICAgY29uc3Qgb2xkTHkgPSBmdEx5KGZqcylcclxuICAgIGNvbnN0IG5ld0xpbiA9IHNyY0V4cFN0bXQob2xkTHkpXHJcblxyXG4gICAgbGV0IG9sZEJlZ0l4ID0gYXlGaW5kSXgoc0hhc1BmeChcImV4cG9ydHMge1wiKSkob2xkTHkpXHJcbiAgICBsZXQgb2xkRW5kSXg6IG4gPSAoKCkgPT4ge1xyXG4gICAgICAgIGlmIChvbGRCZWdJeCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpOiBuID0gb2xkQmVnSXg7IGkgPCBvbGRMeS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKC9cXH0vLnRlc3Qob2xkTHlbaV0pKSByZXR1cm4gaSsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDBcclxuICAgIH0pKClcclxuICAgIGNvbnN0IG9sZExpbiA9IChvbGRCZWdJeCA9PT0gbnVsbCB8fCBvbGRFbmRJeCA9PT0gbnVsbCkgPyBudWxsIDogb2xkTHkuc2xpY2Uob2xkQmVnSXgsIG9sZEVuZEl4KS5qb2luKCdcXHJcXG4nKVxyXG4gICAgY29uc3QgbmV3TGluZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaGFzTmV3TGluID0gbmV3TGluICE9PSBudWxsXHJcbiAgICAgICAgY29uc3QgaGFzT2xkTGluID0gb2xkTGluICE9PSBudWxsXHJcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgKGhhc05ld0xpbiAmJiBoYXNPbGRMaW4pOlxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZEJlZ0l4ICE9PSBudWxsKSB7IG9sZEx5LnNwbGljZShvbGRCZWdJeCwgb2xkRW5kSXgsIHZEZnRTdHIobmV3TGluKSk7IHJldHVybiBheUpuQ3JMZihvbGRMeSkgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7IGVyKFwiaW1wb3NzaWJsZVwiKTsgaGFsdCgpIH1cclxuICAgICAgICAgICAgY2FzZSAoaGFzTmV3TGluICYmICFoYXNPbGRMaW4pOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF5Sm5DckxmKG9sZEx5LmNvbmNhdCh2RGZ0U3RyKG5ld0xpbikpKVxyXG4gICAgICAgICAgICBjYXNlIChoYXNPbGRMaW4pOlxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZEJlZ0l4ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXIoXCJpbXBvc3NpYmxlXCIpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyBvbGRMeS5zcGxpY2Uob2xkQmVnSXgsIG9sZEVuZEl4KTsgcmV0dXJuIGF5Sm5DckxmKG9sZEx5KSB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBlcihcImltcG9zc2libGVcIik7IGhhbHQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXlKbkNyTGYob2xkTHkpXHJcbiAgICB9XHJcbiAgICBsZXQgYSA9IG5ld0xpbmVzKClcclxuICAgIGlmIChvbGRMaW4gIT09IG5ld0xpbikgeyBkZWJ1Z2dlcjsgZmZuTWFrQmFja3VwKGZqcyk7IHNXcnQoZmpzKShuZXdMaW5lcygpKSB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzeUxpbiA9IChhOiBzeSkgPT4gaXRyTWFwKHNFc2NWYmFyKShhKS5qb2luKCcgfCAnKVxyXG5cclxuZXhwb3J0IGNvbnN0IGxpbmVzQWxpZ25MID0gKHdkdDogbikgPT4gKGE6IGxpbmVzKSA9PiB7XHJcbiAgICBjb25zdCBhMSA9IHNTcGxpdENyTGYoYSlcclxuICAgIGNvbnN0IGFMYXMgPSBheUxhcyhhMSlcclxuICAgIGNvbnN0IG4gPSB3ZHQgLSBhTGFzLmxlbmd0aFxyXG4gICAgY29uc3QgcyA9IG5TcGMobilcclxuICAgIGNvbnN0IHogPSBhICsgc1xyXG4gICAgcmV0dXJuIHpcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGxpbmVzV2R0ID0gKGE6IGxpbmVzKSA9PiB7XHJcbiAgICBjb25zdCBhMSA9IHNTcGxpdENyTGYoYSlcclxuICAgIGNvbnN0IHo6IG4gPSBpdHJXZHQoYTEpXHJcbiAgICByZXR1cm4gelxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGluZXNBeVdkdCA9IChhOiBsaW5lc1tdKSA9PiB7XHJcbiAgICBjb25zdCBhMSA9IGl0ck1hcChsaW5lc1dkdCkoYSlcclxuICAgIGNvbnN0IHo6IG4gfCBudWxsID0gaXRyTWF4KGExKVxyXG4gICAgcmV0dXJuIHogPT09IG51bGwgPyAwIDogelxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGluZXNBeUFsaWduTCA9IChhOiBsaW5lc1tdKSA9PiB7XHJcbiAgICBjb25zdCB3ID0gbGluZXNBeVdkdChhKSArIDFcclxuICAgIGNvbnN0IHo6IGxpbmVzW10gPSBpdHJNYXAobGluZXNBbGlnbkwodykpKGEpXHJcbiAgICByZXR1cm4gelxyXG59XHJcbmV4cG9ydCBjb25zdCB2U2F2ID0gKHZpZDogdmlkKSA9PiAoYSkgPT4gc1dydCh2aWRGanNvbih2aWQpKShKU09OLnN0cmluZ2lmeShhKSlcclxuZXhwb3J0IGNvbnN0IHZpZHB0aCA9IF9fZGlybmFtZSArIHB0aHNlcCArICd0ZXN0LXJlc291cmNlcycgKyBwdGhzZXBcclxucHRoRW5zKHZpZHB0aClcclxuZXhwb3J0IGNvbnN0IHJlUHVuRXhjcERvdCA9IC9bXFwoXFwpXS9nXHJcbmV4cG9ydCBjb25zdCBzUnBsUHVuRXhjcERvdCA9IChzOiBzKTogcyA9PiBzLnJlcGxhY2UocmVQdW5FeGNwRG90LCAnICcpXHJcbmV4cG9ydCBjb25zdCB2aWRwdGhCcncgPSAoKSA9PiBwdGhCcncodmlkcHRoKVxyXG5leHBvcnQgY29uc3QgdmlkRmpzb24gPSAoYTogdmlkKSA9PiB2aWRwdGggKyBhICsgJy5qc29uJ1xyXG5leHBvcnQgY29uc3QgZmpzb25WYWwgPSAoYTogZmZuKSA9PiBKU09OLnBhcnNlKGZ0TGluZXMoYSkpXHJcbmV4cG9ydCBjb25zdCB2aWRWYWwgPSAoYTogdmlkKSA9PiBmanNvblZhbCh2aWRGanNvbihhKSlcclxuZXhwb3J0IGNvbnN0IHZpZEJydyA9IChhOiB2aWQpID0+IGZ0QnJ3KHZpZEZqc29uKGEpKVxyXG5leHBvcnQgY29uc3Qgc1NhdiA9IChzaWQ6IHNpZCkgPT4gKGE6IHMpID0+IHNXcnQoc2lkRnQoc2lkKSkoYSlcclxuZXhwb3J0IGNvbnN0IHNpZHB0aCA9IHZpZHB0aFxyXG5leHBvcnQgY29uc3Qgc2lkcHRoQnJ3ID0gKCkgPT4gcHRoQnJ3KHNpZHB0aClcclxuZXhwb3J0IGNvbnN0IHNpZEZ0ID0gKGE6IHNpZCkgPT4gc2lkcHRoICsgYSArICcudHh0J1xyXG5leHBvcnQgY29uc3Qgc2lkU3RyID0gKGE6IHNpZCkgPT4gZnRMaW5lcyhzaWRGdChhKSlcclxuZXhwb3J0IGNvbnN0IHNpZEJydyA9IChhOiBzaWQpID0+IGZ0QnJ3KHNpZEZ0KGEpKVxyXG5leHBvcnQgY29uc3QgdlRlZSA9IDxUPihmOiAoYTogVCkgPT4gdm9pZCkgPT4gKGE6IFQpID0+IHsgZihhKTsgcmV0dXJuIGEgfVxyXG5leHBvcnQgY29uc3QgZnRXcnQgPSAoczogcykgPT4gKGE6IGZ0KSA9PiBmcy53cml0ZUZpbGVTeW5jKGEsIHMpXHJcbmV4cG9ydCBjb25zdCBjbWRTaGVsbCA9IGNoaWxkX3Byb2Nlc3MuZXhlYyBhcyAoYTogcykgPT4gdm9pZFxyXG5leHBvcnQgY29uc3QgY21kU2hlbGxTeW5jID0gY2hpbGRfcHJvY2Vzcy5leGVjIGFzIChhOiBzKSA9PiB2b2lkXHJcbmV4cG9ydCBjb25zdCBmdEJydyA9IChhOiBmdCkgPT4gY21kU2hlbGwoYGNvZGUuY21kIFwiJHthfVwiYClcclxuZXhwb3J0IGNvbnN0IGZ0QnJ3U3luYyA9IChhOiBmdCkgPT4gY21kU2hlbGxTeW5jKGBjb2RlLmNtZCBcIiR7YX1cIidgKVxyXG5leHBvcnQgY29uc3Qgc0JydyA9IChhOiBzKSA9PiB7IHBpcGUodG1wZnQoKSkodlRlZShmdFdydChhKSksIGZ0QnJ3KSB9XHJcbmV4cG9ydCBjb25zdCBzQnJ3QXRGZHJGbiA9IChfZmRyOiBzLCBfZm46IHMpID0+IChfczogcykgPT4geyBwaXBlKHRtcGZmbkJ5RmRyRm4oX2ZkciwgX2ZuKSkodlRlZShmdFdydChfcykpLCBmdEJydykgfVxyXG5leHBvcnQgY29uc3Qgb0Jyd0F0RmRyRm4gPSAoX2ZkcjogcywgX2ZuOiBzKSA9PiAoX28pID0+IHsgcGlwZSh0bXBmZm5CeUZkckZuKF9mZHIsIF9mbiArICcuanNvbicpKSh2VGVlKGZ0V3J0KG9Kc29uTGluZXMoX28pKSksIGZ0QnJ3KSB9XHJcbmV4cG9ydCBjb25zdCBzanNvbkJydyA9IChfczogcywgX2Zkcj86IHMsIF9mbj86IHMpID0+IHsgcGlwZSh0bXBmanNvbihfZmRyLCBfZm4pKSh2VGVlKGZ0V3J0KF9zKSksIGZ0QnJ3KSB9XHJcbmV4cG9ydCBjb25zdCBseUJydyA9IGNvbXBvc2UoYXlKbkxmLCBzQnJ3KSBhcyAoYTogbHkpID0+IHZvaWRcclxuZXhwb3J0IGNvbnN0IGx5QnJ3U3RvcCA9IGNvbXBvc2UobHlCcncsIHN0b3ApIGFzIChhOiBseSkgPT4gdm9pZFxyXG5leHBvcnQgdHlwZSBfZGljU3BsaXRQcmVkPFY+ID0gKFtzLCBWXSkgPT4gYlxyXG5leHBvcnQgY29uc3QgZGljS3kgPSA8VD4oX2RpYzogZGljPFQ+KTogc3kgPT4gaXRyQXkoX2RpYy5rZXlzKCkpXHJcbmV4cG9ydCBjb25zdCBkaWNLc2V0ID0gKF9kaWM6IGRpYzxhbnk+KTogc3NldCA9PiBpdHJTZXQoX2RpYy5rZXlzKCkpXHJcbmV4cG9ydCBjb25zdCBzZGljS3NldCA9IGRpY0tzZXQgYXMgKF9zZGljOiBzZGljKSA9PiBzc2V0XHJcbmV4cG9ydCBjb25zdCBkaWNWYWxBeSA9IDxUPihfZGljOiBkaWM8VD4pOiBUW10gPT4gaXRyQXkoX2RpYy52YWx1ZXMoKSlcclxuZXhwb3J0IGNvbnN0IHNkaWNWYWxBeSA9IChfc2RpYzogc2RpYyk6IHN5ID0+IGRpY1ZhbEF5KF9zZGljKVxyXG5leHBvcnQgY29uc3QgZGljQnJrRm9yVHJ1ZUZhbHNlID0gPFY+KGZ1bjogKFtzLCBWXSkgPT4gYikgPT4gKGQ6IGRpYzxWPik6IHRmUGFpcjxkaWM8Vj4+ID0+IHtcclxuICAgIGNvbnN0IHQgPSBuZXcgTWFwPHMsIGFueT4oKVxyXG4gICAgY29uc3QgZiA9IG5ldyBNYXA8cywgYW55PigpXHJcbiAgICBmb3IgKGxldCBbaywgdl0gb2YgZCkge1xyXG4gICAgICAgIGlmIChmdW4oW2ssIHZdKSlcclxuICAgICAgICAgICAgdC5zZXQoaywgdilcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGYuc2V0KGssIHYpXHJcbiAgICB9XHJcbiAgICByZXR1cm4geyB0LCBmIH1cclxufVxyXG5leHBvcnQgY29uc3QgZGljQnJ3ID0gY29tcG9zZShkaWNMeSwgbHlCcncpIGFzIDxUPihhOiBkaWM8VD4pID0+IHZvaWRcclxuZXhwb3J0IGNvbnN0IG9Kc29uTGluZXMgPSBKU09OLnN0cmluZ2lmeSBhcyAoYTogbykgPT4gbGluZXNcclxuZXhwb3J0IGNvbnN0IG9Bc0V4cCA9IChvKTogbGluZXMgPT4gJ2NvbnN0IGV4cCA9ICcgKyBvSnNvbkxpbmVzKG8pXHJcbmV4cG9ydCBjb25zdCBzZHJ5QnJ3ID0gY29tcG9zZShzZHJ5TGluZXMsIHNCcncpIGFzIChhOiBzZHJ5KSA9PiB2b2lkXHJcbmV4cG9ydCBjb25zdCBkcnlCcncgPSBjb21wb3NlKGRyeVNkcnksIHNkcnlCcncpIGFzIChhOiBkcnkpID0+IHZvaWRcclxuZXhwb3J0IGNvbnN0IGRyc0JydyA9IGNvbXBvc2Uoc0JydywgZHJzTGluZXMpIGFzIChhOiBkcnMpID0+IHZvaWRcclxuZXhwb3J0IGNvbnN0IG55QnJ3ID0gY29tcG9zZShpdHJNYXAoY21sTnkpLCBzZHJ5QnJ3KSBhcyAoYTogbnkpID0+IHZvaWRcclxuZXhwb3J0IGNvbnN0IHNyY0V4cENvbnN0TnlCcncgPSBjb21wb3NlKHNyY0V4cENvbnN0TnksIG55QnJ3KSBhcyAoX3NyYzogc3JjKSA9PiB2b2lkXHJcbmV4cG9ydCBjb25zdCBmdHNFeHBDb25zdE55QnJ3ID0gY29tcG9zZShmdEx5LCBzcmNFeHBDb25zdE55QnJ3KVxyXG5leHBvcnQgY29uc3Qgb0JydyA9IChvLCBmZHI/OiBzLCBubT86IHMpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IHMgPSBvSnNvbkxpbmVzKG8pXHJcbiAgICBzanNvbkJydyhzLCBmZHIsIG5tKVxyXG59XHJcbmV4cG9ydCBjb25zdCBvQnJ3QXNFeHAgPSBjb21wb3NlKG9Bc0V4cCwgc0Jyd0F0RmRyRm4oJ2FzRXhwZWN0ZWRKcycsICdhc0V4cGVjdC5qcycpKSBhcyAoYTogbykgPT4gdm9pZFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjb25zdCBjaHJDZF9pc05tID0gKGM6IG4pID0+IHRydWVcclxuZXhwb3J0IGNvbnN0IGNockNkID0gKHM6IHMpID0+IHMuY2hhckNvZGVBdCgwKVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfYSA9IGNockNkKCdhJylcclxuZXhwb3J0IGNvbnN0IGNockNkX3ogPSBjaHJDZCgneicpXHJcbmV4cG9ydCBjb25zdCBjaHJDZF9BID0gY2hyQ2QoJ0EnKVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfWiA9IGNockNkKCdaJylcclxuZXhwb3J0IGNvbnN0IGNockNkXzAgPSBjaHJDZCgnMCcpXHJcbmV4cG9ydCBjb25zdCBjaHJDZF85ID0gY2hyQ2QoJzknKVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfZG9sbGFyID0gY2hyQ2QoJyQnKVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfdW5kZXJTY29yZSA9IGNockNkKCdfJylcclxuZXhwb3J0IGNvbnN0IGNockNkX2lzU21hbGxMZXR0ZXIgPSB2QkVUKGNockNkX2EsIGNockNkX3opXHJcbmV4cG9ydCBjb25zdCBjaHJDZF9pc0NhcGl0YWxMZXR0ZXIgPSB2QkVUKGNockNkX0EsIGNockNkX1opXHJcbmV4cG9ydCBjb25zdCBjaHJDZF9pc0xldHRlciA9IHByZWRzT3IoY2hyQ2RfaXNTbWFsbExldHRlciwgY2hyQ2RfaXNDYXBpdGFsTGV0dGVyKVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfaXNEaWdpdCA9IHZCRVQoY2hyQ2RfMCwgY2hyQ2RfOSlcclxuZXhwb3J0IGNvbnN0IGNockNkX2lzRG9sbGFyID0gdkVRKGNockNkX2RvbGxhcilcclxuZXhwb3J0IGNvbnN0IGNockNkX2lzVW5kZXJTY29yZSA9IHZFUShjaHJDZF91bmRlclNjb3JlKVxyXG5leHBvcnQgY29uc3QgY2hyQ2RfaXNGc3RObUNociA9IHByZWRzT3IoY2hyQ2RfaXNMZXR0ZXIsIGNockNkX2lzVW5kZXJTY29yZSwgY2hyQ2RfaXNEb2xsYXIpIGFzIHByZWQ8bj5cclxuZXhwb3J0IGNvbnN0IGNockNkX2lzTm1DaHIgPSBwcmVkc09yKGNockNkX2lzRnN0Tm1DaHIsIGNockNkX2lzRGlnaXQpXHJcbmV4cG9ydCBjb25zdCBzc2V0U3J0QnJ3ID0gKGE6IHNzZXQpID0+IHBpcGUoYSkoaXRyQXksIGF5U3J0LCBseUJydylcclxuZXhwb3J0IGNvbnN0IHNzZXRTeSA9IChfc3NldDogc3NldCk6IHN5ID0+IHNldEF5KF9zc2V0KVxyXG5leHBvcnQgY29uc3Qgc3NldEFkZFBmeEFzTGluID0gKF9wZng6IHMpID0+IChfc3NldDogc3NldCkgPT4gX3BmeCArIChfcGZ4ID8gJyAnIDogJycpICsgc3NldExpbihfc3NldClcclxuZXhwb3J0IGNvbnN0IHNzZXRMaW4gPSAoX3NzZXQ6IHNldCkgPT4gc2V0QXkoX3NzZXQpLmpvaW4oJyAnKVxyXG5leHBvcnQgY29uc3Qgc3NldEJydyA9IChfc3NldDogc3NldCkgPT4gcGlwZShfc3NldCkoaXRyQXksIHNCcncpXHJcbmV4cG9ydCBjb25zdCBsaW5FeHBDb25zdE5tID0gKGE6IGxpbikgPT4ge1xyXG4gICAgY29uc3QgbSA9IGEubWF0Y2gocmVFeHBDb25zdE5tKVxyXG4gICAgaWYgKG0gPT09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIHJldHVybiBtWzFdXHJcbn1cclxuZXhwb3J0IGNvbnN0IG5vZGVNZFNldCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHo6IFNldDxOb2RlTW9kdWxlPiA9IG5ldyBTZXQoKVxyXG4gICAgY29uc3QgX3B1c2hDaGlsZHJlbiA9IChtOiBOb2RlTW9kdWxlKSA9PiB7XHJcbiAgICAgICAgbGV0IGM6IE5vZGVNb2R1bGVcclxuICAgICAgICBmb3IgKGMgb2YgbS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBpZiAoIXouaGFzKGMpKSB7XHJcbiAgICAgICAgICAgICAgICB6LmFkZChjKVxyXG4gICAgICAgICAgICAgICAgX3B1c2hDaGlsZHJlbihjKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3B1c2hDaGlsZHJlbihtb2R1bGUpXHJcbiAgICByZXR1cm4gelxyXG59XHJcbmNvbnN0IHggPSAoYTogTm9kZU1vZHVsZSkgPT4ge1xyXG4gICAgY29uc3QgYXkgPSBvUHJwTnkoYS5leHBvcnRzKVxyXG4gICAgY29uc3QgejogZHJ5ID0gW11cclxuICAgIGNvbnN0IGlkID0gYS5pZFxyXG4gICAgZm9yIChsZXQgbm0gb2YgYXkpIHtcclxuICAgICAgICBjb25zdCBpdG0gPSBhLmV4cG9ydHNbbm1dXHJcbiAgICAgICAgY29uc3QgdHkgPSB0eXBlb2YgaXRtXHJcbiAgICAgICAgLy9jb25zdCBmdW5ObSA9IHR5PT09J2Z1bmN0aW9uJz9pdG0ubmFtZTonJ1xyXG4gICAgICAgIGNvbnN0IG0gPSBbbm0sIHR5cGVvZiBpdG0sIGlkXVxyXG4gICAgICAgIHoucHVzaChtKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHpcclxufVxyXG5leHBvcnQgY29uc3QgZHJzb2ZfZXhwb3J0RnVuY3Rpb25zID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZm55ID0gWyduYW1lJywgJ3R5cGUnLCAnaWQnXVxyXG4gICAgbGV0IGRyeTogZHJ5ID0gW11cclxuICAgIGxldCBtZDogTm9kZU1vZHVsZVxyXG4gICAgY29uc3QgbXNldCA9IG5vZGVNZFNldCgpXHJcbiAgICBmb3IgKG1kIG9mIG1zZXQpIHtcclxuICAgICAgICBkcnkgPSBkcnkuY29uY2F0KHgobWQpKVxyXG4gICAgfVxyXG4gICAgZHJ5ID0gZHJ5U3J0Q29sKFsyLCAwXSkoZHJ5KVxyXG4gICAgY29uc3QgejogZHJzID0geyBmbnksIGRyeSB9XHJcbiAgICByZXR1cm4gelxyXG59XHJcbmV4cG9ydCBjbGFzcyBEcnkge1xyXG4gICAgZHJ5OiBkcnlcclxuICAgIHByaXZhdGUgX2N1ckNvbDogblxyXG4gICAgY29uc3RydWN0b3IoYTogZHJ5KSB7XHJcbiAgICAgICAgdGhpcy5kcnkgPSBhXHJcbiAgICAgICAgdGhpcy5fY3VyQ29sID0gMFxyXG4gICAgfVxyXG4gICAgZ2V0IGN1ckNvbCgpIHsgcmV0dXJuIHRoaXMuX2N1ckNvbCB9XHJcbiAgICBzZXQgY3VyQ29sKG46IG4pIHsgdGhpcy5fY3VyQ29sID0gbiB9XHJcbiAgICBnZXQgY29sQ250KCkgeyByZXR1cm4gaXRyTWF4KGl0ck1hcCh2TGVuKSh0aGlzLmRyeSkpIGFzIG4gfVxyXG4gICAgZ2V0IGx5KCkgeyByZXR1cm4gc2RyeUx5KHRoaXMuc2RyeSkgfVxyXG4gICAgZ2V0IGxpbmVzKCkgeyByZXR1cm4gc2RyeUxpbmVzKHRoaXMuc2RyeSkgfVxyXG4gICAgZ2V0IGNvbCgpIHsgcmV0dXJuIGl0ck1hcChheUVsZU9yRGZ0KCcnKSh0aGlzLmN1ckNvbCkpKHRoaXMuZHJ5KSB9XHJcbiAgICBnZXQgc2RyeSgpIHsgcmV0dXJuIGl0ck1hcChheVN5KSh0aGlzLmRyeSkgYXMgc2RyeSB9XHJcbiAgICBzZXRDdXJDb2wobjogbikgeyB0aGlzLmN1ckNvbCA9IG47IHJldHVybiB0aGlzIH1cclxuICAgIG1keUFsbENlbGwoZjogZikgeyBpdHJFYWNoKGF5TWR5KGYpKSh0aGlzLmRyeSkgfVxyXG4gICAgLy9jbG9uZSgpIHsgcmV0dXJuIG5ldyBEcnkoaXRyTWFwKGRyID0+IGl0ckNsb25lKGRyKSh0aGlzLmRyeSkpfVxyXG4gICAgbWR5Q29sKGY6IGYsIGNvbEl4OiBuKSB7IGl0ckVhY2goYXlNZHlFbGUoY29sSXgpKGYpKSh0aGlzLmRyeSkgfVxyXG4gICAgYnJ3KCkgeyBzQnJ3KHRoaXMubGluZXMpIH1cclxufVxyXG5leHBvcnQgY29uc3QgZHJ5ID0gKGE6IGRyeSkgPT4gbmV3IERyeShhKVxyXG4iXX0=