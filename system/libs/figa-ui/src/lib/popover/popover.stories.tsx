import type { Story, Meta } from '@storybook/react';

import { Popover } from './popover';
import { Button } from '../button';
import { Box } from '../box';
import { Font } from '../font';

export default {
  component: Popover,
  title: 'Popover',
} as Meta;

const LABELS = ['Popover 1', 'Popover 2', 'Popover 3 a little bit bigger'];

const Template: Story = () => {
  return (
    <Box padding={[300, 300, 300, 300]}>
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'space-between',
          height: '100vh',
        }}
      >
        {['top', 'middle', 'bottom'].map((align) => (
          <div
            key={align}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {LABELS.map((label) => (
              <Popover
                key={label}
                initialOpen
                trigger={({ opened, toggle }) => (
                  <Button onClick={toggle}>
                    {opened ? 'Hide me' : 'Show me'}
                  </Button>
                )}
              >
                {({ close }) => (
                  <Box
                    spacing={[400]}
                    padding={[250, 250, 250, 250]}
                    variant="outlined"
                  >
                    <Font variant="h6">{label}</Font>
                    <Button onClick={close}>Close Me</Button>
                  </Box>
                )}
              </Popover>
            ))}
          </div>
        ))}
      </div>
    </Box>
  );
};

export const Default = Template.bind({});
Template.args = {};
