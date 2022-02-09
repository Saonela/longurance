export function generateId() {
    let id = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
        id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return id;
}

export function deepCopy(d) {
    if (!d) {
        return d;
    }
    return JSON.parse(JSON.stringify(d));
}

export function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const convertToInt = (value: string) => parseInt(value, 10) || 0;
export const convertHoursToSeconds = (value: number) => value * 3600;
export const convertMinutesToSeconds = (value: number) => value * 60;

export function splitSecondsIntoChunks(value: number) {
    value = value || 0;
    return {
        hours: Math.floor(value / 3600),
        minutes: Math.floor(value / 60) % 60,
        seconds: value % 60
    };
}

export function getDurationTimeText(duration: number): string {
    const {hours, minutes, seconds} = splitSecondsIntoChunks(duration);

    const hh = hours < 10 ? `${hours}` : `${hours}`;
    const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const ss = seconds < 10 ? `${seconds}` : `${seconds}`;

    return `${hh}h ${mm}min`;
}

export function hexToRGB(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgba(${r}, ${g}, ${b})`;
}

export function sortByDate<T>(items: T[], key: string) {
    return items.sort(
        (item1, item2) =>
            new Date(item2[key]).getTime() - new Date(item1[key]).getTime()
    );
}
