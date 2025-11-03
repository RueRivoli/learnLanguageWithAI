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
  if (schema.safeParse(state).success) {
    return null;
  } else {
    if (!z.string().email().safeParse(state.email).success) {
      return "Please input a valid email";
    } else {
      return "Please input a valid password: \n more than 8 characters with at least 1 number, 1 letter and 1 special character: -_:!@#$%^&*()";
    }
  }
};

// Probably to delete, same function as above
export const testValidEmailPassword = (state: Schema) => {
  if (schema.safeParse(state).success) {
    return true;
  } else {
    if (!z.string().email().safeParse(state.email).success) {
      connexionError.value = "Please input a valid email";
    } else {
      connexionError.value =
        "Please input a valid password: more than 8 characters, 1 number, 1 letter and 1 special character";
    }
    return false;
  }
};

export const getAuthToken = async () => {
  const {
    data: { session },
  } = await useSupabaseClient().auth.getSession();
  const headers: Record<string, string> = {};
  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }
  return headers;
};
