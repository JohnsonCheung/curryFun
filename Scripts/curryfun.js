"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./typings/node/node.d.ts"/>
const fs = require("fs");
const path = require("path");
const os = require("os");
const child_process = require("child_process");
//---------------------------------------
const strictEqual = require('assert').strictEqual;
exports.strictEqual = strictEqual;
const eq = act => exp => { try {
    strictEqual(act, exp);
}
catch (e) {
    debugger;
} };
exports.eq = eq;
//---------------------------------------
const vLT = a => v => v < a;
const vGE = a => v => v >= a;
const vLE = a => v => v <= a;
const vEQ = a => v => a === v;
const vNE = a => v => a !== v;
const vGT = a => v => v > a;
const vIN = itr => v => { for (let i of itr)
    if (i === v)
        return true; return false; };
const vNIN = itr => v => !vIN(itr)(v);
const vBET = (a, b) => v => a <= v && v <= b;
const vNBET = (a, b) => v => !vBET(a, b)(v);
const vIsInstanceOf = x => v => v instanceof x;
const ensSy = sOrSy => {
    if (isSy(sOrSy))
        return sOrSy;
    if (typeof sOrSy === 'string') {
        let s = sOrSy;
        return splitSpc(sOrSy);
    }
    er('Given [syOrStr] is neither str nor sy', sOrSy);
};
const ensRe = sOrRe => isRe(sOrRe) ? sOrRe : new RegExp(sOrRe);
//-------------------------------------
const pipe = v => (...f) => { let o = v; for (let ff of f)
    o = ff(o); return o; };
const apply = v => (f) => f(v);
exports.apply = apply;
const swap = (f) => a => b => f(b)(a);
exports.swap = swap;
const compose = (...f) => v => pipe(v)(...f);
exports.compose = compose;
//----------------------------------
const dmp = global.console.log;
exports.dmp = dmp;
const funDmp = f => dmp(f.toString());
const halt = () => { throw new Error(); };
const sEscLf = (s) => s.replace('\n', '\\n');
const sEscCr = (s) => s.replace('\r', '\\r');
const sEscTab = (s) => s.replace('\t', '\\t');
const sEsc = compose(sEscLf, sEscCr, sEscTab);
const sBox = (s) => { const b = "== " + sEsc(s) + " ==", a = "=".repeat(b.length); return [a, b, a].join("\r\n"); };
const stack = () => { try {
    throw new Error();
}
catch (e) {
    return e.stack;
} };
const er = (msg, ...v) => {
    let a = stack();
    let b = a.split(/\n/);
    let c = b[3];
    let d = c.split(/\s+/);
    let breakingFunNm = d[2];
    let hdr = sBox(breakingFunNm);
    dmp(hdr);
    dmp(`error[${msg}] ------------------------\n`);
    each(dmp)(v);
    dmp(a);
    dmp('------------------------------------------------');
    let dbg = true;
    debugger;
    if (dbg)
        halt();
};
//-----------------------------------------------------------------------
const split = (sep) => (s) => s.split(sep);
exports.split = split;
const splitCrLf = split('\r\n');
exports.splitCrLf = splitCrLf;
const splitLf = split('\n');
exports.splitLf = splitLf;
const splitSpc = split(/\s+/);
exports.splitSpc = splitSpc;
const splitCommaSpc = split(/,\s*/);
exports.splitCommaSpc = splitCommaSpc;
//-----------------------------------------------------------------------
const dft = dft => v => v === null || v === undefined ? dft : v;
const dftStr = dft("");
exports.dftStr = dftStr;
const dftUpper = (a, b) => v => v === null || v === undefined || a > v || v > b ? b : v;
const dftLoower = (a, b) => v => v === null || v === undefined || a > v || v > b ? a : v;
const ayFindIx = p => a => { for (let i in a)
    if (p(a[i]))
        return Number(i); return null; };
