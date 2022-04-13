import classNames from 'classnames';

export const ReadIndicator = ({
  done,
  notDoneText = 'Unread',
  doneText = 'Read',
}: {
  done: boolean;
  notDoneText?: string;
  doneText?: string;
}) => (
  <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
    <span
      className={classNames(
        'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium',
        !done && ' text-rssx-bg bg-rssx-light',
        done && 'bg-rssx-border',
      )}
    >
      {done ? doneText : notDoneText}
    </span>
  </div>
);
