/// <reference path="./typings/node/node.d.ts"/>
/// <reference path="./common.d.ts"/>
/// <reference path="./rel.d.ts"/>
/// <reference path="./curryfun.d.ts"/>
import * as cf from './curryfun'
'use strict'
const { assertIsEq, er, sSplitLines, pipe, lyRmvEmpLin, map, dicKset, itrAddPfx, linFstTerm, linLasTerm, setAftIncl, setClone,
    oSrt, oBrw, each, itrFst, itrLas, itrRmvEmp, ssetAddPfxAsLin, sSplitCommaSpc, sSplitLf, sSplitCrLf, sSplitSpc, itrAy,
    ssetSy, setMinus, setWhere, setAy, setSrt, dmp, where, predsAnd, predNot, compose }
    = cf
export const relInf = (_relLines: lines): relInf => {
    const relLy = sSplitLines(_relLines)
    const [cycPairAy, srtRel] = x1_cycPairAy_and_srtRel(relLy)
    const itmSet = setSrt(x2_ItmSet(srtRel))
    const parSet = setSrt(dicKset(srtRel))
    const rootSet = setSrt(setWhere(y_isRoot(srtRel))(parSet))
    const chdSet = setSrt(setWhere(y_isChd(srtRel))(itmSet))
    const leafSet = setSrt(setWhere(predNot(y_isPar(srtRel)))(chdSet))
    const mpcSet = setSrt(setWhere(y_isMpc(srtRel))(chdSet))

    const tpnRel = x3_TpnRel(rootSet, srtRel)
    const evlRel = x4_EvlRel(rootSet, srtRel)
    const lvlRel = x5_LvlRel(rootSet, srtRel)

    let ly: ly
    {
        const tpnLy = map(y_relItmAddPfxAsLin('topDownRel'))(tpnRel)
        const lvlLy = map(y_relItmAddPfxAsLin('levelRel'))(lvlRel)
        const evlLy = map(y_relItmAddPfxAsLin('inOrderRel'))(evlRel)

        const inp = itrAddPfx('inp ')(relLy)
        const rel = map(y_relItmAddPfxAsLin('srtRel'))(srtRel.entries())
        const root = ssetAddPfxAsLin('rootSet')(rootSet)
        const itm = ssetAddPfxAsLin('itmSet')(itmSet)
        const par = ssetAddPfxAsLin('parSet')(parSet)
        const chd = ssetAddPfxAsLin('chdSet')(chdSet)
        const leaf = ssetAddPfxAsLin('leafSet')(leafSet)
        const mpc = ssetAddPfxAsLin('mpcSet')(mpcSet)
        const cyc = map
            ((a: cycPair) => { let [par, chd] = a; return 'cycPair ' + par + ' ' + chd })
            (cycPairAy)
        ly = inp.concat(rel, root, itm, par, chd, leaf, mpc, cyc, tpnLy, lvlLy, evlLy)
    }
    return {
        srtRel, cycPairAy,
        itmSet, rootSet, leafSet, parSet, chdSet, mpcSet,
        evlRel, lvlRel, tpnRel,
        ly,
    }
}
const x11_isCyc = (_rel: rel, _par: s, _chd: s): b => {
    if (_par === _chd)
        return true
    const allChdSet = y_par_descnSet(_rel, _chd)
    return allChdSet.has(_par)
}
const x12_rel_add_par_chd = (_o_rel: rel, _par: s, _chd: s): void => {
    const chdSet = _o_rel.get(_par)
    if (chdSet === undefined) {
        _o_rel.set(_par, new Set<s>(_chd))
    } else {
        _o_rel.set(_par, chdSet.add(_chd))
    }
}
type cycPairAy = cycPair[]
type srtRel = rel
const x1_cycPairAy_and_srtRel = (_relLy: ly): [cycPairAy, srtRel] => {
    const oCycPairAy: cycPair[] = []
    const relItmAy = map(x1_relItm_or_null)(_relLy)
    const relItmAy1 = itrRmvEmp(relItmAy)
    let rel = new Map<k, Set<s>>()
    for (let [par, chdSet] of relItmAy1) {
        for (let chd of chdSet) {
            if (x11_isCyc(rel, par, chd)) {
                oCycPairAy.push([par, chd])
            } else {
                x12_rel_add_par_chd(rel, par, chd)
            }
        }
    }
    const oSrtRel = x1_srtRel(rel)
    return [oCycPairAy, oSrtRel]
}
const x1_srtRel = (_rel: rel): rel => _rel
const x3_TpnRel = (_root: sset, _rel: rel): rel => { // Top down relation array
    const z = new Map<s, sset>()
    each(r)(_root)
    return z
    function r(par: s) {
        const chdSet = _rel.get(par)
        if (chdSet !== undefined) {
            z.set(par, chdSet)
            each(r)(chdSet)
        }
    }
}
const x4_EvlRel = (_root: sset, rel: rel): rel => {
    const z = new Map<s, sset>()
    each(r)(_root)
    return z
    function r(par: s) {
        const chdSet = rel.get(par)
        if (chdSet !== undefined) {
            for (let chd of chdSet) {
                r(chd)
            }
            z.set(par, chdSet)
        }
    }
}
const x5_LvlRel = (_root: sset, _rel: rel): rel => {
    //console.log($rel2ly(rel))
    //debugger
    const z = new Map<s, sset>()
    for (let rootItm of _root) {
        const chdSet = _rel.get(rootItm)
        if (chdSet !== undefined)
            z.set(rootItm, chdSet)
    }
    each(r)(_root)
    return z
    function r(par: s) {
        const chdSet = _rel.get(par)
        if (chdSet !== undefined) {
            z.set(par, chdSet)
            each(r)(chdSet)
        }
    }
}
const x1_relItm_or_null = (_relLin: lin): relItm | null => {
    const ay = sSplitSpc(_relLin)
    const k = ay.shift()
    if (k === undefined)
        return null
    const chdSet = new Set<s>(ay)
    chdSet.delete(k)
    if (chdSet.size === 0)
        return null
    return [k, chdSet]
}
//!lib ===
export const setIsEq = (a: set, b: set): b => {
    if (a.size !== b.size)
        return false
    for (let ia of a)
        if (!b.has(ia))
            return false
    return true
}
export const ssetIsEq = setIsEq as (a: sset, b: sset) => b
export const setAdd = <T>(...sets: Set<T>[]) => (_set: Set<T>): Set<T> => {
    for (let iset of sets) {
        for (let i of iset) {
            _set.add(i)
        }
    }
    return _set
}
export const ssetAdd = setAdd as (...ssets: sset[]) => (_set: sset) => sset
//!y ======
const y_par_descnSet = (_rel: rel, _par: s): sset => { // descn = descendant
    const o = new Set<s>()
    r_add(_par)
    return o
    function r_add(_p: s): void {
        const chdSet = _rel.get(_p)
        if (chdSet === undefined)
            return
        for (let chd of chdSet) {
            if (!o.has(chd)) {
                o.add(chd)
                r_add(chd)
            }
        }
    }
}
const y_chd_parSet = (_rel: rel, _par: s): sset => {
    return new Set<s>()
}
const y_chd_ascnSet = (_rel: rel, _par: s): sset => { // ascn = ascndant
    const o = new Set<s>()
    r_add(_par)
    return o
    function r_add(_c: s): void {
        const parSet = y_chd_parSet(_rel, _c)
        if (parSet.size === 0)
            return
        for (let par of parSet)
            if (!o.has(par))
                r_add(par)
    }
}
const y_isChd = (_rel: rel) => (itm: s) => {
    for (let [par, chdSet] of _rel)
        if (chdSet.has(itm))
            return true
    return false
}
const y_isMpc = (_rel: rel) => (_chd: s) => {
    let parCnt: n = 0
    for (let [par, chdSet] of _rel) {
        if (chdSet.has(_chd)) {
            if (parCnt === 1) {
                //                console.log(_chd, 'isMpc=true')
                return true
            } else {
                parCnt++
            }
        }
    }
    //    console.log(_chd, 'isMpc=false')
    return false
}
const y_isPar = (rel: rel) => (itm: s): b => rel.has(itm)
const y_isRoot = (_rel: rel) => predsAnd(y_isPar(_rel), predNot(y_isChd(_rel))) as ((_itm: k) => b)
const x2_ItmSet = (_rel: rel): sset => {
    const o = new Set<s>()
    for (let [k, chdSet] of _rel) {
        o.add(k)
        for (let chd of chdSet) {
            o.add(chd)
        }
    }
    return o
}
const y_relItmAddPfxAsLin = (_pfx: s) => (_relItm: relItm): lin => {
    const pfx = _pfx === undefined ? '' : _pfx
    const [k, chdSet] = _relItm
    const z = pfx + (pfx ? ' ' : '') + k + ' ' + ssetAddPfxAsLin('')(chdSet)
    return z
}
export const relBrw = (_rel: rel): void => oBrw(relJson(_rel))
export const relJson = (_rel: rel): o => {
    let o: object = {}
    for (let [par, chdSet] of _rel) {
        o[par] = ssetSy(chdSet).sort()
    }
    return oSrt(o)
}
//!tst =====================
function tst__cycPairAy() {
    t1()
    function r(exp: cycPair[], relLines: lines) {
        const act = relInf(relLines).cycPairAy
        assertIsEq(exp, act)
    }
    function t1() {
        const relLines = `a b
b c
c a`
        const exp: cycPair[] = [['c', 'a']]
        r(exp, relLines)
    }
}
function tst__relInf() {
    t1()
    function r(exp, relLines: lines) {
        const act = relInf(relLines)
        cf.oBrw(act)
        debugger
        const cycPairAy = []
        assertIsEq(cycPairAy, act.cycPairAy)
        assertIsEq(3, act.srtRel.size)
        const actRelAy = itrAy(act.srtRel)

    }
    function t1() {
        const relLines = `a z b c d e
y 1
b d e f
x y z`
        const exp = []
        r(exp, relLines)
    }
}
function tst__relBrw() {
    const relLines = `a z b c d e
y 1
b d e f
x y z`
    const srtRel = relInf(relLines).srtRel
    relBrw(srtRel)
}
function tst__mpcSet() {
    dmp('tst__mpcSet -- multiple parent child set')
    t1()
    t2()
    function r(exp: sy, relLines: lines) {
        const act = ssetSy(relInf(relLines).mpcSet)
        assertIsEq(exp, act)
    }
    function t1() {
        dmp('\tt1')
        let exp = ['a', 'b']
        let relLines = `x a b
y a b`
        r(exp, relLines)
    }
    function t2() {
        dmp('\tt2')
        const exp = ['d', 'e', 'z']
        const relLines = `a z b c d e
y 1
b d e f
x y z`
        r(exp, relLines)
    }
}
function tst__x1_isCyc() {
    dmp('tst__x1_isCyc')
    t1()
    t2()
    t3()
    function r(exp, rel, par, chd) {
        const act = x11_isCyc(rel, par, chd)
        assertIsEq(exp, act)
    }
    function t1() {
        dmp('\tt1')
        const exp = true
        const rel = new Map<s, sset>([
            ['a', new Set<s>('b')]
        ])
        const par = 'b'
        const chd = 'a'
        r(exp, rel, par, chd)
    }
    function t2() {
        dmp('\tt2')
        const exp = false
        const rel = new Map<s, sset>([
            ['a', new Set<s>('b')]
        ])
        const par = 'b'
        const chd = 'c'
        r(exp, rel, par, chd)
    }
    function t3() {
        dmp('\tt3')
        const exp = true
        const rel = new Map<s, sset>([
            ['a', new Set<s>(['b'])],
            ['b', new Set<s>(['c'])]
        ])
        const par = 'c'
        const chd = 'a'
        r(exp, rel, par, chd)
    }
}
function tst__y_par_descnSet() {
    t1()
    return
    function r(exp: sset, rel: rel, par: s) {
        const act = y_par_descnSet(rel, par)
        if (!ssetIsEq(exp, act))
            debugger
    }
    function t1() {
        const exp: sset = new Set<s>(['b', 'c'])
        const rel = new Map<s, sset>([
            ['a', new Set<s>(['b'])],
            ['b', new Set<s>(['c'])]
        ])
        const par = 'a'
        r(exp, rel, par)
    }
}
//import * as scanPgm from './scanPgm'; scanPgm.fjs_updFtsMainTstIfStmt(__filename)
//!runTst ==================
if (module.id === '.') {
    //tst__y_par_descnSet()
    tst__x1_isCyc()
    /*
        tst__cycPairAy()
        tst__mpcSet()
        tst__relBrw()
        tst__relInf()
    */
    relBrw                  // = (_rel: rel): void => oBrw(relJson(_rel))
    relInf                  // = (_relLines: lines): relInf => {
    relJson                 // = (_rel: rel): o => {
    x1_cycPairAy_and_srtRel // = (_relLy: ly): [cycPairAy, srtRel] => {
    x1_relItm_or_null       // = (_relLin: lin): relItm | null => {
    x1_srtRel               // = (_rel: rel): rel => _rel
    x11_isCyc               // = (_rel: rel, _par: s, _chd: s): b => {
    x12_rel_add_par_chd     // = (_o_rel: rel, _par: s, _chd: s): void => {
    x2_ItmSet               // = (_rel: rel): sset => {
    x3_TpnRel               // = (_root: sset, _rel: rel): rel => { // Top down relation array
    x4_EvlRel               // = (_root: sset, rel: rel): rel => {
    x5_LvlRel               // = (_root: sset, _rel: rel): rel => {
    y_isChd                 // = (_rel: rel) => (itm: s) => {
    y_isMpc                 // = (_rel: rel) => (_chd: s) => {
    y_isPar                 // = (rel: rel) => (itm: s): b => rel.has(itm)
    y_isRoot                // = (_rel: rel) => predsAnd(y_isPar(_rel), predNot(y_isChd(_rel))) as ((_itm: k) => b)
    y_relItmAddPfxAsLin     // = (_pfx: s) => (_relItm: relItm): lin => {
}
