import { parserUtilPredicate } from "@src/parse/parser/util/predicate"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import { parserUtilTry } from "@src/parse/parser/util/try"
import { parserUtilChar } from "@src/parse/parser/util/char"

export const parserWord = <T extends string>(word : T) => parserUtilMap(
    parserUtilTry(
        parserUtilSequence(
            [...word]
                .map(char => parserUtilTry(
                    parserUtilPredicate(parserUtilChar, {
                        name: `CHAR::${char}`,
                        test: (c : string) => c === char
                    })
                ))
        )
    ),
    () => word
)
