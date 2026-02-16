import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../../../context/AdminContext';
import { useTranslation } from 'react-i18next';
import { X, Plus, Key, Shield } from 'lucide-react';
import DeleteConfirmationModal from '../../../common/DeleteConfirmationModal';
import { uploadProjectImage, uploadGalleryImage } from '../../../../services/storage.service';
import { api } from '../../../../services/api';
import Loader from '../../../ui/Loader';
import * as S from './styles';

const ProjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { projects, clients, addProject, updateProject } = useAdmin();
    const { t } = useTranslation();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        clientId: '',
        category: '',
        status: 'Planning',
        deadline: '',
        description: '',
        challenge: '',
        solution: '',
        image: '',
        methodology: '',
        teamSize: '',
        platform: '',
        year: '',
        duration: '',
        liveLink: '',
        services: [],
        stack: [],
        gallery1: '',
        gallery2: '',
        gallery3: '',
        // Private Details
        projectValue: '',
        credentials: [],
        // Progress
        estimatedCompletion: '',
    });

    const [tagInputs, setTagInputs] = useState({
        services: '',
        stack: '',
    });

    const [uploadingImages, setUploadingImages] = useState({
        image: false,
        gallery1: false,
        gallery2: false,
        gallery3: false,
    });

    const [isDeleteCredentialModalOpen, setIsDeleteCredentialModalOpen] = useState(false);
    const [credentialToDelete, setCredentialToDelete] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            const project = projects.find((p) => p.id === id);

            // Function to fetch credentials separately
            const fetchCredentials = async () => {
                try {
                    const response = await api.get(`/projects/${id}/credentials`);
                    const creds = Array.isArray(response) ? response : response.data || [];
                    setFormData((prev) => ({ ...prev, credentials: creds }));
                } catch (error) {
                    console.error('Failed to fetch credentials:', error);
                }
            };

            if (project) {
                setFormData({
                    ...project,
                    services: project.services || [],
                    stack: project.stack || [],
                    gallery1: project.gallery?.[0] || '',
                    gallery2: project.gallery?.[1] || '',
                    gallery3: project.gallery?.[2] || '',
                    description: project.description || '',
                    challenge: project.challenge || '',
                    solution: project.solution || '',
                    projectValue: project.privateDetails?.value || '',
                    // credentials will be populated by the async fetch below if not present
                    credentials: [],
                    estimatedCompletion: project.estimatedCompletion || '',
                });

                // Fetch credentials from subcollection
                fetchCredentials();
            }
        }
    }, [id, projects, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagInputKeyDown = (e, field) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = tagInputs[field].trim();
            if (val && !formData[field].includes(val)) {
                setFormData((prev) => ({
                    ...prev,
                    [field]: [...prev[field], val],
                }));
                setTagInputs((prev) => ({ ...prev, [field]: '' }));
            }
        }
    };

    const removeTag = (field, tagToRemove) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((tag) => tag !== tagToRemove),
        }));
    };

    // --- Credentials Management ---
    const addCredential = () => {
        setFormData((prev) => ({
            ...prev,
            credentials: [
                ...prev.credentials,
                { id: Date.now().toString(), name: '', url: '', username: '', password: '' },
            ],
        }));
    };

    const updateCredential = (credId, field, value) => {
        setFormData((prev) => ({
            ...prev,
            credentials: prev.credentials.map((c) => (c.id === credId ? { ...c, [field]: value } : c)),
        }));
    };

    const handleRemoveCredentialClick = (cred) => {
        setCredentialToDelete(cred);
        setIsDeleteCredentialModalOpen(true);
    };

    const confirmRemoveCredential = () => {
        if (credentialToDelete) {
            setFormData((prev) => ({
                ...prev,
                credentials: prev.credentials.filter((c) => c.id !== credentialToDelete.id),
            }));
            setCredentialToDelete(null);
            setIsDeleteCredentialModalOpen(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const gallery = [formData.gallery1, formData.gallery2, formData.gallery3].filter(Boolean);

        const projectData = {
            ...formData,
            gallery,
            privateDetails: {
                value: formData.projectValue,
                credentials: formData.credentials,
            },
        };
        // Cleanup temp fields
        delete projectData.gallery1;
        delete projectData.gallery2;
        delete projectData.gallery3;
        delete projectData.projectValue;
        delete projectData.credentials;

        if (isEditMode) {
            updateProject(id, projectData);
        } else {
            addProject(projectData);
        }
        navigate('/admin/projects');
    };

    return (
        <S.Container>
            <S.Header>
                <S.Title>
                    {isEditMode ? t('admin.projects.form.edit_title') : t('admin.projects.form.new_title')}
                </S.Title>
                <S.ButtonGroup style={{ marginTop: 0 }}>
                    <S.Button type="button" onClick={() => navigate('/admin/projects')}>
                        {t('common.actions.cancel')}
                    </S.Button>
                    <S.Button type="submit" $variant="primary" form="project-form">
                        {isEditMode ? t('common.actions.update') : t('common.actions.create')}
                    </S.Button>
                </S.ButtonGroup>
            </S.Header>

            <S.Form id="project-form" onSubmit={handleSubmit}>
                {/* Core Information */}
                <S.Section>
                    <S.SectionTitle>{t('admin.projects.form.core_info')}</S.SectionTitle>
                    <S.FormGroup>
                        <S.Label>{t('admin.projects.form.project_title')}</S.Label>
                        <S.Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Neon Banking"
                        />
                    </S.FormGroup>

                    <S.Grid>
                        <S.FormGroup>
                            <S.Label>{t('admin.clients.table.client')}</S.Label>
                            <S.Select name="clientId" value={formData.clientId} onChange={handleChange} required>
                                <option value="">{t('admin.projects.form.select_client')}</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.name} ({client.company})
                                    </option>
                                ))}
                            </S.Select>
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.Label>{t('admin.projects.form.category')}</S.Label>
                            <S.Input
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="e.g. SaaS Platform"
                                required
                            />
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.Label>{t('admin.clients.table.status')}</S.Label>
                            <S.Select name="status" value={formData.status} onChange={handleChange}>
                                <option value="Planning">{t('admin.projects.status.planning')}</option>
                                <option value="In Progress">{t('admin.projects.status.in_progress')}</option>
                                <option value="Completed">{t('admin.projects.status.completed')}</option>
                                <option value="On Hold">{t('admin.projects.status.on_hold')}</option>
                            </S.Select>
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.Label>{t('admin.projects.form.deadline')}</S.Label>
                            <S.Input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                            />
                        </S.FormGroup>
                    </S.Grid>
                </S.Section>

                <S.Section
                    style={{ borderColor: 'var(--color-primary-30)', background: 'var(--color-primary-5)' }}
                >
                    <S.SectionTitle
                        style={{
                            color: 'var(--color-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        <Shield size={16} /> {t('admin.projects.form.private_info')}
                    </S.SectionTitle>

                    <S.FormGroup>
                        <S.Label>{t('admin.projects.form.project_value')}</S.Label>
                        <div style={{ position: 'relative' }}>
                            <S.Input
                                type="number"
                                min="0"
                                step="0.01"
                                name="projectValue"
                                value={formData.projectValue}
                                onChange={handleChange}
                                placeholder="50000.00"
                                style={{ paddingLeft: '2.5rem' }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-gray-400)',
                                }}
                            >
                                $
                            </div>
                        </div>
                        <span
                            style={{
                                fontSize: '0.75rem',
                                color: 'var(--color-gray-500)',
                                marginTop: '0.25rem',
                                display: 'block',
                            }}
                        >
                            * Setting status to "In Progress" or "Completed" will automatically generate financial
                            entries.
                        </span>
                    </S.FormGroup>

                    <S.FormGroup style={{ marginTop: '1rem' }}>
                        <S.Label>{t('admin.projects.form.credentials')}</S.Label>
                        {formData.credentials.map((cred, index) => (
                            <div
                                key={cred.id}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                    padding: '1rem',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'var(--color-background)',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            color: 'var(--color-gray-400)',
                                        }}
                                    >
                                        {t('admin.projects.form.credential_num')}
                                        {index + 1}
                                    </span>
                                    <S.RemoveTag
                                        type="button"
                                        onClick={() => handleRemoveCredentialClick(cred)}
                                        style={{ color: 'var(--color-red-500)' }}
                                    >
                                        <X size={16} />
                                    </S.RemoveTag>
                                </div>
                                <S.Grid>
                                    <S.Input
                                        placeholder="Service Name (e.g. Vercel)"
                                        value={cred.name}
                                        onChange={(e) => updateCredential(cred.id, 'name', e.target.value)}
                                    />
                                    <S.Input
                                        placeholder="URL"
                                        value={cred.url}
                                        onChange={(e) => updateCredential(cred.id, 'url', e.target.value)}
                                    />
                                    <S.Input
                                        placeholder="Username/Email"
                                        value={cred.username}
                                        onChange={(e) => updateCredential(cred.id, 'username', e.target.value)}
                                    />
                                    <S.Input
                                        placeholder="Password/Key"
                                        value={cred.password}
                                        onChange={(e) => updateCredential(cred.id, 'password', e.target.value)}
                                        type="text"
                                    />
                                </S.Grid>
                            </div>
                        ))}
                        <S.Button
                            type="button"
                            onClick={addCredential}
                            style={{
                                alignSelf: 'flex-start',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginTop: '0.5rem',
                                fontSize: '0.75rem',
                                padding: '0.5rem 1rem',
                            }}
                        >
                            <Plus size={14} /> {t('admin.projects.form.add_credential')}
                        </S.Button>
                    </S.FormGroup>
                </S.Section>

                {/* Details */}
                <S.Section>
                    <S.SectionTitle>{t('admin.projects.form.project_details')}</S.SectionTitle>
                    <S.FormGroup>
                        <S.Label>{t('admin.projects.form.description')}</S.Label>
                        <S.TextArea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Overview of the project..."
                        />
                    </S.FormGroup>

                    <S.Grid>
                        <S.FormGroup>
                            <S.Label>{t('admin.projects.form.challenge')}</S.Label>
                            <S.TextArea
                                name="challenge"
                                value={formData.challenge}
                                onChange={handleChange}
                                placeholder="The main problem..."
                            />
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.Label>{t('admin.projects.form.solution')}</S.Label>
                            <S.TextArea
                                name="solution"
                                value={formData.solution}
                                onChange={handleChange}
                                placeholder="How we solved it..."
                            />
                        </S.FormGroup>
                    </S.Grid>
                </S.Section>

                {/* Technical Specs */}
                <S.Section>
                    <S.SectionTitle>{t('admin.projects.form.technical_specs')}</S.SectionTitle>
                    <S.Grid>
                        <S.FormGroup>
                            <S.Label>{t('admin.projects.form.methodology')}</S.Label>
                            <S.Input
                                name="methodology"
                                value={formData.methodology}
                                onChange={handleChange}
                                placeholder="e.g. Agile"
                            />
                        </S.FormGroup>
                        <S.FormGroup>
                            <S.Label>{t('admin.projects.form.team_size')}</S.Label>
                            <S.Input
                                type="number"
                                name="teamSize"
                                value={formData.teamSize}
                                onChange={handleChange}
                                placeholder="e.g. 6"
                            />
                        </S.FormGroup>
                        <S.FormGroup>
                            <S.Label>{t('admin.projects.form.platform')}</S.Label>
                            <S.Input
                                name="platform"
                                value={formData.platform}
                                onChange={handleChange}
                                placeholder="e.g. Web/Mobile"
                            />
                        </S.FormGroup>
                        <S.FormGroup>
                            <S.Label>{t('admin.projects.form.year')}</S.Label>
                            <S.Input
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                placeholder="e.g. 2024"
                            />
                        </S.FormGroup>
                        <S.FormGroup>
                            <S.Label>{t('admin.projects.form.duration')}</S.Label>
                            <S.Input
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="e.g. 4 Months"
                            />
                        </S.FormGroup>
                        <S.FormGroup>
                            <S.Label>{t('admin.projects.form.live_link')}</S.Label>
                            <S.Input
                                name="liveLink"
                                value={formData.liveLink}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                        </S.FormGroup>
                    </S.Grid>

                    <S.FormGroup>
                        <S.Label>{t('admin.projects.form.services')}</S.Label>
                        <S.TagContainer>
                            {formData.services.map((tag) => (
                                <S.Tag key={tag}>
                                    {tag}
                                    <S.RemoveTag type="button" onClick={() => removeTag('services', tag)}>
                                        <X size={12} />
                                    </S.RemoveTag>
                                </S.Tag>
                            ))}
                            <S.TagInput
                                value={tagInputs.services}
                                onChange={(e) => setTagInputs((prev) => ({ ...prev, services: e.target.value }))}
                                onKeyDown={(e) => handleTagInputKeyDown(e, 'services')}
                                placeholder="Add service (Enter)"
                            />
                        </S.TagContainer>
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label>{t('admin.projects.form.stack')}</S.Label>
                        <S.TagContainer>
                            {formData.stack.map((tag) => (
                                <S.Tag key={tag}>
                                    {tag}
                                    <S.RemoveTag type="button" onClick={() => removeTag('stack', tag)}>
                                        <X size={12} />
                                    </S.RemoveTag>
                                </S.Tag>
                            ))}
                            <S.TagInput
                                value={tagInputs.stack}
                                onChange={(e) => setTagInputs((prev) => ({ ...prev, stack: e.target.value }))}
                                onKeyDown={(e) => handleTagInputKeyDown(e, 'stack')}
                                placeholder="Add stack (Enter)"
                            />
                        </S.TagContainer>
                    </S.FormGroup>
                </S.Section>

                {/* Media */}
                <S.Section>
                    <S.SectionTitle>{t('admin.projects.form.media')}</S.SectionTitle>
                    <S.FormGroup>
                        <S.Label>{t('admin.projects.form.cover_image')}</S.Label>
                        <S.FileInputWrapper>
                            {uploadingImages.image ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100%',
                                    }}
                                >
                                    <Loader />
                                </div>
                            ) : formData.image ? (
                                <S.PreviewImage src={formData.image} alt="Cover" />
                            ) : (
                                <S.UploadPlaceholder>
                                    <Plus size={24} />
                                    <span>{t('common.actions.upload_image')}</span>
                                </S.UploadPlaceholder>
                            )}
                            <S.HiddenInput
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        try {
                                            setUploadingImages((prev) => ({ ...prev, image: true }));
                                            const url = await uploadProjectImage(file);
                                            setFormData((prev) => ({ ...prev, image: url }));
                                        } catch (error) {
                                            alert('Failed to upload image');
                                        } finally {
                                            setUploadingImages((prev) => ({ ...prev, image: false }));
                                        }
                                    }
                                }}
                            />
                        </S.FileInputWrapper>
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label>{t('admin.projects.form.gallery_images')}</S.Label>
                        <S.Grid cols={3}>
                            {[1, 2, 3].map((num) => (
                                <S.FileInputWrapper key={num} style={{ height: '150px' }}>
                                    {uploadingImages[`gallery${num}`] ? (
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '100%',
                                            }}
                                        >
                                            <Loader />
                                        </div>
                                    ) : formData[`gallery${num}`] ? (
                                        <S.PreviewImage src={formData[`gallery${num}`]} alt={`Gallery ${num}`} />
                                    ) : (
                                        <S.UploadPlaceholder>
                                            <Plus size={20} />
                                            <span style={{ fontSize: '0.75rem' }}>Image {num}</span>
                                        </S.UploadPlaceholder>
                                    )}
                                    <S.HiddenInput
                                        type="file"
                                        accept="image/*"
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                try {
                                                    setUploadingImages((prev) => ({ ...prev, [`gallery${num}`]: true }));
                                                    const url = await uploadGalleryImage(file);
                                                    setFormData((prev) => ({ ...prev, [`gallery${num}`]: url }));
                                                } catch (error) {
                                                    alert('Failed to upload image');
                                                } finally {
                                                    setUploadingImages((prev) => ({ ...prev, [`gallery${num}`]: false }));
                                                }
                                            }
                                        }}
                                    />
                                </S.FileInputWrapper>
                            ))}
                        </S.Grid>
                    </S.FormGroup>
                </S.Section>

                <DeleteConfirmationModal
                    isOpen={isDeleteCredentialModalOpen}
                    onClose={() => setIsDeleteCredentialModalOpen(false)}
                    onConfirm={confirmRemoveCredential}
                    title={t('admin.projects.form.delete_credential_modal.title')}
                    message={t('admin.projects.form.delete_credential_modal.message')}
                    itemName={credentialToDelete?.name || 'Credential'}
                />
            </S.Form>
        </S.Container>
    );
};

export default ProjectForm;
