// Necessary if using App Router to ensure this file runs on the client
'use client';

import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: process.env.NEXT_PUBLIC_DD_APPLICATION_ID!,
  clientToken: process.env.NEXT_PUBLIC_DD_CLIENT_ID!,
  site: 'us5.datadoghq.com',
  service: 'distributed-checkout',
  env: process.env.NODE_ENV,
  // Specify a version number to identify the deployed version of your application in Datadog
  version: process.env.NEXT_PUBLIC_VERSION,
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
  // Specify URLs to propagate trace headers for connection between RUM and backend trace
  allowedTracingUrls: [(url) => url.includes('localhost')]
});

export default function DatadogInit() {
  // Render nothing - this component is only included so that the init code
  // above will run client-side
  return null;
}
