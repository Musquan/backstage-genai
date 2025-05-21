// import React from 'react';
// import {
//   InfoCard,
//   Progress,
//   ResponseErrorPanel,
// } from '@backstage/core-components';
// import { Button, List, ListItem, Typography } from '@material-ui/core';
// import { useApi } from '@backstage/core-plugin-api';
// import { jiraApiRef } from '@roadiehq/backstage-plugin-jira';
// import { useAsync } from 'react-use';
// import { useNavigate } from 'react-router-dom';

// type CustomJiraQueryCardProps = {
//   title: string;
//   jqlQuery: string;
//   maxResults?: number;
// };

// export const CustomJiraQueryCard = ({
//   title,
//   jqlQuery,
//   maxResults = 10,
// }: CustomJiraQueryCardProps) => {
//   const jiraApi = useApi(jiraApiRef);
//   const navigate = useNavigate();

//   const { loading, error, value: issues } = useAsync(async () => {
//     const data = await jiraApi.jqlQuery(jqlQuery, maxResults);
//     return data;
//   }, [jqlQuery, maxResults]);

//   if (loading) {
//     return <Progress />;
//   }

//   if (error) {
//     return <ResponseErrorPanel error={error} />;
//   }

//   return (
//     <InfoCard title={title}>
//       <List dense>
//         {(issues ?? []).map(issue => (
//           <ListItem key={issue.key}>
//             <div>
//               <Typography variant="body1">
//                 [{issue.key}] {issue.fields?.summary}
//               </Typography>
//               <Typography variant="caption" color="textSecondary">
//                 {issue.fields?.status?.name ?? 'No Status'}
//               </Typography>
//             </div>
//             <Button
//               variant="outlined"
//               size="small"
//               color="primary"
//               style={{ marginTop: 8 }}
//               onClick={() =>
//                 navigate('/catalog/default/component/calculator-app') // or use issue.key if dynamic
//               }
//             >
//               Go to Component
//             </Button>
//           </ListItem>
//         ))}
//       </List>
//     </InfoCard>
//   );
// };


import React from 'react';
import {
  InfoCard,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import { Button, List, ListItem, Typography } from '@material-ui/core';
import { useApi } from '@backstage/core-plugin-api';
import { jiraApiRef } from '@roadiehq/backstage-plugin-jira';
import { useAsync } from 'react-use';
import { useNavigate } from 'react-router-dom';

type CustomJiraQueryCardProps = {
  title: string;
  jqlQuery: string;
  maxResults?: number;
};

export const CustomJiraQueryCard = ({
  title,
  jqlQuery,
  maxResults = 10,
}: CustomJiraQueryCardProps) => {
  const jiraApi = useApi(jiraApiRef);
  const navigate = useNavigate();

  const { loading, error, value: issues } = useAsync(async () => {
    const data = await jiraApi.jqlQuery(jqlQuery, maxResults);
    return data;
  }, [jqlQuery, maxResults]);

  if (loading) {
    return <Progress />;
  }

  if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return (
    <InfoCard title={title}>
      <List dense>
        {(issues ?? []).map(issue => {
          const componentName = issue.fields?.summary
            ?.trim()
            .toLowerCase()
            .replace(/\s+/g, '-');

          return (
            <ListItem key={issue.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div>
                <Typography variant="body1">
                  [{issue.key}] {issue.fields?.summary}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {issue.fields?.status?.name ?? 'No Status'}
                </Typography>
              </div>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                style={{ marginTop: 8 }}
                onClick={() => navigate(`/catalog/default/component/${componentName}`)}
              >
                Go to Component
              </Button>
            </ListItem>
          );
        })}
      </List>
    </InfoCard>
  );
};

