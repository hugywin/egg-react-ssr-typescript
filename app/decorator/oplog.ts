import { LogTrace } from '../class/LogEnum/log';
import { Context } from 'egg';


export declare type LogTraceFunction = () => string | number;

/**
 * OpLog日志记录装饰器
 *
 * @export
 * @param {(LogTrace | Function)} TraceId 方法执行求返回值 直接枚举值
 * @param {boolean} [IsLogJava=false] 是否记录JAVA结果
 * @returns
 */
export function OpLog(TraceId: LogTrace | LogTraceFunction, IsLogJava: boolean = false) {

    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        const native = descriptor.value;
        const controller = String(target.constructor.name).replace("Controller", "").toLowerCase()
        descriptor.value = async function (...args) {
            const ctx: Context = (<any>this).ctx;
            await native.apply(this, args);
            const opContent: any = {};
            if (ctx.body && ctx.body.data) {
                opContent.response = ctx.body.data;
            }
            else {
                opContent.response = ctx.body;
            }
            if (ctx.request && ctx.request.body) {
                opContent.request = ctx.request.body;
            }
            if (IsLogJava && ctx.body && Reflect.getMetadata("java-api-result", ctx, "body")) {
                opContent.origin = Reflect.getMetadata("java-api-result", ctx, "body");
            }
            ctx.OpLog({
                traceId: typeof TraceId == "function" ? TraceId() : TraceId,
                opName: `${controller}-${methodName}`,
                opContent: opContent
            });
        };
    }
}