import { vi } from "vitest";

export const makeUserRepositoryMock = () => ({
  loadByEmail: vi.fn(),
  add: vi.fn(),
  get: vi.fn(),
  loadById: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  count: vi.fn(),
});
