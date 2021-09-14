import { AxiosError } from "axios";

export type HomeStackParams = {
	Home: undefined
}

export interface FetchingStatus {
    loading: boolean;
    error: boolean;
    success: boolean;
    errorInfo: AxiosError | Error | null
}

export interface News {
    created_at: string;
    title: string;
    url: string;
    author: string;
    points: number;
    story_text: string | null
    comment_text: string | null
    num_comments: number | null
    story_id: number | null
    story_title: number | null
    story_url: number | null
    parent_id: number| null
    created_at_i: number
    _tags: string[];
    objectID: string;
}