import { generateEmailBody, notifyModerators } from "../notifyModerators";

describe("notifyModerators", () => {
  // Create a completeunit test for notifyModerators
  describe("notifyModerators", () => {
    it("should return nothing if msg is null", async () => {
      const res = await notifyModerators(null);

      expect(res).toBeUndefined();
    });

    it("should notify mods", async () => {
      const notifReq = {
        receivers: [
          {
            id: 1,
            email: "test@gmail.com",
          },
          {
            id: 2,
            email: "test2@gmail.com",
          },
        ],
        user: "Test User",
        job: {
          name: "Test Job",
          job_descriptions: {
            jobDescription: [
              {
                name: "Test Description",
                value: "This is a test description",
              },
            ],
          },
          department: "Test Department",
          subcompany: "Test Subcompany",
          office: "Test Office",
          recruiting_category: "Test Category",
          employment_type: "Test Employment Type",
          occupation: "Test Occupation",
          seniority: "Test Seniority",
          years_of_experience: "Test Years of Experience",
          occupation_category: "Test Occupation Category",
          schedule: "Test Schedule",
        },
      };
      const res = await notifyModerators({
        content: Buffer.from(JSON.stringify(notifReq)),
        fields: {
          deliveryTag: 0,
          redelivered: false,
          exchange: "0",
          routingKey: "0",
          consumerTag: "0",
        },
        properties: {
          contentType: "application/json",
          contentEncoding: "application/json",
          headers: {},
          deliveryMode: 0,
          priority: 0,
          correlationId: "0",
          replyTo: "0",
          expiration: 0,
          messageId: "0",
          userId: 0,
          timestamp: 0,
          type: "0",
          appId: "0",
          clusterId: 0,
        },
      });

      expect(res).toBeUndefined();
    });
  });

  describe("generateEmailBody", () => {
    it("should generate correct email body", () => {
      const notifReq = {
        receivers: [
          {
            id: 1,
            email: "test@gmail.com",
          },
        ],
        user: "Test User",
        job: {
          name: "Test Job",
          job_descriptions: {
            jobDescription: [
              {
                name: "Test Description",
                value: "This is a test description",
              },
            ],
          },
          department: "Test Department",
          subcompany: "Test Subcompany",
          office: "Test Office",
          recruiting_category: "Test Category",
          employment_type: "Test Employment Type",
          occupation: "Test Occupation",
          seniority: "Test Seniority",
          years_of_experience: "Test Years of Experience",
          occupation_category: "Test Occupation Category",
          schedule: "Test Schedule",
        },
      };
      const approveLink = "http://test.com/approve";
      const markSpamLink = "http://test.com/spam";

      const result = generateEmailBody(notifReq, approveLink, markSpamLink);

      expect(result).toContain("Test User");
      expect(result).toContain("Test Job");
      expect(result).toContain("Test Description");
      expect(result).toContain("This is a test description");
      expect(result).toContain("Test Department");
      expect(result).toContain("Test Subcompany");
      expect(result).toContain("Test Office");
      expect(result).toContain("Test Category");
      expect(result).toContain("Test Employment Type");
      expect(result).toContain("Test Occupation");
      expect(result).toContain("Test Seniority");
      expect(result).toContain("Test Years of Experience");
      expect(result).toContain("Test Occupation Category");
      expect(result).toContain("Test Schedule");
      expect(result).toContain(approveLink);
      expect(result).toContain(markSpamLink);
    });
  });
});