const ayFindIxOrDft = dftIx => p => a => dft(dftIx)(ayFindIx(p)(a));
exports.ayFindIxOrDft = ayFindIxOrDft;
const ayFst = a => a[0];
const aySnd = a => a[1];
const ayLas = a => a[len(a) - 1];
const ayEle = ix => a => a[ix];
const ayTfm = f => a => { each(i => a[i] = f(a[i]))(nItr(a.length)); };
const aySetEle = ix => v => a => a[ix] = v;
const ayTfmEle = ix => f => a => a[ix] = f(a[ix]);
//-----------------------------------------------------------------------
const jn = (sep) => (ay) => ay.join(sep);
exports.jn = jn;
const jnCrLf = jn('\r\n');
exports.jnCrLf = jnCrLf;
const jnLf = jn('\n');
exports.jnLf = jnLf;
const jnSpc = jn(' ');
exports.jnSpc = jnSpc;
const jnComma = jn(',');
exports.jnComma = jnComma;
const jnCommaSpc = jn(', ');
exports.jnCommaSpc = jnCommaSpc;
const spc = (n) => ' '.repeat(n);
exports.spc = spc;
const jnAsLines = (sep0, tab0, wdt0) => (sy) => {
    let wdt = dftUpper(20, 120)(wdt0);
    let sep = dft('')(sep0);
    let slen = sep.length;
    let pfx = spc(dft(0)(tab0));
    let a = (() => {
        const oo = [];
        let o = [];
        let ww = 0;
        for (let s of sy) {
            let l = len(s) + slen;
            if (ww + l > wdt) {
                oo.push(pfx + itrAddSfx(sep)(o).join(""));
                o = [];
                ww = 0;
            }
            o.push(s);
            ww += l;
        }
        if (o.length > 0) {
            oo.push(pfx + itrAddSfx(sep)(o).join(""));
        }
        return oo;
    })();
    let b = jnCrLf(a);
    return b;
};
exports.jnAsLines = jnAsLines;
//-----------------------------------------------------------------------
const fstChr = (s) => s[0];
exports.fstChr = fstChr;
const lasChr = (s) => s[s.length - 1];
exports.lasChr = lasChr;
const addPfx = (pfx) => v => pfx + v;
exports.addPfx = addPfx;
const addSfx = (sfx) => v => v + sfx;
exports.addSfx = addSfx;
const addPfxSfx = (pfx, sfx) => v => pfx + v + sfx;
exports.addPfxSfx = addPfxSfx;
const len = v => (v && v.length) || String(v).length;
exports.len = len;
const midN = (pos) => (n) => (s) => s.substr(pos, n);
exports.midN = midN;
const mid = (pos) => (s) => s.substr(pos);
exports.mid = mid;
const left = (n) => (s) => s.substr(0, n);
exports.left = left;
const trim = (s) => s.trim();
exports.trim = trim;
const right = (n) => (s) => {
    const l = len(s);
    if (n >= l)
        return s;
    if (0 >= n)
        return '';
    return s.substr(-n);
};
exports.right = right;
const padZero = (dig) => (n) => {
    const s = String(n);
    const nZer = dig - s.length;
    const z = nZer > 0 ? "0".repeat(nZer) : "";
    return z + s;
};
exports.padZero = padZero;
const alignL = (w) => (s) => {
    const l = len(s);
    if (l > w)
        return s;
    return s + spc(w - l);
};
exports.alignL = alignL;
const alignR = w => s => {
    const l = len(s);
    if (l > w)
        return s;
    return spc(w - l) + s;
};
exports.alignR = alignR;
const sWrt = ft => s => fs.writeFileSync(ft, s);
exports.sWrt = sWrt;
const sbsPos = (sbs) => (s) => { const l = sbs.length; for (let j = 0; j < s.length - l + 1; j++)
    if (sbs === s.substr(j, l))
        return j; return -1; };
exports.sbsPos = sbsPos;
//strictEqual(sbsPos('aabb')('123aabb'),3)
const sbsRevPos = (sbs) => (s) => {
    const sbsLen = sbs.length;
    for (let j = s.length - sbsLen + 1; j > 0; j--) {
        if (sbs === s.substr(j, sbsLen))
            return j;
    }
    return -1;
};
exports.sbsRevPos = sbsRevPos;
//strictEqual(sbsRevPos('a')('0123aabb'),5)
const cmlNm = (nm) => cmlNy(nm).reverse().join(' '); // @eg cmlNm(relItmNy) === 'Ny Itm rel'
exports.cmlNm = cmlNm;
const cmlNy = (nm) => {
    const o = [];
    if (nm.trim() === '')
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
        while (nm.length > 0) {
            if (j++ > 100) {
                debugger;
                throw null;
            }
            if (/^[A-Z]/.test(nm))
                return o;
            o += pchr();
        }
        return o;
    }
    function pchr() {
        if (nm === '')
            return '';
        const o = nm[0];
        nm = rmvFstChr(nm);
        return o;
    }
};
exports.cmlNy = cmlNy;
const hasPfx = (pfx) => (s) => s.startsWith(pfx);
exports.hasPfx = hasPfx;
const rmvPfx = (pfx) => (s) => hasPfx(s) ? s.substr(pfx.length) : s;
exports.rmvPfx = rmvPfx;
const hasSfx = (sfx) => (s) => s.endsWith(sfx);
exports.hasSfx = hasSfx;
const rmvSfx = (sfx) => (s) => hasSfx(s) ? s.substr(0, s.length - sfx.length) : s;
exports.rmvSfx = rmvSfx;
const match = re => s => s.match(re);
exports.match = match;
const notMatch = re => s => !(match(re)(s));
exports.notMatch = notMatch;
const predNot = p => v => !p(v);
exports.predNot = predNot;
const predsOr = (...p) => v => { for (let pp of p)
    if (pp(v))
        return true; return false; };
