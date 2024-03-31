import { render } from '@testing-library/react';

import DataAccessAccountContext from './data-access-account-context';

describe('DataAccessAccountContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DataAccessAccountContext />);
    expect(baseElement).toBeTruthy();
  });
});
