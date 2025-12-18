import type { ParserExpr } from "@src/parser/ast"
import { parserText, parserAtomSequence, parserWhitespace, parserAtomMapValue } from "astroparse"

const parserExprPrefixReferenceToken = parserText("&")

export const parserExprReference = parserAtomMapValue(
    parserAtomSequence([
        parserExprPrefixReferenceToken,
        parserWhitespace
    ]),
    () => (expr : ParserExpr) : ParserExpr => ({
        exprType: "REFERENCE",
        value: expr
    })
)