const predsAnd = (...p) => v => { for (let pp of p)
    if (!pp(v))
        return false; return true; };
//-----------------------------------------------------------------------
const isRmkLin = lin => {
    const l = lin.trim();
    if (l === "")
        return true;
    if (hasPfx("--")(l))
        return true;
    return false;
};
const isNonRmkLin = predNot(isRmkLin);
const linRmvMsg = lin => {
    const a = lin.match(/(.*)---/);
    const b = a === null ? lin : a[1];
    if (hasPfx("^")(b.trimLeft()))
        return "";
    return b;
};
const brkAt = (at, len) => s => { return { s1: left(at)(s).trim(), s2: mid(at + len)(s).trim() }; };
const brk1 = sep => s => { const at = sbsPos(sep)(s); return at === -1 ? { s1: trim(s), s2: '' } : brkAt(at, len(sep))(s); };
const brk2 = sep => s => { const at = sbsPos(sep)(s); return at === -1 ? { s1: '', s2: trim(s) } : brkAt(at, len(sep))(s); };
const brk = sep => s => { const at = sbsPos(sep)(s); return brkAt(at, len(sep))(s); };
const brkQuote = (quote) => {
    const l = len(quote);
    if (l === 1)
        return { q1: quote, q2: quote };
    if (l === 2)
        return { q1: quote.substr(0, 1), q2: quote.substr(1) };
    let p = sbsPos("*")(quote);
    if (p === -1)
        return null;
    let { s1: q1, s2: q2 } = brkAt(p, 1)(quote);
    return { q1, q2 };
};
exports.brkQuote = brkQuote;
const quote = q => s => {
    let a = brkQuote(q);
    if (a === null)
        return s;
    else {
        let { q1, q2 } = a;
        return q1 + s + q2;
    }
    ;
};
exports.quote = quote;
//-----------------------------------------------------------------------
const takBef = sep => s => revBrk2(sep)(s).s1;
const takAft = sep => s => revBrk1(sep)(s).s2;
//-----------------------------------------------------------------------
const revBrk1 = sep => s => { const at = sbsPos(sep)(s); return at === -1 ? { s1: trim(s), s2: '' } : brkAt(at, len(sep))(s); };
const revBrk2 = sep => s => { const at = sbsPos(sep)(s); return at === -1 ? { s1: '', s2: trim(s) } : brkAt(at, len(sep))(s); };
const revBrk = sep => s => { const at = sbsRevPos(sep)(s); return brkAt(at, len(sep))(s); };
const revTakBef = sep => s => revBrk2(sep)(s).s1;
const revTakAft = sep => s => revBrk1(sep)(s).s2;
//-----------------------------------------------------------------------
const rmvFstChr = mid(1);
const rmvLasChr = s => left(len(s) - 1)(s);
const rmvLasNChr = (n) => (s) => left(len(s) - n)(s);
exports.rmvLasNChr = rmvLasNChr;
const rmvSubStr = (sbs) => (s) => { const re = new RegExp(sbs, 'g'); return s.replace(re, ''); };
exports.rmvSubStr = rmvSubStr;
const rmvColon = rmvSubStr(":");
exports.rmvColon = rmvColon;
const pthSep = path.sep;
exports.pthSep = pthSep;
const ffnPth = (ffn) => { const at = sbsRevPos(pthSep)(ffn); return at === -1 ? '' : left(at + 1)(ffn); };
exports.ffnPth = ffnPth;
const ffnFn = (ffn) => { const at = sbsRevPos(pthSep)(ffn); return at === -1 ? ffn : mid(at + 1)(ffn); };
exports.ffnFn = ffnFn;
const ffnExt = (ffn) => { const at = sbsRevPos('.')(ffn); return at === -1 ? '' : mid(at)(ffn); };
exports.ffnExt = ffnExt;
const ffnAddFnSfx = (sfx) => (ffn) => ffnFfnn(ffn) + sfx + ffnExt(ffn);
exports.ffnAddFnSfx = ffnAddFnSfx;
const rmvExt = (ffn) => { const at = sbsPos('.')(ffn); return at === -1 ? ffn : left(at)(ffn); };
exports.rmvExt = rmvExt;
const ffnFfnn = rmvExt;
exports.ffnFfnn = ffnFfnn;
const ffnFnn = (ffn) => ffnFn(rmvExt(ffn));
exports.ffnFnn = ffnFnn;
const ffnRplExt = (ext) => (ffn) => rmvExt(ffn) + ext;
exports.ffnRplExt = ffnRplExt;
//-----------------------------------------------------------------------
const ftLines = (ft) => (fs.readFileSync(ft).toString());
exports.ftLines = ftLines;
const ftLy = (ft) => splitCrLf(ftLines(ft));
exports.ftLy = ftLy;
//-----------------------------------------------------------------------
const tmpNm = () => rmvColon(new Date().toJSON());
exports.tmpNm = tmpNm;
const tmpPth = os.tmpdir + pthSep;
exports.tmpPth = tmpPth;
const tmpFfn = (pfx = "", ext) => tmpPth + pfx + tmpNm() + ext;
exports.tmpFfn = tmpFfn;
const tmpFt = () => tmpFfn("T", ".txt");
exports.tmpFt = tmpFt;
/**
 * return a new temp file by copying {fm}
 * @param {ffn} fm
 */
