import { parse } from "@src/parse/parse"
import type {
    ParseInput,
    ParseResultValue,
} from "@src/parse/type"
import { test, expect } from "bun:test"
import type { StatementComment } from "@src/parse/parser/statement/type"
import { parserStatementComment } from "@src/parse/parser/statement/comment"

test("parserStatementComment parses a comment", () => {
    const input : ParseInput = { data: "#this#is a comment", index: 0, position: [0, 0] }
    const result = parse(parserStatementComment, input) as ParseResultValue<StatementComment>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        statementType: "COMMENT",
        comment: "this#is a comment"
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("")
})

test("parserStatementComment parses a comment terminated by a newline #1", () => {
    const input : ParseInput = { data: "#this is a comment\nyes", index: 0, position: [0, 0] }
    const result = parse(parserStatementComment, input) as ParseResultValue<StatementComment>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        statementType: "COMMENT",
        comment: "this is a comment"
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("\nyes")
})

test("parserStatementComment parses a comment terminated by a newline #2", () => {
    const input : ParseInput = { data: "#this is a comment\r\nyes", index: 0, position: [0, 0] }
    const result = parse(parserStatementComment, input) as ParseResultValue<StatementComment>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        statementType: "COMMENT",
        comment: "this is a comment"
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("\r\nyes")
})
