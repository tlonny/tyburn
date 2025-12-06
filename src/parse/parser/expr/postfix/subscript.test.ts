import { parse } from "@src/parse/parse"
import { parserExprPostfixSubscript } from "@src/parse/parser/expr/postfix/subscript"
import type { Expr } from "@src/parse/parser/expr/type"
import type {
    ParseInput,
    ParseResultError,
    ParseResultFatal,
    ParseResultValue,
} from "@src/parse/type"
import { expect, test } from "bun:test"
import { parserExpr } from "@src/parse/parser/expr"

const EXPR : Expr = {
    exprType: "INTEGER",
    base: "DECIMAL",
    value: "1"
}

const parser = parserExprPostfixSubscript(parserExpr)

test("parserExprPostfixSubscript parses a subscript and returns a wrapper fn", () => {
    const input : ParseInput = { data: "[0]tail", index: 0, position: [0, 0] }
    const result = parse(parser, input) as ParseResultValue<(expr : Expr) => Expr>
    expect(result.resultType).toBe("VALUE")

    expect(result.value(EXPR)).toEqual({
        exprType: "SUBSCRIPT",
        value: EXPR,
        index: {
            exprType: "INTEGER",
            base: "DECIMAL",
            value: "0"
        }
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("tail")
})

test("parserExprPostfixSubscript handles whitespace around the index expression", () => {
    const input : ParseInput = { data: "[   123   ]next", index: 0, position: [0, 0] }
    const result = parse(parser, input) as ParseResultValue<(expr : Expr) => Expr>
    expect(result.resultType).toBe("VALUE")
    expect(input.data.slice(result.parsedInput.index)).toEqual("next")

    expect(result.value(EXPR)).toEqual({
        exprType: "SUBSCRIPT",
        value: EXPR,
        index: {
            exprType: "INTEGER",
            base: "DECIMAL",
            value: "123"
        }
    })
})

test("parserExprPostfixSubscript errors when the postfix token is missing", () => {
    const input : ParseInput = { data: "foo", index: 0, position: [0, 0] }
    const result = parse(parser, input) as ParseResultError
    expect(result.resultType).toBe("ERROR")
    expect(result.parsedInput.index).toBe(0)
})

test("parserExprPostfixSubscript fatals when the closing bracket is missing", () => {
    const input : ParseInput = { data: "[0", index: 0, position: [0, 0] }
    const result = parse(parser, input) as ParseResultFatal
    expect(result.resultType).toBe("FATAL")
})
