const { act, assert, cf, eq, t, f, $ } = require("./$tstConst.js")("$is")
const dte = new Date()
const aFun = () =>{}
const aStr = 'aaa'
const aNum = 1
const aNaN = NaN
const aNul = null
const aUnd = undefined
const aAy = []
const aObj = {}
let $fun
//------------------------------
$fun = $.isNum
f($fun(aFun))
f($fun(aStr))
t($fun(aNum))
f($fun(aNaN))
f($fun(aUnd))
f($fun(aAy))
f($fun(aObj))
//------------------------------
$fun = $.isFun
t($fun(aFun))
t($fun(aStr))
t($fun(aNum))
t($fun(aNaN))
t($fun(aUnd))
t($fun(aAy))
t($fun(aObj))
//------------------------------
$fun = $.isFun
t($fun(aFun))
t($fun(aStr))
t($fun(aNum))
t($fun(aNaN))
t($fun(aUnd))
t($fun(aAy))
t($fun(aObj))
debugger
// where
act = where(isOdd)([1, 2, 3, 4, 5, 7, 9])
assert.deepStrictEqual(act, [1, 3, 5, 7, 9])

// select
act = select('a b c')([{ a: 1, b: 2, c: 3, d: 4 }, { aa: 11, b: 22, c: 33, d: 44 }, { a: 111, bb: 222, cc: 333, d: 444 }])
assert.deepStrictEqual(act, [[1, 2, 3], [undefined, 22, 33], [111, undefined, undefined]])

// swap
act = minus(1)(6);;;;;;; assert.strictEqual(act, 5)
act = swap(minus)(1)(6); assert.strictEqual(act, -5)

// hasPrp
act = hasPrp('a')({ a: 1 }); assert.strictEqual(act, true)
act = hasPrp('b')({ a: 1 }); assert.strictEqual(act, false)

// hasLen
act = hasLen({ a: 1 });; assert.strictEqual(act, false)
act = hasLen(123);;;; assert.strictEqual(act, false)
act = hasLen('a');;;; assert.strictEqual(act, true)

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

// tak
act = takBef('.')('aaaa.bb'); assert.strictEqual(act, 'aaaa')
act = takAft('.')('aaaa.bb'); assert.strictEqual(act, 'bb')

// er
assert.throws(() => er('aabbcc')())
assert.throws(() => er('aabbcc')({ a: 1, b: 2 }, 'aaaa'))
// pmFfn2lines

console.log('testing ok....')
