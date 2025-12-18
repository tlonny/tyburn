import { parserBlock } from "@src/parser/statement/block"
import { parserStatement } from "@src/parser/statement"
import type { ParseInput } from "astroparse"

const input : ParseInput = {
    data: `
        #!(pragma: inline)
        while (false) {
            # this is a comment
            while((x[5] * 3)) { break; }
            var foo;
        }`,
    cursor: 0
}

console.log(
    JSON.stringify(
        parserBlock({ parserStatement })(input),
        null, 4
    )
)
