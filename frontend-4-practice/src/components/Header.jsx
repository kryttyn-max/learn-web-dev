export default function Header() {
    return (
        <header className="site-header">
            <div className="logo">
                <span className="logo-icon">🔲</span>
                <span className="logo-text">БАРБЕРШОП</span>
            </div>
            <nav className="main-nav">
                <a href="#">Главная</a>
                <a href="#">Мастера</a>
                <a href="#">Услуги</a>
                <a href="#" className="active">Календарь</a>
                <a href="#">Контакты</a>
            </nav>
            <button className="btn-profile">Личный кабинет</button>
        </header>
    );
}