import type { Expr } from "@src/parse/parser/expr/type"
import type { Parser } from "@src/parse/type"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserSymbolQualified } from "@src/parse/parser/primitive/symbol"

export const parserExprVariable : Parser<Expr> = parserUtilMap(
    parserSymbolQualified,
    x => ({
        exprType: "VARIABLE",
        value: x
    })
)

