import { mockChallengeVerifier } from "@sentinel/mocks";
import type { ChallengeVerifier } from "@sentinel/contracts";

export function createChallengeVerifier(): ChallengeVerifier {
  return mockChallengeVerifier();
}
