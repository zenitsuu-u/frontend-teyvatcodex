import { STAT_LABELS } from "./statLabels";

export function formatStatValue(value: number) {
    return (value * 100).toFixed(1) + "%";
}

export function formatSecondaryStat(stat: string, value: number) {
    const label = STAT_LABELS[stat] || stat;
    const formatted = formatStatValue(value);
    return `${label} : ${formatted}`;
}