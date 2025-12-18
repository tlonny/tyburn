import type { ParserNodeExpr } from "@src/parser/node"
import type { ParserError } from "@src/parser/error"
import { parserExprNot } from "@src/parser/expr/prefix/not"
import { parserExprReference } from "@src/parser/expr/prefix/reference"
import { parserAtomEither, parserAtomSequence, parserAtomMany, parserAtomMapValue, type Parser } from "astroparse"

const parserExprPrefixEither = parserAtomEither([
    parserExprReference,
    parserExprNot
])

export const parserExprPrefix = (params: {
    parserCurrent : Parser<ParserNodeExpr, ParserError>
}) => parserAtomMapValue(
    parserAtomSequence([
        parserAtomMany(parserExprPrefixEither),
        params.parserCurrent
    ]),
    ([xs, expr]) => xs.reduceRight((l, r) => r(l), expr)
)
