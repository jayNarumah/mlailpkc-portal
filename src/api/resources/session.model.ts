import { CourseFormat } from "../enums/course-format.enum";

export interface CourseSessionResource {
    uid: string;
    format: CourseFormat;
    seats: number;
    capacity: number;
    course_uid: string;
    start_date: Date;
    end_date: Date;
}
