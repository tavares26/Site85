"use client";

import type { ComponentProps } from "react";

type FieldProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Field({ label, error, hint, id, className = "", ...props }: FieldProps) {
  const fieldId = id ?? props.name;

  return (
    <div className={className}>
      <label htmlFor={fieldId} className="label-xs block text-taupe">
        {label}
      </label>
      <input
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        className={`mt-2.5 h-12 w-full border bg-transparent px-3.5 text-[0.875rem] transition-colors placeholder:text-taupe/70 focus:outline-none ${
          error
            ? "border-ember focus:border-ember"
            : "border-charcoal/20 focus:border-charcoal"
        }`}
        {...props}
      />
      {error ? (
        <p id={`${fieldId}-error`} role="alert" className="label-xs mt-2 text-ember">
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="mt-2 text-[0.6875rem] text-taupe">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type SelectProps = ComponentProps<"select"> & {
  label: string;
  error?: string;
};

export function SelectField({ label, error, id, className = "", children, ...props }: SelectProps) {
  const fieldId = id ?? props.name;

  return (
    <div className={className}>
      <label htmlFor={fieldId} className="label-xs block text-taupe">
        {label}
      </label>
      <select
        id={fieldId}
        aria-invalid={Boolean(error)}
        className={`mt-2.5 h-12 w-full cursor-pointer appearance-none border bg-transparent px-3.5 text-[0.875rem] transition-colors focus:outline-none ${
          error ? "border-ember" : "border-charcoal/20 focus:border-charcoal"
        }`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%2311110F' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
        }}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p role="alert" className="label-xs mt-2 text-ember">
          {error}
        </p>
      )}
    </div>
  );
}
