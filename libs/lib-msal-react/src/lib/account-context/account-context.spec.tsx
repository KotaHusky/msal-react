import { render } from '@testing-library/react';

import AccountContext from './account-context';

describe('AccountContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountContext />);
    expect(baseElement).toBeTruthy();
  });
});
