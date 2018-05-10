import React from 'react';
import ReactDOM from 'react-dom';
import { createShallow, getClasses } from 'material-ui/test-utils';

import AppDrawerElements from './AppDrawerElements';

describe('<AppDrawerElements />', () => {
let shallow;

const TestIcon = () => <span>Not a Icon</span>;

const URL = {
display: {
url: '/theUrl/with/more',
name: 'Testing...',
display: true,
icon: <TestIcon />,
},
};

beforeAll(() => {
shallow = createShallow({ dive: true });
});

it('should fire onClose when click the close button', () => {
const onCloseMock = jest.fn();
const onClose = jest.fn(() => {
onCloseMock();
});

    const wrapper = shallow(<AppDrawerElements url={URL} onClose={onClose} />);

    wrapper
      .childAt(0)
      .childAt(0)
      .childAt(0)
      .simulate('click');
    expect(onCloseMock).toBeCalled();

});
});
