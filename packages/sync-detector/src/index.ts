import { mockSyncDetector } from "@sentinel/mocks";
import type { SyncDetector } from "@sentinel/contracts";

export function createSyncDetector(): SyncDetector {
  return mockSyncDetector();
}
