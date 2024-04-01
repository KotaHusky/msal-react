import { render } from '@testing-library/react';

import UserDataGet from './user-data-get';

describe('UserDataGet', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserDataGet />);
    expect(baseElement).toBeTruthy();
  });
});
