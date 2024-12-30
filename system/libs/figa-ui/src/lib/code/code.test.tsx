import { render, screen, waitFor } from '@testing-library/react';
import { Code } from './code';
import { ThemeProvider } from '../theme-provider';

describe('Code can be used when: ', () => {
  const children = `  const { mergeConfig } = require('vite');
  const viteTsConfigPaths = require('vite-tsconfig-paths').default;
  
  module.exports = {
    core: { builder: '@storybook/builder-vite' },
    stories: [
      '../src/lib/**/*.stories.mdx',
      '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: ['@storybook/addon-essentials'],
    staticDirs: [{ from: '../../../assets', to: '/' }],
    async viteFinal(config, { configType }) {
      return mergeConfig(config, {
        plugins: [
          viteTsConfigPaths({
            root: '../../../',
          }),
        ],
      });
    },
  };
  
  // To customize your Vite configuration you can use the viteFinal field.
  // Check https://storybook.js.org/docs/react/builders/vite#configuration
  // and https://nx.dev/packages/storybook/documents/custom-builder-configs`;

  it('renders given code snippet', async () => {
    render(
      <ThemeProvider>
        <Code children={children} />
      </ThemeProvider>
    );

    await waitFor(() => {
      screen.getByText(
        /To customize your Vite configuration you can use the viteFinal field./
      );
    });
  });

  it('[FRAGILE] assigns class names for code component', async () => {
    const { container } = render(
      <ThemeProvider>
        <Code children={children} className="my-class" />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(container.querySelector('.my-class')).toBeTruthy();
    });
  });

  describe('during readonly mode', () => {
    it('[FRAGILE] disables selection', async () => {
      const readonly = render(
        <ThemeProvider>
          <Code children={children} readonly />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(readonly.container.querySelector('.cm-activeLine')).toBeFalsy();
      });

      const editable = render(
        <ThemeProvider>
          <Code children={children} />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(editable.container.querySelector('.cm-activeLine')).toBeTruthy();
      });
    });
  });
});
