/// <reference path="typings/node/node.d.ts" />
declare type pmErLy = Promise<{
    er;
    ly;
}>;
declare type p = (a: any) => boolean;
declare type ay = Array<any>;
declare type s = string;
declare type map = Map<any, any>;
declare type itr = Iterable<any>;
declare type pth = s;
declare type f = (a: any) => any;
declare type cummulator = (cum: any) => (itm: any) => any;
declare type re = RegExp;
declare type brk = (sep: s) => (s: s) => s1s2;
declare type tak = (sep: s) => (s: s) => s;
declare type sTfm = (s: s) => s;
declare type sOrRe = (s | re);
declare type sOrSy = (s | s[]);
declare type ensSy = (sOrSy: sOrSy) => void;
declare type ensRe = (sOrRe: sOrRe) => void;
declare type n = number;
declare type split = (s: s) => s[];
interface s1s2 {
    s1: string;
    s2: string;
}
interface erRslt {
    er: any;
    rslt: any;
}
declare const fs: any;
declare const path: any;
declare const os: any;
declare const strictEqual: any;
declare const eq: (act: any) => (exp: any) => void;
declare const vEQ: (a: any) => (v: any) => boolean;
declare const vNE: (a: any) => (v: any) => boolean;
declare const vGT: (a: any) => (v: any) => boolean;
declare const vIN: (itr: Iterable<any>) => (v: any) => boolean;
declare const vNIN: (itr: Iterable<any>) => (v: any) => boolean;
declare const vLT: (a: any) => (v: any) => boolean;
declare const vGE: (a: any) => (v: any) => boolean;
declare const vLE: (a: any) => (v: any) => boolean;
declare const vBET: (a: any, b: any) => (v: any) => boolean;
declare const vNBET: (a: any, b: any) => (v: any) => boolean;
declare const vIsInstanceOf: (x: any) => (v: any) => boolean;
declare const ensSy: ensSy;
declare const ensRe: ensRe;
declare const pipe: (v: any) => (...f: f[]) => any;
declare const apply: (v: any) => (f: f) => any;
declare const swap: (f: f) => (a: any) => (b: any) => any;
declare const compose: (...f: f[]) => (v: any) => any;
declare const dmp: any;
declare const funDmp: (f: any) => any;
declare const halt: () => never;
declare const sEscLf: (s: string) => string;
declare const sEscCr: (s: string) => string;
declare const sEscTab: (s: string) => string;
declare const sEsc: (v: any) => any;
declare const sBox: (s: string) => string;
declare const stack: () => any;
declare const er: (msg: string, ...v: any[]) => void;
declare const split: (sep: string | RegExp) => (s: string) => string[];
declare const splitCrLf: (s: string) => string[];
declare const splitLf: (s: string) => string[];
declare const splitSpc: (s: string) => string[];
declare const splitCommaSpc: (s: string) => string[];
declare const dft: (dft: any) => (v: any) => any;
declare const ayFindIx: (p: p) => (ay: any[]) => number | null;
declare const ayFindIxOrDft: (dftIx: number) => (p: p) => (ay: any[]) => number;
declare const ayFst: (ay: any[]) => any;
declare const aySnd: (ay: any[]) => any;
declare const ayLas: (ay: any[]) => any;
declare const ayEle: (ix: number) => (ay: any[]) => any;
declare const ayTfm: (f: f) => (ay: any[]) => void;
declare const aySetEle: (ix: number) => (v: any) => (ay: any[]) => any;
declare const ayTfmEle: (ix: number) => (f: f) => (ay: any[]) => any;
declare const jn: (sep?: string | undefined) => (ay: any[]) => string;
declare const jnCrLf: (ay: any[]) => string;
declare const jnLf: (ay: any[]) => string;
declare const jnSpc: (ay: any[]) => string;
declare const jnComma: (ay: any[]) => string;
declare const jnCommaSpc: (ay: any[]) => string;
declare const fstChr: (s: string) => string;
declare const lasChr: (s: string) => string;
declare const addPfx: (pfx: string) => (v: any) => string;
declare const addSfx: (sfx: string) => (v: any) => string;
declare const addPfxSfx: (pfx: string, sfx: string) => (v: any) => string;
declare const len: (v: any) => any;
declare const midN: (pos: number) => (n: number) => (s: string) => string;
declare const mid: (pos: number) => (s: string) => string;
declare const left: (n: number) => (s: string) => string;
declare const trim: (s: string) => string;
declare const right: (n: number) => (s: string) => string;
declare const padZero: (dig: number) => (n: number) => string;
declare const alignL: (w: number) => (s: string) => string;
declare const alignR: (w: any) => (s: any) => any;
declare const sWrt: (ft: any) => (s: any) => any;
declare const sbsPos: (sbs: string) => (s: string) => number;
declare const sbsRevPos: (sbs: string) => (s: string) => number;
declare const cmlNm: (nm: string) => string;
declare const cmlNy: (nm: string) => string[];
declare const hasPfx: (pfx: string) => (s: string) => boolean;
declare const rmvPfx: (pfx: string) => (s: string) => string;
declare const hasSfx: (sfx: string) => (s: string) => boolean;
declare const rmvSfx: (sfx: string) => (s: string) => string;
declare const match: (re: any) => (s: any) => any;
declare const notMatch: (re: any) => (s: any) => boolean;
declare const predsOr: (...p: any[]) => (v: any) => boolean;
declare const predsAnd: (...p: any[]) => (v: any) => boolean;
declare const predNot: (pred: any) => (itm: any) => boolean;
declare const isRmkLin: (lin: any) => boolean;
declare const isNonRmkLin: (itm: any) => boolean;
declare const linRmvMsg: (lin: any) => any;
declare const brkAt: (at: n, len: n) => (s: s) => s1s2;
declare const brk1: brk;
declare const brk2: brk;
declare const brk: brk;
declare const brkQuote: (quote: string) => {
    q1: string;
    q2: string;
} | null;
declare const quote: (q: any) => (s: any) => any;
declare const takBef: tak;
declare const takAft: tak;
declare const revBrk1: brk;
declare const revBrk2: brk;
declare const revBrk: brk;
declare const revTakBef: tak;
declare const revTakAft: tak;
declare const rmvFstChr: sTfm;
declare const rmvLasChr: sTfm;
declare const rmvLasNChr: (n: number) => (s: string) => string;
declare const rmvSubStr: (sbs: string) => (s: string) => string;
declare const rmvColon: (s: string) => string;
declare const pthSep: any;
declare const ffnPth: (ffn: string) => string;
declare const ffnFn: (ffn: string) => string;
declare const ffnExt: (ffn: string) => string;
declare const ffnAddFnSfx: (sfx: string) => (ffn: string) => string;
declare const rmvExt: (ffn: string) => string;
declare const ffnFfnn: (ffn: string) => string;
declare const ffnFnn: (ffn: string) => string;
declare const ftLines: (ft: s) => s;
declare const ftLy: (ft: s) => s[];
declare const tmpNm: () => string;
declare const tmpPth: any;
declare const tmpFfn: (pfx: string | undefined, ext: any) => string;
declare const tmpFt: () => string;
/**
 * return a new temp file by copying {fm}
 * @param {ffn} fm
 */
