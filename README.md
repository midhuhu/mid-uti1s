
# mid-uti1s

自用工具库总结


# Installing

For the latest stable version:

`
npm install -D mid-uti1s
`  

For our nightly builds:

`
npm install -D mid-uti1s@next
`  


# Usage

ES6:
```js
import utils from 'mid-uti1s'

utils.getType(11)   // 获取类型`number`
```

commonjs:
```js
const utils = require('mid-uti1s')

utils.getType(11)   // 获取类型`number`
```

# Update content

| 方法              | 内容                                                                             | 更新时间   |
| ----------------- | -------------------------------------------------------------------------------- | ---------- |
| getType           | 判断7种基本类型和对象、数组类型，返回类型名字符串                                | 2023-10-26 |
| getOsType         | 判断终端系统 0: 其他 1: IOS 2: Android 3: Windows 4: Mac OS                      | 2023-10-26 |
| isMd5             | md5格式(32位)                                                                    | 2023-10-30 |
| isVersion         | 版本号(version)格式必须为X.Y.Z                                                   | 2023-10-30 |
| isComplexPassword | 密码强度校验， 最少6位， 包括至少1个大写字母， 1个小写字母，1个数字，1个特殊字符 | 2023-10-30 |
| getHumpCode | 横线命名转小驼峰格式: mid-utils => midUtils | 2023-11-03 |
| getLineCode | 小驼峰命名转横向格式：midUtils => mid-utils | 2023-11-03 |
| getCapitalize | 首字母大写 | 2023-11-03 |
| checkIdentityId | 校验身份证号码是否合法 | 2023-11-07 |
| numberChinese | 数字转中文 | 2023-11-07 |
