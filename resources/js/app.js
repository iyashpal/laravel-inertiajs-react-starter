import '@/bootstrap'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { InertiaProgress } from '@inertiajs/progress'
import { createInertiaApp } from '@inertiajs/inertia-react'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        return createRoot(el).render(<App {...props} />);
    },
});

InertiaProgress.init({ color: '#1d4ed8' });
