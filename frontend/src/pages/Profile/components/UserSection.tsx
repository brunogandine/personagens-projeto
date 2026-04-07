import styles from "../Profile.module.css";

type UserSectionItem = {
    type: string;
    label: string;
    value: React.ReactNode;
}

type UserSectionProps = {
    id: string;
    title: string;
    items: UserSectionItem[]
}

export const UserSection = ({ id, title, items }: UserSectionProps) => {
    return (
        <>
            <div id={id} className={`${styles["s-user-section"]}`}>
                <span className={`${styles["s-user-header"]}`}>{title}</span>
                {items.map((item) => (
                    <div className={`${styles["s-user-info"]}`} data-type={item.type} key={item.type}>
                        <span className={`${styles["s-user-info-suffix"]}`}>{item.label}</span>
                        {item.value}
                    </div>
                ))}
            </div>
        </>
    )
}