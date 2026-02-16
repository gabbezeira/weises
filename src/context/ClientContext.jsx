import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../services/api';

const ClientContext = createContext();

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};

export const ClientProvider = ({ children }) => {
  const { profile } = useAuth();
  const [currentClient, setCurrentClient] = useState(null);
  const [clientProjects, setClientProjects] = useState([]);
  const [clientInvoices, setClientInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      if (!profile?.clientId) {
        setIsLoading(false);
        return;
      }

      try {
        const [clientRes, projectsRes] = await Promise.all([
          api.get(`/clients/${profile.clientId}`),
          api.get('/projects'),
        ]);

        setCurrentClient(clientRes.data);
        setClientProjects(projectsRes.data || []);

        const allInvoices = [];
        for (const project of projectsRes.data || []) {
          try {
            const invoicesRes = await api.get(`/projects/${project.id}/invoices`);
            allInvoices.push(
              ...(invoicesRes.data || []).map((inv) => ({
                ...inv,
                projectTitle: project.title,
                projectId: project.id,
              })),
            );
          } catch {
            /* empty */
          }
        }
        allInvoices.sort((a, b) => new Date(b.date) - new Date(a.date));
        setClientInvoices(allInvoices);
      } catch (err) {
        console.error('[ClientContext] Failed to fetch data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientData();
  }, [profile?.clientId]);

  const value = {
    currentClient,
    clientProjects,
    clientInvoices,
    isLoading,
  };

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
};
