import { CourseFormat } from "../enums/course-format.enum";
import { SessionResource } from "./session.model";

export interface CourseScheduleResource {
    uid: string;
    code: string;
    name: string;
    description: string;
    capacity: number;
    format: CourseFormat;
    enabled: boolean
    created_at: Date;
    last_modified_at: Date;
    sessions: SessionResource[],
    start_date: Date;
    end_date: Date
    course_uid: string;
}
