/// <reference path="./curryfun.d.ts"/>
declare type rel = Map<key, sset>
declare type srtRel = rel
declare type relItm = [k, sset]
declare type cycPair = strPair
declare interface relInf {
    cycPairAy: cycPair[]
    srtRel: srtRel

    evlRel: rel
    lvlRel: rel
    tpnRel: rel
    
    itmSet: sset
    rootSet: sset
    leafSet: sset
    parSet: sset
    chdSet: sset
    mpcSet: sset
    
    ly: ly
}
