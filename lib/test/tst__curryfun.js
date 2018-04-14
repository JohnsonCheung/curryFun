"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cf = require("../curryfun");
//import * as scanPgm from '../scanPgm'; scanPgm.fTstJs_updMainTstIfStmt(__filename)
const { assertIsEq, each } = cf;
const { pipe, compose } = cf;
if (module.id === '.') {
    tst__pthPar();
    debugger;
    tst__Dry();
    tst__brk();
    tst__cmlNy();
    tst__cmlSpcNm();
    tst__drsLines();
    tst__drsOf_exportFunctions();
    tst__ftsExpConstNyBrw();
    tst__isEq();
    tst__isFTstJs();
    tst__isNum();
    tst__isOdd();
    tst__oPrp();
    tst__pthBrw();
    tst__pthFnAyPm();
    tst__sBox();
    tst__sBrwAtFdrFn();
    tst__sLik();
    tst__sNmSet();
    tst__sdryColWdt();
    tst__sdryColWdtAy();
    tst__sidStr();
    tst__sidpthBrw();
    tst__srcExpConstNy();
    tst__vidVal();
    tst__vidpthBrw();
}
function tst__sdryColWdtAy() {
    t1();
    return;
    function r(exp, sdry) {
        const act = cf.sdryColWdtAy(sdry);
        assertIsEq(exp, act);
    }
    function t1() {
        const sdry = [];
        const exp = [9, 11];
        r(exp, sdry);
    }
}
function tst__brk() {
    const { sBrk, sBrk1, sBrk2 } = cf;
    t1();
    function r(exp, sep, s) {
        const act = sBrk(sep)(s);
        assertIsEq(exp, act);
    }
    function t1() {
        let act, exp;
        act = sBrk('.')('sss.bb');
        ;
        ;
        ;
        ;
        ;
        exp = { s1: 'sss', s2: 'bb' };
        ;
        ;
        ;
        ;
        ;
        assertIsEq(exp, act);
        act = sBrk('.')(' sss . bb ');
        ;
        exp = { s1: 'sss', s2: 'bb' };
        ;
        ;
        ;
        ;
        ;
        assertIsEq(exp, act);
        act = sBrk1('.')('sss.bb');
        ;
        ;
        ;
        ;
        exp = { s1: 'sss', s2: 'bb' };
        ;
        ;
        ;
        ;
        ;
        assertIsEq(exp, act);
        act = sBrk1('.')(' sss . bb ');
        exp = { s1: 'sss', s2: 'bb' };
        ;
        ;
        ;
        ;
        ;
        assertIsEq(exp, act);
        act = sBrk1('x')('sss.bb');
        ;
        ;
        ;
        ;
        exp = { s1: 'sss.bb', s2: '' };
        ;
        ;
        ;
        ;
        assertIsEq(exp, act);
        act = sBrk1('x')(' sss . bb ');
        exp = { s1: ' sss . bb ', s2: '' };
        assertIsEq(exp, act);
        act = sBrk2('.')('sss.bb');
        ;
        ;
        ;
        ;
        exp = { s1: 'sss', s2: 'bb' };
        ;
        ;
        ;
        ;
        ;
        assertIsEq(exp, act);
        act = sBrk2('.')(' sss . bb ');
        exp = { s1: 'sss', s2: 'bb' };
        ;
        ;
        ;
        ;
        ;
        assertIsEq(exp, act);
        act = sBrk2('x')('sss.bb');
        ;
        ;
        ;
        ;
        exp = { s2: 'sss.bb', s1: '' };
        ;
        ;
        ;
        ;
        assertIsEq(exp, act);
        act = sBrk2('x')(' sss . bb ');
        exp = { s2: ' sss . bb ', s1: '' };
        assertIsEq(exp, act);
    }
}
function tst__sdryColWdt() {
    t1();
    t2();
    return;
    function r(exp, sdry, col) {
        const act = cf.sdryColWdt(col)(sdry);
        assertIsEq(exp, act);
    }
    function t1() {
        const sdry = [['lskdfj', '12345678901'], ['123456789', 'dkfj']];
        const col = 0;
        const exp = 9;
        r(exp, sdry, col);
    }
    function t2() {
        const sdry = [['lskdfj', '12345678901'], ['123456789', 'dkfj']];
        const col = 1;
        const exp = 11;
        r(exp, sdry, col);
    }
}
function tst__drsLines() {
    t1();
    t2();
    return;
    function r(exp, drs) {
        const act = cf.drsLines(drs);
        assertIsEq(exp, act);
    }
    function t1() {
        const fny = cf.sSplitSpc('aa bb');
        const dry = [[1233, '12345678901'], ['123456789', 'dkfj'], [new Date(), true, 1]];
        const drs = { dry, fny };
        const exp = `|---------------------------------------------------------|-------------|---|
| aa                                                      | bb          |   |
|---------------------------------------------------------|-------------|---|
| 1233                                                    | 12345678901 |   |
| 123456789                                               | dkfj        |   |
| Sat Apr 14 2018 15:52:21 GMT+0800 (China Standard Time) | true        | 1 |
|---------------------------------------------------------|-------------|---|`.replace(/\n/g, '\r\n');
        r(exp, drs);
    }
    function t2() {
        const fny = cf.sSplitSpc('aa bb');
        const dry = [[1233, '12345678901'], ['123456789', 'dkfj'], [new Date(), true, 1]];
        const drs = { dry, fny };
        const exp = "";
        r(exp, drs);
    }
}
//------------------------------
function tst__isNum() {
    const aFun = () => { };
    const aStr = 'aaa';
    const aNaN = NaN;
    const dte = new Date();
    const aNul = null;
    const aUnd = undefined;
    const aAy = [];
    const aObj = {};
    const aNum = 1;
    t1();
    return;
    function r(exp, val) {
        assertIsEq(exp, cf.isNum(val));
    }
    function t1() {
        const t = (val) => r(true, val);
        const f = (val) => r(false, val);
        f(aFun);
        f(aStr);
        t(aNum);
        t(aNaN);
        f(aUnd);
        f(aAy);
        f(aObj);
    }
}
function tst__isOdd() {
    t1();
    return;
    function r(exp, val) {
        const act = cf.isOdd(val);
        assertIsEq(exp, act);
    }
    function t1() {
        const t = (...vals) => each(v => r(true, v))(vals);
        const f = (...vals) => each(v => r(false, v))(vals);
        t(1, 3, 5, 7, 9, -1, -3);
        f(0, 2, 4, 6, 8, -2);
    }
}
/*
describe('oPrpAy', function () {
    it('should pass', function () {
        let act = x.oPrpAy(x.sSplitSpc('a b c'))([{ a: 1, b: 2, c: 3, d: 4 }, { aa: 11, b: 22, c: 33, d: 44 }, { a: 111, bb: 222, cc: 333, d: 444 }]);
        expect(act).toEqual([[1, 2, 3], [undefined, 22, 33], [111, undefined, undefined]]);
    });
});
describe('swap', function () {
    it('should pass', function () {
        let act;
        act = x.nMinus(1)(6);
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        expect(act).toEqual(5);
        act = x.swap(x.nMinus)(1)(6);
        expect(act).toEqual(-5);
    });
});
fdescribe('isSpc', function () {
    it('should pass', function () {
        expect(x.isSpc(' a')).toBeTruthy();
        expect(x.isSpc('\ta')).toBeTruthy();
        expect(x.isSpc('\ra')).toBeTruthy();
        expect(x.isSpc('\na')).toBeTruthy();
        expect(x.isSpc('a')).toBeFalsy();
    });
});
describe('swap', function () {
    it('should pass', function () {
        let act;
        act = x.oHasPrp('a')({ a: 1 });
        expect(act).toBeTruthy();
        act = x.oHasPrp('b')({ a: 1 });
        expect(act).toBeFalsy();
    });
});


// left
act = left(-1)('abcd');;;;;;;; assert.strictEqual(act, '')
act = left(0)('abcd');;;;;;;;; assert.strictEqual(act, '')
act = left(1)('abcd');;;;;;;;; assert.strictEqual(act, 'a')
act = left(2)('abcd');;;;;;;;; assert.strictEqual(act, 'ab')
act = left(5)('abcd');;;;;;;;; assert.strictEqual(act, 'abcd')
act = left(1.1)('abcd');;;;;;; assert.strictEqual(act, 'a')
act = left(1.9)('abcd');;;;;;; assert.strictEqual(act, 'a')
act = left('a')('abcd');;;;;;; assert.strictEqual(act, '')
act = left(null)('abcd');;;;;; assert.strictEqual(act, '')
act = left(undefined)('abcd'); assert.strictEqual(act, 'abcd')

// rigth
act = right(-1)('abcd');;;;;;;; assert.strictEqual(act, '')
act = right(0)('abcd');;;;;;;;; assert.strictEqual(act, '')
act = right(1)('abcd');;;;;;;;; assert.strictEqual(act, 'd')
act = right(2)('abcd');;;;;;;;; assert.strictEqual(act, 'cd')
act = right(5)('abcd');;;;;;;;; assert.strictEqual(act, 'abcd')
act = right(1.1)('abcd');;;;;;; assert.strictEqual(act, 'd')
act = right(1.9)('abcd');;;;;;; assert.strictEqual(act, 'd')
act = right('a')('abcd');;;;;;; assert.strictEqual(act, '')
act = right(null)('abcd');;;;;; assert.strictEqual(act, '')
act = right(undefined)('abcd'); assert.strictEqual(act, '')

// rigth
act = mid(0)('abcd');;; assert.strictEqual(act, 'abcd')
act = mid(1)('abcd');;; assert.strictEqual(act, 'bcd')
act = mid(0)('abcd');;; assert.strictEqual(act, 'abcd')

// max
act = max(1, 2, 3, 4); assert.equal(act, 4)
act = max();;;;;;;; assert.equal(act, undefined)
act = max(1);;;;;;; assert.equal(act, 1)
act = max('abc');;; assert.equal(act, 'abc')

// min
act = min(1, 2, 3, 4); assert.equal(act, 1)
act = min();;;;;;;; assert.equal(act, undefined)
act = min(1);;;;;;; assert.equal(act, 1)
act = min('abc');;; assert.equal(act, 'abc')

// obj2dr
act = obj2dr('a.x b c')({ a: { x: 1 }, b: 2, c: 3, d: 4 })
assert.deepEqual(act, [1, 2, 3])

// compose
const add3 = compose(add(1), add(2))
act = add3(8)
assert.deepStrictEqual(act, 11)

// pipe
act = pipe(3)(add(1), add(2))
assert.deepStrictEqual(act, 6)

// fst
act = fst(undefined); assert.strictEqual(undefined)
act = fst(null);;;;;; assert.strictEqual(undefined)
act = fst({ a: 1 });;;;; assert.strictEqual(undefined)
act = fst(123);;;;;;; assert.deepStrictEqual(act, undefined)
act = fst('abc');;;;; assert.deepStrictEqual(act, 'a')
act = fst('');;;;;;;; assert.deepStrictEqual(act, undefined)
act = fst([1, 2, 3]); assert.deepStrictEqual(act, 1)
act = fst([]);;;;;;;; assert.deepStrictEqual(act, undefined)
act = fst({ length: 1, a: 1 }); assert.strictEqual(act, undefined)
act = fst({ length: 1, 0: 1 }); assert.strictEqual(act, 1)

// las
act = las(undefined); assert.strictEqual(undefined)
act = las(null);;;;;; assert.strictEqual(undefined)
act = las({ a: 1 });;;;; assert.strictEqual(undefined)
act = las(123);;;;;;; assert.deepStrictEqual(act, undefined)
act = las('abc');;;;; assert.deepStrictEqual(act, 'c')
act = las('');;;;;;;; assert.deepStrictEqual(act, undefined)
act = las([1, 2, 3]); assert.deepStrictEqual(act, 3)
act = las([]);;;;;;;; assert.deepStrictEqual(act, undefined)
act = las({ length: 3, a: 1 }); assert.strictEqual(act, undefined)
act = las({ length: 3, 2: 1 }); assert.strictEqual(act, 1)

// hasPrp
act = hasPrp('a')({ a: 1 }); assert.strictEqual(act, true)
act = hasPrp('a')({ b: 1 }); assert.strictEqual(act, false)
act = hasPrp('a')(null); assert.strictEqual(act, false)

// split
act = split('a')('--a==a');;;;;;;;;;;;; assert.deepStrictEqual(act, ['--', '==', ''])
act = split(/\s+/)('-- ==   ...');;;;;; assert.deepStrictEqual(act, ['--', '==', '...'])
act = splitSpc('aa bb    cc\t dd  ');;; assert.deepStrictEqual(act, ['aa', 'bb', 'cc', 'dd', ''])
act = splitCrLf('aa\r\nbb\ncc\r\ndd '); assert.deepStrictEqual(act, ['aa', 'bb\ncc', 'dd '])

let ffn = 'c:\\aa\\bb\\c.txt'
act = ffnPth(ffn); assert.strictEqual(act, 'c:\\aa\\bb\\')
act = ffnFn(ffn);; assert.strictEqual(act, 'c.txt')
act = ffnExt(ffn); assert.strictEqual(act, '.txt')
act = ffnFnn(ffn); assert.strictEqual(act, 'c')
act = rmvExt(ffn); assert.strictEqual(act, "c:\\aa\\bb\\c")

// tmpPth
// tmpFt
act = tmpFt();
assert.strictEqual(ffnPth(act), tmpPth)
assert.strictEqual(ffnExt(act), '.txt')

// brk
describe('brk', function() {
    it('should pass', function() {
        assert.throws(() => brk('..')('aa.bb'))
        act = brk('.')('sss.bb');;;;;; assert.strictEqual(act, { s1: 'sss', s2: 'bb' })
        act = brk('.')(' sss . bb ');; assert.strictEqual(act, { s1: 'sss', s2: 'bb' })
        act = brk1('.')('sss.bb');;;;; assert.strictEqual(act, { s1: 'sss', s2: 'bb' })
        act = brk1('.')(' sss . bb '); assert.strictEqual(act, { s1: 'sss', s2: 'bb' })
        act = brk1('x')('sss.bb');;;;; assert.strictEqual(act, { s1: 'sss.bb', s2: '' })
        act = brk1('x')(' sss . bb '); assert.strictEqual(act, { s1: ' sss . bb ', s2: '' })
        act = brk2('.')('sss.bb');;;;; assert.strictEqual(act, { s1: 'sss', s2: 'bb' })
        act = brk2('.')(' sss . bb '); assert.strictEqual(act, { s1: 'sss', s2: 'bb' })
        act = brk2('x')('sss.bb');;;;; assert.strictEqual(act, { s2: 'sss.bb', s1: '' })
        act = brk2('x')(' sss . bb '); assert.strictEqual(act, { s2: ' sss . bb ', s1: '' })
    })
})

// tak
act = takBef('.')('aaaa.bb'); assert.strictEqual(act, 'aaaa')
act = takAft('.')('aaaa.bb'); assert.strictEqual(act, 'bb')

// er
assert.throws(() => er('aabbcc')())
assert.throws(() => er('aabbcc')({ a: 1, b: 2 }, 'aaaa'))
// pmFfn2lines

//------------------------------
describe('isFun', function () {
    it('should be pass', function () {
        let t = a => expect(a).toBeTruthy()
        let f = a => expect(a).toBeFalsy()
        $fun = x.isFun
        t($fun(aFun))
        f($fun(aStr))
        f($fun(aNum))
        f($fun(aNaN))
        f($fun(aUnd))
        f($fun(aAy))
        f($fun(aObj))
    })
})
//------------------------------
describe('isOdd', function () {
    it('should pass', function () {
        let act = x.itrWhere(x.isOdd)([1, 2, 3, 4, 5, 7, 9])
        require('assert').deepStrictEqual(act, [1, 3, 5, 7, 9])
    })
})
describe('oPrpAy', function () {
    it('should pass', function () {
        let act = x.oPrpAy(x.sSplitSpc('a b c'))([{ a: 1, b: 2, c: 3, d: 4 }, { aa: 11, b: 22, c: 33, d: 44 }, { a: 111, bb: 222, cc: 333, d: 444 }])
        expect(act).toEqual([[1, 2, 3], [undefined, 22, 33], [111, undefined, undefined]])
    })
})
describe('swap', function () {
    it('should pass', function () {
        let act
        act = x.nMinus(1)(6);;;;;;;;; expect(act).toEqual(5)
        act = x.swap(x.nMinus)(1)(6); expect(act).toEqual(-5)
    })
})
fdescribe('isSpc', function () {
    it('should pass', function () {
        expect(x.isSpc(' a')).toBeTruthy()
        expect(x.isSpc('\ta')).toBeTruthy()
        expect(x.isSpc('\ra')).toBeTruthy()
        expect(x.isSpc('\na')).toBeTruthy()
        expect(x.isSpc('a')).toBeFalsy()
    })
})
describe('swap', function () {
    it('should pass', function () {
        let act
        act = x.oHasPrp('a')({ a: 1 }); expect(act).toBeTruthy()
        act = x.oHasPrp('b')({ a: 1 }); expect(act).toBeFalsy()
    })
})

// hasLen
act = hasLen({ a: 1 });; assert.strictEqual(act, false)
act = hasLen(123);;;; assert.strictEqual(act, false)
act = hasLen('a');;;; assert.strictEqual(act, true)


describe("drs", function () {
    const dry = [[1, 2, 3], [1], [23, 3, 4, 5]];
    var curryfun = require('../../scripts/curryfun.js');
    describe("sdryColCnt", function () {
        it("should be 3 columns", function () {
            expect(x.dryColCnt(dry)).toEqual(4);
        });
    });
    describe("sdryCol", function () {
        it("should pass", function () {
            expect(x.dryCol(0)(dry)).toEqual([1, 1, 23]);
            expect(x.dryCol(1)(dry)).toEqual([2, undefined, 3]);
            expect(x.dryCol(2)(dry)).toEqual([3, undefined, 4]);
            expect(x.dryCol(3)(dry)).toEqual([undefined, undefined, 5]);
            expect(x.dryCol(4)(dry)).toEqual([undefined, undefined, undefined]);
        });
    });
    describe("dryLy", function () {
        const dry = [[1, 2, 3], [1], [23, 3, 4, 5]];
        it("should pass", function () {
            debugger;
            let act = x.dryLy(dry);
            debugger;
            expect(act).toEqual(['', '']);
        });
    });
});

const { pmFfn2lines } = $
// pmFfn2lines always promise {er,lines}
let t2 = ({ er, lines }) => { t(!!er); eq(lines)(undefined) }
if (true) {
    const o = (async () => {
        const ffn = path.join(__dirname, "res", "a.txt")
        const { er, lines } = await pmFfn2lines(ffn)
        eq(er)(null)
        eq(lines)("file-a.txt\r\nline1\r\nline2\r\n")
        end('pmFfn2lines.  read Ok')
    })()
}
if (true) {
    const o = (async () => {
        const ffn = 'dsfsdf'
        const { er, lines } = await pmFfn2lines(ffn)
        t(!!er)
        eq(lines)(undefined)
        end('pmFfn2lines.  file not found')
    })()
}

const { tmpFilFm, pcFfn2lines} = cf
const o = (async () => {
    const ffn = path.join(__dirname, "res", "a.txt")
    let tf = tmpFilFm(ffn) // tst file in tmp directory
    let linesC = await pcFfn2lines(ffn)
    let {er, lines} = linesC() // get the value from cache by calling: linesC()
    eq(er)(null)
    eq(lines)('file-a.txt\r\n\line1\r\nline2\r\n')
    let a = linesC()  // get the {er, lines}
    fs.unlinkSync(tf) // delete the tst file
    let b = linesC()  // get from cache is still availble
    eq(a)(b)          // a & b are actual same instance
    end('pcFfn2lines')
})()

*/
// ================
function tst__drySrtCol() {
    t1();
    function r(exp, dry, colAy) {
        const act = cf.drySrtCol(colAy)(dry);
        assertIsEq(exp, act);
    }
    function t1() {
        const dry = [
            [1, 2, 3, 4],
            [2, 3, 4, 5],
            [2, 1, 6, 7]
        ];
        const exp = [
            [1, 2, 3, 4],
            [2, 1, 6, 7],
            [2, 3, 4, 5],
        ];
        const colAy = [0, 1];
        r(exp, dry, colAy);
    }
}
function tst__Dry() {
    const a = new cf.Dry(cf.nyCmlSdry(cf.srcExpConstNy(src())));
    debugger;
}
function tst__drsOf_exportFunctions() {
    require('webpack');
    require('curryfun');
    const a = cf.drsof_exportFunctions();
    const xx = cf.dry(a.dry);
    xx.setCurCol(1).brw();
    debugger;
    //drsBrw(a)
}
function tst__pthPar() {
    r('aa/bb/', 'aa\\');
    r('aa\\bb\\', 'aa\\');
    return;
    function r(pth, par) {
        const act = cf.pthPar(pth);
        assertIsEq(par, act);
    }
}
function tst__pthSegAy() {
    r('aa/bb/', ['aa', 'bb', '']);
    r('aa\\bb\\', ['aa', 'bb', '']);
    return;
    function r(pth, exp) {
        const act = cf.pthSegAy(pth);
        assertIsEq(exp, act);
    }
}
const src = () => cf.ftLy(cf.ffnFts(__filename));
function tst__srcExpConstNy() { pipe(src())(cf.srcExpConstNy, cf.lyBrwStop); }
function tst__pthFnAyPm() { cf.pthFnAyPm(__dirname).then(cf.lyBrwStop); }
function tst__cmlSpcNm() { pipe(__filename)(cf.ffnFts, cf.ftsExpConstNy, cf.itrMap(cf.cmlSpcNm), cf.lyBrwStop); }
function tst__sNmSet() { pipe(__filename)(cf.ftLines, cf.sNmSet, cf.ssetSrtBrw, cf.stop); }
function tst__cmlNy() { cf.cmlNy('abAySpc'); }
function tst__sLik() { if (!cf.sLik("abc?dd")("abcxdd")) {
    debugger;
} }
function tst__ftsExpConstNyBrw() { pipe(__filename)(cf.ffnFts, cf.ftsExpConstNyBrw, cf.stop); }
function tst__sBox() { cf.sBrw(cf.sBox('johnson xx')); }
function tst__pthBrw() { cf.pthBrw(cf.tmppth); }
function tst__sBrwAtFdrFn() { cf.sBrwAtFdrFn('aa', '1.json')('[1,2]'); }
function tst__isEq() {
    const { isEq } = cf;
    if (isEq(1, '1'))
        debugger;
    if (!isEq(1, 1))
        debugger;
    if (!isEq({ a: 1 }, { a: 1 }))
        debugger;
}
function tst__vidVal() {
    const v = '234234';
    cf.vSav('a')(v);
    const v1 = cf.vidVal('a');
    assertIsEq(v, v1);
}
function tst__sidStr() {
    const s = '234234';
    cf.sSav('a')(s);
    const s1 = cf.vidVal('a');
    assertIsEq(s, s1);
}
function tst__vidpthBrw() { cf.vidpthBrw(); }
function tst__sidpthBrw() { cf.sidpthBrw(); }
function tst__oPrp() {
    t1();
    return;
    function r(exp, prpPth, o) {
        debugger;
        let act = cf.oPrp(prpPth)(o);
        assertIsEq(exp, act);
    }
    function t1() {
        let o = { lin: 'aaa' };
        let prpPth = 'lin';
        let exp = 'aaa';
        r(exp, prpPth, o);
    }
}
function tst__isFTstJs() {
    rTrue('sdlkf/test/tst__skldf.js');
    rFalse('蚱存米');
    return;
    function rTrue(fTstJs) { return r(true, fTstJs); }
    function rFalse(fTstJs) { return r(false, fTstJs); }
    function r(exp, fTstJs) {
        const act = cf.isFTstJs(fTstJs);
        assertIsEq(exp, act);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHN0X19jdXJyeWZ1bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRzdF9fY3VycnlmdW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBaUM7QUFJakMsb0ZBQW9GO0FBQ3BGLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO0FBQy9CLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFBO0FBQzVCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQixXQUFXLEVBQUUsQ0FBQTtJQUNiLFFBQVEsQ0FBQTtJQUNSLFFBQVEsRUFBRSxDQUFBO0lBQ1YsUUFBUSxFQUFFLENBQUE7SUFDVixVQUFVLEVBQUUsQ0FBQTtJQUNaLGFBQWEsRUFBRSxDQUFBO0lBQ2YsYUFBYSxFQUFFLENBQUE7SUFDZiwwQkFBMEIsRUFBRSxDQUFBO0lBQzVCLHFCQUFxQixFQUFFLENBQUE7SUFDdkIsU0FBUyxFQUFFLENBQUE7SUFDWCxhQUFhLEVBQUUsQ0FBQTtJQUNmLFVBQVUsRUFBRSxDQUFBO0lBQ1osVUFBVSxFQUFFLENBQUE7SUFDWixTQUFTLEVBQUUsQ0FBQTtJQUNYLFdBQVcsRUFBRSxDQUFBO0lBQ2IsY0FBYyxFQUFFLENBQUE7SUFDaEIsU0FBUyxFQUFFLENBQUE7SUFDWCxnQkFBZ0IsRUFBRSxDQUFBO0lBQ2xCLFNBQVMsRUFBRSxDQUFBO0lBQ1gsV0FBVyxFQUFFLENBQUE7SUFDYixlQUFlLEVBQUUsQ0FBQTtJQUNqQixpQkFBaUIsRUFBRSxDQUFBO0lBQ25CLFdBQVcsRUFBRSxDQUFBO0lBQ2IsY0FBYyxFQUFFLENBQUE7SUFDaEIsa0JBQWtCLEVBQUUsQ0FBQTtJQUNwQixXQUFXLEVBQUUsQ0FBQTtJQUNiLGNBQWMsRUFBRSxDQUFBO0FBQ3BCLENBQUM7QUFDRDtJQUNJLEVBQUUsRUFBRSxDQUFDO0lBQ0wsTUFBTSxDQUFDO0lBQ1AsV0FBVyxHQUFRLEVBQUUsSUFBVTtRQUMzQixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUNEO1FBQ0ksTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2YsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDbkIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNoQixDQUFDO0FBQ0wsQ0FBQztBQUNEO0lBQ0ksTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ2pDLEVBQUUsRUFBRSxDQUFBO0lBQ0osV0FBVyxHQUFTLEVBQUUsR0FBTSxFQUFFLENBQUk7UUFDOUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3hCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUNEO1FBQ0ksSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFBO1FBQ1osR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDeEYsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUFBLENBQUM7UUFBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUN4RixHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3hGLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUN4RixHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDeEYsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUN4RixHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3hGLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUN4RixHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQUEsQ0FBQztRQUFBLENBQUM7UUFBQSxDQUFDO1FBQUEsQ0FBQztRQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDeEYsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsRUFB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QyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsUUFBUSxDQUFBO0lBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1osUUFBUSxDQUFBO0lBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixRQUFRLENBQUE7QUFDaEIsQ0FBQztBQUNEO0lBQ0ksTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFBO0lBQ2xCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDZixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3pCLFVBQVUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDckIsQ0FBQztBQUNEO0lBQ0ksTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFBO0lBQ2xCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDZixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3pCLFVBQVUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDckIsQ0FBQztBQUNELDRCQUE0QixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUEsQ0FBQyxDQUFDO0FBQzVDLDRCQUE0QixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUEsQ0FBQyxDQUFDO0FBQzVDO0lBQ0ksRUFBRSxFQUFFLENBQUE7SUFDSixNQUFNLENBQUE7SUFDTixXQUFXLEdBQUcsRUFBRSxNQUFTLEVBQUUsQ0FBSTtRQUMzQixRQUFRLENBQUE7UUFDUixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzVCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUNEO1FBQ0ksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUE7UUFDdEIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQTtRQUNmLENBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7QUFDTCxDQUFDO0FBQ0Q7SUFDSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtJQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDYixNQUFNLENBQUE7SUFDTixlQUFlLE1BQWMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDekQsZ0JBQWdCLE1BQWMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDM0QsV0FBVyxHQUFNLEVBQUUsTUFBYztRQUM3QixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQy9CLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDeEIsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZiBmcm9tICcuLi9jdXJyeWZ1bidcclxuaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gJ2Fzc2VydCdcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcydcclxuLy9pbXBvcnQgKiBhcyBzY2FuUGdtIGZyb20gJy4uL3NjYW5QZ20nOyBzY2FuUGdtLmZUc3RKc191cGRNYWluVHN0SWZTdG10KF9fZmlsZW5hbWUpXHJcbmNvbnN0IHsgYXNzZXJ0SXNFcSwgZWFjaCB9ID0gY2ZcclxuY29uc3QgeyBwaXBlLCBjb21wb3NlIH0gPSBjZlxyXG5pZiAobW9kdWxlLmlkID09PSAnLicpIHtcclxuICAgIHRzdF9fcHRoUGFyKClcclxuICAgIGRlYnVnZ2VyXHJcbiAgICB0c3RfX0RyeSgpXHJcbiAgICB0c3RfX2JyaygpXHJcbiAgICB0c3RfX2NtbE55KClcclxuICAgIHRzdF9fY21sU3BjTm0oKVxyXG4gICAgdHN0X19kcnNMaW5lcygpXHJcbiAgICB0c3RfX2Ryc09mX2V4cG9ydEZ1bmN0aW9ucygpXHJcbiAgICB0c3RfX2Z0c0V4cENvbnN0TnlCcncoKVxyXG4gICAgdHN0X19pc0VxKClcclxuICAgIHRzdF9faXNGVHN0SnMoKVxyXG4gICAgdHN0X19pc051bSgpXHJcbiAgICB0c3RfX2lzT2RkKClcclxuICAgIHRzdF9fb1BycCgpXHJcbiAgICB0c3RfX3B0aEJydygpXHJcbiAgICB0c3RfX3B0aEZuQXlQbSgpXHJcbiAgICB0c3RfX3NCb3goKVxyXG4gICAgdHN0X19zQnJ3QXRGZHJGbigpXHJcbiAgICB0c3RfX3NMaWsoKVxyXG4gICAgdHN0X19zTm1TZXQoKVxyXG4gICAgdHN0X19zZHJ5Q29sV2R0KClcclxuICAgIHRzdF9fc2RyeUNvbFdkdEF5KClcclxuICAgIHRzdF9fc2lkU3RyKClcclxuICAgIHRzdF9fc2lkcHRoQnJ3KClcclxuICAgIHRzdF9fc3JjRXhwQ29uc3ROeSgpXHJcbiAgICB0c3RfX3ZpZFZhbCgpXHJcbiAgICB0c3RfX3ZpZHB0aEJydygpXHJcbn1cclxuZnVuY3Rpb24gdHN0X19zZHJ5Q29sV2R0QXkoKSB7XHJcbiAgICB0MSgpO1xyXG4gICAgcmV0dXJuO1xyXG4gICAgZnVuY3Rpb24gcihleHA6IG5bXSwgc2RyeTogc2RyeSkge1xyXG4gICAgICAgIGNvbnN0IGFjdCA9IGNmLnNkcnlDb2xXZHRBeShzZHJ5KVxyXG4gICAgICAgIGFzc2VydElzRXEoZXhwLCBhY3QpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0MSgpIHtcclxuICAgICAgICBjb25zdCBzZHJ5ID0gW11cclxuICAgICAgICBjb25zdCBleHAgPSBbOSwgMTFdXHJcbiAgICAgICAgcihleHAsIHNkcnkpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdHN0X19icmsoKSB7XHJcbiAgICBjb25zdCB7IHNCcmssIHNCcmsxLCBzQnJrMiB9ID0gY2ZcclxuICAgIHQxKClcclxuICAgIGZ1bmN0aW9uIHIoZXhwOiBzMXMyLCBzZXA6IHMsIHM6IHMpIHtcclxuICAgICAgICBjb25zdCBhY3QgPSBzQnJrKHNlcCkocylcclxuICAgICAgICBhc3NlcnRJc0VxKGV4cCwgYWN0KVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdDEoKSB7XHJcbiAgICAgICAgbGV0IGFjdCwgZXhwXHJcbiAgICAgICAgYWN0ID0gc0JyaygnLicpKCdzc3MuYmInKTs7Ozs7OyBleHAgPSB7IHMxOiAnc3NzJywgczI6ICdiYicgfTs7Ozs7OyBhc3NlcnRJc0VxKGV4cCwgYWN0KVxyXG4gICAgICAgIGFjdCA9IHNCcmsoJy4nKSgnIHNzcyAuIGJiICcpOzsgZXhwID0geyBzMTogJ3NzcycsIHMyOiAnYmInIH07Ozs7OzsgYXNzZXJ0SXNFcShleHAsIGFjdClcclxuICAgICAgICBhY3QgPSBzQnJrMSgnLicpKCdzc3MuYmInKTs7Ozs7IGV4cCA9IHsgczE6ICdzc3MnLCBzMjogJ2JiJyB9Ozs7Ozs7IGFzc2VydElzRXEoZXhwLCBhY3QpXHJcbiAgICAgICAgYWN0ID0gc0JyazEoJy4nKSgnIHNzcyAuIGJiICcpOyBleHAgPSB7IHMxOiAnc3NzJywgczI6ICdiYicgfTs7Ozs7OyBhc3NlcnRJc0VxKGV4cCwgYWN0KVxyXG4gICAgICAgIGFjdCA9IHNCcmsxKCd4JykoJ3Nzcy5iYicpOzs7OzsgZXhwID0geyBzMTogJ3Nzcy5iYicsIHMyOiAnJyB9Ozs7OzsgYXNzZXJ0SXNFcShleHAsIGFjdClcclxuICAgICAgICBhY3QgPSBzQnJrMSgneCcpKCcgc3NzIC4gYmIgJyk7IGV4cCA9IHsgczE6ICcgc3NzIC4gYmIgJywgczI6ICcnIH07IGFzc2VydElzRXEoZXhwLCBhY3QpXHJcbiAgICAgICAgYWN0ID0gc0JyazIoJy4nKSgnc3NzLmJiJyk7Ozs7OyBleHAgPSB7IHMxOiAnc3NzJywgczI6ICdiYicgfTs7Ozs7OyBhc3NlcnRJc0VxKGV4cCwgYWN0KVxyXG4gICAgICAgIGFjdCA9IHNCcmsyKCcuJykoJyBzc3MgLiBiYiAnKTsgZXhwID0geyBzMTogJ3NzcycsIHMyOiAnYmInIH07Ozs7OzsgYXNzZXJ0SXNFcShleHAsIGFjdClcclxuICAgICAgICBhY3QgPSBzQnJrMigneCcpKCdzc3MuYmInKTs7Ozs7IGV4cCA9IHsgczI6ICdzc3MuYmInLCBzMTogJycgfTs7Ozs7IGFzc2VydElzRXEoZXhwLCBhY3QpXHJcbiAgICAgICAgYWN0ID0gc0JyazIoJ3gnKSgnIHNzcyAuIGJiICcpOyBleHAgPSB7IHMyOiAnIHNzcyAuIGJiICcsIHMxOiAnJyB9OyBhc3NlcnRJc0VxKGV4cCwgYWN0KVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHRzdF9fc2RyeUNvbFdkdCgpIHtcclxuICAgIHQxKClcclxuICAgIHQyKClcclxuICAgIHJldHVyblxyXG4gICAgZnVuY3Rpb24gcihleHA6IG4sIHNkcnk6IHNkcnksIGNvbDogbikge1xyXG4gICAgICAgIGNvbnN0IGFjdCA9IGNmLnNkcnlDb2xXZHQoY29sKShzZHJ5KVxyXG4gICAgICAgIGFzc2VydElzRXEoZXhwLCBhY3QpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0MSgpIHtcclxuICAgICAgICBjb25zdCBzZHJ5ID0gW1snbHNrZGZqJywgJzEyMzQ1Njc4OTAxJ10sIFsnMTIzNDU2Nzg5JywgJ2RrZmonXV1cclxuICAgICAgICBjb25zdCBjb2wgPSAwXHJcbiAgICAgICAgY29uc3QgZXhwID0gOVxyXG4gICAgICAgIHIoZXhwLCBzZHJ5LCBjb2wpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0MigpIHtcclxuICAgICAgICBjb25zdCBzZHJ5ID0gW1snbHNrZGZqJywgJzEyMzQ1Njc4OTAxJ10sIFsnMTIzNDU2Nzg5JywgJ2RrZmonXV1cclxuICAgICAgICBjb25zdCBjb2wgPSAxXHJcbiAgICAgICAgY29uc3QgZXhwID0gMTFcclxuICAgICAgICByKGV4cCwgc2RyeSwgY29sKVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHRzdF9fZHJzTGluZXMoKSB7XHJcbiAgICB0MSgpXHJcbiAgICB0MigpXHJcbiAgICByZXR1cm5cclxuICAgIGZ1bmN0aW9uIHIoZXhwOiBsaW5lcywgZHJzOiBkcnMpIHtcclxuICAgICAgICBjb25zdCBhY3QgPSBjZi5kcnNMaW5lcyhkcnMpXHJcbiAgICAgICAgYXNzZXJ0SXNFcShleHAsIGFjdClcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHQxKCkge1xyXG4gICAgICAgIGNvbnN0IGZueSA9IGNmLnNTcGxpdFNwYygnYWEgYmInKVxyXG4gICAgICAgIGNvbnN0IGRyeSA9IFtbMTIzMywgJzEyMzQ1Njc4OTAxJ10sIFsnMTIzNDU2Nzg5JywgJ2RrZmonXSwgW25ldyBEYXRlKCksIHRydWUsIDFdXVxyXG4gICAgICAgIGNvbnN0IGRycyA9IHsgZHJ5LCBmbnkgfVxyXG4gICAgICAgIGNvbnN0IGV4cCA9IGB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS18LS0tfFxyXG58IGFhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBiYiAgICAgICAgICB8ICAgfFxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS18LS0tfFxyXG58IDEyMzMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAxMjM0NTY3ODkwMSB8ICAgfFxyXG58IDEyMzQ1Njc4OSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBka2ZqICAgICAgICB8ICAgfFxyXG58IFNhdCBBcHIgMTQgMjAxOCAxNTo1MjoyMSBHTVQrMDgwMCAoQ2hpbmEgU3RhbmRhcmQgVGltZSkgfCB0cnVlICAgICAgICB8IDEgfFxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS18LS0tfGAucmVwbGFjZSgvXFxuL2csICdcXHJcXG4nKVxyXG4gICAgICAgIHIoZXhwLCBkcnMpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0MigpIHtcclxuICAgICAgICBjb25zdCBmbnkgPSBjZi5zU3BsaXRTcGMoJ2FhIGJiJyk7XHJcbiAgICAgICAgY29uc3QgZHJ5ID0gW1sxMjMzLCAnMTIzNDU2Nzg5MDEnXSwgWycxMjM0NTY3ODknLCAnZGtmaiddLCBbbmV3IERhdGUoKSwgdHJ1ZSwgMV1dO1xyXG4gICAgICAgIGNvbnN0IGRycyA9IHsgZHJ5LCBmbnkgfTtcclxuICAgICAgICBjb25zdCBleHAgPSBcIlwiO1xyXG4gICAgICAgIHIoZXhwLCBkcnMpO1xyXG4gICAgfVxyXG59XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIHRzdF9faXNOdW0oKSB7XHJcbiAgICBjb25zdCBhRnVuID0gKCkgPT4geyB9O1xyXG4gICAgY29uc3QgYVN0ciA9ICdhYWEnO1xyXG4gICAgY29uc3QgYU5hTiA9IE5hTjtcclxuICAgIGNvbnN0IGR0ZSA9IG5ldyBEYXRlKClcclxuICAgIGNvbnN0IGFOdWwgPSBudWxsXHJcbiAgICBjb25zdCBhVW5kID0gdW5kZWZpbmVkXHJcbiAgICBjb25zdCBhQXkgPSBbXVxyXG4gICAgY29uc3QgYU9iaiA9IHt9XHJcbiAgICBjb25zdCBhTnVtID0gMVxyXG4gICAgdDEoKVxyXG4gICAgcmV0dXJuXHJcbiAgICBmdW5jdGlvbiByKGV4cCwgdmFsKSB7XHJcbiAgICAgICAgYXNzZXJ0SXNFcShleHAsIGNmLmlzTnVtKHZhbCkpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0MSgpIHtcclxuICAgICAgICBjb25zdCB0ID0gKHZhbCkgPT4gcih0cnVlLCB2YWwpXHJcbiAgICAgICAgY29uc3QgZiA9ICh2YWwpID0+IHIoZmFsc2UsIHZhbClcclxuICAgICAgICBmKGFGdW4pO1xyXG4gICAgICAgIGYoYVN0cik7XHJcbiAgICAgICAgdChhTnVtKTtcclxuICAgICAgICB0KGFOYU4pO1xyXG4gICAgICAgIGYoYVVuZCk7XHJcbiAgICAgICAgZihhQXkpO1xyXG4gICAgICAgIGYoYU9iaik7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdHN0X19pc09kZCgpIHtcclxuICAgIHQxKClcclxuICAgIHJldHVyblxyXG4gICAgZnVuY3Rpb24gcihleHA6IGIsIHZhbCkge1xyXG4gICAgICAgIGNvbnN0IGFjdCA9IGNmLmlzT2RkKHZhbClcclxuICAgICAgICBhc3NlcnRJc0VxKGV4cCwgYWN0KVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdDEoKSB7XHJcbiAgICAgICAgY29uc3QgdCA9ICguLi52YWxzKSA9PiBlYWNoKHYgPT4gcih0cnVlLCB2KSkodmFscylcclxuICAgICAgICBjb25zdCBmID0gKC4uLnZhbHMpID0+IGVhY2godiA9PiByKGZhbHNlLCB2KSkodmFscylcclxuICAgICAgICB0KDEsIDMsIDUsIDcsIDksIC0xLCAtMylcclxuICAgICAgICBmKDAsIDIsIDQsIDYsIDgsIC0yKVxyXG4gICAgfVxyXG59XHJcbi8qXHJcbmRlc2NyaWJlKCdvUHJwQXknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpdCgnc2hvdWxkIHBhc3MnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGFjdCA9IHgub1BycEF5KHguc1NwbGl0U3BjKCdhIGIgYycpKShbeyBhOiAxLCBiOiAyLCBjOiAzLCBkOiA0IH0sIHsgYWE6IDExLCBiOiAyMiwgYzogMzMsIGQ6IDQ0IH0sIHsgYTogMTExLCBiYjogMjIyLCBjYzogMzMzLCBkOiA0NDQgfV0pO1xyXG4gICAgICAgIGV4cGVjdChhY3QpLnRvRXF1YWwoW1sxLCAyLCAzXSwgW3VuZGVmaW5lZCwgMjIsIDMzXSwgWzExMSwgdW5kZWZpbmVkLCB1bmRlZmluZWRdXSk7XHJcbiAgICB9KTtcclxufSk7XHJcbmRlc2NyaWJlKCdzd2FwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCBwYXNzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBhY3Q7XHJcbiAgICAgICAgYWN0ID0geC5uTWludXMoMSkoNik7XHJcbiAgICAgICAgO1xyXG4gICAgICAgIDtcclxuICAgICAgICA7XHJcbiAgICAgICAgO1xyXG4gICAgICAgIDtcclxuICAgICAgICA7XHJcbiAgICAgICAgO1xyXG4gICAgICAgIDtcclxuICAgICAgICBleHBlY3QoYWN0KS50b0VxdWFsKDUpO1xyXG4gICAgICAgIGFjdCA9IHguc3dhcCh4Lm5NaW51cykoMSkoNik7XHJcbiAgICAgICAgZXhwZWN0KGFjdCkudG9FcXVhbCgtNSk7XHJcbiAgICB9KTtcclxufSk7XHJcbmZkZXNjcmliZSgnaXNTcGMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpdCgnc2hvdWxkIHBhc3MnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZXhwZWN0KHguaXNTcGMoJyBhJykpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICBleHBlY3QoeC5pc1NwYygnXFx0YScpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgZXhwZWN0KHguaXNTcGMoJ1xccmEnKSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIGV4cGVjdCh4LmlzU3BjKCdcXG5hJykpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICBleHBlY3QoeC5pc1NwYygnYScpKS50b0JlRmFsc3koKTtcclxuICAgIH0pO1xyXG59KTtcclxuZGVzY3JpYmUoJ3N3YXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpdCgnc2hvdWxkIHBhc3MnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGFjdDtcclxuICAgICAgICBhY3QgPSB4Lm9IYXNQcnAoJ2EnKSh7IGE6IDEgfSk7XHJcbiAgICAgICAgZXhwZWN0KGFjdCkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIGFjdCA9IHgub0hhc1BycCgnYicpKHsgYTogMSB9KTtcclxuICAgICAgICBleHBlY3QoYWN0KS50b0JlRmFsc3koKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG4vLyBsZWZ0XHJcbmFjdCA9IGxlZnQoLTEpKCdhYmNkJyk7Ozs7Ozs7OyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCAnJylcclxuYWN0ID0gbGVmdCgwKSgnYWJjZCcpOzs7Ozs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICcnKVxyXG5hY3QgPSBsZWZ0KDEpKCdhYmNkJyk7Ozs7Ozs7OzsgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdCwgJ2EnKVxyXG5hY3QgPSBsZWZ0KDIpKCdhYmNkJyk7Ozs7Ozs7OzsgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdCwgJ2FiJylcclxuYWN0ID0gbGVmdCg1KSgnYWJjZCcpOzs7Ozs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICdhYmNkJylcclxuYWN0ID0gbGVmdCgxLjEpKCdhYmNkJyk7Ozs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICdhJylcclxuYWN0ID0gbGVmdCgxLjkpKCdhYmNkJyk7Ozs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICdhJylcclxuYWN0ID0gbGVmdCgnYScpKCdhYmNkJyk7Ozs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICcnKVxyXG5hY3QgPSBsZWZ0KG51bGwpKCdhYmNkJyk7Ozs7OzsgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdCwgJycpXHJcbmFjdCA9IGxlZnQodW5kZWZpbmVkKSgnYWJjZCcpOyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCAnYWJjZCcpXHJcblxyXG4vLyByaWd0aFxyXG5hY3QgPSByaWdodCgtMSkoJ2FiY2QnKTs7Ozs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICcnKVxyXG5hY3QgPSByaWdodCgwKSgnYWJjZCcpOzs7Ozs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICcnKVxyXG5hY3QgPSByaWdodCgxKSgnYWJjZCcpOzs7Ozs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICdkJylcclxuYWN0ID0gcmlnaHQoMikoJ2FiY2QnKTs7Ozs7Ozs7OyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCAnY2QnKVxyXG5hY3QgPSByaWdodCg1KSgnYWJjZCcpOzs7Ozs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICdhYmNkJylcclxuYWN0ID0gcmlnaHQoMS4xKSgnYWJjZCcpOzs7Ozs7OyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCAnZCcpXHJcbmFjdCA9IHJpZ2h0KDEuOSkoJ2FiY2QnKTs7Ozs7OzsgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdCwgJ2QnKVxyXG5hY3QgPSByaWdodCgnYScpKCdhYmNkJyk7Ozs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICcnKVxyXG5hY3QgPSByaWdodChudWxsKSgnYWJjZCcpOzs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICcnKVxyXG5hY3QgPSByaWdodCh1bmRlZmluZWQpKCdhYmNkJyk7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICcnKVxyXG5cclxuLy8gcmlndGhcclxuYWN0ID0gbWlkKDApKCdhYmNkJyk7OzsgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdCwgJ2FiY2QnKVxyXG5hY3QgPSBtaWQoMSkoJ2FiY2QnKTs7OyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCAnYmNkJylcclxuYWN0ID0gbWlkKDApKCdhYmNkJyk7OzsgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdCwgJ2FiY2QnKVxyXG5cclxuLy8gbWF4XHJcbmFjdCA9IG1heCgxLCAyLCAzLCA0KTsgYXNzZXJ0LmVxdWFsKGFjdCwgNClcclxuYWN0ID0gbWF4KCk7Ozs7Ozs7OyBhc3NlcnQuZXF1YWwoYWN0LCB1bmRlZmluZWQpXHJcbmFjdCA9IG1heCgxKTs7Ozs7OzsgYXNzZXJ0LmVxdWFsKGFjdCwgMSlcclxuYWN0ID0gbWF4KCdhYmMnKTs7OyBhc3NlcnQuZXF1YWwoYWN0LCAnYWJjJylcclxuXHJcbi8vIG1pblxyXG5hY3QgPSBtaW4oMSwgMiwgMywgNCk7IGFzc2VydC5lcXVhbChhY3QsIDEpXHJcbmFjdCA9IG1pbigpOzs7Ozs7OzsgYXNzZXJ0LmVxdWFsKGFjdCwgdW5kZWZpbmVkKVxyXG5hY3QgPSBtaW4oMSk7Ozs7Ozs7IGFzc2VydC5lcXVhbChhY3QsIDEpXHJcbmFjdCA9IG1pbignYWJjJyk7OzsgYXNzZXJ0LmVxdWFsKGFjdCwgJ2FiYycpXHJcblxyXG4vLyBvYmoyZHJcclxuYWN0ID0gb2JqMmRyKCdhLnggYiBjJykoeyBhOiB7IHg6IDEgfSwgYjogMiwgYzogMywgZDogNCB9KVxyXG5hc3NlcnQuZGVlcEVxdWFsKGFjdCwgWzEsIDIsIDNdKVxyXG5cclxuLy8gY29tcG9zZVxyXG5jb25zdCBhZGQzID0gY29tcG9zZShhZGQoMSksIGFkZCgyKSlcclxuYWN0ID0gYWRkMyg4KVxyXG5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdCwgMTEpXHJcblxyXG4vLyBwaXBlXHJcbmFjdCA9IHBpcGUoMykoYWRkKDEpLCBhZGQoMikpXHJcbmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0LCA2KVxyXG5cclxuLy8gZnN0XHJcbmFjdCA9IGZzdCh1bmRlZmluZWQpOyBhc3NlcnQuc3RyaWN0RXF1YWwodW5kZWZpbmVkKVxyXG5hY3QgPSBmc3QobnVsbCk7Ozs7OzsgYXNzZXJ0LnN0cmljdEVxdWFsKHVuZGVmaW5lZClcclxuYWN0ID0gZnN0KHsgYTogMSB9KTs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbCh1bmRlZmluZWQpXHJcbmFjdCA9IGZzdCgxMjMpOzs7Ozs7OyBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdCwgdW5kZWZpbmVkKVxyXG5hY3QgPSBmc3QoJ2FiYycpOzs7OzsgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3QsICdhJylcclxuYWN0ID0gZnN0KCcnKTs7Ozs7Ozs7IGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0LCB1bmRlZmluZWQpXHJcbmFjdCA9IGZzdChbMSwgMiwgM10pOyBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdCwgMSlcclxuYWN0ID0gZnN0KFtdKTs7Ozs7Ozs7IGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0LCB1bmRlZmluZWQpXHJcbmFjdCA9IGZzdCh7IGxlbmd0aDogMSwgYTogMSB9KTsgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdCwgdW5kZWZpbmVkKVxyXG5hY3QgPSBmc3QoeyBsZW5ndGg6IDEsIDA6IDEgfSk7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsIDEpXHJcblxyXG4vLyBsYXNcclxuYWN0ID0gbGFzKHVuZGVmaW5lZCk7IGFzc2VydC5zdHJpY3RFcXVhbCh1bmRlZmluZWQpXHJcbmFjdCA9IGxhcyhudWxsKTs7Ozs7OyBhc3NlcnQuc3RyaWN0RXF1YWwodW5kZWZpbmVkKVxyXG5hY3QgPSBsYXMoeyBhOiAxIH0pOzs7OzsgYXNzZXJ0LnN0cmljdEVxdWFsKHVuZGVmaW5lZClcclxuYWN0ID0gbGFzKDEyMyk7Ozs7Ozs7IGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0LCB1bmRlZmluZWQpXHJcbmFjdCA9IGxhcygnYWJjJyk7Ozs7OyBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdCwgJ2MnKVxyXG5hY3QgPSBsYXMoJycpOzs7Ozs7OzsgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3QsIHVuZGVmaW5lZClcclxuYWN0ID0gbGFzKFsxLCAyLCAzXSk7IGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0LCAzKVxyXG5hY3QgPSBsYXMoW10pOzs7Ozs7OzsgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3QsIHVuZGVmaW5lZClcclxuYWN0ID0gbGFzKHsgbGVuZ3RoOiAzLCBhOiAxIH0pOyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCB1bmRlZmluZWQpXHJcbmFjdCA9IGxhcyh7IGxlbmd0aDogMywgMjogMSB9KTsgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdCwgMSlcclxuXHJcbi8vIGhhc1BycFxyXG5hY3QgPSBoYXNQcnAoJ2EnKSh7IGE6IDEgfSk7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsIHRydWUpXHJcbmFjdCA9IGhhc1BycCgnYScpKHsgYjogMSB9KTsgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdCwgZmFsc2UpXHJcbmFjdCA9IGhhc1BycCgnYScpKG51bGwpOyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCBmYWxzZSlcclxuXHJcbi8vIHNwbGl0XHJcbmFjdCA9IHNwbGl0KCdhJykoJy0tYT09YScpOzs7Ozs7Ozs7Ozs7OyBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdCwgWyctLScsICc9PScsICcnXSlcclxuYWN0ID0gc3BsaXQoL1xccysvKSgnLS0gPT0gICAuLi4nKTs7Ozs7OyBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdCwgWyctLScsICc9PScsICcuLi4nXSlcclxuYWN0ID0gc3BsaXRTcGMoJ2FhIGJiICAgIGNjXFx0IGRkICAnKTs7OyBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdCwgWydhYScsICdiYicsICdjYycsICdkZCcsICcnXSlcclxuYWN0ID0gc3BsaXRDckxmKCdhYVxcclxcbmJiXFxuY2NcXHJcXG5kZCAnKTsgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3QsIFsnYWEnLCAnYmJcXG5jYycsICdkZCAnXSlcclxuXHJcbmxldCBmZm4gPSAnYzpcXFxcYWFcXFxcYmJcXFxcYy50eHQnXHJcbmFjdCA9IGZmblB0aChmZm4pOyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCAnYzpcXFxcYWFcXFxcYmJcXFxcJylcclxuYWN0ID0gZmZuRm4oZmZuKTs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICdjLnR4dCcpXHJcbmFjdCA9IGZmbkV4dChmZm4pOyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCAnLnR4dCcpXHJcbmFjdCA9IGZmbkZubihmZm4pOyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCAnYycpXHJcbmFjdCA9IHJtdkV4dChmZm4pOyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCBcImM6XFxcXGFhXFxcXGJiXFxcXGNcIilcclxuXHJcbi8vIHRtcFB0aFxyXG4vLyB0bXBGdFxyXG5hY3QgPSB0bXBGdCgpO1xyXG5hc3NlcnQuc3RyaWN0RXF1YWwoZmZuUHRoKGFjdCksIHRtcFB0aClcclxuYXNzZXJ0LnN0cmljdEVxdWFsKGZmbkV4dChhY3QpLCAnLnR4dCcpXHJcblxyXG4vLyBicmtcclxuZGVzY3JpYmUoJ2JyaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgaXQoJ3Nob3VsZCBwYXNzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiBicmsoJy4uJykoJ2FhLmJiJykpXHJcbiAgICAgICAgYWN0ID0gYnJrKCcuJykoJ3Nzcy5iYicpOzs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsIHsgczE6ICdzc3MnLCBzMjogJ2JiJyB9KVxyXG4gICAgICAgIGFjdCA9IGJyaygnLicpKCcgc3NzIC4gYmIgJyk7OyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCB7IHMxOiAnc3NzJywgczI6ICdiYicgfSlcclxuICAgICAgICBhY3QgPSBicmsxKCcuJykoJ3Nzcy5iYicpOzs7OzsgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdCwgeyBzMTogJ3NzcycsIHMyOiAnYmInIH0pXHJcbiAgICAgICAgYWN0ID0gYnJrMSgnLicpKCcgc3NzIC4gYmIgJyk7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsIHsgczE6ICdzc3MnLCBzMjogJ2JiJyB9KVxyXG4gICAgICAgIGFjdCA9IGJyazEoJ3gnKSgnc3NzLmJiJyk7Ozs7OyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCB7IHMxOiAnc3NzLmJiJywgczI6ICcnIH0pXHJcbiAgICAgICAgYWN0ID0gYnJrMSgneCcpKCcgc3NzIC4gYmIgJyk7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsIHsgczE6ICcgc3NzIC4gYmIgJywgczI6ICcnIH0pXHJcbiAgICAgICAgYWN0ID0gYnJrMignLicpKCdzc3MuYmInKTs7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsIHsgczE6ICdzc3MnLCBzMjogJ2JiJyB9KVxyXG4gICAgICAgIGFjdCA9IGJyazIoJy4nKSgnIHNzcyAuIGJiICcpOyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCB7IHMxOiAnc3NzJywgczI6ICdiYicgfSlcclxuICAgICAgICBhY3QgPSBicmsyKCd4JykoJ3Nzcy5iYicpOzs7OzsgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdCwgeyBzMjogJ3Nzcy5iYicsIHMxOiAnJyB9KVxyXG4gICAgICAgIGFjdCA9IGJyazIoJ3gnKSgnIHNzcyAuIGJiICcpOyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCB7IHMyOiAnIHNzcyAuIGJiICcsIHMxOiAnJyB9KVxyXG4gICAgfSlcclxufSlcclxuXHJcbi8vIHRha1xyXG5hY3QgPSB0YWtCZWYoJy4nKSgnYWFhYS5iYicpOyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCAnYWFhYScpXHJcbmFjdCA9IHRha0FmdCgnLicpKCdhYWFhLmJiJyk7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsICdiYicpXHJcblxyXG4vLyBlclxyXG5hc3NlcnQudGhyb3dzKCgpID0+IGVyKCdhYWJiY2MnKSgpKVxyXG5hc3NlcnQudGhyb3dzKCgpID0+IGVyKCdhYWJiY2MnKSh7IGE6IDEsIGI6IDIgfSwgJ2FhYWEnKSlcclxuLy8gcG1GZm4ybGluZXNcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmRlc2NyaWJlKCdpc0Z1bicsIGZ1bmN0aW9uICgpIHtcclxuICAgIGl0KCdzaG91bGQgYmUgcGFzcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgdCA9IGEgPT4gZXhwZWN0KGEpLnRvQmVUcnV0aHkoKVxyXG4gICAgICAgIGxldCBmID0gYSA9PiBleHBlY3QoYSkudG9CZUZhbHN5KClcclxuICAgICAgICAkZnVuID0geC5pc0Z1blxyXG4gICAgICAgIHQoJGZ1bihhRnVuKSlcclxuICAgICAgICBmKCRmdW4oYVN0cikpXHJcbiAgICAgICAgZigkZnVuKGFOdW0pKVxyXG4gICAgICAgIGYoJGZ1bihhTmFOKSlcclxuICAgICAgICBmKCRmdW4oYVVuZCkpXHJcbiAgICAgICAgZigkZnVuKGFBeSkpXHJcbiAgICAgICAgZigkZnVuKGFPYmopKVxyXG4gICAgfSlcclxufSlcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZGVzY3JpYmUoJ2lzT2RkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCBwYXNzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBhY3QgPSB4Lml0cldoZXJlKHguaXNPZGQpKFsxLCAyLCAzLCA0LCA1LCA3LCA5XSlcclxuICAgICAgICByZXF1aXJlKCdhc3NlcnQnKS5kZWVwU3RyaWN0RXF1YWwoYWN0LCBbMSwgMywgNSwgNywgOV0pXHJcbiAgICB9KVxyXG59KVxyXG5kZXNjcmliZSgnb1BycEF5JywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCBwYXNzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBhY3QgPSB4Lm9QcnBBeSh4LnNTcGxpdFNwYygnYSBiIGMnKSkoW3sgYTogMSwgYjogMiwgYzogMywgZDogNCB9LCB7IGFhOiAxMSwgYjogMjIsIGM6IDMzLCBkOiA0NCB9LCB7IGE6IDExMSwgYmI6IDIyMiwgY2M6IDMzMywgZDogNDQ0IH1dKVxyXG4gICAgICAgIGV4cGVjdChhY3QpLnRvRXF1YWwoW1sxLCAyLCAzXSwgW3VuZGVmaW5lZCwgMjIsIDMzXSwgWzExMSwgdW5kZWZpbmVkLCB1bmRlZmluZWRdXSlcclxuICAgIH0pXHJcbn0pXHJcbmRlc2NyaWJlKCdzd2FwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCBwYXNzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBhY3RcclxuICAgICAgICBhY3QgPSB4Lm5NaW51cygxKSg2KTs7Ozs7Ozs7OyBleHBlY3QoYWN0KS50b0VxdWFsKDUpXHJcbiAgICAgICAgYWN0ID0geC5zd2FwKHgubk1pbnVzKSgxKSg2KTsgZXhwZWN0KGFjdCkudG9FcXVhbCgtNSlcclxuICAgIH0pXHJcbn0pXHJcbmZkZXNjcmliZSgnaXNTcGMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpdCgnc2hvdWxkIHBhc3MnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZXhwZWN0KHguaXNTcGMoJyBhJykpLnRvQmVUcnV0aHkoKVxyXG4gICAgICAgIGV4cGVjdCh4LmlzU3BjKCdcXHRhJykpLnRvQmVUcnV0aHkoKVxyXG4gICAgICAgIGV4cGVjdCh4LmlzU3BjKCdcXHJhJykpLnRvQmVUcnV0aHkoKVxyXG4gICAgICAgIGV4cGVjdCh4LmlzU3BjKCdcXG5hJykpLnRvQmVUcnV0aHkoKVxyXG4gICAgICAgIGV4cGVjdCh4LmlzU3BjKCdhJykpLnRvQmVGYWxzeSgpXHJcbiAgICB9KVxyXG59KVxyXG5kZXNjcmliZSgnc3dhcCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGl0KCdzaG91bGQgcGFzcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgYWN0XHJcbiAgICAgICAgYWN0ID0geC5vSGFzUHJwKCdhJykoeyBhOiAxIH0pOyBleHBlY3QoYWN0KS50b0JlVHJ1dGh5KClcclxuICAgICAgICBhY3QgPSB4Lm9IYXNQcnAoJ2InKSh7IGE6IDEgfSk7IGV4cGVjdChhY3QpLnRvQmVGYWxzeSgpXHJcbiAgICB9KVxyXG59KVxyXG5cclxuLy8gaGFzTGVuXHJcbmFjdCA9IGhhc0xlbih7IGE6IDEgfSk7OyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0LCBmYWxzZSlcclxuYWN0ID0gaGFzTGVuKDEyMyk7Ozs7IGFzc2VydC5zdHJpY3RFcXVhbChhY3QsIGZhbHNlKVxyXG5hY3QgPSBoYXNMZW4oJ2EnKTs7OzsgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdCwgdHJ1ZSlcclxuXHJcblxyXG5kZXNjcmliZShcImRyc1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBkcnkgPSBbWzEsIDIsIDNdLCBbMV0sIFsyMywgMywgNCwgNV1dO1xyXG4gICAgdmFyIGN1cnJ5ZnVuID0gcmVxdWlyZSgnLi4vLi4vc2NyaXB0cy9jdXJyeWZ1bi5qcycpO1xyXG4gICAgZGVzY3JpYmUoXCJzZHJ5Q29sQ250XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpdChcInNob3VsZCBiZSAzIGNvbHVtbnNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoeC5kcnlDb2xDbnQoZHJ5KSkudG9FcXVhbCg0KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgZGVzY3JpYmUoXCJzZHJ5Q29sXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpdChcInNob3VsZCBwYXNzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXhwZWN0KHguZHJ5Q29sKDApKGRyeSkpLnRvRXF1YWwoWzEsIDEsIDIzXSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh4LmRyeUNvbCgxKShkcnkpKS50b0VxdWFsKFsyLCB1bmRlZmluZWQsIDNdKTtcclxuICAgICAgICAgICAgZXhwZWN0KHguZHJ5Q29sKDIpKGRyeSkpLnRvRXF1YWwoWzMsIHVuZGVmaW5lZCwgNF0pO1xyXG4gICAgICAgICAgICBleHBlY3QoeC5kcnlDb2woMykoZHJ5KSkudG9FcXVhbChbdW5kZWZpbmVkLCB1bmRlZmluZWQsIDVdKTtcclxuICAgICAgICAgICAgZXhwZWN0KHguZHJ5Q29sKDQpKGRyeSkpLnRvRXF1YWwoW3VuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWRdKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgZGVzY3JpYmUoXCJkcnlMeVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgZHJ5ID0gW1sxLCAyLCAzXSwgWzFdLCBbMjMsIDMsIDQsIDVdXTtcclxuICAgICAgICBpdChcInNob3VsZCBwYXNzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGxldCBhY3QgPSB4LmRyeUx5KGRyeSk7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBleHBlY3QoYWN0KS50b0VxdWFsKFsnJywgJyddKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmNvbnN0IHsgcG1GZm4ybGluZXMgfSA9ICRcclxuLy8gcG1GZm4ybGluZXMgYWx3YXlzIHByb21pc2Uge2VyLGxpbmVzfVxyXG5sZXQgdDIgPSAoeyBlciwgbGluZXMgfSkgPT4geyB0KCEhZXIpOyBlcShsaW5lcykodW5kZWZpbmVkKSB9XHJcbmlmICh0cnVlKSB7XHJcbiAgICBjb25zdCBvID0gKGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBmZm4gPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcInJlc1wiLCBcImEudHh0XCIpXHJcbiAgICAgICAgY29uc3QgeyBlciwgbGluZXMgfSA9IGF3YWl0IHBtRmZuMmxpbmVzKGZmbilcclxuICAgICAgICBlcShlcikobnVsbClcclxuICAgICAgICBlcShsaW5lcykoXCJmaWxlLWEudHh0XFxyXFxubGluZTFcXHJcXG5saW5lMlxcclxcblwiKVxyXG4gICAgICAgIGVuZCgncG1GZm4ybGluZXMuICByZWFkIE9rJylcclxuICAgIH0pKClcclxufVxyXG5pZiAodHJ1ZSkge1xyXG4gICAgY29uc3QgbyA9IChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmZuID0gJ2RzZnNkZidcclxuICAgICAgICBjb25zdCB7IGVyLCBsaW5lcyB9ID0gYXdhaXQgcG1GZm4ybGluZXMoZmZuKVxyXG4gICAgICAgIHQoISFlcilcclxuICAgICAgICBlcShsaW5lcykodW5kZWZpbmVkKVxyXG4gICAgICAgIGVuZCgncG1GZm4ybGluZXMuICBmaWxlIG5vdCBmb3VuZCcpXHJcbiAgICB9KSgpXHJcbn1cclxuXHJcbmNvbnN0IHsgdG1wRmlsRm0sIHBjRmZuMmxpbmVzfSA9IGNmXHJcbmNvbnN0IG8gPSAoYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgZmZuID0gcGF0aC5qb2luKF9fZGlybmFtZSwgXCJyZXNcIiwgXCJhLnR4dFwiKVxyXG4gICAgbGV0IHRmID0gdG1wRmlsRm0oZmZuKSAvLyB0c3QgZmlsZSBpbiB0bXAgZGlyZWN0b3J5XHJcbiAgICBsZXQgbGluZXNDID0gYXdhaXQgcGNGZm4ybGluZXMoZmZuKVxyXG4gICAgbGV0IHtlciwgbGluZXN9ID0gbGluZXNDKCkgLy8gZ2V0IHRoZSB2YWx1ZSBmcm9tIGNhY2hlIGJ5IGNhbGxpbmc6IGxpbmVzQygpXHJcbiAgICBlcShlcikobnVsbClcclxuICAgIGVxKGxpbmVzKSgnZmlsZS1hLnR4dFxcclxcblxcbGluZTFcXHJcXG5saW5lMlxcclxcbicpXHJcbiAgICBsZXQgYSA9IGxpbmVzQygpICAvLyBnZXQgdGhlIHtlciwgbGluZXN9XHJcbiAgICBmcy51bmxpbmtTeW5jKHRmKSAvLyBkZWxldGUgdGhlIHRzdCBmaWxlXHJcbiAgICBsZXQgYiA9IGxpbmVzQygpICAvLyBnZXQgZnJvbSBjYWNoZSBpcyBzdGlsbCBhdmFpbGJsZVxyXG4gICAgZXEoYSkoYikgICAgICAgICAgLy8gYSAmIGIgYXJlIGFjdHVhbCBzYW1lIGluc3RhbmNlXHJcbiAgICBlbmQoJ3BjRmZuMmxpbmVzJylcclxufSkoKVxyXG5cclxuKi9cclxuXHJcbi8vID09PT09PT09PT09PT09PT1cclxuZnVuY3Rpb24gdHN0X19kcnlTcnRDb2woKSB7XHJcbiAgICB0MSgpXHJcbiAgICBmdW5jdGlvbiByKGV4cDogZHJ5LCBkcnk6IGRyeSwgY29sQXk6IG5bXSkge1xyXG4gICAgICAgIGNvbnN0IGFjdCA9IGNmLmRyeVNydENvbChjb2xBeSkoZHJ5KVxyXG4gICAgICAgIGFzc2VydElzRXEoZXhwLCBhY3QpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0MSgpIHtcclxuICAgICAgICBjb25zdCBkcnkgPSBbXHJcbiAgICAgICAgICAgIFsxLCAyLCAzLCA0XSxcclxuICAgICAgICAgICAgWzIsIDMsIDQsIDVdLFxyXG4gICAgICAgICAgICBbMiwgMSwgNiwgN11cclxuICAgICAgICBdXHJcbiAgICAgICAgY29uc3QgZXhwID0gW1xyXG4gICAgICAgICAgICBbMSwgMiwgMywgNF0sXHJcbiAgICAgICAgICAgIFsyLCAxLCA2LCA3XSxcclxuICAgICAgICAgICAgWzIsIDMsIDQsIDVdLFxyXG4gICAgICAgIF1cclxuICAgICAgICBjb25zdCBjb2xBeSA9IFswLCAxXVxyXG4gICAgICAgIHIoZXhwLCBkcnksIGNvbEF5KVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHRzdF9fRHJ5KCkge1xyXG4gICAgY29uc3QgYSA9IG5ldyBjZi5EcnkoY2YubnlDbWxTZHJ5KGNmLnNyY0V4cENvbnN0Tnkoc3JjKCkpKSlcclxuICAgIGRlYnVnZ2VyXHJcbn1cclxuZnVuY3Rpb24gdHN0X19kcnNPZl9leHBvcnRGdW5jdGlvbnMoKSB7XHJcbiAgICByZXF1aXJlKCd3ZWJwYWNrJylcclxuICAgIHJlcXVpcmUoJ2N1cnJ5ZnVuJylcclxuICAgIGNvbnN0IGEgPSBjZi5kcnNvZl9leHBvcnRGdW5jdGlvbnMoKVxyXG4gICAgY29uc3QgeHggPSBjZi5kcnkoYS5kcnkpXHJcbiAgICB4eC5zZXRDdXJDb2woMSkuYnJ3KClcclxuICAgIGRlYnVnZ2VyXHJcbiAgICAvL2Ryc0JydyhhKVxyXG59XHJcbmZ1bmN0aW9uIHRzdF9fcHRoUGFyKCkge1xyXG4gICAgcignYWEvYmIvJywgJ2FhXFxcXCcpXHJcbiAgICByKCdhYVxcXFxiYlxcXFwnLCAnYWFcXFxcJylcclxuICAgIHJldHVyblxyXG4gICAgZnVuY3Rpb24gcihwdGg6IHB0aCwgcGFyOiBwdGgpIHtcclxuICAgICAgICBjb25zdCBhY3QgPSBjZi5wdGhQYXIocHRoKVxyXG4gICAgICAgIGFzc2VydElzRXEocGFyLCBhY3QpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdHN0X19wdGhTZWdBeSgpIHtcclxuICAgIHIoJ2FhL2JiLycsIFsnYWEnLCAnYmInLCAnJ10pXHJcbiAgICByKCdhYVxcXFxiYlxcXFwnLCBbJ2FhJywgJ2JiJywgJyddKVxyXG4gICAgcmV0dXJuXHJcbiAgICBmdW5jdGlvbiByKHB0aDogcHRoLCBleHA6IHNlZ1tdKSB7XHJcbiAgICAgICAgY29uc3QgYWN0ID0gY2YucHRoU2VnQXkocHRoKVxyXG4gICAgICAgIGFzc2VydElzRXEoZXhwLCBhY3QpXHJcbiAgICB9XHJcbn1cclxuY29uc3Qgc3JjID0gKCkgPT4gY2YuZnRMeShjZi5mZm5GdHMoX19maWxlbmFtZSkpXHJcbmZ1bmN0aW9uIHRzdF9fc3JjRXhwQ29uc3ROeSgpIHsgcGlwZShzcmMoKSkoY2Yuc3JjRXhwQ29uc3ROeSwgY2YubHlCcndTdG9wKSB9XHJcbmZ1bmN0aW9uIHRzdF9fcHRoRm5BeVBtKCkgeyBjZi5wdGhGbkF5UG0oX19kaXJuYW1lKS50aGVuKGNmLmx5QnJ3U3RvcCkgfVxyXG5mdW5jdGlvbiB0c3RfX2NtbFNwY05tKCkgeyBwaXBlKF9fZmlsZW5hbWUpKGNmLmZmbkZ0cywgY2YuZnRzRXhwQ29uc3ROeSwgY2YuaXRyTWFwKGNmLmNtbFNwY05tKSwgY2YubHlCcndTdG9wKSB9XHJcbmZ1bmN0aW9uIHRzdF9fc05tU2V0KCkgeyBwaXBlKF9fZmlsZW5hbWUpKGNmLmZ0TGluZXMsIGNmLnNObVNldCwgY2Yuc3NldFNydEJydywgY2Yuc3RvcCkgfVxyXG5mdW5jdGlvbiB0c3RfX2NtbE55KCkgeyBjZi5jbWxOeSgnYWJBeVNwYycpIH1cclxuZnVuY3Rpb24gdHN0X19zTGlrKCkgeyBpZiAoIWNmLnNMaWsoXCJhYmM/ZGRcIikoXCJhYmN4ZGRcIikpIHsgZGVidWdnZXIgfSB9XHJcbmZ1bmN0aW9uIHRzdF9fZnRzRXhwQ29uc3ROeUJydygpIHsgcGlwZShfX2ZpbGVuYW1lKShjZi5mZm5GdHMsIGNmLmZ0c0V4cENvbnN0TnlCcncsIGNmLnN0b3ApIH1cclxuZnVuY3Rpb24gdHN0X19zQm94KCkgeyBjZi5zQnJ3KGNmLnNCb3goJ2pvaG5zb24geHgnKSkgfVxyXG5mdW5jdGlvbiB0c3RfX3B0aEJydygpIHsgY2YucHRoQnJ3KGNmLnRtcHB0aCkgfVxyXG5mdW5jdGlvbiB0c3RfX3NCcndBdEZkckZuKCkgeyBjZi5zQnJ3QXRGZHJGbignYWEnLCAnMS5qc29uJykoJ1sxLDJdJykgfVxyXG5mdW5jdGlvbiB0c3RfX2lzRXEoKSB7XHJcbiAgICBjb25zdCB7IGlzRXEgfSA9IGNmXHJcbiAgICBpZiAoaXNFcSgxLCAnMScpKVxyXG4gICAgICAgIGRlYnVnZ2VyXHJcbiAgICBpZiAoIWlzRXEoMSwgMSkpXHJcbiAgICAgICAgZGVidWdnZXJcclxuICAgIGlmICghaXNFcSh7IGE6IDEgfSwgeyBhOiAxIH0pKVxyXG4gICAgICAgIGRlYnVnZ2VyXHJcbn1cclxuZnVuY3Rpb24gdHN0X192aWRWYWwoKSB7XHJcbiAgICBjb25zdCB2ID0gJzIzNDIzNCdcclxuICAgIGNmLnZTYXYoJ2EnKSh2KVxyXG4gICAgY29uc3QgdjEgPSBjZi52aWRWYWwoJ2EnKVxyXG4gICAgYXNzZXJ0SXNFcSh2LCB2MSlcclxufVxyXG5mdW5jdGlvbiB0c3RfX3NpZFN0cigpIHtcclxuICAgIGNvbnN0IHMgPSAnMjM0MjM0J1xyXG4gICAgY2Yuc1NhdignYScpKHMpXHJcbiAgICBjb25zdCBzMSA9IGNmLnZpZFZhbCgnYScpXHJcbiAgICBhc3NlcnRJc0VxKHMsIHMxKVxyXG59XHJcbmZ1bmN0aW9uIHRzdF9fdmlkcHRoQnJ3KCkgeyBjZi52aWRwdGhCcncoKSB9XHJcbmZ1bmN0aW9uIHRzdF9fc2lkcHRoQnJ3KCkgeyBjZi5zaWRwdGhCcncoKSB9XHJcbmZ1bmN0aW9uIHRzdF9fb1BycCgpIHtcclxuICAgIHQxKClcclxuICAgIHJldHVyblxyXG4gICAgZnVuY3Rpb24gcihleHAsIHBycFB0aDogcywgbzogbykge1xyXG4gICAgICAgIGRlYnVnZ2VyXHJcbiAgICAgICAgbGV0IGFjdCA9IGNmLm9QcnAocHJwUHRoKShvKVxyXG4gICAgICAgIGFzc2VydElzRXEoZXhwLCBhY3QpXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0MSgpIHtcclxuICAgICAgICBsZXQgbyA9IHsgbGluOiAnYWFhJyB9XHJcbiAgICAgICAgbGV0IHBycFB0aCA9ICdsaW4nXHJcbiAgICAgICAgbGV0IGV4cCA9ICdhYWEnXHJcbiAgICAgICAgcihleHAsIHBycFB0aCwgbylcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB0c3RfX2lzRlRzdEpzKCkge1xyXG4gICAgclRydWUoJ3NkbGtmL3Rlc3QvdHN0X19za2xkZi5qcycpXHJcbiAgICByRmFsc2UoJ+iaseWtmOexsycpXHJcbiAgICByZXR1cm5cclxuICAgIGZ1bmN0aW9uIHJUcnVlKGZUc3RKczogZlRzdEpzKSB7IHJldHVybiByKHRydWUsIGZUc3RKcykgfVxyXG4gICAgZnVuY3Rpb24gckZhbHNlKGZUc3RKczogZlRzdEpzKSB7IHJldHVybiByKGZhbHNlLCBmVHN0SnMpIH1cclxuICAgIGZ1bmN0aW9uIHIoZXhwOiBiLCBmVHN0SnM6IGZUc3RKcykge1xyXG4gICAgICAgIGNvbnN0IGFjdCA9IGNmLmlzRlRzdEpzKGZUc3RKcylcclxuICAgICAgICBhc3NlcnRJc0VxKGV4cCwgYWN0KVxyXG4gICAgfVxyXG59Il19