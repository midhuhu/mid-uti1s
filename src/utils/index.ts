import { Utils } from "./type";

declare const navigator: any

export default <Utils>{
    /**
     * 判断7种基本类型和对象、数组类型，返回类型名字符串
     * @param value
     * @returns 类型名
     */
    getType(value: unknown): string {
        const type: string = typeof value;
        if (type === 'object') {
            if (value instanceof Array) {
                return 'Array';
            } else if (value instanceof Object) {
                return 'Object';
            } else if (value === null) {
                return 'null';
            }
        }
        return type;
    },
    /**
     * 判断终端系统 0: 其他 1: IOS 2: Android 3: Windows 4: Mac OS
     */
    getOsType(): number {
        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') !== -1;
        const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        const isWin = u.indexOf('Win') !== -1
        const isMac = u.indexOf('Mac') !== -1
        return isIOS ? 1 : isAndroid ? 2 : isWin ? 3 : isMac ? 4 : 0
    }
}
