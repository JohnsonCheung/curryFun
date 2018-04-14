/// <reference path="./typings/node/node.d.ts"/>
'use strict'
import * as cf from './curryfun.js'
import * as fs from 'fs'
//!export
export const fTstJs_updMainTstIfStmt = (_fTstJs: fTstJs): void => fts_updMainTstIfStmt(cf.fTstJs_fts(_fTstJs))
export const fjs_updFtsMainTstIfStmt = (_fjs: fjs): void => fts_updMainTstIfStmt(cf.ffnFts(_fjs))
export const fts_updMainTstIfStmt = (_fts: fts): void => {
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
    if (newLines !== null && newLines !== oldLines) {
        //cf.ffnMakBackup(_fts)
        cf.sWrt(_fts)(newLines)
    }
}
//!lib ===========
export const funLin_funNm = (_funLin: lin): nm => {
    const m0 = _funLin.match(cf.reExpConstNm)
    if (m0 !== null)
        return m0[1]
    const m1 = _funLin.match(cf.reConstNm)
    if (m1 !== null)
        return m1[1]
    cf.er('Given _funLin is not a function-line', { _funLin })
    return ''
}
export const funLin_part2 = (_funLin: lin): s => {
    const a0 = cf.sRmvPfx('export ')(_funLin)
    const a1 = cf.sRmvPfx('const ')(a0)
    const a2 = cf.sRmvFstTerm(a1)
    return ' // ' + a2
}
export const srcLy_funLy = (_src: src): ly => cf.itrWhere(lin_isFunLin)(_src)
export const lin_isFunLin = (_lin: lin): b => {
    const z = cf.reConstNm.test(_lin) || cf.reExpConstNm.test(_lin)
    //    if(cf.sHasPfx('const')(_lin)) {
    //        console.log(z,_lin)
    //    }
    return z
}
//!x
export const xn_newLines = (newLines: lines): lines | null => {
    const ly = cf.sSplitLines(newLines)
    const ix1 = x1_ix1(ly)
    const ix2 = x2_ix2(ly, ix1)
    if (ix1 === null || ix2 === null)
        return null
    const p1 = xn1_part1(ly, ix1 as number)
    const p2 = xn2_part2(ly, ix1, ix2)
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
export const xn1_part1 = (ly: ly, ix1: n): lines => ly.slice(0, ix1 + 1).join('\r\n')
export const xn2_part2 = (ly: ly, ix1: n, ix2: n): lines => {
    const tstNy = xn2t_srtedTstFunNy(ly)
    const funLy = xn2f_srtedFunLy(ly)
    const t1 = cf.itrAddPfxSfx('    ', '()')(tstNy)
    const f1 = cf.itrAddPfx('    ')(funLy)
    const n = t1.concat(f1)
    return n.join('\r\n')
}
export const xn2tsn_nLvl = (ny: ny) => cf.itrMax(cf.itrMap(y_nm_lvlI)(ny))
export const xn2tsli_isLvlINm = (_lvlI: n) => (_tstFunNm: nm): b => {
    const nm = cf.sRmvPfx('tst__')(_tstFunNm)
    const lvlI = y_nm_lvlI(nm)
    const z = lvlI === _lvlI
    return z
}
export const xn2tsl_lvlINy = (lvlI: n, ny: ny): ny => cf.itrWhere(xn2tsli_isLvlINm(lvlI))(ny).sort()
export const xn3_part3 = (ly: ly, ix2: n): lines => ly.slice(ix2).join('\r\n')
export const xn2ts_srtedTstFunNy = (_tstFunNy: ny): nm[] => {
    const ny = cf.itrMap(cf.sRmvPfx("tst__"))(_tstFunNy)
    const n0 = xn2tsn_nLvl(ny)
    const n = cf.vDft(0)(n0)
    let o: ny = []
    for (let lvlI = n; lvlI >= -1; lvlI--) {
        const m = xn2tsl_lvlINy(lvlI, _tstFunNy)
        o = o.concat(m)
    }
    if (_tstFunNy.length !== o.length) {
        debugger
        cf.er('_ny.length should = o.length', { _tstFunNy, o })
    }
    return o
}
export const xn2t_srtedTstFunNy = (_ly: ly): nm[] => {
    const ny = cf.srcCol(/^function (tst__[$a-zA-Z][$_0-9a-zA-Z]*)\(\)/)(_ly)
    return xn2ts_srtedTstFunNy(ny)
}
export const xn2f_srtedFunLy = (_srcLy: ly): ly => {
    const v1 = false
    if (v1)
        return xn2fn_srtedFunNy(_srcLy)
    return xn2fl_srtedFunLy(_srcLy)
}
export const xn2fl_srtedFunLy = (_srcLy: ly): ly => {
    const funLy = srcLy_funLy(_srcLy)
    const funNy = cf.itrMap(funLin_funNm)(funLy)
    const part2Ay = cf.itrMap(funLin_part2)(funLy)
    const funNy1 = cf.itrAlignL(funNy)
    const lin = i => funNy1[i] + part2Ay[i]
    const ly = cf.itrMap(lin)(cf.nItr(funNy.length))
    return ly.sort(y_funNmCmpr)
}
export const xn2fdbf_funNm = (_lin: lin): nm => {
    const m = _lin.match(cf.reConstNm)
    if (m === null)
        return ''
    return m[1]
}
export const xn2fdbr_rmk = (_lin: lin): s => {
    const m = _lin.match(/\/\/(.*)$/)
    if (m === null)
        return ''
    return m[1].trim()
}
export const xn2fdb_brk = (_lin: lin): [s, s] => {
    const funNm = xn2fdbf_funNm(_lin)
    const rmk = xn2fdbr_rmk(_lin)
    return [funNm, rmk]
}
export const xn2fn_srtedFunNy = (_ly: ly): ly => {
    const n1 = cf.srcExpConstNy(_ly)
    const n2 = cf.srcConstNy(_ly)
    return n1.concat(n2).sort(y_funNmCmpr)
}
//!y ====================
export const y_funNmCmpr = (a: s, b: s) => cf.vvCompare(a.replace(/\_/g, ' '), b.replace(/\_/g, ' '))
export const y_nm_lvlI = (nm: nm) => {
    const c0 = nm[0]
    if (c0 !== 'x' && c0 !== 'y')
        return -1
    const ix = nm.indexOf("_")
    if (ix === -1)
        return -1
    return ix - 1
}
