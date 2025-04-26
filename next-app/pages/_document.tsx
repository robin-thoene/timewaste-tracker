import { Head, Html, Main, NextScript } from 'next/document';
import React, { JSX } from 'react';

/**
 * Framework file by NextJS https://nextjs.org/docs/advanced-features/custom-document
 * @returns {Element} Document outline
 */
export default function Document(): JSX.Element {
    return (
        <Html>
            <Head>
                <meta name="robots" content="index, follow" />
                <meta name="description" content="This is the templated NextJS app for the project timewaste-tracker." />
                <meta property="og:title" content="timewaste-tracker" />
                <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/img/favicon/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="256x256" href="/img/favicon/favicon-256x256.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
