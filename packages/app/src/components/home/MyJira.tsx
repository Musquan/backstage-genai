import React from 'react';
import {
  Page,
  Content,
  ContentHeader,
} from '@backstage/core-components';
import { Grid } from '@material-ui/core';
import {
  EntityJiraQueryCard,
  EntityJiraActivityStreamCard,
} from '@roadiehq/backstage-plugin-jira';
import { EntityProvider } from '@backstage/plugin-catalog-react';

const jiraEntity = {
  apiVersion: 'backstage.io/v1alpha1',
  kind: 'Component',
  metadata: {
    name: 'global-jira',
    annotations: {
      'jira/all-issues-jql': 'project = SCRUM ORDER BY updated DESC',
      'jira/project-key': 'SCRUM',
    },
  },
  spec: {},
};

export const MyJiraPage = () => (
  <Page themeId="tool">
    <Content>
      <ContentHeader title="My Jira" />

      <EntityProvider entity={jiraEntity}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <EntityJiraQueryCard
              title="My Open Tickets"
              jqlQuery="assignee = currentUser() AND resolution = Unresolved ORDER BY priority DESC"
              maxResults={10}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <EntityJiraQueryCard
              title="High‑Priority Bugs"
              jqlQuery="project = SCRUM AND priority = High AND issuetype = bug"
              maxResults={10}
            />
          </Grid>

          <Grid item xs={12}>
            <EntityJiraActivityStreamCard />
          </Grid>
        </Grid>
      </EntityProvider>
    </Content>
  </Page>
);
