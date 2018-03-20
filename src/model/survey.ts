import { QuestionType } from './questionType';
import { Id, StringId } from '../utils/typeUtils';

export interface Survey {
    readonly id: SurveyId;
    readonly name : string;
    readonly branches : Branch[];
}

export interface Branch {
    readonly id : BranchId;
    readonly questions : Question[];
}

export interface Question {
    readonly id : QuestionId;
    readonly type : QuestionType;
    readonly prompt : string;
    readonly media : Media | null;
    readonly nextId : QuestionId | null;
    readonly responses : Response[];
}

export interface Response {
    readonly id : ResponseId;
    readonly text : string | null;
    readonly media : Media | null;
    readonly order : number;
    readonly branchTo : BranchId | null;
}

export interface Media {
    readonly id : MediaId;
    readonly url : string;
}

export type SurveyId = Id<'Survey'>;
export type BranchId = Id<'Branch'>;
export type QuestionId = Id<'Question'>;
export type ResponseId = Id<'Response'>;
export type MediaId = StringId<'Media'>;