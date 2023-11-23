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
    /**
     * 格式化CSS样式代码
     * @param s 
     */
    formatCss(s: string) {
        //格式化代码  
        s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
        s = s.replace(/;\s*;/g, ";");
        //清除连续分号  
        s = s.replace(/\,[\s\.\#\d]*{/g, "{");
        s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
        s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
        s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
        return s;
    },
    /**
     * 生成指定范围内的随机数字
     * @param min
     * @param max
     * @returns {*}
     */
    randomNumber(min: number, max: number) {
        // Math.floor() 向下取整
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * 数字千分位分割
     * @param num
     * @returns {string|*}
     */
    formatThousands(num: number) {
        var number = num.toString();
        var length = number.length;
        if (length <= 3) {
            return num;
        }
        var temp = "";
        var remainder = length % 3;
        if (remainder > 0) {
            // 不是3的整数
            return number.slice(0, remainder) + "," + number.slice(remainder, length).match(/\d{3}/g)?.join(",") + temp;
        } else {
            return number.slice(0, length).match(/\d{3}/g)?.join(",") + temp;
        }
    },
    /**
     * 手机号中间四位变成*
     * @param value
     * @returns {string}
     */
    telFormat(value: number) {
        return JSON.stringify(value).slice(0, 3) + "****" + JSON.stringify(value).slice(7);
    },
    /**
     * 身份证号码合法校验
     * @param num 身份证号码
     * @returns {boolean}
     */
    checkIdentityIdPro(num: string) {
        if (!num) {
            return false;
        }
        num = num.toUpperCase();
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
        const idCardRegex = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
        if (!idCardRegex.test(num)) {
            return false;
        }
        // 验证前2位，城市符合
        const validCityCodes: string[] = [
            "11", "12", "13", "14", "15", "21", "22", "23", "31", "32",
            "33", "34", "35", "36", "37", "41", "42", "43", "44", "45",
            "46", "50", "51", "52", "53", "54", "61", "62", "63", "64",
            "65", "71", "81", "82", "91"
        ];
        if (!validCityCodes.includes(num.slice(0, 2))) {
            return false;
        }
        // 下面分别分析出生日期和校验位
        let len: number;
        len = num.length;
        if (len === 15) {
            // 15位身份证验证
            const re = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
            const match = num.match(re);

            if (!match) {
                return false;
            }
            const [, year, month, day] = match.map(Number);
            const dtmBirth = new Date(`19${year}/${month}/${day}`);
            if (
                dtmBirth.getFullYear() !== 1900 + year ||
                dtmBirth.getMonth() + 1 !== month ||
                dtmBirth.getDate() !== day
            ) {
                return false;
            }
        } else if (len === 18) {
            // 18位身份证验证
            const re = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
            const match = num.match(re);
            if (!match) {
                return false;
            }
            const [, year, month, day] = match.slice(1, 5).map(Number);
            const dtmBirth = new Date(`${year}/${month}/${day}`);
            if (
                dtmBirth.getFullYear() !== year ||
                dtmBirth.getMonth() + 1 !== month ||
                dtmBirth.getDate() !== day
            ) {
                return false;
            }
            // 校验18位身份证的校验码是否正确
            const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
            let nTemp = 0;
            for (let i = 0; i < 17; i++) {
                nTemp += parseInt(num.charAt(i)) * arrInt[i];
            }
            if (arrCh[nTemp % 11] !== num.charAt(17)) {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

}
