"use client";

import React, { useId, useState } from "react";

export interface ContentInputFormProps {
	initialValue?: string;
	onSubmit?: (content: string) => Promise<void> | void;
}

export function ContentInputForm({
	initialValue = "",
	onSubmit,
}: ContentInputFormProps) {
	const [content, setContent] = useState(initialValue);
	const [isTouched, setIsTouched] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const formId = useId();
	const inputId = `content-input-${formId}`;
	const errorId = `content-error-${formId}`;

	const getValidationError = (value: string): string | null => {
		const trimmed = value.trim();
		if (trimmed.length === 0) {
			return "Content is required.";
		}
		if (value.length < 20) {
			return `Minimum 20 characters (${value.length}/20)`;
		}
		if (value.length > 5000) {
			return `Maximum 5000 characters (${value.length}/5000)`;
		}
		return null;
	};

	const validationError = getValidationError(content);
	const shouldShowError =
		(isTouched || isSubmitted) && Boolean(validationError);
	const isButtonDisabled = isSubmitting || shouldShowError;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitted(true);

		if (validationError) {
			return;
		}

		setIsSubmitting(true);
		try {
			if (onSubmit) {
				await onSubmit(content);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			noValidate
			className="form-control w-full space-y-4"
		>
			<div>
				<label
					htmlFor={inputId}
					className="label font-medium mb-1 inline-block"
				>
					<span className="label-text">Content</span>
				</label>
				<textarea
					id={inputId}
					name="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					onBlur={() => setIsTouched(true)}
					aria-invalid={shouldShowError ? "true" : "false"}
					aria-describedby={shouldShowError ? errorId : undefined}
					rows={6}
					placeholder="Paste or enter your content here..."
					className={`textarea w-full textarea-secondary ${
						shouldShowError ? "textarea textarea-error" : ""
					}`}
				/>
				{shouldShowError && (
					<p
						id={errorId}
						role="alert"
						aria-live="polite"
						className="text-error text-sm mt-1"
					>
						{validationError}
					</p>
				)}
			</div>

			<div>
				<button
					type="submit"
					disabled={isButtonDisabled}
					className="btn btn-secondary"
				>
					{isSubmitting ? (
						<>
							<span className="loading loading-spinner loading-xs" />
							Submitting...
						</>
					) : (
						"Submit"
					)}
				</button>
			</div>
		</form>
	);
}
