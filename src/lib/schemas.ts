import { z } from 'zod';
import { parseCustomDate } from '~/utility/parseCustomDate';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const busFormSchema = z
    .object({
        from: z.string().min(1, 'Please choose departure location.'),
        to: z.string().min(1, 'Please choose destination.'),
        startDate: z.string().min(1, 'Please select departure date.'),
        roundtripDate: z.string().optional(),
        passenger: z.coerce.number().min(1, 'At least 1 passenger is required.'),
    })
    .refine(
        (data) => {
            const start = parseCustomDate(data.startDate);
            if (!start) return true;

            return start !== null && start >= today;
        },
        {
            message: 'Departure date cannot be in the past.',
            path: ['startDate'],
        },
    )
    .refine(
        (data) => {
            if (!data.roundtripDate) return true;
            const rt = parseCustomDate(data.roundtripDate);
            return rt !== null && rt >= today;
        },
        {
            message: 'Return date cannot be in the past.',
            path: ['roundtripDate'],
        },
    )
    // returnDate ≥ startDate — only run if previous checks passed
    .refine(
        (data) => {
            if (!data.roundtripDate) return true;

            const start = parseCustomDate(data.startDate);
            const rt = parseCustomDate(data.roundtripDate);

            if (!start || !rt) return true;
            if (start < today) return true;
            if (rt < today) return true;

            return rt >= start;
        },
        {
            message: 'Return date must be equal or after departure date.',
            path: ['roundtripDate'],
        },
    );
