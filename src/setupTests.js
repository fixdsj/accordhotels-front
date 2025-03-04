import '@testing-library/jest-dom';

import ResizeObserver from 'resize-observer-polyfill';

window.global.ResizeObserver = ResizeObserver;