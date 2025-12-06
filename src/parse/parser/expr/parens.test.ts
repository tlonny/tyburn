import { parse } from "@src/parse/parse"
import { parserExprParens } from "@src/parse/parser/expr/parens"
import { parserExpr } from "@src/parse/parser/expr"
import type { Expr } from "@src/parse/parser/expr/type"
import type {
    ParseInput,
    ParseResultError,
    ParseResultFatal,
    ParseResultValue,
} from "@src/parse/type"
import { expect, test } from "bun:test"

const parser = parserExprParens(parserExpr)

test("parserExprParens unwraps the expression inside parentheses", () => {
    const input : ParseInput = { data: "(123)tail", index: 0, position: [0, 0] }
    const result = parse(parser, input) as ParseResultValue<Expr>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        exprType: "INTEGER",
        base: "DECIMAL",
        value: "123"
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("tail")
})

test("parserExprParens allows whitespace and nested parentheses", () => {
    const input : ParseInput = { data: "(   (0xdead)   )next", index: 0, position: [0, 0] }
    const result = parse(parser, input) as ParseResultValue<Expr>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        exprType: "INTEGER",
        base: "HEXADECIMAL",
        value: "dead"
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("next")
})

test("parserExprParens errors when the opening token is missing", () => {
    const input : ParseInput = { data: "123)", index: 0, position: [0, 0] }
    const result = parse(parser, input) as ParseResultError
    expect(result.resultType).toBe("ERROR")
    expect(result.parsedInput.index).toBe(0)
})

test("parserExprParens fatals when the closing parenthesis is missing", () => {
    const input : ParseInput = { data: "(123", index: 0, position: [0, 0] }
    const result = parse(parser, input) as ParseResultFatal
    expect(result.resultType).toBe("FATAL")
})
