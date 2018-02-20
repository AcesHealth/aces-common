export interface User {
    readonly id: number;
    readonly username: string;
    readonly created: Date;
    readonly minSubjectCount: string | null;
    readonly maxSubjectCount: string | null;
    readonly kioskMode: boolean | null;
}