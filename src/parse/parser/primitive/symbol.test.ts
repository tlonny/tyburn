import { parse } from "@src/parse/parse"
import { parserSymbolQualified } from "@src/parse/parser/primitive/symbol"
import type {
    ParseInput,
    ParseResultError,
    ParseResultFatal,
    ParseResultValue,
} from "@src/parse/type"
import { test, expect } from "bun:test"

test("parserSymbol correctly parses a simple symbol", () => {
    const input : ParseInput = { data: "helloworld_12-3", index: 0, position: [0, 0] }
    const result = parse(parserSymbolQualified, input) as ParseResultValue<string>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual("helloworld_12")
    expect(input.data.slice(result.parsedInput.index)).toEqual("-3")
})

test("parserSymbol correctly parses a scoped symbol", () => {
    const input : ParseInput = { data: "hello::w::orld_12-3", index: 0, position: [0, 0] }
    const result = parse(parserSymbolQualified, input) as ParseResultValue<string>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual("hello::w::orld_12")
    expect(input.data.slice(result.parsedInput.index)).toEqual("-3")
})

test("parserSymbol rejects a simple symbol with an invalid start char", () => {
    const input : ParseInput = { data: "0hello", index: 0, position: [0, 0] }
    const result = parse(parserSymbolQualified, input) as ParseResultError
    expect(result.resultType).toBe("ERROR")
    expect(result.parsedInput.index).toEqual(0)
})

test("parserSymbol rejects a scoped symbol with an invalid chunk start char", () => {
    const input : ParseInput = { data: "hello::0world", index: 0, position: [0, 0] }
    const result = parse(parserSymbolQualified, input) as ParseResultFatal
    expect(result.resultType).toBe("FATAL")
    expect(input.data.slice(result.parsedInput.index)).toEqual("0world")
})

test("parserSymbol rejects a scoped symbol with an empty end chunk", () => {
    const input : ParseInput = { data: "hello::", index: 0, position: [0, 0] }
    const result = parse(parserSymbolQualified, input) as ParseResultFatal
    expect(result.resultType).toBe("FATAL")
    expect(input.data.slice(result.parsedInput.index)).toEqual("")
})

test("parserSymbol parses a scoped symbol that ends with an incomplete delimeter", () => {
    const input : ParseInput = { data: "hello::mate:", index: 0, position: [0, 0] }
    const result = parse(parserSymbolQualified, input) as ParseResultValue<string>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual("hello::mate")
    expect(input.data.slice(result.parsedInput.index)).toEqual(":")
})
