import { mockVisionDetector } from "@sentinel/mocks";
import type { VisionDetector } from "@sentinel/contracts";

export function createVisionDetector(): VisionDetector {
  return mockVisionDetector();
}
