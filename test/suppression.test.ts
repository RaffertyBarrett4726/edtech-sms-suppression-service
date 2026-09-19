import assert from "node:assert/strict";
import { eligibleLearners } from "../src/course_sms.js";

const learners = [{ phone: "+15550001", name: "Ari", optedOut: false }, { phone: "+15550002", name: "Bo", optedOut: true }];
assert.deepEqual(eligibleLearners({ courseId: "c", courseTitle: "Course", deadline: "tomorrow", learners }), [learners[0]]);
console.log("suppression decision: opted-out learner is excluded");
