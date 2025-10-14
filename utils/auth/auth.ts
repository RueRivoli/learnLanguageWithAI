import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
  // password: z
  //   .string()
  //   .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/, {
  //     message:
  //       "Invalid password : 8 caractères min., at least one letter, one number and a special character: -_:!@#$%^&*() are required",
  //   }),
  password: z.string(),
});

export type Schema = z.InferOutput<typeof schema>;

export const getEmailPasswordInvalidityMessage = (
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
      return "Please input a valid password: \n more than 8 characters with at least 1 number, 1 letter and 1 special character: -_:!@#$%^&*()";
    }
  }
};

// Probably to delete, same function as above
export const testValidEmailPassword = (state: Schema) => {
    console.log("test email and password");
    if (schema.safeParse(state).success) {
      console.log("email/pswd correct");
      return true;
    } else {
      console.log("sth invalid");
      if (!z.string().email().safeParse(state.email).success) {
        console.log("email invalid");
        connexionError.value = "Please input a valid email";
      } else {
        console.log("psswd invalid");
        connexionError.value =
          "Please input a valid password: more than 8 characters, 1 number, 1 letter and 1 special character";
      }
  
      return false;
    }
  };


  export const getAuthToken = async () => {
    const { data: { session } } = await useSupabaseClient().auth.getSession();
    console.log("session", session);
    const headers: Record<string, string> = {};
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
    return headers;
  }