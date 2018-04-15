/// <reference path="./typings/node/node.d.ts"/>
'use strict'
import * as cf from './curryfun.js'
import * as fs from 'fs'
const { ftLy, pipe, rmvEmp, map } = cf
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
export const x = (_fTstTs: fTstTs, _fts: fts): void => {
    // assume: [ module.id | function tst__* ]
    // aim:    [ upd module.id ]
    // assume[module.id]: each fts (*.ts-file), there is a statement of
    //       : if(module.id==='.') {
    //       : ..           <-- {context}
    //       : }
    // assume[function tst__*]: each fts, there are some /^function (tst__[\w$0-0_])\(\)/
    // aim:[upd module.id]: update the {context} by list of tst__xxxx
    const tstSrc: src = ftLy(_fTstTs)
    const eq = cf.vEQ("if (module.id === '.') {")
    const ix1Opt: n | null = cf.ayFindIx(eq)(tstSrc)
    if (ix1Opt === null)
        return
    const ix1 = ix1Opt
    const ix2Opt: n | null = (() => {
        for (let ix = ix1 + 1; ix < tstSrc.length; ix++) {
            if (tstSrc[ix] === '}')
                return ix
        }
        return null
    })()
    if (ix2Opt === null)
        return
    const ix2: n = ix2Opt
    const p1: lines = tstSrc.slice(0, ix1 + 1).join('\r\n')
    const tstNy: ny = (() => {
        const ny0 = cf.srcCol(/^function (tst__[$a-zA-Z][$_0-9a-zA-Z]*)\(\)/)(tstSrc)
        const ny = cf.itrMap(cf.sRmvPfx("tst__"))(ny0)
        return ny
    })()
    const nTstFunLvlOpt: n | null = cf.itrMax(cf.itrMap(funNm_lvlNo)(tstNy))
    const nTstFunLvl: n = cf.vDft(0)(nTstFunLvlOpt)
    const srtedTstNy: ny = (() => {
        let o: ny = []
        for (let lvlI = nTstFunLvl; lvlI >= -1; lvlI--) {
            const m = yAl_lvlINy(lvlI, tstNy)
            o = o.concat(m)
        }
        if (tstNy.length !== o.length) {
            debugger
            cf.er('ny.length should = o.length', { tstNy, o })
        }
        return o
    })()
    const src: src = (_fTstTs === _fts) ? tstSrc : ftLy(_fts)
    const expConstLy = src_srtedExpConstLy(src)
    const p2_tstFunLy: lines = cf.itrAddPfxSfx('    ', '()')(srtedTstNy).join('\r\n') + '\r\n'
    const p2_funLy: lines = cf.itrAddPfx('    ')(expConstLy).join('\r\n') + '\r\n'
    const p2: lines = p2_tstFunLy + p2_funLy
    const p3: lines = ix2 === null ? '' : tstSrc.slice(ix2).join('\r\n')
    const newLines = p1 + p2 + p3
    {
        const newLy = newLines.split('\r\n')
        cf.oBrw({ newLy })
    }
    debugger
    const oldLines: lines = tstSrc.join('\r\n')
    if (newLines !== '' && newLines !== oldLines) {
        //cf.ffnMakBackup(_fts)
        cf.sWrt(_fTstTs)(newLines)
    }
}
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
export const yAli_isLvlINm = (_lvlI: n) => (_tstFunNm: nm): b => {
    const nm = cf.sRmvPfx('tst__')(_tstFunNm)
    const lvlI = funNm_lvlNo(nm)
    const z = lvlI === _lvlI
    return z
}
export const yAl_lvlINy = (lvlI: n, ny: ny): ny => cf.itrWhere(yAli_isLvlINm(lvlI))(ny).sort()
