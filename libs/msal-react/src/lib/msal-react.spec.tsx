import { render } from '@testing-library/react';

import MsalReact from './msal-react';

describe('MsalReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MsalReact />);
    expect(baseElement).toBeTruthy();
  });
});
