import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Header } from '../../Sidebar/Header';
import { Section } from '../../Sidebar/Section';
import { Sidebar } from '../../Sidebar';

interface Props {
  onClose: () => void;
}

interface Values {
  name?: string;
  notes?: string;
}

export const ProjectSettingsSidebar = ({ onClose }: Props) => {
  const { register, handleSubmit } = useForm<Values>({
    defaultValues: {
      name: '',
      notes: ''
    }
  });

  const onSubmit = useCallback((values: Values) => {
    console.log(values);
  }, []);

  return (
    <Sidebar header={<Header title="Project settings" onClose={onClose} />}>
      <Section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField {...register('name')} label="Name" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('notes')}
                label="Notes"
                variant="outlined"
                rows={12}
                multiline
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </Section>
    </Sidebar>
  );
};
