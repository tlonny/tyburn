import { parserExpr } from "@src/parse/parser/expr"
import { parse } from "@src/parse/parse"
import type { ParseInput } from "@src/parse/type"

const input : ParseInput = {
    data: "!&5",
    index: 0,
    position: [0, 0]
}

console.log(
    JSON.stringify(
        parse(parserExpr, input),
        null, 4
    )
)
