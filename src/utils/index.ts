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
    /**
     * 横线命名转小驼峰格式: mid-utils => midUtils
     * @param value 
     */
    getHumpCode(value: string) {
        let camelizeRE = /-(\w)/g;
        return value.replace(camelizeRE, function (_, c) {
            return c ? c.toUpperCase() : '';
        })
    },
    /**
     * 小驼峰命名转横向格式：midUtils => mid-utils
     * @param value 
     */
    getLineCode(value: string) {
        let hyphenateRE = /\B([A-Z])/g;
        return value.replace(hyphenateRE, '-$1').toLowerCase()
    },
    /**
     * 首字母大写
     */
    getCapitalize(value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1)
    },
    /**
     * 校验身份证号码是否合法
     * @param identityId
     */
    checkIdentityId(identityId: string) {
        if (identityId.length !== 18) {
            return false
        }
        const numbers = identityId.split('').map(Number)
        const validator = numbers.pop()
        const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        const toMod = factors.map((factor, i) => factor * numbers[i]).reduce((sum, item) => sum + item, 0)
        const mod = toMod % 11
        const results = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        return String(validator) === String(results[mod])
    },
    /**
     * 数字转中文
     * @param val
     */
    numberChinese(val: number) {
        const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        const chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
        const chnUnitChar = ['', '十', '百', '千'];
        const numToChn = function (num: number) {
            const index = num.toString().indexOf('.');
            if (index != -1) {
                var str = num.toString().slice(index);
                var a = '点';
                for (var i = 1; i < str.length; i++) {
                    a += chnNumChar[parseInt(str[i])];
                }
                return a;
            } else {
                return '';
            }
        }

        function sectionToChinese(section: number) {
            let str = '', chnstr = '', zero = false, count = 0;
            while (section > 0) {
                let v = section % 10;
                if (v == 0) {
                    if (zero) {
                        zero = false;
                        chnstr = chnNumChar[v] + chnstr;
                    }
                } else {
                    zero = true;
                    str = chnNumChar[v];
                    str += chnUnitChar[count];
                    chnstr = str + chnstr;
                }
                count++;
                section = Math.floor(section / 10);
            }
            return chnstr;
        }

        function TransformToChinese(num: number) {
            const str = numToChn(num);
            num = Math.floor(num);
            let unitPos = 0;
            let strIns = '';
            let chnStr = '';
            let needZero = false;

            if (num === 0) {
                return chnNumChar[0];
            }
            while (num > 0) {
                const section = num % 10000;
                if (needZero) {
                    chnStr = chnNumChar[0] + chnStr;
                }
                strIns = sectionToChinese(section);
                strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
                chnStr = strIns + chnStr;
                needZero = (section < 1000) && (section > 0);
                num = Math.floor(num / 10000);
                unitPos++;
            }
            return chnStr + str;
        }
        return TransformToChinese(val)
    },

}
