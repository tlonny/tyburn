import type { ParserExpr } from "@src/parser/ast"
import { parserSymbol } from "@src/parser/symbol"
import { parserAtomMapValue } from "astroparse"

export const parserExprVariable = parserAtomMapValue(
    parserSymbol,
    (x) : ParserExpr => ({
        exprType: "VARIABLE",
        value: x
    })
)

