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
//         {(issues ?? []).map(issue => {
//           const componentName = issue.fields?.summary
//             ?.trim()
//             .toLowerCase()
//             .replace(/\s+/g, '-');

//           return (
//             <ListItem key={issue.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//               <div>
//                 <Typography variant="body1">
//                   [{issue.key}] {issue.fields?.summary}
//                 </Typography>
//                 <Typography variant="caption" color="textSecondary">
//                   {issue.fields?.status?.name ?? 'No Status'}
//                 </Typography>
//               </div>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 color="primary"
//                 style={{ marginTop: 8 }}
//                 onClick={() => navigate(`/catalog/default/component/${componentName}`)}
//               >
//                 Go to Component
//               </Button>
//             </ListItem>
//           );
//         })}
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
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  Typography,
} from '@material-ui/core';
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

  const { loading, error, value: raw = [] } = useAsync(
    async () => jiraApi.jqlQuery(jqlQuery, maxResults),
    [jiraApi, jqlQuery, maxResults],
  );

  if (loading) return <Progress />;
  if (error)   return <ResponseErrorPanel error={error} />;

  const issues = Array.isArray(raw)
    ? (raw as any[]).filter(issue => issue.fields)
    : [];

  return (
    <InfoCard title={title}>
      <TableContainer style={{ overflowX: 'auto' }}>
        <Table
          size="small"
          stickyHeader
          style={{ minWidth: 800 }}
        >
          <TableHead>
            <TableRow>
              {['Key','Type','Summary','Status','Assignee','Priority','Link'].map(h => (
                <TableCell
                  key={h}
                  style={{
                    whiteSpace: 'nowrap',
                    fontWeight: 600,
                  }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {issues.map(issue => {
              const { key, self, fields } = issue as {
                key: string;
                self: string;
                fields: {
                  issuetype: { iconUrl: string };
                  summary: string;
                  status: { name: string };
                  assignee?: { displayName: string };
                  priority: { name: string };
                };
              };

              const componentName = fields.summary
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '-');

              return (
                <TableRow key={key} hover>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>
                    <Typography variant="body2" color="primary">
                      {key}
                    </Typography>
                  </TableCell>

                  <TableCell style={{ whiteSpace: 'nowrap' }}>
                    <img
                      src={fields.issuetype.iconUrl}
                      alt=""
                      width={16}
                      height={16}
                    />
                  </TableCell>

                  <TableCell style={{ whiteSpace: 'nowrap' }}>
                    {fields.summary}
                  </TableCell>

                  <TableCell style={{ whiteSpace: 'nowrap' }}>
                    {fields.status.name}
                  </TableCell>

                  <TableCell style={{ whiteSpace: 'nowrap' }}>
                    {fields.assignee?.displayName ?? '—'}
                  </TableCell>

                  <TableCell style={{ whiteSpace: 'nowrap' }}>
                    {fields.priority?.name ?? '—'}
                  </TableCell>

                  <TableCell style={{ whiteSpace: 'nowrap' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() =>
                        navigate(
                          `/catalog/default/component/${componentName}`,
                        )
                      }
                    >
                      Link
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </InfoCard>
  );
};

