export type NotificationReceiver = {
  id: number;
  email: string;
};

export type JobDescription = { name: string; value: string };

// TODO: Maintain parity with JobBoard Web servicer type
export type NotificationReq = {
  receivers: NotificationReceiver[];
  user: string;
  job: Partial<{
    additional_offices: any;
    approval_status: string;
    created_at: string;
    department: string;
    employment_type: string;
    id: number;
    job_descriptions: JobDescription[];
    name: string;
    occupation: string;
    occupation_category: string;
    office: string;
    recruiting_category: string;
    schedule: string;
    seniority: string;
    subcompany: string;
    user_id: number;
    years_of_experience: string;
  }>;
};
// TODO: Maintain parity with JobBoard Web servicer type
export type AuthKey = {
  jobId: string | number;
  modId: string | number;
  iat: number;
  exp: number;
};
// TODO: Maintain parity with JobBoard Web servicer type
export type NotificationLog = {
  receiver: NotificationReceiver;
  emailBody: string;
  approveLink: string;
  markSpamLink: string;
};
