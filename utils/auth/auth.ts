import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/, {
      message:
        "Invalid password : 8 caractères min., at least one letter, one number and a special character are required",
    }),
});

type Schema = z.InferOutput<typeof schema>;

export const checkIfEmailPasswordCorrectFormat = (
  state: Schema,
): null | string => {
  console.log("Auth.ts ==> check email and password");
  if (schema.safeParse(state).success) {
    console.log("auth.ts : email/pswd correct");
    return null;
  } else {
    console.log("sth invalid");
    if (!z.string().email().safeParse(state.email).success) {
      console.log("email invalid");
      return "Please input a valid email";
    } else {
      console.log("psswd invalid");
      return "Please input a valid password: more than 8 characters, 1 number, 1 letter and 1 special character";
    }
  }
};
