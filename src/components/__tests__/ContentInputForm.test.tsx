import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ContentInputForm } from '../ContentInputForm';

describe('ContentInputForm', () => {
  it('displays "Content is required." error when submitting empty input', async () => {
    const user = userEvent.setup();
    render(<ContentInputForm />);

    const textarea = screen.getByRole('textbox', { name: /content/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(screen.queryByText('Content is required.')).not.toBeInTheDocument();

    await user.click(submitButton);

    expect(screen.getByText('Content is required.')).toBeInTheDocument();
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('validates boundary case 19 characters (invalid)', async () => {
    const user = userEvent.setup();
    render(<ContentInputForm />);

    const textarea = screen.getByRole('textbox', { name: /content/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    const text19 = 'a'.repeat(19);
    await user.type(textarea, text19);
    await user.tab();

    expect(screen.getByText('Minimum 20 characters (19/20)')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('validates boundary case 20 characters (valid)', async () => {
    const user = userEvent.setup();
    render(<ContentInputForm />);

    const textarea = screen.getByRole('textbox', { name: /content/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    const text20 = 'a'.repeat(20);
    await user.type(textarea, text20);

    expect(screen.queryByText(/minimum 20 characters/i)).not.toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  it('validates boundary case 5000 characters (valid)', async () => {
    const text5000 = 'a'.repeat(5000);
    render(<ContentInputForm initialValue={text5000} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(screen.queryByText(/maximum 5000 characters/i)).not.toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  it('validates boundary case 5001 characters (invalid)', async () => {
    const text5001 = 'a'.repeat(5001);
    render(<ContentInputForm initialValue={text5001} />);

    const textarea = screen.getByRole('textbox', { name: /content/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.blur(textarea);

    expect(screen.getByText('Maximum 5000 characters (5001/5000)')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('handles valid submit enabling the button and showing loading state', async () => {
    const handleSubmit = vi.fn().mockImplementation(() => new Promise((res) => setTimeout(res, 100)));
    const user = userEvent.setup();

    render(<ContentInputForm onSubmit={handleSubmit} />);

    const textarea = screen.getByRole('textbox', { name: /content/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    const validText = 'This is valid text content with more than twenty characters.';
    await user.type(textarea, validText);

    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    expect(screen.getByRole('button')).toHaveTextContent(/submitting\.\.\./i);
    expect(handleSubmit).toHaveBeenCalledWith(validText);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });
  });

  it('associates error message via aria-describedby and uses aria-live="polite"', async () => {
    const user = userEvent.setup();
    render(<ContentInputForm />);

    const textarea = screen.getByRole('textbox', { name: /content/i });

    expect(textarea).not.toHaveAttribute('aria-describedby');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    const errorMessage = screen.getByText('Content is required.');
    const errorId = errorMessage.getAttribute('id');

    expect(errorId).toBeTruthy();
    expect(textarea).toHaveAttribute('aria-describedby', errorId!);
    expect(errorMessage).toHaveAttribute('aria-live', 'polite');
  });
});
