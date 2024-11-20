import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RepoPage = () => {
  const [issues, setIssues] = useState([]);
  const location = useLocation();

  // Accessing the link passed through state
  const apiUrl = location.state?.link;

  // Fetch issues from the GitHub API
  useEffect(() => {
    if (!apiUrl) return;
  
    const fetchIssues = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error fetching issues: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging step
        if (Array.isArray(data)) {
          setIssues(data.filter(issue => issue.state === 'open'));
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Failed to fetch issues:', error);
      }
    };
  
    fetchIssues();
  }, [apiUrl]);
  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Open GitHub Issues</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {issues.map(issue => (
          <div 
            key={issue.id} 
            style={{ 
              width: '300px', 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '16px', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
              backgroundColor: '#fff' 
            }}
          >
            <h3 style={{ fontSize: '18px', margin: '0 0 10px' }}>{issue.title}</h3>
            <p><strong>Issue Number:</strong> {issue.number}</p>
            <p><strong>Created At:</strong> {formatDate(issue.created_at)}</p>
            <p><strong>Updated At:</strong> {formatDate(issue.updated_at)}</p>
            <p><strong>State:</strong> {issue.state}</p>
            <p><strong>Assignee:</strong> {issue.assignee ? issue.assignee.login : 'No assignee'}</p>
            <p><strong>Comments:</strong> {issue.comments}</p>
            <a 
              href={issue.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-block', 
                marginTop: '10px', 
                padding: '10px 15px', 
                textAlign: 'center', 
                color: '#fff', 
                backgroundColor: '#007bff', 
                borderRadius: '4px', 
                textDecoration: 'none' 
              }}
            >
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoPage;
