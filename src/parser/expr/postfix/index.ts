import type { ParserExpr } from "@src/parser/ast"
import type { ParserError } from "@src/parser/error"
import { parserExprPostfixApplication } from "@src/parser/expr/postfix/application"
import { parserExprPostfixSubscript } from "@src/parser/expr/postfix/subscript"
import { parserAtomEither, parserAtomMapValue, parserAtomSequence, parserAtomMany, type Parser } from "astroparse"

const parserExprPostfixEither = (params: {
    parserTop : Parser<ParserExpr, ParserError>,
}) => parserAtomEither([
    parserExprPostfixSubscript,
    parserExprPostfixApplication,
].map(x => x(params.parserTop)))

export const parserExprPostfix = (params: {
    parserTop : Parser<ParserExpr, ParserError>
    parserCurrent : Parser<ParserExpr, ParserError>
}) => parserAtomMapValue(
    parserAtomSequence([
        params.parserCurrent,
        parserAtomMany(parserExprPostfixEither(params))
    ]),
    ([expr, xs]) => xs.reduce((l, r) => r(l), expr)
)
