import { Avatar, Box, Typography } from '@mui/material';
import { SystemStyleObject, Theme } from '@mui/system';

import { Card } from '@components/atoms';
import { ChangeEvent, useCallback, useState } from 'react';
import { IContact } from 'react-coding-interview-shared/models';

export interface IContactCardProps {
  person: IContact;
  sx?: SystemStyleObject<Theme>;
}

interface InlineInputFieldProps {
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

const InlineInputField = ({ onSubmit, onCancel }: InlineInputFieldProps) => {
  const [value, setValue] = useState<string>('');

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [onSubmit],
  );

  const onInputSubmit = () => {
    onSubmit(value);
  };

  const onInputCancel = () => {
    setValue('');
    onCancel();
  };

  return (
    <>
      <input value={value} onChange={onInputChange} />
      <button onClick={onInputSubmit}>ok</button>
      <button onClick={onInputCancel}>cancel</button>
    </>
  );
};

export const ContactCard: React.FC<IContactCardProps> = ({
  person: { name, email },
  sx,
}) => {
  const [editName, setEditName] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const onSubmit = useCallback((value: string) => {
    setNewName(value);
    setEditName(false);
  }, []);

  const onCancel = () => {
    setEditName(false);
  };

  return (
    <Card sx={sx}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar />
        <Box textAlign="center" mt={2}>
          {editName ? (
            <InlineInputField onSubmit={onSubmit} onCancel={onCancel} />
          ) : (
            <Typography
              variant="subtitle1"
              lineHeight="1rem"
              onClick={() => setEditName((current) => !current)}
            >
              {newName || name}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            {email}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
