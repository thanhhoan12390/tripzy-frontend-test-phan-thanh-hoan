'use server';

import { redirect } from 'next/navigation';

export async function submitForm(formData: FormData) {
    const fromLocation = formData.get('from-location');
    const toLocation = formData.get('to-location');
    const startDate = formData.get('start-date');
    const roundtripDate = formData.get('roundtrip-date');
    const noOfPassenger = formData.get('number-passenger');

    console.log('form data: ', { fromLocation, toLocation, startDate, roundtripDate, noOfPassenger });

    // redirect('/search');

    // Update data
    // Revalidate cache
}
