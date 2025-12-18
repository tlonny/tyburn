import type { ParseInput } from "astroparse"
import { parser } from "@src/parser"

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

const result = parser(input)

if (result.success) {
    console.log(JSON.stringify(result.value, null, 4))
} else {
    console.error(result.error.errorType)
    console.log([
        result.input.data.slice(0, result.input.cursor),
        ">>>",
        result.input.data.slice(result.input.cursor)
    ].join(""))
}
