import { parserUtilPredicate } from "@src/parse/parser/util/predicate"
import { parserUtilMany } from "@src/parse/parser/util/many"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilTry } from "@src/parse/parser/util/try"
import { parserUtilChar } from "@src/parse/parser/util/char"

export const parserWhitespace = parserUtilMap(
    parserUtilMany(
        parserUtilTry(
            parserUtilPredicate(parserUtilChar, {
                name: "WHITESPACE",
                test: c => /\s/.test(c)
            })
        )
    ),
    () => null
)
