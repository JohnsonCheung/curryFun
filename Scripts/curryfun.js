"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./typings/node/node.d.ts"/>
const fs = require("fs");
const path = require("path");
const os = require("os");
const child_process = require("child_process");
const assert = require("assert");
//---------------------------------------
exports.strictEqual = require('assert').strictEqual;
exports.eq = (exp, act) => { try {
    exports.strictEqual(act, exp);
}
catch (e) {
    debugger;
} };
//---------------------------------------
exports.vLT = x => a => a < x;
exports.vGE = x => a => a >= x;
exports.vLE = x => a => a <= x;
exports.vEQ = x => a => a === x;
exports.vNE = x => a => a !== x;
exports.vGT = x => a => a > x;
exports.vIN = itr => a => { for (let i of itr)
    if (i === a)
        return true; return false; };
exports.vNIN = itr => a => !exports.vIN(itr)(a);
exports.vBET = (x, y) => a => x <= a && a <= y;
exports.vNBET = (x, y) => a => !exports.vBET(x, y)(a);
exports.vIsInstanceOf = x => a => a instanceof x;
exports.ensSy = a => typeof a === 'string' ? exports.sSplitSpc(a) : a;
exports.ensRe = a => a instanceof RegExp ? a : new RegExp(a);
//-------------------------------------
exports.pipe = v => (...f) => { let o = v; for (let ff of f)
    o = ff(o); return o; };
