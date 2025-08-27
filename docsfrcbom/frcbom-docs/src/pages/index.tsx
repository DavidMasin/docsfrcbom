import React from 'react';
// @ts-ignore
import {Redirect} from '@docusaurus/router';

export default function Home() {
    return <Redirect to="/intro" />;
}