const tmpFilFm = fm => {
    const o = tmpFfn(undefined, ffnExt(fm));
    fs.copyFileSync(fm, o);
    return o;
};
exports.tmpFilFm = tmpFilFm;
//-----------------------------------------------------------------------
/**
 * @description return a Promise of {er,rslt} by calling f(...,p,cb), where cb is (er,rslt)=>{...}
 * it is usefully in creating a promise by any async f(...p,cb), assuming cb is (er,rslt)=>{...}
 * @param {(er,rslt)=>void} f
 * @param {...any} p
 * @see
 */
const pm = (f, ...p) => new Promise((rs, rj) => {
    f(...p, (e, rslt) => {
        e ? rj(e) : rs(rslt);
    });
});
exports.pm = pm;
const ftLinesPm = (ft) => pm(fs.readFile, ft).then(rslt => rslt.toString());
exports.ftLinesPm = ftLinesPm;
const ftLyPm = (ft) => ftLinesPm(ft).then(lines => splitCrLf(lines));
exports.ftLyPm = ftLyPm;
const pthEns = (a) => { if (!fs.existsSync(a))
    fs.mkdirSync(a); };
exports.pthEns = pthEns;
const isPthExist = (a) => fs.existsSync(a);
exports.isPthExist = isPthExist;
const assertIsPthExist = (a) => { if (!isPthExist(a))
    er(`path does not exist [${a}]`); };
exports.assertIsPthExist = assertIsPthExist;
const pthEnsSfxSep = (a) => lasChr(a) === pthSep ? a : a + pthSep;
exports.pthEnsSfxSep = pthEnsSfxSep;
const pthEnsSubFdr = (subFdr) => (pth) => {
    assertIsPthExist(pth);
    let b = subFdr.split(/[\\\/]/);
    let c = itrRmvEmp(b);
    let d = pthEnsSfxSep(pth);
    let e = [];
    for (let seg of c) {
        d += seg + '\\';
        e.push(d);
    }
    each(pthEns)(e);
};
exports.pthEnsSubFdr = pthEnsSubFdr;
//-----------------------------------------------------------------------
const where = (p) => (a) => { const o = []; for (let i of a)
    if (p(i))
        o.push(i); return o; };
exports.where = where;
const exclude = (p) => (a) => { const o = []; for (let i of a)
    if (!p(i))
        o.push(i); return o; };
exports.exclude = exclude;
const map = (f) => (a) => { const o = []; for (let i of a)
    o.push(f(i)); return o; };
exports.map = map;
const mapSy = map;
const each = (f) => (a) => { for (let i of a)
    f(i); };
exports.each = each;
const fold = (f) => cum => (a) => { for (let i of a)
    cum = f(cum)(i); return cum; };
exports.fold = fold;
const reduce = f => (a) => fold(f)(itrFst(a))(a);
exports.reduce = reduce;
//---------------------------------------------------------------------------
const mapKy = (a) => a.keys();
exports.mapKy = mapKy;
const mapVy = (a) => a.values();
exports.mapVy = mapVy;
const mapKvy = (a) => a.entries();
exports.mapKvy = mapKvy;
const mapKset = (a) => new Set(a.keys());
exports.mapKset = mapKset;
//---------------------------------------------------------------------------
const setAy = set => { const o = []; for (let i of set)
    o.push(i); return o; };
exports.setAy = setAy;
const setWhere = p => set => {
    const z = new Set;
    for (let i of set)
        if (p(i))
            z.add(i);
    return z;
};
exports.setWhere = setWhere;
const setAdd = x => set => { for (let i of x)
    set.add(i); return set; };
exports.setAdd = setAdd;
const setMinus = x => set => { for (let i of x)
    set.delete(i); return set; };
