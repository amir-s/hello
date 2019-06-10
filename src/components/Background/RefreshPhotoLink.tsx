import React, { ReactNode, useContext } from 'react';

import { backgroundContext } from './Background';

interface Props {
  children?: ReactNode;
  [key: string]: any;
}

export default function RefreshPhotoLink({ children, ...props }: Props) {
  const context = useContext(backgroundContext)!;

  const spin = context.nextIsLoading ? 'fa-spin' : '';

  const style = {
    opacity: context.nextIsLoading ? 0.6 : 1,
    cursor: context.nextIsLoading ? 'default' : 'pointer',
  };

  const handler = () => {
    if (context.nextIsLoading) return;
    context.next();
  };

  return (
    <div {...props} onClick={handler} style={style}>
      <i className={`fas fa-sync ${spin}`} /> &nbsp; {children}
    </div>
  );
}
