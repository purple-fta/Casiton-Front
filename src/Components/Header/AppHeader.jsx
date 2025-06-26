import styles from "./AppHeader.module.css";



export function AppHeader(props) {
  const tgUser = window.Telegram.WebApp.initDataUnsafe.user;


  return (
    <header className={styles.header}>
        {/* Слева — аватар и имя */}
        <div className={styles.avatarContainer}>
            <img
                src={tgUser.photo_url}
                alt="Аватар"
                className={styles.avatar}
            />
            <span className={styles.username}>{tgUser.first_name}</span>
        </div>
        
        {/* Справа — баланс */}
        <div className={styles.balanceContainer}>
            Баланс: <span className={styles.balanceAmount}>{props.balance} TON</span>
        </div>
    </header>
  );
}