exports.setMinus = setMinus;
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
const setAft = aft => a => _setAft(false, aft, a);
exports.setAft = setAft;
const setAftIncl = a => set => _setAft(true, a, set);
exports.setAftIncl = setAftIncl;
const setClone = set => itrSet(set);
exports.setClone = setClone;
const itrSet = itr => { const o = new Set; for (let i of itr)
    o.add(i); return o; };
exports.itrSet = itrSet;
const setMap = f => set => { const o = new Set; for (let i of set)
    o.add(f(i)); return o; };
exports.setMap = setMap;
//---------------------------------------------------------------------------
const lyReDry = re => ly => map(matchDr)(lyMatchAy(re)(ly));
const lyReCol = re => ly => matchAyFstCol(lyMatchAy(re)(ly)).sort();
const matchAyDry = matchAy => map(matchDr)(matchAy);
exports.matchAyDry = matchAyDry;
const matchAyFstCol = matchAy => mapSy(ayEle(1))(matchAy);
exports.matchAyFstCol = matchAyFstCol;
const lyMatchAy = re => ly => itrRmvEmp(map(match(re))(ly));
const matchDr = (a) => [...a].splice(1);
exports.matchDr = matchDr;
const lyConstNy = lyReCol(/^const\s+([$\w][$0-9\w_]*) /);
exports.lyConstNy = lyConstNy;
const lyConstDollarNy = lyReCol(/^const (\$[$0-0\w_]*) /);
exports.lyConstDollarNy = lyConstDollarNy;
const ftConstNy = ft => pipe(ft)(ftLy, lyConstNy);
exports.ftConstNy = ftConstNy;
const ftConstDollarNy = ft => pipe(ft)(ftLy, lyConstDollarNy);
exports.ftConstDollarNy = ftConstDollarNy;
//---------------------------------------------------------------------------
const isStr = v => typeof v === 'string';
exports.isStr = isStr;
const isNum = v => typeof v === 'number';
exports.isNum = isNum;
const isBool = v => typeof v === 'boolean';
exports.isBool = isBool;
const isObj = v => typeof v === 'object';
exports.isObj = isObj;
const isSy = v => {
    if (!isAy(v))
        return false;
    if (isEmp(v))
        return true;
    return isStr(v[0]);
};
exports.isSy = isSy;
const isAy = Array.isArray;
exports.isAy = isAy;
const isDte = vIsInstanceOf(Date);
exports.isDte = isDte;
const isFun = vIsInstanceOf(Function);
exports.isFun = isFun;
const isRe = v => vIsInstanceOf(RegExp);
exports.isRe = isRe;
const isNonNull = v => v !== null;
exports.isNonNull = isNonNull;
const isNull = v => v === null;
exports.isNull = isNull;
const isUndefined = v => v === undefined;
exports.isUndefined = isUndefined;
const isTrue = v => !!v;
exports.isTrue = isTrue;
const isFalse = v => !v;
exports.isFalse = isFalse;
const isEmp = v => v ? false : true;
exports.isEmp = isEmp;
const isNonEmp = v => v ? true : false;
exports.isNonEmp = isNonEmp;
const isOdd = n => n % 2 === 1;
exports.isOdd = isOdd;
const isEven = n => n % 2 === 0;
exports.isEven = isEven;
//----------------------------------------------------------------------------
const sSearch = (re) => (s) => s.search(re);
exports.sSearch = sSearch;
const sBrkP123 = (quote) => (s) => {
    const a = brkQuote(quote);
    if (a === null)
        return null;
    else {
        const { q1, q2 } = a;
        const l = s.length;
        const q1pos = s.indexOf(q1);
        const q2pos = s.indexOf(q2, q1pos + 1);
        const len1 = q1pos;
        const pos2 = q1pos + q1.length;
        const pos3 = q2pos + q2.length;
        const len2 = pos3 - pos2 - 1;
        const p1 = s.substr(0, len1);
        const p2 = s.substr(pos2, len2);
        const p3 = s.substr(pos3);
        return { p1, p2, p3 };
    }
};
exports.sBrkP123 = sBrkP123;
//let a = sBrkP123("(backup-*)")("slkdfjlsdjf(backup-123).exe");debugger
//----------------------------------------------------------------------------
const itrIsAllTrue = (a) => { for (let i of a)
    if (isFalse(i))
        return false; return true; };
exports.itrIsAllTrue = itrIsAllTrue;
const itrIsAllFalse = (a) => { for (let i of a)
    if (isTrue(i))
        return false; return true; };
exports.itrIsAllFalse = itrIsAllFalse;
const itrIsSomeTrue = (a) => { for (let i of a)
    if (isTrue(i))
        return true; return false; };
exports.itrIsSomeTrue = itrIsSomeTrue;
const itrIsSomeFalse = (a) => { for (let i of a)
    if (isFalse(i))
        return true; return false; };
