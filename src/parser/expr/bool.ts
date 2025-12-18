import type { ParserNodeExpr } from "@src/parser/node"
import { parserToken } from "@src/parser/token"
import { parserAtomEither, parserAtomMapValue } from "astroparse"

const parserTrue = parserToken("true")
const parserFalse = parserToken("false")

export const parserExprBool = parserAtomMapValue(
    parserAtomEither([
        parserTrue,
        parserFalse
    ]), (x) : ParserNodeExpr => ({
        nodeType: "EXPR_BOOL",
        value: x === "true" ? "TRUE" : "FALSE"
    })
)
