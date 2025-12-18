import type { ParserNodeExpr } from "@src/parser/node"
import { parserSymbol } from "@src/parser/symbol"
import { parserAtomMapValue } from "astroparse"

export const parserExprVariable = parserAtomMapValue(
    parserSymbol,
    (x) : ParserNodeExpr => ({
        nodeType: "EXPR_VARIABLE",
        value: x
    })
)

