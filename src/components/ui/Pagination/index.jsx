import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as S from './styles';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <S.Container>
      <S.PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <ChevronLeft size={20} />
      </S.PageButton>

      <S.Info>
        Page <S.CurrentPage>{currentPage}</S.CurrentPage> of {totalPages}
      </S.Info>

      <S.PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        <ChevronRight size={20} />
      </S.PageButton>
    </S.Container>
  );
};

export default Pagination;
