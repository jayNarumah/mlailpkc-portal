import { ApprovalStatus } from "../enums/approval-status.enum";
import { CourseScheduleResource } from "./course-schedule.model";
import { CourseSessionResource } from "./session.model";

export interface CourseSubscriptionResource {
    uid: string
    status: string;
    created_at: Date;
    last_modified_at: Date;
    course_session_uid: string;
    course_uid: string;

    //relationships
    course?: CourseScheduleResource;
    courseSession?: CourseSessionResource;

}
