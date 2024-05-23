export interface DashboardStatsDto {
    courses_count: number;
    course_subscriptions_count: number;
    latestCourses: DashboardStatsLatestCourseDto[];
}

export interface DashboardStatsLatestCourseDto {
    course_uid: string;
    course_session_uid: string;
    course_name: string;
    course_session_start_date: Date;
    course_session_end_date: Date;
}
