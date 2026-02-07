export function mapStatusVNToEN(status: string): string {
    switch (status) {
        case 'Mới':
            return 'NEW';
        case 'Đang xử lý':
            return 'DOING';
        case 'Đã xử lý':
            return 'DONE';
        default:
            return 'UNKNOWN';
    }
}