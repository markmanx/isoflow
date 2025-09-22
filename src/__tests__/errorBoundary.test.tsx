// Here we test that the IsoFlow component handles errors in a recoverable way
// This means that when using <IsoFlow> in an app, if an error happens, the app
// should be able to catch the error and recover from it
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Isoflow } from '../Isoflow';
import { initialData as initialDataBasicExample } from '../examples/initialData';
import { invalidInitialData } from '../__mocks__/testData';
import { ErrorBoundary } from 'react-error-boundary';
import { renderExpectErrLog } from 'src/__mocks__/expectRenderError';


const fallback = ({error}: {error: Error}) => <div>Something went wrong: {error.message}</div>;

describe('App and Error Boundary', () => {

    test('providing minimal props works', async () => {
        render(<Isoflow mainMenuOptions={[]} initialData={{ title: 'MyTitle', items: [], views: [], icons: [], colors: [] }} />);
        expect(screen.getByText('MyTitle')).toBeInTheDocument();
    });

    test.skip('providing example initialData works', async () => {
        render(<Isoflow mainMenuOptions={[]} initialData={initialDataBasicExample} />);
        expect(screen.getByText(/Airport/i)).toBeInTheDocument();
    });

    test('providing invalid initialData throws error', async () => {
        try {
            render(<Isoflow mainMenuOptions={[]} initialData={invalidInitialData} />);
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
            expect((e as Error).message).toMatch(/non-existant item in the model/);
        }
    });

    test.only('using error boundary works', async () => {
        renderExpectErrLog(
            <ErrorBoundary onError={() => {}} fallbackRender={fallback}>
                <Isoflow mainMenuOptions={[]} initialData={invalidInitialData} />
            </ErrorBoundary>,
            "Invalid initialData"
        );

        expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
        expect(screen.getByText(/non-existant item in the model/)).toBeInTheDocument();
    });
});