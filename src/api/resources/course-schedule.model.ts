import { CourseFormat } from "../enums/course-format.enum";
import { CourseSessionResource } from "./session.model";

export interface CourseScheduleResource {
    uid: string;
    code: string;
    name: string;
    description: string;
    capacity: number;
    enabled: boolean;
    created_at: Date;
    last_modified_at: Date;
    sessions: CourseSessionResource[],
    start_date: Date;
    end_date: Date;
    course_uid: string;
}
