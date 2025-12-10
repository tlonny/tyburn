import { parse } from "@src/parse/parse"
import { parserExprInfixMultiply } from "@src/parse/parser/expr/infix/multiply"
import { parserExprInteger } from "@src/parse/parser/expr/integer"
import type { Expr } from "@src/parse/parser/expr/type"
import type {
    ParseInput,
    ParseResultError,
    ParseResultFatal,
    ParseResultValue,
} from "@src/parse/type"
import { expect, test } from "bun:test"

const parser = parserExprInfixMultiply(parserExprInteger)

test("parserExprInfixMultiply builds a MULTIPLY expression and trims whitespace around the operator", () => {
    const input : ParseInput = { data: "   *   0xF00Dtail", index: 0 }
    const result = parse(parser, input) as ParseResultValue<(expr : Expr) => Expr>

    expect(result.resultType).toBe("VALUE")

    const leftOperand : Expr = {
        exprType: "INTEGER",
        base: "DECIMAL",
        value: "2"
    }
    const node = result.value(leftOperand)

    expect(node).toEqual({
        exprType: "MULTIPLY",
        operandLeft: leftOperand,
        operandRight: {
            exprType: "INTEGER",
            base: "HEXADECIMAL",
            value: "F00D"
        }
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("tail")
})

test("parserExprInfixMultiply reports an error without consuming input when the operator is missing", () => {
    const input : ParseInput = { data: "   next", index: 0 }
    const result = parse(parser, input) as ParseResultError

    expect(result.resultType).toBe("ERROR")
    expect(result.parsedInput.index).toBe(input.index)
})

test("parserExprInfixMultiply fatals when the operator is parsed but the right expression fails", () => {
    const input : ParseInput = { data: "*   ", index: 0 }
    const result = parse(parser, input) as ParseResultFatal

    expect(result.resultType).toBe("FATAL")
    expect(result.parsedInput.index).toBeGreaterThan(input.index)
})
