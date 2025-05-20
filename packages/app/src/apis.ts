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

import { JiraAPI, jiraApiRef } from '@roadiehq/backstage-plugin-jira';


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
    api: jiraApiRef,
    deps: { discoveryApi: discoveryApiRef, configApi: configApiRef, fetchApi: fetchApiRef },
    factory: ({ discoveryApi, configApi, fetchApi }) =>
      new JiraAPI({ discoveryApi, configApi, fetchApi }),
  }),


  ScmAuth.createDefaultApiFactory(),
];
