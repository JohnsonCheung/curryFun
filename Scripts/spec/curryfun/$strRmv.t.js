const { $$, $, end, eq, t, f } = require("../$tstConst.js")(__filename)
let act = $.rmvColon("aa:bb");
if (act !== "aabb")
    debugger
end("rmvColon")
