"use client";

import React, { useState } from "react";

export interface TextContentFormData {
  title: string;
  email: string;
  category: string;
  content: string;
}

export interface TextContentFormErrors {
  title?: string;
  email?: string;
  category?: string;
  content?: string;
}

interface TextContentFormProps {
  onSubmitSuccess?: (data: TextContentFormData) => void;
}

const CATEGORIES = [
  { value: "", label: "select a category" },
  { value: "article", label: "article" },
  { value: "announcement", label: "announcement" },
  { value: "feedback", label: "feedback" },
  { value: "general", label: "general" },
];

const MAX_TITLE_LENGTH = 100;
const MIN_TITLE_LENGTH = 5;
const MAX_CONTENT_LENGTH = 1000;
const MIN_CONTENT_LENGTH = 20;

export default function TextContentForm({ onSubmitSuccess }: TextContentFormProps) {
  const [formData, setFormData] = useState<TextContentFormData>({
    title: "",
    email: "",
    category: "",
    content: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<TextContentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<TextContentFormData | null>(null);

  // validate individual field based on current value.
  const validateField = (name: keyof TextContentFormData, value: string): string => {
    switch (name) {
      case "title":
        if (!value.trim()) return "title is required";
        if (value.trim().length < MIN_TITLE_LENGTH)
          return `title must be at least ${MIN_TITLE_LENGTH} characters`;
        if (value.length > MAX_TITLE_LENGTH)
          return `title cannot exceed ${MAX_TITLE_LENGTH} characters`;
        return "";
      case "email":
        if (!value.trim()) return "email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return "please enter a valid email address";
        return "";
      case "category":
        if (!value) return "please select a category";
        return "";
      case "content":
        if (!value.trim()) return "content is required";
        if (value.trim().length < MIN_CONTENT_LENGTH)
          return `content must be at least ${MIN_CONTENT_LENGTH} characters`;
        if (value.length > MAX_CONTENT_LENGTH)
          return `content cannot exceed ${MAX_CONTENT_LENGTH} characters`;
        return "";
      default:
        return "";
    }
  };

  // validate all form fields before submission.
  const validateAll = (): boolean => {
    const newErrors: TextContentFormErrors = {
      title: validateField("title", formData.title),
      email: validateField("email", formData.email),
      category: validateField("category", formData.category),
      content: validateField("content", formData.content),
    };

    setErrors(newErrors);
    setTouched({
      title: true,
      email: true,
      category: true,
      content: true,
    });

    return !Object.values(newErrors).some((error) => error !== "");
  };

  // handle input change and perform live validation if field was touched.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof TextContentFormData;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (touched[fieldName]) {
      const errorMsg = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    }
  };

  // mark field as touched on blur and run field validation.
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof TextContentFormData;

    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const errorMsg = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
  };

  // submit form data after full validation check.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) return;

    setIsSubmitting(true);

    // simulate backend network request delay.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setSubmittedData(formData);
    if (onSubmitSuccess) {
      onSubmitSuccess(formData);
    }
  };

  // reset form state back to initial empty values.
  const handleReset = () => {
    setFormData({
      title: "",
      email: "",
      category: "",
      content: "",
    });
    setTouched({});
    setErrors({});
    setSubmittedData(null);
  };

  if (submittedData) {
    return (
      <div className="w-full max-w-xl p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-emerald-100 dark:border-emerald-950/50 space-y-6">
        <div className="flex items-center space-x-3 text-emerald-600 dark:text-emerald-400">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center font-bold text-lg">
            ✓
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Content Submitted Successfully
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Your submission has passed validation and was recorded.
            </p>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5 border border-zinc-200/60 dark:border-zinc-700/60 space-y-4">
          <div>
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Title
            </span>
            <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
              {submittedData.title}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Category
              </span>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 capitalize">
                {submittedData.category}
              </p>
            </div>
            <div>
              <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Author Email
              </span>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {submittedData.email}
              </p>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Content Body
            </span>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap mt-1 bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
              {submittedData.content}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full py-3 px-4 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-medium rounded-xl transition-all shadow-md active:scale-[0.99]"
        >
          Submit Another Piece of Content
        </button>
      </div>
    );
  }

  const contentRemaining = MAX_CONTENT_LENGTH - formData.content.length;

  return (
    <div className="w-full max-w-xl p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200/80 dark:border-zinc-800">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Submit Content
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Fill in the details below. All fields are required and validated.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* title field */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Title <span className="text-rose-500">*</span>
            </label>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {formData.title.length}/{MAX_TITLE_LENGTH}
            </span>
          </div>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g., Getting Started with Web Development"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={MAX_TITLE_LENGTH}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 dark:bg-zinc-950 dark:text-zinc-100 ${
              errors.title
                ? "border-rose-500 focus:ring-rose-500/20 bg-rose-50/30 dark:bg-rose-950/10"
                : touched.title && !errors.title
                ? "border-emerald-500/60 focus:ring-emerald-500/20"
                : "border-zinc-300 dark:border-zinc-700 focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-zinc-900/10"
            }`}
          />
          {errors.title && (
            <p id="title-error" className="mt-1.5 text-xs text-rose-500 font-medium">
              {errors.title}
            </p>
          )}
        </div>

        {/* email and category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* author email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Author Email <span className="text-rose-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="author@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 dark:bg-zinc-950 dark:text-zinc-100 ${
                errors.email
                  ? "border-rose-500 focus:ring-rose-500/20 bg-rose-50/30 dark:bg-rose-950/10"
                  : touched.email && !errors.email
                  ? "border-emerald-500/60 focus:ring-emerald-500/20"
                  : "border-zinc-300 dark:border-zinc-700 focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-zinc-900/10"
              }`}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-xs text-rose-500 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          {/* category select */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.category}
              aria-describedby={errors.category ? "category-error" : undefined}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 dark:bg-zinc-950 dark:text-zinc-100 ${
                errors.category
                  ? "border-rose-500 focus:ring-rose-500/20 bg-rose-50/30 dark:bg-rose-950/10"
                  : touched.category && !errors.category
                  ? "border-emerald-500/60 focus:ring-emerald-500/20"
                  : "border-zinc-300 dark:border-zinc-700 focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-zinc-900/10"
              }`}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value} disabled={cat.value === ""}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p id="category-error" className="mt-1.5 text-xs text-rose-500 font-medium">
                {errors.category}
              </p>
            )}
          </div>
        </div>

        {/* content body textarea */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label
              htmlFor="content"
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Content Body <span className="text-rose-500">*</span>
            </label>
            <span
              className={`text-xs ${
                contentRemaining < 50
                  ? "text-rose-500 font-semibold"
                  : "text-zinc-400 dark:text-zinc-500"
              }`}
            >
              {formData.content.length}/{MAX_CONTENT_LENGTH}
            </span>
          </div>
          <textarea
            id="content"
            name="content"
            rows={5}
            placeholder="write your text content here (at least 20 characters)..."
            value={formData.content}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={MAX_CONTENT_LENGTH}
            aria-invalid={!!errors.content}
            aria-describedby={errors.content ? "content-error" : undefined}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 resize-y dark:bg-zinc-950 dark:text-zinc-100 ${
              errors.content
                ? "border-rose-500 focus:ring-rose-500/20 bg-rose-50/30 dark:bg-rose-950/10"
                : touched.content && !errors.content
                ? "border-emerald-500/60 focus:ring-emerald-500/20"
                : "border-zinc-300 dark:border-zinc-700 focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-zinc-900/10"
            }`}
          />
          {errors.content && (
            <p id="content-error" className="mt-1.5 text-xs text-rose-500 font-medium">
              {errors.content}
            </p>
          )}
        </div>

        {/* action buttons */}
        <div className="flex items-center space-x-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] flex items-center justify-center"
          >
            {isSubmitting ? (
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Validating & Submitting...</span>
              </span>
            ) : (
              "Submit Content"
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="py-3 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-sm rounded-xl transition-all disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
