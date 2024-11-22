interface Report {
    _id?: string;
    reason?: string;
    status?: string;
    description?: string;
    createdAt: string;
    reported_user?: any;
    reported_content?: any;
    judger?: any
}