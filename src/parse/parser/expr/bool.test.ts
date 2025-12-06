import { parse } from "@src/parse/parse"
import { parserExprBool } from "@src/parse/parser/expr/bool"
import type { ExprBool } from "@src/parse/parser/expr/type"
import type {
    ParseInput,
    ParseResultError,
    ParseResultValue,
} from "@src/parse/type"
import { test, expect } from "bun:test"

test("parserExprBool correctly parses true", () => {
    const input : ParseInput = { data: "true!", index: 0, position: [0, 0] }
    const result = parse(parserExprBool, input) as ParseResultValue<ExprBool>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({ exprType: "BOOL", value: "TRUE" })
    expect(input.data.slice(result.parsedInput.index)).toEqual("!")
})

test("parserExprBool correctly parses false", () => {
    const input : ParseInput = { data: "false!", index: 0, position: [0, 0] }
    const result = parse(parserExprBool, input) as ParseResultValue<ExprBool>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({ exprType: "BOOL", value: "FALSE" })
    expect(input.data.slice(result.parsedInput.index)).toEqual("!")
})

test("parserExprBool correctly errors with a partial match", () => {
    const input : ParseInput = { data: "falsd", index: 0, position: [0, 0] }
    const result = parse(parserExprBool, input) as ParseResultError
    expect(result.resultType).toBe("ERROR")
    expect(input.data.slice(result.parsedInput.index)).toEqual("falsd")
})

test("parserExprBool correctly errors with no match", () => {
    const input : ParseInput = { data: "ppp", index: 0, position: [0, 0] }
    const result = parse(parserExprBool, input) as ParseResultError
    expect(result.resultType).toBe("ERROR")
    expect(input.data.slice(result.parsedInput.index)).toEqual("ppp")
})
