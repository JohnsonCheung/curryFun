/// <reference path="./typings/node/node.d.ts"/>
'use strict'
import * as cf from './curryfun.js'
import * as fs from 'fs'
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';
const { pipe, rmvEmp, map } = cf
//!export
export const fjs_updMainTstIfStmt = (_fjs: fjs): void => {
    const fTstJs = ''
    const fjs = ''
    x(fTstJs, fjs)
}
export const fTstJs_updMainTstIfStmt = (_fTstJs: fTstJs): void => {
    const fTstJs = ''
    const fjs = ''
    x(fTstJs, fjs)
}
//!x
const x = (_fTstJs: fTstJs, _fjs: fjs): void => {
    // assume: [ module.id | function tst__* ]
    // aim:    [ upd module.id ]
    // assume[module.id]: each fts (*.ts-file), there is a statement of
    //       : if(module.id==='.') {
    //       : ..           <-- {context}
    //       : }
    // assume[function tst__*]: each fts, there are some /^function (tst__[\w$0-0_])\(\)/
    // aim:[upd module.id]: update the {context} by list of tst__xxxx
    const oldLines = cf.ftLines(_fts)
    const newLines = xn_newLines(oldLines)
    const fTstTs = ''
    if (newLines !== null && newLines !== oldLines) {
        //cf.ffnMakBackup(_fts)
        cf.sWrt(fTstTs)(newLines)
    }
}
export const xn_newLines = (newLines: lines): lines | null => {
    const ly = cf.sSplitLines(newLines)
    const ix1 = x1_ix1(ly)
    const ix2 = x2_ix2(ly, ix1)
    if (ix1 === null || ix2 === null)
        return null
    const p1 = xn1_part1(ly, ix1 as number)
    const p2 = xn2_part2(tstSrc, ix1, ix2, src)
    const p3 = xn3_part3(ly, ix2)
    return p1 + '\r\n' + p2 + '\r\n' + p3
}
type ix = number | null
export const x1e_eq = cf.vEQ("if (module.id === '.') {")
export const x1_ix1 = (ly: ly): ix => cf.ayFindIx(x1e_eq)(ly)
export const x2_ix2 = (ly: ly, ix1: ix): ix => {
    if (ix1 === null)
        return null
    for (let ix = ix1 + 1; ix < ly.length; ix++) {
        if (ly[ix] === '}')
            return ix
    }
    return null
}
export const xn1_part1 = (_src: src, ix1: n): lines => _src.slice(0, ix1 + 1).join('\r\n')
export const xn2_part2 = (_tstSrc: src, ix1: n, ix2: n, _src: src): lines => {
    const tstNy = tstSrc_srtedTstFunNy(_tstSrc)
    const expConstLy = src_srtedExpConstLy(_src)
    const t1 = cf.itrAddPfxSfx('    ', '()')(tstNy)
    const f1 = cf.itrAddPfx('    ')(expConstLy)
    const n = t1.concat(f1)
    return n.join('\r\n')
}
export const xn3_part3 = (ly: ly, ix2: n): lines => ly.slice(ix2).join('\r\n')
export const xn2fdbf_funNm = (_lin: lin): nm => {
    const m = _lin.match(cf.reConstNm)
    if (m === null)
        return ''
    return m[1]
}
export const xn2fdb_brk = (_lin: lin): [s, s] => {
    const funNm = xn2fdbf_funNm(_lin)
    const rmk = srcLin_rmk(_lin)
    return [funNm, rmk]
}
//!lib ===========
export const tstSrc_srtedTstFunNy = yA
export const srcLin_rmk = (_lin: lin): s => {
    const m = _lin.match(/\/\/(.*)$/)
    if (m === null)
        return ''
    return m[1].trim()
}
export const funNmCmpr = (a: s, b: s) => cf.vvCompare(a.replace(/\_/g, ' '), b.replace(/\_/g, ' '))
export const funNm_lvlNo = (nm: nm) => {
    const c0 = nm[0]
    if (c0 !== 'x' && c0 !== 'y')
        return -1
    const ix = nm.indexOf("_")
    if (ix === -1)
        return -1
    return ix - 1
}
export const src_expCOnstNy = (_src: src): ny => pipe(_src)(map(lin_expConstNm), rmvEmp)
export const lin_expConstNm = (_lin: lin): nm | null => {
    const m = _lin.match(cf.reExpConstNm)
    return (m === null)
        ? null
        : m[1]
}
export const expConstLin_constNm = (_expConstLin: lin): nm => {
    const m0 = _expConstLin.match(cf.reExpConstNm)
    if (m0 !== null)
        return m0[1]
    const m1 = _expConstLin.match(cf.reConstNm)
    if (m1 !== null)
        return m1[1]
    cf.er('Given _funLin is not a function-line', { _expConstLin })
    return ''
}
export const expConstLin_fmtLinPart2 = (_expConstin: lin): s => {
    const a0 = cf.sRmvPfx('export ')(_expConstin)
    const a1 = cf.sRmvPfx('const ')(a0)
    const a2 = cf.sRmvFstTerm(a1)
    return (a2 === '')
        ? ''
        : ' // ' + a2
}
export const src_expConstLy = (_src: src): ly => cf.itrWhere(lin_isExpConstLin)(_src)
export const lin_isExpConstLin = (_lin: lin): b => cf.reExpConstNm.test(_lin)
export const src_srtedExpConstLy = (_src: src): ly => {
    const a = () => cf.srcExpConstNy(_src).sort(funNmCmpr)
    const b = () => {
        const expConstLy = src_expConstLy(_src)
        const expConstNy = cf.pipe(expConstLy)(cf.itrMap(lin_expConstNm), cf.itrRmvEmp)
        const part2Ay = cf.itrMap(expConstLin_fmtLinPart2)(expConstLy)
        const expConstNy1 = cf.itrAlignL(expConstNy)
        const lin = i => expConstNy1[i] + part2Ay[i]
        const ly = cf.itrMap(lin)(cf.nItr(expConstNy.length))
        return ly.sort(funNmCmpr)
    }

    return true
        ? a()
        : b()
}
//!y ====================
export const yAn_nLvl = (ny: ny) => cf.itrMax(cf.itrMap(funNm_lvlNo)(ny))
export const yAli_isLvlINm = (_lvlI: n) => (_tstFunNm: nm): b => {
    const nm = cf.sRmvPfx('tst__')(_tstFunNm)
    const lvlI = funNm_lvlNo(nm)
    const z = lvlI === _lvlI
    return z
}
export const yAl_lvlINy = (lvlI: n, ny: ny): ny => cf.itrWhere(yAli_isLvlINm(lvlI))(ny).sort()
export function yA(_tstSrc: src): nm[] {
    tstSrc_srtedTstFunNy
    const ny0 = cf.srcCol(/^function (tst__[$a-zA-Z][$_0-9a-zA-Z]*)\(\)/)(_tstSrc)
    const ny = cf.itrMap(cf.sRmvPfx("tst__"))(ny0)
    const n0 = yAn_nLvl(ny)
    const n = cf.vDft(0)(n0)
    let o: ny = []
    for (let lvlI = n; lvlI >= -1; lvlI--) {
        const m = yAl_lvlINy(lvlI, ny)
        o = o.concat(m)
    }
    if (ny.length !== o.length) {
        debugger
        cf.er('ny.length should = o.length', { ny, o })
    }
    return o
}