/// <reference path="./typings/node/node.d.ts"/>
'use strict'
import * as cf from './curryfun.js'
import * as fs from 'fs'

export const fts_updMainTstIfStmt = (fts: fts): void => {
    // assume: [ module.id | function tst__* ]
    // aim:    [ upd module.id ]
    // assume[module.id]: each fts (*.ts-file), there is a statement of
    //       : if(module.id==='.') {
    //       : ..           <-- {context}
    //       : }
    // assume[function tst__*]: each fts, there are some /^function (tst__[\w$0-0_])\(\)/
    // aim:[upd module.id]: update the {context} by list of tst__xxxx
    const oldLines = cf.ftLines(fts)
    const newLines = xn_newLines(oldLines)
    if (newLines !== null && newLines !== oldLines) {
        cf.ffnMakBackup(fts)
        cf.sWrt(fts)(newLines)
    }
}
const xn_newLines = (newLines: lines): lines | null => {
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
const x1e_eq = cf.vEQ("if (module.id === '.') {")
const x1_ix1 = (ly: ly): ix => cf.ayFindIx(x1e_eq)(ly)
const x2_ix2 = (ly: ly, ix1: ix): ix => {
    if (ix1 === null)
        return null
    for (let ix = ix1 + 1; ix < ly.length; ix++) {
        if (ly[ix] === '}')
            return ix
    }
    return null
}
const xn1_part1 = (ly: ly, ix1: n): lines => ly.slice(0, ix1 + 1).join('\r\n')
const xn2_part2 = (ly: ly, ix1: n, ix2: n): lines => {
    const tstNy = xn2t_srtedTstFunNy(ly)
    const funNy = xn2f_srtedFunNy(ly)
    const t1 = cf.itrAddPfxSfx('    ', '()')(tstNy)
    const f1 = cf.itrAddPfx('    ')(funNy)
    const n = t1.concat(f1)
    return n.join('\r\n')
}
const xn2tsn_nLvl = (ny: ny) => cf.itrMax(cf.itrMap(y_nm_lvlI)(ny))
const y_nm_lvlI = (nm: nm) => {
    const c0 = nm[0]
    if (c0 !== 'x' && c0 !== 'y')
        return -1
    const ix = nm.indexOf("_")
    if (ix === -1)
        return -1
    return ix - 1
}
const xn2tli_isLvlINm = (lvlI: n) => (nm: nm): b => y_nm_lvlI(nm) === lvlI
const xn2tsl_lvlINy = (lvlI: n, ny: ny): ny => cf.itrWhere(xn2tli_isLvlINm(lvlI))(ny).sort()
const xn3_part3 = (ly: ly, ix2: n): lines => ly.slice(ix2).join('\r\n')
const xn2ts_srtedTstFunNy = (_tstFunNy: ny): nm[] => {
    const ny = cf.itrMap(cf.sRmvPfx("tst__"))(_tstFunNy)
    const n0 = xn2tsn_nLvl(ny)
    const n = cf.vDft(0)(n0)
    let o: ny = []
    for (let lvlI = n; lvlI >= -1; lvlI--) {
        o = o.concat(xn2tsl_lvlINy(lvlI, _tstFunNy))
    }
    if (_tstFunNy.length !== o.length) {
        debugger
        cf.er('_ny.length should = o.length', { _tstFunNy, o })
    }
    return o.reverse()
}
const xn2t_srtedTstFunNy = (_ly: ly): nm[] => {
    const ny = cf.srcCol(/^function (tst__[$a-zA-Z].*)\(\)/)(_ly)
    return xn2ts_srtedTstFunNy(ny)
}
const xn2f_srtedFunNy = (_ly: ly): nm[] => {
    const n1 = cf.srcExpConstNy(_ly)
    const n2 = cf.srcConstNy(_ly)
    return n1.concat(n2).sort()
}
//!tst ===========================================================
function tst__y_nm_lvlI() {
    t1()
    t2()
    t3()
    t4()
    return
    function r(exp: n, nm: nm) {
        const act = y_nm_lvlI(nm)
        cf.assertIsEq(exp, act)
    }
    function t1() {
        let exp = 0
        r(exp, 'x_1')
        r(exp, 'y_1')
    }
    function t2() {
        let exp = 1
        r(exp, 'x1_1')
        r(exp, 'y1_1')
    }
    function t3() {
        let exp = -1
        let nm = 'x1'
        r(exp, 'x1')
        r(exp, 'y1')
    }
    function t4() {
        let exp = 2
        r(exp, 'x12_1')
        r(exp, 'y12_1')
    }
}
function tst__ftsUpdMainTstIfStmt() {
    t1()
    function r(fts) {
        fts_updMainTstIfStmt(fts)
    }
    function t1() {
        const fts = cf.ffnFts(__filename)
        r(fts)
    }
}
function tst__xn_newLines() {
    t1();
    return;
    function r(exp: lines, lines: lines) {
        const act = xn_newLines(lines);
        //cf.assertIsEq(exp, act);
        //cf.sBrwAtFdrFn('compare', 'exp')(exp);
        //cf.sBrwAtFdrFn('compare', 'act')(act ? act : '');
    }
    function t1() {
        const lines = tstRes_lines();
        const exp = ''
        r(exp, lines);
    }
}

function tst__xn2_part2() {
    t1()
    return
    function r(exp: s, ly: ly, ix1: n, ix2: n) {
        const act = xn2_part2(ly, ix1, ix2)
        cf.assertIsEq(exp, act)
        //cf.sBrwAtFdrFn('compare', 'exp')(exp)
        //cf.sBrwAtFdrFn('compare', 'act')(act)
    }
    function t1() {
        const ix1 = 52
        const ix2 = 57
        const ly = tstRes_ly()
        const e0 = [
            'tst__xn3_part3()',
            'tst__xn1_part1()',
            'tst__x2_ix2()',
            'tst__x1_ix1()',
            'tst__aa()',
            'fts_updMainTstIfStmt',
            'x1_ix1',
            'x1e_eq',
            'x2_ix2',
            'xn1_part1',
            'xn2_part2',
            'xn2n_tstFunNy',
            'xn3_part3',
            'xn_newLines']
        const exp = cf.itrAddPfx('    ')(e0).join('\r\n');
        r(exp, ly, ix1, ix2)
    }
}
function tst__xn1_part1() {
    t1()
    return
    function r(exp: s, ly: ly, ix1) {
        const act = xn1_part1(ly, ix1)
        cf.assertIsEq(exp, act)
        //cf.sBrwAtFdrFn('compare','exp')(exp)
        //cf.sBrwAtFdrFn('compare','act')(act)
    }
    function t1() {
        const ix1 = 52
        const ly = tstRes_ly()
        const exp = ly.slice(0, 53).join('\r\n')
        r(exp, ly, ix1)
    }
}
function tst__xn3_part3() {
    t1()
    return
    function r(exp: s, ly: ly, ix2) {
        const act = xn3_part3(ly, ix2)
        cf.assertIsEq(exp, act)
        //cf.sBrwAtFdrFn('compare','exp')(exp)
        //cf.sBrwAtFdrFn('compare','act')(act)
    }
    function t1() {
        const ix2 = 57
        const ly = tstRes_ly()
        const exp = ly.slice(ix2).join('\r\n')
        r(exp, ly, ix2)
    }
}
function tst__x1_ix1() {
    t1()
    return
    function r(exp, ly) {
        const act = x1_ix1(ly)
        cf.assertIsEq(exp, act)
    }
    function t1() {
        const exp = 52
        const ly = tstRes_ly()
        r(exp, ly)
    }
}
function tstRes_ly() {
    return cf.ftLy(__dirname + '/scanPgm.tstRes.txt')
}
function tstRes_lines() {
    return cf.ftLines(__dirname + '/scanPgm.tstRes.txt')
}
function tst__xn2t_srtedTstFunNy() {
    t1()
    function r(exp: ly, ly: ly) {
        const act = xn2t_srtedTstFunNy(ly)
        cf.assertIsEq(exp, act)
    }
    function t1() {
        const ly = tstRes_ly()
        const exp = [
            'tst__aa',
            'tst__x1_ix1',
            'tst__x2_ix2',
            'tst__xn1_part1',
            'tst__xn3_part3']
        r(exp, ly)
    }
}
function tst__x2_ix2() {
    t1()
    return
    function r(exp, ly, ix1: ix) {
        const act = x2_ix2(ly, ix1)
        cf.assertIsEq(exp, act)
    }
    function t1() {
        const ix1 = 52
        const exp = 57
        const ly = tstRes_ly()
        r(exp, ly, ix1)
    }
}
function tst__xn2f_srtedFunNy() {
    t1()
    function r(exp: ny, ly: ly) {
        const act = xn2f_srtedFunNy(ly)
        debugger
        cf.assertIsEq(exp, act)
    }
    function t1() {
        const exp = [] //?
        const ly = tstRes_ly()
        r(exp, ly)
    }
}
if (module.id === '.') {
    tst__ftsUpdMainTstIfStmt()
    fts_updMainTstIfStmt
    x1_ix1
    x1e_eq
    x2_ix2
    xn1_part1
    xn2_part2
    xn2f_srtedFunNy
    xn2t_srtedTstFunNy
    xn2tli_isLvlINm
    xn2ts_srtedTstFunNy
    xn2tsl_lvlINy
    xn2tsn_nLvl
    xn3_part3
    xn_newLines
    y_nm_lvlI
}
