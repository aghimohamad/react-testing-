import type { ArticleDto, ArticleStatus } from '@system/blog-api-models';
import type { MouseEvent as ReactMouseEvent } from 'react';

type OnGoToClickEvent = ReactMouseEvent<HTMLButtonElement, MouseEvent>;
type OnGoToClick = (e: OnGoToClickEvent) => void;

type ArticleTileProps = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  author: string;
  stack: string[];
  width: number;
  status: ArticleStatus
  tags: string[];
  onGoToClick: OnGoToClick;
}

type ArticlesGridProps = {
  onGoToClick: OnGoToClick;
  articles: ArticleDto[];
}

export type {
  ArticlesGridProps,
  ArticleTileProps,
  OnGoToClickEvent,
  OnGoToClick,
};
