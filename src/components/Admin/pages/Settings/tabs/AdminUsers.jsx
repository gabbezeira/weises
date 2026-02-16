import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Plus,
  Trash2,
  Shield,
  User,
  Camera,
  Upload,
  Edit2,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';
import { api } from '../../../../../services/api';
import { uploadUserPhoto } from '../../../../../services/storage.service';
import Loader from '../../../../ui/Loader';
import DeleteConfirmationModal from '../../../../common/DeleteConfirmationModal';
import AlertModal from '../../../../ui/AlertModal';

const Container = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
`;

const Header = styled.div`
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-white);
`;

const AddButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: var(--color-primary-20);
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    text-align: left;
    padding: 1rem 1.5rem;
    color: var(--color-gray-400);
    font-size: 0.875rem;
    font-weight: 500;
    border-bottom: 1px solid var(--color-border);
`;

const Td = styled.td`
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);
    vertical-align: middle;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    background: var(--color-primary-10);
`;

const UserMeta = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.span`
    font-weight: 500;
    color: var(--color-white);
`;

const Email = styled.span`
    font-size: 0.875rem;
    color: var(--color-gray-500);
`;

const RoleBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.75rem;
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    color: var(--color-gray-500);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--radius-md);
    transition: all 0.2s;

    &:hover {
        background: var(--color-danger-10);
        color: var(--color-red-500);
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
`;

const ModalContent = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    width: 100%;
    max-width: 500px;
    padding: 2rem;
`;

const ModalTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-white);
    margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
    margin-bottom: 1.25rem;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    color: var(--color-gray-400);
    font-size: 0.875rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-white);
    
    &:focus {
        border-color: var(--color-primary);
        outline: none;
    }
`;

const ModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
`;

const Button = styled.button`
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    font-weight: 500;
    cursor: pointer;
    border: none;
    
    ${(props) =>
      props.$variant === 'secondary'
        ? `
        background: transparent;
        border: 1px solid var(--color-border);
        color: var(--color-gray-400);
        &:hover { border-color: var(--color-gray-300); color: var(--color-white); }
    `
        : `
        background: var(--color-primary);
        color: white;
        &:hover { background: var(--color-primary-20); }
    `}
`;

// --- New Upload Components ---
const UploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
`;

const UploadCircle = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px dashed var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background: var(--color-background);
    transition: all 0.2s ease;

    &:hover {
        border-color: var(--color-primary);
        background: var(--color-primary-5);
    }
`;

const UploadPreview = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
`;

const UploadPlaceholder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-gray-400);
    
    svg {
        width: 24px;
        height: 24px;
    }
`;

