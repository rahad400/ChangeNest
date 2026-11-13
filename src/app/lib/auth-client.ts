import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";


// Ekta client thekei sign in, sign up ar session use hobe.
// Same origin e API ache, tai alada baseURL lagche na.
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;

 export const autClient = createAuthClient({
  plugins: [jwtClient()],
});
