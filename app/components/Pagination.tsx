'use client'

import { MAX_PAGES_SHOWN } from "@/helpers/defaults";

type ParentProps = {
    handlePageSelected: (page: number) => void;
    totalPages: number;
    currentPage: number;
}

export default function Pagination({handlePageSelected, totalPages, currentPage}: ParentProps) {

    const renderPageNumbers = () => {
        const pageNumbers = [];

        // Show all page numbers if totalPages is small enough
        if (totalPages <= MAX_PAGES_SHOWN) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(renderPageNumber(i));
            }
            return pageNumbers;
        }

        const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_SHOWN / 2));
        const endPage = Math.min(totalPages, startPage + MAX_PAGES_SHOWN - 1);

        // Always show first page
        pageNumbers.push(renderPageNumber(1));
        
        // Show second page or dots to represent pages in-between 1 and first number shown in middle
        if (startPage > 2) {
            pageNumbers.push(<li key="...start" className="page-item disabled"><span className="page-link">...</span></li>);
        } else if (startPage === 2 && currentPage !== 3) {
            pageNumbers.push(renderPageNumber(2));
        }

        // Show middle pages
        for (let i = startPage; i <= endPage; i++) {
            if (i !== 1 && i !== totalPages ) {
                pageNumbers.push(renderPageNumber(i));
            }
        }

        // Show second-to-last page or dots to represent pages in-between last page and last number shown in middle
        if (endPage < totalPages - 1) {
            pageNumbers.push(<li key="...end" className="page-item disabled"><span className="page-link">...</span></li>);
        } else if (endPage === totalPages - 1 && currentPage !== totalPages - 2) {
            pageNumbers.push(renderPageNumber(totalPages - 1));
        }

        // Always show last page
        pageNumbers.push(renderPageNumber(totalPages));

        return pageNumbers;
    };

    const renderPageNumber = (page: number) => (
        <li key={page} className={`page-item ${currentPage === page ? '-active' : ''}`}>
            <button className="button" onClick={() => handlePageSelected(page)}>
                {page}
            </button>
        </li>
    );

    return (
        <ol className="list-pages">
            {renderPageNumbers()}
        </ol>
    );
}