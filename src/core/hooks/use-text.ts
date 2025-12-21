import { TEXT } from '@/core/constants/text';

const CURRENT_LANG = 'vi'; // later: get from Redux / Context

export const useText = () => TEXT[CURRENT_LANG];