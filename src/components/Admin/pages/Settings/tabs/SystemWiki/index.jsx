import React, { useState } from 'react';
import { Layout, Database, Server, Shield, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import ArchitectureTab from './ArchitectureTab';
import DatabaseTab from './DatabaseTab';
import ApiTab from './ApiTab';
import SecurityTab from './SecurityTab';
import * as S from './styles';

const SystemWiki = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('architecture');

    const tabs = [
        { id: 'architecture', icon: Layout, label: t('admin.settings.wiki.tabs.architecture', 'System Architecture') },
        { id: 'database', icon: Database, label: t('admin.settings.wiki.tabs.database', 'Database & Storage') },
        { id: 'api', icon: Server, label: t('admin.settings.wiki.tabs.api', 'API Reference') },
        { id: 'security', icon: Shield, label: t('admin.settings.wiki.tabs.security', 'Security & Access') },
    ];

    return (
        <S.Container>
            <S.NavList>
                <S.NavHeader>
                    <BookOpen size={20} color="var(--color-primary)" />
                    {t('admin.settings.wiki.title', 'Documentation')}
                </S.NavHeader>
                {tabs.map((tab) => (
                    <S.NavItem
                        key={tab.id}
                        $active={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </S.NavItem>
                ))}
            </S.NavList>

            <S.ContentArea key={activeTab}>
                {activeTab === 'architecture' && <ArchitectureTab />}
                {activeTab === 'database' && <DatabaseTab />}
                {activeTab === 'api' && <ApiTab />}
                {activeTab === 'security' && <SecurityTab />}
            </S.ContentArea>
        </S.Container>
    );
};

export default SystemWiki;
