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
    },
    /**
     * md5格式(32位)
     * @param value 
     */
    isMd5(value: string): boolean {
        return /^[a-fA-F0-9]{32}$/.test(value)
    },
    /**
     * 版本号(version)格式必须为X.Y.Z
     * @param value 
     */
    isVersion(value: string): boolean {
        return /^\d+(?:\.\d+){2}$/.test(value)
    },
    /**
     * 密码强度校验， 最少6位， 包括至少1个大写字母， 1个小写字母，1个数字，1个特殊字符
     * @param value 
     */
    isComplexPassword(value: string): boolean {
        return /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(value)
    },
}
