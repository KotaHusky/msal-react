import { render } from '@testing-library/react';

import ButtonLogin from './button-login';

describe('ButtonLogin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ButtonLogin />);
    expect(baseElement).toBeTruthy();
  });
});
