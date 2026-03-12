import React, { useState, useEffect } from 'react';
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
import { api } from '../../../../../../services/api';
import { uploadUserPhoto } from '../../../../../../services/storage.service';
import Loader from '../../../../../ui/Loader';
import DeleteConfirmationModal from '../../../../../common/DeleteConfirmationModal';
import AlertModal from '../../../../../ui/AlertModal';
import * as S from './styles';













































// --- New Upload Components ---










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
    <S.Container>
      {/* ... Header and Table remain the same ... */}
      <S.Header>
        <S.Title>Admin Users</S.Title>
        <S.AddButton onClick={openCreateModal}>
          <Plus size={18} />
          Add Admin
        </S.AddButton>
      </S.Header>

      <S.Table>
        {/* ... Table Content ... */}
        <thead>
          <tr>
            <S.Th>User</S.Th>
            <S.Th>Role</S.Th>
            <S.Th>Joined</S.Th>
            <S.Th>Actions</S.Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid || user.id}>
              <S.Td>
                <S.UserInfo>
                  <S.Avatar src={user.photoURL || getPlaceholderImage(user.displayName)} />
                  <S.UserMeta>
                    <S.Name>{user.displayName}</S.Name>
                    <S.Email>{user.email}</S.Email>
                  </S.UserMeta>
                </S.UserInfo>
              </S.Td>
              <S.Td>
                <S.RoleBadge>
                  <Shield size={12} />
                  Admin
                </S.RoleBadge>
              </S.Td>
              <S.Td>
                {new Date(
                  user.metadata?.creationTime || user.createdAt || Date.now(),
                ).toLocaleDateString()}
              </S.Td>
              <S.Td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <S.ActionButton onClick={() => handleEdit(user)}>
                    <Edit2 size={18} />
                  </S.ActionButton>
                  <S.ActionButton
                    onClick={() => {
                      setUserToDelete(user);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 size={18} />
                  </S.ActionButton>
                </div>
              </S.Td>
            </tr>
          ))}
        </tbody>
      </S.Table>

      {isModalOpen && (
        <S.ModalOverlay onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
          <S.ModalContent>
            <S.ModalTitle>{editingUser ? 'Edit Admin User' : 'New Admin User'}</S.ModalTitle>
            <form onSubmit={handleSubmit}>
              <S.UploadContainer>
                <S.Label style={{ marginBottom: '1rem' }}>Profile Photo</S.Label>
                <S.HiddenInput
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
                <S.UploadCircle onClick={() => document.getElementById('photo-upload').click()}>
                  {uploadingPhoto ? (
                    <Loader size="sm" />
                  ) : formData.photoURL ? (
                    <S.UploadPreview src={formData.photoURL} alt="Preview" />
                  ) : formData.displayName.length > 0 ? (
                    <S.UploadPreview
                      src={getPlaceholderImage(formData.displayName)}
                      alt="Preview"
                      style={{ opacity: 0.8 }}
                    />
                  ) : (
                    <S.UploadPlaceholder>
                      <Camera />
                    </S.UploadPlaceholder>
                  )}
                </S.UploadCircle>
              </S.UploadContainer>

              <S.FormGroup>
                <S.Label>Full Name</S.Label>
                <S.Input
                  required
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="John Doe"
                />
              </S.FormGroup>
              <S.FormGroup>
                <S.Label>Email</S.Label>
                <S.Input
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
              </S.FormGroup>
              <S.FormGroup>
                <S.Label>Password {editingUser && '(Leave blank to keep current)'}</S.Label>
                <div style={{ position: 'relative' }}>
                  <S.Input
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
                    <S.ActionButton
                      type="button"
                      onClick={generatePassword}
                      title="Generate Random Password"
                      style={{ padding: '4px', color: 'var(--color-primary)' }}
                    >
                      <RefreshCw size={16} />
                    </S.ActionButton>
                    <S.ActionButton
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
                    </S.ActionButton>
                  </div>
                </div>
              </S.FormGroup>

              <S.ModalActions>
                <S.Button type="button" $variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </S.Button>
                <S.Button type="submit" disabled={uploadingPhoto}>
                  {editingUser ? 'Save Changes' : 'Create User'}
                </S.Button>
              </S.ModalActions>
            </form>
          </S.ModalContent>
        </S.ModalOverlay>
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
    </S.Container>
  );
};

export default AdminUsers;
