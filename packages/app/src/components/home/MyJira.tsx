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
  JiraQueryCard,
} from '@roadiehq/backstage-plugin-jira';
import { EntityProvider } from '@backstage/plugin-catalog-react';
import { CustomJiraQueryCard } from './CustomJiraQueryCard'; // adjust the path if needed


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
        <Grid container spacing={3} >
          <Grid item xs={12} >
            <CustomJiraQueryCard
              title="Open Tickets"
              jqlQuery="project = SCRUM AND resolution = Unresolved ORDER BY priority DESC"
              maxResults={10}
            />
          </Grid>

          <Grid item xs={12} >
            <CustomJiraQueryCard
              title="Open Bugs"
              jqlQuery='project = SCRUM AND issuetype = "Bug" '
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
