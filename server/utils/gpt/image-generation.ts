const templateOne =
  "Generate an image with a retrofuturistic style inspired by 1970s science-fiction posters of the following story :";
const templateTwo =
  "Generate an image in the poetic and dreamlike style of an impressionist painting of the following story :";
const templateThree =
  "Create an image with the dark and dramatic aesthetic of a 1920s German expressionist film of the following story :";
const templateFour =
  "Generate an image in a cinematic realism style with soft, dreamlike lighting, inspired by high-budget movie scenes and natural color grading. The atmosphere should feel immersive, with detailed textures, realistic shadows, and a subtle lens flare, as if captured by a film camera of the following story :";
const templateFive =
  "Generate a black and white illustration with the dramatic atmosphere of an independent graphic novel of the following story :";
const templateSix =
  "Generate an image in a modern minimalist illustration style — clean vector shapes, smooth gradients, and soft pastel tones — combining flat design with 3D-like depth through layered lighting and shadows, inspired by contemporary educational and tech illustrations of the following story :";
const templateSeven =
  "Generate an image with the cinematic aesthetic of a 1960s spaghetti western of the following story :";
const templateEight =
  "Generate a very realistic image of urban typology of the following story :";
const templateNine =
  "Create a very realistic and high quality image of the following story :";
const templates = [
  templateOne,
  templateTwo,
  templateThree,
  templateFour,
  templateFive,
  templateSix,
  templateSeven,
  templateEight,
  templateNine,
];

export const getPromptForImageGeneration = (prompt: string) => {
  const template = templates[Math.floor(Math.random() * templates.length)];
  const imagePrompt = `${template} ${prompt}`;
  return imagePrompt;
};
