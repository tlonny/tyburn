import { parse } from "@src/parse/parse"
import { parserExprReference } from "@src/parse/parser/expr/prefix/reference"
import type { Expr } from "@src/parse/parser/expr/type"
import type { ParseInput, ParseResultValue } from "@src/parse/type"
import { expect, test } from "bun:test"

const EXPR : Expr = {
    exprType: "INTEGER",
    base: "DECIMAL",
    value: "1"
}

test("parserExprReference parses the prefix and returns a wrapper fn", () => {
    const input : ParseInput = { data: "&foo", index: 0, position: [0, 0] }
    const result = parse(parserExprReference, input) as ParseResultValue<(expr : Expr) => Expr>
    expect(result.resultType).toBe("VALUE")

    expect(result.value(EXPR)).toEqual({
        exprType: "REFERENCE",
        value: EXPR
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("foo")
})
