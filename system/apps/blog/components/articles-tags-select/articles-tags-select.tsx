import {
  Badge,
  Box,
  Button,
  CloseIcon,
  Font,
  Loader,
  Popover,
  TagsIcon,
  tokens,
  wrap,
} from '@system/figa-ui';
import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { useArticlesTagsStore } from '../../store/articles-tags/store';
import { articles_tags_store_actions } from '../../store/articles-tags';
import type { ArticleTag, ArticleTags } from '@system/blog-api-models';
import type { ArticlesTagsSelectProps, TagsObject } from './defs';
import styled from 'styled-components';

const createTagsObject = (tags: ArticleTags): TagsObject => {
  return tags.reduce((acc, tag) => {
    acc[tag] = true;
    return acc;
  }, {});
};

const toArticleTags = (tagsObject: TagsObject): ArticleTags =>
  Object.entries(tagsObject)
    .filter(([, value]) => value)
    .map(([key]) => key);

const Tags = styled.div`
  ${wrap()}

  .articles-jumbo-tag {
    margin: 0 ${tokens.spacing[100]} ${tokens.spacing[100]} 0;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const Trigger = ({ children }: { children: ReactNode }) => {
  const { toggle } = Popover.use();
  const articlesTagsState = useArticlesTagsStore();

  return (
    <Popover.Trigger>
      <Button
        title="Articles tags"
        size={2}
        equal
        className="articles-tags-select-trigger"
        loading={articlesTagsState.is === 'busy'}
        onClick={() => {
          toggle();
          articlesTagsState.is !== 'ok' && articles_tags_store_actions.load();
        }}
      >
        {children}
      </Button>
    </Popover.Trigger>
  );
};

const Content = ({ tags, onConfirm }: ArticlesTagsSelectProps) => {
  const { close } = Popover.use();
  const articlesTagsState = useArticlesTagsStore();
  const [activeTags, setActiveTags] = useState<TagsObject>({});

  useEffect(() => setActiveTags(createTagsObject(tags)), [tags]);

  const handleTagClick = useCallback((tag: ArticleTag): void => {
    setActiveTags((prevTags) => ({
      ...prevTags,
      [tag]: prevTags[tag] ? false : true,
    }));
  }, []);

  const articleTags = useMemo(() => toArticleTags(activeTags), [activeTags]);

  return (
    <Popover.Content
      padding={[250, 250, 250, 250]}
      variant="outlined"
      minWidth="280px"
      maxWidth="500px"
    >
      {(articlesTagsState.is === 'busy' || articlesTagsState.is === 'idle') && (
        <Box margin="auto">
          <Loader size="small" />
        </Box>
      )}

      {articlesTagsState.is === 'ok' && (
        <Box spacing={[250, 500]}>
          <Box orientation="row" between>
            <Font variant="h6">Tags</Font>
            <Button
              size={1}
              shape="rounded"
              variant="outlined"
              motive="tertiary"
              onClick={close}
            >
              <CloseIcon />
            </Button>
          </Box>
          <Tags className="articles-jumbo-tags">
            {articlesTagsState.tags.map((tag) => (
              <Badge
                className="articles-jumbo-tag"
                key={tag}
                motive="casual"
                variant={activeTags[tag] ? 'filled' : 'outlined'}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </Tags>
          <Box orientation="row" right spacing={[150]}>
            {articleTags.length > 0 && (
              <Button
                size={2}
                variant="outlined"
                motive="tertiary"
                onClick={() => {
                  setActiveTags({});
                }}
              >
                Clean
              </Button>
            )}

            <Button
              size={2}
              onClick={() => {
                close();
                onConfirm(articleTags);
              }}
            >
              Accept
            </Button>
          </Box>
        </Box>
      )}
    </Popover.Content>
  );
};

const ArticlesTagsSelect = (props: ArticlesTagsSelectProps) => {
  const { tags } = props;
  return (
    <Popover closeMode="backdrop">
      <Trigger>{tags.length > 0 ? tags.length : <TagsIcon />}</Trigger>
      <Content {...props} />
    </Popover>
  );
};

export { ArticlesTagsSelect };
