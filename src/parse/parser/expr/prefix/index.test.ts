import { parse } from "@src/parse/parse"
import { parserExprPrefix } from "@src/parse/parser/expr/prefix/index"
import { parserExprInteger } from "@src/parse/parser/expr/integer"
import type { Expr } from "@src/parse/parser/expr/type"
import type {
    ParseInput,
    ParseResultFatal,
    ParseResultValue,
} from "@src/parse/type"
import { expect, test } from "bun:test"

test("parserExprPrefix chains multiple reference prefixes and handles whitespace", () => {
    const parser = parserExprPrefix({ parserCurrent: parserExprInteger })
    const input : ParseInput = { data: "&& & 123", index: 0, position: [0, 0] }
    const result = parse(parser, input) as ParseResultValue<Expr>

    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        exprType: "REFERENCE",
        value: {
            exprType: "REFERENCE",
            value: {
                exprType: "REFERENCE",
                value: {
                    exprType: "INTEGER",
                    base: "DECIMAL",
                    value: "123"
                }
            }
        }
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("")
})

test("parserExprPrefix combines different prefix operators in the correct order", () => {
    const parser = parserExprPrefix({ parserCurrent: parserExprInteger })
    const input : ParseInput = { data: "! &123", index: 0, position: [0, 0] }
    const result = parse(parser, input) as ParseResultValue<Expr>

    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        exprType: "NOT",
        value: {
            exprType: "REFERENCE",
            value: {
                exprType: "INTEGER",
                base: "DECIMAL",
                value: "123"
            }
        }
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("")
})

test("parserExprPrefix fatals when prefixes are parsed but the following expression fails", () => {
    const parser = parserExprPrefix({ parserCurrent: parserExprInteger })
    const input : ParseInput = { data: "&!", index: 0, position: [0, 0] }
    const result = parse(parser, input) as ParseResultFatal

    expect(result.resultType).toBe("FATAL")
    expect(result.parsedInput.index).toBeGreaterThan(0)
})
