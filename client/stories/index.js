import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button } from './components/button';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Buttons', module)
  .add('Primary Button', () => <Button primary onClick={ action('button-click') }>Primary</Button>)
  .add('Primary Button - Disabled', () => <Button primary disabled onClick={ action('button-click') }>Disabled Primary</Button>)
  .add('Secondary Button', () => <Button secondary onClick={ action('button-click') }>Secondary</Button>)
  .add('Secondary Button - Disabled', () => <Button secondary disabled onClick={ action('button-click') }>Disabled Secondary</Button>)
  .add('Cancel Button', () => <Button cancel onClick={ action('button-click') }>Cancel</Button>);

