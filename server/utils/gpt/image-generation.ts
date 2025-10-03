const templateOne = 'Generate an image with a retrofuturistic style inspired by 1970s science-fiction posters of the following story :'
const templateTwo = 'Generate an image in the poetic and dreamlike style of an impressionist painting of the following story :'
const templateThree = 'Create an image with the dark and dramatic aesthetic of a 1920s German expressionist film of the following story :'
const templateFour = 'Generate an illustration in the clean and colorful style of a contemporary children\'s book of the following story :'
const templateFive = 'Generate a black and white illustration with the dramatic atmosphere of an independent graphic novel of the following story :'
const templateSix = 'Produce an image in the minimalist and graphic style of a Bauhaus poster of the following story :'
const templateSeven = 'Generate an image with the cinematic aesthetic of a 1960s spaghetti western of the following story :'
const templateEight = 'Generate a very realistic image of urban typology of the following story :'
const templateNine = 'Create a very realistic and high quality image of the following story :'
const templates = [templateOne, templateTwo, templateThree, templateFour, templateFive, templateSix, templateSeven, templateEight, templateNine]

export const getPromptForImageGeneration = (prompt: string) => {
const template = templates[Math.floor(Math.random() * templates.length)]
  const imagePrompt = `${template} ${prompt}`
  return imagePrompt
}