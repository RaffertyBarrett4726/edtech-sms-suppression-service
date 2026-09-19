import { sendDeadlineReminder } from "./course_sms.js";

const result = await sendDeadlineReminder({ courseId: "math-101", courseTitle: "Algebra I", deadline: "Friday 17:00", learners: [{ phone: "+15550001", name: "Ari", optedOut: false }, { phone: "+15550002", name: "Bo", optedOut: true }] });
console.log(JSON.stringify(result, null, 2));
