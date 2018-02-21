/// <reference path="./curryfun.d.ts"/>
import { _tfm, p, pfx, cnt, n, s, ay, lin, b } from './curryfun'
import { lyAddErAsLines } from './lyAddErAsLines'
interface ixlin { ix:n,  lin:lin }
interface bk { bkty: Bkty, gp: gp }
interface ixlinChkr { hasEr: ixlinPred, erFun: (a: ixlin) => Er }
interface swChkr { FmT3Dup: ixlinChkr }
export interface ErItm { ix: n, sfxMsg: s[], endMsg: s[] }
const enum Bkty { RM, PM, SW, SQ, ER }
type ixlinPred = (a:ixlin) => b
type Sw = Map<s, boolean>
type Pm = Map<s, s>
export type Er = ErItm[]
type sql = s
type ix = n
type sdic = Map<s, s>
type term = s
type sset = Set<s>
type gp = Array<ixlin>
type ly = s[]
type gppass = { er: Er, gp: gp }
type rm01Inp = bk[]; type rm01Oup = bk[]
type er02Inp = rm01Oup; type er02Oup = { er: Er, bky: bk[], }
type pm03Inp = er02Oup; type pm03Oup = { er: Er, bky: bk[], pm: Pm }
type sw04Inp = pm03Oup; type sw04Oup = { er: Er, bky: bk[], pm: Pm, sw: Sw }
type sq05Inp = sw04Oup; 

type _bkPred = (a:bk) => b
type _gpBk = (a: gp) => bk
type _bkPm = (bk: bk) => { er: Er, pm: Pm }
type _gppassVdt = (chkr: ixlinChkr) => (a: gppass) => gppass
type _bkSw = (pm: Pm) => (a: bk) => {er:Er, sw:Sw}
type _lySw = (a: ly) => Sw

type _bkyEr = (msg: s) => (a: bk[]) => Er
type _bkIx = (a: bk) => ix
type _bkAyExcessEr = (bkNm: s) => (a: bk[]) => Er
type _splitGp = (sep:s) => (a:gp) => gp[]
type _lyPred = (a: ly) => b
type _lyStr = (a: ly) => s
type _linTerm = (a: lin) => term
type _lySdic = (a: ly) => sdic
type _lySset = (a: ly) => sset
type _lyTermAy = (a: ly) => term[]
type _gpEr = (a: gp) => Er
type _rm01 = (inp: bk[]) => bk[]
type _er02 = (inp: er02Inp) => er02Oup
type _pm03 = (inp: pm03Inp) => pm03Oup
type _sw04 = (inp: sw04Inp) => sw04Oup
type _sq05 = (inp: sq05Inp) => {sql, er}
type _lyGp = (a: ly) => gp
type _gpRmvRmk = (a: gp) => gp
const lyFstNonRmkLin: _lyStr = a => x.itrFind(x.isNonEmp)(a)
const sqtprslt = sqtp => {
    let ly = x.sSplitLf(sqtp)
    let ly1 = lyRmvMsg(ly)
    let gp = lyGp(ly1)
    let gp1 = gpRmvRmk(gp)
    let gpy = gpGpy('==')(gp1)
    let bky = gpyBky(gpy)
    let bky1 = rm01(bky) //bky may have remark; bky1 does not have remark
    let a_er = er02(bky1)
    let a_pm = pm03(a_er)
    let a_sw = sw04(a_pm)
    let { er, sql } = sq05(a_sw)
    let vtp = lyAddErAsLines(ly1, er)
    return { vtp, sql }
}
const lyRmvMsg: _tfm<ly> = a => x.pipe(a)(x.itrMap(x.linRmvMsg), x.itrRmvEmp)
const gpRmvRmk: _tfm<gp> = a => x.itrWhere(({ ix, lin }) => x.isNonRmkLin(lin))(a)
const lyGp: _lyGp = a => {
    const o: ixlin[] = []
    let i = 0
    for (let lin of a)
        o.push({ ix: i++, lin })
    return o
}
const pm03: _pm03 = ({ er, bky }) => {
    const { t: pmBky, f: remainBky } = x.itrBrkForTrueFalse((a: bk) => a.bkty === Bkty.PM)(bky)
    const e1 = bkAyExcessEr('parameter')(pmBky)
    const { er: e2, pm } = bkPm(pmBky[0])
    er = e1.concat(e2)
    return { bky: remainBky, pm, er }
}
const sw04: _sw04 = ({ bky, pm, er }) => {
    const { t: swBky, f: remainBky } = x.itrBrkForTrueFalse((a: bk) => a.bkty === Bkty.SW)(bky)
    const e1 = bkAyExcessEr('switch')(swBky)
    const { er: e2, sw } = bkSw(pm)(swBky[0])
    const e = e1.concat(e2)
    return { bky: remainBky, pm, sw, er: e }
}
const sq05: _sq05 = ({ bky, sw, pm, er }) => {
    let sql = ""
    return { er, sql }
}
const rm01: _tfm<bk[]> = bky => x.itrWhere((a: bk) => a.bkty !== Bkty.RM)(bky)
const er02: _er02 = (a: bk[]) => {
    let { t: er, f: bky } = x.itrBrkForTrueFalse((a: bk) => a.bkty === Bkty.RM)(a)
    return { bky, er }
}
const bkLasIx: _bkIx = a => a.gp.length - 1
const bkyEr: _bkyEr = msg => a => {
    const o: Er = []
    for (let bk of a) {
        const ix = bkLasIx(bk)
        const endMsg = []
        const sfxMsg = [msg]
        o.push({ ix, endMsg, sfxMsg })
    }
    return o
}
const bkAyExcessEr: _bkAyExcessEr = bkNm => a => bkyEr(`Three is already [${bkNm}] block.  This block is ignored`)(a.slice(1))
import * as x from './curryfun'
const gpGpy: _splitGp = sep => gp => {
    let a = gp[0]
    let {ix,lin} = a
    const o: gp[] = []
    let curGp: gp = []
    for (let { ix, lin } of gp) {
        if (x.sHasPfx(sep)(lin)) {
            if (curGp.length !== 0)
                o.push(curGp)
            curGp = []
        } else
            curGp.push({ix, lin})
    }
    if (curGp.length !== 0)
        o.push(curGp)
    return o
}

