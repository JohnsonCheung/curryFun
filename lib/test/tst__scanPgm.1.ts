import * as assert from 'assert'
import * as path from 'path'
import * as fs from 'fs'
import * as cf from '../curryfun'
//import * as scanPgm from '../scanPgm'; scanPgm.fTstJs_updMainTstIfStmt(__filename)
const { assertIsEq, each } = cf
const { pipe, compose } = cf
import * as x from '../scanPgm.1'
if (module.id === '.') {
    const fTstTs = __dirname + '/resources/scanPgm.1/tst__aa.ts'
    const fts = __dirname + '/resources/scanPgm.1/aa.ts'
    x.x(fTstTs, fts)
}