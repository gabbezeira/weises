import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
import { api } from '../../../../services/api';
import Loader from '../../../ui/Loader';
import EmptyState from '../../../ui/EmptyState';
import DeleteConfirmationModal from '../../../common/DeleteConfirmationModal';
import Pagination from '../../../ui/Pagination';

// Icons available for selection
const ICON_OPTIONS = [
    { name: 'Zap', icon: Zap },
    { name: 'Layout', icon: Layout },
    { name: 'Database', icon: Database },
    { name: 'PenTool', icon: PenTool },
    { name: 'Monitor', icon: Monitor },
    { name: 'Shield', icon: Shield },
];

const ITEMS_PER_PAGE = 9;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-bottom: 2rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

const Title = styled.h1`
    font-size: 1.5rem;
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
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
        background: var(--color-primary-20);
        transform: translateY(-1px);
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

const Card = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    position: relative;
    transition: all 0.2s;
    height: 100%;

    &:hover {
        border-color: var(--color-primary-50);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const IconWrapper = styled.div`
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary-10);
    color: var(--color-primary);
    border-radius: var(--radius-lg);
`;

const Price = styled.div`
    font-weight: 700;
    color: var(--color-white);
    font-size: 1.25rem;
    background: var(--color-surface-hover);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
`;

const ServiceName = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-white);
    margin: 0;
`;

const Description = styled.p`
    color: var(--color-gray-400);
    font-size: 0.95rem;
    line-height: 1.6;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const CardActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: auto;
    border-top: 1px solid var(--color-border);
    padding-top: 1.25rem;
`;

const ActionButton = styled.button`
    padding: 0.6rem;
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-gray-400);
    cursor: pointer;
    border-radius: var(--radius-md);
    transition: all 0.2s;

    &:hover {
        background: var(--color-surface-hover);
        color: ${(props) => (props.$danger ? 'var(--color-red-500)' : 'var(--color-primary)')};
        border-color: ${(props) => (props.$danger ? 'var(--color-red-500)' : 'var(--color-primary)')};
    }
`;

const StatusBadge = styled.span`
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: ${(props) => (props.$active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)')};
    color: ${(props) => (props.$active ? '#10b981' : '#ef4444')};
    border: 1px solid ${(props) => (props.$active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)')};
`;

// Modal Styles
const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 1rem;
    animation: fadeIn 0.2s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const ModalContent = styled.div`
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    width: 100%;
    max-width: 550px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

const ModalHeader = styled.div`
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ModalBody = styled.div`
    padding: 2rem;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--color-border);
        border-radius: 4px;
    }
`;

const ModalTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-white);
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: var(--color-gray-400);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--radius-full);
    transition: all 0.2s;

    &:hover {
        background: var(--color-surface-hover);
        color: var(--color-white);
    }
`;

const FormGroup = styled.div`
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Label = styled.label`
    color: var(--color-gray-300);
    font-size: 0.9rem;
    font-weight: 500;
`;

const Input = styled.input`
    padding: 0.875rem 1rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    color: var(--color-white);
    font-size: 1rem;
    transition: all 0.2s;
    
    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px var(--color-primary-10);
    }

    &::placeholder {
        color: var(--color-gray-600);
    }
`;

const TextArea = styled.textarea`
    padding: 0.875rem 1rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    color: var(--color-white);
    min-height: 120px;
    resize: vertical;
    font-size: 1rem;
    line-height: 1.5;
    transition: all 0.2s;
    
    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px var(--color-primary-10);
    }
`;

const IconGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
    margin-top: 0.5rem;
`;

const IconOption = styled.button`
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => (props.$selected ? 'var(--color-primary)' : 'var(--color-background)')};
    color: ${(props) => (props.$selected ? 'white' : 'var(--color-gray-400)')};
    border: 1px solid ${(props) => (props.$selected ? 'var(--color-primary)' : 'var(--color-border)')};
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: var(--color-primary);
        transform: translateY(-2px);
    }
`;

const ToggleSwitch = styled.label`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    padding: 1rem;
    background: var(--color-background);
    border: 1px solid ${(props) => (props.$checked ? 'var(--color-primary)' : 'var(--color-border)')};
    border-radius: var(--radius-lg);
    transition: all 0.2s;

    &:hover {
        border-color: var(--color-primary);
    }
`;

const ToggleInput = styled.input`
    display: none;
`;

const ToggleSlider = styled.div`
    width: 48px;
    height: 26px;
    background: ${(props) => (props.$checked ? 'var(--color-primary)' : 'var(--color-gray-600)')};
    border-radius: 999px;
    position: relative;
    transition: background 0.2s;

    &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        top: 3px;
        left: ${(props) => (props.$checked ? '25px' : '3px')};
        transition: left 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
`;

const ToggleText = styled.div`
    display: flex;
    flex-direction: column;
    
    strong {
        color: var(--color-white);
        font-size: 0.95rem;
    }
    span {
        color: var(--color-gray-400);
        font-size: 0.8rem;
    }
