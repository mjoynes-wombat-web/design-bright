import React from 'react';
import { Link } from 'react-router-dom';


import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button } from '../src/client/components/button';
import { Input, Select, RadioFieldset, Checkbox } from '../src/client/components/inputs';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Buttons', module)
  .add('Primary Button', () => <Button primary onClick={ action('button-click') }>Primary</Button>)
  .add('Primary Button - Disabled', () => <Button primary disabled onClick={ action('button-click') }>Disabled Primary</Button>)
  .add('Secondary Button', () => <Button secondary onClick={ action('button-click') }>Secondary</Button>)
  .add('Secondary Button - Disabled', () => <Button secondary disabled onClick={ action('button-click') }>Disabled Secondary</Button>)
  .add('Cancel Button', () => <Button cancel onClick={ action('button-click') }>Cancel</Button>);

storiesOf('Inputs', module)
  .add(
    'Plain Input',
    () => <Input
      onChange={action('Plain Input Changed')}
      type='text'
      inputLabel='Plain Input'
      id='plainInput'/>)
  .add(
    'Required Input',
    () => <Input
      onChange={action('Required Input Changed')}
      type='text'
      inputLabel='Required Input'
      id='requiredInput'
      required/>)
  .add(
    'Input With Error',
    () => <Input
      onChange={action('Errored Input Changed')}
      type='text'
      inputLabel='Errored Input'
      id='erroredInput'
      required
      error={
        <span>
          There is an error on this input. <a href='#'>You can visit this link for more info.</a>
        </span>
      } />)
  .add(
    'Select List',
    () => <Select
      onChange={action('Select Changed')}
      type='text'
      inputLabel='Select List'
      id='selectList'
      required
      options={
        [
          { name: 'First Item', value: 'first-item' },
          { name: 'Second Item', value: 'second-item' },
        ]
      }
    />)
  .add(
    'Radio Fieldset',
    () => <RadioFieldset
      fieldsetName='radioFieldset'
      fieldsetLegend='Radio Fieldset'
      required
      onChange={action('Radio Fieldset Item Selected')}
      fields={
        [
          {
            id: 'firstItem',
            name: 'First Item',
            value: 'firstItem',
            checked: true,
            children: 'First Item Child',
          },
          {
            id: 'secondItem',
            name: 'Second Item',
            value: 'secondItem',
            checked: false,
          },
        ]
      }
    />)
  .add(
    'Checkbox',
    () => <Checkbox
      id={'checkbox'}
      onChange={action('Checkbox Selected')}
      required
      checked={false}>
        This is a checkbox input.
    </Checkbox>,
  );