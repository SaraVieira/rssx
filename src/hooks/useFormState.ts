import { Website } from '@prisma/client';
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
  website,
}: {
  data: any;
  website: string;
}) => {
  const [formState, setFormState] = useState<Omit<Website, 'id'> | any>(
    omit(data, ['id']),
  );
  useEffect(() => {
    if (website) {
      if (website === 'new') {
        setFormState(defaultState);
      } else {
        setFormState(data);
      }
    }
  }, [website, data]);

  return { formState, setFormState };
};
