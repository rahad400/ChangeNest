// Sign in form field definitions
export type SignInFieldName = "email" | "password";
export type SignInValues = Record<SignInFieldName, string>;
export type SignInErrors = Partial<Record<SignInFieldName, string>>;

// Sign up form field definitions
export type SignUpFieldName =
  | "name"
  | "email"
  | "password"
  | "confirmPassword";
export type SignUpValues = Record<SignUpFieldName, string>;
export type SignUpErrors = Partial<Record<SignUpFieldName, string>>;

// User model for profiles and sessions
export type UserProfile = {
  name: string;
  email: string;
  image?: string | null;
};

// Profile page form props
export type ProfileFormProps = {
  user: UserProfile;
  memberSince: string;
};

// Avatar component props
export type UserAvatarProps = {
  name: string;
  image?: string | null;
  className?: string;
};
