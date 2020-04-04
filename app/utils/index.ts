export default {
    json(code: number, message: string, info?: any) {
        return {
            code,
            message,
            info
        };
    }
};
