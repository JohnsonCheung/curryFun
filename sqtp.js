const x = require('.\curryfun.js')
const sqtprslt = sqtp => pipe(sqtp)(splitLf,lyRmvMsg,lyGp,gpRmvRmk,gpGpy('=='),gpyBky,rm,er,pm,sw,sq)
const gpRmvRmk = gp => {
    const o = where(([ix,lin])=>isNonRmkLin(lin))(gp)
    return o
}
const lyGp = ly => {
    const o =[]
    let i = 0
    for(lin of ly)
        o.push([i++,lin])
    return o
}
const lyRmvMsg = ly => {
    const a = itrMap(linRmvMsg)(ly)
    const b = lyRmvBlankLin(a)
    return b
}
const pm = ({bky,er}) => {
    const [pmBky,remainBky] = itrBrkForTrueFalse(isPmBk)(bky)
    const e1 = bkyExcessBkIXLNER('Three is already parameter block.  This block is ignored')(pmBky)
    const [pm,e2] = bkPm(pmBky[0])
    const ixlner = e1.concat(e2)
    return{bky:remainBky,pm,ixlner}
}
const sw = ({bky,pm,er}) => {
    const [swBky,remainBky] = itrBrkForTrueFalse(isSwBk)(bky)
    const e1 = bkyExcessBkIXLNER('There is already switch block.  This block is ignored')(swBky)    
    const [sw,e2] = bkSw(pm)(swBky[0])
    const e = e1.concat(e2)
    return{bky:remainBky,pm,sw,er:e}
}
const sq = ({bky,sw,pm,er}) => {vtp,sq}
const rm = bky => where((bk)=>bk.bkty!==Bkty.rm)(bky)
const er = bky => {
    const [erBky,nonErBky] = itrBrkForTrueFalse(isErBk)(bky)
    const er = []
    return{bky:nonErBky,ixlner:[]}
}
const bkyEr = msg => bky => {
    const o =[]
    for(bk in bky) {
        const ix = bkLasIx(bk)
        const sfxmsg = []
        const endmsg = [msg] 
        o.push({ix,sfxmsg,endmsg})
    } 
    return o
}
const bkyExcessBkIXLNER = msg => bky => {
    const a = ayClone(bky)
    a.shift()
    return bkyEr(msg)(a)
}
const gpGpy = sep => gp => {
    const o = []
    let buf = []
    for([ix,lin] of gp) {
        if(hasPfx(sep)(lin)) {
            if(buf.length!==0) 
                o.push(buf)
            buf = []
        } else 
            buf.push([ix,lin])
    }
    if(buf.length!==0)
        o.push(buf)
    return o
}
const gpRmvRmkLin = gp => {

}
const gpyRmvRmkLin = gpy => itrMap(gpRmvRmkLin)(gpy)
const lyPfxCnt = pfx => ly => {
    let o = 0
    const p = hasPfx(pfx)
    for(i of ly) 
        if(p(i)) o++
    return o
}
const assertAyIsEqLen = ay1 => ay2 => {
    if(ay1.length!==ay2.length) 
        throw new Error({msg:'two ay are diff len',ay1,ay2})
}
const ayZip = ay1 => ay2 => {
    assertAyIsEqLen(ay1)(ay2)
    const o=[]
    const l = ay1.length
    for(let i=0;i<l;i++)
        o.push([ay1[i],ay2[i]])
    return o
}

const lyHasMajPfx = pfx => ly => lyPfxCnt(pfx)(ly) > (ly.length/2)
const isRmLy = ly => itrIsAllTrue(isRmkLin)(ly)
const isPmLy = ly => lyHasMajPfx("%")(ly)
const isSwLy = ly => lyHasMajPfx("?")(ly)
const isSqLy = ly => rmvPfx(lyFstNonRmkLin(ly),"?")
const gpLy = gp => itrMap(aySnd)(gp)
const gpyBky = gpy => {
    const lyy = itrMap(gpLy)(gpy)
    const bktyy = itrMap(lyBkty)(lyy)
    const z = ayZip(bktyy)(gpy)
    const o = itrMap(([bkty,gp])=>{return{bkty,gp}})(z)
    return o
}
const gpBk = gp => {gpty:gpBkty(gp),gp}
const Bkty = {rm:1,pm:2,sw:3,sq:4,er:5}
const isBkEqBkty = bkty => bk => bk.bkty === bkty
const isErBk = isBkEqBkty(Bkty.er)
const isSwBk = isBkEqBkty(Bkty.sw)
const isPmBk = isBkEqBkty(Bkty.pm)
const isSqBk = isBkEqBkty(Bkty.sq)
const lyBkty = ly => 
    isRmLy(ly)? Bkty.rm : 
    isPmLy(ly)? Bkty.pm :
    isSwLy(ly)? Bkty.sw :
    isSqLy(ly)? Bkty.sq : Gpty.er
