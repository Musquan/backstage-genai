import { createBackendModule, coreServices } from '@backstage/backend-plugin-api';
import { authProvidersExtensionPoint } from '@backstage/plugin-auth-node';
import { providers as authBackendProviders } from '@backstage/plugin-auth-backend';
import { stringifyEntityRef, DEFAULT_NAMESPACE } from '@backstage/catalog-model';

export default createBackendModule({
  pluginId: 'auth',
  moduleId: 'saml-provider',
  register(env) {
    env.registerInit({
      deps: {
        providers: authProvidersExtensionPoint,
        config: coreServices.rootConfig,
      },
      async init({ providers, config }) {
        providers.registerProvider({
          providerId: 'saml',
          factory: authBackendProviders.saml.create({
            signIn: {
              resolver: async ({ profile }, ctx) => {
                const email = profile.email;
                if (!email) {
                  throw new Error('No email in SAML assertion');
                }
                const username = email.split('@')[0];
                const userRef = stringifyEntityRef({
                  kind: 'User',
                  namespace: DEFAULT_NAMESPACE,
                  name: username,
                });
                return ctx.issueToken({ claims: { sub: userRef, ent: [userRef] } });
              },
            },
          }),
        });
      },
    });
  },
});
