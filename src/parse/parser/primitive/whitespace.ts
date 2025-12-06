import { parserUtilChar } from "@src/parse/parser/util/char"
import { parserUtilMany } from "@src/parse/parser/util/many"
import { parserUtilMap } from "@src/parse/parser/util/map"

export const parserWhitespace = parserUtilMap(
    parserUtilMany(
        parserUtilChar({
            name: "WHITESPACE",
            test: c => /\s/.test(c)
        })
    ),
    () => null
)
