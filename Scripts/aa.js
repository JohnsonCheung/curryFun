"use strict";
//namespace aa {
//    declare const require: (filename: string) => any;
//    declare const __filename: s;
//    declare type ay = Array<any>;
//    declare type s = string;
//    declare type int = number;
//    declare type f = (a: any) => any;
//    declare type re = RegExp;
//    declare type brk = (sep: sOrRe) => (s: s) => s1s2;
//    declare type tak = (sep: sOrRe) => (s: s) => s;
//    declare type sTfm = (s: s) => s;
//    declare type sOrRe = (s | re);
//    declare type n = int;
//    declare const isSy: (v) => boolean;
//    declare const isRegExp: (v) => boolean;
//    declare const er1: (msg: s) => (...v) => void;
//    interface s1s2 {
//        s1: string;
//        s2: string;
//    }
//    interface erRslt {
//        er: any;
//        rslt: any;
//    }
//    interface path {
//        sep: s;
//    }
//    interface module {
//        exports: any;
//    }
//    declare const module: module;
//    declare const fs: any;
//    declare const path: path;
//    declare const os: any;
//    declare const vEQ: (a: any) => (v: any) => boolean;
//    declare const vNE: (a: any) => (v: any) => boolean;
//    declare const vGT: (a: any) => (v: any) => boolean;
//    declare const vIN: (itr: any) => (v: any) => boolean;
//    declare const vNIN: (itr: any) => (v: any) => boolean;
//    declare const vLT: (a: any) => (v: any) => boolean;
//    declare const vGE: (a: any) => (v: any) => boolean;
//    declare const vLE: (a: any) => (v: any) => boolean;
//    declare const vBET: (a: any, b: any) => (v: any) => boolean;
//    declare const vNBET: (a: any, b: any) => (v: any) => boolean;
//    declare const vIsInstanceOf: (x: any) => (v: any) => boolean;
//    declare const $val: {
//        vGT: (a: any) => (v: any) => boolean;
//        vLT: (a: any) => (v: any) => boolean;
//        vEQ: (a: any) => (v: any) => boolean;
//        vNE: (a: any) => (v: any) => boolean;
//        vGE: (a: any) => (v: any) => boolean;
//        vIN: (itr: any) => (v: any) => boolean;
//        vNIN: (itr: any) => (v: any) => boolean;
//        vBET: (a: any, b: any) => (v: any) => boolean;
//        vNBET: (a: any, b: any) => (v: any) => boolean;
//        vIsInstanceOf: (x: any) => (v: any) => boolean;
//    };
//    declare const ensSy: (sOrSy: any) => any;
//    declare const ensRe: (sOrRe: any) => any;
//    declare const $ens: {
//        ensSy: (sOrSy: any) => any;
//        ensRe: (sOrRe: any) => any;
//    };
//    declare const dmp: any;
//    declare const halt: () => never;
//    declare const er: (msg: string, ...v: any[]) => void;
//    declare const $er: {
//        dmp: any;
//        stop: any;
//        er: (msg: string, ...v: any[]) => void;
//    };
//    declare const split: (sep: string | RegExp) => (s: string) => string[];
//    declare const splitCrLf: (s: string) => string[];
//    declare const splitLf: (s: string) => string[];
//    declare const splitSpc: (s: string) => string[];
//    declare const splitCommaSpc: (s: string) => string[];
//    declare const $sSplit: {
//        split: (sep: string | RegExp) => (s: string) => string[];
//        splitCrLf: (s: string) => string[];
//        splitLf: (s: string) => string[];
//        splitSpc: (s: string) => string[];
//        splitCommaSpc: (s: string) => string[];
//    };
//    declare const ayFst: (ay: any[]) => any;
//    declare const aySnd: (ay: any[]) => any;
//    declare const ayLas: (ay: any[]) => any;
//    declare const ayEle: (ix: number) => (ay: any[]) => any;
//    declare const ayTfm: (f: f) => (ay: any[]) => void;
//    declare const aySetEle: (ix: n) => (v: any) => (ay: ay) => void;
//    declare const ayTfmEle: (ix: number) => (f: f) => (ay: any[]) => any;
//    declare const $ay: {
//        ayFst: (ay: any[]) => any;
//        ayLas: (ay: any[]) => any;
//        aySnd: (ay: any[]) => any;
//        ayEle: (ix: number) => (ay: any[]) => any;
//        aySetEle: (ix: number) => (v: any) => (ay: any[]) => void;
//        ayTfmEle: (ix: number) => (f: f) => (ay: any[]) => any;
//    };
//    declare const jn: (sep: any) => (ay: any) => any;
//    declare const jnCrLf: (ay: any) => any;
//    declare const jnLf: (ay: any) => any;
//    declare const jnSpc: (ay: any) => any;
//    declare const jnComma: (ay: any) => any;
//    declare const jnCommaSpc: (ay: any) => any;
//    declare const $jn: {
//        jn: (sep: any) => (ay: any) => any;
//        jnCrLf: (ay: any) => any;
//        jnLf: (ay: any) => any;
//        jnSpc: (ay: any) => any;
//        jnComma: (ay: any) => any;
//        jnCommaSpc: (ay: any) => any;
//    };
//    declare const fstChr: (s: string) => string;
//    declare const lasChr: (s: string) => string;
//    declare const addPfx: (pfx: string) => (v: any) => string;
//    declare const addSfx: (sfx: string) => (v: any) => string;
//    declare const addPfxSfx: (pfx: string, sfx: string) => (v: any) => string;
//    declare const len: (v: any) => any;
//    declare const midN: (pos: number) => (n: number) => (s: string) => string;
//    declare const mid: (pos: number) => (s: string) => string;
//    declare const left: (n: number) => (s: string) => string;
//    declare const trim: (s: string) => string;
//    declare const right: (n: number) => (s: string) => string;
//    declare const alignL: (w: any) => (s: any) => any;
//    declare const alignR: (w: any) => (s: any) => any;
//    declare const sbsPos: (sbs: string | RegExp) => (s: string) => number;
//    declare const sbsRevPos: (sbs: string | RegExp) => (s: string) => number;
//    declare const cmlNm: (nm: string) => string;
//    declare const cmlNy: (nm: string) => any[];
//    declare const hasPfx: (pfx: string) => (s: string) => boolean;
//    declare const rmvPfx: (pfx: string) => (s: string) => string;
//    declare const hasSfx: (sfx: string) => (s: string) => boolean;
//    declare const rmvSfx: (sfx: string) => (s: string) => string;
//    declare const match: (re: any) => (s: any) => any;
//    declare const notMatch: (re: any) => (s: any) => boolean;
//    declare const $str: {
//        fstChr: (s: string) => string;
//        lasChr: (s: string) => string;
//        addPfx: (pfx: string) => (v: any) => string;
//        addSfx: (sfx: string) => (v: any) => string;
//        addPfxSfx: (pfx: string, sfx: string) => (v: any) => string;
//        len: (v: any) => any;
//        mid: (pos: number) => (s: string) => string;
//        midN: (pos: number) => (n: number) => (s: string) => string;
//        left: (n: number) => (s: string) => string;
//        right: (n: number) => (s: string) => string;
//        sbsPos: (sbs: string | RegExp) => (s: string) => number;
//        sbsRevPos: (sbs: string | RegExp) => (s: string) => number;
//        cmlNy: (nm: string) => any[];
//        cmlNm: (nm: string) => string;
//        alignL: (w: any) => (s: any) => any;
//        alignR: (w: any) => (s: any) => any;
//        hasPfx: (pfx: string) => (s: string) => boolean;
//        rmvPfx: (pfx: string) => (s: string) => string;
//        hasSfx: (sfx: string) => (s: string) => boolean;
//        rmvSfx: (sfx: string) => (s: string) => string;
//        match: (re: any) => (s: any) => any;
//        notMatch: (re: any) => (s: any) => boolean;
//    };
//    declare const predsOr: (...p: any[]) => (v: any) => boolean;
//    declare const predsAnd: (...p: any[]) => (v: any) => boolean;
//    declare const predNot: (pred: any) => (itm: any) => boolean;
//    declare const $pred: {
//        predNot: (pred: any) => (itm: any) => boolean;
//        predsAnd: (...p: any[]) => (v: any) => boolean;
//        predsOr: (...p: any[]) => (v: any) => boolean;
//    };
//    declare const isRmkLin: (lin: any) => boolean;
//    declare const isNonRmkLin: (itm: any) => boolean;
//    declare const linRmvMsg: (lin: any) => any;
//    declare const $lin: {
//        isRmkLin: (lin: any) => boolean;
//        isNonRmkLin: (itm: any) => boolean;
//        linRmvMsg: (lin: any) => any;
//    };
//    declare const brkAt: (at: n, len: n) => (s: s) => s1s2;
//    declare const brk1: brk;
//    declare const brk2: brk;
//    declare const brk: brk;
//    declare const $sBrk: {
//        brkAt: (at: number, len: number) => (s: string) => s1s2;
//        brk1: brk;
//        brk2: brk;
//        brk: brk;
//    };
//    declare const takBef: tak;
//    declare const takAft: tak;
//    declare const $sTak: {
//        takBef: tak;
//        takAft: tak;
//    };
//    declare const revBrk1: brk;
//    declare const revBrk2: brk;
//    declare const revBrk: brk;
//    declare const revTakBef: tak;
//    declare const revTakAft: tak;
//    declare const $sRev: {
//        revBrk: brk;
//        revBrk1: brk;
//        revBrk2: brk;
//        revTakBef: tak;
//        revTakAft: tak;
//    };
//    declare const rmvFstChr: sTfm;
//    declare const rmvLasChr: sTfm;
//    declare const rmvSubStr: (sbs: string) => (s: string) => string;
//    declare const rmvColon: (s: string) => string;
//    declare const $sRmv: {
//        rmvFstChr: sTfm;
//        rmvLasChr: sTfm;
//        rmvSubStr: (sbs: string) => (s: string) => string;
//        rmvColon: (s: string) => string;
//    };
//    declare const pthSep: string;
//    declare const $fsPth: {
//        pthSep: string;
//    };
//    declare const ffnPth: (ffn: string) => string;
//    declare const ffnFn: (ffn: string) => string;
//    declare const ffnExt: (ffn: string) => string;
//    declare const rmvExt: (ffn: string) => string;
//    declare const ffnFnn: (ffn: string) => string;
//    declare const $fsFfn: {
//        ffnPth: (ffn: string) => string;
//        ffnFn: (ffn: string) => string;
//        ffnExt: (ffn: string) => string;
//        rmvExt: (ffn: string) => string;
//        ffnFnn: (ffn: string) => string;
//    };
//    declare const ftLines: (ft: s) => s;
//    declare const ftLy: (ft: s) => s[];
//    declare const $fsFt: {
//        ftLines: (ft: string) => string;
//        ftLy: (ft: string) => string[];
//    };
//    declare const tmpNm: () => string;
//    declare const tmpPth: string;
//    declare const tmpFfn: (pfx: string, ext: any) => string;
//    declare const tmpFt: () => string;
//    /**
//     * return a new temp file by copying {fm}
//     * @param {ffn} fm
//     */
//    declare const tmpFilFm: (fm: any) => string;
//    declare const $fsTmp: {
//        tmpNm: () => string;
//        tmpPth: string;
//        tmpFfn: (pfx: string, ext: any) => string;
//        tmpFt: () => string;
//        tmpFilFm: (fm: any) => string;
//    };
//    /**
//     * @description return a Promise of {er,rslt} by calling f(...,p,cb), where cb is (er,rslt)=>{...}
//     * it is usefully in creating a promise by any async f(...p,cb), assuming cb is (er,rslt)=>{...}
//     * @param {(er,rslt)=>void} f
//     * @param {...any} p
//     * @see
//     */
//    declare const pm: (f: any, ...p: any[]) => Promise<{}>;
//    declare const $pm: {
//        pm: (f: any, ...p: any[]) => Promise<{}>;
//    };
//    declare const ftLinesPm: (ft: string) => Promise<{
//        er: any;
//        lines: any;
//    }>;
//    declare const ftLyPm: (ft: string) => Promise<{
//        er: any;
//        ly: string[];
//    }>;
//    declare const $fsPm: {
//        ftLinesPm: (ft: string) => Promise<{
//            er: any;
//            lines: any;
//        }>;
//        ftLyPm: (ft: string) => Promise<{
//            er: any;
//            ly: string[];
//        }>;
//    };
//    declare const where: (p: any) => (itr: any) => any[];
//    declare const map: (f: any) => (itr: any) => any[];
//    declare const each: (f: any) => (itr: any) => void;
//    declare const fold: (f: any) => (cum: any) => (itr: any) => any;
//    declare const reduce: (f: any) => (itr: any) => any;
//    declare const $itrOperation: {
//        where: (p: any) => (itr: any) => any[];
//        map: (f: any) => (itr: any) => any[];
//        each: (f: any) => (itr: any) => void;
//        fold: (f: any) => (cum: any) => (itr: any) => any;
//        reduce: (f: any) => (itr: any) => any;
//    };
//    declare const mapKy: (mp: any) => (itr: any) => any[];
//    declare const mapVy: (mp: any) => any[];
//    declare const mapKvy: (mp: any) => any[];
//    declare const mapKset: (mp: any) => Set<{}>;
//    declare const $map: {
//        mapKy: (mp: any) => (itr: any) => any[];
//        mapVy: (mp: any) => any[];
//        mapKvy: (mp: any) => any[];
//        mapKset: (mp: any) => Set<{}>;
//    };
//    declare const setAy: (set: any) => any[];
//    declare const setWhere: (p: any) => (set: any) => Set<any>;
//    declare const setAdd: (x: any) => (set: any) => any;
//    declare const setMinus: (x: any) => (set: any) => any;
//    declare const setAft_: (incl: any, a: any, set: any) => Set<any>;
//    declare const setAft: (a: any) => (set: any) => Set<any>;
//    declare const setAftIncl: (a: any) => (set: any) => Set<any>;
//    declare const setClone: (set: any) => Set<any>;
//    declare const itrSet: (itr: any) => Set<any>;
//    declare const setMap: (f: any) => (set: any) => Set<any>;
//    declare const $set: {
//        setAft: (a: any) => (set: any) => Set<any>;
//        setAftIncl: (a: any) => (set: any) => Set<any>;
//        setMinus: (x: any) => (set: any) => any;
//        setAdd: (x: any) => (set: any) => any;
//        setAy: (set: any) => any[];
//        setWhere: (p: any) => (set: any) => Set<any>;
//        setMap: (f: any) => (set: any) => Set<any>;
//        setClone: (set: any) => Set<any>;
//    };
//    declare const lyReDry: (re: any) => (ly: any) => any[];
//    declare const lyReCol: (re: any) => (ly: any) => any[];
//    declare const matchAyDry: (matchAy: any) => any[];
//    declare const matchAyFstCol: (matchAy: any) => any[];
//    declare const lyMatchAy: (re: any) => (ly: any) => any[];
//    declare const matchDr: (match: any) => any[];
//    declare const lyConstNy: (ly: any) => any[];
//    declare const lyConstDollarNy: (ly: any) => any[];
//    declare const ftConstNy: (ft: any) => any;
//    declare const ftConstDollarNy: (ft: any) => any;
//    declare const $src: {
//        ftConstDollarNy: (ft: any) => any;
//        ftConstNy: (ft: any) => any;
//        lyReDry: (re: any) => (ly: any) => any[];
//        lyReCol: (re: any) => (ly: any) => any[];
//        lyMatchAy: (re: any) => (ly: any) => any[];
//        lyConstNy: (ly: any) => any[];
//    };
//    declare const isStr: (v: any) => boolean;
//    declare const isNum: (v: any) => boolean;
//    declare const isBool: (v: any) => boolean;
//    declare const isObj: (v: any) => boolean;
//    declare const isAy: (arg: any) => arg is any[];
//    declare const isDte: (v: any) => boolean;
//    declare const isFun: (v: any) => boolean;
//    declare const isRe: (v: any) => (v: any) => boolean;
//    declare const isNonNull: (v: any) => boolean;
//    declare const isNull: (v: any) => boolean;
//    declare const isUndefined: (v: any) => boolean;
//    declare const isTrue: (v: any) => boolean;
//    declare const isFalse: (v: any) => boolean;
//    declare const isEmp: (v: any) => boolean;
//    declare const isNonEmp: (v: any) => boolean;
//    declare const isOdd: (n: any) => boolean;
//    declare const isEven: (n: any) => boolean;
//    declare const $is: {
//        isFun: (v: any) => boolean;
//        isStr: (v: any) => boolean;
//        isNum: (v: any) => boolean;
//        isDte: (v: any) => boolean;
//        isBool: (v: any) => boolean;
//        isNull: (v: any) => boolean;
//        isUndefined: (v: any) => boolean;
//        isNonNull: (v: any) => boolean;
//        isOdd: (n: any) => boolean;
//        isEven: (n: any) => boolean;
//        isEmp: (v: any) => boolean;
//        isNonEmp: (v: any) => boolean;
//        isTrue: (v: any) => boolean;
//        isFalse: (v: any) => boolean;
//    };
//    declare const itrIsAllTrue: (itr: any) => boolean;
//    declare const itrIsAllFalse: (itr: any) => boolean;
//    declare const itrIsSomeTrue: (itr: any) => boolean;
//    declare const itrIsSomeFalse: (itr: any) => boolean;
//    declare const itrPredIsAllTrue: (pred: any) => (itr: any) => boolean;
//    declare const itrPredIsAllFalse: (pred: any) => (itr: any) => boolean;
//    declare const itrPredIsSomeFalse: (pred: any) => (itr: any) => boolean;
//    declare const itrPredIsSomeTrue: (pred: any) => (itr: any) => boolean;
//    declare const itrBrkForTrueFalse: (pred: any) => (itr: any) => any[][];
//    declare const itrAy: (itr: any) => any[];
//    declare const itrFst: (itr: any) => any;
//    declare const itrAddPfxSfx: (pfx: any, sfx: any) => (itr: any) => any[];
//    declare const itrAddPfx: (pfx: any) => (itr: any) => any[];
//    declare const itrAddSfx: (sfx: any) => (itr: any) => any[];
//    declare const itrWdt: (itr: any) => any;
//    declare const itrAlignL: (itr: any) => any[];
//    declare const itrClone: (itr: any) => any[];
//    declare const itrFind: (pred: any) => (iter: any) => any;
//    declare const itrHasDup: (itr: any) => boolean;
//    declare const itrMax: (itr: any) => any;
//    declare const itrMin: (itr: any) => any;
//    declare const itrRmvEmp: (itr: any) => any[];
//    declare const $itr: {
//        itrAy: (itr: any) => any[];
//        itrMax: (itr: any) => any;
//        itrMin: (itr: any) => any;
//        itrHasDup: (itr: any) => boolean;
//        itrClone: (itr: any) => any[];
//        itrFind: (pred: any) => (iter: any) => any;
//        itrRmvEmp: (itr: any) => any[];
//    };
//    declare const must: (p: any, t: any) => (v: any) => void;
//    declare const mnon: (p: any, t: any) => (v: any) => void;
//    declare const musFun: (v: any) => void;
//    declare const musNum: (v: any) => void;
//    declare const musStr: (v: any) => void;
//    declare const musAy: (v: any) => void;
//    declare const musObj: (v: any) => void;
//    declare const musDte: (v: any) => void;
//    declare const mnonEmp: (v: any) => void;
//    declare const $must: {
//        must: (p: any, t: any) => (v: any) => void;
//        mnon: (p: any, t: any) => (v: any) => void;
//        musFun: (v: any) => void;
//        musNum: (v: any) => void;
//        musStr: (v: any) => void;
//        musAy: (v: any) => void;
//        musDte: (v: any) => void;
//        mnonEmp: (v: any) => void;
//    };
//    /**
//     * Bring up all {o} child object member up one level.  Throw exception if there is name conflict
//     * assume all members of {o} are objects
//     * @param {obj} o
//     * @example
//     * const $a = {a1:'a1',a2:'s2'}
//     * const $b = {b1:'b1',b2:'b2'}
//     * const o = {$a,$b}
//     * bringUp(o)
//     * eq(o,{$a,$b,a1,a2,b1,b2})
//     * //-----------
//     * $a.x = 1
//     * $b.x = 2
//     * thw(bringUp(o))
//     */
//    declare const oBringUpDollarPrp: (o: any) => any;
//    declare const oCmlDry: (o: any) => any[];
//    declare const oCtorNm: (o: any) => any;
//    declare const oIsInstance: (instance: any) => (o: any) => boolean;
//    declare const oHasCtorNm: (nm: any) => (o: any) => boolean;
//    /**
//     * @description return the property value of object {o} by property path {pprPth}
//     * @param {string} prpPth
//     * @example
//     * const a = {b: {c:{1}}
//     * require('assert').equal(prp('b.c')(o), 1)
//     */
//    declare const oPrp: (prpPth: any) => (o: any) => any;
//    declare const oPrpAy: (prpNy: any) => (o: any) => any[];
//    declare const oPrpNy: (o: any) => string[];
//    declare const oHasPrp: (prpNm: any) => (o: any) => boolean;
//    declare const oHasLen: (o: any) => boolean;
//    declare const oCmlObj: (o: any) => {};
//    declare const $obj: {
//        oPrp: (prpPth: any) => (o: any) => any;
//        oPrpAy: (prpNy: any) => (o: any) => any[];
//        oPrpNy: (o: any) => string[];
//        oHasPrp: (prpNm: any) => (o: any) => boolean;
//        oHasLen: (o: any) => boolean;
//        oBringUpDollarPrp: (o: any) => any;
//        oCmlDry: (o: any) => any[];
//        oCtorNm: (o: any) => any;
//        oHasCtorNm: (nm: any) => (o: any) => boolean;
//        oCmlObj: (o: any) => {};
//    };
//    declare const dryColWdt: (colIx: any) => (dry: any) => any;
//    declare const dryColWdtAy: (dry: any) => any[];
//    declare const dryCol: (colIx: any) => (dry: any) => void;
//    declare const dryColCnt: (dry: any) => any;
//    declare const dryTfmCell: (f: any) => (dry: any) => void;
//    declare const dryClone: (dry: any) => any[];
//    declare const dryTfmCol: (colIx: any) => (f: any) => (dry: any) => void;
//    declare const drySrt: (fun_of_dr_to_key: any) => (dry: any) => any;
//    declare const $dry: {
//        drySrt: (fun_of_dr_to_key: any) => (dry: any) => any;
//        dryTfmCell: (f: any) => (dry: any) => void;
//        dryTfmCol: (colIx: any) => (f: any) => (dry: any) => void;
//        dryColWdt: (colIx: any) => (dry: any) => any;
//        dryCol: (colIx: any) => (dry: any) => void;
//        dryColCnt: (dry: any) => any;
//        dryColWdtAy: (dry: any) => any[];
//    };
//    declare const oyPrpCol: (prpNm: any) => (oy: any) => any[];
//    declare const oyPrpDry: (prpNy: any) => (oy: any) => any[];
//    declare const $oy: {
//        oyPrpCol: (prpNm: any) => (oy: any) => any[];
//        oyPrpDry: (prpNy: any) => (oy: any) => any[];
//    };
//    declare const pipe: (v: any) => (...f: any[]) => any;
//    declare const apply: (o: any) => (f: any) => any;
//    declare const swap: (f: any) => (a: any) => (b: any) => any;
//    declare const compose: (...f: any[]) => (v: any) => any;
//    declare const $fun: {
//        swap: (f: any) => (a: any) => (b: any) => any;
//        pipe: (v: any) => (...f: any[]) => any;
//        compose: (...f: any[]) => (v: any) => any;
//        apply: (o: any) => (f: any) => any;
//    };
//    declare const multiply: (a: any) => (b: any) => number;
//    declare const divide: (a: any) => (b: any) => number;
//    declare const add: (a: any) => (b: any) => any;
//    declare const minus: (a: any) => (b: any) => number;
//    declare const nDecr: (b: any) => number;
//    declare const nIncr: (b: any) => any;
//    declare const nItr: (n: any) => IterableIterator<number>;
//    declare const $num: {
//        multiply: (a: any) => (b: any) => number;
//        divide: (a: any) => (b: any) => number;
//        add: (a: any) => (b: any) => any;
//        minus: (a: any) => (b: any) => number;
//        nDecr: (b: any) => number;
//        nIncr: (b: any) => any;
//    };
//    declare const compare: (a: any, b: any) => 0 | 1 | -1;
//    declare const $operation: {
//        compare: (a: any, b: any) => 0 | 1 | -1;
//    };
//    declare const lazy: (vf: any) => () => any;
//    declare const $lazy: {
//        lazy: (vf: any) => () => any;
//    };
//    declare const $: {
//        $lazy: {
//            lazy: (vf: any) => () => any;
//        };
//        $ay: {
//            ayFst: (ay: any[]) => any;
//            ayLas: (ay: any[]) => any;
//            aySnd: (ay: any[]) => any;
//            ayEle: (ix: number) => (ay: any[]) => any;
//            aySetEle: (ix: number) => (v: any) => (ay: any[]) => void;
//            ayTfmEle: (ix: number) => (f: f) => (ay: any[]) => any;
//        };
//        $obj: {
//            oPrp: (prpPth: any) => (o: any) => any;
//            oPrpAy: (prpNy: any) => (o: any) => any[];
//            oPrpNy: (o: any) => string[];
//            oHasPrp: (prpNm: any) => (o: any) => boolean;
//            oHasLen: (o: any) => boolean;
//            oBringUpDollarPrp: (o: any) => any;
//            oCmlDry: (o: any) => any[];
//            oCtorNm: (o: any) => any;
//            oHasCtorNm: (nm: any) => (o: any) => boolean;
//            oCmlObj: (o: any) => {};
//        };
//        $val: {
//            vGT: (a: any) => (v: any) => boolean;
//            vLT: (a: any) => (v: any) => boolean;
//            vEQ: (a: any) => (v: any) => boolean;
//            vNE: (a: any) => (v: any) => boolean;
//            vGE: (a: any) => (v: any) => boolean;
//            vIN: (itr: any) => (v: any) => boolean;
//            vNIN: (itr: any) => (v: any) => boolean;
//            vBET: (a: any, b: any) => (v: any) => boolean;
//            vNBET: (a: any, b: any) => (v: any) => boolean;
//            vIsInstanceOf: (x: any) => (v: any) => boolean;
//        };
//        $er: {
//            dmp: any;
//            stop: any;
//            er: (msg: string, ...v: any[]) => void;
//        };
//        $fsFfn: {
//            ffnPth: (ffn: string) => string;
//            ffnFn: (ffn: string) => string;
//            ffnExt: (ffn: string) => string;
//            rmvExt: (ffn: string) => string;
//            ffnFnn: (ffn: string) => string;
//        };
//        $fun: {
//            swap: (f: any) => (a: any) => (b: any) => any;
//            pipe: (v: any) => (...f: any[]) => any;
//            compose: (...f: any[]) => (v: any) => any;
//            apply: (o: any) => (f: any) => any;
//        };
//        $is: {
//            isFun: (v: any) => boolean;
//            isStr: (v: any) => boolean;
//            isNum: (v: any) => boolean;
//            isDte: (v: any) => boolean;
//            isBool: (v: any) => boolean;
//            isNull: (v: any) => boolean;
//            isUndefined: (v: any) => boolean;
//            isNonNull: (v: any) => boolean;
//            isOdd: (n: any) => boolean;
//            isEven: (n: any) => boolean;
//            isEmp: (v: any) => boolean;
//            isNonEmp: (v: any) => boolean;
//            isTrue: (v: any) => boolean;
//            isFalse: (v: any) => boolean;
//        };
//        $num: {
//            multiply: (a: any) => (b: any) => number;
//            divide: (a: any) => (b: any) => number;
//            add: (a: any) => (b: any) => any;
//            minus: (a: any) => (b: any) => number;
//            nDecr: (b: any) => number;
//            nIncr: (b: any) => any;
//        };
//        $oy: {
//            oyPrpCol: (prpNm: any) => (oy: any) => any[];
//            oyPrpDry: (prpNy: any) => (oy: any) => any[];
//        };
//        $pm: {
//            pm: (f: any, ...p: any[]) => Promise<{}>;
//        };
//        $fsPm: {
//            ftLinesPm: (ft: string) => Promise<{
//                er: any;
//                lines: any;
//            }>;
//            ftLyPm: (ft: string) => Promise<{
//                er: any;
//                ly: string[];
//            }>;
//        };
//        $fsPth: {
//            pthSep: string;
//        };
//        $sSplit: {
//            split: (sep: string | RegExp) => (s: string) => string[];
//            splitCrLf: (s: string) => string[];
//            splitLf: (s: string) => string[];
//            splitSpc: (s: string) => string[];
//            splitCommaSpc: (s: string) => string[];
//        };
//        $str: {
//            fstChr: (s: string) => string;
//            lasChr: (s: string) => string;
//            addPfx: (pfx: string) => (v: any) => string;
//            addSfx: (sfx: string) => (v: any) => string;
//            addPfxSfx: (pfx: string, sfx: string) => (v: any) => string;
//            len: (v: any) => any;
//            mid: (pos: number) => (s: string) => string;
//            midN: (pos: number) => (n: number) => (s: string) => string;
//            left: (n: number) => (s: string) => string;
//            right: (n: number) => (s: string) => string;
//            sbsPos: (sbs: string | RegExp) => (s: string) => number;
//            sbsRevPos: (sbs: string | RegExp) => (s: string) => number;
//            cmlNy: (nm: string) => any[];
//            cmlNm: (nm: string) => string;
//            alignL: (w: any) => (s: any) => any;
//            alignR: (w: any) => (s: any) => any;
//            hasPfx: (pfx: string) => (s: string) => boolean;
//            rmvPfx: (pfx: string) => (s: string) => string;
//            hasSfx: (sfx: string) => (s: string) => boolean;
//            rmvSfx: (sfx: string) => (s: string) => string;
//            match: (re: any) => (s: any) => any;
//            notMatch: (re: any) => (s: any) => boolean;
//        };
//        $fsTmp: {
//            tmpNm: () => string;
//            tmpPth: string;
//            tmpFfn: (pfx: string, ext: any) => string;
//            tmpFt: () => string;
//            tmpFilFm: (fm: any) => string;
//        };
//        $sRmv: {
//            rmvFstChr: sTfm;
//            rmvLasChr: sTfm;
//            rmvSubStr: (sbs: string) => (s: string) => string;
//            rmvColon: (s: string) => string;
//        };
//        $sRev: {
//            revBrk: brk;
//            revBrk1: brk;
//            revBrk2: brk;
//            revTakBef: tak;
//            revTakAft: tak;
//        };
//        $jn: {
//            jn: (sep: any) => (ay: any) => any;
//            jnCrLf: (ay: any) => any;
//            jnLf: (ay: any) => any;
//            jnSpc: (ay: any) => any;
//            jnComma: (ay: any) => any;
//            jnCommaSpc: (ay: any) => any;
//        };
//        $map: {
//            mapKy: (mp: any) => (itr: any) => any[];
//            mapVy: (mp: any) => any[];
//            mapKvy: (mp: any) => any[];
//            mapKset: (mp: any) => Set<{}>;
//        };
//        $set: {
//            setAft: (a: any) => (set: any) => Set<any>;
//            setAftIncl: (a: any) => (set: any) => Set<any>;
//            setMinus: (x: any) => (set: any) => any;
//            setAdd: (x: any) => (set: any) => any;
//            setAy: (set: any) => any[];
//            setWhere: (p: any) => (set: any) => Set<any>;
//            setMap: (f: any) => (set: any) => Set<any>;
//            setClone: (set: any) => Set<any>;
//        };
//        $itr: {
//            itrAy: (itr: any) => any[];
//            itrMax: (itr: any) => any;
//            itrMin: (itr: any) => any;
//            itrHasDup: (itr: any) => boolean;
//            itrClone: (itr: any) => any[];
//            itrFind: (pred: any) => (iter: any) => any;
//            itrRmvEmp: (itr: any) => any[];
//        };
//        $fsFt: {
//            ftLines: (ft: string) => string;
//            ftLy: (ft: string) => string[];
//        };
//        $lin: {
//            isRmkLin: (lin: any) => boolean;
//            isNonRmkLin: (itm: any) => boolean;
//            linRmvMsg: (lin: any) => any;
//        };
//    };
//}
