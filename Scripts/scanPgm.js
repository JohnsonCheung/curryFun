'use strict'
const cf = require('./curryfun.js')
const fs = require('fs')
const { lazy, addPfxSfx, jnLf, bringUp, pmWrtStr, splitLf,
    where, vNIN, vMAT, ayAddPfxSfx, concat } = cf
const z = lazy
var ffn;
var updConstLy; part1; part3; erLy;
var wrtMsg; msg;
var msg; erLy; okLy;
var erLy;
var srcLy; ffn;
var part3; srcLy; p3begIx;
var part1; srcLy; p1endIx;
var p3begIx; srcLy;
var p1endIx; srcLy;
var varLy; srcLy; varBegIx; varEndIx;
var varBegIx; srcLy; varBegLin;
var varEndIx; srcLy; varEndLin;
var newSrcLy; newP1; newConstLy; newP3;


const srcFilObj = ffn => {
    const updExportStmt = () => {
        const need = this.isNeedUpd.val
        if (need)
            updFfn()
    }
    const isNeedUpd = z(() => {
        const n = newCxt.val
        const o = srcLyObj.oldCxt.val
        n !== o
    })
    const updFfn = () => {
        console.log(`'file [${outFfn.val}] is updated`)
        fs.writeFileSync(outFfn.val, newCxt.val)
    }
    const a = srcLyObj(ffnLy(ffn))
    return { updExportStmt, $: { srcLy, isNeedUpd, updFfn } }
}
/**
 * update the given source file for the [export-statement] (the-stmt) if needed.
 * the-stmt is in the format of [const $ = { ... }] with
 *     fst line is 'const $ = {'
 *     las line is '}'
 *     in between are '    $xxx,'
 *     where $xxx is the export-name
 * export-name comes from all line of 'const $xxx = ....'
 * @param {*} ffn 
 */
const srcLyObj = ly => {
    const newCxt = z(() => {
        const p1 = p1Ly.val
        const nstmt = oldStmtLy.val
        const p3 = p3Ly.val
        const o = concat(p1, nstmt, p3)
        return o
    })
    const oldCxt = z(() => fs.readFileSync(ffn).toString())
    const outPth = z(() => {
        const o = ffnPth(ffn) + 'autoExport\\'
        pthEns(outPth)
        return o
    })
    const outFfn = z(() => {
        const o = outPth.val + ffnFn(ffn)
        return o
    })
    //----------------
    const p1Ly = z(() => {
        const a = oldLy.val
        const endIx = p1EndIx.val
        const o = a.slice(0, endIx)
        return o
    })
    const p2Ly = z(() => {
        let beg = p1EndIx.val
        if (beg === -1)
            return []
        beg++
        let end = p3EndIx.val
        if (end === -1)
            return []
        end++
        let ly = oldLy.val
        const o = ly.slice(beg, end)
        return o
    })
    const p3Ly = z(() => {
        const begIx = p3BegIx.val
        if (begIx === -1)
            return []
        const a = oldLy.val
        const o = a.slice(begIx, a.length - 1)
        return o
    })
    /**
     * return all the $xxx `const $xxx = ...` in {src} as string array
     */
    const newStmtLy = z(() => {
        const ny = exportNy
        const ay1 = ayAddPfxSfx('    ', ',')(ny)
        const ay2 = concat("const $ = {", ay1, "}")
        const o = jnLf(ay2)
        return o
    })
    //----------------
    const oldLy = z(() => {
        const ocxt = oldCxt.val
        const o = splitCrLf(ocxt)
        return o
    })
    const p1EndIx = z(() => {
        const ix = ayIx("const $ = {")(oldLy.val)
        return ix
    })
    const p3BegIx = z(() => {
        const beg = p1EndIx.val
        if (beg === -1) return -1
        const o = ayIxFm(beg + 1)("}")(oldLy.val)
        return o
    })
    const exportNy = cont$ny
    const cont$ny = z(() => {
        const ly = oldLy.val
        const ay = where(vMAT(/^const \$/))(ly)
        const ay1 = []
        for (let i of ay) {
            const m = i.match(/^const (\$.*) =/)
            const a = m[1]
            ay1.push(a)
        }
        const ay2 = where(vNIN(['$', '$$']))(ay1)
        const o = ay2.sort()
        return o
    })
    //----------------

    const $ = {
        oldCxt, newCxt, p3BegIx, p1EndIx, isNeedUpd,
        p1Ly, p2Ly, p3Ly, newStmtLy,
        outPth, outFfn, isOutFfnExist

    }
    return { updExportStmt, $ }
}
const $src = {
    srcFil, srcLy
}
const $ = {
    $src
}
module.exports = bringUp($)