exports.itrIsSomeFalse = itrIsSomeFalse;
const itrPredIsAllTrue = (p) => (a) => { for (let i of a)
    if (!p(i))
        return false; return true; };
exports.itrPredIsAllTrue = itrPredIsAllTrue;
const itrPredIsAllFalse = (p) => (a) => { for (let i of a)
    if (p(i))
        return false; return true; };
exports.itrPredIsAllFalse = itrPredIsAllFalse;
const itrPredIsSomeFalse = (p) => (a) => { for (let i of a)
    if (!p(i))
        return true; return false; };
exports.itrPredIsSomeFalse = itrPredIsSomeFalse;
const itrPredIsSomeTrue = (p) => (a) => { for (let i of a)
    if (p(i))
        return true; return false; };
exports.itrPredIsSomeTrue = itrPredIsSomeTrue;
const itrBrkForTrueFalse = p => a => { const t = [], f = []; for (let i of a)
    p(i) ? t.push(i) : f.push(i); return [t, f]; };
const itrAy = (a) => { const o = []; for (let i of a)
    o.push(i); return o; };
exports.itrAy = itrAy;
const itrFst = (a) => { for (let i of a)
    return i; return null; };
exports.itrFst = itrFst;
const itrAddPfxSfx = (pfx, sfx) => (a) => map(addPfxSfx(pfx, sfx))(a);
exports.itrAddPfxSfx = itrAddPfxSfx;
const itrAddPfx = pfx => (a) => map(addPfx(pfx))(a);
exports.itrAddPfx = itrAddPfx;
const itrAddSfx = sfx => (a) => map(addSfx(sfx))(a);
exports.itrAddSfx = itrAddSfx;
const itrWdt = (a) => Number(pipe(map(len)(a))(itrMax));
exports.itrWdt = itrWdt;
const itrAlignL = (a) => map(alignL(itrWdt(a)))(a);
exports.itrAlignL = itrAlignL;
const itrClone = (a) => map(i => i)(a);
exports.itrClone = itrClone;
const itrFind = (p) => (a) => { for (let i of a)
    if (p(i))
        return i; return null; };
exports.itrFind = itrFind;
const itrHasDup = (a) => { const set = new Set(); for (let i of a)
    if (set.has(i)) {
        return true;
    }
    else
        set.add(i); return false; };
exports.itrHasDup = itrHasDup;
const itrDupSet = (a) => { const set = new Set(), o = new Set(); for (let i in a)
    if (set.has(i)) {
        o.add(i);
    }
    else
        set.add(i); return o; };
exports.itrDupSet = itrDupSet;
const itrMax = (a) => { let o = itrFst(a); for (let i of a)
    if (i > o)
        o = i; return o; };
exports.itrMax = itrMax;
const itrMin = (a) => { let o = itrFst(a); for (let i of a)
    if (i < o)
        o = i; return o; };
exports.itrMin = itrMin;
const itrRmvEmp = (a) => where(isNonEmp)(a);
exports.itrRmvEmp = itrRmvEmp;
//-----------------------------------------------------------------------------------------
const must = (p, t) => v => { if (!p(v))
    er(`given v must be [${t}]`, { v }); };
exports.must = must;
const mnon = (p, t) => v => { if (p(v))
    er(`given v must be non-[${t}]`, { v }); };
exports.mnon = mnon;
const musFun = must(isFun, 'Function');
exports.musFun = musFun;
const musNum = must(isNum, 'Number');
exports.musNum = musNum;
const musStr = must(isStr, 'String');
exports.musStr = musStr;
const musAy = must(isAy, 'Array');
exports.musAy = musAy;
const musObj = must(isObj, 'Object');
exports.musObj = musObj;
const musDte = must(isDte, 'Date');
exports.musDte = musDte;
const mnonEmp = mnon(isEmp, 'Emp');
exports.mnonEmp = mnonEmp;
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
const oBringUpDollarPrp = o => {
    musObj(o);
    for (let chdNm in o) {
        const chd = o[chdNm];
        for (let chdMbrNm in chd) {
            if (oHasPrp(chdMbrNm)(o))
                er("{chdMbrNm} of {chd} exists in {o}", { chdMbrNm, chd, o });
            o[chdMbrNm] = chd[chdMbrNm];
        }
    }
    return o;
};
exports.oBringUpDollarPrp = oBringUpDollarPrp;
const oCmlDry = o => {
    let oo = map(n => [cmlNm(n), n])(oPrpNy(o));
    drySrt(ayEle(0))(oo);
    const w = dryColWdt(0)(oo);
    const a = alignL(w);
    dryTfmCol(0)(a)(oo);
    return oo;
};
exports.oCmlDry = oCmlDry;
const oCtorNm = o => o && o.constructor && o.constructor.name;
exports.oCtorNm = oCtorNm;
const oIsInstance = instance => o => o instanceof instance;
exports.oIsInstance = oIsInstance;
const oHasCtorNm = nm => o => oCtorNm(o) === nm;
exports.oHasCtorNm = oHasCtorNm;
/**
 * @description return the property value of object {o} by property path {pprPth}
 * @param {string} prpPth
 * @example
 * const a = {b: {c:{1}}
 * require('assert').equal(prp('b.c')(o), 1)
 */
