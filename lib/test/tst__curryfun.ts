import * as cf from '../curryfun'
import * as assert from 'assert'
import * as path from 'path'
import * as fs from 'fs'
//import * as scanPgm from '../scanPgm'; scanPgm.fTstJs_updMainTstIfStmt(__filename)
const { assertIsEq, each } = cf
const { pipe, compose } = cf
if (module.id === '.') {
    tst__pthPar()
    debugger
    tst__Dry()
    tst__brk()
    tst__cmlNy()
    tst__cmlSpcNm()
    tst__drsLines()
    tst__drsOf_exportFunctions()
    tst__ftsExpConstNyBrw()
    tst__isEq()
    tst__isFTstJs()
    tst__isNum()
    tst__isOdd()
    tst__oPrp()
    tst__pthBrw()
    tst__pthFnAyPm()
    tst__sBox()
    tst__sBrwAtFdrFn()
    tst__sLik()
    tst__sNmSet()
    tst__sdryColWdt()
    tst__sdryColWdtAy()
    tst__sidStr()
    tst__sidpthBrw()
    tst__srcExpConstNy()
    tst__vidVal()
    tst__vidpthBrw()
}
function tst__sdryColWdtAy() {
    t1();
    return;
    function r(exp: n[], sdry: sdry) {
        const act = cf.sdryColWdtAy(sdry)
        assertIsEq(exp, act)
    }
    function t1() {
        const sdry = []
        const exp = [9, 11]
        r(exp, sdry)
    }
}
function tst__brk() {
    const { sBrk, sBrk1, sBrk2 } = cf
    t1()
    function r(exp: s1s2, sep: s, s: s) {
        const act = sBrk(sep)(s)
        assertIsEq(exp, act)
    }
    function t1() {
        let act, exp
        act = sBrk('.')('sss.bb');;;;;; exp = { s1: 'sss', s2: 'bb' };;;;;; assertIsEq(exp, act)
        act = sBrk('.')(' sss . bb ');; exp = { s1: 'sss', s2: 'bb' };;;;;; assertIsEq(exp, act)
        act = sBrk1('.')('sss.bb');;;;; exp = { s1: 'sss', s2: 'bb' };;;;;; assertIsEq(exp, act)
        act = sBrk1('.')(' sss . bb '); exp = { s1: 'sss', s2: 'bb' };;;;;; assertIsEq(exp, act)
        act = sBrk1('x')('sss.bb');;;;; exp = { s1: 'sss.bb', s2: '' };;;;; assertIsEq(exp, act)
        act = sBrk1('x')(' sss . bb '); exp = { s1: ' sss . bb ', s2: '' }; assertIsEq(exp, act)
        act = sBrk2('.')('sss.bb');;;;; exp = { s1: 'sss', s2: 'bb' };;;;;; assertIsEq(exp, act)
        act = sBrk2('.')(' sss . bb '); exp = { s1: 'sss', s2: 'bb' };;;;;; assertIsEq(exp, act)
        act = sBrk2('x')('sss.bb');;;;; exp = { s2: 'sss.bb', s1: '' };;;;; assertIsEq(exp, act)
        act = sBrk2('x')(' sss . bb '); exp = { s2: ' sss . bb ', s1: '' }; assertIsEq(exp, act)
    }
}
function tst__sdryColWdt() {
    t1()
    t2()
    return
    function r(exp: n, sdry: sdry, col: n) {
        const act = cf.sdryColWdt(col)(sdry)
        assertIsEq(exp, act)
    }
    function t1() {
        const sdry = [['lskdfj', '12345678901'], ['123456789', 'dkfj']]
        const col = 0
        const exp = 9
        r(exp, sdry, col)
    }
    function t2() {
        const sdry = [['lskdfj', '12345678901'], ['123456789', 'dkfj']]
        const col = 1
        const exp = 11
        r(exp, sdry, col)
    }
}
function tst__drsLines() {
    t1()
    t2()
    return
    function r(exp: lines, drs: drs) {
        const act = cf.drsLines(drs)
        assertIsEq(exp, act)
    }
    function t1() {
        const fny = cf.sSplitSpc('aa bb')
        const dry = [[1233, '12345678901'], ['123456789', 'dkfj'], [new Date(), true, 1]]
        const drs = { dry, fny }
        const exp = `|---------------------------------------------------------|-------------|---|
| aa                                                      | bb          |   |
|---------------------------------------------------------|-------------|---|
| 1233                                                    | 12345678901 |   |
| 123456789                                               | dkfj        |   |
| Sat Apr 14 2018 15:52:21 GMT+0800 (China Standard Time) | true        | 1 |
|---------------------------------------------------------|-------------|---|`.replace(/\n/g, '\r\n')
        r(exp, drs)
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
    const dte = new Date()
    const aNul = null
    const aUnd = undefined
    const aAy = []
    const aObj = {}
    const aNum = 1
    t1()
    return
    function r(exp, val) {
        assertIsEq(exp, cf.isNum(val))
    }
    function t1() {
        const t = (val) => r(true, val)
        const f = (val) => r(false, val)
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
    t1()
    return
    function r(exp: b, val) {
        const act = cf.isOdd(val)
        assertIsEq(exp, act)
    }
    function t1() {
        const t = (...vals) => each(v => r(true, v))(vals)
        const f = (...vals) => each(v => r(false, v))(vals)
        t(1, 3, 5, 7, 9, -1, -3)
        f(0, 2, 4, 6, 8, -2)
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
    t1()
    function r(exp: dry, dry: dry, colAy: n[]) {
        const act = cf.drySrtCol(colAy)(dry)
        assertIsEq(exp, act)
    }
    function t1() {
        const dry = [
            [1, 2, 3, 4],
            [2, 3, 4, 5],
            [2, 1, 6, 7]
        ]
        const exp = [
            [1, 2, 3, 4],
            [2, 1, 6, 7],
            [2, 3, 4, 5],
        ]
        const colAy = [0, 1]
        r(exp, dry, colAy)
    }
}
function tst__Dry() {
    const a = new cf.Dry(cf.nyCmlSdry(cf.srcExpConstNy(src())))
    debugger
}
function tst__drsOf_exportFunctions() {
    require('webpack')
    require('curryfun')
    const a = cf.drsof_exportFunctions()
    const xx = cf.dry(a.dry)
    xx.setCurCol(1).brw()
    debugger
    //drsBrw(a)
}
function tst__pthPar() {
    r('aa/bb/', 'aa\\')
    r('aa\\bb\\', 'aa\\')
    return
    function r(pth: pth, par: pth) {
        const act = cf.pthPar(pth)
        assertIsEq(par, act)
    }
}
function tst__pthSegAy() {
    r('aa/bb/', ['aa', 'bb', ''])
    r('aa\\bb\\', ['aa', 'bb', ''])
    return
    function r(pth: pth, exp: seg[]) {
        const act = cf.pthSegAy(pth)
        assertIsEq(exp, act)
    }
}
const src = () => cf.ftLy(cf.ffnFts(__filename))
function tst__srcExpConstNy() { pipe(src())(cf.srcExpConstNy, cf.lyBrwStop) }
function tst__pthFnAyPm() { cf.pthFnAyPm(__dirname).then(cf.lyBrwStop) }
function tst__cmlSpcNm() { pipe(__filename)(cf.ffnFts, cf.ftsExpConstNy, cf.itrMap(cf.cmlSpcNm), cf.lyBrwStop) }
function tst__sNmSet() { pipe(__filename)(cf.ftLines, cf.sNmSet, cf.ssetSrtBrw, cf.stop) }
function tst__cmlNy() { cf.cmlNy('abAySpc') }
function tst__sLik() { if (!cf.sLik("abc?dd")("abcxdd")) { debugger } }
function tst__ftsExpConstNyBrw() { pipe(__filename)(cf.ffnFts, cf.ftsExpConstNyBrw, cf.stop) }
function tst__sBox() { cf.sBrw(cf.sBox('johnson xx')) }
function tst__pthBrw() { cf.pthBrw(cf.tmppth) }
function tst__sBrwAtFdrFn() { cf.sBrwAtFdrFn('aa', '1.json')('[1,2]') }
function tst__isEq() {
    const { isEq } = cf
    if (isEq(1, '1'))
        debugger
    if (!isEq(1, 1))
        debugger
    if (!isEq({ a: 1 }, { a: 1 }))
        debugger
}
function tst__vidVal() {
    const v = '234234'
    cf.vSav('a')(v)
    const v1 = cf.vidVal('a')
    assertIsEq(v, v1)
}
function tst__sidStr() {
    const s = '234234'
    cf.sSav('a')(s)
    const s1 = cf.vidVal('a')
    assertIsEq(s, s1)
}
function tst__vidpthBrw() { cf.vidpthBrw() }
function tst__sidpthBrw() { cf.sidpthBrw() }
function tst__oPrp() {
    t1()
    return
    function r(exp, prpPth: s, o: o) {
        debugger
        let act = cf.oPrp(prpPth)(o)
        assertIsEq(exp, act)
    }
    function t1() {
        let o = { lin: 'aaa' }
        let prpPth = 'lin'
        let exp = 'aaa'
        r(exp, prpPth, o)
    }
}
function tst__isFTstJs() {
    rTrue('sdlkf/test/tst__skldf.js')
    rFalse('蚱存米')
    return
    function rTrue(fTstJs: fTstJs) { return r(true, fTstJs) }
    function rFalse(fTstJs: fTstJs) { return r(false, fTstJs) }
    function r(exp: b, fTstJs: fTstJs) {
        const act = cf.isFTstJs(fTstJs)
        assertIsEq(exp, act)
    }
}