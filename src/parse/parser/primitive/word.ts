import { parserUtilChar } from "@src/parse/parser/util/char"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import { parserUtilTry } from "@src/parse/parser/util/try"

export const parserWord = <T extends string>(
    word : T
) =>
        parserUtilMap(
            parserUtilTry(
                parserUtilSequence(
                    [...word]
                        .map(char => parserUtilChar({
                            name: `CHAR::${char}`,
                            test: c => c === char
                        }))
                )
            ),
            () => word
        )
