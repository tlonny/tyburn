import type { ParserExpr } from "@src/parser/ast"
import { parserAtomMapValue, parserAtomSequence, parserText, parserWhitespace } from "astroparse"

const parserExprPrefixNotToken = parserText("!")

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
