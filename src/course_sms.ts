import { z } from "zod";
import { infrai } from "./infrai.js";

export const deadlineRequest = z.object({ courseId: z.string().min(1), courseTitle: z.string().min(1), deadline: z.string().min(1), learners: z.array(z.object({ phone: z.string().min(5), name: z.string().min(1), optedOut: z.boolean() })) });
export type DeadlineRequest = z.infer<typeof deadlineRequest>;

export function eligibleLearners(input: DeadlineRequest) { return input.learners.filter((learner) => !learner.optedOut); }

export async function sendDeadlineReminder(raw: unknown) {
  const input = deadlineRequest.parse(raw);
  const eligible = eligibleLearners(input);
  if (eligible.length === 0) return { sent: 0, suppressed: input.learners.length };
  const data = await infrai.sms.batch.send({ messages: eligible.map((learner) => ({ to: learner.phone, body: `${learner.name}, ${input.courseTitle} is due ${input.deadline}.` })) });
  return { sent: eligible.length, suppressed: input.learners.length - eligible.length, data };
}
