import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [taxSettings, setTaxSettingsState] = useState({
    iss: 6,
    irrf: 0,
    csll: 0,
    cofins: 0,
    pis: 0,
    others: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [clientsRes, projectsRes, tasksRes, transactionsRes, taxRes] = await Promise.all([
        api.get('/clients').catch(() => ({ data: [] })),
        api.get('/projects').catch(() => ({ data: [] })),
        api.get('/tasks').catch(() => ({ data: [] })),
        api.get('/transactions').catch(() => ({ data: [] })),
        api
          .get('/settings/tax')
          .catch(() => ({ data: { iss: 6, irrf: 0, csll: 0, cofins: 0, pis: 0, others: 0 } })),
      ]);

      setClients(clientsRes.data || []);
      setProjects(projectsRes.data || []);
      setTasks(tasksRes.data || []);
      setTransactions(transactionsRes.data || []);
      setTaxSettingsState(taxRes.data || {});
    } catch (err) {
      console.error('[AdminContext] Failed to fetch data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const parseCurrency = (valueStr) => {
    if (!valueStr) return 0;
    const cleanStr = valueStr
      .replace(/[^\d,.-]/g, '')
      .replace(/\./g, '')
      .replace(',', '.');
    return parseFloat(cleanStr) || 0;
  };

  const addClient = async (client) => {
    try {
      const res = await api.post('/clients', client);
      setClients((prev) => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      console.error('[AdminContext] addClient failed:', err);
      throw err;
    }
  };

  const updateClient = async (id, updatedData) => {
    try {
      const res = await api.put(`/clients/${id}`, updatedData);
      setClients((prev) => prev.map((c) => (c.id === id ? res.data : c)));
      return res.data;
    } catch (err) {
      console.error('[AdminContext] updateClient failed:', err);
      throw err;
    }
  };

  const deleteClient = async (id) => {
    try {
      await api.del(`/clients/${id}`);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('[AdminContext] deleteClient failed:', err);
      throw err;
    }
  };

  const addTransaction = async (transactionOrArray) => {
    try {
      if (Array.isArray(transactionOrArray)) {
        const results = [];
        for (const t of transactionOrArray) {
          const res = await api.post('/transactions', t);
          results.push(res.data);
        }
        setTransactions((prev) => [...prev, ...results]);
        return results;
      } else {
        const res = await api.post('/transactions', transactionOrArray);
        setTransactions((prev) => [...prev, res.data]);
        return res.data;
      }
    } catch (err) {
      console.error('[AdminContext] addTransaction failed:', err);
      throw err;
    }
  };

  const updateTransaction = async (id, updatedData) => {
    try {
      const res = await api.put(`/transactions/${id}`, updatedData);
      setTransactions((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      return res.data;
    } catch (err) {
      console.error('[AdminContext] updateTransaction failed:', err);
      throw err;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.del(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('[AdminContext] deleteTransaction failed:', err);
      throw err;
    }
  };

  const addProject = async (project) => {
    try {
      const res = await api.post('/projects', project);
      const newProject = res.data;
      setProjects((prev) => [newProject, ...prev]);

      if (
        project.privateDetails?.value &&
        (project.status === 'In Progress' || project.status === 'Completed')
      ) {
        const amount = parseCurrency(project.privateDetails.value);
        if (amount > 0) {
          const totalTax = Object.values(taxSettings).reduce(
            (sum, v) => sum + (parseFloat(v) || 0),
            0,
          );

          await api.post('/transactions', {
            date: new Date().toISOString().split('T')[0],
            type: 'income',
            category: 'Project',
            amount,
            description: `Project Revenue: ${project.title}`,
            status: 'pending',
            projectId: newProject.id,
            clientId: project.clientId,
            isRecurring: false,
            taxRate: totalTax,
          });

          await fetchAll();
        }
      }

      return newProject;
    } catch (err) {
      console.error('[AdminContext] addProject failed:', err);
      throw err;
    }
  };

  const updateProject = async (id, updatedData) => {
    try {
      const res = await api.put(`/projects/${id}`, updatedData);
      setProjects((prev) => prev.map((p) => (p.id === id ? res.data : p)));
      return res.data;
    } catch (err) {
      console.error('[AdminContext] updateProject failed:', err);
      throw err;
    }
  };

  const updateProjectProgress = async (id, stages) => {
    try {
      const res = await api.put(`/projects/${id}`, { stages });
      setProjects((prev) => prev.map((p) => (p.id === id ? res.data : p)));
      return res.data;
    } catch (err) {
      console.error('[AdminContext] updateProjectProgress failed:', err);
      throw err;
    }
  };

  const deleteProject = async (id) => {
    try {
      await api.del(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('[AdminContext] deleteProject failed:', err);
      throw err;
    }
  };

  const addTask = async (task) => {
    try {
      const res = await api.post('/tasks', { ...task, status: 'todo' });
      setTasks((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error('[AdminContext] addTask failed:', err);
      throw err;
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const res = await api.put(`/tasks/${id}`, updatedData);
      setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      return res.data;
    } catch (err) {
      console.error('[AdminContext] updateTask failed:', err);
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.del(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('[AdminContext] deleteTask failed:', err);
      throw err;
    }
  };

  const moveTask = async (taskId, newStatus) => {
    try {
      const res = await api.patch(`/tasks/${taskId}/move`, { status: newStatus });
      setTasks((prev) => prev.map((t) => (t.id === taskId ? res.data : t)));
      return res.data;
    } catch (err) {
      console.error('[AdminContext] moveTask failed:', err);
      throw err;
    }
  };

  const setTaxSettings = async (newSettings) => {
    try {
      const res = await api.put('/settings/tax', newSettings);
      setTaxSettingsState(res.data);
      return res.data;
    } catch (err) {
      console.error('[AdminContext] setTaxSettings failed:', err);
      throw err;
    }
  };

  const value = {
    clients,
    projects,
    tasks,
    transactions,
    isLoading,
    searchTerm,
    setSearchTerm,
    addClient,
    updateClient,
    deleteClient,
    addProject,
    updateProject,
    updateProjectProgress,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    taxSettings,
    setTaxSettings,
    refreshData: fetchAll,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
