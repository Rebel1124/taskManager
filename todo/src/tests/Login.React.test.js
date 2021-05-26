//Import the required Libraries
import React from 'react';
import Login from './Log.js';
import renderer from 'react-test-renderer';

//We then setup the test function, which is a snapshot test.
test('renders correctly', () => {
    const tree = renderer
    .create(<Login />)
    .toJSON();
    expect(tree).toMatchSnapshot();
    });