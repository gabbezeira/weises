import React, { useState } from 'react';
import * as S from './styles';
import { Calendar, Key, ArrowRight } from 'lucide-react';
import CredentialsModal from '../../../Admin/components/CredentialsModal';

const ClientProjectCard = ({ project }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <S.Wrapper>
                <S.Header>
                    <S.TitleGroup>
                        <S.Title to={`/client/projects/${project.id}`}>{project.title}</S.Title>
                        <S.Category>{project.category}</S.Category>
                    </S.TitleGroup>
                    {project.status && (
                        <S.StatusBadge $status={project.status}>{project.status}</S.StatusBadge>
                    )}
                </S.Header>

                <S.Description>{project.description}</S.Description>

                <S.Footer>
                    <S.DateInfo>
                        <Calendar size={14} />
                        {new Date(project.deadline).toLocaleDateString()}
                    </S.DateInfo>

                    <S.ActionGroup>
                        <S.CredentialsButton onClick={() => setIsModalOpen(true)}>
                            <Key size={14} /> Credentials
                        </S.CredentialsButton>
                        <S.DetailsButton to={`/client/projects/${project.id}`}>
                            Details <ArrowRight size={14} />
                        </S.DetailsButton>
                    </S.ActionGroup>
                </S.Footer>
            </S.Wrapper>

            {isModalOpen && <CredentialsModal project={project} onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default ClientProjectCard;
