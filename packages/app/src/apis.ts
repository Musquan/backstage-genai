import {
  AnyApiFactory,
  configApiRef,
  createApiRef,
  discoveryApiRef,
  fetchApiRef,
  ProfileInfoApi,
  BackstageIdentityApi,
  SessionApi,
  createApiFactory,
} from '@backstage/core-plugin-api';
import { SamlAuth } from '@backstage/core-app-api';

export const localSamlAuthApiRef = createApiRef<ProfileInfoApi & BackstageIdentityApi & SessionApi>({
  id: 'internal.auth.saml',

});
import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  ScmAuth,
} from '@backstage/integration-react';

import {
  jiraDashboardApiRef,
  JiraDashboardClient,
} from '@axis-backstage/plugin-jira-dashboard';


export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: localSamlAuthApiRef,
    deps: { discoveryApi: discoveryApiRef, configApi: configApiRef },
    factory: ({ discoveryApi }) =>
      SamlAuth.create({
        discoveryApi,
        provider: { id: 'saml', title: 'Custom SAML provider', icon: () => null },
      }),
  }),

  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),

  createApiFactory({
    api: jiraDashboardApiRef,
    deps: { discoveryApi: discoveryApiRef, fetchApi: fetchApiRef },
    factory: ({ discoveryApi, fetchApi }) =>
      new JiraDashboardClient({ discoveryApi, fetchApi }),
  }),

  ScmAuth.createDefaultApiFactory(),
];
