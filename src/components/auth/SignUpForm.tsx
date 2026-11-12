"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { toast } from "react-toastify";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLoader,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/app/lib/auth-client";
import type {
  SignUpFieldName as FieldName,
  SignUpValues as FormValues,
  SignUpErrors as FieldErrors,
} from "@/types";

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Ei order e first error wala field e focus jabe.
const fieldOrder: FieldName[] = [
  "name",
  "email",
  "password",
  "confirmPassword",
];

// Email check er simple pattern.
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Password er tin ta rule. Checklist ar validation dutoi ei list use kore.
const passwordRules = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    id: "uppercase",
    label: "One uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: "number",
    label: "One number",
    test: (value: string) => /[0-9]/.test(value),
  },
] as const;

// Input er common look. Error hole red tone hobe.
const inputBase =
  "w-full rounded-2xl border bg-surface text-sm text-ink shadow-sm shadow-navy/5 outline-none transition placeholder:text-ink/40 focus:ring-2 disabled:cursor-not-allowed disabled:bg-canvas";
const inputSize = "px-4 py-3";
const passwordSize = "py-3 pl-4 pr-12";

const inputTone = (invalid: boolean) =>
  invalid
    ? "border-red-300 focus:border-red-400 focus:ring-red-200"
    : "border-ink/15 focus:border-brand focus:ring-brand/25";

// Error text er choto reusable component.
const FieldErrorText = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => (
  <p
    id={id}
    role="alert"
    className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-600"
  >
    <FiAlertCircle aria-hidden="true" className="mt-px h-3.5 w-3.5 shrink-0" />
    <span>{children}</span>
  </p>
);

// Sob field ek sathe check kore error object banano hoy.
const getFieldErrors = (values: FormValues): FieldErrors => {
  const errors: FieldErrors = {};

  const name = values.name.trim();

  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 3) {
    errors.name = "Your name must be at least 3 characters.";
  }

  const email = values.email.trim();

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address, like you@example.com.";
  }

  if (!values.password) {
    errors.password = "Please create a password.";
  } else if (!passwordRules.every((rule) => rule.test(values.password))) {
    errors.password = "Please meet all three password requirements.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords don't match.";
  }

  return errors;
};

