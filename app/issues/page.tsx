'use client'
import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Flex, Text, Card } from '@radix-ui/themes'; // Correct import from '@radix-ui/themes'
import Link from 'next/link';

const Issues = () => {
  const [issues, setIssues] = useState<{ id: number; title: string; description: string }[]>([]);

  useEffect(() => {
    fetch('/api/issues')
      .then((res) => res.json())
      .then((data) => setIssues(data));
  }, []);

  return (
    <div> 
      <h1>Issues</h1>
      <Box  className='mb-3'>
        <Card>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Box>
      <Button>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </div>
  );
};

export default Issues;
