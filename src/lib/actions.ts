'use server';

import { redirect } from 'next/navigation';
import { parseCustomDate } from '~/utility/parseCustomDate';

export async function submitForm(formData: FormData) {
    const from = formData.get('from-location')?.toString() ?? '';
    const to = formData.get('to-location')?.toString() ?? '';
    const startDate = formData.get('start-date')?.toString() ?? '';
    const roundtripDate = formData.get('roundtrip-date')?.toString() ?? '';
    const passenger = formData.get('number-passenger');

    const mode = (formData.get('mode') as string) || 'bus';

    const convertedStartDate = parseCustomDate(startDate);

    const searchParams = new URLSearchParams({
        mode: mode,
        from: from,
        to: to,
        dep: `${convertedStartDate?.getDate()}-${
            (convertedStartDate?.getMonth() ?? 0) + 1
        }-${convertedStartDate?.getFullYear()}`,
        pax: passenger as string,
    });

    if (roundtripDate) {
        const convertedRoundtripDate = parseCustomDate(roundtripDate);

        searchParams.set(
            'ret',
            `${convertedRoundtripDate?.getDate()}-${
                (convertedRoundtripDate?.getMonth() ?? 0) + 1
            }-${convertedRoundtripDate?.getFullYear()}`,
        );
    }

    redirect(`/search?${searchParams.toString()}`);
}