const SignUpForm = () => {
  const router = useRouter();

  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Error hole focus korar jonno input refs.
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const fieldRefs: Record<FieldName, RefObject<HTMLInputElement | null>> = {
    name: nameRef,
    email: emailRef,
    password: passwordRef,
    confirmPassword: confirmPasswordRef,
  };

  // Value change hole error live update hobe, but shudhu touched field e dekhabo.
  const fieldErrors = getFieldErrors(values);
  const errorFor = (field: FieldName) =>
    touched[field] || hasSubmitted ? fieldErrors[field] : undefined;

  const handleChange =
    (field: FieldName) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setValues((current) => ({ ...current, [field]: value }));
      setFormError(null);
    };

  const markTouched = (field: FieldName) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = getFieldErrors(values);

    setHasSubmitted(true);
    setFormError(null);

    // First invalid field e focus dao, jate user jane kothay problem.
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);

    if (firstInvalid) {
      fieldRefs[firstInvalid].current?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      // Better Auth e shudhu name, email ar password pathano hocche.
      const { data, error } = await authClient.signUp.email({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      if (error) {
        const message =
          error.code === "USER_ALREADY_EXISTS"
            ? "An account with this email already exists. Try signing in instead."
            : error.message ||
              "We couldn't create your account. Please try again.";

        setFormError(message);
        toast.error(message);
        setIsSubmitting(false);
        return;
      }

      // Sign up successful hole Better Auth nijei login kore dey.
      toast.success(
        `Welcome to ChangeNest, ${values.name.trim().split(/\s+/)[0]}!`,
      );
      router.push("/");
      router.refresh();
    } catch {
      const message =
        "Something went wrong while creating your account. Check your connection and try again.";

      setFormError(message);
      toast.error(message);
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setFormError(null);
    setIsGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        newUserCallbackURL: "/",
        errorCallbackURL: "/sign-up",
      });
    } catch {
      const message =
        "Something went wrong while connecting to Google. Check your connection and try again.";

      setFormError(message);
      toast.error(message);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const passwordError = errorFor("password");
  const confirmPasswordError = errorFor("confirmPassword");

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit}
        aria-busy={isSubmitting || isGoogleLoading}
        className="mt-8 space-y-5"
      >
        {/* Google diye sign up */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isSubmitting || isGoogleLoading}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-ink/15 bg-surface px-6 py-3.5 text-sm font-semibold text-ink shadow-sm shadow-navy/5 transition hover:-translate-y-0.5 hover:border-ink/25 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 motion-reduce:transform-none"
          >
            {isGoogleLoading ? (
              <>
                <FiLoader aria-hidden="true" className="h-4 w-4 animate-spin" />
                Connecting to Google...
              </>
            ) : (
              <>
                <FcGoogle aria-hidden="true" className="h-5 w-5" />
                Continue with Google
              </>
            )}
          </button>

          <div aria-hidden="true" className="mt-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-ink/10" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/40">
              or sign up with email
            </span>
            <span className="h-px flex-1 bg-ink/10" />
          </div>
        </div>

        {/* Server, network, ba Google error er alert */}
        {formError ? (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
          >
            <FiAlertCircle
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0"
            />
            <span>{formError}</span>
          </p>
        ) : null}

        {/* Full name */}
        <div>
          <label
            htmlFor="signup-name"
            className="text-sm font-semibold text-ink"
          >
            Full name
          </label>

          <input
            ref={nameRef}
            id="signup-name"
            name="name"
            type="text"
            required
            minLength={3}
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            onChange={handleChange("name")}
            onBlur={() => markTouched("name")}
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={
              errorFor("name") ? "signup-name-error" : undefined
            }
            className={`${inputBase} ${inputSize} mt-2 ${inputTone(
              Boolean(errorFor("name")),
            )}`}
          />

          {errorFor("name") ? (
            <FieldErrorText id="signup-name-error">
              {errorFor("name")}
            </FieldErrorText>
          ) : null}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="signup-email"
            className="text-sm font-semibold text-ink"
          >
            Email
          </label>

          <input
            ref={emailRef}
            id="signup-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange("email")}
            onBlur={() => markTouched("email")}
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={
              errorFor("email") ? "signup-email-error" : undefined
            }
            className={`${inputBase} ${inputSize} mt-2 ${inputTone(
              Boolean(errorFor("email")),
            )}`}
          />

          {errorFor("email") ? (
            <FieldErrorText id="signup-email-error">
              {errorFor("email")}
            </FieldErrorText>
          ) : null}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-semibold text-ink"
          >
            Password
          </label>

          <div className="relative mt-2 flex items-center">
            <input
              ref={passwordRef}
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={values.password}
              onChange={handleChange("password")}
              onBlur={() => markTouched("password")}
              aria-invalid={Boolean(passwordError)}
              aria-describedby={
                passwordError
                  ? "signup-password-rules signup-password-error"
                  : "signup-password-rules"
              }
              className={`${inputBase} ${passwordSize} ${inputTone(
                Boolean(passwordError),
              )} w-full pr-12`}
            />

            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-controls="signup-password"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-2.5 inset-y-0 my-auto flex h-9 w-9 items-center justify-center rounded-xl text-ink/45 transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {showPassword ? (
                <FiEyeOff aria-hidden="true" className="h-4 w-4" />
              ) : (
                <FiEye aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Live password checklist */}
          <ul
            id="signup-password-rules"
            className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5"
          >
            {passwordRules.map((rule) => {
              const met = rule.test(values.password);

              return (
                <li
                  key={rule.id}
                  className={`inline-flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
                    met ? "text-brand" : "text-ink/45"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${
                      met ? "bg-brand/15 text-brand" : "bg-ink/5 text-ink/35"
                    }`}
                  >
                    <FiCheck aria-hidden="true" className="h-2.5 w-2.5" />
                  </span>
                  {rule.label}
                </li>
              );
            })}
          </ul>

          {passwordError ? (
            <FieldErrorText id="signup-password-error">
              {passwordError}
            </FieldErrorText>
          ) : null}
        </div>

        {/* Confirm password */}
        <div>
          <label
            htmlFor="signup-confirm-password"
            className="text-sm font-semibold text-ink"
          >
            Confirm password
            <span aria-hidden="true" className="ml-0.5 text-brand">
              *
            </span>
          </label>

          <div className="relative">
            <input
              ref={confirmPasswordRef}
              id="signup-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              onBlur={() => markTouched("confirmPassword")}
              aria-invalid={Boolean(confirmPasswordError)}
              aria-describedby={
                confirmPasswordError
                  ? "signup-confirm-password-error"
                  : undefined
              }
              className={`${inputBase} ${passwordSize} mt-2 ${inputTone(
                Boolean(confirmPasswordError),
              )}`}
            />

            <button
              type="button"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              aria-controls="signup-confirm-password"
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-ink/45 transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {showConfirmPassword ? (
                <FiEyeOff aria-hidden="true" className="h-4 w-4" />
              ) : (
                <FiEye aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          </div>

          {confirmPasswordError ? (
            <FieldErrorText id="signup-confirm-password-error">
              {confirmPasswordError}
            </FieldErrorText>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isGoogleLoading}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-navy shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 motion-reduce:transform-none"
        >
          {isSubmitting ? (
            <>
              <FiLoader aria-hidden="true" className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <FiArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </>
          )}
        </button>

        <p className="text-center text-xs leading-5 text-ink/50">
          By creating an account, you agree to our{" "}
          <Link
            href="/terms"
            className="font-semibold text-ink/70 underline-offset-2 transition-colors hover:text-brand hover:underline"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-semibold text-ink/70 underline-offset-2 transition-colors hover:text-brand hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>

      <div className="mt-7 border-t border-ink/10 pt-6">
        <p className="text-center text-sm text-ink/60">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-brand underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
