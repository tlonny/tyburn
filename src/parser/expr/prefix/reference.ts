import type { ParserExpr } from "@src/parser/ast"
import { parserToken } from "@src/parser/token"
import { parserAtomSequence, parserWhitespace, parserAtomMapValue } from "astroparse"

const parserExprPrefixReferenceToken = parserToken("&")

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
