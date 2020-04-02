import { Context } from 'egg'

export default function Log(option: any): any {
    option = option || {}
    return async (ctx: Context, next: () => Promise<any>) => {
        const start_time = Date.now()
        await next()
        const end_time = Date.now()
        console.log(`enter router: ${ctx.path}, time: ${end_time - start_time}ms`)
    }
}
