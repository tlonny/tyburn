import type { ParserExpr } from "@src/parser/ast"
import { parserText, parserAtomEither, parserAtomMapValue } from "astroparse"

const parserTrue = parserText("true")
const parserFalse = parserText("false")

export const parserExprBool = parserAtomMapValue(
    parserAtomEither([
        parserTrue,
        parserFalse
    ]), (x) : ParserExpr => ({
        exprType: "BOOL",
        value: x === "true" ? "TRUE" : "FALSE"
    })
)
