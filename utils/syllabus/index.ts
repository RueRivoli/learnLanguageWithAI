import turkeyFlag from "~/assets/img/language/turkish.png";
import franceFlag from "~/assets/img/language/french.png";
import spanishFlag from "~/assets/img/language/spanish.png";
import italianFlag from "~/assets/img/language/italian.png";
import japaneseFlag from "~/assets/img/language/japanese.png";
import russianFlag from "~/assets/img/language/russian.png";
import { turkishRules } from "./turkish";
import { frenchRules } from "./french";
import { spanishRules } from "./spanish";
import { italianRules } from "./italian";
import { japaneseRules } from "./japanese";
import { germanRules } from "./german";

export const languages = [
  { code: "tr", label: "Turkish", imgSrc: turkeyFlag, activated: true },
  { code: "fr", label: "French", imgSrc: franceFlag, activated: false },
  { code: "sp", label: "Spanish", imgSrc: spanishFlag, activated: false },
  // { code: "it", label: "Italian", imgSrc: italianFlag, activated: false },
  // { code: "rs", label: "Russian", imgSrc: russianFlag, activated: false },
  // { code: "jp", label: "Japanese", imgSrc: japaneseFlag, activated: false },
];

export const rulesNames = {
  tr: turkishRules,
  fr: frenchRules,
  sp: spanishRules,
  it: italianRules,
  jp: japaneseRules,
  ge: germanRules,
};
