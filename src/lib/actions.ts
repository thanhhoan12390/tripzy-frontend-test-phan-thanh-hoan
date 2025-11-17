'use server';

import { redirect } from 'next/navigation';
import { busFormSchema } from '~/lib/schemas';
import type { ZodError } from 'zod';

function formatZodErrors(error: ZodError) {
    const fieldErrors: Record<string, string[]> = {};

    for (const issue of error.issues) {
        const field = issue.path[0] as string;
        fieldErrors[field] ??= [];
        fieldErrors[field].push(issue.message);
    }

    return fieldErrors;
}

export async function submitForm(formData: FormData) {
    const raw = {
        from: formData.get('from-location')?.toString() ?? '',
        to: formData.get('to-location')?.toString() ?? '',
        startDate: formData.get('start-date')?.toString() ?? '',
        roundtripDate: formData.get('roundtrip-date')?.toString() ?? '',
        passenger: formData.get('number-passenger'),
    };

    const result = busFormSchema.safeParse(raw);

    if (!result.success) {
        return {
            success: false,
            errors: formatZodErrors(result.error),
        };
    }

    const mode = (formData.get('mode') as string) || 'bus';

    const searchParams = new URLSearchParams({
        mode: mode,
        from: raw.from,
        to: raw.to,
        dep: raw.startDate,
        pax: raw.passenger as string,
    });

    if (raw.roundtripDate) {
        searchParams.set('ret', raw.roundtripDate);
    }

    redirect(`/search?${searchParams.toString()}`);
}
