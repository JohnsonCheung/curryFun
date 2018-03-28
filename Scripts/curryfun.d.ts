/// <reference path="typings/node/node.d.ts" />
import * as fs from 'fs';
import * as u from 'util';
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
export interface linShift {
    term: s;
    remainLin: s;
}
export interface quote {
    q1: s;
    q2: s;
}
export declare type match = RegExpMatchArray;
export declare type kv = [s, s];
export declare type s = string;
export declare type vid = s;
export declare type sid = s;
export declare type lin = s;
export declare type re = RegExp;
export declare type n = number;
export declare type ft = s;
export declare type fts = ft;
export declare type fn = s;
export declare type ffn = string;
export declare type b = boolean;
export declare type dr = ay;
export declare type lines = s;
export declare type o = object;
export declare type quoteStr = s;
export declare type k = s;
export declare type pfx = s;
export declare type nm = s;
export declare type ny = nm[];
export declare type wdt = n;
export declare type cml = s;
export declare type cnt = n;
export declare type ix = n;
export declare type pth = s;
export declare type cummulator<T> = (cum: T) => (itm) => T;
export declare type pred<T> = (a: T) => b;
export declare type opt<T> = T | null;
export declare type fun<T> = (x: T) => any;
export declare type Itr<T> = Iterable<T>;
export declare type dry = Array<dr>;
export declare type sdic = Map<s, s>;
export declare type dic<T> = Map<s, T>;
export declare type set = Set<any>;
export declare type sset = Set<s>;
export declare type bdic = Map<s, b>;
export declare type ly = s[];
export declare type src = ly;
export declare type col = any[];
export declare type scol = s[];
export declare type sy = s[];
export declare type sPred = pred<s>;
export declare type ay = Array<any>;
export declare type fny = nm[];
export declare type sdry = s[][];
export declare type sdr = s[];
export declare type itr = Itr<any>;
export declare type sItr = Itr<s>;
export declare type p = (a: any) => boolean;
export declare type f = (a: any) => any;
export declare type sOrRe = s | re;
export declare type sOrSy = s | s[];
export declare type strOpt = string | null;
export declare type doFun = () => void;
export declare const isEq: (exp: any, act: any) => boolean;
export declare const isNotEq: (exp: any, act: any) => boolean;
export declare const assertIsEq: (exp: any, act: any) => void;
export declare const assertIsNotEq: (exp: any, act: any) => void;
export declare const vLT: (x: any) => (a: any) => boolean;
export declare const vGE: (x: any) => (a: any) => boolean;
export declare const vLE: (x: any) => (a: any) => boolean;
export declare const vEQ: <T>(x: T) => (a: T) => boolean;
export declare const vNE: <T>(x: T) => (a: T) => boolean;
export declare const vGT: (x: any) => (a: any) => boolean;
export declare const vIN: (itr: Iterable<any>) => (a: any) => boolean;
export declare const vNotIn: (itr: any) => (a: any) => boolean;
export declare const vBET: <T>(x: T, y: T) => (a: T) => boolean;
export declare const vNotBet: <T>(x: T, y: T) => (a: T) => boolean;
export declare const vIsInstanceOf: <T>(x: Function) => (a: T) => boolean;
export declare const ensSy: (a: string | string[]) => string[];
export declare const ensRe: (a: sOrRe) => RegExp;
export declare const pipe: (v: any) => (...f: f[]) => any;
export declare const vMap: (f: f) => (a: any) => any;
export declare const funApply: (v: any) => (a: f) => any;
export declare const swap: (f: f) => (a: any) => (b: any) => any;
export declare const compose: (...f: f[]) => (v: any) => any;
export declare const dicLy: <T>(a: Map<string, T>) => string[];
export declare const dicLines: <T>(a: Map<string, T>) => string;
export declare const kvLin: ([k, v]: [string, string]) => string;
export declare const dmp: any;
export declare const funDmp: (f: Function) => any;
export declare const halt: () => never;
export declare const sEscLf: (a: string) => string;
export declare const sEscVbar: (a: string) => string;
export declare const sEscCr: (a: string) => string;
export declare const sEscTab: (a: string) => string;
export declare const sEsc: ((a: s) => s);
export declare const sFmt: (qqStr: string, ...v: any[]) => string;
export declare const sBox: (a: string) => string;
export declare const stack: () => string;
export declare const er: (msg: string, ...v: any[]) => void;
export declare const sSplit: (sep: sOrRe) => (a: string) => string[];
export declare const sRmvCr: (a: string) => string;
export declare const sSplitLines: (a: string) => string[];
export declare const sSplitCrLf: (a: string) => string[];
export declare const sSplitLf: (a: string) => string[];
export declare const sSplitSpc: (a: string) => string[];
export declare const sSplitCommaSpc: (a: string) => string[];
export declare const vDft: <T>(dft: T) => (a: T | null | undefined) => T;
export declare const vDftStr: (a: string | null | undefined) => string;
export declare const vDftUpper: <T>(x: T, y: T) => (a: T | null | undefined) => T;
export declare const vDftLower: <T>(x: T, y: T) => (a: T | null | undefined) => T;
export declare const ayFindIx: (p: p) => (a: any[]) => number | null;
export declare const ayFindIxOrDft: (dftIx: number) => (p: p) => (a: any[]) => number;
export declare const ayFst: <T>(a: T[]) => T;
export declare const aySnd: <T>(a: T[]) => T;
export declare const ayEle: <T>(ix: number) => (a: T[]) => T;
export declare const ayEleOrDft: <T>(dft: T) => (ix: number) => (a: T[]) => T;
export declare const ayLas: <T>(a: T[]) => T;
export declare const aySetEle: <T>(ix: number) => (v: T) => (a: T[]) => void;
export declare const ayMdyEle: <T>(ix: number) => (f: (a: T) => T) => (a: T[]) => void;
export declare const ayMdy: <T>(f: (a: T) => T) => (a: T[]) => void;
export declare const ayJn: (sep?: string | undefined) => (a: any[]) => string;
export declare const ayJnCrLf: (a: any[]) => string;
export declare const ayJnLf: (a: any[]) => string;
export declare const ayJnSpc: (a: any[]) => string;
export declare const ayJnComma: (a: any[]) => string;
export declare const ayJnCommaSpc: (a: any[]) => string;
export declare const nSpc: (a: number) => string;
export declare const ayJnAsLines: (sep0?: string | undefined, tab0?: number | undefined, wdt0?: number | undefined) => (a: any[]) => string;
export declare const sFstChr: (a: string) => string;
export declare const sLasChr: (a: string) => string;
export declare const sAddPfx: (pfx: string) => (a: string) => string;
export declare const sAddSfx: (sfx: string) => (a: any) => string;
export declare const sAddPfxSfx: (pfx: string, sfx: string) => (a: string) => string;
export declare const vLen: (a: any) => number;
export declare const sLen: (a: string) => number;
export declare const sMidN: (pos: number) => (n: number) => (a: string) => string;
export declare const sMid: (pos: number) => (a: string) => string;
export declare const sLeft: (n: number) => (a: string) => string;
export declare const sTrim: (a: string) => string;
export declare const sRight: (n: number) => (a: string) => string;
export declare const nPadZero: (dig: number) => (a: number) => string;
export declare const sAlignL: (w: number) => (a: string) => string;
export declare const sAlignR: (w: number) => (a: string) => string;
export declare const sWrt: (ft: string) => (a: string) => void;
export declare const sSbsPos: (sbs: string) => (a: string) => number;
export declare const sSbsRevPos: (sbs: string) => (a: string) => number;
export declare const cmlNm: (a: string) => string;
export declare const cmlSpcNm: (a: string) => string;
export declare const isNm: (s: string) => boolean;
export declare const sRplNonNmChr: (a: string) => string;
export declare const sNmSet: (a: string) => Set<string>;
export declare const cmlNy: (a: string) => string[];
export declare const sHasPfx: (pfx: string) => (a: string) => boolean;
export declare const sHasPfxIgnCas: (pfx: string) => (a: string) => boolean;
export declare const sRmvPfx: (pfx: string) => (a: string) => string;
export declare const sHasSfx: (sfx: string) => (a: string) => boolean;
export declare const sRmvSfx: (sfx: string) => (a: string) => string;
export declare const sMatch: (re: RegExp) => (a: string) => RegExpMatchArray | null;
export declare const predNot: ((a: p) => p);
export declare const predsOr: ((...a: p[]) => p);
export declare const predsAnd: ((...a: p[]) => p);
export declare const isRmkLin: (a: string) => boolean;
export declare const isNonRmkLin: sPred;
export declare const linRmvMsg: (a: string) => string;
export declare const sBrkAt: (at: number, len: number) => (a: string) => {
    s1: string;
    s2: string;
};
export declare const sBrk1: (sep: string) => (a: string) => {
    s1: string;
    s2: string;
};
export declare const sBrk2: (sep: string) => (a: string) => {
    s1: string;
    s2: string;
};
export declare const sBrk: (sep: string) => (a: string) => {
    s1: string;
    s2: string;
};
export declare const quoteStrBrk: (a: string) => {
    q1: string;
    q2: string;
};
export declare const sQuote: (q: string) => (a: string) => string;
export declare const sTakBef: (sep: string) => (a: string) => string;
export declare const sTakAft: (sep: string) => (a: string) => string;
export declare const sRevBrk1: (sep: string) => (a: string) => {
    s1: string;
    s2: string;
};
export declare const sRevBrk2: (sep: string) => (a: string) => {
    s1: string;
    s2: string;
};
export declare const sRevBrk: (sep: string) => (a: string) => {
    s1: string;
    s2: string;
};
export declare const sRevTakBef: (sep: string) => (a: string) => string;
export declare const sRevTakAft: (sep: string) => (a: string) => string;
export declare const sRmvFstChr: (a: string) => string;
export declare const sRmvLasChr: (a: string) => string;
export declare const sRmvLasNChr: (n: number) => (a: string) => string;
export declare const sRmvSubStr: (sbs: string) => (a: string) => string;
export declare const sRmvColon: (a: string) => string;
export declare const pthsep: string;
export declare const pthBrw: (a: string) => void;
export declare const ffnPth: (a: string) => string;
export declare const ffnFn: (a: string) => string;
export declare const ffnExt: (a: string) => string;
export declare const ffnAddFnSfx: (sfx: string) => (a: string) => string;
export declare const ffnRmvExt: (a: string) => string;
export declare const ffnFfnn: (a: string) => string;
export declare const ffnFnn: (a: string) => string;
export declare const ffnRplExt: (ext: string) => (a: string) => string;
export declare const ftLines: (a: string) => string;
export declare const ftLy: (a: string) => string[];
export declare const tmpnm: () => string;
export declare const tmppth: string;
export declare const tmpffn: (pfx: string | undefined, ext: any) => string;
export declare const tmpfdr: (fdr: string) => string;
export declare const tmpffnByFdrFn: (fdr: string, fn: string) => string;
export declare const tmpft: () => string;
export declare const tmpfjson: () => string;
export declare const ffnCloneTmp: (a: string) => string;
export declare const pm: <T>(f: any, ...p: any[]) => Promise<T>;
export declare const pmErRslt: (f: any, ...p: any[]) => Promise<{
    er: any;
    rslt: any;
}>;
export declare const pmRsltOpt: <T>(f: any, ...p: any[]) => Promise<T | null>;
export declare const ftLinesPm: (a: string) => Promise<string>;
export declare const ftLyPm: (a: string) => Promise<string[]>;
export declare const pthEns: (a: string) => void;
export declare const isPthExist: (a: string) => boolean;
export declare const assertIsPthExist: (a: string) => void;
export declare const pthEnsSfxSep: (a: string) => string;
export declare const pthEnsSubFdr: (subFdr: string) => (a: string) => void;
export declare const itrWhere: <A>(p: pred<A>) => (a: Iterable<any>) => A[];
export declare const itrExclude: (p: p) => (a: Iterable<any>) => any[];
export declare const itrMap: <A, B>(f: (a: A, i?: number | undefined) => B) => (a: Iterable<any>) => B[];
export declare const itrEach: (f: (a: any, i?: number | undefined) => void) => (a: Iterable<any>) => void;
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
export declare const linFstTerm: (a: string) => string;
export declare const linT2: (a: string) => string;
export declare const linShift: (a: string) => {
    term: string;
    remainLin: string;
};
export declare const setAft: (aft: any) => (a: any) => Set<any>;
export declare const setAftIncl: (a: any) => (set: any) => Set<any>;
export declare const setClone: (set: any) => Set<any>;
export declare const itrSet: (itr: any) => Set<any>;
export declare const itrTfmSet: (f: f) => (a: Iterable<any>) => Set<any>;
export declare const empSdic: () => Map<string, string>;
export declare const lySdic: (a: string[]) => Map<string, string>;
export declare const itrRmvEmp: (a: Iterable<any>) => any[];
export declare const lyPfxCnt: (pfx: string) => (a: string[]) => number;
export declare const lyHasMajPfx: (pfx: string) => (a: string[]) => boolean;
export declare const srcDry: (re: RegExp) => (a: string[]) => any[][];
export declare const srcCol: (re: RegExp) => (a: string[]) => string[];
export declare const aySrt: (a: any[]) => any[];
export declare const matchDr: (a: RegExpMatchArray) => string[];
export declare const matchAySdry: (a: RegExpMatchArray[]) => string[][];
export declare const matchFstItm: (a: RegExpMatchArray) => string | null;
export declare const matchAyFstCol: (a: RegExpMatchArray[]) => string[];
export declare const srcMatchAy: (_: RegExp) => (_: string[]) => RegExpMatchArray[];
export declare const srcExpConstNy: (a: string[]) => string[];
export declare const srcConstNy: (a: string[]) => string[];
export declare const srcExpConstDollarNy: (a: string[]) => string[];
export declare const ftsExpConstNy: (a: string) => string[];
export declare const ftsConstNy: (a: string) => string[];
export declare const ftsExpConstDollarNy: (a: string) => string[];
export declare const ffnFts: (_: string) => string;
export declare const fjsExpConstNy: (v: any) => any;
export declare const fjsConstNy: (v: any) => any;
export declare const stop: () => void;
export declare const isStr: (v: any) => boolean;
export declare const isNum: (v: any) => boolean;
export declare const isBool: (v: any) => boolean;
export declare const isObj: (v: any) => boolean;
export declare const isSy: (v: any) => boolean;
export declare const isAy: typeof u.isArray;
export declare const isDte: typeof u.isDate;
export declare const isFun: typeof u.isFunction;
export declare const isPrim: typeof u.isPrimitive;
export declare const isRe: (v: any) => (a: {}) => boolean;
export declare const isNonNull: (v: any) => boolean;
export declare const isNull: typeof u.isNull;
export declare const isUndefined: typeof u.isUndefined;
export declare const isNullOrUndefined: typeof u.isNullOrUndefined;
export declare const isTrue: (v: any) => boolean;
export declare const isFalse: (v: any) => boolean;
export declare const isEmp: (v: any) => boolean;
export declare const isNonEmp: (v: any) => boolean;
export declare const isOdd: (n: any) => boolean;
export declare const isEven: (n: any) => boolean;
export declare const isSpc: (s: string) => boolean;
export declare const sSearch: (re: RegExp) => (a: string) => number;
export declare const sBrkP123: (quoteStr: string) => (a: string) => [string, string, string] | null;
export declare const itrIsAllTrue: (a: Iterable<any>) => boolean;
export declare const itrIsAllFalse: (a: Iterable<any>) => boolean;
export declare const itrIsSomeTrue: (a: Iterable<any>) => boolean;
export declare const itrIsSomeFalse: (a: Iterable<any>) => boolean;
export declare const itrPredIsAllTrue: (p: p) => (a: Iterable<any>) => boolean;
export declare const itrPredIsAllFalse: (p: p) => (a: Iterable<any>) => boolean;
export declare const itrPredIsSomeFalse: (p: p) => (a: Iterable<any>) => boolean;
export declare const itrPredIsSomeTrue: (p: p) => (a: Iterable<any>) => boolean;
export declare const itrBrkForTrueFalse: <T>(p: (a: T) => boolean) => (a: Iterable<T>) => {
    t: T[];
    f: T[];
};
export declare const itrAy: <T>(a: Iterable<T>) => T[];
export declare const itrFst: <T>(a: Iterable<T>) => T | null;
export declare const itrAddPfxSfx: (pfx: string, sfx: string) => (a: Iterable<any>) => string[];
export declare const itrAddPfx: (pfx: string) => (a: Iterable<any>) => string[];
export declare const itrAddSfx: (sfx: string) => (a: Iterable<any>) => string[];
export declare const itrWdt: (a: Iterable<any>) => number;
export declare const sitrWdt: (a: Iterable<string>) => number;
export declare const itrAlignL: (a: Iterable<any>) => string[];
export declare const itrClone: (a: Iterable<any>) => any[];
export declare const itrFind: <T>(p: (a: T) => boolean) => (a: Iterable<T>) => T | null;
export declare const itrHasDup: (a: Iterable<any>) => boolean;
export declare const itrDupSet: <T>(a: Iterable<T>) => Set<T>;
export declare const itrMax: <T>(a: Iterable<T>) => T | null;
export declare const itrMin: <T>(a: Iterable<T>) => T | null;
export declare const oBringUpDollarPrp: (o: any) => any;
export declare const nyCmlSdry: (a: string[]) => string[][];
export declare const oCmlDry: (a: object) => string[][];
export declare const oCtorNm: (a: object) => string;
export declare const oIsInstance: (instance: Function) => (a: object) => boolean;
export declare const oHasCtorNm: (nm: string) => (a: object) => boolean;
export declare const oPrp: (prpPth: string) => (a: object) => any;
export declare const oPrpAy: (prpNy: string[]) => (a: object) => any[];
export declare const oPrpNy: (a: object) => string[];
export declare const oHasPrp: (prpNm: string) => (a: object) => boolean;
export declare const oHasLen: (a: object) => boolean;
export declare const oCmlObj: (a: object) => object;
export declare const ayClone: (ay: any[]) => any[];
export declare const sdryColWdt: (colIx: number) => (a: string[][]) => number;
export declare const sdryColWdtAy: (a: string[][]) => number[];
export declare const dryCol: (colIx: number) => (a: any[][]) => string[];
export declare const dryColCnt: (a: any[][]) => number;
export declare const dryCellMdy: (f: f) => (a: any[][]) => void;
export declare const dryClone: (a: any[][]) => any[][];
export declare const dryColMdy: (colIx: number) => (f: f) => (a: any[][]) => void;
export declare const sdryLines: (a: string[][]) => string;
export declare const wdtAyLin: (wdtAy: number[]) => string;
export declare const sdrLin: (wdtAy: number[]) => (a: string[]) => string;
export declare const sdryLy: (a: string[][]) => string[];
export declare const itrSy: (a: Iterable<any>) => string[];
export declare const aySy: (a: any[]) => string[];
export declare const drySdry: (a: string[][]) => string[][];
export declare const dryLy: (a: any[][]) => string[];
export declare const drsLy: (a: drs) => string[];
export declare const drsLines: (a: drs) => string;
export declare const drySrtCol: (colAy: number[]) => (a: any[][]) => void;
export declare const drySrt: (fun_of_dr_to_key: (dr: any[]) => string) => (a: any[][]) => any[][];
export declare const oyPrpCol: (prpNm: any) => (oy: any) => any[];
export declare const oyPrpDry: (prpNy: any) => (oy: any) => any[];
export declare let sLik: any;
export declare let sHasSbs: any;
export declare const pthFnAy: (pth: string, lik?: string | undefined) => string[] | null;
export declare const ayZip: (a: any[], b: any[]) => any[][];
export declare const entryStatPm: (a: any) => Promise<never>;
export declare const pthFnAyPm: (a: string, lik?: string | undefined) => Promise<never>;
export declare const pthStatOptAyPm: (a: string, lik?: string | undefined) => Promise<(fs.Stats | null)[]>;
export declare const pthFdrAyPm: (a: string, lik?: string | undefined) => Promise<void>;
export declare const nMultiply: (x: any) => (a: any) => number;
export declare const nDivide: (x: any) => (a: any) => number;
export declare const vAdd: (x: any) => (a: any) => any;
export declare const nMinus: (x: any) => (a: any) => number;
export declare const nDecr: (a: any) => number;
export declare const nIncr: (a: any) => any;
export declare const nItr: (n: any) => IterableIterator<number>;
export declare const vvCompare: (a: any, b: any) => 0 | 1 | -1;
export declare const lazy: (vf: any) => () => any;
export declare const optMap: <T, U>(f: (a: T) => U) => (a: T | null) => U | null;
export declare const ffn: (a: string) => Ffn;
export declare class Ffn {
    private _ffn;
    private _dotPos;
    private _sepPos;
    constructor(a: ffn);
    private zmid(at);
    private zleft(at);
    readonly ffn: string;
    readonly pth: string;
    readonly fn: string;
    readonly ext: string;
    readonly noExt: string;
    readonly ffnn: string;
    readonly fnn: string;
    addFnSfx(sfx: s): string;
    rplExt(ext: s): string;
    makBackup(): void;
}
export declare const ffnMakBackup: (a: string) => void;
export declare const srcExpStmt: (a: string[]) => string | null;
export declare const curExpStmt: () => string;
export declare const fjsRplExpStmt: (fjs: any) => void;
export declare const syLin: (a: string[]) => string;
export declare const linesAlignL: (wdt: number) => (a: string) => string;
export declare const linesWdt: (a: string) => number;
export declare const linesAyWdt: (a: string[]) => number;
export declare const linesAyAlignL: (a: string[]) => string[];
export declare const vSav: (vid: string) => (a: any) => void;
export declare const vidpth: string;
export declare const vidpthBrw: () => void;
export declare const vidFjson: (a: string) => string;
export declare const fjsonVal: (a: string) => any;
export declare const vidVal: (a: string) => any;
export declare const sSav: (sid: string) => (a: string) => void;
export declare const sidpth: string;
export declare const sidpthBrw: () => void;
export declare const sidFt: (a: string) => string;
export declare const sidStr: (a: string) => string;
export declare const vTee: <T>(f: (a: T) => void) => (a: T) => T;
export declare const ftWrt: (s: string) => (a: string) => void;
export declare const cmdShell: (a: string) => void;
export declare const ftBrw: (a: string) => void;
export declare const sBrw: (a: string) => void;
export declare const sBrwAtFdrFn: (fdr: string, fn: string) => (a: string) => void;
export declare const sjsonBrw: (a: string) => void;
export declare const lyBrw: (a: string[]) => void;
export declare const lyBrwStop: (a: string[]) => void;
export declare type tfPair<V> = {
    t: V;
    f: V;
};
export declare type _dicSplitPred<V> = ([s, V]) => b;
export declare const dicBrkForTrueFalse: <V>(_dicSplitFun: _dicSplitPred<V>) => (_dic: Map<string, V>) => tfPair<Map<string, V>>;
export declare const dicBrw: <T>(a: Map<string, T>) => void;
export declare const oJsonLines: (a: object) => string;
export declare const sdryBrw: (a: string[][]) => void;
export declare const dryBrw: (a: any[][]) => void;
export declare const drsBrw: (a: drs) => void;
export declare const nyBrw: (a: string[]) => void;
export declare const srcExpConstNyBrw: (v: any) => any;
export declare const ftsExpConstNyBrw: (v: any) => any;
export declare const oBrw: (a: object) => void;
export declare const chrCd_isNm: (c: number) => boolean;
export declare const chrCd: (s: string) => number;
export declare const chrCd_a: number;
export declare const chrCd_z: number;
export declare const chrCd_A: number;
export declare const chrCd_Z: number;
export declare const chrCd_0: number;
export declare const chrCd_9: number;
export declare const chrCd_dollar: number;
export declare const chrCd_underScore: number;
export declare const chrCd_isSmallLetter: (a: number) => boolean;
export declare const chrCd_isCapitalLetter: (a: number) => boolean;
export declare const chrCd_isLetter: p;
export declare const chrCd_isDigit: (a: number) => boolean;
export declare const chrCd_isDollar: (a: number) => boolean;
export declare const chrCd_isUnderScore: (a: number) => boolean;
export declare const chrCd_isFstNmChr: pred<number>;
export declare const chrCd_isNmChr: p;
export declare const ssetSrtBrw: (a: Set<string>) => any;
export declare const ssetBrw: (a: Set<string>) => any;
export declare const linExpConstNm: (a: string) => string | null;
export declare const nodeModuleSet: () => Set<NodeModule>;
export declare const drsof_exportFunctions: () => drs;
export declare class Dry {
    dry: dry;
    private _curCol;
    constructor(a: dry);
    curCol: n;
    readonly colCnt: number;
    readonly ly: string[];
    readonly lines: string;
    readonly col: string[];
    readonly sdry: string[][];
    setCurCol(n: n): this;
    mdyAllCell(f: f): void;
    mdyCol(f: f, colIx: n): void;
    brw(): void;
}
export declare const dry: (a: any[][]) => Dry;
