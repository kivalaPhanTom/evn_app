export function mapStatusVNToEN(status: string): string {
    switch (status) {
        case 'M?i':
            return 'NEW';
        case '�ang x? l�':
            return 'DOING';
        case '�� x? l�':
            return 'DONE';
        default:
            return 'UNKNOWN';
    }
}