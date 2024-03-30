import { render } from '@testing-library/react';

import AccountSummary from './account-summary';

describe('AccountSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountSummary />);
    expect(baseElement).toBeTruthy();
  });
});
