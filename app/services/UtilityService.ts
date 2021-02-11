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
}

export default UtilityService;
