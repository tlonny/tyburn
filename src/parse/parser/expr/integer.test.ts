import { parse } from "@src/parse/parse"
import { parserExprInteger } from "@src/parse/parser/expr/integer"
import type { ExprInteger } from "@src/parse/parser/expr/type"
import type {
    ParseInput,
    ParseResultError,
    ParseResultFatal,
    ParseResultValue,
} from "@src/parse/type"
import { expect, test } from "bun:test"

test("parserExprInteger parses a decimal literal with underscores", () => {
    const input : ParseInput = { data: "012_34__", index: 0 }
    const result = parse(parserExprInteger, input) as ParseResultValue<ExprInteger>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        exprType: "INTEGER",
        base: "DECIMAL",
        value: "012_34__",
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("")
})

test("parserExprInteger parses a hexadecimal literal with underscores", () => {
    const input : ParseInput = { data: "0xdead_beef_", index: 0 }
    const result = parse(parserExprInteger, input) as ParseResultValue<ExprInteger>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        exprType: "INTEGER",
        base: "HEXADECIMAL",
        value: "dead_beef_",
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("")
})

test("parserExprInteger stops decimal parsing once a non-digit is reached", () => {
    const input : ParseInput = { data: "12AB", index: 0 }
    const result = parse(parserExprInteger, input) as ParseResultValue<ExprInteger>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        exprType: "INTEGER",
        base: "DECIMAL",
        value: "12",
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("AB")
})

test("parserExprInteger errors when a decimal starts with an underscore", () => {
    const input : ParseInput = { data: "_12", index: 0 }
    const result = parse(parserExprInteger, input) as ParseResultError
    expect(result.resultType).toBe("ERROR")
    expect(result.parsedInput.index).toBe(0)
})

test("parserExprInteger fatals when a hexadecimal body starts with an underscore", () => {
    const input : ParseInput = { data: "0x_dead", index: 0 }
    const result = parse(parserExprInteger, input) as ParseResultFatal
    expect(result.resultType).toBe("FATAL")
    expect(input.data.slice(result.parsedInput.index)).toEqual("_dead")
})

test("parserExprInteger errors when the first character is not a digit or prefix", () => {
    const input : ParseInput = { data: "&", index: 0 }
    const result = parse(parserExprInteger, input) as ParseResultError
    expect(result.resultType).toBe("ERROR")
    expect(result.parsedInput.index).toBe(0)
})
