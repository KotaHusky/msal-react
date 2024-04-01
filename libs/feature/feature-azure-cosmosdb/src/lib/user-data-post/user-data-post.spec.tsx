import { render } from '@testing-library/react';

import UserDataPost from './user-data-post';

describe('UserDataPost', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserDataPost />);
    expect(baseElement).toBeTruthy();
  });
});