declare const tmpFilFm: (fm: any) => string;
/**
 * @description return a Promise of {er,rslt} by calling f(...,p,cb), where cb is (er,rslt)=>{...}
 * it is usefully in creating a promise by any async f(...p,cb), assuming cb is (er,rslt)=>{...}
 * @param {(er,rslt)=>void} f
 * @param {...any} p
 * @see
 */
declare const pm: (f: any, ...p: any[]) => Promise<any>;
declare const ftLinesPm: (ft: string) => Promise<any>;
declare const ftLyPm: (ft: string) => Promise<string[]>;
declare const pthEns: (a: string) => void;
declare const isPthExist: (a: string) => any;
declare const assertIsPthExist: (a: string) => void;
declare const pthEnsSfxSep: (a: string) => string;
declare const pthEnsSubFdr: (subFdr: string) => (pth: string) => void;
declare const where: (p: p) => (a: Iterable<any>) => any[];
declare const exclude: (p: p) => (a: Iterable<any>) => any[];
declare const map: (f: f) => (a: Iterable<any>) => any[];
declare const each: (f: f) => (a: Iterable<any>) => void;
declare const fold: (f: cummulator) => (cum: any) => (a: Iterable<any>) => any;
declare const reduce: (f: any) => (a: Iterable<any>) => any;
declare const mapKy: (a: Map<any, any>) => IterableIterator<any>;
declare const mapVy: (a: Map<any, any>) => IterableIterator<any>;
declare const mapKvy: (a: Map<any, any>) => IterableIterator<[any, any]>;
declare const mapKset: (a: Map<any, any>) => Set<any>;
declare const setAy: (set: any) => any[];
declare const setWhere: (p: any) => (set: any) => Set<any>;
declare const setAdd: (x: any) => (set: any) => any;
declare const setMinus: (x: any) => (set: any) => any;
declare const _setAft: (incl: any, a: any, set: any) => Set<any>;
declare const setAft: (a: any) => (set: any) => Set<any>;
declare const setAftIncl: (a: any) => (set: any) => Set<any>;
declare const setClone: (set: any) => Set<any>;
declare const itrSet: (itr: any) => Set<any>;
declare const setMap: (f: any) => (set: any) => Set<any>;
declare const lyReDry: (re: any) => (ly: any) => any[];
declare const lyReCol: (re: any) => (ly: any) => any[];
declare const matchAyDry: (matchAy: any) => any[];
declare const matchAyFstCol: (matchAy: any) => any[];
declare const lyMatchAy: (re: any) => (ly: any) => any[];
declare const matchDr: (match: any) => any[];
declare const lyConstNy: (ly: any) => any[];
declare const lyConstDollarNy: (ly: any) => any[];
declare const ftConstNy: (ft: any) => any;
declare const ftConstDollarNy: (ft: any) => any;
declare const isStr: (v: any) => boolean;
declare const isNum: (v: any) => boolean;
declare const isBool: (v: any) => boolean;
declare const isObj: (v: any) => boolean;
declare const isSy: (v: any) => boolean;
declare const isAy: (arg: any) => arg is any[];
declare const isDte: (v: any) => boolean;
declare const isFun: (v: any) => boolean;
declare const isRe: (v: any) => (v: any) => boolean;
declare const isNonNull: (v: any) => boolean;
declare const isNull: (v: any) => boolean;
declare const isUndefined: (v: any) => boolean;
declare const isTrue: (v: any) => boolean;
declare const isFalse: (v: any) => boolean;
declare const isEmp: (v: any) => boolean;
declare const isNonEmp: (v: any) => boolean;
declare const isOdd: (n: any) => boolean;
declare const isEven: (n: any) => boolean;
declare const sSearch: (re: RegExp) => (s: string) => number;
declare const sBrkP123: (quote: string) => (s: string) => {
    p1: string;
    p2: string;
    p3: string;
} | null;
declare const itrIsAllTrue: (a: Iterable<any>) => boolean;
declare const itrIsAllFalse: (a: Iterable<any>) => boolean;
declare const itrIsSomeTrue: (a: Iterable<any>) => boolean;
declare const itrIsSomeFalse: (a: Iterable<any>) => boolean;
declare const itrPredIsAllTrue: (p: p) => (a: Iterable<any>) => boolean;
declare const itrPredIsAllFalse: (p: p) => (a: Iterable<any>) => boolean;
declare const itrPredIsSomeFalse: (p: p) => (a: Iterable<any>) => boolean;
declare const itrPredIsSomeTrue: (p: p) => (a: Iterable<any>) => boolean;
declare const itrBrkForTrueFalse: (p: p) => (a: Iterable<any>) => any[][];
declare const itrAy: (a: Iterable<any>) => any[];
declare const itrFst: (a: Iterable<any>) => any;
declare const itrAddPfxSfx: (pfx: any, sfx: any) => (a: Iterable<any>) => any[];
declare const itrAddPfx: (pfx: any) => (a: Iterable<any>) => any[];
declare const itrAddSfx: (sfx: any) => (a: Iterable<any>) => any[];
declare const itrWdt: (a: Iterable<any>) => number;
declare const itrAlignL: (a: Iterable<any>) => any[];
declare const itrClone: (a: Iterable<any>) => any[];
declare const itrFind: (p: p) => (a: Iterable<any>) => any;
declare const itrHasDup: (a: Iterable<any>) => boolean;
declare const itrDupSet: (a: Iterable<any>) => Set<any>;
declare const itrMax: (a: Iterable<any>) => any;
declare const itrMin: (a: Iterable<any>) => any;
declare const itrRmvEmp: (a: Iterable<any>) => any[];
declare const must: (p: any, t: any) => (v: any) => void;
declare const mnon: (p: any, t: any) => (v: any) => void;
declare const musFun: (v: any) => void;
declare const musNum: (v: any) => void;
declare const musStr: (v: any) => void;
declare const musAy: (v: any) => void;
declare const musObj: (v: any) => void;
declare const musDte: (v: any) => void;
declare const mnonEmp: (v: any) => void;
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
declare const oBringUpDollarPrp: (o: any) => any;
declare const oCmlDry: (o: any) => any[];
declare const oCtorNm: (o: any) => any;
declare const oIsInstance: (instance: any) => (o: any) => boolean;
declare const oHasCtorNm: (nm: any) => (o: any) => boolean;
/**
 * @description return the property value of object {o} by property path {pprPth}
 * @param {string} prpPth
 * @example
 * const a = {b: {c:{1}}
 * require('assert').equal(prp('b.c')(o), 1)
 */
