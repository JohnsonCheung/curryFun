import * as cf from '../curryfun'
import * as assert from 'assert'
import * as path from 'path'
import * as fs from 'fs'
import * as x from '../scanPgm'
const { assertIsEq } = cf
//fjs_updFtsMainTstIfStmt(__filename)
const tr_srcFt = __dirname + '/resources/scanPgm/src.js'
const tr_src = cf.ftLy(tr_srcFt)
const tr_ix1 = 5
const tr_ix2 = 45
const tr_srcLines = cf.ftLines(tr_srcFt)
const zBrw_srcLines = () => cf.ftBrw(tr_srcFt)
if (module.id === '.') {
    tst__x1_ix1()
    tst__x2_ix2()
    tst__xn1_part1()
    tst__xn2_part2()
    tst__src_srtedExpConstLy()
    tst__src_srtedExpConstLy()
    tst__xn2t_srtedTstFunNy()
    tst__src_srtedTstFunNy()
    tst__xn3_part3()
    tst__xn_newLines()
    tst__funNm_lvlNo()
    x.fTstJs_updMainTstIfStmt // 
    x.fjs_updFtsMainTstIfStmt // 
    x.fts_updMainTstIfStmt    // 
    x.x1_ix1                  // 
    x.x1e_eq                  // 
    x.x2_ix2                  // 
    x.xn_newLines             // 
    x.xn1_part1               // 
    x.xn2_part2               // 
    x.xn2fdb_brk              // 
    x.xn2fdbf_funNm           // 
    x.xn3_part3               // 
}
//!tst ===========================================================
function tst__src_expConstLy() {
    t1()
    return
    function r(exp: sdic, ly: ly) {
        const act = x.src_expConstLy(ly)
        debugger
        assertIsEq(exp, act)
    }
    function t1() {
        const exp = new Map<s, s>()
        const ly = tr_src
        r(exp, ly)
    }
}
function tst__funNm_lvlNo() {
    t1()
    t2()
    t3()
    t4()
    return
    function r(exp: n, nm: nm) {
        const act = x.funNm_lvlNo(nm)
        assertIsEq(exp, act)
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
        x.fts_updMainTstIfStmt(fts)
    }
    function t1() {
        const fts = cf.ffnFts(__filename)
        r(fts)
    }
}
function tst__xn_newLines() {
    t1()
    return
    function r(exp: lines, lines: lines) {
        const act = x.xn_newLines(lines)
        assertIsEq(exp, act);
    }
    function t1() {
        const lines = tr_srcLines
        const exp = ''
        r(exp, lines);
    }
}

function tst__xn2_part2() {
    t1()
    return
    function r(exp: s, ly: ly, ix1: n, ix2: n) {
        debugger
        const act = x.xn2_part2(ly, ix1, ix2)
        assertIsEq(exp, act)
    }
    function t1() {
        const ix1 = tr_ix1
        const ix2 = tr_ix2
        const ly = tr_src
        const exp = `    tst__ftsUpdMainTstIfStmt()
    tst__srcLy_funLy()
    tst__x1_ix1()
    tst__x2_ix2()
    tst__xn1_part1()
    tst__xn2_part2()
    tst__xn2fl_srtedFunLy()
    tst__xn2fn_srtedFunNy()
    tst__xn2t_srtedTstFunNy()
    tst__xn2ts_srtedTstFunNy()
    tst__xn3_part3()
    tst__xn_newLines()
    tst__y_nm_lvlI()
    cf // 
    x  // `.replace(/\n/g, '\r\n')
        r(exp, ly, ix1, ix2)
    }
}
function tst__xn1_part1() {
    t1()
    return
    function r(exp: s, ly: ly, ix1) {
        const act = x.xn1_part1(ly, ix1)
        assertIsEq(exp, act)
    }
    function t1() {
        const ix1 = tr_ix1
        const ly = tr_src
        const exp = ly.slice(0, tr_ix1 + 1).join('\r\n')
        r(exp, ly, ix1)
    }
}
function tst__xn3_part3() {
    t1()
    return
    function r(exp: s, ly: ly, ix2) {
        const act = x.xn3_part3(ly, ix2)
        assertIsEq(exp, act)
        //cf.sBrwAtFdrFn('compare','exp')(exp)
        //cf.sBrwAtFdrFn('compare','act')(act)
    }
    function t1() {
        const ix2 = tr_ix2
        const ly = tr_src
        const exp = ly.slice(ix2).join('\r\n')
        r(exp, ly, ix2)
    }
}
function tst__x1_ix1() {
    t1()
    return
    function r(exp, ly) {
        const act = x.x1_ix1(ly)
        assertIsEq(exp, act)
    }
    function t1() {
        const exp = 5
        const ly = tr_src
        r(exp, ly)
    }
}
function tst__src_srtedTstFunNy() {
    t1()
    function r(exp: ny, ny) {
        const act = x.src_srtedTstFunNy(ny)
        assertIsEq(exp, act)

    }
    function t1() {
        const ny = [
            'tst__x_3',
            'tst__x_1',
            'tst__x_2',
            'tst__x_4',
            'tst__xa_3',
            'tst__xa_1',
            'tst__xa_2',
            'tst__xa_4',
            'tst__xab_3',
            'tst__xab_1',
            'tst__xab_2',
            'tst__xab_4',
        ]
        const exp = [
            "tst__xab_1",
            "tst__xab_2",
            "tst__xab_3",
            "tst__xab_4",
            "tst__xa_1",
            "tst__xa_2",
            "tst__xa_3",
            "tst__xa_4",
            "tst__x_1",
            "tst__x_2",
            "tst__x_3",
            "tst__x_4"
        ]
        const act = x.src_srtedTstFunNy(ny)
        assertIsEq(exp, act)
    }
}
function tst__xn2t_srtedTstFunNy() {
    t1()
    function r(exp: ly, ly: ly) {
        const act = x.src_srtedTstFunNy(ly)
        assertIsEq(exp, act)
    }
    function t1() {
        const ly = tr_src
        const exp = [
            "tst__xn1_part1",
            "tst__xn3_part3",
            "tst__x1_ix1",
            "tst__x2_ix2",
            "tst__aa"
        ]
        r(exp, ly)
    }
}
function tst__x2_ix2() {
    t1()
    return
    function r(exp, ly, ix1: ix) {
        const act = x.x2_ix2(ly, ix1)
        assertIsEq(exp, act)
    }
    function t1() {
        const ix1 = tr_ix1
        const exp = tr_ix2
        const ly = tr_src
        r(exp, ly, ix1)
    }
}
function tst__src_srtedExpConstLy() {
    t1()
    function r(exp: ly, src: src) {
        const act = x.src_srtedExpConstLy(src)
        assertIsEq(exp, act)
    }
    function t1() {
        const exp = [
            "fts_updMainTstIfStmt",
            "x1_ix1",
            "x1e_eq",
            "x2_ix2",
            "xn1_part1",
            "xn2_part2",
            "xn2n_tstFunNy",
            "xn3_part3",
            "xn_newLines"
        ]
        const ly = tr_src
        r(exp, ly)
    }
}
