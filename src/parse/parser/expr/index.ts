import { parserExprBool } from "@src/parse/parser/expr/bool"
import { parserExprInfix } from "@src/parse/parser/expr/infix"
import { parserExprInteger } from "@src/parse/parser/expr/integer"
import { parserExprParens } from "@src/parse/parser/expr/parens"
import { parserExprPostfix } from "@src/parse/parser/expr/postfix"
import { parserExprPrefix } from "@src/parse/parser/expr/prefix"
import type { Expr } from "@src/parse/parser/expr/type"
import { parserExprVariable } from "@src/parse/parser/expr/variable"
import { parserUtilEither } from "@src/parse/parser/util/either"
import { parserUtilError } from "@src/parse/parser/util/error"
import type { ParseInput, Parser } from "@src/parse/type"

const parserExprDeferred = (x : ParseInput) => parserExpr(x)

const parserExprBaseEither = (params : {
    parserTop: Parser<Expr>
}) => parserUtilEither([
    () => parserExprBool,
    () => parserExprInteger,
    () => parserExprVariable,
    parserExprParens,
    () => parserUtilError<Expr>("Expected: expression")
].map(x => x(params.parserTop)))

export const parserExpr : Parser<Expr> = parserExprInfix({
    parserCurrent: parserExprPostfix({
        parserTop: parserExprDeferred,
        parserCurrent: parserExprPrefix({
            parserCurrent: parserExprBaseEither({
                parserTop: parserExprDeferred
            })
        })
    })
})
