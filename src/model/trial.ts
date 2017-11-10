import { TrialType } from './trialType';

export interface Trial {
    readonly name: string;
    readonly type: TrialType;
    readonly goalSubjectCount: string | null;
    readonly minSubjectCount: string | null;
    readonly maxSubjectCount: string | null;
    readonly kioskMode: boolean | null;
}