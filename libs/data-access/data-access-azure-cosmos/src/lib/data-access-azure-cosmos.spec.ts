import { dataAccessAzureCosmos } from './data-access-azure-cosmos';

describe('dataAccessAzureCosmos', () => {
  it('should work', () => {
    expect(dataAccessAzureCosmos()).toEqual('data-access-azure-cosmos');
  });
});
