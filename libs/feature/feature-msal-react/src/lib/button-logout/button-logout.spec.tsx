import { render } from '@testing-library/react';

import ButtonLogout from './button-logout';

describe('ButtonLogout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ButtonLogout />);
    expect(baseElement).toBeTruthy();
  });
});
