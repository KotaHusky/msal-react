import { utilVerifyToken } from './util-verify-token';

describe('utilVerifyToken', () => {
  it('should work', () => {
    expect(utilVerifyToken()).toEqual('util-verify-token');
  });
});
