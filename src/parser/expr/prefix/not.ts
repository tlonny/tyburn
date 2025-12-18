import type { ParserNodeExpr } from "@src/parser/node"
import { parserToken } from "@src/parser/token"
import { parserAtomMapValue, parserAtomSequence, parserWhitespace } from "astroparse"

const parserExprPrefixNotToken = parserToken("!")

export const parserExprNot = parserAtomMapValue(
    parserAtomSequence([
        parserExprPrefixNotToken,
        parserWhitespace
    ]),
    () => (expr : ParserNodeExpr) : ParserNodeExpr => ({
        nodeType: "EXPR_NOT",
        value: expr
    })
)