const HiddenInput = styled.input`
    display: none;
`;

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'error',
  });
  const [passwordCopied, setPasswordCopied] = useState(false);

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    photoURL: '',
  });

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password }));
  };

  const copyToClipboard = () => {
    if (!formData.password) return;
    navigator.clipboard.writeText(formData.password);
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 2000);
  };

  const getPlaceholderImage = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Admin')}&background=random&color=fff&size=128`;
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      showAlert('Error', 'Failed to fetch users list.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (title, message, type = 'error') => {
    setAlertState({ isOpen: true, title, message, type });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = { ...formData };
      // Use placeholder if no photo uploaded
      if (!dataToSubmit.photoURL && dataToSubmit.displayName) {
        dataToSubmit.photoURL = getPlaceholderImage(dataToSubmit.displayName);
      }

      if (editingUser) {
        await api.put(`/users/${editingUser.uid || editingUser.id}`, dataToSubmit);
      } else {
        await api.post('/users', dataToSubmit);
      }
      setIsModalOpen(false);
      setEditingUser(null);
      setFormData({ displayName: '', email: '', password: '', photoURL: '' });
      fetchUsers();
      showAlert('Success', `User ${editingUser ? 'updated' : 'created'} successfully!`, 'success');
    } catch (error) {
      showAlert('Error', error.message || 'Operation failed.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await api.del(`/users/${userToDelete.uid || userToDelete.id}`);
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      fetchUsers();
      showAlert('Success', 'User removed successfully.', 'success');
    } catch (error) {
      console.error('Failed to delete user:', error);
      showAlert('Error', 'Failed to remove user.', 'error');
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingPhoto(true);
      const url = await uploadUserPhoto(file);
      setFormData((prev) => ({ ...prev, photoURL: url }));
    } catch (error) {
      console.error('Photo upload failed:', error);
      showAlert('Upload Failed', 'Could not upload photo. Please try again.', 'error');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      displayName: user.displayName || '',
      email: user.email || '',
      password: '', // Password intentionally empty
      photoURL: user.photoURL || '',
    });
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({ displayName: '', email: '', password: '', photoURL: '' });
    setIsModalOpen(true);
  };

  // Render logic updates
  return (
    <Container>
      {/* ... Header and Table remain the same ... */}
      <Header>
        <Title>Admin Users</Title>
        <AddButton onClick={openCreateModal}>
          <Plus size={18} />
          Add Admin
        </AddButton>
      </Header>

      <Table>
        {/* ... Table Content ... */}
        <thead>
          <tr>
            <Th>User</Th>
            <Th>Role</Th>
            <Th>Joined</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid || user.id}>
              <Td>
                <UserInfo>
                  <Avatar src={user.photoURL || getPlaceholderImage(user.displayName)} />
                  <UserMeta>
                    <Name>{user.displayName}</Name>
                    <Email>{user.email}</Email>
                  </UserMeta>
                </UserInfo>
              </Td>
              <Td>
                <RoleBadge>
                  <Shield size={12} />
                  Admin
                </RoleBadge>
              </Td>
              <Td>
                {new Date(
                  user.metadata?.creationTime || user.createdAt || Date.now(),
                ).toLocaleDateString()}
              </Td>
              <Td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <ActionButton onClick={() => handleEdit(user)}>
                    <Edit2 size={18} />
                  </ActionButton>
                  <ActionButton
                    onClick={() => {
                      setUserToDelete(user);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 size={18} />
                  </ActionButton>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isModalOpen && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
          <ModalContent>
            <ModalTitle>{editingUser ? 'Edit Admin User' : 'New Admin User'}</ModalTitle>
            <form onSubmit={handleSubmit}>
              <UploadContainer>
                <Label style={{ marginBottom: '1rem' }}>Profile Photo</Label>
                <HiddenInput
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
                <UploadCircle onClick={() => document.getElementById('photo-upload').click()}>
                  {uploadingPhoto ? (
                    <Loader size="sm" />
                  ) : formData.photoURL ? (
                    <UploadPreview src={formData.photoURL} alt="Preview" />
                  ) : formData.displayName.length > 0 ? (
                    <UploadPreview
                      src={getPlaceholderImage(formData.displayName)}
                      alt="Preview"
                      style={{ opacity: 0.8 }}
                    />
                  ) : (
                    <UploadPlaceholder>
                      <Camera />
                    </UploadPlaceholder>
                  )}
                </UploadCircle>
              </UploadContainer>

              <FormGroup>
                <Label>Full Name</Label>
                <Input
                  required
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="John Doe"
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  required={!editingUser}
                  readOnly={!!editingUser}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  style={{
                    opacity: editingUser ? 0.7 : 1,
                    cursor: editingUser ? 'not-allowed' : 'text',
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password {editingUser && '(Leave blank to keep current)'}</Label>
                <div style={{ position: 'relative' }}>
                  <Input
                    required={!editingUser}
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    minLength={6}
                    style={{ paddingRight: '120px' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: 'flex',
                      gap: '4px',
                    }}
                  >
                    <ActionButton
                      type="button"
                      onClick={generatePassword}
                      title="Generate Random Password"
                      style={{ padding: '4px', color: 'var(--color-primary)' }}
                    >
                      <RefreshCw size={16} />
                    </ActionButton>
                    <ActionButton
                      type="button"
                      onClick={copyToClipboard}
                      title="Copy Password"
                      style={{
                        padding: '4px',
                        color: passwordCopied
                          ? 'var(--color-emerald-500)'
                          : 'var(--color-gray-400)',
                      }}
                      disabled={!formData.password}
                    >
                      {passwordCopied ? <Check size={16} /> : <Copy size={16} />}
                    </ActionButton>
                  </div>
                </div>
              </FormGroup>

              <ModalActions>
                <Button type="button" $variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploadingPhoto}>
                  {editingUser ? 'Save Changes' : 'Create User'}
                </Button>
              </ModalActions>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Remove Admin"
        message="Are you sure you want to remove this admin user? They will lose all access immediately."
        itemName={userToDelete?.displayName}
      />

      <AlertModal
        isOpen={alertState.isOpen}
        onClose={() => setAlertState((prev) => ({ ...prev, isOpen: false }))}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
      />
    </Container>
  );
};

export default AdminUsers;
