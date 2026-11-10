import { createAuthClient } from "better-auth/react";

// Ekta client thekei sign in, sign up ar session use hobe.
// Same origin e API ache, tai alada baseURL lagche na.
export const authClient = createAuthClient();

export const { signIn, signUp, useSession } = authClient;