`;

const ModalFooter = styled.div`
    padding: 1.5rem 2rem;
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    background: var(--color-surface);
    border-bottom-left-radius: var(--radius-xl);
    border-bottom-right-radius: var(--radius-xl);
`;

const Button = styled.button`
    padding: 0.875rem 2rem;
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    border: none;
    background: ${(props) => (props.$secondary ? 'transparent' : 'var(--color-primary)')};
    color: ${(props) => (props.$secondary ? 'var(--color-gray-400)' : 'white')};
    border: ${(props) => (props.$secondary ? '1px solid var(--color-border)' : 'none')};
    transition: all 0.2s;

    &:hover {
        background: ${(props) => (props.$secondary ? 'var(--color-surface-hover)' : 'var(--color-primary-20)')};
        color: ${(props) => (props.$secondary ? 'var(--color-white)' : 'white')};
        border-color: ${(props) => (props.$secondary ? 'var(--color-gray-300)' : 'none')};
        transform: translateY(-1px);
    }
    
    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const Services = () => {
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

    // Pagination Logic
    const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);
    const paginatedServices = services.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );

    if (loading) return <Loader />;

    return (
        <Container>
            <Header>
                <Title>Services Management</Title>
                <AddButton onClick={openCreateModal}>
                    <Plus size={20} />
                    Add Service
                </AddButton>
            </Header>

            {services.length > 0 ? (
                <>
                    <Grid>
                        {paginatedServices.map((service) => (
                            <Card key={service.id}>
                                <CardHeader>
                                    <IconWrapper>{renderIcon(service.icon)}</IconWrapper>
                                    <StatusBadge $active={service.isActive ?? service.active}>
                                        {(service.isActive ?? service.active) ? 'Active' : 'Inactive'}
                                    </StatusBadge>
                                </CardHeader>

                                <div>
                                    <ServiceName>{service.name}</ServiceName>
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <Price>
                                            R${' '}
                                            {Number(service.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </Price>
                                    </div>
                                </div>

                                <Description>{service.description}</Description>

                                <CardActions>
                                    <ActionButton onClick={() => openEditModal(service)} title="Edit Service">
                                        <Edit2 size={18} />
                                    </ActionButton>
                                    <ActionButton
                                        $danger
                                        onClick={() => {
                                            setServiceToDelete(service);
                                            setIsDeleteModalOpen(true);
                                        }}
                                        title="Delete Service"
                                    >
                                        <Trash2 size={18} />
                                    </ActionButton>
                                </CardActions>
                            </Card>
                        ))}
                    </Grid>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <EmptyState
                    title={t('projects_page.empty.title')}
                    description={t('projects_page.empty.description')}
                    icon={Zap}
                >
                    <AddButton onClick={openCreateModal}>
                        <Plus size={20} />
                        Create Service
                    </AddButton>
                </EmptyState>
            )}

            {isModalOpen && (
                <ModalOverlay onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>{editingService ? 'Edit Service' : 'New Service'}</ModalTitle>
                            <CloseButton onClick={() => setIsModalOpen(false)}>
                                <X size={24} />
                            </CloseButton>
                        </ModalHeader>

                        <form
                            onSubmit={handleSubmit}
                            style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}
                        >
                            <ModalBody>
                                <FormGroup>
                                    <Label>Service Name</Label>
                                    <Input
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Website Development"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Description</Label>
                                    <TextArea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Detailed description of the service..."
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Price (R$)</Label>
                                    <Input
                                        required
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        placeholder="0.00"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Service Icon</Label>
                                    <IconGrid>
                                        {ICON_OPTIONS.map((opt) => (
                                            <IconOption
                                                key={opt.name}
                                                type="button"
                                                $selected={formData.icon === opt.name}
                                                onClick={() => setFormData({ ...formData, icon: opt.name })}
                                                title={opt.name}
                                            >
                                                <opt.icon size={24} />
                                            </IconOption>
                                        ))}
                                    </IconGrid>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Visibility Status</Label>
                                    <ToggleSwitch $checked={formData.isActive}>
                                        <ToggleInput
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        />
                                        <ToggleSlider $checked={formData.isActive} />
                                        <ToggleText>
                                            <strong>{formData.isActive ? 'Active' : 'Inactive'}</strong>
                                            <span>
                                                {formData.isActive ? 'Visible to all clients' : 'Hidden from clients'}
                                            </span>
                                        </ToggleText>
                                    </ToggleSwitch>
                                </FormGroup>
                            </ModalBody>

                            <ModalFooter>
                                <Button type="button" $secondary onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">{editingService ? 'Save Changes' : 'Create Service'}</Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Service"
                message="Are you sure? This action cannot be undone."
                itemName={serviceToDelete?.name}
            />
        </Container>
    );
};

export default Services;
