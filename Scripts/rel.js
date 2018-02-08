'use strict'
const cf = require('curryfun')
const { pipe, rmvEmpLin, setAftIncl, ayAddPfx, fstItm, lasItm, seAftIncl, setClone, splitCommaSpc, splitLf, splitCrLf, splitSpc, itr2ay, setMinus, setWhere, setMap, set2ay, dmpObj, map2kset, where, map, and, not, renPrpNmAsCamel, compose } = cf
const rel = (relStrLines) => {
    // a rel a array of 2 element.  fst is key-itm, snd is set of child-itm
    const a = splitLf(relStrLines)
    const relStrLy = pipe(relStrLines)(splitLf,rmvEmpLin)
    const relAy = map(relStr2rel)(relStrLy)
    const relMap = $relMap(relAy)
    const itmSetAy = map(rel2itmSet)(relAy) // rel2nodSet returs a set of a-rel's key and all its child
    const itmSet = $itmSet(itmSetAy)
    const parItmSet = map2kset(relMap)
    const rootItmSet = setWhere(isRoot(relMap))(parItmSet)
    const chdItmSet = setWhere(isChd(relMap))(itmSet)
    const leafItmSet = $leafItmSet(chdItmSet, relMap)
    const cycPthSetAy = $cycPthSetAy(itmSet, relMap)
    const tpnRelSet = $tpnRelSet(rootItmSet, relMap, cycPthSetAy)
    const evlRelSet = $evlRelSet(rootItmSet, relMap, cycPthSetAy)
    const lvlRelSet = $lvlRelSet(rootItmSet, relMap, cycPthSetAy)
    debugger
    return {
        relMap, evlRelSet, lvlRelSet, tpnRelSet,
        itmSet, rootItmSet, leafItmSet, parItmSet, chdItmSet,
        cycPthSetAy
    }
}
const tst = () => {
    const relStrLines = `a b c d e
b d e f
x y z`
    const a = rel(relStrLines)
    console.log(a)
    debugger;
    const b = fmtRel(a)
    console.log(b)
}
const fmtRel = ({ relMap, evlRelSet, lvlRelSet, tpnRelSet, itmSet, rootItmSet, leafItmSet, parItmSet, chdItmSet, cycPthSetAy }) => {
    const tpnLy = map(rel2lin(''))(tpnRelSet)
    const lvlLy = map(rel2lin(''))(lvlRelSet)
    const evlLy = map(rel2lin(''))(evlRelSet)
    const z = $rsltLy({ relMap, evlLy, tpnLy, lvlLy, leafItmSet, itmSet, rootItmSet, parItmSet, chdItmSet, cycPthSetAy })
    return z
}
const set2lin = (pfx) => (set) => {
    const ay = set2ay(set)
    const lin = ay.join(' ')
    return pfx + (pfx ? ' ' : '') + lin
}
const $rsltLy = ({ relStrLy, relMap, evlLy, tpnLy, lvlLy, leafItmSet, itmSet, rootItmSet, parItmSet, chdItmSet, cycPthSetAy }) => {
    const inp = ayAddPfx('inp ')(relStrLy)
    const rel = map(rel2lin('rel'))(relMap.values())
    const root = set2lin('root')(rootItmSet)
    const itm = set2lin('item')(itmSet)
    const par = set2lin('parent')(parItmSet)
    const chd = set2lin('child')(chdItmSet)
    const leaf = set2lin('leaf')(leafItmSet)
    const cyc = map(set2lin('cyclic'))(cycPthSetAy)
    const tpn = ayAddPfx("evalTopDonw ")(tpnLy)
    const lvl = ayAddPfx("evalLevel ")(lvlLy)
    const evl = ayAddPfx("'evalInOrder ")(evlLy)
    const z = inp.concat(rel, root, itm, par, chd, leaf, cyc, tpn, lvl, evl)
    return z
}
const $tpnRelSet = (rootItmSet, relMap, cycPthSetAy) => { // Top down relation array
    const z = new Set
    if (cycPthSetAy.length > 0)
        return z
    for (let rootItm of rootItmSet) {
        r(rootItm)
    }
    return z
    function push(itm) {
        const rel = relMap.get(itm)
        if (rel)
            z.add(rel)
    }
    function r(itm) {
        if (relMap.has(itm)) {
            push(itm)
            const chdSet = relMap.get(itm)[1]
            for (let chd of chdSet) {
                r(chd)
            }
        }
    }
}
const $evlRelSet = (rootItmSet, relMap, cycPthSetAy) => {
    const z = new Set
    if (cycPthSetAy.length > 0)
        return z
    for (let rootItm of rootItmSet) {
        r(rootItm)
    }
    return z
    function push(itm) {
        const rel = relMap.get(itm)
        if (rel)
            z.add(rel)
    }
    function r(itm) {
        if (relMap.has(itm)) {
            const chdSet = relMap.get(itm)[1]
            for (let chd of chdSet) {
                r(chd)
            }
            push(itm)
        }
    }
}
const $relMap2ly = (relMap) => {
    const z = []
    for (let [k, rel] of relMap) {
        z.push(rel2lin(rel))
    }
    return z
}
const $lvlRelSet = (rootItmSet, relMap, cycPthSetAy) => {
    //console.log(relMap2ly(relMap))
    //debugger
    const z = new Set
    if (cycPthSetAy.length > 0)
        return z
    for (let rootItm of rootItmSet) {
        if (relMap.has(rootItm))
            push(rootItm)
    }
    for (let rootItm of rootItmSet) {
        r(rootItm)
    }
    return z
    function push(itm) {
        const rel = relMap.get(itm)
        if (rel)
            z.add(rel)
    }
    function r(itm) {
        if (itm === 2)
            debugger
        if (relMap.has(itm)) {
            const chdSet = relMap.get(itm)[1]
            if (!chdSet instanceof Set)
                debugger
            for (let chd of chdSet) {
                if (chd === undefined)
                    debugger
                push(chd)
            }
            for (let chd of chdSet) {
                r(chd)
            }
        }
    }
}
const $cycPthSetAy = (itmSet, relMap) => {
    const remItmSet = setClone(itmSet)
    const z = []
    let j = 0
    while (remItmSet.size > 0) {
        if (j++ > 10000)
            debugger
        const itm = fstItm(remItmSet)
        const [isCyc, pthSet] = itm2pthSet(itm, remItmSet, relMap)
        if (isCyc)
            z.push(pthSet)
        const lasPth = lasItm(pthSet)
        setMinus([lasPth])(remItmSet)
    }
    return z
}
const itm2pthSet = (itm, remItmSet, relMap) => {
    // return a path set [isCyc, pthSet] start from itm
    // if a child is not in remItmSet, it considers as the pth end
    // remItmSet: remaing item set
    var pthSet = new Set([itm])
    let nxt
    let i = itm
    while (nxt = nxtItm(i, remItmSet, relMap)) {
        if (pthSet.has(nxt))
            return [true, pthSet]
        pthSet.add(nxt)
        i = nxt
    }
    return [false, pthSet]
}
const nxtItm = (itm, remItmSet, relMap) => { // null or nxtItm from itm's chd not in remItmSet
    // if all chd are not in remItmSet, return []
    if (!relMap.has(itm))
        return null
    const chdSet = relMap.get(itm)[1]
    for (let chd of chdSet) {
        if (remItmSet.has(chd))
            return chd
    }
    return null
}
const $leafItmSet = (chdItmSet, relMap) => {
    return setWhere(not(isPar(relMap)))(chdItmSet)
}
const $itmSet = (itmSetAy) => { // create a set of all nodes in nodSetAy
    const o = new Set // itmSet
    for (let itmSet of itmSetAy)
        for (let itm of itmSet)
            o.add(itm)
    return o
}
const $relStrLy = (relStrLines) => {
    const ay = splitLf(relStrLines)
    const z = []
    for (let i of ay) {
        const l = i.trim()
        if (l)
            z.push(l)
    }
    return z
}
const relStr2rel = (relStr) => {
    const ay = splitSpc(relStr)
    const k = ay.shift()
    const set = new Set(ay)
    const z = [k, set]
    return z
}
const $relMap = (relAy) => {// if the key of some element in relAy has dup key, the latest one will be used
    //                             rel of no chd will be removed
    const o = new Map // relMap
    for (let i of relAy)
        if (i[1].size > 0)
            o.set(i[0], i)
    return o
}
const isChd = (relMap) => (itm) => {
    for (let [key, chdSet] of relMap.values())
        if (chdSet.has(itm))
            return true
    return false
}
const isPar = (relMap) => (itm) => {
    return relMap.has(itm)
}
const isRoot = (relMap) => {
    return and(isPar(relMap), not(isChd(relMap)))
}
const rel2itmSet = (rel) => {
    const o = new Set
    o.add(rel[0])
    for (let i of rel[1])
        o.add(i)
    return o
}
const rel2lin = (pfx) => (rel) => {
    const [k, itmSet] = rel
    const z = pfx + (pfx ? ' ' : '') + k + ' ' + set2lin('')(itmSet)
    return z
}
if (module.id === '.') {
    tst()
    debugger
}
module.exports = { rel, fmtRel }