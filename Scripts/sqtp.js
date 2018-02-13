"use strict";
/*
import {
    add, addPfx, addPfxSfx, addSfx, alignL, alignR, apply, assertIsPthExist, ayEle, ayFindIx, ayFindIxOrDft, ayFst, ayLas, aySetEle, aySnd, ayTfm,
    ayTfmEle, ayZip, brk, brk1, brk2, brkAt, brkQuote, cmlNm, cmlNy, compare, compose, curExpStmt, decr, dft, divide, dmp, dryClone, dryCol, dryColCnt,
    dryColWdt, dryColWdtAy, drySrt, dryTfmCell, dryTfmCol, each, ensRe, ensSy, eq, er, exclude, ffnAddFnSfx, ffnExt, ffnFfnn,
    ffnFn, ffnFnn, ffnMakBackup, ffnPth, fjsRplExpStmt, fold, fs, fstChr, ftConstDollarNy, ftConstNy, ftLines, ftLinesPm, ftLy, ftLyPm, funDmp, halt,
    hasPfx, hasSfx, incr, isAy, isBool, isDte, isEmp, isEven, isFalse, isFun, isNonEmp, isNonNull, isNonRmkLin, isNull, isNum, isObj, isOdd, isPthExist,
    isRe, isRmkLin, isStr, isSy, isTrue, isUndefined, itrAddPfx, itrAddPfxSfx, itrAddSfx, itrAlignL, itrAy, itrBrkForTrueFalse, itrClone, itrDupSet, itrFind,
    itrFst, itrHasDup, itrIsAllFalse, itrIsAllTrue, itrIsSomeFalse, itrIsSomeTrue, itrMax, itrMin, itrPredIsAllFalse, itrPredIsAllTrue, itrPredIsSomeFalse,
    itrPredIsSomeTrue, itrRmvEmp, itrSet, itrWdt, jn, jnComma, jnCommaSpc, jnCrLf, jnLf, jnSpc, lasChr, lazy, left, len, linRmvMsg, lyConstDollarNy,
    lyConstNy, lyExpStmt, lyMatchAy, lyReCol, lyReDry, map, mapKset, mapKvy, mapKy, mapVy, match, matchAyDry, matchAyFstCol, matchDr, mid, midN, minus,
    mnon, mnonEmp, multiply, musAy, musDte, musFun, musNum, musObj, musStr, must, nItr, notMatch, oBringUpDollarPrp, oCmlDry, oCmlObj, oCtorNm, oHasCtorNm,
    oHasLen, oHasPrp, oIsInstance, oPrp, oPrpAy, oPrpNy, optMap, os, oyPrpCol, oyPrpDry, padZero, path, pipe, pm, predNot, predsAnd, predsOr, pthEns,
    pthEnsSfxSep, pthEnsSubFdr, pthFnAy, pthFnAyPm, pthSep, quote, reduce, revBrk, revBrk1, revBrk2, revTakAft, revTakBef, right, rmvColon, rmvExt, rmvFstChr,
    rmvLasChr, rmvLasNChr, rmvPfx, rmvSfx, rmvSubStr, sBox, sBrkP123, sEsc, sEscCr, sEscLf, sEscTab, sLik, sSearch, sWrt, sbsPos, sbsRevPos, setAdd, setAft,
    setAftIncl, setAy, setClone, setMap, setMinus, setWhere, split, splitCommaSpc, splitCrLf, splitLf, splitSpc, stack, strictEqual, swap, takAft, takBef,
    tmpFfn, tmpFilFm, tmpFt, tmpNm, tmpPth, trim, vBET, vEQ, vGE, vGT, vIN, vIsInstanceOf, vLE, vLT, vNBET, vNE, vNIN, where
} from './curryfun.js'
*/
const lyFstNonRmkLin = (ly) => {
    "";
};
const sqtprslt = sqtp => {
    let a1 = splitLf(sqtp);
    let a2 = lyRmvMsg(a1);
    let a3 = lyGp(a2);
    let a4 = gpRmvRmk(a3);
    let a5 = gpGpy('==')(a4);
    let a6 = gpyBky(a5);
    let a7 = rm01(a6);
    let a8 = er02(a7);
    let a9 = pm03(a8);
    let b1 = sw04(a9);
    let b2 = sq05(b1);
    return b2;
};
const lyRmvMsg = ly => pipe(ly)(map(linRmvMsg), itrRmvEmp);
const gpRmvRmk = gp => where(([ix, lin]) => isNonRmkLin(lin))(gp);
const lyGp = ly => {
    const o = [];
    let i = 0;
    for (let lin of ly)
        o.push([i++, lin]);
    return o;
};
const pm03 = ({ bky, er }) => {
    const [pmBky, remainBky] = itrBrkForTrueFalse(isPmBk)(bky);
    const e1 = bkyExcessBkIXLNER('parameter')(pmBky);
    const [e2, pm] = bkPm(pmBky[0]);
    er = e1.concat(e2);
    return { bky: remainBky, pm, er };
};
const sw04 = ({ bky, pm, er }) => {
    const [swBky, remainBky] = itrBrkForTrueFalse(isSwBk)(bky);
    debugger;
    const e1 = bkyExcessBkIXLNER('switch')(swBky);
    const [e2, sw] = bkSw(pm)(swBky[0]);
    const e = e1.concat(e2);
    return { bky: remainBky, pm, sw, er: e };
};
const sq05 = ({ bky, sw, pm, er }) => {
    let vtp = "", sq = "";
    return { vtp, sq };
};
const rm01 = bky => where(bk => bk.bkty !== 0 /* RM */)(bky);
const er02 = bky => {
    let er = [][er, bky] = itrBrkForTrueFalse(isErBk)(bky);
    return { bky, er };
};
const bkLasIx = (bk) => bk.gp.length - 1;
const bkyEr = msg => (bky) => {
    const o = [];
    for (let bk of bky) {
        const ix = bkLasIx(bk);
        o.push(new Er(ix, [], [msg]));
    }
    return o;
};
const bkyExcessBkIXLNER = bkNm => bky => {
    const a = itrClone(bky);
    a.shift();
    return bkyEr(`Three is already [${bkNm}] block.  This block is ignored`)(a);
};
const gpGpy = sep => gp => {
    const o = [];
    let buf = [];
    for (let [ix, lin] of gp) {
        if (hasPfx(sep)(lin)) {
            if (buf.length !== 0)
                o.push(buf);
            buf = [];
        }
        else
            buf.push([ix, lin]);
    }
    if (buf.length !== 0)
        o.push(buf);
    return o;
};
const gpRmvRmkLin = gp => {
};
const gpyRmvRmkLin = gpy => map(gpRmvRmkLin)(gpy);
const lyPfxCnt = pfx => ly => {
    let o = 0;
    const p = hasPfx(pfx);
    for (let i of ly)
        if (p(i))
            o++;
    return o;
};
const assertAyIsEqLen = ay1 => ay2 => {
    if (ay1.length !== ay2.length)
        er('two ay are diff len', { ay1, ay2 });
};
const lyHasMajPfx = pfx => ly => lyPfxCnt(pfx)(ly) > (ly.length / 2);
const isRmLy = ly => itrPredIsAllTrue(isRmkLin)(ly);
const isPmLy = ly => lyHasMajPfx("%")(ly);
const isSwLy = ly => lyHasMajPfx("?")(ly);
const isSqLy = ly => rmvPfx(lyFstNonRmkLin(ly), "?");
const gpLy = gp => map(aySnd)(gp);
const gpyBky = gpy => {
    const lyy = map(gpLy)(gpy);
    const bktyy = map(lyBkty)(lyy);
    const z = ayZip(bktyy, gpy);
    const o = map(([bkty, gp]) => { return { bkty, gp }; })(z);
    return o;
};
const isBkEqBkty = (bkty) => bk => bk.bkty === bkty;
const isErBk = isBkEqBkty(4 /* ER */);
const isSwBk = isBkEqBkty(2 /* SW */);
const isPmBk = isBkEqBkty(1 /* PM */);
const isSqBk = isBkEqBkty(3 /* SQ */);
const lyBkty = ly => isRmLy(ly) ? 0 /* RM */ :
    isPmLy(ly) ? 1 /* PM */ :
        isSwLy(ly) ? 2 /* SW */ :
            isSqLy(ly) ? 3 /* SQ */ : 4 /* ER */;
