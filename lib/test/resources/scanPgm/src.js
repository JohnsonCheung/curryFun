"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cf = require("../curryfun");
const x = require("../scanPgm");
//fjs_updFtsMainTstIfStmt(__filename)
if (module.id === '.') {
    tst__x1_ix1();
    debugger
    tst__x2_ix2();
    tst__xn1_part1();
    tst__xn2_part2();
    tst__xn2fl_srtedFunLy();
    tst__xn2fn_srtedFunNy();
    tst__xn2t_srtedTstFunNy();
    tst__xn2ts_srtedTstFunNy();
    tst__xn3_part3();
    tst__xn_newLines();
    tst__y_nm_lvlI();
    x.fTstJs_updMainTstIfStmt; // 
    x.fjs_updFtsMainTstIfStmt; // 
    x.fts_updMainTstIfStmt; // 
    x.funLin_funNm; // 
    x.funLin_part2; // 
    x.lin_isFunLin; // 
    x.srcLy_funLy; // 
    x.x1_ix1; // 
    x.x1e_eq; // 
    x.x2_ix2; // 
    x.xn_newLines; // 
    x.xn1_part1; // 
    x.xn2_part2; // 
    x.xn2f_srtedFunLy; // 
    x.xn2fdb_brk; // 
    x.xn2fdbf_funNm; // 
    x.xn2fdbr_rmk; // 
    x.xn2fl_srtedFunLy; // 
    x.xn2fn_srtedFunNy; // 
    x.xn2t_srtedTstFunNy; // 
    x.xn2ts_srtedTstFunNy; // 
    x.xn2tsl_lvlINy; // 
    x.xn2tsli_isLvlINm; // 
    x.xn2tsn_nLvl; // 
    x.xn3_part3; // 
    x.y_funNmCmpr; // 
    x.y_nm_lvlI; // 
}
//!tst ===========================================================
function tst__srcLy_funLy() {
    t1();
    return;
    function r(exp, ly) {
        const act = x.srcLy_funLy(ly);
        debugger;
        cf.assertIsEq(exp, act);
    }
    function t1() {
        const exp = new Map();
        const ly = tstRes_ly();
        r(exp, ly);
    }
}
function tst__y_nm_lvlI() {
    t1();
    t2();
    t3();
    t4();
    return;
    function r(exp, nm) {
        const act = x.y_nm_lvlI(nm);
        cf.assertIsEq(exp, act);
    }
    function t1() {
        let exp = 0;
        r(exp, 'x_1');
        r(exp, 'y_1');
    }
    function t2() {
        let exp = 1;
        r(exp, 'x1_1');
        r(exp, 'y1_1');
    }
    function t3() {
        let exp = -1;
        let nm = 'x1';
        r(exp, 'x1');
        r(exp, 'y1');
    }
    function t4() {
        let exp = 2;
        r(exp, 'x12_1');
        r(exp, 'y12_1');
    }
}
function tst__xn2fl_srtedFunLy() {
    t1();
    function r(exp, srcLy) {
        const act = x.xn2fl_srtedFunLy(srcLy);
        cf.oBrw(act);
        debugger;
        cf.assertIsEq(exp, act);
    }
    function t1() {
        const srcLy = tstRes_ly();
        const exp = [];
        r(exp, srcLy);
    }
}
function tst__ftsUpdMainTstIfStmt() {
    t1();
    function r(fts) {
        x.fts_updMainTstIfStmt(fts);
    }
    function t1() {
        const fts = cf.ffnFts(__filename);
        r(fts);
    }
}
function tst__xn_newLines() {
    t1();
    return;
    function r(exp, lines) {
        const act = x.xn_newLines(lines);
        //cf.assertIsEq(exp, act);
        //cf.sBrwAtFdrFn('compare', 'exp')(exp);
        //cf.sBrwAtFdrFn('compare', 'act')(act ? act : '');
    }
    function t1() {
        const lines = tstRes_lines();
        const exp = '';
        r(exp, lines);
    }
}
function tst__xn2_part2() {
    t1();
    return;
    function r(exp, ly, ix1, ix2) {
        const act = x.xn2_part2(ly, ix1, ix2);
        cf.assertIsEq(exp, act);
        //cf.oBrw(act)
        //cf.sBrwAtFdrFn('compare', 'exp')(exp)
        //cf.sBrwAtFdrFn('compare', 'act')(act)
    }
    function t1() {
        const ix1 = 52;
        const ix2 = 57;
        const ly = tstRes_ly();
        const e0 = [
            'tst__xn1_part1()',
            'tst__xn3_part3()',
            'tst__x1_ix1()',
            'tst__x2_ix2()',
            'tst__aa()',
            'fts_updMainTstIfStmt',
            'x1_ix1',
            'x1e_eq',
            'x2_ix2',
            'xn1_part1',
            'xn2_part2',
            'xn2n_tstFunNy',
            'xn3_part3',
            'xn_newLines'
        ];
        const exp = cf.itrAddPfx('    ')(e0).join('\r\n');
        r(exp, ly, ix1, ix2);
    }
}
function tst__xn1_part1() {
    t1();
    return;
    function r(exp, ly, ix1) {
        const act = x.xn1_part1(ly, ix1);
        cf.assertIsEq(exp, act);
        //cf.sBrwAtFdrFn('compare','exp')(exp)
        //cf.sBrwAtFdrFn('compare','act')(act)
    }
    function t1() {
        const ix1 = 52;
        const ly = tstRes_ly();
        const exp = ly.slice(0, 53).join('\r\n');
        r(exp, ly, ix1);
    }
}
function tst__xn3_part3() {
    t1();
    return;
    function r(exp, ly, ix2) {
        const act = x.xn3_part3(ly, ix2);
        cf.assertIsEq(exp, act);
        //cf.sBrwAtFdrFn('compare','exp')(exp)
        //cf.sBrwAtFdrFn('compare','act')(act)
    }
    function t1() {
        const ix2 = 57;
        const ly = tstRes_ly();
        const exp = ly.slice(ix2).join('\r\n');
        r(exp, ly, ix2);
    }
}
function tst__x1_ix1() {
    debugger
    t1();
    return;
    function r(exp, ly) {
        const act = x.x1_ix1(ly);
        cf.assertIsEq(exp, act);
    }
    function t1() {
        const exp = 52;
        const ly = tstRes_srcLy();
        r(exp, ly);
    }
}
function tstRes_srcLy() {
    return cf.ftLy(__dirname + '/resources/scanPgm/src.js');
}
function tstRes_lines() {
    return cf.ftLines(__dirname + '/resources/scanPgm/src.js');
}
function tst__xn2ts_srtedTstFunNy() {
    t1();
    function r(exp, ny) {
        const act = x.xn2ts_srtedTstFunNy(ny);
        cf.assertIsEq(exp, act);
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
        ];
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
        ];
        const act = x.xn2ts_srtedTstFunNy(ny);
        cf.assertIsEq(exp, act);
    }
}
function tst__xn2t_srtedTstFunNy() {
    t1();
    function r(exp, ly) {
        const act = x.xn2t_srtedTstFunNy(ly);
        cf.assertIsEq(exp, act);
        //cf.sBrwAtFdrFn('compare', 'exp')(exp.join('\r\n'))
        //cf.sBrwAtFdrFn('compare', 'act')(act.join('\r\n'))
    }
    function t1() {
        const ly = tstRes_ly();
        const exp = [
            "tst__xn1_part1",
            "tst__xn3_part3",
            "tst__x1_ix1",
            "tst__x2_ix2",
            "tst__aa"
        ];
        r(exp, ly);
    }
}
function tst__x2_ix2() {
    t1();
    return;
    function r(exp, ly, ix1) {
        const act = x.x2_ix2(ly, ix1);
        cf.assertIsEq(exp, act);
    }
    function t1() {
        const ix1 = 52;
        const exp = 57;
        const ly = tstRes_ly();
        r(exp, ly, ix1);
    }
}
function tst__xn2fn_srtedFunNy() {
    t1();
    function r(exp, ly) {
        const act = x.xn2fn_srtedFunNy(ly);
        //cf.oBrw(ly)
        cf.assertIsEq(exp, act);
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
        ];
        const ly = tstRes_ly();
        r(exp, ly);
    }
}
