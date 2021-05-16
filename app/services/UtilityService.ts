class UtilityService {

    static generateId() {
        let id = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 20; i++) {
            id += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return id;
    }

    static deepCopy(d) {
        if (!d) {
            return d;
        }
        return JSON.parse(JSON.stringify(d));
    }

    static timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static convertToInt = (value: string) => parseInt(value, 10) || 0;
    static convertHoursToSeconds = (value: number) => value * 3600;
    static convertMinutesToSeconds = (value: number) => value * 60;

    static splitSecondsIntoChunks = (value: number) => {
        value = value || 0;
        return {
            hours: Math.floor(value / 3600),
            minutes: Math.floor(value / 60) % 60,
            seconds: value % 60
        }
    }

    static hexToRGB(hex: string, alpha: number) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        return `rgba(${r}, ${g}, ${b})`;
    }

}

export default UtilityService;
