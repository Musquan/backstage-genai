
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
  if (error) return <ResponseErrorPanel error={error} />;

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
              {['Key', 'Type', 'Summary',  'Workspace' ,'Status', 'Assignee', 'Priority'].map(h => (
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
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
                        />
                      </svg>
                    </Button>
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </InfoCard>
  );
};

