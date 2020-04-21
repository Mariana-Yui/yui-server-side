export default {
    json(code: number, message: string, info?: any) {
        return {
            code,
            message,
            info
        };
    },
    convertToObject(cookies: string) {
        if (typeof cookies === 'string' && /(.+=.+;?\s?)+/.test(cookies)) {
            return cookies.split('; ').reduce((prev, cur) => {
                const [name, value] = cur.split('=');
                prev[name] = value;
                return prev;
            }, {});
        }
        return {};
    }
};
