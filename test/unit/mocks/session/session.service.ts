export const SessionService = {
  createSession: jest.fn().mockResolvedValue(Promise.resolve()),
  destroySession: jest.fn().mockResolvedValueOnce(Promise.resolve()),
};
