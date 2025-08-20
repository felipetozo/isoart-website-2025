function CategoriasLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="categorias-container">
            <div className="categorias-content">
                {children}
            </div>
        </div>
    );
};

export default CategoriasLayout;