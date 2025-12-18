import type { ParserExpr } from "@src/parser/ast"
import { parserToken } from "@src/parser/token"
import { parserAtomMapValue, parserAtomSequence, parserWhitespace } from "astroparse"

const parserExprPrefixNotToken = parserToken("!")

export const parserExprNot = parserAtomMapValue(
    parserAtomSequence([
        parserExprPrefixNotToken,
        parserWhitespace
    ]),
    () => (expr : ParserExpr) : ParserExpr => ({
        exprType: "NOT",
        value: expr
    })
)