exports.vMap = f => a => f(a);
exports.fApply = v => f => f(v);
exports.swap = (f) => a => b => f(b)(a);
exports.compose = (...f) => v => exports.pipe(v)(...f);
//----------------------------------
exports.sdicSy = a => exports.itrMap(exports.ksLin)(a);
exports.ksLin = ({ k, s }) => k + ' ' + s;
exports.dmp = global.console.log;
exports.funDmp = f => exports.dmp(f.toString());
exports.halt = () => { throw new Error(); };
exports.sEscLf = a => a.replace('\n', '\\n');
exports.sEscCr = a => a.replace('\r', '\\r');
exports.sEscTab = a => a.replace('\t', '\\t');
exports.sEsc = exports.compose(exports.sEscLf, exports.sEscCr, exports.sEscTab);
exports.sBox = a => { const y = "== " + exports.sEsc(a) + " ==", x = "=".repeat(a.length + 6); return [x, y, x].join("\r\n"); };
exports.stack = () => { try {
    throw new Error();
}
catch (e) {
    return e.stack;
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
    if (dbg)
        exports.halt();
};
//-----------------------------------------------------------------------
exports.sSplit = (sep) => (a) => a.split(sep);
exports.sSplitCrLf = exports.sSplit('\r\n');
exports.sSplitLf = exports.sSplit('\n');
exports.sSplitSpc = exports.sSplit(/\s+/);
exports.sSplitCommaSpc = exports.sSplit(/,\s*/);
//-----------------------------------------------------------------------
exports.vDft = dft => a => a === null || a === undefined ? dft : a;
exports.vDftStr = exports.vDft("");
exports.vDftUpper = (x, y) => a => a === null || a === undefined || x > a || a > y ? y : a;
exports.vDftLower = (x, y) => a => a === null || a === undefined || x > a || a > y ? x : a;
exports.ayFindIx = p => a => { for (let i in a)
    if (p(a[i]))
        return Number(i); return null; };
exports.ayFindIxOrDft = dftIx => p => a => exports.vDft(dftIx)(exports.ayFindIx(p)(a));
exports.ayFst = a => a[0];
exports.aySnd = a => a[1];
exports.ayEle = ix => a => a[ix];
exports.ayEleOrDft = dft => ix => a => exports.vDft(dft)(a[ix]);
exports.ayLas = a => a[exports.vLen(a) - 1];
exports.ayTfm = f => a => { exports.itrEach(i => a[i] = f(a[i]))(exports.nItr(a.length)); };
exports.aySetEle = ix => v => a => a[ix] = v;
exports.ayTfmEle = ix => f => a => a[ix] = f(a[ix]);
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
exports.sFstChr = a => a[0];
exports.sLasChr = a => a[a.length - 1];
exports.sAddPfx = (pfx) => (a) => pfx + a;
exports.sAddSfx = (sfx) => a => a + sfx;
exports.sAddPfxSfx = (pfx, sfx) => (a) => pfx + a + sfx;
exports.vLen = a => typeof a === 'string' ? a.length : ((a && a.length) || String(a).length);
exports.sLen = a => a.length;
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
exports.nPadZero = dig => n => {
    const s = String(n);
    const nZer = dig - s.length;
    const z = nZer > 0 ? "0".repeat(nZer) : "";
    return z + s;
};
exports.sAlignL = w => a => {
    if (a === null || a === undefined)
        return exports.nSpc(w);
    const l = exports.vLen(a);
    if (l > w)
        return a;
    return a + exports.nSpc(w - l);
};
exports.sAlignR = w => a => {
    const l = exports.sLen(a);
    if (l > w)
        return a;
    return exports.nSpc(w - l) + a;
};
exports.sWrt = ft => a => fs.writeFileSync(ft, a);
exports.sSbsPos = (sbs) => (a) => a.indexOf(sbs);
//strictEqual(sbsPos('aabb')('123aabb'),3)
exports.sSbsRevPos = (sbs) => (a) => a.lastIndexOf(sbs);
//strictEqual(sbsRevPos('a')('0123aabb'),5)
exports.cmlNm = (a) => exports.cmlNy(a).reverse().join(' '); // @eg cmlNm(relItmNy) === 'Ny Itm rel'
exports.cmlNy = (a) => {
    const o = [];
    if (a.trim() === '')
        return o;
    let j = 0;
    let brk = true;
    while (!brk) {
        if (j++ > 100) {
            debugger;
            throw null;
        }
        const i = pseg();
        if (i === '')
            return o;
        o.push(i.trim());
    }
    return o;
    function pseg() {
        let o = pchr();
        let j = 0;
        while (a.length > 0) {
            if (j++ > 100) {
                debugger;
                throw null;
            }
            if (/^[A-Z]/.test(a))
                return o;
            o += pchr();
        }
        return o;
    }
    function pchr() {
        if (a === '')
            return '';
        const o = a[0];
        a = exports.sRmvFstChr(a);
        return o;
    }
};
exports.sHasPfx = (pfx) => (a) => a.startsWith(pfx);
exports.sRmvPfx = (pfx) => (a) => exports.sHasPfx(pfx)(a) ? a.substr(pfx.length) : a;
exports.sHasSfx = (sfx) => (a) => a.endsWith(sfx);
exports.sRmvSfx = (sfx) => (a) => exports.sHasSfx(sfx)(a) ? a.substr(0, a.length - sfx.length) : a;
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
exports.isRmkLin = lin => {
    const l = lin.trim();
    if (l === "")
        return true;
    if (exports.sHasPfx("--")(l))
        return true;
    return false;
};
exports.isNonRmkLin = exports.predNot(exports.isRmkLin);
exports.linRmvMsg = lin => {
    const a = lin.match(/(.*)---/);
    const b = a === null ? lin : a[1];
    if (exports.sHasPfx("^")(b.trimLeft()))
        return "";
    return b;
};
//------------------------------------------------------------------
exports.sBrkAt = (at, len) => s => { return { s1: exports.sLeft(at)(s).trim(), s2: exports.sMid(at + len)(s).trim() }; };
exports.sBrk1 = sep => s => { const at = exports.sSbsPos(sep)(s); return at === -1 ? { s1: exports.sTrim(s), s2: '' } : exports.sBrkAt(at, exports.sLen(sep))(s); };
exports.sBrk2 = sep => s => { const at = exports.sSbsPos(sep)(s); return at === -1 ? { s1: '', s2: exports.sTrim(s) } : exports.sBrkAt(at, exports.sLen(sep))(s); };
exports.sBrk = sep => s => { const at = exports.sSbsPos(sep)(s); return exports.sBrkAt(at, exports.sLen(sep))(s); };
exports.quoteStrBrk = a => {
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
exports.sQuote = q => s => {
    let a = exports.quoteStrBrk(q);
    if (a === null)
        return s;
    else {
        let { q1, q2 } = a;
        return q1 + s + q2;
    }
    ;
};
//-----------------------------------------------------------------------
exports.sTakBef = sep => a => exports.sRevBrk2(sep)(a).s1;
exports.sTakAft = sep => a => exports.sRevBrk1(sep)(a).s2;
//-----------------------------------------------------------------------
exports.sRevBrk1 = sep => a => { const at = exports.sSbsPos(sep)(a); return at === -1 ? { s1: a.trim(), s2: '' } : exports.sBrkAt(at, sep.length)(a); };
exports.sRevBrk2 = sep => a => { const at = exports.sSbsPos(sep)(a); return at === -1 ? { s1: '', s2: a.trim() } : exports.sBrkAt(at, sep.length)(a); };
exports.sRevBrk = sep => a => { const at = exports.sSbsRevPos(sep)(a); return exports.sBrkAt(at, sep.length)(a); };
exports.sRevTakBef = sep => a => exports.sRevBrk2(sep)(a).s1;
exports.sRevTakAft = sep => a => exports.sRevBrk1(sep)(a).s2;
//-----------------------------------------------------------------------
exports.sRmvFstChr = exports.sMid(1);
exports.sRmvLasChr = a => exports.sLeft(a.length - 1)(a);
exports.sRmvLasNChr = n => a => exports.sLeft(a.length - n)(a);
exports.sRmvSubStr = sbs => a => { const re = new RegExp(sbs, 'g'); return a.replace(re, ''); };
exports.sRmvColon = exports.sRmvSubStr(":");
exports.pthsep = path.sep;
exports.ffnPth = a => { const at = a.lastIndexOf(exports.pthsep); return at === -1 ? '' : exports.sLeft(at + 1)(a); };
exports.ffnFn = a => { const at = a.lastIndexOf(exports.pthsep); return at === -1 ? a : exports.sMid(at + 1)(a); };
exports.ffnExt = a => { const at = a.lastIndexOf('.'); return at === -1 ? '' : exports.sMid(at)(a); };
exports.ffnAddFnSfx = sfx => a => exports.ffnFfnn(a) + sfx + exports.ffnExt(a);
exports.ffnRmvExt = a => { const at = a.indexOf('.'); return at === -1 ? a : exports.sLeft(at)(a); };
exports.ffnFfnn = exports.ffnRmvExt;
exports.ffnFnn = a => exports.ffnFn(exports.ffnRmvExt(a));
exports.ffnRplExt = ext => a => exports.ffnRmvExt(a) + ext;
//-----------------------------------------------------------------------
exports.ftLines = a => (fs.readFileSync(a).toString());
exports.ftLy = (ft) => exports.sSplitCrLf(exports.ftLines(ft));
//-----------------------------------------------------------------------
exports.tmpnm = () => exports.sRmvColon(new Date().toJSON());
exports.tmppth = os.tmpdir + exports.pthsep;
exports.tmpffn = (pfx = "", ext) => exports.tmppth + pfx + exports.tmpnm() + ext;
exports.tmpft = () => exports.tmpffn("T", ".txt");
exports.tmpjson = () => exports.tmpffn("T", ".json");
exports.ffnTmp = a => {
    const o = exports.tmpffn(undefined, exports.ffnExt(a));
    fs.copyFileSync(a, o);
    return o;
};
//-----------------------------------------------------------------------
exports.pm = (f, ...p) => new Promise(
/**
 * @description return a Promise of {er,rslt} by calling f(...,p,cb), where cb is (er,rslt)=>{...}
 * it is usefully in creating a promise by any async f(...p,cb), assuming cb is (er,rslt)=>{...}
 * @param {(er,rslt)=>void} f
 * @param {...any} p
 * @see
 */
(rs, rj) => {
    f(...p, (e, rslt) => {
        e ? rj(e) : rs(rslt);
    });
});
exports.ftLinesPm = (a) => exports.pm(fs.readFile, a).then(rslt => rslt.toString());
exports.ftLyPm = (a) => exports.ftLinesPm(a).then(lines => exports.sSplitCrLf(lines));
exports.pthEns = (a) => { if (!fs.existsSync(a))
    fs.mkdirSync(a); };
exports.isPthExist = (a) => fs.existsSync(a);
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
exports.itrMap = (f) => (a) => { const o = []; for (let i of a)
    o.push(f(i)); return o; };
exports.itrEach = (f) => (a) => { for (let i of a)
    f(i); };
exports.itrFold = _itrFold => f => cum => a => { for (let i of a)
    cum = f(cum)(i); return cum; };
exports.itrReduce = f => (a) => exports.itrFold(f)(exports.itrFst(a))(a);
exports.mapKy = a => exports.itrAy(a.keys());
exports.mapVy = a => exports.itrAy(a.values());
exports.mapKvy = a => exports.itrAy(a.entries());
exports.mapKset = a => new Set(a.keys());
//---------------------------------------------------------------------------
exports.setAy = set => { const o = []; for (let i of set)
    o.push(i); return o; };
exports.setWhere = p => set => {
    const z = new Set;
    for (let i of set)
        if (p(i))
            z.add(i);
    return z;
};
exports.setAdd = x => set => { for (let i of x)
    set.add(i); return set; };
exports.setMinus = x => set => { for (let i of x)
    set.delete(i); return set; };
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
exports.linFstTerm = (a) => {
    let { term, remainLin } = exports.linShift(a);
    return term;
};
exports.linShift = lin => {
    const a = lin.trim();
    const b = a.match(/(\S*)\s*(.*)/);
    const o = b === null
        ? { term: "", remainLin: "" }
        : { term: b[1], remainLin: b[2] };
    return o;
};
exports.setAft = aft => a => _setAft(false, aft, a);
exports.setAftIncl = a => set => _setAft(true, a, set);
exports.setClone = set => exports.itrSet(set);
exports.itrSet = itr => { const o = new Set; for (let i of itr)
    o.add(i); return o; };
exports.itrTfmSet = f => a => { const o = new Set; for (let i of a)
    o.add(f(i)); return o; };
//---------------------------------------------------------------------------
exports.empSdic = () => new Map();
exports.lySdic = (a) => {
    const o = exports.empSdic();
    const linKs = a => {
        let { term: k, remainLin: s } = exports.linShift(a);
        return { k, s };
    };
    const x = lin => { let { k, s } = linKs(lin); o.set(k, s); };
    exports.itrEach(x)(a);
    return o;
};
exports.lyReDry = re => a => exports.itrMap(exports.matchDr)(exports.lyMatchAy(re)(a));
exports.lyReCol = re => a => exports.matchAyFstCol(exports.lyMatchAy(re)(a)).sort();
exports.matchAyDry = a => exports.itrMap(exports.matchDr)(a);
exports.matchFstItm = a => a[1];
exports.matchAyFstCol = a => exports.itrMap(exports.matchFstItm)(a);
exports.lyPfxCnt = pfx => a => { let o = 0; exports.itrEach(lin => { if (exports.sHasPfx(pfx)(lin))
    o++; })(a); return o; };
exports.lyHasMajPfx = pfx => a => 2 * exports.lyPfxCnt(pfx)(a) > a.length;
exports.lyMatchAy = re => a => exports.itrRmvEmp(exports.itrMap(exports.sMatch(re))(a));
exports.matchDr = (a) => [...a].splice(1);
exports.lyConstNy = exports.lyReCol(/^const\s+([\$\w][\$0-9\w_]*)[\:\= ]/);
exports.lyConstDollarNy = exports.lyReCol(/^export const (\$[\$0-9\w_]*)[\:\= ]/);
exports.ftConstNy = a => exports.pipe(a)(exports.ftLy, exports.lyConstNy);
exports.ftConstDollarNy = a => exports.pipe(a)(exports.ftLy, exports.lyConstDollarNy);
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
exports.isAy = Array.isArray;
exports.isDte = exports.vIsInstanceOf(Date);
exports.isFun = exports.vIsInstanceOf(Function);
exports.isRe = v => exports.vIsInstanceOf(RegExp);
exports.isNonNull = v => v !== null;
exports.isNull = v => v === null;
exports.isUndefined = v => v === undefined;
exports.isTrue = v => !!v;
exports.isFalse = v => !v;
exports.isEmp = v => v ? false : true;
exports.isNonEmp = v => v ? true : false;
exports.isOdd = n => n % 2 === 1;
exports.isEven = n => n % 2 === 0;
//----------------------------------------------------------------------------
exports.sSearch = (re) => (a) => a.search(re);
exports.sBrkP123 = quoteStr => a => {
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
    return { p1, p2, p3 };
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
exports.itrBrkForTrueFalse = p => a => { const t = [], f = []; for (let i of a)
    p(i) ? t.push(i) : f.push(i); return { t, f }; };
exports.itrAy = a => { const o = []; for (let i of a)
    o.push(i); return o; };
exports.itrFst = a => { for (let i of a)
    return i; return null; };
exports.itrAddPfxSfx = (pfx, sfx) => (a) => exports.itrMap(exports.sAddPfxSfx(pfx, sfx))(a);
exports.itrAddPfx = pfx => (a) => exports.itrMap(exports.sAddPfx(pfx))(a);
exports.itrAddSfx = sfx => (a) => exports.itrMap(exports.sAddSfx(sfx))(a);
exports.itrWdt = a => exports.pipe(exports.itrMap(exports.vLen)(a))(exports.itrMax);
exports.sitrWdt = a => exports.pipe(exports.itrMap(exports.sLen)(a))(exports.itrMax);
exports.itrAlignL = a => exports.itrMap(exports.sAlignL(exports.itrWdt(a)))(a);
exports.itrClone = a => exports.itrMap(i => i)(a);
exports.itrFind = p => a => { for (let i of a)
    if (p(i))
        return i; return null; };
exports.itrHasDup = a => { const set = new Set(); for (let i of a)
    if (set.has(i)) {
        return true;
    }
    else
        set.add(i); return false; };
exports.itrDupSet = a => {
    const set = new Set();
    const o = new Set();
    for (let i of a)
        if (set.has(i))
            o.add(i);
        else
            set.add(i);
    return o;
};
exports.itrMax = a => { let o = exports.itrFst(a); if (o === null)
    return null; for (let i of a)
    if (i > o)
        o = i; return o; };
exports.itrMin = a => { let o = exports.itrFst(a); if (o === null)
    return null; for (let i of a)
    if (i < o)
        o = i; return o; };
exports.itrRmvEmp = (a) => exports.itrWhere(exports.isNonEmp)(a);
//-----------------------------------------------------------------------------------------
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
exports.oCmlDry = o => {
    let oo = exports.itrMap(n => [exports.cmlNm(n), n])(exports.oPrpNy(o));
    exports.drySrt(exports.ayEle(0))(oo);
    const w = exports.sdryColWdt(0)(oo);
    const a = exports.sAlignL(w);
    exports.dryColMdy(0)(a)(oo);
    return oo;
};
exports.oCtorNm = o => o && o.constructor && o.constructor.name;
exports.oIsInstance = instance => o => o instanceof instance;
exports.oHasCtorNm = nm => o => exports.oCtorNm(o) === nm;
exports.oPrp = prpPth => a => {
    /**
 * @description return the property value of object {o} by property path {pprPth}
 * @param {string} prpPth
 * @example
 * const a = {b: {c:{1}}
 * require('assert').equal(prp('b.c')(o), 1)
 */
    for (let nm of prpPth.split('.'))
        if ((a = a[nm]) === undefined)
            return undefined;
    return a;
};
exports.oPrpAy = prpNy => a => exports.itrMap(nm => exports.oPrp(nm)(a))(prpNy);
exports.oPrpNy = a => Object.getOwnPropertyNames(a);
exports.oHasPrp = prpNm => a => a.hasOwnProperty(prpNm);
exports.oHasLen = exports.oHasPrp('length');
exports.oCmlObj = o => {
    const dry = exports.oCmlDry(o);
    const oo = {};
    dry.forEach(([cmlNm, prpNm]) => oo[cmlNm] = o[prpNm]);
    return oo;
};
// ----------------------------------------------
exports.ayClone = (ay) => ay.slice(0, ay.length);
// ----------------------------------------------
exports.sdryColWdt = colIx => a => exports.sitrWdt(exports.dryCol(colIx)(a));
exports.sdryColWdtAy = a => exports.itrMap(i => exports.sdryColWdt(i)(a))(exports.nItr(exports.dryColCnt(a)));
exports.dryCol = colIx => a => exports.itrMap(exports.ayEleOrDft('')(colIx))(a);
exports.dryColCnt = a => exports.itrMax(exports.itrMap(exports.vLen)(a));
exports.dryCellTfm = f => a => { exports.itrEach(exports.ayTfm(f))(a); };
exports.dryClone = a => exports.itrMap(dr => exports.itrClone(dr))(a);
exports.dryColMdy = colIx => f => a => { exports.itrEach(exports.ayTfmEle(colIx)(f))(a); };
exports.sdryLines = a => exports.sdryLy(a).join('\r\n');
exports.wdtAyLin = w => "|-" + exports.itrMap(w => '-'.repeat(w))(w).join('-|-') + "-|";
exports.sdrLin = w => a => {
    let m = ([w, s]) => exports.sAlignL(w)(s);
    let z = exports.ayZip(w, a);
    let ay = exports.itrMap(m)(z);
    let s = ay.join(' | ');
    return "| " + s + " |";
};
exports.sdryLy = a => {
    let w = exports.sdryColWdtAy(a);
    let h = exports.wdtAyLin(w);
    let o = [h].concat(exports.itrMap(exports.sdrLin(w))(a), h);
    return o;
};
exports.aySy = a => exports.itrMap(String)(a);
exports.drySdry = a => exports.itrMap(exports.aySy)(a);
exports.dryLy = a => exports.sdryLy(exports.drySdry(a));
exports.drsLy = ({ dry, fny }) => {
    let b = [fny].concat(exports.drySdry(dry));
    let c = exports.sdryLy(b);
    let o = c.slice(0, 2).concat(c[0], c.slice(2));
    return o;
};
exports.drsLines = a => exports.drsLy(a).join('\r\n');
exports.drySrt = fun_of_dr_to_key => dry => dry.sort((dr_A, dr_B) => exports.vvCompare(fun_of_dr_to_key(dr_A), fun_of_dr_to_key(dr_B)));
//-----------------------------------------------------------------------
exports.oyPrpCol = prpNm => oy => { const oo = []; for (let o of oy)
    oo.push(o[prpNm]); return oo; };
exports.oyPrpDry = prpNy => oy => { const oo = []; for (let o of oy)
    oo.push(exports.oPrpAy(prpNy)(o)); return oo; };
//---------------------------------------
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
exports.sLik = lik => s => _likRe(s).test(s); // strictEqual(sLik("abc?dd")("abcxdd"), true); debugger
exports.sHasSbs = sbs => s => {
    const _escSpec = exports.itrMap(_escSbs)(sbs).join("");
    const _sbsRe = new RegExp(_escSpec);
    let o = _sbsRe.test(s);
    return o;
};
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
exports.ayZip = (a, b) => exports.itrMap(i => [a[i], b[i]])(exports.nItr(a.length));
exports.pthFnAyPm = async (a, lik) => {
    const entries = await exports.pm(fs.readdir, a);
    const stat = entry => exports.pm(fs.stat, path.join(a, entry));
    let b = (lik === undefined) ? entries : exports.itrWhere(exports.sLik(lik))(entries);
    let c = await Promise.all(exports.itrMap(stat)(a));
    let d = exports.pipe(exports.nItr(entries.length))(exports.itrWhere(i => b[i].isFile()), exports.itrMap(i => entries[i]));
    debugger;
    return d;
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
exports.optMap = f => a => a !== null ? f(a) : a;
exports.ffnMakBackup = a => {
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
exports.lyExpStmt = ly => {
    let ny = exports.lyConstNy(ly);
    debugger;
    ny = exports.itrWhere(exports.predNot(exports.sHasPfx("_")))(ny).sort();
    if (exports.isEmp(ny))
        return null;
    const x = exports.ayJnAsLines(", ", 4, 120)(ny);
    const stmt = "export {\r\n" + x + "\r\n}";
    return stmt;
};
exports.curExpStmt = () => exports.pipe(__filename)(exports.ftLy, exports.lyExpStmt);
// dmp(curExpStmt); debugger
exports.fjsRplExpStmt = fjs => {
    const oldLy = exports.ftLy(fjs);
    const newLin = exports.lyExpStmt(oldLy);
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
    const oldLin = (oldBegIx === null || oldEndIx === null) ? null : oldLy.slice(oldBegIx, oldEndIx);
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
exports.vTee = f => a => { f(a); return a; };
exports.ftWrt = s => a => fs.writeFileSync(a, s);
exports.cmdShell = a => child_process.exec(a);
exports.ftBrw = a => exports.cmdShell(`code.cmd "${a}"`);
exports.sBrw = a => exports.pipe(exports.tmpft())(exports.vTee(exports.ftWrt(a)), exports.ftBrw);
exports.oBrw = a => exports.pipe(exports.tmpjson())(exports.vTee(exports.ftWrt(exports.oJsonLines(a))), exports.ftBrw);
exports.oJsonLines = o => JSON.stringify(o);
const isMain = module.id === '.';
if (isMain) {
    const acorn = require('acorn');
    const a = acorn.parse.toString();
    exports.sBrw(a);
    debugger;
    const o = acorn.parse(a);
    exports.oBrw(o);
}
if (isMain) {
    const sdry = [['lskdfj', '12345678901'], ['123456789', 'dkfj']];
    let act;
    act = exports.sdryColWdt(0)(sdry);
    assert.strictEqual(act, 9);
    act = exports.sdryColWdt(1)(sdry);
    assert.strictEqual(act, 11);
    act = exports.sdryColWdtAy(sdry);
    assert.deepStrictEqual(act, [9, 11]);
    act = exports.sdryLy(sdry);
}
if (isMain) {
    const fny = exports.sSplitSpc('aa bb');
    const dry = [[1233, '12345678901'], ['123456789', 'dkfj'], [new Date(), true, 1]];
    const drs = { a: 1, dry, fny };
    const act = exports.drsLines(drs);
    debugger;
}
if (isMain) {
}
//fjsRplExpStmt(ffnRplExt(".ts")(__filename))
//# sourceMappingURL=curryfun.js.map