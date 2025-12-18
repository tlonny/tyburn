import type { ParserNodeExpr } from "@src/parser/node"
import type { ParserError } from "@src/parser/error"
import { parserExprPostfixApplication } from "@src/parser/expr/postfix/application"
import { parserExprPostfixSubscript } from "@src/parser/expr/postfix/subscript"
import { parserAtomEither, parserAtomMapValue, parserAtomSequence, parserAtomMany, type Parser } from "astroparse"

const parserExprPostfixEither = (params: {
    parserTop : Parser<ParserNodeExpr, ParserError>,
}) => parserAtomEither([
    parserExprPostfixSubscript,
    parserExprPostfixApplication,
].map(x => x(params.parserTop)))

export const parserExprPostfix = (params: {
    parserTop : Parser<ParserNodeExpr, ParserError>
    parserCurrent : Parser<ParserNodeExpr, ParserError>
}) => parserAtomMapValue(
    parserAtomSequence([
        params.parserCurrent,
        parserAtomMany(parserExprPostfixEither(params))
    ]),
    ([expr, xs]) => xs.reduce((l, r) => r(l), expr)
)
