import { useEffect, useState } from "react";
import styles from "../../Dashboard.module.css";

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const UsersPagination = ({page, totalPages, onPageChange}: Props) => {
    const [showJump, setShowJump] = useState(false);
    const [jumpValue, setJumpValue] = useState("");

    const delta = 2;

    const getPages = () => {
        const range = [];

        const startEdgeCount = 5
        const endEdgeCount = 4

        if (page < startEdgeCount) {
            for (let i = 1; i <= Math.min(startEdgeCount + 1, totalPages); i++) {
                range.push(i);
            }
            return range;
        };

        if (page > totalPages - endEdgeCount) {
            for (
                let i = Math.max(1, totalPages - (endEdgeCount + 1));
                i <= totalPages;
                i++
            ) {
                range.push(i);
            }
            return range;
        };

        for (
            let i = page - delta;
            i <= page + delta;
            i++
        ) {
            range.push(i);
        };

        return range;
    };

    useEffect(() => {
        const handlePaginationKeyDown = (e: KeyboardEvent) => {
            if(e.target instanceof HTMLInputElement) return;

            if(e.key === "ArrowLeft" && page > 1) { 
                onPageChange(page - 1);
            };

            if(e.key === "ArrowRight" && page < totalPages) {
                onPageChange(page + 1);
            };
        };

        window.addEventListener("keydown", handlePaginationKeyDown);

        return () => {
            window.removeEventListener("keydown", handlePaginationKeyDown);
        }
    }, [page, totalPages, onPageChange])

    const btnPageStyle = `${styles['btn-page']}`

    return (
        <>
            <div className={`${styles["users-pagination"]}`}>
                {page !== 1 && (
                    <>
                        <button className={btnPageStyle} onClick={() => onPageChange(1)}>{"<<"}</button>
                        <button className={btnPageStyle} onClick={() => onPageChange(page - 1)}>{"<"}</button>
                    </>
                )}
                {page > 4 && (
                    <button className={btnPageStyle} onClick={() => onPageChange(1)}>1</button>
                )}
                {page > 2 + delta && (
                    showJump ? (
                        <input 
                            type="number"
                            value={page}
                            onChange={(e) => setJumpValue(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === "Enter") {
                                    const page = Number(jumpValue);

                                    if(!isNaN(page)) {
                                        onPageChange(page)
                                    };

                                    setShowJump(false);
                                    setJumpValue("");
                                };

                                if(e.key === "Escape") {
                                    setShowJump(false);
                                    setJumpValue("");
                                };
                            }}
                            onBlur={() => {
                                setShowJump(false);
                                setJumpValue("");
                            }}
                            autoFocus
                        />
                    ) : ( 
                        <span onClick={() => setShowJump(true)} style={{cursor: "pointer"}}>...</span>
                    )
                )}
                {getPages().map((p) => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={`${btnPageStyle} ${p === page ? `${styles["btn-page-selected"]}` : ``}`}
                    >
                        {p}
                    </button>
                ))}
                {page <= totalPages - 4 && (
                    showJump ? (
                        <input 
                            type="number"
                            value={jumpValue}
                            onChange={(e) => setJumpValue(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === "Enter") {
                                    const page = Number(jumpValue);

                                    if(!isNaN(page)) {
                                        onPageChange(page)
                                    };

                                    setShowJump(false);
                                    setJumpValue("");
                                };

                                if(e.key === "Escape") {
                                    setShowJump(false);
                                    setJumpValue("");
                                };
                            }}
                            onBlur={() => {
                                setShowJump(false);
                                setJumpValue("");
                            }}
                            autoFocus
                        />
                    ) : ( 
                        <>
                            <span onClick={() => setShowJump(true)} style={{cursor: "pointer"}}>...</span>
                            <button className={btnPageStyle} onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                        </>
                    )
                )}
                {page !== totalPages && (
                    <>
                        <button className={btnPageStyle} onClick={() => onPageChange(page + 1)}>{">"}</button>
                        <button className={btnPageStyle} onClick={() => onPageChange(totalPages)}>{">>"}</button>
                    </>
                )}
            </div>
        </>
    )
}

export default UsersPagination;