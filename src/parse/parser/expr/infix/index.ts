import { parserExprInfixMultiply } from "@src/parse/parser/expr/infix/multiply"
import type { Expr } from "@src/parse/parser/expr/type"
import { parserUtilMany } from "@src/parse/parser/util/many"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import type { Parser } from "@src/parse/type"

const parserExprInfixChain = (params: {
    parserInfix: (parserNext : Parser<Expr>) => Parser<(expr : Expr) => Expr>,
    parserNext: Parser<Expr>
}) : Parser<Expr> => parserUtilMap(
    parserUtilSequence(
        params.parserNext,
        parserUtilMany(params.parserInfix(params.parserNext))
    ),
    ([expr, fns]) => fns.reduce((expr, fn) => fn(expr), expr)
)

export const parserExprInfix = (params: {
    parserCurrent: Parser<Expr>
}) : Parser<Expr> => [
    parserExprInfixMultiply
]
    .reduce((acc, fn) => parserExprInfixChain({
        parserInfix: fn,
        parserNext: acc
    }), params.parserCurrent)