const gpBk = gp => { bkty: lyBkty(gpLy(gp)), gp; };
const linShift = lin => {
    const o = lin.trim();
    const a = o.match(/(\S*)\s*(.*)/);
    return [a[1] || "", a[2] || ""];
};
const linFstTerm = lin => linShift(lin)[0];
const lyMap = ly => {
    const o = new Map();
    for (let lin of ly) {
        const [k, v] = linShift(lin);
        o.set(k, v);
    }
    return o;
};
const lyFstTermAy = ly => map(linFstTerm)(ly);
const lyFstTermDupSet = ly => {
    const a = map(linFstTerm)(ly);
    return itrDupSet(a);
};
const gpDupFstTermEr = gp => {
    const dup = lyFstTermDupSet(gpLy(gp));
    const o = [];
    for (let [ix, lin] of gp) {
        let fst = linFstTerm(lin);
        if (dup.has(fst)) {
            let sfxMsg = [`"duplicate(${fst})`];
            let endMsg = [];
            const er = { ix, sfxMsg, endMsg };
            o.push(er);
        }
    }
    return o;
};
const bkPm = bk => {
    if (bk === undefined)
        return [[], new Map()];
    const er = gpDupFstTermEr(bk.gp);
    const ly = gpLy(bk.gp);
    const pm = lyMap(ly);
    return [er, pm];
};
const vdt = ([itmErPred, itmErMap]) => ([ery, itr]) => {
    const [erItr, remainingItr] = itrBrkForTrueFalse(itmErPred)(itr);
    const ery1 = map(itmErMap)(erItr);
    const ery2 = ery.concat(ery1);
    return [ery2, remainingItr];
};
const linTermAy = lin => lin.trim().split(/\s+/);
const linFmT3DupTermSet = lin => {
    let termAy = linTermAy(lin);
    termAy.shift();
    termAy.shift();
    return itrDupSet(termAy);
};
const linTermPosAy = lin => {
    let a = lin;
    const o = [];
    let j = 0;
    let pos = 0;
    do {
        if ((j++) > 100)
            throw new Error('looping too much');
        let [x, a1, a2, a3] = a.match(/(\s*)(\S+)(.*)/);
        if (a1 !== "") {
            pos = pos + a1.length;
            o.push(pos);
            pos = pos + a2.length;
        }
        else {
            if (a3 !== "")
                throw new Error('impossible');
        }
        a = a3;
    } while (a.trim() !== "");
    return o;
};
//const xx  = linTermPosAy(" sdf lk fdf d  ")
const linAddMrk = (lin, pos, len) => {
    const s = spc(pos - lin.length);
    const m = '^'.repeat(len);
    return lin + s + m;
};
const linFmT3DupTermMrk = lin => {
    const dup = linFmT3DupTermSet(lin);
    const termPosAy = linTermPosAy(lin);
    const termAy = linTermAy(lin);
    let o = "";
    for (let j = 2; j < termAy.length; j++) {
        let term = termAy[j];
        if (dup.has(term)) {
            const pos = termPosAy[j];
            const len = term.length;
            o = linAddMrk(o, pos, len);
        }
    }
    return o;
};
class Er {
    constructor(ix, sfxMsg, endMsg) {
        this.ix = ix;
        this.sfxMsg = sfxMsg;
        this.endMsg = endMsg;
    }
}
const SwEr = {
    FmT3Dup: {
        hasEr: ([ix, lin]) => linFmT3DupTermSet(lin).size > 0,
        erFun: ([ix, lin]) => new Er(ix, [linFmT3DupTermMrk(lin)], [])
    }
};
const gperVdt = (er, gp) => (chkr) => {
    const p = chkr.hasEr;
    const m = chkr.erFun;
    const [erGp, remainingGp] = gpSplitForErAndRemain(p)(gp);
    const e1 = map(m)(erGp);
    return [[], gp];
};
const bkSw_process_SwEr = (gp, er, SwEr) => { };
const bkSw = pm => bk => {
    if (bk === undefined)
        return [[], new Map()];
    let er = gpDupFstTermEr(bk.gp);
    let gp = bk.gp;
    let e = [];
    for (let swErItm of oPrpAy(SwEr)) {
        [e, gp] = gperVdt(er, gp)(swErItm);
        er = er.concat(e);
    }
    const sw = lySw(gpLy(gp));
    return [er, sw];
};
const gpSplitForErAndRemain = p => gp => [[], []];
const lySw = ly => new Map();
//=====================================================
const sqtp = `-- Rmk: -- is remark
-- %XX: is prmDicLin
-- %?XX: is switchPrm, it value must be 0 or 1
-- ?XX: is switch line
-- SwitchLin: is ?XXX [OR|AND|EQ|NE] [SwPrm_OR_AND|SwPrm_EQ_NE]
-- SwPrm_OR_AND: SwTerm ..
-- SwPrm_EQ_NE:  SwEQ_NE_T1 SwEQ_NE_T2
-- SwEQ_NE_T1: 
-- SwEQ_NE_T2: 
-- SwTerm:     ?XX|%?XX     -- if %?XX, its value only 1 or 0 is allowed
-- Only one gp of %XX:
-- Only one gp of ?XX:
-- All other gp is sql-statement or sql-statements
-- sql-statments: Drp xxx xxx
-- sql-statment: [sel|selDis|upd|into|fm|whBetStr|whBetNbr|whInStrLis|whInNbrLis|andInNbrLis|andInStrLis|gp|jn|left|expr]
-- optional: Whxxx and Andxxx can have ?-pfx becomes: ?Whxxx and ?Andxxx.  The line will become empty
==============================================
Drp Tx TxMbr MbrDta Div Sto Crd Cnt Oup MbrWs
=============================================
-- %? means switch, value must be 0 or 1
%?BrkMbr 0
%?BrkMbr 0
%?BrkSto 0
%?BrkCrd 0
%?BrkDiv 0
-- %XXX means txt and optional, allow, blank
%SumLvl  Y
%?MbrEmail 1
%?MbrNm    1
%?MbrPhone 1
%?MbrAdr   1
-- %% mean compulasary
%%DteFm 20170101
%%DteTo 20170131
%LisDiv 1 2
%LisSto
%LisCrd
%CrdExpr ...
============================================
-- EQ & NE t1 only TxtPm is allowed
--         t2 allow TxtPm, *BLANK, and other text
?LvlY    EQ %SumLvl Y
?LvlM    EQ %SumLvl M
?LvlW    EQ %SumLvl W
?LvlD    EQ %SumLvl D
?Y       OR ?LvlD ?LvlW ?LvlM ?LvlY
?M       OR ?LvlD ?LvlW ?LvlM
?W       OR ?LvlD ?LvlW
?D       OR ?LvlD
?Dte     OR ?LvlD
?Mbr     OR %?BrkMbr
?MbrCnt  OR %?BrkMbr
?Div     OR %?BrkDiv
?Sto     OR %?BrkSto
?Crd     OR %?BrkCrd
?sel#Div NE %LisDiv *blank
?sel#Sto NE %LisSto *blank
?sel#Crd NE %LisCrd *blank
============================================= #Tx
sel  ?Crd ?Mbr ?Div ?Sto ?Y ?M ?W ?WD ?D ?Dte Amt Qty Cnt 
into #Tx
fm   SalesHistory
wh   bet str    %%DteFm %%DteTo
?and in  strlis Div %LisDiv
?and in  strlis Sto %LisSto
?and in  nbrlis Crd %LisCrd
?gp  ?Crd ?Mbr ?Div ?Sto ?Crd ?Y ?M ?W ?WD ?D ?Dte
$Crd %CrdExpr
$Mbr JCMCode
$Sto
$Y
$M
$W
$WD
$D
$Dte
$Amt Sum(SHAmount)
$Qty Sum(SHQty)
$Cnt Count(SHInvoice+SHSDate+SHRef)
============================================= #TxMbr
selDis  Mbr
fm      #Tx
into    #TxMbr
============================================= #MbrDta
sel   Mbr Age Sex Sts Dist Area
fm    #TxMbr x
jn    JCMMember a on x.Mbr = a.JCMMCode
into  #MbrDta
$Mbr  x.Mbr
$Age  DATEDIFF(YEAR,CONVERT(DATETIME ,x.JCMDOB,112),GETDATE())
$Sex  a.JCMSex
$Sts  a.JCMStatus
$Dist a.JCMDist
$Area a.JCMArea
==-=========================================== #Div
?sel Div DivNm DivSeq DivSts
fm   Division
into #Div
?wh in strLis Div %LisDiv
$Div Dept + Division
$DivNm LongDies
$DivSeq Seq
$DivSts Status
============================================ #Sto
?sel Sto StoNm StoCNm
fm   Location
into #Sto
?wh in strLis Loc %LisLoc
$Sto
$StoNm
$StoCNm
============================================= #Crd
?sel        Crd CrdNm
fm          Location
into        #Crd
?wh in nbrLis Crd %LisCrd
$Crd
$CrdNm
============================================= #Oup
sel  ?Crd ?CrdNm ?Mbr ?Age ?Sex ?Sts ?Dist ?Area ?Div ?DivNm ?Sto ?StoNm ?StoCNm ?Y ?M ?W ?WD ?D ?Dte Amt Qty Cnt
into #Oup
fm   #Tx x
left #Crd a on x.Crd = a.Crd
left #Div b on x.Div = b.Div
left #Sto c on x.Sto = c.Sto
left #MbrDta d on x.Mbr = d.Mbr
wh   JCMCode in (Select Mbr From #TxMbr)
============================================ #Cnt
sel ?MbrCnt RecCnt TxCnt Qty Amt
into #Cnt
fm  #Tx
$MbrCnt Count(Distinct Mbr)
$RecCnt Count(*)
$TxCnt  Sum(TxCnt)
$Qty    Sum(Qty)
$Amt    Sum(Amt)
============================================`;
console.log(sqtprslt(sqtp));
//# sourceMappingURL=sqtp.js.map