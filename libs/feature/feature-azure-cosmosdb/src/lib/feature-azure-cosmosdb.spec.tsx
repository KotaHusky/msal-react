import { render } from '@testing-library/react';

import FeatureAzureCosmosdb from './feature-azure-cosmosdb';

describe('FeatureAzureCosmosdb', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureAzureCosmosdb />);
    expect(baseElement).toBeTruthy();
  });
});
