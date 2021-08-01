import classNames from 'classnames';
import React, { ReactNode } from 'react';
import '../styles/question.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export const Question = ({
  content,
  author,
  children,
  isHighlighted = false,
  isAnswered = false,
}: QuestionProps) => {
  return (
    <div
      className={classNames(
        'question',
        { highlighted: isHighlighted && !isAnswered },
        { answered: isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
};
