export interface Utils {
    getType(value: unknown): string
    getOsType(): number
    isMd5(value: string): boolean
    isVersion(value: string): boolean
    isComplexPassword(value: string): boolean
} 
