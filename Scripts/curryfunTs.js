var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var curryfun;
(function (curryfun) {
    var _this = this;
    var fs = require('fs');
    var path = require('path');
    var os = require('os');
    //---------------------------------------
    var vEQ = function (a) { return function (v) { return a === v; }; };
    var vNE = function (a) { return function (v) { return a !== v; }; };
    var vGT = function (a) { return function (v) { return v > a; }; };
    var vIN = function (itr) { return function (v) { for (var _i = 0, itr_1 = itr; _i < itr_1.length; _i++) {
        var i = itr_1[_i];
        if (i === v)
            return true;
    } return false; }; };
    var vNIN = function (itr) { return function (v) { return !vIN(itr)(v); }; };
    var vLT = function (a) { return function (v) { return v < a; }; };
    var vGE = function (a) { return function (v) { return v >= a; }; };
    var vLE = function (a) { return function (v) { return v <= a; }; };
    var vBET = function (a, b) { return function (v) { return a <= v && v <= b; }; };
    var vNBET = function (a, b) { return function (v) { return !vBET(a, b)(v); }; };
    var vIsInstanceOf = function (x) { return function (v) { return v instanceof x; }; };
    var $val = { vGT: vGT, vLT: vLT, vEQ: vEQ, vNE: vNE, vGE: vGE, vIN: vIN, vNIN: vNIN, vBET: vBET, vNBET: vNBET, vIsInstanceOf: vIsInstanceOf };
    //----------------------------------
    var ensSy = function (sOrSy) { return isStr(sOrSy) ? splitSpc(sOrSy) : isSy(sOrSy) ? sOrSy : er('Given [syOrStr] is neither str nor sy', sOrSy); };
    var ensRe = function (sOrRe) { return isRegExp(sOrRe) ? sOrRe : new RegExp(sOrRe); };
    var $ens = { ensSy: ensSy, ensRe: ensRe };
    //----------------------------------
    var dmp = console.log;
    var halt = function () { throw new Error(); };
    var er = function (msg) {
        var v = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            v[_i - 1] = arguments[_i];
        }
        console.log("\n-- error[" + msg + "] ------------------------\n");
        each(dmp)(v);
        var isDbg = true;
        if (isDbg)
            debugger;
        else
            halt();
    };
    var $er = { dmp: dmp, halt: halt, er: er };
    //-----------------------------------------------------------------------
    var split = function (sep) { return function (s) { return s.split(sep); }; };
    var splitCrLf = split('\r\n');
    var splitLf = split('\n');
    var splitSpc = split(/\s+/);
    var splitCommaSpc = split(/,\s*/);
    var $sSplit = { split: split, splitCrLf: splitCrLf, splitLf: splitLf, splitSpc: splitSpc, splitCommaSpc: splitCommaSpc };
    //-----------------------------------------------------------------------
    var ayFst = function (ay) { return ay[0]; };
    var aySnd = function (ay) { return ay[1]; };
    var ayLas = function (ay) { return ay[len(ay) - 1]; };
    var ayEle = function (ix) { return function (ay) { return ay[ix]; }; };
    var ayTfm = function (f) { return function (ay) { for (var i in ay)
        ay[i] = f(ay[i]); }; };
    var aySetEle = function (ix) { return function (v) { return function (ay) { return ay[ix] = v; }; }; };
    var ayTfmEle = function (ix) { return function (f) { return function (ay) { return ay[ix] = f(ay[ix]); }; }; };
    var $ay = {
        ayFst: ayFst, ayLas: ayLas, aySnd: aySnd, ayEle: ayEle, aySetEle: aySetEle, ayTfmEle: ayTfmEle
    };
    //-----------------------------------------------------------------------
    var jn = function (sep) { return function (ay) { return ay.join(sep); }; };
    var jnCrLf = jn('\r\n');
    var jnLf = jn('\n');
    var jnSpc = jn(' ');
    var jnComma = jn(',');
    var jnCommaSpc = jn(', ');
    var $jn = { jn: jn, jnCrLf: jnCrLf, jnLf: jnLf, jnSpc: jnSpc, jnComma: jnComma, jnCommaSpc: jnCommaSpc };
    //-----------------------------------------------------------------------
    var fstChr = function (s) { return s[0]; };
    var lasChr = function (s) { return s[s.length - 1]; };
    var addPfx = function (pfx) { return function (v) { return pfx + v; }; };
    var addSfx = function (sfx) { return function (v) { return v + sfx; }; };
    var addPfxSfx = function (pfx, sfx) { return function (v) { return pfx + v + sfx; }; };
    var len = function (v) { return (v && v.length) || String(v).length; };
    var midN = function (pos) { return function (n) { return function (s) { return s.substr(pos, n); }; }; };
    var mid = function (pos) { return function (s) { return s.substr(pos); }; };
    var left = function (n) { return function (s) { return s.substr(0, n); }; };
    var trim = function (s) { return s.trim(); };
    var right = function (n) { return function (s) {
        var l = len(s);
        if (n >= l)
            return s;
        if (0 >= n)
            return '';
        return s.substr(-n);
    }; };
    var alignL = function (w) { return function (s) {
        var l = len(s);
        if (l > w)
            return s;
        return s + ' '.repeat(w - l);
    }; };
    var alignR = function (w) { return function (s) {
        var l = len(s);
        if (l > w)
            return s;
        return ' '.repeat(w - l) + s;
    }; };
    var sbsPos = function (sbs) { return function (s) { return s.search(sbs); }; };
    var sbsRevPos = function (sbs) { return function (s) { return s.search(sbs); }; };
    var cmlNm = function (nm) { return cmlNy(nm).reverse().join(' '); }; // @eg cmlNm(relItmNy) === 'Ny Itm rel'
    var cmlNy = function (nm) {
        var o = [];
        if (nm.trim() === '')
            return o;
        var j = 0;
        var brk = true;
        while (!brk) {
            if (j++ > 100) {
                debugger;
                throw null;
            }
            var i = pseg();
            if (i === '')
                return o;
            else
                o.push(i.trim());
        }
        return;
        function pseg() {
            var o = pchr();
            var j = 0;
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
            var o = nm[0];
            nm = rmvFstChr(nm);
            return o;
        }
    };
    var hasPfx = function (pfx) { return function (s) { return s.substr(0, pfx.length) === pfx; }; };
    var rmvPfx = function (pfx) { return function (s) { return hasPfx(s) ? s.substr(pfx.length) : s; }; };
    var hasSfx = function (sfx) { return function (s) { return right(sfx.length)(s) === sfx; }; };
    var rmvSfx = function (sfx) { return function (s) { return hasSfx(s) ? s.substr(0, s.length - sfx.length) : s; }; };
    var match = function (re) { return function (s) { return s.match(re); }; };
    var notMatch = function (re) { return function (s) { return !(match(re)(s)); }; };
    //-----------------------------------------------------------------------
    var $str = {
        fstChr: fstChr, lasChr: lasChr, addPfx: addPfx, addSfx: addSfx, addPfxSfx: addPfxSfx,
        len: len, mid: mid, midN: midN, left: left, right: right, sbsPos: sbsPos, sbsRevPos: sbsRevPos,
        cmlNy: cmlNy, cmlNm: cmlNm,
        alignL: alignL, alignR: alignR,
        hasPfx: hasPfx, rmvPfx: rmvPfx, hasSfx: hasSfx, rmvSfx: rmvSfx,
        match: match, notMatch: notMatch
    };
    //-----------------------------------------------------------
    var predsOr = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        return function (v) { for (var _i = 0, p_1 = p; _i < p_1.length; _i++) {
            var pp = p_1[_i];
            if (pp(v))
                return true;
        } return false; };
    };
    var predsAnd = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        return function (v) { for (var _i = 0, p_2 = p; _i < p_2.length; _i++) {
            var pp = p_2[_i];
            if (!pp(v))
                return false;
        } return true; };
    };
    var predNot = function (pred) { return function (itm) { return !pred(itm); }; };
    var $pred = { predNot: predNot, predsAnd: predsAnd, predsOr: predsOr };
    //-----------------------------------------------------------------------
    var isRmkLin = function (lin) {
        var l = lin.trim();
        if (l === "")
            return true;
        if (hasPfx("--")(l))
            return true;
        return false;
    };
    var isNonRmkLin = predNot(isRmkLin);
    var linRmvMsg = function (lin) {
        var a = lin.match(/(.*)---/);
        var b = a === null ? lin : a[1];
        if (hasPfx("^")(b.trimLeft()))
            return "";
        return b;
    };
    var $lin = { isRmkLin: isRmkLin, isNonRmkLin: isNonRmkLin, linRmvMsg: linRmvMsg };
    //------------------------------------------------------------------
    var brkAt = function (at, len) { return function (s) {
        var s1 = left(at)(s).trim();
        var s2 = mid(at + len)(s).trim();
        return { s1: s1, s2: s2 };
    }; };
    var brk1 = function (sep) { return function (s) { var at = sbsPos(sep)(s); return at === -1 ? { s1: trim(s), s2: '' } : brkAt(at, len(sep))(s); }; };
    var brk2 = function (sep) { return function (s) { var at = sbsPos(sep)(s); return at === -1 ? { s1: '', s2: trim(s) } : brkAt(at, len(sep))(s); }; };
    var brk = function (sep) { return function (s) { var at = sbsPos(sep)(s); return brkAt(at, len(sep))(s); }; };
    var $sBrk = { brkAt: brkAt, brk1: brk1, brk2: brk2, brk: brk };
    //-----------------------------------------------------------------------
    var takBef = function (sep) { return function (s) { return revBrk2(sep)(s).s1; }; };
    var takAft = function (sep) { return function (s) { return revBrk1(sep)(s).s2; }; };
    var $sTak = { takBef: takBef, takAft: takAft };
    //-----------------------------------------------------------------------
    var revBrk1 = function (sep) { return function (s) { var at = sbsPos(sep)(s); return at === -1 ? { s1: trim(s), s2: '' } : brkAt(at, len(sep))(s); }; };
    var revBrk2 = function (sep) { return function (s) { var at = sbsPos(sep)(s); return at === -1 ? { s1: '', s2: trim(s) } : brkAt(at, len(sep))(s); }; };
    var revBrk = function (sep) { return function (s) { var at = sbsRevPos(sep)(s); return brkAt(at, len(sep))(s); }; };
    var revTakBef = function (sep) { return function (s) { return revBrk2(sep)(s).s1; }; };
    var revTakAft = function (sep) { return function (s) { return revBrk1(sep)(s).s2; }; };
    var $sRev = {
        revBrk: revBrk, revBrk1: revBrk1, revBrk2: revBrk2,
        revTakBef: revTakBef, revTakAft: revTakAft
    };
    //-----------------------------------------------------------------------
    var rmvFstChr = mid(1);
    var rmvLasChr = function (s) { return left(len(s) - 1)(s); };
    var rmvSubStr = function (sbs) { return function (s) { var re = new RegExp(sbs, 'g'); return s.replace(re, ''); }; };
    var rmvColon = rmvSubStr(":");
    var $sRmv = { rmvFstChr: rmvFstChr, rmvLasChr: rmvLasChr, rmvSubStr: rmvSubStr, rmvColon: rmvColon };
    //-----------------------------------------------------------
    var pthSep = path.sep;
    var $fsPth = { pthSep: pthSep };
    //-----------------------------------------------------------------------
    var ffnPth = function (ffn) { var at = sbsPos(pthSep)(ffn); return at === -1 ? "" : left(at + 1)(ffn); };
    var ffnFn = function (ffn) { var at = sbsPos(pthSep)(ffn); return at === -1 ? ffn : mid(at + 1)(ffn); };
    var ffnExt = function (ffn) { var at = sbsPos('.')(ffn); return at === -1 ? '' : mid(at)(ffn); };
    var rmvExt = function (ffn) { var at = sbsPos('.')(ffn); return at === -1 ? ffn : left(at)(ffn); };
    var ffnFnn = function (ffn) { return ffnFn(rmvExt(ffn)); };
    var $fsFfn = { ffnPth: ffnPth, ffnFn: ffnFn, ffnExt: ffnExt, rmvExt: rmvExt, ffnFnn: ffnFnn };
    //-----------------------------------------------------------------------
    var ftLines = function (ft) { return (fs.readFileSync(ft).toString()); };
    var ftLy = function (ft) { return splitCrLf(ftLines(ft)); };
    var $fsFt = { ftLines: ftLines, ftLy: ftLy };
    //-----------------------------------------------------------------------
    var tmpNm = function () { return rmvColon(new Date().toJSON()); };
    var tmpPth = os.tmpdir + pthSep;
    var tmpFfn = function (pfx, ext) {
        if (pfx === void 0) { pfx = ""; }
        return tmpPth + pfx + tmpNm() + ext;
    };
    var tmpFt = function () { return tmpFfn("T", ".txt"); };
    /**
     * return a new temp file by copying {fm}
     * @param {ffn} fm
     */
    var tmpFilFm = function (fm) {
        var o = tmpFfn(undefined, ffnExt(fm));
        fs.copyFileSync(fm, o);
        return o;
    };
    var $fsTmp = { tmpNm: tmpNm, tmpPth: tmpPth, tmpFfn: tmpFfn, tmpFt: tmpFt, tmpFilFm: tmpFilFm };
    //-----------------------------------------------------------------------
    /**
     * @description return a Promise of {er,rslt} by calling f(...,p,cb), where cb is (er,rslt)=>{...}
     * it is usefully in creating a promise by any async f(...p,cb), assuming cb is (er,rslt)=>{...}
     * @param {(er,rslt)=>void} f
     * @param {...any} p
     * @see
     */
    var pm = function (f) {
        var p = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            p[_i - 1] = arguments[_i];
        }
        return new Promise(function (rs, rj) {
            f.apply(void 0, p.concat([function (er, rslt) {
                    // debugger
                    rs({ er: er, rslt: rslt });
                }]));
        });
    };
    var $pm = { pm: pm };
    var ftLinesPm = function (ft) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pm(fs.readFile, ft).then(function (_a) {
                    var er = _a.er, rslt = _a.rslt;
                    var lines = rslt.toString();
                    return { er: er, lines: lines };
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); };
    var ftLyPm = function (ft) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ftLinesPm(ft).then(function (_a) {
                    var er = _a.er, lines = _a.lines;
                    return { er: er, ly: splitCrLf(lines) };
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); };
    var $fsPm = { ftLinesPm: ftLinesPm, ftLyPm: ftLyPm };
    ftLyPm(__filename).then(function (s) {
        debugger;
    });
    //-----------------------------------------------------------------------
    var where = function (p) { return function (itr) { var o = []; for (var _i = 0, itr_2 = itr; _i < itr_2.length; _i++) {
        var i = itr_2[_i];
        if (p(i))
            o.push(i);
    } return o; }; };
    var map = function (f) { return function (itr) { var o = []; for (var _i = 0, itr_3 = itr; _i < itr_3.length; _i++) {
        var i = itr_3[_i];
        o.push(f(i));
    } return o; }; };
    var each = function (f) { return function (itr) { for (var _i = 0, itr_4 = itr; _i < itr_4.length; _i++) {
        var i = itr_4[_i];
        f(i);
    } }; };
    var fold = function (f) { return function (cum) { return function (itr) { for (var _i = 0, itr_5 = itr; _i < itr_5.length; _i++) {
        var i = itr_5[_i];
        cum = f(cum)(i);
    } return cum; }; }; };
    var reduce = function (f) { return function (itr) { return fold(f)(itrFst(itr))(itr); }; };
    var $itrOperation = {
        where: where, map: map, each: each, fold: fold, reduce: reduce
    };
    //---------------------------------------------------------------------------
    var mapKy = function (mp) { return map(mp.keys()); };
    var mapVy = function (mp) { return itrAy(mp.values()); };
    var mapKvy = function (mp) { return itrAy(mp.entries()); };
    var mapKset = function (mp) { return new Set(mp.keys()); };
    var $map = { mapKy: mapKy, mapVy: mapVy, mapKvy: mapKvy, mapKset: mapKset };
    //---------------------------------------------------------------------------
    var setAy = function (set) { var o = []; for (var _i = 0, set_1 = set; _i < set_1.length; _i++) {
        var i = set_1[_i];
        o.push(i);
    } return o; };
    var setWhere = function (p) { return function (set) {
        var z = new Set;
        for (var _i = 0, set_2 = set; _i < set_2.length; _i++) {
            var i = set_2[_i];
            if (p(i))
                z.add(i);
        }
        return z;
    }; };
    var setAdd = function (x) { return function (set) { for (var _i = 0, x_1 = x; _i < x_1.length; _i++) {
        var i = x_1[_i];
        set.add(i);
    } return set; }; };
    var setMinus = function (x) { return function (set) { for (var _i = 0, x_2 = x; _i < x_2.length; _i++) {
        var i = x_2[_i];
        set["delete"](i);
    } return set; }; };
    var setAft_ = function (incl, a, set) {
        var z = new Set;
        var found = false;
        for (var _i = 0, set_3 = set; _i < set_3.length; _i++) {
            var i = set_3[_i];
            if (found)
                z.add(i);
            else {
                if (a === i) {
                    found = true;
                    if (incl)
                        z.add(a);
                }
            }
        }
        return z;
    };
    var setAft = function (a) { return function (set) { return setAft_(false, a, set); }; };
    var setAftIncl = function (a) { return function (set) { return setAft_(true, a, set); }; };
    var setClone = function (set) { return itrSet(set); };
    var itrSet = function (itr) { var o = new Set; for (var _i = 0, itr_6 = itr; _i < itr_6.length; _i++) {
        var i = itr_6[_i];
        o.add(i);
    } return o; };
    var setMap = function (f) { return function (set) { var o = new Set; for (var _i = 0, set_4 = set; _i < set_4.length; _i++) {
        var i = set_4[_i];
        o.add(f(i));
    } return o; }; };
    var $set = { setAft: setAft, setAftIncl: setAftIncl, setMinus: setMinus, setAdd: setAdd, setAy: setAy, setWhere: setWhere, setMap: setMap, setClone: setClone };
    //---------------------------------------------------------------------------
    var lyReDry = function (re) { return function (ly) { return map(matchDr)(lyMatchAy(re)(ly)); }; };
    var lyReCol = function (re) { return function (ly) { return matchAyFstCol(lyMatchAy(re)(ly)).sort(); }; };
    var matchAyDry = function (matchAy) { return map(matchDr)(matchAy); };
    var matchAyFstCol = function (matchAy) { return map(ayEle(1))(matchAy); };
    var lyMatchAy = function (re) { return function (ly) { return itrRmvEmp(map(match(re))(ly)); }; };
    var matchDr = function (match) { return match.slice().splice(1); };
    var lyConstNy = lyReCol(/^const\s+([$\w][$0-9\w_]*) /);
    var lyConstDollarNy = lyReCol(/^const (\$[$0-0\w_]*) /);
    var ftConstNy = function (ft) { return pipe(ft)(ftLy, lyConstNy); };
    var ftConstDollarNy = function (ft) { return pipe(ft)(ftLy, lyConstDollarNy); };
    var $src = { ftConstDollarNy: ftConstDollarNy, ftConstNy: ftConstNy, lyReDry: lyReDry, lyReCol: lyReCol, lyMatchAy: lyMatchAy, lyConstNy: lyConstNy };
    //---------------------------------------------------------------------------
    var isStr = function (v) { return typeof v === 'string'; };
    var isNum = function (v) { return typeof v === 'number'; };
    var isBool = function (v) { return typeof v === 'boolean'; };
    var isObj = function (v) { return typeof v === 'object'; };
    var isAy = Array.isArray;
    var isDte = vIsInstanceOf(Date);
    var isFun = vIsInstanceOf(Function);
    var isRe = function (v) { return vIsInstanceOf(RegExp); };
    var isNonNull = function (v) { return v !== null; };
    var isNull = function (v) { return v === null; };
    var isUndefined = function (v) { return v === undefined; };
    var isTrue = function (v) { return !!v; };
    var isFalse = function (v) { return !!v; };
    var isEmp = isFalse;
    var isNonEmp = isTrue;
    var isOdd = function (n) { return n % 2 === 1; };
    var isEven = function (n) { return n % 2 === 0; };
    var $is = {
        isFun: isFun, isStr: isStr, isNum: isNum, isDte: isDte, isBool: isBool,
        isNull: isNull, isUndefined: isUndefined, isNonNull: isNonNull,
        isOdd: isOdd, isEven: isEven,
        isEmp: isEmp, isNonEmp: isNonEmp, isTrue: isTrue, isFalse: isFalse
    };
    //----------------------------------------------------------------------------
    var itrIsAllTrue = function (itr) { for (var _i = 0, itr_7 = itr; _i < itr_7.length; _i++) {
        var i = itr_7[_i];
        if (isFalse(i))
            return false;
    } return true; };
    var itrIsAllFalse = function (itr) { for (var _i = 0, itr_8 = itr; _i < itr_8.length; _i++) {
        var i = itr_8[_i];
        if (isTrue(i))
            return false;
    } return true; };
    var itrIsSomeTrue = function (itr) { for (var _i = 0, itr_9 = itr; _i < itr_9.length; _i++) {
        var i = itr_9[_i];
        if (isTrue(i))
            return true;
    } return false; };
    var itrIsSomeFalse = function (itr) { for (var _i = 0, itr_10 = itr; _i < itr_10.length; _i++) {
        var i = itr_10[_i];
        if (isFalse(i))
            return true;
    } return false; };
    var itrPredIsAllTrue = function (pred) { return function (itr) { for (var _i = 0, itr_11 = itr; _i < itr_11.length; _i++) {
        var i = itr_11[_i];
        if (!pred(i))
            return false;
    } return true; }; };
    var itrPredIsAllFalse = function (pred) { return function (itr) { for (var _i = 0, itr_12 = itr; _i < itr_12.length; _i++) {
        var i = itr_12[_i];
        if (pred(i))
            return false;
    } return true; }; };
    var itrPredIsSomeFalse = function (pred) { return function (itr) { for (var _i = 0, itr_13 = itr; _i < itr_13.length; _i++) {
        var i = itr_13[_i];
        if (!pred(i))
            return true;
    } return false; }; };
    var itrPredIsSomeTrue = function (pred) { return function (itr) { for (var _i = 0, itr_14 = itr; _i < itr_14.length; _i++) {
        var i = itr_14[_i];
        if (pred(i))
            return true;
    } return false; }; };
    var itrBrkForTrueFalse = function (pred) { return function (itr) { var t = [], f = []; for (var _i = 0, itr_15 = itr; _i < itr_15.length; _i++) {
        var i = itr_15[_i];
        pred(i) ? t.push(i) : f.push(i);
    } return [t, f]; }; };
    var itrAy = function (itr) { var o = []; for (var _i = 0, itr_16 = itr; _i < itr_16.length; _i++) {
        var i = itr_16[_i];
        o.push(i);
    } return o; };
    var itrFst = function (itr) { for (var _i = 0, itr_17 = itr; _i < itr_17.length; _i++) {
        var i = itr_17[_i];
        return i;
    } };
    var itrAddPfxSfx = function (pfx, sfx) { return function (itr) { return map(addPfxSfx(pfx, sfx))(itr); }; };
    var itrAddPfx = function (pfx) { return function (itr) { return map(addPfx(pfx))(itr); }; };
    var itrAddSfx = function (sfx) { return function (itr) { return map(addSfx(sfx))(itr); }; };
    var itrWdt = function (itr) { return pipe(map(len)(itr))(itrMax); };
    var itrAlignL = function (itr) { return map(alignL(itrWdt(itr)))(itr); };
    var itrClone = function (itr) { return map(function (i) { return i; })(itr); };
    var itrFind = function (pred) { return function (iter) { for (var _i = 0, iter_1 = iter; _i < iter_1.length; _i++) {
        var i = iter_1[_i];
        if (pred(i))
            return i;
    } }; };
    var itrHasDup = function (itr) { var set = new Set(); for (var _i = 0, itr_18 = itr; _i < itr_18.length; _i++) {
        var i = itr_18[_i];
        if (set.has(i)) {
            return true;
        }
        else
            set.add(i);
    } return false; };
    var itrMax = function (itr) { var o = itrFst(itr); for (var _i = 0, itr_19 = itr; _i < itr_19.length; _i++) {
        var i = itr_19[_i];
        if (i > o)
            o = i;
    } return o; };
    var itrMin = function (itr) { var o = itrFst(itr); for (var _i = 0, itr_20 = itr; _i < itr_20.length; _i++) {
        var i = itr_20[_i];
        if (i < o)
            o = i;
    } return o; };
    var itrRmvEmp = function (itr) { return where(isNonEmp)(itr); };
    var $itr = {
        itrAy: itrAy, itrMax: itrMax, itrMin: itrMin,
        itrHasDup: itrHasDup, itrClone: itrClone, itrFind: itrFind, itrRmvEmp: itrRmvEmp
    };
    //-----------------------------------------------------------------------------------------
    var must = function (p, t) { return function (v) { if (!p(v))
        er("given v must be [" + t + "]", { v: v }); }; };
    var mnon = function (p, t) { return function (v) { if (p(v))
        er("given v must be non-[" + t + "]", { v: v }); }; };
    var musFun = must(isFun, 'Function');
    var musNum = must(isNum, 'Number');
    var musStr = must(isStr, 'String');
    var musAy = must(isAy, 'Array');
    var musObj = must(isObj, 'Object');
    var musDte = must(isDte, 'Date');
    var mnonEmp = mnon(isEmp, 'Emp');
    var $must = {
        must: must, mnon: mnon,
        musFun: musFun, musNum: musNum, musStr: musStr, musAy: musAy, musDte: musDte,
        mnonEmp: mnonEmp
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
    var oBringUpDollarPrp = function (o) {
        musObj(o);
        for (var chdNm in o) {
            var chd = o[chdNm];
            for (var chdMbrNm in chd) {
                if (oHasPrp(chdMbrNm)(o))
                    er("{chdMbrNm} of {chd} exists in {o}", { chdMbrNm: chdMbrNm, chd: chd, o: o });
                o[chdMbrNm] = chd[chdMbrNm];
            }
        }
        return o;
    };
    var oCmlDry = function (o) {
        var oo = map(function (n) { return [cmlNm(n), n]; })(oPrpNy(o));
        drySrt(ayEle(0))(oo);
        var w = dryColWdt(0)(oo);
        var a = alignL(w);
        dryTfmCol(0)(a)(oo);
        return oo;
    };
    var oCtorNm = function (o) { return o && o.constructor && o.constructor.name; };
    var oIsInstance = function (instance) { return function (o) { return o instanceof instance; }; };
    var oHasCtorNm = function (nm) { return function (o) { return oCtorNm(o) === nm; }; };
    /**
     * @description return the property value of object {o} by property path {pprPth}
     * @param {string} prpPth
     * @example
     * const a = {b: {c:{1}}
     * require('assert').equal(prp('b.c')(o), 1)
     */
    var oPrp = function (prpPth) { return function (o) { for (var _i = 0, _a = prpPth.split('.'); _i < _a.length; _i++) {
        var nm = _a[_i];
        if (!(o = o[nm]))
            return undefined;
    } return o; }; };
    var oPrpAy = function (prpNy) { return function (o) { return map(function (nm) { return oPrp(nm)(o); })(prpNy); }; };
    var oPrpNy = function (o) { return Object.getOwnPropertyNames(o); };
    var oHasPrp = function (prpNm) { return function (o) { try {
        return o[prpNm] !== undefined;
    }
    catch (e) {
        return false;
    } }; };
    var oHasLen = oHasPrp('length');
    var oCmlObj = function (o) {
        var dry = oCmlDry(o);
        var oo = {};
        dry.forEach(function (_a) {
            var cmlNm = _a[0], prpNm = _a[1];
            return oo[cmlNm] = o[prpNm];
        });
        return oo;
    };
    var $obj = {
        oPrp: oPrp, oPrpAy: oPrpAy, oPrpNy: oPrpNy, oHasPrp: oHasPrp, oHasLen: oHasLen,
        oBringUpDollarPrp: oBringUpDollarPrp, oCmlDry: oCmlDry, oCtorNm: oCtorNm, oHasCtorNm: oHasCtorNm,
        oCmlObj: oCmlObj
    };
    // ----------------------------------------------
    var dryColWdt = function (colIx) { return function (dry) { return itrWdt(dryCol(colIx)(dry)); }; };
    var dryColWdtAy = function (dry) { return map(function (i) { return dryColWdt(i)(dry); })(nItr(dryColCnt(dry))); };
    var dryCol = function (colIx) { return function (dry) {
        debugger;
        map(ayEle(colIx))(dry);
    }; };
    var dryColCnt = function (dry) { return itrMax(map(len)(dry)); };
    var dryTfmCell = function (f) { return function (dry) { each(ayTfm(f))(dry); }; };
    var dryClone = function (dry) { return map(function (dr) { return itrClone(dr); })(dry); };
    var dryTfmCol = function (colIx) { return function (f) { return function (dry) { each(ayTfmEle(colIx)(f)); }; }; };
    var drySrt = function (fun_of_dr_to_key) { return function (dry) { return dry.sort(function (dr_A, dr_B) { return compare(fun_of_dr_to_key(dr_A), fun_of_dr_to_key(dr_B)); }); }; };
    var $dry = { drySrt: drySrt, dryTfmCell: dryTfmCell, dryTfmCol: dryTfmCol, dryColWdt: dryColWdt, dryCol: dryCol, dryColCnt: dryColCnt, dryColWdtAy: dryColWdtAy };
    //-----------------------------------------------------------------------
    var oyPrpCol = function (prpNm) { return function (oy) { var oo = []; for (var _i = 0, oy_1 = oy; _i < oy_1.length; _i++) {
        var o = oy_1[_i];
        oo.push(o[prpNm]);
    } return oo; }; };
    var oyPrpDry = function (prpNy) { return function (oy) { var oo = []; for (var _i = 0, oy_2 = oy; _i < oy_2.length; _i++) {
        var o = oy_2[_i];
        oo.push(oPrpAy(prpNy)(o));
    } return oo; }; };
    var $oy = { oyPrpCol: oyPrpCol, oyPrpDry: oyPrpDry };
    //-------------------------------------
    var pipe = function (v) { return function () {
        var f = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            f[_i] = arguments[_i];
        }
        var o = v;
        for (var _a = 0, f_1 = f; _a < f_1.length; _a++) {
            var ff = f_1[_a];
            o = ff(o);
        }
        return o;
    }; };
    var apply = function (o) { return function (f) { return f(o); }; };
    var swap = function (f) { return function (a) { return function (b) { return f(b)(a); }; }; };
    var compose = function () {
        var f = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            f[_i] = arguments[_i];
        }
        return function (v) { return pipe(v).apply(void 0, f); };
    };
    var $fun = { swap: swap, pipe: pipe, compose: compose, apply: apply };
    //---------------------------------------
    var multiply = function (a) { return function (b) { return a * b; }; };
    var divide = function (a) { return function (b) { return b / a; }; };
    var add = function (a) { return function (b) { return a + b; }; };
    var minus = function (a) { return function (b) { return b - a; }; };
    var nDecr = minus(1);
    var nIncr = add(1);
    var nItr = function (n) { var j; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                j = 0;
                _a.label = 1;
            case 1:
                if (!(j < n)) return [3 /*break*/, 4];
                return [4 /*yield*/, j];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                j++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    }); };
    var $num = { multiply: multiply, divide: divide, add: add, minus: minus, nDecr: nDecr, nIncr: nIncr };
    // -------------------------------------------------------------
    var compare = function (a, b) { return a === b ? 0 : a > b ? 1 : -1; };
    var $operation = { compare: compare };
    //---------------------------------------------------------------------------
    var lazy = function (vf) { var v, done = false; return function () { if (!done) {
        v = vf();
        done = true;
    } ; return v; }; };
    var $lazy = { lazy: lazy };
    //---------------------------------------------------------------------------
    var $ = {
        $lazy: $lazy,
        $ay: $ay,
        $obj: $obj,
        $val: $val,
        $er: $er,
        $fsFfn: $fsFfn,
        $fun: $fun,
        $is: $is,
        $num: $num,
        $oy: $oy,
        $pm: $pm,
        $fsPm: $fsPm,
        $fsPth: $fsPth,
        $sSplit: $sSplit,
        $str: $str,
        $fsTmp: $fsTmp,
        $sRmv: $sRmv,
        $sRev: $sRev,
        $jn: $jn,
        $map: $map,
        $set: $set,
        $itr: $itr,
        $fsFt: $fsFt,
        $lin: $lin
    };
    //------------------------------------------------------------------
    module.exports = oBringUpDollarPrp($);
    //pipe(__filename)(ftConstDollarNy,dmp)
})(curryfun || (curryfun = {}));
