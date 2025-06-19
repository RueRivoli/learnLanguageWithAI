import turkeyFlag from "~/assets/img/turkish.png";
import franceFlag from "~/assets/img/french.png";
import spanishFlag from "~/assets/img/spanish.png";
import italianFlag from "~/assets/img/italian.png";
import japaneseFlag from "~/assets/img/japanese.png";
import russianFlag from "~/assets/img/russian.png";

export const languages = [
  { code: "tr", label: "Turkish", imgSrc: turkeyFlag, activated: true },
  { code: "fr", label: "French", imgSrc: franceFlag, activated: true },
  { code: "es", label: "Spanish", imgSrc: spanishFlag, activated: true },
  { code: "it", label: "Italian", imgSrc: italianFlag, activated: false },
  { code: "rs", label: "Russian", imgSrc: russianFlag, activated: false },
  { code: "jp", label: "Japanese", imgSrc: japaneseFlag, activated: false },
];

export const rulesNames = {
  tr: [
    { title: "Ünlü Uyumu", titleEn: "Vocal harmony" },
    { title: "Ünsüz Uyumu", titleEn: "Consonant harmony" },
    { title: "İlgeçler", titleEn: "Postpositions" },
    { title: "Eylem belirteçleri", titleEn: "Verbal modifiers" },
    { title: "gün (ki...)", titleEn: "The day that ..." },
    { title: "Dilek kipi", titleEn: "Optative mood" },
    { title: "Istek kipi", titleEn: "sin" },
  ],
  fr: [
    { title: "Présent indicatif", titleEn: "Present tense" },
    { title: "Groupe nominale", titleEn: "Noun compound" },
    { title: "Adjectif qualificatif", titleEn: "Adjective" },
    { title: "Accents", titleEn: "accents" },
    { title: "Impératif", titleEn: "Imperativ" },
  ],
  es: [
    { title: "Ukzegjkegz", titleEn: "gzeklkgez" },
    { title: "egezgezkzl", titleEn: "gjkge" },
    { title: "hgzeegz;", titleEn: "fez" },
    { title: "ekzl", titleEn: "fezfezefz" },
    { title: "ekzl", titleEn: "fezfezfez" },
  ],
  it: [
    { title: "Ukzegjkegz", titleEn: "gzeklkgez" },
    { title: "egezgezkzl", titleEn: "gjkge" },
    { title: "hgzeegz;", titleEn: "fez" },
    { title: "ekzl", titleEn: "fezfezefz" },
    { title: "ekzl", titleEn: "fezfezfez" },
  ],
  jp: [
    { title: "Ukzegjkegz", titleEn: "gzeklkgez" },
    { title: "egezgezkzl", titleEn: "gjkge" },
    { title: "hgzeegz;", titleEn: "fez" },
    { title: "ekzl", titleEn: "fezfezefz" },
    { title: "ekzl", titleEn: "fezfezfez" },
  ],
  rs: [
    { title: "Ukzegjkegz", titleEn: "gzeklkgez" },
    { title: "egezgezkzl", titleEn: "gjkge" },
    { title: "hgzeegz;", titleEn: "fez" },
    { title: "ekzl", titleEn: "fezfezefz" },
    { title: "ekzl", titleEn: "fezfezfez" },
  ],
};
