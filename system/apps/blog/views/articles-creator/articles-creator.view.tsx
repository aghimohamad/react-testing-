import {
  Box,
  Button,
  Loader,
  Font,
  List,
  ListItem,
  CreatorLayout,
  CloseIcon,
  Code,
  FullScreenCloseIcon,
  FullScreenIcon,
  PageIcon,
  CodeIcon,
} from '@system/figa-ui';
import { MainLayout } from '../../components';
import { ARTICLE_COMPONENTS } from '../../core';
import { useArticlesCreatorStore, reset } from '../../store/articles-creator';
import { ArticleMdRenderer } from '../../features/articles-creator';

const MDX = `#### Quick start

Here you find basic info and useful links. 

#### First run

Clone repository and open it in your IDE. Remember to have \`node 18+\` and \`npm 6+\` versions. 

Next type following commands:

1. \`cd system\`

2. \`npm i --legacy-peer-deps\`

3. Then run anything you want. It can be app, more than one apps, storybook or other. Check **COMMANDS.md** file for more. 

#### Structure of repository

We have two main parts in this repo. First is an API in **.NET** ecosystem and second is monorepo in **JavaScript**. 

We used monorepo because it gives us easy way to give permissions for devs and it provides linear git history of changes in whole system. 

Thanks to this everyone will be able to track progress. 

## Description of repository elements

Currently we have several applications:

1. First is a blog platform currently available at [GreenOn Software](https://greenonsoftware.com). We migrating it to **Next** from **Gatsby**.

2. Second is an app for musicans [jamjam](https://jamjambeings.com) 

- we are migrating it from **CRA** to **Next**.

- we are migrating it from **CRA** to **Next**.

- we are migrating it from **CRA** to **Next**.

3. Third is **design-system** implementation with reusable not domain specific UI. Its called **figa-ui**.

4. We have also other reusable parts like **figa-hooks** which implements reusable not app specific hooks.

1. Second is an app for musicans [jamjam](https://jamjambeings.com) 

- we are migrating it from **CRA** to **Next**.

- we are migrating it from **CRA** to **Next**.

- we are migrating it from **CRA** to **Next**.

![My image description](https://img.freepik.com/premium-wektory/dobry-widok-na-gory-grafika-ilustracja-projekt-koszulki-wektor-sztuki_24519-2593.jpg?w=2000)
*my description of image!*
`;

const ArticlesCreatorView = () => {
  const { key, code, change, load } = useArticlesCreatorStore();

  if (key === 'idle') {
    return (
      <MainLayout>
        <Box
          margin="auto"
          maxWidth="400px"
          variant="outlined"
          spacing={[150, 250, 500]}
          padding={[250, 250, 250, 250]}
        >
          <Font variant="h6">Try to use our editor</Font>
          <Font variant="b1">Create an article in the following way: </Font>
          <List ordered>
            <ListItem>Write article content in md syntax</ListItem>
            <ListItem>
              Check how it looks like on mobile/tablet/desktop devices
            </ListItem>
            <ListItem>Confirm an article and wait for review</ListItem>
            <ListItem>
              Improve required stuff and get your article published!
            </ListItem>
          </List>
          <Box right>
            <Button onClick={() => load(MDX)}>Start</Button>
          </Box>
        </Box>
      </MainLayout>
    );
  }

  if (key === 'loading') {
    return (
      <MainLayout>
        <Box margin="auto">
          <Box margin="auto">
            <Loader size="big" />
          </Box>
        </Box>
      </MainLayout>
    );
  }

  if (key === 'loaded') {
    return (
      <CreatorLayout
        navigation={() => (
          <Box orientation="row" between>
            <Font variant="h5">Article creator</Font>
            <Button size={1} shape="rounded" onClick={reset}>
              <CloseIcon />
            </Button>
          </Box>
        )}
        codeToolbox={({ view, expandBoth, expandCode, expandPreview }) => (
          <>
            {view === 'code' && (
              <Button size={1} shape="rounded" onClick={expandPreview}>
                <PageIcon />
              </Button>
            )}
            {view === 'code-full' && (
              <Button size={1} shape="rounded" onClick={expandBoth}>
                <FullScreenCloseIcon />
              </Button>
            )}
            {view === 'both' && (
              <Button size={1} shape="rounded" onClick={expandCode}>
                <FullScreenIcon />
              </Button>
            )}
          </>
        )}
        previewToolbox={({ view, expandBoth, expandPreview, expandCode }) => (
          <>
            {view === 'preview' && (
              <Button size={1} shape="rounded" onClick={expandCode}>
                <CodeIcon />
              </Button>
            )}
            {view === 'preview-full' && (
              <Button size={1} shape="rounded" onClick={expandBoth}>
                <FullScreenCloseIcon />
              </Button>
            )}
            {view === 'both' && (
              <Button size={1} shape="rounded" onClick={expandPreview}>
                <FullScreenIcon />
              </Button>
            )}
          </>
        )}
      >
        <Code onChange={change}>{code}</Code>
        <ArticleMdRenderer
          code={code}
          components={ARTICLE_COMPONENTS}
          thumbnail={null}
        />
      </CreatorLayout>
    );
  }

  throw new Error('Lack of component support for this key ' + key);
};

export { ArticlesCreatorView };
