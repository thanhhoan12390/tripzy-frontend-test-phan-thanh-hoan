import type { ZodError } from 'zod';

export function formatZodErrors(error: ZodError) {
    const fieldErrors: Record<string, string[]> = {};

    for (const issue of error.issues) {
        const field = issue.path[0] as string;
        fieldErrors[field] ??= [];
        fieldErrors[field].push(issue.message);
    }

    return fieldErrors;
}
