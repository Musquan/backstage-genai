import { JiraUserIssuesViewCard } from '@axis-backstage/plugin-jira-dashboard';
import { Grid } from '@material-ui/core';

export const HomePage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <JiraUserIssuesViewCard
        filterName="BackstageFilter"
        bottomLinkProps={{
          link: 'https://rsowmya1908.atlassian.net/issues',
          title: 'Open in Jira',
        }}
        maxResults={30}
        tableOptions={{
          toolbar: true,
          search: true,
          paging: true,
          pageSize: 15,
        }}
        tableStyle={{
          padding: '5px',
          overflowY: 'auto',
          width: '95%',
        }}
      />
    </Grid>
  </Grid>
);
