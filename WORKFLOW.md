# WORKFLOW.md

## Setup

**Feature:**

> A content submission form (React/Next.js, App Router, TypeScript).
> Build twice in isolated sessions with no context carried over between rounds, on separate branches (`week2/round-one`, `week2/roundtwo`).

- Round 1: Single sentence prompt, no file references, no constraints, accepted as is.
- Round 2: Precise prompt with instructions, file paths, and explicit validation rules, example input/output pairs, accessibility constraints, and an instruction to write and run tests before finishing. Used the plan-implement-test workflow.

## Round One

- Took ~5-10 minutes including my own manual testing. No automated tests existed. The AI invented scope I didn't ask for, on top of a content field, it added a title, author email, and a category dropdown, each with their own validation rules I didn't specify in the prompt. It also used `maxLength` on the inputs, which silently truncates the text pasted past the limit (if the user pasted text). This means that the JS length-validation branch for too-long content is effectively dead code, since the browser never lets that value exist. The error text was correctly linked via `aria-describedby`, but had no `aria-live` or `role="alert"`, so a screen reader wouldn't reliably voice out an error that appeared while the user's focus stayed on the field. The button is also enabled with no contents yet on the form.

## Round Two

- Took roughly 30-40 minutes along with the prompt creation, generation of the component, and review. It produced exactly one field I specified. It had no invented scope, with `role="alert"` and `aria-live="polite"` on the error message, matching the accessibility requirement I gave it. It wrote 7 tests covering the empty case, all four boundary values (19/20/5000/5001 characters), the loading state, and the `aria-describedby` association. All 7 tests passed on the first run. However, the textarea's border didn't appear red even if the `textarea-error` is already specified on the code.

## Time comparison

Round 1 was faster to generate but required real review effort. Round 2 took longer since most of the time I spent was writing the proper prompt, but needed almost no post-generation fixing, since the tests forced correctness before I even looked at the code.

## Mistakes I caught

1. Submit button enabled on an invalid, untouched form (Round 2). The button's disabled state depended on an error already being visible, and errors only show after the field is touched or submitted. So on first load, with an empty textarea, the button looked clickable even though the content was invalid. The bug only surfaced once you clicked Submit for the first time. It's a subtle one because the form still worked correctly in the end; it just briefly presented an invalid state as if it were valid. None of the 7 written tests caught it, because they all interacted with the field first, which is exactly the condition that hides the bug.

2. Inconsistent whitespace handling on both rounds. Both versions checked the trimmed string length for the minimum-length rule, but the raw (untrimmed) string length for the maximum-length rule. Practically, that means a string padded with extra spaces could pass the minimum while having fewer real characters than required. Precise prompting didn't catch this too. A verification loop is only as good as the test cases me (or the AI) think to write; nobody specified a whitespace-padding test case, so nobody wrote one.

---

# What I'd do differently

Next time I'd add explicit "adversarial" example inputs to my round 2 prompt with padded whitespace, pasted oversized content, rapid double-submits, rather than only giving boundary-length examples. The AI followed my spec closely, the gaps that remained were gaps in my prompt, not in its generation of the component. For future purposes, I'll be using Zod.
