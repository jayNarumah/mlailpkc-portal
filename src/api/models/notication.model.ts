export interface NoticationResource {
    uid: string;
    title: string
    content: string;
    audience: string;
    completed: boolean;
    created_at: Date;
    last_modified_at: Date;
}
