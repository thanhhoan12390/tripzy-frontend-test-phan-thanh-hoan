'use server';

import { redirect } from 'next/navigation';

export async function submitForm(formData: FormData) {
    const fromLocation = formData.get('from-location') as string;
    const toLocation = formData.get('to-location') as string;
    const startDate = formData.get('start-date') as string;
    const roundtripDate = formData.get('roundtrip-date') as string;
    const noOfPassenger = formData.get('number-passenger') as string;
    const mode = (formData.get('mode') as string) || 'bus';

    const searchParams = new URLSearchParams({
        mode: mode,
        from: fromLocation,
        to: toLocation,
        dep: startDate,
        pax: noOfPassenger,
    });

    if (roundtripDate) {
        searchParams.set('ret', roundtripDate);
    }

    redirect(`/search?${searchParams.toString()}`);
}
