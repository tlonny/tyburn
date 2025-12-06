import { parserExprPostfixApplication } from "@src/parse/parser/expr/postfix/application"
import { parserExprPostfixSubscript } from "@src/parse/parser/expr/postfix/subscript"
import type { Expr } from "@src/parse/parser/expr/type"
import { parserUtilEither } from "@src/parse/parser/util/either"
import { parserUtilMany } from "@src/parse/parser/util/many"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import type { Parser } from "@src/parse/type"

const parserExprPostfixEither = (params: {
    parserTop : Parser<Expr>,
}) => [
    parserExprPostfixSubscript,
    parserExprPostfixApplication,
]
    .map(x => x(params.parserTop))
    .reduce(parserUtilEither)

export const parserExprPostfix = (params: {
    parserTop : Parser<Expr>,
    parserCurrent : Parser<Expr>
}) : Parser<Expr> => parserUtilMap(
    parserUtilSequence(
        params.parserCurrent,
        parserUtilMany(parserExprPostfixEither(params))
    ),
    ([expr, xs]) => xs.reduce((l, r) => r(l), expr)
)
