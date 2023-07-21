import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Header } from '../components/Header';
import { Section } from '../components/Section';
import { ControlsContainer } from '../components/ControlsContainer';

interface Values {
  name?: string;
  notes?: string;
}

export const ProjectControls = () => {
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
    <ControlsContainer header={<Header title="Project settings" />}>
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
    </ControlsContainer>
  );
};
