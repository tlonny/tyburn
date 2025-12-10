import { parse } from "@src/parse/parse"
import type { ParseInput } from "@src/parse/type"
import { parserBlock } from "@src/parse/parser/statement/block"
import { parserStatement } from "@src/parse/parser/statement"

const input : ParseInput = {
    data: `
        loop {
            # this is a comment
            var foo;
        }`,
    index: 0
}

console.log(
    JSON.stringify(
        parse(parserBlock({ parserStatement }), input),
        null, 4
    )
)