const oPrp = (prpPth) => (o) => { for (let nm of prpPth.split('.'))
    if (!(o = o[nm]))
        return undefined; return o; };
exports.oPrp = oPrp;
const oPrpAy = (prpNy) => (o) => map(nm => oPrp(nm)(o))(prpNy);
exports.oPrpAy = oPrpAy;
const oPrpNy = o => Object.getOwnPropertyNames(o);
exports.oPrpNy = oPrpNy;
const oHasPrp = prpNm => o => { try {
    return o[prpNm] !== undefined;
}
catch (e) {
    return false;
} };
exports.oHasPrp = oHasPrp;
const oHasLen = oHasPrp('length');
exports.oHasLen = oHasLen;
const oCmlObj = o => {
    const dry = oCmlDry(o);
    const oo = {};
    dry.forEach(([cmlNm, prpNm]) => oo[cmlNm] = o[prpNm]);
    return oo;
};
exports.oCmlObj = oCmlObj;
// ----------------------------------------------
const ayClone = (ay) => ay.slice(0, ay.length);
exports.ayClone = ayClone;
// ----------------------------------------------
const dryColWdt = colIx => a => itrWdt(dryCol(colIx)(a));
const dryColWdtAy = a => map(i => dryColWdt(i)(a))(nItr(dryColCnt(a)));
const dryCol = colIx => a => map(ayEle(colIx))(a);
const dryColCnt = a => itrMax(map(len)(a));
const dryTfmCell = f => a => { each(ayTfm(f))(a); };
const dryClone = a => map(dr => itrClone(dr))(a);
const dryTfmCol = colIx => f => a => { each(ayTfmEle(colIx)(f))(a); };
const drySrt = fun_of_dr_to_key => dry => dry.sort((dr_A, dr_B) => compare(fun_of_dr_to_key(dr_A), fun_of_dr_to_key(dr_B)));
//-----------------------------------------------------------------------
const oyPrpCol = prpNm => oy => { const oo = []; for (let o of oy)
    oo.push(o[prpNm]); return oo; };
exports.oyPrpCol = oyPrpCol;
const oyPrpDry = prpNy => oy => { const oo = []; for (let o of oy)
    oo.push(oPrpAy(prpNy)(o)); return oo; };
exports.oyPrpDry = oyPrpDry;
const _isEsc = i => { for (let spec of "()[]{}/|.+")
    if (i === spec)
        return true; };
const _escSpec = lik => map(i => i === '\\' ? '\\\\' : (_isEsc(i) ? '\\' + i : i))(lik).join(''); //; const xxx = _escSpec("abc?dd"); debugger
const _escStar = lik => map(i => i === '*' ? '.*' : i)(lik).join('');
const _escQ = lik => { const o = []; for (let i of lik)
    o.push(i === '?' ? '.' : i); return o.join(''); };
const _esc = lik => "^" + pipe(lik)(_escSpec, _escStar, _escQ) + "$";
const _likRe = lik => new RegExp(_esc(lik));
const _isEscSbs = i => { for (let spec of "()[]{}/|.+?*")
    if (i === spec)
        return true; };
