export function formatDate(date: Date): string {
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}

export function generateYearList(currentYear: number): number[] {
    return Array.from({ length: 11 }, (_, i) => currentYear + 5 - i);
}