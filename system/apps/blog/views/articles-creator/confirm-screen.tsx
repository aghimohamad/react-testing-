import { Alert, Box, Button, Font, List, ListItem } from '@system/figa-ui';
import {
  articles_creator_actions,
  useArticlesCreatorStore,
} from '../../store/articles-creator';
import { MainLayout } from '../../components';
import { LoaderScreen } from './loader-screen';
import { useAuthStore } from '../../store/auth';
import { useMoveToRedirect } from '../../dk';
import { useArticleStore } from '../../store/article';

const ConfirmScreen = () => {
  const articleCreatorState = useArticlesCreatorStore();
  const articleStore = useArticleStore();
  const authStore = useAuthStore();
  const { go } = useMoveToRedirect();

  const handleClose = (): void => {
    articles_creator_actions.setView('creator');
  };

  const handleSubmit = (): void => {
    if (authStore.key === 'authorized') {
      articles_creator_actions.confirm(
        new URLSearchParams(window.location.search).get('url')
      );
      return;
    }

    go('/sign-in', '/articles-creator');
  };

  return (
    <MainLayout>
      {articleCreatorState.is === 'busy' ? (
        <LoaderScreen />
      ) : (
        <Box
          padding={[250, 250, 250, 250]}
          maxWidth="400px"
          margin="auto"
          variant="outlined"
          spacing={[
            200,
            150,
            400,
            articleCreatorState.is === 'fail' || articleCreatorState.is === 'ok'
              ? 250
              : 0,
          ]}
        >
          <Font variant="h5">Do you want to submit an article for review?</Font>
          <Font variant="b1">What will happen now: </Font>
          <List ordered>
            <ListItem>Your article will be sent to review</ListItem>
            <ListItem>
              Moderators will check its content and suggest corrections
            </ListItem>
            <ListItem>
              Then you will have to introduce them - don&apos;t worry you will
              get an email notification
            </ListItem>
            <ListItem>
              Then your article will be published and will appear in the tab of
              your articles.
            </ListItem>
          </List>
          <Box orientation="row" spacing={[150]} right>
            <Button variant="outlined" onClick={handleClose}>
              Go back
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </Box>
          {articleCreatorState.is === 'ok' && (
            <Alert type="ok">
              Article has been{' '}
              {articleStore.is === 'idle' ? 'created' : 'edited'} ❤!
            </Alert>
          )}
          {articleCreatorState.is === 'fail' && (
            <Alert type="error">{articleCreatorState.error.message}</Alert>
          )}
        </Box>
      )}
    </MainLayout>
  );
};

export { ConfirmScreen };
