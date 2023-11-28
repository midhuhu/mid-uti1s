export interface Utils {
    getType(value: unknown): string
    getOsType(): number
    isMd5(value: string): boolean
    isVersion(value: string): boolean
    isComplexPassword(value: string): boolean
    getHumpCode(value: string): string
    getLineCode(value: string): string
    getCapitalize(value: string): string
    checkIdentityId(value: string): boolean
    numberChinese(value: number): string
    formatCss(value: string): string
    randomNumber(min: number, max: number): number
    formatThousands(value: number): string
    telFormat(value: number): string
    checkIdentityIdPro(value: string): boolean
    haveCNChars(value: string): boolean
    isEmail(value: string): boolean
} 
