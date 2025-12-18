import { parserStatement } from "@src/parser/statement"
import { parserStatementBlock } from "@src/parser/statement/block"
import { parserAtomEnd, parserAtomMapValue, parserAtomSequence } from "astroparse"

export const parser = parserAtomMapValue(
    parserAtomSequence([
        parserStatementBlock({ parserStatement }),
        parserAtomEnd
    ]),
    ([block,]) => block
)
