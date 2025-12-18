import type { ParserExpr } from "@src/parser/ast"
import type { ParserError } from "@src/parser/error"
import { parserExprInfixMultiply } from "@src/parser/expr/infix/multiply"
import { type Parser, parserAtomSequence, parserAtomMany, parserAtomMapValue } from "astroparse"

const parserExprInfixChain = (params: {
    parserInfix: (
        parserNext : Parser<ParserExpr, ParserError>
    ) => Parser<(expr : ParserExpr) => ParserExpr, ParserError>,
    parserNext: Parser<ParserExpr, ParserError>
}) => parserAtomMapValue(
    parserAtomSequence([
        params.parserNext,
        parserAtomMany(params.parserInfix(params.parserNext))
    ]),
    ([expr, fns]) => fns.reduce((expr, fn) => fn(expr), expr)
)

export const parserExprInfix = (params: {
    parserCurrent: Parser<ParserExpr, ParserError>
}) => [
    parserExprInfixMultiply
]
    .reduce((acc, fn) => parserExprInfixChain({
        parserInfix: fn,
        parserNext: acc
    }), params.parserCurrent)
