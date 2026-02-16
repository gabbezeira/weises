import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../../../context/AdminContext';
import { Edit2, Trash2, Users, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Pagination from '../../../ui/Pagination';
import Loader from '@ui/Loader';
import EmptyState from '../../../ui/EmptyState';
import DeleteConfirmationModal from '../../../common/DeleteConfirmationModal';
import * as S from './styles';

const ClientList = () => {
  const { clients, deleteClient, updateClient, isLoading, searchTerm, setSearchTerm } = useAdmin();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const itemsPerPage = 8;

  // Reset search on unmount
  useEffect(() => {
    return () => setSearchTerm('');
  }, [setSearchTerm]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (isLoading) return <Loader />;

  const handleStatusChange = (clientId, newStatus) => {
    updateClient(clientId, { status: newStatus });
    setOpenDropdownId(null);
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      deleteClient(clientToDelete.id);
      setClientToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>{t('admin.clients.title')}</S.Title>
        <S.FilterGroup>
          {['All', 'Active', 'Inactive', 'Cancelled'].map((status) => (
            <S.FilterButton
              key={status}
              $active={statusFilter === status}
              onClick={() => setStatusFilter(status)}
            >
              {status === 'All' ? 'All' : t(`admin.clients.status.${status.toLowerCase()}`)}
            </S.FilterButton>
          ))}
        </S.FilterGroup>
        <S.AddButton to="/admin/clients/new">{t('admin.clients.add_client')}</S.AddButton>
      </S.Header>

      {currentClients.length > 0 ? (
        <>
          <S.TableWrapper>
            <S.Table>
              <S.Thead>
                <tr>
                  <S.Th>{t('admin.clients.table.client')}</S.Th>
                  <S.Th>{t('admin.clients.table.contact')}</S.Th>
                  <S.Th>{t('admin.clients.table.status')}</S.Th>
                  <S.Th>{t('admin.clients.table.actions')}</S.Th>
                </tr>
              </S.Thead>
              <tbody>
                {currentClients.map((client) => (
                  <S.Tr key={client.id}>
                    <S.Td>
                      <S.ClientInfo>
                        <S.Avatar src={client.avatar} alt={client.name} />
                        <div>
                          <p style={{ fontWeight: 500 }}>{client.name}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
                            {client.company}
                          </p>
                        </div>
                      </S.ClientInfo>
                    </S.Td>
                    <S.Td>{client.email}</S.Td>
                    <S.Td>
                      <S.StatusWrapper>
                        <S.StatusBadge
                          $status={client.status}
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            setDropdownPosition({
                              top: rect.bottom + 8,
                              left: rect.left,
                            });
                            setOpenDropdownId(openDropdownId === client.id ? null : client.id);
                          }}
                          title="Click to change status"
                        >
                          {t(`admin.clients.status.${client.status.toLowerCase()}`)}
                        </S.StatusBadge>

                        {openDropdownId === client.id && (
                          <S.Dropdown
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              top: dropdownPosition.top,
                              left: dropdownPosition.left,
                            }}
                          >
                            {['Active', 'Inactive', 'Cancelled'].map((status) => (
                              <S.DropdownItem
                                key={status}
                                onClick={() => handleStatusChange(client.id, status)}
                                $active={client.status === status}
                              >
                                {t(`admin.clients.status.${status.toLowerCase()}`)}
                              </S.DropdownItem>
                            ))}
                          </S.Dropdown>
                        )}
                      </S.StatusWrapper>
                    </S.Td>
                    <S.Td>
                      <S.Actions>
                        <Link to={`/admin/clients/edit/${client.id}`}>
                          <S.ActionButton title={t('common.actions.edit')}>
                            <Edit2 size={16} />
                          </S.ActionButton>
                        </Link>
                        <S.ActionButton
                          $danger
                          onClick={() => handleDeleteClick(client)}
                          title={t('common.actions.delete')}
                        >
                          <Trash2 size={16} />
                        </S.ActionButton>
                      </S.Actions>
                    </S.Td>
                  </S.Tr>
                ))}
              </tbody>
            </S.Table>
          </S.TableWrapper>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <EmptyState
          title={searchTerm ? 'No clients found' : 'No clients yet'}
          description={
            searchTerm
              ? `We couldn't find any clients matching "${searchTerm}"`
              : 'Start by adding your first client to the platform.'
          }
          icon={Users}
        >
          {!searchTerm && (
            <S.AddButton to="/admin/clients/new">
              <Plus size={20} />
              {t('admin.clients.add_client')}
            </S.AddButton>
          )}
        </EmptyState>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={t('common.delete_modal.title')}
        message={t('common.delete_modal.message')}
        itemName={clientToDelete?.name}
      />
    </S.Container>
  );
};

export default ClientList;
