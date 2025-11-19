export function parseCustomDate(str: string): Date | null {
    if (!str) return null;

    const cleaned = str.replace(/\s+/g, ' ').trim();

    // Tách phần ngày và phần thời gian (có thể có nhiều khoảng trắng)
    const parts = cleaned.split(/\s+/);

    // Lọc bỏ các phần tử rỗng và dấu "/"
    const filteredParts = parts.filter((part) => part !== '/' && part !== '');

    if (filteredParts.length < 4) return null;

    const [day, month, year, time] = filteredParts;

    const [hours, minutes] = time.split(':').map((s) => parseInt(s.trim(), 10));

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) return null;

    const d = new Date(yearNum, monthNum - 1, dayNum, hours || 0, minutes || 0, 0, 0);

    return d;
}