const linShift = lin => {
    const o = lin.trim()
    const a = o.match(/(\S*)\s*(.*)/)
    return[a[1]||"",a[2]||""]
}
const linFstTerm = lin => linShift(lin)[0]
const lyMap = ly => {
    const o = new Map()
    for(lin of ly) {
        const [k,v] = linShift(lin)
        o.set(k,v)
    }
    return o
}
const lyFstTermAy = ly => itrMap(linFstTerm)(ly)
const itrDupSet = itr => {
    const a = new Set()
    const o = new Set()
    for(i of itr) {
        if(a.has(i))
            o.add(i)
        else
            a.add(i)
    }
    return o
}
const lyFstTermDupSet = ly => {
    const a = itrMap(linFstTerm)(ly)
    return itrDupSet(a)
}
const Er = class { constructor(ix,sfxmsg,endmsg) {this.ix=ix,this.sfxmsg=sfxmsg,this.endmsg=endmsg}}
const gpDupFstTermEr = gp => {
    const dup = lyFstTermDupSet(gpLy(gp))
    const o=[]
    for([ix,lin] of gp) {
        let fst = linFstTerm(lin)
        if(dup.has(fst)) {
            const er = new Er(ix,[`"duplicate(${fst})`],[])
            o.push(er)
        }
    }
    return o
}
const bkPm = bk => { 
    if(bk===undefined) return[new Map(),[]]
    const er = gpDupFstTermEr(bk.gp)
    const ly = gpLy(bk.gp)
    const pm = lyMap(ly)
    return[pm,er]
}
const vdt = ([itmErPred, itmErMap]) => ([ery,itr]) => {
    const[erItr,remainingItr] = itrBrkForTrueFalse(itmErPred)(itr)
    const ery1 = itrMap(itmErMap)(erItr)
    const ery2 = ery.concat(ery1)
    return[ery2,remainingItr]
}
const linTermAy = lin => lin.trim().split(/\s+/)
const linFmT3DupTermSet = lin => {
    let termAy = linTermAy(lin)
    termAy.shift()
    termAy.shift()
    return itrDupSet(termAy)
}
const linTermPosAy = lin => {
    let a = lin
    const o = []
    let j = 0
    let pos = 0
    do {
        if((j++)>100)
            throw new Error('looping too much')
        let [x,a1,a2,a3] = a.match(/(\s*)(\S+)(.*)/)
        if(a1!=="") {
            pos = pos + a1.length
            o.push(pos)
            pos = pos + a2.length
        } else {
            if(a3!=="")
                throw new Error('impossible')
        }
        a = a3
    } while (a.trim()!=="");
    return o
}
//const xx  = linTermPosAy(" sdf lk fdf d  ")
const linAddMrk = (lin,pos,len) => {
    const s = spc(pos - lin.length)
    const m = '^'.repeat(len)
    return lin + s + m
} 
const spc = n => " ".repeat(n)
const linFmT3DupTermMrk = lin => {
    const dup = linFmT3DupTermSet(lin)
    const termPosAy = linTermPosAy(lin)
    const termAy = linTermAy(lin)
    let o = ""
    for(let j=2;j<termAy.length;j++) {
        let term = termAy[j]
        if(dup.has(term)) {
            const pos = termPosAy[j]
            const len = term.length
            o = linAddMrk(o,pos,len)
        }
    }
    return o
}
const SwEr = {}
SwEr.FmT3Dup = {}
SwEr.FmT3Dup.gpErPred = (ix,lin) => linFmT3DupTermSet(lin).size>0
SwEr.FmT3Dup.gpEr = (ix,lin) => new Er(ix,[linFmT3DupTermMrk(lin)],[])
const gperVdt = vdtItm => (gp,er) => {
    const p = vdtItm.hasEr
    const m = vdtItm.erFun
    const [erGp,remainingGp] = gpSplitForErAndRemain(p)(gp)
        const e1 = itrMap(m)(erGp)
    return[]
    const bkSw_process_SwEr = (gp,er,SwEr) => {}
const bkSw = pm => bk => {
    if(bk===undefined) return[new Map(),[]]
    let er = gpDupFstTermEr(bk.gp)
    let gp = bk.gp
    for(let swErItm of oPrpAy(SwEr)) {
        [e,gp] = gperVdt(gp, er)(swErItm)
        er = er.concat(e)
    }
    const sw = lySw(gpLy(gp))
    return[sw,er]
}
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
============================================`
console.log(sqtprslt(sqtp))
}