const gpRmvRmkLin: _tfm<gp> = gp => gp
const gpyRmvRmkLin: _tfm<gp[]> = x.itrMap(gpRmvRmkLin)
const assertAyIsEqLen = a1 => a2 => {
    if (a1.length !== a2.length)
        x.er('two ay are diff len', { a1, a2 })
}
type _gpLy = (a:gp) => ly
const gpLy:_gpLy = a => x.itrMap(x.oPrp("lin"))(a)
const gpyBky = (a:gp[]) => {
    const lyy = x.itrMap(gpLy)(a)
    const bktyy = x.itrMap(lyBkty)(lyy)
    const z = x.ayZip(bktyy, a)
    const o:bk[] = x.itrMap(([bkty, gp]) => { return { bkty, gp } })(z)
    return o
}
const _x = x.sSplitSpc("drp upd sel dist")
const isSqLy: _lyPred = a => x.vIN(_x)(x.sRmvPfx("?")(lyFstNonRmkLin(a)).toLowerCase())
const isRmLy: _lyPred = a => x.itrPredIsAllTrue(x.isRmkLin)(a)
const isPmLy: _lyPred = a => x.lyHasMajPfx("%")(a)
const isSwLy: _lyPred = a => x.lyHasMajPfx("?")(a)
const lyBkty = ly => {
    let o:Bkty
    switch(true) {
        case (isRmLy(ly)):
            o = Bkty.RM
            break
        case (isPmLy(ly)):
            o = Bkty.PM
            break
        case (isSwLy(ly)):
            o = Bkty.SW
            break
        case (isSqLy(ly)):
            o = Bkty.SQ
            break
        default:
            o = Bkty.ER
    } 
    return o
}
const gpBk: _gpBk = gp => { return { bkty: lyBkty(gpLy(gp)), gp } }
const linFstTerm: _linTerm = a => x.linShift(a).term
const lySdic: _lySdic = ly => {
    const o = new Map()
    for (let lin of ly) {
        const { term: k, remainLin: s } = x.linShift(lin)
        o.set(k, s)
    }
    return o
}
const lyFstTermAy: _lyTermAy = x.itrMap(linFstTerm)
const lyFstTermDupSet: _lySset = x.compose(x.itrMap(linFstTerm), x.itrDupSet)
const gpDupFstTermEr: _gpEr = a => {
    const dup = lyFstTermDupSet(gpLy(a))
    const o: ay = []
    for (let { ix, lin } of a) {
        let fst = linFstTerm(lin)
        if (dup.has(fst)) {
            let sfxMsg = [`"duplicate(${fst})`]
            let endMsg = []
            const er = { ix, sfxMsg, endMsg }
            o.push(er)
        }
    }
    return o
}
const bkPm: _bkPm = bk => {
    if (bk === undefined) return {er:[], pm:new Map<s, s>()}
    const er = gpDupFstTermEr(bk.gp)
    const ly = gpLy(bk.gp)
    const pm = x.lySdic(ly)
    return { er, pm }
}
const vdt = ([itmErPred, itmErMap]) => ([ery, itr]) => {
    const { t: er, f: remainingAy } = x.itrBrkForTrueFalse(itmErPred)(itr)
    const ery1 = x.itrMap(itmErMap)(er)
    const ery2 = ery.concat(ery1)
    return [ery2, remainingAy]
}
const linTermAy = lin => lin.trim().split(/\s+/)
const linFmT3DupTermSet = lin => {
    let termAy = linTermAy(lin)
    termAy.shift()
    termAy.shift()
    return x.itrDupSet(termAy)
}
const linTermPosAy = lin => {
    let a = lin
    const o: ay = []
    let j = 0
    let pos = 0
    do {
        if ((j++) > 100)
            throw new Error('looping too much')
        let [x, a1, a2, a3] = a.match(/(\s*)(\S+)(.*)/)
        if (a1 !== "") {
            pos = pos + a1.length
            o.push(pos)
            pos = pos + a2.length
        } else {
            if (a3 !== "")
                throw new Error('impossible')
        }
        a = a3
    } while (a.trim() !== "");
    return o
}
//const xx  = linTermPosAy(" sdf lk fdf d  ")
const linAddMrk = (lin, pos, len) => {
    const s = x.nSpc(pos - lin.length)
    const m = '^'.repeat(len)
    return lin + s + m
}
const linFmT3DupTermMrk = lin => {
    const dup = linFmT3DupTermSet(lin)
    const termPosAy = linTermPosAy(lin)
    const termAy = linTermAy(lin)
    let o = ""
    for (let j = 2; j < termAy.length; j++) {
        let term = termAy[j]
        if (dup.has(term)) {
            const pos = termPosAy[j]
            const len = term.length
            o = linAddMrk(o, pos, len)
        }
    }
    return o
}
const swChkr: swChkr = (() => {
    const FmT3Dup: any = {}
    FmT3Dup.hasEr = a => linFmT3DupTermSet(a.lin).size > 0
    FmT3Dup.erFun = a => [{ ix: a.ix, sfxMsg: [linFmT3DupTermMrk(a.lin)], endMsg: []}]
    return { FmT3Dup }
})()
const gppassVdt: _gppassVdt = chkr => (a: gppass) => {
    const p = chkr.hasEr
    const m = chkr.erFun
    const [erGp, remainingGp] = gpSplitForErAndRemain(p)(a.gp)
    const e1 = x.itrMap(m)(erGp)
    return { er: [], gp: a.gp }
}
const bkSw_process_SwEr = (gp, er, SwEr) => { }
const bkSw: _bkSw = pm => bk => {
    if (bk === undefined) return { er: [], sw: new Map<s, boolean>() }
    let er = gpDupFstTermEr(bk.gp)
    let gp = bk.gp
    let e: Er = []
    /*
    for (let ixlinChkr of x.oPrpNy(swChkr)) {
        { er: e, gp } = gppassVdt(ixlinChkr)({ er, gp })
        er = er.concat(e)
    }
    */
    const sw = lySw(pm)(gpLy(gp))
    return {er, sw}
}
const gpSplitForErAndRemain: (p: p) => (gp: gp) => [gp, gp] = p => gp => [[], []]
const lySw = (pm: Pm) => (a: ly) => {
    const sw = new Map<s, boolean>()
    let isEvaluated = true
    let j = 0
    let ly = x.itrClone(a)
    const isSomeNull = itr => { for (let i of itr) if (i === null) return true; return false }
    const someTrue = itr => { for (let i of itr) if (i === true) return true; return false }
    const allTrue = itr => { for (let i of itr) if (i !== true) return false; return true } 
    const xAND = ay => isSomeNull(ay) ? null : allTrue(ay)
    const xOR = ay => isSomeNull(ay) ? null : someTrue(ay)
    const xEQ = ([a, b]) => a === null || b === null ? null : a === b
    const xNE = ([a, b]) => a === null || b === null ? null : a !== b

    const evlT2 = t => {
        if(t.toUpperCase()==='*BLANK') return ''
        return t
    }
    const evlT = t => {
        if (sw.has(t)) return sw.get(t)
        return pm.get(t)
    }
    const evlAy = ay => x.itrMap(evlT)(ay)
    const evlT1T2 = ay => [evlT(ay[0]), evlT2(ay[1])]
    const evlOR = ay => { let a = evlAy(ay); return xOR(a) }
    const evlAND = ay => { let a = evlT1T2(ay); return xAND(a) }
    const evlEQ = ay => { let a = evlT1T2(ay); return xEQ(a) }
    const evlNE = ay => { let a = evlT1T2(ay); return xNE(a) }
    const evlLin = lin => {
        let ay = x.sSplitSpc(lin)
        let key = x.vDft("")(ay.shift()).toUpperCase()
        let op = x.vDft("")(ay.shift()).toUpperCase()
        let boolOpt
        switch (op) {
            case 'AND': boolOpt = evlAND(ay); break
            case 'OR': boolOpt = evlOR(ay); break
            case 'EQ': boolOpt = evlEQ(ay); break
            case 'NE': boolOpt = evlNE(ay); break
            default: x.er('')
        }
        let o = { key, boolOpt }
        return o
    }
    let ly1:ly = []
    while (isEvaluated && j++ < 100) {
        isEvaluated = false 
        ly1 = []
        for (let lin of ly) {
            let { key, boolOpt } = evlLin(lin)
            if (boolOpt!==null) {
                sw.set(key, boolOpt)
                isEvaluated = true
            } else
                ly1.push(lin)
        }
        ly = ly1
    }
    if(ly1.length!==0) x.er('ly1 should has 0-length', {ly1})
    return sw
}
//?LvlY    EQ %SumLvl Y
//?LvlM    EQ %SumLvl M
//?LvlW    EQ %SumLvl W
//?LvlD    EQ %SumLvl D
//?Y       OR ?LvlD ?LvlW ?LvlM ?LvlY
//?M       OR ?LvlD ?LvlW ?LvlM
//?W       OR ?LvlD ?LvlW
//?D       OR ?LvlD
//?Dte     OR ?LvlD
//?Mbr     OR %?BrkMbr
//?MbrCnt  OR %?BrkMbr
//?Div     OR %?BrkDiv
//?Sto     OR %?BrkSto
//?Crd     OR %?BrkCrd
//?sel#Div NE %LisDiv *blank
//?sel#Sto NE %LisSto *blank
//?sel#Crd NE %LisCrd *blank

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
============================================
--
============================================
-- EQ & NE t1 only TxtPm is allowed
--         t2 allow TxtPm, *BLANK, and other text
?LvlY    EQ %SumLvl Y
?LvlM    EQ %SumLvl M
?LvlW    EQ %SumLvl W
?LvlD    EQ %SumLvl D
?Y       OR ?LvlD ?LvlW ?LvlM ?LvlY`
x.dmp(sqtprslt(sqtp))
x.dryCol(1)([[1, 2], [2, 3]])