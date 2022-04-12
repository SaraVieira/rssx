import { Source } from '@prisma/client';
import { omit } from 'lodash-es';
import { useEffect, useState } from 'react';

export const defaultState = {
  title: '',
  feedUrl: '',
  url: '',
  description: '',
};

export const useFormState = ({
  data,
  source,
}: {
  data: any;
  source: string;
}) => {
  const [formState, setFormState] = useState<Omit<Source, 'id'> | any>(
    omit(data, ['id']),
  );
  useEffect(() => {
    if (source) {
      if (source === 'new') {
        setFormState(defaultState);
      } else {
        setFormState(data);
      }
    }
  }, [source, data]);

  return { formState, setFormState };
};
