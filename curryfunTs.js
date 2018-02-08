"use strict";
var curryfun;
(function (curryfun) {
    const fs = require('fs');
    const path = require('path');
    const os = require('os');
    //---------------------------------------
    const vEQ = a => v => a === v;
    const vNE = a => v => a !== v;
    const vGT = a => v => v > a;
    const vIN = itr => v => { for (let i of itr)
        if (i === v)
            return true; return false; };
    const vNIN = itr => v => !vIN(itr)(v);
    const vLT = a => v => v < a;
    const vGE = a => v => v >= a;
    const vLE = a => v => v <= a;
    const vBET = (a, b) => v => a <= v && v <= b;
    const vNBET = (a, b) => v => !vBET(a, b)(v);
    const vIsInstanceOf = x => v => v instanceof x;
    const $val = { vGT, vLT, vEQ, vNE, vGE, vIN, vNIN, vBET, vNBET, vIsInstanceOf };
    //----------------------------------
    const ensSy = sOrSy => isStr(sOrSy) ? splitSpc(sOrSy) : isSy(sOrSy) ? sOrSy : er('Given [syOrStr] is neither str nor sy', sOrSy);
    const ensRe = sOrRe => isRegExp(sOrRe) ? sOrRe : new RegExp(sOrRe);
    const $ens = { ensSy, ensRe };
    //----------------------------------
    const dmp = console.log;
    const halt = () => { throw new Error(); };
    const er = (msg, ...v) => {
        console.log(`\n-- error[${msg}] ------------------------\n`);
        each(dmp)(v);
        let isDbg = true;
        if (isDbg)
            debugger;
        else
            halt();
    };
    const $er = { dmp, halt, er };
    //-----------------------------------------------------------------------
    const split = (sep) => (s) => s.split(sep);
    const splitCrLf = split('\r\n');
    const splitLf = split('\n');
    const splitSpc = split(/\s+/);
    const splitCommaSpc = split(/,\s*/);
    const $sSplit = { split, splitCrLf, splitLf, splitSpc, splitCommaSpc };
    //-----------------------------------------------------------------------
    const ayFst = (ay) => ay[0];
    const aySnd = (ay) => ay[1];
    const ayLas = (ay) => ay[len(ay) - 1];
    const ayEle = (ix) => (ay) => ay[ix];
    const ayTfm = (f) => (ay) => { for (let i in ay)
        ay[i] = f(ay[i]); };
    const aySetEle = (ix) => v => (ay) => ay[ix] = v;
    const ayTfmEle = (ix) => (f) => (ay) => ay[ix] = f(ay[ix]);
    const $ay = {
        ayFst, ayLas, aySnd, ayEle, aySetEle, ayTfmEle
    };
    //-----------------------------------------------------------------------
    const jn = sep => ay => ay.join(sep);
    const jnCrLf = jn('\r\n');
    const jnLf = jn('\n');
    const jnSpc = jn(' ');
    const jnComma = jn(',');
    const jnCommaSpc = jn(', ');
    const $jn = { jn, jnCrLf, jnLf, jnSpc, jnComma, jnCommaSpc };
    //-----------------------------------------------------------------------
    const fstChr = (s) => s[0];
    const lasChr = (s) => s[s.length - 1];
    const addPfx = (pfx) => v => pfx + v;
    const addSfx = (sfx) => v => v + sfx;
    const addPfxSfx = (pfx, sfx) => v => pfx + v + sfx;
    const len = v => (v && v.length) || String(v).length;
    const midN = (pos) => (n) => (s) => s.substr(pos, n);
    const mid = (pos) => (s) => s.substr(pos);
    const left = (n) => (s) => s.substr(0, n);
    const trim = (s) => s.trim();
    const right = (n) => (s) => {
        const l = len(s);
        if (n >= l)
            return s;
        if (0 >= n)
            return '';
        return s.substr(-n);
    };
    const alignL = (w) => (s) => {
        const l = len(s);
        if (l > w)
            return s;
        return s + ' '.repeat(w - l);
    };
    const alignR = w => s => {
        const l = len(s);
        if (l > w)
            return s;
        return ' '.repeat(w - l) + s;
    };
    const sbsPos = (sbs) => (s) => s.search(sbs);
    const sbsRevPos = (sbs) => (s) => s.search(sbs);
    const cmlNm = (nm) => cmlNy(nm).reverse().join(' '); // @eg cmlNm(relItmNy) === 'Ny Itm rel'
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
            else
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
    const hasPfx = (pfx) => (s) => s.substr(0, pfx.length) === pfx;
    const rmvPfx = (pfx) => (s) => hasPfx(s) ? s.substr(pfx.length) : s;
    const hasSfx = (sfx) => (s) => right(sfx.length)(s) === sfx;
    const rmvSfx = (sfx) => (s) => hasSfx(s) ? s.substr(0, s.length - sfx.length) : s;
    const match = re => s => s.match(re);
    const notMatch = re => s => !(match(re)(s));
    //-----------------------------------------------------------------------
    const $str = {
        fstChr, lasChr, addPfx, addSfx, addPfxSfx,
        len, mid, midN, left, right, sbsPos, sbsRevPos,
        cmlNy, cmlNm,
        alignL, alignR,
        hasPfx, rmvPfx, hasSfx, rmvSfx,
        match, notMatch
    };
    //-----------------------------------------------------------
    const predsOr = (...p) => v => { for (let pp of p)
        if (pp(v))
            return true; return false; };
    const predsAnd = (...p) => v => { for (let pp of p)
        if (!pp(v))
            return false; return true; };
    const predNot = pred => itm => !pred(itm);
    const $pred = { predNot, predsAnd, predsOr };
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
    const $lin = { isRmkLin, isNonRmkLin, linRmvMsg };
    //------------------------------------------------------------------
    const brkAt = (at, len) => s => {
        const s1 = left(at)(s).trim();
        const s2 = mid(at + len)(s).trim();
        return { s1, s2 };
    };
    const brk1 = sep => s => { const at = sbsPos(sep)(s); return at === -1 ? { s1: trim(s), s2: '' } : brkAt(at, len(sep))(s); };
    const brk2 = sep => s => { const at = sbsPos(sep)(s); return at === -1 ? { s1: '', s2: trim(s) } : brkAt(at, len(sep))(s); };
    const brk = sep => s => { const at = sbsPos(sep)(s); return brkAt(at, len(sep))(s); };
    const $sBrk = { brkAt, brk1, brk2, brk };
    //-----------------------------------------------------------------------
    const takBef = sep => s => revBrk2(sep)(s).s1;
    const takAft = sep => s => revBrk1(sep)(s).s2;
    const $sTak = { takBef, takAft };
    //-----------------------------------------------------------------------
    const revBrk1 = sep => s => { const at = sbsPos(sep)(s); return at === -1 ? { s1: trim(s), s2: '' } : brkAt(at, len(sep))(s); };
    const revBrk2 = sep => s => { const at = sbsPos(sep)(s); return at === -1 ? { s1: '', s2: trim(s) } : brkAt(at, len(sep))(s); };
    const revBrk = sep => s => { const at = sbsRevPos(sep)(s); return brkAt(at, len(sep))(s); };
    const revTakBef = sep => s => revBrk2(sep)(s).s1;
    const revTakAft = sep => s => revBrk1(sep)(s).s2;
    const $sRev = {
        revBrk, revBrk1, revBrk2,
        revTakBef, revTakAft
    };
    //-----------------------------------------------------------------------
    const rmvFstChr = mid(1);
    const rmvLasChr = s => left(len(s) - 1)(s);
    const rmvSubStr = (sbs) => (s) => { const re = new RegExp(sbs, 'g'); return s.replace(re, ''); };
    const rmvColon = rmvSubStr(":");
    const $sRmv = { rmvFstChr, rmvLasChr, rmvSubStr, rmvColon };
    //-----------------------------------------------------------
    const pthSep = path.sep;
    const $fsPth = { pthSep };
    //-----------------------------------------------------------------------
    const ffnPth = (ffn) => { const at = sbsPos(pthSep)(ffn); return at === -1 ? "" : left(at + 1)(ffn); };
    const ffnFn = (ffn) => { const at = sbsPos(pthSep)(ffn); return at === -1 ? ffn : mid(at + 1)(ffn); };
    const ffnExt = (ffn) => { const at = sbsPos('.')(ffn); return at === -1 ? '' : mid(at)(ffn); };
    const rmvExt = (ffn) => { const at = sbsPos('.')(ffn); return at === -1 ? ffn : left(at)(ffn); };
    const ffnFnn = (ffn) => ffnFn(rmvExt(ffn));
    const $fsFfn = { ffnPth, ffnFn, ffnExt, rmvExt, ffnFnn };
    //-----------------------------------------------------------------------
    const ftLines = ft => (fs.readFileSync(ft).toString());
    const ftLy = ft => splitCrLf(ftLines(ft));
    const $fsFt = { ftLines, ftLy };
    //-----------------------------------------------------------------------
    const tmpNm = () => rmvColon(new Date().toJSON());
    const tmpPth = os.tmpdir + pthSep;
    const tmpFfn = (pfx = "", ext) => tmpPth + pfx + tmpNm() + ext;
    const tmpFt = () => tmpFfn("T", ".txt");
    /**
     * return a new temp file by copying {fm}
     * @param {ffn} fm
     */
    const tmpFilFm = fm => {
        const o = tmpFfn(undefined, ffnExt(fm));
        fs.copyFileSync(fm, o);
        return o;
    };
    const $fsTmp = { tmpNm, tmpPth, tmpFfn, tmpFt, tmpFilFm };
    //-----------------------------------------------------------------------
    /**
     * @description return a Promise of {er,rslt} by calling f(...,p,cb), where cb is (er,rslt)=>{...}
     * it is usefully in creating a promise by any async f(...p,cb), assuming cb is (er,rslt)=>{...}
     * @param {(er,rslt)=>void} f
     * @param {...any} p
     * @see
     */
    const pm = (f, ...p) => new Promise((rs, rj) => {
        f(...p, (er, rslt) => {
            // debugger
            rs({ er, rslt });
        });
    });
    const $pm = { pm };
    const ftLinesPm = async (ft) => await pm(fs.readFile, ft).then(({ er, rslt }) => { let lines = rslt.toString(); return { er, lines }; });
    const ftLyPm = async (ft) => await ftLinesPm(ft).then(({ er, lines }) => { return { er, ly: splitCrLf(lines) }; });
    const $fsPm = { ftLinesPm, ftLyPm };
    ftLyPm(__filename).then(s => {
        debugger;
    });
    //-----------------------------------------------------------------------
    const where = p => itr => { const o = []; for (let i of itr)
        if (p(i))
            o.push(i); return o; };
    const map = (f) => itr => { const o = []; for (let i of itr)
        o.push(f(i)); return o; };
    const each = f => itr => { for (let i of itr)
        f(i); };
    const fold = f => cum => itr => { for (let i of itr)
        cum = f(cum)(i); return cum; };
    const reduce = f => itr => fold(f)(itrFst(itr))(itr);
    const $itrOperation = {
        where, map, each, fold, reduce
    };
    //---------------------------------------------------------------------------
    const mapKy = mp => map(mp.keys());
    const mapVy = mp => itrAy(mp.values());
    const mapKvy = mp => itrAy(mp.entries());
    const mapKset = mp => new Set(mp.keys());
    const $map = { mapKy, mapVy, mapKvy, mapKset };
    //---------------------------------------------------------------------------
    const setAy = set => { const o = []; for (let i of set)
        o.push(i); return o; };
    const setWhere = p => set => {
        const z = new Set();
        for (let i of set)
            if (p(i))
                z.add(i);
        return z;
    };
    const setAdd = x => set => { for (let i of x)
        set.add(i); return set; };
    const setMinus = x => set => { for (let i of x)
        set.delete(i); return set; };
    const setAft_ = (incl, a, set) => {
        const z = new Set();
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
    const setAft = a => set => setAft_(false, a, set);
    const setAftIncl = a => set => setAft_(true, a, set);
    const setClone = set => itrSet(set);
    const itrSet = itr => { const o = new Set(); for (let i of itr)
        o.add(i); return o; };
    const setMap = f => set => { const o = new Set(); for (let i of set)
        o.add(f(i)); return o; };
    const $set = { setAft, setAftIncl, setMinus, setAdd, setAy, setWhere, setMap, setClone };
    //---------------------------------------------------------------------------
    const lyReDry = re => ly => map(matchDr)(lyMatchAy(re)(ly));
    const lyReCol = re => ly => matchAyFstCol(lyMatchAy(re)(ly)).sort();
    const matchAyDry = matchAy => map(matchDr)(matchAy);
    const matchAyFstCol = matchAy => map(ayEle(1))(matchAy);
    const lyMatchAy = re => ly => itrRmvEmp(map(match(re))(ly));
    const matchDr = match => [...match].splice(1);
    const lyConstNy = lyReCol(/^const\s+([$\w][$0-9\w_]*) /);
    const lyConstDollarNy = lyReCol(/^const (\$[$0-0\w_]*) /);
    const ftConstNy = ft => pipe(ft)(ftLy, lyConstNy);
    const ftConstDollarNy = ft => pipe(ft)(ftLy, lyConstDollarNy);
    const $src = { ftConstDollarNy, ftConstNy, lyReDry, lyReCol, lyMatchAy, lyConstNy };
    //---------------------------------------------------------------------------
    const isStr = v => typeof v === 'string';
    const isNum = v => typeof v === 'number';
    const isBool = v => typeof v === 'boolean';
    const isObj = v => typeof v === 'object';
    const isAy = Array.isArray;
    const isDte = vIsInstanceOf(Date);
    const isFun = vIsInstanceOf(Function);
    const isRe = v => vIsInstanceOf(RegExp);
    const isNonNull = v => v !== null;
    const isNull = v => v === null;
    const isUndefined = v => v === undefined;
    const isTrue = v => !!v;
    const isFalse = v => !!v;
    const isEmp = isFalse;
    const isNonEmp = isTrue;
    const isOdd = n => n % 2 === 1;
    const isEven = n => n % 2 === 0;
    const $is = {
        isFun, isStr, isNum, isDte, isBool,
        isNull, isUndefined, isNonNull,
        isOdd, isEven,
        isEmp, isNonEmp, isTrue, isFalse
    };
    //----------------------------------------------------------------------------
    const itrIsAllTrue = itr => { for (let i of itr)
        if (isFalse(i))
            return false; return true; };
    const itrIsAllFalse = itr => { for (let i of itr)
        if (isTrue(i))
            return false; return true; };
    const itrIsSomeTrue = itr => { for (let i of itr)
        if (isTrue(i))
            return true; return false; };
    const itrIsSomeFalse = itr => { for (let i of itr)
        if (isFalse(i))
            return true; return false; };
    const itrPredIsAllTrue = pred => itr => { for (let i of itr)
        if (!pred(i))
            return false; return true; };
    const itrPredIsAllFalse = pred => itr => { for (let i of itr)
        if (pred(i))
            return false; return true; };
    const itrPredIsSomeFalse = pred => itr => { for (let i of itr)
        if (!pred(i))
            return true; return false; };
    const itrPredIsSomeTrue = pred => itr => { for (let i of itr)
        if (pred(i))
            return true; return false; };
    const itrBrkForTrueFalse = pred => itr => { const t = [], f = []; for (let i of itr)
        pred(i) ? t.push(i) : f.push(i); return [t, f]; };
    const itrAy = itr => { const o = []; for (let i of itr)
        o.push(i); return o; };
    const itrFst = itr => { for (let i of itr)
        return i; };
    const itrAddPfxSfx = (pfx, sfx) => itr => map(addPfxSfx(pfx, sfx))(itr);
    const itrAddPfx = pfx => itr => map(addPfx(pfx))(itr);
    const itrAddSfx = sfx => itr => map(addSfx(sfx))(itr);
    const itrWdt = itr => pipe(map(len)(itr))(itrMax);
    const itrAlignL = itr => map(alignL(itrWdt(itr)))(itr);
    const itrClone = itr => map(i => i)(itr);
    const itrFind = pred => iter => { for (let i of iter)
        if (pred(i))
            return i; };
    const itrHasDup = itr => { const set = new Set(); for (let i of itr)
        if (set.has(i)) {
            return true;
        }
        else
            set.add(i); return false; };
    const itrMax = itr => { let o = itrFst(itr); for (let i of itr)
        if (i > o)
            o = i; return o; };
    const itrMin = itr => { let o = itrFst(itr); for (let i of itr)
        if (i < o)
            o = i; return o; };
    const itrRmvEmp = itr => where(isNonEmp)(itr);
    const $itr = {
        itrAy, itrMax, itrMin,
        itrHasDup, itrClone, itrFind, itrRmvEmp
    };
    //-----------------------------------------------------------------------------------------
    const must = (p, t) => v => { if (!p(v))
        er(`given v must be [${t}]`, { v }); };
    const mnon = (p, t) => v => { if (p(v))
        er(`given v must be non-[${t}]`, { v }); };
    const musFun = must(isFun, 'Function');
    const musNum = must(isNum, 'Number');
    const musStr = must(isStr, 'String');
    const musAy = must(isAy, 'Array');
    const musObj = must(isObj, 'Object');
    const musDte = must(isDte, 'Date');
    const mnonEmp = mnon(isEmp, 'Emp');
    const $must = {
        must, mnon,
        musFun, musNum, musStr, musAy, musDte,
        mnonEmp
    };
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
    const oCmlDry = o => {
        let oo = map(n => [cmlNm(n), n])(oPrpNy(o));
        drySrt(ayEle(0))(oo);
        const w = dryColWdt(0)(oo);
        const a = alignL(w);
        dryTfmCol(0)(a)(oo);
        return oo;
    };
    const oCtorNm = o => o && o.constructor && o.constructor.name;
    const oIsInstance = instance => o => o instanceof instance;
    const oHasCtorNm = nm => o => oCtorNm(o) === nm;
    /**
     * @description return the property value of object {o} by property path {pprPth}
     * @param {string} prpPth
     * @example
     * const a = {b: {c:{1}}
     * require('assert').equal(prp('b.c')(o), 1)
     */
    const oPrp = prpPth => o => { for (let nm of prpPth.split('.'))
        if (!(o = o[nm]))
            return undefined; return o; };
    const oPrpAy = prpNy => o => map(nm => oPrp(nm)(o))(prpNy);
    const oPrpNy = o => Object.getOwnPropertyNames(o);
    const oHasPrp = prpNm => o => { try {
        return o[prpNm] !== undefined;
    }
    catch (e) {
        return false;
    } };
    const oHasLen = oHasPrp('length');
    const oCmlObj = o => {
        const dry = oCmlDry(o);
        const oo = {};
        dry.forEach(([cmlNm, prpNm]) => oo[cmlNm] = o[prpNm]);
        return oo;
    };
    const $obj = {
        oPrp, oPrpAy, oPrpNy, oHasPrp, oHasLen,
        oBringUpDollarPrp, oCmlDry, oCtorNm, oHasCtorNm,
        oCmlObj
    };
    // ----------------------------------------------
    const dryColWdt = colIx => dry => itrWdt(dryCol(colIx)(dry));
    const dryColWdtAy = dry => map(i => dryColWdt(i)(dry))(nItr(dryColCnt(dry)));
    const dryCol = colIx => dry => {
        debugger;
        map(ayEle(colIx))(dry);
    };
    const dryColCnt = dry => itrMax(map(len)(dry));
    const dryTfmCell = f => dry => { each(ayTfm(f))(dry); };
    const dryClone = dry => map(dr => itrClone(dr))(dry);
    const dryTfmCol = colIx => f => dry => { each(ayTfmEle(colIx)(f)); };
    const drySrt = fun_of_dr_to_key => dry => dry.sort((dr_A, dr_B) => compare(fun_of_dr_to_key(dr_A), fun_of_dr_to_key(dr_B)));
    const $dry = { drySrt, dryTfmCell, dryTfmCol, dryColWdt, dryCol, dryColCnt, dryColWdtAy };
    //-----------------------------------------------------------------------
    const oyPrpCol = prpNm => oy => { const oo = []; for (let o of oy)
        oo.push(o[prpNm]); return oo; };
    const oyPrpDry = prpNy => oy => { const oo = []; for (let o of oy)
        oo.push(oPrpAy(prpNy)(o)); return oo; };
    const $oy = { oyPrpCol, oyPrpDry };
    //-------------------------------------
    const pipe = v => (...f) => { let o = v; for (let ff of f)
        o = ff(o); return o; };
    const apply = o => f => f(o);
    const swap = f => a => b => f(b)(a);
    const compose = (...f) => v => pipe(v)(...f);
    const $fun = { swap, pipe, compose, apply };
    //---------------------------------------
    const multiply = a => b => a * b;
    const divide = a => b => b / a;
    const add = a => b => a + b;
    const minus = a => b => b - a;
    const nDecr = minus(1);
    const nIncr = add(1);
    const nItr = function* (n) { for (let j = 0; j < n; j++)
        yield j; };
    const $num = { multiply, divide, add, minus, nDecr, nIncr };
    // -------------------------------------------------------------
    const compare = (a, b) => a === b ? 0 : a > b ? 1 : -1;
    const $operation = { compare };
    //---------------------------------------------------------------------------
    const lazy = vf => { let v, done = false; return () => { if (!done) {
        v = vf();
        done = true;
    } ; return v; }; };
    const $lazy = { lazy };
    //---------------------------------------------------------------------------
    const $ = {
        $lazy,
        $ay,
        $obj,
        $val,
        $er,
        $fsFfn,
        $fun,
        $is,
        $num,
        $oy,
        $pm,
        $fsPm,
        $fsPth,
        $sSplit,
        $str,
        $fsTmp,
        $sRmv,
        $sRev,
        $jn,
        $map,
        $set,
        $itr,
        $fsFt,
        $lin,
    };
    //------------------------------------------------------------------
    module.exports = oBringUpDollarPrp($);
    //pipe(__filename)(ftConstDollarNy,dmp)
})(curryfun || (curryfun = {}));
