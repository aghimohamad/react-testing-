import { Alert, Box, Button, Font, List, ListItem } from '@system/figa-ui';
import { MainLayout } from '../../components';
import { article_actions, useArticleStore } from '../../store/article';
import { useRouter } from 'next/router';
import { getLang } from '../../dk';
import { LoaderScreen } from './loader-screen';
import { articles_creator_actions } from '../../store/articles-creator';

const mdx = `#### Quick start

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

const InitialScreen = () => {
  const router = useRouter();
  const articleState = useArticleStore();

  const handleStart = async (): Promise<void> => {
    const url = new URLSearchParams(window.location.search).get('url');
    const lang = getLang(router.pathname);

    if (url) {
      try {
        const article = await article_actions.load({ lang, url });

        articles_creator_actions.setView('creator');
        articles_creator_actions.setForm({
          ...article,
          thumbnail: {
            file: null,
            preview: [article.thumbnailUrl],
          },
        });

        // eslint-disable-next-line no-empty
      } catch {}

      return;
    }

    articles_creator_actions.setView('creator');
    articles_creator_actions.setForm({ content: mdx });
  };

  return (
    <MainLayout>
      {articleState.is === 'busy' ? (
        <LoaderScreen />
      ) : (
        <Box
          margin="auto"
          maxWidth="400px"
          variant="outlined"
          spacing={[150, 250, 500, articleState.is === 'fail' ? 250 : 0]}
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
            <Button onClick={handleStart}>Start</Button>
          </Box>
          {articleState.is === 'fail' && (
            <Alert type="error">{articleState.error.message}</Alert>
          )}
        </Box>
      )}
    </MainLayout>
  );
};

export { InitialScreen };