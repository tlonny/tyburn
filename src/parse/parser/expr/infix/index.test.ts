import { parse } from "@src/parse/parse"
import { parserExprInfix } from "@src/parse/parser/expr/infix/index"
import { parserExprInteger } from "@src/parse/parser/expr/integer"
import type { Expr } from "@src/parse/parser/expr/type"
import type {
    ParseInput,
    ParseResultFatal,
    ParseResultValue,
} from "@src/parse/type"
import { expect, test } from "bun:test"

const parser = parserExprInfix({ parserCurrent: parserExprInteger })

test("parserExprInfix leaves the underlying parser output untouched when no operator is present", () => {
    const input : ParseInput = { data: "42tail", index: 0 }
    const result = parse(parser, input) as ParseResultValue<Expr>

    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        exprType: "INTEGER",
        base: "DECIMAL",
        value: "42"
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("tail")
})

test("parserExprInfix chains multiple multiply operators left-associatively", () => {
    const input : ParseInput = { data: "2*3*0x10next", index: 0 }
    const result = parse(parser, input) as ParseResultValue<Expr>

    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        exprType: "MULTIPLY",
        operandLeft: {
            exprType: "MULTIPLY",
            operandLeft: {
                exprType: "INTEGER",
                base: "DECIMAL",
                value: "2"
            },
            operandRight: {
                exprType: "INTEGER",
                base: "DECIMAL",
                value: "3"
            }
        },
        operandRight: {
            exprType: "INTEGER",
            base: "HEXADECIMAL",
            value: "10"
        }
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("next")
})

test("parserExprInfix propagates fatal errors from the underlying infix parsers", () => {
    const input : ParseInput = { data: "7*", index: 0 }
    const result = parse(parser, input) as ParseResultFatal
    expect(result.resultType).toBe("FATAL")
})
