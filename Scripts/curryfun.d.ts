/// <reference path="typings/node/node.d.ts" />
export interface drs {
    dry: dry;
    fny: fny;
}
export interface p123 {
    p1: s;
    p2: s;
    p3: s;
}
export interface s1s2 {
    s1: s;
    s2: s;
}
export interface tf<T> {
    t: T[];
    f: T[];
}
export interface ks {
    k: s;
    s: s;
}
export interface linShift {
    term: s;
    remainLin: s;
}
export interface quote {
    q1: s;
    q2: s;
}
export declare type match = RegExpMatchArray;
export declare type lin = s;
export declare type re = RegExp;
export declare type n = number;
export declare type ft = s;
export declare type fn = s;
export declare type b = boolean;
export declare type dr = ay;
export declare type lines = s;
export declare type o = object;
export declare type quoteStr = s;
export declare type k = s;
export declare type pfx = s;
export declare type cml = s;
export declare type nm = s;
export declare type wdt = n;
export declare type cnt = n;
export declare type ix = n;
export declare type s = string;
export declare type pth = s;
export declare type cummulator<T> = (cum: T) => (itm) => T;
export declare type pred<T> = (a: T) => b;
export declare type opt<T> = T | null;
export declare type fun<T> = (x: T) => any;
export declare type Itr<T> = Iterable<T>;
export declare type dry = Array<dr>;
export declare type sdic = Map<s, s>;
export declare type set = Set<any>;
export declare type sset = Set<s>;
export declare type bdic = Map<s, b>;
export declare type ly = s[];
export declare type col = any[];
export declare type scol = s[];
export declare type sy = s[];
export declare type Sdry = s[][];
export declare type sPred = pred<s>;
export declare type ay = Array<any>;
export declare type fny = nm[];
export declare type sdry = s[][];
export declare type sdr = s[];
export declare type itr = Itr<any>;
export declare type p = (a: any) => boolean;
export declare type f = (a: any) => any;
export declare type sOrRe = s | re;
export declare type sOrSy = s | s[];
export declare type strOpt = string | null;
export declare type doFun = () => void;
export declare type _sP123 = (quoteStr: quoteStr) => (a: s) => p123 | null;
export declare type _drsLines = (a: drs) => lines;
export declare type _dryLines = (a: dry) => lines;
export declare type _dryLy = (a: dry) => ly;
export declare type _drySdry = (a: dry) => sdry;
export declare type _aySy = (a: ay) => sy;
export declare type _wdtAyLin = (a: wdt[]) => lin;
export declare type _sdrLin = (w: wdt[]) => (a: sdr) => lin;
export declare type _lySdic = (a: ly) => sdic;
export declare type _linKs = (a: lin) => ks;
export declare type _itrFold = <T>(f: cummulator<T>) => (cum: T) => (a: Itr<T>) => T;
export declare type _oDry = (a: o) => dry;
export declare type _itrTfmSet = (f: f) => (s: itr) => set;
export declare type _itrItm = <T>(a: Itr<T>) => T | null;
export declare type _itrPred = (a: itr) => b;
export declare type _itrSet = (a: itr) => set;
export declare type _matchAyDry = (a: RegExpMatchArray) => dry;
export declare type _lyHasMajPfx = (pfx: s) => (a: ly) => b;
export declare type _matchAyCol = (a: match[]) => scol;
export declare type _matchFstItm = (a: match) => s;
export declare type _itrAy = <T>(a: Itr<T>) => T[];
export declare type _linShift = (a: lin) => linShift;
export declare type _lyPfxCnt = (pfx: s) => (a: ly) => cnt;
export declare type _ffnDo = (a: s) => void;
export declare type _optMap = <T>(f: fun<T>) => (a: opt<T>) => any;
export declare type _itrSplit<T> = (p: pred<T>) => (a: Itr<T>) => tf<T>;
export declare type _vMap = (f: f) => (a) => any;
export declare type _fApply = <T>(v: T) => (f: (x: T) => any) => any;
export declare type _ksLin = (a: ks) => lin;
export declare type _sdicSy = (a: sdic) => sy;
export declare type _nPadZero = (dig: n) => (a: n) => s;
export declare type _er = (msg: s, ...v: any[]) => void;
export declare type _vXPred = (x) => (a) => b;
export declare type _tfm<T> = (a: T) => T;
export declare type _sTfm = _tfm<s>;
export declare type _sStrTfm = (s: s) => (a: s) => s;
export declare type _sQuote = (q: quoteStr) => (a: s) => s;
export declare type _sNTfm = (n: n) => (a: s) => s;
export declare type _vLen = (a) => n;
export declare type _sLen = (a: s) => n;
export declare type _sMid = (pos: n) => (s: s) => s;
export declare type _sMidN = (pos: n) => (n: n) => (s: s) => s;
export declare type _sAlign = (w: n) => (a: s) => s;
export declare type _predsPred = <T>(...a: ((v: T) => b)[]) => (v: T) => b;
export declare type _oPrpNy = (a: o) => nm[];
export declare type _oPrp = (prpPth: s) => (a: o) => any;
export declare type _oPrpAy = (prpNy: s[]) => (a: o) => any[];
export declare type _oHasPrp = (prpNm: nm) => (a: o) => b;
export declare type _oCmlObj = (a: o) => o;
export declare type _predTfm = <T>(a: pred<T>) => pred<T>;
export declare type _sBrkAt = (at: n, len: n) => (a: s) => s1s2;
export declare type _dryFunMdy = (f: f) => (a: dry) => void;
export declare type _dryColMdy = (colIx: n) => (f: f) => (a: dry) => void;
export declare type _dryTfm = (a: dry) => dry;
export declare type _dryCellMdy = (f: f) => (a: dry) => void;
export declare type _dryCnt = (a: dry) => cnt;
export declare type _sdryWdtAy = (a: sdry) => wdt[];
export declare type _sdryWdt = (colIx: n) => (a: sdry) => wdt;
export declare type _drySrt = (f: (a: dr) => s) => (a: dry) => void;
export declare type _sPred = (lik: s) => (s: s) => b;
export declare type _sSbsPred = (sbs: s) => (s: s) => b;
export declare type _itrFind = <T>(p: pred<T>) => (a: Itr<T>) => T | null;
export declare type _dryCol = (colIx: n) => (a: dry) => col;
export declare type _ayMdyEle = <T>(ix: n) => (f: fun<T>) => (a: T[]) => void;
export declare type _aySetEle = <T>(ix: n) => (v: T) => (a: T[]) => void;
export declare type _itrSy = (a: itr) => s[];
export declare type _itrN = (a: itr) => n;
export declare type _sitrN = (a: Itr<s>) => n;
export declare type _lyMatchAy = (re: RegExp) => (a: ly) => RegExpMatchArray[];
export declare type _lyReCol = (re: re) => (ly: ly) => col;
export declare type _lyReSdry = (re: re) => (ly: ly) => Sdry;
export declare type _sDo = (a: s) => void;
export declare type _cmdDo = (a: s) => void;
export declare type _pipe = (v) => (...f: f[]) => any;
export declare type _compose = (...f: f[]) => f;
export declare type _do = (a: doFun) => void;
export declare type _halt = () => never;
export declare type _mkStr = () => s;
export declare type _Er = (msg: s, ...v: ay) => void;
export declare type _lyStrOpt = (a: ly) => strOpt;
export declare type _ftDo = (a: ft) => void;
export declare type _vDft = <T>(dft: T) => (v: T | undefined | null) => T;
export declare type _vDftRge = <T>(a: T, b: T) => (v: T | undefined | null) => T;
export declare type _ayFindIx = (p: p) => (a: ay) => number | null;
export declare type _ayFindIxDft = (dftIx: n) => (p: p) => (a: ay) => number;
export declare type _ayItm = <T>(a: T[]) => T;
export declare type _ayEle = <T>(ix: n) => (a: T[]) => T;
export declare type _ayEleOrDft = <T>(dft: T) => (ix: n) => (a: T[]) => T;
export declare type _ayMdy = (f: f) => (a: ay) => void;
export declare type _sBrk = (sep: s) => (a: s) => s1s2;
export declare type _sLik = (slik: s) => (a: s) => b;
export declare type _sHasSbs = (sbs: s) => (a: s) => b;
export declare type _sTak = (sep: s) => (s: s) => s;
export declare type _ensSy = (sOrSy: sOrSy) => sy;
export declare type _ensRe = (sOrRe: sOrRe) => re;
export declare type _split<T> = (sep) => (a: T) => T[];
export declare type _sSplit = _split<s>;
export declare type _ftWrt = (s: s) => (a: ft) => void;
export declare type _vTee = <T>(f: (a: T) => void) => (a: T) => T;
export declare type _vCmp = <T>(x: T) => (a: T) => b;
export declare type _vBet = <T>(x: T, y: T) => (a: T) => b;
export declare type _vIn = <T>(itr: Itr<T>) => (a: T) => b;
export declare type _vCmpO = (o) => (v) => b;
export declare const strictEqual: any;
export declare const eq: (exp: any, act: any) => void;
export declare const vLT: _vCmp;
export declare const vGE: _vCmp;
export declare const vLE: _vCmp;
export declare const vEQ: _vCmp;
export declare const vNE: _vCmp;
export declare const vGT: _vCmp;
export declare const vIN: _vIn;
export declare const vNIN: _vIn;
export declare const vBET: _vBet;
export declare const vNBET: _vBet;
export declare const vIsInstanceOf: _vXPred;
export declare const ensSy: _ensSy;
export declare const ensRe: _ensRe;
export declare const pipe: _pipe;
export declare const vMap: _vMap;
export declare const fApply: _fApply;
export declare const swap: (f: f) => (a: any) => (b: any) => any;
export declare const compose: _compose;
export declare const sdicSy: _sdicSy;
export declare const ksLin: _ksLin;
export declare const dmp: any;
export declare const funDmp: _do;
export declare const halt: _halt;
export declare const sEscLf: _sTfm;
export declare const sEscCr: _sTfm;
export declare const sEscTab: _sTfm;
export declare const sEsc: _sTfm;
export declare const sBox: _sTfm;
export declare const stack: _mkStr;
export declare const er: _er;
export declare const sSplit: _sSplit;
export declare const sSplitCrLf: (a: string) => string[];
export declare const sSplitLf: (a: string) => string[];
export declare const sSplitSpc: (a: string) => string[];
export declare const sSplitCommaSpc: (a: string) => string[];
export declare const vDft: _vDft;
export declare const vDftStr: (v: string | null | undefined) => string;
export declare const vDftUpper: _vDftRge;
export declare const vDftLower: _vDftRge;
export declare const ayFindIx: _ayFindIx;
export declare const ayFindIxOrDft: (dftIx: any) => (p: any) => (a: any) => any;
export declare const ayFst: _ayItm;
export declare const aySnd: _ayItm;
export declare const ayEle: _ayEle;
export declare const ayEleOrDft: _ayEleOrDft;
export declare const ayLas: _ayItm;
export declare const ayTfm: _ayMdy;
export declare const aySetEle: _aySetEle;
export declare const ayTfmEle: _ayMdyEle;
export declare const ayJn: (sep?: string | undefined) => (a: any[]) => string;
export declare const ayJnCrLf: (a: any[]) => string;
export declare const ayJnLf: (a: any[]) => string;
export declare const ayJnSpc: (a: any[]) => string;
export declare const ayJnComma: (a: any[]) => string;
export declare const ayJnCommaSpc: (a: any[]) => string;
export declare const nSpc: (a: number) => string;
export declare const ayJnAsLines: (sep0?: string | undefined, tab0?: number | undefined, wdt0?: number | undefined) => (a: any[]) => string;
export declare const sFstChr: _sTfm;
export declare const sLasChr: _sTfm;
export declare const sAddPfx: (pfx: string) => (a: string) => string;
export declare const sAddSfx: (sfx: string) => (a: any) => string;
export declare const sAddPfxSfx: (pfx: string, sfx: string) => (a: string) => string;
export declare const vLen: _vLen;
export declare const sLen: _sLen;
export declare const sMidN: _sMidN;
export declare const sMid: _sMid;
export declare const sLeft: _sNTfm;
export declare const sTrim: _sTfm;
export declare const sRight: _sNTfm;
export declare const nPadZero: _nPadZero;
export declare const sAlignL: _sAlign;
export declare const sAlignR: _sAlign;
export declare const sWrt: (ft: any) => (a: any) => void;
export declare const sSbsPos: (sbs: string) => (a: string) => number;
export declare const sSbsRevPos: (sbs: string) => (a: string) => number;
export declare const cmlNm: (a: string) => string;
export declare const cmlNy: (a: string) => string[];
export declare const sHasPfx: (pfx: string) => (a: string) => boolean;
export declare const sRmvPfx: (pfx: string) => (a: string) => string;
export declare const sHasSfx: (sfx: string) => (a: string) => boolean;
export declare const sRmvSfx: (sfx: string) => (a: string) => string;
export declare const sMatch: (re: RegExp) => (a: string) => RegExpMatchArray | null;
export declare const predNot: _predTfm;
export declare const predsOr: _predsPred;
export declare const predsAnd: _predsPred;
export declare const isRmkLin: sPred;
export declare const isNonRmkLin: sPred;
export declare const linRmvMsg: _sTfm;
export declare type _quoteStrBrk = (a: quoteStr) => quote;
export declare const sBrkAt: _sBrkAt;
export declare const sBrk1: _sBrk;
export declare const sBrk2: _sBrk;
export declare const sBrk: _sBrk;
export declare const quoteStrBrk: _quoteStrBrk;
export declare const sQuote: _sQuote;
export declare const sTakBef: _sTak;
export declare const sTakAft: _sTak;
export declare const sRevBrk1: _sBrk;
export declare const sRevBrk2: _sBrk;
export declare const sRevBrk: _sBrk;
export declare const sRevTakBef: _sTak;
export declare const sRevTakAft: _sTak;
export declare const sRmvFstChr: _sTfm;
export declare const sRmvLasChr: _sTfm;
export declare const sRmvLasNChr: _sNTfm;
export declare const sRmvSubStr: _sStrTfm;
export declare const sRmvColon: (a: string) => string;
export declare const pthsep: string;
export declare const ffnPth: _sTfm;
export declare const ffnFn: _sTfm;
export declare const ffnExt: _sTfm;
export declare const ffnAddFnSfx: _sStrTfm;
export declare const ffnRmvExt: _sTfm;
export declare const ffnFfnn: _tfm<string>;
export declare const ffnFnn: _sTfm;
export declare const ffnRplExt: _sStrTfm;
export declare const ftLines: _sTfm;
export declare const ftLy: (ft: string) => string[];
export declare const tmpnm: () => string;
export declare const tmppth: string;
export declare const tmpffn: (pfx: string | undefined, ext: any) => string;
export declare const tmpft: () => string;
export declare const tmpjson: () => string;
export declare const ffnTmp: _sTfm;
export declare const pm: <T>(f: any, ...p: any[]) => Promise<T>;
export declare const ftLinesPm: (a: string) => Promise<string>;
export declare const ftLyPm: (a: string) => Promise<string[]>;
export declare const pthEns: (a: string) => void;
export declare const isPthExist: (a: string) => boolean;
export declare const assertIsPthExist: (a: string) => void;
export declare const pthEnsSfxSep: (a: string) => string;
export declare const pthEnsSubFdr: (subFdr: string) => (a: string) => void;
export declare const itrWhere: (p: p) => (a: Iterable<any>) => any[];
export declare const itrExclude: (p: p) => (a: Iterable<any>) => any[];
export declare const itrMap: (f: f) => (a: Iterable<any>) => any[];
export declare const itrEach: (f: f) => (a: Iterable<any>) => void;
export declare const itrFold: (_itrFold: any) => (f: any) => (cum: any) => (a: any) => any;
export declare const itrReduce: (f: any) => (a: Iterable<any>) => (a: any) => any;
export declare type map = Map<any, any>;
export declare type _mapSet = (a: map) => set;
export declare type _mapAy = (a: map) => ay;
export declare type _itrAddPfxSfx = (pfx: s, sfx: s) => (a) => s[];
export declare const mapKy: _mapAy;
export declare const mapVy: _mapAy;
export declare const mapKvy: _mapAy;
export declare const mapKset: _mapSet;
export declare const setAy: (set: any) => any[];
export declare const setWhere: (p: any) => (set: any) => Set<any>;
export declare const setAdd: (x: any) => (set: any) => any;
export declare const setMinus: (x: any) => (set: any) => any;
export declare const linShift: _linShift;
export declare const setAft: (aft: any) => (a: any) => Set<any>;
export declare const setAftIncl: (a: any) => (set: any) => Set<any>;
export declare const setClone: (set: any) => Set<any>;
export declare const itrSet: (itr: any) => Set<any>;
export declare const itrTfmSet: _itrTfmSet;
export declare const empSdic: () => Map<string, string>;
export declare type _linSetSdic = (sdic: sdic) => (a: lin) => void;
export declare const linSetSdic: _linSetSdic;
export declare const linKs: _linKs;
export declare const lySdic: _lySdic;
export declare const lyReDry: _lyReSdry;
export declare const lyReCol: _lyReCol;
export declare const matchAyDry: _matchAyDry;
export declare const matchFstItm: _matchFstItm;
export declare const matchAyFstCol: _matchAyCol;
export declare const lyPfxCnt: _lyPfxCnt;
export declare const lyHasMajPfx: _lyHasMajPfx;
export declare const lyMatchAy: _lyMatchAy;
export declare const matchDr: (a: RegExpMatchArray) => string[];
export declare const lyConstNy: _tfm<ly>;
export declare const lyConstDollarNy: _tfm<ly>;
export declare const ftConstNy: (a: any) => any;
export declare const ftConstDollarNy: (a: any) => any;
export declare const isStr: (v: any) => boolean;
export declare const isNum: (v: any) => boolean;
export declare const isBool: (v: any) => boolean;
export declare const isObj: (v: any) => boolean;
export declare const isSy: (v: any) => boolean;
export declare const isAy: (arg: any) => arg is any[];
export declare const isDte: (a: any) => boolean;
export declare const isFun: (a: any) => boolean;
export declare const isRe: (v: any) => (a: any) => boolean;
export declare const isNonNull: (v: any) => boolean;
export declare const isNull: (v: any) => boolean;
export declare const isUndefined: (v: any) => boolean;
export declare const isTrue: (v: any) => boolean;
export declare const isFalse: (v: any) => boolean;
export declare const isEmp: (v: any) => boolean;
export declare const isNonEmp: (v: any) => boolean;
export declare const isOdd: (n: any) => boolean;
export declare const isEven: (n: any) => boolean;
export declare const sSearch: (re: RegExp) => (a: string) => number;
export declare const sBrkP123: _sP123;
export declare const itrIsAllTrue: (a: Iterable<any>) => boolean;
export declare const itrIsAllFalse: (a: Iterable<any>) => boolean;
export declare const itrIsSomeTrue: (a: Iterable<any>) => boolean;
export declare const itrIsSomeFalse: (a: Iterable<any>) => boolean;
export declare const itrPredIsAllTrue: (p: p) => (a: Iterable<any>) => boolean;
export declare const itrPredIsAllFalse: (p: p) => (a: Iterable<any>) => boolean;
export declare const itrPredIsSomeFalse: (p: p) => (a: Iterable<any>) => boolean;
export declare const itrPredIsSomeTrue: (p: p) => (a: Iterable<any>) => boolean;
export declare const itrBrkForTrueFalse: _itrSplit<any>;
export declare const itrAy: _itrAy;
export declare const itrFst: _itrItm;
export declare const itrAddPfxSfx: _itrAddPfxSfx;
export declare const itrAddPfx: (pfx: any) => (a: Iterable<any>) => any[];
export declare const itrAddSfx: (sfx: any) => (a: Iterable<any>) => any[];
export declare const itrWdt: _itrN;
export declare const sitrWdt: _sitrN;
export declare const itrAlignL: _itrSy;
export declare const itrClone: _itrAy;
export declare const itrFind: _itrFind;
export declare const itrHasDup: _itrPred;
export declare const itrDupSet: _itrSet;
export declare const itrMax: _itrItm;
export declare const itrMin: _itrItm;
export declare const itrRmvEmp: (a: Iterable<any>) => any[];
export declare const oBringUpDollarPrp: (o: any) => any;
export declare const oCmlDry: _oDry;
export declare const oCtorNm: (o: any) => any;
export declare const oIsInstance: (instance: any) => (o: any) => boolean;
export declare const oHasCtorNm: (nm: any) => (o: any) => boolean;
export declare const oPrp: _oPrp;
export declare const oPrpAy: _oPrpAy;
export declare const oPrpNy: _oPrpNy;
export declare const oHasPrp: _oHasPrp;
export declare const oHasLen: (a: object) => boolean;
export declare const oCmlObj: _oCmlObj;
export declare const ayClone: (ay: any[]) => any[];
export declare const sdryColWdt: _sdryWdt;
export declare const sdryColWdtAy: _sdryWdtAy;
export declare const dryCol: _dryCol;
export declare const dryColCnt: _dryCnt;
export declare const dryCellTfm: _dryCellMdy;
export declare const dryClone: _dryTfm;
export declare const dryColMdy: _dryColMdy;
export declare const sdryLines: _dryLines;
export declare const wdtAyLin: _wdtAyLin;
export declare const sdrLin: _sdrLin;
export declare const sdryLy: _dryLy;
export declare type _drsLy = (a: drs) => ly;
export declare const aySy: _aySy;
export declare const drySdry: _drySdry;
export declare const dryLy: _dryLy;
export declare const drsLy: _drsLy;
export declare const drsLines: _drsLines;
export declare const drySrt: _drySrt;
export declare const oyPrpCol: (prpNm: any) => (oy: any) => any[];
export declare const oyPrpDry: (prpNy: any) => (oy: any) => any[];
export declare const sLik: _sLik;
export declare const sHasSbs: _sHasSbs;
export declare const pthFnAy: (pth: string, lik?: string | undefined) => string[] | null;
export declare const ayZip: (a: any[], b: any[]) => any[];
export declare const pthFnAyPm: (a: string, lik?: string | undefined) => Promise<string[]>;
export declare const nMultiply: (x: any) => (a: any) => number;
export declare const nDivide: (x: any) => (a: any) => number;
export declare const vAdd: (x: any) => (a: any) => any;
export declare const nMinus: (x: any) => (a: any) => number;
export declare const nDecr: (a: any) => number;
export declare const nIncr: (a: any) => any;
export declare const nItr: (n: any) => IterableIterator<number>;
export declare const vvCompare: (a: any, b: any) => 0 | 1 | -1;
export declare const lazy: (vf: any) => () => any;
export declare const optMap: _optMap;
export declare const ffnMakBackup: _ffnDo;
export declare const lyExpStmt: _lyStrOpt;
export declare const curExpStmt: _mkStr;
export declare const fjsRplExpStmt: _ftDo;
export declare const vTee: _vTee;
export declare const ftWrt: _ftWrt;
export declare const cmdShell: _cmdDo;
export declare const ftBrw: _ftDo;
export declare const sBrw: _sDo;
export declare const oBrw: _oDo;
export declare type _oStr = (a: o) => s;
export declare type _oDo = (a: o) => void;
export declare const oJsonLines: _oStr;
