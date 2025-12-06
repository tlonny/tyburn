import { parse } from "@src/parse/parse"
import { parserExprPostfix } from "@src/parse/parser/expr/postfix"
import { parserExprInteger } from "@src/parse/parser/expr/integer"
import type { Expr } from "@src/parse/parser/expr/type"
import type {
    ParseInput,
    ParseResultFatal,
    ParseResultValue,
} from "@src/parse/type"
import { expect, test } from "bun:test"
import { parserExpr } from "@src/parse/parser/expr"

test("parserExprPostfix chains multiple subscript postfixes and handles whitespace", () => {
    const parser = parserExprPostfix({
        parserTop: parserExpr,
        parserCurrent: parserExprInteger
    })

    const input : ParseInput = { data: "123 [ 0 ]   [ 1 ] tail", index: 0, position: [0, 0] }
    const result = parse(parser, input) as ParseResultValue<Expr>

    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        exprType: "SUBSCRIPT",
        index: {
            exprType: "INTEGER",
            base: "DECIMAL",
            value: "1"
        },
        value: {
            exprType: "SUBSCRIPT",
            index: {
                exprType: "INTEGER",
                base: "DECIMAL",
                value: "0"
            },
            value: {
                exprType: "INTEGER",
                base: "DECIMAL",
                value: "123"
            }
        }
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual(" tail")
})

test("parserExprPostfix fatals when a postfix parser consumes input but fails", () => {
    const parser = parserExprPostfix({
        parserTop: parserExpr,
        parserCurrent: parserExprInteger
    })

    const input : ParseInput = { data: "123[", index: 0, position: [0, 0] }
    const result = parse(parser, input) as ParseResultFatal

    expect(result.resultType).toBe("FATAL")
    expect(result.parsedInput.index).toBeGreaterThan(0)
})
