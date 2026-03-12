import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Zap,
    Layout,
    Database,
    PenTool,
    Monitor,
    Shield,
    Check,
    X,
    ChevronDown,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { api } from '../../../../services/api';
import Loader from '../../../ui/Loader';
import EmptyState from '../../../ui/EmptyState';
import DeleteConfirmationModal from '../../../common/DeleteConfirmationModal';
import Pagination from '../../../ui/Pagination';
import * as S from './styles';

const ICON_OPTIONS = [
    { name: 'Zap', icon: Zap },
    { name: 'Layout', icon: Layout },
    { name: 'Database', icon: Database },
    { name: 'PenTool', icon: PenTool },
    { name: 'Monitor', icon: Monitor },
    { name: 'Shield', icon: Shield },
];

const ITEMS_PER_PAGE = 9;

const Services = () => {
    const { t } = useTranslation();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [editingService, setEditingService] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        icon: 'Zap',
        isActive: true,
    });

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await api.get('/services');
            if (response.success) {
                setServices(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch services:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingService) {
                await api.put(`/services/${editingService.id}`, formData);
            } else {
                await api.post('/services', formData);
            }
            setIsModalOpen(false);
            setEditingService(null);
            resetForm();
            fetchServices();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async () => {
        if (!serviceToDelete) return;
        try {
            await api.del(`/services/${serviceToDelete.id}`);
            setIsDeleteModalOpen(false);
            setServiceToDelete(null);
            fetchServices();
        } catch (error) {
            console.error('Failed to delete service:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            icon: 'Zap',
            isActive: true,
        });
    };

    const openCreateModal = () => {
        setEditingService(null);
        resetForm();
        setIsModalOpen(true);
    };

    const openEditModal = (service) => {
        setEditingService(service);
        setFormData({
            name: service.name,
            description: service.description,
            price: service.price,
            icon: service.icon || 'Zap',
            isActive: service.isActive ?? service.active ?? true,
        });
        setIsModalOpen(true);
    };

    const renderIcon = (iconName) => {
        const IconComponent = ICON_OPTIONS.find((opt) => opt.name === iconName)?.icon || Zap;
        return <IconComponent size={24} />;
    };

    const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);
    const paginatedServices = services.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );

    if (loading) return <Loader />;

    return (
        <S.Container>
            <S.Header>
                <S.Title>{t('admin.services.title')}</S.Title>
                <S.AddButton onClick={openCreateModal}>
                    <Plus size={20} />
                    {t('admin.services.add_service', 'Add Service')}
                </S.AddButton>
            </S.Header>

            {services.length > 0 ? (
                <>
                    <S.Grid>
                        {paginatedServices.map((service) => (
                            <S.Card key={service.id}>
                                <S.CardHeader>
                                    <S.IconTitleWrapper>
                                        <S.IconWrapper>{renderIcon(service.icon)}</S.IconWrapper>
                                        <S.ServiceName>{service.name}</S.ServiceName>
                                    </S.IconTitleWrapper>
                                    <S.StatusBadge $active={service.isActive ?? service.active}>
                                        {(service.isActive ?? service.active) ? t('admin.services.status.active', 'Active') : t('admin.services.status.inactive', 'Inactive')}
                                    </S.StatusBadge>
                                </S.CardHeader>

                                <S.Description>{service.description}</S.Description>

                                <S.CardFooter>
                                    <S.Price>
                                        R${' '}
                                        {Number(service.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </S.Price>
                                    <S.CardActions>
                                        <S.ActionButton onClick={() => openEditModal(service)} title={t('admin.services.edit_service', 'Edit Service')}>
                                            <Edit2 size={18} />
                                        </S.ActionButton>
                                        <S.ActionButton
                                            $danger
                                            onClick={() => {
                                                setServiceToDelete(service);
                                                setIsDeleteModalOpen(true);
                                            }}
                                            title={t('admin.services.delete_service', 'Delete Service')}
                                        >
                                            <Trash2 size={18} />
                                        </S.ActionButton>
                                    </S.CardActions>
                                </S.CardFooter>
                            </S.Card>
                        ))}
                    </S.Grid>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <EmptyState
                    title={t('admin.services.empty_title', 'No services found')}
                    description={t('admin.services.empty_desc', 'Get started by adding predefined services.')}
                    icon={Zap}
                >
                    <S.AddButton onClick={openCreateModal}>
                        <Plus size={20} />
                        {t('admin.services.create_service', 'Create Service')}
                    </S.AddButton>
                </EmptyState>
            )}

            {isModalOpen && (
                <S.ModalOverlay onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
                    <S.ModalContent>
                        <S.ModalHeader>
                            <S.ModalTitle>{editingService ? t('admin.services.modal.edit_title', 'Edit Service') : t('admin.services.modal.new_title', 'New Service')}</S.ModalTitle>
                            <S.CloseButton onClick={() => setIsModalOpen(false)}>
                                <X size={24} />
                            </S.CloseButton>
                        </S.ModalHeader>

                        <form
                            onSubmit={handleSubmit}
                            style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}
                        >
                            <S.ModalBody>
                                <S.FormGroup>
                                    <S.Label>{t('admin.services.name')}</S.Label>
                                    <S.Input
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder={t('admin.services.modal.name_placeholder', 'e.g. Website Development')}
                                    />
                                </S.FormGroup>

                                <S.FormGroup>
                                    <S.Label>{t('admin.services.description')}</S.Label>
                                    <S.TextArea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder={t('admin.services.modal.desc_placeholder', 'Detailed description of the service...')}
                                    />
                                </S.FormGroup>

                                <S.FormGroup>
                                    <S.Label>{t('admin.services.price')}</S.Label>
                                    <S.Input
                                        required
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        placeholder="0.00"
                                    />
                                </S.FormGroup>

                                <S.FormGroup>
                                    <S.Label>{t('admin.services.icon')}</S.Label>
                                    <S.IconGrid>
                                        {ICON_OPTIONS.map((opt) => (
                                            <S.IconOption
                                                key={opt.name}
                                                type="button"
                                                $selected={formData.icon === opt.name}
                                                onClick={() => setFormData({ ...formData, icon: opt.name })}
                                                title={opt.name}
                                            >
                                                <opt.icon size={24} />
                                            </S.IconOption>
                                        ))}
                                    </S.IconGrid>
                                </S.FormGroup>

                                <S.FormGroup>
                                    <S.Label>{t('admin.services.visibility')}</S.Label>
                                    <S.ToggleSwitch $checked={formData.isActive}>
                                        <S.ToggleInput
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        />
                                        <S.ToggleSlider $checked={formData.isActive} />
                                        <S.ToggleText>
                                            <strong>{formData.isActive ? t('admin.services.modal.active_text', 'Active') : t('admin.services.modal.inactive_text', 'Inactive')}</strong>
                                            <span>
                                                {formData.isActive ? t('admin.services.modal.active_desc', 'Visible to all clients') : t('admin.services.modal.inactive_desc', 'Hidden from clients')}
                                            </span>
                                        </S.ToggleText>
                                    </S.ToggleSwitch>
                                </S.FormGroup>
                            </S.ModalBody>

                            <S.ModalFooter>
                                <S.Button type="button" $secondary onClick={() => setIsModalOpen(false)}>
                                    {t('admin.services.modal.cancel', 'Cancel')}
                                </S.Button>
                                <S.Button type="submit">{editingService ? t('admin.services.save', 'Save Changes') : t('admin.services.create_service', 'Create Service')}</S.Button>
                            </S.ModalFooter>
                        </form>
                    </S.ModalContent>
                </S.ModalOverlay>
            )}

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title={t('admin.services.delete_modal.title', 'Delete Service')}
                message={t('admin.services.delete_modal.message', 'Are you sure? This action cannot be undone.')}
                itemName={serviceToDelete?.name}
            />
        </S.Container>
    );
};

export default Services;