const _escSbs = c => c === '\\' ? '\\\\' : (_isEscSbs(c) ? '\\' + c : c);
const sLik = lik => s => _likRe(s).test(s); // strictEqual(sLik("abc?dd")("abcxdd"), true); debugger
const hasSbs = sbs => s => {
    const _escSpec = map(_escSbs)(sbs).join("");
    const _sbsRe = new RegExp(_escSpec);
    let o = _sbsRe.test(s);
    return o;
};
//---------------------------------------
const pthFnAy = (pth, lik) => {
    if (!fs.existsSync(pth))
        return null;
    const isFil = entry => fs.statSync(path.join(pth, entry)).isFile();
    let entries = fs.readdirSync(pth);
    entries = (lik === undefined) ? entries : where(sLik(lik))(entries);
    let o = where(isFil)(entries);
    return o;
}; // const xxx = pthFnAy("c:\\users\\user\\", "sdfdf*.*"); debugger;
exports.pthFnAy = pthFnAy;
const ayZip = (a, b) => map(i => [a[i], b[i]])(nItr(a.length));
exports.ayZip = ayZip;
const pthFnAyPm = async (pth, lik) => {
    const entries = await pm(fs.readdir, pth);
    const stat = entry => pm(fs.stat, path.join(pth, entry));
    let a = (lik === undefined) ? entries : where(sLik(lik))(entries);
    let b = await Promise.all(map(stat)(a));
    let c = pipe(nItr(entries.length))(where(i => b[i].isFile()), map(i => entries[i]));
    debugger;
    return c;
};
exports.pthFnAyPm = pthFnAyPm;
//---------------------------------------
const multiply = a => b => a * b;
exports.multiply = multiply;
const divide = a => b => b / a;
exports.divide = divide;
const add = a => b => a + b;
exports.add = add;
const minus = a => b => b - a;
exports.minus = minus;
const decr = minus(1);
exports.decr = decr;
const incr = add(1);
exports.incr = incr;
const nItr = function* (n) { for (let j = 0; j < n; j++)
    yield j; };
exports.nItr = nItr;
// --------------------------------------------------------------------------
const compare = (a, b) => a === b ? 0 : a > b ? 1 : -1;
exports.compare = compare;
const lazy = vf => { let v, done = false; return () => { if (!done) {
    v = vf();
    done = true;
} ; return v; }; };
exports.lazy = lazy;
//---------------------------------------------------------------------------
const optMap = (f) => a => a === null ? f(a) : a;
exports.optMap = optMap;
const ffnMakBackup = (ffn) => {
    const ext = ffnExt(ffn);
    const ffnn = rmvExt(ffn);
    const pth = ffnPth(ffn);
    let a = right(12)(ffnn);
    const isBackupFfn = (hasPfx("(backup-")(a)) && (hasSfx(")")(a));
    const fn = ffnFn(ffn);
    const backupSubFdr = `.backup\\${fn}\\`;
    const backupPth = pth + backupSubFdr;
    if (ext === '.backup')
        er("given [ext] cannot be '.backup", { ext, ffnn });
    if (isBackupFfn)
        er("ffn cannot be a backup file name", { ffn });
    let b = pthFnAy(backupPth, ffnn + '(backup-???)' + ext);
    let nxtBackupNNN = b === null || isEmp(b) ? '000' :
        pipe(b)(itrMax, rmvExt, rmvLasChr, right(3), Number.parseInt, incr, padZero(3));
    const backupFfn = backupPth + ffnAddFnSfx(`(backup-${nxtBackupNNN})`)(fn);
    pthEnsSubFdr(backupSubFdr)(pth);
    fs.copyFileSync(ffn, backupFfn);
};
exports.ffnMakBackup = ffnMakBackup;
const lyExpStmt = ly => {
    let ny = lyConstNy(ly);
    ny = where(predNot(hasPfx("_")))(ny).sort();
    if (isEmp(ny))
        return null;
    const x = jnAsLines(", ", 4, 120)(ny);
    const stmt = "export {\r\n" + x + "\r\n}";
    return stmt;
};
const curExpStmt = () => pipe(__filename)(ftLy, lyExpStmt);
// dmp(curExpStmt); debugger
const fjsRplExpStmt = fjs => {
    const oldLy = ftLy(fjs);
    const newLin = lyExpStmt(oldLy);
    let oldBegIx = ayFindIx(hasPfx("exports {"))(oldLy);
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
                    oldLy.splice(oldBegIx, oldEndIx, dftStr(newLin));
                    return jnCrLf(oldLy);
                }
                else {
                    er("impossible");
                    halt();
                }
            case (hasNewLin && !hasOldLin):
                return jnCrLf(oldLy.concat(dftStr(newLin)));
            case (hasOldLin):
                if (oldBegIx === null) {
                    er("impossible");
                }
                else {
                    oldLy.splice(oldBegIx, oldEndIx);
                    return jnCrLf(oldLy);
                }
            default:
                er("impossible");
                halt();
        }
        return jnCrLf(oldLy);
    };
    let a = newLines();
    if (oldLin !== newLin) {
        debugger;
        ffnMakBackup(fjs);
        sWrt(fjs)(newLines());
    }
};
const vTee = f => a => { f(a); return a; };
const ftWrt = s => a => fs.writeFileSync(a, s);
const cmdShell = a => child_process.exec(a);
const ftBrw = a => cmdShell(`code.cmd "${a}"`);
const sBrw = s => pipe(tmpFt())(vTee(ftWrt(s)), ftBrw);
const oLines = o => JSON.stringify(o);
exports.oLines = oLines;
fjsRplExpStmt(ffnRplExt(".ts")(__filename));
//# sourceMappingURL=curryfun.js.map