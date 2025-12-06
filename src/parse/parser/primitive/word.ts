import { parserUtilChar } from "@src/parse/parser/util/char"
import { parserUtilValue } from "@src/parse/parser/util/value"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import { parserUtilTry } from "@src/parse/parser/util/try"

export const parserWord = <T extends string>(
    word : T
) =>
        parserUtilMap(
            parserUtilTry(
                [...word]
                    .map(char => parserUtilChar({
                        name: `CHAR::${char}`,
                        test: c => c === char
                    }))
                    .reduce(
                        (acc, p) => parserUtilMap(
                            parserUtilSequence(acc, p), () => null
                        ),
                        parserUtilValue(null)
                    )
            ),
            () => word
        )
