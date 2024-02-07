import type { ConsumeMessage } from "amqplib";
import type { NotificationReq, NotificationLog } from "./types";
import jwt from "jsonwebtoken";

export const notifyModerators = async (msg: ConsumeMessage | null) => {
  if (!msg) {
    return;
  }

  const msgStr = msg.content.toString();
  const notifReq: NotificationReq = JSON.parse(msgStr);
  console.log("Received Job", notifReq.job);
  notifReq.receivers.forEach((receiver) => {
    const jwtBody = {
      modId: receiver.id,
      jobId: notifReq.job.id,
    };
    const signedJwt = jwt.sign(jwtBody, process.env.JWT_MODS_SECRET || "", {
      expiresIn: "48h",
    });
    console.log("JWT Body", jwtBody);
    const b64signedJwt = Buffer.from(signedJwt).toString("base64");

    const pathParameters = `${notifReq.job.id}?authKey=${b64signedJwt}`;
    const approveLink = `${process.env.JOBBOARD_URL}/${process.env.MOD_APPROVAL_PATH}/${pathParameters}`;
    const markSpamLink = `${process.env.JOBBOARD_URL}/${process.env.MOD_MARKSPAM_PATH}/${pathParameters}`;
    const notifLog: NotificationLog = {
      receiver,
      emailBody: generateEmailBody(notifReq, approveLink, markSpamLink),
      approveLink,
      markSpamLink,
    };

    console.log("Sending email to %s", receiver.email);
    console.log(notifLog);
  });
};

export const generateEmailBody = (
  notifReq: NotificationReq,
  approveLink: string,
  markSpamLink: string
) => {
  const emailBody = `A new job has been posted. Please approve or mark as spam. <br/>

      <h3>New User: ${notifReq.user}</h3>

      <h3>Name: ${notifReq.job.name}</h3>
      <h3>Job Description: </h3>

      <div>
      ${notifReq.job.job_descriptions
        ?.map(
          (desc) => `
        <p>
          <b>${desc.name}</b>
          <br/>
          ${desc.value}
        </p>
        `
        )
        .join("<br/>")}
      </div>

      <h3>Job Details</h3>

      <ul>  
        <li>Department: ${notifReq.job.department}</li>
        <li>Subcompany: ${notifReq.job.subcompany}</li>
        <li>Office: ${notifReq.job.office}</li>
        <li>Recruiting Category: ${notifReq.job.recruiting_category}</li>
        <li>Employment Type: ${notifReq.job.employment_type}</li>
        <li>Occupation: ${notifReq.job.occupation}</li>
        <li>Seniority: ${notifReq.job.seniority}</li>
        <li>Years of Experience: ${notifReq.job.years_of_experience}</li>
        <li>Occupation Category: ${notifReq.job.occupation_category}</li>
        <li>Schedule: ${notifReq.job.schedule}</li>
      </ul>

      <br/>

      You can click the following links to approve or mark as spam:

      <a href="${approveLink}">Approve this job post.</a>

      <br/>
      <a href="${markSpamLink}">Mark this as spam</a>
      `;
  return emailBody;
};
