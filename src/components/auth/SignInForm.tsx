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
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLock,
  FiMail,
  FiShield,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/app/lib/auth-client";

type FieldName = "email" | "password";

type FormValues = Record<FieldName, string>;

type FieldErrors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = {
  email: "",
  password: "",
};

// Ei order e first error wala field e focus jabe.
const fieldOrder: FieldName[] = ["email", "password"];

// Email check er simple pattern.
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Input er common look. Error hole red tone hobe.
const inputBase =
  "w-full rounded-2xl border bg-white text-sm text-ink shadow-sm shadow-ink/5 outline-none transition placeholder:text-ink/40 focus:ring-2 disabled:cursor-not-allowed disabled:bg-canvas";
const inputWithIcon = "py-3 pl-11 pr-4";
const passwordSize = "py-3 pl-11 pr-12";

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

// Sign in e email ar password chara extra rule lagbe na.
const getFieldErrors = (values: FormValues): FieldErrors => {
  const errors: FieldErrors = {};
  const email = values.email.trim();

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address, like you@example.com.";
  }

  if (!values.password) {
    errors.password = "Please enter your password.";
  }

  return errors;
};

const SignInForm = () => {
  const router = useRouter();

  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Error hole focus korar jonno input refs.
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const fieldRefs: Record<FieldName, RefObject<HTMLInputElement | null>> = {
    email: emailRef,
    password: passwordRef,
  };

  // Value change hole error live update hobe, but shudhu touched field e dekhabo.
  const fieldErrors = getFieldErrors(values);
  const errorFor = (field: FieldName) =>
    touched[field] || hasSubmitted ? fieldErrors[field] : undefined;

  const handleChange =
    (field: FieldName) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      setFormError(null);
    };

  const markTouched = (field: FieldName) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting || isGoogleLoading) return;

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
      const { error } = await authClient.signIn.email({
        email: values.email.trim(),
        password: values.password,
        rememberMe,
        callbackURL: "/",
      });
      toast.success("Welcome back to ChangeNest!");
      router.replace("/");
      router.refresh();
    } catch {
      const message =
        "Something went wrong while signing you in. Check your connection and try again.";

      setFormError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isSubmitting || isGoogleLoading) return;

    setFormError(null);
    setIsGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/sign-in",
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

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit}
        aria-busy={isSubmitting || isGoogleLoading}
        className="mt-8 space-y-5"
      >
        {/* Google diye sign in */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting || isGoogleLoading}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-sm shadow-ink/5 transition hover:-translate-y-0.5 hover:border-ink/25 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 motion-reduce:transform-none"
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
              or sign in with email
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

        {/* Email */}
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-semibold text-ink"
          >
            Email
            <span aria-hidden="true" className="ml-0.5 text-brand">
              *
            </span>
          </label>

          <div className="relative mt-2">
            <FiMail
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35"
            />
            <input
              ref={emailRef}
              id="signin-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              spellCheck={false}
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange("email")}
              onBlur={() => markTouched("email")}
              aria-invalid={Boolean(errorFor("email"))}
              aria-describedby={
                errorFor("email") ? "signin-email-error" : undefined
              }
              className={`${inputBase} ${inputWithIcon} ${inputTone(
                Boolean(errorFor("email")),
              )}`}
            />
          </div>

          {errorFor("email") ? (
            <FieldErrorText id="signin-email-error">
              {errorFor("email")}
            </FieldErrorText>
          ) : null}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="signin-password"
              className="text-sm font-semibold text-ink"
            >
              Password
              <span aria-hidden="true" className="ml-0.5 text-brand">
                *
              </span>
            </label>

            <Link
              href="/contact"
              className="text-xs font-semibold text-ink/60 underline-offset-2 transition-colors hover:text-brand hover:underline"
            >
              Trouble signing in?
            </Link>
          </div>

          <div className="relative mt-2">
            <FiLock
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35"
            />
            <input
              ref={passwordRef}
              id="signin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange("password")}
              onBlur={() => markTouched("password")}
              aria-invalid={Boolean(passwordError)}
              aria-describedby={
                passwordError ? "signin-password-error" : undefined
              }
              className={`${inputBase} ${passwordSize} ${inputTone(
                Boolean(passwordError),
              )}`}
            />

            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-controls="signin-password"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-ink/45 transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {showPassword ? (
                <FiEyeOff aria-hidden="true" className="h-4 w-4" />
              ) : (
                <FiEye aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          </div>

          {passwordError ? (
            <FieldErrorText id="signin-password-error">
              {passwordError}
            </FieldErrorText>
          ) : null}
        </div>

        {/* Remember me */}
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="signin-remember"
            className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-ink/65"
          >
            <input
              id="signin-remember"
              name="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-4 w-4 rounded border-ink/25 accent-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            />
            Remember me
          </label>

          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/60">
            <FiShield aria-hidden="true" className="h-3.5 w-3.5 text-brand" />
            Secure sign-in
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isGoogleLoading}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 motion-reduce:transform-none"
        >
          {isSubmitting ? (
            <>
              <FiLoader aria-hidden="true" className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <FiArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </>
          )}
        </button>
      </form>

      <div className="mt-7 border-t border-ink/10 pt-6">
        <p className="text-center text-sm text-ink/60">
          New to ChangeNest?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-brand underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
