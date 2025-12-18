import type { ParserNodeExpr } from "@src/parser/node"
import { parserToken } from "@src/parser/token"
import { parserAtomSequence, parserWhitespace, parserAtomMapValue } from "astroparse"

const parserExprPrefixReferenceToken = parserToken("&")

export const parserExprReference = parserAtomMapValue(
    parserAtomSequence([
        parserExprPrefixReferenceToken,
        parserWhitespace
    ]),
    () => (expr : ParserNodeExpr) : ParserNodeExpr => ({
        nodeType: "EXPR_REFERENCE",
        value: expr
    })
)
