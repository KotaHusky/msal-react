import { render } from '@testing-library/react';

import FeatureMsalReact from './feature-msal-react';

describe('FeatureMsalReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureMsalReact />);
    expect(baseElement).toBeTruthy();
  });
});
