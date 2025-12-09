import { parserExprNot } from "@src/parse/parser/expr/prefix/not"
import { parserExprReference } from "@src/parse/parser/expr/prefix/reference"
import type { Expr } from "@src/parse/parser/expr/type"
import { parserUtilEither } from "@src/parse/parser/util/either"
import { parserUtilMany } from "@src/parse/parser/util/many"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import type { Parser } from "@src/parse/type"

const parserExprPrefixEither = parserUtilEither([
    parserExprReference,
    parserExprNot
])

export const parserExprPrefix = (params: {
    parserCurrent : Parser<Expr>
}) : Parser<Expr> => parserUtilMap(
    parserUtilSequence([
        parserUtilMany(parserExprPrefixEither),
        params.parserCurrent
    ]),
    ([xs, expr]) => xs.reduceRight((l, r) => r(l), expr)
)
