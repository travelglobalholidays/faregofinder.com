"use client";

import { useAuth } from "@/context/AuthContext";
import { Loader2, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputWrap =
  "flex items-center rounded-lg border border-subtle bg-light-grey px-3 py-3 transition focus-within:border-blue";

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      setLoading(true);
      await register(form);
      router.push("/login?registered=true");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-subtle bg-white p-8 shadow-theme">
      <div className="text-center">
        <Link
          className="font-poppins-semibold text-3xl text-blue flex items-center justify-center"
          href="/"
        >
          <Image
            src="/images/logo.png"
            alt="FaresGoFinder logo"
            width={100}
            height={100}
          />
        </Link>
        <h1 className="mt-6 font-poppins-semibold text-2xl text-heading">
          Create Account
        </h1>
        <p className="mt-2 text-sm text-light">
          Register to book flights and manage trips.
        </p>
      </div>

      {error && (
        <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-poppins-medium text-heading">
            Full Name
          </span>
          <span className={inputWrap}>
            <User className="mr-2 size-4 text-light" />
            <input
              className="w-full bg-transparent text-sm text-heading outline-none"
              onChange={(event) => update("name", event.target.value)}
              placeholder="Enter your full name"
              required
              value={form.name}
            />
          </span>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-poppins-medium text-heading">
            Email Address
          </span>
          <span className={inputWrap}>
            <Mail className="mr-2 size-4 text-light" />
            <input
              className="w-full bg-transparent text-sm text-heading outline-none"
              onChange={(event) => update("email", event.target.value)}
              placeholder="Enter your email"
              required
              type="email"
              value={form.email}
            />
          </span>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-poppins-medium text-heading">
            Password
          </span>
          <span className={inputWrap}>
            <Lock className="mr-2 size-4 text-light" />
            <input
              className="w-full bg-transparent text-sm text-heading outline-none"
              minLength={6}
              onChange={(event) => update("password", event.target.value)}
              placeholder="Create a password"
              required
              type="password"
              value={form.password}
            />
          </span>
        </label>
        <button
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue py-3 font-poppins-semibold text-white transition hover:bg-blue-dark disabled:opacity-60"
          disabled={loading}
          type="submit"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-light">
        Already have an account?{" "}
        <Link className="font-poppins-semibold text-blue" href="/login">
          Sign in
        </Link>
      </p>
    </div>
  );
}
