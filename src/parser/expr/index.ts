import type { ParserExpr } from "@src/parser/ast"
import type { ParserError } from "@src/parser/error"
import { parserExprBool } from "@src/parser/expr/bool"
import { parserExprInfix } from "@src/parser/expr/infix"
import { parserExprInteger } from "@src/parser/expr/integer"
import { parserExprParens } from "@src/parser/expr/parens"
import { parserExprPostfix } from "@src/parser/expr/postfix"
import { parserExprPrefix } from "@src/parser/expr/prefix"
import { parserExprVariable } from "@src/parser/expr/variable"
import { type ParseInput, type Parser, parserAtomEither, parserAtomError } from "astroparse"

const parserExprDeferred = (x : ParseInput) => parserExpr(x)

export const parserExprBase = parserAtomEither([
    () => parserExprBool,
    () => parserExprInteger,
    () => parserExprVariable,
    parserExprParens,
    () => parserAtomError<ParserError>({ errorType: "TYBURN::EXPR_MISSING" })
].map(x => x(parserExprDeferred)))

export const parserExpr : Parser<ParserExpr, ParserError> = parserExprInfix({
    parserCurrent: parserExprPostfix({
        parserTop: parserExprDeferred,
        parserCurrent: parserExprPrefix({
            parserCurrent: parserExprBase
        })
    })
})
