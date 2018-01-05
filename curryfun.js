const where = f => ay => { const o = []; for (let i of ay) if (f(i)) o.push(i); return o }
const map = f => ay => { const o = []; for (let i of ay) o.push(f(i)); return o }
const pm = (f, ...p) => new Promise(rs => f(...p, (er, rslt) => rs({ er, rslt })))
/**
 * @description return the property value of object {o} by property path {pprPth}
 * @param {string} prpPth
 * @example
 * const a = {b: {c:{1}}
 * require('assert').equal(prp('b.c')(o), 1) 
 */
const prp = prpPth => o => {
    const ay = prpPth.split('.')
    let oo = o
    for (let i of ay) {
        oo = oo[i]
        if (oo === undefined || oo === null) return oo
    }
    return oo
}
/**
 * @description return the constructor name of object (o) if any else return undefined
 * @param {object} o
 * @returns {string|null}
 */
const ctorNm = o => o && o.constructor && o.constructor.name
const isInstance = instance => o => o instanceof instance
/**
 * @description return true if object {o} has constructor name {nm} 
 * @param {string} nm 
 * @param {object} o
 */
const hasCtorNm = nm => o => ctorNm(o) === nm
/**
 * @description return true if given {o} is a string (having construction name === 'String')
 */
const isStr = hasCtorNm("String")
/**
 * @description return true if given {o} is a string (having construction name === 'Number')
 */
const isNum = hasCtorNm("Number")
/**
 * @description return true if given {o} is a string (having construction name === 'Array')
 */
const isAy = hasCtorNm("Array")
/**
 * @description return true if given {o} is a string (having construction name === 'Date')
 */
const isDte = hasCtorNm("Date")
/**
 * @description return string array from {strOrSy}.  If {strOrSy} is string, return splitSpc(.)
 * @param {string|string[]} strOrSy 
 * @@Sy string array
 */
const strOrSy2Sy = strOrSy => isStr(strOrSy) ? splitSpc(strOrSy) : strOrSy
const splitSpc = s => s.split(/\s/)
/**
 * @description return (#dr) of properties of (#o) by given (#pthOrAy)
 * @param @pthOrSy String | String Array.  
 * If it is string, splitSpc will be used to split into string array each element is the property path of of (o).
 * @param @o Object to be scanned
 * @return @dr (data row) of property value of (#o)
 * @memberof obj
 * @example
 * sdfsdfdsf
 */
const obj2dr = pthOrSy => o => {
    const prpNy = strOrSy2Sy(pthOrSy)
    const oo = []
    for (let prpNm of prpNy) {
        const v = prp(prpNm)(o)
        oo.push(v)
    }
    return oo
}
const apply = o = f => f(o)
/**
 * @description return data row array (dry) by selecting object array (oy) by (pthOAy) 
 * @param {pthOrAy} pthOrAy 
 * @param {iter} oy
 * @returns {dry}
 */
const select = pthOrAy => oy => {
    const prpAy = map(prp)(strOrSy2Sy(pthOrAy))
    const o = []
    for (oo of oy) {
        const dr =[]
        for (let prp of prpAy) {
            const v = prp(oo)
            dr.push(v)
        }
        o.push(dr)
    }
    return o
}
const pipe = v => (...f) => {
    let o = v
    for (let ff of f)
        o = ff(o)
    return o
}
const swap = f => a => b => f(b)(a)
const compose = (...f) => v => pipe(v)(...f)
const or = (...p) => v => {
    for (let pp of p)
        if (pp(i)) return true
    return false
}
const not = p => v => !p(v)
const and = (...p) => v => {
    for (let pp of p)
        if (!pp(i)) return false
    return true
}
const multiply = a => b => a * b
const divide = a => b => b / a
const add = a => b => a + b
const decr = add(-1)
const incr = add(1)
const minus = a => b => b - a
const ayMax = ay => {
    let o = fst(ay)
    for (i of ay)
        if (i > o)
            o = i
    return o
}
const ayMin = ay => {
    let o = fst(ay)
    for (i of ay)
        if (i < o)
            o = i
    return o
}
const hasPrp = prpNm => o => { try { return o[prpNm] !== undefined } catch (e) { return false } }
const hasLen = hasPrp('length')
const len = v => v && v.length
const fst = ay => hasLen(ay) ? ay[0] : undefined
const las = ay => hasLen(ay) ? ay[len(ay) - 1] : undefined
const min = (...v) => ayMin(v)
const max = (...v) => ayMax(v)
const isOdd = n => n % 2 === 1
const isEven = n => n % 2 === 0

if (module.id === ".") {
    const assert = require('assert')
    let act
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
}
//---------------------------------------------------------------------------
module.exports = {
    where,
    map,
    pm,
    prp,
    ctorNm,
    isInstance,
    hasCtorNm,
    isStr,
    isNum,
    isAy,
    isDte,
    strOrSy2Sy,
    obj2dr,
    apply,
    select,
    pipe,
    swap,
    compose,
    or,
    and,
    not,
    multiply,
    divide,
    add,
    decr,
    incr,
    minus,
    ayMax,
    ayMin,
    hasPrp,
    hasLen,
    len,
    fst,
    las,
    min,
    max   
}
