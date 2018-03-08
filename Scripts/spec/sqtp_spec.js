"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../node_modules/@types/jasime.d.ts"/>
/// <reference path="../../Scripts/curryfun.ts"/>
const x = require("../curryfun");
const y = require("../sqtp");
describe('linT2PosWdt', function () {
    it('should pass', function () {
        const lin = 'aaa  bb';
        const act = y.linT2PosWdt(lin);
        expect(act).toEqual({ pos: 5, wdt: 2 });
    });
});
describe('linT2MarkerLine', function () {
    it('should pass', function () {
        const lin = 'aaa  bb';
        const act = y.linT2MarkerLin(lin, 'aa');
        expect(act).toEqual('-----^^ aa');
    });
});
describe('sqtp -- pm03 -- bkPm --', function () {
    it('this block is err - should pass', function () {
        const sqtp = '%?BrkMbr 0\n' +
            '?BrkMbr 0\n' +
            '%?BrkMbr 0\n' +
            '??BrkSto 0\n';
        const { vtp, sql } = y.sqtprslt({ sqtp });
        x.sBrw(vtp + '\n***\nsqtp' + sqtp);
        debugger;
    });
    it('pfx err - should pass', function () {
        const sqtp = '%?BrkMbr 0\n' +
            '%?BrkXX 0\n' +
            '%BrkMbr 0\n' +
            '#?BrkMbr 0\n' +
            '??BrkSto 0\n';
        const { vtp, sql } = y.sqtprslt({ sqtp });
        const exp = '%?BrkMbr 0\r\n' +
            '%?BrkXX 0\r\n' +
            '%BrkMbr 0\r\n' +
            '#?BrkMbr 0\r\n' +
            '^---- prefix must be (%)\r\n' +
            '??BrkSto 0\r\n' +
            '^---- prefix must be (%)';
        expect(vtp).toEqual(exp);
    });
    it('prmSwErr - should pass', function () {
        const sqtp = '%?BrkDiv  XX\n' +
            '%SumLvl  Y\n' +
            '%?MbrEmail 1';
        const { vtp, sql } = y.sqtprslt({ sqtp });
        //x.sBrw(vtp + '\n***\n' + sqtp)
        const exp = '%?BrkDiv  XX\r\n' +
            '----------^^ must be 0 or 1 for prefix is [%?]\r\n' +
            '%SumLvl  Y\r\n' +
            '%?MbrEmail 1';
        const rslt = vtp === exp;
        expect(rslt).toBeTruthy();
    });
});
describe('SwEr --', function () {
    fit('should pass', function () {
        const sqtp = '?#SEL#aa 1\n' +
            '?#UPD#bb OR 1\n' +
            '?AA AND 1';
        const { vtp, sql } = y.sqtprslt({ sqtp });
        //x.sBrw(vtp + '\n***\n' + sqtp)
        const exp = '%?BrkDiv  XX\r\n' +
            '----------^^ must be 0 or 1 for prefix is [%?]\r\n' +
            '%SumLvl  Y\r\n' +
            '%?MbrEmail 1';
        const rslt = vtp === exp;
        debugger;
        expect(rslt).toBeTruthy();
    });
});
describe('sqtprslt --', function () {
    it('should pass', function () {
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
?#SEL#Div NE %LisDiv *blank
?#SEL#Sto NE %LisSto *blank
?#SEL#Crd NE %LisCrd *blank
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
============================================
--
============================================
df eror fs--
============================================
-- EQ & NE t1 only TxtPm is allowed
--         t2 allow TxtPm, *BLANK, and other text
?LvlY    EQ %SumLvl Y
?LvlM    EQ %SumLvl M
?LvlW    EQ %SumLvl W
?LvlD    EQ %SumLvl D
?Y       OR ?LvlD ?LvlW ?LvlM ?LvlY`;
        const { vtp, sql } = y.sqtprslt({ sqtp });
        x.sBrw(vtp);
        debugger;
        expect(true).toBe(true);
        debugger;
        //    x.dryCol(1)([[1, 2], [2, 3]])
    });
});
//# sourceMappingURL=sqtp_spec.js.map