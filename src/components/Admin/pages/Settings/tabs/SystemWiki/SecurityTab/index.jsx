import { useTranslation } from 'react-i18next';
import React from 'react';
import { Shield, Lock, Users, Eye, Edit, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import * as S from './styles';

const SecurityTab = () => {
    const { t } = useTranslation();

    const rbacData = [
        {
            resource: t('admin.settings.wiki.security_section.users_profile', 'Users Profile'),
            icon: Users,
            admin: [
                { allowed: true, text: t('admin.settings.wiki.security_section.full_access_users', 'Full Access (Create, Edit, Delete)') }
            ],
            client: [
                { allowed: true, text: t('admin.settings.wiki.security_section.read_own_profile', 'Read Own Profile Only') },
                { allowed: false, text: t('admin.settings.wiki.security_section.cannot_read_others', 'Cannot Read Others') }
            ]
        },
        {
            resource: t('admin.settings.wiki.security_section.projects', 'Projects'),
            icon: AlertCircle,
            admin: [
                { allowed: true, text: t('admin.settings.wiki.security_section.full_access_projects', 'Full Access to All Projects') }
            ],
            client: [
                { allowed: true, text: t('admin.settings.wiki.security_section.read_assigned_projects', 'Read Assigned Projects') },
                { allowed: false, text: t('admin.settings.wiki.security_section.cannot_edit_specs', 'Cannot Edit Project Specs') }
            ]
        },
        {
            resource: t('admin.settings.wiki.security_section.credentials', 'Project Credentials'),
            icon: Lock,
            admin: [
                { allowed: true, text: t('admin.settings.wiki.security_section.decrypt_all', 'Decrypt & View All Credentials') }
            ],
            client: [
                { allowed: true, text: t('admin.settings.wiki.security_section.decrypt_own', 'Decrypt (Own Projects Only)') }
            ]
        },
        {
            resource: t('admin.settings.wiki.security_section.finance', 'Financials & Invoices'),
            icon: AlertCircle,
            admin: [
                { allowed: true, text: t('admin.settings.wiki.security_section.full_access_finance', 'Full Access (Create Invoices, Edit Status)') }
            ],
            client: [
                { allowed: true, text: t('admin.settings.wiki.security_section.view_own_invoices', 'View Own Invoices & Transactions') },
                { allowed: false, text: t('admin.settings.wiki.security_section.cannot_create_invoices', 'Cannot Create or Delete Invoices') }
            ]
        },
        {
            resource: t('admin.settings.wiki.security_section.catalog', 'Services Catalog'),
            icon: AlertCircle,
            admin: [
                { allowed: true, text: t('admin.settings.wiki.security_section.manage_catalog', 'Manage Catalog (Add, Delete Services)') }
            ],
            client: [
                { allowed: true, text: t('admin.settings.wiki.security_section.view_services', 'View Available Services') },
                { allowed: false, text: t('admin.settings.wiki.security_section.cannot_edit_pricing', 'Cannot Edit Pricing') }
            ]
        }
    ];

    return (
        <S.Container>
            <S.Introduction>
                <h3>
                    <Shield size={24} color="var(--color-primary)" />
                    {t('admin.settings.wiki.rbac', 'Role-Based Access Control (RBAC)')}
                </h3>
                <p>
                    {t('admin.settings.wiki.rbac_desc', 'Detailed security policies governing access to system resources. Admins have global access and manage the system, while Client access is strictly isolated to data linked to their specific Client ID.')}
                </p>
            </S.Introduction>

            <S.Section>
                <S.RBACGrid>
                    {rbacData.map((data, index) => (
                        <S.ResourceCard key={index}>
                            <S.ResourceHeader>
                                <data.icon size={18} />
                                <h4>{data.resource}</h4>
                            </S.ResourceHeader>

                            <S.RoleSection>
                                <S.RoleHeader>
                                    <h5>
                                        <Lock size={14} /> {t('admin.settings.wiki.security_section.admin_privileges', 'Admin Privileges')}
                                    </h5>
                                    <S.RoleBadge $role="admin">{t('admin.settings.wiki.security_section.admin', 'Admin')}</S.RoleBadge>
                                </S.RoleHeader>
                                <S.PermissionList>
                                    {data.admin.map((perm, idx) => (
                                        <S.PermissionItem key={idx} $allowed={perm.allowed}>
                                            {perm.allowed ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                            {perm.text}
                                        </S.PermissionItem>
                                    ))}
                                </S.PermissionList>
                            </S.RoleSection>

                            <S.RoleSection>
                                <S.RoleHeader>
                                    <h5>
                                        <Users size={14} /> {t('admin.settings.wiki.security_section.client_privileges', 'Client Privileges')}
                                    </h5>
                                    <S.RoleBadge $role="client">{t('admin.settings.wiki.security_section.client', 'Client')}</S.RoleBadge>
                                </S.RoleHeader>
                                <S.PermissionList>
                                    {data.client.map((perm, idx) => (
                                        <S.PermissionItem key={idx} $allowed={perm.allowed}>
                                            {perm.allowed ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                            {perm.text}
                                        </S.PermissionItem>
                                    ))}
                                </S.PermissionList>
                            </S.RoleSection>
                        </S.ResourceCard>
                    ))}
                </S.RBACGrid>
            </S.Section>
        </S.Container>
    );
};

export default SecurityTab;