declare const oPrp: (prpPth: string) => (o: object) => object | undefined;
declare const oPrpAy: (prpNy: string[]) => (o: object) => any[];
declare const oPrpNy: (o: any) => string[];
declare const oHasPrp: (prpNm: any) => (o: any) => boolean;
declare const oHasLen: (o: any) => boolean;
declare const oCmlObj: (o: any) => {};
declare const dryColWdt: (colIx: any) => (dry: any) => number;
declare const dryColWdtAy: (dry: any) => any[];
declare const dryCol: (colIx: any) => (dry: any) => any[];
declare const dryColCnt: (dry: any) => any;
declare const dryTfmCell: (f: any) => (dry: any) => void;
declare const dryClone: (dry: any) => any[];
declare const dryTfmCol: (colIx: any) => (f: any) => (dry: any) => void;
declare const drySrt: (fun_of_dr_to_key: any) => (dry: any) => any;
declare const oyPrpCol: (prpNm: any) => (oy: any) => any[];
declare const oyPrpDry: (prpNy: any) => (oy: any) => any[];
declare const _isEsc: (i: any) => true | undefined;
declare const _escSpec: (lik: any) => string;
declare const _escStar: (lik: any) => string;
declare const _escQ: (lik: any) => string;
declare const _esc: (lik: any) => string;
declare const _likRe: (lik: any) => RegExp;
declare const sLik: (lik: string) => (s: string) => boolean;
declare const pthFnAy: (pth: string, lik?: string | undefined) => string[] | null;
declare const ayZip: (a: any[], b: any[]) => any[];
declare const pthFnAyPm: (pth: string, lik?: string | undefined) => Promise<string[]>;
declare const multiply: (a: any) => (b: any) => number;
declare const divide: (a: any) => (b: any) => number;
declare const add: (a: any) => (b: any) => any;
declare const minus: (a: any) => (b: any) => number;
declare const decr: (b: any) => number;
declare const incr: (b: any) => any;
declare const nItr: (n: any) => IterableIterator<number>;
declare const compare: (a: any, b: any) => 0 | 1 | -1;
declare const lazy: (vf: any) => () => any;
declare const optMap: (f: f) => (a: any) => any;
declare const ffnMakBackup: (ffn: string) => void;
declare const lyExpStmt: (ly: any) => string;
declare const curExpStmt: () => any;
declare const fjsRplExpStmt: (fjs: any) => void;
